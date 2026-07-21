/**
 * routes/nna.js — CRUD de NNA + pendientes de confirmación.
 * Todas las rutas exigen sesión (router.use verificarSesion).
 */
const express = require("express");
const {
  listarNna,
  listarPendientes,
  contarPendientes,
  obtenerNnaPorId,
  crearNna,
  actualizarNna,
  eliminarNna,
} = require("../controllers/nnaController");
const { verificarSesion } = require("../middlewares/auth");

const router = express.Router();

router.use(verificarSesion);
router.get("/", listarNna);
router.get("/pendientes/lista", listarPendientes);
router.get("/pendientes/conteo", contarPendientes);
router.get("/:id", obtenerNnaPorId);
router.post("/", crearNna);
router.put("/:id", actualizarNna);
router.delete("/:id", eliminarNna);

module.exports = router;
