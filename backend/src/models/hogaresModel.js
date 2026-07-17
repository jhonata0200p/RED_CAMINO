const pool = require("../config/db");

const obtenerHogares = async () => {
  const query = `
    SELECT
      h.id,
      h.codigo,
      h.fecha_visita,
      v.barrio,
      v.direccion,

      COALESCE(
        MAX(p.nombres) FILTER (
          WHERE rh.nombre = 'Jefe de hogar'
        ),
        'Sin registrar'
      ) AS jefe_hogar,

      MAX(p.celular) FILTER (
        WHERE rh.nombre = 'Jefe de hogar'
      ) AS telefono,

      COUNT(p.id) FILTER (
        WHERE rh.nombre = 'NNA'
        AND p.estado = TRUE
      )::INTEGER AS cantidad_menores

    FROM hogar h

    INNER JOIN vivienda v
      ON v.id = h.vivienda_id

    LEFT JOIN persona p
      ON p.hogar_id = h.id
      AND p.estado = TRUE

    LEFT JOIN cat_rol_hogar rh
      ON rh.id = p.rol_hogar_id

    WHERE h.estado = TRUE

    GROUP BY
      h.id,
      h.codigo,
      h.fecha_visita,
      v.barrio,
      v.direccion

    ORDER BY h.id DESC
  `;

  const resultado = await pool.query(query);

  return resultado.rows;
};

const obtenerHogarPorId = async (id) => {
    const query = `
      SELECT
        h.id,
        h.codigo,
        h.fecha_visita,
        h.hogares_vivienda,
        h.personas_vivienda,
        h.personas_hogar,
        h.personas_menores,
        h.tiempo_vivienda,
        h.personas_aportan_ingresos,
        h.observaciones,
        h.estado,
        h.fecha_registro,
        h.fecha_actualizacion,
  
        v.id AS vivienda_id,
        v.barrio,
        v.direccion,
        v.otra_referencia,
  
        d.nombre AS departamento,
        m.nombre AS municipio,
        sz.nombre AS sector_zona,
  
        CONCAT(pr.nombres, ' ', pr.apellidos) AS profesional
  
      FROM hogar h
  
      INNER JOIN vivienda v
        ON v.id = h.vivienda_id
  
      INNER JOIN cat_departamento d
        ON d.id = v.departamento_id
  
      INNER JOIN cat_municipio m
        ON m.id = v.municipio_id
  
      LEFT JOIN cat_sector_zona sz
        ON sz.id = v.sector_zona_id
  
      INNER JOIN profesional pr
        ON pr.id = h.profesional_id
  
      WHERE h.id = $1
        AND h.estado = TRUE
    `;
  
    const resultado = await pool.query(query, [id]);
  
    return resultado.rows[0] || null;
  };
  const obtenerIntegrantesPorHogar = async (hogarId) => {
    const query = `
      SELECT
        p.id,
        p.hogar_id,
        p.nombres,
        p.numero_documento,
        p.fecha_nacimiento,
  
        EXTRACT(
          YEAR FROM AGE(CURRENT_DATE, p.fecha_nacimiento)
        )::INTEGER AS edad,
  
        p.celular,
        p.correo,
        p.estado,
  
        rh.id AS rol_hogar_id,
        rh.nombre AS rol_hogar,
  
        td.nombre AS tipo_documento,
        sx.nombre AS sexo,
        nac.nombre AS nacionalidad,
        ne.nombre AS nivel_educativo,
        oc.nombre AS ocupacion,
        tt.nombre AS tipo_trabajo,
        ec.nombre AS estado_civil,
  
        pad.parentesco_id,
        par.nombre AS parentesco,
  
        pad.origen_id,
        ori.nombre AS origen,
  
        pad.actividad_id,
        act.nombre AS actividad_ultimo_mes,
  
        pad.aporta_ingresos_id,
        ing.nombre AS aporta_ingresos
  
      FROM persona p
  
      INNER JOIN cat_rol_hogar rh
        ON rh.id = p.rol_hogar_id
  
      LEFT JOIN cat_tipo_documento td
        ON td.id = p.tipo_documento_id
  
      LEFT JOIN cat_sexo sx
        ON sx.id = p.sexo_id
  
      LEFT JOIN cat_nacionalidad nac
        ON nac.id = p.nacionalidad_id
  
      LEFT JOIN cat_nivel_educativo ne
        ON ne.id = p.nivel_educativo_id
  
      LEFT JOIN cat_ocupacion oc
        ON oc.id = p.ocupacion_id
  
      LEFT JOIN cat_tipo_trabajo tt
        ON tt.id = p.tipo_trabajo_id
  
      LEFT JOIN cat_estado_civil ec
        ON ec.id = p.estado_civil_id
  
      LEFT JOIN persona_adulto_detalle pad
        ON pad.persona_id = p.id
  
      LEFT JOIN cat_parentesco par
        ON par.id = pad.parentesco_id
  
      LEFT JOIN cat_origen ori
        ON ori.id = pad.origen_id
  
      LEFT JOIN cat_actividad_ultimo_mes act
        ON act.id = pad.actividad_id
  
      LEFT JOIN cat_si_no ing
        ON ing.id = pad.aporta_ingresos_id
  
      WHERE p.hogar_id = $1
        AND p.estado = TRUE
  
      ORDER BY
        p.rol_hogar_id,
        p.fecha_nacimiento
    `;
  
    const resultado = await pool.query(query, [hogarId]);
  
    return resultado.rows;
  };

module.exports = {
  obtenerHogares,
  obtenerHogarPorId,
  obtenerIntegrantesPorHogar,
};