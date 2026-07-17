const express = require("express");
const { listarHogares, obtenerHogarPorId } = require("../controllers/hogaresController");

const router = express.Router();

router.get("/", listarHogares);
router.get("/:id", obtenerHogarPorId);

module.exports = router;