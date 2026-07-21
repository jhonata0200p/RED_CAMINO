/**
 * Sidebar.js — menú lateral; filtra opciones según rol (Menu.js + permissions.js).
 */
// Importa navegar, igual como lo hace Navbar.js
import { navegar } from "../../router/router.js";

// Importa la función que arma el menú según el rol
import { Menu } from "./Menu.js";

// Importa la sesión, para saber qué rol tiene el usuario activo
import { obtenerRol } from "../../store/session.js";

// Importa el logo. Por defecto es un marcador de posición: para poner el
// logo real de la fundación, reemplaza el archivo que apunta esta ruta
// (ver src/assets/img/logo-placeholder.svg) por tu propia imagen.
import logo from "../../assets/img/logo_rcm.png";

// Crea el menú lateral
// Recibe la ruta activa para poder resaltar el link correspondiente
export function Sidebar(rutaActiva = "dashboard") {

    // Trae el rol del usuario que inició sesión
    const rol = obtenerRol();

    // Pide a Menu.js solo las opciones que ese rol puede ver
    const opciones = Menu(rol);

    return `

        <div class="sidebar-overlay" id="sidebarOverlay" aria-hidden="true"></div>

        <aside class="sidebar">

            <div class="sidebar-header">

                <div class="sidebar-logo">

                    <img src="${logo}" alt="Logo">

                </div>

                <h2>

                    Red Camino de María

                </h2>

                <button
                    id="sidebarCloseBtn"
                    class="sidebar-close-btn"
                    type="button"
                    aria-label="Cerrar menú"
                >
                    <i class="fa-solid fa-xmark"></i>
                </button>

            </div>

            <nav>

                ${opciones.map(opcion => `

                    <a
                        href="#"
                        data-route="${opcion.ruta}"
                        class="${opcion.ruta === rutaActiva ? "active" : ""}"
                    >

                        <i class="${opcion.icono}"></i>

                        <span>${opcion.texto}</span>

                    </a>

                `).join("")}

            </nav>

        </aside>

    `;

}

/** Cierra el menú lateral en móvil (quita la clase que lo muestra). */
export function cerrarSidebarMovil() {
    const layout = document.querySelector(".dashboard-container");
    if (layout) layout.classList.remove("sidebar-collapsed");
}

// Activa la navegación del menú lateral
// Se llama después de pintar el layout en pantalla
export function iniciarSidebar() {

    const links = document.querySelectorAll(".sidebar a[data-route]");
    const overlay = document.getElementById("sidebarOverlay");
    const botonCerrar = document.getElementById("sidebarCloseBtn");

    links.forEach(link => {

        link.addEventListener("click", (e) => {

            e.preventDefault();
            cerrarSidebarMovil();
            navegar(link.dataset.route);

        });

    });

    if (overlay) {
        overlay.addEventListener("click", cerrarSidebarMovil);
    }

    if (botonCerrar) {
        botonCerrar.addEventListener("click", cerrarSidebarMovil);
    }

}
