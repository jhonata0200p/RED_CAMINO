/**
 * hogaresController.js — CRUD de hogares.
 * Valida req.body → llama hogaresModel → responde con responder.*
 */
const hogaresModel = require("../models/hogaresModel");
const responder = require("../utils/responseHelpers");
const { parseId } = require("../utils/validators");

const listarHogares = async (req, res) => {
  try {
    const hogares = await hogaresModel.obtenerHogares();
    return responder.ok(res, hogares);
  } catch (error) {
    return responder.errorServidor(res, "No fue posible obtener los hogares", error);
  }
};

const obtenerHogarPorId = async (req, res) => {
  try {
    const id = parseId(req.params.id);
    if (!id) return responder.idInvalido(res, "hogar");

    const hogar = await hogaresModel.obtenerHogarPorId(id);
    if (!hogar) return responder.noEncontrado(res, "Hogar");

    return responder.ok(res, hogar);
  } catch (error) {
    return responder.errorServidor(res, "No fue posible obtener el hogar", error);
  }
};

const crearHogar = async (req, res) => {
  try {
    const { paso1, jefeHogar } = req.body;

    if (!paso1?.fechaVisita || !paso1?.barrio || !paso1?.direccion) {
      return responder.badRequest(res, "Faltan campos obligatorios: fechaVisita, barrio, direccion");
    }
    if (!jefeHogar?.nombre || !jefeHogar?.numero) {
      return responder.badRequest(res, "Faltan nombre y documento del jefe de hogar");
    }

    const profesionalId = req.usuario?.id || 1;
    const nuevoHogar = await hogaresModel.crearHogar(req.body, profesionalId);

    return responder.creado(res, "Hogar creado exitosamente", nuevoHogar);
  } catch (error) {
    return responder.errorServidor(res, error.message || "No fue posible crear el hogar", error);
  }
};

const actualizarHogar = async (req, res) => {
  try {
    const id = parseId(req.params.id);
    if (!id) return responder.idInvalido(res, "hogar");

    const existe = await hogaresModel.obtenerHogarPorId(id);
    if (!existe) return responder.noEncontrado(res, "Hogar");

    const actualizado = await hogaresModel.actualizarHogar(id, req.body);
    return responder.okMensaje(res, "Hogar actualizado exitosamente", actualizado);
  } catch (error) {
    return responder.errorServidor(res, error.message || "No fue posible actualizar el hogar", error);
  }
};

const eliminarHogar = async (req, res) => {
  try {
    const id = parseId(req.params.id);
    if (!id) return responder.idInvalido(res, "hogar");

    const existe = await hogaresModel.obtenerHogarPorId(id);
    if (!existe) return responder.noEncontrado(res, "Hogar");

    await hogaresModel.eliminarHogar(id);
    return responder.okMensaje(res, "Hogar eliminado exitosamente");
  } catch (error) {
    return responder.errorServidor(res, error.message || "No fue posible eliminar el hogar", error);
  }
};

const obtenerSiguienteCodigo = async (req, res) => {
  try {
    const codigo = await hogaresModel.obtenerSiguienteCodigoHogar();
    return responder.ok(res, { codigo });
  } catch (error) {
    return responder.errorServidor(res, "No fue posible obtener el código de hogar", error);
  }
};

module.exports = {
  listarHogares,
  obtenerHogarPorId,
  crearHogar,
  actualizarHogar,
  eliminarHogar,
  obtenerSiguienteCodigo,
};
