/** userService — CRUD de usuarios del sistema (solo administrador). */
import { apiFetch } from "./api.js";

export async function obtenerUsuarios() {
  return apiFetch("/usuarios");
}

export async function obtenerUsuario(id) {
  return apiFetch(`/usuarios/${id}`);
}

export async function crearUsuario(usuario) {
  return apiFetch("/usuarios", {
    method: "POST",
    body: JSON.stringify(usuario),
  });
}

export async function actualizarUsuario(id, usuario) {
  return apiFetch(`/usuarios/${id}`, {
    method: "PUT",
    body: JSON.stringify(usuario),
  });
}

export async function eliminarUsuario(id) {
  await apiFetch(`/usuarios/${id}`, { method: "DELETE" });
  return true;
}
