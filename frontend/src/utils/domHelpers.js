/**
 * domHelpers.js — leer y escribir campos del DOM sin repetir getElementById.
 */
export function getCampo(id) {
  // Busca un elemento por su atributo id (ej. id="jhNombre" en el HTML)
  return document.getElementById(id);
}

export function setValorCampo(id, valor) {
  const el = getCampo(id);       // obtiene el input/select
  if (el) el.value = valor;      // escribe el valor (útil al cargar datos para editar)
}

export function getValorCampo(id) {
  // Lee el texto del campo; trim() quita espacios al inicio/final
  return getCampo(id)?.value?.trim?.() ?? getCampo(id)?.value ?? "";
}

export function setCheckCampo(id, valor) {
  const el = getCampo(id);
  if (el) el.checked = Boolean(valor); // marca o desmarca un checkbox
}

export function getCheckCampo(id) {
  return Boolean(getCampo(id)?.checked); // true si el checkbox está marcado
}

export function agregarListener(id, evento, manejador) {
  // Registra un listener solo si el elemento existe (evita errores si falta el HTML)
  getCampo(id)?.addEventListener(evento, manejador);
}
