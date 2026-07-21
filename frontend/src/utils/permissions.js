/**
 * permissions.js — qué rutas y reportes puede ver cada rol.
 *
 * puedeAcceder(rol, ruta)     → router.js lo usa antes de mostrar una vista
 * puedeDescargarReporte(rol)  → ReportController oculta botones de Excel
 * puedeRealizarAccion(rol)    → editar/eliminar en tarjetas
 */
// Rutas permitidas por rol (MVP: admin, psicólogo, profesor)
export const permisosPorRol = {
  administrador: [
    "dashboard",
    "familias",
    "perfilFamilia",
    "nna",
    "perfilNna",
    "seguimiento",
    "reportes",
    "usuarios",
  ],
  psicologo: [
    "dashboard",
    "familias",
    "perfilFamilia",
    "reportes",
  ],
  profesor: [
    "dashboard",
    "nna",
    "perfilNna",
    "seguimiento",
    "reportes",
  ],
};

export const reportesPorRol = {
  administrador: ["hogares", "nna"],
  psicologo: ["hogares"],
  profesor: ["nna"],
};

export function puedeAcceder(rol, ruta) {
  const rutas = permisosPorRol[rol]; // ej. psicologo → ["dashboard", "familias", ...]
  if (!rutas) return false;
  return rutas.includes(ruta);
}

export function puedeDescargarReporte(rol, tipo) {
  const tipos = reportesPorRol[rol] || []; // "hogares" | "nna"
  return tipos.includes(tipo);
}

// En el MVP los 3 roles pueden editar; solo se usa si se amplía después
const accionesBloqueadasPorRol = {};

export function puedeRealizarAccion(rol, modulo, accion) {
  const bloqueos = accionesBloqueadasPorRol[rol];
  if (!bloqueos) return true;
  const delModulo = bloqueos[modulo];
  if (!delModulo) return true;
  return !delModulo.includes(accion);
}
