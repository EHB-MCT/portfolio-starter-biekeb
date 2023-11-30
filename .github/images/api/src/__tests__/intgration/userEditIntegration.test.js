const request = require('supertest');
const app = require('../../app.js'); // replace with the path to your Express app file
const knexfile = require('../../db/knexfile.js'); // replace with the path to your Knex configuration
const db = require("knex")(knexfile.development);

describe('PUT /users/:id', () => {

    beforeAll(async () => {
        await db.raw('BEGIN');
    });

    afterAll(async () => {
        await db.destroy();
    });

    test('should update user and return the correct user record', async () => {
        const userId = 24;

        const updatedUserData = {
            name: 'UpdatedName',
            email: 'updated.email@example.com',
            password: 'UpdatedPassword123'
        };

        const response = await request(app)
            .put(`/users/${userId}`)
            .send(updatedUserData);

        expect(response.status).toBe(200);
        expect(response.body).toMatchObject(updatedUserData);

        const dbRecord = await db('usersApi').select("*").where("id", userId);
        expect(dbRecord.length).toBeGreaterThan(0);
        expect(dbRecord[0]).toMatchObject(updatedUserData);
    });

    test('should return 400 for invalid username', async () => {
        const userId = 24;
        const invalidUserData = {
            name: '',
            email: 'updated.email@example.com',
            password: 'UpdatedPassword123'
        };

        const response = await request(app)
            .put(`/users/${userId}`)
            .send(invalidUserData);

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('error', 'Invalid username');
    });

    test('should return 400 for invalid email', async () => {
        const userId = 1;
        const invalidUserData = {
            name: 'UpdatedName',
            email: 'invalid.email',
            password: 'UpdatedPassword123'
        };

        const response = await request(app)
            .put(`/users/${userId}`)
            .send(invalidUserData);

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('error', 'Invalid email');
    });

    test('should return 400 for invalid password', async () => {
        const userId = 1;
        const invalidUserData = {
            name: 'UpdatedName',
            email: 'updated.email@example.com',
            password: 'weak'
        };

        const response = await request(app)
            .put(`/users/${userId}`)
            .send(invalidUserData);

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('error', 'Invalid password');
    });

    test('should return 404 for non-existent user', async () => {
        const nonExistentUserId = 999;
        const updatedUserData = {
            name: 'UpdatedName',
            email: 'updated.email@example.com',
            password: 'UpdatedPassword123'
        };

        const response = await request(app)
            .put(`/users/${nonExistentUserId}`)
            .send(updatedUserData);

        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty('error', 'User not found');
    });
});

