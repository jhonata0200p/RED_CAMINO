<<<<<<< HEAD
/**
 * ModalController.js — abrir/cerrar modales del sistema.
 */
export function abrirModal(id) {
  const modal = document.getElementById(id);
  if (!modal) return;
  modal.classList.add("show"); // CSS muestra el overlay
}

export function cerrarModal(id) {
  const modal = document.getElementById(id);
  if (!modal) return;
  modal.classList.remove("show");
}

let modalListo = false; // evita registrar listeners duplicados

export function iniciarModal() {
  if (modalListo) return;
  modalListo = true;

  document.addEventListener("click", (evento) => {
    const botonCerrar = evento.target.closest(".modal-close");
    if (botonCerrar) {
      const id = botonCerrar.dataset.modal; // data-modal="modalFamilia"
      if (id) cerrarModal(id);
      return;
    }

    // Clic en el fondo oscuro (no dentro del cuadro blanco)
    if (evento.target.classList.contains("modal-overlay")) {
      cerrarModal(evento.target.id);
    }
  });
}
=======
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
>>>>>>> 280df765e7f5535d76cdf41e3963a143aaf6b39a
