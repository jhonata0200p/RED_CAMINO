<<<<<<< HEAD
/**
 * Login.js — pantalla de inicio de sesión.
 *
 * Login()        → HTML del formulario
 * iniciarLogin() → listeners; llama authService.login() y guarda usuario en localStorage
 */
import logo from "../../assets/img/logo_rcm.png";
import { Input } from "../../components/ui/Input.js";
import { Button } from "../../components/ui/Button.js";
import { login } from "../../services/authService.js";
import { guardarSesion } from "../../utils/storage.js";
import { navegar } from "../../router/router.js";
import { mostrarError, mostrarAdvertencia } from "../../utils/alert.js";
import { getCampo, agregarListener } from "../../utils/domHelpers.js";
=======
// Vista: Inicio de sesión.
// Reutiliza el mismo diseño centrado (panel de marca + tarjeta de formulario)
// que ya tenía el proyecto, pero ahora usando los componentes de src/components/ui/
// (Input y Button) y un manejo de estado simple para las credenciales.

import logo from "../../assets/img/logo_rcm.png";

import { Input } from "../../components/ui/Input.js";
import { Button } from "../../components/ui/Button.js";

// Servicio de autenticación
import { login } from "../../services/authService.js";

// Guarda la sesión del usuario (equivalente a "guardar el token")
import { guardarSesion } from "../../utils/storage.js";

// El proyecto no usa react-router-dom: "navegar" es el equivalente a useNavigate()
import { navegar } from "../../router/router.js";

import { mostrarError, mostrarAdvertencia } from "../../utils/alert.js";
>>>>>>> 280df765e7f5535d76cdf41e3963a143aaf6b39a

// =====================================================================================
// RENDER
// =====================================================================================
export function Login() {
<<<<<<< HEAD
  return `
=======

    return `
>>>>>>> 280df765e7f5535d76cdf41e3963a143aaf6b39a

        <section class="login">

            <!-- Panel izquierdo con la información principal -->
            <div class="login-left">

                <div class="login-logo">
                    <img src="${logo}" alt="Logo">
                </div>

                <h1>Red Camino de María</h1>

                <p>Sistema de gestión para el seguimiento y administración de hogares beneficiarios.</p>

            </div>

            <!-- Panel derecho: tarjeta de formulario centrada -->
            <div class="login-right">

                <div class="login-right-inner">

<<<<<<< HEAD
                    <a href="#inicio" class="login-back" id="loginBackLink">
=======
                    <a href="../index.html" class="login-back">
>>>>>>> 280df765e7f5535d76cdf41e3963a143aaf6b39a
                        <i class="fa-solid fa-arrow-left"></i> Volver al sitio principal
                    </a>

                    <form id="loginForm" class="login-form">

                        <h2>Iniciar sesión</h2>

                        <div class="form-group">
                            <label>Correo electrónico</label>
                            ${Input({ id: "loginEmail", type: "email", placeholder: "Ingrese su correo" })}
                        </div>

                        <div class="form-group">
                            <label>Contraseña</label>
                            ${Input({ id: "loginPassword", type: "password", placeholder: "Ingrese su contraseña" })}
                        </div>

                        <!-- Aquí se muestra el mensaje de error si las credenciales son incorrectas -->
                        <p id="loginError" class="form-error" style="display:none;"></p>

                        ${Button({ texto: "Ingresar", clase: "btn-login", tipo: "submit" })}

                    </form>

                </div>

            </div>

        </section>

    `;
<<<<<<< HEAD
=======

>>>>>>> 280df765e7f5535d76cdf41e3963a143aaf6b39a
}

// =====================================================================================
// LÓGICA DE LA VISTA
// =====================================================================================

<<<<<<< HEAD
let credentials = { email: "", password: "" };

export function iniciarLogin() {
  credentials = { email: "", password: "" };

  const formulario = getCampo("loginForm");
  if (!formulario) return;

  agregarListener("loginBackLink", "click", (e) => {
    e.preventDefault();
    navegar("inicio");
  });

  agregarListener("loginEmail", "input", (e) => {
    credentials.email = e.target.value;
  });

  agregarListener("loginPassword", "input", (e) => {
    credentials.password = e.target.value;
  });

  formulario.addEventListener("submit", manejarSubmit);
}

function ocultarError() {
  const error = getCampo("loginError");
  if (!error) return;
  error.style.display = "none";
  error.textContent = "";
}

function mostrarErrorEnFormulario(mensaje) {
  const error = getCampo("loginError");
  if (!error) return;
  error.textContent = mensaje;
  error.style.display = "block";
}

// Valida credenciales → guarda usuario en localStorage → navega al dashboard
async function manejarSubmit(evento) {
  evento.preventDefault();
  ocultarError();

  if (!credentials.email.trim() || !credentials.password.trim()) {
    mostrarAdvertencia("Complete el correo y la contraseña.");
    return;
  }

  try {
    const usuario = await login(
      credentials.email.trim(),
      credentials.password.trim(),
    );

    if (!usuario) {
      mostrarErrorEnFormulario("Correo o contraseña incorrectos.");
      return;
    }

    guardarSesion(usuario); // localStorage: { id, nombre, rol, ... }
    navegar("dashboard");
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
    const mensaje = error?.message || "No se pudo iniciar sesión. Intente de nuevo.";
    mostrarErrorEnFormulario(mensaje);
  }
=======
// "Estado" del formulario: como el proyecto no usa React, credentials es un objeto
// normal que se actualiza con cada tecla escrita en los campos (equivalente a setCredentials).
let credentials = { email: "", password: "" };

export function iniciarLogin() {

    // Reinicia el estado cada vez que se entra a esta vista
    credentials = { email: "", password: "" };

    const formulario = document.getElementById("loginForm");

    if (!formulario) return;

    const campoEmail = document.getElementById("loginEmail");
    const campoPassword = document.getElementById("loginPassword");

    // Cada input actualiza directamente su llave en "credentials" (onChange)
    campoEmail.addEventListener("input", (e) => {
        credentials.email = e.target.value;
    });

    campoPassword.addEventListener("input", (e) => {
        credentials.password = e.target.value;
    });

    formulario.addEventListener("submit", manejarSubmit);

}

// Oculta/limpia el mensaje de error visible bajo el formulario
function ocultarError() {

    const error = document.getElementById("loginError");

    error.style.display = "none";
    error.textContent = "";

}

// Muestra el mensaje de error debajo del formulario
function mostrarErrorEnFormulario(mensaje) {

    const error = document.getElementById("loginError");

    error.textContent = mensaje;
    error.style.display = "block";

}

// Maneja el envío del formulario de login
async function manejarSubmit(evento) {

    evento.preventDefault();

    ocultarError();

    if (!credentials.email.trim() || !credentials.password.trim()) {

        mostrarAdvertencia("Complete el correo y la contraseña.");
        return;

    }

    try {

        // Ejecuta authService.login(credentials)
        const usuario = await login(credentials.email.trim(), credentials.password.trim());

        // Credenciales incorrectas: el servicio no lanza error, devuelve null
        if (!usuario) {

            mostrarErrorEnFormulario("Correo o contraseña incorrectos.");
            return;

        }

        // Guarda la sesión (este proyecto no maneja JWT: guarda el usuario autenticado)
        guardarSesion(usuario);

        // Redirige a la página principal (equivalente a navigate("/dashboard"))
        navegar("dashboard");

    } catch (error) {

        // Manejo de errores básico: problema de conexión con el servidor
        console.error("Error al iniciar sesión:", error);
        mostrarErrorEnFormulario("No se pudo iniciar sesión. Intente de nuevo.");

    }

>>>>>>> 280df765e7f5535d76cdf41e3963a143aaf6b39a
}
