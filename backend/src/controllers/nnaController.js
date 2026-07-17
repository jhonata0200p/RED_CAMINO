const nnaModel = require("../models/nnaModel");

const listarNna = async (req, res) => {
  try {
    const nna = await nnaModel.obtenerNna();

    return res.status(200).json({
      success: true,
      data: nna,
    });
  } catch (error) {
    console.error("Error al obtener los NNA:", error);

    return res.status(500).json({
      success: false,
      message: "No fue posible obtener los NNA",
    });
  }
};
const obtenerNnaPorId = async (req, res) => {
    try {
      const id = Number(req.params.id);
  
      if (!Number.isInteger(id) || id <= 0) {
        return res.status(400).json({
          success: false,
          message: "El ID del NNA no es válido",
        });
      }
  
      const nna = await nnaModel.obtenerNnaPorId(id);
  
      if (!nna) {
        return res.status(404).json({
          success: false,
          message: "NNA no encontrado",
        });
      }
  
      return res.status(200).json({
        success: true,
        data: nna,
      });
    } catch (error) {
      console.error("Error al obtener el NNA:", error);
  
      return res.status(500).json({
        success: false,
        message: "No fue posible obtener el NNA",
      });
    }
  };
const listarSeguimientosPorNna = async (req, res) => {
try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({
        success: false,
        message: "El ID del NNA no es válido",
    });
    }

    const nna = await nnaModel.obtenerNnaPorId(id);

    if (!nna) {
    return res.status(404).json({
        success: false,
        message: "NNA no encontrado",
    });
    }

    const seguimientos =
    await nnaModel.obtenerSeguimientosPorNna(id);

    return res.status(200).json({
    success: true,
    data: seguimientos,
    });
} catch (error) {
    console.error(
    "Error al obtener los seguimientos del NNA:",
    error
    );

    return res.status(500).json({
    success: false,
    message: "No fue posible obtener los seguimientos del NNA",
    });
}
};

module.exports = {
  listarNna,
  obtenerNnaPorId,
  listarSeguimientosPorNna,

};