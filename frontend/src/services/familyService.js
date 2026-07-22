/**
 * familyService.js — peticiones HTTP de hogares (familias).
 */
import { apiFetch } from "./api.js";

export async function obtenerFamilias() {
  return apiFetch("/hogares"); // GET listado para tarjetas
}

export async function obtenerSiguienteCodigoHogar() {
  const data = await apiFetch("/hogares/codigo/siguiente");
  return data?.codigo || "";
}

export async function obtenerFamilia(id) {
  return apiFetch(`/hogares/${id}`); // GET detalle para editar/perfil
}

export async function obtenerHogarPorId(id) {
  return obtenerFamilia(id);
}

export async function crearFamilia(familia) {
  return apiFetch("/hogares", {
    method: "POST",
    body: JSON.stringify(familia),
  });
}

export async function actualizarFamilia(id, familia) {
  return apiFetch(`/hogares/${id}`, {
    method: "PUT",
    body: JSON.stringify(familia),
  });
}

export async function eliminarFamilia(id) {
  await apiFetch(`/hogares/${id}`, { method: "DELETE" });
  return true;
}
