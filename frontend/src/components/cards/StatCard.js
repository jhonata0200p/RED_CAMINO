// Crea una tarjeta reutilizable para mostrar métricas o indicadores.
export function StatCard({ titulo, valor, icono, color, detalle = "" }) {

    return `

        <article class="card stat-card">

            <div class="card-icon" style="background:${color}">

                <i class="${icono}"></i>

            </div>

            <div class="card-content">

                <h3>${valor}</h3>

                <p>${titulo}</p>

                ${detalle ? `<small>${detalle}</small>` : ""}

            </div>

        </article>

    `;

}
