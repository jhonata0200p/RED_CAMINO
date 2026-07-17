const pool = require("../config/db");

const obtenerHogares = async () => {
  const query = `
    SELECT *
    FROM hogar
    ORDER BY id DESC
  `;

  const resultado = await pool.query(query);

  return resultado.rows;
};

module.exports = {
  obtenerHogares,
};