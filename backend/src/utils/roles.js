/**
 * roles.js — mapeo entre nombres de rol en BD y claves del frontend.
 */

const ROL_A_ID = {
  administrador: 1,
  psicologo: 2,
  profesor: 3,
};

const ID_A_ROL = {
  1: "administrador",
  2: "psicologo",
  3: "profesor",
};

function rolFrontend(nombreBd) {
  const mapa = {
    Administrador: "administrador",
    Psicólogo: "psicologo",
    Profesor: "profesor",
  };
  return mapa[nombreBd] || String(nombreBd || "").toLowerCase();
}

module.exports = { ROL_A_ID, ID_A_ROL, rolFrontend };
