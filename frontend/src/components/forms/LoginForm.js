// Formulario simple de inicio de sesión.
// Nota: la vista real de login vive en pages/auth/Login.js; este componente
// queda disponible como bloque reutilizable si se necesita en otra parte.
export function LoginForm() {

    return `

        <form class="login-form">

            <h2>Iniciar sesión</h2>

            <div class="form-group">
                <label>Correo electrónico</label>
                <input type="email" placeholder="Ingrese su correo">
            </div>

            <div class="form-group">
                <label>Contraseña</label>
                <input type="password" placeholder="Ingrese su contraseña">
            </div>

            <button class="btn-login">Ingresar</button>

        </form>

    `;

}
