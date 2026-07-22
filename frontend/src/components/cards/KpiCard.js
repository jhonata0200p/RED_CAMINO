/** KpiCard — tarjeta de indicador numérico en el dashboard */
export function KpiCard(titulo, cantidad, icono, color) {

    return `

        <article class="kpi-card">

            <div class="kpi-icon" style="background:${color}">

                <i class="${icono}"></i>

            </div>

            <div class="kpi-info">

                <h3>

                    ${cantidad}

                </h3>

                <p>

                    ${titulo}

                </p>

            </div>

        </article>

    `;

}