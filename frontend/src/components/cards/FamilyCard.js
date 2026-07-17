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

}
