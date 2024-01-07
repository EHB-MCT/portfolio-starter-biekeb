const request = require("supertest");
const app = require("../../app.js");
const knexfile = require("../../db/knexfile.js");
const db = require("knex")(knexfile.development);
const jwt = require("jsonwebtoken");

describe("GET /users/:id", () => {
  beforeAll(async () => {
    // Create a user for testing
    const createUserResponse = await request(app).post("/users").send({
      name: "User",
      email: "test.user345hdqq555j55@example.com",
      age: 25,
      password: "Test54-",
      role: "admin", // Set to admin
    });

    userId = createUserResponse.body.id; // Ensure this is assigned correctly

    // Mock token generation for the admin
    authToken = jwt.sign({ role: "admin" }, "your-secret-key");
  });

  afterAll(async () => {
    // Close the database connection after all tests
    await db.destroy();
  });

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

    const response = await request(app).get(`/users/${nonExistingUserId}`);

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
});
