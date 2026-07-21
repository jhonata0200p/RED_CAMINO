<<<<<<< HEAD
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
=======
# Red Camino de María

Sistema de gestión (SPA) para el seguimiento y acompañamiento de familias y
NNA (niños, niñas y adolescentes) beneficiarios de una fundación: registro de
familias (vista tipo tarjeta) y NNA, seguimiento mensual con confirmación
("check") que alimenta el módulo de Reportes, usuarios del sistema y
reportes, con acceso diferenciado por rol. Interfaz rediseñada con la
paleta e identidad visual "Raíces".

Este documento explica, con detalle, **qué tecnologías usa el proyecto**,
**cómo está organizado el código** y **cómo funciona la lógica interna**, para
que cualquier persona (incluso sin haberlo escrito) pueda entenderlo,
mantenerlo y extenderlo.

---

## 1. Tecnologías utilizadas

| Tecnología | Para qué se usa |
|---|---|
| **JavaScript (ES Modules), Vanilla JS** | Todo el proyecto está escrito en JavaScript puro, sin frameworks como React, Vue o Angular. La interfaz se construye a mano generando cadenas de texto HTML e insertándolas en el DOM (`innerHTML`). |
| **[Vite](https://vitejs.dev/)** | Empaquetador y servidor de desarrollo. Da recarga instantánea (`npm run dev`) y genera el build de producción (`npm run build`). |
| **[json-server](https://github.com/typicode/json-server)** | Simula una API REST completa (GET/POST/PUT/DELETE) leyendo y escribiendo directamente sobre `src/data/db.json`. Así el proyecto se puede desarrollar y probar como si tuviera un backend real, sin necesidad de programar uno. |
| **[SweetAlert2](https://sweetalert2.github.io/)** | Librería de alertas/toasts (mensajes de éxito, error, advertencia e información) usada en `src/utils/alert.js`. |
| **[Font Awesome (free)](https://fontawesome.com/)** | Íconos usados en todo el sistema (menú lateral, botones, tarjetas, etc). |
| **[Animate.css](https://animate.style/)** | Animaciones de entrada/salida, usadas sobre todo en las alertas (toasts) y algunos elementos de la interfaz. |
| **HTML5 + CSS3 (CSS puro, sin frameworks)** | Todos los estilos están escritos a mano en `src/assets/css/*.css` y `style.css`, usando variables CSS (`:root`) para colores y medidas. No se usa Tailwind, Bootstrap, ni SASS/LESS. |

No hay backend "real" (Node/Express, PHP, etc.) en este proyecto: **json-server
hace ese papel**. Esto es perfecto para maquetar, probar y presentar el
sistema, pero antes de usarlo en producción con datos reales se debería
reemplazar por una API con autenticación segura y una base de datos real (ver
sección 9, "Limitaciones y siguientes pasos").

---

## 2. Cómo se ejecuta el proyecto

El proyecto necesita **dos procesos corriendo al mismo tiempo** en dos
terminales distintas:

```bash
# 1. Instala las dependencias (solo la primera vez)
npm install

# 2. Terminal A: levanta la "API" falsa con json-server (puerto 3000)
npm run server

# 3. Terminal B: levanta la aplicación con Vite (normalmente en el puerto 5173)
npm run dev
```

Luego abre en el navegador la URL que te muestre Vite (ej.
`http://localhost:5173`).

> Si solo corres `npm run dev` sin `npm run server`, **el login funcionará**
> (los usuarios de prueba están embebidos en el código, ver sección 5), pero
> las secciones de Familias, NNA, Eventos, Donaciones, Seguimientos y Usuarios
> no podrán cargar ni guardar datos, porque dependen de json-server.

Otros comandos:

```bash
npm run build     # genera la versión de producción en /dist
npm run preview   # sirve /dist localmente para probarlo como en producción
```

---

## 3. Estructura de carpetas

```
red-camino-maria/
├── index.html                 # Único HTML de la SPA (Single Page Application)
├── main.js                    # Punto de entrada: importa estilos e inicia el router
├── style.css                  # Importa todos los CSS de src/assets/css
├── package.json                # Dependencias y scripts (dev, build, server...)
└── src/
    ├── assets/
    │   ├── css/                # Todo el CSS del proyecto, dividido por tema
    │   └── img/                 # Imágenes (ej. el logo)
    ├── components/              # Piezas de UI reutilizables (ver sección 4)
    │   ├── cards/                # Tarjetas (KPI, perfil, familia, estadística)
    │   ├── forms/                 # Formularios reutilizables
    │   ├── layout/                # Layout general (Sidebar + Navbar + contenido)
    │   ├── modals/                # Base para ventanas modales
    │   ├── navigation/             # Sidebar (menú) y Navbar (barra superior)
    │   ├── tables/                 # Tablas reutilizables
    │   └── ui/                     # Botones, inputs, badges, loaders, modal
    ├── controllers/              # Lógica de cada módulo (ver sección 4)
    ├── data/
    │   └── db.json                # "Base de datos" que usa json-server
    ├── pages/                    # Las vistas/plantillas de cada sección
    │   ├── administration/         # Gestión de usuarios
    │   ├── auth/                    # Login
    │   ├── children/                 # NNA (lista y perfil)
    │   ├── dashboard/                 # Panel principal
    │   ├── donations/                  # Donaciones
    │   ├── events/                      # Eventos
    │   ├── families/                     # Familias (lista y perfil)
    │   ├── followup/                      # Seguimiento académico
    │   ├── profile/                        # Perfil del usuario logueado
    │   ├── reports/                         # Reportes
    │   └── Error404.js                       # Vista de ruta no encontrada
    ├── router/
    │   ├── router.js               # El "cerebro" de la navegación (ver sección 6)
    │   └── routes.js                # Diccionario ruta -> función de página
    ├── services/                  # Funciones que hablan con json-server (fetch)
    ├── store/
    │   └── session.js              # Quién soy y qué rol tengo
    └── utils/
        ├── alert.js                 # Toasts de SweetAlert2
        ├── helpers.js                 # Utilidades (generarId, formatName...)
        ├── permissions.js              # QUIÉN puede ver QUÉ (ver sección 7)
        ├── storage.js                    # Guardar/leer la sesión en localStorage
        └── validators.js                   # Validaciones simples (email, etc.)
```

---

## 4. Arquitectura: el patrón que sigue el código

El proyecto sigue, de forma manual (sin ningún framework que lo imponga), un
patrón muy parecido a **MVC** (Modelo - Vista - Controlador), adaptado a una
SPA hecha con JavaScript puro:

- **`pages/`  → la "Vista".** Cada archivo exporta una función que **devuelve
  un string de HTML** (usando *template literals*). No tienen lógica de
  negocio ni tocan el DOM directamente; solo describen cómo se ve la pantalla,
  y suelen incluir "huecos" (`id="..."`) donde el controlador después
  inyectará datos reales. Ejemplo: `Families()` en
  `src/pages/families/Families.js` arma el HTML completo de la sección
  "Familias" (encabezado, tabla vacía y el modal de "Registrar familia"),
  pero la tabla se llena después.

- **`controllers/` → el "Controlador".** Cada controlador tiene una función
  `iniciarX()` (ej. `iniciarFamilias()`) que se ejecuta **justo después** de
  que el HTML de esa página ya fue insertado en el DOM. Esa función:
  1. Pide los datos a través de un `service` (ver abajo).
  2. Rellena la tabla / tarjetas con esos datos.
  3. Engancha los eventos (`addEventListener`) de los botones, el buscador y
     el formulario del modal.
  4. Define qué pasa al crear, editar o eliminar un registro.

- **`services/` → el "Modelo" (acceso a datos).** Cada archivo (ej.
  `familyService.js`) solo sabe hacer `fetch` contra json-server
  (`GET /familias`, `POST /familias`, etc.) y devolver el resultado en JSON.
  No saben nada de HTML ni del DOM. Esto separa "cómo se consiguen los datos"
  de "cómo se muestran".

- **`components/` → piezas de UI reutilizables.** Son funciones puras que
  reciben datos y devuelven un pedazo de HTML (ej. `Badge(texto, tipo)`,
  `Button({texto, icono, id})`, `Table({headers, bodyId})`, `Modal(id,
  titulo, contenido)`). Se usan dentro de las `pages` para no repetir HTML.

- **`router/` + `store/` + `utils/permissions.js` → el "controlador global"
  de la aplicación**: deciden qué página mostrar, si el usuario tiene sesión
  y si su rol puede ver esa sección (ver secciones 6 y 7).

### Ejemplo completo: así se arma la sección "Familias"

1. El usuario hace clic en "Familias" en el menú lateral.
2. `Sidebar.js` llama a `navegar("familias")`.
3. `router.js` valida sesión y permisos, y ejecuta `Families()`
   (`src/pages/families/Families.js`), que devuelve el HTML de la sección
   (título, botón "Nueva familia", buscador, tabla vacía y el modal con el
   formulario). Ese HTML se inyecta en `#app`.
4. `router.js` llama a `iniciarFamilias()` (`FamilyController.js`), que:
   - Pide las familias a `familyService.js` (`GET /familias`).
   - Dibuja las filas de la tabla.
   - Activa el buscador, el botón "Nueva familia" y el `submit` del
     formulario.
5. Cuando el usuario llena el formulario y presiona "Guardar familia", se
   ejecuta `guardarFamilia()`, que valida los campos, llama a
   `crearFamilia()` (`POST /familias`), vuelve a pedir la lista actualizada,
   **redibuja la tabla sin recargar la página ni cambiar de vista**, cierra
   el modal y muestra un toast de éxito.

Este mismo patrón se repite, casi idéntico, para NNA, Eventos, Donaciones,
Seguimientos y Usuarios.

---

## 5. Autenticación (login)

El login (`src/controllers/LoginController.js` +
`src/services/authService.js`) es intencionalmente simple para efectos de
demostración:

- Los usuarios están definidos en `src/data/db.json`, dentro de `"usuarios"`.
- `authService.js` **no** llama a json-server: importa `db.json`
  directamente (queda incluido en el build) y busca ahí un usuario cuyo
  correo y contraseña coincidan. Por eso el login funciona incluso sin correr
  `npm run server`.
- Si las credenciales son correctas, se guarda el usuario completo
  (incluido su `rol`) en `localStorage` (`src/utils/storage.js`), y se
  navega al dashboard.
- **Las contraseñas se guardan en texto plano** y no hay tokens/JWT. Esto es
  aceptable para una maqueta/demo, pero **no para producción** (ver sección
  9).

Usuarios de prueba (todos con contraseña `12345`):

| Correo | Rol |
|---|---|
| `admin@redcamino.org` | `administrador` |
| `psicologo@redcamino.org` | `psicologo` |
| `profesor@redcamino.org` | `profesor` |
| `trabajadorsocial@redcamino.org` | `trabajador` (Trabajador Social) |

---

## 6. El router (navegación sin recargar la página)

`src/router/router.js` es el corazón de la SPA. No usa una librería de
enrutamiento ni cambia la URL del navegador: simplemente reemplaza el
contenido de `<div id="app">` según una tabla de rutas.

- `routes.js` es un diccionario: `{ "familias": Families, "nna": Children,
  ... }`. La clave es el nombre interno de la ruta; el valor es la función de
  la página que hay que renderizar.
- `navegar(ruta, id)` es la función central:
  1. Busca la vista en `routes`. Si no existe, muestra `Error404`.
  2. Si la ruta no es `"login"`, verifica que haya sesión activa
     (`estaAutenticado()`); si no la hay, redirige a `"login"`.
  3. Verifica con `puedeAcceder(rol, ruta)` (de `permissions.js`) si el rol
     del usuario puede ver esa ruta. Si no puede, muestra una advertencia y
     lo manda de vuelta al `"dashboard"`.
  4. Guarda el `id` recibido (por ejemplo, el id de una familia) en una
     variable interna (`rutaIdActual`), recuperable luego con
     `obtenerRutaId()`. Así es como "Ver perfil" le puede pasar el id de una
     familia a la vista de perfil sin usar la URL.
  5. Renderiza la página (`app.innerHTML = vista()`).
  6. Inicializa el layout (Sidebar + Navbar) y **después** llama al
     controlador correspondiente a esa ruta (`iniciarFamilias()`,
     `iniciarNna()`, etc.).

**Importante:** `navegar()` solo se llama para **cambiar de sección**
(dar clic en el menú, en "Ver perfil", en "Volver", o al iniciar sesión).
Crear, editar o eliminar un registro **nunca llama a `navegar()`**: esas
acciones simplemente refrescan la tabla de la vista actual y cierran el
modal, por lo que el usuario nunca es enviado al Dashboard al guardar un
registro (ver sección 8 para más detalle sobre esto).

---

## 7. Roles y permisos

Todo el control de acceso vive en **un solo archivo**:
`src/utils/permissions.js`. Tanto el menú lateral (`Menu.js`) como el router
lo consultan, así que solo hay que tocar un lugar para cambiar qué ve cada
rol.

Hay dos niveles de permisos:

### 7.1. Permisos por ruta (`permisosPorRol`)

Define, para cada rol, la lista de rutas completas a las que puede entrar:

| Rol | Rutas permitidas |
|---|---|
| `administrador` | Todas (Dashboard, Familias, NNA, Seguimiento, Usuarios, Donaciones, Eventos, Reportes) |
| `psicologo` | Dashboard, Familias, NNA, Seguimiento, Eventos |
| `profesor` | Dashboard, Familias, NNA, Seguimiento |
| `trabajador` (Trabajador Social) | Dashboard, Familias, NNA, Eventos |

Si un rol intenta entrar (por el menú, o llamando `navegar()`) a una ruta que
no está en su lista, `router.js` lo bloquea, muestra un aviso ("No tiene
permisos para acceder a esta sección") y lo devuelve al Dashboard.

### 7.2. Permisos por acción dentro de un módulo (`puedeRealizarAccion`)

Algunos roles pueden **entrar** a una sección pero solo hacer **algunas**
acciones ahí dentro (no todo-o-nada). Esto se resuelve con
`accionesBloqueadasPorRol` y la función `puedeRealizarAccion(rol, modulo,
accion)`, también en `permissions.js`.

Hoy se usa para el rol **Trabajador Social**, que fue el que se agregó en
esta actualización (ver sección 8):

- En **Familias** y **NNA**: puede **crear** registros nuevos y ver los
  perfiles, pero **no** puede editar ni eliminar (esos botones ni siquiera
  se dibujan en la tabla para este rol).
- En **Eventos**: solo puede **consultar** (ver la lista); no ve el botón
  "Nuevo evento" ni los botones de Editar/Eliminar.

Cada controlador (`FamilyController.js`, `ChildController.js`,
`EventController.js`) consulta `puedeRealizarAccion()` en dos momentos:

1. **Al dibujar la tabla:** para decidir si imprime o no el botón de
   "Editar"/"Eliminar"/"Nuevo registro".
2. **Al manejar el clic:** como respaldo, por si el botón llegara a
   ejecutarse de otra forma, se vuelve a validar el permiso antes de abrir el
   formulario de edición o borrar el registro.

Esto sigue el mismo espíritu de "un solo lugar controla los permisos" que ya
tenía el proyecto, solo que ahora también a nivel de acciones y no solo de
rutas completas.

---

## 8. Cambios realizados en esta actualización

### 8.1. Nuevo rol: Trabajador Social

- Se agregó el rol `trabajador` en `src/utils/permissions.js`, con acceso a
  **Dashboard, Familias, NNA y Eventos** (el menú lateral se ajusta solo,
  porque `Menu.js` ya filtra las opciones según `permisosPorRol`).
- Se agregaron las reglas de solo-lectura/creación explicadas en el punto
  7.2 (`accionesBloqueadasPorRol` + `puedeRealizarAccion`).
- Se agregó un usuario de prueba en `src/data/db.json`
  (`trabajadorsocial@redcamino.org` / `12345`).
- El formulario de "Nuevo usuario" (`src/pages/administration/Users.js`) ya
  tenía la opción "Trabajador social" en el `<select>` de roles (`value=
  "trabajador"`), pero **antes de este cambio ese rol no estaba definido en
  `permissions.js`**, así que un usuario con ese rol se quedaba con el menú
  vacío y no podía usar el sistema. Esa es la vista que faltaba y que ahora
  ya está completa y funcional.

Con esto, un administrador puede ir a **Usuarios → Nuevo usuario**,
seleccionar el rol "Trabajador social", y esa persona podrá iniciar sesión y:
registrar familias, registrar NNA y consultar el calendario de eventos, sin
poder editar/eliminar nada ni entrar a Donaciones, Seguimiento, Usuarios o
Reportes.

### 8.2. Los formularios ya no "regresan al Dashboard" al crear un registro

Se revisó a fondo el flujo de creación en los **seis módulos con formularios**
(Familias, NNA, Eventos, Donaciones, Seguimiento y Usuarios). En el código no
había ningún `navegar("dashboard")` disparado al guardar; cada uno ya estaba
programado para, al crear o editar un registro: refrescar su propia tabla,
cerrar el modal y quedarse en la misma vista.

De todas formas, para blindar completamente ese comportamiento (y evitar que
algo así pudiera llegar a pasar por un envío nativo del formulario en algún
escenario límite, por ejemplo si el navegador dispara el envío por defecto
antes de que el JavaScript termine de engancharse), se hicieron dos ajustes
defensivos que aplican **a los 6 módulos por igual**, porque comparten los
mismos componentes base:

- `src/components/ui/Button.js`: el botón reutilizable (usado en "Nueva
  familia", "Nuevo registro" de NNA, "Nuevo evento", "Nueva donación",
  "Nuevo seguimiento" y "Nuevo usuario") ahora declara explícitamente
  `type="button"`. Antes no tenía tipo, y el valor por defecto de un
  `<button>` en HTML es `type="submit"`, lo cual — si alguna vez ese botón
  terminara dentro de un `<form>` — dispararía un envío nativo del
  formulario (recarga completa de la página). Al recargar, la aplicación
  vuelve a arrancar desde `main.js`, y como la sesión sigue activa en
  `localStorage`, el router te manda directo al Dashboard. Con
  `type="button"` explícito, eso deja de ser posible.
- `src/components/ui/Modal.js`: el botón para cerrar el modal (la "X") ahora
  también declara `type="button"` por la misma razón.

En resumen: **crear una familia, un NNA, un evento, una donación, un
seguimiento o un usuario nuevo te deja exactamente donde estabas**, con la
tabla actualizada y un mensaje de éxito (toast), nunca te manda al Dashboard.

### 8.3. Logo dejado en blanco (con un valor por defecto)

Antes, el logo era un ícono de Font Awesome
(`fa-solid fa-hands-holding-child`) tanto en el login como en el menú
lateral. Ahora ambos usan una imagen real:

- Se creó `src/assets/img/logo-placeholder.svg`: un logo neutro (un círculo
  con las iniciales "RCM") que sirve como valor por defecto.
- `src/components/navigation/Sidebar.js` y `src/pages/auth/Login.js` ahora
  importan esa imagen y la muestran dentro de un `<img>` (antes mostraban el
  ícono).
- Se ajustó el CSS (`sidebar.css` y `login.css`) para que la imagen se recorte
  en círculo y llene bien el espacio (`object-fit: cover`).

**Para poner tu logo real**, solo tienes que reemplazar el archivo
`src/assets/img/logo-placeholder.svg` por tu propia imagen (puede ser PNG,
JPG o SVG) **con el mismo nombre**, o bien:

1. Copia tu imagen a `src/assets/img/` (ej. `logo.png`).
2. En `Sidebar.js` y en `Login.js`, cambia la línea:
   ```js
   import logo from "../../assets/img/logo-placeholder.svg";
   ```
   por:
   ```js
   import logo from "../../assets/img/logo.png";
   ```

Se recomienda una imagen cuadrada (por ejemplo 200x200px) con fondo
transparente para que se vea bien dentro del círculo.

---

## 9. Limitaciones actuales y siguientes pasos recomendados

Este proyecto está pensado como una base sólida y ordenada, pero antes de
usarlo con datos reales de familias y menores conviene tener en cuenta:

- **json-server no es un backend de producción.** No tiene autenticación
  real, no valida quién puede escribir qué, y cualquiera con la URL puede
  leer o modificar `db.json`. Antes de producción, se debería reemplazar por
  una API real (Node/Express, Laravel, Django, etc.) con una base de datos
  (PostgreSQL/MySQL/Mongo) y autenticación con tokens (JWT) y contraseñas
  con hash (bcrypt).
- **Las contraseñas están en texto plano** dentro de `db.json`. Esto es
  aceptable solo para pruebas/demostración.
- **La validación de permisos vive solo en el frontend.** Como no hay
  backend real, alguien con conocimientos técnicos podría saltarse las
  restricciones llamando directamente a json-server. Con un backend real,
  los mismos permisos (`permissions.js`) se deberían **repetir en el
  servidor**, que es donde realmente hay que hacerlos cumplir.
- **No hay pruebas automatizadas (tests).** Se recomienda agregar pruebas
  (por ejemplo con Vitest) a medida que el proyecto crezca.

---

## 10. Guía rápida para extender el proyecto

- **Agregar una ruta/sección nueva:** crea su página en `src/pages/`, su
  controlador en `src/controllers/`, su servicio en `src/services/` (si
  necesita datos), regístrala en `src/router/routes.js` y en
  `src/router/router.js` (el `if (ruta === "...")`), y decide qué roles
  pueden verla en `src/utils/permissions.js` (y en `Menu.js` si necesitas un
  ícono/texto distinto en el menú).
- **Agregar un rol nuevo:** agrégalo en `permisosPorRol`
  (`permissions.js`) con la lista de rutas que puede ver, y si necesita
  restricciones de "solo puede crear pero no editar/eliminar" dentro de
  algún módulo, agrégalo también en `accionesBloqueadasPorRol` (mismo
  archivo). El menú lateral y el router se ajustan solos.
- **Agregar un campo a un formulario existente:** agrega el `<input>` en la
  página correspondiente (`src/pages/.../Archivo.js`), léelo en el
  controlador (`document.getElementById(...)`) dentro de la función
  `guardarX()`, y asegúrate de que el servicio lo envíe tal cual (los
  servicios ya mandan el objeto completo, no hace falta tocarlos).
>>>>>>> 280df765e7f5535d76cdf41e3963a143aaf6b39a
