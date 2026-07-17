const pool = require("../config/db");

const obtenerPlanilla = async ({ ano, mes }) => {
  const query = `
    SELECT
      p.id AS nna_id,
      p.nombres AS nombre_completo,
      p.numero_documento,

      h.id AS hogar_id,
      h.codigo AS codigo_hogar,
      v.barrio,

      ns.id AS seguimiento_id,
      ns.ano,
      ns.mes,
      ns.estado_mes_id,
      estado.nombre AS estado_mes,

      ns.colegio_ied,
      ns.asistencia_trimestre,
      ns.tipo_egreso,

      ns.tipo_colegio_id,
      tipo_colegio.nombre AS tipo_colegio,

      ns.grado_metodologia_id,
      grado.nombre AS grado_metodologia

    FROM persona p

    INNER JOIN cat_rol_hogar rol
      ON rol.id = p.rol_hogar_id

    INNER JOIN hogar h
      ON h.id = p.hogar_id

    INNER JOIN vivienda v
      ON v.id = h.vivienda_id

    LEFT JOIN nna_seguimiento ns
      ON ns.persona_id = p.id
      AND ns.ano = $1
      AND LOWER(TRIM(ns.mes)) = LOWER(TRIM($2))

    LEFT JOIN cat_estado_mes_seguimiento estado
      ON estado.id = ns.estado_mes_id

    LEFT JOIN cat_tipo_colegio tipo_colegio
      ON tipo_colegio.id = ns.tipo_colegio_id

    LEFT JOIN cat_grado_metodologia grado
      ON grado.id = ns.grado_metodologia_id

    WHERE p.estado = TRUE
      AND h.estado = TRUE
      AND rol.nombre = 'NNA'

    ORDER BY p.nombres ASC
  `;

  const resultado = await pool.query(query, [ano, mes]);

  return resultado.rows;
};

const guardarSeguimientosLote = async ({
  ano,
  mes,
  profesionalId,
  registros,
}) => {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    const seguimientosCreados = [];

    for (const registro of registros) {
      const duplicado = await client.query(
        `
          SELECT id
          FROM nna_seguimiento
          WHERE persona_id = $1
            AND ano = $2
            AND LOWER(TRIM(mes)) = LOWER(TRIM($3))
          LIMIT 1
        `,
        [registro.nna_id, ano, mes]
      );

      if (duplicado.rows.length > 0) {
        const error = new Error(
          `El NNA ${registro.nna_id} ya tiene seguimiento para ${mes} de ${ano}`
        );

        error.code = "SEGUIMIENTO_DUPLICADO";
        throw error;
      }

      const resultado = await client.query(
        `
          INSERT INTO nna_seguimiento (
            persona_id,
            profesional_id,
            ano,
            mes,
            estado_mes_id,
            colegio_ied,
            asistencia_trimestre,
            tipo_egreso,
            tipo_colegio_id,
            grado_metodologia_id
          )
          VALUES (
            $1, $2, $3, $4, $5,
            $6, $7, $8, $9, $10
          )
          RETURNING *
        `,
        [
          registro.nna_id,
          profesionalId,
          ano,
          mes,
          registro.estado_mes_id || null,
          registro.colegio_ied || null,
          registro.asistencia_trimestre || null,
          registro.tipo_egreso || null,
          registro.tipo_colegio_id || null,
          registro.grado_metodologia_id || null,
        ]
      );

      seguimientosCreados.push(resultado.rows[0]);
    }

    await client.query("COMMIT");

    return seguimientosCreados;
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
};

module.exports = {
  obtenerPlanilla,
  guardarSeguimientosLote,
};