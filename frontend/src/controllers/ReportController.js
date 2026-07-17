// Controlador de reportes: muestra el historial de meses ya confirmados
// (los NNA que el admin/equipo ya marcó con check en Seguimiento).
import { obtenerSeguimientos } from "../services/followUpService.js";
import { obtenerNna } from "../services/childService.js";
import { obtenerFamilias } from "../services/familyService.js";
import { KpiCard } from "../components/cards/KpiCard.js";
import { mostrarError, mostrarExito } from "../utils/alert.js";

const MESES = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];

export async function iniciarReportes() {

    try {

        const [seguimientos, nnaList, familias] = await Promise.all([
            obtenerSeguimientos(), obtenerNna(), obtenerFamilias()
        ]);

        const nombreNna = id => nnaList.find(n => String(n.id) === String(id))?.nombre || "—";
        const nombreFamilia = nnaId => {
            const nna = nnaList.find(n => String(n.id) === String(nnaId));
            const fam = familias.find(f => String(f.id) === String(nna?.familiaId));
            return fam ? fam.responsable : "—";
        };

        document.getElementById("reportesKpi").innerHTML =
            KpiCard("Confirmaciones registradas", seguimientos.length, "fa-solid fa-clipboard-check", "#3F8F5F") +
            KpiCard("NNA activos", nnaList.filter(n => n.estado !== "Inactivo").length, "fa-solid fa-child", "#25506A");

        const cuerpo = document.getElementById("reportesBody");

        cuerpo.innerHTML = seguimientos.length === 0
            ? `<tr><td colspan="5" class="table-empty">Todavía no hay meses confirmados.</td></tr>`
            : [...seguimientos].reverse().map(s => `
                <tr>
                    <td><b>${nombreNna(s.nnaId)}</b></td>
                    <td>${nombreFamilia(s.nnaId)}</td>
                    <td>${MESES[s.mes - 1] || s.mes}</td>
                    <td>${s.anio}</td>
                    <td>${s.fecha}</td>
                </tr>
            `).join("");

        const botonExportar = document.getElementById("btnExportarExcel");

        if (botonExportar) {
            botonExportar.onclick = () => exportDataToExcel(nnaList, familias);
        }

    } catch (error) {

        console.error("Error al cargar reportes:", error);
        mostrarError("No se pudieron cargar los reportes.");

    }

}

// =====================================================================================
// EXPORTACIÓN A EXCEL (SheetJS) — botón "Descargar Reporte General (Excel)"
// Toma los NNA y familias ya cargados (simula la llamada a los servicios), aplica
// los filtros del formulario y arma columnas legibles antes de generar el archivo.
// =====================================================================================
function exportDataToExcel(nnaList, familias) {

    const estadoFiltro = document.getElementById("filtroEstadoNna")?.value || "";
    const colegioFiltro = (document.getElementById("filtroColegio")?.value || "").toLowerCase();
    const hogarFiltro = (document.getElementById("filtroCodigoHogar")?.value || "").toLowerCase();

    const datosMapeados = nnaList
        .map(nna => {
            const familia = familias.find(f => String(f.id) === String(nna.familiaId));
            return {
                nna, familia,
                "Código NNA": nna.id,
                "Nombre Completo": nna.nombre || "—",
                "Estado": nna.estado || "—",
                "Grado": nna.grado || "—",
                "Colegio": nna.colegio || "—",
                "Código Hogar": familia?.codigoHogar || familia?.id || "—"
            };
        })
        .filter(fila =>
            (!estadoFiltro || fila.nna.estado === estadoFiltro) &&
            (!colegioFiltro || String(fila.nna.colegio || "").toLowerCase().includes(colegioFiltro)) &&
            (!hogarFiltro || String(fila["Código Hogar"]).toLowerCase().includes(hogarFiltro))
        )
        .map(({ nna, familia, ...columnas }) => columnas);

    if (datosMapeados.length === 0) {
        mostrarError("No hay registros que coincidan con los filtros seleccionados.");
        return;
    }

    const worksheet = XLSX.utils.json_to_sheet(datosMapeados);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Reporte NNA");
    XLSX.writeFile(workbook, "Reporte_General_Camino_Maria.xlsx");

    mostrarExito("Reporte generado y descargado correctamente.");

}
