import {useCallback, useEffect, useRef, useState, type ReactNode} from 'react';
import {useColorMode} from '@docusaurus/theme-common';
import {browserSpot, decideTheme, delayUntil, MODES, readMode, writeMode, type SunEvent, type ThemeMode as Mode} from '@site/src/lib/sun';
import styles from './ThemeMode.module.css';

/**
 * Auto (by the sun), Light or Dark, the way the FiveStar app does it (ThemeToggle.tsx there). Auto is the default:
 * dark from sunset to sunrise where the browser's time zone is (src/lib/sun.ts). The inline script in
 * docusaurus.config.ts decides before the first paint; this keeps deciding while the page is open, just after each
 * sunrise and sunset and whenever the tab comes back into view, so the page turns dark at sunset without a reload.
 */

const LABEL: Record<Mode, string> = {auto: 'Auto (by the sun)', light: 'Light', dark: 'Dark'};
const time = (ms: number) => new Date(ms).toLocaleTimeString([], {hour: 'numeric', minute: '2-digit'});

function Icon({mode, dark}: {mode: Mode; dark: boolean}): ReactNode {
  const sun = (
    <>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </>
  );
  const moon = <path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5Z" />;
  const show = mode === 'auto' ? (dark ? 'dark' : 'light') : mode;
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {show === 'dark' ? moon : sun}
    </svg>
  );
}

export default function ThemeMode({mobile}: {mobile?: boolean}): ReactNode {
  const {setColorMode} = useColorMode();
  const [mode, setMode] = useState<Mode>('auto');
  const [dark, setDark] = useState(false);
  const [next, setNext] = useState<SunEvent | null>(null);
  const [open, setOpen] = useState(false);
  // Nothing is decided until the kept choice is read: deciding on the default first would flash the wrong theme.
  const [ready, setReady] = useState(false);
  const box = useRef<HTMLDivElement>(null);

  // Read the kept choice once, after hydration (the server render cannot know it).
  useEffect(() => {
    setMode(readMode());
    setDark(document.documentElement.getAttribute('data-theme') === 'dark');
    setReady(true);
  }, []);

  const apply = useCallback(
    (m: Mode) => {
      const d = decideTheme(m, Date.now(), browserSpot());
      setDark(d.dark);
      setNext(d.next);
      document.documentElement.setAttribute('data-theme-mode', m);
      // Through Docusaurus, so its own state (themed images, the navbar logo) agrees; never persisted there.
      // (The options argument is in Docusaurus's code but not its types.)
      (setColorMode as (m: 'light' | 'dark', o: {persist: boolean}) => void)(d.dark ? 'dark' : 'light', {persist: false});
      return d;
    },
    [setColorMode],
  );

  // The sun clock: decide now, again just after the next sunrise or sunset, and when the tab is shown again.
  useEffect(() => {
    if (!ready) return undefined;
    let timer: ReturnType<typeof setTimeout> | undefined;
    const tick = () => {
      const d = apply(mode);
      if (mode === 'auto') timer = setTimeout(tick, delayUntil(d.next, Date.now()));
    };
    tick();
    const again = () => {
      if (document.visibilityState !== 'visible') return;
      clearTimeout(timer);
      tick();
    };
    document.addEventListener('visibilitychange', again);
    return () => {
      clearTimeout(timer);
      document.removeEventListener('visibilitychange', again);
    };
  }, [ready, mode, apply]);

  useEffect(() => {
    if (!open) return;
    const away = (e: MouseEvent) => box.current && !box.current.contains(e.target as Node) && setOpen(false);
    const esc = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('mousedown', away);
    document.addEventListener('keydown', esc);
    return () => {
      document.removeEventListener('mousedown', away);
      document.removeEventListener('keydown', esc);
    };
  }, [open]);

  const choose = (m: Mode) => {
    writeMode(m);
    setMode(m);
    setOpen(false);
  };
  const note = mode !== 'auto' ? 'Dark from sunset to sunrise' : next ? (next.kind === 'set' ? `Light until sunset, ${time(next.at)}` : `Dark until sunrise, ${time(next.at)}`) : dark ? 'Dark: the sun is down all day' : 'Light: the sun is up all day';
  const label = `Theme: ${mode === 'auto' ? `Auto, ${dark ? 'dark' : 'light'} by the sun` : LABEL[mode]}`;

  return (
    <div ref={box} className={`${styles.wrap} ${mobile ? styles.mobile : ''}`} data-theme-mode-control>
      <button type="button" className={styles.button} onClick={() => setOpen((o) => !o)} aria-label={label} title={label} aria-haspopup="menu" aria-expanded={open}>
        <Icon mode={mode} dark={dark} />
        {mode === 'auto' && (
          <span className={styles.badge} aria-hidden="true">
            A
          </span>
        )}
      </button>
      {open && (
        <div role="menu" aria-label="Theme" className={styles.menu}>
          {MODES.map((m) => (
            <button key={m} type="button" role="menuitemradio" aria-checked={mode === m} className={`${styles.option} ${mode === m ? styles.on : ''}`} onClick={() => choose(m)} data-theme-option={m}>
              <span className={styles.optionIcon}>
                <Icon mode={m} dark={m === 'auto' ? dark : m === 'dark'} />
              </span>
              <span className={styles.optionText}>
                <span className={styles.optionLabel}>{LABEL[m]}</span>
                {m === 'auto' && <span className={styles.optionNote}>{note}</span>}
              </span>
              {mode === m && (
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true" className={styles.check}>
                  <path d="M5 12.5 10 17l9-10" />
                </svg>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
