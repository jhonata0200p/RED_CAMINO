/**
 * DashboardController.js — KPIs y gráficos del panel principal.
 */
import { obtenerDatosDashboard } from "../services/dashboardService.js";
import { KpiCard } from "../components/cards/KpiCard.js";
import { mostrarError } from "../utils/alert.js";
import { APP_EVENTS } from "../utils/appEvents.js";
import { getCampo } from "../utils/domHelpers.js";

let escuchandoSeguimientoDashboard = false;

async function refrescarDashboard({ incluirBarras = false } = {}) {
  const datos = await obtenerDatosDashboard(); // agrega hogares + NNA en backend
  renderizarKpis(datos);
  renderizarDonutEstado(datos.distribucionEstados);
  if (incluirBarras) {
    renderizarBarras("chartBarrio", datos.porBarrio);
  }
}

function registrarSincronizacionDashboard() {
  if (escuchandoSeguimientoDashboard) return;
  escuchandoSeguimientoDashboard = true;

  document.addEventListener(APP_EVENTS.SEGUIMIENTO_ACTUALIZADO, async () => {
    if (!getCampo("dashboardMetrics")) return; // no estamos en dashboard

    try {
      await refrescarDashboard(); // recalcula KPIs sin recargar página
    } catch (error) {
      console.error("Error al sincronizar el dashboard:", error);
    }
  });
}

export async function iniciarDashboard() {
  try {
    registrarSincronizacionDashboard();
    await refrescarDashboard({ incluirBarras: true });
  } catch (error) {
    console.error("Error al cargar el dashboard:", error);
    mostrarError("No se pudieron cargar las métricas del dashboard.");
  }
}

function renderizarKpis(d) {
  getCampo("dashboardMetrics").innerHTML =
    KpiCard("Familias registradas", d.totalFamilias, "fa-solid fa-house", "#25506A") +
    KpiCard("NNA línea base", d.totalNna, "fa-solid fa-child", "#DD6B3E") +
    KpiCard("Pendientes por confirmar", Math.max(d.pendientesConfirmacion, 0), "fa-solid fa-clipboard-check", "#C4922E");
}

function renderizarBarras(contenedorId, datos) {
  const contenedor = getCampo(contenedorId);
  const lista = Array.isArray(datos) ? datos : []; // [[barrio, cantidad], ...]

  if (!contenedor) return;

  const max = Math.max(...lista.map(([, v]) => v), 1); // escala relativa al máximo

  contenedor.innerHTML = lista.length ? lista.map(([label, value]) => `
        <div class="bar-row">
            <div class="bar-label">${label}</div>
            <div class="bar-track"><div class="bar-fill" style="width:${(value / max) * 100}%"></div></div>
            <div class="bar-value">${value}</div>
        </div>
    `).join("") : `<p class="table-empty">Sin datos suficientes.</p>`;
}

const COLORES_ESTADO = {
  "Activo": "var(--success)",
  "Inactivo": "var(--warning)",
  "Egresado": "var(--primary-light)"
};

const ESTADOS_DONUT = ["Activo", "Inactivo", "Egresado"];

function renderizarDonutEstado(distribucionEstados) {
  const estados = ESTADOS_DONUT.map((estado) => [
    estado,
    Number(distribucionEstados?.[estado] || 0),
  ]);

  const total = estados.reduce((suma, [, cantidad]) => suma + cantidad, 0) || 1;

  let acumulado = 0;
  // conic-gradient: cada segmento es un arco proporcional a la cantidad
  const segmentos = estados.map(([estado, cantidad]) => {
    const inicio = (acumulado / total) * 100;
    acumulado += cantidad;
    const fin = (acumulado / total) * 100;
    return `${COLORES_ESTADO[estado]} ${inicio}% ${fin}%`;
  });

  const leyenda = estados.map(([estado, cantidad]) => `
        <div class="legend-item">
            <span class="legend-dot" style="background:${COLORES_ESTADO[estado]}"></span>
            ${estado} (${cantidad})
        </div>
    `).join("");

  getCampo("chartEstado").innerHTML = `
        <div class="donut" style="background:conic-gradient(${segmentos.join(", ")})"></div>
        <div class="legend">${leyenda}</div>
    `;
}
