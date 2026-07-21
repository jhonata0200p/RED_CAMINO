<<<<<<< HEAD
/**
 * api.js — capa base HTTP. Todos los services usan apiFetch().
 *
 * Envía X-Usuario-Id con el id guardado en localStorage (sesión simple, sin JWT).
 */
const API_URL = "http://localhost:3000/api";

function obtenerUsuarioId() {
  try {
    const usuario = JSON.parse(localStorage.getItem("usuario") || "null");
    return usuario?.id || null;
  } catch {
    return null;
  }
}

export async function apiFetch(ruta, opciones = {}) {
  const headers = {
    "Content-Type": "application/json",
    ...(opciones.headers || {}),
  };

  const usuarioId = obtenerUsuarioId();
  if (usuarioId) {
    headers["X-Usuario-Id"] = String(usuarioId);
  }

  const respuesta = await fetch(`${API_URL}${ruta}`, {
    ...opciones,
    headers,
  });

  let cuerpo = null;
  try {
    cuerpo = await respuesta.json();
  } catch {
    cuerpo = null;
  }

  if (!respuesta.ok) {
    const mensaje =
      cuerpo?.message || `Error en la petición (${respuesta.status})`;
    throw new Error(mensaje);
  }

  if (cuerpo && Object.prototype.hasOwnProperty.call(cuerpo, "data")) {
    return cuerpo.data;
  }

  return cuerpo;
}

export default API_URL;
=======
// Guarda la dirección del servidor
const API_URL = "http://localhost:3000";

// Exporta la dirección para usarla en todo el proyecto
export default API_URL;
>>>>>>> 280df765e7f5535d76cdf41e3963a143aaf6b39a
