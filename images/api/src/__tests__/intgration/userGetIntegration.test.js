const request = require("supertest");
const app = require("../../app.js");
const knexfile = require("../../db/knexfile.js");
const db = require("knex")(knexfile.development);

describe("GET /users", () => {
  beforeAll(async () => {
    await db.raw("BEGIN");
  });

  afterAll(async () => {
    await db.destroy();
  });

  // Use beforeEach to ensure a clean state before each test
  beforeEach(async () => {
    // Insert some dummy data into the database for testing
    await db("usersApi").insert([
      {
        name: "User1",
        email: "user1@example.com",
        age: 25,
        password: "passwoOd1",
      },
      {
        name: "User2",
        email: "user2@example.com",
        age: 30,
        password: "passwoOd2",
      },
    ]);
  });

  // Use afterEach to clean up the database after each test
  afterEach(async () => {
    // Rollback any changes made during the test
    await db.raw("ROLLBACK");
  });

  test("should return all users", async () => {
    const response = await request(app).get("/users");

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(2); // Assuming two users were inserted
    expect(response.body[0]).toHaveProperty("name", "User1");
    expect(response.body[1]).toHaveProperty("name", "User2");
  });

  test("should handle database retrieval error", async () => {
    // Mock the db select method to throw an error
    jest.spyOn(db, "select").mockImplementationOnce(() => {
      throw new Error("Database error");
    });

    const response = await request(app).get("/users");

    expect(response.status).toBe(500);
    expect(response.body).toHaveProperty(
      "error",
      "Error retrieving users from the database: Database error"
    );
  });
});
