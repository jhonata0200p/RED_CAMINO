<<<<<<< HEAD
/**
 * FamilyController — lógica de familias (hogares).
 *
 * PUNTO DE ENTRADA: iniciarFamilias() (lo llama router.js al ir a /familias)
 * PERFIL COMPLETO: iniciarPerfilFamilia() (al ver detalle de un hogar)
 *
 * ÍNDICE DEL ARCHIVO:
 *  1. Variables globales
 *  2. Helpers (catálogos, pareja, integrantes, payload)
 *  3. Estado del formulario (formData + MAPA_CAMPOS)
 *  4. Cargar datos de la API al formulario (modo editar)
 *  5. Guardar / actualizar en la API
 *  6. iniciarFamilias() — arranque de la vista
 *  7. Navegación por pasos (1→4) y validaciones
 *  8. Paso 4: integrantes del hogar
 *  9. Listado, búsqueda, tarjetas, eliminar
 * 10. Perfil completo HTML (construirHtmlPerfilFamilia)
 */
import {
  obtenerFamilias,
  obtenerFamilia,
  crearFamilia,
  actualizarFamilia,
  eliminarFamilia,
  obtenerSiguienteCodigoHogar,
} from "../services/familyService.js";
import {
  mostrarExito,
  mostrarError,
  mostrarAdvertencia,
  mostrarInfo,
} from "../utils/alert.js";
import { FamilyCard } from "../components/cards/FamilyCard.js";
import { abrirModal, cerrarModal, iniciarModal } from "./ModalController.js";
import { navegar, obtenerRutaId } from "../router/router.js";
import { obtenerRol, usuarioActual } from "../store/session.js";
import { puedeRealizarAccion } from "../utils/permissions.js";
import { Select } from "../components/ui/Select.js";
import { calcularEdad, formatearFecha } from "../utils/helpers.js";
import { obtenerCatalogos } from "../services/catalogService.js";
import { llenarSelect, renderizarChecklist } from "../utils/catalogHelpers.js";
import {
  getCampo,
  setValorCampo,
  setCheckCampo,
  getValorCampo,
} from "../utils/domHelpers.js";
import { escribirValorAnidado } from "../utils/formHelpers.js";
import { renderIconoSiNo, listaHtml } from "../utils/renderHelpers.js";
import {
  VULNERABILIDADES_CATALOGO,
  PRIORIDADES_CATALOGO,
} from "../constants/catalogosFamilia.js";

// ─────────────────────────────────────────────────────────────────────────────
// 1. VARIABLES GLOBALES
// familias: listado en pantalla | catalogosFamilia: opciones de los <select>
// formData: "memoria" del formulario mientras el usuario llena los 4 pasos
// ─────────────────────────────────────────────────────────────────────────────
let familias = [];
let catalogosFamilia = null;

// ─────────────────────────────────────────────────────────────────────────────
// 2. HELPERS — catálogos, pareja, integrantes y armado del payload
// ─────────────────────────────────────────────────────────────────────────────

/** Lee los checkboxes de vulnerabilidades/prioridades y los guarda en formData */
function sincronizarVulnerabilidadesYPrioridades() {
  formData.vulnerabilidades = {};
  formData.prioridades = {};
  document.querySelectorAll('[id^="vuln_"]').forEach((el) => {
    const id = el.id.replace("vuln_", ""); // vuln_3 → "3"
    formData.vulnerabilidades[id] = el.checked;
  });
  document.querySelectorAll('[id^="prio_"]').forEach((el) => {
    const id = el.id.replace("prio_", "");
    formData.prioridades[id] = el.checked;
  });
}

/** Comprueba si la fecha de nacimiento corresponde a menor de 18 años */
function esMenorDeEdad(fechaNacimiento) {
  const edad = calcularEdad(fechaNacimiento);
  return edad !== "" && Number(edad) < 18;
}

function crearVulnerabilidadesInicial() {
  return {};
}

function crearPrioridadesInicial() {
  return {};
}

/** Convierte items del catálogo PostgreSQL al formato { value, label } del componente Select */
function opcionesDesdeCatalogo(clave) {
  return (catalogosFamilia?.[clave] || []).map((item) => ({
    value: String(item.id),
    label: item.nombre,
  }));
}

/** Llena todos los <select> y checklists del formulario con datos de PostgreSQL */
function aplicarCatalogosFamilia(
  cat,
  seleccionVuln = {},
  seleccionPrio = {},
  datos = null,
) {
  if (!cat) return;

  const paso1 = datos?.paso1 || formData.paso1;
  const jefe = datos?.jefeHogar || formData.jefeHogar;
  const pareja = datos?.pareja || formData.pareja;
  const vivienda = datos?.vivienda || formData.vivienda;

  llenarSelect("departamento", cat.departamento || [], paso1.departamento);
  llenarSelect("municipio", cat.municipio, paso1.municipio);
  llenarSelect("sector", cat.sectorZona, paso1.sector);
  llenarSelect("tipoVivienda", cat.tipoVivienda || [], vivienda.tipoVivienda);
  llenarSelect("tiempoVivienda", cat.tiempoVivienda || [], vivienda.tiempoVivienda);
  llenarSelect("materialVivienda", cat.materialPared, vivienda.materialVivienda);
  llenarSelect("situacionVivienda", cat.condicionNormalizacion, vivienda.situacionVivienda);
  llenarSelect("condicionGeneral", cat.condicionGeneral, vivienda.condicionGeneral);

  llenarSelect("jhTipoDocumento", cat.tipoDocumento, jefe.tipoDocumento);
  llenarSelect("jhSexo", cat.sexo, jefe.sexo);
  llenarSelect("jhNacionalidad", cat.nacionalidad, jefe.nacionalidad);
  llenarSelect("jhNivelEducativo", cat.nivelEducativo, jefe.nivelEducativo);
  llenarSelect("jhOcupacion", cat.ocupacion, jefe.ocupacion);
  llenarSelect("jhTipoTrabajo", cat.tipoTrabajo, jefe.tipoTrabajo);
  llenarSelect("jhEstadoCivil", cat.estadoCivil, jefe.estadoCivil);

  llenarSelect("parejaTipoDocumento", cat.tipoDocumento, pareja.tipoDocumento);
  llenarSelect("parejaSexo", cat.sexo, pareja.sexo);
  llenarSelect("parejaNacionalidad", cat.nacionalidad, pareja.nacionalidad);
  llenarSelect("parejaNivelEducativo", cat.nivelEducativo, pareja.nivelEducativo);
  llenarSelect("parejaOcupacion", cat.ocupacion, pareja.ocupacion);
  llenarSelect("parejaTipoTrabajo", cat.tipoTrabajo, pareja.tipoTrabajo);

  renderizarChecklist(
    "vulnerabilidadesContainer",
    "vuln",
    cat.vulnerabilidadHogar,
    seleccionVuln,
  );
  renderizarChecklist(
    "prioridadesContainer",
    "prio",
    cat.prioridadAtencion,
    seleccionPrio,
  );
}

async function cargarCatalogosFamilia(seleccionVuln = {}, seleccionPrio = {}, datos = null) {
  if (!catalogosFamilia) {
    catalogosFamilia = await obtenerCatalogos();
  }
  aplicarCatalogosFamilia(catalogosFamilia, seleccionVuln, seleccionPrio, datos);
}

/** Casado/Unión libre (ids 1 y 2) → muestra sección de pareja */
function requierePareja(estadoCivil) {
  return ["1", "2"].includes(String(estadoCivil));
}

function actualizarVisibilidadPareja() {
  const estado =
    formData.jefeHogar.estadoCivil ||
    getCampo("jhEstadoCivil")?.value ||
    "";
  formData.tienePareja = requierePareja(estado);
  const contenedor = getCampo("parejaContainer");
  if (contenedor) contenedor.hidden = !formData.tienePareja;
}

function contarAdultosIntegrantes() {
  return formData.integrantes.filter((integrante) => {
    if (integrante.tipoIntegrante === "mayor") return true;
    if (integrante.tipoIntegrante === "menor") return false;
    return integrante.fechaNacimiento && !esMenorDeEdad(integrante.fechaNacimiento);
  }).length;
}

function actualizarBotonesIntegrantes() {
  const botonMayor = getCampo("btnAgregarMayor");
  if (botonMayor) {
    const hayMayor = contarAdultosIntegrantes() >= 1;
    botonMayor.disabled = hayMayor;
    botonMayor.title = hayMayor ? "Solo se permite un adulto adicional" : "";
  }
}

function configurarBotonGuardarModoCrear() {
  const botonGuardar = getCampo("btnGuardarFamilia");
  if (!botonGuardar) return;
  botonGuardar.textContent = "Guardar";
  botonGuardar.onclick = null;
  botonGuardar.onclick = (e) => {
    e.preventDefault();
    guardarFamilia(e);
  };
}

function sexoIdDesdeValor(sexoId, sexoTexto) {
  if (sexoId) return String(sexoId);
  if (sexoTexto === "Femenino") return "2";
  if (sexoTexto === "Masculino") return "1";
  return String(sexoTexto || "");
}

let modoEdicion = false;

// ─────────────────────────────────────────────────────────────────────────────
// 3. ESTADO DEL FORMULARIO (equivalente a useState en React, pero con un objeto)
// formData guarda todo lo que el usuario escribe antes de pulsar Guardar
// ─────────────────────────────────────────────────────────────────────────────
=======
// Importa los servicios de familias
import {
    obtenerFamilias,
    obtenerFamilia,
    crearFamilia,
    eliminarFamilia
} from "../services/familyService.js";

// Importa las alertas toast
import {
    mostrarExito,
    mostrarError,
    mostrarAdvertencia,
    mostrarInfo
} from "../utils/alert.js";

// Importa la tarjeta de familia (vista tipo tarjeta del directorio)
import { FamilyCard } from "../components/cards/FamilyCard.js";

// Importa el controlador del modal
import {
    abrirModal,
    cerrarModal,
    iniciarModal
} from "./ModalController.js";

// Importa navegar y obtenerRutaId, para poder abrir el perfil de una familia
import { navegar, obtenerRutaId } from "../router/router.js";

// Importa la función que genera un id consecutivo (FAM-001, FAM-002...)
import { generarId } from "../utils/helpers.js";

// Importa el rol activo y el helper que valida acciones puntuales (editar/eliminar)
import { obtenerRol } from "../store/session.js";
import { puedeRealizarAccion } from "../utils/permissions.js";

// Importa el Select reutilizable, para el campo "Parentesco" del Paso 4
import { Select } from "../components/ui/Select.js";

// Opciones fijas del campo "Parentesco" (Paso 4: integrantes adultos)
const OPCIONES_PARENTESCO = [
    { value: "Cónyuge", label: "Cónyuge" },
    { value: "Hijo/a", label: "Hijo/a" },
    { value: "Tío/a", label: "Tío/a" },
    { value: "Abuelo/a", label: "Abuelo/a" },
    { value: "Otro", label: "Otro" }
];

// Guarda las familias cargadas desde la API
let familias = [];

// =====================================================================================
// "ESTADO" DEL FORMULARIO POR PASOS
// Como este proyecto no usa React, el equivalente a "const [formData, setFormData]
// = useState(...)" es una variable normal en el módulo, más una función que la
// vuelve a poner en blanco (crearEstadoInicial). Todos los inputs del formulario
// escriben aquí a través de manejarCambioCampo/manejarCambioIntegrante.
// =====================================================================================
>>>>>>> 280df765e7f5535d76cdf41e3963a143aaf6b39a
let formData = crearEstadoInicial();
let pasoActual = 1;
const TOTAL_PASOS = 4;

<<<<<<< HEAD
/** Estructura vacía del formulario de 4 pasos */
function crearEstadoInicial() {
  return {
    paso1: {
      codigoHogar: "",
      fechaVisita: "",
      profesional: "",
      departamento: "",
      municipio: "",
      sector: "",
      barrio: "",
      direccion: "",
      referencia: "",
      observaciones: "",
    },

    jefeHogar: {
      nombre: "",
      tipoDocumento: "",
      numero: "",
      fechaNacimiento: "",
      sexo: "",
      celular: "",
      email: "",
      nacionalidad: "",
      nivelEducativo: "",
      ocupacion: "",
      tipoTrabajo: "",
      estadoCivil: "",
    },

    tienePareja: false,

    pareja: {
      nombre: "",
      tipoDocumento: "",
      numero: "",
      fechaNacimiento: "",
      sexo: "",
      celular: "",
      nacionalidad: "",
      nivelEducativo: "",
      ocupacion: "",
      tipoTrabajo: "",
      estadoCivil: "",
    },

    vivienda: {
      tiempoVivienda: "",
      tipoVivienda: "",
      materialVivienda: "",
      situacionVivienda: "",
      cuartosTotales: 0,
      cuartosDormir: 0,
      condicionGeneral: "",
      servicios: {
        energia: false,
        gas: false,
        acueducto: false,
        aseo: false,
        alcantarillado: false,
        internet: false,
      },
      factores: {
        humedad: false,
        malosOlores: false,
        polvo: false,
        insectosRoedores: false,
      },
      riesgos: {
        inundacion: false,
        deslizamiento: false,
        hundimiento: false,
        incendio: false,
      },
    },

    // Integrantes del hogar (adultos y NNA): fechaNacimiento → edad; <18 = NNA
    integrantes: [],

    vulnerabilidades: crearVulnerabilidadesInicial(),
    prioridades: crearPrioridadesInicial(),
  };
=======
// Genera un código de hogar consecutivo (HOGAR-001, HOGAR-002...) a partir de las
// familias ya cargadas. Sigue la misma idea que generarId() en utils/helpers.js,
// pero el código de hogar vive dentro de "paso1.codigoHogar" y no en la raíz
// del registro, así que se resuelve aparte con esta función.
function generarCodigoHogar() {

    const codigosExistentes = familias
        .map(f => f.paso1?.codigoHogar)
        .filter(Boolean);

    if (codigosExistentes.length === 0) {
        return "HOGAR-001";
    }

    const numeros = codigosExistentes.map(codigo => Number(codigo.split("-")[1]) || 0);
    const siguienteNumero = Math.max(...numeros) + 1;

    return `HOGAR-${String(siguienteNumero).padStart(3, "0")}`;

}

function crearEstadoInicial() {

    return {

        paso1: {
            // Se genera solo, apenas se abre el formulario (ver generarCodigoHogar más abajo)
            codigoHogar: generarCodigoHogar(),
            pendiente: false,
            fechaVisita: "",
            profesional: "",
            departamento: "Atlántico",
            municipio: "",
            sector: "",
            barrio: "",
            direccion: "",
            referencia: "",
            condicion: ""
        },

        jefeHogar: {
            nombre: "", tipoDocumento: "", numero: "", fechaNacimiento: "",
            sexo: "", celular: "", email: "", nacionalidad: "",
            nivelEducativo: "", ocupacion: "", tipoTrabajo: "", estadoCivil: ""
        },

        tienePareja: false,

        pareja: {
            nombre: "", tipoDocumento: "", numero: "", fechaNacimiento: "",
            sexo: "", celular: "", nacionalidad: "",
            nivelEducativo: "", ocupacion: "", tipoTrabajo: "", estadoCivil: ""
        },

        vivienda: {
            tiempoVivienda: "", tipoVivienda: "", materialVivienda: "",
            situacionVivienda: "", cuartosTotales: 0, cuartosDormir: 0, condicionGeneral: "",
            servicios: { energia: false, gas: false, acueducto: false, aseo: false, alcantarillado: false, internet: false },
            factores: { humedad: false, malosOlores: false, polvo: false, insectosRoedores: false },
            riesgos: { inundacion: false, deslizamiento: false, hundimiento: false, incendio: false }
        },

        // Cada integrante adulto: { nombre, edad, sexo, parentesco, origen, educacion, actividad, aportaIngresos }
        integrantes: []

    };

>>>>>>> 280df765e7f5535d76cdf41e3963a143aaf6b39a
}

// Relaciona cada "id" de input con la posición que le corresponde dentro de formData.
// Ejemplo: "jhNombre" -> formData.jefeHogar.nombre
const MAPA_CAMPOS = {
<<<<<<< HEAD
  fechaVisita: "paso1.fechaVisita",
  profesional: "paso1.profesional",
  departamento: "paso1.departamento",
  municipio: "paso1.municipio",
  sector: "paso1.sector",
  barrio: "paso1.barrio",
  direccion: "paso1.direccion",
  referencia: "paso1.referencia",
  observaciones: "paso1.observaciones",

  jhNombre: "jefeHogar.nombre",
  jhTipoDocumento: "jefeHogar.tipoDocumento",
  jhNumero: "jefeHogar.numero",
  jhFechaNacimiento: "jefeHogar.fechaNacimiento",
  jhSexo: "jefeHogar.sexo",
  jhCelular: "jefeHogar.celular",
  jhEmail: "jefeHogar.email",
  jhNacionalidad: "jefeHogar.nacionalidad",
  jhNivelEducativo: "jefeHogar.nivelEducativo",
  jhOcupacion: "jefeHogar.ocupacion",
  jhTipoTrabajo: "jefeHogar.tipoTrabajo",
  jhEstadoCivil: "jefeHogar.estadoCivil",

  parejaNombre: "pareja.nombre",
  parejaTipoDocumento: "pareja.tipoDocumento",
  parejaNumero: "pareja.numero",
  parejaFechaNacimiento: "pareja.fechaNacimiento",
  parejaSexo: "pareja.sexo",
  parejaCelular: "pareja.celular",
  parejaNacionalidad: "pareja.nacionalidad",
  parejaNivelEducativo: "pareja.nivelEducativo",
  parejaOcupacion: "pareja.ocupacion",
  parejaTipoTrabajo: "pareja.tipoTrabajo",
  parejaEstadoCivil: "pareja.estadoCivil",

  tiempoVivienda: "vivienda.tiempoVivienda",
  tipoVivienda: "vivienda.tipoVivienda",
  materialVivienda: "vivienda.materialVivienda",
  situacionVivienda: "vivienda.situacionVivienda",
  cuartosTotales: "vivienda.cuartosTotales",
  cuartosDormir: "vivienda.cuartosDormir",
  condicionGeneral: "vivienda.condicionGeneral",

  servEnergia: "vivienda.servicios.energia",
  servGas: "vivienda.servicios.gas",
  servAcueducto: "vivienda.servicios.acueducto",
  servAseo: "vivienda.servicios.aseo",
  servAlcantarillado: "vivienda.servicios.alcantarillado",
  servInternet: "vivienda.servicios.internet",

  factorHumedad: "vivienda.factores.humedad",
  factorMalosOlores: "vivienda.factores.malosOlores",
  factorPolvo: "vivienda.factores.polvo",
  factorInsectosRoedores: "vivienda.factores.insectosRoedores",

  riesgoInundacion: "vivienda.riesgos.inundacion",
  riesgoDeslizamiento: "vivienda.riesgos.deslizamiento",
  riesgoHundimiento: "vivienda.riesgos.hundimiento",
  riesgoIncendio: "vivienda.riesgos.incendio",
};

// Vulnerabilidades y prioridades se sincronizan con sincronizarVulnerabilidadesYPrioridades()

// ─────────────────────────────────────────────────────────────────────────────
// 4. CARGAR DATOS — de la API hacia el formulario (modo editar)
// ─────────────────────────────────────────────────────────────────────────────

/** Pide la familia al backend, llena el modal y cambia el botón a "Actualizar" */
async function cargarFamiliaParaEditar(id) {
  try {
    const respuesta = await obtenerFamilia(id); // GET /hogares/:id
    const familia = respuesta?.data || respuesta;

    if (!familia || Object.keys(familia).length === 0) {
      mostrarError("No se pudo cargar la familia para editar.");
      return;
    }

    modoEdicion = true; // prepararFormulario() no reseteará el form
    cargarDatosEnFormulario(familia); // inputs + formData + integrantes

    getCampo("formTituloModal").textContent = "✏️ Editar familia";

    const botonGuardar = getCampo("btnGuardarFamilia");
    botonGuardar.textContent = "Actualizar";
    botonGuardar.onclick = (e) => {
      e.preventDefault();
      guardarFamiliaEditada(id); // PUT en lugar de POST
    };

    pasoActual = 1;
    irAlPaso(1);
    getCampo("parejaContainer").hidden = !formData.tienePareja;
    actualizarVisibilidadPareja();
    abrirModal("modalFamilia");
  } catch (error) {
    console.error("Error al cargar la familia para editar:", error);
    mostrarError("No se pudo cargar la familia para editar.");
  }
}

/** Pone cada valor en su input y reconstruye formData + integrantes */
function cargarDatosEnFormulario(familia) {
  const vivienda = familia.vivienda || {};

  // ── Paso 1: datos operativos y ubicación ──
  setValorCampo("codigoHogar", familia.codigo || "");
  setValorCampo("fechaVisita", String(familia.fecha_visita || "").split("T")[0] || "");
  setValorCampo("profesional", familia.profesional || "");
  setValorCampo("departamento", vivienda.departamento_id || "");
  setValorCampo("municipio", vivienda.municipio_id || "");
  setValorCampo("sector", vivienda.sector_zona_id || "");
  setValorCampo("barrio", vivienda.barrio || familia.barrio || "");
  setValorCampo("direccion", vivienda.direccion || familia.direccion || "");
  setValorCampo("referencia", vivienda.otra_referencia || "");
  setValorCampo("observaciones", familia.observaciones || "");

  // ── Paso 2: jefe(a) de hogar ──
  const jefe = familia.jefeHogar || {};
  setValorCampo("jhNombre", jefe.nombre || "");
  setValorCampo("jhTipoDocumento", jefe.tipoDocumento || "");
  setValorCampo("jhNumero", jefe.numero || "");
  setValorCampo("jhFechaNacimiento", String(jefe.fechaNacimiento || "").split("T")[0] || "");
  setValorCampo("jhSexo", jefe.sexo || "");
  setValorCampo("jhCelular", jefe.celular || "");
  setValorCampo("jhEmail", jefe.email || "");
  setValorCampo("jhNacionalidad", jefe.nacionalidad || "");
  setValorCampo("jhNivelEducativo", jefe.nivelEducativo || "");
  setValorCampo("jhOcupacion", jefe.ocupacion || "");
  setValorCampo("jhTipoTrabajo", jefe.tipoTrabajo || "");
  setValorCampo("jhEstadoCivil", jefe.estadoCivil || "");

  // ── Pareja (solo si estado civil lo requiere) ──
  const pareja = familia.pareja || {};
  const tienePareja = Boolean(familia.tienePareja) || requierePareja(jefe.estadoCivil);
  formData.tienePareja = tienePareja;
  getCampo("parejaContainer").hidden = !tienePareja;

  if (tienePareja) {
    setValorCampo("parejaNombre", pareja.nombre || "");
    setValorCampo("parejaTipoDocumento", pareja.tipoDocumento || "");
    setValorCampo("parejaNumero", pareja.numero || "");
    setValorCampo("parejaFechaNacimiento", String(pareja.fechaNacimiento || "").split("T")[0] || "");
    setValorCampo("parejaSexo", pareja.sexo || "");
    setValorCampo("parejaCelular", pareja.celular || "");
    setValorCampo("parejaNacionalidad", pareja.nacionalidad || "");
    setValorCampo("parejaNivelEducativo", pareja.nivelEducativo || "");
    setValorCampo("parejaOcupacion", pareja.ocupacion || "");
    setValorCampo("parejaTipoTrabajo", pareja.tipoTrabajo || "");
  }

  // ── Paso 3: vivienda ──
  setValorCampo("tipoVivienda", vivienda.tipo_vivienda || familia.tipo_vivienda || "");
  setValorCampo("tiempoVivienda", familia.tiempo_vivienda || "");
  setValorCampo("materialVivienda", vivienda.material_pared_id || "");
  setValorCampo("situacionVivienda", vivienda.condicion_normalizacion_id || "");
  setValorCampo("cuartosTotales", vivienda.total_cuartos || "");
  setValorCampo("cuartosDormir", vivienda.cuartos_dormir || "");
  setValorCampo("condicionGeneral", vivienda.condicion_general_id || "");

  // ── Sincronizar formData con lo que quedó en los inputs ──
  formData = crearEstadoInicial();
  sincronizarPaso1DesdeFormulario(familia.codigo);
  sincronizarJefeParejaDesdeDatos(jefe, pareja, tienePareja);
  sincronizarViviendaDesdeFormulario();

  // Servicios / factores / riesgos (checkboxes)
  sincronizarServiciosDesdeApi(familia.servicios || {});

  // ── Vulnerabilidades y prioridades (checkboxes) ──
  formData.vulnerabilidades = crearVulnerabilidadesInicial();
  formData.prioridades = crearPrioridadesInicial();

  if (Array.isArray(familia.vulnerabilidadesIds)) {
    marcarSeleccionChecklist(
      formData.vulnerabilidades,
      "vuln",
      familia.vulnerabilidadesIds,
    );
  } else if (Array.isArray(familia.vulnerabilidades)) {
    marcarChecklistPorEtiquetas(
      formData.vulnerabilidades,
      "vuln",
      VULNERABILIDADES_CATALOGO,
      familia.vulnerabilidades,
    );
  }

  if (Array.isArray(familia.prioridadesIds)) {
    marcarSeleccionChecklist(
      formData.prioridades,
      "prio",
      familia.prioridadesIds,
    );
  } else if (Array.isArray(familia.prioridades)) {
    marcarChecklistPorEtiquetas(
      formData.prioridades,
      "prio",
      PRIORIDADES_CATALOGO,
      familia.prioridades,
    );
  }

  // ── Paso 4: integrantes adultos + NNA registrados en el hogar ──
  formData.integrantes = [
    ...(Array.isArray(familia.integrantes)
      ? familia.integrantes.map((i) => ({
          nombre: i.nombre || "",
          fechaNacimiento: String(i.fechaNacimiento || i.fecha_nacimiento || "").split("T")[0],
          sexo: sexoIdDesdeValor(i.sexo_id, i.sexo),
          parentesco: String(i.parentesco_id || ""),
          origen: String(i.origen_id || ""),
          actividad: String(i.actividad_id || ""),
          aportaIngresos: i.aporta_ingresos === "SI" || i.aportaIngresos === true,
          documento: "",
          escolaridad: "",
          discapacidad: "",
          esHijoJefe: "",
        }))
      : []),
    ...(Array.isArray(familia.nna)
      ? familia.nna.map((n) => ({
          nombre: n.nombre || "",
          fechaNacimiento: String(n.fechaNacimiento || n.fecha_nacimiento || "").split("T")[0],
          sexo: sexoIdDesdeValor(n.sexo_id, n.sexo),
          parentesco: "",
          origen: String(n.origen_id || ""),
          actividad: "",
          aportaIngresos: false,
          documento: n.documento || n.numero_documento || "",
          tipoDocumento: String(n.tipo_documento_id || n.tipoDocumentoId || ""),
          escolaridad: String(n.escolaridad_id || ""),
          discapacidad: String(n.discapacidad_id || ""),
          esHijoJefe: String(n.es_hijo_jefe_id || ""),
          pendienteConfirmacion: Boolean(n.pendienteConfirmacion || n.pendiente_confirmacion),
        }))
      : []),
  ];
  renderizarIntegrantesAdultos();
  aplicarCatalogosFamilia(
    catalogosFamilia,
    formData.vulnerabilidades,
    formData.prioridades,
    formData,
  );
  actualizarVisibilidadPareja();
}

function sincronizarPaso1DesdeFormulario(codigoHogar = "") {
  formData.paso1.codigoHogar = codigoHogar || formData.paso1.codigoHogar;
  formData.paso1.fechaVisita = getValorCampo("fechaVisita");
  formData.paso1.profesional = getValorCampo("profesional");
  formData.paso1.departamento = getValorCampo("departamento");
  formData.paso1.municipio = getValorCampo("municipio");
  formData.paso1.sector = getValorCampo("sector");
  formData.paso1.barrio = getValorCampo("barrio");
  formData.paso1.direccion = getValorCampo("direccion");
  formData.paso1.referencia = getValorCampo("referencia");
  formData.paso1.observaciones = getValorCampo("observaciones");
}

function sincronizarJefeParejaDesdeDatos(jefe, pareja, tienePareja) {
  formData.tienePareja = tienePareja;
  formData.jefeHogar = {
    ...formData.jefeHogar,
    nombre: jefe.nombre || "",
    tipoDocumento: String(jefe.tipoDocumento || ""),
    numero: jefe.numero || "",
    fechaNacimiento: String(jefe.fechaNacimiento || "").split("T")[0] || "",
    sexo: String(jefe.sexo || ""),
    celular: jefe.celular || "",
    email: jefe.email || "",
    nacionalidad: String(jefe.nacionalidad || ""),
    nivelEducativo: String(jefe.nivelEducativo || ""),
    ocupacion: String(jefe.ocupacion || ""),
    tipoTrabajo: String(jefe.tipoTrabajo || ""),
    estadoCivil: String(jefe.estadoCivil || ""),
  };

  if (!tienePareja) return;
  formData.pareja = {
    ...formData.pareja,
    nombre: pareja.nombre || "",
    tipoDocumento: String(pareja.tipoDocumento || ""),
    numero: pareja.numero || "",
    fechaNacimiento: String(pareja.fechaNacimiento || "").split("T")[0] || "",
    sexo: String(pareja.sexo || ""),
    celular: pareja.celular || "",
    nacionalidad: String(pareja.nacionalidad || ""),
    nivelEducativo: String(pareja.nivelEducativo || ""),
    ocupacion: String(pareja.ocupacion || ""),
    tipoTrabajo: String(pareja.tipoTrabajo || ""),
  };
}

function sincronizarViviendaDesdeFormulario() {
  formData.vivienda.tipoVivienda = getValorCampo("tipoVivienda");
  formData.vivienda.tiempoVivienda = getValorCampo("tiempoVivienda");
  formData.vivienda.materialVivienda = getValorCampo("materialVivienda");
  formData.vivienda.situacionVivienda = getValorCampo("situacionVivienda");
  formData.vivienda.cuartosTotales = Number(getValorCampo("cuartosTotales")) || 0;
  formData.vivienda.cuartosDormir = Number(getValorCampo("cuartosDormir")) || 0;
  formData.vivienda.condicionGeneral = getValorCampo("condicionGeneral");
}

function sincronizarServiciosDesdeApi(serviciosApi) {
  const setCheck = (id, destino, clave) => {
    const el = getCampo(id);
    if (el) destino[clave] = el.checked;
  };

  setCheckCampo("servEnergia", serviciosApi["Energía Eléctrica"] ?? serviciosApi.energia);
  setCheckCampo("servGas", serviciosApi["Gas Natural"] ?? serviciosApi.gas);
  setCheckCampo("servAcueducto", serviciosApi.Acueducto ?? serviciosApi.acueducto);
  setCheckCampo("servAseo", serviciosApi["Aseo Público"] ?? serviciosApi.aseo);
  setCheckCampo("servAlcantarillado", serviciosApi.Alcantarillado ?? serviciosApi.alcantarillado);
  setCheckCampo("servInternet", serviciosApi.Internet ?? serviciosApi.internet);
  setCheck("servEnergia", formData.vivienda.servicios, "energia");
  setCheck("servGas", formData.vivienda.servicios, "gas");
  setCheck("servAcueducto", formData.vivienda.servicios, "acueducto");
  setCheck("servAseo", formData.vivienda.servicios, "aseo");
  setCheck("servAlcantarillado", formData.vivienda.servicios, "alcantarillado");
  setCheck("servInternet", formData.vivienda.servicios, "internet");
}

function marcarSeleccionChecklist(destino, prefijoId, ids = []) {
  ids.forEach((id) => {
    const key = String(id);
    destino[key] = true;
    const el = getCampo(`${prefijoId}_${id}`);
    if (el) el.checked = true;
  });
}

// Marca checkboxes cuando la API devuelve etiquetas de texto en lugar de IDs
function marcarChecklistPorEtiquetas(destino, prefijoId, catalogo, etiquetas = []) {
  catalogo.forEach(({ id, label }) => {
    const coincide = etiquetas.some(
      (etiqueta) => String(etiqueta).toLowerCase() === label.toLowerCase(),
    );
    if (!coincide) return;

    destino[String(id)] = true;
    const el = getCampo(`${prefijoId}_${id}`);
    if (el) el.checked = true;
  });
}

/** Arma el objeto JSON que se envía al backend al crear o editar */
function construirPayloadFamilia({ modoCreacion = false } = {}) {
  // Datos comunes en creación y edición
  const base = {
    jefeHogar: formData.jefeHogar,
    pareja: formData.pareja,
    tienePareja: formData.tienePareja,
    vivienda: formData.vivienda,
    integrantes: formData.integrantes,
    vulnerabilidades: formData.vulnerabilidades,
    prioridades: formData.prioridades,
  };

  // Edición: incluye paso1 completo (con código ya existente)
  if (!modoCreacion) {
    return { paso1: formData.paso1, ...base };
  }

  // Creación: el backend genera el código; quitamos codigoHogar del payload
  const { codigoHogar, ...paso1SinCodigo } = formData.paso1;
  return {
    responsable: formData.jefeHogar.nombre,   // campos resumen para la tarjeta
    documento: formData.jefeHogar.numero,
    barrio: formData.paso1.barrio,
    estado: "Activo",
    paso1: paso1SinCodigo,
    ...base,
  };
}

function esIntegranteNna(integrante) {
  return (
    integrante.tipoIntegrante === "menor" ||
    (integrante.tipoIntegrante !== "mayor" &&
      esMenorDeEdad(integrante.fechaNacimiento))
  );
}

function etiquetaTipoIntegrante(integrante) {
  if (integrante.tipoIntegrante === "mayor") return "Adulto (18+)";
  if (integrante.tipoIntegrante === "menor") return "NNA (menor de 18)";
  if (!integrante.fechaNacimiento) return "Indique la fecha de nacimiento";
  return esIntegranteNna(integrante) ? "NNA (menor de 18)" : "Adulto (18+)";
}

// ─────────────────────────────────────────────────────────────────────────────
// 5. GUARDAR — del formulario hacia la API
// ─────────────────────────────────────────────────────────────────────────────

/** Valida, envía PUT y refresca la lista de tarjetas */
async function guardarFamiliaEditada(id) {
  try {
    // Validar formulario completo
    if (!validarFormularioCompleto()) return;

    sincronizarVulnerabilidadesYPrioridades();
    actualizarVisibilidadPareja();

    // Preparar los datos de la familia
    const familiaEditada = construirPayloadFamilia();


    // Actualizar en la API
    await actualizarFamilia(id, familiaEditada);

    mostrarExito("Familia actualizada correctamente.");

    // Recargar la lista
    familias = await obtenerFamilias();
    renderizarTarjetas(familias);

    cerrarModal("modalFamilia");

    // ✅ Desactivar modo edición y restaurar el formulario
    modoEdicion = false;
    prepararFormulario();

    // Restaurar el botón de guardar
    configurarBotonGuardarModoCrear();
  } catch (error) {
    console.error("Error al actualizar la familia:", error);
    mostrarError("No se pudo actualizar la familia.");
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// 6. INICIO DE LA VISTA — exportada; la llama router.js
// ─────────────────────────────────────────────────────────────────────────────
export async function iniciarFamilias() {
  try {
    // 1) Catálogos de selects (departamentos, sexo, etc.)
    await cargarCatalogosFamilia();
    // 2) Lista de hogares desde la API
    familias = await obtenerFamilias().catch(() => []);
    renderizarTarjetas(familias);

    // 3) Modales (cerrar con X o clic fuera)
    iniciarModal();

    const botonNuevaFamilia = getCampo("btnNuevaFamilia");

    if (botonNuevaFamilia) {
      botonNuevaFamilia.addEventListener("click", async () => {
        modoEdicion = false;
        configurarBotonGuardarModoCrear();
        prepararFormulario();
        await cargarCatalogosFamilia();
        getCampo("formTituloModal").textContent = "Registrar familia";
        abrirModal("modalFamilia");
      });
    }

    const buscador = getCampo("buscarFamilia");
    if (buscador) {
      buscador.addEventListener("input", filtrarFamilias);
    }

    // 4) Listeners del formulario modal (pasos, campos, integrantes)
    inicializarNavegacionPorPasos();
    inicializarManejadoresDeCampos();
    inicializarIntegrantesAdultos();

    // 5) Un solo listener para ver / editar / eliminar en las tarjetas
    document.removeEventListener("click", manejarClickTabla);
    document.addEventListener("click", manejarClickTabla);
  } catch (error) {
    console.error("Error al iniciar el módulo de familias:", error);
    mostrarError("No se pudieron cargar las familias.");
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// 7. NAVEGACIÓN POR PASOS (1: operativo, 2: jefe, 3: vivienda, 4: integrantes)
// ─────────────────────────────────────────────────────────────────────────────
function inicializarNavegacionPorPasos() {
  const botonAnterior = getCampo("btnPasoAnterior");
  const botonSiguiente = getCampo("btnPasoSiguiente");

  // Los botones del indicador superior (1, 2, 3, 4) también permiten saltar de paso
  const botonesIndicador = document.querySelectorAll(
    "#pasosFamilia .form-tab-btn",
  );

  botonesIndicador.forEach((boton) => {
    boton.addEventListener("click", () => irAlPaso(Number(boton.dataset.paso)));
  });

  if (botonAnterior) {
    botonAnterior.addEventListener("click", () => irAlPaso(pasoActual - 1));
  }

  if (botonSiguiente) {
    botonSiguiente.addEventListener("click", () => {
      if (!validarPaso(pasoActual)) return;

      irAlPaso(pasoActual + 1);
    });
  }
=======

    pendiente: "paso1.pendiente",
    fechaVisita: "paso1.fechaVisita",
    profesional: "paso1.profesional",
    municipio: "paso1.municipio",
    sector: "paso1.sector",
    barrio: "paso1.barrio",
    direccion: "paso1.direccion",
    referencia: "paso1.referencia",
    condicion: "paso1.condicion",

    jhNombre: "jefeHogar.nombre",
    jhTipoDocumento: "jefeHogar.tipoDocumento",
    jhNumero: "jefeHogar.numero",
    jhFechaNacimiento: "jefeHogar.fechaNacimiento",
    jhSexo: "jefeHogar.sexo",
    jhCelular: "jefeHogar.celular",
    jhEmail: "jefeHogar.email",
    jhNacionalidad: "jefeHogar.nacionalidad",
    jhNivelEducativo: "jefeHogar.nivelEducativo",
    jhOcupacion: "jefeHogar.ocupacion",
    jhTipoTrabajo: "jefeHogar.tipoTrabajo",
    jhEstadoCivil: "jefeHogar.estadoCivil",

    parejaNombre: "pareja.nombre",
    parejaTipoDocumento: "pareja.tipoDocumento",
    parejaNumero: "pareja.numero",
    parejaFechaNacimiento: "pareja.fechaNacimiento",
    parejaSexo: "pareja.sexo",
    parejaCelular: "pareja.celular",
    parejaNacionalidad: "pareja.nacionalidad",
    parejaNivelEducativo: "pareja.nivelEducativo",
    parejaOcupacion: "pareja.ocupacion",
    parejaTipoTrabajo: "pareja.tipoTrabajo",
    parejaEstadoCivil: "pareja.estadoCivil",

    tiempoVivienda: "vivienda.tiempoVivienda",
    tipoVivienda: "vivienda.tipoVivienda",
    materialVivienda: "vivienda.materialVivienda",
    situacionVivienda: "vivienda.situacionVivienda",
    cuartosTotales: "vivienda.cuartosTotales",
    cuartosDormir: "vivienda.cuartosDormir",
    condicionGeneral: "vivienda.condicionGeneral",

    servEnergia: "vivienda.servicios.energia",
    servGas: "vivienda.servicios.gas",
    servAcueducto: "vivienda.servicios.acueducto",
    servAseo: "vivienda.servicios.aseo",
    servAlcantarillado: "vivienda.servicios.alcantarillado",
    servInternet: "vivienda.servicios.internet",

    factorHumedad: "vivienda.factores.humedad",
    factorMalosOlores: "vivienda.factores.malosOlores",
    factorPolvo: "vivienda.factores.polvo",
    factorInsectosRoedores: "vivienda.factores.insectosRoedores",

    riesgoInundacion: "vivienda.riesgos.inundacion",
    riesgoDeslizamiento: "vivienda.riesgos.deslizamiento",
    riesgoHundimiento: "vivienda.riesgos.hundimiento",
    riesgoIncendio: "vivienda.riesgos.incendio"

};

// Lee un valor anidado a partir de una ruta tipo "vivienda.servicios.energia"
function leerValorAnidado(objeto, ruta) {
    return ruta.split(".").reduce((actual, llave) => (actual ? actual[llave] : undefined), objeto);
}

// Escribe un valor anidado a partir de una ruta tipo "vivienda.servicios.energia"
function escribirValorAnidado(objeto, ruta, valor) {

    const llaves = ruta.split(".");
    const ultimaLlave = llaves.pop();

    const contenedor = llaves.reduce((actual, llave) => actual[llave], objeto);

    contenedor[ultimaLlave] = valor;

}

// Inicializa la vista de familias
export async function iniciarFamilias() {

    try {

        familias = await obtenerFamilias();
        renderizarTarjetas(familias);

        iniciarModal();

        const botonNuevaFamilia = document.getElementById("btnNuevaFamilia");

        if (botonNuevaFamilia) {
            botonNuevaFamilia.addEventListener("click", () => {
                prepararFormulario();
                abrirModal("modalFamilia");
            });
        }

        const buscador = document.getElementById("buscarFamilia");

        if (buscador) {
            buscador.addEventListener("input", filtrarFamilias);
        }

        inicializarNavegacionPorPasos();
        inicializarManejadoresDeCampos();
        inicializarIntegrantesAdultos();

        document.removeEventListener("click", manejarClickTabla);
        document.addEventListener("click", manejarClickTabla);

    } catch (error) {

        console.error("Error al iniciar el módulo de familias:", error);
        mostrarError("No se pudieron cargar las familias.");

    }

}

// =====================================================================================
// NAVEGACIÓN "SIGUIENTE / ANTERIOR" ENTRE LOS 4 PASOS
// =====================================================================================
function inicializarNavegacionPorPasos() {

    const botonAnterior = document.getElementById("btnPasoAnterior");
    const botonSiguiente = document.getElementById("btnPasoSiguiente");

    // Los botones del indicador superior (1, 2, 3, 4) también permiten saltar de paso
    const botonesIndicador = document.querySelectorAll("#pasosFamilia .form-tab-btn");

    botonesIndicador.forEach(boton => {
        boton.addEventListener("click", () => irAlPaso(Number(boton.dataset.paso)));
    });

    if (botonAnterior) {
        botonAnterior.addEventListener("click", () => irAlPaso(pasoActual - 1));
    }

    if (botonSiguiente) {
        botonSiguiente.addEventListener("click", () => {

            if (!validarPaso(pasoActual)) return;

            irAlPaso(pasoActual + 1);

        });
    }

>>>>>>> 280df765e7f5535d76cdf41e3963a143aaf6b39a
}

// Cambia de paso: actualiza qué panel se ve, el indicador y los botones Anterior/Siguiente/Guardar
function irAlPaso(numeroPaso) {
<<<<<<< HEAD
  if (numeroPaso < 1 || numeroPaso > TOTAL_PASOS) return;

  pasoActual = numeroPaso;

  // Resalta el tab activo (1, 2, 3 o 4) en la barra superior
  document
    .querySelectorAll("#pasosFamilia .form-tab-btn")
    .forEach((boton, indice) => {
      boton.classList.toggle("active", indice === pasoActual - 1);
    });

  // Muestra solo el panel del paso actual (data-paso-panel="1" etc.)
  document.querySelectorAll(".form-tab-panel").forEach((panel) => {
    panel.classList.toggle(
      "active",
      Number(panel.dataset.pasoPanel) === pasoActual,
    );
  });

  const botonAnterior = getCampo("btnPasoAnterior");
  const botonSiguiente = getCampo("btnPasoSiguiente");
  const botonGuardar = getCampo("btnGuardarFamilia");

  botonAnterior.hidden = pasoActual === 1;           // oculto en paso 1
  botonSiguiente.hidden = pasoActual === TOTAL_PASOS; // oculto en paso 4
  botonGuardar.hidden = pasoActual !== TOTAL_PASOS;   // Guardar solo en paso 4
=======

    if (numeroPaso < 1 || numeroPaso > TOTAL_PASOS) return;

    pasoActual = numeroPaso;

    document.querySelectorAll("#pasosFamilia .form-tab-btn").forEach((boton, indice) => {
        boton.classList.toggle("active", indice === pasoActual - 1);
    });

    document.querySelectorAll(".form-tab-panel").forEach(panel => {
        panel.classList.toggle("active", Number(panel.dataset.pasoPanel) === pasoActual);
    });

    const botonAnterior = document.getElementById("btnPasoAnterior");
    const botonSiguiente = document.getElementById("btnPasoSiguiente");
    const botonGuardar = document.getElementById("btnGuardarFamilia");

    botonAnterior.hidden = pasoActual === 1;
    botonSiguiente.hidden = pasoActual === TOTAL_PASOS;
    botonGuardar.hidden = pasoActual !== TOTAL_PASOS;

>>>>>>> 280df765e7f5535d76cdf41e3963a143aaf6b39a
}

// Valida lo mínimo de cada paso antes de dejar avanzar al siguiente
function validarPaso(numeroPaso) {
<<<<<<< HEAD
  if (numeroPaso === 1) {
    if (!paso1Valido()) {
      mostrarAdvertencia(
        "Complete fecha de visita, departamento, municipio, sector, barrio y direccion antes de continuar.",
      );
      return false;
    }
  }

  if (numeroPaso === 2) {
    if (!paso2Valido()) {
      mostrarAdvertencia(
        "Complete todos los campos obligatorios del jefe(a) de hogar.",
      );
      return false;
    }
  }

  if (numeroPaso === 3) {
    if (!paso3Valido()) {
      mostrarAdvertencia(
        "Complete los campos obligatorios de vivienda antes de continuar.",
      );
      return false;
    }
  }

  return true;
}

function paso1Valido() {
  return Boolean(
    formData.paso1.fechaVisita &&
      formData.paso1.departamento &&
      formData.paso1.municipio &&
      formData.paso1.sector &&
      formData.paso1.barrio &&
      formData.paso1.direccion,
  );
}

function paso2Valido() {
  return Boolean(
    formData.jefeHogar.nombre &&
      formData.jefeHogar.tipoDocumento &&
      formData.jefeHogar.numero &&
      formData.jefeHogar.fechaNacimiento &&
      formData.jefeHogar.sexo &&
      formData.jefeHogar.celular &&
      formData.jefeHogar.nacionalidad &&
      formData.jefeHogar.nivelEducativo &&
      formData.jefeHogar.ocupacion &&
      formData.jefeHogar.estadoCivil,
  );
}

function paso3Valido() {
  return Boolean(
    formData.vivienda.tipoVivienda &&
      formData.vivienda.materialVivienda &&
      formData.vivienda.situacionVivienda &&
      formData.vivienda.cuartosTotales &&
      formData.vivienda.cuartosDormir &&
      formData.vivienda.condicionGeneral,
  );
=======

    if (numeroPaso === 1) {

        if (!formData.paso1.fechaVisita || !formData.paso1.municipio || !formData.paso1.barrio || !formData.paso1.direccion) {
            mostrarAdvertencia("Complete fecha de visita, municipio, barrio y dirección antes de continuar.");
            return false;
        }

    }

    if (numeroPaso === 2) {

        if (!formData.jefeHogar.nombre || !formData.jefeHogar.numero) {
            mostrarAdvertencia("Complete el nombre y el documento del jefe(a) de hogar.");
            return false;
        }

    }

    return true;

>>>>>>> 280df765e7f5535d76cdf41e3963a143aaf6b39a
}

// =====================================================================================
// MANEJADORES DE CAMBIO (equivalentes a "onChange" en React, pero con addEventListener)
// En vez de poner un listener por cada uno de los ~40 campos, se usa delegación de
// eventos sobre el formulario completo: cada vez que algo cambia, se revisa el "id"
// del campo contra MAPA_CAMPOS y se actualiza formData en la posición correcta.
// =====================================================================================
function inicializarManejadoresDeCampos() {
<<<<<<< HEAD
  const formulario = getCampo("formFamilia");

  if (!formulario) return;

  formulario.addEventListener("input", manejarCambioCampo);
  formulario.addEventListener("change", manejarCambioCampo);

  formulario.addEventListener("submit", guardarFamilia);
}

// Se ejecuta con cada tecla/selección en cualquier campo del formulario.
// Flujo: id del input → MAPA_CAMPOS → escribirValorAnidado → formData actualizado
function manejarCambioCampo(evento) {
  const campo = evento.target;
  const ruta = MAPA_CAMPOS[campo.id];

  // Si el campo no está en el mapa (ej. botones), lo ignoramos
  if (!ruta) return;

  let valor = campo.value;

  // Checkboxes y números necesitan tratamiento especial
  if (campo.type === "checkbox") valor = campo.checked;
  if (campo.type === "number")
    valor = campo.value === "" ? 0 : Number(campo.value);

  escribirValorAnidado(formData, ruta, valor);

  // Casado/Unión libre → mostrar u ocultar bloque de pareja
  if (campo.id === "jhEstadoCivil") {
    actualizarVisibilidadPareja();
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// 8. PASO 4 — integrantes del hogar (adultos y NNA menores de 18)
// ─────────────────────────────────────────────────────────────────────────────
function inicializarIntegrantesAdultos() {
  const botonMayor = getCampo("btnAgregarMayor");
  const botonMenor = getCampo("btnAgregarMenor");

  if (botonMayor) {
    botonMayor.addEventListener("click", agregarIntegranteMayor);
  }
  if (botonMenor) {
    botonMenor.addEventListener("click", agregarIntegranteMenor);
  }

  const contenedor = getCampo("integrantesAdultosContainer");

  if (contenedor) {
    contenedor.addEventListener("input", manejarCambioIntegrante);
    contenedor.addEventListener("change", manejarCambioIntegrante);

    contenedor.addEventListener("click", (evento) => {
      const botonEliminar = evento.target.closest(
        "button[data-accion='eliminar-integrante']",
      );
      if (!botonEliminar) return;

      const indice = Number(botonEliminar.dataset.indice);
      formData.integrantes.splice(indice, 1);

      renderizarIntegrantesAdultos();
    });
  }
}

function esIntegranteMenor(integrante) {
  if (integrante.tipoIntegrante === "menor") return true;
  if (integrante.tipoIntegrante === "mayor") return false;
  return esMenorDeEdad(integrante.fechaNacimiento);
}

function integranteVacio(tipoIntegrante = "menor") {
  return {
    tipoIntegrante,
    nombre: "",
    fechaNacimiento: "",
    sexo: "",
    tipoDocumento: "",
    parentesco: "",
    origen: "",
    actividad: "",
    aportaIngresos: false,
    documento: "",
    escolaridad: "1",
    discapacidad: "8",
    esHijoJefe: "",
    pendienteConfirmacion: false,
  };
}

function agregarIntegranteMayor() {
  if (contarAdultosIntegrantes() >= 1) {
    mostrarAdvertencia("Solo se permite agregar un adulto adicional.");
    return;
  }
  formData.integrantes.push(integranteVacio("mayor"));
  renderizarIntegrantesAdultos();
}

function agregarIntegranteMenor() {
  formData.integrantes.push(integranteVacio("menor"));
  renderizarIntegrantesAdultos();
}

/** Pinta la lista dinámica de integrantes en el paso 4 (HTML generado en JS) */
function renderizarIntegrantesAdultos() {
  const contenedor = getCampo("integrantesAdultosContainer");

  if (!contenedor) return;

  if (formData.integrantes.length === 0) {
    contenedor.innerHTML = `<p class="form-hint">Todavía no hay integrantes agregados.</p>`;
    actualizarBotonesIntegrantes();
    return;
  }

  contenedor.innerHTML = formData.integrantes
    .map((integrante, indice) => {
      const edad = calcularEdad(integrante.fechaNacimiento);
      const esNna = esIntegranteNna(integrante);
      const etiquetaTipo = etiquetaTipoIntegrante(integrante);

      return `
        <div class="integrante-row" data-indice="${indice}">
            <div class="form-group" style="grid-column:1/-1;">
                <span class="form-hint"><strong>${etiquetaTipo}</strong></span>
            </div>

            <div class="form-group">
                <label>Nombre</label>
                <input type="text" data-campo="nombre" data-indice="${indice}" value="${integrante.nombre || ""}" placeholder="Nombre completo">
            </div>

            <div class="form-group">
                <label>Fecha de nacimiento</label>
                <input type="date" data-campo="fechaNacimiento" data-indice="${indice}" value="${integrante.fechaNacimiento || ""}">
=======

    const formulario = document.getElementById("formFamilia");

    if (!formulario) return;

    formulario.addEventListener("input", manejarCambioCampo);
    formulario.addEventListener("change", manejarCambioCampo);

    formulario.addEventListener("submit", guardarFamilia);

    const checkTienePareja = document.getElementById("tienePareja");

    if (checkTienePareja) {
        checkTienePareja.addEventListener("change", () => {

            formData.tienePareja = checkTienePareja.checked;

            const contenedorPareja = document.getElementById("parejaContainer");
            if (contenedorPareja) contenedorPareja.hidden = !checkTienePareja.checked;

        });
    }

}

// Se ejecuta con cada tecla/selección en cualquier campo del formulario
function manejarCambioCampo(evento) {

    const campo = evento.target;
    const ruta = MAPA_CAMPOS[campo.id];

    // Si el campo no está en el mapa (ej. botones, o "tienePareja" que se maneja aparte), se ignora
    if (!ruta) return;

    let valor = campo.value;

    if (campo.type === "checkbox") valor = campo.checked;
    if (campo.type === "number") valor = campo.value === "" ? 0 : Number(campo.value);

    escribirValorAnidado(formData, ruta, valor);

}

// =====================================================================================
// PASO 4: INTEGRANTES ADULTOS (arreglo dinámico dentro de formData.integrantes)
// =====================================================================================
function inicializarIntegrantesAdultos() {

    const botonAgregar = document.getElementById("btnAgregarIntegrante");

    if (botonAgregar) {
        botonAgregar.addEventListener("click", agregarIntegrante);
    }

    const contenedor = document.getElementById("integrantesAdultosContainer");

    if (contenedor) {

        // Actualiza formData.integrantes cuando el usuario escribe en una fila
        contenedor.addEventListener("input", manejarCambioIntegrante);
        contenedor.addEventListener("change", manejarCambioIntegrante);

        // Elimina la fila cuando se hace clic en su botón "Eliminar"
        contenedor.addEventListener("click", evento => {

            const botonEliminar = evento.target.closest("button[data-accion='eliminar-integrante']");
            if (!botonEliminar) return;

            const indice = Number(botonEliminar.dataset.indice);
            formData.integrantes.splice(indice, 1);

            renderizarIntegrantesAdultos();

        });

    }

}

// Agrega un integrante vacío al arreglo y vuelve a pintar la lista
function agregarIntegrante() {

    formData.integrantes.push({
        nombre: "",
        edad: "",
        sexo: "",
        parentesco: "",
        origen: "",
        educacion: "",
        actividad: "",
        aportaIngresos: false
    });

    renderizarIntegrantesAdultos();

}

// Vuelve a construir el HTML de todas las filas de integrantes a partir de formData.integrantes
function renderizarIntegrantesAdultos() {

    const contenedor = document.getElementById("integrantesAdultosContainer");

    if (!contenedor) return;

    if (formData.integrantes.length === 0) {
        contenedor.innerHTML = `<p class="form-hint">Todavía no hay integrantes agregados.</p>`;
        return;
    }

    contenedor.innerHTML = formData.integrantes.map((integrante, indice) => `

        <div class="integrante-row" data-indice="${indice}">

            <div class="form-group">
                <label>Nombre</label>
                <input type="text" data-campo="nombre" data-indice="${indice}" value="${integrante.nombre}" placeholder="Nombre completo">
>>>>>>> 280df765e7f5535d76cdf41e3963a143aaf6b39a
            </div>

            <div class="form-group">
                <label>Edad</label>
<<<<<<< HEAD
                <input type="text" value="${edad === "" ? "" : edad}" placeholder="Automática" readonly>
=======
                <input type="number" min="18" data-campo="edad" data-indice="${indice}" value="${integrante.edad}">
>>>>>>> 280df765e7f5535d76cdf41e3963a143aaf6b39a
            </div>

            <div class="form-group">
                <label>Sexo</label>
<<<<<<< HEAD
                ${Select({
                  opciones: opcionesDesdeCatalogo("sexo"),
                  value: String(integrante.sexo || ""),
                  dataAttrs: { campo: "sexo", indice },
                })}
            </div>

            ${
              esNna
                ? `
            <div class="form-group">
                <label>Tipo de documento *</label>
                ${Select({
                  opciones: opcionesDesdeCatalogo("tipoDocumento"),
                  value: String(integrante.tipoDocumento || ""),
                  dataAttrs: { campo: "tipoDocumento", indice },
                })}
            </div>
            <div class="form-group">
                <label>Número de documento *</label>
                <input type="text" data-campo="documento" data-indice="${indice}" value="${integrante.documento || ""}" placeholder="Número de documento" required>
            </div>
            <div class="form-group">
                <label>Escolaridad</label>
                ${Select({
                  opciones: opcionesDesdeCatalogo("escolaridad"),
                  value: String(integrante.escolaridad || "1"),
                  dataAttrs: { campo: "escolaridad", indice },
                })}
            </div>
            <div class="form-group">
                <label>Discapacidad</label>
                ${Select({
                  opciones: opcionesDesdeCatalogo("discapacidad"),
                  value: String(integrante.discapacidad || "8"),
                  dataAttrs: { campo: "discapacidad", indice },
                })}
            </div>
            <div class="form-group">
                <label>¿Es hijo(a) del jefe de hogar?</label>
                ${Select({
                  opciones: opcionesDesdeCatalogo("siNo"),
                  value: String(integrante.esHijoJefe || ""),
                  dataAttrs: { campo: "esHijoJefe", indice },
                })}
            </div>
            <div class="form-group">
                <label>Origen</label>
                ${Select({
                  opciones: opcionesDesdeCatalogo("origen"),
                  value: String(integrante.origen || ""),
                  dataAttrs: { campo: "origen", indice },
                })}
            </div>
            <label class="integrante-check">
                <input type="checkbox" data-campo="pendienteConfirmacion" data-indice="${indice}" ${integrante.pendienteConfirmacion ? "checked" : ""}>
                Pendiente por confirmar (busca cupo)
            </label>
            `
                : `
            <div class="form-group">
                <label>Parentesco</label>
                ${Select({
                  opciones: opcionesDesdeCatalogo("parentesco"),
                  value: String(integrante.parentesco || ""),
                  dataAttrs: { campo: "parentesco", indice },
                })}
            </div>
            <div class="form-group">
                <label>Origen</label>
                ${Select({
                  opciones: opcionesDesdeCatalogo("origen"),
                  value: String(integrante.origen || ""),
                  dataAttrs: { campo: "origen", indice },
                })}
            </div>
            <div class="form-group">
                <label>Actividad</label>
                ${Select({
                  opciones: opcionesDesdeCatalogo("actividad"),
                  value: String(integrante.actividad || ""),
                  dataAttrs: { campo: "actividad", indice },
                })}
            </div>
            `
            }
=======
                <select data-campo="sexo" data-indice="${indice}">
                    <option value="" ${integrante.sexo === "" ? "selected" : ""}>Seleccione...</option>
                    <option value="Masculino" ${integrante.sexo === "Masculino" ? "selected" : ""}>Masculino</option>
                    <option value="Femenino" ${integrante.sexo === "Femenino" ? "selected" : ""}>Femenino</option>
                </select>
            </div>

            <div class="form-group">
                <label>Parentesco</label>
                ${Select({
                    opciones: OPCIONES_PARENTESCO,
                    value: integrante.parentesco,
                    dataAttrs: { campo: "parentesco", indice }
                })}
            </div>

            <div class="form-group">
                <label>Origen</label>
                <input type="text" data-campo="origen" data-indice="${indice}" value="${integrante.origen}" placeholder="Ciudad/país de origen">
            </div>

            <div class="form-group">
                <label>Educación</label>
                <input type="text" data-campo="educacion" data-indice="${indice}" value="${integrante.educacion}" placeholder="Nivel educativo">
            </div>

            <div class="form-group">
                <label>Actividad</label>
                <input type="text" data-campo="actividad" data-indice="${indice}" value="${integrante.actividad}" placeholder="A qué se dedica">
            </div>

            <label class="integrante-check">
                <input type="checkbox" data-campo="aportaIngresos" data-indice="${indice}" ${integrante.aportaIngresos ? "checked" : ""}>
                Aporta ingresos
            </label>
>>>>>>> 280df765e7f5535d76cdf41e3963a143aaf6b39a

            <button type="button" class="icon-btn icon-btn-danger" data-accion="eliminar-integrante" data-indice="${indice}" title="Eliminar">
                <i class="fa-solid fa-trash"></i>
            </button>
<<<<<<< HEAD
        </div>
      `;
    })
    .join("");

  actualizarBotonesIntegrantes();
}

/** Actualiza un integrante en formData.integrantes[index] al escribir en el paso 4 */
function manejarCambioIntegrante(evento) {
  const campoEditado = evento.target;
  const nombreCampo = campoEditado.dataset.campo; // ej. "nombre", "fechaNacimiento"
  const indice = Number(campoEditado.dataset.indice); // posición en el array

  if (!nombreCampo || Number.isNaN(indice)) return;

  let valor = campoEditado.value;

  if (campoEditado.type === "checkbox") valor = campoEditado.checked;

  formData.integrantes[indice][nombreCampo] = valor;

  // Al cambiar la fecha, se recalcula edad y se muestran campos de adulto o NNA
  if (nombreCampo === "fechaNacimiento") {
    renderizarIntegrantesAdultos();
  }
}

// =====================================================================================
// GUARDAR — creación de familia nueva (submit del paso 4, botón Guardar)
// Flujo: validar → sincronizar checklists → construirPayload → POST → refrescar tarjetas
// =====================================================================================
async function guardarFamilia(evento) {
  evento.preventDefault();

  if (pasoActual !== TOTAL_PASOS) return;

  if (!validarFormularioCompleto()) return;

  sincronizarVulnerabilidadesYPrioridades(); // lee checkboxes vuln/prio al DOM
  actualizarVisibilidadPareja();

  try {
    const nuevaFamilia = construirPayloadFamilia({ modoCreacion: true });

    const creado = await crearFamilia(nuevaFamilia); // POST /hogares

    mostrarExito(
      creado?.codigo
        ? `Familia registrada. Código: ${creado.codigo}`
        : "Familia registrada correctamente.",
    );

    familias = await obtenerFamilias();
    renderizarTarjetas(familias);
    cerrarModal("modalFamilia");
  } catch (error) {
    console.error("Error al guardar la familia:", error);
    mostrarError(error.message || "No se pudo guardar la familia.");
  }
}

// Valida los 4 pasos antes de guardar; si falla, muestra alerta y salta al paso con error
function validarFormularioCompleto() {
  if (!paso1Valido()) {
    mostrarAdvertencia("Complete fecha de visita, departamento, municipio, sector, barrio y direccion (Paso 1).");
    irAlPaso(1);
    return false;
  }

  if (!paso2Valido()) {
    mostrarAdvertencia("Complete todos los campos obligatorios del jefe(a) de hogar (Paso 2).");
    irAlPaso(2);
    return false;
  }

  if (!paso3Valido()) {
    mostrarAdvertencia("Complete los campos obligatorios de vivienda (Paso 3).");
    irAlPaso(3);
    return false;
  }

  const integranteIncompleto = formData.integrantes.find(
    (i) => !i.nombre || !i.fechaNacimiento,
  );
  if (integranteIncompleto) {
    mostrarAdvertencia("Complete nombre y fecha de nacimiento de todos los integrantes (Paso 4).");
    irAlPaso(4);
    return false;
  }

  const menorSinDocumento = formData.integrantes.find(
    (i) => esIntegranteMenor(i) && (!i.documento || !i.tipoDocumento),
  );
  if (menorSinDocumento) {
    mostrarAdvertencia("Para cada menor de edad indique tipo y número de documento (Paso 4).");
    irAlPaso(4);
    return false;
  }

  return true;
=======

        </div>

    `).join("");

}

// Actualiza formData.integrantes[indice][campo] cuando el usuario edita una fila
function manejarCambioIntegrante(evento) {

    const campoEditado = evento.target;
    const nombreCampo = campoEditado.dataset.campo;
    const indice = Number(campoEditado.dataset.indice);

    if (!nombreCampo || Number.isNaN(indice)) return;

    let valor = campoEditado.value;

    if (campoEditado.type === "checkbox") valor = campoEditado.checked;
    if (campoEditado.type === "number") valor = campoEditado.value === "" ? "" : Number(campoEditado.value);

    formData.integrantes[indice][nombreCampo] = valor;

}

// =====================================================================================
// GUARDAR (envío final del formulario, disponible en el Paso 4)
// =====================================================================================
async function guardarFamilia(evento) {

    evento.preventDefault();

    // Sólo se guarda desde el último paso
    if (pasoActual !== TOTAL_PASOS) return;

    if (!validarFormularioCompleto()) return;

    try {

        const nuevaFamilia = {

            id: generarId(familias, "FAM"),

            // Campos "planos" que usan la tarjeta y el buscador
            responsable: formData.jefeHogar.nombre,
            documento: formData.jefeHogar.numero,
            barrio: formData.paso1.barrio,
            estado: "Activo",

            // Campos nuevos del control operativo (Paso 1), expuestos también a
            // nivel raíz para que sean fáciles de leer/filtrar sin entrar a "paso1"
            codigoHogar: formData.paso1.codigoHogar,
            fechaVisita: formData.paso1.fechaVisita,
            pendiente: formData.paso1.pendiente,

            // Estructura completa del hogar
            ...formData

        };

        await crearFamilia(nuevaFamilia);

        mostrarExito("Familia registrada correctamente.");

        familias = await obtenerFamilias();
        renderizarTarjetas(familias);

        cerrarModal("modalFamilia");

    } catch (error) {

        console.error("Error al guardar la familia:", error);
        mostrarError("No se pudo guardar la familia.");

    }

}

// Valida los campos requeridos básicos de todo el formulario antes de guardar
function validarFormularioCompleto() {

    if (!formData.paso1.fechaVisita || !formData.paso1.municipio || !formData.paso1.barrio || !formData.paso1.direccion) {
        mostrarAdvertencia("Complete fecha de visita, municipio, barrio y dirección (Paso 1).");
        irAlPaso(1);
        return false;
    }

    if (!formData.jefeHogar.nombre || !formData.jefeHogar.numero) {
        mostrarAdvertencia("Complete el nombre y el documento del jefe(a) de hogar (Paso 2).");
        irAlPaso(2);
        return false;
    }

    const integranteIncompleto = formData.integrantes.find(i => !i.nombre || !i.edad);

    if (integranteIncompleto) {
        mostrarAdvertencia("Complete nombre y edad de todos los integrantes agregados (Paso 4).");
        irAlPaso(4);
        return false;
    }

    return true;

>>>>>>> 280df765e7f5535d76cdf41e3963a143aaf6b39a
}

// Deja el formulario limpio y listo para registrar una familia nueva
function prepararFormulario() {
<<<<<<< HEAD
  if (modoEdicion) return; // al editar no vaciamos lo cargado

  formData = crearEstadoInicial();
  pasoActual = 1;

  const formulario = getCampo("formFamilia");
  if (formulario) {
    formulario.reset();
    getCampo("formTituloModal").textContent = "Registrar familia";
  }

  const usuario = usuarioActual();
  const campoProfesional = getCampo("profesional");
  if (campoProfesional) {
    campoProfesional.value = usuario?.nombre || "";
    formData.paso1.profesional = usuario?.nombre || "";
  }

  document.querySelectorAll('[id^="vuln_"], [id^="prio_"]').forEach((el) => {
    el.checked = false;
  });
  formData.vulnerabilidades = crearVulnerabilidadesInicial();
  formData.prioridades = crearPrioridadesInicial();

  const campoCodigo = getCampo("codigoHogar");
  if (campoCodigo) {
    campoCodigo.value = "";
    obtenerSiguienteCodigoHogar() // preview del código (el backend asigna el definitivo)
      .then((codigo) => {
        if (!modoEdicion && campoCodigo) {
          campoCodigo.value = codigo;
          formData.paso1.codigoHogar = codigo;
        }
      })
      .catch(() => {});
  }

  getCampo("parejaContainer").hidden = true;
  actualizarVisibilidadPareja();
  aplicarCatalogosFamilia(catalogosFamilia, {}, {}, formData);
  if (!formData.paso1.departamento) {
    const departamento = getCampo("departamento");
    if (departamento && departamento.value) {
      formData.paso1.departamento = departamento.value;
    }
  }

  renderizarIntegrantesAdultos();
  irAlPaso(1);
}

// ─────────────────────────────────────────────────────────────────────────────
// 9. LISTADO — tarjetas, búsqueda, clics, eliminar, modal resumen
// ─────────────────────────────────────────────────────────────────────────────

/** Filtra familias por jefe, código, barrio o teléfono mientras el usuario escribe */
function filtrarFamilias(evento) {
  const texto = (evento.target.value || "").toLowerCase();

  const datos = Array.isArray(familias) ? familias : [];

  const resultado = datos.filter(
    (familia) =>
      String(familia.jefe_hogar || "")
        .toLowerCase()
        .includes(texto) ||
      String(familia.codigo || "")
        .toLowerCase()
        .includes(texto) ||
      String(familia.barrio || "")
        .toLowerCase()
        .includes(texto) ||
      String(familia.telefono || "")
        .toLowerCase()
        .includes(texto),
  );

  renderizarTarjetas(resultado);
}

// Delegación de clics en las tarjetas: ver perfil, modal resumen, editar o eliminar
function manejarClickTabla(evento) {
  const botonVer = evento.target.closest("button[data-action='ver'][data-tipo='familia']");
  const botonVerModal = evento.target.closest("button[data-action='ver-modal'][data-tipo='familia']");
  const botonEditar = evento.target.closest("button[data-action='editar'][data-tipo='familia']");
  const botonEliminar = evento.target.closest("button[data-action='eliminar'][data-tipo='familia']");

  if (botonVer) {
    navegar("perfilFamilia", botonVer.dataset.id); // página completa de detalle
  }

  if (botonVerModal) {
    mostrarFamiliaEnModal(botonVerModal.dataset.id); // resumen rápido en modal
  }

  if (botonEditar) {
    if (!puedeRealizarAccion(obtenerRol(), "familias", "editar")) {
      mostrarAdvertencia("No tiene permisos para editar familias.");
      return;
    }
    cargarFamiliaParaEditar(botonEditar.dataset.id);
  }

  if (botonEliminar) {
    if (!puedeRealizarAccion(obtenerRol(), "familias", "eliminar")) {
      mostrarAdvertencia("No tiene permisos para eliminar familias.");
      return;
    }
    eliminarFamiliaPorId(botonEliminar.dataset.id);
  }
=======

    formData = crearEstadoInicial();
    pasoActual = 1;

    const formulario = document.getElementById("formFamilia");

    if (formulario) {
        formulario.reset();
        document.getElementById("formTituloModal").textContent = "Registrar familia";
    }

    // El código de hogar es de solo lectura y no pasa por manejarCambioCampo,
    // así que se escribe directo en el input (formulario.reset() lo habría dejado vacío).
    document.getElementById("codigoHogar").value = formData.paso1.codigoHogar;

    document.getElementById("parejaContainer").hidden = true;

    renderizarIntegrantesAdultos();
    irAlPaso(1);

}

// Filtra las familias según texto ingresado
function filtrarFamilias(evento) {

    const texto = (evento.target.value || "").toLowerCase();

    const resultado = familias.filter(familia =>
        String(familia.responsable || "").toLowerCase().includes(texto) ||
        String(familia.documento || "").toLowerCase().includes(texto) ||
        String(familia.barrio || "").toLowerCase().includes(texto)
    );

    renderizarTarjetas(resultado);

}

// Maneja los clics dentro de la tabla/grid de tarjetas
function manejarClickTabla(evento) {

    const botonVer = evento.target.closest("button[data-action='ver'][data-tipo='familia']");
    const botonVerModal = evento.target.closest("button[data-action='ver-modal'][data-tipo='familia']");
    const botonEditar = evento.target.closest("button[data-action='editar'][data-tipo='familia']");
    const botonEliminar = evento.target.closest("button[data-action='eliminar'][data-tipo='familia']");

    if (botonVer) {
        navegar("perfilFamilia", botonVer.dataset.id);
    }

    if (botonVerModal) {
        mostrarFamiliaEnModal(botonVerModal.dataset.id);
    }

    if (botonEditar) {

        if (!puedeRealizarAccion(obtenerRol(), "familias", "editar")) {
            mostrarAdvertencia("No tiene permisos para editar familias.");
            return;
        }

        // La edición reutiliza el mismo formulario por pasos; por ahora se avisa
        // que la carga automática de los datos guardados queda pendiente.
        mostrarInfo("La edición de familias con el nuevo formulario por pasos está en construcción.");

    }

    if (botonEliminar) {

        if (!puedeRealizarAccion(obtenerRol(), "familias", "eliminar")) {
            mostrarAdvertencia("No tiene permisos para eliminar familias.");
            return;
        }

        eliminarFamiliaPorId(botonEliminar.dataset.id);

    }

>>>>>>> 280df765e7f5535d76cdf41e3963a143aaf6b39a
}

// Elimina una familia por ID y actualiza la lista
async function eliminarFamiliaPorId(id) {
<<<<<<< HEAD
  const confirmar = await window.confirm("¿Desea eliminar esta familia?");

  if (!confirmar) return;

  try {
    await eliminarFamilia(id);

    familias = familias.filter((familia) => String(familia.id) !== String(id));
    renderizarTarjetas(familias);

    mostrarInfo("Familia eliminada correctamente.");
  } catch (error) {
    console.error("Error al eliminar la familia:", error);
    mostrarError("No se pudo eliminar la familia.");
  }
=======

    const confirmar = await window.confirm("¿Desea eliminar esta familia?");

    if (!confirmar) return;

    try {

        await eliminarFamilia(id);

        familias = familias.filter(familia => String(familia.id) !== String(id));
        renderizarTarjetas(familias);

        mostrarInfo("Familia eliminada correctamente.");

    } catch (error) {

        console.error("Error al eliminar la familia:", error);
        mostrarError("No se pudo eliminar la familia.");

    }

>>>>>>> 280df765e7f5535d76cdf41e3963a143aaf6b39a
}

// Renderiza el grid de tarjetas con las familias cargadas
function renderizarTarjetas(lista) {
<<<<<<< HEAD
  const grid = getCampo("familiasGrid");

  if (!grid) return;

  const datos = Array.isArray(lista) ? lista : [];

  const rol = obtenerRol();
  const puedeEditar = puedeRealizarAccion(rol, "familias", "editar");
  const puedeEliminar = puedeRealizarAccion(rol, "familias", "eliminar");

  grid.innerHTML = datos.length
    ? datos
        .map((familia) => FamilyCard(familia, { puedeEditar, puedeEliminar }))
        .join("")
    : `<div class="empty-state"><p>No hay familias registradas.</p></div>`;
=======

    const grid = document.getElementById("familiasGrid");

    if (!grid) return;

    const rol = obtenerRol();
    const puedeEditar = puedeRealizarAccion(rol, "familias", "editar");
    const puedeEliminar = puedeRealizarAccion(rol, "familias", "eliminar");

    grid.innerHTML = lista.length
        ? lista.map(familia => FamilyCard(familia, { puedeEditar, puedeEliminar })).join("")
        : `<div class="empty-state"><p>No hay familias registradas.</p></div>`;

>>>>>>> 280df765e7f5535d76cdf41e3963a143aaf6b39a
}

// Muestra un resumen rápido de la familia dentro de un modal
async function mostrarFamiliaEnModal(id) {
<<<<<<< HEAD
  try {
    const familia = await obtenerFamilia(id);
    const contenedor = getCampo("verFamiliaContenido");

    if (!contenedor) return;

    contenedor.innerHTML = construirResumenFamilia(familia);

    abrirModal("modalVerFamilia");
  } catch (error) {
    console.error("Error al cargar la familia:", error);
    mostrarError("No se pudo cargar la información de la familia.");
  }
=======

    try {

        const familia = await obtenerFamilia(id);
        const contenedor = document.getElementById("verFamiliaContenido");

        if (!contenedor) return;

        contenedor.innerHTML = construirResumenFamilia(familia);

        abrirModal("modalVerFamilia");

    } catch (error) {

        console.error("Error al cargar la familia:", error);
        mostrarError("No se pudo cargar la información de la familia.");

    }

>>>>>>> 280df765e7f5535d76cdf41e3963a143aaf6b39a
}

// Resumen rápido (usado sólo en el modal "Ver"): sin la tabla de integrantes,
// que ahora vive exclusivamente en el perfil completo (iniciarPerfilFamilia).
function construirResumenFamilia(familia) {
<<<<<<< HEAD
  const v = familia.vivienda || {};
  const jefe = familia.jefeHogar || {};
  const nna = Array.isArray(familia.nna) ? familia.nna : [];
  const vuln = Array.isArray(familia.vulnerabilidades) ? familia.vulnerabilidades : [];
  const prio = Array.isArray(familia.prioridades) ? familia.prioridades : [];

  return `
        <div class="page-header"><h2>Ubicación</h2></div>
        <p>${v.municipio || "-"}, barrio ${v.barrio || "-"} — ${v.direccion || "-"}</p>

        ${familia.observaciones ? `
        <div class="page-header"><h2>Observaciones</h2></div>
        <p>${familia.observaciones}</p>
        ` : ""}

        <div class="page-header"><h2>Jefe(a) de hogar</h2></div>
        <p>${jefe.nombre || jefe.nombres || "-"} · Doc. ${jefe.numero || jefe.numero_documento || "-"} · ${jefe.celular || "Sin celular"}</p>

        ${
          familia.tienePareja
            ? `
            <div class="page-header"><h2>Pareja</h2></div>
            <p>${familia.pareja?.nombre || familia.pareja?.nombres || "-"} · Doc. ${familia.pareja?.numero || familia.pareja?.numero_documento || "-"}</p>
        `
            : ""
        }

        <div class="page-header"><h2>Vivienda</h2></div>
        <p>${v.material_pared || v.tipoVivienda || "-"} · ${v.condicion_normalizacion || v.situacionVivienda || "-"} · Condición: ${v.condicion_general || v.condicionGeneral || "-"}</p>

        <div class="page-header"><h2>NNA del hogar</h2></div>
        ${listaHtml(
          nna.map((n) => `${n.nombre || n.nombres || "-"} · ${n.edad ?? "-"} años · Doc. ${n.numero_documento || n.documento || "-"}`),
          "No hay menores registrados en este hogar.",
        )}

        <div class="page-header"><h2>Vulnerabilidades del hogar</h2></div>
        ${listaHtml(vuln, "No hay vulnerabilidades registradas.")}

        <div class="page-header"><h2>Prioridades de atención</h2></div>
        ${listaHtml(prio, "No hay prioridades registradas.")}
    `;
}

// ─────────────────────────────────────────────────────────────────────────────
// 10. PERFIL COMPLETO — página de detalle (no el modal resumen)
// ─────────────────────────────────────────────────────────────────────────────

/** Genera todo el HTML del perfil; solo devuelve texto, no toca el DOM */
function construirHtmlPerfilFamilia(familia) {
  const jefe = familia.jefeHogar || {};
  const pareja = familia.pareja || {};

  return `
      <div class="flex justify-between items-center mb-4">
        <h1 class="text-2xl font-bold text-gray-800"><i class="fas fa-file-alt"></i> Perfil de la familia</h1>
        <button class="btn-primary" id="btnVolverFamilias"><i class="fas fa-arrow-left"></i> Volver a familias</button>
      </div>

      <!-- Resumen -->
      <div class="bg-white rounded-xl border border-gray-200 p-4 flex flex-wrap items-center gap-3 mb-4">
        <span class="text-sm font-semibold text-white bg-indigo-600 rounded-full px-3 py-1">${familia.codigo || "Sin código"}</span>
        <span class="text-sm text-gray-600"><i class="fas fa-calendar-day"></i> Fecha de visita: ${formatearFecha(familia.fecha_visita) || "-"}</span>
        <span class="text-sm text-gray-600"><i class="fas fa-user-md"></i> Profesional: ${familia.profesional || "Sin asignar"}</span>
        <span class="text-xs font-medium px-2 py-1 rounded-full ${familia.estado === true ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"}">${familia.estado === true ? "Activo" : "Inactivo"}</span>
      </div>

      <!-- Datos generales -->
      <div class="bg-white rounded-xl border border-gray-200 p-4 mb-4">
        <h2 class="text-base font-semibold text-gray-800 mb-2"><i class="fas fa-chart-bar"></i> Datos generales</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-2">
          <p><strong>Personas en el hogar:</strong> ${familia.personas_hogar || "-"}</p>
          <p><strong>Personas menores:</strong> ${familia.personas_menores || "-"}</p>
          <p><strong>Hogares en la vivienda:</strong> ${familia.hogares_vivienda || "-"}</p>
        </div>
      </div>

      <!-- Jefe de hogar -->
      ${
        familia.jefeHogar
          ? `
        <div class="bg-white rounded-xl border border-gray-200 p-4 mb-4">
          <h2 class="text-base font-semibold text-gray-800 mb-2"><i class="fas fa-user"></i> Jefe(a) de hogar</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-x-4">
            <p><strong>Nombre:</strong> ${jefe.nombre || jefe.nombres || "-"}</p>
            <p><strong>Documento:</strong> ${jefe.tipo_documento || ""} ${jefe.numero || jefe.numero_documento || "-"}</p>
            <p><strong>Fecha de nacimiento:</strong> ${formatearFecha(jefe.fechaNacimiento || jefe.fecha_nacimiento) || "-"}</p>
            <p><strong>Sexo:</strong> ${jefe.sexo_nombre || "-"}</p>
            <p><strong>Celular:</strong> ${jefe.celular || "-"}</p>
            <p><strong>Correo:</strong> ${jefe.email || jefe.correo || "-"}</p>
            <p><strong>Nacionalidad:</strong> ${jefe.nacionalidad_nombre || "-"}</p>
            <p><strong>Nivel educativo:</strong> ${jefe.nivel_educativo || "-"}</p>
            <p><strong>Ocupación:</strong> ${jefe.ocupacion_nombre || "-"}</p>
            <p><strong>Tipo de trabajo:</strong> ${jefe.tipo_trabajo || "-"}</p>
            <p><strong>Estado civil:</strong> ${jefe.estado_civil || "-"}</p>
          </div>
        </div>
      `
          : ""
      }

      <!-- Pareja -->
      ${
        familia.tienePareja && familia.pareja
          ? `
        <div class="bg-white rounded-xl border border-gray-200 p-4 mb-4">
          <h2 class="text-base font-semibold text-gray-800 mb-2"><i class="fas fa-user-friends"></i> Pareja</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-x-4">
            <p><strong>Nombre:</strong> ${pareja.nombre || pareja.nombres || "-"}</p>
            <p><strong>Documento:</strong> ${pareja.tipo_documento || ""} ${pareja.numero || pareja.numero_documento || "-"}</p>
            <p><strong>Fecha de nacimiento:</strong> ${formatearFecha(pareja.fechaNacimiento || pareja.fecha_nacimiento) || "-"}</p>
            <p><strong>Sexo:</strong> ${pareja.sexo_nombre || "-"}</p>
            <p><strong>Celular:</strong> ${pareja.celular || "-"}</p>
            <p><strong>Nacionalidad:</strong> ${pareja.nacionalidad_nombre || "-"}</p>
            <p><strong>Nivel educativo:</strong> ${pareja.nivel_educativo || "-"}</p>
            <p><strong>Ocupación:</strong> ${pareja.ocupacion_nombre || "-"}</p>
            <p><strong>Tipo de trabajo:</strong> ${pareja.tipo_trabajo || "-"}</p>
            <p><strong>Estado civil:</strong> ${pareja.estado_civil || "-"}</p>
          </div>
        </div>
      `
          : `<div class="bg-white rounded-xl border border-gray-200 p-4 mb-4"><h2 class="text-base font-semibold text-gray-800 mb-2">Pareja</h2><p class="text-sm text-gray-400">Sin pareja registrada.</p></div>`
      }

      <!-- Vivienda -->
      <div class="bg-white rounded-xl border border-gray-200 p-4 mb-4">
        <h2 class="text-base font-semibold text-gray-800 mb-2"><i class="fas fa-home"></i> Vivienda</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-x-4">
          <p><strong>Barrio:</strong> ${familia.vivienda?.barrio || "-"}</p>
          <p><strong>Dirección:</strong> ${familia.vivienda?.direccion || "-"}</p>
          <p><strong>Referencia:</strong> ${familia.vivienda?.otra_referencia || "-"}</p>
          <p><strong>Departamento:</strong> ${familia.vivienda?.departamento || "-"}</p>
          <p><strong>Municipio:</strong> ${familia.vivienda?.municipio || "-"}</p>
          <p><strong>Sector:</strong> ${familia.vivienda?.sector_zona || "-"}</p>
          <p><strong>Material:</strong> ${familia.vivienda?.material_pared || "-"}</p>
          <p><strong>Normalización:</strong> ${familia.vivienda?.condicion_normalizacion || "-"}</p>
          <p><strong>Condición general:</strong> ${familia.vivienda?.condicion_general || "-"}</p>
          <p><strong>Cuartos totales:</strong> ${familia.vivienda?.total_cuartos ?? "-"}</p>
          <p><strong>Cuartos para dormir:</strong> ${familia.vivienda?.cuartos_dormir ?? "-"}</p>
          <p><strong>Tiempo en la vivienda:</strong> ${familia.tiempo_vivienda || "-"}</p>
        </div>
      </div>

      <!-- Servicios públicos -->
      <div class="bg-white rounded-xl border border-gray-200 p-4 mb-4">
        <h2 class="text-base font-semibold text-gray-800 mb-2"><i class="fas fa-bolt"></i> Servicios públicos</h2>
        <div class="grid grid-cols-2 md:grid-cols-3 gap-2">
          <p><strong>Energía:</strong> ${renderIconoSiNo(familia.servicios?.["Energía Eléctrica"])}</p>
          <p><strong>Gas:</strong> ${renderIconoSiNo(familia.servicios?.["Gas Natural"])}</p>
          <p><strong>Acueducto:</strong> ${renderIconoSiNo(familia.servicios?.["Acueducto"])}</p>
          <p><strong>Aseo:</strong> ${renderIconoSiNo(familia.servicios?.["Aseo Público"])}</p>
          <p><strong>Alcantarillado:</strong> ${renderIconoSiNo(familia.servicios?.["Alcantarillado"])}</p>
          <p><strong>Internet:</strong> ${renderIconoSiNo(familia.servicios?.["Internet"])}</p>
        </div>
      </div>

      <!-- Factores que afectan -->
      <div class="bg-white rounded-xl border border-gray-200 p-4 mb-4">
        <h2 class="text-base font-semibold text-gray-800 mb-2"><i class="fas fa-exclamation-triangle"></i> Factores que afectan al hogar</h2>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-2">
          <p><strong>Humedad:</strong> ${renderIconoSiNo(familia.factores?.["Humedad"])}</p>
          <p><strong>Malos olores:</strong> ${renderIconoSiNo(familia.factores?.["Malos Olores"])}</p>
          <p><strong>Polvo:</strong> ${renderIconoSiNo(familia.factores?.["Polvo constante"])}</p>
          <p><strong>Insectos/roedores:</strong> ${renderIconoSiNo(familia.factores?.["Plagas o vectores"])}</p>
        </div>
      </div>

      <!-- Riesgos -->
      <div class="bg-white rounded-xl border border-gray-200 p-4 mb-4">
        <h2 class="text-base font-semibold text-gray-800 mb-2"><i class="fas fa-shield-alt"></i> Riesgos en la vivienda</h2>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-2">
          <p><strong>Inundación:</strong> ${renderIconoSiNo(familia.riesgos?.["Riesgo de Inundación"])}</p>
          <p><strong>Deslizamiento:</strong> ${renderIconoSiNo(familia.riesgos?.["Riesgo de Deslizamiento"])}</p>
          <p><strong>Hundimiento:</strong> ${renderIconoSiNo(familia.riesgos?.["Riesgo de Hundimiento"])}</p>
          <p><strong>Incendio:</strong> ${renderIconoSiNo(familia.riesgos?.["Riesgo de Incendio"])}</p>
        </div>
      </div>

      <!-- Integrantes adultos -->
      <div class="bg-white rounded-xl border border-gray-200 p-4 mb-4 overflow-x-auto">
        <h2 class="text-base font-semibold text-gray-800 mb-2"><i class="fas fa-users"></i> Integrantes del hogar (18+)</h2>
        ${
          familia.integrantes && familia.integrantes.length > 0
            ? `
          <table class="w-full text-sm text-left">
            <thead>
              <tr class="border-b border-gray-200 text-gray-500">
                <th class="py-2 pr-3">Nombre</th>
                <th class="py-2 pr-3">Edad</th>
                <th class="py-2 pr-3">Sexo</th>
                <th class="py-2 pr-3">Parentesco</th>
                <th class="py-2 pr-3">Origen</th>
                <th class="py-2 pr-3">Actividad</th>
              </tr>
            </thead>
            <tbody>
              ${familia.integrantes
                .map(
                  (i) => `
                <tr class="border-b border-gray-100">
                  <td class="py-2 pr-3">${i.nombre || "-"}</td>
                  <td class="py-2 pr-3">${i.edad || "-"}</td>
                  <td class="py-2 pr-3">${i.sexo || "-"}</td>
                  <td class="py-2 pr-3">${i.parentesco || "-"}</td>
                  <td class="py-2 pr-3">${i.origen || "-"}</td>
                  <td class="py-2 pr-3">${i.actividad || "-"}</td>
                </tr>
              `,
                )
                .join("")}
            </tbody>
          </table>
        `
            : `<p class="text-sm text-gray-400">No hay integrantes adultos registrados.</p>`
        }
      </div>

      <!-- NNA -->
      <div class="bg-white rounded-xl border border-gray-200 p-4 mb-4 overflow-x-auto">
        <h2 class="text-base font-semibold text-gray-800 mb-2"><i class="fas fa-child"></i> Niños, niñas y adolescentes (NNA)</h2>
        ${
          familia.nna && familia.nna.length > 0
            ? `
          <table class="w-full text-sm text-left">
            <thead>
              <tr class="border-b border-gray-200 text-gray-500">
                <th class="py-2 pr-3">Nombre</th>
                <th class="py-2 pr-3">Edad</th>
                <th class="py-2 pr-3">Sexo</th>
                <th class="py-2 pr-3">Documento</th>
                <th class="py-2 pr-3">Estado escolar</th>
                <th class="py-2 pr-3">Grado</th>
                <th class="py-2 pr-3">Discapacidad</th>
              </tr>
            </thead>
            <tbody>
              ${familia.nna
                .map(
                  (n) => `
                <tr class="border-b border-gray-100">
                  <td class="py-2 pr-3">${n.nombre || "-"}</td>
                  <td class="py-2 pr-3">${n.edad || "-"}</td>
                  <td class="py-2 pr-3">${n.sexo || "-"}</td>
                  <td class="py-2 pr-3">${n.numero_documento || "-"}</td>
                  <td class="py-2 pr-3">${n.estado_escolar || "-"}</td>
                  <td class="py-2 pr-3">${n.grado || "-"}</td>
                  <td class="py-2 pr-3">${n.discapacidad || "Ninguna"}</td>
                </tr>
              `,
                )
                .join("")}
            </tbody>
          </table>
        `
            : `<p class="text-sm text-gray-400">No hay NNA registrados en este hogar.</p>`
        }
      </div>

      <!-- Vulnerabilidades -->
      <div class="bg-white rounded-xl border border-gray-200 p-4 mb-4">
        <h2 class="text-base font-semibold text-gray-800 mb-2"><i class="fas fa-heartbeat"></i> Vulnerabilidades del hogar</h2>
        ${listaHtml(familia.vulnerabilidades, "No hay vulnerabilidades registradas.")}
      </div>

      <!-- Prioridades -->
      <div class="bg-white rounded-xl border border-gray-200 p-4 mb-4">
        <h2 class="text-base font-semibold text-gray-800 mb-2"><i class="fas fa-bullseye"></i> Prioridades de atención</h2>
        ${listaHtml(familia.prioridades, "No hay prioridades registradas.")}
      </div>

      <!-- Observaciones -->
      <div class="bg-white rounded-xl border border-gray-200 p-4 mb-4">
        <h2 class="text-base font-semibold text-gray-800 mb-2"><i class="fas fa-pencil-alt"></i> Observaciones</h2>
        <p class="text-sm text-gray-700">${familia.observaciones || "Sin observaciones registradas."}</p>
      </div>
    `;
}

/** Exportada; router.js la llama en la ruta perfilFamilia/:id */
export async function iniciarPerfilFamilia() {
  const id = obtenerRutaId();
  const contenedor = getCampo("perfilFamiliaContenido");

  if (!contenedor || !id) {
    console.error("No hay contenedor o ID para el perfil de familia.");
    return;
  }

  try {
    const respuesta = await obtenerFamilia(id);
    const familia = respuesta?.data || respuesta;

    if (!familia || Object.keys(familia).length === 0) {
      contenedor.innerHTML = `<div class="empty-state"><p>No se encontró la familia.</p></div>`;
      return;
    }

    contenedor.innerHTML = construirHtmlPerfilFamilia(familia); // string HTML grande
    getCampo("btnVolverFamilias")?.addEventListener("click", () => navegar("familias"));
  } catch (error) {
    console.error("Error al cargar el perfil de la familia:", error);
    mostrarError("No se pudo cargar el perfil de la familia.");
  }
=======

    return `
        <div class="page-header"><h2>Ubicación</h2></div>
        <p>${familia.paso1?.municipio || "-"}, barrio ${familia.paso1?.barrio || "-"} — ${familia.paso1?.direccion || "-"}</p>

        <div class="page-header"><h2>Jefe(a) de hogar</h2></div>
        <p>${familia.jefeHogar?.nombre || "-"} · Doc. ${familia.jefeHogar?.numero || "-"} · ${familia.jefeHogar?.celular || "Sin celular"}</p>

        ${familia.tienePareja ? `
            <div class="page-header"><h2>Pareja</h2></div>
            <p>${familia.pareja?.nombre || "-"} · Doc. ${familia.pareja?.numero || "-"}</p>
        ` : ""}

        <div class="page-header"><h2>Vivienda</h2></div>
        <p>${familia.vivienda?.tipoVivienda || "-"} · ${familia.vivienda?.situacionVivienda || "-"} · Condición: ${familia.vivienda?.condicionGeneral || "-"}</p>
    `;

}

// Fila reutilizable "etiqueta: valor" para las tarjetas de datos del perfil (Tailwind)
const filaDato = (etiqueta, valor) => `<p class="text-sm text-gray-600"><span class="font-medium text-gray-800">${etiqueta}:</span> ${valor || "-"}</p>`;

// Construye la sección completa del cónyuge/pareja (todos los datos cargados)
function construirSeccionPareja(familia) {

    if (!familia.tienePareja) {
        return `<div class="bg-white rounded-xl border border-gray-200 p-4"><h2 class="text-base font-semibold text-gray-800 mb-2">Cónyuge / Pareja</h2><p class="text-sm text-gray-400">Esta familia no tiene pareja registrada.</p></div>`;
    }

    const p = familia.pareja || {};

    return `
        <div class="bg-white rounded-xl border border-gray-200 p-4">
            <h2 class="text-base font-semibold text-gray-800 mb-2">Cónyuge / Pareja</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-x-4">
                ${filaDato("Nombre", p.nombre)}
                ${filaDato("Documento", `${p.tipoDocumento || "-"} ${p.numero || ""}`)}
                ${filaDato("Fecha de nacimiento", p.fechaNacimiento)}
                ${filaDato("Sexo", p.sexo)}
                ${filaDato("Celular", p.celular)}
                ${filaDato("Nacionalidad", p.nacionalidad)}
                ${filaDato("Nivel educativo", p.nivelEducativo)}
                ${filaDato("Ocupación", p.ocupacion)}
                ${filaDato("Tipo de trabajo", p.tipoTrabajo)}
                ${filaDato("Estado civil", p.estadoCivil)}
            </div>
        </div>
    `;

}

// Construye la tabla detallada de integrantes del hogar (exclusiva del perfil)
function construirTablaIntegrantes(familia) {

    const integrantes = familia.integrantes || [];

    return `
        <div class="bg-white rounded-xl border border-gray-200 p-4 overflow-x-auto">
            <h2 class="text-base font-semibold text-gray-800 mb-2">Integrantes del hogar (18+)</h2>
            <table class="w-full text-sm text-left">
                <thead>
                    <tr class="border-b border-gray-200 text-gray-500">
                        <th class="py-2 pr-3">Nombre</th><th class="py-2 pr-3">Edad</th><th class="py-2 pr-3">Sexo</th>
                        <th class="py-2 pr-3">Parentesco</th><th class="py-2 pr-3">Origen</th><th class="py-2 pr-3">Educación</th>
                        <th class="py-2 pr-3">Actividad</th><th class="py-2 pr-3">Aporta ingresos</th>
                    </tr>
                </thead>
                <tbody>
                    ${integrantes.length > 0 ? integrantes.map(i => `
                        <tr class="border-b border-gray-100">
                            <td class="py-2 pr-3">${i.nombre || "-"}</td><td class="py-2 pr-3">${i.edad || "-"}</td>
                            <td class="py-2 pr-3">${i.sexo || "-"}</td><td class="py-2 pr-3">${i.parentesco || "-"}</td>
                            <td class="py-2 pr-3">${i.origen || "-"}</td><td class="py-2 pr-3">${i.educacion || "-"}</td>
                            <td class="py-2 pr-3">${i.actividad || "-"}</td><td class="py-2 pr-3">${i.aportaIngresos ? "Sí" : "No"}</td>
                        </tr>
                    `).join("") : `<tr><td colspan="8" class="py-3 text-gray-400">Esta familia todavía no tiene integrantes registrados.</td></tr>`}
                </tbody>
            </table>
        </div>
    `;

}

// Inicializa la vista de perfil de una familia (navegación completa "Ver Detalle")
export async function iniciarPerfilFamilia() {

    const id = obtenerRutaId();
    const contenedor = document.getElementById("perfilFamiliaContenido");

    if (!contenedor || !id) return;

    try {

        const familia = await obtenerFamilia(id);

        contenedor.innerHTML = `
            <div class="bg-white rounded-xl border border-gray-200 p-4 flex flex-wrap items-center gap-3 mb-4">
                <span class="text-sm font-semibold text-white bg-indigo-600 rounded-full px-3 py-1">${familia.codigoHogar || familia.paso1?.codigoHogar || "Sin código"}</span>
                <span class="text-sm text-gray-600"><i class="fa-solid fa-calendar-day mr-1"></i>Fecha de visita: ${familia.fechaVisita || familia.paso1?.fechaVisita || "-"}</span>
                ${familia.pendiente || familia.paso1?.pendiente ? `<span class="text-xs font-medium px-2 py-1 rounded-full bg-amber-100 text-amber-700">Pendiente</span>` : ""}
            </div>

            <div class="bg-white rounded-xl border border-gray-200 p-4 mb-4">
                ${construirResumenFamilia(familia)}
            </div>

            <div class="mb-4">${construirSeccionPareja(familia)}</div>

            <div class="mb-4">${construirTablaIntegrantes(familia)}</div>

            <div class="modal-actions">
                <button class="btn-primary" id="btnVolverFamilias">Volver a familias</button>
            </div>
        `;

        const botonVolver = document.getElementById("btnVolverFamilias");

        if (botonVolver) {
            botonVolver.addEventListener("click", () => navegar("familias"));
        }

    } catch (error) {

        console.error("Error al cargar el perfil de la familia:", error);
        mostrarError("No se pudo cargar el perfil de la familia.");

    }

>>>>>>> 280df765e7f5535d76cdf41e3963a143aaf6b39a
}
