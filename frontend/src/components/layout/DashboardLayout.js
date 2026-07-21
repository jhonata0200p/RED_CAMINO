<<<<<<< HEAD
/**
 * DashboardLayout.js — plantilla común: sidebar + navbar + contenido de la página.
 *
 * DashboardLayout(html, rutaActiva) → string HTML
 * iniciarDashboardLayout(ruta)       → activa menú y navbar después de navegar
 */
=======
>>>>>>> 280df765e7f5535d76cdf41e3963a143aaf6b39a
// Importa la barra de navegación
import { Navbar, iniciarNavbar } from "../navigation/Navbar.js";

// Importa el menú lateral
import { Sidebar, iniciarSidebar } from "../navigation/Sidebar.js";

// Crea el layout principal
// "ruta" sirve para saber qué opción del menú debe verse resaltada
export function DashboardLayout(content, ruta = "dashboard") {

    return `

        <div class="dashboard-container">

            ${Sidebar(ruta)}

            <div class="dashboard-main">

                ${Navbar()}

                <main class="page-content">

                    ${content}

                </main>

            </div>

        </div>

    `;

}

// Inicializa lo que necesita el layout: navbar y sidebar
export function iniciarDashboardLayout(ruta = "dashboard") {

    iniciarNavbar();
    iniciarSidebar();

}
