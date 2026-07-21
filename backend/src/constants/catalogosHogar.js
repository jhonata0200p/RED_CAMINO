/**
 * catalogosHogar.js — mapeo clave del formulario → id en PostgreSQL (hogares).
 */

const SERVICIOS_FORM = {
  energia: 1,
  gas: 2,
  acueducto: 3,
  alcantarillado: 4,
  aseo: 5,
  internet: 6,
};

const FACTORES_FORM = {
  humedad: 1,
  malosOlores: 2,
  polvo: 3,
  insectosRoedores: 4,
};

const RIESGOS_FORM = {
  inundacion: 1,
  deslizamiento: 2,
  hundimiento: 3,
  incendio: 4,
};

module.exports = { SERVICIOS_FORM, FACTORES_FORM, RIESGOS_FORM };
