/**
 * usuariosController.js — CRUD de profesionales (solo admin).
 * Valida req.body → llama usuariosModel → responde con responder.*
 */
const usuariosModel = require("../models/usuariosModel");
const responder = require("../utils/responseHelpers");
const { parseId, faltanCampos } = require("../utils/validators");

const listarUsuarios = async (req, res) => {
  try {
    const data = await usuariosModel.obtenerUsuarios();
    return responder.ok(res, data);
  } catch (error) {
    return responder.errorServidor(res, "No se pudieron cargar los usuarios", error);
  }
};

const obtenerUsuario = async (req, res) => {
  try {
    const id = parseId(req.params.id);
    if (!id) return responder.idInvalido(res, "usuario");

    const data = await usuariosModel.obtenerUsuarioPorId(id);
    if (!data) return responder.noEncontrado(res, "Usuario");
    return responder.ok(res, data);
  } catch (error) {
    return responder.errorServidor(res, "No se pudo cargar el usuario", error);
  }
};

const crearUsuario = async (req, res) => {
  try {
    if (faltanCampos(req.body, ["nombres", "apellidos", "correo", "password"])) {
      return responder.badRequest(res, "Faltan nombres, apellidos, correo o contraseña");
    }
    const data = await usuariosModel.crearUsuario(req.body);
    return responder.creado(res, "Usuario creado", data);
  } catch (error) {
    const msg = error.code === "23505" ? "Ese correo ya está registrado" : error.message;
    return responder.errorServidor(res, msg || "No se pudo crear el usuario", error);
  }
};

const actualizarUsuario = async (req, res) => {
  try {
    const id = parseId(req.params.id);
    if (!id) return responder.idInvalido(res, "usuario");

    const data = await usuariosModel.actualizarUsuario(id, req.body);
    if (!data) return responder.noEncontrado(res, "Usuario");
    return responder.ok(res, data);
  } catch (error) {
    return responder.errorServidor(res, "No se pudo actualizar el usuario", error);
  }
};

const eliminarUsuario = async (req, res) => {
  try {
    const id = parseId(req.params.id);
    if (!id) return responder.idInvalido(res, "usuario");

    await usuariosModel.eliminarUsuario(id);
    return responder.okMensaje(res, "Usuario eliminado");
  } catch (error) {
    return responder.errorServidor(res, error.message || "No se pudo eliminar el usuario", error);
  }
};

module.exports = {
  listarUsuarios,
  obtenerUsuario,
  crearUsuario,
  actualizarUsuario,
  eliminarUsuario,
};
