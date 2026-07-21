<<<<<<< HEAD
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
=======
// Controlador del dashboard principal.
import { obtenerDatosDashboard } from "../services/dashboardService.js";
import { KpiCard } from "../components/cards/KpiCard.js";
import { mostrarError } from "../utils/alert.js";

export async function iniciarDashboard() {

    try {

        const d = await obtenerDatosDashboard();
        renderizarKpis(d);
        renderizarBarras("chartBarrio", d.porBarrio);
        renderizarDonutEstado(d.distribucionEstados);
        renderizarIngresos(d);

    } catch (error) {

        console.error("Error al cargar el dashboard:", error);
        mostrarError("No se pudieron cargar las métricas del dashboard.");

    }

}

function renderizarKpis(d) {

    document.getElementById("dashboardMetrics").innerHTML =
        KpiCard("Familias registradas", d.totalFamilias, "fa-solid fa-house", "#25506A") +
        KpiCard("Total de niños con discapacidad", d.totalConDiscapacidad, "fa-solid fa-hand-holding-heart", "#3F8F5F") +
        KpiCard("NNA registrados", d.totalNna, "fa-solid fa-child", "#DD6B3E") +
        KpiCard("Pendientes por confirmar (mes)", Math.max(d.pendientesMes, 0), "fa-solid fa-clipboard-check", "#C4922E");

}

// Formatea un número como moneda (pesos), reutilizado por las tarjetas de ingresos.
function formatearMoneda(valor) {

    return `$${Math.round(valor || 0).toLocaleString("es-CO")}`;

}

// Renderiza una gráfica de barras horizontal genérica a partir de pares [etiqueta, valor].
// La usan tanto "Niños por barrio" como "Ingresos por rango".
function renderizarBarras(contenedorId, datos) {

    const contenedor = document.getElementById(contenedorId);

    if (!contenedor) return;

    const max = Math.max(...datos.map(([, v]) => v), 1);

    contenedor.innerHTML = datos.length ? datos.map(([label, value]) => `
>>>>>>> 280df765e7f5535d76cdf41e3963a143aaf6b39a
        <div class="bar-row">
            <div class="bar-label">${label}</div>
            <div class="bar-track"><div class="bar-fill" style="width:${(value / max) * 100}%"></div></div>
            <div class="bar-value">${value}</div>
        </div>
    `).join("") : `<p class="table-empty">Sin datos suficientes.</p>`;
<<<<<<< HEAD
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
=======

}

// Colores fijos por estado, para que la leyenda y el gráfico siempre coincidan.
const COLORES_ESTADO = {
    "Activo": "var(--success)",
    "Inasistente": "var(--warning)",
    "Retirado": "var(--danger)",
    "Egresado": "var(--primary-light)"
};

// Recibe un objeto { Activo: n, Inasistente: n, Retirado: n, Egresado: n }
// y dibuja un donut (conic-gradient) con un segmento por estado.
function renderizarDonutEstado(distribucionEstados) {

    const estados = Object.entries(distribucionEstados);
    const total = estados.reduce((suma, [, cantidad]) => suma + cantidad, 0) || 1;

    let acumulado = 0;
    const segmentos = estados.map(([estado, cantidad]) => {
        const inicio = (acumulado / total) * 100;
        acumulado += cantidad;
        const fin = (acumulado / total) * 100;
        return `${COLORES_ESTADO[estado]} ${inicio}% ${fin}%`;
    });

    const leyenda = estados.map(([estado, cantidad]) => `
>>>>>>> 280df765e7f5535d76cdf41e3963a143aaf6b39a
        <div class="legend-item">
            <span class="legend-dot" style="background:${COLORES_ESTADO[estado]}"></span>
            ${estado} (${cantidad})
        </div>
    `).join("");

<<<<<<< HEAD
  getCampo("chartEstado").innerHTML = `
        <div class="donut" style="background:conic-gradient(${segmentos.join(", ")})"></div>
        <div class="legend">${leyenda}</div>
    `;
=======
    document.getElementById("chartEstado").innerHTML = `
        <div class="donut" style="background:conic-gradient(${segmentos.join(", ")})"></div>
        <div class="legend">${leyenda}</div>
    `;

}

// Renderiza la sección "Ingresos de las Familias": total, promedio y distribución por rangos.
function renderizarIngresos(d) {

    const contenedorKpis = document.getElementById("ingresosMetrics");

    if (contenedorKpis) {

        contenedorKpis.innerHTML =
            KpiCard("Total de ingresos", formatearMoneda(d.totalIngresos), "fa-solid fa-sack-dollar", "#3F8F5F") +
            KpiCard("Promedio de ingresos", formatearMoneda(d.promedioIngresos), "fa-solid fa-coins", "#25506A");

    }

    renderizarBarras("chartIngresosRango", d.rangosIngresos);

>>>>>>> 280df765e7f5535d76cdf41e3963a143aaf6b39a
}
