import {useEffect, useState, type ReactNode} from 'react';
import styles from './ChatScene.module.css';

/**
 * The hero's little scene: a question types itself into the box, goes out as a bubble, the compass star thinks, the
 * answer streams in and its places drop onto the map, one pin at a time. Then the next question.
 *
 * Everything in it is from the live app: the questions were asked at askfivestar.ai as a guest (Austin, a Saturday
 * afternoon), the answers are short summaries of what it said, and each map is a crop of the app's own map with the
 * pins placed where those places are (projected by the app's map, static/img/screens/map-*.webp).
 *
 * It is decoration for screen readers (aria-hidden), which get the whole first exchange as text instead; it never
 * takes focus. With reduced motion it shows the first exchange, finished, and stays still.
 */

type Pin = {x: number; y: number; tone: 'coral' | 'golden' | 'mint'};
type Scene = {ask: string; reply: string; map: {light: string; dark: string}; alt: string; pins: Pin[]};

const SCENES: Scene[] = [
  {
    ask: 'Anything fun with the kids this afternoon, close by?',
    reply: 'Zilker Park has room to run and a little train on weekends. The Nature & Science Center next door is free, and the Thinkery is hands-on. All three are on the map.',
    map: {light: '/img/screens/map-kids-light.webp', dark: '/img/screens/map-kids-light.webp'},
    alt: 'Map of central Austin',
    pins: [
      {x: 24.46, y: 78.53, tone: 'mint'},
      {x: 17.19, y: 71.34, tone: 'golden'},
      {x: 82.81, y: 26.47, tone: 'golden'},
    ],
  },
  {
    ask: 'Best tacos within a 10 minute walk',
    reply: 'Guero’s Taco Bar is a 2-minute walk and open now. Torchy’s Tacos is 7 minutes down South Congress. Saturday means a line at both, so grab the patio.',
    map: {light: '/img/screens/map-tacos-light.webp', dark: '/img/screens/map-tacos-dark.webp'},
    alt: 'Map of South Congress Avenue, Austin',
    pins: [
      {x: 55.37, y: 22.44, tone: 'coral'},
      {x: 44.63, y: 82.56, tone: 'coral'},
    ],
  },
  {
    ask: 'Plan a Saturday in Austin with the kids',
    reply: 'Start at Zilker Park while they still have energy. Then the Umlauf Sculpture Garden, or the Texas Toy Museum if you want something indoors.',
    map: {light: '/img/screens/map-plan-light.webp', dark: '/img/screens/map-plan-dark.webp'},
    alt: 'Map of Zilker Park and downtown Austin',
    pins: [
      {x: 17.19, y: 39.87, tone: 'mint'},
      {x: 19.24, y: 65.13, tone: 'golden'},
      {x: 82.81, y: 49.62, tone: 'golden'},
    ],
  },
];

/** Where the scene is: how much of the question is typed, whether it was sent, how much answer, how many pins. */
type Frame = {scene: number; typed: number; sent: boolean; thinking: boolean; words: number; map: boolean; pins: number};
const done = (scene: number): Frame => ({scene, typed: 0, sent: true, thinking: false, words: Infinity, map: true, pins: Infinity});

const sleep = (ms: number, signal: {stop: boolean}) =>
  new Promise<void>((resolve) => {
    const t = setTimeout(resolve, ms);
    if (signal.stop) clearTimeout(t);
  });

export default function ChatScene(): ReactNode {
  // The server render and reduced motion both show the first exchange, finished.
  const [f, setF] = useState<Frame>(done(0));

  useEffect(() => {
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return undefined;
    const signal = {stop: false};
    const run = async () => {
      for (let scene = 0; !signal.stop; scene = (scene + 1) % SCENES.length) {
        const s = SCENES[scene];
        const words = s.reply.split(' ').length;
        setF({scene, typed: 0, sent: false, thinking: false, words: 0, map: false, pins: 0});
        await sleep(700, signal);
        for (let i = 1; i <= s.ask.length && !signal.stop; i++) {
          setF((p) => ({...p, typed: i}));
          await sleep(38 + (s.ask[i - 1] === ' ' ? 40 : 0), signal);
        }
        await sleep(450, signal);
        setF((p) => ({...p, sent: true, typed: 0, thinking: true}));
        await sleep(1300, signal);
        setF((p) => ({...p, thinking: false}));
        for (let w = 1; w <= words && !signal.stop; w++) {
          setF((p) => ({...p, words: w}));
          await sleep(55, signal);
        }
        setF((p) => ({...p, map: true}));
        await sleep(500, signal);
        for (let n = 1; n <= s.pins.length && !signal.stop; n++) {
          setF((p) => ({...p, pins: n}));
          await sleep(420, signal);
        }
        await sleep(4200, signal);
      }
    };
    run();
    return () => {
      signal.stop = true;
    };
  }, []);

  const s = SCENES[f.scene];
  const reply = s.reply.split(' ');
  const first = SCENES[0];

  return (
    <figure className={styles.scene}>
      <p className={styles.srOnly}>
        An example from FiveStar. You ask: “{first.ask}” FiveStar answers: “{first.reply}” and pins the three places
        on the map.
      </p>
      <div className={styles.card} aria-hidden="true">
        <div className={styles.thread}>
          {/* Every question and answer, invisible, in the same cell: the card is as tall as the longest from the start. */}
          <div className={styles.stack}>
            {SCENES.map((x) => (
              <div key={x.ask} className={styles.ghost}>
                <div className={styles.you}>{x.ask}</div>
                <div className={styles.star}>
                  <span className={styles.avatar} />
                  <span>{x.reply}</span>
                </div>
              </div>
            ))}
            <div className={styles.live}>
              <div className={`${styles.you} ${f.sent ? styles.youIn : styles.youWait}`}>{s.ask}</div>
              {(f.thinking || f.words > 0) && (
                <div className={styles.star}>
                  <span className={`${styles.avatar} ${f.thinking ? styles.spinning : ''}`}>
                    <img src="/img/mark.svg" alt="" width={26} height={26} className={styles.lightOnly} />
                    <img src="/img/mark-on-dark.svg" alt="" width={26} height={26} className={styles.darkOnly} />
                  </span>
                  {f.thinking ? (
                    <span className={styles.dots}>
                      <i />
                      <i />
                      <i />
                    </span>
                  ) : (
                    <span>{reply.slice(0, f.words).join(' ')}</span>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
        <div className={`${styles.map} ${f.map ? styles.mapIn : ''}`}>
          <img src={s.map.light} alt="" className={styles.lightOnly} width={960} height={600} loading="eager" />
          <img src={s.map.dark} alt="" className={styles.darkOnly} width={960} height={600} loading="lazy" />
          {s.pins.slice(0, f.pins).map((p, i) => (
            <span key={`${f.scene}-${i}`} className={`${styles.pin} ${styles[p.tone]}`} style={{left: `${p.x}%`, top: `${p.y}%`}}>
              <span>{i + 1}</span>
            </span>
          ))}
        </div>
        <div className={styles.input}>
          <span className={styles.inputDisc}>
            <img src="/img/mark-on-dark.svg" alt="" width={22} height={22} />
          </span>
          <span className={styles.inputText}>
            {f.typed > 0 ? s.ask.slice(0, f.typed) : <span className={styles.placeholder}>Ask FiveStar anything…</span>}
            {!f.sent || f.typed > 0 ? <span className={styles.caret} /> : null}
          </span>
          <span className={`${styles.send} ${f.typed > 0 ? styles.sendReady : ''}`}>
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 19V5M5 12l7-7 7 7" />
            </svg>
          </span>
        </div>
      </div>
    </figure>
  );
}
