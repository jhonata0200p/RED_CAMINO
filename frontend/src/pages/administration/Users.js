/**
 * Users — gestión de usuarios del sistema.
 *
 * PUNTO DE ENTRADA: iniciarUsuarios() (router.js → ruta /usuarios)
 *
 * ÍNDICE:
 *  1. Users() — HTML de la página (render)
 *  2. leerFormularioUsuario / validarFormularioUsuario
 *  3. iniciarUsuarios() — carga tabla y listeners
 *  4. guardarUsuario — crear o actualizar
 */
import { DashboardLayout } from "../../components/layout/DashboardLayout.js";
import { DataTable } from "../../components/tables/DataTable.js";
import { Button } from "../../components/ui/Button.js";
import { Modal } from "../../components/ui/Modal.js";
import { Input } from "../../components/ui/Input.js";
import { Badge } from "../../components/ui/Badge.js";

// Servicios: traen y guardan los usuarios reales
import {
    obtenerUsuarios,
    obtenerUsuario,
    crearUsuario,
    actualizarUsuario,
    eliminarUsuario
} from "../../services/userService.js";

import { mostrarExito, mostrarError, mostrarAdvertencia, mostrarInfo } from "../../utils/alert.js";
import { abrirModal, cerrarModal, iniciarModal } from "../../controllers/ModalController.js";
import {
    getCampo,
    setValorCampo,
    getValorCampo,
    agregarListener,
} from "../../utils/domHelpers.js";

// Roles disponibles. El "value" es el código interno que ya usa el resto del
// sistema (permissions.js); el texto es lo que ve el usuario en el selector.
const ROLES = [
    { value: "administrador", texto: "Admin" },
    { value: "psicologo", texto: "Psicólogo" },
    { value: "profesor", texto: "Profesor" }
];

// =====================================================================================
// RENDER
// =====================================================================================
export function Users() {

    return DashboardLayout(`

        <section class="page">

            <div class="page-header">

                <div>
                    <h1>Gestión de usuarios</h1>
                    <p>Administra el personal y los roles del sistema.</p>
                </div>

                ${Button({ texto: "Nuevo usuario", icono: "fa-solid fa-user-plus", id: "btnNuevoUsuario" })}

            </div>

            ${DataTable({ headers: ["ID", "Nombre completo", "Correo", "Rol", "Acciones"], bodyId: "usuariosBody" })}

        </section>

        ${Modal(

            "modalUsuario",

            `<h2 id="formTituloModalUsuario">Registrar usuario</h2>`,

            `
                <form id="formUsuario">

                    <div class="form-grid">

                        <div class="form-group">
                            <label>Nombres</label>
                            ${Input({ id: "nombresUsuario", placeholder: "Nombres del usuario" })}
                        </div>

                        <div class="form-group">
                            <label>Apellidos</label>
                            ${Input({ id: "apellidosUsuario", placeholder: "Apellidos del usuario" })}
                        </div>

                        <div class="form-group">
                            <label>Email</label>
                            ${Input({ id: "correoUsuario", type: "email", placeholder: "correo@redcamino.org" })}
                        </div>

                        <!-- Contraseña: obligatoria al crear; opcional al editar -->
                        <div class="form-group" id="grupoPasswordUsuario">
                            <label>Contraseña</label>
                            ${Input({ id: "passwordUsuario", type: "password", placeholder: "Mínimo 6 caracteres" })}
                        </div>

                        <div class="form-group">
                            <label>Teléfono (opcional)</label>
                            ${Input({ id: "telefonoUsuario", placeholder: "Número de contacto" })}
                        </div>

                        <div class="form-group">
                            <label>Rol</label>
                            <select id="rolUsuario">
                                ${ROLES.map(rol => `<option value="${rol.value}">${rol.texto}</option>`).join("")}
                            </select>
                        </div>

                    </div>

                    <div class="modal-actions">
                        <button type="submit" class="btn-primary">Guardar usuario</button>
                    </div>

                </form>
            `

        )}

    `, "usuarios");

}

// =====================================================================================
// LÓGICA DE LA VISTA — iniciarUsuarios() conecta la tabla con el backend
// =====================================================================================

// Lista de usuarios cargados desde el servicio
let usuarios = [];

// Indica si el formulario está en modo "crear" o "editar" y, si edita, qué id
let modoEdicion = false;
let usuarioEditandoId = null;

/** Lee los inputs del modal y valida antes de enviar al backend */
function leerFormularioUsuario() {
    return {
        nombres: getValorCampo("nombresUsuario"),
        apellidos: getValorCampo("apellidosUsuario"),
        correo: getValorCampo("correoUsuario"),
        telefono: getValorCampo("telefonoUsuario"),
        rol: getValorCampo("rolUsuario"),
        password: getValorCampo("passwordUsuario"),
    };
}

function validarFormularioUsuario(datos, esEdicion) {
    if (!datos.nombres || !datos.apellidos || !datos.correo) {
        mostrarAdvertencia("Complete los nombres, apellidos y el correo.");
        return false;
    }

    if (esEdicion) {
        if (datos.password && datos.password.length < 6) {
            mostrarAdvertencia("La contraseña debe tener al menos 6 caracteres.");
            return false;
        }
        return true;
    }

    if (!datos.password || datos.password.length < 6) {
        mostrarAdvertencia("La contraseña debe tener al menos 6 caracteres.");
        return false;
    }

    return true;
}

export async function iniciarUsuarios() {

    try {

        usuarios = await obtenerUsuarios();

        renderizarUsuarios(usuarios);

        iniciarModal();

        getCampo("btnNuevoUsuario")?.addEventListener("click", () => {
            prepararFormularioCreacion();
            abrirModal("modalUsuario");
        });

        getCampo("formUsuario")?.addEventListener("submit", guardarUsuario);

        document.removeEventListener("click", manejarClickTablaUsuarios);
        document.addEventListener("click", manejarClickTablaUsuarios);

    } catch (error) {

        console.error("Error al cargar usuarios:", error);
        mostrarError("No se pudieron cargar los usuarios.");

    }

}

// Maneja los clics de "Editar" y "Eliminar" dentro de la tabla
function manejarClickTablaUsuarios(evento) {

    const botonEditar = evento.target.closest("button[data-action='editar'][data-tipo='usuario']");
    const botonEliminar = evento.target.closest("button[data-action='eliminar'][data-tipo='usuario']");

    if (botonEditar) {
        cargarUsuarioParaEditar(botonEditar.dataset.id);
    }

    if (botonEliminar) {
        eliminarUsuarioPorId(botonEliminar.dataset.id);
    }

}

// Deja el formulario limpio para crear un usuario nuevo.
function prepararFormularioCreacion() {

    modoEdicion = false;
    usuarioEditandoId = null;

    getCampo("formUsuario")?.reset();

    const grupoPassword = getCampo("grupoPasswordUsuario");
    if (grupoPassword) grupoPassword.style.display = "flex";
    setValorCampo("passwordUsuario", "");
    const campoPassword = getCampo("passwordUsuario");
    if (campoPassword) campoPassword.placeholder = "Mínimo 6 caracteres";

    const titulo = getCampo("formTituloModalUsuario");
    if (titulo) titulo.textContent = "Registrar usuario";

}

// Precarga los datos del usuario seleccionado para editar.
async function cargarUsuarioParaEditar(id) {

    try {

        const usuario = await obtenerUsuario(id);

        modoEdicion = true;
        usuarioEditandoId = id;

        // Si el registro es antiguo y solo tiene "nombre" completo, se reparte como se puede
        const [nombresPrevios, ...resto] = String(usuario.nombre || "").split(" ");

        setValorCampo("nombresUsuario", usuario.nombres || nombresPrevios || "");
        setValorCampo("apellidosUsuario", usuario.apellidos || resto.join(" ") || "");
        setValorCampo("correoUsuario", usuario.correo || "");
        setValorCampo("telefonoUsuario", usuario.telefono || "");
        setValorCampo("rolUsuario", usuario.rol || "profesor");
        setValorCampo("passwordUsuario", "");

        const grupoPassword = getCampo("grupoPasswordUsuario");
        if (grupoPassword) grupoPassword.style.display = "flex";
        const campoPassword = getCampo("passwordUsuario");
        if (campoPassword) campoPassword.placeholder = "Dejar vacío para no cambiar";

        const titulo = getCampo("formTituloModalUsuario");
        if (titulo) titulo.textContent = "Editar usuario";

        abrirModal("modalUsuario");

    } catch (error) {

        console.error("Error al cargar el usuario:", error);
        mostrarError("No se pudo cargar el usuario para editar.");

    }

}

// Guarda el formulario: crea un usuario nuevo o actualiza uno existente según el modo.
async function guardarUsuario(evento) {
    evento.preventDefault();

    const datos = leerFormularioUsuario();
    const esEdicion = Boolean(modoEdicion && usuarioEditandoId);

    if (!validarFormularioUsuario(datos, esEdicion)) return;

    try {
        if (esEdicion) {
            const usuarioActualizado = {
                nombres: datos.nombres,
                apellidos: datos.apellidos,
                nombre: `${datos.nombres} ${datos.apellidos}`,
                correo: datos.correo,
                telefono: datos.telefono,
                rol: datos.rol,
            };
            if (datos.password) {
                usuarioActualizado.password = datos.password; // opcional al editar
            }
            await actualizarUsuario(usuarioEditandoId, usuarioActualizado);
            mostrarExito("Usuario actualizado correctamente.");
        } else {
            const nuevoUsuario = {
                nombres: datos.nombres,
                apellidos: datos.apellidos,
                nombre: `${datos.nombres} ${datos.apellidos}`,
                correo: datos.correo,
                password: datos.password,
                telefono: datos.telefono,
                rol: datos.rol,
            };
            await crearUsuario(nuevoUsuario); // POST /api/usuarios
            mostrarExito("Usuario registrado correctamente.");
        }

        usuarios = await obtenerUsuarios();
        renderizarUsuarios(usuarios);
        getCampo("formUsuario")?.reset();
        cerrarModal("modalUsuario");

    } catch (error) {

        console.error("Error al guardar el usuario:", error);
        mostrarError("No se pudo guardar el usuario.");

    }

}

// Elimina un usuario por su ID
async function eliminarUsuarioPorId(id) {

    const confirmar = await window.confirm("¿Desea eliminar este usuario?");

    if (!confirmar) return;

    try {

        await eliminarUsuario(id);
        usuarios = await obtenerUsuarios();
        renderizarUsuarios(usuarios);
        mostrarInfo("Usuario eliminado correctamente.");

    } catch (error) {

        console.error("Error al eliminar el usuario:", error);
        mostrarError(error.message || "No se pudo eliminar el usuario.");

    }

}

// Renderiza la tabla de usuarios
function renderizarUsuarios(lista) {

    const body = getCampo("usuariosBody");

    if (!body) return;

    body.innerHTML = lista.map(item => `

        <tr>
            <td>${item.id}</td>
            <td>${item.nombre}</td>
            <td>${item.correo}</td>
            <td>${Badge(item.rol, item.rol)}</td>
            <td>
                <button class="btn-table" data-action="editar" data-tipo="usuario" data-id="${item.id}">Editar</button>
                <button class="btn-table btn-danger" data-action="eliminar" data-tipo="usuario" data-id="${item.id}">Eliminar</button>
            </td>
        </tr>

    `).join("");

}
