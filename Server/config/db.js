const { Pool } = require("pg");

// Local Test
/* 
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "Inventory",
  password: "Elite%159",
  port: 5432,
});
*/

// Rander
/* 
const pool = new Pool({
  user: "elite",
  host: "dpg-ck7isenq54js73ftogkg-a.frankfurt-postgres.render.com",
  database: "inventory_y8fi",
  password: "GMD2koJ4rbVIbagvl4apzdtMagsrUc0Q",
  port: 5432,
  ssl: true,
});
*/

// Vercel
const pool = new Pool({
  user: "default",
  host: "ep-green-sound-29068208-pooler.ap-southeast-1.postgres.vercel-storage.com",
  database: "verceldb",
  password: "DdyLse3oP2qc",
  port: 5432,
  ssl: true,
});

module.exports = pool;
