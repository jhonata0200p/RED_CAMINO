-- =============================================================================
-- 1. CATÁLOGOS BASE INDEPENDIENTES
-- =============================================================================

CREATE TABLE cat_si_no(
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(2) UNIQUE NOT NULL
);

INSERT INTO cat_si_no(nombre) VALUES
('SI'),
('NO');

CREATE TABLE cat_rol_hogar(
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(50) UNIQUE NOT NULL
);

INSERT INTO cat_rol_hogar(nombre) VALUES
('Jefe de hogar'),
('Conyuge'),
('Adulto'),
('NNA');

CREATE TABLE cat_tipo_documento(
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) UNIQUE NOT NULL
);

INSERT INTO cat_tipo_documento(nombre) VALUES
('Tarjeta de identidad'),
('Cédula de ciudadanía'),
('Permiso por protección temporal'),
('Cédula de identidad venezolana'),
('Pasaporte');

CREATE TABLE cat_sexo(
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(20) UNIQUE NOT NULL
);

INSERT INTO cat_sexo(nombre) VALUES
('Masculino'),
('Femenino');

CREATE TABLE cat_nacionalidad(
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(50) UNIQUE NOT NULL
);

INSERT INTO cat_nacionalidad(nombre) VALUES
('Colombiana'),
('Venezolana'),
('Colombo-Venezolana'),
('Otra');

CREATE TABLE cat_nivel_educativo(
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(60) UNIQUE NOT NULL
);

INSERT INTO cat_nivel_educativo(nombre) VALUES
('Ninguno'),
('Primaria'),
('Secundaria'),
('TLC-T-T-U'),
('Otro');

CREATE TABLE cat_ocupacion(
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) UNIQUE NOT NULL
);

INSERT INTO cat_ocupacion(nombre) VALUES
('Trabajador informal'),
('Independiente'),
('Empleado'),
('Buscando empleo'),
('Oficios del hogar'),
('Otra');

CREATE TABLE cat_tipo_trabajo(
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(50) UNIQUE NOT NULL
);

INSERT INTO cat_tipo_trabajo(nombre) VALUES
('Trabajo permanente'),
('Trabajo ocasional');

CREATE TABLE cat_estado_civil(
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(50) UNIQUE NOT NULL
);

INSERT INTO cat_estado_civil(nombre) VALUES
('Casado/a'),
('Unión libre'),
('Soltero/a'),
('Viudo/a');

CREATE TABLE cat_tipo_poblacion(
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(40) UNIQUE NOT NULL
);

INSERT INTO cat_tipo_poblacion(nombre) VALUES
('NARP'),
('Indígena'),
('Rrom'),
('Campesino'),
('Ninguna');

CREATE TABLE cat_material_pared(
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) UNIQUE NOT NULL
);

INSERT INTO cat_material_pared(nombre) VALUES
('Block/Ladrillo'),
('Madera/Tabla'),
('Cartón/Plástico/Zinc'),
('Otro');

CREATE TABLE cat_condicion_normalizacion (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) UNIQUE NOT NULL
);

INSERT INTO cat_condicion_normalizacion(nombre) VALUES
('Zona normalizada'),
('Zona subnormal');

CREATE TABLE cat_condicion_general (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(50) UNIQUE NOT NULL
);

INSERT INTO cat_condicion_general(nombre) VALUES
('Buena'),
('Regular'),
('Mala');

CREATE TABLE cat_departamento (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) UNIQUE NOT NULL
);

INSERT INTO cat_departamento(nombre) VALUES
('Atlántico');

CREATE TABLE cat_municipio (
    id SERIAL PRIMARY KEY,
    departamento_id INTEGER NOT NULL REFERENCES cat_departamento(id),
    nombre VARCHAR(100) NOT NULL,
    UNIQUE(departamento_id, nombre)
);

INSERT INTO cat_municipio(departamento_id, nombre) VALUES
(1, 'Barranquilla'),
(1, 'Soledad'),
(1, 'Malambo');

CREATE TABLE cat_sector_zona (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) UNIQUE NOT NULL
);

INSERT INTO cat_sector_zona(nombre) VALUES
('Sur Occidente'),
('Sur Oriente'),
('Metropolitana'),
('Norte-Centro Histórico'),
('Riomar');

CREATE TABLE cat_servicio_publico (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) UNIQUE NOT NULL 
);

INSERT INTO cat_servicio_publico (nombre) VALUES 
('Energía Eléctrica'),
('Gas Natural'),
('Acueducto'),
('Alcantarillado'),
('Aseo Público'),
('Internet');

CREATE TABLE cat_factor_afectacion (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) UNIQUE NOT NULL 
);

INSERT INTO cat_factor_afectacion (nombre) VALUES 
('Humedad'),
('Malos Olores'),
('Polvo constante'),
('Plagas o vectores');

CREATE TABLE cat_factor_riesgo (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) UNIQUE NOT NULL 
);

INSERT INTO cat_factor_riesgo (nombre) VALUES 
('Riesgo de Inundación'),
('Riesgo de Deslizamiento'),
('Riesgo de Hundimiento'),
('Riesgo de Incendio');

CREATE TABLE cat_escolaridad (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(50) UNIQUE NOT NULL
);

INSERT INTO cat_escolaridad (nombre) VALUES
('Escolarizado'),
('No escolarizado'),
('Desescolarizado');

CREATE TABLE cat_origen (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(30) UNIQUE NOT NULL
);

INSERT INTO cat_origen (nombre) VALUES
('Nacional'),
('Extranjero');

CREATE TABLE cat_parentesco (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(50) UNIQUE NOT NULL
);

INSERT INTO cat_parentesco (nombre) VALUES
('Padre/madre'),
('Hermano(a)'),
('Hijo(a)'),
('Nieto(a)'),
('Suegro(a)'),
('Yerno/nuera'),
('Abuelo(a)'),
('Otro pariente'),
('No pariente');

CREATE TABLE cat_actividad_ultimo_mes (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) UNIQUE NOT NULL
);

INSERT INTO cat_actividad_ultimo_mes (nombre) VALUES
('Trabajar'),
('Buscar trabajo'),
('Estudiar'),
('Oficios del hogar'),
('Incapacitado permanente'),
('Otra actividad');

CREATE TABLE cat_vulnerabilidad_hogar (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(150) UNIQUE NOT NULL 
);

INSERT INTO cat_vulnerabilidad_hogar (nombre) VALUES 
('Víctima del conflicto armado'),
('Población migrante'),
('Pertenencia a comunidad LGBTIQ+'),
('Personas adultas sin afiliación a salud'),
('Niños, niñas o adolescentes (NNA) sin afiliación a salud'),
('Presencia de personas con discapacidad'),
('Casos de alertas en salud mental'),
('Integrantes que fuman dentro del hogar'),
('Riesgos evidentes de insalubridad'),
('Presencia de mujeres gestantes'),
('Gestantes sin controles prenatales al día');

CREATE TABLE cat_prioridad_atencion (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(150) UNIQUE NOT NULL
);

INSERT INTO cat_prioridad_atencion (nombre) VALUES 
('Educación para Niños'),
('Prevención de violencias en el hogar'),
('Apoyo psicosocial familiar'),
('Acceso a oportunidades de generación de ingresos'),
('Ayuda con trámites y articulación institucional');

CREATE TABLE cat_rol_sistema (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(50) UNIQUE NOT NULL
);

INSERT INTO cat_rol_sistema (nombre) VALUES
('Administrador'),
('Psicólogo'),
('Profesor');

CREATE TABLE cat_tipo_beca (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(50) UNIQUE NOT NULL
);

INSERT INTO cat_tipo_beca (nombre) VALUES 
('Beca Completa'), 
('Media Beca'), 
('Ninguna'), 
('Otro');

CREATE TABLE cat_estado_mes_seguimiento (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(50) UNIQUE NOT NULL
);

INSERT INTO cat_estado_mes_seguimiento (nombre) VALUES 
('Activo'), 
('Inasistente'), 
('Retirado'), 
('Egresado');

CREATE TABLE cat_jornada (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(50) UNIQUE NOT NULL
);

INSERT INTO cat_jornada (nombre) VALUES
('Mañana'),
('Tarde'),
('Noche');

CREATE TABLE cat_tipo_colegio (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) UNIQUE NOT NULL
);

INSERT INTO cat_tipo_colegio (nombre) VALUES
('Oficial'),
('Privado'),
('No aplica');

CREATE TABLE cat_grado_metodologia (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) UNIQUE NOT NULL
);

INSERT INTO cat_grado_metodologia (nombre) VALUES
('Grado tradicional'),
('Metodología flexible'),
('No aplica');

CREATE TABLE cat_discapacidad (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) UNIQUE NOT NULL
);

INSERT INTO cat_discapacidad (nombre) VALUES
('Auditiva'),
('Física'),
('Visual'),
('Sordoceguera'),
('Intelectual'),
('Psicosocial'),
('Múltiple'),
('Ninguna'),
('No aplica');

CREATE TABLE cat_servicio_nna (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) UNIQUE NOT NULL
);

INSERT INTO cat_servicio_nna (nombre) VALUES
('Trámite de documentos'),
('Activación ruta presuntivo'),
('Refuerzo alfabetización'),
('Acompañamiento académico'),
('Ruta escolar'),
('Comedor FSCM'),
('Comedor PAE'),
('Matrícula y seguro estudiantil'),
('Consecución cupo escolar IED');

-- =============================================================================
-- 2. TABLAS PRINCIPALES (ENTIDADES OPERATIVAS MAESTRAS)
-- =============================================================================

CREATE TABLE profesional (
    id SERIAL PRIMARY KEY,
    rol_sistema_id INTEGER NOT NULL REFERENCES cat_rol_sistema(id),
    nombres VARCHAR(100) NOT NULL,
    apellidos VARCHAR(100) NOT NULL,
    telefono VARCHAR(20),
    correo VARCHAR(150) UNIQUE NOT NULL, 
    password_hash VARCHAR(255) NOT NULL,  
    estado BOOLEAN NOT NULL DEFAULT TRUE,  
    fecha_registro TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

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

CREATE TABLE hogar (
    id SERIAL PRIMARY KEY,
    codigo VARCHAR(20) UNIQUE NOT NULL,
    fecha_visita DATE NOT NULL,
    profesional_id INTEGER NOT NULL REFERENCES profesional(id),
    vivienda_id INTEGER NOT NULL REFERENCES vivienda(id),
    hogares_vivienda SMALLINT,
    personas_vivienda SMALLINT,
    personas_hogar SMALLINT,
    personas_menores SMALLINT,
    tiempo_vivienda VARCHAR(50), 
    personas_aportan_ingresos SMALLINT,
    ingresos_suficientes_id INTEGER REFERENCES cat_si_no(id),
    tipo_poblacion_id INTEGER REFERENCES cat_tipo_poblacion(id),
    observaciones TEXT,
    estado BOOLEAN NOT NULL DEFAULT TRUE,
    fecha_registro TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion TIMESTAMP
);

-- =============================================================================
-- 3. TABLAS DE RELACIONES DE CARACTERIZACIÓN (VIVIENDA Y HOGAR)
-- =============================================================================

CREATE TABLE vivienda_servicio (
    vivienda_id INTEGER NOT NULL REFERENCES vivienda(id) ON DELETE CASCADE,
    servicio_id INTEGER NOT NULL REFERENCES cat_servicio_publico(id),
    tiene_servicio_id INTEGER NOT NULL REFERENCES cat_si_no(id),
    PRIMARY KEY (vivienda_id, servicio_id)
);

CREATE TABLE vivienda_afectacion (
    vivienda_id INTEGER NOT NULL REFERENCES vivienda(id) ON DELETE CASCADE,
    afectacion_id INTEGER NOT NULL REFERENCES cat_factor_afectacion(id),
    estado_id INTEGER NOT NULL REFERENCES cat_si_no(id) DEFAULT 2,
    PRIMARY KEY (vivienda_id, afectacion_id)
);

CREATE TABLE vivienda_riesgo (
    vivienda_id INTEGER NOT NULL REFERENCES vivienda(id) ON DELETE CASCADE,
    riesgo_id INTEGER NOT NULL REFERENCES cat_factor_riesgo(id),
    estado_id INTEGER NOT NULL REFERENCES cat_si_no(id) DEFAULT 2,
    PRIMARY KEY (vivienda_id, riesgo_id)
);

CREATE TABLE hogar_vulnerabilidad (
    hogar_id INTEGER NOT NULL REFERENCES hogar(id) ON DELETE CASCADE,
    vulnerabilidad_id INTEGER NOT NULL REFERENCES cat_vulnerabilidad_hogar(id),
    estado_id INTEGER NOT NULL REFERENCES cat_si_no(id) DEFAULT 2,
    PRIMARY KEY (hogar_id, vulnerabilidad_id)
);

CREATE TABLE hogar_prioridad (
    hogar_id INTEGER NOT NULL REFERENCES hogar(id) ON DELETE CASCADE,
    prioridad_id INTEGER NOT NULL REFERENCES cat_prioridad_atencion(id),
    estado_id INTEGER NOT NULL REFERENCES cat_si_no(id) DEFAULT 2,
    PRIMARY KEY (hogar_id, prioridad_id)
);

-- =============================================================================
-- 4. ENTIDADES DE PERSONAS (NÚCLEO FAMILIAR)
-- =============================================================================

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
    estado BOOLEAN NOT NULL DEFAULT TRUE,
    fecha_registro TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE persona_nna_detalle (
    id SERIAL PRIMARY KEY,
    persona_id INTEGER UNIQUE NOT NULL REFERENCES persona(id) ON DELETE CASCADE,
    escolaridad_id INTEGER NOT NULL REFERENCES cat_escolaridad(id),
    origen_id INTEGER REFERENCES cat_origen(id),
    es_hijo_jefe_id INTEGER REFERENCES cat_si_no(id), 
    padres_viven_id INTEGER REFERENCES cat_si_no(id),
    discapacidad_id INTEGER REFERENCES cat_discapacidad(id),
    discapacidad_diagnosticada_id INTEGER REFERENCES cat_si_no(id);
);

CREATE TABLE persona_adulto_detalle (
    id SERIAL PRIMARY KEY,
    persona_id INTEGER UNIQUE NOT NULL REFERENCES persona(id) ON DELETE CASCADE,
    parentesco_id INTEGER REFERENCES cat_parentesco(id),
    origen_id INTEGER REFERENCES cat_origen(id),
    actividad_id INTEGER REFERENCES cat_actividad_ultimo_mes(id),
    aporta_ingresos_id INTEGER REFERENCES cat_si_no(id)
);

-- =============================================================================
-- 5. LÍNEA BASE Y SEGUIMIENTO ESPECÍFICO DEL MENOR (NNA)
-- =============================================================================

CREATE TABLE nna_linea_base (
    id SERIAL PRIMARY KEY,
    persona_id INTEGER UNIQUE NOT NULL REFERENCES persona(id) ON DELETE CASCADE,
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

CREATE TABLE nna_seguimiento (
    id SERIAL PRIMARY KEY,
    persona_id INTEGER NOT NULL REFERENCES persona(id) ON DELETE CASCADE,
    profesional_id INTEGER NOT NULL REFERENCES profesional(id), 
    ano INTEGER NOT NULL,
    mes VARCHAR(20) NOT NULL, 
    estado_mes_id INTEGER REFERENCES cat_estado_mes_seguimiento(id),
    colegio_ied VARCHAR(150),
    tipo_colegio VARCHAR(100),       
    grado_metodologia VARCHAR(100),   
    asistencia_trimestre VARCHAR(100), 
    tipo_egreso VARCHAR(100),
    tipo_colegio_id INTEGER REFERENCES cat_tipo_colegio(id),
    grado_metodologia_id INTEGER REFERENCES cat_grado_metodologia(id),
    fecha_registro TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);