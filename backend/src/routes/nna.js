const express = require("express");

const {
  listarNna,
  obtenerNnaPorId,
  listarSeguimientosPorNna,
} = require("../controllers/nnaController");

const router = express.Router();

router.get("/", listarNna);
router.get("/:id/seguimientos", listarSeguimientosPorNna);
router.get("/:id", obtenerNnaPorId);

module.exports = router;