/**
 * dbHelpers.js — helpers para convertir datos del formulario antes del SQL.
 */

/** "" o undefined → null; número válido → entero (para foreign keys) */
function idONull(valor) {
  if (valor === undefined || valor === null || valor === "") return null;
  const n = Number(valor);
  return Number.isNaN(n) ? null : n;
}

/** Fecha YYYY-MM-DD; si falta, estima desde edad o usa default */
function fechaNacimientoSegura(valor, edad) {
  if (valor) return String(valor).split("T")[0];
  if (edad) {
    return `${new Date().getFullYear() - parseInt(edad, 10)}-01-01`;
  }
  return "2000-01-01";
}

/** Calcula edad en años desde una fecha */
function edadDesdeFecha(fecha) {
  if (!fecha) return null;
  const f = new Date(String(fecha).split("T")[0] + "T12:00:00");
  if (Number.isNaN(f.getTime())) return null;
  const hoy = new Date();
  let edad = hoy.getFullYear() - f.getFullYear();
  if (
    hoy.getMonth() < f.getMonth() ||
    (hoy.getMonth() === f.getMonth() && hoy.getDate() < f.getDate())
  ) {
    edad -= 1;
  }
  return edad;
}

module.exports = { idONull, fechaNacimientoSegura, edadDesdeFecha };
