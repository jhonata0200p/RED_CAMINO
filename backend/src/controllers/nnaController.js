/**
 * nnaController.js — CRUD de NNA.
 * Valida req.body → llama nnaModel → responde con responder.*
 */const nnaModel = require("../models/nnaModel");
const responder = require("../utils/responseHelpers");
const { parseId } = require("../utils/validators");

const listarNna = async (req, res) => {
  try {
    const data = await nnaModel.obtenerNna();
    return responder.ok(res, data);
  } catch (error) {
    return responder.errorServidor(res, "No se pudieron cargar los NNA", error);
  }
};

const listarPendientes = async (req, res) => {
  try {
    const data = await nnaModel.obtenerPendientesConfirmacion();
    return responder.ok(res, data);
  } catch (error) {
    return responder.errorServidor(res, "No se pudieron cargar los pendientes", error);
  }
};

const contarPendientes = async (req, res) => {
  try {
    const total = await nnaModel.contarPendientesConfirmacion();
    return responder.ok(res, { total });
  } catch (error) {
    return responder.errorServidor(res, "No se pudo contar pendientes", error);
  }
};

const obtenerNnaPorId = async (req, res) => {
  try {
    const id = parseId(req.params.id);
    if (!id) return responder.idInvalido(res, "NNA");

    const nna = await nnaModel.obtenerNnaPorId(id);
    if (!nna) return responder.noEncontrado(res, "NNA");
    return responder.ok(res, nna);
  } catch (error) {
    return responder.errorServidor(res, "No se pudo cargar el NNA", error);
  }
};

const crearNna = async (req, res) => {
  try {
    if (!req.body.familiaId || !req.body.nombre || !req.body.fechaNacimiento) {
      return responder.badRequest(res, "Faltan campos: familiaId, nombre, fechaNacimiento");
    }
    const data = await nnaModel.crearNna(req.body);
    return responder.creado(res, "NNA creado", data);
  } catch (error) {
    return responder.errorServidor(res, error.message || "No se pudo crear el NNA", error);
  }
};

const actualizarNna = async (req, res) => {
  try {
    const id = parseId(req.params.id);
    if (!id) return responder.idInvalido(res, "NNA");

    const data = await nnaModel.actualizarNna(id, req.body);
    if (!data) return responder.noEncontrado(res, "NNA");
    return responder.ok(res, data);
  } catch (error) {
    return responder.errorServidor(res, "No se pudo actualizar el NNA", error);
  }
};

const eliminarNna = async (req, res) => {
  try {
    const id = parseId(req.params.id);
    if (!id) return responder.idInvalido(res, "NNA");

    await nnaModel.eliminarNna(id);
    return responder.okMensaje(res, "NNA eliminado");
  } catch (error) {
    return responder.errorServidor(res, "No se pudo eliminar el NNA", error);
  }
};

module.exports = {
  listarNna,
  listarPendientes,
  contarPendientes,
  obtenerNnaPorId,
  crearNna,
  actualizarNna,
  eliminarNna,
};
