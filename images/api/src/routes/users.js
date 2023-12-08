const express = require("express");
const uuid = require("uuid");
const bcrypt = require("bcrypt");

const {
  checkUserName,
  checkUserEmail,
  checkUserPassword,
  checkUserAge,
} = require("../helpers/endpointHelpers");

const initUserRoutes = (app, db) => {
  const router = express.Router();

  // Get all users
  router.get("/users", async (req, res) => {
    try {
      const users = await db("usersApi").select("*");
      res.json(users);
    } catch (error) {
      console.error(error);
      res.status(500).json({
        error: `Error retrieving users from the database: ${error.message}`,
      });
    }
  });

  //get user by id
  router.get("/users/:id", async (req, res) => {
    try {
      const { id } = req.params;

      if (id >= 0 && typeof Number(id) === "number" && id < 99999) {
        const user = await db("usersApi").where({ id }).first();

        if (!user) {
          return res.status(404).json({ error: "User not found" });
        }

        res.json(user);
      } else {
        return res.status(401).json({ error: "Invalid user id" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({
        error: `Error retrieving user from the database: ${error.message}`,
      });
    }
  });

  // Create user
  router.post("/users", async (req, res) => {
    try {
      const { name, email, age, password } = req.body;

      if (
        !checkUserName(name) ||
        !checkUserEmail(email) ||
        !checkUserPassword(password) ||
        !checkUserAge(age)
      ) {
        return res.status(400).json({ error: "Invalid input data" });
      }

      const newUser = await db("usersApi").insert({
        name,
        email,
        age,
        password,
      });

      res.status(201).json({ id: newUser[0], name, email, age });
    } catch (error) {
      console.error("Error adding user to the database:", error);

      const errorMessage = error.message
        ? `Error adding user to the database: ${error.message}`
        : "Unknown error";

      res.status(500).json({ error: errorMessage });
    }
  });

  // Update user
  router.put("/users/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const { name, email, age, password } = req.body;

      // Validation checks before hashing
      const validationErrors = [];

      if (!checkUserName(name)) {
        validationErrors.push("Invalid username");
      }

      if (!checkUserEmail(email)) {
        validationErrors.push("Invalid email");
      }

      if (!checkUserPassword(password)) {
        validationErrors.push("Invalid password");
      }

      if (!checkUserAge(age)) {
        validationErrors.push("Invalid age");
      }

      if (validationErrors.length > 0) {
        return res.status(400).json({ errors: validationErrors });
      }

      // Update user in db
      const updatedUser = await db("usersApi")
        .where({ id })
        .update({ name, email, age, password });

      if (!updatedUser) {
        return res.status(404).json({ error: "User not found" });
      }

      res.json({ id, name, email, age });
    } catch (error) {
      console.error(error);

      res.status(500).json({
        error: `Error updating user in the database: ${error.message}`,
      });
    }
  });

  // Delete user
  router.delete("/users/:id", async (req, res) => {
    try {
      const { id } = req.params;

      //delete user in db
      const deletedUser = await db("usersApi").where({ id }).del();

      if (!deletedUser) {
        return res.status(404).json({ error: "User not found" });
      }

      res.json({ id });
    } catch (error) {
      console.error(error);

      res.status(500).json({
        error: `Error deleting user from the database: ${error.message}`,
      });
    }
  });

  app.use("/", router);
};

module.exports = initUserRoutes;
