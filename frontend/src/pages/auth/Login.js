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

// =====================================================================================
// RENDER
// =====================================================================================
export function Login() {
  return `

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

                    <a href="#inicio" class="login-back" id="loginBackLink">
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
}

// =====================================================================================
// LÓGICA DE LA VISTA
// =====================================================================================

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
}
