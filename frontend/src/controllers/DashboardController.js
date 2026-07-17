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
        <div class="bar-row">
            <div class="bar-label">${label}</div>
            <div class="bar-track"><div class="bar-fill" style="width:${(value / max) * 100}%"></div></div>
            <div class="bar-value">${value}</div>
        </div>
    `).join("") : `<p class="table-empty">Sin datos suficientes.</p>`;

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
        <div class="legend-item">
            <span class="legend-dot" style="background:${COLORES_ESTADO[estado]}"></span>
            ${estado} (${cantidad})
        </div>
    `).join("");

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

}
