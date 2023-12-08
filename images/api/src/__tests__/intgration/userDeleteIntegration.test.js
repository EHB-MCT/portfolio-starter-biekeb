const request = require("supertest");
const app = require("../../app.js"); // replace with the path to your Express app file
const knexfile = require("../../db/knexfile.js"); // replace with the path to your Knex configuration
const db = require("knex")(knexfile.development);
const { v4: uuidv4 } = require("uuid");

describe("DELETE /users/:id", () => {
  let createdUserId;

  beforeAll(async () => {
    // Create a user for testing deletion
    createdUserId = uuidv4();
    await request(app).post("/users").send({
      id: createdUserId,
      name: "User",
      email: "test.user@example.com",
      age: 25,
      password: "Test54-",
    });
  });

  test("should delete user and return 200", async () => {
    const response = await request(app).delete(`/users/${createdUserId}`);

    expect(response.status).toBe(200);
  });

  // Additional test cases can be added if needed
});
