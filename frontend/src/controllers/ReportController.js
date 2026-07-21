<<<<<<< HEAD
/**
 * ReportController — descarga de reportes Excel.
 *
 * PUNTO DE ENTRADA: iniciarReportes() (router.js → ruta /reportes)
 * Solo muestra botones de exportar si el rol tiene permiso (permissions.js).
 */
import { obtenerNna, obtenerNnaPorId } from "../services/childService.js";
import { obtenerFamilias, obtenerHogarPorId } from "../services/familyService.js";
import { obtenerSeguimientosPorNna } from "../services/followUpService.js";
import { mostrarError, mostrarExito, mostrarAdvertencia } from "../utils/alert.js";
import { obtenerRol } from "../store/session.js";
import { puedeDescargarReporte } from "../utils/permissions.js";
import {
  fechaExcel,
  siNoExcel,
  filasDesdeChecklist,
  descargarExcel,
} from "../utils/excelHelpers.js";
import { getCampo } from "../utils/domHelpers.js";

function configurarBotonReporte(id, rol, tipoReporte, accion) {
  const boton = getCampo(id);
  if (!boton) return;
  boton.hidden = !puedeDescargarReporte(rol, tipoReporte);
  if (!boton.hidden) boton.onclick = accion;
}

async function obtenerDetalleSeguro(id, fetchDetalle, fallback) {
  return (await fetchDetalle(id).catch(() => null)) || fallback;
}

export async function iniciarReportes() {
  const rol = obtenerRol();

  configurarBotonReporte("btnExportarHogares", rol, "hogares", exportarHogaresExcel);
  configurarBotonReporte("btnExportarNna", rol, "nna", exportarNnaExcel);
}

function puedeExportar(tipo) {
  if (puedeDescargarReporte(obtenerRol(), tipo)) return true;
  mostrarAdvertencia("No tiene permisos para descargar este reporte.");
  return false;
}

async function exportarHogaresExcel() {
  if (!puedeExportar("hogares")) return;

  try {
    const familias = await obtenerFamilias();
    if (!Array.isArray(familias) || familias.length === 0) {
      mostrarError("No hay hogares para exportar.");
      return;
    }

    const hojas = {
      resumen: [],
      integrantes: [],
      nna: [],
      servicios: [],
      factores: [],
      riesgos: [],
      vulnerabilidades: [],
      prioridades: [],
    };

    for (const resumen of familias) {
      try {
        const hogar = await obtenerDetalleSeguro(resumen.id, obtenerHogarPorId, resumen);
        agregarFilasHogar(hojas, hogar, resumen);
      } catch (error) {
        console.warn(`No se pudo cargar hogar ${resumen.id}:`, error);
        hojas.resumen.push(filaResumenBasica(resumen));
      }
    }

    descargarExcel("Hogares_Red_Camino.xlsx", [
      { nombre: "Hogares", filas: hojas.resumen, obligatoria: true },
      { nombre: "Integrantes", filas: hojas.integrantes },
      { nombre: "NNA hogar", filas: hojas.nna },
      { nombre: "Servicios", filas: hojas.servicios },
      { nombre: "Factores", filas: hojas.factores },
      { nombre: "Riesgos", filas: hojas.riesgos },
      { nombre: "Vulnerabilidades", filas: hojas.vulnerabilidades },
      { nombre: "Prioridades", filas: hojas.prioridades },
    ]);

    mostrarExito("Reporte de hogares generado correctamente.");
  } catch (error) {
    console.error("Error al exportar hogares:", error);
    mostrarError("No se pudo generar el reporte de hogares.");
  }
}

function agregarFilasHogar(hojas, hogar, resumen) {
  const codigo = hogar.codigo || resumen.codigo || "—";
  const jefe = hogar.jefeHogar || {};
  const vivienda = hogar.vivienda || {};
  const nnaLista = hogar.nna || [];

  hojas.resumen.push({
    Código: codigo,
    "Jefe de hogar": jefe.nombre || jefe.nombres || resumen.jefe_hogar || "—",
    "Doc jefe": jefe.numero || jefe.numero_documento || "—",
    "Tipo doc jefe": jefe.tipo_documento || "—",
    "Fecha nacimiento jefe": fechaExcel(jefe.fechaNacimiento),
    "Sexo jefe": jefe.sexo_nombre || "—",
    "Nacionalidad jefe": jefe.nacionalidad_nombre || "—",
    "Nivel educativo jefe": jefe.nivel_educativo || "—",
    "Ocupación jefe": jefe.ocupacion_nombre || "—",
    "Tipo trabajo jefe": jefe.tipo_trabajo || "—",
    "Estado civil jefe": jefe.estado_civil || "—",
    Barrio: vivienda.barrio || hogar.barrio || resumen.barrio || "—",
    Dirección: vivienda.direccion || hogar.direccion || resumen.direccion || "—",
    Referencia: vivienda.otra_referencia || "—",
    Departamento: vivienda.departamento || "—",
    Municipio: vivienda.municipio || "—",
    Sector: vivienda.sector_zona || "—",
    "Material vivienda": vivienda.material_pared || "—",
    "Situación vivienda": vivienda.condicion_normalizacion || "—",
    "Condición general vivienda": vivienda.condicion_general || "—",
    "Cuartos totales": vivienda.total_cuartos ?? "—",
    "Cuartos dormir": vivienda.cuartos_dormir ?? "—",
    "Tiempo vivienda": hogar.tiempo_vivienda || "—",
    Teléfono: jefe.celular || resumen.telefono || "—",
    Profesional: hogar.profesional || "—",
    "Fecha visita": fechaExcel(hogar.fecha_visita),
    Vulnerabilidades: (hogar.vulnerabilidades || []).join("; ") || "—",
    Prioridades: (hogar.prioridades || []).join("; ") || "—",
    "Integrantes adultos": (hogar.integrantes || []).length,
    "NNA en línea base": nnaLista.filter((n) => n.enLineaBase).length,
    "NNA pendientes confirmación": nnaLista.filter((n) => n.pendienteConfirmacion && !n.enLineaBase).length,
    "Personas en hogar": hogar.personas_hogar ?? "—",
    "Personas menores": hogar.personas_menores ?? "—",
    Observaciones: hogar.observaciones || "—",
  });

  (hogar.integrantes || []).forEach((i, idx) => {
    hojas.integrantes.push({
      "Código hogar": codigo,
      "Ítem integrante": idx + 1,
      Nombre: i.nombre || "—",
      "Fecha nacimiento": fechaExcel(i.fechaNacimiento),
      Edad: i.edad ?? "—",
      Sexo: i.sexo || "—",
      Parentesco: i.parentesco || "—",
      Origen: i.origen || "—",
      Actividad: i.actividad || "—",
    });
  });

  nnaLista.forEach((n, idx) => {
    hojas.nna.push({
      "Código hogar": codigo,
      "Ítem NNA": idx + 1,
      Nombre: n.nombre || "—",
      "Fecha nacimiento": fechaExcel(n.fechaNacimiento),
      Edad: n.edad ?? "—",
      Sexo: n.sexo || "—",
      Documento: n.numero_documento || n.documento || "—",
      "Tipo documento": n.tipoDocumento || "—",
      "Estado escolar": n.estado_escolar || "—",
      Grado: n.grado || "—",
      Discapacidad: n.discapacidad || "—",
      "Pendiente confirmación": siNoExcel(n.pendienteConfirmacion),
      "En línea base": siNoExcel(n.enLineaBase),
      Observación: n.observacion || "—",
    });
  });

  hojas.servicios.push(...filasDesdeChecklist(codigo, hogar.servicios, "Servicio"));
  hojas.factores.push(...filasDesdeChecklist(codigo, hogar.factores, "Factor"));
  hojas.riesgos.push(...filasDesdeChecklist(codigo, hogar.riesgos, "Riesgo"));

  (hogar.vulnerabilidades || []).forEach((v) => {
    hojas.vulnerabilidades.push({ "Código hogar": codigo, Vulnerabilidad: v });
  });
  (hogar.prioridades || []).forEach((p) => {
    hojas.prioridades.push({ "Código hogar": codigo, Prioridad: p });
  });
}

function filaResumenBasica(resumen) {
  return {
    Código: resumen.codigo || "—",
    "Jefe de hogar": resumen.jefe_hogar || resumen.responsable || "—",
    Barrio: resumen.barrio || "—",
    Dirección: resumen.direccion || "—",
    Teléfono: resumen.telefono || "—",
    "Personas en hogar": resumen.personas_hogar ?? "—",
    "Personas menores": resumen.personas_menores ?? "—",
  };
}

function filaNnaResumen(d, codigo) {
  return {
    Código: codigo,
    Nombre: d.nombre || "—",
    Documento: d.documento || "—",
    Edad: d.edad ?? "—",
    "Fecha nacimiento": fechaExcel(d.fechaNacimiento),
    Sexo: d.sexo || "—",
    Nacionalidad: d.nacionalidad || "—",
    "Tipo documento": d.tipoDocumento || "—",
    Estado: d.estado || "—",
    "Código hogar": d.codigoHogar || "—",
    Hogar: d.nombreHogar || "—",
    Barrio: d.barrio || "—",
    "Estado FSCM": d.academico?.estadoInicialFscm || "—",
    "Estado 2026": d.academico?.estadoInicial2026 || "—",
    Grado: d.academico?.gradoAspirante || d.grado || "—",
    Jornada: d.academico?.jornada || "—",
    "Año ingreso": d.academico?.anioIngreso || "—",
    Colegio: d.colegio || "—",
    Discapacidad: d.salud?.discapacidad || "—",
    Neurodivergencia: d.salud?.neurodivergencia || "—",
    Diagnóstico: d.salud?.tieneDiagnostico || "—",
    "Observación académica": d.observacionAcademica || "—",
  };
}

function agregarFilasServiciosNna(servicios, d, codigo) {
  Object.entries(d.servicios || {}).forEach(([nombre, requerido]) => {
    servicios.push({
      "Código NNA": codigo,
      NNA: d.nombre || "—",
      Servicio: nombre,
      Requerido: siNoExcel(requerido),
    });
  });
}

function agregarFilasSeguimientosNna(filas, segs, d, codigo) {
  segs.forEach((s) => {
    filas.push({
      "Código NNA": codigo,
      NNA: d.nombre || "—",
      Año: s.anio || "—",
      Mes: s.mesNombre || s.mes || "—",
      "Estado mes": s.estadoMes || "—",
      Colegio: s.colegioActual || "—",
      Grado: s.gradoActual || "—",
      Profesional: s.profesional || "—",
      "Fecha registro": s.fecha || "—",
    });
  });
}

async function exportarNnaExcel() {
  if (!puedeExportar("nna")) return;

  try {
    const nnaList = await obtenerNna();
    if (!Array.isArray(nnaList) || nnaList.length === 0) {
      mostrarError("No hay NNA de línea base para exportar.");
      return;
    }

    const resumen = [];
    const servicios = [];
    const seguimientos = [];

    for (const n of nnaList) {
      const d = await obtenerDetalleSeguro(n.id, obtenerNnaPorId, n);
      const codigo = d.codigo || d.id;

      resumen.push(filaNnaResumen(d, codigo));

      agregarFilasServiciosNna(servicios, d, codigo);

      const segs = await obtenerSeguimientosPorNna(n.id).catch(() => []);
      agregarFilasSeguimientosNna(seguimientos, Array.isArray(segs) ? segs : [], d, codigo);
    }

    descargarExcel("NNA_Linea_Base_Red_Camino.xlsx", [
      { nombre: "NNA linea base", filas: resumen, obligatoria: true },
      { nombre: "Servicios NNA", filas: servicios },
      { nombre: "Seguimientos NNA", filas: seguimientos },
    ]);

    mostrarExito("Reporte de NNA generado correctamente.");
  } catch (error) {
    console.error("Error al exportar NNA:", error);
    mostrarError("No se pudo generar el reporte de NNA.");
  }
=======
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

>>>>>>> 280df765e7f5535d76cdf41e3963a143aaf6b39a
}
