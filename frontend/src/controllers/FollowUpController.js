// Controlador de seguimiento mensual: confirma mes a mes a los NNA ya
// inscritos en la fundación. Al confirmar (check), el registro pasa a Reportes.
import { obtenerSeguimientos, confirmarSeguimiento, actualizarSeguimiento } from "../services/followUpService.js";
import { obtenerNna } from "../services/childService.js";
import { obtenerFamilias } from "../services/familyService.js";
import { mostrarExito, mostrarError, mostrarAdvertencia } from "../utils/alert.js";
import { Badge } from "../components/ui/Badge.js";
import { generarId } from "../utils/helpers.js";
import { abrirModal, cerrarModal, iniciarModal } from "./ModalController.js";

let nnaList = [];
let familias = [];
let seguimientos = [];

// Guarda el contexto del seguimiento que se está registrando o editando en el modal
let modoEdicionSeguimiento = false;
let seguimientoEditandoId = null;
let nnaSeleccionadoId = null;

// Inicializa la vista de seguimiento.
export async function iniciarSeguimientos() {

    try {

        nnaList = (await obtenerNna()).filter(n => n.estado !== "Inactivo");
        familias = await obtenerFamilias();
        seguimientos = await obtenerSeguimientos();

        renderizar();

        iniciarModal();

        document.getElementById("mesSeguimiento").addEventListener("change", renderizar);
        document.getElementById("anioSeguimiento").addEventListener("change", renderizar);

        const formulario = document.getElementById("formSeguimiento");

        if (formulario) {

            formulario.addEventListener("submit", guardarSeguimiento);

        }

        document.removeEventListener("click", manejarClick);
        document.addEventListener("click", manejarClick);

    } catch (error) {

        console.error("Error al cargar seguimientos:", error);
        mostrarError("No se pudieron cargar los seguimientos.");

    }

}

function periodoActual() {

    return {
        mes: Number(document.getElementById("mesSeguimiento").value),
        anio: Number(document.getElementById("anioSeguimiento").value)
    };

}

function nombreFamilia(familiaId) {

    const familia = familias.find(f => String(f.id) === String(familiaId));
    return familia ? familia.responsable : "Sin familia";

}

function nombreNna(nnaId) {

    const nna = nnaList.find(n => String(n.id) === String(nnaId));
    return nna ? nna.nombre : "Sin registro";

}

// Un NNA ya está confirmado en el período si existe su registro en seguimientos.
function estaConfirmado(nnaId, mes, anio) {

    return seguimientos.some(s =>
        String(s.nnaId) === String(nnaId) && Number(s.mes) === mes && Number(s.anio) === anio
    );

}

function renderizar() {

    const { mes, anio } = periodoActual();

    renderizarPendientes(mes, anio);
    renderizarRegistrados(mes, anio);

}

// Tabla de NNA que todavía no tienen seguimiento registrado en el período.
// Aquí también llegan automáticamente los integrantes marcados como "Beneficiario"
// en Familias, ya que al crearse su registro de NNA quedan sin confirmar.
function renderizarPendientes(mes, anio) {

    const pendientes = nnaList.filter(n => !estaConfirmado(n.id, mes, anio));

    const body = document.getElementById("seguimientosBody");
    const info = document.getElementById("pendientesInfo");

    info.textContent = pendientes.length === 0
        ? "Todos los NNA activos ya fueron confirmados este mes"
        : `${pendientes.length} pendientes por confirmar`;

    if (pendientes.length === 0) {

        body.innerHTML = `<tr><td colspan="5" class="table-empty">No hay novedades pendientes para este mes.</td></tr>`;
        return;

    }

    body.innerHTML = pendientes.map(n => `

        <tr data-id="${n.id}">
            <td><b>${n.nombre}</b></td>
            <td>${n.documento}</td>
            <td>${nombreFamilia(n.familiaId)}</td>
            <td>${Badge(n.estado, n.estado.toLowerCase().replace(/\s+/g,"-"))}</td>
            <td>
                <button class="check-btn" data-action="confirmar" data-id="${n.id}" title="Confirmar mes">
                    <i class="fa-solid fa-check"></i> Confirmar
                </button>
            </td>
        </tr>

    `).join("");

}

// Tabla con el detalle (fecha, estado, responsable, observaciones) de los
// seguimientos ya registrados en el período, con opción de editar.
function renderizarRegistrados(mes, anio) {

    const body = document.getElementById("seguimientosRegistradosBody");

    if (!body) return;

    const registrados = seguimientos.filter(s => Number(s.mes) === mes && Number(s.anio) === anio);

    if (registrados.length === 0) {

        body.innerHTML = `<tr><td colspan="6" class="table-empty">Todavía no hay seguimientos registrados para este período.</td></tr>`;
        return;

    }

    body.innerHTML = registrados.map(s => `

        <tr data-id="${s.id}">
            <td><b>${nombreNna(s.nnaId)}</b></td>
            <td>${Badge(s.estadoMes || "Activo", String(s.estadoMes || "Activo").toLowerCase().replace(/\s+/g,"-"))}</td>
            <td>${s.colegioActual || "-"}</td>
            <td>${s.gradoActual || "-"}</td>
            <td>${s.asistencia || "-"}</td>
            <td>
                <button class="btn-table" data-action="editar-seguimiento" data-id="${s.id}">Editar</button>
            </td>
        </tr>

    `).join("");

}

// Abre el modal con el formulario listo para registrar un seguimiento nuevo.
// El año y el mes se precargan con el período que está seleccionado en la página,
// pero quedan editables por si se necesita confirmar un mes distinto.
function prepararFormularioSeguimiento(nnaId) {

    modoEdicionSeguimiento = false;
    seguimientoEditandoId = null;
    nnaSeleccionadoId = nnaId;

    const formulario = document.getElementById("formSeguimiento");

    if (formulario) formulario.reset();

    const { mes, anio } = periodoActual();

    document.getElementById("seguimientoAnio").value = anio;
    document.getElementById("seguimientoMes").value = mes;
    document.getElementById("seguimientoEstadoMes").value = "Activo";

    // Si el NNA ya tiene un colegio/grado registrado en su ficha, se usa como punto de partida
    const nna = nnaList.find(n => String(n.id) === String(nnaId));

    document.getElementById("seguimientoColegioActual").value = nna?.colegio || "";
    document.getElementById("seguimientoGradoActual").value = nna?.grado || "";

    document.getElementById("formTituloModalSeguimiento").textContent = "Registrar seguimiento";

}

// Abre el modal con el formulario lleno para editar un seguimiento existente
function prepararFormularioEdicion(seguimiento) {

    modoEdicionSeguimiento = true;
    seguimientoEditandoId = seguimiento.id;
    nnaSeleccionadoId = seguimiento.nnaId;

    document.getElementById("seguimientoAnio").value = seguimiento.anio || "";
    document.getElementById("seguimientoMes").value = seguimiento.mes || "";
    document.getElementById("seguimientoEstadoMes").value = seguimiento.estadoMes || "Activo";
    document.getElementById("seguimientoColegioActual").value = seguimiento.colegioActual || "";
    document.getElementById("seguimientoInstitucion").value = seguimiento.institucion || "";
    document.getElementById("seguimientoTipoColegio").value = seguimiento.tipoColegio || "";
    document.getElementById("seguimientoGradoActual").value = seguimiento.gradoActual || "";
    document.getElementById("seguimientoAsistencia").value = seguimiento.asistencia || "";
    document.getElementById("seguimientoMotivo").value = seguimiento.motivo || "";

    document.getElementById("formTituloModalSeguimiento").textContent = "Editar seguimiento";

}

async function manejarClick(e) {

    const botonConfirmar = e.target.closest("button[data-action='confirmar']");
    const botonEditar = e.target.closest("button[data-action='editar-seguimiento']");

    if (botonConfirmar) {

        prepararFormularioSeguimiento(botonConfirmar.dataset.id);
        abrirModal("modalSeguimiento");

    }

    if (botonEditar) {

        const seguimiento = seguimientos.find(s => String(s.id) === String(botonEditar.dataset.id));

        if (!seguimiento) {
            mostrarAdvertencia("No se encontró el seguimiento seleccionado.");
            return;
        }

        prepararFormularioEdicion(seguimiento);
        abrirModal("modalSeguimiento");

    }

}

// Guarda (crea o edita) el seguimiento académico: año, mes, estado del mes, colegio,
// institución, tipo de colegio, grado actual, asistencia y egreso/motivo (opcionales).
async function guardarSeguimiento(e) {

    e.preventDefault();

    const anio = document.getElementById("seguimientoAnio").value;
    const mes = document.getElementById("seguimientoMes").value;
    const estadoMes = document.getElementById("seguimientoEstadoMes").value;
    const colegioActual = document.getElementById("seguimientoColegioActual").value.trim();
    const institucion = document.getElementById("seguimientoInstitucion").value.trim();
    const tipoColegio = document.getElementById("seguimientoTipoColegio").value;
    const gradoActual = document.getElementById("seguimientoGradoActual").value;

    // Campos opcionales
    const asistencia = document.getElementById("seguimientoAsistencia").value.trim();
    const motivo = document.getElementById("seguimientoMotivo").value.trim();

    if (!anio || !mes) {
        mostrarAdvertencia("Seleccione el año y el mes del seguimiento.");
        return;
    }

    if (!estadoMes) {
        mostrarAdvertencia("Seleccione el estado del mes.");
        return;
    }

    if (!colegioActual || !institucion) {
        mostrarAdvertencia("Complete el colegio actual y la institución.");
        return;
    }

    if (!tipoColegio) {
        mostrarAdvertencia("Seleccione el tipo de colegio.");
        return;
    }

    if (!gradoActual) {
        mostrarAdvertencia("Seleccione el grado actual.");
        return;
    }

    try {

        if (modoEdicionSeguimiento && seguimientoEditandoId) {

            const actualizado = {
                ...seguimientos.find(s => String(s.id) === String(seguimientoEditandoId)),
                anio: Number(anio), mes: Number(mes), estadoMes,
                colegioActual, institucion, tipoColegio, gradoActual,
                asistencia, motivo
            };

            await actualizarSeguimiento(seguimientoEditandoId, actualizado);

            seguimientos = seguimientos.map(s => String(s.id) === String(seguimientoEditandoId) ? actualizado : s);

            mostrarExito("Seguimiento actualizado correctamente.");

        } else {

            const nuevo = {
                id: generarId(seguimientos, "SEG"),
                nnaId: nnaSeleccionadoId,
                anio: Number(anio), mes: Number(mes), estadoMes,
                colegioActual, institucion, tipoColegio, gradoActual,
                asistencia, motivo
            };

            await confirmarSeguimiento(nuevo);
            seguimientos.push(nuevo);

            mostrarExito("Seguimiento registrado. El NNA ya está disponible en Reportes.");

        }

        renderizar();
        document.getElementById("formSeguimiento").reset();
        cerrarModal("modalSeguimiento");

    } catch (error) {

        console.error("Error al guardar el seguimiento:", error);
        mostrarError("No se pudo guardar el seguimiento.");

    }

}
