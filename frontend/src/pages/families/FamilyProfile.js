// Importa el layout principal.
import { DashboardLayout } from "../../components/layout/DashboardLayout.js";

// Crea la vista de perfil de familias.
// El contenido real se llena luego con iniciarPerfilFamilia() (FamilyController.js)
export function FamilyProfile() {

    return DashboardLayout(`

        <section class="page">

            <div class="page-header">

                <div>

                    <h1>Perfil de la familia</h1>

                    <p>Detalle del hogar beneficiario y su estado.</p>

                </div>

            </div>

            <div id="perfilFamiliaContenido">

                <p>Cargando información de la familia...</p>

            </div>

        </section>

    `, "familias");

}
