const dashboardModel = require("../models/dashboardModel");

const obtenerDashboard = async (req, res) => {
  try {
    const dashboard = await dashboardModel.obtenerDashboard();

    return res.status(200).json({
      success: true,
      data: dashboard,
    });
  } catch (error) {
    console.error("Error al obtener el dashboard:", error);

    return res.status(500).json({
      success: false,
      message: "No fue posible obtener el dashboard",
    });
  }
};

module.exports = {
  obtenerDashboard,
};