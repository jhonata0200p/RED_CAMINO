/**
 * Dashboard.js — HTML del panel principal (#dashboardMetrics, gráficos).
 * Datos: DashboardController.iniciarDashboard()
 */
// Importa el layout principal del panel.
import { DashboardLayout } from "../../components/layout/DashboardLayout.js";
import { usuarioActual } from "../../store/session.js";

// Crea la vista del dashboard.
export function Dashboard() {

    const usuario = usuarioActual();

    return DashboardLayout(`

        <section class="page">

            <div class="page-header">
                <div>
                    <div class="eyebrow">Vista general</div>
                    <h1>Bienvenido, ${usuario?.nombre || "Usuario"}</h1>
                    <p>Indicadores clave de la fundación, calculados en tiempo real.</p>
                </div>
            </div>

            <div id="dashboardMetrics" class="kpi-grid"></div>

            <div class="grid-2">
                <div class="panel">
                    <div class="panel-title">Niños por barrio</div>
                    <div id="chartBarrio"></div>
                </div>
                <div class="panel">
                    <div class="panel-title">Distribución de estados</div>
                    <div id="chartEstado" class="donut-wrap"></div>
                </div>
            </div>

        </section>

    `);

}
