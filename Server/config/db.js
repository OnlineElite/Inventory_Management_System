const { Pool } = require("pg");

const pool = new Pool({
  user: "elite",
  host: "dpg-ck7isenq54js73ftogkg-a.frankfurt-postgres.render.com",
  database: "inventory_y8fi",
  password: "GMD2koJ4rbVIbagvl4apzdtMagsrUc0Q",
  port: 5432,
  ssl: true,
});

module.exports = pool;
