const express = require("express");
const knex = require("knex");
const bodyParser = require("body-parser");
const cors = require("cors");

const initUserRoutes = require("./routes/users");
const initAdminRoutes = require("./routes/admin");
const db = knex(require("./db/knexfile").development);

const app = express();

app.use(bodyParser.json());
app.use(cors());

initUserRoutes(app, db);
initAdminRoutes(app, db);

app.get("/", (req, res) => {
  res.send(200);
});

module.exports = app;
