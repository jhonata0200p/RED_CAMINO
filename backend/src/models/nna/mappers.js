/**
 * mappers.js — fila SQL → objeto NNA para el frontend.
 */

function mapearNna(row) {
  const codigo = row.codigo_hogar || `HOGAR-${row.familiaId}`;

  const ultimoEstado = row.ultimo_estado_mes || null;
  let estado = row.estado_persona ? "Activo" : "Inactivo";
  if (ultimoEstado === "Egresado") estado = "Egresado";
  else if (ultimoEstado === "Inactivo") estado = "Inactivo";
  else if (ultimoEstado === "Activo") estado = "Activo";

  return {
    id: row.id,
    codigo,
    nombre: row.nombre,
    documento: row.documento,
    fechaNacimiento: row.fecha_nacimiento,
    edad: row.edad,
    familiaId: row.familiaId,
    codigoHogar: row.codigo_hogar,
    nombreHogar: row.jefe_hogar || "Sin jefe registrado",
    sexo: row.sexo_nombre || "",
    sexoId: row.sexo_id,
    nacionalidad: row.nacionalidad_nombre || "",
    nacionalidadId: row.nacionalidad_id,
    tipoDocumento: row.tipo_documento_nombre || "",
    tipoDocumentoId: row.tipo_documento_id,
    grado: row.grado || "Sin grado registrado",
    colegio: row.colegio,
    estado,
    barrio: row.barrio || "",
    direccion: row.direccion || "",
    salud: {
      discapacidad: row.discapacidad_nombre || row.discapacidad_lb || "Ninguna",
      discapacidadId: String(row.discapacidad_id || ""),
      neurodivergencia: row.neurodivergencia || "",
      tieneDiagnostico: row.tiene_diagnostico_nombre || "",
      tieneDiagnosticoId: String(row.tiene_diagnostico_id || ""),
    },
    academico: {
      estadoInicialFscm: row.estado_fscm_nombre || "",
      estadoInicialFscmId: String(row.estado_academico_inicial_fscm_id || ""),
      estadoInicial2026: row.estado_2026_nombre || "",
      estadoInicial2026Id: String(row.estado_academico_inicial_2026_id || ""),
      gradoAspirante: row.grado || "",
      gradoAspiranteId: String(row.grado_metodologia_aspirante_id || ""),
      jornada: row.jornada_nombre || "",
      jornadaId: String(row.jornada_id || ""),
      anioIngreso: row.ano_ingreso || "",
    },
    observacionAcademica: row.observacion_academica || "",
    pendienteConfirmacion: false,
  };
}

module.exports = { mapearNna };
