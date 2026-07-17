// Crea un checkbox con su etiqueta.
// Reutiliza la clase "checklist-item" que ya usan los checkbox de servicios,
// factores y riesgos en el paso de Vivienda, así que no necesita CSS nuevo.
export function Checkbox({ id = "", label = "", checked = false, disabled = false }) {

    return `

        <label class="checklist-item">
            <input type="checkbox" id="${id}" ${checked ? "checked" : ""} ${disabled ? "disabled" : ""}>
            ${label}
        </label>

    `;

}
