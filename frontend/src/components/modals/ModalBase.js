// Crea un modal reutilizable para formularios o acciones rápidas.
export function ModalBase(id, title, content) {

    return `

        <div id="${id}" class="modal-overlay">

            <div class="modal">

                <div class="modal-header">

                    <h3>${title}</h3>

                    <button class="modal-close" data-modal="${id}" type="button">

                        <i class="fa-solid fa-xmark"></i>

                    </button>

                </div>

                <div class="modal-body">

                    ${content}

                </div>

            </div>

        </div>

    `;

}
