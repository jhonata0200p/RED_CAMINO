# Red Camino de María

Sistema de gestión web para el acompañamiento de hogares y NNA (niños, niñas y adolescentes) de la fundación Red Camino de María.

Aplicación full stack: **frontend** (JavaScript vanilla + Vite), **backend** (Node.js + Express) y **base de datos** (PostgreSQL).

---

## 1. Descripción del proyecto

El sistema permite:

- Landing pública e inicio de sesión
- Gestión de hogares / familias
- Registro y confirmación de NNA
- Seguimiento académico mensual
- Reportes (exportación Excel)
- Administración de usuarios (solo administrador)

### Roles

| Rol | Acceso principal |
|-----|------------------|
| Administrador | Todo el sistema, usuarios y confirmación de NNA |
| Psicólogo | Hogares, NNA, seguimiento |
| Profesor | Consulta y seguimiento según permisos |

---

## 2. Tecnologías utilizadas

| Capa | Tecnología |
|------|------------|
| Frontend | JavaScript (ES Modules), Vite, HTML5, CSS3 |
| Backend | Node.js, Express |
| Base de datos | PostgreSQL 17 |
| Contenedores | Docker, Docker Compose |
| Otros | SweetAlert2, Font Awesome, Animate.css |

---

## 3. Estructura del repositorio

```
README/
├── bd/
│   ├── 01_ddl.sql               # DDL: CREATE TABLE
│   ├── 02_dml.sql               # DML: INSERT (catálogos + usuarios)
│   ├── 03_dql.sql               # DQL: SELECT setval (secuencias)
│   └── README.md                # Explica DDL/DML/DQL (sin DCL/TCL inventados)
├── backend/
│   ├── src/
│   │   ├── config/              # Conexión a PostgreSQL
│   │   ├── controllers/         # Valida peticiones y responde JSON
│   │   ├── models/              # Consultas SQL
│   │   ├── routes/              # URLs de la API
│   │   ├── middlewares/         # Sesión simple y roles
│   │   ├── utils/               # Helpers
│   │   └── server.js            # Punto de entrada
│   ├── .env.example             # Plantilla de variables de entorno
│   └── Dockerfile
├── frontend/                        # SPA (landing + sistema)
│   ├── src/
│   │   ├── pages/                   # Vistas (HTML)
│   │   ├── controllers/             # Lógica de pantalla
│   │   ├── services/                # Llamadas a la API
│   │   ├── components/              # Componentes reutilizables
│   │   ├── router/                  # Rutas del frontend
│   │   └── utils/                   # Helpers
│   └── Dockerfile
├── docker-compose.yml               # Orquesta BD + backend + frontend
└── README.md                        # Este archivo
```

---

## 4. Requisitos previos

Antes de instalar, asegúrese de tener:

1. **Git** (para clonar el repositorio)
2. **Docker Desktop** instalado y en ejecución  
   - [Windows / Mac](https://www.docker.com/products/docker-desktop/)  
   - En Linux: Docker Engine + plugin Compose

> Forma recomendada: **Docker Compose** (instala y levanta todo junto).

---

## 5. Instrucciones de instalación

### Opción A — Con Docker (recomendada)

1. **Clonar el repositorio** (o abrir la carpeta del proyecto):

```bash
git clone <URL_DEL_REPOSITORIO>
cd README
```

2. **Levantar los servicios** desde la raíz del proyecto:

```bash
docker compose up --build
```

La primera vez puede tardar unos minutos (descarga de imágenes e instalación de dependencias).

3. **Abrir en el navegador:**

| Servicio | URL |
|----------|-----|
| Aplicación (landing + sistema) | http://localhost:5173 |
| API (backend) | http://localhost:3000/api |
| PostgreSQL (host) | `localhost:5433` |

4. **Iniciar sesión** con un usuario de prueba (ver sección 6).

#### Comandos útiles

```bash
# Detener los contenedores
docker compose down

# Detener y borrar la base de datos (vuelve a cargar bd/01_ddl, 02_dml, 03_dql)
docker compose down -v

# Volver a construir e iniciar
docker compose up --build
```

> Use `docker compose down -v` solo si necesita reiniciar la base de datos desde cero.

---

### Opción B — Sin Docker (desarrollo local)

#### B.1 Base de datos

1. Instalar **PostgreSQL**.
2. Crear una base de datos y un usuario (o usar los del ejemplo).
3. Ejecutar los scripts en orden:

```bash
psql -U redcamino_admin -d redcamino_db -f bd/01_ddl.sql
psql -U redcamino_admin -d redcamino_db -f bd/02_dml.sql
psql -U redcamino_admin -d redcamino_db -f bd/03_dql.sql
```

(Ajuste usuario, base y puerto según su instalación.)

#### B.2 Backend

```bash
cd backend
copy .env.example .env
```

En Linux/Mac:

```bash
cp .env.example .env
```

Edite `backend/.env` si hace falta (por defecto apunta a `localhost:5433`):

```
DB_HOST=localhost
DB_PORT=5433
DB_NAME=redcamino_db
DB_USER=redcamino_admin
DB_PASSWORD=RedCaminoSecure123!
PORT=3000
```

Luego:

```bash
npm install
npm start
```

La API quedará en http://localhost:3000

#### B.3 Frontend

En otra terminal:

```bash
cd frontend
npm install
npm run dev
```

Abrir http://localhost:5173

---

## 6. Usuarios de prueba

Contraseña para todos: **`123456`**

| Correo | Rol |
|--------|-----|
| admin@redcamino.org | Administrador |
| psicologo@redcamino.org | Psicólogo |
| profesor@redcamino.org | Profesor |

> Las contraseñas están en texto plano (MVP académico). No usar en producción.

---

## 7. Variables de entorno

| Variable | Descripción |
|----------|-------------|
| `DB_HOST` | Host de PostgreSQL (`bd` en Docker, `localhost` en local) |
| `DB_PORT` | Puerto de PostgreSQL |
| `DB_NAME` | Nombre de la base de datos |
| `DB_USER` | Usuario de la base de datos |
| `DB_PASSWORD` | Contraseña de la base de datos |
| `PORT` | Puerto del backend |

El archivo real `.env` **no se sube a Git** (está en `.gitignore`). Use `backend/.env.example` como plantilla. Con Docker, las variables ya están definidas en `docker-compose.yml`.

---

## 8. Arquitectura (flujo resumido)

```
Navegador (Vite :5173)
    → fetch /api/...  (+ header X-Usuario-Id)
Backend Express (:3000)
    → routes → controllers → models
PostgreSQL (:5433 / servicio bd)
```

Autenticación (MVP sencillo, sin JWT):

1. Login valida correo y contraseña en la base de datos.
2. El frontend guarda el usuario en `localStorage`.
3. Cada petición protegida envía el header `X-Usuario-Id` con el id del usuario.
4. El middleware `verificarSesion` comprueba que ese profesional exista y esté activo.

---

## 9. Notas

- Sin sesión se muestra la landing (`inicio`). Con sesión, el dashboard.
- Cerrar sesión vuelve a la landing.
- El esquema de la base está en `bd/` (`01_ddl.sql`, `02_dml.sql`, `03_dql.sql`). Ver `bd/README.md`.
- Tras cambiar los scripts SQL, recrear el volumen: `docker compose down -v && docker compose up --build`.
- Frontend unificado en `frontend/` (landing + sistema).