const pool = require("../config/db");

const CATALOGOS_PERMITIDOS = {
  roles_sistema: "cat_rol_sistema",
  roles_hogar: "cat_rol_hogar",
  tipos_documento: "cat_tipo_documento",
  sexos: "cat_sexo",
  nacionalidades: "cat_nacionalidad",
  escolaridades: "cat_escolaridad",
  origenes: "cat_origen",
  respuestas_si_no: "cat_si_no",
  discapacidades: "cat_discapacidad",
  tipos_beca: "cat_tipo_beca",
  grados_metodologia: "cat_grado_metodologia",
  jornadas: "cat_jornada",
  estados_mes: "cat_estado_mes_seguimiento",
  tipos_colegio: "cat_tipo_colegio",
  departamentos: "cat_departamento",
  municipios: "cat_municipio",
  sectores_zona: "cat_sector_zona",
  parentescos: "cat_parentesco",
  actividades_ultimo_mes: "cat_actividad_ultimo_mes",
  niveles_educativos: "cat_nivel_educativo",
  ocupaciones: "cat_ocupacion",
  tipos_trabajo: "cat_tipo_trabajo",
  estados_civiles: "cat_estado_civil",
};

const obtenerCatalogo = async (nombre) => {
  const tabla = CATALOGOS_PERMITIDOS[nombre];

  if (!tabla) {
    return null;
  }

  const resultado = await pool.query(`
    SELECT id, nombre
    FROM ${tabla}
    ORDER BY nombre ASC
  `);

  return resultado.rows;
};

const obtenerTodosLosCatalogos = async () => {
  const resultados = await Promise.all(
    Object.entries(CATALOGOS_PERMITIDOS).map(
      async ([nombre, tabla]) => {
        const resultado = await pool.query(`
          SELECT id, nombre
          FROM ${tabla}
          ORDER BY nombre ASC
        `);

        return [nombre, resultado.rows];
      }
    )
  );

  return Object.fromEntries(resultados);
};

module.exports = {
  obtenerCatalogo,
  obtenerTodosLosCatalogos,
};