/**
 * usuariosModel.js — SQL de profesionales (tabla profesional).
 */
const pool = require("../config/db");
const { ROL_A_ID, ID_A_ROL, rolFrontend } = require("../utils/roles");

function mapearUsuario(row) {
  return {
    id: row.id,
    nombres: row.nombres,
    apellidos: row.apellidos,
    nombre: `${row.nombres} ${row.apellidos}`.trim(),
    correo: row.correo,
    telefono: row.telefono,
    rol: ID_A_ROL[row.rol_sistema_id] || rolFrontend(row.rol_nombre),
    estado: row.estado ? "Activo" : "Inactivo",
  };
}

const obtenerUsuarios = async () => {
  const result = await pool.query(
    `SELECT p.id, p.nombres, p.apellidos, p.correo, p.telefono,
            p.rol_sistema_id, p.estado, r.nombre AS rol_nombre
     FROM profesional p
     JOIN cat_rol_sistema r ON r.id = p.rol_sistema_id
     ORDER BY p.id`,
  );
  return result.rows.map(mapearUsuario);
};

const obtenerUsuarioPorId = async (id) => {
  const result = await pool.query(
    `SELECT p.id, p.nombres, p.apellidos, p.correo, p.telefono,
            p.rol_sistema_id, p.estado, r.nombre AS rol_nombre
     FROM profesional p
     JOIN cat_rol_sistema r ON r.id = p.rol_sistema_id
     WHERE p.id = $1`,
    [id],
  );
  return result.rows[0] ? mapearUsuario(result.rows[0]) : null;
};

const crearUsuario = async (datos) => {
  const rolId = ROL_A_ID[datos.rol] || 3;
  const password = String(datos.password || "123456");
  const correo = String(datos.correo || "").trim().toLowerCase();

  const result = await pool.query(
    `INSERT INTO profesional (rol_sistema_id, nombres, apellidos, telefono, correo, password)
     VALUES ($1, $2, $3, $4, $5, $6) RETURNING id`,
    [rolId, datos.nombres || "", datos.apellidos || "", datos.telefono || null, correo, password],
  );

  return obtenerUsuarioPorId(result.rows[0].id);
};

const actualizarUsuario = async (id, datos) => {
  const rolId = datos.rol ? ROL_A_ID[datos.rol] : null;
  const estado =
    datos.estado === "Inactivo" ? false : datos.estado === "Activo" ? true : null;
  const password =
    datos.password && String(datos.password).trim()
      ? String(datos.password).trim()
      : null;

  await pool.query(
    `UPDATE profesional SET
      nombres = COALESCE($1, nombres),
      apellidos = COALESCE($2, apellidos),
      correo = COALESCE($3, correo),
      telefono = COALESCE($4, telefono),
      rol_sistema_id = COALESCE($5, rol_sistema_id),
      estado = COALESCE($6, estado),
      password = COALESCE($7, password)
     WHERE id = $8`,
    [
      datos.nombres || null,
      datos.apellidos || null,
      datos.correo ? String(datos.correo).trim().toLowerCase() : null,
      datos.telefono || null,
      rolId,
      estado,
      password,
      id,
    ],
  );

  return obtenerUsuarioPorId(id);
};

const eliminarUsuario = async (id) => {
  const usuarioId = Number(id);

  if (!Number.isInteger(usuarioId) || usuarioId <= 0) {
    throw new Error("ID de usuario no válido");
  }
  if (usuarioId === 1) {
    throw new Error("No se puede eliminar el usuario administrador principal");
  }

  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    const admin = await client.query(
      `SELECT id FROM profesional WHERE id = 1 AND estado = TRUE LIMIT 1`,
    );
    const reasignarA = admin.rows[0]?.id || null;

    if (reasignarA && reasignarA !== usuarioId) {
      await client.query(`UPDATE hogar SET profesional_id = $1 WHERE profesional_id = $2`, [
        reasignarA,
        usuarioId,
      ]);
      await client.query(
        `UPDATE nna_seguimiento SET profesional_id = $1 WHERE profesional_id = $2`,
        [reasignarA, usuarioId],
      );
    }

    const eliminado = await client.query(`DELETE FROM profesional WHERE id = $1 RETURNING id`, [
      usuarioId,
    ]);

    if (eliminado.rowCount === 0) {
      throw new Error("Usuario no encontrado");
    }

    await client.query("COMMIT");
    return true;
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
};

module.exports = {
  obtenerUsuarios,
  obtenerUsuarioPorId,
  crearUsuario,
  actualizarUsuario,
  eliminarUsuario,
};
