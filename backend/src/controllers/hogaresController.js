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
const obtenerHogarPorId = async (req, res) => {
    try {
      const id = Number(req.params.id);
  
      if (!Number.isInteger(id) || id <= 0) {
        return res.status(400).json({
          success: false,
          message: "El ID del hogar no es válido",
        });
      }
  
      const hogar = await hogaresModel.obtenerHogarPorId(id);
  
      if (!hogar) {
        return res.status(404).json({
          success: false,
          message: "Hogar no encontrado",
        });
      }
  
      return res.status(200).json({
        success: true,
        data: hogar,
      });
    } catch (error) {
      console.error("Error al obtener el hogar:", error);
  
      return res.status(500).json({
        success: false,
        message: "No fue posible obtener el hogar",
      });
    }
  };
  const listarIntegrantesPorHogar = async (req, res) => {
    try {
      const hogarId = Number(req.params.id);
  
      if (!Number.isInteger(hogarId) || hogarId <= 0) {
        return res.status(400).json({
          success: false,
          message: "El ID del hogar no es válido",
        });
      }
  
      const hogar = await hogaresModel.obtenerHogarPorId(hogarId);
  
      if (!hogar) {
        return res.status(404).json({
          success: false,
          message: "Hogar no encontrado",
        });
      }
  
      const integrantes =
        await hogaresModel.obtenerIntegrantesPorHogar(hogarId);
  
      return res.status(200).json({
        success: true,
        data: integrantes,
      });
    } catch (error) {
      console.error("Error al obtener los integrantes del hogar:", error);
  
      return res.status(500).json({
        success: false,
        message: "No fue posible obtener los integrantes del hogar",
      });
    }
  };

module.exports = {
  listarHogares,
  obtenerHogarPorId,
  listarIntegrantesPorHogar
};  