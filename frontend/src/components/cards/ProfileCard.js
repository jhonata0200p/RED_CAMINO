// Crea una tarjeta reutilizable para mostrar información resumida de un registro.
export function ProfileCard({ titulo, subtitulo, detalle, icono }) {

    return `

        <article class="card profile-card">

            <div class="profile-card-head">

                <i class="${icono}"></i>

                <div>

                    <h3>${titulo}</h3>

                    <p>${subtitulo}</p>

                </div>

            </div>

            <div class="profile-card-body">

                ${detalle}

            </div>

        </article>

    `;

}
