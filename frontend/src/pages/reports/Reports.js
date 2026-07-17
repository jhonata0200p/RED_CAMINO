// Importa el layout principal y componentes reutilizables.
import { DashboardLayout } from "../../components/layout/DashboardLayout.js";
import { Table } from "../../components/tables/Table.js";

// Crea la vista de reportes: historial confirmado + exportación general a Excel.
export function Reports() {

    return DashboardLayout(`

        <section class="page">

            <div class="page-header">
                <div>
                    <div class="eyebrow">Seguimiento confirmado</div>
                    <h1>Reportes</h1>
                    <p>Historial de los meses ya confirmados (con check) para cada niño o niña.</p>
                </div>
            </div>

            <div id="reportesKpi" class="kpi-grid"></div>

            <!-- ===== Exportación general (Tailwind) ===== -->
            <div class="bg-white rounded-xl border border-gray-200 p-4 mb-4">
                <div class="flex flex-wrap items-center justify-between gap-3 mb-3">
                    <div>
                        <h2 class="text-base font-semibold text-gray-800">Reporte general del sistema</h2>
                        <p class="text-sm text-gray-500">Exporta NNA y familias activas a un solo archivo Excel.</p>
                    </div>
                    <button id="btnExportarExcel" class="bg-green-600 hover:bg-green-700 text-white text-sm font-semibold rounded-lg px-4 py-2.5">
                        <i class="fa-solid fa-file-excel mr-2"></i>Descargar Reporte General (Excel)
                    </button>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div class="bg-gray-50 rounded-lg p-3">
                        <label class="text-xs font-medium text-gray-500">Estado NNA</label>
                        <select id="filtroEstadoNna" class="w-full mt-1 rounded-md border-gray-300 text-sm">
                            <option value="">Todos</option>
                            <option value="Activo">Activo</option>
                            <option value="Inactivo">Inactivo</option>
                        </select>
                    </div>
                    <div class="bg-gray-50 rounded-lg p-3">
                        <label class="text-xs font-medium text-gray-500">Colegio</label>
                        <input id="filtroColegio" type="text" placeholder="Filtrar por colegio" class="w-full mt-1 rounded-md border-gray-300 text-sm">
                    </div>
                    <div class="bg-gray-50 rounded-lg p-3">
                        <label class="text-xs font-medium text-gray-500">Código de hogar</label>
                        <input id="filtroCodigoHogar" type="text" placeholder="Ej. HOGAR-001" class="w-full mt-1 rounded-md border-gray-300 text-sm">
                    </div>
                </div>
            </div>

            ${Table({ headers: ["NNA", "Familia", "Mes", "Año", "Fecha de confirmación"], bodyId: "reportesBody" })}

        </section>

    `, "reportes");

}
