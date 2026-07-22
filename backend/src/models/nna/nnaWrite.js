/**
 * nnaWrite.js — crear, actualizar y eliminar NNA (+ servicios de línea base).
 */
const pool = require("../../config/db");
const { idONull } = require("../../utils/dbHelpers");
const SERVICIOS_NNA_FORM = require("../../constants/serviciosNna");
const { obtenerNnaPorId } = require("./nnaRead");

function resolverTieneDiagnostico(datos) {
  const v = datos.salud?.tieneDiagnostico;
  if (
    v === "1" ||
    v === 1 ||
    String(v || "").toLowerCase() === "sí" ||
    String(v || "").toLowerCase() === "si"
  ) {
    return 1;
  }
  if (v === "2" || v === 2 || String(v || "").toLowerCase() === "no") return 2;
  return idONull(v);
}

async function guardarServicios(client, lineaBaseId, servicios) {
  await client.query(
    `DELETE FROM nna_servicio_necesidad WHERE nna_linea_base_id = $1`,
    [lineaBaseId],
  );
  for (const [clave, servicioId] of Object.entries(SERVICIOS_NNA_FORM)) {
    if (servicios?.[clave]) {
      await client.query(
        `INSERT INTO nna_servicio_necesidad (nna_linea_base_id, servicio_nna_id)
         VALUES ($1, $2) ON CONFLICT DO NOTHING`,
        [lineaBaseId, servicioId],
      );
    }
  }
}

/**
 * Crea o confirma un NNA:
 *   - si viene personaId → actualiza pendiente y crea/actualiza línea base
 *   - si no → inserta persona nueva + detalle + línea base
 */
async function crearNna(datos) {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    if (!datos.familiaId) {
      throw new Error("Debe indicar el hogar al que pertenece el NNA");
    }
    if (!datos.nombre) {
      throw new Error("El nombre del NNA es obligatorio");
    }

    let personaId = idONull(datos.personaId);

    if (!datos.fechaNacimiento && personaId) {
      const existente = await client.query(
        `SELECT fecha_nacimiento FROM persona WHERE id = $1`,
        [personaId],
      );
      if (existente.rows[0]?.fecha_nacimiento) {
        datos.fechaNacimiento = existente.rows[0].fecha_nacimiento;
      }
    }

    if (!datos.fechaNacimiento) {
      throw new Error("La fecha de nacimiento es obligatoria");
    }

    const discapacidadId = idONull(datos.salud?.discapacidad) || 8;
    const tieneDiagnosticoId = resolverTieneDiagnostico(datos);

    if (personaId) {
      await client.query(
        `UPDATE persona SET
          nombres = $1,
          tipo_documento_id = COALESCE($2, tipo_documento_id),
          numero_documento = COALESCE($3, numero_documento),
          fecha_nacimiento = $4,
          sexo_id = COALESCE($5, sexo_id),
          nacionalidad_id = COALESCE($6, nacionalidad_id),
          pendiente_confirmacion = FALSE,
          estado = TRUE
         WHERE id = $7 AND hogar_id = $8 AND rol_hogar_id = 4`,
        [
          datos.nombre || "",
          idONull(datos.tipoDocumento),
          datos.documento || null,
          String(datos.fechaNacimiento).split("T")[0],
          idONull(datos.sexo),
          idONull(datos.nacionalidad),
          personaId,
          Number(datos.familiaId),
        ],
      );

      await client.query(
        `INSERT INTO persona_nna_detalle (
          persona_id, escolaridad_id, discapacidad_id, discapacidad_diagnosticada_id
        ) VALUES ($1, $2, $3, $4)
        ON CONFLICT (persona_id) DO UPDATE SET
          escolaridad_id = EXCLUDED.escolaridad_id,
          discapacidad_id = EXCLUDED.discapacidad_id,
          discapacidad_diagnosticada_id = EXCLUDED.discapacidad_diagnosticada_id`,
        [
          personaId,
          idONull(datos.academico?.estadoInicialFscm) ||
            idONull(datos.academico?.estadoInicial2026) ||
            1,
          discapacidadId,
          tieneDiagnosticoId,
        ],
      );
    } else {
      const personaResult = await client.query(
        `INSERT INTO persona (
          hogar_id, rol_hogar_id, nombres, tipo_documento_id,
          numero_documento, fecha_nacimiento, sexo_id, nacionalidad_id,
          pendiente_confirmacion
        ) VALUES ($1, 4, $2, $3, $4, $5, $6, $7, FALSE) RETURNING id`,
        [
          Number(datos.familiaId),
          datos.nombre || "",
          idONull(datos.tipoDocumento),
          datos.documento || null,
          String(datos.fechaNacimiento).split("T")[0],
          idONull(datos.sexo),
          idONull(datos.nacionalidad),
        ],
      );
      personaId = personaResult.rows[0].id;

      await client.query(
        `INSERT INTO persona_nna_detalle (
          persona_id, escolaridad_id, discapacidad_id, discapacidad_diagnosticada_id
        ) VALUES ($1, $2, $3, $4)`,
        [
          personaId,
          idONull(datos.academico?.estadoInicialFscm) ||
            idONull(datos.academico?.estadoInicial2026) ||
            1,
          discapacidadId,
          tieneDiagnosticoId,
        ],
      );
    }

    const discNombre = await client.query(
      `SELECT nombre FROM cat_discapacidad WHERE id = $1`,
      [discapacidadId],
    );

    const existente = await client.query(
      `SELECT id FROM nna_linea_base WHERE persona_id = $1`,
      [personaId],
    );

    let lineaBaseId;
    if (existente.rows[0]) {
      lineaBaseId = existente.rows[0].id;
      await client.query(
        `UPDATE nna_linea_base SET
          discapacidad = $1,
          neurodivergencia = $2,
          tiene_diagnostico_id = $3,
          ano_ingreso = $4,
          estado_academico_inicial_fscm_id = $5,
          estado_academico_inicial_2026_id = $6,
          grado_metodologia_aspirante_id = $7,
          jornada_id = $8,
          observacion_academica = $9
         WHERE id = $10`,
        [
          discNombre.rows[0]?.nombre || "Ninguna",
          datos.salud?.neurodivergencia || null,
          tieneDiagnosticoId,
          datos.academico?.anioIngreso
            ? Number(datos.academico.anioIngreso)
            : new Date().getFullYear(),
          idONull(datos.academico?.estadoInicialFscm),
          idONull(datos.academico?.estadoInicial2026),
          idONull(datos.academico?.gradoAspirante),
          idONull(datos.academico?.jornada),
          datos.observacionAcademica || null,
          lineaBaseId,
        ],
      );
    } else {
      const lineaResult = await client.query(
        `INSERT INTO nna_linea_base (
          persona_id, discapacidad, neurodivergencia, tiene_diagnostico_id,
          ano_ingreso,
          estado_academico_inicial_fscm_id, estado_academico_inicial_2026_id,
          grado_metodologia_aspirante_id, jornada_id, observacion_academica
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
        RETURNING id`,
        [
          personaId,
          discNombre.rows[0]?.nombre || "Ninguna",
          datos.salud?.neurodivergencia || null,
          tieneDiagnosticoId,
          datos.academico?.anioIngreso
            ? Number(datos.academico.anioIngreso)
            : new Date().getFullYear(),
          idONull(datos.academico?.estadoInicialFscm),
          idONull(datos.academico?.estadoInicial2026),
          idONull(datos.academico?.gradoAspirante),
          idONull(datos.academico?.jornada),
          datos.observacionAcademica || null,
        ],
      );
      lineaBaseId = lineaResult.rows[0].id;
    }

    await guardarServicios(client, lineaBaseId, datos.servicios || {});
    await client.query("COMMIT");
    return obtenerNnaPorId(personaId);
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
}

async function actualizarNna(id, datos) {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    const discapacidadId = idONull(datos.salud?.discapacidad);
    const tieneDiagnosticoId = resolverTieneDiagnostico(datos);

    await client.query(
      `UPDATE persona SET
        nombres = COALESCE($1, nombres),
        numero_documento = COALESCE($2, numero_documento),
        tipo_documento_id = COALESCE($3, tipo_documento_id),
        sexo_id = COALESCE($4, sexo_id),
        nacionalidad_id = COALESCE($5, nacionalidad_id),
        fecha_nacimiento = COALESCE($6, fecha_nacimiento),
        pendiente_confirmacion = FALSE
       WHERE id = $7 AND rol_hogar_id = 4`,
      [
        datos.nombre || null,
        datos.documento || null,
        idONull(datos.tipoDocumento),
        idONull(datos.sexo),
        idONull(datos.nacionalidad),
        datos.fechaNacimiento
          ? String(datos.fechaNacimiento).split("T")[0]
          : null,
        id,
      ],
    );

    if (discapacidadId || tieneDiagnosticoId) {
      await client.query(
        `INSERT INTO persona_nna_detalle (
          persona_id, escolaridad_id, discapacidad_id, discapacidad_diagnosticada_id
        ) VALUES ($1, $2, $3, $4)
        ON CONFLICT (persona_id) DO UPDATE SET
          escolaridad_id = COALESCE(EXCLUDED.escolaridad_id, persona_nna_detalle.escolaridad_id),
          discapacidad_id = COALESCE(EXCLUDED.discapacidad_id, persona_nna_detalle.discapacidad_id),
          discapacidad_diagnosticada_id = COALESCE(EXCLUDED.discapacidad_diagnosticada_id, persona_nna_detalle.discapacidad_diagnosticada_id)`,
        [
          id,
          idONull(datos.academico?.estadoInicialFscm) ||
            idONull(datos.academico?.estadoInicial2026) ||
            1,
          discapacidadId || 8,
          tieneDiagnosticoId,
        ],
      );
    }

    let discNombre = null;
    if (discapacidadId) {
      const r = await client.query(
        `SELECT nombre FROM cat_discapacidad WHERE id = $1`,
        [discapacidadId],
      );
      discNombre = r.rows[0]?.nombre || null;
    }

    const lb = await client.query(
      `SELECT id FROM nna_linea_base WHERE persona_id = $1`,
      [id],
    );

    if (lb.rows[0]) {
      await client.query(
        `UPDATE nna_linea_base SET
          discapacidad = COALESCE($1, discapacidad),
          neurodivergencia = COALESCE($2, neurodivergencia),
          tiene_diagnostico_id = COALESCE($3, tiene_diagnostico_id),
          ano_ingreso = COALESCE($4, ano_ingreso),
          estado_academico_inicial_fscm_id = COALESCE($5, estado_academico_inicial_fscm_id),
          estado_academico_inicial_2026_id = COALESCE($6, estado_academico_inicial_2026_id),
          grado_metodologia_aspirante_id = COALESCE($7, grado_metodologia_aspirante_id),
          jornada_id = COALESCE($8, jornada_id),
          observacion_academica = COALESCE($9, observacion_academica)
         WHERE persona_id = $10`,
        [
          discNombre,
          datos.salud?.neurodivergencia ?? null,
          tieneDiagnosticoId,
          datos.academico?.anioIngreso
            ? Number(datos.academico.anioIngreso)
            : null,
          idONull(datos.academico?.estadoInicialFscm),
          idONull(datos.academico?.estadoInicial2026),
          idONull(datos.academico?.gradoAspirante),
          idONull(datos.academico?.jornada),
          datos.observacionAcademica ?? null,
          id,
        ],
      );

      if (datos.servicios) {
        await guardarServicios(client, lb.rows[0].id, datos.servicios);
      }
    }

    await client.query("COMMIT");
    return obtenerNnaPorId(id);
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
}

async function eliminarNna(id) {
  await pool.query(
    `UPDATE persona SET estado = FALSE WHERE id = $1 AND rol_hogar_id = 4`,
    [id],
  );
  return true;
}

module.exports = { crearNna, actualizarNna, eliminarNna };
