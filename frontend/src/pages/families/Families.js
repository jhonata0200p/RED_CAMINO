/**
 * Families.js — SOLO HTML de la vista de familias (sin lógica).
 *
 * La lógica vive en FamilyController.js → iniciarFamilias().
 * Este archivo define: buscador, grid de tarjetas, modal de registro por 4 pasos.
 */
// Importa el layout principal
import { DashboardLayout } from "../../components/layout/DashboardLayout.js";

// Importa el botón
import { Button } from "../../components/ui/Button.js";

// Importa el modal
import { Modal } from "../../components/ui/Modal.js";

// Importa los componentes de campo reutilizables
import { Input } from "../../components/ui/Input.js";

// Crea la vista de familias
export function Families() {

    return DashboardLayout(`

        <section class="page">

            <div class="page-header">

                <div>
                    <h1>Gestión de Familias</h1>
                    <p>Administra los hogares beneficiarios.</p>
                </div>

                ${Button({
                    texto: "Nueva familia",
                    icono: "fa-solid fa-plus",
                    id: "btnNuevaFamilia"
                })}

            </div>

            <div class="page-tools">
                <input
                    id="buscarFamilia"
                    class="search-input"
                    type="text"
                    placeholder="Buscar familia..."
                >
            </div>

            <div id="familiasGrid" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"></div>

        </section>

        ${Modal(
            "modalFamilia",
            `<h2 id="formTituloModal">Registrar familia</h2>`,
            formularioPorPasos()
        )}

        ${Modal(
            "modalVerFamilia",
            `<h2 id="verFamiliaTitulo">Detalle de la familia</h2>`,
            `<div id="verFamiliaContenido"></div>`
        )}

    `, "familias");

}

// =====================================================================================
// FORMULARIO POR PASOS (Paso 1 a 4)
// La navegación reutiliza las mismas clases que ya existían para las pestañas
// ("form-tab-btn" / "form-tab-panel"), así que no se necesita CSS nuevo.
// La lógica de mostrar/ocultar pasos y de guardar los datos vive en
// FamilyController.js (el equivalente, en JS plano, a un "estado" de React).
// =====================================================================================
function formularioPorPasos() {

    return `

        <form id="formFamilia">

            <div class="form-tabs" id="pasosFamilia">
                <button type="button" class="form-tab-btn active" data-paso="1">1. Control operativo</button>
                <button type="button" class="form-tab-btn" data-paso="2">2. Composición familiar</button>
                <button type="button" class="form-tab-btn" data-paso="3">3. Vivienda</button>
                <button type="button" class="form-tab-btn" data-paso="4">4. Integrantes</button>
            </div>

            <!-- ===================== PASO 1: CONTROL OPERATIVO ===================== -->
            <div class="form-tab-panel active" data-paso-panel="1">

                <div class="form-section-title">Control operativo</div>

                <div class="form-grid">

                    <div class="form-group" id="grupoCodigoHogar">
                        <label>Código de hogar</label>
                        ${Input({
                            id: "codigoHogar",
                            disabled: true
                        })}
                    </div>

                    <div class="form-group">
                        <label>Fecha de visita *</label>
                        ${Input({
                            id: "fechaVisita",
                            type: "date",
                            required: true
                        })}
                    </div>

                    <div class="form-group">
                        <label>Profesional</label>
                        <input type="text" id="profesional" readonly placeholder="Usuario logueado">
                    </div>

                    <div class="form-group">
                        <label>Departamento *</label>
                        <select id="departamento">
                            <option value="">Seleccione...</option>
                        </select>
                    </div>

                    <div class="form-group">
                        <label>Municipio *</label>
                        <select id="municipio">
                            <option value="">Seleccione...</option>
                        </select>
                    </div>

                    <div class="form-group">
                        <label>Sector *</label>
                        <select id="sector">
                            <option value="">Seleccione...</option>
                        </select>
                    </div>

                    <div class="form-group">
                        <label>Barrio *</label>
                        <input type="text" id="barrio" placeholder="Barrio">
                    </div>

                    <div class="form-group">
                        <label>Dirección *</label>
                        <input type="text" id="direccion" placeholder="Dirección">
                    </div>

                    <div class="form-group">
                        <label>Referencia (opcional)</label>
                        <input type="text" id="referencia" placeholder="Punto de referencia">
                    </div>

                </div>

            </div>

            <!-- ===================== PASO 2: COMPOSICIÓN FAMILIAR ===================== -->
            <div class="form-tab-panel" data-paso-panel="2">

                <div class="form-section-title">Jefe(a) de hogar</div>

                ${camposJefeOPareja("jh", { obligatorio: true })}

                <div id="parejaContainer" class="form-conditional" hidden>

                    <div class="form-section-title">Cónyuge del jefe(a) de hogar</div>

                    ${camposJefeOPareja("pareja", { conEmail: false, mostrarEstadoCivil: false })}

                </div>

            </div>

            <!-- ===================== PASO 3: VIVIENDA ===================== -->
            <div class="form-tab-panel" data-paso-panel="3">

                <div class="form-section-title">Datos de la vivienda</div>

                <div class="form-grid">

                    <div class="form-group">
                        <label>Tipo de vivienda *</label>
                        <select id="tipoVivienda">
                            <option value="">Seleccione...</option>
                        </select>
                    </div>

                    <div class="form-group">
                        <label>Tiempo en la vivienda</label>
                        <select id="tiempoVivienda">
                            <option value="">Seleccione...</option>
                        </select>
                    </div>

                    <div class="form-group">
                        <label>Material de paredes *</label>
                        <select id="materialVivienda">
                            <option value="">Seleccione...</option>
                        </select>
                    </div>

                    <div class="form-group">
                        <label>Situación / normalización *</label>
                        <select id="situacionVivienda">
                            <option value="">Seleccione...</option>
                        </select>
                    </div>

                    <div class="form-group">
                        <label>Cuartos totales *</label>
                        <input type="number" min="0" id="cuartosTotales">
                    </div>

                    <div class="form-group">
                        <label>Cuartos para dormir *</label>
                        <input type="number" min="0" id="cuartosDormir">
                    </div>

                    <div class="form-group">
                        <label>Condición general *</label>
                        <select id="condicionGeneral">
                            <option value="">Seleccione...</option>
                        </select>
                    </div>

                </div>

                <div class="form-section-title">Servicios públicos</div>
                <div class="checklist-grid">
                    <label class="checklist-item"><input type="checkbox" id="servEnergia"> Energía</label>
                    <label class="checklist-item"><input type="checkbox" id="servGas"> Gas</label>
                    <label class="checklist-item"><input type="checkbox" id="servAcueducto"> Acueducto</label>
                    <label class="checklist-item"><input type="checkbox" id="servAseo"> Aseo</label>
                    <label class="checklist-item"><input type="checkbox" id="servAlcantarillado"> Alcantarillado</label>
                    <label class="checklist-item"><input type="checkbox" id="servInternet"> Internet</label>
                </div>

                <div class="form-section-title">Factores que afectan al hogar</div>
                <div class="checklist-grid">
                    <label class="checklist-item"><input type="checkbox" id="factorHumedad"> Humedad</label>
                    <label class="checklist-item"><input type="checkbox" id="factorMalosOlores"> Malos olores</label>
                    <label class="checklist-item"><input type="checkbox" id="factorPolvo"> Polvo</label>
                    <label class="checklist-item"><input type="checkbox" id="factorInsectosRoedores"> Insectos/roedores</label>
                </div>

                <div class="form-section-title">Riesgos en la vivienda</div>
                <div class="checklist-grid">
                    <label class="checklist-item"><input type="checkbox" id="riesgoInundacion"> Inundación</label>
                    <label class="checklist-item"><input type="checkbox" id="riesgoDeslizamiento"> Deslizamiento</label>
                    <label class="checklist-item"><input type="checkbox" id="riesgoHundimiento"> Hundimiento</label>
                    <label class="checklist-item"><input type="checkbox" id="riesgoIncendio"> Incendio</label>
                </div>

                <div class="form-section-title">Vulnerabilidades del hogar</div>
                <div class="checklist-grid" id="vulnerabilidadesContainer"></div>

                <div class="form-section-title">Prioridades de atención</div>
                <div class="checklist-grid" id="prioridadesContainer"></div>

            </div>

            <!-- ===================== PASO 4: INTEGRANTES (adultos y NNA) ===================== -->
            <div class="form-tab-panel" data-paso-panel="4">

                <div class="form-section-title">Otros integrantes del hogar</div>
                <p class="form-hint" style="margin-bottom:12px;">
                    Puede agregar un adulto adicional y varios menores de edad.
                    Use fecha de nacimiento (la edad se calcula sola).
                </p>

                <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:12px;">
                    ${Button({
                        texto: "Agregar mayor",
                        icono: "fa-solid fa-plus",
                        id: "btnAgregarMayor",
                        clase: "btn-secondary"
                    })}
                    ${Button({
                        texto: "Agregar menor",
                        icono: "fa-solid fa-plus",
                        id: "btnAgregarMenor",
                        clase: "btn-secondary"
                    })}
                </div>

                <div id="integrantesAdultosContainer" style="margin-top: 12px;"></div>

                <div class="form-section-title" style="margin-top:24px;">Observaciones</div>
                <div class="form-group">
                    <textarea id="observaciones" rows="4" placeholder="Observaciones generales del hogar"></textarea>
                </div>

            </div>

            <!-- ===================== NAVEGACIÓN ENTRE PASOS ===================== -->
            <div class="modal-actions">

                <button type="button" class="btn-secondary" id="btnPasoAnterior" hidden>
                    Anterior
                </button>

                <button type="button" class="btn-primary" id="btnPasoSiguiente">
                    Siguiente
                </button>

                <button type="submit" class="btn-primary" id="btnGuardarFamilia" hidden>
                    Guardar
                </button>

            </div>

        </form>

    `;

}

// Genera los campos del jefe(a) de hogar o de la pareja.
// "prefijo" arma los id (jhNombre, jhSexo... / parejaNombre, parejaSexo...)
// para no repetir el HTML dos veces.
function camposJefeOPareja(prefijo, { conEmail = true, mostrarEstadoCivil = true, obligatorio = false } = {}) {
    const req = obligatorio ? " *" : "";

    return `

        <div class="form-grid">

            <div class="form-group">
                <label>Nombre${req}</label>
                <input type="text" id="${prefijo}Nombre" placeholder="Nombre completo">
            </div>

            <div class="form-group">
                <label>Tipo de documento${req}</label>
                <select id="${prefijo}TipoDocumento">
                    <option value="">Seleccione...</option>
                </select>
            </div>

            <div class="form-group">
                <label>Número de documento${req}</label>
                <input type="text" id="${prefijo}Numero" placeholder="Número de documento">
            </div>

            <div class="form-group">
                <label>Fecha de nacimiento${req}</label>
                <input type="date" id="${prefijo}FechaNacimiento">
            </div>

            <div class="form-group">
                <label>Sexo${req}</label>
                <select id="${prefijo}Sexo">
                    <option value="">Seleccione...</option>
                </select>
            </div>

            <div class="form-group">
                <label>Celular${req}</label>
                <input type="text" id="${prefijo}Celular" placeholder="Celular">
            </div>

            ${conEmail ? `
                <div class="form-group">
                    <label>Correo electrónico</label>
                    <input type="email" id="${prefijo}Email" placeholder="correo@ejemplo.com">
                </div>
            ` : ""}

            <div class="form-group">
                <label>Nacionalidad${req}</label>
                <select id="${prefijo}Nacionalidad">
                    <option value="">Seleccione...</option>
                </select>
            </div>

            <div class="form-group">
                <label>Nivel educativo${req}</label>
                <select id="${prefijo}NivelEducativo">
                    <option value="">Seleccione...</option>
                </select>
            </div>

            <div class="form-group">
                <label>Ocupación${req}</label>
                <select id="${prefijo}Ocupacion">
                    <option value="">Seleccione...</option>
                </select>
            </div>

            <div class="form-group">
                <label>Tipo de trabajo</label>
                <select id="${prefijo}TipoTrabajo">
                    <option value="">Seleccione...</option>
                </select>
            </div>

            ${mostrarEstadoCivil ? `
            <div class="form-group">
                <label>Estado civil${req}</label>
                <select id="${prefijo}EstadoCivil">
                    <option value="">Seleccione...</option>
                </select>
            </div>
            ` : ""}

        </div>

    `;

}
