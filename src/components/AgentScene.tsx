import {useEffect, useState, type ReactNode} from 'react';
import styles from './AgentScene.module.css';

/**
 * The /developers page's little scene: an AI app the traveler already uses, connected to FiveStar. The question types
 * itself, the app calls FiveStar's tools one by one (each a chip with its real tool name), and the answer streams in.
 *
 * It is an illustration of how a connected app plans with FiveStar, not a transcript: the tool names are the real
 * ones (docs/agents-mcp.md in the app repo) and the places are real Austin places, but the wording is ours. It is
 * aria-hidden; screen readers get the first exchange as text. With reduced motion it shows the first one, finished.
 */

type Scene = {ask: string; tools: string[]; reply: string};

const SCENES: Scene[] = [
  {
    ask: 'Plan me a Saturday in Austin with tacos and a swim',
    tools: ['search_places', 'weather', 'route', 'create_trip'],
    reply: 'Done, it’s in FiveStar as “Austin, Saturday”. Breakfast tacos on South Congress, then Barton Springs Pool before the afternoon heat. It’s a short drive between the two.',
  },
  {
    ask: 'Move the swim to the afternoon, and remember I’m vegetarian',
    tools: ['get_trip', 'move_stop', 'remember'],
    reply: 'Swim moved to 3 pm. Noted: vegetarian. I’ll keep the taco stops to places with good veggie options.',
  },
];

type Frame = {scene: number; typed: number; sent: boolean; tools: number; words: number};
const done = (scene: number): Frame => ({scene, typed: 0, sent: true, tools: Infinity, words: Infinity});

const sleep = (ms: number, signal: {stop: boolean}) =>
  new Promise<void>((resolve) => {
    const t = setTimeout(resolve, ms);
    if (signal.stop) clearTimeout(t);
  });

export default function AgentScene(): ReactNode {
  const [f, setF] = useState<Frame>(done(0));

  useEffect(() => {
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return undefined;
    const signal = {stop: false};
    const run = async () => {
      for (let scene = 0; !signal.stop; scene = (scene + 1) % SCENES.length) {
        const s = SCENES[scene];
        setF({scene, typed: 0, sent: false, tools: 0, words: 0});
        await sleep(700, signal);
        for (let i = 1; i <= s.ask.length && !signal.stop; i++) {
          setF((p) => ({...p, typed: i}));
          await sleep(36 + (s.ask[i - 1] === ' ' ? 40 : 0), signal);
        }
        await sleep(400, signal);
        setF((p) => ({...p, sent: true, typed: 0}));
        for (let n = 1; n <= s.tools.length && !signal.stop; n++) {
          await sleep(650, signal);
          setF((p) => ({...p, tools: n}));
        }
        await sleep(600, signal);
        const words = s.reply.split(' ').length;
        for (let w = 1; w <= words && !signal.stop; w++) {
          setF((p) => ({...p, words: w}));
          await sleep(55, signal);
        }
        await sleep(4500, signal);
      }
    };
    run();
    return () => {
      signal.stop = true;
    };
  }, []);

  const s = SCENES[f.scene];
  const first = SCENES[0];
  const reply = s.reply.split(' ');

  return (
    <figure className={styles.scene}>
      <p className={styles.srOnly}>
        An example. In your AI app you ask: “{first.ask}” The app calls FiveStar’s {first.tools.join(', ')} tools and
        answers: “{first.reply}”
      </p>
      <div className={styles.card} aria-hidden="true">
        <div className={styles.bar}>
          <i />
          <i />
          <i />
          <span>your AI app</span>
          <b className={styles.badge}>
            <img src="/img/mark.svg" alt="" width={16} height={16} className={styles.lightOnly} />
            <img src="/img/mark-on-dark.svg" alt="" width={16} height={16} className={styles.darkOnly} />
            FiveStar connected
          </b>
        </div>
        <div className={styles.stack}>
          {/* Every exchange, invisible, in one cell: the card is as tall as the longest from the start. */}
          {SCENES.map((x) => (
            <div key={x.ask} className={styles.ghost}>
              <div className={styles.you}>{x.ask}</div>
              <div className={styles.tools}>
                {x.tools.map((t) => (
                  <code key={t} className={styles.tool}>{t}</code>
                ))}
              </div>
              <div className={styles.reply}>{x.reply}</div>
            </div>
          ))}
          <div className={styles.live}>
            <div className={`${styles.you} ${f.sent ? styles.youIn : styles.youWait}`}>{s.ask}</div>
            <div className={styles.tools}>
              {s.tools.slice(0, f.tools).map((t) => (
                <code key={`${f.scene}-${t}`} className={`${styles.tool} ${styles.toolIn}`}>
                  <span className={styles.tick}>✓</span>
                  {t}
                </code>
              ))}
            </div>
            {f.words > 0 && <div className={styles.reply}>{reply.slice(0, f.words).join(' ')}</div>}
          </div>
        </div>
        <div className={styles.input}>
          <span className={styles.inputText}>
            {f.typed > 0 ? s.ask.slice(0, f.typed) : <span className={styles.placeholder}>Message your AI app…</span>}
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
