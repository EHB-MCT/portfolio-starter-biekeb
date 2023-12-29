const request = require("supertest");
const app = require("../../app.js");
const knexfile = require("../../db/knexfile.js");
const db = require("knex")(knexfile.development);

describe("GET /users/:id", () => {
  test("should return user by id and return 200", async () => {
    // Assuming there's a user with ID 1 in your database
    const userIdToFetch = 1;

    const response = await request(app).get(`/users/${userIdToFetch}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("id");
    expect(response.body.id).toBe(userIdToFetch);
  });

  test("should return 404 for non-existing user", async () => {
    // Assuming there's no user with ID 999 in your database
    const nonExistingUserId = 999;

    const response = await request(app).get(`/users/5`);

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("error", "User not found");
  });

  test("should return 401 for invalid user id", async () => {
    // Assuming an invalid user id, for example, a string
    const invalidUserId = "invalid";

    const response = await request(app).get(`/users/${invalidUserId}`);

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("error", "Invalid user id");
  });

  test("should return 401 for out-of-range user id", async () => {
    // Assuming an out-of-range user id, for example, 100000
    const outOfRangeUserId = 100000;

    const response = await request(app).get(`/users/${outOfRangeUserId}`);

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("error", "Invalid user id");
  });

  // Additional test cases can be added if needed
});
