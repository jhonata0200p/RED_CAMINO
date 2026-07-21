/** catalogService.js — GET /catalogos con caché en memoria. */
import { apiFetch } from "./api.js";

let cacheCatalogos = null;

export async function obtenerCatalogos(force = false) {
  if (cacheCatalogos && !force) return cacheCatalogos;
  cacheCatalogos = await apiFetch("/catalogos");
  return cacheCatalogos;
}

export function limpiarCacheCatalogos() {
  cacheCatalogos = null;
}
