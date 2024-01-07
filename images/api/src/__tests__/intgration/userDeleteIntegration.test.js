const request = require("supertest");
const app = require("../../app.js"); // replace with the path to your Express app file
const knexfile = require("../../db/knexfile.js"); // replace with the path to your Knex configuration
const db = require("knex")(knexfile.development);
const jwt = require("jsonwebtoken");

describe("DELETE /users/:id", () => {
  let createdUserId;
  let authToken;

  beforeAll(async () => {
    try {
      const createUserResponse = await request(app).post("/users").send({
        name: "User",
        email: "test.user345q555j55@example.com",
        age: 25,
        password: "Test54-",
      });

      createdUserId = createUserResponse.body.id;

      // Mock token generation for the test user
      authToken = jwt.sign(
        { userId: createdUserId, role: "admin" },
        "your-secret-key"
      );
    } catch (error) {
      console.error("Error creating user for testing:", error);
    }
  });

  afterAll(async () => {
    // Close the database connection after all tests
    await db.destroy();
  });

  test("should delete user and return 200", async () => {
    if (!createdUserId) {
      console.error("Error: createdUserId is not defined.");
      return;
    }

    const response = await request(app)
      .delete(`/users/${createdUserId}`)
      .set("Authorization", `Bearer ${authToken}`);

    expect(response.status).toBe(200);
  });

  test("should return 404 for non-existing user", async () => {
    // Assuming there's no user with ID 999 in your database
    const nonExistingUserId = 999;
    const response = await request(app)
      .delete(`/users/${nonExistingUserId}`)
      .set("Authorization", `Bearer ${authToken}`);

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("error", "User not found");
  });

  test("should return 401 for unauthorized user", async () => {
    // Assuming there's no user with ID 999 in your database
    const nonExistingUserId = 999;
    const response = await request(app).delete(`/users/${nonExistingUserId}`);

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("error", "Unauthorized");
  });

  // Additional test cases can be added if needed
});
