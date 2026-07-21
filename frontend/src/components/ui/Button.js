// Crea un botón reutilizable
export function Button({

    texto,

    icono = "",

    clase = "btn-primary",

    id = "",

    // Por defecto es "button": estos botones normalmente disparan una acción
    // de JavaScript (abrir un modal, exportar, etc.), no un envío de formulario.
    // Si alguna vez se necesita un botón que sí envíe un formulario, se puede
    // pasar tipo="submit" explícitamente.
    tipo = "button"

}){

    return `

        <button

            type="${tipo}"

            id="${id}"

            class="${clase}"

        >

            ${icono ? `<i class="${icono}"></i>` : ""}

            ${texto}

        </button>

    `;

}