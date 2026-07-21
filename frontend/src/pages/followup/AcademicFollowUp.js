/**
 * AcademicFollowUp.js — HTML de seguimiento mensual (tabla + modal).
 * Lógica: FollowUpController.iniciarSeguimientos()
 */
// Importa el layout principal y los componentes reutilizables.
import { DashboardLayout } from "../../components/layout/DashboardLayout.js";
import { Table } from "../../components/tables/Table.js";
import { Modal } from "../../components/ui/Modal.js";
import { Input } from "../../components/ui/Input.js";
import { Button } from "../../components/ui/Button.js";

const MESES = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];

const GRADOS = [
    { value: "1", label: "Preescolar" },
    { value: "2", label: "1°" },
    { value: "3", label: "2°" },
    { value: "4", label: "3°" },
    { value: "5", label: "4°" },
    { value: "6", label: "5°" },
    { value: "7", label: "6°" },
    { value: "8", label: "7°" },
    { value: "9", label: "8°" },
    { value: "10", label: "9°" },
    { value: "11", label: "10°" },
    { value: "12", label: "11°" },
    { value: "13", label: "Aceleración" },
    { value: "14", label: "Metodología flexible" },
    { value: "15", label: "Otro" },
];

function mesAnteriorDefaults() {
    const hoy = new Date();
    const mes = hoy.getMonth() === 0 ? 12 : hoy.getMonth();
    const anio = hoy.getMonth() === 0 ? hoy.getFullYear() - 1 : hoy.getFullYear();
    return { mes, anio };
}

// Crea la vista de seguimiento mensual de los NNA ya inscritos en la fundación.
export function AcademicFollowUp() {

    const hoy = new Date();
    const { mes: mesDefault, anio: anioDefault } = mesAnteriorDefaults();

    return DashboardLayout(`

        <section class="page">

            <div class="page-header">
                <div>
                    <div class="eyebrow">Seguimiento</div>
                    <h1>Seguimiento mensual</h1>
                    <p>Registra el estado académico mensual de cada NNA de línea base.</p>
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
            </div>

            ${Table({ headers: ["NNA", "Hogar", "Familia", "Estado", "Confirmar mes"], bodyId: "seguimientosBody" })}

        </section>

        ${Modal(

            "modalSeguimiento",

            `<h2 id="formTituloModalSeguimiento">Registrar seguimiento</h2>`,

            `
                <form id="formSeguimiento" class="form-compact">

                    <div class="form-grid">

                        <div class="form-group">
                            <label>Año</label>
                            ${Input({ id: "seguimientoAnio", type: "number", placeholder: `Ej: ${anioDefault}`, value: anioDefault })}
                        </div>

                        <div class="form-group">
                            <label>Mes</label>
                            <select id="seguimientoMes">
                                <option value="">Seleccione...</option>
                                ${MESES.map((mes, indice) => `<option value="${indice + 1}" ${indice + 1 === mesDefault ? "selected" : ""}>${mes}</option>`).join("")}
                            </select>
                        </div>

                        <div class="form-group">
                            <label>Estado del mes</label>
                            <select id="seguimientoEstadoMes">
                                <option value="">Seleccione...</option>
                            </select>
                        </div>

                        <div class="form-group">
                            <label>Colegio actual</label>
                            ${Input({ id: "seguimientoColegioActual", placeholder: "Nombre del colegio" })}
                        </div>

                        <div class="form-group">
                            <label>Grado actual</label>
                            <select id="seguimientoGradoActual">
                                <option value="">Seleccione...</option>
                            </select>
                        </div>

                    </div>

                    <div class="modal-actions">
                        ${Button({ texto: "Guardar seguimiento", icono: "fa-solid fa-floppy-disk", clase: "btn-primary", tipo: "submit" })}
                    </div>

                </form>
            `

        )}

    `, "seguimiento");

}

export { GRADOS, mesAnteriorDefaults };
