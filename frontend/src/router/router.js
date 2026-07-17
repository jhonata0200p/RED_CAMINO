// Importa las rutas del sistema
import { routes } from "./routes.js";

// Importa los controladores
import { iniciarFamilias, iniciarPerfilFamilia } from "../controllers/FamilyController.js";
import { iniciarNna } from "../controllers/ChildController.js";
import { iniciarEditarNna } from "../pages/children/ChildProfile.js";
import { iniciarDashboard } from "../controllers/DashboardController.js";
import { iniciarUsuarios } from "../pages/administration/Users.js";
import { iniciarSeguimientos } from "../controllers/FollowUpController.js";
import { iniciarReportes } from "../controllers/ReportController.js";
import { iniciarDashboardLayout } from "../components/layout/DashboardLayout.js";
import { iniciarLogin } from "../pages/auth/Login.js";

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

}
