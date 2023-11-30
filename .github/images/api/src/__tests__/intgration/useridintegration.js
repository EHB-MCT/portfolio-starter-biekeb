const request = require('supertest');
const app = require('../../app.js'); // replace with the path to your Express app file
const knexfile = require('../../db/knexfile.js'); // replace with the path to your Knex configuration
const db = require("knex")(knexfile.development);

describe('GET /users/:id', () => {

    beforeAll(async () => {
        await db.raw('BEGIN');
    });

    afterAll(async () => {
        await db.destroy();
    });

    // test('should return the correct user record', async () => {
    //     const userId = 1;
    //     const response = await request(app).get(`/users/${userId}`);

    //     expect(response.status).toBe(200);
    //     expect(response.body).toHaveProperty('id', userId);

    //     const dbRecord = await db('usersApi').select("*").where("id", userId);
    //     expect(dbRecord.length).toBeGreaterThan(0);
    //     expect(dbRecord[0]).toHaveProperty('id', userId);
    // });

    // test('should return 404 for non-existent user', async () => {
    //     const nonExistentUserId = 999;
    //     const response = await request(app).get(`/users/${nonExistentUserId}`);
    //     expect(response.status).toBe(404);

    //     const dbRecord = await db('usersApi').select("*").where("id", nonExistentUserId);
    //     expect(dbRecord.length).toBe(0);
    //     expect(dbRecord[0]).not.toHaveProperty('id', nonExistentUserId);
    // });

    test('should return 401 for negative userid', async () => {
        const negativeUserId = -12;
        const response = await request(app).get(`/users/${negativeUserId}`);
        expect(response.status).toBe(401);
    });

    test('should return 401 for non-numeric userid', async () => {
        const nonNumericUserId = "hello";
        const response = await request(app).get(`/users/${nonNumericUserId}`);
        expect(response.status).toBe(401);
    });

    test('should return 401 for too large userid', async () => {
        const tooLargeUserId = 99999;
        const response = await request(app).get(`/users/${tooLargeUserId}`);
        expect(response.status).toBe(401);
    });
});

