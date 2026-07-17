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

module.exports = {
  obtenerHogares,
  obtenerHogarPorId,
};