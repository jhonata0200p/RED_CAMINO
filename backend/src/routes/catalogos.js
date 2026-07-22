/**
 * routes/catalogos.js — GET /api/catalogos (todos los cat_* para selects).
 */
const express = require("express");
const { listarCatalogos } = require("../controllers/catalogosController");

const router = express.Router();

router.get("/", listarCatalogos);

module.exports = router;
