# Cruce de tickets y pings: Dispatch 4.2

Documento de evidencia para el PRD. Preparado el 3 de noviembre de 2026 para el escenario ficticio del curso. Consulta de solo lectura; no se ha contactado con Nadia ni confirmado incidentes con los handlers.

## Hallazgo principal

Los tickets y los pings coinciden en una caída de ofertas para algunos respondedores, pero el grupo que se queja no representa a todos los afectados. **Farlight y The Undertow aparecen tanto en las quejas repetidas como en las caídas más pronunciadas. Meteor Mite y Vesper también sufren caídas pronunciadas y no tienen ningún ticket en los 147 registros.** Corporal Ashgrove y Halfmoon sí presentan quejas repetidas, con descensos más moderados.

La oferta que avanza antes de responder constituye otro síntoma. No se debe convertir el silencio del teléfono en prueba de fallo de notificaciones: el registro de un ping indica que se emitió una oferta; no demuestra que el dispositivo la recibió o mostró.

## Fuentes, alcance y método

- Se describieron las tablas `rook.support_tickets`, `rook.pings`, `rook.responders` y `rook.handlers`.
- Se leyeron los **147 tickets**, con fecha de presentación del **29 de junio al 7 de septiembre de 2026**, y su asunto y cuerpo completos. La consulta no fue truncada.
- Se leyeron **159 agregados respondedor-semana** de pings, del **29 de junio al 6 de septiembre**, con pings, taken y missed; se consultaron además los diez pings de Farlight/The Undertow desde el 17 de agosto.
- Clasificación manual del contenido en tres síntomas. Una queja puede pertenecer a más de uno. Se enumeran todos los IDs clasificados más abajo, para revisar o corregir la clasificación.
- El campo `about_responder` permite comparar el mismo alias entre tablas. **No existe un campo callout_number en tickets ni una llave que vincule un ticket a un ping concreto.** El cruce es por alias y período, no una atribución a nivel de evento.
- Las fechas son horas locales según el esquema. Aunque la serialización del conector añade Z, no se ha verificado la zona horaria de negocio; no se interpreta la Z como garantía de UTC.
- La fecha del ticket es la de presentación, no necesariamente la del incidente. Los textos «últimos siete días» no equivalen automáticamente a una semana de lunes a domingo.
- No se modificaron registros de respondedores, disponibilidad ni routing. Los nombres de respondedores se usan como los alias que proporcionan las fuentes.

## Tres síntomas separados

| Clasificación | Antes del 12 de agosto | 12 de agosto | 13 de agosto–7 de septiembre | Total | Qué permite concluir |
|---|---:|---:|---:|---:|---|
| Poco/sin trabajo o teléfono silencioso | 0 | 0 | 32 | 32 | Hay reportes repetidos de menor volumen; no identifican por sí solos un fallo push. |
| Oferta que avanza antes de responder | 1 | 1 | 14 | 16 | Hay reportes de ofertas que vencen o avanzan; el anterior al lanzamiento es un caso sin señal. |
| Notificación tardía/ausente explícita | 1 | 0 | 0 | 1 | Existe un antecedente en un teléfono antiguo; no prueba que 4.2 introdujera fallos de entrega. |

Los 32 tickets de poco/sin trabajo provienen de cuatro handlers y cuatro respondedores. Los 16 de ofertas que avanzan provienen de once handlers y once respondedores. **#3110 y #3140 están en ambas categorías:** son 47 tickets distintos en los tres síntomas, no 49. Treinta son únicamente de poco/sin trabajo. Las repeticiones de un handler no son personas adicionales ni incidentes independientes confirmados.

El caso **#3014 (14 de julio, The Undertow)** describe pérdida de señal y que la oferta ya había avanzado al recuperar cobertura. Se incluye en «oferta que avanza», como antecedente de conectividad; no es evidencia del plazo de 60 segundos de 4.2. **#3034 (4 de agosto, Ironvale)** describe notificaciones tardías o ausentes en un teléfono antiguo.

Separados de los tres síntomas anteriores están **#3007, #3016 y #3040**, reportes de notificación duplicada antes del lanzamiento. No se suman a «notificaciones ausentes». No encontrar nuevos tickets de esa categoría no confirma su resolución.

## Volumen de tickets y períodos

| Período de presentación | Tickets de todos los temas | Días calendario | Tickets/día |
|---|---:|---:|---:|
| 29 de junio–11 de agosto | 40 | 44 | 0,91 |
| 12 de agosto | 2 | 1 | 2,00 |
| 13 de agosto–7 de septiembre | 105 | 26 | 4,04 |

Esta comparación de todos los temas reproduce aproximadamente 4,44 veces el volumen diario previo tras el día de lanzamiento. Incluye asuntos de Supply y otros asuntos; no equivale a una tasa de fallos de Dispatch ni a prevalencia.

Para alinear estrictamente el corte con los pings, hay **103 tickets del 12 de agosto al 6 de septiembre**, 26 días (3,96/día), frente a 40 en los 44 días previos (0,91/día). En ese intervalo alineado hay 30 tickets de poco/sin trabajo y 15 de oferta que avanza, con los mismos dos solapamientos. Los cuatro tickets del 7 de septiembre quedan fuera; dos son quejas de poco trabajo (#3145 y #3147). Mantener ambos cortes visibles impide tratar la ausencia de datos de pings del 7 de septiembre como cero pings y compararla con los tickets de ese día.

## Cruce por respondedor

La base usa seis semanas completas, 29 de junio–9 de agosto. El período posterior usa tres semanas completas, 17 de agosto–6 de septiembre. La semana del 10 de agosto se excluye de estos promedios por contener el lanzamiento. Los tickets de esta tabla cubren todo su período de 29 de junio–7 de septiembre.

| Respondedor | Pings/semana base | Pings semanas 17, 24 y 31 de agosto | Pings/semana posterior | Tickets de poco/sin trabajo | Todos sus tickets |
|---|---:|---|---:|---:|---:|
| Farlight | 12,00 (72/6) | 3 → 1 → 0 | 1,33 (4/3) | 11 | 19 |
| The Undertow | 12,00 (72/6) | 4 → 1 → 1 | 2,00 (6/3) | 11 | 21 |
| Corporal Ashgrove | 10,00 (60/6) | 8 → 7 → 7 | 7,33 (22/3) | 5 | 14 |
| Halfmoon | 11,00 (66/6) | 9 → 8 → 8 | 8,33 (25/3) | 5 | 15 |
| Meteor Mite | 11,17 (67/6) | 4 → 2 → 1 | 2,33 (7/3) | 0 | 0 |
| Vesper | 13,83 (83/6) | 5 → 2 → 1 | 2,67 (8/3) | 0 | 0 |

Farlight cae de 12 a 1,33 ofertas semanales; The Undertow de 12 a 2. Corporal Ashgrove pasa de 10 a 7,33 y Halfmoon de 11 a 8,33. Los descensos de Meteor Mite (11,17 a 2,33) y Vesper (13,83 a 2,67) quedan fuera de lo que mostraría un panel limitado a quejas.

La celda cero de Farlight en la última semana es una ausencia de pings en el conjunto consultado, añadida para comparar; la consulta agrupada original omite esa fila. **Cero pings no significa que estuviera disponible ni que el conjunto de datos esté completo en producción.** Los handlers dicen haber comprobado disponibilidad y etiquetas en varios tickets; esa declaración todavía requiere contrastarse con registros históricos de disponibilidad y elegibilidad.

## Casos que Nadia puede verificar

1. **#3060, 17 de agosto, Farlight:** Linda dice que lleva tres días sin sonar y que la disponibilidad figura correcta. El registro muestra tres pings la semana del 17, uno la del 24 y ninguno la del 31. Es coherente con un descenso, pero el dato semanal no prueba la situación de cada hora.
2. **#3073, 20 de agosto, The Undertow:** se reportan seis pings en los siete días anteriores frente a unos doce habituales. Los promedios semanales confirman un descenso general; no se iguala la ventana móvil reportada con la semana calendario.
3. **#3110, 29 de agosto, Farlight:** una oferta tras varios días de silencio desapareció antes de responder. Conecta los dos síntomas dentro del mismo relato, sin establecer qué mecanismo produjo cada uno.
4. **#3140, 5 de septiembre, The Undertow:** el primer aviso en varios días también avanzó antes de responder. Mantener ambas etiquetas y contar un solo ticket.
5. **#3034, 4 de agosto, Ironvale:** notificaciones que llegan tarde o no llegan en un teléfono antiguo. Solicitar detalles del dispositivo y trazas de entrega existentes mediante el flujo autorizado, sin introducir nuevos campos de identidad.
6. **#3043, 13 de agosto, Captain Vantage:** el handler relata un episodio de la tarde anterior y aclara que no fue el primero del año. Sirve para investigar el tiempo, no para fechar el inicio del problema en 4.2.

### Eventos candidatos, sin vínculo confirmado

| Ticket | Evento registrado que coincide en alias/fecha aproximada | Límite |
|---|---|---|
| #3110, presentado 29 de agosto | Farlight, callout 41245, 28 de agosto 19:28:20, missed | El relato dice «anoche». Falta el identificador del incidente en el ticket; no se confirma que sea la misma oferta. |
| #3140, presentado 5 de septiembre | The Undertow, callout 41394, 5 de septiembre 15:17:47, missed | El relato dice «esta tarde». La coincidencia temporal tampoco demuestra correspondencia ni causa. |

Estos eventos son pistas para verificación, no emparejamientos definitivos. Un outcome missed significa ausencia de respuesta antes del vencimiento; no mide segundos visibles en pantalla ni entrega al dispositivo.

## Preguntas concretas pendientes para Nadia y Engineering

- Confirmar los incidentes de #3110 y #3140 mediante los identificadores existentes y el horario que recuerdan los handlers; conservar explícitamente cualquier incertidumbre.
- Separar en la entrevista breve: ¿no hubo oferta registrada?, ¿hubo oferta pero ningún aviso?, ¿hubo aviso visible pero venció?, ¿existió un rechazo explícito?
- Para los casos con supuesto aviso tardío, contrastar envío, entrega, visualización y respuesta si esas trazas existen. La tabla actual solo contiene envío y outcome.
- Verificar las ventanas móviles citadas, disponibilidad histórica y cambios de capacidades alrededor de los incidentes. Un estado actual no describe el pasado.
- Incluir Meteor Mite y Vesper en la investigación aunque no hayan generado tickets. Que no haya queja no demuestra ausencia de impacto.
- Si un caso corresponde a un callout activo, aplicar el bypass del circuito normal de soporte indicado en el contexto del curso.
- No marcar estos pasos como realizados con Nadia: esta revisión utiliza las fuentes disponibles; queda pendiente la confirmación humana.

## Requisitos derivados para el dashboard

- Mostrar dos vistas conectadas: métricas de pings por respondedor y evidencia cualitativa por ticket, con sus respectivos cortes temporales.
- Permitir ver todos los respondedores, incluidos los que no tienen tickets.
- Mantener separados poco trabajo, problemas reportados de entrega y ofertas que avanzan; permitir etiquetas múltiples y deduplicar por ticket_number.
- Exponer pings, taken y missed por semana, y mostrar fechas de presentación de tickets en otra pista; no etiquetar esa fecha como fecha del fallo.
- Presentar conteos de tickets y número de filers/respondedores distintos para evitar que repetición parezca prevalencia.
- Presentar los posibles vínculos a eventos como «pendientes de confirmar»; no generar una unión automática por proximidad temporal.
- Mostrar denominador y advertencia de bajo volumen en tasas por respondedor. Cuando no hay pings, aceptación N/A.
- Conservar las declaraciones de disponibilidad como «reportado por handler» hasta validarlas con registros históricos.

## Índice completo de evidencia clasificada

Los IDs remiten a `rook.support_tickets.ticket_number`; el conector no proporciona una URL individual verificada por ticket.

| Ticket | Fecha presentada | Respondedor | Síntoma(s) | Asunto original |
|---|---|---|---|---|
| #3014 | 2026-07-14 | The Undertow | Oferta avanza | Missed one while out of signal |
| #3034 | 2026-08-04 | Ironvale | Entrega tardía/ausente reportada | Push notifications unreliable on older phones |
| #3041 | 2026-08-12 | The Drift | Oferta avanza | Ping moved on while The Drift was reaching for the phone |
| #3043 | 2026-08-13 | Captain Vantage | Oferta avanza | Callout moved on before he could answer |
| #3047 | 2026-08-14 | Sgt. Falkirk | Oferta avanza | Gone before he could answer |
| #3048 | 2026-08-14 | Sgt. Falkirk | Oferta avanza | It vanished before he could swipe |
| #3052 | 2026-08-15 | Ironvale | Oferta avanza | Lost one yesterday morning |
| #3055 | 2026-08-16 | Halfmoon | Oferta avanza | Ping moved on while Halfmoon was reaching for the phone |
| #3056 | 2026-08-16 | Nightwell | Oferta avanza | Ping moved on while Nightwell was reaching for the phone |
| #3060 | 2026-08-17 | Farlight | Poco/sin trabajo | Farlight's phone has not gone off in 3 days |
| #3065 | 2026-08-19 | Ironvale | Oferta avanza | Gone before she could answer |
| #3070 | 2026-08-20 | Corporal Ashgrove | Poco/sin trabajo | Corporal Ashgrove's phone has not gone off in 3 days |
| #3071 | 2026-08-20 | Farlight | Poco/sin trabajo | Hardly anything for Farlight this week |
| #3073 | 2026-08-20 | The Undertow | Poco/sin trabajo | Hardly anything for The Undertow this week |
| #3077 | 2026-08-21 | Stormwrack | Oferta avanza | It vanished before he could swipe |
| #3078 | 2026-08-22 | Cindermark | Oferta avanza | It vanished before he could swipe |
| #3080 | 2026-08-22 | The Undertow | Poco/sin trabajo | The Undertow much quieter than usual |
| #3081 | 2026-08-22 | Farlight | Poco/sin trabajo | Farlight much quieter than usual |
| #3083 | 2026-08-23 | Corporal Ashgrove | Poco/sin trabajo | Hardly anything for Corporal Ashgrove this week |
| #3086 | 2026-08-23 | Halfmoon | Poco/sin trabajo | Hardly anything for Halfmoon this week |
| #3088 | 2026-08-24 | The Undertow | Poco/sin trabajo | The Undertow's phone has not gone off in 3 days |
| #3089 | 2026-08-24 | Farlight | Poco/sin trabajo | Still very quiet for Farlight |
| #3091 | 2026-08-25 | The Longcast | Oferta avanza | Ping moved on while The Longcast was reaching for the phone |
| #3096 | 2026-08-26 | The Undertow | Poco/sin trabajo | Nothing coming through for The Undertow |
| #3097 | 2026-08-26 | Corporal Ashgrove | Poco/sin trabajo | Corporal Ashgrove much quieter than usual |
| #3098 | 2026-08-26 | Halfmoon | Poco/sin trabajo | Halfmoon much quieter than usual |
| #3099 | 2026-08-26 | Farlight | Poco/sin trabajo | Nothing coming through for Farlight |
| #3103 | 2026-08-28 | Farlight | Poco/sin trabajo | Is Farlight still on the list? |
| #3104 | 2026-08-28 | The Undertow | Poco/sin trabajo | Still very quiet for The Undertow |
| #3108 | 2026-08-29 | Halfmoon | Poco/sin trabajo | Still very quiet for Halfmoon |
| #3110 | 2026-08-29 | Farlight | Poco/sin trabajo; Oferta avanza | First one in 5 days and she missed it |
| #3112 | 2026-08-30 | The Undertow | Poco/sin trabajo | Is The Undertow still on the list? |
| #3113 | 2026-08-30 | Cindermark | Oferta avanza | Lost one last night |
| #3114 | 2026-08-30 | Farlight | Poco/sin trabajo | Hardly anything for Farlight this week |
| #3118 | 2026-08-30 | Corporal Ashgrove | Poco/sin trabajo | Still very quiet for Corporal Ashgrove |
| #3120 | 2026-09-01 | Farlight | Poco/sin trabajo | Farlight asked me to pass this on |
| #3121 | 2026-09-01 | The Undertow | Poco/sin trabajo | The Undertow asked me to pass this on |
| #3123 | 2026-09-01 | Nightwell | Oferta avanza | Lost one this morning |
| #3129 | 2026-09-03 | Halfmoon | Poco/sin trabajo | Hardly anything for Halfmoon this week |
| #3130 | 2026-09-03 | Farlight | Poco/sin trabajo | Farlight's phone has not gone off in 6 days |
| #3131 | 2026-09-03 | The Undertow | Poco/sin trabajo | The Undertow's phone has not gone off in 7 days |
| #3135 | 2026-09-04 | Corporal Ashgrove | Poco/sin trabajo | Hardly anything for Corporal Ashgrove this week |
| #3138 | 2026-09-05 | The Undertow | Poco/sin trabajo | Nothing coming through for The Undertow |
| #3139 | 2026-09-05 | Farlight | Poco/sin trabajo | Nothing coming through for Farlight |
| #3140 | 2026-09-05 | The Undertow | Poco/sin trabajo; Oferta avanza | First one in 9 days and he missed it |
| #3145 | 2026-09-07 | The Undertow | Poco/sin trabajo | Hardly anything for The Undertow this week |
| #3147 | 2026-09-07 | Halfmoon | Poco/sin trabajo | Halfmoon much quieter than usual |

## Consultas reproducibles

```sql
SELECT ticket_number, filed_at, filed_by, about_responder,
       subject, body, status
FROM rook.support_tickets
WHERE filed_at >= TIMESTAMP '2026-06-01'
ORDER BY filed_at, ticket_number;
```

```sql
SELECT responder,
       date_trunc('week', sent_at)::date AS week_start,
       COUNT(*) AS pings,
       COUNT(*) FILTER (WHERE outcome = 'taken') AS taken,
       COUNT(*) FILTER (WHERE outcome = 'missed') AS missed
FROM rook.pings
WHERE sent_at >= TIMESTAMP '2026-06-01'
GROUP BY 1, 2
ORDER BY 1, 2;
```

```sql
SELECT callout_number, responder, sent_at, outcome
FROM rook.pings
WHERE responder IN ('Farlight', 'The Undertow')
  AND sent_at >= TIMESTAMP '2026-08-17'
ORDER BY responder, sent_at;
```

```sql
SELECT about_responder, COUNT(*) AS tickets
FROM rook.support_tickets
GROUP BY 1
ORDER BY 1;
```

Las consultas producen evidencia descriptiva. No permiten atribuir por separado un efecto causal al timeout de 60 segundos, a las ponderaciones de routing, a la entrega de notificaciones o a la estacionalidad.
