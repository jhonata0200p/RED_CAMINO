/**
 * ChildProfile — perfil detallado de un NNA (ver, editar, eliminar).
 *
 * PUNTO DE ENTRADA: iniciarEditarNna() (router.js → ruta /nna/:id)
 *
 * Tiene dos modos: vista (solo lectura) y edición (formulario).
 * También muestra el historial de seguimientos mensuales del NNA.
 */
import { DashboardLayout } from "../../components/layout/DashboardLayout.js";
import { obtenerNnaPorId, actualizarNna, eliminarNna } from "../../services/childService.js";
import { obtenerFamilias } from "../../services/familyService.js";
import { obtenerSeguimientosPorNna } from "../../services/followUpService.js";
import { obtenerCatalogos } from "../../services/catalogService.js";
import { obtenerRutaId, navegar } from "../../router/router.js";
import { mostrarExito, mostrarError, mostrarAdvertencia, mostrarInfo } from "../../utils/alert.js";
import { calcularEdad, formatearFecha } from "../../utils/helpers.js";
import { llenarSelect } from "../../utils/catalogHelpers.js";
import { APP_EVENTS } from "../../utils/appEvents.js";
import {
    getCampo,
    setValorCampo,
    getValorCampo,
    getCheckCampo,
    setCheckCampo,
    agregarListener,
} from "../../utils/domHelpers.js";
import { campoPerfil, badgeEstadoHtml, textoMostrado } from "../../utils/renderHelpers.js";
import { SERVICIOS_NNA } from "../../constants/serviciosNna.js";

export function ChildProfile() {
    return DashboardLayout(`
        <section class="page">
            <div id="perfil-nna-container" class="max-w-5xl mx-auto"></div>
        </section>
    `, "nna");
}

let nnaActual = null;
let familiasCache = [];
let tabActiva = "basicos";
let seguimientosCache = null;
let catalogosEdicion = null;
let escuchandoSeguimiento = false;

// ─── Helpers: validación, servicios y payload de edición ───

function sexoIdDesdeNna(n) {
    return String(
        n.sexoId || (n.sexo === "Masculino" ? "1" : n.sexo === "Femenino" ? "2" : ""),
    );
}

function validarFormularioEdicionNna({ familiaId, nombre, documento, fechaNacimiento }) {
    if (!familiaId) {
        mostrarAdvertencia("Seleccione el hogar al que pertenece el NNA.");
        return false;
    }
    if (!nombre || !documento) {
        mostrarAdvertencia("Complete el nombre y el número de documento del NNA.");
        return false;
    }
    if (!fechaNacimiento) {
        mostrarAdvertencia("Seleccione la fecha de nacimiento del NNA.");
        return false;
    }
    return true;
}

function leerServiciosDesdeFormulario() {
    return SERVICIOS_NNA.reduce((servicios, { clave, id }) => {
        servicios[clave] = getCheckCampo(id);
        return servicios;
    }, {});
}

function marcarServiciosEnFormulario(servicios = {}) {
    SERVICIOS_NNA.forEach(({ clave, id }) => setCheckCampo(id, servicios[clave]));
}

function construirPayloadNnaActualizado({ familiaId, nombre, documento, fechaNacimiento }) {
    return {
        ...nnaActual,
        familiaId,
        nombre,
        sexo: getValorCampo("sexoNna"),
        nacionalidad: getValorCampo("nacionalidadNna"),
        tipoDocumento: getValorCampo("tipoDocumentoNna"),
        documento,
        fechaNacimiento,
        edad: getValorCampo("edadNna"),
        grado: getValorCampo("gradoAspirante"),
        academico: {
            estadoInicialFscm: getValorCampo("estadoInicialFscm"),
            estadoInicial2026: getValorCampo("estadoInicial2026"),
            gradoAspirante: getValorCampo("gradoAspirante"),
            jornada: getValorCampo("jornadaNna"),
            anioIngreso: getValorCampo("anioIngreso"),
        },
        salud: {
            discapacidad: getValorCampo("discapacidadNna"),
            neurodivergencia: getValorCampo("neurodivergenciaNna"),
            tieneDiagnostico: getValorCampo("tieneDiagnosticoNna"),
        },
        servicios: leerServiciosDesdeFormulario(),
        observacionAcademica: getValorCampo("observacionAcademicaNna"),
    };
}

function registrarSincronizacionSeguimiento() {
    if (escuchandoSeguimiento) return;
    escuchandoSeguimiento = true;

    document.addEventListener(APP_EVENTS.SEGUIMIENTO_ACTUALIZADO, async (evento) => {
        if (!nnaActual || !getCampo("perfil-nna-container")) return;

        const { nnaId } = evento.detail || {};
        if (nnaId && String(nnaId) !== String(nnaActual.id)) return;

        seguimientosCache = null;
        try {
            nnaActual = await obtenerNnaPorId(nnaActual.id);
            renderizarPerfil();
        } catch (error) {
            console.error("Error al sincronizar el perfil del NNA:", error);
        }
    });
}

// ─── PUNTO DE ENTRADA — la llama router.js con el id de la URL ───
export async function iniciarEditarNna() {
    const id = obtenerRutaId(); // id pasado en navegar("perfilNna", id)

    if (!id) {
        mostrarError("No se encontró el NNA que desea ver.");
        navegar("nna");
        return;
    }

    try {
        const [nna, familias] = await Promise.all([obtenerNnaPorId(id), obtenerFamilias()]);
        nnaActual = nna;
        familiasCache = familias;
        tabActiva = "basicos";
        seguimientosCache = null;
        registrarSincronizacionSeguimiento();
        renderizarPerfil(); // modo lectura con pestañas
    } catch (error) {
        console.error("Error al cargar el NNA:", error);
        mostrarError("No se pudo cargar la información del NNA.");
    }
}

function valor(v, sufijo = "") {
    return textoMostrado(v, sufijo);
}

function campo(etiqueta, val) {
    return campoPerfil(etiqueta, val);
}

function badgeEstado(estado) {
    return badgeEstadoHtml(estado);
}

function nombreFamiliaActual() {
    if (nnaActual?.codigoHogar || nnaActual?.nombreHogar) {
        const codigo = nnaActual.codigoHogar || "";
        const nombre = nnaActual.nombreHogar || "";
        return [codigo, nombre].filter(Boolean).join(" — ") || "Sin familia";
    }
    const familia = familiasCache.find(f => String(f.id) === String(nnaActual.familiaId));
    if (!familia) return "Sin familia";
    const codigo = familia.codigo || "";
    const nombre = familia.responsable || familia.jefeHogar?.nombre || "Hogar sin nombre";
    return [codigo, nombre].filter(Boolean).join(" — ");
}

const TABS = [
    { id: "basicos", label: "Datos básicos" },
    { id: "academico", label: "Académico" },
    { id: "salud", label: "Salud" },
    { id: "servicios", label: "Servicios" },
    { id: "seguimiento", label: "Seguimiento" },
    { id: "observaciones", label: "Observaciones" }
];

function contenidoTab(id) {
    const n = nnaActual;

    if (id === "basicos") return `
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            ${campo("Código NNA", n.codigo || n.id)}
            ${campo("Nombre completo", n.nombre)}
            ${campo("Hogar", nombreFamiliaActual())}
            ${campo("Sexo", n.sexo)}
            ${campo("Nacionalidad", n.nacionalidad)}
            ${campo("Tipo de documento", n.tipoDocumento)}
            ${campo("Número de documento", n.documento)}
            ${campo("Fecha de nacimiento", formatearFecha(n.fechaNacimiento) || n.fechaNacimiento)}
            ${campo("Edad", n.edad)}
        </div>
    `;

    if (id === "academico") return `
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            ${campo("Estado académico inicial FSCM", n.academico?.estadoInicialFscm)}
            ${campo("Estado académico inicial 2026", n.academico?.estadoInicial2026)}
            ${campo("Grado / metodología aspirante", n.academico?.gradoAspirante || n.grado)}
            ${campo("Jornada", n.academico?.jornada)}
            ${campo("Año de ingreso", n.academico?.anioIngreso)}
            ${campo("Colegio actual", n.colegio)}
        </div>
    `;

    if (id === "salud") return `
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            ${campo("Discapacidad", n.salud?.discapacidad)}
            ${campo("Neurodivergencia", n.salud?.neurodivergencia)}
            ${campo("¿Cuenta con diagnóstico?", n.salud?.tieneDiagnostico)}
        </div>
    `;

    if (id === "seguimiento") {
        return `<div id="timelineSeguimientoNna"><p class="text-sm text-gray-400">Cargando seguimientos...</p></div>`;
    }

    if (id === "servicios") {
        const s = n.servicios || {};
        return `
            <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                ${SERVICIOS_NNA.map(({ clave, label }) => `
                    <div class="flex items-center gap-2 text-sm">
                        <span class="inline-block w-2.5 h-2.5 rounded-full ${s[clave] ? "bg-green-500" : "bg-red-500"}"></span>
                        <span class="text-gray-800">${label}</span>
                    </div>
                `).join("")}
            </div>
        `;
    }

    if (id === "observaciones") return `
        <p class="text-sm text-gray-700 whitespace-pre-line">${valor(n.observacionAcademica)}</p>
    `;

    return "";
}

// ─── Vista de solo lectura con pestañas (básicos, académico, salud, etc.) ───
function renderizarPerfil() {
    const cont = getCampo("perfil-nna-container");
    if (!cont || !nnaActual) return;

    const n = nnaActual;

    cont.innerHTML = `
        <div class="flex items-center justify-between mb-4">
            <button id="btnVolverNna" class="text-sm text-gray-500 hover:text-gray-800">
                <i class="fa-solid fa-arrow-left mr-1"></i> Volver al listado
            </button>
            <div class="flex gap-2">
                <button id="btnEditarNna" class="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-4 py-2 rounded-lg">Editar</button>
                <button id="btnEliminarNna" class="bg-red-50 hover:bg-red-100 text-red-600 text-sm font-medium px-4 py-2 rounded-lg">Eliminar</button>
            </div>
        </div>

        <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-5 mb-4 flex items-center justify-between">
            <div>
                <p class="text-xs text-gray-400 font-semibold">${n.codigo || n.id}</p>
                <h2 class="text-xl font-semibold text-gray-800">${n.nombre || "Sin nombre"}</h2>
                <p class="text-sm text-gray-500">Hogar: ${nombreFamiliaActual()}</p>
            </div>
            ${badgeEstado(n.estado)}
        </div>

        <div class="bg-white rounded-xl shadow-sm border border-gray-200">
            <div class="flex flex-wrap border-b border-gray-200 px-2">
                ${TABS.map(t => `
                    <button data-tab="${t.id}" class="tab-nna-btn px-4 py-3 text-sm font-medium border-b-2 ${tabActiva === t.id ? "border-indigo-600 text-indigo-600" : "border-transparent text-gray-500 hover:text-gray-700"}">
                        ${t.label}
                    </button>
                `).join("")}
            </div>
            <div class="p-5">
                ${contenidoTab(tabActiva)}
            </div>
        </div>
    `;

    cont.querySelectorAll(".tab-nna-btn").forEach(btn => {
        btn.addEventListener("click", async () => {
            tabActiva = btn.dataset.tab;
            renderizarPerfil();
            if (tabActiva === "seguimiento") {
                await renderizarTimelineSeguimiento();
            }
        });
    });

    if (tabActiva === "seguimiento") {
        renderizarTimelineSeguimiento();
    }

    agregarListener("btnVolverNna", "click", () => navegar("nna"));
    agregarListener("btnEditarNna", "click", renderizarFormularioEdicion);
    agregarListener("btnEliminarNna", "click", eliminarNnaActual);
}

async function renderizarTimelineSeguimiento() {
    const cont = getCampo("timelineSeguimientoNna");
    if (!cont || !nnaActual?.id) return;

    try {
        seguimientosCache = await obtenerSeguimientosPorNna(nnaActual.id);
        const lista = Array.isArray(seguimientosCache) ? seguimientosCache : [];

        if (lista.length === 0) {
            cont.innerHTML = `<p class="text-sm text-gray-400">No hay seguimientos registrados para este NNA.</p>`;
            return;
        }

        cont.innerHTML = `
            <ol class="border-l-2 border-indigo-200 pl-4 space-y-4">
                ${lista.map((s) => {
                    const inactivo = String(s.estadoMes || "").toLowerCase() === "inactivo";
                    const colorPunto = inactivo ? "bg-red-500" : "bg-green-500";
                    return `
                    <li class="relative">
                        <span class="absolute -left-[1.35rem] top-1 w-3 h-3 rounded-full ${colorPunto}"></span>
                        <p class="text-sm font-semibold text-gray-800">${s.mesNombre || s.mes} ${s.anio}</p>
                        <p class="text-sm text-gray-600">Estado: ${s.estadoMes || "-"}</p>
                        <p class="text-sm text-gray-600">Colegio: ${s.colegioActual || "-"}</p>
                        <p class="text-sm text-gray-600">Grado: ${s.gradoActual || "-"}</p>
                    </li>
                `;
                }).join("")}
            </ol>
        `;
    } catch (error) {
        console.error("Error al cargar seguimientos del NNA:", error);
        cont.innerHTML = `<p class="text-sm text-red-500">No se pudieron cargar los seguimientos.</p>`;
    }
}

async function eliminarNnaActual() {
    const confirmar = await window.confirm("¿Desea eliminar este registro de NNA?");
    if (!confirmar) return;

    try {
        await eliminarNna(nnaActual.id);
        mostrarInfo("Registro de NNA eliminado correctamente.");
        navegar("nna");
    } catch (error) {
        console.error("Error al eliminar el NNA:", error);
        mostrarError("No se pudo eliminar el registro de NNA.");
    }
}

// ============================ MODO EDICIÓN ============================

function renderizarFormularioEdicion() {
    const cont = getCampo("perfil-nna-container");
    const n = nnaActual;

    cont.innerHTML = `
        <div class="flex items-center justify-between mb-4">
            <h2 class="text-lg font-semibold text-gray-800">Editar NNA — ${n.id}</h2>
            <button id="btnCancelarEdicionNna" class="text-sm text-gray-500 hover:text-gray-800">Cancelar</button>
        </div>

        <form id="formEditarNna" class="bg-white rounded-xl shadow-sm border border-gray-200 p-5 flex flex-col gap-4">
            <div class="form-section-title">Datos básicos</div>
            <div class="form-grid">
                <div class="form-group"><label>Hogar al que pertenece *</label><select id="familiaNna"></select></div>
                <div class="form-group"><label>Nombre completo *</label><input type="text" id="nombreNna"></div>
                <div class="form-group"><label>Sexo</label>
                    <select id="sexoNna"><option value="">Seleccione...</option></select>
                </div>
                <div class="form-group"><label>Nacionalidad *</label>
                    <select id="nacionalidadNna"><option value="">Seleccione...</option></select>
                </div>
                <div class="form-group"><label>Tipo de documento *</label>
                    <select id="tipoDocumentoNna"><option value="">Seleccione...</option></select>
                </div>
                <div class="form-group"><label>Número de documento *</label><input type="text" id="documentoNna"></div>
                <div class="form-group"><label>Fecha de nacimiento *</label><input type="date" id="fechaNacimientoNna"></div>
                <div class="form-group"><label>Edad</label><input type="number" id="edadNna" readonly></div>
            </div>

            <div class="form-section-title">Datos académicos</div>
            <div class="form-grid">
                <div class="form-group"><label>Estado académico inicial FSCM *</label>
                    <select id="estadoInicialFscm"><option value="">Seleccione...</option></select>
                </div>
                <div class="form-group"><label>Estado académico inicial 2026 *</label>
                    <select id="estadoInicial2026"><option value="">Seleccione...</option></select>
                </div>
                <div class="form-group"><label>Grado / metodología aspirante *</label>
                    <select id="gradoAspirante"><option value="">Seleccione...</option></select>
                </div>
                <div class="form-group"><label>Jornada *</label>
                    <select id="jornadaNna"><option value="">Seleccione...</option></select>
                </div>
                <div class="form-group"><label>Año de ingreso *</label><input type="number" id="anioIngreso" min="2000"></div>
            </div>

            <div class="form-section-title">Datos de salud</div>
            <div class="form-grid">
                <div class="form-group"><label>Discapacidad</label>
                    <select id="discapacidadNna"><option value="">Seleccione...</option></select>
                </div>
                <div class="form-group"><label>Neurodivergencia</label><input type="text" id="neurodivergenciaNna"></div>
                <div class="form-group"><label>¿Cuenta con diagnóstico?</label>
                    <select id="tieneDiagnosticoNna"><option value="">Seleccione...</option></select>
                </div>
            </div>

            <div class="form-section-title">Servicios necesarios</div>
            <div class="checklist-grid">
                ${SERVICIOS_NNA.map(({ id, label }) => `
                    <label class="checklist-item"><input type="checkbox" id="${id}"> ${label}</label>
                `).join("")}
            </div>

            <div class="form-section-title">Observaciones</div>
            <div class="form-group">
                <label>Observación académica</label>
                <textarea id="observacionAcademicaNna" rows="4"></textarea>
            </div>

            <div class="modal-actions">
                <button type="submit" class="btn-primary">Guardar cambios</button>
            </div>
        </form>
    `;

    llenarSelectFamiliasEdicion();
    aplicarCatalogosFormularioEdicion(n).then(() => {
        precargarFormulario(n);
    });

    agregarListener("formEditarNna", "submit", guardarCambiosNna);
    agregarListener("fechaNacimientoNna", "change", calcularEdadAutomaticamente);
    agregarListener("btnCancelarEdicionNna", "click", renderizarPerfil);
}

async function aplicarCatalogosFormularioEdicion(n) {
    try {
        if (!catalogosEdicion) {
            catalogosEdicion = await obtenerCatalogos();
        }
        const sexoActual = sexoIdDesdeNna(n);
        llenarSelect("sexoNna", catalogosEdicion.sexo, sexoActual);
        llenarSelect("nacionalidadNna", catalogosEdicion.nacionalidad, String(n.nacionalidadId || ""));
        llenarSelect("tipoDocumentoNna", catalogosEdicion.tipoDocumento, String(n.tipoDocumentoId || ""));
        llenarSelect("estadoInicialFscm", catalogosEdicion.escolaridad, String(n.academico?.estadoInicialFscmId || ""));
        llenarSelect("estadoInicial2026", catalogosEdicion.escolaridad, String(n.academico?.estadoInicial2026Id || ""));
        llenarSelect("gradoAspirante", catalogosEdicion.gradoMetodologia, String(n.academico?.gradoAspiranteId || ""));
        llenarSelect("jornadaNna", catalogosEdicion.jornada, String(n.academico?.jornadaId || ""));
        llenarSelect("discapacidadNna", catalogosEdicion.discapacidad, String(n.salud?.discapacidadId || ""));
        llenarSelect("tieneDiagnosticoNna", catalogosEdicion.siNo, String(n.salud?.tieneDiagnosticoId || ""));
    } catch (error) {
        console.error("Error al cargar catálogos del formulario de edición:", error);
    }
}

function llenarSelectFamiliasEdicion() {
    const select = getCampo("familiaNna");
    select.innerHTML = `<option value="">Seleccione un hogar...</option>` +
        familiasCache.map(f => `<option value="${f.id}">${f.responsable || f.jefeHogar?.nombre || "Hogar sin nombre"} (${f.id})</option>`).join("");
}

function precargarFormulario(n) {
    setValorCampo("familiaNna", n.familiaId || "");
    setValorCampo("nombreNna", n.nombre || "");
    setValorCampo("sexoNna", sexoIdDesdeNna(n));
    setValorCampo("nacionalidadNna", String(n.nacionalidadId || ""));
    setValorCampo("tipoDocumentoNna", String(n.tipoDocumentoId || ""));
    setValorCampo("documentoNna", n.documento || "");
    setValorCampo("fechaNacimientoNna", String(n.fechaNacimiento || "").split("T")[0] || "");
    setValorCampo("edadNna", n.edad || "");

    setValorCampo("estadoInicialFscm", n.academico?.estadoInicialFscmId || "");
    setValorCampo("estadoInicial2026", n.academico?.estadoInicial2026Id || "");
    setValorCampo("gradoAspirante", n.academico?.gradoAspiranteId || "");
    setValorCampo("jornadaNna", n.academico?.jornadaId || "");
    setValorCampo("anioIngreso", n.academico?.anioIngreso || "");

    setValorCampo("discapacidadNna", n.salud?.discapacidadId || "");
    setValorCampo("neurodivergenciaNna", n.salud?.neurodivergencia || "");
    setValorCampo("tieneDiagnosticoNna", n.salud?.tieneDiagnosticoId || "");

    marcarServiciosEnFormulario(n.servicios);
    setValorCampo("observacionAcademicaNna", n.observacionAcademica || "");
}

function calcularEdadAutomaticamente() {
    const campoFecha = getCampo("fechaNacimientoNna");
    const campoEdad = getCampo("edadNna");
    if (!campoFecha?.value) {
        if (campoEdad) campoEdad.value = "";
        return;
    }
    if (campoEdad) campoEdad.value = calcularEdad(campoFecha.value);
}

async function guardarCambiosNna(evento) {
    evento.preventDefault();

    const nombre = getValorCampo("nombreNna").trim();
    const documento = getValorCampo("documentoNna").trim();
    const familiaId = getValorCampo("familiaNna");
    const fechaNacimiento = getValorCampo("fechaNacimientoNna");

    if (!validarFormularioEdicionNna({ familiaId, nombre, documento, fechaNacimiento })) return;
    const nnaActualizado = construirPayloadNnaActualizado({
        familiaId,
        nombre,
        documento,
        fechaNacimiento,
    });

    try {
        await actualizarNna(nnaActual.id, nnaActualizado);
        mostrarExito("NNA actualizado correctamente.");
        nnaActual = await obtenerNnaPorId(nnaActual.id);
        seguimientosCache = null;
        renderizarPerfil();
    } catch (error) {
        console.error("Error al actualizar el NNA:", error);
        mostrarError("No se pudo actualizar el registro de NNA.");
    }
}
