// Servicio del panel de control: calcula los indicadores a partir de
// familias, nna y seguimientos, que sí existen en la base de datos.
import API_URL from "./api.js";

export async function obtenerDatosDashboard() {

    const [rFamilias, rNna, rSeguimientos] = await Promise.all([
        fetch(`${API_URL}/familias`), fetch(`${API_URL}/nna`), fetch(`${API_URL}/seguimientos`)
    ]);

    if (!rFamilias.ok || !rNna.ok || !rSeguimientos.ok) {
        throw new Error("No se pudieron cargar las métricas del dashboard.");
    }

    const familias = await rFamilias.json();
    const nna = await rNna.json();
    const seguimientos = await rSeguimientos.json();

    const hoy = new Date();
    const mes = hoy.getMonth() + 1;
    const anio = hoy.getFullYear();

    const confirmadosEsteMes = seguimientos.filter(s => Number(s.mes) === mes && Number(s.anio) === anio).length;
    const activos = nna.filter(n => n.estado === "Activo").length;

    // Distribución mensual por estado: cada NNA cae en uno de estos 4 estados.
    // Si a algún registro le falta el campo "estado", se cuenta como "Activo" por defecto
    // (es el valor con el que se crea todo NNA nuevo, ver ChildController.js).
    const ESTADOS_MENSUALES = ["Activo", "Inasistente", "Retirado", "Egresado"];

    const distribucionEstados = ESTADOS_MENSUALES.reduce((acumulado, estado) => {
        acumulado[estado] = nna.filter(n => (n.estado || "Activo") === estado).length;
        return acumulado;
    }, {});

    // Total de NNA con discapacidad activa: se guarda en salud.discapacidad como texto
    // ("Física", "Visual", "Auditiva", "Cognitiva", "Múltiple"). "Ninguna" o vacío no cuenta.
    const totalConDiscapacidad = nna.filter(n => {
        const discapacidad = n.salud?.discapacidad;
        return discapacidad && discapacidad !== "Ninguna";
    }).length;

    // Niños por barrio: cada NNA toma el barrio de su familia (gráfica de barras del dashboard)
    const barrioPorFamilia = {};
    familias.forEach(f => { barrioPorFamilia[f.id] = f.barrio; });

    const ninosPorBarrio = {};
    nna.forEach(n => {
        const barrio = barrioPorFamilia[n.familiaId] || "Sin barrio";
        ninosPorBarrio[barrio] = (ninosPorBarrio[barrio] || 0) + 1;
    });

    // Ingresos de las familias: total, promedio y distribución por rangos.
    // Se toma el campo "ingresos" registrado en cada familia (0 si no se registró).
    const ingresosFamilias = familias.map(f => Number(f.ingresos) || 0);
    const totalIngresos = ingresosFamilias.reduce((suma, valor) => suma + valor, 0);
    const familiasConIngresos = ingresosFamilias.filter(valor => valor > 0).length;
    const promedioIngresos = familiasConIngresos > 0 ? totalIngresos / familiasConIngresos : 0;

    const rangosDefinidos = [
        { etiqueta: "Sin registrar", min: -Infinity, max: 0 },
        { etiqueta: "< $500.000", min: 0.01, max: 500000 },
        { etiqueta: "$500.000 - $1.000.000", min: 500000.01, max: 1000000 },
        { etiqueta: "$1.000.000 - $2.000.000", min: 1000000.01, max: 2000000 },
        { etiqueta: "> $2.000.000", min: 2000000.01, max: Infinity }
    ];

    const rangosIngresos = rangosDefinidos.map(rango => [
        rango.etiqueta,
        ingresosFamilias.filter(valor => valor >= rango.min && valor <= rango.max).length
    ]);

    return {
        totalFamilias: familias.length,
        totalNna: nna.length,
        pendientesMes: nna.filter(n => n.estado !== "Inactivo").length - confirmadosEsteMes,
        activos,
        inactivos: nna.length - activos,
        distribucionEstados,
        totalConDiscapacidad,
        porBarrio: Object.entries(ninosPorBarrio).sort((a, b) => b[1] - a[1]),
        totalIngresos,
        promedioIngresos,
        rangosIngresos
    };

}
