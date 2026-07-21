/**
 * routes/seguimiento.js — seguimiento mensual de NNA.
 */
const express = require("express");
const {
  listarSeguimientos,
  listarSeguimientosPorNna,
  crearSeguimiento,
  actualizarSeguimiento,
  eliminarSeguimiento,
} = require("../controllers/seguimientoController");
const { verificarSesion } = require("../middlewares/auth");

const router = express.Router();

router.use(verificarSesion);
router.get("/", listarSeguimientos);
router.get("/nna/:nnaId", listarSeguimientosPorNna);
router.post("/", crearSeguimiento);
router.put("/:id", actualizarSeguimiento);
router.delete("/:id", eliminarSeguimiento);

module.exports = router;
