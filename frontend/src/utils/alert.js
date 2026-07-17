// Importa la librería SweetAlert2
import Swal from "sweetalert2";

// Configura las alertas del sistema
export const alerta = Swal.mixin({

    // Activa el modo notificación
    toast: true,

    // Ubica la alerta en la esquina inferior derecha
    position: "bottom-end",

    // Oculta el botón de confirmación
    showConfirmButton: false,

    // Tiempo visible
    timer: 3000,

    // Barra de progreso
    timerProgressBar: true,

    // Clase personalizada
    customClass: {

        popup: "toast-red-camino"

    },

    // Animación de entrada
    showClass: {

        popup: "animate__animated animate__fadeInUp"

    },

    // Animación de salida
    hideClass: {

        popup: "animate__animated animate__fadeOutDown"

    },

    // Pausa el temporizador al pasar el cursor
    didOpen: (toast) => {

        toast.addEventListener("mouseenter", Swal.stopTimer);

        toast.addEventListener("mouseleave", Swal.resumeTimer);

    }

});

// Muestra una alerta de éxito
export function mostrarExito(mensaje) {

    alerta.fire({

        icon: "success",

        title: mensaje

    });

}

// Muestra una alerta de error
export function mostrarError(mensaje) {

    alerta.fire({

        icon: "error",

        title: mensaje

    });

}

// Muestra una alerta de información
export function mostrarInfo(mensaje) {

    alerta.fire({

        icon: "info",

        title: mensaje

    });

}

// Muestra una alerta de advertencia
export function mostrarAdvertencia(mensaje) {

    alerta.fire({

        icon: "warning",

        title: mensaje

    });

}