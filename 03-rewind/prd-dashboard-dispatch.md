# PRD · Dashboard de diagnóstico de Dispatch

**Estado:** propuesta para revisión; no es un compromiso de entrega.  
**Preparado:** 3 de noviembre de 2026. Escenario ficticio del curso Codex for PMs.  
**Responsable propuesto:** PM de Dispatch. Usuarios principales: Product, Data, Engineering y Support.  
**Supuesto de alcance:** dashboard interno de diagnóstico, complementario al dashboard existente de investigación para el CEO. Su audiencia y prioridad deben confirmarse con Helen.

## 1. Problema y resultado esperado

Después de 4.2, la aceptación agregada bajó y luego mejoró parcialmente. Al mismo tiempo, algunos respondedores casi dejaron de recibir ofertas. Mirar solo el promedio puede ocultar esta diferencia; mirar solo los tickets también, porque algunos afectados no se quejaron.

El dashboard debe permitir que un PM identifique qué cambió, a quién afectó y qué evidencia respalda la conclusión, sin confundir ausencia de ofertas, fallos de notificación y falta de respuesta a tiempo. Debe ayudar a preparar una investigación o una intervención medible; no atribuir automáticamente la causa al lanzamiento.

**Decisiones que debe apoyar:** qué problema investigar primero, qué cohortes revisar con Engineering y Support, y si una intervención posterior mejora los resultados agregados y por respondedor.

## 2. Evidencia que fundamenta el producto

La fuente operativa contiene 1.696 pings de 16 respondedores, del 29 de junio al 6 de septiembre de 2026. La consulta desde el 1 de junio devuelve 159 filas observadas de respondedor-semana. Los datos anteriores al 29 de junio y posteriores al 6 de septiembre no están disponibles en este análisis.

| Comparación | Antes | Después | Cambio |
|---|---:|---:|---:|
| Aceptación, corte por fecha: 29 jun–11 ago frente a 12 ago–6 sep | 831/1.085 = 76,59 % | 391/611 = 63,99 % | −12,60 puntos porcentuales |
| Aceptación, ventanas iguales: 20 jul–9 ago frente a 17 ago–6 sep | 398/518 = 76,83 % | 332/485 = 68,45 % | −8,38 puntos porcentuales |
| Sin respuesta, ventanas iguales | 11/518 = 2,12 % | 73/485 = 15,05 % | +12,93 puntos porcentuales |
| Pings/semana, ventanas iguales | 172,67 | 161,67 | −6,37 % |

Farlight, Meteor Mite, The Undertow y Vesper recibieron conjuntamente 149 pings en las tres semanas previas comparables y 25 en las tres posteriores. En la última semana recibieron solo tres entre los cuatro. Es una cohorte identificada después de observar los datos; sirve para investigar, no para estimar un efecto causal ni demostrar falta de disponibilidad.

4.2 cambió simultáneamente los pesos de routing y la espera de 90 a 60 segundos. La hora exacta del despliegue no está documentada en las fuentes consultadas. Los registros no incluyen entrega al dispositivo, instante de respuesta, disponibilidad histórica ni posiciones en el ranking.

La investigación de tickets distingue poco trabajo, ofertas que avanzan y problemas explícitos de notificación. Meteor Mite y Vesper no tienen tickets en la muestra revisada. La población que presenta quejas no representa a todos los afectados.

## 3. Usuarios y tareas

| Usuario | Necesidad | Resultado observable |
|---|---|---|
| PM de Dispatch | Comparar periodos y decidir dónde investigar | Identifica caída agregada, cambio de distribución y límites de la evidencia |
| Ravi / Data | Reproducir las cifras | Reconcilia tarjetas, series, tablas y exportación con la consulta |
| Wen y Marcus / Engineering | Ubicar cohortes y eventos que revisar | Obtiene alias, semanas y resultados; conoce qué telemetría falta |
| Nadia / Support | Contrastar quejas y comportamiento observado | Encuentra tickets relacionados por tema/alias, sin atribuirles un ping sin evidencia |
| Helen / Product | Revisar una propuesta de intervención | Ve línea base, objetivo, riesgos y confirmaciones pendientes |

Los respondedores y handlers no son usuarios del MVP. No se presenta una clasificación de desempeño ni una evaluación laboral: son clientes independientes.

## 4. Experiencia y requisitos del MVP

Orden de lectura: contexto de datos → comparación → evolución semanal → distribución individual → evidencia. **El dashboard debe estar disponible íntegramente en inglés y español desde el MVP**, con un selector de idioma visible. El PRD está redactado en español; el requisito bilingüe corresponde al producto que se construirá.

| ID | Prioridad | Requisito y comportamiento esperado |
|---|---|---|
| R1 | P0 | **Contexto visible.** Mostrar periodo solicitado, cobertura disponible, fecha de extracción y estado de completitud. Avisar que esta versión usa una instantánea histórica. Una extracción reciente no convierte septiembre en datos actuales. |
| R2 | P0 | **Comparación reproducible.** Preset principal: tres semanas completas antes y después de la semana del lanzamiento (20 jul–9 ago y 17 ago–6 sep). Presets adicionales: corte por fecha y todas las semanas completas (seis antes, tres después). Mostrar rangos y duración; excluir del preset de semanas completas la semana del 10 ago. |
| R3 | P0 | **Resumen.** Mostrar pings, aceptadas, tasa de aceptación, sin respuesta y rechazos explícitos. Cada tasa incluye numerador y denominador; el cambio entre tasas se expresa en puntos porcentuales. Comparar volumen usando pings por semana o por día cuando las duraciones difieran. |
| R4 | P0 | **Serie semanal.** Gráfico de aceptación y tabla accesible con pings, aceptadas, rechazadas y sin respuesta. Marcar 12 ago y rotular 10–16 ago como semana de transición. Incluir volumen debajo de la tasa; identificar semanas parciales por filtros. |
| R5 | P0 | **Distribución por respondedor.** Tabla y matriz semanal para los 16 alias observados. Incluir pings/semana antes y después, cambio absoluto y relativo, participación en las ofertas del conjunto filtrado y resultados. Permitir ordenar por cambio de pings y abrir el detalle de un alias. No ocultar filas por un umbral de volumen. |
| R6 | P0 | **Filtros coherentes.** Fecha y uno o varios respondedores afectan tarjetas, gráficos, tablas y exportación. El filtro seleccionado permanece visible y tiene una acción de restablecer. La selección de una fila abre un detalle; no cambia silenciosamente el denominador global. |
| R7 | P0 | **Trazabilidad.** Abrir desde cada semana sus filas de respondedor-semana. Exportar todas las filas coincidentes, no solo la página visible, con filtros, definición de métricas, fecha de extracción y corte de datos. El CSV original de 159 filas permanece identificable como fuente. |
| R8 | P0 | **Ceros y datos ausentes.** Farlight tiene una celda derivada de cero pings en la última semana y aceptación «No aplica». Identificarla como celda completada a partir de ausencia de eventos en el alcance observado. Fuera de cobertura o ante error de carga mostrar «Datos no disponibles»; nunca cero. Cero pings no prueba disponibilidad ni elegibilidad. |
| R9 | P0 | **Método y calidad.** Panel con consultas, denominadores, convención semanal, supuesto de corte y limitaciones. Alertar ante resultados inesperados, datos incompletos o truncados; no ocultar filas ni deduplicar automáticamente. |
| R10 | P1 | **Contexto de soporte.** Enlazar al informe de tickets y al dashboard de investigación existente. Una ampliación podrá filtrar por tema y alias con vínculo explícito; debe mostrar fechas de presentación y contar IDs únicos, permitiendo etiquetas superpuestas. No hacer emparejamientos automáticos ticket-ping por proximidad temporal. |
| R11 | P1 | **Contexto de demanda.** Añadir callouts por semana y zona una vez validada su relación temporal con los pings. Mantener separados incidentes y ofertas. El descenso de demanda es contexto, no una explicación causal suficiente. |
| R12 | P0 | **Inglés y español completos.** Un selector «English / Español» cambia navegación, filtros, tarjetas, gráficos, tablas, ayuda, definiciones, explicaciones, metodología, estados vacíos, errores y etiquetas de accesibilidad. Conservar selección de fechas, alias, vista y resultados al alternar. Recordar la preferencia en ese navegador. |

Texto breve de ayuda siempre disponible en ambos idiomas:

- **ES:** «Un ping es una oferta a un respondedor. Taken significa que la aceptó; turned down, que la rechazó; missed, que no hubo respuesta dentro del plazo. Un incidente puede generar varios pings».
- **EN:** “A ping is an offer sent to one responder. Taken means accepted; turned down means explicitly declined; missed means no response within the allowed time. One callout can generate several pings.”

### Comportamiento bilingüe

- En la primera visita, usar la preferencia de idioma del navegador si es inglés o español; en otro caso, inglés. La elección manual posterior prevalece y se guarda localmente como preferencia del producto.
- Traducir todos los textos redactados para el dashboard, incluidas conclusiones descriptivas y advertencias de incertidumbre. Mantener equivalentes su significado, denominadores y alcance.
- Conservar alias, IDs de tickets/callouts y valores técnicos de la fuente. Los tickets se consultan en su idioma original, con una etiqueta traducida que lo indique. Una futura traducción de su contenido debe identificarse como traducción y permitir consultar el original; el MVP no promete traducir documentos fuente externos.
- Formatear números según el idioma: `76.83%` en inglés y `76,83 %` en español. Usar fechas no ambiguas, como `12 Aug 2026` / `12 ago 2026`. El idioma no cambia la zona horaria de la fuente ni el corte del lanzamiento.
- Exportar cifras sin formato visual y fechas ISO; mantener nombres de campos estables (`pings`, `taken`, etc.) y acompañarlos con un diccionario en ambos idiomas. La exportación conserva filtros y datos idénticos en ambas vistas.
- Actualizar el idioma del documento y los textos para lectores de pantalla. Ninguna vista del MVP se considera terminada si faltan traducciones o muestra claves internas de traducción al usuario.

| Concepto | English | Español |
|---|---|---|
| Oferta enviada | Pings sent | Pings enviados |
| `taken` | Accepted | Aceptadas |
| `turned down` | Explicitly declined | Rechazadas explícitamente |
| `missed` | No response within the time limit | Sin respuesta dentro del plazo |
| Tasa | Acceptance rate | Tasa de aceptación |
| Persona que recibe ofertas | Responder | Respondedor |
| Ausencia de denominador | Not applicable | No aplica |
| Ausencia de datos | Data unavailable | Datos no disponibles |
| Cambio de tasa | Percentage points | Puntos porcentuales |

## 5. Contrato de métricas y datos

| Métrica | Definición |
|---|---|
| Pings | Número de filas/eventos enviados en el alcance seleccionado |
| Aceptadas / taken | Número de filas con `outcome = 'taken'` |
| Rechazadas / turned down | Número de filas con `outcome = 'turned down'` |
| Sin respuesta / missed | Número de filas con `outcome = 'missed'`; no equivale a fallo de entrega |
| Aceptación | Suma de aceptadas / suma de pings; nunca promedio simple de porcentajes individuales |
| Tasas de rechazo y sin respuesta | Conteo de ese resultado / total de pings del mismo alcance |
| Pings/semana | Total de pings × 7 / días calendario incluidos en el periodo comparado; con semanas completas equivale a dividir por su número de semanas |
| Participación de un alias o grupo | Sus pings / pings de todos los alias incluidos en el filtro |
| Cambio relativo de volumen | (Valor posterior − anterior) / anterior. Si anterior = 0, mostrar «Sin base para comparar» |

Semanas: lunes a domingo según los timestamps locales de la fuente. La zona horaria específica requiere confirmación; no reinterpretar silenciosamente como UTC los timestamps sin zona. El corte provisional por fecha es 12 ago a las 00:00, no una hora de despliegue confirmada. Los rangos se implementan con inicio inclusivo y fin exclusivo al día siguiente del último día mostrado. Si un filtro excede la cobertura disponible, mostrar qué tramo falta; no incluirlo como días con cero actividad ni presentar una comparación completa. La media semanal normalizada del corte por fecha debe reproducir 172,61 y 164,50 pings/semana para 44 y 26 días, respectivamente.

Para el MVP, la fuente es `rook.pings(callout_number, responder, sent_at, outcome)`. La tabla de soporte tiene otra granularidad. La lista de alias del histórico no demuestra que estuvieran activos o disponibles en todas las semanas.

La exportación original solo tiene semana, alias, pings y taken: sirve para las cifras semanales y distribución. **No permite separar 10–11 ago de 12–16 ago ni distinguir rechazos de ausencias.** Estas vistas necesitan la consulta a eventos o agregados adicionales con esas dimensiones. Todas las consultas al conector deben controlar su límite de 1.000 filas; paginar o agregar sin perder datos.

Una fila inesperada o con resultado desconocido permanece en el conteo de eventos, se muestra como desconocida y activa una advertencia de conciliación. Nunca reclasificarla como missed. La fuente actual pasa las comprobaciones de resultados válidos, nulos, duplicados exactos y referencias a callouts; esto no certifica que el origen capturó todos los eventos reales.

## 6. Alcance, calidad y límites

El MVP es de consulta. Quedan fuera: controles para cambiar routing o timeout; modificaciones a perfiles o disponibilidad; nuevas promesas de roadmap; alertas de incidentes activos; entrega de notificaciones; reconstrucción de identidad legal; métricas de ingresos o churn; y conclusiones causales automáticas.

Time-to-accept requiere el instante de aceptación. Coverage gap requiere capacidades requeridas y disponibilidad de candidatos en el momento del incidente. Tasas ajustadas por disponibilidad y explicación del ranking requieren datos históricos adicionales. Mostrar estas métricas como pendientes de datos, no calcular sustitutos engañosos.

Usar alias existentes y acceso interno acorde con permisos de origen. Confirmar permisos de exportación antes de una distribución más amplia. Cualquier propuesta posterior que cambie registros de respondedores requiere leer Security Policy 4.1 y revisar dependencias con Supply; este PRD no cambia esos registros.

La interfaz debe permitir navegación por teclado, etiquetas legibles, tabla alternativa a cada gráfico y estados que no dependan solo del color. Mostrar recuentos pequeños junto a las tasas; no presentar diferencias de uno o dos pings como una tendencia concluyente. Objetivos propuestos para esta instantánea: carga inicial ≤3 segundos y filtros ≤300 ms en un equipo de referencia acordado con Engineering.

Si la carga falla, explicar el error y permitir reintentar. Si se conserva una instantánea anterior, mostrar su fecha y estado. Si una búsqueda no devuelve resultados dentro de cobertura, mostrar el filtro y el estado vacío correspondiente.

## 7. Criterios de aceptación

1. La instantánea completa concilia 1.696 pings, 1.222 taken y 159 filas observadas; exportar no trunca resultados.
2. El corte por fecha reproduce 831/1.085 y 391/611. Su etiqueta explica el supuesto de medianoche.
3. El preset de ventanas iguales reproduce 398/518 y 332/485; el de todas las semanas completas reproduce 794/1.034 y 332/485.
4. La semana del 10 ago muestra 177 pings y 96 taken, marcada de transición. Su desglose por fecha reproduce 51/37 antes y 126/59 desde el 12 ago.
5. En las ventanas iguales, missed reproduce 11/518 y 73/485, separado de turned down (109/518 y 80/485).
6. La semana final de Farlight muestra cero pings y tasa «No aplica» en la matriz derivada. Una carga fallida o una fecha fuera de cobertura muestra datos no disponibles.
7. Filtrar un alias actualiza todos los componentes y el archivo exportado; las filas suman exactamente los conteos mostrados.
8. La tabla permite encontrar a Meteor Mite y Vesper aunque no tengan tickets; nunca filtra respondedores únicamente por presencia en Support.
9. Ninguna pantalla afirma que missed prueba un fallo de notificación, que cero ofertas prueba indisponibilidad, o que la recuperación agregada implica recuperación individual.
10. Un usuario puede recorrer filtros y evidencia con teclado y consultar los mismos valores mediante tablas.
11. En inglés y en español, todas las vistas, ayudas, explicaciones, errores y estados del MVP están traducidos. La misma selección produce exactamente los mismos conteos, tasas y exportación; solo cambia su presentación localizada.
12. Cambiar «English / Español» conserva filtros y vista; recargar conserva el idioma elegido. Se prueban la selección inicial desde navegador y el fallback a inglés.
13. Con un lector de pantalla, el idioma y las etiquetas corresponden a la selección. Alias, IDs y texto original de tickets permanecen fieles a la fuente y rotulados adecuadamente.

## 8. Validación, entrega y decisiones pendientes

**Éxito del dashboard, objetivo propuesto:** en una prueba con representantes de Product, Data y Support que cubra ambos idiomas, todos identifican en menos de cinco minutos el cambio de aceptación, la caída de ofertas de la cohorte afectada y el límite causal; cada uno llega a las filas utilizadas. Medir tiempo, exactitud y errores de interpretación por idioma. No existe una línea base de usabilidad medida todavía.

**Éxito operativo posterior:** aceptación, missed y distribución de ofertas, con métricas de rapidez de asignación y cobertura cuando haya instrumentación. Un dashboard por sí solo no garantiza que mejoren.

| Etapa | Entregable y condición de avance | Responsable propuesto |
|---|---|---|
| A. Validación | Reconocer cobertura, método, zona horaria y corte provisional; definir fuente de actualización | Ravi + PM |
| B. Prototipo | Resumen, comparación, distribución y evidencia en inglés y español con la instantánea actual | Sofia + PM |
| C. Construcción del MVP | Cumplir R1–R9 y R12; pruebas numéricas, de idioma y accesibilidad; estimación pendiente | Marcus + Data |
| D. Piloto interno | Prueba de tareas con Product, Data y Support; corregir errores de interpretación | PM + Nadia |
| E. Uso recurrente | Confirmar permisos, actualización y responsabilidades; decidir prioridad de R10–R11 | Helen + equipo |

Preguntas abiertas: hora y zona del despliegue; exhaustividad de la extracción; coincidencia del código de ejemplo con producción; disponibilidad de eventos de entrega/respuesta y ranking; público definitivo; frecuencia de actualización y capacidad de Engineering. Ninguna fecha de entrega ni intervención está acordada con el equipo.

## 9. Fuentes y trabajo relacionado

- [Investigación y propuesta de intervención](investigacion-4-2.md).
- [Validación de datos y consultas reproducibles](validacion-datos.md).
- [Cruce de tickets y pings](cruce-tickets-pings.md).
- [159 filas originales](../class-3-ping-rows.csv).
- [Release 4.2 y comentarios](https://app.notion.com/p/4-2-3eac8516f50181499fc4c5cf15c1ace7).
- [Definición del producto Dispatch](https://app.notion.com/p/Rook-Dispatch-3eac8516f5018150bcc2cabf6a6e5e86).
- [Código de referencia](../00-rook/code/dispatch-routing/README.md); no equivale a una verificación de producción.
- [Dashboard de investigación existente](https://rook-ceo-decision-room.wintrysiren512.chatgpt.site), instantánea de entrevistas y tickets, con acceso privado.
