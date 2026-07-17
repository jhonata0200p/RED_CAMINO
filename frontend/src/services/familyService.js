// Importa la dirección de la API
import API_URL from "./api.js";

// Obtiene todas las familias registradas
export async function obtenerFamilias() {

    const respuesta = await fetch(`${API_URL}/familias`);

    if (!respuesta.ok) {

        throw new Error("No se pudieron cargar las familias.");

    }

    return await respuesta.json();

}

// Obtiene una familia por su ID
export async function obtenerFamilia(id) {

    const respuesta = await fetch(`${API_URL}/familias/${id}`);

    if (!respuesta.ok) {

        throw new Error("No se pudo cargar la familia.");

    }

    return await respuesta.json();

}

// Registra una nueva familia
export async function crearFamilia(familia) {

    const respuesta = await fetch(`${API_URL}/familias`, {

        method: "POST",

        headers: {

            "Content-Type": "application/json"

        },

        body: JSON.stringify(familia)

    });

    if (!respuesta.ok) {

        throw new Error("No se pudo crear la familia.");

    }

    return await respuesta.json();

}

// Actualiza una familia existente
export async function actualizarFamilia(id, familia) {

    const respuesta = await fetch(`${API_URL}/familias/${id}`, {

        method: "PUT",

        headers: {

            "Content-Type": "application/json"

        },

        body: JSON.stringify(familia)

    });

    if (!respuesta.ok) {

        throw new Error("No se pudo actualizar la familia.");

    }

    return await respuesta.json();

}

// Elimina una familia por su ID
export async function eliminarFamilia(id) {

    const respuesta = await fetch(`${API_URL}/familias/${id}`, {

        method: "DELETE"

    });

    if (!respuesta.ok) {

        throw new Error("No se pudo eliminar la familia.");

    }

    return true;

}