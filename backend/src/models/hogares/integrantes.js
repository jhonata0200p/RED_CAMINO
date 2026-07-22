/**
 * integrantes.js — inserta un adulto (rol 3) o un NNA (rol 4) en el hogar.
 *
 * Se usa al crear y al actualizar (reemplazo de integrantes).
 */
const { idONull, fechaNacimientoSegura, edadDesdeFecha } = require("../../utils/dbHelpers");

async function insertarIntegranteHogar(client, hogarId, integrante) {
  const fecha = fechaNacimientoSegura(
    integrante.fechaNacimiento || integrante.fecha_nacimiento,
    integrante.edad,
  );
  const edad = edadDesdeFecha(fecha);
  const esNna =
    integrante.tipoIntegrante === "menor" ||
    (integrante.tipoIntegrante !== "mayor" && edad !== null && edad < 18);

  // --- Menor de edad (NNA) ---
  if (esNna) {
    const pendiente =
      integrante.pendienteConfirmacion === true ||
      integrante.pendiente_confirmacion === true ||
      integrante.pendienteConfirmacion === "true" ||
      integrante.pendienteConfirmacion === 1;

    if (!integrante.documento && !integrante.numero_documento) {
      throw new Error(
        `El número de documento es obligatorio para el menor: ${integrante.nombre || "sin nombre"}`,
      );
    }
    if (!integrante.tipoDocumento && !integrante.tipo_documento_id) {
      throw new Error(
        `El tipo de documento es obligatorio para el menor: ${integrante.nombre || "sin nombre"}`,
      );
    }

    const personaResult = await client.query(
      `INSERT INTO persona (
        hogar_id, rol_hogar_id, nombres, tipo_documento_id, numero_documento,
        fecha_nacimiento, sexo_id, pendiente_confirmacion
      ) VALUES ($1, 4, $2, $3, $4, $5, $6, $7) RETURNING id`,
      [
        hogarId,
        integrante.nombre || "",
        idONull(integrante.tipoDocumento || integrante.tipo_documento_id),
        integrante.documento || integrante.numero_documento || null,
        fecha,
        idONull(integrante.sexo),
        pendiente,
      ],
    );
    const personaId = personaResult.rows[0].id;

    await client.query(
      `INSERT INTO persona_nna_detalle (
        persona_id, escolaridad_id, origen_id, es_hijo_jefe_id, discapacidad_id
      ) VALUES ($1, $2, $3, $4, $5)`,
      [
        personaId,
        idONull(integrante.escolaridad) || 1,
        idONull(integrante.origen),
        idONull(integrante.esHijoJefe),
        idONull(integrante.discapacidad) || 8,
      ],
    );

    // Pendientes por confirmar NO entran a línea base (pestaña NNA)
    return;
  }

  // --- Adulto (otro integrante del hogar) ---
  const personaResult = await client.query(
    `INSERT INTO persona (
      hogar_id, rol_hogar_id, nombres, fecha_nacimiento, sexo_id
    ) VALUES ($1, 3, $2, $3, $4) RETURNING id`,
    [hogarId, integrante.nombre || "", fecha, idONull(integrante.sexo)],
  );
  const personaId = personaResult.rows[0].id;

  await client.query(
    `INSERT INTO persona_adulto_detalle (
      persona_id, parentesco_id, origen_id, actividad_id, aporta_ingresos_id
    ) VALUES ($1, $2, $3, $4, $5)`,
    [
      personaId,
      idONull(integrante.parentesco),
      idONull(integrante.origen),
      idONull(integrante.actividad),
      integrante.aportaIngresos ? 1 : 2,
    ],
  );
}

module.exports = { insertarIntegranteHogar };
