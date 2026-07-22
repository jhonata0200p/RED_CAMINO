/**
 * Menu.js — filtra opciones del sidebar según permisosPorRol (permissions.js).
 */
import { permisosPorRol } from "../../utils/permissions.js";

const todasLasOpciones = [
  { ruta: "dashboard", icono: "fa-solid fa-chart-line", texto: "Panel de control" },
  { ruta: "familias", icono: "fa-solid fa-house", texto: "Familias" },
  { ruta: "nna", icono: "fa-solid fa-child", texto: "Niños, niñas y adolescentes" },
  { ruta: "seguimiento", icono: "fa-solid fa-clipboard-check", texto: "Seguimiento mensual" },
  { ruta: "reportes", icono: "fa-solid fa-chart-pie", texto: "Reportes" },
  { ruta: "usuarios", icono: "fa-solid fa-users", texto: "Administración" },
];

export function Menu(rol) {
  const rutasPermitidas = permisosPorRol[rol] || [];
  return todasLasOpciones.filter(opcion => rutasPermitidas.includes(opcion.ruta));
}
