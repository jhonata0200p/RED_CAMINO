-- DDL — Data Definition Language (CREATE TABLE)
-- =============================================================================
-- Red Camino María — esquema PostgreSQL
-- Tablas: profesional, vivienda, hogar, persona, nna_linea_base, nna_seguimiento, cat_*
-- Relaciones: hogar 1-1 vivienda | hogar 1-N persona | persona 0..1 nna_linea_base
-- =============================================================================
-- ---------------------------------------------------------------------------
-- 1. CATÁLOGOS (tablas cat_*)
-- ---------------------------------------------------------------------------

CREATE TABLE cat_sexo (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE cat_si_no (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(10) NOT NULL UNIQUE
);

CREATE TABLE cat_tipo_documento (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE cat_nacionalidad (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE cat_estado_civil (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE cat_nivel_educativo (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE cat_ocupacion (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE cat_tipo_trabajo (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE cat_departamento (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE cat_municipio (
  id SERIAL PRIMARY KEY,
  departamento_id INTEGER NOT NULL REFERENCES cat_departamento(id),
  nombre VARCHAR(100) NOT NULL,
  UNIQUE (departamento_id, nombre)
);

CREATE TABLE cat_sector_zona (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE cat_material_pared (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE cat_condicion_normalizacion (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE cat_condicion_general (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE cat_servicio_publico (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE cat_factor_afectacion (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE cat_factor_riesgo (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE cat_vulnerabilidad_hogar (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(150) NOT NULL UNIQUE
);

CREATE TABLE cat_prioridad_atencion (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(150) NOT NULL UNIQUE
);

CREATE TABLE cat_rol_hogar (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE cat_rol_sistema (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE cat_parentesco (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE cat_origen (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE cat_actividad_ultimo_mes (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE cat_escolaridad (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE cat_discapacidad (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE cat_grado_metodologia (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE cat_jornada (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE cat_estado_mes_seguimiento (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE cat_servicio_nna (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE cat_tipo_beca (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE cat_tipo_colegio (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE cat_tipo_poblacion (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE cat_tipo_vivienda (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(80) NOT NULL UNIQUE
);

CREATE TABLE cat_tiempo_vivienda (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(80) NOT NULL UNIQUE
);


-- ---------------------------------------------------------------------------
-- 2. TABLAS DE NEGOCIO
-- ---------------------------------------------------------------------------

-- Usuarios del sistema (login)
CREATE TABLE profesional (
  id SERIAL PRIMARY KEY,
  rol_sistema_id INTEGER NOT NULL REFERENCES cat_rol_sistema(id),
  nombres VARCHAR(100) NOT NULL,
  apellidos VARCHAR(100) NOT NULL,
  telefono VARCHAR(20),
  correo VARCHAR(150) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  estado BOOLEAN NOT NULL DEFAULT TRUE,
  fecha_registro TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Ubicación física del hogar
CREATE TABLE vivienda (
  id SERIAL PRIMARY KEY,
  departamento_id INTEGER NOT NULL REFERENCES cat_departamento(id),
  municipio_id INTEGER NOT NULL REFERENCES cat_municipio(id),
  sector_zona_id INTEGER REFERENCES cat_sector_zona(id),
  barrio VARCHAR(120) NOT NULL,
  direccion VARCHAR(200) NOT NULL,
  otra_referencia TEXT,
  condicion_normalizacion_id INTEGER REFERENCES cat_condicion_normalizacion(id),
  material_pared_id INTEGER REFERENCES cat_material_pared(id),
  condicion_general_id INTEGER REFERENCES cat_condicion_general(id),
  total_cuartos SMALLINT,
  cuartos_dormir SMALLINT,
  estado BOOLEAN NOT NULL DEFAULT TRUE,
  fecha_registro TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Servicios / factores / riesgos de la vivienda (checkboxes)
CREATE TABLE vivienda_servicio (
  vivienda_id INTEGER NOT NULL REFERENCES vivienda(id) ON DELETE CASCADE,
  servicio_id INTEGER NOT NULL REFERENCES cat_servicio_publico(id),
  tiene_servicio_id INTEGER NOT NULL REFERENCES cat_si_no(id),
  PRIMARY KEY (vivienda_id, servicio_id)
);

CREATE TABLE vivienda_afectacion (
  vivienda_id INTEGER NOT NULL REFERENCES vivienda(id) ON DELETE CASCADE,
  afectacion_id INTEGER NOT NULL REFERENCES cat_factor_afectacion(id),
  estado_id INTEGER NOT NULL DEFAULT 2 REFERENCES cat_si_no(id),
  PRIMARY KEY (vivienda_id, afectacion_id)
);

CREATE TABLE vivienda_riesgo (
  vivienda_id INTEGER NOT NULL REFERENCES vivienda(id) ON DELETE CASCADE,
  riesgo_id INTEGER NOT NULL REFERENCES cat_factor_riesgo(id),
  estado_id INTEGER NOT NULL DEFAULT 2 REFERENCES cat_si_no(id),
  PRIMARY KEY (vivienda_id, riesgo_id)
);

-- Familia / hogar
CREATE TABLE hogar (
  id SERIAL PRIMARY KEY,
  codigo VARCHAR(20) NOT NULL UNIQUE,
  fecha_visita DATE NOT NULL,
  profesional_id INTEGER NOT NULL REFERENCES profesional(id),
  vivienda_id INTEGER NOT NULL REFERENCES vivienda(id),
  hogares_vivienda SMALLINT,
  personas_vivienda SMALLINT,
  tiempo_vivienda VARCHAR(50),
  observaciones TEXT,
  estado BOOLEAN NOT NULL DEFAULT TRUE,
  fecha_registro TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  fecha_actualizacion TIMESTAMP
);

CREATE TABLE hogar_vulnerabilidad (
  hogar_id INTEGER NOT NULL REFERENCES hogar(id) ON DELETE CASCADE,
  vulnerabilidad_id INTEGER NOT NULL REFERENCES cat_vulnerabilidad_hogar(id),
  estado_id INTEGER NOT NULL DEFAULT 2 REFERENCES cat_si_no(id),
  PRIMARY KEY (hogar_id, vulnerabilidad_id)
);

CREATE TABLE hogar_prioridad (
  hogar_id INTEGER NOT NULL REFERENCES hogar(id) ON DELETE CASCADE,
  prioridad_id INTEGER NOT NULL REFERENCES cat_prioridad_atencion(id),
  estado_id INTEGER NOT NULL DEFAULT 2 REFERENCES cat_si_no(id),
  PRIMARY KEY (hogar_id, prioridad_id)
);

-- Personas del hogar (rol: 1 jefe, 2 cónyuge, 3 adulto, 4 NNA)
CREATE TABLE persona (
  id SERIAL PRIMARY KEY,
  hogar_id INTEGER NOT NULL REFERENCES hogar(id),
  rol_hogar_id INTEGER NOT NULL REFERENCES cat_rol_hogar(id),
  nombres VARCHAR(150) NOT NULL,
  tipo_documento_id INTEGER REFERENCES cat_tipo_documento(id),
  numero_documento VARCHAR(30),
  fecha_nacimiento DATE NOT NULL,
  sexo_id INTEGER REFERENCES cat_sexo(id),
  celular VARCHAR(20),
  correo VARCHAR(150),
  nacionalidad_id INTEGER REFERENCES cat_nacionalidad(id),
  nivel_educativo_id INTEGER REFERENCES cat_nivel_educativo(id),
  ocupacion_id INTEGER REFERENCES cat_ocupacion(id),
  tipo_trabajo_id INTEGER REFERENCES cat_tipo_trabajo(id),
  estado_civil_id INTEGER REFERENCES cat_estado_civil(id),
  pendiente_confirmacion BOOLEAN NOT NULL DEFAULT FALSE,
  estado BOOLEAN NOT NULL DEFAULT TRUE,
  fecha_registro TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE persona_adulto_detalle (
  id SERIAL PRIMARY KEY,
  persona_id INTEGER NOT NULL UNIQUE REFERENCES persona(id) ON DELETE CASCADE,
  parentesco_id INTEGER REFERENCES cat_parentesco(id),
  origen_id INTEGER REFERENCES cat_origen(id),
  actividad_id INTEGER REFERENCES cat_actividad_ultimo_mes(id),
  aporta_ingresos_id INTEGER REFERENCES cat_si_no(id)
);

CREATE TABLE persona_nna_detalle (
  id SERIAL PRIMARY KEY,
  persona_id INTEGER NOT NULL UNIQUE REFERENCES persona(id) ON DELETE CASCADE,
  escolaridad_id INTEGER NOT NULL REFERENCES cat_escolaridad(id),
  origen_id INTEGER REFERENCES cat_origen(id),
  es_hijo_jefe_id INTEGER REFERENCES cat_si_no(id),
  padres_viven_id INTEGER REFERENCES cat_si_no(id),
  discapacidad_id INTEGER REFERENCES cat_discapacidad(id),
  discapacidad_diagnosticada_id INTEGER REFERENCES cat_si_no(id)
);

-- NNA confirmado (línea base académica / salud)
CREATE TABLE nna_linea_base (
  id SERIAL PRIMARY KEY,
  persona_id INTEGER NOT NULL UNIQUE REFERENCES persona(id) ON DELETE CASCADE,
  discapacidad VARCHAR(100),
  neurodivergencia VARCHAR(100),
  tiene_diagnostico_id INTEGER REFERENCES cat_si_no(id),
  ano_ingreso INTEGER,
  grupo_validacion VARCHAR(100),
  plan_padrino VARCHAR(100),
  tipo_beca_id INTEGER REFERENCES cat_tipo_beca(id),
  estado_academico_inicial_fscm_id INTEGER REFERENCES cat_escolaridad(id),
  estado_academico_inicial_2026_id INTEGER REFERENCES cat_escolaridad(id),
  grado_metodologia_aspirante_id INTEGER REFERENCES cat_grado_metodologia(id),
  jornada_id INTEGER REFERENCES cat_jornada(id),
  observacion_academica TEXT,
  fecha_registro TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE nna_servicio_necesidad (
  nna_linea_base_id INTEGER NOT NULL REFERENCES nna_linea_base(id) ON DELETE CASCADE,
  servicio_nna_id INTEGER NOT NULL REFERENCES cat_servicio_nna(id),
  PRIMARY KEY (nna_linea_base_id, servicio_nna_id)
);

-- Seguimiento mensual
CREATE TABLE nna_seguimiento (
  id SERIAL PRIMARY KEY,
  persona_id INTEGER NOT NULL REFERENCES persona(id) ON DELETE CASCADE,
  profesional_id INTEGER NOT NULL REFERENCES profesional(id),
  ano INTEGER NOT NULL,
  mes VARCHAR(20) NOT NULL,
  estado_mes_id INTEGER REFERENCES cat_estado_mes_seguimiento(id),
  colegio_ied VARCHAR(150),
  grado_metodologia_id INTEGER REFERENCES cat_grado_metodologia(id),
  fecha_registro TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
