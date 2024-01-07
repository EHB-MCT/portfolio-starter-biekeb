const request = require("supertest");
const express = require("express"); // Import express
const app = require("../../app.js");
const knexfile = require("../../db/knexfile.js");
const db = require("knex")(knexfile.development);
const { expect } = require("chai");
const { initUserRoutes } = require("../../routes/users.js");

describe("GET /users", () => {
  beforeAll(() => {});

  afterAll(async () => {
    // Close the database connection after all tests
    await db.destroy();
  });

  it("should return an array of users", async () => {
    const response = await request(app).get("/users").expect(200);

    // Assuming your response is expected to be an array of users
    expect(response.body).to.be.an("array");
    expect(response.body).to.have.length.greaterThan(0);
  });
});
