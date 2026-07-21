<<<<<<< HEAD
/**
 * FamilyCard.js — genera el HTML de una tarjeta en el listado de familias.
 *
 * Recibe puedeEditar/puedeEliminar según el rol (FamilyController.renderizarTarjetas).
 * Los botones usan data-action="ver|editar|eliminar" para delegación de clics.
 */
export function FamilyCard(familia, { puedeEditar, puedeEliminar }) {
  // ✅ Extraer datos con los nombres correctos
  const {
    id,
    codigo,
    jefe_hogar,
    telefono,
    barrio,
    direccion,
    personas_menores,
    nombres_menores,
    estado = true,
  } = familia;

  const menores = personas_menores || 0;
  const estadoTexto = estado === false || estado === "Inactivo" ? "Inactivo" : "Activo";
  const direccionMostrar = direccion || barrio || "Sin dirección";

  return `
    <article class="bg-white rounded-xl shadow-sm border border-gray-200 p-4 flex flex-col gap-2 hover:shadow-md transition-shadow">
      <div class="flex items-center justify-between">
        <span class="text-xs font-semibold text-white bg-indigo-600 rounded-full px-2 py-1">
          <i class="fas fa-home mr-1"></i>${codigo || "Sin código"}
        </span>
        <span class="text-xs font-medium px-2 py-1 rounded-full ${estadoTexto === "Activo" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"}">
          <i class="fas ${estadoTexto === "Activo" ? "fa-check-circle" : "fa-circle"} mr-1"></i>${estadoTexto}
        </span>
      </div>

      <h3 class="text-base font-semibold text-gray-800 truncate">
        <i class="fas fa-user text-gray-400 mr-1"></i>${jefe_hogar || "Sin nombre"}
      </h3>

      <p class="text-sm text-gray-500 truncate">
        <i class="fas fa-location-dot mr-1"></i>${direccionMostrar}
      </p>

      <p class="text-xs text-gray-400">
        <i class="fas fa-phone mr-1"></i>${telefono || "Sin teléfono"} · 
        <i class="fas fa-child mr-1"></i>${menores} ${menores === 1 ? "menor" : "menores"}
      </p>
      ${
        nombres_menores
          ? `<p class="text-xs text-gray-500 truncate" title="${nombres_menores}"><i class="fas fa-users mr-1"></i>${nombres_menores}</p>`
          : ""
      }

      <div class="flex flex-wrap gap-2 mt-2 pt-2 border-t border-gray-100">
        <button class="text-sm bg-indigo-600 text-white rounded-lg px-3 py-1.5 hover:bg-indigo-700" data-action="ver" data-tipo="familia" data-id="${id}">
          <i class="fas fa-eye mr-1"></i>Ver Detalle
        </button>
        ${
          puedeEditar
            ? `
          <button class="icon-btn" title="Editar" data-action="editar" data-tipo="familia" data-id="${id}">
            <i class="fas fa-pen"></i>
          </button>
        `
            : ""
        }
        ${
          puedeEliminar
            ? `
          <button class="icon-btn icon-btn-danger" title="Eliminar" data-action="eliminar" data-tipo="familia" data-id="${id}">
            <i class="fas fa-trash"></i>
          </button>
        `
            : ""
        }
      </div>
    </article>
  `;
=======
// Tarjeta de familia (Tailwind): código de hogar, jefe de hogar, dirección y acciones.
export function FamilyCard(familia, { puedeEditar, puedeEliminar }) {

    const { id, responsable, documento, barrio, estado, codigoHogar, paso1 } = familia;
    const direccion = paso1?.direccion || barrio || "Sin dirección";

    return `
        <article class="bg-white rounded-xl shadow-sm border border-gray-200 p-4 flex flex-col gap-2 hover:shadow-md transition-shadow">
            <div class="flex items-center justify-between">
                <span class="text-xs font-semibold text-white bg-indigo-600 rounded-full px-2 py-1">${codigoHogar || "Sin código"}</span>
                <span class="text-xs font-medium px-2 py-1 rounded-full ${estado === "Activo" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"}">${estado || "-"}</span>
            </div>
            <h3 class="text-base font-semibold text-gray-800 truncate">${responsable || "Sin nombre"}</h3>
            <p class="text-sm text-gray-500 truncate"><i class="fa-solid fa-location-dot mr-1"></i>${direccion}</p>
            <p class="text-xs text-gray-400">Doc. ${documento || "-"}</p>
            <div class="flex flex-wrap gap-2 mt-2 pt-2 border-t border-gray-100">
                <button class="text-sm bg-indigo-600 text-white rounded-lg px-3 py-1.5 hover:bg-indigo-700" data-action="ver" data-tipo="familia" data-id="${id}">Ver Detalle</button>
                ${puedeEditar ? `<button class="icon-btn" title="Editar" data-action="editar" data-tipo="familia" data-id="${id}"><i class="fa-solid fa-pen"></i></button>` : ""}
                ${puedeEliminar ? `<button class="icon-btn icon-btn-danger" title="Eliminar" data-action="eliminar" data-tipo="familia" data-id="${id}"><i class="fa-solid fa-trash"></i></button>` : ""}
            </div>
        </article>
    `;

>>>>>>> 280df765e7f5535d76cdf41e3963a143aaf6b39a
}
