const request = require("supertest");
const app = require("../../app"); // Adjust the path to your app file
const knexfile = require("../../db/knexfile");
const db = require("knex")(knexfile.development);
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

describe("Admin Update User Route", () => {
  // Assuming your usersApi table has a user with these credentials for testing
  const testUser = {
    name: "Test User",
    email: "test@example.com",
    age: 25,
    password: "password123",
    role: "admin",
  };

  // Admin credentials for generating a valid admin token
  const adminCredentials = {
    userId: 1, // Assuming user with ID 1 is an admin in your test environment
    email: "admin@example.com",
    role: "admin",
  };

  let adminToken;

  beforeAll(async () => {
    // Insert the test user into the database
    const hashedPassword = await bcrypt.hash(testUser.password, 10);
    await db("usersApi").insert({
      ...testUser,
      password: hashedPassword,
    });

    // Generate a valid admin token for authentication
    adminToken = jwt.sign(adminCredentials, "your-secret-key");
  });

  afterAll(async () => {
    // Remove the test user from the database
    await db("usersApi").where("email", testUser.email).del();
    await db.destroy();
  });

  it("should update user information when authenticated as admin", async () => {
    const updatedUserData = {
      name: "Updated User",
      email: "updated@example.com",
      age: 30,
      password: "newpassword456",
      role: "user",
    };

    const response = await request(app)
      .put(`/admin/users/${adminCredentials.userId}`)
      .set("Authorization", `Bearer ${adminToken}`)
      .send(updatedUserData)
      .expect(200);

    expect(response.body).toMatchObject({
      id: adminCredentials.userId.toString(), // Convert to string
      name: updatedUserData.name,
      email: updatedUserData.email,
      age: updatedUserData.age,
      role: updatedUserData.role,
    });
  });

  it("should return 401 if not authenticated as admin", async () => {
    const response = await request(app)
      .put(`/admin/users/${adminCredentials.userId}`) // Replace with the actual user ID
      .send({ name: "Updated User" })
      .expect(401);

    expect(response.body).toHaveProperty("error", "Unauthorized");
  });

  it("should return 403 if authenticated user is not an admin", async () => {
    const nonAdminCredentials = {
      userId: 2, // Assuming user with ID 2 is not an admin in your test environment
      email: "nonadmin@example.com",
      role: "user",
    };

    const nonAdminToken = jwt.sign(nonAdminCredentials, "your-secret-key");

    const response = await request(app)
      .put(`/admin/users/${adminCredentials.userId}`) // Replace with the actual user ID
      .set("Authorization", `Bearer ${nonAdminToken}`)
      .send({ name: "Updated User" })
      .expect(403);

    expect(response.body).toHaveProperty("error", "Permission denied");
  });

  it("should return 404 if user to update is not found", async () => {
    const response = await request(app)
      .put("/admin/users/99999") // Replace with a non-existing user ID
      .set("Authorization", `Bearer ${adminToken}`)
      .send({ name: "Updated User" })
      .expect(404);

    expect(response.body).toHaveProperty("error", "User not found");
  });
});
