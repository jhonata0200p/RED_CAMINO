<<<<<<< HEAD
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
=======
// Guarda la sesión del usuario
export function guardarSesion(usuario) {

    localStorage.setItem(

        "usuario",

        JSON.stringify(usuario)

    );

}

// Obtiene la sesión actual
export function obtenerSesion() {

    return JSON.parse(

        localStorage.getItem("usuario")

    );

}

// Elimina la sesión
export function cerrarSesion() {

    localStorage.removeItem("usuario");

}
>>>>>>> 280df765e7f5535d76cdf41e3963a143aaf6b39a
