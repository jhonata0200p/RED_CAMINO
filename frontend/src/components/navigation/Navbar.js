<<<<<<< HEAD
/**
 * Navbar.js — barra superior del dashboard (usuario, cerrar sesión, toggle menú).
 */
=======
// Importa la sesión
>>>>>>> 280df765e7f5535d76cdf41e3963a143aaf6b39a
import { usuarioActual } from "../../store/session.js";
import { cerrarSesion } from "../../utils/storage.js";
import { navegar } from "../../router/router.js";

<<<<<<< HEAD
export function Navbar() {
  const usuario = usuarioActual();

  return `
        <header class="navbar">
            <div class="navbar-left">
                <button id="menuBtn" class="menu-btn" type="button" aria-label="Abrir o cerrar menú">
                    <i class="fa-solid fa-bars"></i>
                </button>
                <h2>Red Camino de María</h2>
            </div>
            <div class="navbar-right">
                <div class="user-info">
                    <span>${usuario.nombre}</span>
                    <small>${usuario.rol}</small>
                </div>
                <button id="btnCerrarSesion" class="logout-btn" type="button">
                    <i class="fa-solid fa-right-from-bracket"></i>
                    Cerrar sesión
                </button>
            </div>
        </header>
    `;
}

export function iniciarNavbar() {
  const botonMenu = document.getElementById("menuBtn");
  const botonCerrar = document.getElementById("btnCerrarSesion");
  const layout = document.querySelector(".dashboard-container");

  if (botonMenu && layout) {
    botonMenu.addEventListener("click", () => {
      layout.classList.toggle("sidebar-collapsed");
    });
  }

  if (botonCerrar) {
    botonCerrar.addEventListener("click", () => {
      cerrarSesion();
      navegar("inicio");
    });
  }
}
=======
// Crea la barra superior
export function Navbar() {

    // Obtiene el usuario activo
    const usuario = usuarioActual();

    return `

        <header class="navbar">

            <div class="navbar-left">

                <button id="menuBtn" class="menu-btn" type="button" aria-label="Abrir menú">

                    <i class="fa-solid fa-bars"></i>

                </button>

                <h2>

                    Red Camino de María

                </h2>

            </div>

            <div class="navbar-right">

                <div class="user-info">

                    <span>

                        ${usuario.nombre}

                    </span>

                    <small>

                        ${usuario.rol}

                    </small>

                </div>

                <button id="btnCerrarSesion" class="logout-btn" type="button">

                    <i class="fa-solid fa-right-from-bracket"></i>
                    Cerrar sesión

                </button>

            </div>

        </header>

    `;

}

export function iniciarNavbar() {

    const botonMenu = document.getElementById("menuBtn");
    const botonCerrar = document.getElementById("btnCerrarSesion");
    const layout = document.querySelector(".dashboard-container");

    if (botonMenu && layout) {

        botonMenu.addEventListener("click", () => {

            layout.classList.toggle("sidebar-collapsed");

        });

    }

    if (botonCerrar) {

        botonCerrar.addEventListener("click", () => {

            cerrarSesion();
            navegar("login");

        });

    }

}
>>>>>>> 280df765e7f5535d76cdf41e3963a143aaf6b39a
