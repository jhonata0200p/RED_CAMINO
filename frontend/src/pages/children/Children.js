/**
 * Children.js — SOLO HTML de la vista de NNA (listado + modal de registro).
 * Lógica: ChildController.js → iniciarNna()
 */
import { DashboardLayout } from "../../components/layout/DashboardLayout.js";
import { Button } from "../../components/ui/Button.js";
import { Modal } from "../../components/ui/Modal.js";

import { SERVICIOS_NNA } from "../../constants/serviciosNna.js";

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
                    <label>Hogar al que pertenece *</label>
                    <select id="familiaNna"><option value="">Seleccione un hogar...</option></select>
                </div>
                <div class="form-group" id="grupoPendienteHogar" hidden>
                    <label>NNA pendiente del hogar (opcional)</label>
                    <select id="pendienteHogarNna">
                        <option value="">Registrar como nuevo NNA</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>Nombre completo *</label>
                    <input type="text" id="nombreNna" placeholder="Nombre completo del NNA">
                </div>
                <div class="form-group" id="grupoSexoNna">
                    <label>Sexo</label>
                    <select id="sexoNna">
                        <option value="">Seleccione...</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>Nacionalidad *</label>
                    <select id="nacionalidadNna">
                        <option value="">Seleccione...</option>
                        <option value="1">Colombiana</option>
                        <option value="2">Venezolana</option>
                        <option value="3">Colombo-Venezolana</option>
                        <option value="4">Otra</option>
                    </select>
                </div>
                <div class="form-group" id="grupoTipoDocumentoNna">
                    <label>Tipo de documento *</label>
                    <select id="tipoDocumentoNna">
                        <option value="">Seleccione...</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>Número de documento</label>
                    <input type="text" id="documentoNna" placeholder="Opcional">
                </div>
                <div class="form-group" id="grupoFechaNacimientoNna">
                    <label>Fecha de nacimiento *</label>
                    <input type="date" id="fechaNacimientoNna">
                </div>
                <div class="form-group" id="grupoEdadNna">
                    <label>Edad</label>
                    <input type="number" id="edadNna" placeholder="Se calcula automáticamente" readonly>
                </div>
            </div>

            <div class="form-section-title">Datos académicos</div>
            <div class="form-grid">
                <div class="form-group">
                    <label>Estado académico inicial FSCM *</label>
                    <select id="estadoInicialFscm">
                        <option value="">Seleccione...</option>
                        <option value="1">Escolarizado</option>
                        <option value="2">No escolarizado</option>
                        <option value="3">Desescolarizado</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>Estado académico inicial 2026 *</label>
                    <select id="estadoInicial2026">
                        <option value="">Seleccione...</option>
                        <option value="1">Escolarizado</option>
                        <option value="2">No escolarizado</option>
                        <option value="3">Desescolarizado</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>Grado / metodología aspirante *</label>
                    <select id="gradoAspirante">
                        <option value="">Seleccione...</option>
                        <option value="1">Grado tradicional</option>
                        <option value="2">Metodología flexible</option>
                        <option value="3">No aplica</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>Jornada *</label>
                    <select id="jornadaNna">
                        <option value="">Seleccione...</option>
                        <option value="1">Mañana</option>
                        <option value="2">Tarde</option>
                        <option value="3">Noche</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>Año de ingreso *</label>
                    <input type="number" id="anioIngreso" placeholder="Ej: 2026" min="2000">
                </div>
            </div>

            <div class="form-section-title">Datos de salud</div>
            <div class="form-grid">
                <div class="form-group">
                    <label>Discapacidad</label>
                    <select id="discapacidadNna">
                        <option value="">Seleccione...</option>
                        <option value="1">Auditiva</option>
                        <option value="2">Física</option>
                        <option value="3">Visual</option>
                        <option value="4">Sordoceguera</option>
                        <option value="5">Intelectual</option>
                        <option value="6">Psicosocial</option>
                        <option value="7">Múltiple</option>
                        <option value="8">Ninguna</option>
                        <option value="9">No aplica</option>
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
                        <option value="1">Sí</option>
                        <option value="2">No</option>
                    </select>
                </div>
            </div>

            <div class="form-section-title">Servicios necesarios</div>
            <div class="checklist-grid">
                ${SERVICIOS_NNA.map(({ id, label }) => `
                    <label class="checklist-item"><input type="checkbox" id="${id}"> ${label}</label>
                `).join("")}
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
