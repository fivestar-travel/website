import {useState, type ReactNode} from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import AgentScene from '@site/src/components/AgentScene';
import styles from './developers.module.css';

// Connected AI apps, as built in the app repo (docs/agents-mcp.md): one remote MCP server, signed-in travelers only.
const APP = 'https://askfivestar.ai';
const MCP = 'https://askfivestar.ai/mcp';

type Client = {name: string; tone: 'coral' | 'golden' | 'mint' | 'sky' | 'violet'; steps: ReactNode; code?: {label: string; text: string}};

const CLIENTS: Client[] = [
  {
    name: 'Claude',
    tone: 'coral',
    steps: (
      <>
        On claude.ai or in Claude Desktop, open the connectors in your settings and add a <strong>custom connector</strong>{' '}
        with the URL above. Then choose Connect and sign in to FiveStar.
      </>
    ),
  },
  {
    name: 'ChatGPT',
    tone: 'mint',
    steps: (
      <>
        Custom connectors live behind ChatGPT’s <strong>developer mode</strong> (in the apps and connectors settings).
        Turn it on, create a connector with the URL above and OAuth for authentication, then sign in to FiveStar. What
        developer mode allows depends on your ChatGPT plan.
      </>
    ),
  },
  {
    name: 'Claude Code',
    tone: 'golden',
    steps: (
      <>
        Add it from your terminal, then run <code>/mcp</code> inside Claude Code to sign in.
      </>
    ),
    code: {label: 'Terminal', text: `claude mcp add --transport http fivestar ${MCP}`},
  },
  {
    name: 'VS Code',
    tone: 'sky',
    steps: (
      <>
        Add FiveStar to <code>.vscode/mcp.json</code> in your workspace. VS Code offers to sign in the first time it
        starts the server.
      </>
    ),
    code: {label: '.vscode/mcp.json', text: `{\n  "servers": {\n    "fivestar": {\n      "type": "http",\n      "url": "${MCP}"\n    }\n  }\n}`},
  },
  {
    name: 'Cursor',
    tone: 'violet',
    steps: (
      <>
        Add FiveStar to <code>~/.cursor/mcp.json</code>. Cursor opens the FiveStar sign-in in your browser when it
        connects.
      </>
    ),
    code: {label: '~/.cursor/mcp.json', text: `{\n  "mcpServers": {\n    "fivestar": {\n      "url": "${MCP}"\n    }\n  }\n}`},
  },
];

type Tool = {name: string; does: string; destructive?: boolean};
type Group = {scope: string; plain: string; kind: 'read' | 'write'; /** the read scope a write scope brings */ note?: string; tools: Tool[]};

const GROUPS: Group[] = [
  {
    scope: 'places',
    plain: 'See places, routes and weather',
    kind: 'read',
    tools: [
      {name: 'search_places', does: 'Places near a spot or a named place: what they are, how far, real walking or driving minutes, hours, open now.'},
      {name: 'get_place', does: 'One place in detail: description, cuisine, features, step-free access, website, rating.'},
      {name: 'route', does: 'Walk, step-free walk or drive between two places, with turn-by-turn steps.'},
      {name: 'weather', does: 'The forecast at a place or town: now, today’s high and low, the next 12 hours.'},
    ],
  },
  {
    scope: 'trips:read',
    plain: 'See your trips',
    kind: 'read',
    tools: [
      {name: 'list_trips', does: 'Your trips: where, when, who’s going, the hotel, how many stops.'},
      {name: 'get_trip', does: 'One trip, day by day, every stop with its time, notes and spot on the map.'},
    ],
  },
  {
    scope: 'trips:write',
    plain: 'Add and change stops on your trips',
    kind: 'write',
    note: 'trips:read',
    tools: [
      {name: 'create_trip', does: 'A new trip. Already have one to that city on those dates? You get that one back, not a twin.'},
      {name: 'add_stop', does: 'A stop on a day, pinned on the map.'},
      {name: 'move_stop', does: 'A stop to another day or time.'},
      {name: 'update_trip', does: 'Dates, hotel, who’s going or the destination, all at once or not at all.'},
      {name: 'remove_stop', does: 'Takes one stop off a trip.', destructive: true},
    ],
  },
  {
    scope: 'memory:read',
    plain: 'Read your travel preferences',
    kind: 'read',
    tools: [{name: 'recall_preferences', does: 'What FiveStar remembers about how you travel, exactly as you see it in the app.'}],
  },
  {
    scope: 'memory:write',
    plain: 'Save travel preferences you tell it',
    kind: 'write',
    note: 'memory:read',
    tools: [{name: 'remember', does: 'Saves up to five things you said (“I’m vegetarian”, “no red-eyes”), so FiveStar knows them too.'}],
  },
];

/** The compass star, drawn small (the brand mark's axes). */
function Star({className}: {className?: string}): ReactNode {
  return (
    <svg viewBox="-12 -12 24 24" width="22" height="22" className={className} aria-hidden="true">
      <path d="M0 -11 2 0 0 11 -2 0Z" fill="var(--coral)" />
      <path d="M9.5 5.5 -1 1.73 -9.5 -5.5 1 -1.73Z" fill="var(--golden)" />
      <path d="M9.5 -5.5 1 1.73 -9.5 5.5 -1 -1.73Z" fill="var(--indigo)" />
    </svg>
  );
}

function Squiggle(): ReactNode {
  return (
    <svg className={styles.squiggle} viewBox="0 0 300 18" preserveAspectRatio="none" aria-hidden="true">
      <path d="M3 12 C 40 2, 70 18, 105 9 S 170 3, 205 11 S 265 15, 297 5" fill="none" stroke="var(--coral)" strokeWidth="5" strokeLinecap="round" />
    </svg>
  );
}

/** A value to copy, with a button that says when it worked. */
function Copy({text, label}: {text: string; label: string}): ReactNode {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      /* no clipboard (an old browser or an insecure page): the text is right there to select */
    }
  };
  return (
    <button type="button" className={styles.copy} onClick={copy} aria-label={`Copy ${label}`}>
      {copied ? 'Copied!' : 'Copy'}
    </button>
  );
}

function Hero(): ReactNode {
  return (
    <header className={styles.hero}>
      <div className={`container ${styles.heroInner}`}>
        <div className={styles.heroText}>
          <p className={styles.kicker}>Connected AI apps</p>
          <h1 className={styles.title}>
            <span className={styles.sketch}>
              Bring your own AI.
              <Squiggle />
            </span>
            <span className={styles.titleRest}>FiveStar brings the map.</span>
          </h1>
          <p className={styles.lede}>
            Already plan things with Claude, ChatGPT, Claude Code, VS Code or Cursor? Connect it to your FiveStar
            account and it can find real places, check the walk and the weather, and build your trips right in
            FiveStar. Open the app afterward and it’s all there, on the map.
          </p>
          <div className={styles.urlBox}>
            <span className={styles.urlLabel}>Connector URL</span>
            <code className={styles.url}>{MCP}</code>
            <Copy text={MCP} label="the connector URL" />
          </div>
          <p className={styles.note}>
            You sign in with your FiveStar account and say yes on a consent page. No account yet?{' '}
            <Link href={APP}>Ask FiveStar</Link> and sign in there first.
          </p>
        </div>
        <AgentScene />
      </div>
    </header>
  );
}

function Connect(): ReactNode {
  return (
    <section className={styles.section} id="connect" aria-labelledby="connect-title">
      <div className="container">
        <h2 id="connect-title" className={styles.sectionTitle}>Connect your app</h2>
        <p className={styles.intro}>
          Every app does the same dance: it finds FiveStar’s sign-in on its own, opens it in your browser, and you
          approve. Menus move around between versions, so if a label below doesn’t match yours, look for “MCP” or
          “connectors”.
        </p>
        <ol className={styles.clients}>
          {CLIENTS.map((c) => (
            <li key={c.name} className={styles.client}>
              <h3>
                <span className={`${styles.dot} ${styles[c.tone]}`} aria-hidden="true" />
                {c.name}
              </h3>
              <p>{c.steps}</p>
              {c.code && (
                <div className={styles.codeBox}>
                  <div className={styles.codeHead}>
                    <span>{c.code.label}</span>
                    <Copy text={c.code.text} label={`the ${c.name} setup`} />
                  </div>
                  <pre>
                    <code>{c.code.text}</code>
                  </pre>
                </div>
              )}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Consent(): ReactNode {
  return (
    <section className={`${styles.section} ${styles.band}`}>
      <div className={`container ${styles.steps}`}>
        <h2 className={styles.sectionTitle}>Then FiveStar asks you</h2>
        <ol className={styles.stepList}>
          <li>
            <span className={`${styles.stepNum} ${styles.coral}`} aria-hidden="true"><span>1</span></span>
            <div>
              <h3>Sign in</h3>
              <p>With the same account you use in FiveStar: Google, Microsoft, or any other you already sign in with.</p>
            </div>
          </li>
          <li>
            <span className={`${styles.stepNum} ${styles.golden}`} aria-hidden="true"><span>2</span></span>
            <div>
              <h3>Choose what it can do</h3>
              <p>
                The consent page names the app and lists what it’s asking for, in plain words, each with its own
                checkbox. Untick anything you’d rather keep to yourself.
              </p>
            </div>
          </li>
          <li>
            <span className={`${styles.stepNum} ${styles.mint}`} aria-hidden="true"><span>3</span></span>
            <div>
              <h3>Allow, and go plan</h3>
              <p>You’re sent back to your app, and it can start planning with you.</p>
            </div>
          </li>
        </ol>
        <p className={styles.aside}>Apps name themselves, so only approve the one you just connected.</p>
      </div>
    </section>
  );
}

function Tools(): ReactNode {
  return (
    <section className={styles.section} id="tools" aria-labelledby="tools-title">
      <div className="container">
        <h2 id="tools-title" className={styles.sectionTitle}>What it can do</h2>
        <p className={styles.intro}>
          Thirteen tools, each behind a scope you can untick. A write scope brings its read scope along:{' '}
          <code>trips:write</code> includes <code>trips:read</code>, and <code>memory:write</code> includes{' '}
          <code>memory:read</code>. Everything an app writes lands in your own FiveStar, the same trips you see in the
          app.
        </p>
        <div className={styles.groups}>
          {GROUPS.map((g) => (
            <div key={g.scope} className={styles.group}>
              <div className={styles.groupHead}>
                <code className={styles.scope}>{g.scope}</code>
                <span className={styles.plain}>“{g.plain}”</span>
                <span className={`${styles.kind} ${g.kind === 'write' ? styles.kindWrite : ''}`}>
                  {g.kind === 'write' ? 'changes things' : 'read-only'}
                </span>
              </div>
              {g.note && (
                <p className={styles.groupNote}>
                  Brings <code>{g.note}</code> with it.
                </p>
              )}
              <table className={styles.table}>
                <thead className={styles.srOnly}>
                  <tr>
                    <th scope="col">Tool</th>
                    <th scope="col">What it does</th>
                  </tr>
                </thead>
                <tbody>
                  {g.tools.map((t) => (
                    <tr key={t.name}>
                      <th scope="row">
                        <code>{t.name}</code>
                        {t.destructive && <span className={styles.destructive}>destructive</span>}
                      </th>
                      <td>{t.does}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Never(): ReactNode {
  return (
    <section className={`${styles.section} ${styles.band}`}>
      <div className={`container ${styles.twoUp}`}>
        <div>
          <h2 className={styles.sectionTitle}>What it can’t do</h2>
          <p className={styles.sub}>Some things stay with you, the human. On purpose.</p>
        </div>
        <ul className={styles.nopes}>
          <li>
            <strong>Check in.</strong> “I’m here” means you’re actually there, and an app can’t be anywhere.
          </li>
          <li>
            <strong>Write reviews.</strong> A review has to be a real person’s own. Apps can see a place’s rating and how
            many people rated it, never the review text.
          </li>
          <li>
            <strong>Read your email or calendar.</strong> It sees the trips FiveStar made from your bookings, never the
            messages, senders, subjects or events behind them.
          </li>
          <li>
            <strong>See booking numbers.</strong> Confirmation and booking numbers are stripped from every trip, even
            one tucked into a note.
          </li>
          <li>
            <strong>Peek at anything else.</strong> Not your connected accounts, your forwarding address or calendar
            links, and never another traveler’s trips.
          </li>
        </ul>
      </div>
    </section>
  );
}

function Control(): ReactNode {
  return (
    <section className={styles.section} id="control">
      <div className={`container ${styles.twoUp}`}>
        <div>
          <h2 className={styles.sectionTitle}>You’re the boss of it</h2>
          <ul className={styles.plainList}>
            <li>
              <strong>Pick the scopes.</strong> Untick any of them on the consent page. Untick them all and nothing is
              connected.
            </li>
            <li>
              <strong>Disconnect any time.</strong> In FiveStar, go to Settings → Connected apps and choose Disconnect.
              The app loses access at once, mid-sentence if it has to.
            </li>
            <li>
              <strong>Or clear the decks.</strong> “Forget everything about me” erases what FiveStar learned about you
              and disconnects every app you’ve connected, all in one tap.
            </li>
          </ul>
        </div>
        <div>
          <h2 className={styles.sectionTitle}>Fair-use limits</h2>
          <p>Generous for planning, not for scraping:</p>
          <ul className={styles.plainList}>
            <li>About one tool call a second for each connected app, and up to 2,000 a day.</li>
            <li>Up to 5,000 tool calls a day across all your apps together.</li>
            <li>Up to 300 trip changes and 30 new memories a day.</li>
          </ul>
          <p className={styles.small}>
            Hit one and FiveStar tells your app how long to wait, so it can take a breather and carry on.
          </p>
        </div>
      </div>
    </section>
  );
}

function Builders(): ReactNode {
  return (
    <section className={`${styles.section} ${styles.band}`}>
      <div className={`container ${styles.narrow}`}>
        <h2 className={styles.sectionTitle}>For the curious (and the builders)</h2>
        <ul className={styles.specs}>
          <li>
            <span>Transport</span>
            <div>Remote MCP over Streamable HTTP at <code>{MCP}</code>. Stateless: one JSON-RPC message
            per POST.</div>
          </li>
          <li>
            <span>Sign-in</span>
            <div>OAuth 2.1 with PKCE (S256), dynamic client registration and resource indicators. Discovery starts from
            the 401 at <code>/mcp</code>.</div>
          </li>
          <li>
            <span>Redirects</span>
            <div>https, loopback (<code>localhost</code>, <code>127.0.0.1</code>, any port), or an
            app’s own scheme such as <code>cursor://</code> or <code>vscode://</code>.</div>
          </li>
          <li>
            <span>Tokens</span>
            <div>Access tokens last an hour; refresh tokens rotate on every use.</div>
          </li>
          <li>
            <span>Accounts</span>
            <div>Signed-in FiveStar travelers only. Every call acts as you, on your own trips and memory.</div>
          </li>
        </ul>
        <p className={styles.small}>
          Building something, or hit a snag? Write to{' '}
          <Link href="mailto:support@askfivestar.com">support@askfivestar.com</Link>. How connected apps use your data is
          in our <Link to="/privacy#connected-ai-apps">Privacy Policy</Link>.
        </p>
      </div>
    </section>
  );
}

function Closing(): ReactNode {
  return (
    <section className={`${styles.section} ${styles.closing}`}>
      <div className="container">
        <img className={styles.closingMark} src="/img/mark-on-dark.svg" alt="" width={64} height={64} />
        <h2>No AI app? No problem.</h2>
        <p>FiveStar plans trips all by itself, too.</p>
        <Link className={`button button--lg button--coral ${styles.primary}`} href={APP}>
          <Star className={styles.ctaStar} />
          Ask FiveStar
        </Link>
      </div>
    </section>
  );
}

export default function Developers(): ReactNode {
  return (
    <Layout
      title="Connect your AI app"
      description="Connect Claude, ChatGPT, Claude Code, VS Code or Cursor to your FiveStar account and plan trips with real places, routes and weather, right in FiveStar.">
      <Hero />
      <main>
        <Connect />
        <Consent />
        <Tools />
        <Never />
        <Control />
        <Builders />
        <Closing />
      </main>
    </Layout>
  );
}
