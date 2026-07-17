const express = require("express");

const {
  listarCatalogos,
  obtenerCatalogoPorNombre,
} = require("../controllers/catalogosController");

const router = express.Router();

router.get("/", listarCatalogos);
router.get("/:nombre", obtenerCatalogoPorNombre);

module.exports = router;