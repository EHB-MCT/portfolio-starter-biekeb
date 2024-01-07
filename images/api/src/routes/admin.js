const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const {
  checkUserName,
  checkUserEmail,
  checkUserPassword,
  checkUserAge,
} = require("../helpers/endpointHelpers");

const initAdminRoutes = (app, db) => {
  const router = express.Router();

  router.use((req, res, next) => {
    // Add any middleware checks here
    next();
  });

  // Middleware to verify admin token
  const verifyAdminToken = (req, res, next) => {
    const { authorization } = req.headers;

    // Check if the Authorization header is provided
    if (!authorization || !authorization.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const token = authorization.split(" ")[1];

    try {
      // Verify the JWT token
      const decodedToken = jwt.verify(token, "your-secret-key");

      // Check if the user making the request is an admin
      if (!decodedToken || decodedToken.role !== "admin") {
        return res.status(403).json({ error: "Permission denied" });
      }

      // Attach the decoded token to the request for further use
      req.user = decodedToken;

      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({ error: "Invalid token" });
    }
  };

  // Update user by admin
  router.put("/admin/users/:id", verifyAdminToken, async (req, res) => {
    try {
      // The code for updating the user remains the same

      // Update user in the database
      const updatedUser = await db("usersApi")
        .where({ id: req.params.id })
        .update({
          name: req.body.name,
          email: req.body.email,
          age: req.body.age,
          password: req.body.password,
          role: req.body.role,
        });

      if (!updatedUser) {
        return res.status(404).json({ error: "User not found" });
      }

      res.json({
        id: req.params.id,
        name: req.body.name,
        email: req.body.email,
        age: req.body.age,
        role: req.body.role,
      });
    } catch (error) {
      console.error(error);

      res.status(500).json({
        error: `Error updating user in the database: ${error.message}`,
      });
    }
  });

  // Promote user to admin
  router.put("/admin/promote/:id", async (req, res) => {
    try {
      const { id } = req.params;

      // Update user's role to admin
      const updatedUser = await db("usersApi")
        .where({ id })
        .update({ role: "admin" });

      if (!updatedUser) {
        return res.status(404).json({ error: "User not found" });
      }

      res.json({ id, role: "admin" });
    } catch (error) {
      console.error(error);

      res.status(500).json({
        error: `Error promoting user to admin in the database: ${error.message}`,
      });
    }
  });

  app.use("/", router);
};

module.exports = initAdminRoutes;
