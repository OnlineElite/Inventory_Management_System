
const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "Inventory",
  password: "Elite%159",
  port: 5432,
  ssl: true,
});

module.exports = pool