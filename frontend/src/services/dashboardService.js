/**
 * dashboardService.js — agrega datos de hogares y NNA para el panel principal.
 * No pinta HTML; DashboardController usa estos números en KPIs y gráficos.
 */
import { apiFetch } from "./api.js";

function estadoNormalizado(nna) {
  const estado = String(nna?.estado || "Activo").toLowerCase();
  if (estado === "inactivo") return "Inactivo";
  if (estado === "egresado") return "Egresado";
  return "Activo";
}

export async function obtenerDatosDashboard() {
  const [familias, nna, pendientesResp] = await Promise.all([
    apiFetch("/hogares"),
    apiFetch("/nna"),
    apiFetch("/nna/pendientes/conteo").catch(() => ({ total: 0 })),
  ]);

  const listaFamilias = Array.isArray(familias) ? familias : [];
  const listaNna = Array.isArray(nna) ? nna : [];
  const pendientes = Number(pendientesResp?.total || 0);

  const distribucionEstados = {
    Activo: listaNna.filter((n) => estadoNormalizado(n) === "Activo").length,
    Inactivo: listaNna.filter((n) => estadoNormalizado(n) === "Inactivo").length,
    Egresado: listaNna.filter((n) => estadoNormalizado(n) === "Egresado").length,
  };

  const barrioPorFamilia = {};
  listaFamilias.forEach((f) => {
    barrioPorFamilia[f.id] = f.barrio || "Sin barrio";
  });

  const ninosPorBarrio = {};
  listaNna.forEach((n) => {
    const barrio = barrioPorFamilia[n.familiaId] || n.barrio || "Sin barrio";
    ninosPorBarrio[barrio] = (ninosPorBarrio[barrio] || 0) + 1;
  });

  return {
    totalFamilias: listaFamilias.length,
    totalNna: listaNna.length,
    pendientesConfirmacion: pendientes,
    activos: distribucionEstados.Activo,
    inactivos: distribucionEstados.Inactivo,
    egresados: distribucionEstados.Egresado,
    distribucionEstados,
    porBarrio: Object.entries(ninosPorBarrio).sort((a, b) => b[1] - a[1]),
  };
}
