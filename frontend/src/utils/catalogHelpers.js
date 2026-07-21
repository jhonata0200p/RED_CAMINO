/**
 * catalogHelpers.js — llenar selects y checklists desde catálogos PostgreSQL.
 */
export function llenarSelect(selectId, opciones, valorActual = "", placeholder = "Seleccione...") {
  const select = document.getElementById(selectId);
  if (!select || !Array.isArray(opciones)) return;

  const valor = String(valorActual ?? "");
  // Reemplaza todas las options: placeholder + una por cada item del catálogo
  select.innerHTML = `<option value="">${placeholder}</option>` +
    opciones
      .map(
        (item) =>
          `<option value="${item.id}" ${String(item.id) === valor ? "selected" : ""}>${item.nombre}</option>`,
      )
      .join("");
}

export function renderizarChecklist(contenedorId, prefijo, opciones, seleccionados = {}) {
  const contenedor = document.getElementById(contenedorId);
  if (!contenedor || !Array.isArray(opciones)) return;

  contenedor.innerHTML = opciones
    .map((item) => {
      const id = String(item.id);
      const checked = Boolean(seleccionados[id]); // { "1": true, "3": true }
      // id del checkbox: vuln_1, prio_2, etc.
      return `<label class="checklist-item"><input type="checkbox" id="${prefijo}_${id}" ${checked ? "checked" : ""}> ${item.nombre}</label>`;
    })
    .join("");
}
