/**
 * catalogosController.js — GET /api/catalogos
 */
const catalogosModel = require("../models/catalogosModel");
const responder = require("../utils/responseHelpers");

const listarCatalogos = async (req, res) => {
  try {
    const data = await catalogosModel.obtenerCatalogos();
    return responder.ok(res, data);
  } catch (error) {
    return responder.errorServidor(res, "No fue posible obtener los catálogos", error);
  }
};

module.exports = { listarCatalogos };
