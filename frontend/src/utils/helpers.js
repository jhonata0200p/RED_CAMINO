<<<<<<< HEAD
/**
 * helpers.js — fechas, edad e ids consecutivos.
 */
=======
>>>>>>> 280df765e7f5535d76cdf41e3963a143aaf6b39a
export function formatName(name) {
  return name?.trim().toLowerCase() || '';
}

<<<<<<< HEAD
export function calcularEdad(fechaNacimiento) {
  if (!fechaNacimiento) return "";
  // T12:00:00 evita desfase por zona horaria al parsear YYYY-MM-DD
  const fecha = new Date(String(fechaNacimiento).split("T")[0] + "T12:00:00");
  if (Number.isNaN(fecha.getTime())) return "";
  const hoy = new Date();
  let edad = hoy.getFullYear() - fecha.getFullYear();
  const noHaCumplido =
    hoy.getMonth() < fecha.getMonth() ||
    (hoy.getMonth() === fecha.getMonth() && hoy.getDate() < fecha.getDate());
  if (noHaCumplido) edad--; // aún no cumplió años este año
  return edad >= 0 ? edad : "";
}

export function formatearFecha(fecha) {
  if (!fecha) return "";
  const texto = String(fecha).split("T")[0]; // quita hora ISO
  const partes = texto.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (partes) return `${partes[3]}/${partes[2]}/${partes[1]}`; // DD/MM/AAAA
  try {
    return new Date(fecha).toLocaleDateString("es-CO");
  } catch {
    return texto;
  }
}

export function generarId(lista, prefijo) {
  if (!lista || lista.length === 0) {
    return `${prefijo}-001`;
  }

  const numeros = lista.map(item => {
    const partes = String(item.id).split("-");
    const numero = Number(partes[1]);
    return Number.isNaN(numero) ? 0 : numero;
  });

  const maximo = Math.max(...numeros);
  const siguiente = String(maximo + 1).padStart(3, "0");
  return `${prefijo}-${siguiente}`;
=======
// Genera el siguiente id consecutivo con formato legible (ej: FAM-001, NNA-002).
// Se usa porque json-server, si no le mandamos un id, genera uno aleatorio con letras.
// "lista" es el arreglo de registros actuales y "prefijo" es el texto que va antes del número (FAM, NNA, TRA, SEG).
export function generarId(lista, prefijo) {

    // Si todavía no hay registros, empieza en 001
    if (!lista || lista.length === 0) {

        return `${prefijo}-001`;

    }

    // De cada id existente (ej: "FAM-003") extrae solo el número (3)
    const numeros = lista.map(item => {

        const partes = String(item.id).split("-");

        const numero = Number(partes[1]);

        return isNaN(numero) ? 0 : numero;

    });

    // Busca el número más alto usado hasta ahora y le suma 1
    const siguiente = Math.max(...numeros) + 1;

    // Rellena con ceros a la izquierda para que siempre tenga 3 dígitos (001, 002, 010, 100...)
    const numeroConCeros = String(siguiente).padStart(3, "0");

    return `${prefijo}-${numeroConCeros}`;

>>>>>>> 280df765e7f5535d76cdf41e3963a143aaf6b39a
}
