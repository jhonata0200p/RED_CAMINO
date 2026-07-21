# Base de datos — scripts SQL por categoría

PostgreSQL carga estos archivos **en orden alfabético** al crear el volumen Docker (`docker-entrypoint-initdb.d`).

| Archivo | Categoría | Qué contiene |
|---------|-----------|--------------|
| [`01_ddl.sql`](01_ddl.sql) | **DDL** | `CREATE TABLE` (catálogos y tablas de negocio) |
| [`02_dml.sql`](02_dml.sql) | **DML** | `INSERT` de catálogos y 3 usuarios de prueba |
| [`03_dql.sql`](03_dql.sql) | **DQL** | `SELECT setval(...)` para ajustar secuencias SERIAL |

## Categorías que este proyecto **no** tiene como script SQL

| Categoría | Motivo |
|-----------|--------|
| **DCL** (`GRANT` / `REVOKE`) | No se usan. Un solo usuario (`redcamino_admin`) es dueño de la BD. |
| **TCL** (`BEGIN` / `COMMIT` / `ROLLBACK` / `SAVEPOINT`) | No hay archivo `.sql` de transacciones. Las transacciones están en el **backend** (Node), por ejemplo: `backend/src/models/hogares/hogaresWrite.js`, `backend/src/models/nna/nnaWrite.js`, `backend/src/models/usuariosModel.js`. |

## Usuarios de prueba (DML)

Contraseña: `123456`

- admin@redcamino.org
- psicologo@redcamino.org
- profesor@redcamino.org
