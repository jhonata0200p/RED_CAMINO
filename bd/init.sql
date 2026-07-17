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
    discapacidad_diagnosticada_id INTEGER REFERENCES cat_si_no(id)
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
    asistencia_trimestre VARCHAR(100), 
    tipo_egreso VARCHAR(100),
    tipo_colegio_id INTEGER REFERENCES cat_tipo_colegio(id),
    grado_metodologia_id INTEGER REFERENCES cat_grado_metodologia(id),
    fecha_registro TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);


-- =============================================================================
-- DATOS DE PRUEBA - CARACTERIZACIÓN DE HOGARES
-- =============================================================================

-- =============================================================================
-- 1. PROFESIONALES (2 profesionales)
-- =============================================================================

INSERT INTO profesional (rol_sistema_id, nombres, apellidos, telefono, correo, password_hash) VALUES
(2, 'Camilo', 'Álvarez', '3126137561', 'camilo.alvarez@camino.org', 'hash123456'),
(2, 'Laura', 'Mendoza', '3114156872', 'laura.mendoza@camino.org', 'hash789012');


-- =============================================================================
-- 2. VIVIENDAS (2 viviendas)
-- =============================================================================

INSERT INTO vivienda (
    departamento_id, municipio_id, sector_zona_id, barrio, direccion, otra_referencia,
    condicion_normalizacion_id, material_pared_id, condicion_general_id,
    total_cuartos, cuartos_dormir
) VALUES
(
    1, 2, 1, 'SAN FELIPE', 'CALLE 70C #24B-07', 'CASA DOS PISOS, REJAS NEGRAS',
    1, 1, 2, 3, 3
),
(
    1, 2, 2, 'LA FLORIDA', 'CARRERA 15 #45-12', 'APARTAMENTO 301, EDIFICIO BLANCO',
    1, 1, 1, 4, 3
);


-- =============================================================================
-- 3. HOGARES (2 hogares)
-- =============================================================================

INSERT INTO hogar (
    codigo, fecha_visita, profesional_id, vivienda_id,
    hogares_vivienda, personas_vivienda, personas_hogar, personas_menores,
    tiempo_vivienda, personas_aportan_ingresos, ingresos_suficientes_id,
    tipo_poblacion_id, observaciones
) VALUES
(
    '26-001', '2026-07-13', 1, 1,
    2, 8, 5, 4,
    '1 a 2 años', 3, 1,
    5, 'Familia en proceso de regularización'
),
(
    '26-002', '2026-07-14', 2, 2,
    1, 4, 4, 2,
    '3 años o más', 2, 1,
    5, 'Hogar monoparental'
);


-- =============================================================================
-- 4. PERSONAS (7 personas en total)
-- =============================================================================

-- 4.1 Hogar 26-001 (5 personas)
INSERT INTO persona (
    hogar_id, rol_hogar_id, nombres, tipo_documento_id, numero_documento,
    fecha_nacimiento, sexo_id, celular, correo, nacionalidad_id,
    nivel_educativo_id, ocupacion_id, tipo_trabajo_id, estado_civil_id
) VALUES
-- Jefe de hogar
(1, 1, 'LEANDRO SANCHEZ', 2, '12345678', '1994-05-15', 1, '3126137561', 'leandro@gmail.com', 1, 3, 1, 1, 2),
-- Cónyuge
(1, 2, 'ALEJANDRA ESTRADA', 2, '87654321', '1998-03-22', 2, '3114156872', 'alejandra@gmail.com', 1, 4, 3, 1, 2),
-- Adulto 1 (Hermano del jefe)
(1, 3, 'CARLOS SANCHEZ', 1, '98765432', '2000-11-10', 1, '3001234567', 'carlos@gmail.com', 1, 2, 4, NULL, 1),
-- NNA 1 (Hijo)
(1, 4, 'SANTIAGO SANCHEZ', 5, '123456789', '2015-07-20', 1, NULL, NULL, 1, NULL, NULL, NULL, NULL),
-- NNA 2 (Hija)
(1, 4, 'VALENTINA SANCHEZ', 5, '987654321', '2018-09-12', 2, NULL, NULL, 1, NULL, NULL, NULL, NULL);

-- 4.2 Hogar 26-002 (2 personas)
INSERT INTO persona (
    hogar_id, rol_hogar_id, nombres, tipo_documento_id, numero_documento,
    fecha_nacimiento, sexo_id, celular, correo, nacionalidad_id,
    nivel_educativo_id, ocupacion_id, tipo_trabajo_id, estado_civil_id
) VALUES
-- Jefa de hogar (madre soltera)
(2, 1, 'MARIA FERNANDEZ', 2, '56781234', '1990-08-05', 2, '3204567890', 'maria@gmail.com', 1, 2, 3, 1, 3),
-- NNA (Hijo)
(2, 4, 'JOSE FERNANDEZ', 5, '456789123', '2016-02-28', 1, NULL, NULL, 1, NULL, NULL, NULL, NULL);


-- =============================================================================
-- 5. DETALLES DE PERSONAS
-- =============================================================================

-- 5.1 Detalles NNA (3 niños)
INSERT INTO persona_nna_detalle (
    persona_id, escolaridad_id, origen_id, es_hijo_jefe_id, padres_viven_id,
    discapacidad_id, discapacidad_diagnosticada_id
) VALUES
-- Santiago (persona_id = 4)
(4, 1, 1, 1, 1, 8, 2),
-- Valentina (persona_id = 5)
(5, 1, 1, 1, 1, 8, 2),
-- José (persona_id = 7)
(7, 1, 1, 1, 1, 8, 2);

-- 5.2 Detalles Adultos (4 adultos)
INSERT INTO persona_adulto_detalle (
    persona_id, parentesco_id, origen_id, actividad_id, aporta_ingresos_id
) VALUES
-- Leandro (persona_id = 1)
(1, NULL, 1, 1, 1),
-- Alejandra (persona_id = 2)
(2, NULL, 1, 1, 1),
-- Carlos (persona_id = 3)
(3, 2, 1, 1, 1),
-- Maria (persona_id = 6)
(6, NULL, 1, 1, 1);


-- =============================================================================
-- 6. NNA LÍNEA BASE (3 niños)
-- =============================================================================

INSERT INTO nna_linea_base (
    persona_id, discapacidad, neurodivergencia, tiene_diagnostico_id,
    ano_ingreso, grupo_validacion, plan_padrino, tipo_beca_id,
    estado_academico_inicial_fscm_id, estado_academico_inicial_2026_id,
    grado_metodologia_aspirante_id, jornada_id, observacion_academica
) VALUES
-- Santiago (persona_id = 4)
(
    4, 'Ninguna', 'TDAH', 2,
    2026, 'Grupo A', 'Padrino FSCM', 1,
    2, 1, 1, 1, 'Requiere apoyo en matemáticas'
),
-- Valentina (persona_id = 5)
(
    5, 'Ninguna', NULL, 2,
    2026, 'Grupo A', 'Padrino FSCM', 1,
    3, 1, 1, 1, 'Buena estudiante'
),
-- José (persona_id = 7)
(
    7, 'Ninguna', NULL, 2,
    2026, 'Grupo B', NULL, 3,
    1, 1, 1, 1, 'Ingreso reciente'
);


-- =============================================================================
-- 7. SERVICIOS NNA (many-to-many)
-- =============================================================================

-- Santiago (nna_linea_base_id = 1) necesita 3 servicios
INSERT INTO nna_servicio_necesidad (nna_linea_base_id, servicio_nna_id) VALUES
(1, 1),  -- Trámite de documentos
(1, 3),  -- Refuerzo alfabetización
(1, 6);  -- Comedor FSCM

-- Valentina (nna_linea_base_id = 2) necesita 2 servicios
INSERT INTO nna_servicio_necesidad (nna_linea_base_id, servicio_nna_id) VALUES
(2, 4),  -- Acompañamiento académico
(2, 7);  -- Comedor PAE

-- José (nna_linea_base_id = 3) necesita 1 servicio
INSERT INTO nna_servicio_necesidad (nna_linea_base_id, servicio_nna_id) VALUES
(3, 8);  -- Matrícula y seguro estudiantil


-- =============================================================================
-- 8. SEGUIMIENTO NNA (3 meses de seguimiento para cada niño)
-- =============================================================================

-- Santiago (persona_id = 4) - Seguimiento Marzo, Abril, Mayo 2026
INSERT INTO nna_seguimiento (
    persona_id, profesional_id, ano, mes, estado_mes_id,
    colegio_ied, tipo_colegio_id, grado_metodologia_id, asistencia_trimestre
) VALUES
(4, 1, 2026, 'Marzo', 1, 'IED LAS MERCEDES SAN PABLO', 1, 1, 'TRIMESTRE 1: INASISTENTE'),
(4, 1, 2026, 'Abril', 1, 'IED LAS MERCEDES SAN PABLO', 1, 1, 'TRIMESTRE 1: ACTIVO'),
(4, 1, 2026, 'Mayo', 1, 'IED LAS MERCEDES SAN PABLO', 1, 1, 'TRIMESTRE 1: ACTIVO');

-- Valentina (persona_id = 5) - Seguimiento Marzo, Abril, Mayo 2026
INSERT INTO nna_seguimiento (
    persona_id, profesional_id, ano, mes, estado_mes_id,
    colegio_ied, tipo_colegio_id, grado_metodologia_id, asistencia_trimestre
) VALUES
(5, 2, 2026, 'Marzo', 1, 'IED LA FLORIDA', 1, 2, 'TRIMESTRE 1: ACTIVO'),
(5, 2, 2026, 'Abril', 1, 'IED LA FLORIDA', 1, 2, 'TRIMESTRE 1: ACTIVO'),
(5, 2, 2026, 'Mayo', 1, 'IED LA FLORIDA', 1, 2, 'TRIMESTRE 1: ACTIVO');

-- José (persona_id = 7) - Seguimiento Marzo, Abril 2026
INSERT INTO nna_seguimiento (
    persona_id, profesional_id, ano, mes, estado_mes_id,
    colegio_ied, tipo_colegio_id, grado_metodologia_id, asistencia_trimestre
) VALUES
(7, 2, 2026, 'Marzo', 1, 'IED EL PROGRESO', 1, 1, 'TRIMESTRE 1: ACTIVO'),
(7, 2, 2026, 'Abril', 1, 'IED EL PROGRESO', 1, 1, 'TRIMESTRE 1: ACTIVO');


-- =============================================================================
-- 9. SERVICIOS DE VIVIENDA
-- =============================================================================

-- Vivienda 1 (id = 1)
INSERT INTO vivienda_servicio (vivienda_id, servicio_id, tiene_servicio_id) VALUES
(1, 1, 1),  -- Energía Eléctrica: SI
(1, 2, 1),  -- Gas Natural: SI
(1, 3, 1),  -- Acueducto: SI
(1, 4, 2),  -- Alcantarillado: NO
(1, 5, 1),  -- Aseo Público: SI
(1, 6, 2);  -- Internet: NO

-- Vivienda 2 (id = 2)
INSERT INTO vivienda_servicio (vivienda_id, servicio_id, tiene_servicio_id) VALUES
(2, 1, 1),  -- Energía Eléctrica: SI
(2, 2, 2),  -- Gas Natural: NO
(2, 3, 1),  -- Acueducto: SI
(2, 4, 1),  -- Alcantarillado: SI
(2, 5, 1),  -- Aseo Público: SI
(2, 6, 1);  -- Internet: SI


-- =============================================================================
-- 10. FACTORES DE AFECTACIÓN
-- =============================================================================

-- Vivienda 1: Plagas
INSERT INTO vivienda_afectacion (vivienda_id, afectacion_id, estado_id) VALUES
(1, 4, 1);  -- Plagas o vectores: SI

-- Vivienda 2: Sin afectaciones


-- =============================================================================
-- 11. FACTORES DE RIESGO
-- =============================================================================

-- Vivienda 1: Sin riesgos

-- Vivienda 2: Riesgo de Inundación
INSERT INTO vivienda_riesgo (vivienda_id, riesgo_id, estado_id) VALUES
(2, 1, 1);  -- Riesgo de Inundación: SI


-- =============================================================================
-- 12. VULNERABILIDADES DEL HOGAR
-- =============================================================================

-- Hogar 1 (26-001): Víctimas + Personas 18+ sin salud
INSERT INTO hogar_vulnerabilidad (hogar_id, vulnerabilidad_id, estado_id) VALUES
(1, 1, 1),  -- Víctima del conflicto armado: SI
(1, 4, 1);  -- Personas adultas sin afiliación a salud: SI

-- Hogar 2 (26-002): Migrante + NNA sin salud
INSERT INTO hogar_vulnerabilidad (hogar_id, vulnerabilidad_id, estado_id) VALUES
(2, 2, 1),  -- Población migrante: SI
(2, 5, 1);  -- NNA sin afiliación a salud: SI


-- =============================================================================
-- 13. PRIORIDADES DE ATENCIÓN
-- =============================================================================

-- Hogar 1: Educación + Apoyo psicosocial
INSERT INTO hogar_prioridad (hogar_id, prioridad_id, estado_id) VALUES
(1, 1, 1),  -- Educación para Niños: SI
(1, 3, 1);  -- Apoyo psicosocial familiar: SI

-- Hogar 2: Prevención de violencias + Ayuda trámites
INSERT INTO hogar_prioridad (hogar_id, prioridad_id, estado_id) VALUES
(2, 2, 1),  -- Prevención de violencias en el hogar: SI
(2, 5, 1);  -- Ayuda con trámites y articulación institucional: SI