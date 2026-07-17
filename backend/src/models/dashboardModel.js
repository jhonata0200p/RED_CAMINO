const pool = require("../config/db");

const obtenerDashboard = async () => {
  const totalNnaQuery = `
    SELECT COUNT(DISTINCT p.id)::INTEGER AS total
    FROM persona p
    INNER JOIN cat_rol_hogar rol
      ON rol.id = p.rol_hogar_id
    INNER JOIN hogar h
      ON h.id = p.hogar_id
    WHERE p.estado = TRUE
      AND h.estado = TRUE
      AND rol.nombre = 'NNA'
  `;

  const totalHogaresQuery = `
    SELECT COUNT(*)::INTEGER AS total
    FROM hogar
    WHERE estado = TRUE
  `;

  const alertasSaludQuery = `
    SELECT COUNT(DISTINCT p.id)::INTEGER AS total
    FROM persona p
    INNER JOIN cat_rol_hogar rol
      ON rol.id = p.rol_hogar_id
    INNER JOIN nna_linea_base lb
      ON lb.persona_id = p.id
    WHERE p.estado = TRUE
      AND rol.nombre = 'NNA'
      AND (
        (
          lb.discapacidad IS NOT NULL
          AND TRIM(lb.discapacidad) <> ''
          AND LOWER(TRIM(lb.discapacidad))
            NOT IN ('no', 'ninguna', 'ninguno', 'sin discapacidad')
        )
        OR
        (
          lb.neurodivergencia IS NOT NULL
          AND TRIM(lb.neurodivergencia) <> ''
          AND LOWER(TRIM(lb.neurodivergencia))
            NOT IN ('no', 'ninguna', 'ninguno', 'sin neurodivergencia')
        )
      )
  `;

  const estadoActualQuery = `
    WITH ultimo_seguimiento AS (
      SELECT DISTINCT ON (ns.persona_id)
        ns.persona_id,
        ns.estado_mes_id
      FROM nna_seguimiento ns
      ORDER BY
        ns.persona_id,
        ns.ano DESC,
        CASE LOWER(TRIM(ns.mes))
          WHEN 'enero' THEN 1
          WHEN 'febrero' THEN 2
          WHEN 'marzo' THEN 3
          WHEN 'abril' THEN 4
          WHEN 'mayo' THEN 5
          WHEN 'junio' THEN 6
          WHEN 'julio' THEN 7
          WHEN 'agosto' THEN 8
          WHEN 'septiembre' THEN 9
          WHEN 'octubre' THEN 10
          WHEN 'noviembre' THEN 11
          WHEN 'diciembre' THEN 12
          ELSE 0
        END DESC,
        ns.fecha_registro DESC
    )

    SELECT
      COALESCE(
        estado_mes.nombre,
        estado_2026.nombre,
        estado_fscm.nombre,
        'Sin registro'
      ) AS estado,

      COUNT(DISTINCT p.id)::INTEGER AS cantidad

    FROM persona p

    INNER JOIN cat_rol_hogar rol
      ON rol.id = p.rol_hogar_id

    INNER JOIN hogar h
      ON h.id = p.hogar_id

    LEFT JOIN nna_linea_base lb
      ON lb.persona_id = p.id

    LEFT JOIN ultimo_seguimiento us
      ON us.persona_id = p.id

    LEFT JOIN cat_estado_mes_seguimiento estado_mes
      ON estado_mes.id = us.estado_mes_id

    LEFT JOIN cat_escolaridad estado_2026
      ON estado_2026.id =
        lb.estado_academico_inicial_2026_id

    LEFT JOIN cat_escolaridad estado_fscm
      ON estado_fscm.id =
        lb.estado_academico_inicial_fscm_id

    WHERE p.estado = TRUE
      AND h.estado = TRUE
      AND rol.nombre = 'NNA'

    GROUP BY COALESCE(
      estado_mes.nombre,
      estado_2026.nombre,
      estado_fscm.nombre,
      'Sin registro'
    )

    ORDER BY cantidad DESC
  `;

  const ubicacionQuery = `
    SELECT
      municipio.nombre AS municipio,
      vivienda.barrio,
      COUNT(DISTINCT hogar.id)::INTEGER AS total_hogares

    FROM hogar

    INNER JOIN vivienda
      ON vivienda.id = hogar.vivienda_id

    INNER JOIN cat_municipio municipio
      ON municipio.id = vivienda.municipio_id

    WHERE hogar.estado = TRUE

    GROUP BY
      municipio.nombre,
      vivienda.barrio

    ORDER BY total_hogares DESC
  `;

  const becasQuery = `
    SELECT
      COALESCE(beca.nombre, 'Sin beca') AS tipo_beca,
      COUNT(DISTINCT lb.persona_id)::INTEGER AS cantidad

    FROM nna_linea_base lb

    LEFT JOIN cat_tipo_beca beca
      ON beca.id = lb.tipo_beca_id

    INNER JOIN persona p
      ON p.id = lb.persona_id

    WHERE p.estado = TRUE

    GROUP BY COALESCE(beca.nombre, 'Sin beca')

    ORDER BY cantidad DESC
  `;

  const planPadrinoQuery = `
    SELECT
      COALESCE(
        NULLIF(TRIM(lb.plan_padrino), ''),
        'Sin plan padrino'
      ) AS plan_padrino,

      COUNT(DISTINCT lb.persona_id)::INTEGER AS cantidad

    FROM nna_linea_base lb

    INNER JOIN persona p
      ON p.id = lb.persona_id

    WHERE p.estado = TRUE

    GROUP BY COALESCE(
      NULLIF(TRIM(lb.plan_padrino), ''),
      'Sin plan padrino'
    )

    ORDER BY cantidad DESC
  `;

  const [
    totalNnaResult,
    totalHogaresResult,
    alertasSaludResult,
    estadosResult,
    ubicacionResult,
    becasResult,
    planPadrinoResult,
  ] = await Promise.all([
    pool.query(totalNnaQuery),
    pool.query(totalHogaresQuery),
    pool.query(alertasSaludQuery),
    pool.query(estadoActualQuery),
    pool.query(ubicacionQuery),
    pool.query(becasQuery),
    pool.query(planPadrinoQuery),
  ]);

  const estados = estadosResult.rows;

  const desescolarizadosInactivos = estados
    .filter((registro) => {
      const estado = registro.estado.toLowerCase();

      return [
        "inactivo",
        "desescolarizado",
        "inasistente",
        "retirado",
      ].includes(estado);
    })
    .reduce(
      (total, registro) => total + registro.cantidad,
      0
    );

  return {
    kpis: {
      total_nna: totalNnaResult.rows[0].total,
      desescolarizados_inactivos: desescolarizadosInactivos,
      total_hogares: totalHogaresResult.rows[0].total,
      alertas_salud: alertasSaludResult.rows[0].total,
    },
    graficos: {
      distribucion_ubicacion: ubicacionResult.rows,
      estado_escolarizacion: estados,
      tipos_beca: becasResult.rows,
      planes_padrino: planPadrinoResult.rows,
    },
  };
};

module.exports = {
  obtenerDashboard,
};