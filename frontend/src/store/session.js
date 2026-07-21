<<<<<<< HEAD
/**
 * session.js — atajos para leer la sesión (wrapper sobre storage.js).
 */
=======
>>>>>>> 280df765e7f5535d76cdf41e3963a143aaf6b39a
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