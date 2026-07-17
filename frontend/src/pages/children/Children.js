import { DashboardLayout } from "../../components/layout/DashboardLayout.js";
import { Button } from "../../components/ui/Button.js";
import { Modal } from "../../components/ui/Modal.js";

export function Children() {
    return DashboardLayout(`
        <section class="page">
            <div class="page-header">
                <div>
                    <h1>Gestión de NNA</h1>
                    <p>Consulta y administra los niños, niñas y adolescentes del programa.</p>
                </div>
                ${Button({ texto: "Nuevo registro", icono: "fa-solid fa-plus", id: "btnNuevoNna" })}
            </div>

            <div class="page-tools">
                <input id="buscarNna" class="search-input" type="text" placeholder="Buscar NNA...">
            </div>

            <div id="nna-container" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"></div>
        </section>

        ${Modal("modalNna", `<h2 id="formTituloModalNna">Registrar NNA</h2>`, formularioNna())}
    `, "nna");
}

function formularioNna() {
    return `
        <form id="formNna">
            <div class="form-section-title">Datos básicos</div>
            <div class="form-grid">
                <div class="form-group">
                    <label>Código NNA</label>
                    <input type="text" id="codigoNna" placeholder="Se genera al guardar" disabled>
                </div>
                <div class="form-group">
                    <label>Hogar al que pertenece</label>
                    <select id="familiaNna"><option value="">Seleccione un hogar...</option></select>
                </div>
                <div class="form-group">
                    <label>Nombre completo</label>
                    <input type="text" id="nombreNna" placeholder="Nombre completo del NNA">
                </div>
                <div class="form-group">
                    <label>Sexo</label>
                    <select id="sexoNna">
                        <option value="">Seleccione...</option>
                        <option value="Masculino">Masculino</option>
                        <option value="Femenino">Femenino</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>Nacionalidad</label>
                    <select id="nacionalidadNna">
                        <option value="">Seleccione...</option>
                        <option value="Colombiana">Colombiana</option>
                        <option value="Venezolana">Venezolana</option>
                        <option value="Colombo-venezolana">Colombo-venezolana</option>
                        <option value="Otra">Otra</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>Tipo de documento</label>
                    <select id="tipoDocumentoNna">
                        <option value="">Seleccione...</option>
                        <option value="Registro Civil">Registro Civil</option>
                        <option value="Tarjeta de Identidad">Tarjeta de Identidad</option>
                        <option value="Cédula de Ciudadanía">Cédula de Ciudadanía</option>
                        <option value="Permiso Por Protección Temporal">Permiso Por Protección Temporal</option>
                        <option value="Sin documento">Sin documento</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>Número de documento</label>
                    <input type="text" id="documentoNna" placeholder="Número de documento">
                </div>
                <div class="form-group">
                    <label>Fecha de nacimiento</label>
                    <input type="date" id="fechaNacimientoNna">
                </div>
                <div class="form-group">
                    <label>Edad</label>
                    <input type="number" id="edadNna" placeholder="Se calcula automáticamente" readonly>
                </div>
            </div>

            <div class="form-section-title">Datos académicos</div>
            <div class="form-grid">
                <div class="form-group">
                    <label>Estado académico inicial FSCM</label>
                    <select id="estadoInicialFscm">
                        <option value="">Seleccione...</option>
                        <option value="Escolarizado">Escolarizado</option>
                        <option value="Desescolarizado">Desescolarizado</option>
                        <option value="Extraedad">Extraedad</option>
                        <option value="No aplica">No aplica</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>Estado académico inicial 2026</label>
                    <select id="estadoInicial2026">
                        <option value="">Seleccione...</option>
                        <option value="Escolarizado">Escolarizado</option>
                        <option value="Desescolarizado">Desescolarizado</option>
                        <option value="Extraedad">Extraedad</option>
                        <option value="No aplica">No aplica</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>Grado / metodología aspirante</label>
                    <select id="gradoAspirante">
                        <option value="">Seleccione...</option>
                        <option value="Preescolar">Preescolar</option>
                        <option value="Primaria">Primaria</option>
                        <option value="Secundaria">Secundaria</option>
                        <option value="Media">Media</option>
                        <option value="Modelo flexible">Modelo flexible (metodología)</option>
                        <option value="Validación de bachillerato">Validación de bachillerato</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>Jornada</label>
                    <select id="jornadaNna">
                        <option value="">Seleccione...</option>
                        <option value="Mañana">Mañana</option>
                        <option value="Tarde">Tarde</option>
                        <option value="Única">Única</option>
                        <option value="Nocturna">Nocturna</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>Año de ingreso</label>
                    <input type="number" id="anioIngreso" placeholder="Ej: 2026" min="2000">
                </div>
            </div>

            <div class="form-section-title">Datos de salud</div>
            <div class="form-grid">
                <div class="form-group">
                    <label>Discapacidad</label>
                    <select id="discapacidadNna">
                        <option value="">Seleccione...</option>
                        <option value="Ninguna">Ninguna</option>
                        <option value="Física">Física</option>
                        <option value="Visual">Visual</option>
                        <option value="Auditiva">Auditiva</option>
                        <option value="Cognitiva">Cognitiva</option>
                        <option value="Múltiple">Múltiple</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>Neurodivergencia</label>
                    <input type="text" id="neurodivergenciaNna" placeholder="Ej: TDAH, autismo, dislexia...">
                </div>
                <div class="form-group">
                    <label>¿Cuenta con diagnóstico?</label>
                    <select id="tieneDiagnosticoNna">
                        <option value="">Seleccione...</option>
                        <option value="Sí">Sí</option>
                        <option value="No">No</option>
                    </select>
                </div>
            </div>

            <div class="form-section-title">Contacto y clasificación</div>
            <div class="form-grid">
                <div class="form-group">
                    <label>Celular (opcional)</label>
                    <input type="text" id="celularNna" placeholder="Celular de contacto">
                </div>
                <div class="form-group">
                    <label>Dirección (opcional)</label>
                    <input type="text" id="direccionNna" placeholder="Dirección">
                </div>
                <div class="form-group">
                    <label>Barrio (opcional)</label>
                    <input type="text" id="barrioNna" placeholder="Barrio">
                </div>
                <div class="form-group">
                    <label>Grupo de validación (opcional)</label>
                    <input type="text" id="grupoValidacionNna" placeholder="Grupo de validación">
                </div>
                <div class="form-group">
                    <label>Plan padrino (opcional)</label>
                    <select id="planPadrinoNna">
                        <option value="">Seleccione...</option>
                        <option value="Sí">Sí</option>
                        <option value="No">No</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>Tipo de beca (opcional)</label>
                    <input type="text" id="tipoBecaNna" placeholder="Tipo de beca">
                </div>
            </div>

            <div class="form-section-title">Servicios necesarios</div>
            <div class="checklist-grid">
                <label class="checklist-item"><input type="checkbox" id="servTramiteDocumentos"> Trámite de documentos</label>
                <label class="checklist-item"><input type="checkbox" id="servActivacionRuta"> Activación de ruta</label>
                <label class="checklist-item"><input type="checkbox" id="servRefuerzo"> Refuerzo escolar</label>
                <label class="checklist-item"><input type="checkbox" id="servAcompanamiento"> Acompañamiento</label>
                <label class="checklist-item"><input type="checkbox" id="servRutaEscolar"> Ruta escolar</label>
                <label class="checklist-item"><input type="checkbox" id="servComedores"> Comedores</label>
                <label class="checklist-item"><input type="checkbox" id="servMatricula"> Matrícula</label>
            </div>

            <div class="form-section-title">Observaciones</div>
            <div class="form-group">
                <label>Observación académica</label>
                <textarea id="observacionAcademicaNna" rows="4" placeholder="Observaciones sobre el proceso académico del NNA"></textarea>
            </div>

            <div class="modal-actions">
                <button type="submit" class="btn-primary">Guardar NNA</button>
            </div>
        </form>
    `;
}
