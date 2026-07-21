/**
 * routes/usuarios.js — CRUD de profesionales (solo administrador).
 */
const express = require("express");
const {
  listarUsuarios,
  obtenerUsuario,
  crearUsuario,
  actualizarUsuario,
  eliminarUsuario,
} = require("../controllers/usuariosController");
const { verificarSesion, soloAdmin } = require("../middlewares/auth");

const router = express.Router();

router.use(verificarSesion, soloAdmin);
router.get("/", listarUsuarios);
router.get("/:id", obtenerUsuario);
router.post("/", crearUsuario);
router.put("/:id", actualizarUsuario);
router.delete("/:id", eliminarUsuario);

module.exports = router;
