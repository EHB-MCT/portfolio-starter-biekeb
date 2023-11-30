// routes/userRoutes.js
const express = require('express');
const { checkUserName, checkUserEmail, checkUserPassword } = require("../helpers/endpointHelpers");

const initUserRoutes = (app, db) => {
  const router = express.Router();

  // Get all users
  router.get('/users', async (req, res) => {
    try {
      const users = await db('usersApi').select('*');
      res.json(users);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: `Error retrieving users from the database: ${error.message}` });
    }
  });

  //get user by id
router.get('/users/:id', async (req, res) => {
    try {
        const { id } = req.params;

        if (id >= 0 && typeof (Number(id)) === 'number' && id < 99999) {
            const user = await db('usersApi').where({ id }).first();

            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }

            res.json(user);
        } else {
            return res.status(401).json({ error: 'Invalid user id' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: `Error retrieving user from the database: ${error.message}` });
    }
});

// Create user
router.post('/users', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!checkUserName(name) || !checkUserEmail(email) || !checkUserPassword(password)) {
      return res.status(400).json({ error: 'Invalid input data' });
    }

    const newUser = await db('usersApi').insert({ name, email, password });

    res.status(201).json({ id: newUser[0], name, email });
  } catch (error) {
    console.error('Error adding user to the database:', error);

    const errorMessage = error.message ? `Error adding user to the database: ${error.message}` : 'Unknown error';

    res.status(500).json({ error: errorMessage });
  }
});


// Update user
router.put('/users/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, password } = req.body;

        //check name
        if (!checkUserName(name)) {
            return res.status(400).json({ error: 'Invalid username' });
        }

        //check email
        if (!checkUserEmail(email)) {
            return res.status(400).json({ error: 'Invalid email' });
        }

        //check password
        if (!checkUserPassword(password)) {
            return res.status(400).json({ error: 'Invalid password' });
        }

        //update user in db
        const updatedUser = await db('usersApi').where({ id }).update({ name, email, password });

        if (!updatedUser) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json({ id, name, email });
    } catch (error) {
        console.error(error);

        res.status(500).json({ error: `Error updating user in the database: ${error.message}` });
    }
});

  // Delete user
  router.delete('/users/:id', async (req, res) => {
     try {
        const { id } = req.params;

        //delete user in db
        const deletedUser = await db('usersApi').where({ id }).del();

        if (!deletedUser) {
        return res.status(404).json({ error: 'User not found' });
        }

        res.json({ id });
    } catch (error) {
        console.error(error); 

        res.status(500).json({ error: `Error deleting user from the database: ${error.message}` });
    }
  });

  app.use('/', router);
};

module.exports = initUserRoutes;
