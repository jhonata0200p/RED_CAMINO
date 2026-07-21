// Importa la sesión, para mostrar los datos del usuario activo
import { usuarioActual } from "../../store/session.js";

// Vista simple con los datos del usuario que inició sesión.
// Todavía no está conectada a ninguna ruta ni controlador.
export function Profile() {

    const usuario = usuarioActual();

    return `

        <section class="page">

            <div class="page-header">

                <div>

                    <h1>Mi perfil</h1>

                    <p>Datos de la cuenta con la que iniciaste sesión.</p>

                </div>

            </div>

            <div class="card profile-card">

                <p><strong>Nombre:</strong> ${usuario?.nombre || ""}</p>

                <p><strong>Correo:</strong> ${usuario?.correo || ""}</p>

                <p><strong>Rol:</strong> ${usuario?.rol || ""}</p>

            </div>

        </section>

    `;

}
