/**
 * formHelpers.js — escribir en objetos anidados y validar reglas simples.
 */
export function escribirValorAnidado(objeto, ruta, valor) {
  // "jefeHogar.nombre" → ["jefeHogar", "nombre"]
  const llaves = ruta.split(".");
  const ultimaLlave = llaves.pop(); // "nombre"
  // reduce recorre formData.jefeHogar hasta llegar al objeto contenedor
  const contenedor = llaves.reduce((actual, llave) => actual[llave], objeto);
  contenedor[ultimaLlave] = valor; // formData.jefeHogar.nombre = valor
}

export function validarReglas(reglas, mostrarAdvertencia) {
  // reglas = [[condiciónQueFalla, mensaje], ...]
  for (const [falla, mensaje] of reglas) {
    if (falla) {                        // si la condición es verdadera, hay error
      mostrarAdvertencia(mensaje);      // muestra toast al usuario
      return false;                     // detiene la validación
    }
  }
  return true; // todas las reglas pasaron
}
