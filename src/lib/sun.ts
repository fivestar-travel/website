/**
 * Light or dark by the sun, as the FiveStar app does it: the site is dark from local sunset to sunrise unless the
 * visitor picked Light or Dark. Copied from the app (apps/fivestar/src/app/lib/sun.ts in the app repo), which works out
 * sunrise and sunset in the browser with NOAA's solar calculator (https://gml.noaa.gov/grad/solcalc/, the algorithm of
 * Jean Meeus's "Astronomical Algorithms"): no network call, no dependency. Keep the two copies the same;
 * scripts/check-sun.mjs holds this one to the US Naval Observatory's published times.
 *
 * Where the sun is worked out for: a marketing site never asks for the visitor's location, so it is estimated from the
 * browser's time zone. A known zone gives its biggest city (ZONE_SPOTS: America/Chicago is Dallas), close enough for
 * sunset (a minute of sunset is about 15 km east or west). An unknown zone falls back to the longitude its UTC offset
 * implies (15 degrees an hour) at latitude 35 north; that can put sunset off by up to an hour or so, which only moves
 * when the page turns dark.
 *
 * sunState is written to stand alone, with no reference to anything outside its own body: docusaurus.config.ts sends
 * its source to the browser as the inline script that sets the theme before the first paint (themeScript below).
 */

export type SunEvent = { at: number; kind: "rise" | "set" };
export type SunState = {
  /** Between sunset and sunrise, or a polar night. */
  dark: boolean;
  /** The next sunrise or sunset (ms since the epoch), or null in a polar day or night. */
  next: SunEvent | null;
  /** "day" or "night" when the sun neither rises nor sets around now. */
  polar: "day" | "night" | null;
  /** The sunrises and sunsets from two days before now to two days after, in order. */
  events: SunEvent[];
};

/** The sun at a place and an instant: light or dark, and when that changes next. Self-contained (see above). */
export function sunState(ms: number, lat: number, lon: number): SunState {
  var rad = Math.PI / 180;
  var deg = 180 / Math.PI;
  // Julian centuries since J2000.0, from a Julian day.
  function cent(jd: number) {
    return (jd - 2451545.0) / 36525.0;
  }
  function meanLong(t: number) {
    var l = (280.46646 + t * (36000.76983 + t * 0.0003032)) % 360;
    return l < 0 ? l + 360 : l;
  }
  function meanAnomaly(t: number) {
    return 357.52911 + t * (35999.05029 - 0.0001537 * t);
  }
  function eccentricity(t: number) {
    return 0.016708634 - t * (0.000042037 + 0.0000001267 * t);
  }
  function eqOfCenter(t: number) {
    var m = meanAnomaly(t) * rad;
    return Math.sin(m) * (1.914602 - t * (0.004817 + 0.000014 * t)) + Math.sin(2 * m) * (0.019993 - 0.000101 * t) + Math.sin(3 * m) * 0.000289;
  }
  function apparentLong(t: number) {
    var omega = 125.04 - 1934.136 * t;
    return meanLong(t) + eqOfCenter(t) - 0.00569 - 0.00478 * Math.sin(omega * rad);
  }
  function obliquity(t: number) {
    var seconds = 21.448 - t * (46.815 + t * (0.00059 - t * 0.001813));
    var e0 = 23.0 + (26.0 + seconds / 60.0) / 60.0;
    return e0 + 0.00256 * Math.cos((125.04 - 1934.136 * t) * rad);
  }
  function declination(t: number) {
    return Math.asin(Math.sin(obliquity(t) * rad) * Math.sin(apparentLong(t) * rad)) * deg;
  }
  // The equation of time, in minutes.
  function eqOfTime(t: number) {
    var e = obliquity(t) * rad;
    var l0 = meanLong(t) * rad;
    var ec = eccentricity(t);
    var m = meanAnomaly(t) * rad;
    var y = Math.tan(e / 2) * Math.tan(e / 2);
    var v = y * Math.sin(2 * l0) - 2 * ec * Math.sin(m) + 4 * ec * y * Math.sin(m) * Math.cos(2 * l0) - 0.5 * y * y * Math.sin(4 * l0) - 1.25 * ec * ec * Math.sin(2 * m);
    return 4 * v * deg;
  }
  // cos of the hour angle at sunrise: above 1 the sun stays down all day, below -1 it stays up.
  function haArg(t: number) {
    var d = declination(t) * rad;
    var phi = lat * rad;
    return Math.cos(90.833 * rad) / (Math.cos(phi) * Math.cos(d)) - Math.tan(phi) * Math.tan(d);
  }
  // Minutes after 0h UTC of the Julian day jd0 at which the sun rises or sets; NaN when it does not.
  function eventUtc(rise: boolean, jd: number) {
    var t = cent(jd);
    var a = haArg(t);
    if (a > 1 || a < -1) return NaN;
    var ha = Math.acos(a) * deg;
    return 720 - 4 * (lon + (rise ? ha : -ha)) - eqOfTime(t);
  }
  var day0 = Math.floor(ms / 86400000);
  var events: SunEvent[] = [];
  for (var d = day0 - 2; d <= day0 + 2; d++) {
    var jd0 = d + 2440587.5;
    for (var k = 0; k < 2; k++) {
      var rise = k === 0;
      // NOAA's refinement: the first estimate, then again at the time it gave.
      var first = eventUtc(rise, jd0 + 0.5);
      if (first !== first) continue;
      var better = eventUtc(rise, jd0 + first / 1440);
      if (better !== better) continue;
      events.push({ at: Math.round(d * 86400000 + better * 60000), kind: rise ? "rise" : "set" });
    }
  }
  events.sort(function (a, b) {
    return a.at - b.at;
  });
  var last: SunEvent | null = null;
  var next: SunEvent | null = null;
  for (var i = 0; i < events.length; i++) {
    if (events[i]!.at <= ms) last = events[i]!;
    else if (!next) next = events[i]!;
  }
  // Near the polar circles a day can have a sunrise and no sunset: a missing event in between means the sun did not
  // cross, and what it is doing now is read from the sun itself.
  var a = haArg(cent(ms / 86400000 + 2440587.5));
  var polar: "day" | "night" | null = a > 1 ? "night" : a < -1 ? "day" : null;
  var dark = last ? last.kind === "set" : next ? next.kind === "rise" : polar === "night";
  if (polar && (!next || next.at - ms > 86400000)) {
    dark = polar === "night";
    next = null;
  }
  return { dark: dark, next: next, polar: polar, events: events };
}


/**
 * A representative place for each common time zone: its biggest city, near enough for sunrise (a minute of sunset
 * is about 15 km east or west). Kept as plain data so the inline script can carry it.
 */
export const ZONE_SPOTS: Record<string, [number, number]> = {
  "America/New_York": [40.71, -74.01],
  "America/Detroit": [42.33, -83.05],
  "America/Indiana/Indianapolis": [39.77, -86.16],
  "America/Kentucky/Louisville": [38.25, -85.76],
  "America/Chicago": [32.78, -96.8],
  "America/Denver": [39.74, -104.99],
  "America/Boise": [43.62, -116.2],
  "America/Phoenix": [33.45, -112.07],
  "America/Los_Angeles": [34.05, -118.24],
  "America/Anchorage": [61.22, -149.9],
  "America/Juneau": [58.3, -134.42],
  "Pacific/Honolulu": [21.31, -157.86],
  "America/Puerto_Rico": [18.47, -66.11],
  "America/Toronto": [43.65, -79.38],
  "America/Montreal": [45.5, -73.57],
  "America/Vancouver": [49.28, -123.12],
  "America/Edmonton": [53.55, -113.49],
  "America/Winnipeg": [49.9, -97.14],
  "America/Halifax": [44.65, -63.57],
  "America/St_Johns": [47.56, -52.71],
  "America/Regina": [50.45, -104.61],
  "America/Mexico_City": [19.43, -99.13],
  "America/Cancun": [21.16, -86.85],
  "America/Tijuana": [32.51, -117.04],
  "America/Monterrey": [25.69, -100.32],
  "America/Bogota": [4.71, -74.07],
  "America/Lima": [-12.05, -77.04],
  "America/Guayaquil": [-2.17, -79.92],
  "America/Caracas": [10.48, -66.9],
  "America/Santiago": [-33.45, -70.67],
  "America/Argentina/Buenos_Aires": [-34.6, -58.38],
  "America/Sao_Paulo": [-23.55, -46.63],
  "America/Panama": [8.98, -79.52],
  "America/Costa_Rica": [9.93, -84.09],
  "America/Havana": [23.11, -82.37],
  "America/Nassau": [25.05, -77.35],
  "America/Jamaica": [18.0, -76.79],
  "America/Santo_Domingo": [18.49, -69.93],
  "Atlantic/Reykjavik": [64.15, -21.94],
  "Atlantic/Azores": [37.74, -25.67],
  "Atlantic/Canary": [28.12, -15.43],
  "Europe/London": [51.51, -0.13],
  "Europe/Dublin": [53.35, -6.26],
  "Europe/Lisbon": [38.72, -9.14],
  "Europe/Madrid": [40.42, -3.7],
  "Europe/Paris": [48.86, 2.35],
  "Europe/Brussels": [50.85, 4.35],
  "Europe/Amsterdam": [52.37, 4.9],
  "Europe/Berlin": [52.52, 13.4],
  "Europe/Zurich": [47.38, 8.54],
  "Europe/Rome": [41.9, 12.5],
  "Europe/Vienna": [48.21, 16.37],
  "Europe/Prague": [50.08, 14.44],
  "Europe/Warsaw": [52.23, 21.01],
  "Europe/Budapest": [47.5, 19.04],
  "Europe/Copenhagen": [55.68, 12.57],
  "Europe/Oslo": [59.91, 10.75],
  "Europe/Stockholm": [59.33, 18.07],
  "Europe/Helsinki": [60.17, 24.94],
  "Europe/Athens": [37.98, 23.73],
  "Europe/Istanbul": [41.01, 28.98],
  "Europe/Bucharest": [44.43, 26.1],
  "Europe/Kiev": [50.45, 30.52],
  "Europe/Kyiv": [50.45, 30.52],
  "Europe/Moscow": [55.76, 37.62],
  "Africa/Casablanca": [33.57, -7.59],
  "Africa/Cairo": [30.04, 31.24],
  "Africa/Lagos": [6.52, 3.38],
  "Africa/Nairobi": [-1.29, 36.82],
  "Africa/Johannesburg": [-26.2, 28.05],
  "Asia/Dubai": [25.2, 55.27],
  "Asia/Jerusalem": [31.77, 35.21],
  "Asia/Riyadh": [24.71, 46.68],
  "Asia/Tehran": [35.69, 51.39],
  "Asia/Karachi": [24.86, 67.0],
  "Asia/Kolkata": [19.08, 72.88],
  "Asia/Calcutta": [19.08, 72.88],
  "Asia/Kathmandu": [27.72, 85.32],
  "Asia/Dhaka": [23.81, 90.41],
  "Asia/Bangkok": [13.76, 100.5],
  "Asia/Ho_Chi_Minh": [10.82, 106.63],
  "Asia/Jakarta": [-6.21, 106.85],
  "Asia/Singapore": [1.35, 103.82],
  "Asia/Kuala_Lumpur": [3.14, 101.69],
  "Asia/Manila": [14.6, 120.98],
  "Asia/Hong_Kong": [22.32, 114.17],
  "Asia/Shanghai": [31.23, 121.47],
  "Asia/Taipei": [25.03, 121.57],
  "Asia/Seoul": [37.57, 126.98],
  "Asia/Tokyo": [35.68, 139.69],
  "Australia/Perth": [-31.95, 115.86],
  "Australia/Darwin": [-12.46, 130.84],
  "Australia/Adelaide": [-34.93, 138.6],
  "Australia/Brisbane": [-27.47, 153.03],
  "Australia/Sydney": [-33.87, 151.21],
  "Australia/Melbourne": [-37.81, 144.96],
  "Australia/Hobart": [-42.88, 147.33],
  "Pacific/Auckland": [-36.85, 174.76],
  "Pacific/Fiji": [-18.14, 178.44],
  "Pacific/Guam": [13.44, 144.79],
  "Pacific/Tahiti": [-17.53, -149.57],
  "Arctic/Longyearbyen": [78.22, 15.65],
};

/** The latitude used when the time zone is not in ZONE_SPOTS: mid-latitude north, where most visitors are. */
export const FALLBACK_LAT = 35;

/** Where to work the sun out for: the zone's city, else the UTC offset's longitude (minutes east of UTC / 4). */
export function sunSpot(zone: string | null | undefined, offsetEastMinutes: number): [number, number] {
  const s = zone ? ZONE_SPOTS[zone] : undefined;
  if (s) return s;
  return [FALLBACK_LAT, Math.max(-180, Math.min(180, offsetEastMinutes / 4))];
}

/** The browser's own time zone and UTC offset, as sunSpot takes them. */
export function browserSpot(now: Date = new Date()): [number, number] {
  let zone: string | null = null;
  try {
    zone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  } catch {}
  return sunSpot(zone, -now.getTimezoneOffset());
}

export type ThemeMode = 'auto' | 'light' | 'dark';
export const THEME_KEY = 'fivestar.themeMode';
export const MODES: ThemeMode[] = ['auto', 'light', 'dark'];

/** What the page shows: the visitor's choice, else the sun where their time zone is. */
export function decideTheme(mode: ThemeMode, now: number, spot: [number, number]): {dark: boolean; next: SunEvent | null} {
  if (mode === 'light' || mode === 'dark') return {dark: mode === 'dark', next: null};
  const s = sunState(now, spot[0], spot[1]);
  return {dark: s.dark, next: s.next};
}

/** With no sunrise or sunset to wait for (a polar day or night), look again this often; and never wait longer. */
export const RECHECK_MS = 15 * 60 * 1000;
/** How long until the page should decide again: just after the next sunrise or sunset, at most RECHECK_MS. */
export function delayUntil(next: SunEvent | null, now: number): number {
  if (!next) return RECHECK_MS;
  return Math.max(1_000, Math.min(RECHECK_MS, next.at - now + 1_000));
}

export function readMode(): ThemeMode {
  try {
    const v = window.localStorage.getItem(THEME_KEY);
    return v === 'light' || v === 'dark' ? v : 'auto';
  } catch {
    return 'auto';
  }
}

export function writeMode(mode: ThemeMode): void {
  try {
    if (mode === 'auto') window.localStorage.removeItem(THEME_KEY);
    else window.localStorage.setItem(THEME_KEY, mode);
  } catch {}
}

/**
 * The script that runs before the first paint: `?theme=light|dark` in the address (screenshots), else the kept
 * choice, else the sun at the time zone's city. It runs after Docusaurus's own color-mode script, so its word is final.
 */
export function themeScript(): string {
  return `try{(function(){var sunState=${sunState.toString()};var Z=${JSON.stringify(ZONE_SPOTS)};var m=null;try{m=localStorage.getItem(${JSON.stringify(THEME_KEY)})}catch(e){}try{var q=new URLSearchParams(location.search).get("theme");if(q==="light"||q==="dark")m=q}catch(e){}var d;if(m==="light"||m==="dark")d=m==="dark";else{var z=null;try{z=Intl.DateTimeFormat().resolvedOptions().timeZone}catch(e){}var p=z&&Z[z]?Z[z]:[${FALLBACK_LAT},Math.max(-180,Math.min(180,-new Date().getTimezoneOffset()/4))];d=sunState(Date.now(),p[0],p[1]).dark}var h=document.documentElement;h.setAttribute("data-theme",d?"dark":"light");h.setAttribute("data-theme-choice",m==="light"||m==="dark"?m:"system");h.setAttribute("data-theme-mode",m||"auto")})()}catch(e){}`;
}
