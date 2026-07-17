const express = require("express");

const {
  obtenerPlanilla,
  guardarSeguimientosLote,
} = require("../controllers/seguimientoController");

const router = express.Router();

router.get("/planilla", obtenerPlanilla);
router.post("/lote", guardarSeguimientosLote);

module.exports = router;