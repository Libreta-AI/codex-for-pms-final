# Rook · Dispatch Observatory

Dashboard bilingüe (English / Español) para el caso ficticio de Rook del curso Codex for PMs. Implementa el PRD de Module 3 como una aplicación estática de consulta.

## Datos

- Instantánea histórica de 1.696 eventos de ping: 29 junio–6 septiembre 2026.
- 16 alias; 159 filas observadas respondedor-semana.
- Métricas calculadas desde los eventos incluidos; sin conexión automática a producción.
- Texto de la investigación y PRD en `dist/docs/`; CSV original en `dist/source-rows.csv`.
- La zona específica de los timestamps locales y la completitud de origen no están confirmadas.

## Ejecutar y comprobar

Desde este directorio:

```sh
python3 -m http.server 8765 --bind 127.0.0.1 --directory dist
node --test tests/metrics.test.cjs
```

Abrir `http://127.0.0.1:8765`. Sin dependencias ni compilación. `dist/` contiene la versión que se publica con acceso privado en Sites; `.openai/hosting.json` conserva su identidad. No incluir credenciales en archivos.

## Alcance

Comparación de periodos, evolución semanal, distribución por alias, filtros, detalle, exportación de evidencia y metodología. La preferencia de idioma se guarda solo en el navegador del visitante. Los datos fuente y cálculos no cambian al cambiar de idioma.

El sistema no modifica routing, disponibilidad ni perfiles, y no demuestra causalidad del lanzamiento. Las confirmaciones de Ravi, Wen, Marcus, Nadia y Helen siguen pendientes según los informes.
