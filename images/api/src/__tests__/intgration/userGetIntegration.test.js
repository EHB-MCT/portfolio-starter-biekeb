const request = require("supertest");
const app = require("../../app.js");
const knexfile = require("../../db/knexfile.js");
const db = require("knex")(knexfile.development);
const { expect } = require("chai");
const { initUserRoutes } = require("../../routes/users.js");

describe("GET /users", () => {
  let app;

  before(() => {
    app = express();
    initUserRoutes(app, db);
    // Set up any necessary environment for testing (e.g., initialize a test database)
  });

  after(async () => {
    // Clean up resources after testing (e.g., close the test database connection)
  });

  it("should return an array of users", async () => {
    const response = await request(app).get("/users").expect(200);

    // Assuming your response is expected to be an array of users
    expect(response.body).to.be.an("array");
    expect(response.body).to.have.length.greaterThan(0);
  });

  it("should handle errors gracefully", async () => {
    // Simulate an error in the database
    // For example, you could change the table name in the query to cause an error
    const response = await request(app).get("/users").expect(500);

    expect(response.body).to.have.property("error");
    expect(response.body.error).to.match(
      /Error retrieving users from the database/
    );
  });
});
