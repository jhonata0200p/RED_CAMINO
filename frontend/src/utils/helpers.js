export function formatName(name) {
  return name?.trim().toLowerCase() || '';
}

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

}
