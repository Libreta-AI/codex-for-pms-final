# Validación de datos de Dispatch y comparación alrededor de 4.2

Documento de trabajo del curso. Rook es un caso ficticio. Consultas de solo lectura; no se modificaron datos ni se contactó a Ravi, Wen, Marcus, Nadia o Helen.

## Resultado principal

La disminución de aceptación y el aumento de ofertas sin respuesta se mantienen al comparar períodos de la misma duración y semanas completas. Del 20 de julio al 9 de agosto hubo **398 aceptadas de 518 pings (76,83 %)**; del 17 de agosto al 6 de septiembre hubo **332 de 485 (68,45 %)**: **−8,38 puntos porcentuales**. Los pings sin respuesta aumentaron de **11/518 (2,12 %)** a **73/485 (15,05 %)**.

En esas ventanas de 21 días los pings semanales medios bajaron de **172,67 a 161,67** (−6,37 %). Los rechazos explícitos pasaron de **109/518 (21,04 %)** a **80/485 (16,49 %)**. Esto mantiene separados el rechazo y la ausencia de respuesta.

La distribución también cambió. Farlight, Meteor Mite, The Undertow y Vesper recibieron conjuntamente **149/518 pings (28,76 %)** en las tres semanas previas y **25/485 (5,15 %)** en las tres posteriores. Sus ofertas medias por semana bajaron de **49,67 a 8,33** (−83,22 %); sus aceptaciones pasaron de **114 a 3**. El dato justifica investigar disponibilidad, elegibilidad y ranking; no identifica por sí solo cuál fue la causa.

## Cobertura y controles de calidad

Fuente: tabla `rook.pings`, consultada mediante el conector Rook Database.

| Control | Resultado |
|---|---|
| Filas de pings | 1.696 |
| Primer envío observado | 29 junio 2026, 00:05:03 local según esquema |
| Último envío observado | 6 septiembre 2026, 20:52:08 local según esquema |
| Fechas con al menos un ping | 70, dentro de 29 junio–6 septiembre |
| Pings antes de 1 junio / entre 1–28 junio / desde 7 septiembre | 0 / 0 / 0 |
| Respondedores distintos | 16 |
| Callouts distintos con pings | 1.319 |
| Timestamp nulo / respondedor nulo o vacío / callout nulo | 0 / 0 / 0 |
| Outcome nulo o fuera de taken, turned down, missed | 0 |
| Tuplas idénticas repetidas: callout, respondedor, sent_at, outcome | 0 |
| Pings cuyo callout no existe en rook.callouts | 0 |
| Callouts con exactamente un taken / ningún taken / más de uno | 1.222 / 97 / 0 |
| Pings por callout: mínimo / máximo / promedio | 1 / 4 / 1,286 |
| Total taken / turned down / missed | 1.222 / 339 / 135 |
| CSV existente: filas / pings / taken | 159 / 1.696 / 1.222 |

No se detectaron estas anomalías, pero esos controles no prueban que la ingesta esté completa. No hay un identificador único de ping ni un contrato de completitud expuestos por el esquema. La ausencia de filas de junio temprano no demuestra ausencia de actividad.

Los 97 callouts sin un taken no prueban una brecha de cobertura: todos tienen al menos un ping y el dato no contiene la disponibilidad elegible al momento del incidente. Tampoco hay pings con un `sent_at` posterior al `sent_at` de la oferta que terminó tomada para el mismo callout. Esta comprobación usa el momento de envío; **no** reconstruye la hora de aceptación.

El [CSV original de 159 filas](../class-3-ping-rows.csv) conserva una fila por respondedor y semana con pings. Hay 16 respondedores y 10 semanas, pero falta una combinación: Farlight en la semana del 31 de agosto recibió cero pings. Si se completa una matriz de 160 celdas para visualización, esa celda debe marcarse como cero derivado, no como una fila original del CSV. Su aceptación es N/A, no 0 %.

## Convenciones de comparación

- Un ping es una oferta a un respondedor; un callout puede generar varios pings.
- `taken`: aceptación. `turned down`: rechazo explícito. `missed`: no respondió dentro del plazo.
- Aceptación = suma de taken / suma de todos los pings. No se promedian porcentajes de respondedores.
- Las semanas empiezan el lunes. Los intervalos SQL son semiabiertos: incluyen el inicio y excluyen el fin.
- La tabla declara `sent_at` como `timestamp without time zone`, descrito como hora local. El sufijo Z que imprime el conector no autoriza reinterpretarlo como UTC; la zona local concreta está pendiente de confirmación.
- La semana del 10 al 16 de agosto es de transición y no se clasifica íntegramente como posterior.
- El corte por fecha usa 12 de agosto a las 00:00 locales como supuesto explícito; no es la hora de despliegue confirmada.
- Las medias de pings/semana se calculan como pings × 7 / días calendario de cada intervalo; no usan la distancia entre el primer y último evento.
- Las tasas describen los eventos observados. No son una estimación ajustada por disponibilidad, exposición, área, capacidad o cambios de composición.

## Serie semanal completa

| Semana desde | Pings | Taken | Turned down | Missed | Aceptación | Respondedores con pings |
|---|---:|---:|---:|---:|---:|---:|
| 2026-06-29 | 172 | 132 | 37 | 3 | 76,74 % | 16 |
| 2026-07-06 | 170 | 131 | 35 | 4 | 77,06 % | 16 |
| 2026-07-13 | 174 | 133 | 35 | 6 | 76,44 % | 16 |
| 2026-07-20 | 176 | 132 | 39 | 5 | 75,00 % | 16 |
| 2026-07-27 | 170 | 132 | 34 | 4 | 77,65 % | 16 |
| 2026-08-03 | 172 | 134 | 36 | 2 | 77,91 % | 16 |
| 2026-08-10 | 177 | 96 | 43 | 38 | 54,24 % | 16 |
| 2026-08-17 | 158 | 104 | 26 | 28 | 65,82 % | 16 |
| 2026-08-24 | 162 | 108 | 30 | 24 | 66,67 % | 16 |
| 2026-08-31 | 165 | 120 | 24 | 21 | 72,73 % | 15 |

La última semana alcanza 72,73 %, por debajo del 76,79 % de las seis semanas previas completas. La mejora agregada convive con una composición de ofertas distinta; no acredita recuperación individual ni causa.

## Comparaciones de período y sensibilidad

| Ventana | Días | Pings | Taken | Turned down | Missed | Aceptación | Pings/semana |
|---|---:|---:|---:|---:|---:|---:|---:|
| 13 ago–6 sep, sensibilidad sin día de estreno | 25 | 586 | 380 | 103 | 103 | 64,85 % | 164,08 |
| 29 jun–11 ago, antes por fecha | 44 | 1085 | 831 | 229 | 25 | 76,59 % | 172,61 |
| 12 ago–6 sep, desde fecha de estreno | 26 | 611 | 391 | 110 | 110 | 63,99 % | 164,50 |
| 29 jun–9 ago, seis semanas completas | 42 | 1034 | 794 | 216 | 24 | 76,79 % | 172,33 |
| 17 ago–6 sep, tres semanas posteriores | 21 | 485 | 332 | 80 | 73 | 68,45 % | 161,67 |
| 20 jul–9 ago, tres semanas previas | 21 | 518 | 398 | 109 | 11 | 76,83 % | 172,67 |
| 10–16 ago, semana de transición | 7 | 177 | 96 | 43 | 38 | 54,24 % | 177,00 |

El corte por fecha original se reproduce: **831/1.085 (76,59 %) → 391/611 (63,99 %)**, **−12,60 pp**. Si se excluye por completo el día de estreno, el posterior queda en **380/586 (64,85 %)**. Esta sensibilidad evita decidir de forma arbitraria qué eventos del 12 de agosto ya tuvieron la versión nueva; no sustituye el registro del despliegue.

La comparación de seis semanas previas contra tres posteriores da 76,79 % → 68,45 %. La comparación principal del informe usa tres contra tres semanas completas para igualar duración y composición de días de la semana, excluyendo la semana de transición. Ninguna de estas variantes establece causalidad ni elimina estacionalidad.

## Detalle diario de la semana de transición

| Fecha | Pings | Taken | Turned down | Missed | Aceptación |
|---|---:|---:|---:|---:|---:|
| 2026-08-10 | 32 | 24 | 8 | 0 | 75,00 % |
| 2026-08-11 | 19 | 13 | 5 | 1 | 68,42 % |
| 2026-08-12 | 25 | 11 | 7 | 7 | 44,00 % |
| 2026-08-13 | 25 | 10 | 3 | 12 | 40,00 % |
| 2026-08-14 | 30 | 16 | 6 | 8 | 53,33 % |
| 2026-08-15 | 24 | 11 | 7 | 6 | 45,83 % |
| 2026-08-16 | 22 | 11 | 7 | 4 | 50,00 % |

El 12 de agosto registra 11/25 aceptaciones y 7/25 missed. Son muestras diarias pequeñas; no se deben convertir en conclusiones causales o rankings individuales.

## Respondedores: períodos comparables de tres semanas

Antes: **20 julio–9 agosto**, después: **17 agosto–6 septiembre**. P=ofertas, T=aceptadas, R=rechazos explícitos, M=sin respuesta. Cada promedio semanal divide el total por tres; la aceptación muestra su denominador en las columnas P/T.

| Respondedor | P antes | T antes | R antes | M antes | P/sem antes | P después | T después | R después | M después | P/sem después | Aceptación antes → después |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---|
| Captain Vantage | 35 | 25 | 9 | 1 | 11,67 | 50 | 37 | 8 | 5 | 16,67 | 71,43 % → 74,00 % |
| Cindermark | 28 | 22 | 6 | 0 | 9,33 | 35 | 25 | 6 | 4 | 11,67 | 78,57 % → 71,43 % |
| Corporal Ashgrove | 29 | 23 | 6 | 0 | 9,67 | 22 | 15 | 4 | 3 | 7,33 | 79,31 % → 68,18 % |
| Farlight | 37 | 27 | 8 | 2 | 12,33 | 4 | 0 | 1 | 3 | 1,33 | 72,97 % → 0,00 % |
| Halfmoon | 34 | 25 | 9 | 0 | 11,33 | 25 | 17 | 5 | 3 | 8,33 | 73,53 % → 68,00 % |
| Ironvale | 23 | 18 | 4 | 1 | 7,67 | 33 | 23 | 4 | 6 | 11,00 | 78,26 % → 69,70 % |
| Meteor Mite | 34 | 24 | 8 | 2 | 11,33 | 7 | 1 | 2 | 4 | 2,33 | 70,59 % → 14,29 % |
| Nightwell | 46 | 35 | 10 | 1 | 15,33 | 59 | 42 | 11 | 6 | 19,67 | 76,09 % → 71,19 % |
| Sgt. Bulwark | 26 | 19 | 7 | 0 | 8,67 | 32 | 23 | 4 | 5 | 10,67 | 73,08 % → 71,88 % |
| Sgt. Falkirk | 29 | 23 | 6 | 0 | 9,67 | 44 | 31 | 7 | 6 | 14,67 | 79,31 % → 70,45 % |
| Stormwrack | 40 | 32 | 8 | 0 | 13,33 | 53 | 40 | 7 | 6 | 17,67 | 80,00 % → 75,47 % |
| The Drift | 18 | 15 | 2 | 1 | 6,00 | 23 | 16 | 4 | 3 | 7,67 | 83,33 % → 69,57 % |
| The Gale | 40 | 32 | 6 | 2 | 13,33 | 58 | 42 | 10 | 6 | 19,33 | 80,00 % → 72,41 % |
| The Longcast | 21 | 15 | 6 | 0 | 7,00 | 26 | 18 | 4 | 4 | 8,67 | 71,43 % → 69,23 % |
| The Undertow | 37 | 29 | 8 | 0 | 12,33 | 6 | 1 | 1 | 4 | 2,00 | 78,38 % → 16,67 % |
| Vesper | 41 | 34 | 6 | 1 | 13,67 | 8 | 1 | 2 | 5 | 2,67 | 82,93 % → 12,50 % |

Los denominadores posteriores de Farlight (4), Meteor Mite (7), The Undertow (6) y Vesper (8) son pequeños. Mostrar siempre sus recuentos y evitar atribuirles menor disposición a trabajar: recibir menos ofertas puede cambiar la interpretación de sus tasas.

## Qué se conoce de la hora de publicación

Se volvió a leer la [página de release 4.2](https://app.notion.com/p/4-2-3eac8516f50181499fc4c5cf15c1ace7). Confirma fecha de estreno **12 agosto 2026** y que la comunicación a handlers se publicó esa mañana. No publica hora exacta de despliegue, zona horaria ni activación por respondedor. La publicación de una nota no prueba el instante de activación.

La nota confirma que simultáneamente cambiaron el peso de proximidad y la espera de 90 a 60 segundos; además hubo persistencia de filtros y tres correcciones. Con las tablas consultadas no se puede aislar el efecto de cada cambio.

## Verificado y pendiente

**Verificado aquí:** cálculos reproducibles, conciliación con el CSV, resultados semanales y diarios, comparación de ventanas iguales, distribución por respondedor, controles básicos de integridad y revisión de la fecha publicada.

**Pendiente con Ravi:** ratificación como reporte oficial; timezone y semántica de sent_at; completitud de ingesta; latencia de actualización de outcome; hora de despliegue; criterios oficiales de semanas parciales. No se ha recibido confirmación personal de Ravi.

**Pendiente con Wen y Marcus:** disponibilidad y elegibilidad históricas, entradas al ranking, configuración efectiva de producción, trazas de envío y entrega, respuesta/expiración y asignación. `missed` no demuestra fallo de notificación. Sin respuesta temporal no se puede calcular time-to-accept.

**Pendiente con Nadia:** contrastar síntomas de tickets con ofertas realmente enviadas y recibidas; la fecha de ticket puede diferir de la del incidente. No usar frecuencia de tickets para inferir prevalencia general.

**Pendiente con Helen:** elegir y aprobar cambios operativos después de revisar el mecanismo y las opciones medibles. Esta validación no modifica ranking, timeout, roadmap ni registros de respondedores.

## Consultas reproducibles

### quality

```sql
SELECT COUNT(*) AS rows, MIN(sent_at) AS first_ping, MAX(sent_at) AS last_ping, COUNT(DISTINCT responder) AS responders, COUNT(DISTINCT callout_number) AS callouts, COUNT(*) FILTER (WHERE sent_at IS NULL) AS null_timestamp, COUNT(*) FILTER (WHERE responder IS NULL OR trim(responder) = '') AS missing_responder, COUNT(*) FILTER (WHERE outcome IS NULL OR outcome NOT IN ('taken','turned down','missed')) AS unknown_outcome, COUNT(*) FILTER (WHERE callout_number IS NULL) AS missing_callout FROM rook.pings
```

### duplicates

```sql
SELECT callout_number, responder, sent_at, outcome, COUNT(*) AS copies FROM rook.pings GROUP BY 1,2,3,4 HAVING COUNT(*) > 1 ORDER BY copies DESC
```

### dates

```sql
SELECT sent_at::date AS ping_date, COUNT(*) AS pings, COUNT(*) FILTER (WHERE outcome='taken') AS taken, COUNT(*) FILTER (WHERE outcome='turned down') AS turned_down, COUNT(*) FILTER (WHERE outcome='missed') AS missed FROM rook.pings WHERE sent_at >= '2026-08-10' AND sent_at < '2026-08-17' GROUP BY 1 ORDER BY 1
```

### weekly

```sql
SELECT date_trunc('week',sent_at)::date AS week_start, COUNT(*) AS pings, COUNT(*) FILTER (WHERE outcome='taken') AS taken, COUNT(*) FILTER (WHERE outcome='turned down') AS turned_down, COUNT(*) FILTER (WHERE outcome='missed') AS missed, COUNT(DISTINCT responder) AS responders_pinged FROM rook.pings WHERE sent_at >= '2026-06-01' GROUP BY 1 ORDER BY 1
```

### periods

```sql
WITH windows(label,start_at,end_at,days) AS (VALUES ('Before date split','2026-06-29'::timestamp,'2026-08-12'::timestamp,44),('From release date','2026-08-12'::timestamp,'2026-09-07'::timestamp,26),('After excluding release day','2026-08-13'::timestamp,'2026-09-07'::timestamp,25),('Six full baseline weeks','2026-06-29'::timestamp,'2026-08-10'::timestamp,42),('Three matched baseline weeks','2026-07-20'::timestamp,'2026-08-10'::timestamp,21),('Transition week','2026-08-10'::timestamp,'2026-08-17'::timestamp,7),('Three full post weeks','2026-08-17'::timestamp,'2026-09-07'::timestamp,21)) SELECT w.label, w.days, COUNT(p.*) AS pings, COUNT(*) FILTER(WHERE p.outcome='taken') AS taken, COUNT(*) FILTER(WHERE p.outcome='turned down') AS turned_down, COUNT(*) FILTER(WHERE p.outcome='missed') AS missed, ROUND(COUNT(p.*)*7.0/w.days,2) AS pings_per_week, ROUND(100.0*COUNT(*) FILTER(WHERE p.outcome='taken')/COUNT(p.*),2) AS acceptance_pct FROM windows w LEFT JOIN rook.pings p ON p.sent_at >= w.start_at AND p.sent_at < w.end_at GROUP BY w.label,w.days ORDER BY w.label
```

### responders

```sql
SELECT responder, COUNT(*) FILTER (WHERE sent_at >= '2026-07-20' AND sent_at < '2026-08-10') AS before_pings, COUNT(*) FILTER (WHERE sent_at >= '2026-07-20' AND sent_at < '2026-08-10' AND outcome='taken') AS before_taken, COUNT(*) FILTER (WHERE sent_at >= '2026-07-20' AND sent_at < '2026-08-10' AND outcome='turned down') AS before_turned_down, COUNT(*) FILTER (WHERE sent_at >= '2026-07-20' AND sent_at < '2026-08-10' AND outcome='missed') AS before_missed, COUNT(*) FILTER (WHERE sent_at >= '2026-08-17' AND sent_at < '2026-09-07') AS after_pings, COUNT(*) FILTER (WHERE sent_at >= '2026-08-17' AND sent_at < '2026-09-07' AND outcome='taken') AS after_taken, COUNT(*) FILTER (WHERE sent_at >= '2026-08-17' AND sent_at < '2026-09-07' AND outcome='turned down') AS after_turned_down, COUNT(*) FILTER (WHERE sent_at >= '2026-08-17' AND sent_at < '2026-09-07' AND outcome='missed') AS after_missed FROM rook.pings GROUP BY responder ORDER BY responder
```

### integrity

```sql
SELECT COUNT(DISTINCT sent_at::date) AS dates_with_pings, COUNT(*) FILTER (WHERE sent_at < '2026-06-01') AS pings_before_june, COUNT(*) FILTER (WHERE sent_at >= '2026-06-01' AND sent_at < '2026-06-29') AS early_june_pings, COUNT(*) FILTER (WHERE sent_at >= '2026-09-07') AS pings_after_coverage FROM rook.pings
```

### reference

```sql
SELECT COUNT(*) AS orphan_pings FROM rook.pings p LEFT JOIN rook.callouts c ON c.callout_number=p.callout_number WHERE c.callout_number IS NULL
```

### calloutConsistency

```sql
WITH stats AS (SELECT callout_number,COUNT(*) AS pings,COUNT(*) FILTER(WHERE outcome='taken') AS taken FROM rook.pings GROUP BY callout_number) SELECT COUNT(*) AS callouts_with_pings, COUNT(*) FILTER(WHERE taken=0) AS no_taken, COUNT(*) FILTER(WHERE taken=1) AS one_taken, COUNT(*) FILTER(WHERE taken>1) AS multiple_taken, MIN(pings) AS min_pings, MAX(pings) AS max_pings, ROUND(AVG(pings),3) AS avg_pings FROM stats
```

### sequence

```sql
WITH accepted AS (SELECT callout_number,MIN(sent_at) AS first_taken_at FROM rook.pings WHERE outcome='taken' GROUP BY callout_number) SELECT COUNT(*) AS pings_sent_after_taken FROM rook.pings p JOIN accepted a ON a.callout_number=p.callout_number WHERE p.sent_at>a.first_taken_at
```
