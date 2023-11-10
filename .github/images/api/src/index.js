const express = require('express');
const knex = require('knex');
const app = express();
const port = 3000;

const db = knex(require('../db/knexfile').development);

app.get('/api/hello', (req, res) => {
  res.send('Hello, World!');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

