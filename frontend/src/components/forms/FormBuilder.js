// Crea un formulario reutilizable con campos simples.
export function FormBuilder(fields) {

    return `

        <form class="form-grid">

            ${fields.map(field => `

                <div class="form-group">

                    <label for="${field.id}">${field.label}</label>

                    ${field.type === "select" ? `

                        <select id="${field.id}" name="${field.name}">

                            ${field.options.map(option => `<option value="${option.value}">${option.label}</option>`).join("")}

                        </select>

                    ` : `

                        <input
                            id="${field.id}"
                            name="${field.name}"
                            type="${field.type || "text"}"
                            placeholder="${field.placeholder || ""}"
                            value="${field.value || ""}"
                        >

                    `}

                </div>

            `).join("")}

        </form>

    `;

}
