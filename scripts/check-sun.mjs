// Checks the site's sunrise and sunset math (src/lib/sun.ts, copied from the app) against published reference times,
// and the theme decision built on it. Run after the build (package.json postbuild) and on its own: npm run check:sun.
//
// Reference times: the US Naval Observatory's one-day tables (aa.usno.navy.mil/api/rstt/oneday, tz=0), as the app's
// tests/unit/sun.test.ts carries them (fetched 2026-10-27). The bar is two minutes.
// Node 22.18+ loads the .ts module directly (type stripping), so this needs no build step.
import {sunState, sunSpot, decideTheme, delayUntil, themeScript, ZONE_SPOTS, RECHECK_MS} from '../src/lib/sun.ts';

const PLACES = {
  dallas: [32.7767, -96.797],
  london: [51.5074, -0.1278],
  sydney: [-33.8688, 151.2093],
  reykjavik: [64.1466, -21.9426],
  quito: [-0.1807, -78.4678],
  tromso: [69.6492, 18.9553],
};
const USNO = [
  ['dallas', '2026-06-21', '11:20', '01:38'],
  ['dallas', '2026-12-21', '13:26', '23:25'],
  ['dallas', '2026-03-20', '12:31', '00:38'],
  ['london', '2026-06-21', '03:43', '20:22'],
  ['london', '2026-12-21', '08:04', '15:53'],
  ['london', '2026-03-20', '06:03', '18:13'],
  ['sydney', '2026-06-21', '21:00', '06:54'],
  ['sydney', '2026-12-21', '18:41', '09:05'],
  ['sydney', '2026-03-20', '19:59', '08:07'],
  ['reykjavik', '2026-06-21', '02:55', '00:04'],
  ['reykjavik', '2026-12-21', '11:22', '15:29'],
  ['reykjavik', '2026-03-20', '07:29', '19:43'],
  ['quito', '2026-06-21', '11:12', '23:19'],
  ['quito', '2026-12-21', '11:08', '23:16'],
  ['quito', '2026-03-20', '11:18', '23:24'],
  ['tromso', '2026-03-20', '04:44', '17:02'],
];
const at = (date, hhmm) => Date.parse(`${date}T${hhmm}:00Z`);
const MIN = 60_000;
const nearest = (events, kind, t) => events.filter((e) => e.kind === kind).reduce((b, e) => (Math.abs(e.at - t) < Math.abs(b.at - t) ? e : b));

const problems = [];
const expect = (ok, msg) => ok || problems.push(msg);

for (const [place, date, rise, set] of USNO) {
  const [lat, lon] = PLACES[place];
  const s = sunState(at(date, '12:00'), lat, lon);
  const r = nearest(s.events, 'rise', at(date, rise));
  const t = nearest(s.events, 'set', at(date, set));
  const dr = Math.abs(r.at - at(date, rise)) / MIN;
  const ds = Math.abs(t.at - at(date, set)) / MIN;
  expect(dr <= 2, `${place} ${date}: sunrise off by ${dr.toFixed(1)} min`);
  expect(ds <= 2, `${place} ${date}: sunset off by ${ds.toFixed(1)} min`);
}

// Dark after sunset and before sunrise, light in between (Dallas, 2026-12-21: rise 13:26Z, set 23:25Z).
const dallas = ZONE_SPOTS['America/Chicago'];
expect(decideTheme('auto', at('2026-12-21', '18:00'), dallas).dark === false, 'Dallas at noon is not light');
expect(decideTheme('auto', at('2026-12-21', '23:40'), dallas).dark === true, 'Dallas after sunset is not dark');
expect(decideTheme('auto', at('2026-12-21', '13:00'), dallas).dark === true, 'Dallas before sunrise is not dark');
expect(decideTheme('auto', at('2026-12-21', '13:40'), dallas).dark === false, 'Dallas after sunrise is not light');
// The visitor's choice wins over the sun.
expect(decideTheme('light', at('2026-12-21', '23:40'), dallas).dark === false, 'Light did not win at night');
expect(decideTheme('dark', at('2026-12-21', '18:00'), dallas).dark === true, 'Dark did not win at noon');
// The next change is the next sunset, and the timer waits for it (at most RECHECK_MS).
const noon = decideTheme('auto', at('2026-12-21', '23:00'), dallas);
expect(noon.next && noon.next.kind === 'set' && Math.abs(noon.next.at - at('2026-12-21', '23:25')) <= 2 * MIN, 'the next event after 23:00Z is not the 23:25Z sunset');
expect(delayUntil(noon.next, at('2026-12-21', '23:00')) <= RECHECK_MS, 'the timer waits longer than RECHECK_MS');
// Polar night in Tromso: dark at noon, no next event.
const polar = sunState(at('2026-12-21', '11:00'), ...PLACES.tromso);
expect(polar.dark === true && polar.next === null, 'Tromso at the solstice is not a polar night');
// Where the sun is worked out for: the zone's city, else the UTC offset's longitude.
expect(sunSpot('Europe/London', 0)[0] === 51.51, 'a known zone does not give its city');
expect(sunSpot('Etc/Unknown', -360)[1] === -90, 'UTC-6 does not give longitude -90');
// The inline script stands alone.
expect(!/\b(require|import)\b/.test(themeScript()), 'the inline theme script references a module');
try {
  new Function(themeScript());
} catch (e) {
  problems.push(`the inline theme script does not parse: ${e.message}`);
}

if (problems.length) {
  console.error(problems.join('\n'));
  process.exit(1);
}
console.log(`check-sun: ${USNO.length} USNO sunrises and sunsets within 2 minutes; theme decisions hold`);
