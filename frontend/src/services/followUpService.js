<<<<<<< HEAD
/** followUpService.js — peticiones HTTP de seguimiento mensual. */
import { apiFetch } from "./api.js";

export async function obtenerSeguimientos() {
  return apiFetch("/seguimientos");
}

export async function obtenerSeguimientosPorNna(nnaId) {
  return apiFetch(`/seguimientos/nna/${nnaId}`);
}

export async function confirmarSeguimiento(seguimiento) {
  return apiFetch("/seguimientos", {
    method: "POST",
    body: JSON.stringify(seguimiento),
  });
}

export async function actualizarSeguimiento(id, seguimiento) {
  return apiFetch(`/seguimientos/${id}`, {
    method: "PUT",
    body: JSON.stringify(seguimiento),
  });
}

export async function eliminarSeguimiento(id) {
  await apiFetch(`/seguimientos/${id}`, { method: "DELETE" });
  return true;
=======
// Servicio de seguimiento mensual: cada registro confirma que un NNA
// ya fue revisado/atendido en un mes puntual de la fundación.
import API_URL from "./api.js";

// Obtiene todos los seguimientos confirmados.
export async function obtenerSeguimientos() {

    const respuesta = await fetch(`${API_URL}/seguimientos`);

    if (!respuesta.ok) throw new Error("No se pudieron cargar los seguimientos.");

    return await respuesta.json();

}

// Confirma el mes de un NNA (le da el "check"): crea el registro del mes.
export async function confirmarSeguimiento(seguimiento) {

    const respuesta = await fetch(`${API_URL}/seguimientos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(seguimiento)
    });

    if (!respuesta.ok) throw new Error("No se pudo confirmar el seguimiento.");

    return await respuesta.json();

}

// Actualiza un seguimiento existente (permite editar fecha, estado, responsable y observaciones).
export async function actualizarSeguimiento(id, seguimiento) {

    const respuesta = await fetch(`${API_URL}/seguimientos/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(seguimiento)
    });

    if (!respuesta.ok) throw new Error("No se pudo actualizar el seguimiento.");

    return await respuesta.json();

}

// Deshace la confirmación de un mes (por si se marcó por error).
export async function eliminarSeguimiento(id) {

    const respuesta = await fetch(`${API_URL}/seguimientos/${id}`, { method: "DELETE" });

    if (!respuesta.ok) throw new Error("No se pudo eliminar el seguimiento.");

    return true;

>>>>>>> 280df765e7f5535d76cdf41e3963a143aaf6b39a
}
