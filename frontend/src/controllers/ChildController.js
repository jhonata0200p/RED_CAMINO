/**
 * ChildController.js — listado y registro de NNA.
 * Entrada: iniciarNna() desde router.js
 */
import { obtenerNna, crearNna, obtenerNnaPendientes } from "../services/childService.js";
import { obtenerFamilias } from "../services/familyService.js";
import { mostrarExito, mostrarError, mostrarAdvertencia } from "../utils/alert.js";
import { Loader } from "../components/ui/Loader.js";
import { abrirModal, cerrarModal, iniciarModal } from "./ModalController.js";
import { navegar } from "../router/router.js";
import { calcularEdad } from "../utils/helpers.js";
import { obtenerCatalogos } from "../services/catalogService.js";
import { llenarSelect } from "../utils/catalogHelpers.js";
import { APP_EVENTS } from "../utils/appEvents.js";
import { getCampo } from "../utils/domHelpers.js";
import { escribirValorAnidado, validarReglas } from "../utils/formHelpers.js";

let nnaList = [];
let familiasDisponibles = [];
let pendientesDisponibles = [];
let catalogosNna = null;
let formData = crearEstadoInicial();
let escuchandoSeguimientoNna = false;

function registrarSincronizacionSeguimientoNna() {
  if (escuchandoSeguimientoNna) return;
  escuchandoSeguimientoNna = true;

  document.addEventListener(APP_EVENTS.SEGUIMIENTO_ACTUALIZADO, async () => {
    if (!getCampo("nna-container")) return; // solo si estamos en la vista NNA

    try {
      nnaList = await obtenerNna();
      const buscar = getCampo("buscarNna");
      if (buscar?.value) {
        filtrarNna({ target: buscar }); // mantiene el filtro activo
      } else {
        renderizarNna(nnaList);
      }
    } catch (error) {
      console.error("Error al sincronizar el listado de NNA:", error);
    }
  });
}

function crearEstadoInicial() {
  return {
    familiaId: "", personaId: "", nombre: "", sexo: "", nacionalidad: "", tipoDocumento: "",
    documento: "", fechaNacimiento: "", edad: "",
    academico: { estadoInicialFscm: "", estadoInicial2026: "", gradoAspirante: "", jornada: "", anioIngreso: "" },
    salud: { discapacidad: "", neurodivergencia: "", tieneDiagnostico: "" },
    servicios: { tramiteDocumentos: false, activacionRuta: false, refuerzo: false, acompanamiento: false, rutaEscolar: false, comedores: false, matricula: false },
    observacionAcademica: ""
  };
}

const MAPA_CAMPOS = {
  familiaNna: "familiaId", pendienteHogarNna: "personaId", nombreNna: "nombre", sexoNna: "sexo", nacionalidadNna: "nacionalidad",
  tipoDocumentoNna: "tipoDocumento", documentoNna: "documento", fechaNacimientoNna: "fechaNacimiento",
  estadoInicialFscm: "academico.estadoInicialFscm", estadoInicial2026: "academico.estadoInicial2026",
  gradoAspirante: "academico.gradoAspirante", jornadaNna: "academico.jornada", anioIngreso: "academico.anioIngreso",
  discapacidadNna: "salud.discapacidad", neurodivergenciaNna: "salud.neurodivergencia", tieneDiagnosticoNna: "salud.tieneDiagnostico",
  servTramiteDocumentos: "servicios.tramiteDocumentos", servActivacionRuta: "servicios.activacionRuta",
  servRefuerzo: "servicios.refuerzo", servAcompanamiento: "servicios.acompanamiento", servRutaEscolar: "servicios.rutaEscolar",
  servComedores: "servicios.comedores", servMatricula: "servicios.matricula", observacionAcademicaNna: "observacionAcademica"
};

function aplicarCatalogosNna(datos = null) {
  if (!catalogosNna) return;
  const actual = datos || formData;
  llenarSelect("sexoNna", catalogosNna.sexo, actual.sexo);
  llenarSelect("nacionalidadNna", catalogosNna.nacionalidad, actual.nacionalidad);
  llenarSelect("tipoDocumentoNna", catalogosNna.tipoDocumento, actual.tipoDocumento);
  llenarSelect("estadoInicialFscm", catalogosNna.escolaridad, actual.academico?.estadoInicialFscm);
  llenarSelect("estadoInicial2026", catalogosNna.escolaridad, actual.academico?.estadoInicial2026);
  llenarSelect("gradoAspirante", catalogosNna.gradoMetodologia, actual.academico?.gradoAspirante);
  llenarSelect("jornadaNna", catalogosNna.jornada, actual.academico?.jornada);
  llenarSelect("discapacidadNna", catalogosNna.discapacidad, actual.salud?.discapacidad);
  llenarSelect("tieneDiagnosticoNna", catalogosNna.siNo, actual.salud?.tieneDiagnostico);
}

function bloquearCamposPendiente(esPendiente) {
  ["grupoFechaNacimientoNna", "grupoEdadNna"].forEach((id) => {
    const el = getCampo(id);
    if (el) el.hidden = esPendiente; // si viene del hogar, oculta fecha/edad
  });
  const sexo = getCampo("sexoNna");
  const tipoDoc = getCampo("tipoDocumentoNna");
  if (sexo) sexo.disabled = esPendiente;
  if (tipoDoc) tipoDoc.disabled = esPendiente;
}

export async function iniciarNna() {
  try {
    mostrarLoaderListado();
    await cargarDatosInicialesNna();

    llenarSelectFamilias();
    aplicarCatalogosNna();
    renderizarNna(nnaList);
    registrarSincronizacionSeguimientoNna();
    iniciarModal();

    getCampo("btnNuevoNna")?.addEventListener("click", () => {
      prepararFormulario();
      abrirModal("modalNna");
    });

    getCampo("buscarNna")?.addEventListener("input", filtrarNna);
    inicializarManejadoresDeCampos();

    document.removeEventListener("click", manejarClickListadoNna);
    document.addEventListener("click", manejarClickListadoNna);
  } catch (error) {
    console.error("Error al cargar NNA:", error);
    mostrarError("No se pudieron cargar los registros de NNA.");
  }
}

function llenarSelectFamilias() {
  const select = getCampo("familiaNna");
  if (!select) return;
  select.innerHTML = `<option value="">Seleccione un hogar...</option>` +
    familiasDisponibles.map(f =>
      `<option value="${f.id}">${f.responsable || f.jefe_hogar || f.jefeHogar?.nombre || "Hogar sin nombre"} (${f.codigo || f.id})</option>`
    ).join("");
}

function llenarSelectPendientes(familiaId) {
  const grupo = getCampo("grupoPendienteHogar");
  const select = getCampo("pendienteHogarNna");
  if (!grupo || !select) return;

  const pendientes = pendientesDisponibles.filter(
    (p) => String(p.familiaId) === String(familiaId),
  );

  if (!familiaId || pendientes.length === 0) {
    grupo.hidden = true;
    select.innerHTML = `<option value="">Registrar como nuevo NNA</option>`;
    formData.personaId = "";
    return;
  }

  grupo.hidden = false;
  select.innerHTML = `<option value="">Registrar como nuevo NNA</option>` +
    pendientes.map((p) =>
      `<option value="${p.id}">${p.nombre}${p.documento ? ` (${p.documento})` : ""}</option>`
    ).join("");
}

function aplicarPendienteSeleccionado(personaId) {
  const pendiente = pendientesDisponibles.find((p) => String(p.id) === String(personaId));
  if (!pendiente) {
    bloquearCamposPendiente(false);
    return;
  }

  formData.personaId = String(pendiente.id);
  formData.nombre = pendiente.nombre || formData.nombre;
  formData.documento = pendiente.documento || formData.documento;
  formData.edad = pendiente.edad ?? formData.edad;
  formData.sexo = pendiente.sexoId ? String(pendiente.sexoId) : formData.sexo;
  formData.tipoDocumento = pendiente.tipoDocumentoId ? String(pendiente.tipoDocumentoId) : formData.tipoDocumento;
  formData.nacionalidad = pendiente.nacionalidadId ? String(pendiente.nacionalidadId) : formData.nacionalidad;
  formData.fechaNacimiento = pendiente.fechaNacimiento || formData.fechaNacimiento;

  const nombre = getCampo("nombreNna");
  const documento = getCampo("documentoNna");
  const edad = getCampo("edadNna");
  if (nombre) nombre.value = formData.nombre;
  if (documento) documento.value = formData.documento;
  if (edad) edad.value = formData.edad ?? "";

  aplicarCatalogosNna();
  bloquearCamposPendiente(true);
}

function nombreFamilia(familiaId) {
  const familia = familiasDisponibles.find(item => String(item.id) === String(familiaId));
  if (!familia) return "Sin familia";
  return familia.responsable || familia.jefe_hogar || familia.jefeHogar?.nombre || "Hogar sin nombre";
}

function gradoActual(child) {
  return child.academico?.gradoAspirante || child.grado || "Sin grado registrado";
}

function colegioActual(child) {
  return child.colegio || "Sin colegio registrado";
}

function resumenAcademico(child) {
  return { grado: gradoActual(child), colegio: colegioActual(child) };
}

function estiloBadgeEstado(estado) {
  const texto = String(estado || "Inactivo").trim();
  const key = texto.toLowerCase();
  if (key === "activo") return "bg-green-100 text-green-700";
  if (key === "inactivo") return "bg-red-100 text-red-700";
  if (key.includes("proceso")) return "bg-amber-100 text-amber-700";
  return "bg-gray-100 text-gray-700";
}

function inicializarManejadoresDeCampos() {
  const formulario = getCampo("formNna");
  if (!formulario) return;
  formulario.addEventListener("input", manejarCambioCampo);
  formulario.addEventListener("change", manejarCambioCampo);
  formulario.addEventListener("submit", guardarNna);
  getCampo("fechaNacimientoNna")?.addEventListener("change", calcularEdadAutomaticamente);
  getCampo("familiaNna")?.addEventListener("change", (evento) => {
    formData.personaId = "";
    llenarSelectPendientes(evento.target.value);
  });
  getCampo("pendienteHogarNna")?.addEventListener("change", (evento) => {
    if (evento.target.value) {
      aplicarPendienteSeleccionado(evento.target.value);
    } else {
      formData.personaId = "";
      bloquearCamposPendiente(false);
    }
  });
}

function manejarCambioCampo(evento) {
  const campo = evento.target;
  const ruta = MAPA_CAMPOS[campo.id];
  if (!ruta) return;
  let valor = campo.value;
  if (campo.type === "checkbox") valor = campo.checked;
  escribirValorAnidado(formData, ruta, valor);
}

function calcularEdadAutomaticamente() {
  const campoFecha = getCampo("fechaNacimientoNna");
  const campoEdad = getCampo("edadNna");
  if (!campoFecha?.value) {
    if (campoEdad) campoEdad.value = "";
    formData.edad = "";
    return;
  }
  const edad = calcularEdad(campoFecha.value);
  if (campoEdad) campoEdad.value = edad;
  formData.edad = edad;
}

function filtrarNna(evento) {
  const texto = (evento.target.value || "").toLowerCase();
  const resultado = nnaList.filter(nna =>
    String(nna.nombre || "").toLowerCase().includes(texto) ||
    String(nna.codigoHogar || "").toLowerCase().includes(texto) ||
    String(nna.documento || "").toLowerCase().includes(texto)
  );
  renderizarNna(resultado);
}

function manejarClickListadoNna(evento) {
  const boton = evento.target.closest(".btn-ver-perfil");
  if (boton) navegar("perfilNna", boton.dataset.id);
}

function prepararFormulario() {
  formData = crearEstadoInicial();
  const formulario = getCampo("formNna");
  if (formulario) {
    formulario.reset();
    getCampo("formTituloModalNna").textContent = "Registrar NNA";
  }
  llenarSelectPendientes("");
  bloquearCamposPendiente(false);
  aplicarCatalogosNna();
}

async function guardarNna(evento) {
  evento.preventDefault();
  if (!validarCamposObligatorios()) return;
  try {
    const nuevoNna = {
      nombre: formData.nombre,
      documento: formData.documento || null,
      edad: formData.edad,
      familiaId: formData.familiaId,
      grado: formData.academico.gradoAspirante,
      estado: "Activo",
      sexo: formData.sexo,
      nacionalidad: formData.nacionalidad,
      tipoDocumento: formData.tipoDocumento,
      fechaNacimiento: formData.fechaNacimiento,
      academico: formData.academico,
      salud: formData.salud,
      servicios: formData.servicios,
      observacionAcademica: formData.observacionAcademica,
    };

    if (formData.personaId) {
      nuevoNna.personaId = formData.personaId; // confirma menor pendiente del hogar
    }
    await crearNna(nuevoNna);
    mostrarExito("NNA registrado correctamente.");
    nnaList = await obtenerNna();
    renderizarNna(nnaList);
    cerrarModal("modalNna");
  } catch (error) {
    console.error("Error al guardar el NNA:", error);
    mostrarError(error.message || "No se pudo guardar el registro de NNA.");
  }
}

function validarCamposObligatorios() {
  return validarReglas([
    [!formData.familiaId, "Seleccione el hogar al que pertenece el NNA."],
    [!formData.nombre, "Complete el nombre del NNA."],
    [!formData.nacionalidad, "Seleccione la nacionalidad del NNA."],
    [!formData.tipoDocumento, "Seleccione el tipo de documento del NNA."],
    [!formData.personaId && !formData.fechaNacimiento, "Seleccione la fecha de nacimiento del NNA."],
    [!formData.academico.estadoInicialFscm, "Seleccione el estado académico inicial FSCM."],
    [!formData.academico.estadoInicial2026, "Seleccione el estado académico inicial 2026."],
    [!formData.academico.gradoAspirante, "Seleccione el grado/metodología aspirante."],
    [!formData.academico.jornada, "Seleccione la jornada del NNA."],
    [!formData.academico.anioIngreso, "Seleccione el año de ingreso del NNA."],
  ], mostrarAdvertencia);
}

function mostrarLoaderListado() {
  const cont = getCampo("nna-container");
  if (cont) cont.innerHTML = `<div class="col-span-full flex justify-center py-10">${Loader()}</div>`;
}

function renderizarNna(lista) {
  const cont = getCampo("nna-container");
  if (!cont) return;

  if (lista.length === 0) {
    cont.innerHTML = `<p class="col-span-full text-center text-gray-500 py-10">No hay registros de NNA que coincidan con la búsqueda.</p>`;
    return;
  }

  cont.innerHTML = lista.map(renderTarjetaNna).join("");
}

async function cargarDatosInicialesNna() {
  const [catalogos, nna, familias, pendientes] = await Promise.all([
    obtenerCatalogos(),
    obtenerNna(),
    obtenerFamilias(),
    obtenerNnaPendientes().catch(() => []),
  ]);

  catalogosNna = catalogos;
  nnaList = nna;
  familiasDisponibles = familias;
  pendientesDisponibles = pendientes;
}

function renderTarjetaNna(nna) {
  const estadoTexto = nna.estado || "Inactivo";
  const resumen = resumenAcademico(nna);
  return `
        <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-4 flex flex-col gap-2 hover:shadow-md transition-shadow">
            <div class="flex items-start justify-between">
                <span class="text-xs font-semibold text-gray-400">${nna.codigo || nna.id}</span>
                <span class="text-xs font-medium px-2 py-1 rounded-full ${estiloBadgeEstado(estadoTexto)}">${estadoTexto}</span>
            </div>
            <h3 class="text-base font-semibold text-gray-800">${nna.nombre || "Sin nombre"}</h3>
            <p class="text-sm text-gray-500">Hogar: ${nna.codigoHogar || nombreFamilia(nna.familiaId)}</p>
            <div class="text-sm text-gray-600 flex flex-col gap-1 mt-1">
                <span><i class="fa-solid fa-graduation-cap mr-1"></i> ${resumen.grado}</span>
                <span><i class="fa-solid fa-school mr-1"></i> ${resumen.colegio}</span>
            </div>
            <button class="btn-ver-perfil mt-3 w-full bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium py-2 rounded-lg transition-colors" data-id="${nna.id}">
                Ver perfil
            </button>
        </div>
    `;
}
