/**
 * hogaresRead.js — consultas de lectura (listado y perfil completo).
 *
 * Flujo de obtenerHogarPorId:
 *   1. Hogar + vivienda
 *   2. Conteos, jefe, pareja, integrantes, NNA
 *   3. Vulnerabilidades, prioridades, servicios, factores, riesgos
 *   4. construirPerfilHogar() arma el JSON final
 */
const pool = require("../../config/db");
const { construirPerfilHogar } = require("./mappers");

/** Listado resumido para la tabla de hogares */
async function obtenerHogares() {
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
                WHERE p.estado = TRUE
            )::INTEGER AS personas_hogar,

            COUNT(p.id) FILTER (
                WHERE p.estado = TRUE AND p.rol_hogar_id = 4
            )::INTEGER AS personas_menores,

            COALESCE(
                STRING_AGG(p.nombres, ', ' ORDER BY p.nombres)
                FILTER (WHERE p.estado = TRUE AND p.rol_hogar_id = 4),
                ''
            ) AS nombres_menores

        FROM hogar h
        INNER JOIN vivienda v ON v.id = h.vivienda_id
        LEFT JOIN persona p ON p.hogar_id = h.id AND p.estado = TRUE
        LEFT JOIN cat_rol_hogar rh ON rh.id = p.rol_hogar_id
        WHERE h.estado = TRUE
        GROUP BY h.id, h.codigo, h.fecha_visita, v.barrio, v.direccion
        ORDER BY h.id DESC
    `;

  const resultado = await pool.query(query);
  return resultado.rows;
}

/** Perfil completo de un hogar (muchas consultas + mapper) */
async function obtenerHogarPorId(id) {
  const client = await pool.connect();
  try {
    // 1. Hogar + vivienda + catálogos de ubicación
    const hogarResult = await client.query(
      `SELECT
          h.id, h.codigo, h.fecha_visita, h.hogares_vivienda, h.personas_vivienda,
          h.tiempo_vivienda, h.observaciones, h.estado, h.fecha_registro,
          h.fecha_actualizacion, h.profesional_id,
          v.id AS vivienda_id, v.barrio, v.direccion, v.otra_referencia,
          v.total_cuartos, v.cuartos_dormir,
          d.nombre AS departamento, d.id AS departamento_id,
          m.nombre AS municipio, m.id AS municipio_id,
          sz.nombre AS sector_zona, sz.id AS sector_zona_id,
          v.material_pared_id, v.condicion_normalizacion_id, v.condicion_general_id,
          mp.nombre AS material_pared,
          cn.nombre AS condicion_normalizacion,
          cg.nombre AS condicion_general,
          CONCAT(pr.nombres, ' ', pr.apellidos) AS profesional,
          pr.id AS profesional_id
       FROM hogar h
       INNER JOIN vivienda v ON v.id = h.vivienda_id
       INNER JOIN cat_departamento d ON d.id = v.departamento_id
       INNER JOIN cat_municipio m ON m.id = v.municipio_id
       LEFT JOIN cat_sector_zona sz ON sz.id = v.sector_zona_id
       LEFT JOIN cat_material_pared mp ON mp.id = v.material_pared_id
       LEFT JOIN cat_condicion_normalizacion cn ON cn.id = v.condicion_normalizacion_id
       LEFT JOIN cat_condicion_general cg ON cg.id = v.condicion_general_id
       INNER JOIN profesional pr ON pr.id = h.profesional_id
       WHERE h.id = $1 AND h.estado = TRUE`,
      [id],
    );
    const hogarData = hogarResult.rows[0] || null;
    if (!hogarData) return null;

    // 2. Conteos de personas
    const conteoResult = await client.query(
      `SELECT
          COUNT(*) FILTER (WHERE p.estado = TRUE)::INTEGER AS total_personas,
          COUNT(*) FILTER (
              WHERE p.estado = TRUE AND p.rol_hogar_id = 4
          )::INTEGER AS total_menores
       FROM persona p
       WHERE p.hogar_id = $1 AND p.estado = TRUE`,
      [id],
    );
    const conteo = conteoResult.rows[0] || { total_personas: 0, total_menores: 0 };

    // 3. Jefe de hogar (rol 1)
    const jefeResult = await client.query(
      `SELECT
          p.id, p.nombres, p.numero_documento, p.fecha_nacimiento,
          p.celular, p.correo, p.tipo_documento_id, p.sexo_id,
          p.nacionalidad_id, p.nivel_educativo_id, p.ocupacion_id,
          p.tipo_trabajo_id, p.estado_civil_id,
          td.nombre AS tipo_documento, s.nombre AS sexo,
          n.nombre AS nacionalidad, ne.nombre AS nivel_educativo,
          o.nombre AS ocupacion, tt.nombre AS tipo_trabajo,
          ec.nombre AS estado_civil
       FROM persona p
       LEFT JOIN cat_tipo_documento td ON td.id = p.tipo_documento_id
       LEFT JOIN cat_sexo s ON s.id = p.sexo_id
       LEFT JOIN cat_nacionalidad n ON n.id = p.nacionalidad_id
       LEFT JOIN cat_nivel_educativo ne ON ne.id = p.nivel_educativo_id
       LEFT JOIN cat_ocupacion o ON o.id = p.ocupacion_id
       LEFT JOIN cat_tipo_trabajo tt ON tt.id = p.tipo_trabajo_id
       LEFT JOIN cat_estado_civil ec ON ec.id = p.estado_civil_id
       WHERE p.hogar_id = $1 AND p.rol_hogar_id = 1 AND p.estado = TRUE`,
      [id],
    );

    // 4. Pareja (rol 2)
    const parejaResult = await client.query(
      `SELECT
          p.nombres, p.numero_documento, p.fecha_nacimiento, p.celular,
          p.tipo_documento_id, p.sexo_id, p.nacionalidad_id,
          p.nivel_educativo_id, p.ocupacion_id, p.tipo_trabajo_id, p.estado_civil_id,
          s.nombre AS sexo, n.nombre AS nacionalidad,
          ne.nombre AS nivel_educativo, o.nombre AS ocupacion,
          tt.nombre AS tipo_trabajo, ec.nombre AS estado_civil,
          td.nombre AS tipo_documento
       FROM persona p
       LEFT JOIN cat_tipo_documento td ON td.id = p.tipo_documento_id
       LEFT JOIN cat_sexo s ON s.id = p.sexo_id
       LEFT JOIN cat_nacionalidad n ON n.id = p.nacionalidad_id
       LEFT JOIN cat_nivel_educativo ne ON ne.id = p.nivel_educativo_id
       LEFT JOIN cat_ocupacion o ON o.id = p.ocupacion_id
       LEFT JOIN cat_tipo_trabajo tt ON tt.id = p.tipo_trabajo_id
       LEFT JOIN cat_estado_civil ec ON ec.id = p.estado_civil_id
       WHERE p.hogar_id = $1 AND p.rol_hogar_id = 2 AND p.estado = TRUE`,
      [id],
    );

    // 5. Integrantes adultos (rol 3)
    const integrantesResult = await client.query(
      `SELECT
          p.nombres, p.fecha_nacimiento,
          EXTRACT(YEAR FROM AGE(CURRENT_DATE, p.fecha_nacimiento))::INTEGER AS edad,
          p.sexo_id, s.nombre AS sexo,
          pad.parentesco_id, pr.nombre AS parentesco,
          pad.origen_id, o.nombre AS origen,
          pad.actividad_id, a.nombre AS actividad,
          pad.aporta_ingresos_id, si.nombre AS aporta_ingresos
       FROM persona p
       LEFT JOIN cat_sexo s ON s.id = p.sexo_id
       LEFT JOIN persona_adulto_detalle pad ON pad.persona_id = p.id
       LEFT JOIN cat_parentesco pr ON pr.id = pad.parentesco_id
       LEFT JOIN cat_origen o ON o.id = pad.origen_id
       LEFT JOIN cat_actividad_ultimo_mes a ON a.id = pad.actividad_id
       LEFT JOIN cat_si_no si ON si.id = pad.aporta_ingresos_id
       WHERE p.hogar_id = $1 AND p.rol_hogar_id = 3 AND p.estado = TRUE`,
      [id],
    );

    // 6. NNA (rol 4)
    const nnaResult = await client.query(
      `SELECT
          p.id, p.nombres, p.fecha_nacimiento,
          EXTRACT(YEAR FROM AGE(CURRENT_DATE, p.fecha_nacimiento))::INTEGER AS edad,
          p.sexo_id, s.nombre AS sexo,
          p.numero_documento, p.tipo_documento_id, td.nombre AS tipo_documento,
          p.pendiente_confirmacion,
          pnd.escolaridad_id, e.nombre AS estado_escolar,
          pnd.origen_id, pnd.es_hijo_jefe_id, pnd.discapacidad_id,
          gm.nombre AS grado, d.nombre AS discapacidad,
          nl.observacion_academica,
          CASE WHEN nl.id IS NOT NULL THEN TRUE ELSE FALSE END AS en_linea_base
       FROM persona p
       LEFT JOIN cat_tipo_documento td ON td.id = p.tipo_documento_id
       LEFT JOIN cat_sexo s ON s.id = p.sexo_id
       LEFT JOIN persona_nna_detalle pnd ON pnd.persona_id = p.id
       LEFT JOIN nna_linea_base nl ON nl.persona_id = p.id
       LEFT JOIN cat_escolaridad e ON e.id = pnd.escolaridad_id
       LEFT JOIN cat_discapacidad d ON d.id = pnd.discapacidad_id
       LEFT JOIN cat_grado_metodologia gm ON gm.id = nl.grado_metodologia_aspirante_id
       WHERE p.hogar_id = $1 AND p.rol_hogar_id = 4 AND p.estado = TRUE`,
      [id],
    );

    // 7–8. Vulnerabilidades y prioridades
    const vulnerabilidadesResult = await client.query(
      `SELECT cvh.id, cvh.nombre
       FROM hogar_vulnerabilidad hv
       JOIN cat_vulnerabilidad_hogar cvh ON cvh.id = hv.vulnerabilidad_id
       WHERE hv.hogar_id = $1 AND hv.estado_id = 1`,
      [id],
    );
    const prioridadesResult = await client.query(
      `SELECT cpa.id, cpa.nombre
       FROM hogar_prioridad hp
       JOIN cat_prioridad_atencion cpa ON cpa.id = hp.prioridad_id
       WHERE hp.hogar_id = $1 AND hp.estado_id = 1`,
      [id],
    );

    // 9–11. Servicios, factores y riesgos de la vivienda
    const serviciosResult = await client.query(
      `SELECT cs.nombre, vs.tiene_servicio_id
       FROM vivienda_servicio vs
       JOIN cat_servicio_publico cs ON cs.id = vs.servicio_id
       WHERE vs.vivienda_id = $1`,
      [hogarData.vivienda_id],
    );
    const factoresResult = await client.query(
      `SELECT cfa.nombre, va.estado_id
       FROM vivienda_afectacion va
       JOIN cat_factor_afectacion cfa ON cfa.id = va.afectacion_id
       WHERE va.vivienda_id = $1`,
      [hogarData.vivienda_id],
    );
    const riesgosResult = await client.query(
      `SELECT cfr.nombre, vr.estado_id
       FROM vivienda_riesgo vr
       JOIN cat_factor_riesgo cfr ON cfr.id = vr.riesgo_id
       WHERE vr.vivienda_id = $1`,
      [hogarData.vivienda_id],
    );

    return construirPerfilHogar({
      hogarData,
      conteo,
      jefe: jefeResult.rows[0] || null,
      pareja: parejaResult.rows[0] || null,
      integrantes: integrantesResult.rows,
      nna: nnaResult.rows,
      vulnerabilidades: vulnerabilidadesResult.rows,
      prioridades: prioridadesResult.rows,
      servicios: serviciosResult.rows,
      factores: factoresResult.rows,
      riesgos: riesgosResult.rows,
    });
  } catch (error) {
    console.error("Error en obtenerHogarPorId:", error);
    throw error;
  } finally {
    client.release();
  }
}

module.exports = { obtenerHogares, obtenerHogarPorId };
