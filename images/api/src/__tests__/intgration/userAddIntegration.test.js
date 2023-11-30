const request = require('supertest');
const app = require('../../app.js'); // replace with the path to your Express app file

const knexfile = require('../../db/knexfile.js'); // replace with the path to your Knex configuration
const db = require("knex")(knexfile.development);

const exampleUser = {
    name: "test",
    email: "test12@test.com",
    password: "tesT55"
}

describe('POST /users', () => {

    beforeAll(async () => {
    await db.raw('BEGIN');
  });

  afterAll(async () => {
    await db.destroy();
  });

test('should return 400 for invalid input data', async () => {
  const response = await request(app)
      .post(`/users`)
      .send({
          ...exampleUser,
          name: null
      });

  expect(response.status).toBe(400);
  expect(response.body).toHaveProperty('error', 'Invalid input data');

  // Ensure that the user was not added to the database
  const dbRecord = await db('usersApi').select("*").where("name", null);
  expect(dbRecord.length).toBe(0);
});

});

