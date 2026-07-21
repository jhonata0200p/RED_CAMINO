/**
 * Reports.js — HTML de exportación Excel.
 * ReportController.iniciarReportes() conecta los botones según permisos del rol.
 */
// Importa el layout principal y componentes reutilizables.
import { DashboardLayout } from "../../components/layout/DashboardLayout.js";

// Crea la vista de reportes con exportación a Excel.
export function Reports() {

    return DashboardLayout(`

        <section class="page">

            <div class="page-header">
                <div>
                    <div class="eyebrow">Exportación</div>
                    <h1>Reportes</h1>
                    <p>Descarga la información de hogares y NNA de línea base en Excel.</p>
                </div>
            </div>

            <div class="bg-white rounded-xl border border-gray-200 p-4 mb-4">
                <div class="flex flex-wrap gap-3">
                    <button id="btnExportarHogares" class="bg-green-600 hover:bg-green-700 text-white text-sm font-semibold rounded-lg px-4 py-2.5">
                        <i class="fa-solid fa-file-excel mr-2"></i>Descargar hogares (Excel)
                    </button>
                    <button id="btnExportarNna" class="bg-green-600 hover:bg-green-700 text-white text-sm font-semibold rounded-lg px-4 py-2.5">
                        <i class="fa-solid fa-file-excel mr-2"></i>Descargar NNA línea base (Excel)
                    </button>
                </div>
            </div>

        </section>

    `, "reportes");

}
