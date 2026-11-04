# 03 · Rewind: prompts

**Context:** You joined Rook twelve days ago as PM on Dispatch.
Release 4.2 shipped on 12 August, just before you arrived, and
landed badly. This folder is Module 3. Today you ask Rook's
database about pings. The routing code is Module 4, not this folder.

Last session you read four conversations and every support ticket
since 4.2, and found the two piles did not agree.

At the end of the session, type wrap up, and Codex saves the
prompts you wrote yourself below, not the starter prompt, updates
AGENTS.md, and saves your work to GitHub. By Module 6 this file is a
prompt library built from your own questions.

---

### 1.

dime el resumen de todo en español y que siguientes pasos me recomiendas

### 2.

de que estan hablando, que son los pings y que son los taken 

### 3.

para que es este querry
SELECT
  date_trunc('week', sent_at)::date AS week_start,
  responder,
  COUNT(*) AS pings,
  COUNT(*) FILTER (WHERE outcome = 'taken') AS taken
FROM rook.pings
WHERE sent_at >= TIMESTAMP '2026-06-01'
GROUP BY 1, 2
ORDER BY 1, 2;

### 4.

based on all this information you have gathered so far, build a prd for a dashboard 

### 5.

sigue estos siguientes pasos: Mis siguientes pasos recomendados son:

1. **Validar los cálculos con Ravi.** Confirmar cobertura de los datos, hora exacta del lanzamiento y comparación de semanas completas.
2. **Investigar la distribución con Wen y Marcus.** Revisar por qué algunos respondedores dejaron de recibir ofertas: disponibilidad, capacidades, proximidad y penalizaciones del historial. El código revisado penaliza rechazos y ausencias sin recuperación automática; falta confirmar su comportamiento en producción.
3. **Separar los dos cambios de 4.2.** Investigar el efecto del plazo de respuesta de **90 a 60 segundos** y el cambio de ponderación del enrutamiento. Estos totales no permiten distinguirlos.
4. **Cruzar los registros con los tickets junto con Nadia.** Distinguir “no recibo ofertas”, “no llega la notificación” y “la oferta desaparece antes de responder”.
5. **Acordar una intervención medible con Helen y Engineering.** Elegirla según los hallazgos y medir aceptación, pings sin respuesta y distribución por respondedor.

**Priorizaría explicar el aumento de pings sin respuesta y la concentración de ofertas antes de concluir que el sistema se recuperó.**

### 6.

el prd que incluya tener el dashboard en ingles y en español

### 7.

corre el PRD

### 8.

que quiere decir con transicion 

### 9.

Que es lo que crees que estamos tratando de resolver en todo el curso?&#x20;



Cual es tu hipotesis de lo que paso en el area amarilla&#x20;



# Session Context

- Workshop-style class (one of 6) using Codex to investigate product metrics data
- Focus: diagnosing a drop in responder pings following the 4.2 update
- Parallel to Anthropic’s reported impact of AI on engineering productivity (weeks/hours saved)

# Key Finding: 4.2 Update Impact on Pings

- 4 hardest-hit responders received significantly fewer pings per week post-4.2
  - One figure: 83% fewer pings per week
  - Another participant got 67% fewer (likely a per-week vs. total framing difference)
- Ping timeout reduced from 90 to 60 seconds after August 12th
  - If 3 responders miss in sequence before one accepts, that counts as 3 pings, dropping acceptance rate to \~33%
- Farlight and Undertow: 4 and 6 pings both reported on August 20th, matching 15 explicit 7-day ping counts

# Data Investigation Approach

- Used Codex to query metrics directly, similar to querying interview transcripts
- Reconstructed individual callout sequences for affected responders (using Wen and Ravi data)
- Compared affected vs. unaffected responders to isolate the 4.2 impact
- Next lab: cross-reference ping metrics with support/problem tickets from last session
  - Goal: find correlation between ping anomalies and when users started filing problem tickets

# PRD and Dashboard Work

- Ran a PRD build from gathered data; Codex generated tasks, users, and needs:
  - Ravi and Data
  - Brenda, Marcus: engineering
  - Nadia: support
  - Helen: product
- PRD includes a table of needs and observable results
- Plan: use PRD output to build a dashboard and explore further

# Token Limit and Reset

- Hit token limit mid-session after running the PRD and a build request
- Reset available (3 “life saves”); tokens restored
- Suggestion: token allowance may scale with Codex usage over time

# Next Steps

- **Build dashboard from PRD output** (Brenda)Use the Codex-generated PRD to create a dashboard and investigate ping acceptance patterns.
- **Compare ping metrics with last session's problem tickets**Use the provided starter prompt to probe correlations and add visualizations to tell the story over time.

### 10.

say this in english

Sobre **el área amarilla**, mi hipótesis es que la semana del **10 al 16 de agosto** refleja una combinación de los dos cambios de 4.2:

1. **Menos tiempo para responder:** el plazo bajó de 90 a 60 segundos. Es posible que algunas personas que antes alcanzaban a aceptar ahora quedaran registradas como *missed*.
2. **Un nuevo orden de prioridad:** al dar más peso a la cercanía, Dispatch pudo empezar a ofrecer los incidentes en un orden diferente. Algunas personas habrían recibido más oportunidades y otras menos.
3. **Un posible efecto acumulativo:** en el código de referencia, los pings sin respuesta reducen el puntaje de historial. Si eso también ocurre en producción, más expiraciones podrían influir en el orden de futuras ofertas. Todavía no hemos confirmado ese mecanismo.

Los datos son **compatibles con esa hipótesis**: la aceptación semanal cayó de **77,91 %** la semana del 3 de agosto a **54,24 %** en la semana amarilla; los pings sin respuesta subieron de **2 a 38**. Los tickets sobre ofertas que avanzaban empezaron a aparecer desde el 12 de agosto.

Pero no podemos afirmar cuál de los dos cambios causó la caída: se lanzaron juntos, la semana amarilla incluye días anteriores y posteriores al lanzamiento, y no conocemos la hora exacta de activación. También necesitamos comprobar disponibilidad, entrega de notificaciones y comportamiento real del routing con Ravi, Wen y Marcus.

Un detalle sobre el ejemplo de los pings: si **tres personas no responden y una cuarta acepta**, son **4 pings y 1 aceptación: 25 %**. Si son **dos que no responden y una tercera que acepta**, son 3 pings y aproximadamente 33 %. Un mismo incidente puede generar varios pings.

7:28 PM

### 11.

now dig deeper into **Ironvale**
