// Crea una ventana modal reutilizable
export function Modal(id, titulo, contenido) {

    return `

        <div id="${id}" class="modal-overlay">

            <div class="modal">

                <div class="modal-header">

                    <h2>

                        ${titulo}

                    </h2>

                    <button
                        type="button"
                        class="modal-close"
                        data-modal="${id}"
                    >

                        <i class="fa-solid fa-xmark"></i>

                    </button>

                </div>

                <div class="modal-body">

                    ${contenido}

                </div>

            </div>

        </div>

    `;

}