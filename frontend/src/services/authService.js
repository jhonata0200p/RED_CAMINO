<<<<<<< HEAD
/** authService — POST /auth/login; devuelve los datos del usuario */
import { apiFetch } from "./api.js";

export async function login(correo, password) {
  try {
    const data = await apiFetch("/auth/login", {
      method: "POST",
      body: JSON.stringify({ correo, password }),
    });
    return data || null;
  } catch (error) {
    throw error;
  }
}
=======
import usuariosData from "../data/db.json";

// Busca un usuario por correo y contraseña
export async function login(correo, password) {

    const correoNormalizado = (correo || "").trim().toLowerCase();
    const passwordNormalizado = (password || "").trim();

    const usuarios = usuariosData?.usuarios || [];

    return usuarios.find(usuario =>

        String(usuario.correo || "").toLowerCase() === correoNormalizado &&
        String(usuario.password || "") === passwordNormalizado

    ) || null;

}
>>>>>>> 280df765e7f5535d76cdf41e3963a143aaf6b39a
