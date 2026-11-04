# Verification · 3 November 2026

- Metric tests passed for all 1,696 events, 159 source rows, both date boundaries, the transition week, all three comparison presets, zero denominators, alias filters and unknown outcomes.
- Application tests passed for Spanish/English rendering, language persistence, filter preservation, CSV content and exact export row counts, filtered export consistency across languages, derived Farlight zero, detail-to-evidence navigation and out-of-coverage states.
- Local browser inspection confirmed the desktop layout, 68.45% matched-window result, 63.99% date-split result, 159 source rows, 15 final-week rows/165 pings, responder detail and the ticket-versus-ping timeline.
- Reloading after choosing Spanish preserved Spanish. Switching back to English preserved the selected evidence week.
- CSV generation was verified in the application harness without writing browser downloads outside the course workspace.
- Responsive CSS is included; no separate physical-device or screen-reader test was performed. Performance targets are not formally benchmarked.
- These checks validate this historical snapshot implementation, not completeness of the upstream source or deployment-time causality.
