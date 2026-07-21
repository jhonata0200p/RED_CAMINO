<<<<<<< HEAD
/** KpiCard — tarjeta de indicador numérico en el dashboard */
=======
// Crea una tarjeta para mostrar indicadores
>>>>>>> 280df765e7f5535d76cdf41e3963a143aaf6b39a
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