/**
 * auth.js — middleware de sesión simple (sin JWT).
 *
 * verificarSesion → lee header X-Usuario-Id, carga el profesional de la BD
 * soloAdmin       → exige rol administrador (rutas /api/usuarios)
 *
 * MVP académico: el frontend guarda el usuario en localStorage tras el login
 * y envía su id en cada petición protegida.
 */
const pool = require("../config/db");
const { rolFrontend } = require("../utils/roles");

async function verificarSesion(req, res, next) {
  const usuarioId = Number(req.headers["x-usuario-id"]);

  if (!Number.isInteger(usuarioId) || usuarioId <= 0) {
    return res.status(401).json({
      success: false,
      message: "Debe iniciar sesión",
    });
  }

  try {
    const result = await pool.query(
      `SELECT p.id, p.correo, p.estado, r.nombre AS rol_nombre
       FROM profesional p
       JOIN cat_rol_sistema r ON r.id = p.rol_sistema_id
       WHERE p.id = $1`,
      [usuarioId],
    );

    const profesional = result.rows[0];
    if (!profesional || !profesional.estado) {
      return res.status(401).json({
        success: false,
        message: "Sesión inválida o usuario inactivo",
      });
    }

    req.usuario = {
      id: profesional.id,
      correo: profesional.correo,
      rol: rolFrontend(profesional.rol_nombre),
    };
    next();
  } catch (error) {
    console.error("Error en verificarSesion:", error);
    return res.status(500).json({
      success: false,
      message: "No fue posible validar la sesión",
    });
  }
}

function soloAdmin(req, res, next) {
  if (req.usuario?.rol !== "administrador") {
    return res.status(403).json({
      success: false,
      message: "Solo el administrador puede hacer esta acción",
    });
  }
  next();
}

// Alias por si alguna ruta antigua aún importa verificarToken
module.exports = {
  verificarSesion,
  verificarToken: verificarSesion,
  soloAdmin,
};
