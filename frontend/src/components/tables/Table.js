// Crea una tabla reutilizable
export function Table({

    headers,

    bodyId

}){

    return `

        <div class="table-container">

            <table class="table">

                <thead>

                    <tr>

                        ${headers.map(header => `

                            <th>

                                ${header}

                            </th>

                        `).join("")}

                    </tr>

                </thead>

                <tbody id="${bodyId}">

                </tbody>

            </table>

        </div>

    `;

}