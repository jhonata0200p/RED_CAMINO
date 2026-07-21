/**
 * responseHelpers.js — respuestas JSON uniformes { success, data, message }.
 *
 * Uso en controllers:
 *   return responder.ok(res, lista);
 *   return responder.noEncontrado(res, "Hogar");
 *   return responder.errorServidor(res, "No se pudo guardar", error);
 */

function ok(res, data, status = 200) {
  return res.status(status).json({ success: true, data });
}

function okMensaje(res, message, data = null, status = 200) {
  const body = { success: true, message };
  if (data !== null) body.data = data;
  return res.status(status).json(body);
}

function creado(res, message, data) {
  return res.status(201).json({ success: true, message, data });
}

function error(res, status, message) {
  return res.status(status).json({ success: false, message });
}

function errorServidor(res, message, err) {
  if (err) console.error(message, err);
  return res.status(500).json({ success: false, message });
}

function idInvalido(res, entidad = "registro") {
  return error(res, 400, `El ID del ${entidad} no es válido`);
}

function noEncontrado(res, entidad = "Registro") {
  return error(res, 404, `${entidad} no encontrado`);
}

function badRequest(res, message) {
  return error(res, 400, message);
}

module.exports = {
  ok,
  okMensaje,
  creado,
  error,
  errorServidor,
  idInvalido,
  noEncontrado,
  badRequest,
};
