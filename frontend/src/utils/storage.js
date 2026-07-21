/**
 * storage.js — sesión en localStorage (datos del usuario tras el login).
 */
export function guardarSesion(usuario) {
  localStorage.setItem("usuario", JSON.stringify(usuario));
}

export function obtenerSesion() {
  return JSON.parse(localStorage.getItem("usuario"));
}

export function cerrarSesion() {
  localStorage.removeItem("usuario");
}
