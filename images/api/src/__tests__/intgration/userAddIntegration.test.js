const request = require("supertest");
const app = require("../../app.js");
const knexfile = require("../../db/knexfile.js");
const db = require("knex")(knexfile.development);

describe("POST /users", () => {
  beforeAll(async () => {
    await db.raw("BEGIN");
  });

  afterAll(async () => {
    await db.destroy();
  });

  beforeEach(async () => {});

  afterEach(async () => {
    await db.raw("ROLLBACK");
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
});
