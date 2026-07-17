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