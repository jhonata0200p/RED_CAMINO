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
