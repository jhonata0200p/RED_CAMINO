/**
 * server.js — punto de entrada del backend (Node + Express).
 *
 * Flujo de una petición:
 *   Cliente → ruta (/api/hogares) → middleware auth → router → controller → model → PostgreSQL
 *
 * Estructura backend:
 *   routes/      → define URLs (GET, POST, PUT, DELETE)
 *   controllers/ → valida body, responde JSON { success, data }
 *   models/      → consultas SQL con pool de PostgreSQL
 *   middlewares/ → verificarSesion, soloAdmin
 */
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config(); // lee .env (DB_HOST, PORT, etc.)

const pool = require("./config/db");
const { verificarSesion } = require("./middlewares/auth");

const authRoutes = require("./routes/auth");
const hogaresRoutes = require("./routes/hogares");
const nnaRoutes = require("./routes/nna");
const seguimientoRoutes = require("./routes/seguimiento");
const usuariosRoutes = require("./routes/usuarios");
const catalogosRoutes = require("./routes/catalogos");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors()); // permite peticiones desde el frontend (localhost:5173)
app.use(express.json()); // parsea body JSON en req.body

// Health check sin autenticación
app.get("/api/health", (req, res) => {
  res.json({
    status: "OK",
    message: "Red Camino Backend",
    timestamp: new Date().toISOString(),
  });
});

// Verifica conexión a PostgreSQL
app.get("/api/health/db", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT NOW() AS fecha_servidor, current_database() AS base_datos",
    );
    res.json({ success: true, data: result.rows[0] });
  } catch (error) {
    console.error("Error DB:", error);
    res.status(500).json({ success: false, message: "Sin conexión a PostgreSQL" });
  }
});

// Rutas públicas y protegidas
app.use("/api/auth", authRoutes); // login sin sesión previa
app.use("/api/hogares", verificarSesion, hogaresRoutes);
app.use("/api/nna", nnaRoutes); // el router interno aplica verificarSesion
app.use("/api/seguimientos", seguimientoRoutes);
app.use("/api/usuarios", usuariosRoutes); // soloAdmin dentro del router
app.use("/api/catalogos", verificarSesion, catalogosRoutes);

app.listen(PORT, () => {
  console.log(`Backend en http://localhost:${PORT}`);
});
