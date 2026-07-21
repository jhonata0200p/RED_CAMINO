/**
 * models/nna/ — módulo de NNA (API pública).
 *
 * Para exponer:
 *   nnaRead.js  → listar, perfil, pendientes
 *   nnaWrite.js → crear, actualizar, eliminar
 *   mappers.js  → fila SQL → JSON del frontend
 *
 * El controller sigue haciendo: require("../models/nnaModel")
 */
const {
  obtenerNna,
  obtenerNnaPorId,
  obtenerPendientesConfirmacion,
  contarPendientesConfirmacion,
} = require("./nnaRead");
const { crearNna, actualizarNna, eliminarNna } = require("./nnaWrite");

module.exports = {
  obtenerNna,
  obtenerNnaPorId,
  obtenerPendientesConfirmacion,
  contarPendientesConfirmacion,
  crearNna,
  actualizarNna,
  eliminarNna,
};
