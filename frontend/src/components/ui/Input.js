// Crea un campo de texto reutilizable
// "props" es un objeto simple con los atributos del input: { id, type, placeholder, value }
export function Input({ id = "", type = "text", placeholder = "", value = "", disabled = false, required = false }) {

    return `

        <input
            id="${id}"
            type="${type}"
            placeholder="${placeholder}"
            value="${value}"
            ${disabled ? "disabled" : ""}
            ${required ? "required" : ""}
        >

    `;

}
