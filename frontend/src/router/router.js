/**
 * router.js — navegación SPA: URL → HTML (pages/) → controlador (iniciarXxx).
 */
import { routes } from "./routes.js";
import { iniciarFamilias, iniciarPerfilFamilia } from "../controllers/FamilyController.js";
import { iniciarNna } from "../controllers/ChildController.js";
import { iniciarEditarNna } from "../pages/children/ChildProfile.js";
import { iniciarDashboard } from "../controllers/DashboardController.js";
import { iniciarUsuarios } from "../pages/administration/Users.js";
import { iniciarSeguimientos } from "../controllers/FollowUpController.js";
import { iniciarReportes } from "../controllers/ReportController.js";
import { iniciarDashboardLayout } from "../components/layout/DashboardLayout.js";
import { iniciarLogin } from "../pages/auth/Login.js";
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
}
