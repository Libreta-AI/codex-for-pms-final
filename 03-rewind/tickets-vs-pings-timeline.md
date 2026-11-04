# Do support tickets and pings agree?

Yes on the broad direction and the two main symptoms, but not on every literal account or on who was affected. This is a comparison of fictional Rook records, not a causal evaluation of 4.2.

## When the signals appear

- **Earlier examples:** #3014, filed 14 July, describes an offer moving on while The Undertow had no signal. #3034, filed 4 August, describes late/absent notifications on Ironvale's older phone. Those symptoms did not first exist on release day.
- **12 August:** the first new offer-moved-on complaint is #3041, filed at 15:41:57 local, describing an incident that morning. That day's ping records show 11/25 taken (44%) and 7/25 missed (28%). On 10 August the figures were 24/32 taken and 0 missed; on 11 August, 13/19 and 1 missed. Daily counts are small, but the deterioration continues on 13 August (10/25 taken, 12 missed) and through the rest of the transition week.
- **13–16 August:** total ticket volume rises to 3, 5, 4 and 5 per day. These are all-topic tickets, including non-routing issues, not a Dispatch incident rate.
- **17 August:** #3060 is the first quiet-workload report, about Farlight. Corporal Ashgrove and The Undertow first file that symptom on 20 August; Halfmoon on 23 August. The first full week after release is also where the sharp decline in offers to the four most affected responders becomes clear.

The ticket date is when someone wrote in. It does not establish the incident's date or the first moment a problem existed. The exact deployment time and source timezone remain unconfirmed.

## Weekly alignment

The four-responder group is Farlight, Meteor Mite, The Undertow and Vesper, selected after inspecting the observed declines. Ticket categories overlap. All-topic tickets include Supply and unrelated topics.

| Week starting | Pings | Taken / pings | Missed | Pings to four-responder group | All tickets | Quiet-workload tickets | Offer-moved-on tickets |
|---|---:|---:|---:|---:|---:|---:|---:|
| 29 Jun | 172 | 132/172 = 76.74% | 3 | 49 | 6 | 0 | 0 |
| 6 Jul | 170 | 131/170 = 77.06% | 4 | 48 | 6 | 0 | 0 |
| 13 Jul | 174 | 133/174 = 76.44% | 6 | 48 | 8 | 0 | 1 |
| 20 Jul | 176 | 132/176 = 75.00% | 5 | 50 | 5 | 0 | 0 |
| 27 Jul | 170 | 132/170 = 77.65% | 4 | 50 | 7 | 0 | 0 |
| 3 Aug | 172 | 134/172 = 77.91% | 2 | 49 | 7 | 0 | 0 |
| 10 Aug · transition | 177 | 96/177 = 54.24% | 38 | 43 | 20 | 0 | 7 |
| 17 Aug | 158 | 104/158 = 65.82% | 28 | 16 | 27 | 8 | 3 |
| 24 Aug | 162 | 108/162 = 66.67% | 24 | 6 | 32 | 13 | 3 |
| 31 Aug | 165 | 120/165 = 72.73% | 21 | 3 | 25 | 9 | 2 |

Four further tickets were filed on 7 September, including two quiet-workload reports. They are excluded from this aligned table because ping coverage ends 6 September. The 4 August delivery complaint is separate from the two symptom columns.

The sequence is: an immediate acceptance/missed deterioration around 12 August; increasingly unequal offer volume visible in the following full weeks; quiet-workload reports starting 17 August and continuing even while the aggregate acceptance rate improves. The low four-responder count on any one day is insufficient to date the onset precisely; weekly and rolling windows are more useful for these sparse counts.

## Where the sources agree and disagree

| Ticket | Report | Database check | Assessment |
|---|---|---|---|
| #3073 · Undertow · 20 Aug | Six pings in the preceding seven days | Six pings in the seven days ending at the filing timestamp | Exact count agrees |
| #3086 · Halfmoon · 23 Aug | Eight pings in the preceding seven days | Eight pings in that timestamp-relative window | Exact count agrees |
| #3060 · Farlight · 17 Aug | Phone has not gone off in three days | Two pings in preceding 72 hours: 14 Aug 16:32:44 missed; 14 Aug 21:22:33 taken | Literal three-day claim does not match; wording or reference window needs clarification |
| #3070 · Corporal Ashgrove · 20 Aug | Same three-day statement | Two pings in preceding 72 hours: 17 Aug 11:33:33 turned down; 17 Aug 18:59:30 taken | Same discrepancy; do not discard the broader observed decline |

Recorded sends alone do not prove notification delivery. An accepted offer is stronger evidence of engagement, but it still does not explain exactly what a handler meant by the phone not going off. These comparisons align an alias and a declared window; the tickets contain no callout ID for a definitive incident join.

Farlight and The Undertow appear in both repeated complaints and sharp recorded declines. Corporal Ashgrove and Halfmoon complain too, with more moderate declines. **Meteor Mite and Vesper have sharp declines with no tickets at all in the 147-record sample.** Support therefore identifies real issues but misses part of the affected population.

## Reproducible queries

```sql
SELECT sent_at::date AS day, COUNT(*) AS pings,
       COUNT(*) FILTER (WHERE outcome='taken') AS taken,
       COUNT(*) FILTER (WHERE outcome='missed') AS missed
FROM rook.pings
WHERE sent_at >= '2026-08-03'
GROUP BY 1 ORDER BY 1;
```

```sql
SELECT t.ticket_number, t.filed_at, t.about_responder,
       p.callout_number, p.sent_at, p.outcome
FROM rook.support_tickets t
JOIN rook.pings p
  ON p.responder=t.about_responder
 AND p.sent_at >= t.filed_at - INTERVAL '3 days'
 AND p.sent_at < t.filed_at
WHERE t.ticket_number IN (3060,3070)
ORDER BY t.ticket_number,p.sent_at;
```

```sql
SELECT t.ticket_number, t.filed_at, t.about_responder,
       COUNT(p.sent_at) AS pings_previous_seven_days
FROM rook.support_tickets t
LEFT JOIN rook.pings p
  ON p.responder=t.about_responder
 AND p.sent_at >= t.filed_at - INTERVAL '7 days'
 AND p.sent_at < t.filed_at
WHERE t.ticket_number IN (3073,3086)
GROUP BY t.ticket_number,t.filed_at,t.about_responder
ORDER BY t.ticket_number;
```

Sources: `rook.pings`, all 147 `rook.support_tickets`, [classification with all ticket IDs](cruce-tickets-pings.md) and [weekly data validation](validacion-datos.md). The dashboard's ticket/ping timeline recalculates this alignment for the selected aliases and dates. Snapshot analysis prepared 3 November 2026.
