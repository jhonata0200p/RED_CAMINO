// Crea una etiqueta para mostrar estados
export function Badge(texto, tipo = "activo") {

    return `

        <span class="badge badge-${tipo}">

            ${texto}

        </span>

    `;

}