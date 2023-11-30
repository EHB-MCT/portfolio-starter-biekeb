const app = require("./app.js")
const port = 3000;

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});



// const express = require('express');
// const knex = require('knex');
// const bodyParser = require('body-parser'); 
// // const bcrypt = require('bcrypt');

// const {checkUserName, checkUserEmail, checkUserPassword} = require("./helpers/endpointHelpers.js")

// const app = express();
// const port = 3000;

// const db = knex(require('../db/knexfile').development);

// app.use(bodyParser.json());



// app.get('/', (req, res) => {
//   res.send('Hello, World!');
// });

// //get users
// app.get('/users', async (req, res) => {
//   const users = await db('usersApi').select('*');
//   res.json(users);
// }
// );

// //get user by id
// app.get('/users/:id', async (req, res) => {
//   try {
//     const { id } = req.params;

//     const user = await db('usersApi').where({ id }).first();

//     if (!user) {
//       return res.status(404).json({ error: 'User not found' });
//     }

//     res.json(user);
//   } catch (error) {
//     console.error(error); 

//     res.status(500).json({ error: `Error retrieving user from the database: ${error.message}` });
//   }
// }
// );
  
// //create user
// app.post('/users', async (req, res) => {
//   try {
//     const { name, email, password } = req.body;

//     //check name
//     if (!checkUserName(name)) {
//       return res.status(400).json({ error: 'Invalid username' });
//     }

//     //check email
//     if (!checkUserEmail(email)) {
//       return res.status(400).json({ error: 'Invalid email' });
//     }

//     //check password
//     if (!checkUserPassword(password)) {
//       return res.status(400).json({ error: 'Invalid password' });
//     }

//     // const hashedPassword = await bcrypt.hash(password, 10);

//     //insert user in db
//     const newUser = await db('usersApi').insert({ name, email, password });

//     res.status(201).json({ id: newUser[0], name, email });
//   } catch (error) {
//     console.error(error); 

//     res.status(500).json({ error: `Error adding user to the database: ${error.message}` });
//   }
// });

// //update user
// app.put('/users/:id', async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { name, email, password } = req.body;

//     //check name
//     if (!checkUserName(name)) {
//       return res.status(400).json({ error: 'Invalid username' });
//     }

//     //check email
//     if (!checkUserEmail(email)) {
//       return res.status(400).json({ error: 'Invalid email' });
//     }

//     //check password
//     if (!checkUserPassword(password)) {
//       return res.status(400).json({ error: 'Invalid password' });
//     }

//     //update user in db
//     const updatedUser = await db('usersApi').where({ id }).update({ name, email, password });

//     if (!updatedUser) {
//       return res.status(404).json({ error: 'User not found' });
//     }

//     res.json({ id, name, email });
//   } catch (error) {
//     console.error(error); 

//     res.status(500).json({ error: `Error updating user in the database: ${error.message}` });
//   }
// });

// //delete user
// app.delete('/users/:id', async (req, res) => {
//   try {
//     const { id } = req.params;

//     //delete user in db
//     const deletedUser = await db('usersApi').where({ id }).del();

//     if (!deletedUser) {
//       return res.status(404).json({ error: 'User not found' });
//     }

//     res.json({ id });
//   } catch (error) {
//     console.error(error); 

//     res.status(500).json({ error: `Error deleting user from the database: ${error.message}` });
//   }
// });




// app.listen(port, () => {
//   console.log(`Server is running on http://localhost:${port}`);
// });

