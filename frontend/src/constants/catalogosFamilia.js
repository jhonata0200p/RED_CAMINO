/** Catálogos fijos de vulnerabilidades del hogar.
 *  Se usan cuando la API devuelve nombres de texto en lugar de IDs numéricos.
 *  key = nombre interno | id = ID en PostgreSQL | label = texto visible */
export const VULNERABILIDADES_CATALOGO = [
  { key: "victimaConflicto", id: 1, label: "Víctima del conflicto armado" },
  { key: "poblacionMigrante", id: 2, label: "Población migrante" },
  { key: "lgbt", id: 3, label: "Pertenencia a comunidad LGBTIQ+" },
  { key: "adultosSinSalud", id: 4, label: "Personas adultas sin afiliación a salud" },
  { key: "nnaSinSalud", id: 5, label: "Niños, niñas o adolescentes (NNA) sin afiliación a salud" },
  { key: "discapacidad", id: 6, label: "Presencia de personas con discapacidad" },
  { key: "saludMental", id: 7, label: "Casos de alertas en salud mental" },
  { key: "fuman", id: 8, label: "Integrantes que fuman dentro del hogar" },
  { key: "insalubridad", id: 9, label: "Riesgos evidentes de insalubridad" },
  { key: "gestantes", id: 10, label: "Presencia de mujeres gestantes" },
  { key: "gestantesSinControl", id: 11, label: "Gestantes sin controles prenatales al día" },
];

/** Prioridades de intervención familiar (misma estructura que vulnerabilidades). */
export const PRIORIDADES_CATALOGO = [
  { key: "educacionNinos", id: 1, label: "Educación para Niños" },
  { key: "prevencionViolencias", id: 2, label: "Prevención de violencias en el hogar" },
  { key: "apoyoPsicosocial", id: 3, label: "Apoyo psicosocial familiar" },
  { key: "generacionIngresos", id: 4, label: "Acceso a oportunidades de generación de ingresos" },
  { key: "tramites", id: 5, label: "Ayuda con trámites y articulación institucional" },
];
