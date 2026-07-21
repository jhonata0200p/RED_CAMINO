-- DQL — Data Query Language (SELECT)
-- Ajusta secuencias SERIAL tras INSERT con id fijo

-- ---------------------------------------------------------------------------
-- 5. Ajustar secuencias SERIAL (tras inserts con id fijo)
-- ---------------------------------------------------------------------------

SELECT setval(pg_get_serial_sequence('cat_sexo', 'id'), (SELECT MAX(id) FROM cat_sexo));
SELECT setval(pg_get_serial_sequence('cat_si_no', 'id'), (SELECT MAX(id) FROM cat_si_no));
SELECT setval(pg_get_serial_sequence('cat_tipo_documento', 'id'), (SELECT MAX(id) FROM cat_tipo_documento));
SELECT setval(pg_get_serial_sequence('cat_nacionalidad', 'id'), (SELECT MAX(id) FROM cat_nacionalidad));
SELECT setval(pg_get_serial_sequence('cat_estado_civil', 'id'), (SELECT MAX(id) FROM cat_estado_civil));
SELECT setval(pg_get_serial_sequence('cat_nivel_educativo', 'id'), (SELECT MAX(id) FROM cat_nivel_educativo));
SELECT setval(pg_get_serial_sequence('cat_ocupacion', 'id'), (SELECT MAX(id) FROM cat_ocupacion));
SELECT setval(pg_get_serial_sequence('cat_tipo_trabajo', 'id'), (SELECT MAX(id) FROM cat_tipo_trabajo));
SELECT setval(pg_get_serial_sequence('cat_departamento', 'id'), (SELECT MAX(id) FROM cat_departamento));
SELECT setval(pg_get_serial_sequence('cat_municipio', 'id'), (SELECT MAX(id) FROM cat_municipio));
SELECT setval(pg_get_serial_sequence('cat_sector_zona', 'id'), (SELECT MAX(id) FROM cat_sector_zona));
SELECT setval(pg_get_serial_sequence('cat_material_pared', 'id'), (SELECT MAX(id) FROM cat_material_pared));
SELECT setval(pg_get_serial_sequence('cat_condicion_normalizacion', 'id'), (SELECT MAX(id) FROM cat_condicion_normalizacion));
SELECT setval(pg_get_serial_sequence('cat_condicion_general', 'id'), (SELECT MAX(id) FROM cat_condicion_general));
SELECT setval(pg_get_serial_sequence('cat_servicio_publico', 'id'), (SELECT MAX(id) FROM cat_servicio_publico));
SELECT setval(pg_get_serial_sequence('cat_factor_afectacion', 'id'), (SELECT MAX(id) FROM cat_factor_afectacion));
SELECT setval(pg_get_serial_sequence('cat_factor_riesgo', 'id'), (SELECT MAX(id) FROM cat_factor_riesgo));
SELECT setval(pg_get_serial_sequence('cat_vulnerabilidad_hogar', 'id'), (SELECT MAX(id) FROM cat_vulnerabilidad_hogar));
SELECT setval(pg_get_serial_sequence('cat_prioridad_atencion', 'id'), (SELECT MAX(id) FROM cat_prioridad_atencion));
SELECT setval(pg_get_serial_sequence('cat_rol_hogar', 'id'), (SELECT MAX(id) FROM cat_rol_hogar));
SELECT setval(pg_get_serial_sequence('cat_rol_sistema', 'id'), (SELECT MAX(id) FROM cat_rol_sistema));
SELECT setval(pg_get_serial_sequence('cat_parentesco', 'id'), (SELECT MAX(id) FROM cat_parentesco));
SELECT setval(pg_get_serial_sequence('cat_origen', 'id'), (SELECT MAX(id) FROM cat_origen));
SELECT setval(pg_get_serial_sequence('cat_actividad_ultimo_mes', 'id'), (SELECT MAX(id) FROM cat_actividad_ultimo_mes));
SELECT setval(pg_get_serial_sequence('cat_escolaridad', 'id'), (SELECT MAX(id) FROM cat_escolaridad));
SELECT setval(pg_get_serial_sequence('cat_discapacidad', 'id'), (SELECT MAX(id) FROM cat_discapacidad));
SELECT setval(pg_get_serial_sequence('cat_grado_metodologia', 'id'), (SELECT MAX(id) FROM cat_grado_metodologia));
SELECT setval(pg_get_serial_sequence('cat_jornada', 'id'), (SELECT MAX(id) FROM cat_jornada));
SELECT setval(pg_get_serial_sequence('cat_estado_mes_seguimiento', 'id'), (SELECT MAX(id) FROM cat_estado_mes_seguimiento));
SELECT setval(pg_get_serial_sequence('cat_servicio_nna', 'id'), (SELECT MAX(id) FROM cat_servicio_nna));
SELECT setval(pg_get_serial_sequence('cat_tipo_beca', 'id'), (SELECT MAX(id) FROM cat_tipo_beca));
SELECT setval(pg_get_serial_sequence('cat_tipo_colegio', 'id'), (SELECT MAX(id) FROM cat_tipo_colegio));
SELECT setval(pg_get_serial_sequence('cat_tipo_poblacion', 'id'), (SELECT MAX(id) FROM cat_tipo_poblacion));
SELECT setval(pg_get_serial_sequence('cat_tipo_vivienda', 'id'), (SELECT MAX(id) FROM cat_tipo_vivienda));
SELECT setval(pg_get_serial_sequence('cat_tiempo_vivienda', 'id'), (SELECT MAX(id) FROM cat_tiempo_vivienda));
SELECT setval(pg_get_serial_sequence('profesional', 'id'), (SELECT MAX(id) FROM profesional));

-- Fin del script
