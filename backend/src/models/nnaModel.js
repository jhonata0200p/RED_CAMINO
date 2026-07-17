const pool = require("../config/db");

const obtenerNna = async () => {
  const query = `
    SELECT
      p.id,
      p.nombres AS nombre_completo,
      p.numero_documento,
      p.fecha_nacimiento,

      EXTRACT(
        YEAR FROM AGE(CURRENT_DATE, p.fecha_nacimiento)
      )::INTEGER AS edad,

      p.sexo_id,
      sx.nombre AS sexo,

      h.id AS hogar_id,
      h.codigo AS codigo_hogar,

      v.barrio,
      v.direccion,

      COALESCE(
        estado_actual.nombre,
        estado_2026.nombre,
        estado_fscm.nombre,
        'Sin registro'
      ) AS estado_academico,

      ultimo_seguimiento.ano AS ultimo_ano,
      ultimo_seguimiento.mes AS ultimo_mes

    FROM persona p

    INNER JOIN cat_rol_hogar rol
      ON rol.id = p.rol_hogar_id

    INNER JOIN persona_nna_detalle detalle
      ON detalle.persona_id = p.id

    INNER JOIN hogar h
      ON h.id = p.hogar_id

    INNER JOIN vivienda v
      ON v.id = h.vivienda_id

    LEFT JOIN cat_sexo sx
      ON sx.id = p.sexo_id

    LEFT JOIN nna_linea_base linea_base
      ON linea_base.persona_id = p.id

    LEFT JOIN cat_escolaridad estado_2026
      ON estado_2026.id =
        linea_base.estado_academico_inicial_2026_id

    LEFT JOIN cat_escolaridad estado_fscm
      ON estado_fscm.id =
        linea_base.estado_academico_inicial_fscm_id

    LEFT JOIN LATERAL (
      SELECT
        seguimiento.ano,
        seguimiento.mes,
        seguimiento.estado_mes_id

      FROM nna_seguimiento seguimiento

      WHERE seguimiento.persona_id = p.id

      ORDER BY
        seguimiento.ano DESC,

        CASE LOWER(TRIM(seguimiento.mes))
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

        seguimiento.fecha_registro DESC

      LIMIT 1
    ) ultimo_seguimiento
      ON TRUE

    LEFT JOIN cat_estado_mes_seguimiento estado_actual
      ON estado_actual.id =
        ultimo_seguimiento.estado_mes_id

    WHERE p.estado = TRUE
      AND h.estado = TRUE
      AND rol.nombre = 'NNA'

    ORDER BY p.nombres ASC
  `;

  const resultado = await pool.query(query);

  return resultado.rows;
};
const obtenerNnaPorId = async (id) => {
    const query = `
      SELECT
        p.id,
        p.nombres AS nombre_completo,
        p.numero_documento,
        p.fecha_nacimiento,
  
        EXTRACT(
          YEAR FROM AGE(CURRENT_DATE, p.fecha_nacimiento)
        )::INTEGER AS edad,
  
        p.celular,
        p.correo,
  
        td.nombre AS tipo_documento,
        sx.nombre AS sexo,
        nac.nombre AS nacionalidad,
  
        h.id AS hogar_id,
        h.codigo AS codigo_hogar,
  
        v.barrio,
        v.direccion,
        v.otra_referencia,
  
        escolaridad.nombre AS escolaridad,
        origen.nombre AS origen,
        hijo_jefe.nombre AS es_hijo_jefe,
        padres_viven.nombre AS padres_viven_hogar,
  
        discapacidad.nombre AS discapacidad_registrada,
        diagnostico_discapacidad.nombre
          AS discapacidad_diagnosticada,
  
        lb.discapacidad AS discapacidad_linea_base,
        lb.neurodivergencia,
        diagnostico_lb.nombre AS tiene_diagnostico,
  
        lb.ano_ingreso,
        lb.grupo_validacion,
        lb.plan_padrino,
        lb.observacion_academica,
  
        beca.nombre AS tipo_beca,
  
        estado_fscm.nombre
          AS estado_academico_inicial_fscm,
  
        estado_2026.nombre
          AS estado_academico_inicial_2026,
  
        grado.nombre AS grado_metodologia_aspirante,
        jornada.nombre AS jornada
  
      FROM persona p
  
      INNER JOIN persona_nna_detalle detalle
        ON detalle.persona_id = p.id
  
      INNER JOIN hogar h
        ON h.id = p.hogar_id
  
      INNER JOIN vivienda v
        ON v.id = h.vivienda_id
  
      LEFT JOIN cat_tipo_documento td
        ON td.id = p.tipo_documento_id
  
      LEFT JOIN cat_sexo sx
        ON sx.id = p.sexo_id
  
      LEFT JOIN cat_nacionalidad nac
        ON nac.id = p.nacionalidad_id
  
      LEFT JOIN cat_escolaridad escolaridad
        ON escolaridad.id = detalle.escolaridad_id
  
      LEFT JOIN cat_origen origen
        ON origen.id = detalle.origen_id
  
      LEFT JOIN cat_si_no hijo_jefe
        ON hijo_jefe.id = detalle.es_hijo_jefe_id
  
      LEFT JOIN cat_si_no padres_viven
        ON padres_viven.id = detalle.padres_viven_id
  
      LEFT JOIN cat_discapacidad discapacidad
        ON discapacidad.id = detalle.discapacidad_id
  
      LEFT JOIN cat_si_no diagnostico_discapacidad
        ON diagnostico_discapacidad.id =
          detalle.discapacidad_diagnosticada_id
  
      LEFT JOIN nna_linea_base lb
        ON lb.persona_id = p.id
  
      LEFT JOIN cat_si_no diagnostico_lb
        ON diagnostico_lb.id = lb.tiene_diagnostico_id
  
      LEFT JOIN cat_tipo_beca beca
        ON beca.id = lb.tipo_beca_id
  
      LEFT JOIN cat_escolaridad estado_fscm
        ON estado_fscm.id =
          lb.estado_academico_inicial_fscm_id
  
      LEFT JOIN cat_escolaridad estado_2026
        ON estado_2026.id =
          lb.estado_academico_inicial_2026_id
  
      LEFT JOIN cat_grado_metodologia grado
        ON grado.id =
          lb.grado_metodologia_aspirante_id
  
      LEFT JOIN cat_jornada jornada
        ON jornada.id = lb.jornada_id
  
      WHERE p.id = $1
        AND p.estado = TRUE
        AND h.estado = TRUE
    `;
  
    const resultado = await pool.query(query, [id]);
  
    return resultado.rows[0] || null;
  };
  const obtenerSeguimientosPorNna = async (personaId) => {
    const query = `
      SELECT
        ns.id,
        ns.ano,
        ns.mes,
        ns.colegio_ied,
        ns.asistencia_trimestre,
        ns.tipo_egreso,
        ns.fecha_registro,
  
        estado.id AS estado_mes_id,
        estado.nombre AS estado_mes,
  
        colegio.id AS tipo_colegio_id,
        colegio.nombre AS tipo_colegio,
  
        grado.id AS grado_metodologia_id,
        grado.nombre AS grado_metodologia,
  
        pr.id AS profesional_id,
        CONCAT(pr.nombres, ' ', pr.apellidos) AS profesional
  
      FROM nna_seguimiento ns
  
      LEFT JOIN cat_estado_mes_seguimiento estado
        ON estado.id = ns.estado_mes_id
  
      LEFT JOIN cat_tipo_colegio colegio
        ON colegio.id = ns.tipo_colegio_id
  
      LEFT JOIN cat_grado_metodologia grado
        ON grado.id = ns.grado_metodologia_id
  
      INNER JOIN profesional pr
        ON pr.id = ns.profesional_id
  
      WHERE ns.persona_id = $1
  
      ORDER BY
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
    `;
  
    const resultado = await pool.query(query, [personaId]);
  
    return resultado.rows;
  };

module.exports = {
  obtenerNna,
  obtenerNnaPorId,
  obtenerSeguimientosPorNna
};