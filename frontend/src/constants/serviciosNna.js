/**
 * Lista única de servicios que puede necesitar un NNA.
 * clave = nombre en formData | id = id del checkbox en HTML | label = texto visible
 * Se reutiliza en Children.js (registro) y ChildProfile.js (perfil/edición).
 */
export const SERVICIOS_NNA = [
  { clave: "tramiteDocumentos", id: "servTramiteDocumentos", label: "Trámite de documentos" },
  { clave: "activacionRuta", id: "servActivacionRuta", label: "Activación de ruta" },
  { clave: "refuerzo", id: "servRefuerzo", label: "Refuerzo escolar" },
  { clave: "acompanamiento", id: "servAcompanamiento", label: "Acompañamiento" },
  { clave: "rutaEscolar", id: "servRutaEscolar", label: "Ruta escolar" },
  { clave: "comedores", id: "servComedores", label: "Comedores" },
  { clave: "matricula", id: "servMatricula", label: "Matrícula" },
];
