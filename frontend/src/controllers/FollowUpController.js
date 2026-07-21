/**
 * FollowUpController.js — seguimiento mensual de NNA.
 */
import { obtenerSeguimientos, confirmarSeguimiento, actualizarSeguimiento } from "../services/followUpService.js";
import { obtenerNna } from "../services/childService.js";
import { obtenerFamilias } from "../services/familyService.js";
import { obtenerCatalogos } from "../services/catalogService.js";
import { llenarSelect } from "../utils/catalogHelpers.js";
import { mostrarExito, mostrarError, mostrarAdvertencia } from "../utils/alert.js";
import { Badge } from "../components/ui/Badge.js";
import { abrirModal, cerrarModal, iniciarModal } from "./ModalController.js";
import { notificarSeguimientoActualizado } from "../utils/appEvents.js";
import { getCampo, getValorCampo, agregarListener } from "../utils/domHelpers.js";
import { validarReglas } from "../utils/formHelpers.js";

let nnaList = [];
let familias = [];
let seguimientos = [];

let modoEdicionSeguimiento = false;
let seguimientoEditandoId = null;
let nnaSeleccionadoId = null;

function leerFormularioSeguimiento() {
  return {
    anio: getCampo("seguimientoAnio")?.value,
    mes: getCampo("seguimientoMes")?.value,
    estadoMes: getCampo("seguimientoEstadoMes")?.value,
    colegioActual: getCampo("seguimientoColegioActual")?.value?.trim(),
    gradoMetodologiaId: getCampo("seguimientoGradoActual")?.value,
  };
}

function validarFormularioSeguimiento(datos) {
  return validarReglas([
    [!datos.anio || !datos.mes, "Seleccione el año y el mes del seguimiento."],
    [!datos.estadoMes, "Seleccione el estado del mes."],
    [!datos.colegioActual, "Complete el colegio actual."],
    [!datos.gradoMetodologiaId, "Seleccione el grado actual."],
  ], mostrarAdvertencia);
}

async function recargarDatosSeguimiento() {
  seguimientos = await obtenerSeguimientos();
  nnaList = await obtenerNna();
  renderizar();
}

async function cargarCatalogosSeguimiento() {
  const catalogos = await obtenerCatalogos();
  llenarSelect(
    "seguimientoEstadoMes",
    catalogos.estadoMesSeguimiento.map((item) => ({
      id: item.nombre,
      nombre: item.nombre,
    })),
    "Activo",
  );
  llenarSelect("seguimientoGradoActual", catalogos.gradoMetodologia);
}

async function cargarDatosSeguimiento() {
  const [nna, listaFamilias, listaSeguimientos] = await Promise.all([
    obtenerNna(),
    obtenerFamilias(),
    obtenerSeguimientos(),
  ]);
  nnaList = nna;
  familias = listaFamilias;
  seguimientos = listaSeguimientos;
}

export async function iniciarSeguimientos() {
  try {
    await cargarCatalogosSeguimiento();
    await cargarDatosSeguimiento();
    renderizar();

    iniciarModal();

    agregarListener("mesSeguimiento", "change", renderizar);
    agregarListener("anioSeguimiento", "change", renderizar);

    const formulario = getCampo("formSeguimiento");
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
    mes: Number(getValorCampo("mesSeguimiento")),
    anio: Number(getValorCampo("anioSeguimiento")),
  };
}

function nombreFamilia(familiaId) {
  const familia = familias.find(f => String(f.id) === String(familiaId));
  if (!familia) return "Sin familia";
  return familia.responsable || familia.jefe_hogar || "Sin familia";
}

function seguimientoDelPeriodo(nnaId, mes, anio) {
  return seguimientos.find(s =>
    String(s.nnaId) === String(nnaId) && Number(s.mes) === mes && Number(s.anio) === anio
  );
}

function renderizar() {
  const { mes, anio } = periodoActual(); // lee selects mes/año de la página
  const body = getCampo("seguimientosBody");
  if (!body) return;

  if (nnaList.length === 0) {
    body.innerHTML = `<tr><td colspan="5" class="table-empty">No hay NNA en línea base.</td></tr>`;
    return;
  }

  body.innerHTML = nnaList.map((n) => renderFilaSeguimiento(n, mes, anio)).join("");
}

function renderFilaSeguimiento(nna, mes, anio) {
  const seg = seguimientoDelPeriodo(nna.id, mes, anio); // ¿ya hay registro este mes?
  const estadoTexto = seg ? (seg.estadoMes || "Activo") : (nna.estado || "Pendiente");

  return `
    <tr data-id="${nna.id}">
        <td><b>${nna.nombre}</b></td>
        <td>${nna.codigoHogar || "-"}</td>
        <td>${nombreFamilia(nna.familiaId)}</td>
        <td>${Badge(estadoTexto, String(estadoTexto).toLowerCase().replace(/\s+/g, "-"))}</td>
        <td>
            <button class="check-btn" data-action="confirmar" data-id="${nna.id}" title="Confirmar mes">
                <i class="fa-solid fa-check"></i> Confirmar
            </button>
        </td>
    </tr>
    `;
}

function prepararFormularioSeguimiento(nnaId) {
  const { mes, anio } = periodoActual();
  const seg = seguimientoDelPeriodo(nnaId, mes, anio);

  if (seg) {
    prepararFormularioEdicion(seg);
    getCampo("formTituloModalSeguimiento").textContent = "Actualizar seguimiento";
    return;
  }

  modoEdicionSeguimiento = false;
  seguimientoEditandoId = null;
  nnaSeleccionadoId = nnaId;

  const formulario = getCampo("formSeguimiento");
  if (formulario) formulario.reset();

  getCampo("seguimientoAnio").value = anio;
  getCampo("seguimientoMes").value = mes;
  getCampo("seguimientoEstadoMes").value = "Activo";

  const nna = nnaList.find(n => String(n.id) === String(nnaId));
  getCampo("seguimientoColegioActual").value = nna?.colegio || "";
  getCampo("seguimientoGradoActual").value = nna?.academico?.gradoAspiranteId || "";

  getCampo("formTituloModalSeguimiento").textContent = "Registrar seguimiento";
}

function prepararFormularioEdicion(seguimiento) {
  modoEdicionSeguimiento = true;
  seguimientoEditandoId = seguimiento.id;
  nnaSeleccionadoId = seguimiento.nnaId;

  getCampo("seguimientoAnio").value = seguimiento.anio || "";
  getCampo("seguimientoMes").value = seguimiento.mes || "";
  getCampo("seguimientoEstadoMes").value = seguimiento.estadoMes || "Activo";
  getCampo("seguimientoColegioActual").value = seguimiento.colegioActual || "";
  getCampo("seguimientoGradoActual").value = String(seguimiento.gradoMetodologiaId || "");

  getCampo("formTituloModalSeguimiento").textContent = "Editar seguimiento";
}

async function manejarClick(e) {
  const botonConfirmar = e.target.closest("button[data-action='confirmar']");
  if (botonConfirmar) {
    prepararFormularioSeguimiento(botonConfirmar.dataset.id);
    abrirModal("modalSeguimiento");
  }
}

async function guardarSeguimiento(e) {
  e.preventDefault();

  const datos = leerFormularioSeguimiento();
  if (!validarFormularioSeguimiento(datos)) return;

  const payload = {
    anio: Number(datos.anio),
    mes: Number(datos.mes),
    estadoMes: datos.estadoMes,
    colegioActual: datos.colegioActual,
    gradoMetodologiaId: Number(datos.gradoMetodologiaId),
  };

  try {
    if (modoEdicionSeguimiento && seguimientoEditandoId) {
      await actualizarSeguimiento(seguimientoEditandoId, {
        ...seguimientos.find(s => String(s.id) === String(seguimientoEditandoId)),
        ...payload,
        nnaId: nnaSeleccionadoId,
      });
      mostrarExito("Seguimiento actualizado correctamente.");
    } else {
      await confirmarSeguimiento({
        nnaId: nnaSeleccionadoId,
        ...payload,
      });
      mostrarExito("Seguimiento registrado correctamente.");
    }

    await recargarDatosSeguimiento();
    notificarSeguimientoActualizado({ nnaId: nnaSeleccionadoId }); // refresca dashboard y perfiles
    getCampo("formSeguimiento").reset();
    cerrarModal("modalSeguimiento");
  } catch (error) {
    console.error("Error al guardar el seguimiento:", error);
    mostrarError("No se pudo guardar el seguimiento.");
  }
}
