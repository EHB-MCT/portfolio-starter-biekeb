const request = require("supertest");
const app = require("../../app.js");
const knexfile = require("../../db/knexfile.js"); // replace with the path to your Knex configuration
const db = require("knex")(knexfile.development);

describe("Create and Delete User", () => {
  let createdUserId;

  test("should create a user and return 201", async () => {
    const userData = {
      name: "NewUser",
      email: "new.user@example.com",
      age: 25,
      password: "NewUserPassword123",
    };

    const response = await request(app).post("/users").send(userData);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
    createdUserId = response.body.id; // Save the created user ID for the next test
  });

  test("should delete the created user and return 200", async () => {
    // Ensure a user was created in the previous test
    expect(createdUserId).toBeDefined();

    const response = await request(app).delete(`/users/${createdUserId}`);

    expect(response.status).toBe(200);

    // Optionally, you can check if the user is deleted by trying to fetch it
    const fetchUserResponse = await request(app).get(`/users/${createdUserId}`);
    expect(fetchUserResponse.status).toBe(404);
  });
});
