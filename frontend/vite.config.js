/**
 * vite.config.js — bundler de desarrollo (npm run dev → puerto 5173).
 */
import { defineConfig } from "vite";

export default defineConfig({
  server: {
    host: true, // accesible desde Docker (--host 0.0.0.0)
    port: 5173,
  },
  build: {
    outDir: "dist",
    emptyOutDir: true,
  },
});
