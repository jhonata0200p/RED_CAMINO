// Crea una tabla reutilizable con encabezados y cuerpo configurable.
export function DataTable({ headers, bodyId, emptyText = "No hay registros disponibles." }) {

    return `

        <div class="table-container">

            <table class="table">

                <thead>

                    <tr>

                        ${headers.map(header => `<th>${header}</th>`).join("")}

                    </tr>

                </thead>

                <tbody id="${bodyId}">

                    <tr>

                        <td colspan="${headers.length}" class="table-empty">

                            ${emptyText}

                        </td>

                    </tr>

                </tbody>

            </table>

        </div>

    `;

}
