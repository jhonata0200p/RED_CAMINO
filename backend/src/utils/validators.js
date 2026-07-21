/**
 * validators.js — validaciones simples reutilizables en controllers.
 */

/** Convierte id de URL a número entero positivo, o null si es inválido */
function parseId(id) {
  const n = Number(id);
  return Number.isInteger(n) && n > 0 ? n : null;
}

/** true si faltan campos obligatorios en req.body (solo nivel raíz) */
function faltanCampos(body, nombres) {
  return nombres.some((nombre) => {
    const valor = body?.[nombre];
    return valor === undefined || valor === null || valor === "";
  });
}

module.exports = { parseId, faltanCampos };
