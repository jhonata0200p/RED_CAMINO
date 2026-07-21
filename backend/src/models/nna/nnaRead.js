/**
 * nnaRead.js — listar NNA, perfil, pendientes de confirmación y servicios.
 */
const pool = require("../../config/db");
const SERVICIOS_NNA_FORM = require("../../constants/serviciosNna");
const { mapearNna } = require("./mappers");

/** SQL base: persona + línea base + hogar (solo NNA con línea base) */
const SQL_NNA_BASE = `
  SELECT
      p.id,
      p.nombres AS nombre,
      p.numero_documento AS documento,
      p.fecha_nacimiento,
      p.hogar_id AS "familiaId",
      p.estado AS estado_persona,
      p.sexo_id,
      p.nacionalidad_id,
      p.tipo_documento_id,
      EXTRACT(YEAR FROM AGE(CURRENT_DATE, p.fecha_nacimiento))::INTEGER AS edad,
      sx.nombre AS sexo_nombre,
      nac.nombre AS nacionalidad_nombre,
      td.nombre AS tipo_documento_nombre,
      d.nombre AS discapacidad_nombre,
      nd.discapacidad_id,
      nd.escolaridad_id,
      lb.discapacidad AS discapacidad_lb,
      lb.neurodivergencia,
      lb.tiene_diagnostico_id,
      sn.nombre AS tiene_diagnostico_nombre,
      lb.ano_ingreso,
      lb.estado_academico_inicial_fscm_id,
      lb.estado_academico_inicial_2026_id,
      lb.grado_metodologia_aspirante_id,
      lb.jornada_id,
      lb.observacion_academica,
      efscm.nombre AS estado_fscm_nombre,
      e2026.nombre AS estado_2026_nombre,
      gm.nombre AS grado,
      jor.nombre AS jornada_nombre,
      COALESCE(
        (SELECT s.colegio_ied FROM nna_seguimiento s
         WHERE s.persona_id = p.id ORDER BY s.ano DESC, s.id DESC LIMIT 1),
        'Sin colegio registrado'
      ) AS colegio,
      (SELECT em.nombre FROM nna_seguimiento s
       JOIN cat_estado_mes_seguimiento em ON em.id = s.estado_mes_id
       WHERE s.persona_id = p.id ORDER BY s.ano DESC, s.id DESC LIMIT 1
      ) AS ultimo_estado_mes,
      h.codigo AS codigo_hogar,
      v.barrio,
      v.direccion,
      (
        SELECT pj.nombres FROM persona pj
        WHERE pj.hogar_id = h.id AND pj.rol_hogar_id = 1 AND pj.estado = TRUE
        LIMIT 1
      ) AS jefe_hogar
   FROM persona p
   INNER JOIN nna_linea_base lb ON lb.persona_id = p.id
   INNER JOIN hogar h ON h.id = p.hogar_id AND h.estado = TRUE
   LEFT JOIN vivienda v ON v.id = h.vivienda_id
   LEFT JOIN persona_nna_detalle nd ON nd.persona_id = p.id
   LEFT JOIN cat_discapacidad d ON d.id = nd.discapacidad_id
   LEFT JOIN cat_sexo sx ON sx.id = p.sexo_id
   LEFT JOIN cat_nacionalidad nac ON nac.id = p.nacionalidad_id
   LEFT JOIN cat_tipo_documento td ON td.id = p.tipo_documento_id
   LEFT JOIN cat_si_no sn ON sn.id = lb.tiene_diagnostico_id
   LEFT JOIN cat_escolaridad efscm ON efscm.id = lb.estado_academico_inicial_fscm_id
   LEFT JOIN cat_escolaridad e2026 ON e2026.id = lb.estado_academico_inicial_2026_id
   LEFT JOIN cat_grado_metodologia gm ON gm.id = lb.grado_metodologia_aspirante_id
   LEFT JOIN cat_jornada jor ON jor.id = lb.jornada_id
   WHERE p.rol_hogar_id = 4
`;

async function obtenerServiciosNna(personaId) {
  const result = await pool.query(
    `SELECT sn.servicio_nna_id
     FROM nna_servicio_necesidad sn
     INNER JOIN nna_linea_base lb ON lb.id = sn.nna_linea_base_id
     WHERE lb.persona_id = $1`,
    [personaId],
  );
  const ids = new Set(result.rows.map((row) => row.servicio_nna_id));
  const servicios = {};
  for (const [clave, servicioId] of Object.entries(SERVICIOS_NNA_FORM)) {
    servicios[clave] = ids.has(servicioId);
  }
  return servicios;
}

async function obtenerNna() {
  const result = await pool.query(`${SQL_NNA_BASE} ORDER BY p.id DESC`);
  return result.rows.map(mapearNna);
}

async function obtenerNnaPorId(id) {
  const result = await pool.query(`${SQL_NNA_BASE} AND p.id = $1`, [id]);
  if (!result.rows[0]) return null;
  const nna = mapearNna(result.rows[0]);
  nna.servicios = await obtenerServiciosNna(id);
  return nna;
}

/** Menores del hogar aún sin línea base (pendientes de confirmar) */
async function obtenerPendientesConfirmacion() {
  const result = await pool.query(
    `SELECT
        p.id,
        p.nombres AS nombre,
        p.numero_documento AS documento,
        p.hogar_id AS "familiaId",
        p.sexo_id,
        p.tipo_documento_id,
        p.nacionalidad_id,
        p.fecha_nacimiento,
        h.codigo AS codigo_hogar,
        EXTRACT(YEAR FROM AGE(CURRENT_DATE, p.fecha_nacimiento))::INTEGER AS edad,
        (
          SELECT pj.nombres FROM persona pj
          WHERE pj.hogar_id = h.id AND pj.rol_hogar_id = 1 AND pj.estado = TRUE
          LIMIT 1
        ) AS jefe_hogar
     FROM persona p
     INNER JOIN hogar h ON h.id = p.hogar_id AND h.estado = TRUE
     LEFT JOIN nna_linea_base lb ON lb.persona_id = p.id
     WHERE p.rol_hogar_id = 4
       AND p.estado = TRUE
       AND p.pendiente_confirmacion = TRUE
       AND lb.id IS NULL
     ORDER BY p.id DESC`,
  );
  return result.rows.map((row) => ({
    id: row.id,
    nombre: row.nombre,
    documento: row.documento,
    edad: row.edad,
    familiaId: row.familiaId,
    codigoHogar: row.codigo_hogar,
    nombreHogar: row.jefe_hogar || "Sin jefe registrado",
    sexoId: row.sexo_id,
    tipoDocumentoId: row.tipo_documento_id,
    nacionalidadId: row.nacionalidad_id,
    fechaNacimiento: row.fecha_nacimiento
      ? new Date(row.fecha_nacimiento).toISOString().split("T")[0]
      : "",
    pendienteConfirmacion: true,
  }));
}

async function contarPendientesConfirmacion() {
  const result = await pool.query(
    `SELECT COUNT(*)::INTEGER AS total
     FROM persona p
     INNER JOIN hogar h ON h.id = p.hogar_id AND h.estado = TRUE
     LEFT JOIN nna_linea_base lb ON lb.persona_id = p.id
     WHERE p.rol_hogar_id = 4
       AND p.estado = TRUE
       AND p.pendiente_confirmacion = TRUE
       AND lb.id IS NULL`,
  );
  return result.rows[0]?.total || 0;
}

module.exports = {
  obtenerNna,
  obtenerNnaPorId,
  obtenerPendientesConfirmacion,
  contarPendientesConfirmacion,
  obtenerServiciosNna,
};
