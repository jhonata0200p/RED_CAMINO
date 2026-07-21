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
