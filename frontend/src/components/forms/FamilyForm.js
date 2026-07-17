// Formulario simple con los datos básicos de una familia.
// Nota: el formulario real de familias vive en pages/families/Families.js;
// este componente queda disponible como bloque reutilizable si se necesita en otra parte.
export function FamilyForm() {

    return `

        <form class="form-grid">

            <div class="form-group">
                <label>Responsable</label>
                <input type="text" placeholder="Ingrese el nombre del responsable">
            </div>

            <div class="form-group">
                <label>Documento</label>
                <input type="text" placeholder="Ingrese el documento">
            </div>

            <div class="form-group">
                <label>Barrio</label>
                <input type="text" placeholder="Ingrese el barrio">
            </div>

        </form>

    `;

}
