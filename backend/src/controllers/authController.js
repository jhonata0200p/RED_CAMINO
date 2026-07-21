/**
 * authController.js — POST /api/auth/login
 *
 * Valida correo + contraseña (texto plano, MVP) y devuelve los datos del usuario.
 * la sesión la guarda el frontend en localStorage.
 */
const pool = require("../config/db");
const { rolFrontend } = require("../utils/roles");
const responder = require("../utils/responseHelpers");

const login = async (req, res) => {
  try {
    const correo = String(req.body.correo || "").trim().toLowerCase();
    const password = String(req.body.password || "");

    if (!correo || !password) {
      return responder.badRequest(res, "Correo y contraseña son obligatorios");
    }

    const result = await pool.query(
      `SELECT p.id, p.nombres, p.apellidos, p.correo, p.telefono,
              p.password, p.estado, r.nombre AS rol_nombre
       FROM profesional p
       JOIN cat_rol_sistema r ON r.id = p.rol_sistema_id
       WHERE LOWER(p.correo) = $1`,
      [correo],
    );

    const profesional = result.rows[0];

    if (!profesional || password !== profesional.password) {
      return responder.error(res, 401, "Correo o contraseña incorrectos");
    }

    if (!profesional.estado) {
      return responder.error(res, 401, "Usuario inactivo. Contacte al administrador.");
    }

    const usuario = {
      id: profesional.id,
      nombre: `${profesional.nombres} ${profesional.apellidos}`.trim(),
      nombres: profesional.nombres,
      apellidos: profesional.apellidos,
      correo: profesional.correo,
      telefono: profesional.telefono,
      rol: rolFrontend(profesional.rol_nombre),
    };

    return responder.ok(res, usuario);
  } catch (error) {
    return responder.errorServidor(res, "No fue posible iniciar sesión", error);
  }
};

module.exports = { login };
