/**
 * models/hogares/ — módulo de hogares (API pública).
 *
 * Para exponer:
 *   hogaresRead.js   → listar y ver perfil
 *   hogaresWrite.js  → crear, actualizar, eliminar
 *   integrantes.js   → insertar adultos / NNA
 *   vivienda.js      → servicios, factores, riesgos, código HOGAR-xxx
 *   mappers.js       → filas SQL → JSON del frontend
 *
 * El controller sigue haciendo: require("../models/hogaresModel")
 */
const { obtenerHogares, obtenerHogarPorId } = require("./hogaresRead");
const {
  crearHogar,
  actualizarHogar,
  eliminarHogar,
  obtenerSiguienteCodigoHogar,
} = require("./hogaresWrite");

module.exports = {
  obtenerHogares,
  obtenerHogarPorId,
  crearHogar,
  actualizarHogar,
  eliminarHogar,
  obtenerSiguienteCodigoHogar,
};
