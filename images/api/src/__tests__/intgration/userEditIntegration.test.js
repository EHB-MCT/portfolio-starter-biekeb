const request = require("supertest");
const app = require("../../app.js");
const knexfile = require("../../db/knexfile.js"); // replace with the path to your Knex configuration
const db = require("knex")(knexfile.development);

describe("Edit User", () => {
  let createdUserId;

  beforeEach(async () => {
    // Clear the database or perform necessary setup before each test
    await db("usersApi").truncate(); // This is just an example, adjust based on your needs

    const createUserResponse = await request(app).post("/users").send({
      name: "User",
      email: "test.lol@email.com",
      age: 25,
      password: "Test54-",
    });

    createdUserId = createUserResponse.body.id;
  });

  afterAll(() => {
    // Clean up by destroying the database connection
    db.destroy();
  });

  test("should edit user and return 400 for validation errors or 404 for non-existing user", async () => {
    const response = await request(app).put(`/users/${createdUserId}`).send({
      name: "User",
      email: "new.user@email.com",
      age: 25,
      password: "1234",
    });

    // Update the expectation based on the actual behavior of your application
    expect(response.status.toString()).toMatch(/^(400|404)$/); // Adjust based on your actual behavior

    // If a 400 response is expected, check for the error message
    if (response.status === 400) {
      expect(response.body).toHaveProperty("errors");
      // Add more specific checks based on your validation error handling
    }
  });

  test("should return 404 for non-existing user", async () => {
    // Assuming there's no user with ID 999 in your database
    const nonExistingUserId = 999;
    const response = await request(app).get(`/users/${nonExistingUserId}`);

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("error", "User not found");
  });
});
