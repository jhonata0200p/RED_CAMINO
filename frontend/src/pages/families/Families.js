// Importa el layout principal
import { DashboardLayout } from "../../components/layout/DashboardLayout.js";

// Importa el botón
import { Button } from "../../components/ui/Button.js";

// Importa el modal
import { Modal } from "../../components/ui/Modal.js";

// Importa los componentes de campo reutilizables
import { Input } from "../../components/ui/Input.js";
import { Checkbox } from "../../components/ui/Checkbox.js";

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

                <!-- Marca si el registro de esta familia queda pendiente de validación/revisión -->
                ${Checkbox({
                    id: "pendiente",
                    label: "Registro pendiente de validación/revisión"
                })}

                <div class="form-grid">

                    <div class="form-group">
                        <label>Código de hogar</label>
                        ${Input({
                            id: "codigoHogar",
                            placeholder: "Se genera automáticamente",
                            disabled: true
                        })}
                    </div>

                    <div class="form-group">
                        <label>Fecha de visita</label>
                        ${Input({
                            id: "fechaVisita",
                            type: "date",
                            required: true
                        })}
                    </div>

                    <div class="form-group">
                        <label>Profesional</label>
                        <input type="text" id="profesional" placeholder="Nombre del profesional">
                    </div>

                    <div class="form-group">
                        <label>Departamento</label>
                        <select id="departamento" disabled>
                            <option value="Atlántico" selected>Atlántico</option>
                        </select>
                    </div>

                    <div class="form-group">
                        <label>Municipio</label>
                        <select id="municipio">
                            <option value="">Seleccione...</option>
                            <option value="Barranquilla">Barranquilla</option>
                            <option value="Soledad">Soledad</option>
                            <option value="Malambo">Malambo</option>
                        </select>
                    </div>

                    <div class="form-group">
                        <label>Sector (opcional)</label>
                        <input type="text" id="sector" placeholder="Sector">
                    </div>

                    <div class="form-group">
                        <label>Barrio</label>
                        <input type="text" id="barrio" placeholder="Barrio">
                    </div>

                    <div class="form-group">
                        <label>Dirección</label>
                        <input type="text" id="direccion" placeholder="Dirección">
                    </div>

                    <div class="form-group">
                        <label>Referencia (opcional)</label>
                        <input type="text" id="referencia" placeholder="Punto de referencia">
                    </div>

                    <div class="form-group">
                        <label>Condición (opcional)</label>
                        <input type="text" id="condicion" placeholder="Condición de la zona/vivienda">
                    </div>

                </div>

            </div>

            <!-- ===================== PASO 2: COMPOSICIÓN FAMILIAR ===================== -->
            <div class="form-tab-panel" data-paso-panel="2">

                <div class="form-section-title">Jefe(a) de hogar</div>

                ${camposJefeOPareja("jh")}

                <label class="checklist-item" style="margin: 10px 0;">
                    <input type="checkbox" id="tienePareja">
                    ¿Tiene pareja?
                </label>

                <div id="parejaContainer" class="form-conditional" hidden>

                    <div class="form-section-title">Pareja del jefe(a) de hogar</div>

                    ${camposJefeOPareja("pareja", { conEmail: false })}

                </div>

            </div>

            <!-- ===================== PASO 3: VIVIENDA ===================== -->
            <div class="form-tab-panel" data-paso-panel="3">

                <div class="form-section-title">Datos de la vivienda</div>

                <div class="form-grid">

                    <div class="form-group">
                        <label>Tiempo en la vivienda</label>
                        <select id="tiempoVivienda">
                            <option value="">Seleccione...</option>
                            <option value="0 a 6 meses">0 a 6 meses</option>
                            <option value="7 a 12 meses">7 a 12 meses</option>
                            <option value="1 a 2 años">1 a 2 años</option>
                            <option value="2 a 3 años">2 a 3 años</option>
                            <option value="3 años o más">3 años o más</option>
                        </select>
                    </div>

                    <div class="form-group">
                        <label>Tipo de vivienda</label>
                        <select id="tipoVivienda">
                            <option value="">Seleccione...</option>
                            <option value="Casa">Casa</option>
                            <option value="Apartamento">Apartamento</option>
                            <option value="Pieza/cuarto">Pieza/cuarto</option>
                            <option value="Otro">Otro</option>
                        </select>
                    </div>

                    <div class="form-group">
                        <label>Material</label>
                        <select id="materialVivienda">
                            <option value="">Seleccione...</option>
                            <option value="Block/ladrillo">Block/ladrillo</option>
                            <option value="Madera/tabla">Madera/tabla</option>
                            <option value="Cartón/plástico/zinc">Cartón/plástico/zinc</option>
                            <option value="Otro">Otro</option>
                        </select>
                    </div>

                    <div class="form-group">
                        <label>Situación</label>
                        <select id="situacionVivienda">
                            <option value="">Seleccione...</option>
                            <option value="Propia">Propia</option>
                            <option value="Arrendada">Arrendada</option>
                            <option value="Familiar">Familiar</option>
                            <option value="En posesión">En posesión</option>
                            <option value="Usufructo">Usufructo</option>
                            <option value="Invasión terreno">Invasión terreno</option>
                        </select>
                    </div>

                    <div class="form-group">
                        <label>Cuartos totales</label>
                        <input type="number" min="0" id="cuartosTotales">
                    </div>

                    <div class="form-group">
                        <label>Cuartos para dormir</label>
                        <input type="number" min="0" id="cuartosDormir">
                    </div>

                    <div class="form-group">
                        <label>Condición general</label>
                        <select id="condicionGeneral">
                            <option value="">Seleccione...</option>
                            <option value="Buena">Buena</option>
                            <option value="Regular">Regular</option>
                            <option value="Mala">Mala</option>
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

            </div>

            <!-- ===================== PASO 4: INTEGRANTES ADULTOS ===================== -->
            <div class="form-tab-panel" data-paso-panel="4">

                <div class="form-section-title">Integrantes de 18 años o más</div>

                ${Button({
                    texto: "Agregar integrante",
                    icono: "fa-solid fa-plus",
                    id: "btnAgregarIntegrante",
                    clase: "btn-secondary"
                })}

                <div id="integrantesAdultosContainer" style="margin-top: 12px;"></div>

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
function camposJefeOPareja(prefijo, { conEmail = true } = {}) {

    return `

        <div class="form-grid">

            <div class="form-group">
                <label>Nombre</label>
                <input type="text" id="${prefijo}Nombre" placeholder="Nombre completo">
            </div>

            <div class="form-group">
                <label>Tipo de documento</label>
                <select id="${prefijo}TipoDocumento">
                    <option value="">Seleccione...</option>
                    <option value="Cédula de Ciudadanía">Cédula de Ciudadanía</option>
                    <option value="Permiso Por Protección Temporal">Permiso Por Protección Temporal</option>
                    <option value="Cédula de identidad venezolana">Cédula de identidad venezolana</option>
                    <option value="Pasaporte">Pasaporte</option>
                </select>
            </div>

            <div class="form-group">
                <label>Número de documento</label>
                <input type="text" id="${prefijo}Numero" placeholder="Número de documento">
            </div>

            <div class="form-group">
                <label>Fecha de nacimiento</label>
                <input type="date" id="${prefijo}FechaNacimiento">
            </div>

            <div class="form-group">
                <label>Sexo</label>
                <select id="${prefijo}Sexo">
                    <option value="">Seleccione...</option>
                    <option value="Masculino">Masculino</option>
                    <option value="Femenino">Femenino</option>
                </select>
            </div>

            <div class="form-group">
                <label>Celular</label>
                <input type="text" id="${prefijo}Celular" placeholder="Celular">
            </div>

            ${conEmail ? `
                <div class="form-group">
                    <label>Correo electrónico</label>
                    <input type="email" id="${prefijo}Email" placeholder="correo@ejemplo.com">
                </div>
            ` : ""}

            <div class="form-group">
                <label>Nacionalidad</label>
                <select id="${prefijo}Nacionalidad">
                    <option value="">Seleccione...</option>
                    <option value="Colombiana">Colombiana</option>
                    <option value="Venezolana">Venezolana</option>
                    <option value="Colombo-venezolana">Colombo-venezolana</option>
                    <option value="Otra">Otra</option>
                </select>
            </div>

            <div class="form-group">
                <label>Nivel educativo</label>
                <select id="${prefijo}NivelEducativo">
                    <option value="">Seleccione...</option>
                    <option value="Ninguno">Ninguno</option>
                    <option value="Primaria">Primaria</option>
                    <option value="Secundaria">Secundaria</option>
                    <option value="Técnico/Tecnólogo/Universitario">Técnico/Tecnólogo/Universitario</option>
                    <option value="Otro">Otro</option>
                </select>
            </div>

            <div class="form-group">
                <label>Ocupación</label>
                <select id="${prefijo}Ocupacion">
                    <option value="">Seleccione...</option>
                    <option value="Trabajador Informal">Trabajador Informal</option>
                    <option value="Trabajador Independiente">Trabajador Independiente</option>
                    <option value="Empleado">Empleado</option>
                    <option value="Buscando trabajo">Buscando trabajo</option>
                    <option value="Oficios del hogar">Oficios del hogar</option>
                    <option value="Otra">Otra</option>
                </select>
            </div>

            <div class="form-group">
                <label>Tipo de trabajo</label>
                <select id="${prefijo}TipoTrabajo">
                    <option value="">Seleccione...</option>
                    <option value="Trabajo permanente">Trabajo permanente</option>
                    <option value="Trabajo ocasional">Trabajo ocasional</option>
                </select>
            </div>

            <div class="form-group">
                <label>Estado civil</label>
                <select id="${prefijo}EstadoCivil">
                    <option value="">Seleccione...</option>
                    <option value="Casado/a">Casado/a</option>
                    <option value="Unión libre">Unión libre</option>
                    <option value="Soltero(a)">Soltero(a)</option>
                    <option value="Viudo(a)">Viudo(a)</option>
                    <option value="Separado(a)">Separado(a)</option>
                </select>
            </div>

        </div>

    `;

}
