/**
 * mesHelpers.js — convierte mes entre número, nombre y texto para seguimiento.
 */

const MESES = {
  enero: 1,
  febrero: 2,
  marzo: 3,
  abril: 4,
  mayo: 5,
  junio: 6,
  julio: 7,
  agosto: 8,
  septiembre: 9,
  octubre: 10,
  noviembre: 11,
  diciembre: 12,
};

const NOMBRES_MES = [
  "",
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];

/** Acepta 1-12 o "enero", "febrero", etc. → número 1-12 o null */
function mesANumero(mes) {
  if (mes == null) return null;
  const n = Number(mes);
  if (!Number.isNaN(n) && n >= 1 && n <= 12) return n;
  return MESES[String(mes).toLowerCase()] || null;
}

/** Número o nombre de mes → "Enero", "Febrero", etc. */
function mesATexto(mes) {
  const n = mesANumero(mes);
  if (n) return NOMBRES_MES[n];
  return String(mes || "");
}

module.exports = { mesANumero, mesATexto };
