/**
 * catalogosModel.js — lee tablas cat_* (sexo, departamento, escolaridad, etc.).
 *
 * consultarCatalogo(tabla) → [{ id, nombre }, ...]
 * obtenerCatalogos() → objeto con todos los catálogos del formulario
 */const pool = require("../config/db");

async function consultarCatalogo(tabla, orden = "id") {
  const result = await pool.query(
    `SELECT id, nombre FROM ${tabla} ORDER BY ${orden}`,
  );
  return result.rows;
}

async function consultarCatalogoOpcional(tabla, orden = "id") {
  try {
    return await consultarCatalogo(tabla, orden);
  } catch (error) {
    if (error?.code === "42P01") {
      return [];
    }
    throw error;
  }
}

const obtenerCatalogos = async () => {
  const [
    sexo,
    tipoDocumento,
    nacionalidad,
    nivelEducativo,
    ocupacion,
    tipoTrabajo,
    estadoCivil,
    departamento,
    municipio,
    sectorZona,
    tipoVivienda,
    tiempoVivienda,
    materialPared,
    condicionNormalizacion,
    condicionGeneral,
    escolaridad,
    discapacidad,
    origen,
    parentesco,
    actividad,
    gradoMetodologia,
    jornada,
    vulnerabilidadHogar,
    prioridadAtencion,
    estadoMesSeguimiento,
    siNo,
  ] = await Promise.all([
    consultarCatalogo("cat_sexo"),
    consultarCatalogo("cat_tipo_documento"),
    consultarCatalogo("cat_nacionalidad"),
    consultarCatalogo("cat_nivel_educativo"),
    consultarCatalogo("cat_ocupacion"),
    consultarCatalogo("cat_tipo_trabajo"),
    consultarCatalogo("cat_estado_civil"),
    consultarCatalogo("cat_departamento"),
    consultarCatalogo("cat_municipio"),
    consultarCatalogo("cat_sector_zona"),
    consultarCatalogoOpcional("cat_tipo_vivienda"),
    consultarCatalogoOpcional("cat_tiempo_vivienda"),
    consultarCatalogo("cat_material_pared"),
    consultarCatalogo("cat_condicion_normalizacion"),
    consultarCatalogo("cat_condicion_general"),
    consultarCatalogo("cat_escolaridad"),
    consultarCatalogo("cat_discapacidad"),
    consultarCatalogo("cat_origen"),
    consultarCatalogo("cat_parentesco"),
    consultarCatalogo("cat_actividad_ultimo_mes"),
    consultarCatalogo("cat_grado_metodologia"),
    consultarCatalogo("cat_jornada"),
    consultarCatalogo("cat_vulnerabilidad_hogar"),
    consultarCatalogo("cat_prioridad_atencion"),
    consultarCatalogo("cat_estado_mes_seguimiento"),
    consultarCatalogo("cat_si_no"),
  ]);

  return {
    sexo,
    tipoDocumento,
    nacionalidad,
    nivelEducativo,
    ocupacion,
    tipoTrabajo,
    estadoCivil,
    departamento,
    municipio,
    sectorZona,
    tipoVivienda,
    tiempoVivienda,
    materialPared,
    condicionNormalizacion,
    condicionGeneral,
    escolaridad,
    discapacidad,
    origen,
    parentesco,
    actividad,
    gradoMetodologia,
    jornada,
    vulnerabilidadHogar,
    prioridadAtencion,
    estadoMesSeguimiento,
    siNo,
  };
};

module.exports = { obtenerCatalogos };
