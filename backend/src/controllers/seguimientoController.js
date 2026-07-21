/**
 * seguimientoController.js — seguimiento mensual de NNA.
 * Valida req.body → llama seguimientoModel → responde con responder.*
 */
const seguimientoModel = require("../models/seguimientoModel");
const responder = require("../utils/responseHelpers");
const { parseId } = require("../utils/validators");

const listarSeguimientos = async (req, res) => {
  try {
    const data = await seguimientoModel.obtenerSeguimientos();
    return responder.ok(res, data);
  } catch (error) {
    return responder.errorServidor(res, "No se pudieron cargar los seguimientos", error);
  }
};

const listarSeguimientosPorNna = async (req, res) => {
  try {
    const nnaId = parseId(req.params.nnaId);
    if (!nnaId) return responder.idInvalido(res, "NNA");

    const data = await seguimientoModel.obtenerSeguimientosPorNna(nnaId);
    return responder.ok(res, data);
  } catch (error) {
    return responder.errorServidor(res, "No se pudieron cargar los seguimientos", error);
  }
};

const crearSeguimiento = async (req, res) => {
  try {
    if (!req.body.nnaId || !req.body.anio || !req.body.mes) {
      return responder.badRequest(res, "Faltan campos: nnaId, anio, mes");
    }
    const data = await seguimientoModel.crearSeguimiento(req.body, req.usuario?.id);
    return responder.creado(res, "Seguimiento registrado", data);
  } catch (error) {
    return responder.errorServidor(res, error.message || "No se pudo crear el seguimiento", error);
  }
};

const actualizarSeguimiento = async (req, res) => {
  try {
    const id = parseId(req.params.id);
    if (!id) return responder.idInvalido(res, "seguimiento");

    const data = await seguimientoModel.actualizarSeguimiento(id, req.body);
    if (!data) return responder.noEncontrado(res, "Seguimiento");
    return responder.ok(res, data);
  } catch (error) {
    return responder.errorServidor(res, "No se pudo actualizar el seguimiento", error);
  }
};

const eliminarSeguimiento = async (req, res) => {
  try {
    const id = parseId(req.params.id);
    if (!id) return responder.idInvalido(res, "seguimiento");

    await seguimientoModel.eliminarSeguimiento(id);
    return responder.okMensaje(res, "Seguimiento eliminado");
  } catch (error) {
    return responder.errorServidor(res, "No se pudo eliminar el seguimiento", error);
  }
};

module.exports = {
  listarSeguimientos,
  listarSeguimientosPorNna,
  crearSeguimiento,
  actualizarSeguimiento,
  eliminarSeguimiento,
};
