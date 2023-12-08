const request = require("supertest");
const app = require("../../app.js");
const knexfile = require("../../db/knexfile.js");
const db = require("knex")(knexfile.development);

const exampleUser = {
  name: "test",
  email: "test122@test.com",
  age: 25,
  password: "tesT55",
};

describe("POST /users", () => {
  beforeAll(async () => {
    await db.raw("BEGIN");
  });

  afterAll(async () => {
    await db.destroy();
  });

  test("should return 400 for invalid input data", async () => {
    const response = await request(app)
      .post(`/users`)
      .send({
        ...exampleUser,
        name: "", // Set to an empty string or another invalid value
      });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("error", "Invalid input data");

    // Ensure that the user was not added to the database
    const dbRecord = await db("usersApi")
      .select("*")
      .where("name", exampleUser.name);
    expect(dbRecord.length).toBe(0);
  });

  // test("should add user with valid input data", async () => {
  //   const response = await request(app).post(`/users`).send(exampleUser);

  //   expect(response.status).toBe(201);
  //   expect(response.body).toHaveProperty("id");
  //   expect(response.body).toHaveProperty("name", exampleUser.name);
  //   expect(response.body).toHaveProperty("email", exampleUser.email);
  //   expect(response.body).toHaveProperty("age", exampleUser.age);

  //   // Ensure that the user was added to the database
  //   const dbRecord = await db("usersApi")
  //     .select("*")
  //     .where("id", response.body.id);
  //   expect(dbRecord.length).toBe(1);
  //   expect(dbRecord[0].name).toBe(exampleUser.name);
  //   expect(dbRecord[0].email).toBe(exampleUser.email);
  //   expect(dbRecord[0].age).toBe(exampleUser.age);
  // });
});
