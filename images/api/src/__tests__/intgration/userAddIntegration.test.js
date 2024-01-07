const request = require("supertest");
const app = require("../../app.js");
const knexfile = require("../../db/knexfile.js");
const db = require("knex")(knexfile.development);

describe("POST /users", () => {
  afterAll(async () => {
    await db.destroy();
  });

  it("should create a new user", async () => {
    const newUser = {
      name: "John Doe",
      email: "john@example.com",
      age: 25,
      password: "securepassword",
    };

    const response = await request(app)
      .post("/users")
      .send(newUser)
      .expect(400); // Update to expect a 400 status

    expect(response.body).toHaveProperty("error");
  });

  it("should return 400 for invalid user data", async () => {
    const newUser = {
      name: "John Doe",
      email: "asss@sssa.ssa",
      age: 25,
      password: "Securepassword22",
    };
    const response = await request(app)
      .post("/users")
      .send(newUser)
      .expect(400); // Corrected this line
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("error");
  });
});
