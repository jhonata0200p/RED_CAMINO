const seguimientoModel = require("../models/seguimientoModel");

const MESES_VALIDOS = [
  "enero",
  "febrero",
  "marzo",
  "abril",
  "mayo",
  "junio",
  "julio",
  "agosto",
  "septiembre",
  "octubre",
  "noviembre",
  "diciembre",
];

const validarMes = (mes) => {
  return MESES_VALIDOS.includes(mes.toLowerCase());
};

const obtenerPlanilla = async (req, res) => {
  try {
    const ano = Number(req.query.ano);
    const mes = String(req.query.mes || "").trim();

    if (!Number.isInteger(ano) || ano < 2000 || ano > 2100) {
      return res.status(400).json({
        success: false,
        message: "El año no es válido",
      });
    }

    if (!mes || !validarMes(mes)) {
      return res.status(400).json({
        success: false,
        message: "El mes no es válido",
      });
    }

    const planilla = await seguimientoModel.obtenerPlanilla({
      ano,
      mes,
    });

    return res.status(200).json({
      success: true,
      data: {
        ano,
        mes,
        estudiantes: planilla,
      },
    });
  } catch (error) {
    console.error("Error al obtener la planilla:", error);

    return res.status(500).json({
      success: false,
      message: "No fue posible obtener la planilla",
    });
  }
};

const guardarSeguimientosLote = async (req, res) => {
  try {
    const {
      ano,
      mes,
      profesional_id: profesionalId,
      registros,
    } = req.body;

    const anoNumerico = Number(ano);
    const profesionalNumerico = Number(profesionalId);
    const mesLimpio = String(mes || "").trim();

    if (
      !Number.isInteger(anoNumerico) ||
      anoNumerico < 2000 ||
      anoNumerico > 2100
    ) {
      return res.status(400).json({
        success: false,
        message: "El año no es válido",
      });
    }

    if (!mesLimpio || !validarMes(mesLimpio)) {
      return res.status(400).json({
        success: false,
        message: "El mes no es válido",
      });
    }

    if (
      !Number.isInteger(profesionalNumerico) ||
      profesionalNumerico <= 0
    ) {
      return res.status(400).json({
        success: false,
        message: "El profesional no es válido",
      });
    }

    if (!Array.isArray(registros) || registros.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Debe enviar al menos un seguimiento",
      });
    }

    const idsNna = registros.map((registro) =>
      Number(registro.nna_id)
    );

    const idsValidos = idsNna.every(
      (id) => Number.isInteger(id) && id > 0
    );

    if (!idsValidos) {
      return res.status(400).json({
        success: false,
        message: "Uno o más IDs de NNA no son válidos",
      });
    }

    if (new Set(idsNna).size !== idsNna.length) {
      return res.status(400).json({
        success: false,
        message: "Hay NNA repetidos dentro de la solicitud",
      });
    }

    const creados =
      await seguimientoModel.guardarSeguimientosLote({
        ano: anoNumerico,
        mes: mesLimpio,
        profesionalId: profesionalNumerico,
        registros,
      });

    return res.status(201).json({
      success: true,
      message: "Seguimientos registrados correctamente",
      data: creados,
    });
  } catch (error) {
    console.error("Error al guardar seguimientos:", error);

    if (error.code === "SEGUIMIENTO_DUPLICADO") {
      return res.status(409).json({
        success: false,
        message: error.message,
      });
    }

    if (error.code === "23503") {
      return res.status(400).json({
        success: false,
        message:
          "El profesional, NNA o catálogo enviado no existe",
      });
    }

    return res.status(500).json({
      success: false,
      message: "No fue posible guardar los seguimientos",
    });
  }
};

module.exports = {
  obtenerPlanilla,
  guardarSeguimientosLote,
};