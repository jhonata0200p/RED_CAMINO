// Servicio para manejar los niños y niñas (NNA) del sistema.
import API_URL from "./api.js";

// Obtiene todos los registros de NNA.
export async function obtenerNna() {

    const respuesta = await fetch(`${API_URL}/nna`);

    if (!respuesta.ok) {

        throw new Error("No se pudieron cargar los niños.");
    }

    return await respuesta.json();

}

// Obtiene un NNA por ID.
export async function obtenerNnaPorId(id) {

    const respuesta = await fetch(`${API_URL}/nna/${id}`);

    if (!respuesta.ok) {

        throw new Error("No se pudo cargar el niño.");
    }

    return await respuesta.json();

}

// Crea un nuevo NNA.
export async function crearNna(nna) {

    const respuesta = await fetch(`${API_URL}/nna`, {

        method: "POST",

        headers: {

            "Content-Type": "application/json"
        },

        body: JSON.stringify(nna)

    });

    if (!respuesta.ok) {

        throw new Error("No se pudo crear el registro de NNA.");
    }

    return await respuesta.json();

}

// Actualiza un NNA existente.
export async function actualizarNna(id, nna) {

    const respuesta = await fetch(`${API_URL}/nna/${id}`, {

        method: "PUT",

        headers: {

            "Content-Type": "application/json"
        },

        body: JSON.stringify(nna)

    });

    if (!respuesta.ok) {

        throw new Error("No se pudo actualizar el registro de NNA.");
    }

    return await respuesta.json();

}

// Elimina un NNA por su ID.
export async function eliminarNna(id) {

    const respuesta = await fetch(`${API_URL}/nna/${id}`, {

        method: "DELETE"

    });

    if (!respuesta.ok) {

        throw new Error("No se pudo eliminar el registro de NNA.");
    }

    return true;

}

