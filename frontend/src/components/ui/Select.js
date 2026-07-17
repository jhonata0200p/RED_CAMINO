// Crea un <select> reutilizable.
// "opciones" es un arreglo de objetos { value, label }.
// "dataAttrs" sirve para las filas dinámicas (integrantes, etc.), donde en vez de
// un "id" único se necesitan atributos data-campo / data-indice para saber a qué
// fila y campo pertenece el select (ver FamilyController.js -> renderizarIntegrantesAdultos).
export function Select({
    id = "",
    opciones = [],
    value = "",
    placeholder = "Seleccione...",
    disabled = false,
    dataAttrs = {}
}) {

    const atributosData = Object.entries(dataAttrs)
        .map(([clave, valorAtributo]) => `data-${clave}="${valorAtributo}"`)
        .join(" ");

    return `

        <select ${id ? `id="${id}"` : ""} ${atributosData} ${disabled ? "disabled" : ""}>

            <option value="" ${value === "" ? "selected" : ""}>${placeholder}</option>

            ${opciones.map(opcion => `
                <option value="${opcion.value}" ${value === opcion.value ? "selected" : ""}>${opcion.label}</option>
            `).join("")}

        </select>

    `;

}
