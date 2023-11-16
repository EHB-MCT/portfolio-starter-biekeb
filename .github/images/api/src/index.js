const express = require('express');
const knex = require('knex');
const bodyParser = require('body-parser'); 

const app = express();
const port = 3000;

const db = knex(require('../db/knexfile').development);

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.get('/users', async (req, res) => {
  const users = await db('usersApi').select('*');
  res.json(users);
}
);

app.post('/users', async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: 'Name, email, and password are required' });
  }

  try {
    const newUser = await db('usersApi').insert({ name, email, password });
    res.status(201).json({ id: newUser[0], name, email });
  } catch (error) {
    res.status(500).json({ error: 'Error adding user to the database' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

