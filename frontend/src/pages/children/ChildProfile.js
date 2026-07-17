import { DashboardLayout } from "../../components/layout/DashboardLayout.js";
import { obtenerNnaPorId, actualizarNna, eliminarNna } from "../../services/childService.js";
import { obtenerFamilias } from "../../services/familyService.js";
import { obtenerRutaId, navegar } from "../../router/router.js";
import { mostrarExito, mostrarError, mostrarAdvertencia, mostrarInfo } from "../../utils/alert.js";

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

export async function iniciarEditarNna() {
    const id = obtenerRutaId();

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
        renderizarPerfil();
    } catch (error) {
        console.error("Error al cargar el NNA:", error);
        mostrarError("No se pudo cargar la información del NNA.");
    }
}

function valor(v, sufijo = "") {
    if (v === undefined || v === null || v === "") return "No registrado";
    return `${v}${sufijo}`;
}

function nombreFamiliaActual() {
    const familia = familiasCache.find(f => String(f.id) === String(nnaActual.familiaId));
    if (!familia) return "Sin familia";
    return familia.responsable || familia.jefeHogar?.nombre || "Hogar sin nombre";
}

function campo(etiqueta, val) {
    return `
        <div class="flex flex-col gap-1">
            <span class="text-xs uppercase tracking-wide text-gray-400">${etiqueta}</span>
            <span class="text-sm text-gray-800">${valor(val)}</span>
        </div>
    `;
}

function badgeEstado(estado) {
    const key = String(estado || "Inactivo").toLowerCase();
    const clases = key === "activo" ? "bg-green-100 text-green-700"
        : key === "inactivo" ? "bg-red-100 text-red-700"
        : "bg-gray-100 text-gray-700";
    return `<span class="text-xs font-medium px-2 py-1 rounded-full ${clases}">${estado || "Inactivo"}</span>`;
}

const TABS = [
    { id: "basicos", label: "Datos básicos" },
    { id: "academico", label: "Académico" },
    { id: "salud", label: "Salud" },
    { id: "contacto", label: "Contacto" },
    { id: "servicios", label: "Servicios" },
    { id: "observaciones", label: "Observaciones" }
];

function contenidoTab(id) {
    const n = nnaActual;

    if (id === "basicos") return `
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            ${campo("Código NNA", n.id)}
            ${campo("Nombre completo", n.nombre)}
            ${campo("Hogar", nombreFamiliaActual())}
            ${campo("Sexo", n.sexo)}
            ${campo("Nacionalidad", n.nacionalidad)}
            ${campo("Tipo de documento", n.tipoDocumento)}
            ${campo("Número de documento", n.documento)}
            ${campo("Fecha de nacimiento", n.fechaNacimiento)}
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
            ${campo("EPS", n.eps)}
        </div>
    `;

    if (id === "contacto") return `
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            ${campo("Celular", n.contacto?.celular)}
            ${campo("Dirección", n.contacto?.direccion)}
            ${campo("Barrio", n.contacto?.barrio)}
            ${campo("Grupo de validación", n.contacto?.grupoValidacion)}
            ${campo("Plan padrino", n.contacto?.planPadrino)}
            ${campo("Tipo de beca", n.contacto?.tipoBeca)}
        </div>
    `;

    if (id === "servicios") {
        const s = n.servicios || {};
        const etiquetas = {
            tramiteDocumentos: "Trámite de documentos", activacionRuta: "Activación de ruta",
            refuerzo: "Refuerzo escolar", acompanamiento: "Acompañamiento",
            rutaEscolar: "Ruta escolar", comedores: "Comedores", matricula: "Matrícula"
        };
        return `
            <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                ${Object.entries(etiquetas).map(([k, label]) => `
                    <div class="flex items-center gap-2 text-sm">
                        <i class="fa-solid ${s[k] ? "fa-circle-check text-green-600" : "fa-circle-xmark text-gray-300"}"></i>
                        <span class="${s[k] ? "text-gray-800" : "text-gray-400"}">${label}</span>
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

function renderizarPerfil() {
    const cont = document.getElementById("perfil-nna-container");
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
                <p class="text-xs text-gray-400 font-semibold">${n.id}</p>
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
        btn.addEventListener("click", () => {
            tabActiva = btn.dataset.tab;
            renderizarPerfil();
        });
    });

    document.getElementById("btnVolverNna").addEventListener("click", () => navegar("nna"));
    document.getElementById("btnEditarNna").addEventListener("click", renderizarFormularioEdicion);
    document.getElementById("btnEliminarNna").addEventListener("click", eliminarNnaActual);
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
    const cont = document.getElementById("perfil-nna-container");
    const n = nnaActual;

    cont.innerHTML = `
        <div class="flex items-center justify-between mb-4">
            <h2 class="text-lg font-semibold text-gray-800">Editar NNA — ${n.id}</h2>
            <button id="btnCancelarEdicionNna" class="text-sm text-gray-500 hover:text-gray-800">Cancelar</button>
        </div>

        <form id="formEditarNna" class="bg-white rounded-xl shadow-sm border border-gray-200 p-5 flex flex-col gap-4">
            <div class="form-section-title">Datos básicos</div>
            <div class="form-grid">
                <div class="form-group"><label>Hogar al que pertenece</label><select id="familiaNna"></select></div>
                <div class="form-group"><label>Nombre completo</label><input type="text" id="nombreNna"></div>
                <div class="form-group"><label>Sexo</label>
                    <select id="sexoNna"><option value="">Seleccione...</option><option value="Masculino">Masculino</option><option value="Femenino">Femenino</option></select>
                </div>
                <div class="form-group"><label>Nacionalidad</label>
                    <select id="nacionalidadNna">
                        <option value="">Seleccione...</option><option value="Colombiana">Colombiana</option>
                        <option value="Venezolana">Venezolana</option><option value="Colombo-venezolana">Colombo-venezolana</option>
                        <option value="Otra">Otra</option>
                    </select>
                </div>
                <div class="form-group"><label>Tipo de documento</label>
                    <select id="tipoDocumentoNna">
                        <option value="">Seleccione...</option><option value="Registro Civil">Registro Civil</option>
                        <option value="Tarjeta de Identidad">Tarjeta de Identidad</option><option value="Cédula de Ciudadanía">Cédula de Ciudadanía</option>
                        <option value="Permiso Por Protección Temporal">Permiso Por Protección Temporal</option><option value="Sin documento">Sin documento</option>
                    </select>
                </div>
                <div class="form-group"><label>Número de documento</label><input type="text" id="documentoNna"></div>
                <div class="form-group"><label>Fecha de nacimiento</label><input type="date" id="fechaNacimientoNna"></div>
                <div class="form-group"><label>Edad</label><input type="number" id="edadNna" readonly></div>
            </div>

            <div class="form-section-title">Datos académicos</div>
            <div class="form-grid">
                <div class="form-group"><label>Estado académico inicial FSCM</label>
                    <select id="estadoInicialFscm"><option value="">Seleccione...</option><option value="Escolarizado">Escolarizado</option><option value="Desescolarizado">Desescolarizado</option><option value="Extraedad">Extraedad</option><option value="No aplica">No aplica</option></select>
                </div>
                <div class="form-group"><label>Estado académico inicial 2026</label>
                    <select id="estadoInicial2026"><option value="">Seleccione...</option><option value="Escolarizado">Escolarizado</option><option value="Desescolarizado">Desescolarizado</option><option value="Extraedad">Extraedad</option><option value="No aplica">No aplica</option></select>
                </div>
                <div class="form-group"><label>Grado / metodología aspirante</label>
                    <select id="gradoAspirante"><option value="">Seleccione...</option><option value="Preescolar">Preescolar</option><option value="Primaria">Primaria</option><option value="Secundaria">Secundaria</option><option value="Media">Media</option><option value="Modelo flexible">Modelo flexible (metodología)</option><option value="Validación de bachillerato">Validación de bachillerato</option></select>
                </div>
                <div class="form-group"><label>Jornada</label>
                    <select id="jornadaNna"><option value="">Seleccione...</option><option value="Mañana">Mañana</option><option value="Tarde">Tarde</option><option value="Única">Única</option><option value="Nocturna">Nocturna</option></select>
                </div>
                <div class="form-group"><label>Año de ingreso</label><input type="number" id="anioIngreso" min="2000"></div>
            </div>

            <div class="form-section-title">Datos de salud</div>
            <div class="form-grid">
                <div class="form-group"><label>Discapacidad</label>
                    <select id="discapacidadNna"><option value="">Seleccione...</option><option value="Ninguna">Ninguna</option><option value="Física">Física</option><option value="Visual">Visual</option><option value="Auditiva">Auditiva</option><option value="Cognitiva">Cognitiva</option><option value="Múltiple">Múltiple</option></select>
                </div>
                <div class="form-group"><label>Neurodivergencia</label><input type="text" id="neurodivergenciaNna"></div>
                <div class="form-group"><label>¿Cuenta con diagnóstico?</label>
                    <select id="tieneDiagnosticoNna"><option value="">Seleccione...</option><option value="Sí">Sí</option><option value="No">No</option></select>
                </div>
            </div>

            <div class="form-section-title">Contacto y clasificación</div>
            <div class="form-grid">
                <div class="form-group"><label>Celular</label><input type="text" id="celularNna"></div>
                <div class="form-group"><label>Dirección</label><input type="text" id="direccionNna"></div>
                <div class="form-group"><label>Barrio</label><input type="text" id="barrioNna"></div>
                <div class="form-group"><label>Grupo de validación</label><input type="text" id="grupoValidacionNna"></div>
                <div class="form-group"><label>Plan padrino</label>
                    <select id="planPadrinoNna"><option value="">Seleccione...</option><option value="Sí">Sí</option><option value="No">No</option></select>
                </div>
                <div class="form-group"><label>Tipo de beca</label><input type="text" id="tipoBecaNna"></div>
            </div>

            <div class="form-section-title">Servicios necesarios</div>
            <div class="checklist-grid">
                <label class="checklist-item"><input type="checkbox" id="servTramiteDocumentos"> Trámite de documentos</label>
                <label class="checklist-item"><input type="checkbox" id="servActivacionRuta"> Activación de ruta</label>
                <label class="checklist-item"><input type="checkbox" id="servRefuerzo"> Refuerzo escolar</label>
                <label class="checklist-item"><input type="checkbox" id="servAcompanamiento"> Acompañamiento</label>
                <label class="checklist-item"><input type="checkbox" id="servRutaEscolar"> Ruta escolar</label>
                <label class="checklist-item"><input type="checkbox" id="servComedores"> Comedores</label>
                <label class="checklist-item"><input type="checkbox" id="servMatricula"> Matrícula</label>
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
    precargarFormulario(n);

    document.getElementById("formEditarNna").addEventListener("submit", guardarCambiosNna);
    document.getElementById("fechaNacimientoNna").addEventListener("change", calcularEdadAutomaticamente);
    document.getElementById("btnCancelarEdicionNna").addEventListener("click", renderizarPerfil);
}

function llenarSelectFamiliasEdicion() {
    const select = document.getElementById("familiaNna");
    select.innerHTML = `<option value="">Seleccione un hogar...</option>` +
        familiasCache.map(f => `<option value="${f.id}">${f.responsable || f.jefeHogar?.nombre || "Hogar sin nombre"} (${f.id})</option>`).join("");
}

function precargarFormulario(n) {
    document.getElementById("familiaNna").value = n.familiaId || "";
    document.getElementById("nombreNna").value = n.nombre || "";
    document.getElementById("sexoNna").value = n.sexo || "";
    document.getElementById("nacionalidadNna").value = n.nacionalidad || "";
    document.getElementById("tipoDocumentoNna").value = n.tipoDocumento || "";
    document.getElementById("documentoNna").value = n.documento || "";
    document.getElementById("fechaNacimientoNna").value = n.fechaNacimiento || "";
    document.getElementById("edadNna").value = n.edad || "";

    document.getElementById("estadoInicialFscm").value = n.academico?.estadoInicialFscm || "";
    document.getElementById("estadoInicial2026").value = n.academico?.estadoInicial2026 || "";
    document.getElementById("gradoAspirante").value = n.academico?.gradoAspirante || "";
    document.getElementById("jornadaNna").value = n.academico?.jornada || "";
    document.getElementById("anioIngreso").value = n.academico?.anioIngreso || "";

    document.getElementById("discapacidadNna").value = n.salud?.discapacidad || "";
    document.getElementById("neurodivergenciaNna").value = n.salud?.neurodivergencia || "";
    document.getElementById("tieneDiagnosticoNna").value = n.salud?.tieneDiagnostico || "";

    document.getElementById("celularNna").value = n.contacto?.celular || "";
    document.getElementById("direccionNna").value = n.contacto?.direccion || "";
    document.getElementById("barrioNna").value = n.contacto?.barrio || "";
    document.getElementById("grupoValidacionNna").value = n.contacto?.grupoValidacion || "";
    document.getElementById("planPadrinoNna").value = n.contacto?.planPadrino || "";
    document.getElementById("tipoBecaNna").value = n.contacto?.tipoBeca || "";

    document.getElementById("servTramiteDocumentos").checked = !!n.servicios?.tramiteDocumentos;
    document.getElementById("servActivacionRuta").checked = !!n.servicios?.activacionRuta;
    document.getElementById("servRefuerzo").checked = !!n.servicios?.refuerzo;
    document.getElementById("servAcompanamiento").checked = !!n.servicios?.acompanamiento;
    document.getElementById("servRutaEscolar").checked = !!n.servicios?.rutaEscolar;
    document.getElementById("servComedores").checked = !!n.servicios?.comedores;
    document.getElementById("servMatricula").checked = !!n.servicios?.matricula;

    document.getElementById("observacionAcademicaNna").value = n.observacionAcademica || "";
}

function calcularEdadAutomaticamente() {
    const campoFecha = document.getElementById("fechaNacimientoNna");
    const campoEdad = document.getElementById("edadNna");
    if (!campoFecha.value) { campoEdad.value = ""; return; }
    const fechaNacimiento = new Date(campoFecha.value);
    const hoy = new Date();
    let edad = hoy.getFullYear() - fechaNacimiento.getFullYear();
    const noHaCumplido = hoy.getMonth() < fechaNacimiento.getMonth() ||
        (hoy.getMonth() === fechaNacimiento.getMonth() && hoy.getDate() < fechaNacimiento.getDate());
    if (noHaCumplido) edad--;
    campoEdad.value = edad;
}

async function guardarCambiosNna(evento) {
    evento.preventDefault();

    const nombre = document.getElementById("nombreNna").value.trim();
    const documento = document.getElementById("documentoNna").value.trim();
    const familiaId = document.getElementById("familiaNna").value;
    const fechaNacimiento = document.getElementById("fechaNacimientoNna").value;

    if (!familiaId) { mostrarAdvertencia("Seleccione el hogar al que pertenece el NNA."); return; }
    if (!nombre || !documento) { mostrarAdvertencia("Complete el nombre y el número de documento del NNA."); return; }
    if (!fechaNacimiento) { mostrarAdvertencia("Seleccione la fecha de nacimiento del NNA."); return; }

    const nnaActualizado = {
        ...nnaActual,
        familiaId, nombre, sexo: document.getElementById("sexoNna").value,
        nacionalidad: document.getElementById("nacionalidadNna").value,
        tipoDocumento: document.getElementById("tipoDocumentoNna").value,
        documento, fechaNacimiento, edad: document.getElementById("edadNna").value,
        grado: document.getElementById("gradoAspirante").value,
        academico: {
            estadoInicialFscm: document.getElementById("estadoInicialFscm").value,
            estadoInicial2026: document.getElementById("estadoInicial2026").value,
            gradoAspirante: document.getElementById("gradoAspirante").value,
            jornada: document.getElementById("jornadaNna").value,
            anioIngreso: document.getElementById("anioIngreso").value
        },
        salud: {
            discapacidad: document.getElementById("discapacidadNna").value,
            neurodivergencia: document.getElementById("neurodivergenciaNna").value,
            tieneDiagnostico: document.getElementById("tieneDiagnosticoNna").value
        },
        contacto: {
            celular: document.getElementById("celularNna").value,
            direccion: document.getElementById("direccionNna").value,
            barrio: document.getElementById("barrioNna").value,
            grupoValidacion: document.getElementById("grupoValidacionNna").value,
            planPadrino: document.getElementById("planPadrinoNna").value,
            tipoBeca: document.getElementById("tipoBecaNna").value
        },
        servicios: {
            tramiteDocumentos: document.getElementById("servTramiteDocumentos").checked,
            activacionRuta: document.getElementById("servActivacionRuta").checked,
            refuerzo: document.getElementById("servRefuerzo").checked,
            acompanamiento: document.getElementById("servAcompanamiento").checked,
            rutaEscolar: document.getElementById("servRutaEscolar").checked,
            comedores: document.getElementById("servComedores").checked,
            matricula: document.getElementById("servMatricula").checked
        },
        observacionAcademica: document.getElementById("observacionAcademicaNna").value
    };

    try {
        await actualizarNna(nnaActual.id, nnaActualizado);
        mostrarExito("NNA actualizado correctamente.");
        nnaActual = nnaActualizado;
        renderizarPerfil();
    } catch (error) {
        console.error("Error al actualizar el NNA:", error);
        mostrarError("No se pudo actualizar el registro de NNA.");
    }
}
