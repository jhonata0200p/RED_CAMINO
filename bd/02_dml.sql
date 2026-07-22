-- DML — Data Manipulation Language (INSERT)
-- Datos iniciales: catálogos (ids fijos) + usuarios de prueba (password: 123456)

-- ---------------------------------------------------------------------------
-- 3. DATOS INICIALES — catálogos (ids fijos: el frontend/backend los usa)
-- ---------------------------------------------------------------------------

INSERT INTO cat_sexo (id, nombre) VALUES
  (1, 'Masculino'),
  (2, 'Femenino');

INSERT INTO cat_si_no (id, nombre) VALUES
  (1, 'SI'),
  (2, 'NO');

INSERT INTO cat_tipo_documento (id, nombre) VALUES
  (1, 'Tarjeta de identidad'),
  (2, 'Cédula de ciudadanía'),
  (3, 'Permiso por protección temporal'),
  (4, 'Cédula de identidad venezolana'),
  (5, 'Pasaporte');

INSERT INTO cat_nacionalidad (id, nombre) VALUES
  (1, 'Colombiana'),
  (2, 'Venezolana'),
  (3, 'Colombo-Venezolana'),
  (4, 'Otra');

INSERT INTO cat_estado_civil (id, nombre) VALUES
  (1, 'Casado/a'),
  (2, 'Unión libre'),
  (3, 'Soltero/a'),
  (4, 'Viudo/a');

INSERT INTO cat_nivel_educativo (id, nombre) VALUES
  (1, 'Ninguno'),
  (2, 'Primaria'),
  (3, 'Secundaria'),
  (4, 'TLC-T-T-U'),
  (5, 'Otro');

INSERT INTO cat_ocupacion (id, nombre) VALUES
  (1, 'Trabajador informal'),
  (2, 'Independiente'),
  (3, 'Empleado'),
  (4, 'Buscando empleo'),
  (5, 'Oficios del hogar'),
  (6, 'Otra');

INSERT INTO cat_tipo_trabajo (id, nombre) VALUES
  (1, 'Trabajo permanente'),
  (2, 'Trabajo ocasional');

INSERT INTO cat_departamento (id, nombre) VALUES
  (1, 'Atlántico');

INSERT INTO cat_municipio (id, departamento_id, nombre) VALUES
  (1, 1, 'Barranquilla'),
  (2, 1, 'Soledad'),
  (3, 1, 'Malambo');

INSERT INTO cat_sector_zona (id, nombre) VALUES
  (1, 'Sur Occidente'),
  (2, 'Sur Oriente'),
  (3, 'Metropolitana'),
  (4, 'Norte-Centro Histórico'),
  (5, 'Riomar');

INSERT INTO cat_material_pared (id, nombre) VALUES
  (1, 'Block/Ladrillo'),
  (2, 'Madera/Tabla'),
  (3, 'Cartón/Plástico/Zinc'),
  (4, 'Otro');

INSERT INTO cat_condicion_normalizacion (id, nombre) VALUES
  (1, 'Zona normalizada'),
  (2, 'Zona subnormal');

INSERT INTO cat_condicion_general (id, nombre) VALUES
  (1, 'Buena'),
  (2, 'Regular'),
  (3, 'Mala');

INSERT INTO cat_servicio_publico (id, nombre) VALUES
  (1, 'Energía Eléctrica'),
  (2, 'Gas Natural'),
  (3, 'Acueducto'),
  (4, 'Alcantarillado'),
  (5, 'Aseo Público'),
  (6, 'Internet');

INSERT INTO cat_factor_afectacion (id, nombre) VALUES
  (1, 'Humedad'),
  (2, 'Malos Olores'),
  (3, 'Polvo constante'),
  (4, 'Plagas o vectores');

INSERT INTO cat_factor_riesgo (id, nombre) VALUES
  (1, 'Riesgo de Inundación'),
  (2, 'Riesgo de Deslizamiento'),
  (3, 'Riesgo de Hundimiento'),
  (4, 'Riesgo de Incendio');

INSERT INTO cat_vulnerabilidad_hogar (id, nombre) VALUES
  (1, 'Víctima del conflicto armado'),
  (2, 'Población migrante'),
  (3, 'Pertenencia a comunidad LGBTIQ+'),
  (4, 'Personas adultas sin afiliación a salud'),
  (5, 'Niños, niñas o adolescentes (NNA) sin afiliación a salud'),
  (6, 'Presencia de personas con discapacidad'),
  (7, 'Casos de alertas en salud mental'),
  (8, 'Integrantes que fuman dentro del hogar'),
  (9, 'Riesgos evidentes de insalubridad'),
  (10, 'Presencia de mujeres gestantes'),
  (11, 'Gestantes sin controles prenatales al día');

INSERT INTO cat_prioridad_atencion (id, nombre) VALUES
  (1, 'Educación para Niños'),
  (2, 'Prevención de violencias en el hogar'),
  (3, 'Apoyo psicosocial familiar'),
  (4, 'Acceso a oportunidades de generación de ingresos'),
  (5, 'Ayuda con trámites y articulación institucional');

INSERT INTO cat_rol_hogar (id, nombre) VALUES
  (1, 'Jefe de hogar'),
  (2, 'Conyuge'),
  (3, 'Adulto'),
  (4, 'NNA');

INSERT INTO cat_rol_sistema (id, nombre) VALUES
  (1, 'Administrador'),
  (2, 'Psicólogo'),
  (3, 'Profesor');

INSERT INTO cat_parentesco (id, nombre) VALUES
  (1, 'Padre/madre'),
  (2, 'Hermano(a)'),
  (3, 'Hijo(a)'),
  (4, 'Nieto(a)'),
  (5, 'Suegro(a)'),
  (6, 'Yerno/nuera'),
  (7, 'Abuelo(a)'),
  (8, 'Otro pariente'),
  (9, 'No pariente');

INSERT INTO cat_origen (id, nombre) VALUES
  (1, 'Nacional'),
  (2, 'Extranjero');

INSERT INTO cat_actividad_ultimo_mes (id, nombre) VALUES
  (1, 'Trabajar'),
  (2, 'Buscar trabajo'),
  (3, 'Estudiar'),
  (4, 'Oficios del hogar'),
  (5, 'Incapacitado permanente'),
  (6, 'Otra actividad');

INSERT INTO cat_escolaridad (id, nombre) VALUES
  (1, 'Escolarizado'),
  (2, 'No escolarizado'),
  (3, 'Desescolarizado');

INSERT INTO cat_discapacidad (id, nombre) VALUES
  (1, 'Auditiva'),
  (2, 'Física'),
  (3, 'Visual'),
  (4, 'Sordoceguera'),
  (5, 'Intelectual'),
  (6, 'Psicosocial'),
  (7, 'Múltiple'),
  (8, 'Ninguna'),
  (9, 'No aplica');

INSERT INTO cat_grado_metodologia (id, nombre) VALUES
  (1, 'Preescolar'),
  (2, '1°'),
  (3, '2°'),
  (4, '3°'),
  (5, '4°'),
  (6, '5°'),
  (7, '6°'),
  (8, '7°'),
  (9, '8°'),
  (10, '9°'),
  (11, '10°'),
  (12, '11°'),
  (13, 'Aceleración'),
  (14, 'Metodología flexible'),
  (15, 'Otro');

INSERT INTO cat_jornada (id, nombre) VALUES
  (1, 'Mañana'),
  (2, 'Tarde'),
  (3, 'Noche');

INSERT INTO cat_estado_mes_seguimiento (id, nombre) VALUES
  (1, 'Activo'),
  (2, 'Inactivo'),
  (3, 'Egresado');

INSERT INTO cat_servicio_nna (id, nombre) VALUES
  (1, 'Trámite de documentos'),
  (2, 'Activación ruta presuntivo'),
  (3, 'Refuerzo alfabetización'),
  (4, 'Acompañamiento académico'),
  (5, 'Ruta escolar'),
  (6, 'Comedor FSCM'),
  (7, 'Comedor PAE'),
  (8, 'Matrícula y seguro estudiantil'),
  (9, 'Consecución cupo escolar IED');

INSERT INTO cat_tipo_beca (id, nombre) VALUES
  (1, 'Beca Completa'),
  (2, 'Media Beca'),
  (3, 'Ninguna'),
  (4, 'Otro');

INSERT INTO cat_tipo_colegio (id, nombre) VALUES
  (1, 'Oficial'),
  (2, 'Privado'),
  (3, 'No aplica');

INSERT INTO cat_tipo_poblacion (id, nombre) VALUES
  (1, 'NARP'),
  (2, 'Indígena'),
  (3, 'Rrom'),
  (4, 'Campesino'),
  (5, 'Ninguna');

INSERT INTO cat_tipo_vivienda (id, nombre) VALUES
  (1, 'Casa'),
  (2, 'Apartamento'),
  (3, 'Habitación'),
  (4, 'Otro');

INSERT INTO cat_tiempo_vivienda (id, nombre) VALUES
  (1, '0 a 6 meses'),
  (2, '7 a 12 meses'),
  (3, '1 a 2 años'),
  (4, '2 a 3 años'),
  (5, '3 años o más');


-- ---------------------------------------------------------------------------
-- 4. USUARIOS DE PRUEBA (password en texto plano: 123456)
-- ---------------------------------------------------------------------------

INSERT INTO profesional (id, rol_sistema_id, nombres, apellidos, telefono, correo, password, estado) VALUES
  (1, 1, 'Admin', 'Sistema', '3000000001', 'admin@redcamino.org', '123456', TRUE),
  (2, 2, 'Camilo', 'Álvarez', '3126137561', 'psicologo@redcamino.org', '123456', TRUE),
  (3, 3, 'Laura', 'Mendoza', '3114156872', 'profesor@redcamino.org', '123456', TRUE);
