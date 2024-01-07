const express = require("express");
const uuid = require("uuid");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken"); // You may need to install this package

const {
  checkUserName,
  checkUserEmail,
  checkUserPassword,
  checkUserAge,
} = require("../helpers/endpointHelpers");

const initUserRoutes = (app, db) => {
  const router = express.Router();

  // Middleware for common checks or transformations
  router.use((req, res, next) => {
    // Add any middleware checks here
    next();
  });

  // Get all users
  router.get("/users", async (req, res) => {
    try {
      const users = await db("usersApi").select("*");
      res.json(users);
    } catch (error) {
      console.error("Error in /users route:", error);
      res.status(500).json({
        error: "Error retrieving users from the database",
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

      // Hash the password before storing it in the database
      const hashedPassword = await bcrypt.hash(password, 10); // 10 is the number of salt rounds

      const newUser = await db("usersApi").insert({
        name,
        email,
        age,
        password: hashedPassword,
        role: "user",
      });

      res.status(201).json({ id: newUser[0], name, email, age, role: "user" });
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
      const { authorization } = req.headers;

      // Check if the Authorization header is provided
      if (!authorization || !authorization.startsWith("Bearer ")) {
        return res.status(401).json({ error: "Unauthorized" });
      }

      const token = authorization.split(" ")[1];

      try {
        // Verify the JWT token
        const decodedToken = jwt.verify(token, "your-secret-key");

        // Check if the user making the request is the account owner or an admin
        if (
          !decodedToken ||
          (decodedToken.userId !== id && decodedToken.role !== "admin")
        ) {
          return res.status(403).json({ error: "Permission denied" });
        }

        // Delete user in db
        const deletedUser = await db("usersApi").where({ id }).del();

        if (!deletedUser) {
          return res.status(404).json({ error: "User not found" });
        }

        res.json({ id });
      } catch (error) {
        console.error(error);
        res.status(401).json({ error: "Invalid token" });
      }
    } catch (error) {
      console.error(error);

      res.status(500).json({
        error: `Error deleting user from the database: ${error.message}`,
      });
    }
  });

  // Login user
  router.post("/login", async (req, res) => {
    try {
      const { email, password } = req.body;

      // Validate email and password
      if (!checkUserEmail(email) || !checkUserPassword(password)) {
        return res.status(400).json({ error: "Invalid email or password" });
      }

      // Check if the user with the provided email exists
      const user = await db("usersApi")
        .whereRaw('LOWER("email") = LOWER(?)', [email])
        .first();

      if (!user) {
        return res.status(401).json({ error: "Invalid email or password" });
      }

      // Check if the provided password matches the stored hashed password
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        return res.status(401).json({ error: "Invalid email or password" });
      }

      // Generate a JWT token for authentication
      const token = jwt.sign(
        { userId: user.id, email: user.email, role: user.role }, // Include the user's role
        "your-secret-key",
        {
          expiresIn: "1h", // You can adjust the expiration time as needed
        }
      );

      res.json({ token, role: user.role }); // Send the user's role in the response
    } catch (error) {
      console.error(error);

      res.status(500).json({
        error: `Error during login: ${error.message}`,
      });
    }
  });

  app.use("/", router);
};

module.exports = initUserRoutes;
