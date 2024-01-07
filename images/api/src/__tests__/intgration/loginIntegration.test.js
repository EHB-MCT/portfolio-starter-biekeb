const request = require("supertest");
const app = require("../../app.js");
const knexfile = require("../../db/knexfile.js");
const db = require("knex")(knexfile.development);
const bcrypt = require("bcrypt");

describe("Login Route", () => {
  // Test user credentials
  const testUser = {
    name: "Test User",
    email: "test@example.com",
    age: 25,
    password: "password123",
  };

  // Insert the test user before running the tests
  beforeAll(async () => {
    const hashedPassword = await bcrypt.hash(testUser.password, 10);
    await db("usersApi").insert({
      ...testUser,
      password: hashedPassword,
      role: "user",
    });
  });

  // Remove the test user after running the tests
  afterAll(async () => {
    await db("usersApi").where("email", testUser.email).del();
    await db.destroy();
  });

  it("should return a token and role on successful login", async () => {
    const response = await request(app)
      .post("/login")
      .send({ email: testUser.email, password: testUser.password })
      .expect(200);

    expect(response.body).toHaveProperty("token");
    expect(response.body).toHaveProperty("role", "user");
  });

  it("should return 401 on invalid email or password", async () => {
    await request(app)
      .post("/login")
      .send({ email: "invalid@example.com", password: "invalid" })
      .expect(401);
  });
});
