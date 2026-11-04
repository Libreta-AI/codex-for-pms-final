/* Deterministic calculations for the historical Rook course snapshot. */
(function (root) {
  'use strict';
  const DAY = 86400000;
  const presets = {
    matched: {before:{start:'2026-07-20',end:'2026-08-09'},after:{start:'2026-08-17',end:'2026-09-06'}},
    date: {before:{start:'2026-06-29',end:'2026-08-11'},after:{start:'2026-08-12',end:'2026-09-06'}},
    full: {before:{start:'2026-06-29',end:'2026-08-09'},after:{start:'2026-08-17',end:'2026-09-06'}}
  };
  const day = value => String(value || '').slice(0, 10);
  const stamp = date => Date.parse(date + 'T00:00:00Z');
  function daysInRange(range) {
    if (!range || !range.start || !range.end) return 0;
    const n = (stamp(range.end) - stamp(range.start)) / DAY + 1;
    return Number.isFinite(n) && n > 0 ? n : 0;
  }
  function clipRange(range, coverage) {
    const start = [range.start, coverage.start].filter(Boolean).sort().pop();
    const end = [range.end, coverage.end].filter(Boolean).sort()[0];
    return {start, end}; // start > end represents an empty interval.
  }
  function weekStart(date) {
    const t = stamp(day(date));
    if (!Number.isFinite(t)) return null;
    const weekday = new Date(t).getUTCDay();
    return new Date(t - ((weekday + 6) % 7) * DAY).toISOString().slice(0, 10);
  }
  function selectEvents(events, options = {}) {
    const {start, end, responders = []} = options;
    const aliases = new Set(responders);
    return events.filter(e => (!start || day(e.sent_at) >= start) &&
      (!end || day(e.sent_at) <= end) && (!aliases.size || aliases.has(e.responder)));
  }
  function summary(events) {
    const s = {pings:events.length,taken:0,turned_down:0,missed:0,unknown:0};
    for (const e of events) {
      if (e.outcome === 'taken') s.taken++;
      else if (e.outcome === 'turned down') s.turned_down++;
      else if (e.outcome === 'missed') s.missed++;
      else s.unknown++;
    }
    s.acceptance = s.pings ? s.taken * 100 / s.pings : null;
    s.missedRate = s.pings ? s.missed * 100 / s.pings : null;
    s.declinedRate = s.pings ? s.turned_down * 100 / s.pings : null;
    return s;
  }
  function grouped(events, byResponder) {
    const groups = new Map();
    for (const e of events) {
      const week = weekStart(e.sent_at);
      const key = JSON.stringify(byResponder ? [week,e.responder] : [week]);
      if (!groups.has(key)) groups.set(key, []);
      groups.get(key).push(e);
    }
    return [...groups.entries()].map(([key, es]) => {
      const [week_start, responder] = JSON.parse(key);
      return {week_start, ...(byResponder ? {responder} : {}), ...summary(es)};
    }).sort((a,b) => a.week_start.localeCompare(b.week_start) ||
      String(a.responder || '').localeCompare(String(b.responder || '')));
  }
  const weeklyRows = events => grouped(events, true);
  const summarizeWeeks = events => grouped(events, false);
  function compare(events, beforeRange, afterRange, responders = []) {
    return {
      before: summary(selectEvents(events, {...beforeRange,responders})),
      after: summary(selectEvents(events, {...afterRange,responders}))
    };
  }
  function distribution(events, beforeRange, afterRange, responders = []) {
    const aliases = responders.length ? [...new Set(responders)] : [...new Set(events.map(e => e.responder))];
    const totals = compare(events, beforeRange, afterRange, responders);
    const beforeDays = daysInRange(beforeRange), afterDays = daysInRange(afterRange);
    return aliases.sort().map(responder => {
      const {before,after} = compare(events,beforeRange,afterRange,[responder]);
      const beforePerWeek = beforeDays ? before.pings * 7 / beforeDays : null;
      const afterPerWeek = afterDays ? after.pings * 7 / afterDays : null;
      const delta = beforePerWeek !== null && afterPerWeek !== null ? afterPerWeek - beforePerWeek : null;
      return {responder,before,after,beforePerWeek,afterPerWeek,delta,
        deltaPct:beforePerWeek > 0 && delta !== null ? delta * 100 / beforePerWeek : null,
        shareBefore:totals.before.pings ? before.pings * 100 / totals.before.pings : null,
        shareAfter:totals.after.pings ? after.pings * 100 / totals.after.pings : null};
    });
  }
  root.RookMetrics = {presets,day,daysInRange,clipRange,weekStart,selectEvents,summary,weeklyRows,summarizeWeeks,compare,distribution};
  if (typeof module !== 'undefined' && module.exports) module.exports = root.RookMetrics;
})(globalThis);
