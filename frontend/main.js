/**
 * main.js — arranque de la SPA (Vite + vanilla JS).
 * Cuando el DOM está listo, inicia el router (navegación sin recargar).
 */
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./style.css";
import { iniciarRouter } from "./src/router/router.js";
import "animate.css";

document.addEventListener("DOMContentLoaded", () => {
  iniciarRouter();
});
