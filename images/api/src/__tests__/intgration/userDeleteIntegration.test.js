const request = require('supertest');
const app = require('../../app.js'); // replace with the path to your Express app file
const knexfile = require('../../db/knexfile.js'); // replace with the path to your Knex configuration
const db = require('knex')(knexfile.development);

describe('DELETE /users/:id', () => {
    beforeEach(async () => {
        // Set up a test user in the database before each test
        await db('usersApi').insert({
            id: 1,
            name: 'TestUser',
            email: 'test.user@example.com',
            password: 'TestPassword123',
        });
    });

    afterEach(async () => {
        // Clean up the test user from the database after each test
        await db('usersApi').truncate();
    });

    test('should delete user and return the deleted user ID', async () => {
        const userIdToDelete = 1;

        const response = await request(app)
            .delete(`/users/${userIdToDelete}`);

        expect(response.status).toBe(200);
        expect(response.body).toEqual({ id: userIdToDelete });

        // Ensure the user has been deleted from the database
        const deletedUser = await db('usersApi').where('id', userIdToDelete).first();
        expect(deletedUser).toBeUndefined();
    });

    test('should return 404 for non-existent user', async () => {
        const nonExistentUserId = 999;

        const response = await request(app)
            .delete(`/users/${nonExistentUserId}`);

        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty('error', 'User not found');
    });

    test('should handle errors gracefully', async () => {
        // Mock a database error by providing an invalid ID (e.g., a string)
        const invalidUserId = 'invalid_id';

        const response = await request(app)
            .delete(`/users/${invalidUserId}`);

        expect(response.status).toBe(500);
        expect(response.body).toHaveProperty('error');
    });
});
