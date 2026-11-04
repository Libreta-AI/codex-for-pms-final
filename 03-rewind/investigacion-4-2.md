# Investigación de Dispatch 4.2 y propuesta de intervención

Preparado el 3 de noviembre de 2026. Caso ficticio de Rook Industries. Este informe reúne la ejecución con las fuentes disponibles de los cinco pasos solicitados y alimenta el [PRD del dashboard](prd-dashboard-dispatch.md).

## Conclusión para decidir

La caída persiste con ventanas equivalentes: aceptación **76,83 % → 68,45 %** y sin respuesta **2,12 % → 15,05 %**. La concentración de ofertas es otra señal: cuatro respondedores reciben **149 → 25 pings** en dos ventanas de 21 días. Hay evidencia suficiente para priorizar la investigación de plazos y distribución, pero falta información para determinar cuánto corresponde a cada mecanismo.

La mejora agregada hasta 72,73 % en la última semana no acredita recuperación individual. Tampoco los tickets representan a todos los afectados: Meteor Mite y Vesper tienen caídas pronunciadas y ningún ticket en los 147 registros revisados.

## 1. Validar los cálculos con Ravi

**Trabajo realizado:** se recalcularon eventos, semanas, corte por fecha y periodos comparables; se conciliaron las 159 filas originales; se comprobaron nulos, resultados inesperados, duplicados exactos y referencias a callouts. No se detectaron estas anomalías. Se releyeron las notas del lanzamiento.

| Medida | 20 jul–9 ago: 21 días | 17 ago–6 sep: 21 días |
|---|---:|---:|
| Pings | 518 | 485 |
| Aceptadas | 398 | 332 |
| Rechazadas explícitamente | 109 | 80 |
| Sin respuesta a tiempo | 11 | 73 |
| Aceptación | 76,83 % | 68,45 % |
| Sin respuesta / pings | 2,12 % | 15,05 % |

El corte por fecha original sigue siendo válido bajo su supuesto: 76,59 % antes de medianoche del 12 ago, 63,99 % desde esa fecha. Su caída de 12,60 puntos difiere de la comparación anterior porque incluye los días de transición. Excluir solo el 12 ago deja el resultado posterior en 64,85 %; la señal no depende únicamente de ese día.

**Pendiente de confirmación de Ravi:** completitud de la extracción; zona de los timestamps locales; reconciliación con su reporte oficial; hora y alcance efectivo del despliegue. La nota dice que la comunicación se publicó por la mañana, sin hora de activación. No se recibió una respuesta personal de Ravi.

Ver [validación completa, serie semanal, tabla de 16 respondedores y SQL](validacion-datos.md).

## 2. Investigar la distribución con Wen y Marcus

**Datos comprobados, mismas ventanas de 21 días:**

| Respondedor | Pings antes → después | Taken antes → después |
|---|---:|---:|
| Farlight | 37 → 4 | 27 → 0 |
| Meteor Mite | 34 → 7 | 24 → 1 |
| The Undertow | 37 → 6 | 29 → 1 |
| Vesper | 41 → 8 | 34 → 1 |
| Los otros doce, juntos | 369 → 460 | 284 → 329 |

La participación de los cuatro baja de 28,76 % a 5,15 %. La selección de estos cuatro surge del patrón observado; no es un grupo experimental definido previamente. Los denominadores posteriores pequeños impiden interpretar su aceptación como una medida estable de disposición a trabajar.

También se consultó la demanda: hubo **419 callouts antes y 372 después**, −11,22 %, mientras los pings bajaron 6,37 %. La demanda cambió, pero una caída uniforme de actividad no describe la redistribución observada. Faltan disponibilidad, composición por capacidades y condiciones de cada incidente para explicar sus contribuciones. Estos datos de un solo verano no validan ni descartan estacionalidad anual.

**Código de referencia revisado:**

- `routing.py` ordena los candidatos disponibles mediante proximidad, historial y capacidades. En ese fragmento las capacidades aportan un score; no excluyen por sí solas a un candidato.
- `offer.py` recorre la lista hasta que alguien acepta. Estar en la lista no garantiza recibir un ping: la secuencia puede terminar antes.
- `history.py` empieza en 0,5, suma 0,08 por aceptación y resta 0,12 tanto por rechazo como por ausencia de respuesta; limita el score a 0–1 y no contiene recuperación por paso del tiempo.
- El historial está en memoria y las funciones de disponibilidad y dispositivo son stubs. No se puede afirmar que representan la persistencia o configuración efectiva de producción.

El mecanismo plausible es que quien recibe menos ofertas tenga menos oportunidades de recuperar historial, y que más expiraciones lo penalicen. **Es una hipótesis respaldada por el código de ejemplo, no una reconstrucción de lo ocurrido a estos cuatro alias.** La penalización no aparece documentada como un cambio nuevo de 4.2.

**Solicitud concreta para Wen y Marcus:** confirmar versión/configuración desplegadas; recuperar, para incidentes existentes y alias autorizados, candidatos disponibles, capacidades requeridas, tiempos de viaje, componentes del score, orden y motivos de elegibilidad; contrastar la semántica de capacidades con la definición de coverage gap. Confirmar también persistencia del historial y cambios de disponibilidad. No estimar scores reales iniciándolos arbitrariamente en 0,5 el 29 de junio.

## 3. Separar timeout y cambios de routing

La release y el código muestran estos cambios simultáneos:

| Parámetro | Antes | 4.2 |
|---|---:|---:|
| Espera por respuesta | 90 s | 60 s |
| Peso de proximidad | 0,45 | 0,60 |
| Peso de historial | 0,40 | 0,25 |
| Peso de capacidades | 0,15 | 0,15 |

Con los demás inputs fijos, el cambio del score es `0,15 × (proximidad − historial)`. Esto describe la fórmula, no demuestra quién cambió de posición en producción. Aunque disminuyó el peso del historial, la mayor frecuencia de expiraciones puede interactuar con sus penalizaciones; hay que estudiar ambos efectos y su secuencia.

| Hipótesis | Evidencia actual | Qué falta para contrastarla |
|---|---|---|
| Menos tiempo eleva missed | Espera 90→60; missed aumenta; tickets de ofertas que avanzan | Tiempos de entrega, visualización, respuesta y expiración; versión efectiva |
| Pesos nuevos redistribuyen ofertas | Cambio documentado y volumen muy desigual por alias | Snapshots históricos de candidatos, viajes, capacidades, scores y ranking |
| Historial perpetúa el descenso | Penalizaciones y ausencia de recuperación en el ejemplo | Implementación/persistencia real y trayectoria del score |
| Entrega o conectividad impiden responder | Tickets individuales anteriores al lanzamiento | Confirmación de entrega y estado de dispositivo/red por evento |
| Demanda/disponibilidad cambian | Caen callouts; algunos handlers dicen estar disponibles | Horarios históricos, demanda por capacidad y periodos de comparación adicionales |

**Diseño preparado para separar mecanismos:**

1. Reproducir offline el ranking antiguo y nuevo sobre los mismos snapshots históricos. Mantener candidatos, capacidades, viajes e historial fijos para medir el efecto directo sobre el orden. Esto no estima por sí solo las ofertas finalmente tomadas.
2. Revisar eventos de respuesta reales y pruebas de dispositivo para medir la ventana que el usuario vio. `sent_at` y `outcome` no permiten saber qué missed habría sido taken entre los segundos 60 y 90; no imputar ese resultado.
3. En un entorno de pruebas, comparar una matriz 2×2: pesos antiguos/nuevos y espera 90/60, manteniendo iguales escenarios y estados iniciales. Separar el efecto inmediato del ranking de su evolución con actualizaciones de historial. Los resultados simulados deben rotularse como tales.
4. Antes de experimentar en producción, definir unidad de asignación, interferencia entre respondedores y arrastre del historial. Una aleatorización ingenua por ping mezclaría condiciones en el mismo incidente. Marcus y Ravi deben definir si existe un diseño aislable y cómo analizarlo.

No se ejecutó esta reproducción porque las tablas disponibles carecen de los inputs históricos y las funciones del ejemplo están incompletas. No se introdujeron parámetros ficticios para presentarla como prueba.

## 4. Cruzar los registros con tickets junto con Nadia

Se revisaron los 147 tickets y se clasificaron los síntomas por contenido:

- **32 tickets de poco/sin trabajo**, de Farlight, The Undertow, Corporal Ashgrove y Halfmoon.
- **16 tickets de ofertas que avanzan**, uno anterior a 4.2 y quince desde el lanzamiento.
- **1 ticket explícito de notificación tardía/ausente**, #3034, anterior al lanzamiento, sobre un teléfono antiguo.

Hay **47 tickets distintos** en esas categorías porque #3110 y #3140 aparecen en las dos primeras. No equivalen a 47 incidentes únicos ni personas distintas. Para el corte de pings del 6 sep quedan 30 tickets de poco trabajo y 15 de ofertas que avanzan; los tickets del 7 sep se muestran separados.

Farlight y The Undertow presentan quejas y descensos fuertes. Corporal Ashgrove y Halfmoon reportan silencio con descensos más moderados. Meteor Mite y Vesper presentan descensos fuertes sin tickets. Es necesario mirar la población completa.

**Pendiente con Nadia:** validar fechas de incidente, distinguir oferta no emitida de aviso no recibido y aviso vencido, y confirmar casos con identificadores existentes. Los tickets no tienen `callout_number`: una coincidencia de alias y fecha constituye una pista, no un vínculo confirmado. Los casos activos deben seguir el bypass del circuito normal de soporte.

Ver [clasificación completa, IDs, casos y consultas](cruce-tickets-pings.md). No se ha recibido confirmación de Nadia.

## 5. Propuesta medible para Helen y Engineering

**Decisión propuesta ahora:** priorizar una investigación instrumentada de expiraciones y distribución, y construir el dashboard descrito en el PRD para que sus resultados sean auditables. La primera intervención candidata es probar una espera de 90 segundos manteniendo los pesos de 4.2, si las trazas confirman que la ventana efectiva de respuesta contribuye al problema. Esta candidata debe evaluarse frente a su posible costo en tiempo de asignación.

| Elemento | Propuesta concreta para revisión |
|---|---|
| Hipótesis | Una espera mayor reduce missed y mejora aceptación para quienes requieren más tiempo, sin deteriorar de forma inaceptable la rapidez de asignación |
| Variable directa | Espera 60 frente a 90 segundos; registrar y mantener fijos pesos, versión y política de historial durante la comparación |
| Condición previa | Configuración real confirmada, trazas suficientes, definiciones acordadas y diseño que contemple interferencia e historial |
| Métricas principales | Taken/pings y missed/pings, con conteos y periodos completos; reportar turned down por separado |
| Distribución | Pings por alias, participación en ofertas y, si existe disponibilidad histórica fiable, ofertas por oportunidad elegible; incluir afectados sin tickets |
| Salvaguardas de evaluación | Tiempo desde incidente hasta asignación, time-to-accept y callouts sin asignación; no llamar coverage gap a un incidente sin taken |
| Ventana propuesta | Al menos dos semanas completas; Ravi fija tamaño de muestra y duración necesarios antes de iniciar, y extiende si el volumen no alcanza |
| Regla de decisión | Predefinir con Ravi efecto mínimo útil e incertidumbre aceptable; con Marcus/Helen, márgenes máximos de demora/fallos y reglas de pausa. No declarar éxito si solo mejora el promedio y empeora el grupo afectado |
| Resultado posible | Mantener, ajustar o revertir la intervención según esos criterios; documentar evidencia y diferencias por cohorte |

La cifra de dos semanas es una propuesta de operación, no garantía de potencia estadística. Cambiar la espera también puede cambiar el historial futuro; el análisis debe medir ese efecto acumulado y no afirmar que la distribución queda fija solo porque los pesos no cambien. Si la telemetría apunta a ranking o entrega como causa predominante, la candidata cambia antes de la prueba.

**Responsabilidades para cerrar el acuerdo:** Ravi valida método y muestra; Wen confirma mecanismo y datos; Marcus define viabilidad, instrumentación y reversión; Nadia valida interpretación de casos; Helen decide prioridad, alcance y compromiso de release. Routing y timeout se distribuyen con releases mensuales, no como controles del handler. Esta propuesta no tiene fecha de entrega ni aprobación de esas personas.

El entorno disponible aporta base de datos, wiki y código de referencia; no aporta conversaciones con el equipo ni acceso a producción. Por ello, el análisis y el diseño están preparados, mientras la confirmación humana, el acuerdo de intervención y su ejecución permanecen pendientes.

## Evidencia adicional: demanda semanal

| Semana desde | Callouts |
|---|---:|
| 29 jun | 141 |
| 6 jul | 139 |
| 13 jul | 138 |
| 20 jul | 144 |
| 27 jul | 137 |
| 3 ago | 138 |
| 10 ago | 110 |
| 17 ago | 121 |
| 24 ago | 124 |
| 31 ago | 127 |

Fuente: 150 filas de semana-zona de `rook.callouts`, sumadas por semana; 1.319 incidentes en total. El momento de entrada del incidente y el envío del ping son tiempos distintos; no se interpretan sus totales semanales como una tasa de éxito sin vincular los eventos correctamente.

```sql
SELECT date_trunc('week', happened_at)::date AS week_start,
       area, COUNT(*) AS callouts
FROM rook.callouts
WHERE happened_at >= TIMESTAMP '2026-06-01'
GROUP BY 1, 2
ORDER BY 1, 2;
```

Fuentes adicionales: [notas de 4.2](https://app.notion.com/p/4-2-3eac8516f50181499fc4c5cf15c1ace7), [configuración](../00-rook/code/dispatch-routing/config.py), [ranking](../00-rook/code/dispatch-routing/routing.py), [historial](../00-rook/code/dispatch-routing/history.py), [ofertas](../00-rook/code/dispatch-routing/offer.py) y [disponibilidad](../00-rook/code/dispatch-routing/availability.py). Security Policy 4.1 no apareció en el índice compartido de la wiki; cualquier cambio futuro a registros de respondedores requiere obtenerla y revisarla antes de proponer ese cambio. Este trabajo no modifica esos registros.
