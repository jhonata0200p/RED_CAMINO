# Frontend — Red Camino de María

SPA en **JavaScript vanilla** + **Vite**. Habla con el backend Express + PostgreSQL.

## Cómo levantarlo

Desde la raíz del monorepo (recomendado):

```bash
docker compose up --build
```

Sitio: http://localhost:5173 · API: http://localhost:3000/api

O solo este frontend (con la API ya corriendo):

```bash
cd frontend
npm install
npm run dev
```

## Estructura (resumen)

```
src/
├── pages/          → HTML de cada vista
├── controllers/    → lógica de la pantalla
├── services/       → fetch a /api
├── components/     → piezas reutilizables
├── router/         → rutas
└── utils/          → helpers
```

Flujo típico: `router` → `page` → `controller` → `service` → backend.

Usuarios de prueba y más detalle: ver el [README de la raíz](../README.md).
