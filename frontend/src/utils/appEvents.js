/**
 * appEvents.js — comunicación entre módulos sin imports circulares.
 */
export const APP_EVENTS = {
  SEGUIMIENTO_ACTUALIZADO: "app:seguimiento-actualizado",
};

export function notificarSeguimientoActualizado(detail = {}) {
  document.dispatchEvent(
    new CustomEvent(APP_EVENTS.SEGUIMIENTO_ACTUALIZADO, { detail }),
  );
}
