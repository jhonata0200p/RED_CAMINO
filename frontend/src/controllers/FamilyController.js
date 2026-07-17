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
let formData = crearEstadoInicial();
let pasoActual = 1;
const TOTAL_PASOS = 4;

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

}

// Relaciona cada "id" de input con la posición que le corresponde dentro de formData.
// Ejemplo: "jhNombre" -> formData.jefeHogar.nombre
const MAPA_CAMPOS = {

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

}

// Cambia de paso: actualiza qué panel se ve, el indicador y los botones Anterior/Siguiente/Guardar
function irAlPaso(numeroPaso) {

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

}

// Valida lo mínimo de cada paso antes de dejar avanzar al siguiente
function validarPaso(numeroPaso) {

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

}

// =====================================================================================
// MANEJADORES DE CAMBIO (equivalentes a "onChange" en React, pero con addEventListener)
// En vez de poner un listener por cada uno de los ~40 campos, se usa delegación de
// eventos sobre el formulario completo: cada vez que algo cambia, se revisa el "id"
// del campo contra MAPA_CAMPOS y se actualiza formData en la posición correcta.
// =====================================================================================
function inicializarManejadoresDeCampos() {

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
            </div>

            <div class="form-group">
                <label>Edad</label>
                <input type="number" min="18" data-campo="edad" data-indice="${indice}" value="${integrante.edad}">
            </div>

            <div class="form-group">
                <label>Sexo</label>
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

            <button type="button" class="icon-btn icon-btn-danger" data-accion="eliminar-integrante" data-indice="${indice}" title="Eliminar">
                <i class="fa-solid fa-trash"></i>
            </button>

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

}

// Deja el formulario limpio y listo para registrar una familia nueva
function prepararFormulario() {

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

}

// Elimina una familia por ID y actualiza la lista
async function eliminarFamiliaPorId(id) {

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

}

// Renderiza el grid de tarjetas con las familias cargadas
function renderizarTarjetas(lista) {

    const grid = document.getElementById("familiasGrid");

    if (!grid) return;

    const rol = obtenerRol();
    const puedeEditar = puedeRealizarAccion(rol, "familias", "editar");
    const puedeEliminar = puedeRealizarAccion(rol, "familias", "eliminar");

    grid.innerHTML = lista.length
        ? lista.map(familia => FamilyCard(familia, { puedeEditar, puedeEliminar })).join("")
        : `<div class="empty-state"><p>No hay familias registradas.</p></div>`;

}

// Muestra un resumen rápido de la familia dentro de un modal
async function mostrarFamiliaEnModal(id) {

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

}

// Resumen rápido (usado sólo en el modal "Ver"): sin la tabla de integrantes,
// que ahora vive exclusivamente en el perfil completo (iniciarPerfilFamilia).
function construirResumenFamilia(familia) {

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

}
