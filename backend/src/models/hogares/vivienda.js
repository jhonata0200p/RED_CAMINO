/**
 * vivienda.js — servicios públicos, factores, riesgos, vulnerabilidades y código.
 *
 * Helpers usados al crear/actualizar un hogar (dentro de una transacción).
 */
const { SERVICIOS_FORM, FACTORES_FORM, RIESGOS_FORM } = require("../../constants/catalogosHogar");

/** Guarda checkboxes de servicios / factores / riesgos de la vivienda */
async function guardarRelacionesVivienda(client, viviendaId, vivienda) {
  const servicios = vivienda?.servicios || {};
  for (const [clave, servicioId] of Object.entries(SERVICIOS_FORM)) {
    const tiene = servicios[clave] ? 1 : 2; // 1=SI, 2=NO
    await client.query(
      `INSERT INTO vivienda_servicio (vivienda_id, servicio_id, tiene_servicio_id)
       VALUES ($1, $2, $3)
       ON CONFLICT (vivienda_id, servicio_id)
       DO UPDATE SET tiene_servicio_id = EXCLUDED.tiene_servicio_id`,
      [viviendaId, servicioId, tiene],
    );
  }

  const factores = vivienda?.factores || {};
  for (const [clave, afectacionId] of Object.entries(FACTORES_FORM)) {
    const estado = factores[clave] ? 1 : 2;
    await client.query(
      `INSERT INTO vivienda_afectacion (vivienda_id, afectacion_id, estado_id)
       VALUES ($1, $2, $3)
       ON CONFLICT (vivienda_id, afectacion_id)
       DO UPDATE SET estado_id = EXCLUDED.estado_id`,
      [viviendaId, afectacionId, estado],
    );
  }

  const riesgos = vivienda?.riesgos || {};
  for (const [clave, riesgoId] of Object.entries(RIESGOS_FORM)) {
    const estado = riesgos[clave] ? 1 : 2;
    await client.query(
      `INSERT INTO vivienda_riesgo (vivienda_id, riesgo_id, estado_id)
       VALUES ($1, $2, $3)
       ON CONFLICT (vivienda_id, riesgo_id)
       DO UPDATE SET estado_id = EXCLUDED.estado_id`,
      [viviendaId, riesgoId, estado],
    );
  }
}

/** Guarda vulnerabilidades y prioridades del hogar (catálogos con SI/NO) */
async function guardarVulnerabilidadesYPrioridades(client, hogarId, datos) {
  const vulnerabilidades = datos?.vulnerabilidades || {};
  const prioridades = datos?.prioridades || {};

  const vulnCatalogo = await client.query(
    `SELECT id FROM cat_vulnerabilidad_hogar ORDER BY id`,
  );
  for (const row of vulnCatalogo.rows) {
    const vulnId = row.id;
    const marcado = Boolean(
      vulnerabilidades[String(vulnId)] ?? vulnerabilidades[vulnId],
    );
    const estado = marcado ? 1 : 2;
    await client.query(
      `INSERT INTO hogar_vulnerabilidad (hogar_id, vulnerabilidad_id, estado_id)
       VALUES ($1, $2, $3)
       ON CONFLICT (hogar_id, vulnerabilidad_id)
       DO UPDATE SET estado_id = EXCLUDED.estado_id`,
      [hogarId, vulnId, estado],
    );
  }

  const prioCatalogo = await client.query(
    `SELECT id FROM cat_prioridad_atencion ORDER BY id`,
  );
  for (const row of prioCatalogo.rows) {
    const prioId = row.id;
    const marcado = Boolean(
      prioridades[String(prioId)] ?? prioridades[prioId],
    );
    const estado = marcado ? 1 : 2;
    await client.query(
      `INSERT INTO hogar_prioridad (hogar_id, prioridad_id, estado_id)
       VALUES ($1, $2, $3)
       ON CONFLICT (hogar_id, prioridad_id)
       DO UPDATE SET estado_id = EXCLUDED.estado_id`,
      [hogarId, prioId, estado],
    );
  }
}

/** Siguiente código consecutivo: HOGAR-001, HOGAR-002, ... */
async function siguienteCodigoHogar(client) {
  const { rows } = await client.query(`
    SELECT COALESCE(MAX(
      SUBSTRING(codigo FROM '[0-9]+$')::INTEGER
    ), 0) + 1 AS siguiente
    FROM hogar
    WHERE codigo ~ '^HOGAR-[0-9]+$' AND estado = TRUE
  `);

  let n = rows[0].siguiente;
  for (let i = 0; i < 50; i++) {
    const codigo = `HOGAR-${String(n).padStart(3, "0")}`;
    const existe = await client.query(
      `SELECT 1 FROM hogar WHERE codigo = $1 LIMIT 1`,
      [codigo],
    );
    if (existe.rows.length === 0) return codigo;
    n += 1;
  }

  return `HOGAR-${Date.now().toString().slice(-6)}`;
}

module.exports = {
  guardarRelacionesVivienda,
  guardarVulnerabilidadesYPrioridades,
  siguienteCodigoHogar,
};
