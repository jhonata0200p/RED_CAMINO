/**
 * routes/hogares.js — CRUD de hogares (familias).
 * Montado en server.js como /api/hogares (requiere verificarSesion).
 */
const express = require("express");
const {
  listarHogares,
  obtenerHogarPorId,
  crearHogar,
  actualizarHogar,
  eliminarHogar,
  obtenerSiguienteCodigo,
} = require("../controllers/hogaresController");

const router = express.Router();

router.get("/", listarHogares);
router.get("/codigo/siguiente", obtenerSiguienteCodigo);
router.get("/:id", obtenerHogarPorId);
router.post("/", crearHogar);
router.put("/:id", actualizarHogar);
router.delete("/:id", eliminarHogar);

module.exports = router;
