const express = require("express");
const { 
    listarHogares, 
    obtenerHogarPorId,
    listarIntegrantesPorHogar, 
} = require("../controllers/hogaresController");

const router = express.Router();

router.get("/", listarHogares);
router.get("/:id/integrantes", listarIntegrantesPorHogar);
router.get("/:id", obtenerHogarPorId);


module.exports = router;