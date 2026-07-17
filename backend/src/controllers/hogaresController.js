const hogaresModel = require("../models/hogaresModel");

const listarHogares = async (req, res) => {
  try {
    const hogares = await hogaresModel.obtenerHogares();

    res.status(200).json({
      success: true,
      data: hogares,
    });
  } catch (error) {
    console.error("Error al obtener los hogares:", error);

    res.status(500).json({
      success: false,
      message: "No fue posible obtener los hogares",
    });
  }
};

module.exports = {
  listarHogares,
};