<<<<<<< HEAD
/**
 * childService.js — peticiones HTTP de NNA.
 */
import { apiFetch } from "./api.js";

export async function obtenerNna() {
  return apiFetch("/nna");
}

export async function obtenerNnaPendientes() {
  return apiFetch("/nna/pendientes/lista"); // menores del hogar sin confirmar como NNA
}

export async function contarNnaPendientes() {
  return apiFetch("/nna/pendientes/conteo");
}

export async function obtenerNnaPorId(id) {
  return apiFetch(`/nna/${id}`);
}

export async function crearNna(nna) {
  return apiFetch("/nna", {
    method: "POST",
    body: JSON.stringify(nna),
  });
}

export async function actualizarNna(id, nna) {
  return apiFetch(`/nna/${id}`, {
    method: "PUT",
    body: JSON.stringify(nna),
  });
}

export async function eliminarNna(id) {
  await apiFetch(`/nna/${id}`, { method: "DELETE" });
  return true;
}
=======
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

>>>>>>> 280df765e7f5535d76cdf41e3963a143aaf6b39a
