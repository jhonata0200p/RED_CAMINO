// Abre una ventana modal
export function abrirModal(id) {

    const modal = document.getElementById(id);

    if (!modal) return;

    modal.classList.add("show");

}

// Cierra una ventana modal
export function cerrarModal(id) {

    const modal = document.getElementById(id);

    if (!modal) return;

    modal.classList.remove("show");

}

// Inicializa los botones para cerrar
export function iniciarModal() {

    const botones = document.querySelectorAll(".modal-close");

    botones.forEach(boton => {

        boton.addEventListener("click", () => {

            cerrarModal(

                boton.dataset.modal

            );

        });

    });

}