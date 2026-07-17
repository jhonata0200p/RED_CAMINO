// Este archivo define qué rutas puede visitar cada rol del sistema.
export const permisosPorRol = {

    administrador: [
        "dashboard", "familias", "perfilFamilia", "nna", "perfilNna",
        "seguimiento", "reportes", "usuarios"
    ],

    psicologo: [
        "dashboard", "familias", "perfilFamilia", "nna", "perfilNna",
        "seguimiento", "reportes"
    ],

    profesor: [
        "dashboard", "familias", "perfilFamilia", "nna", "perfilNna",
        "seguimiento", "reportes"
    ],

    trabajador: [
        "dashboard", "familias", "perfilFamilia", "nna", "perfilNna", "reportes"
    ]

};

// Verifica si un rol puede acceder a una ruta específica
export function puedeAcceder(rol, ruta) {

    const rutasPermitidas = permisosPorRol[rol];

    if (!rutasPermitidas) return false;

    return rutasPermitidas.includes(ruta);

}

// Acciones bloqueadas por rol dentro de un mismo módulo
const accionesBloqueadasPorRol = {

    trabajador: {
        familias: ["editar", "eliminar"],
        nna: ["editar", "eliminar"]
    }

};

// Verifica si un rol puede ejecutar una acción puntual dentro de un módulo
export function puedeRealizarAccion(rol, modulo, accion) {

    const bloqueosDelRol = accionesBloqueadasPorRol[rol];

    if (!bloqueosDelRol) return true;

    const bloqueosDelModulo = bloqueosDelRol[modulo];

    if (!bloqueosDelModulo) return true;

    return !bloqueosDelModulo.includes(accion);

}
