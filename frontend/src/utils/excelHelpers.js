/**
 * excelHelpers.js — formateo y descarga de reportes Excel (usa SheetJS / XLSX global).
 */

export function fechaExcel(valor) {
  if (!valor) return "—";
  return String(valor).split("T")[0];
}

export function siNoExcel(valor) {
  return valor ? "Sí" : "No";
}

/** Convierte un objeto { nombre: true/false } en filas para una hoja del Excel. */
export function filasDesdeChecklist(codigo, objeto, nombreColumna) {
  return Object.entries(objeto || {}).map(([nombre, activo]) => ({
    "Código hogar": codigo || "—",
    [nombreColumna]: nombre,
    Estado: siNoExcel(activo),
  }));
}

/** Crea el archivo .xlsx con las hojas que tengan datos (o las marcadas como obligatorias). */
export function descargarExcel(nombreArchivo, hojas) {
  const libro = XLSX.utils.book_new();

  hojas.forEach(({ nombre, filas, obligatoria = false }) => {
    if (obligatoria || (filas && filas.length > 0)) {
      XLSX.utils.book_append_sheet(
        libro,
        XLSX.utils.json_to_sheet(filas || []),
        nombre,
      );
    }
  });

  XLSX.writeFile(libro, nombreArchivo);
}
