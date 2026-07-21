<<<<<<< HEAD
/**
 * router.js — navegación SPA: URL → HTML (pages/) → controlador (iniciarXxx).
 */
import { routes } from "./routes.js";
=======
// Importa las rutas del sistema
import { routes } from "./routes.js";

// Importa los controladores
>>>>>>> 280df765e7f5535d76cdf41e3963a143aaf6b39a
import { iniciarFamilias, iniciarPerfilFamilia } from "../controllers/FamilyController.js";
import { iniciarNna } from "../controllers/ChildController.js";
import { iniciarEditarNna } from "../pages/children/ChildProfile.js";
import { iniciarDashboard } from "../controllers/DashboardController.js";
import { iniciarUsuarios } from "../pages/administration/Users.js";
import { iniciarSeguimientos } from "../controllers/FollowUpController.js";
import { iniciarReportes } from "../controllers/ReportController.js";
import { iniciarDashboardLayout } from "../components/layout/DashboardLayout.js";
import { iniciarLogin } from "../pages/auth/Login.js";
<<<<<<< HEAD
import { iniciarLanding } from "../pages/Landing.js";
import { Error404 } from "../pages/Error404.js";
import { estaAutenticado, obtenerRol } from "../store/session.js";
import { puedeAcceder } from "../utils/permissions.js";
import { mostrarAdvertencia } from "../utils/alert.js";

const app = document.getElementById("app"); // div principal en index.html
const RUTAS_PUBLICAS = ["inicio", "login"];
let rutaIdActual = null; // id de perfil (familia o NNA) pasado en navegar("perfilNna", id)

export function obtenerRutaId() {
  return rutaIdActual;
}

export function iniciarRouter() {
  if (estaAutenticado()) {
    navegar("dashboard"); // ya hay sesión → panel principal
  } else {
    navegar("inicio");    // sin sesión → landing pública
  }
}

export function navegar(ruta, id = null) {
  const vista = routes[ruta]; // función que devuelve HTML (ej. Families)

  if (!vista) {
    app.innerHTML = Error404();
    return;
  }

  // Rutas privadas: exigen login y permiso según rol
  if (!RUTAS_PUBLICAS.includes(ruta)) {
    if (!estaAutenticado()) {
      navegar("login");
      return;
    }

    const rol = obtenerRol();

    if (!puedeAcceder(rol, ruta)) {
      if (ruta !== "dashboard") {
        mostrarAdvertencia("No tiene permisos para acceder a esta sección.");
        navegar("dashboard");
      }
      return;
    }
  }

  rutaIdActual = id; // perfilFamilia / perfilNna leen esto con obtenerRutaId()

  app.innerHTML = vista(); // reemplaza todo el contenido de #app

  if (ruta === "inicio") {
    iniciarLanding();
    return;
  }

  if (ruta === "login") {
    iniciarLogin();
    return;
  }

  iniciarDashboardLayout(ruta); // sidebar + navbar activos

  // Cada ruta ejecuta su controlador (API + listeners)
  if (ruta === "dashboard") iniciarDashboard();
  if (ruta === "familias") iniciarFamilias();
  if (ruta === "perfilFamilia") iniciarPerfilFamilia();
  if (ruta === "nna") iniciarNna();
  if (ruta === "perfilNna") iniciarEditarNna();
  if (ruta === "usuarios") iniciarUsuarios();
  if (ruta === "seguimiento") iniciarSeguimientos();
  if (ruta === "reportes") iniciarReportes();
=======

// Importa la página que se muestra cuando una ruta no existe
import { Error404 } from "../pages/Error404.js";

// Importa las funciones de sesión
import { estaAutenticado, obtenerRol } from "../store/session.js";

// Importa la función que valida si un rol puede entrar a una ruta
import { puedeAcceder } from "../utils/permissions.js";

// Importa las alertas, para avisar cuando se bloquea un acceso
import { mostrarAdvertencia } from "../utils/alert.js";

// Obtiene el contenedor principal
const app = document.getElementById("app");

// Guarda el ID que se manda de una vista a otra (por ejemplo al abrir un perfil)
let rutaIdActual = null;

// Devuelve el ID guardado para la vista actual
export function obtenerRutaId() {
    return rutaIdActual;
}

// Inicia la aplicación
export function iniciarRouter() {

    if (estaAutenticado()) {
        navegar("dashboard");
    } else {
        navegar("login");
    }

}

// Cambia entre las vistas del sistema
// El parámetro "id" es opcional y sirve para abrir perfiles (familia o niño)
export function navegar(ruta, id = null) {

    const vista = routes[ruta];

    if (!vista) {
        app.innerHTML = Error404();
        return;
    }

    if (ruta !== "login") {

        if (!estaAutenticado()) {
            navegar("login");
            return;
        }

        const rol = obtenerRol();

        if (!puedeAcceder(rol, ruta)) {

            if (ruta !== "dashboard") {
                mostrarAdvertencia("No tiene permisos para acceder a esta sección.");
                navegar("dashboard");
            }

            return;
        }

    }

    rutaIdActual = id;

    app.innerHTML = vista();

    if (ruta === "login") {
        iniciarLogin();
        return;
    }

    iniciarDashboardLayout(ruta);

    if (ruta === "dashboard") iniciarDashboard();
    if (ruta === "familias") iniciarFamilias();
    if (ruta === "perfilFamilia") iniciarPerfilFamilia();
    if (ruta === "nna") iniciarNna();
    if (ruta === "perfilNna") iniciarEditarNna();
    if (ruta === "usuarios") iniciarUsuarios();
    if (ruta === "seguimiento") iniciarSeguimientos();
    if (ruta === "reportes") iniciarReportes();

>>>>>>> 280df765e7f5535d76cdf41e3963a143aaf6b39a
}
