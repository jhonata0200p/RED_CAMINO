const express = require("express");
const { listarHogares } = require("../controllers/hogaresController");

const router = express.Router();

router.get("/", listarHogares);

module.exports = router;