const request = require("supertest");
const app = require("../../app.js"); // replace with the path to your Express app file
const knexfile = require("../../db/knexfile.js"); // replace with the path to your Knex configuration
const db = require("knex")(knexfile.development);

describe("DELETE /users/:id", () => {
  let createdUserId;

  beforeAll(async () => {
    // Create a user for testing deletion
    const createUserResponse = await request(app).post("/users").send({
      name: "User",
      email: "test.user345hdqq555j55@example.com",
      age: 25,
      password: "Test54-",
    });

    createdUserId = 3;
  });

  test("should delete user and return 200", async () => {
    console.log(createdUserId);

    if (!createdUserId) {
      // If not defined, handle it accordingly
      console.error("Error: createdUserId is not defined.");
      return;
    }

    const response = await request(app).del(`/users/1`);
    console.log(response.body); // Log the response body

    expect(response.status).toBe(200);
  });

  // Additional test cases can be added if needed
});
