// Importa el layout principal y los componentes reutilizables.
import { DashboardLayout } from "../../components/layout/DashboardLayout.js";
import { Table } from "../../components/tables/Table.js";
import { Modal } from "../../components/ui/Modal.js";
import { Input } from "../../components/ui/Input.js";
import { Button } from "../../components/ui/Button.js";

const MESES = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];

const GRADOS = [
    "Preescolar", "1°", "2°", "3°", "4°", "5°",
    "6°", "7°", "8°", "9°", "10°", "11°",
    "Validación de bachillerato"
];

// Crea la vista de seguimiento mensual de los NNA ya inscritos en la fundación.
export function AcademicFollowUp() {

    const hoy = new Date();

    return DashboardLayout(`

        <section class="page">

            <div class="page-header">
                <div>
                    <div class="eyebrow">Seguimiento</div>
                    <h1>Novedades del mes</h1>
                    <p>Marca con un check a los niños y niñas que ya asistieron/fueron atendidos este mes. Al confirmarlos pasan automáticamente a Reportes.</p>
                </div>
            </div>

            <div class="page-tools">
                <div class="filters">
                    <select class="plain" id="mesSeguimiento">
                        ${MESES.map((m,i) => `<option value="${i+1}" ${i+1===hoy.getMonth()+1 ? "selected":""}>${m}</option>`).join("")}
                    </select>
                    <select class="plain" id="anioSeguimiento">
                        <option ${hoy.getFullYear()===2026?"selected":""}>2026</option>
                        <option ${hoy.getFullYear()===2025?"selected":""}>2025</option>
                    </select>
                </div>
                <span id="pendientesInfo" class="tag tag-amber">Cargando...</span>
            </div>

            ${Table({ headers: ["NNA", "Documento", "Familia", "Estado", "Confirmar mes"], bodyId: "seguimientosBody" })}

            <div class="page-header">
                <div>
                    <h2>Seguimientos registrados</h2>
                    <p>Detalle académico de cada confirmación del período: colegio, grado y estado del mes.</p>
                </div>
            </div>

            ${Table({ headers: ["NNA", "Estado del mes", "Colegio actual", "Grado actual", "Asistencia", "Acciones"], bodyId: "seguimientosRegistradosBody" })}

        </section>

        ${Modal(

            "modalSeguimiento",

            `<h2 id="formTituloModalSeguimiento">Registrar seguimiento</h2>`,

            `
                <form id="formSeguimiento" class="form-compact">

                    <div class="form-grid">

                        <!-- ===================== CAMPOS OBLIGATORIOS ===================== -->

                        <div class="form-group">
                            <label>Año</label>
                            ${Input({ id: "seguimientoAnio", type: "number", placeholder: `Ej: ${hoy.getFullYear()}`, value: hoy.getFullYear() })}
                        </div>

                        <div class="form-group">
                            <label>Mes</label>
                            <select id="seguimientoMes">
                                <option value="">Seleccione...</option>
                                ${MESES.map((mes, indice) => `<option value="${indice + 1}">${mes}</option>`).join("")}
                            </select>
                        </div>

                        <div class="form-group">
                            <label>Estado del mes</label>
                            <select id="seguimientoEstadoMes">
                                <option value="">Seleccione...</option>
                                <option value="Activo">Activo</option>
                                <option value="Inasistente">Inasistente</option>
                                <option value="Retirado">Retirado</option>
                                <option value="Egresado">Egresado</option>
                            </select>
                        </div>

                        <div class="form-group">
                            <label>Colegio actual</label>
                            ${Input({ id: "seguimientoColegioActual", placeholder: "Nombre del colegio" })}
                        </div>

                        <div class="form-group">
                            <label>Institución</label>
                            ${Input({ id: "seguimientoInstitucion", placeholder: "Institución educativa" })}
                        </div>

                        <div class="form-group">
                            <label>Tipo de colegio</label>
                            <select id="seguimientoTipoColegio">
                                <option value="">Seleccione...</option>
                                <option value="Oficial">Oficial</option>
                                <option value="Privado">Privado</option>
                            </select>
                        </div>

                        <div class="form-group">
                            <label>Grado actual</label>
                            <select id="seguimientoGradoActual">
                                <option value="">Seleccione...</option>
                                ${GRADOS.map(grado => `<option value="${grado}">${grado}</option>`).join("")}
                            </select>
                        </div>

                        <!-- ===================== CAMPOS OPCIONALES ===================== -->

                        <div class="form-group">
                            <label>Asistencia (opcional)</label>
                            ${Input({ id: "seguimientoAsistencia", placeholder: "Ej: 90%" })}
                        </div>

                    </div>

                    <div class="form-group">
                        <label>Egreso o motivo (opcional)</label>
                        <textarea id="seguimientoMotivo" rows="3" placeholder="Motivo de retiro, egreso o novedad del mes"></textarea>
                    </div>

                    <div class="modal-actions">
                        ${Button({ texto: "Guardar seguimiento", icono: "fa-solid fa-floppy-disk", clase: "btn-primary", tipo: "submit" })}
                    </div>

                </form>
            `

        )}

    `, "seguimiento");

}
