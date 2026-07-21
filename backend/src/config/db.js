/**
 * db.js — pool de conexiones a PostgreSQL (librería pg).
 * Todas las consultas SQL pasan por pool.query() en los models.
 */
const { Pool } = require("pg");

const pool = new Pool({
  host: process.env.DB_HOST,       // en Docker: "bd"
  port: Number(process.env.DB_PORT),
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

pool.on("error", (error) => {
  console.error("Error inesperado en PostgreSQL:", error);
});

module.exports = pool;
