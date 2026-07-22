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
}
