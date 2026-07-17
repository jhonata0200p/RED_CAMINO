const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const hogaresRoutes = require("./routes/hogares");
const nnaRoutes = require("./routes/nna");
const seguimientoRoutes = require("./routes/seguimiento");
const dashboardRoutes = require("./routes/dashboard");
const catalogosRoutes = require("./routes/catalogos");

dotenv.config();

const pool = require("./config/db");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use("/api/hogares", hogaresRoutes);
app.use("/api/nna", nnaRoutes);
app.use("/api/seguimientos", seguimientoRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/catalogos", catalogosRoutes);

app.get("/api/health", (req, res) => {
  res.json({
    status: "OK",
    message: "Raíces Backend",
    timestamp: new Date().toISOString(),
  });
});

app.get("/api/health/db", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT NOW() AS fecha_servidor, current_database() AS base_datos"
    );

    res.status(200).json({
      success: true,
      message: "Conexión con PostgreSQL exitosa",
      data: result.rows[0],
    });
  } catch (error) {
    console.error("Error conectando con PostgreSQL:", error);

    res.status(500).json({
      success: false,
      message: "No fue posible conectar con PostgreSQL",
    });
  }
});

app.listen(PORT, () => {
  console.log(`Backend corriendo en http://localhost:${PORT}`);
});