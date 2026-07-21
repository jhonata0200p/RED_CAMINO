/**
 * session.js — atajos para leer la sesión (wrapper sobre storage.js).
 */
// Importa las funciones de almacenamiento
import { obtenerSesion } from "../utils/storage.js";

// Devuelve el usuario que inició sesión
export function usuarioActual() {

    return obtenerSesion();

}

// Verifica si existe una sesión activa
export function estaAutenticado() {

    return obtenerSesion() !== null;

}

// Devuelve el rol del usuario
export function obtenerRol() {

    const usuario = obtenerSesion();

    return usuario ? usuario.rol : null;

}