# Procedencia de los datos y cálculo

Instantánea histórica del caso ficticio Rook Industries, extraída el **3 de noviembre de 2026** mediante el conector Rook Database. No es información en vivo ni una confirmación de exhaustividad del origen.

## Extracción

Se recuperaron **1.696 eventos** sin truncamiento en dos páginas de **1.000 y 696 filas**. Se usó el mismo orden estable en ambas. Las comprobaciones previas y la prueba de integridad no encontraron tuplas exactas repetidas; el esquema no expone un ID único de ping.

```sql
SELECT callout_number, responder, sent_at, outcome
FROM rook.pings
WHERE sent_at >= TIMESTAMP '2026-06-01'
ORDER BY sent_at, callout_number, responder, outcome
LIMIT 1000 OFFSET 0;
```

La segunda consulta usa `OFFSET 1000`; el resto es idéntico. No se sumaron páginas de consultas con órdenes diferentes.

Los eventos observados cubren **29 junio–6 septiembre de 2026**, con **16 alias**, **1.222 taken**, **339 turned down** y **135 missed**. La agregación por respondedor y semana devuelve las **159 filas** de la consulta original. Farlight no tiene eventos en la semana del 31 de agosto; una matriz puede completar esa celda con cero observado, distinguiéndola de una fila original. No debe rellenar fuera de cobertura con cero.

La tabla declara `sent_at` como timestamp local sin zona. El conector lo serializa con `Z`; para conservar la semántica documentada, `data.js` guarda el mismo texto de fecha/hora sin ese sufijo, **sin desplazar la hora**. El código filtra por los primeros diez caracteres (fecha local). Usa aritmética UTC únicamente sobre fechas de calendario para encontrar lunes y contar días; no convierte horas de eventos a UTC.

Se incluyeron además diez totales semanales de demanda, **1.319 callouts** en total:

```sql
SELECT date_trunc('week', happened_at)::date AS week_start,
       COUNT(*) AS callouts
FROM rook.callouts
WHERE happened_at >= TIMESTAMP '2026-06-01'
GROUP BY 1 ORDER BY 1;
```

`happened_at` y `sent_at` son momentos diferentes. Los callouts no son el denominador de la tasa de aceptación de pings.

## Métodos

- Las tasas dividen conteos del mismo alcance. No se promedian tasas individuales.
- Rangos de fecha inclusivos en ambos extremos, de días completos.
- Semana: lunes a domingo. La semana del 10 de agosto atraviesa la fecha de lanzamiento.
- Ventanas iguales: 20 jul–9 ago y 17 ago–6 sep; resultados 398/518 y 332/485.
- Corte por fecha: 29 jun–11 ago y 12 ago–6 sep; resultados 831/1.085 y 391/611. El corte a medianoche es provisional, no una hora de despliegue confirmada.
- Todas las semanas completas: 29 jun–9 ago y 17 ago–6 sep; resultados 794/1.034 y 332/485.
- Pings/semana: conteo × 7 / días calendario de la ventana. La duración no se calcula entre el primer y último evento.
- Si no hay pings, las tasas son `null` y la interfaz debe mostrar No aplica / Not applicable, no 0 %.
- Un resultado inesperado cuenta como evento y como desconocido; no se reclasifica como missed.
- La ausencia de eventos no demuestra indisponibilidad, inelegibilidad ni fallo de notificaciones. Los resultados son descriptivos; no identifican una causa.

## Verificación reproducible

Ejecutar desde esta carpeta:

```sh
node tests/metrics.test.cjs
```

La prueba valida totales, presets, la separación del 10–11 y 12–16 de agosto, el cero de Farlight, filtros por alias, denominadores vacíos, resultados desconocidos, fechas y la cohorte de cuatro respondedores (149→25 pings en ventanas iguales).

Archivos: `dist/data.js` contiene la instantánea y `dist/metrics.js` las funciones puras. No se modificaron datos de Rook, configuraciones de routing ni registros de respondedores.
