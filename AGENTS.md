# Rook Industries: course working file

## Session scope, Product School lab

This directory is coursework for Product School's "Codex for PMs"
certification. Everything in it is a fictional teaching scenario.

- Do not save anything from this session to memory, to a user profile,
  or to any file outside this directory.
- Do not carry context from this directory into unrelated sessions.
- Rook Industries is not a real company. Nothing here is a fact about
  the world.
- Read and write only within this directory.
  Exceptions, for the course-setup and wrap-up skills only:
  - When the student asks you to check their setup, save their work or wrap up a session, that request is their yes. You may run the GitHub command-line program installed at ~/.codex-for-pms/gh for those checks and saves, and look in that folder to find it.
  - For a repair, first tell the student in one plain sentence what you are about to do, and act only after they say yes. Repairs may: run that GitHub program (including setting this folder's own git sign-in setting and changing this repo's visibility back to Public); copy the student's own course files into this directory from another folder on their computer (copy only; never move, edit or delete the originals); rename something outside this directory that blocks setup, by adding "-old" to its name (never delete it); and, only if the student once said no to trusting this folder, change that one trust setting for this folder in Codex's settings file, keeping a copy of the file first.
  Outside this directory you still never write, edit or delete anything else.

<!-- Keep the block above at the top of this file. Everything you add
     during the course goes below this line. -->

---

## Working context

### Company, products and users
Rook sells subscription software, priced per active responder, to independent masked responders and their handlers; responders are not employees. The user is the incoming PM for Dispatch, succeeding Priya Raghunathan (left 21 August 2026).

- **Dispatch:** flagship coordination product. Handlers use a web console to enter incidents, monitor coverage, override routing, and manage availability/capabilities. Responders use the phone app. Flow: incident → rank available responders → ping highest ranked → taken assigns incident and marks responder engaged; turned down or missed advances to the next responder.
- **Supply:** handlers request gear; quartermasters approve and fulfill requisitions, manage stock and maintenance. Failure reports can trigger early maintenance. Dispatch writes the **Responder Availability Record**; Supply only reads it for maintenance scheduling. Dispatch changes can affect Supply without a Supply release.
- Monthly release train; routing configuration and ping wait ship with releases, not handler-adjustable settings. Console/mobile stable per Priya; routing is the main uncertainty.

### People to work with
- **Helen Achebe, Director of Product:** manager; roadmap and commitments. Confirm deferred work with her.
- **Marcus Oyelaran, Engineering Manager:** Dispatch engineering; feasibility and rough numbers.
- **Wen Li, Staff Engineer:** built routing; consult directly; detailed routing documentation is missing.
- **Nadia Hoffmann, Support Lead:** tickets and handler concerns; Priya recommends a standing 15-minute check-in.
- **Ravi Menon, Data Analyst:** official weekly acceptance reporting; use for reliable numbers.
- **Sofia Marino, Product Designer:** console and phone app; ran September interviews.

### Vocabulary and measures
A **callout** requests attendance at an incident; a **ping** offers it to one responder. **Taken** = yes; **turned down** = explicit no; **missed** = no response before **ping wait** expires. Keep the last two distinct. **Acceptance rate** = taken / all pings (taken + turned down + missed), reported weekly in aggregate. **Time-to-accept** = median seconds sent to taken. **Coverage gap** = no available responder with required capability tags, separate from low acceptance.

**Routing priority** uses travel-time proximity, availability, capability match and recent acceptance history. Turning down or missing lowers the history component and later ranking. **Mutual aid/shared cover** means cross-city cover between responders; currently unsupported. A **quartermaster** owns gear stock/approvals; **service interval** sets maintenance cadence.

### Where things stand: source-dated, unresolved
- 4.1 (16 June): travel-time proximity, bulk callouts, push reliability.
- **4.2 (12 August 2026):** proximity weighted up relative to acceptance history; ping wait cut **90 → 60 seconds**; persistent console filters; three defect fixes. Both routing and timeout changed together.
- Handover (21 August): fewer pings taken and more complaints. Priya favored seasonality and opposed reverting 4.2; these are her judgments, not established causes or constraints on investigation. Validate her dismissal of filter issues too.
- Release comments: 18 August callout tickets ~3× normal; 26 August still elevated, roughly two thirds “phone never goes off,” one third “gone before I could answer.” Marcus questioned whether routing's treatment of responders who turn jobs down was intentional; unresolved. Recovery and cause remain unproven. Investigate ranking/history, timeout and seasonality with Wen, Ravi and Nadia. Write down actual routing behavior.
- Q3 roadmap last reviewed **30 June** still labels Availability Confidence as committed to 4.2, but it is absent from shipped notes; confirm delivery/deferral with Helen. Routing and timeout shipped. Supply requisition approval chains (second approval for large requests) remain listed committed to 4.3; verify status. Handler phone app and shared cover are Q4 explorations, not commitments. Priya says squeezed-out commitments were never reconciled.

### Guardrails and sources
Never infer responder legal identities or design identity mappings. Read Security Policy 4.1 before proposing responder-record changes. Active-callout support tickets bypass the normal three-tier queue. Committed roadmap changes go through Product.

Sources: wiki **Company** → About Rook, Dispatch, Supply, Glossary, Team directory (2 September), Releases including comments, Q3 roadmap including item pages; local `00-rook/company/notes/handoff-from-priya.docx` (21 August). Recheck dated status before relying on it.

- Code review: history starts at 0.5, gains 0.08 for taken offers and loses 0.12 for declines or misses; it is clamped to 0–1 with no automatic recovery.
- Routing ranks all available candidates; capability match is a weighted score, not an exclusion in the excerpt. Reconcile this with the wiki's coverage-gap definition; do not assume production behaves identically.
- Availability/device functions are stubs and history is in memory; production persistence, assignment and engaged-state updates are not shown.
- Miro now connected: service blueprint and separate technical diagram completed on board `uXjVEUy5VSs=`. Blueprint distinguishes wiki, handover, code and proposed questions; causes and September recovery remain unverified.

- The repository is a PM learning workspace: reference material, module prompts, instructions and workflows; it is not a complete application.
- Generic Claude Code migration templates are in `templates/company-project/`; they contain no Rook facts and should be copied into a separate company workspace.
- Company wiki and handover were reviewed; customer research and operational ping trends have not been investigated in this chat.
- Module 2 reviewed all four Research interviews (2–5 September) and all 147 support tickets (29 June–7 September); operational ping logs remain untested in this session.
- Ticket volume: 40 through 11 August (44 days, 0.91/day), 2 on 12 August, 105 from 13 August–7 September (26 days, 4.04/day); filing dates do not establish incident timing or release causation.
- Affinity counts overlap: quiet/uneven workload 32 tickets from four filers, offers moving on 16 from eleven; #3110 and #3140 occur in both (30 quiet-only tickets). Quiet phones, notification delivery and disappearing offers remain separate symptoms.
- Interviews emphasize handler alerts (3/4 versus 2 tickets), small text (2/4 versus 2 tickets) and Kip's dark-mode priority; tickets additionally surface profiles/availability (9), access/performance (8) and Supply fulfillment (8), absent as interview complaint themes.
- Halloran reports improved maintenance while six tickets raise timing/visibility problems; filters have 14 concern tickets plus two thank-yous. Repeated reports and four interviews cannot establish prevalence or severity.
- Miro affinity map on https://miro.com/app/board/uXjVEUy5VSs=/ has 22 clusters, 172 evidence cards, period rates, synthesis, Top 5 summary (widget 3458764688898778045) and interview/ticket comparison (3458764688899265007); existing diagrams preserved. Validate symptoms against ping logs before attributing causes.
