/**
 * renderHelpers.js — trozos de HTML reutilizables para perfiles y listas.
 */
export function renderIconoSiNo(valor) {
  // Devuelve HTML con icono verde (Sí) o rojo (No)
  return valor
    ? `<span class="text-green-600"><i class="fas fa-check-circle"></i> Sí</span>`
    : `<span class="text-red-500"><i class="fas fa-times-circle"></i> No</span>`;
}

export function listaHtml(items, mensajeVacio) {
  if (!items?.length) {
    return `<p class="text-sm text-gray-400">${mensajeVacio}</p>`;
  }
  // map genera un <li> por item y join los une en un solo string
  return `<ul class="list-disc pl-5 text-sm">${items.map((item) => `<li>${item}</li>`).join("")}</ul>`;
}

export function textoMostrado(valor, sufijo = "") {
  if (valor === undefined || valor === null || valor === "") return "No registrado";
  return `${valor}${sufijo}`;
}

export function campoPerfil(etiqueta, valor) {
  // Par etiqueta + valor para grids de perfil (NNA, familia)
  return `
    <div class="flex flex-col gap-1">
      <span class="text-xs uppercase tracking-wide text-gray-400">${etiqueta}</span>
      <span class="text-sm text-gray-800">${textoMostrado(valor)}</span>
    </div>
  `;
}

export function badgeEstadoHtml(estado) {
  const key = String(estado || "Inactivo").toLowerCase();
  // Elige color según Activo / Inactivo / otro
  const clases = key === "activo"
    ? "bg-green-100 text-green-700"
    : key === "inactivo"
      ? "bg-red-100 text-red-700"
      : "bg-gray-100 text-gray-700";
  return `<span class="text-xs font-medium px-2 py-1 rounded-full ${clases}">${estado || "Inactivo"}</span>`;
}
