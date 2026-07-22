/**
 * mappers.js — convierte filas SQL a objetos que entiende el frontend.
 *
 * Usado al armar el perfil completo del hogar (obtenerHogarPorId).
 */

/** Fila de persona (jefe/pareja) → objeto del formulario / perfil */
function mapearPersona(row) {
  if (!row) return null;
  return {
    id: row.id,
    nombre: row.nombres,
    nombres: row.nombres,
    numero: row.numero_documento,
    numero_documento: row.numero_documento,
    fechaNacimiento: row.fecha_nacimiento,
    fecha_nacimiento: row.fecha_nacimiento,
    celular: row.celular,
    email: row.correo,
    correo: row.correo,
    tipoDocumento: row.tipo_documento_id,
    tipo_documento: row.tipo_documento,
    sexo: row.sexo_id,
    sexo_nombre: row.sexo,
    nacionalidad: row.nacionalidad_id,
    nacionalidad_nombre: row.nacionalidad,
    nivelEducativo: row.nivel_educativo_id,
    nivel_educativo: row.nivel_educativo,
    ocupacion: row.ocupacion_id,
    ocupacion_nombre: row.ocupacion,
    tipoTrabajo: row.tipo_trabajo_id,
    tipo_trabajo: row.tipo_trabajo,
    estadoCivil: row.estado_civil_id,
    estado_civil: row.estado_civil,
  };
}

/** Junta todas las consultas parciales en el JSON del perfil */
function construirPerfilHogar({
  hogarData,
  conteo,
  jefe,
  pareja,
  integrantes,
  nna,
  vulnerabilidades,
  prioridades,
  servicios,
  factores,
  riesgos,
}) {
  return {
    id: hogarData.id,
    codigo: hogarData.codigo,
    fecha_visita: hogarData.fecha_visita,
    hogares_vivienda: hogarData.hogares_vivienda,
    personas_vivienda: hogarData.personas_vivienda,
    personas_hogar: conteo.total_personas,
    personas_menores: conteo.total_menores,
    tiempo_vivienda: hogarData.tiempo_vivienda,
    observaciones: hogarData.observaciones,
    estado: hogarData.estado,
    fecha_registro: hogarData.fecha_registro,
    fecha_actualizacion: hogarData.fecha_actualizacion,

    vivienda: {
      id: hogarData.vivienda_id,
      barrio: hogarData.barrio,
      direccion: hogarData.direccion,
      otra_referencia: hogarData.otra_referencia,
      total_cuartos: hogarData.total_cuartos,
      cuartos_dormir: hogarData.cuartos_dormir,
      departamento: hogarData.departamento,
      departamento_id: hogarData.departamento_id,
      municipio: hogarData.municipio,
      municipio_id: hogarData.municipio_id,
      sector_zona: hogarData.sector_zona,
      sector_zona_id: hogarData.sector_zona_id,
      material_pared_id: hogarData.material_pared_id,
      condicion_normalizacion_id: hogarData.condicion_normalizacion_id,
      condicion_general_id: hogarData.condicion_general_id,
      material_pared: hogarData.material_pared,
      condicion_normalizacion: hogarData.condicion_normalizacion,
      condicion_general: hogarData.condicion_general,
      tipoVivienda: hogarData.material_pared,
      situacionVivienda: hogarData.condicion_normalizacion,
      condicionGeneral: hogarData.condicion_general,
    },

    profesional: hogarData.profesional,
    profesional_id: hogarData.profesional_id,

    jefeHogar: mapearPersona(jefe),
    tienePareja: Boolean(pareja),
    pareja: mapearPersona(pareja),

    integrantes: integrantes.map((row) => ({
      nombre: row.nombres,
      fechaNacimiento: row.fecha_nacimiento,
      fecha_nacimiento: row.fecha_nacimiento,
      edad: row.edad,
      sexo: row.sexo,
      sexo_id: row.sexo_id,
      parentesco: row.parentesco,
      parentesco_id: row.parentesco_id,
      origen: row.origen,
      origen_id: row.origen_id,
      actividad: row.actividad,
      actividad_id: row.actividad_id,
      aporta_ingresos: row.aporta_ingresos,
      aportaIngresos: row.aporta_ingresos === "SI",
    })),

    nna: nna.map((row) => ({
      id: row.id,
      nombre: row.nombres,
      fechaNacimiento: row.fecha_nacimiento,
      fecha_nacimiento: row.fecha_nacimiento,
      edad: row.edad,
      sexo: row.sexo,
      sexo_id: row.sexo_id,
      tipoDocumento: row.tipo_documento,
      tipoDocumentoId: row.tipo_documento_id,
      tipo_documento_id: row.tipo_documento_id,
      documento: row.numero_documento,
      numero_documento: row.numero_documento,
      escolaridad_id: row.escolaridad_id,
      estado_escolar: row.estado_escolar,
      origen_id: row.origen_id,
      es_hijo_jefe_id: row.es_hijo_jefe_id,
      discapacidad_id: row.discapacidad_id,
      grado: row.grado,
      discapacidad: row.discapacidad || "Ninguna",
      observacion: row.observacion_academica,
      pendienteConfirmacion: Boolean(row.pendiente_confirmacion),
      enLineaBase: Boolean(row.en_linea_base),
    })),

    vulnerabilidades: vulnerabilidades.map((row) => row.nombre),
    vulnerabilidadesIds: vulnerabilidades.map((row) => row.id),
    prioridades: prioridades.map((row) => row.nombre),
    prioridadesIds: prioridades.map((row) => row.id),

    servicios: servicios.reduce((acc, row) => {
      acc[row.nombre] = row.tiene_servicio_id === 1;
      return acc;
    }, {}),

    factores: factores.reduce((acc, row) => {
      acc[row.nombre] = row.estado_id === 1;
      return acc;
    }, {}),

    riesgos: riesgos.reduce((acc, row) => {
      acc[row.nombre] = row.estado_id === 1;
      return acc;
    }, {}),
  };
}

module.exports = { mapearPersona, construirPerfilHogar };
