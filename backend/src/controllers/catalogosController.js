const catalogosModel = require("../models/catalogosModel");

const listarCatalogos = async (req, res) => {
  try {
    const catalogos =
      await catalogosModel.obtenerTodosLosCatalogos();

    return res.status(200).json({
      success: true,
      data: catalogos,
    });
  } catch (error) {
    console.error("Error al obtener los catálogos:", error);

    return res.status(500).json({
      success: false,
      message: "No fue posible obtener los catálogos",
    });
  }
};

const obtenerCatalogoPorNombre = async (req, res) => {
  try {
    const nombre = String(req.params.nombre || "").trim();

    const catalogo =
      await catalogosModel.obtenerCatalogo(nombre);

    if (catalogo === null) {
      return res.status(404).json({
        success: false,
        message: "Catálogo no encontrado",
      });
    }

    return res.status(200).json({
      success: true,
      data: catalogo,
    });
  } catch (error) {
    console.error("Error al obtener el catálogo:", error);

    return res.status(500).json({
      success: false,
      message: "No fue posible obtener el catálogo",
    });
  }
};

module.exports = {
  listarCatalogos,
  obtenerCatalogoPorNombre,
};