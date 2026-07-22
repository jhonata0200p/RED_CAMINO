/**
 * hogaresWrite.js — crear, actualizar y eliminar hogares (transacciones).
 *
 * Orden típico al crear:
 *   vivienda → relaciones vivienda → hogar → jefe → pareja → integrantes → vulnerabilidades
 */
const pool = require("../../config/db");
const { idONull, fechaNacimientoSegura } = require("../../utils/dbHelpers");
const { insertarIntegranteHogar } = require("./integrantes");
const {
  guardarRelacionesVivienda,
  guardarVulnerabilidadesYPrioridades,
  siguienteCodigoHogar,
} = require("./vivienda");

/** Crea hogar completo dentro de una transacción BEGIN/COMMIT */
async function crearHogar(datos, profesionalId) {
  const { paso1, jefeHogar, pareja, vivienda, integrantes } = datos;
  const tienePareja =
    ["1", "2"].includes(String(jefeHogar?.estadoCivil)) ||
    Boolean(datos.tienePareja);

  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    const totalPersonas =
      1 +
      (integrantes?.filter((i) => i?.nombre)?.length || 0) +
      (tienePareja && pareja?.nombre ? 1 : 0);

    // 1. Vivienda
    const viviendaResult = await client.query(
      `INSERT INTO vivienda (
        departamento_id, municipio_id, sector_zona_id, barrio, direccion, otra_referencia,
        material_pared_id, condicion_normalizacion_id, condicion_general_id,
        total_cuartos, cuartos_dormir
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING id`,
      [
        idONull(paso1.departamento) || 1,
        idONull(paso1.municipio) || 1,
        idONull(paso1.sector),
        paso1.barrio || "",
        paso1.direccion || "",
        paso1.referencia || "",
        idONull(vivienda?.materialVivienda),
        idONull(vivienda?.situacionVivienda),
        idONull(vivienda?.condicionGeneral),
        vivienda?.cuartosTotales || 0,
        vivienda?.cuartosDormir || 0,
      ],
    );
    const viviendaId = viviendaResult.rows[0].id;
    await guardarRelacionesVivienda(client, viviendaId, vivienda);

    // 2. Hogar (código lo asigna el backend)
    const codigo = await siguienteCodigoHogar(client);
    const hogarResult = await client.query(
      `INSERT INTO hogar (
        codigo, fecha_visita, profesional_id, vivienda_id,
        personas_vivienda, observaciones, tiempo_vivienda
      ) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id`,
      [
        codigo,
        paso1.fechaVisita || new Date().toISOString().split("T")[0],
        profesionalId || 1,
        viviendaId,
        totalPersonas,
        paso1.observaciones || paso1.condicion || "",
        vivienda?.tiempoVivienda || "",
      ],
    );
    const hogarId = hogarResult.rows[0].id;

    // 3. Jefe de hogar (rol 1)
    await client.query(
      `INSERT INTO persona (
        hogar_id, rol_hogar_id, nombres, tipo_documento_id,
        numero_documento, fecha_nacimiento, sexo_id, celular, correo,
        nacionalidad_id, nivel_educativo_id, ocupacion_id,
        tipo_trabajo_id, estado_civil_id
      ) VALUES ($1, 1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)`,
      [
        hogarId,
        jefeHogar.nombre || "",
        idONull(jefeHogar.tipoDocumento),
        jefeHogar.numero || "",
        fechaNacimientoSegura(jefeHogar.fechaNacimiento),
        idONull(jefeHogar.sexo),
        jefeHogar.celular || "",
        jefeHogar.email || "",
        idONull(jefeHogar.nacionalidad),
        idONull(jefeHogar.nivelEducativo),
        idONull(jefeHogar.ocupacion),
        idONull(jefeHogar.tipoTrabajo),
        idONull(jefeHogar.estadoCivil),
      ],
    );

    // 4. Pareja (rol 2), si aplica
    if (tienePareja && pareja?.nombre) {
      await client.query(
        `INSERT INTO persona (
          hogar_id, rol_hogar_id, nombres, tipo_documento_id,
          numero_documento, fecha_nacimiento, sexo_id, celular,
          nacionalidad_id, nivel_educativo_id, ocupacion_id,
          tipo_trabajo_id, estado_civil_id
        ) VALUES ($1, 2, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)`,
        [
          hogarId,
          pareja.nombre || "",
          idONull(pareja.tipoDocumento),
          pareja.numero || "",
          fechaNacimientoSegura(pareja.fechaNacimiento),
          idONull(pareja.sexo),
          pareja.celular || "",
          idONull(pareja.nacionalidad),
          idONull(pareja.nivelEducativo),
          idONull(pareja.ocupacion),
          idONull(pareja.tipoTrabajo),
          null,
        ],
      );
    }

    // 5. Integrantes (adultos y NNA)
    if (integrantes && integrantes.length > 0) {
      for (const integrante of integrantes) {
        if (!integrante?.nombre) continue;
        await insertarIntegranteHogar(client, hogarId, integrante);
      }
    }

    await guardarVulnerabilidadesYPrioridades(client, hogarId, datos);
    await client.query("COMMIT");

    return { id: hogarId, codigo };
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
}

/** Actualiza vivienda, jefe e integrantes del hogar */
async function actualizarHogar(id, datos) {
  const { paso1, jefeHogar, vivienda, integrantes } = datos;

  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    const hogarRow = await client.query(
      `SELECT vivienda_id FROM hogar WHERE id = $1 AND estado = TRUE`,
      [id],
    );
    if (!hogarRow.rows[0]) {
      throw new Error("Hogar no encontrado");
    }
    const viviendaId = hogarRow.rows[0].vivienda_id;

    await client.query(
      `UPDATE vivienda SET
        barrio = $1, direccion = $2, otra_referencia = $3,
        total_cuartos = $4, cuartos_dormir = $5,
        municipio_id = COALESCE($6, municipio_id),
        sector_zona_id = COALESCE($7, sector_zona_id),
        material_pared_id = COALESCE($8, material_pared_id),
        condicion_normalizacion_id = COALESCE($9, condicion_normalizacion_id),
        condicion_general_id = COALESCE($10, condicion_general_id),
        departamento_id = COALESCE($11, departamento_id)
       WHERE id = $12`,
      [
        paso1?.barrio || "",
        paso1?.direccion || "",
        paso1?.referencia || "",
        vivienda?.cuartosTotales || 0,
        vivienda?.cuartosDormir || 0,
        idONull(paso1?.municipio),
        idONull(paso1?.sector),
        idONull(vivienda?.materialVivienda),
        idONull(vivienda?.situacionVivienda),
        idONull(vivienda?.condicionGeneral),
        idONull(paso1?.departamento),
        viviendaId,
      ],
    );

    if (vivienda?.servicios || vivienda?.factores || vivienda?.riesgos) {
      await guardarRelacionesVivienda(client, viviendaId, vivienda);
    }

    await client.query(
      `UPDATE hogar SET
        fecha_visita = COALESCE($1, fecha_visita),
        observaciones = $2,
        tiempo_vivienda = COALESCE($3, tiempo_vivienda),
        personas_vivienda = COALESCE($4, personas_vivienda),
        fecha_actualizacion = CURRENT_TIMESTAMP
       WHERE id = $5`,
      [
        paso1?.fechaVisita || null,
        paso1?.observaciones || paso1?.condicion || "",
        vivienda?.tiempoVivienda || null,
        Array.isArray(integrantes) ? 1 + (integrantes.length || 0) : null,
        id,
      ],
    );

    await client.query(
      `UPDATE persona SET
        nombres = COALESCE($1, nombres),
        numero_documento = COALESCE($2, numero_documento),
        celular = COALESCE($3, celular),
        correo = COALESCE($4, correo),
        tipo_documento_id = COALESCE($5, tipo_documento_id),
        sexo_id = COALESCE($6, sexo_id),
        nacionalidad_id = COALESCE($7, nacionalidad_id),
        nivel_educativo_id = COALESCE($8, nivel_educativo_id),
        ocupacion_id = COALESCE($9, ocupacion_id),
        tipo_trabajo_id = COALESCE($10, tipo_trabajo_id),
        estado_civil_id = COALESCE($11, estado_civil_id),
        fecha_nacimiento = COALESCE($12, fecha_nacimiento)
       WHERE hogar_id = $13 AND rol_hogar_id = 1`,
      [
        jefeHogar?.nombre || null,
        jefeHogar?.numero || null,
        jefeHogar?.celular || null,
        jefeHogar?.email || null,
        idONull(jefeHogar?.tipoDocumento),
        idONull(jefeHogar?.sexo),
        idONull(jefeHogar?.nacionalidad),
        idONull(jefeHogar?.nivelEducativo),
        idONull(jefeHogar?.ocupacion),
        idONull(jefeHogar?.tipoTrabajo),
        idONull(jefeHogar?.estadoCivil),
        jefeHogar?.fechaNacimiento || null,
        id,
      ],
    );

    // Reemplaza otros integrantes (adultos y NNA) si vienen en el payload
    if (Array.isArray(integrantes)) {
      await client.query(
        `UPDATE persona SET estado = FALSE
         WHERE hogar_id = $1 AND rol_hogar_id IN (3, 4) AND estado = TRUE`,
        [id],
      );
      for (const integrante of integrantes) {
        if (!integrante?.nombre) continue;
        await insertarIntegranteHogar(client, id, integrante);
      }
    }

    await guardarVulnerabilidadesYPrioridades(client, id, datos);
    await client.query("COMMIT");
    return { id };
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
}

/** Borrado lógico (estado = false) */
async function eliminarHogar(id) {
  await pool.query(
    `UPDATE hogar SET estado = false, fecha_actualizacion = CURRENT_TIMESTAMP WHERE id = $1`,
    [id],
  );
  return true;
}

/** Expone el siguiente código para el formulario de alta */
async function obtenerSiguienteCodigoHogar() {
  const client = await pool.connect();
  try {
    return await siguienteCodigoHogar(client);
  } finally {
    client.release();
  }
}

module.exports = {
  crearHogar,
  actualizarHogar,
  eliminarHogar,
  obtenerSiguienteCodigoHogar,
};
