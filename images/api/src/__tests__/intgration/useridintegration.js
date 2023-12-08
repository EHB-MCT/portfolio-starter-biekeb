const request = require("supertest");
const app = require("../../app.js");
const knexfile = require("../../db/knexfile.js");
const db = require("knex")(knexfile.development);

describe("GET /users/:id", () => {
  beforeAll(async () => {
    await db.raw("BEGIN");
  });

  afterAll(async () => {
    await db.destroy();
  });

  test("should return the correct user record", async () => {
    const userId = 12;
    const response = await request(app).get(`/users/${userId}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("id", userId);

    const dbRecord = await db("usersApi").select("*").where("id", userId);
    expect(dbRecord.length).toBeGreaterThan(0);
    expect(dbRecord[0]).toHaveProperty("id", userId);
  });

  // test("should return 404 for non-existent user", async () => {
  //   const nonExistentUserId = 999;
  //   const response = await request(app).get(`/users/${nonExistentUserId}`);
  //   expect(response.status).toBe(404);

  //   // Since you expect a 404 for a non-existent user, you don't need to check the database record.
  //   // The next two lines can be removed.
  //   // const dbRecord = await db("usersApi").select("*").where("id", nonExistentUserId);
  //   // expect(dbRecord.length).toBe(0);
  // });

  // test("should return 400 for negative userid", async () => {
  //   const negativeUserId = -12;
  //   const response = await request(app).get(`/users/${negativeUserId}`);
  //   expect(response.status).toBe(400);
  // });

  // test("should return 400 for non-numeric userid", async () => {
  //   const nonNumericUserId = "hello";
  //   const response = await request(app).get(`/users/${nonNumericUserId}`);
  //   expect(response.status).toBe(400);
  // });

  // test("should return 400 for too large userid", async () => {
  //   const tooLargeUserId = 999;
  //   const response = await request(app).get(`/users/${tooLargeUserId}`);
  //   expect(response.status).toBe(400);
  // });
});
