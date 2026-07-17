// Servicio para gestionar usuarios del sistema.
import API_URL from "./api.js";

// Obtiene todos los usuarios.
export async function obtenerUsuarios() {

    const respuesta = await fetch(`${API_URL}/usuarios`);

    if (!respuesta.ok) {

        throw new Error("No se pudieron cargar los usuarios.");
    }

    return await respuesta.json();

}

// Obtiene un usuario por su ID.
export async function obtenerUsuario(id) {

    const respuesta = await fetch(`${API_URL}/usuarios/${id}`);

    if (!respuesta.ok) {

        throw new Error("No se pudo cargar el usuario.");
    }

    return await respuesta.json();

}

// Crea un usuario.
export async function crearUsuario(usuario) {

    const respuesta = await fetch(`${API_URL}/usuarios`, {

        method: "POST",

        headers: {

            "Content-Type": "application/json"
        },

        body: JSON.stringify(usuario)

    });

    if (!respuesta.ok) {

        throw new Error("No se pudo crear el usuario.");
    }

    return await respuesta.json();

}

// Actualiza un usuario existente.
export async function actualizarUsuario(id, usuario) {

    const respuesta = await fetch(`${API_URL}/usuarios/${id}`, {

        method: "PUT",

        headers: {

            "Content-Type": "application/json"
        },

        body: JSON.stringify(usuario)

    });

    if (!respuesta.ok) {

        throw new Error("No se pudo actualizar el usuario.");
    }

    return await respuesta.json();

}

// Elimina un usuario por su ID.
export async function eliminarUsuario(id) {

    const respuesta = await fetch(`${API_URL}/usuarios/${id}`, {

        method: "DELETE"

    });

    if (!respuesta.ok) {

        throw new Error("No se pudo eliminar el usuario.");
    }

    return true;

}

