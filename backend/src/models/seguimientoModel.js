/**
 * seguimientoModel.js — SQL de seguimiento_mensual por NNA.
 *
 * ÍNDICE:
 *   obtenerSeguimientos, obtenerSeguimientosPorNna
 *   crearSeguimiento, actualizarSeguimiento, eliminarSeguimiento
 */
const pool = require("../config/db");
const { mesANumero, mesATexto } = require("../utils/mesHelpers");

function mapearFila(row) {
  return {
    id: row.id,
    nnaId: row.persona_id,
    anio: row.ano,
    mes: mesANumero(row.mes) || row.mes,
    mesNombre: mesATexto(row.mes),
    estadoMes: row.estado_mes || "Activo",
    colegioActual: row.colegio_ied || "",
    gradoActual: row.grado || "",
    gradoMetodologiaId: row.grado_metodologia_id,
    fecha: row.fecha_registro
      ? new Date(row.fecha_registro).toISOString().slice(0, 10)
      : null,
    profesional: row.profesional,
  };
}

const SQL_SEGUIMIENTO_BASE = `
  SELECT
      s.id, s.persona_id, s.ano, s.mes, s.colegio_ied,
      s.grado_metodologia_id, s.fecha_registro,
      em.nombre AS estado_mes,
      gm.nombre AS grado,
      CONCAT(pr.nombres, ' ', pr.apellidos) AS profesional
  FROM nna_seguimiento s
  LEFT JOIN cat_estado_mes_seguimiento em ON em.id = s.estado_mes_id
  LEFT JOIN cat_grado_metodologia gm ON gm.id = s.grado_metodologia_id
  LEFT JOIN profesional pr ON pr.id = s.profesional_id
`;

const obtenerSeguimientos = async () => {
  const result = await pool.query(`${SQL_SEGUIMIENTO_BASE} ORDER BY s.ano DESC, s.id DESC`);
  return result.rows.map(mapearFila);
};

const obtenerSeguimientosPorNna = async (nnaId) => {
  const result = await pool.query(
    `${SQL_SEGUIMIENTO_BASE}
     WHERE s.persona_id = $1
     ORDER BY s.ano ASC,
       CASE LOWER(s.mes)
         WHEN 'enero' THEN 1 WHEN '1' THEN 1
         WHEN 'febrero' THEN 2 WHEN '2' THEN 2
         WHEN 'marzo' THEN 3 WHEN '3' THEN 3
         WHEN 'abril' THEN 4 WHEN '4' THEN 4
         WHEN 'mayo' THEN 5 WHEN '5' THEN 5
         WHEN 'junio' THEN 6 WHEN '6' THEN 6
         WHEN 'julio' THEN 7 WHEN '7' THEN 7
         WHEN 'agosto' THEN 8 WHEN '8' THEN 8
         WHEN 'septiembre' THEN 9 WHEN '9' THEN 9
         WHEN 'octubre' THEN 10 WHEN '10' THEN 10
         WHEN 'noviembre' THEN 11 WHEN '11' THEN 11
         WHEN 'diciembre' THEN 12 WHEN '12' THEN 12
         ELSE 13
       END ASC, s.id ASC`,
    [nnaId],
  );
  return result.rows.map(mapearFila);
};

async function resolverEstadoId(estadoMes) {
  const result = await pool.query(
    `SELECT id FROM cat_estado_mes_seguimiento WHERE LOWER(nombre) = LOWER($1) LIMIT 1`,
    [estadoMes || "Activo"],
  );
  return result.rows[0]?.id || 1;
}

async function resolverGradoId(datos) {
  if (datos.gradoMetodologiaId) return Number(datos.gradoMetodologiaId);
  if (datos.gradoActual) {
    const byName = await pool.query(
      `SELECT id FROM cat_grado_metodologia WHERE LOWER(nombre) = LOWER($1) LIMIT 1`,
      [datos.gradoActual],
    );
    if (byName.rows[0]) return byName.rows[0].id;
  }
  return null;
}

const crearSeguimiento = async (datos, profesionalId) => {
  const estadoId = await resolverEstadoId(datos.estadoMes);
  const gradoId = await resolverGradoId(datos);
  const mesTexto = mesATexto(datos.mes);

  const result = await pool.query(
    `INSERT INTO nna_seguimiento (
      persona_id, profesional_id, ano, mes, estado_mes_id,
      colegio_ied, grado_metodologia_id
    ) VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING id`,
    [
      Number(datos.nnaId),
      profesionalId || 1,
      Number(datos.anio),
      mesTexto,
      estadoId,
      datos.colegioActual || "",
      gradoId,
    ],
  );

  const lista = await obtenerSeguimientos();
  return lista.find((s) => s.id === result.rows[0].id);
};

const actualizarSeguimiento = async (id, datos) => {
  const estadoId = datos.estadoMes
    ? await resolverEstadoId(datos.estadoMes)
    : null;
  const gradoId =
    datos.gradoActual || datos.gradoMetodologiaId
      ? await resolverGradoId(datos)
      : null;

  await pool.query(
    `UPDATE nna_seguimiento SET
      ano = COALESCE($1, ano),
      mes = COALESCE($2, mes),
      estado_mes_id = COALESCE($3, estado_mes_id),
      colegio_ied = COALESCE($4, colegio_ied),
      grado_metodologia_id = COALESCE($5, grado_metodologia_id)
     WHERE id = $6`,
    [
      datos.anio != null ? Number(datos.anio) : null,
      datos.mes != null ? mesATexto(datos.mes) : null,
      estadoId,
      datos.colegioActual || null,
      gradoId,
      id,
    ],
  );

  const lista = await obtenerSeguimientos();
  return lista.find((s) => Number(s.id) === Number(id)) || null;
};

const eliminarSeguimiento = async (id) => {
  await pool.query(`DELETE FROM nna_seguimiento WHERE id = $1`, [id]);
  return true;
};

module.exports = {
  obtenerSeguimientos,
  obtenerSeguimientosPorNna,
  crearSeguimiento,
  actualizarSeguimiento,
  eliminarSeguimiento,
};
