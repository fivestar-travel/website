import {useEffect, useRef, type ReactNode} from 'react';
import Link from '@docusaurus/Link';
import useBrokenLinks from '@docusaurus/useBrokenLinks';
import Layout from '@theme/Layout';
import ChatScene from '@site/src/components/ChatScene';
import {Star} from '@site/src/components/Brand';
import {NEEDLE_COLORS, PATHS} from '@site/src/components/mark.generated';
import styles from './index.module.css';

const APP = 'https://askfivestar.ai';

// Real questions; the app takes no question in its address, so each opens FiveStar to ask it there.
const PROMPTS = [
  'Best tacos within a 10 minute walk',
  'Plan a Saturday in Austin with the kids',
  'Sunset spots near me',
  'Anything fun with the kids this afternoon?',
  'Somewhere quiet for coffee and laptop work',
  'Plan a week-long family vacation in Maui',
];

type Tone = 'coral' | 'indigo' | 'golden' | 'mint' | 'sky' | 'violet';
const TRICKS: {title: string; body: string; tone: Tone}[] = [
  {
    title: 'A memory that learns you',
    body: 'Tell it once that your partner is vegetarian or that you love a small coffee bar. It remembers, shows you everything it remembers, and forgets any of it when you say so.',
    tone: 'golden',
  },
  {
    title: '“I’m here” check-ins',
    body: 'Tap “I’m here” at a place to keep your own log of where you’ve been. It’s private to you, and it helps keep the map right.',
    tone: 'mint',
  },
  {
    title: 'Reviews from people who went',
    body: 'Reviews carry the writer’s name and picture, and a “Checked in” badge when they were actually there.',
    tone: 'coral',
  },
  {
    title: 'Weather on the map',
    body: 'A little weather pill sits on the map, so you know about the umbrella before you’re halfway down the block.',
    tone: 'sky',
  },
  {
    title: 'Bookings, minus the typing',
    body: 'If you choose, FiveStar reads flight and hotel confirmations from Gmail or Outlook, a forwarded email, or your calendar, and turns them into trips.',
    tone: 'indigo',
  },
  {
    title: 'Made for your phone',
    body: 'It runs in your browser, nothing to install. Add it to your home screen and it opens like an app.',
    tone: 'violet',
  },
];

/** A hand-drawn squiggle, for underlining the sketch headline. */
function Squiggle(): ReactNode {
  return (
    <svg className={styles.squiggle} viewBox="0 0 300 18" preserveAspectRatio="none" aria-hidden="true">
      <path d="M3 12 C 40 2, 70 18, 105 9 S 170 3, 205 11 S 265 15, 297 5" fill="none" stroke="var(--coral)" strokeWidth="5" strokeLinecap="round" />
    </svg>
  );
}

/** A hand-drawn arrow; `d` is the shaft, `head` the two strokes at its end. */
function Arrow({d, head, className}: {d: string; head: string; className?: string}): ReactNode {
  return (
    <svg className={className} viewBox="0 0 120 80" aria-hidden="true">
      <path d={d} fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <path d={head} fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** Adds `shown` to each [data-reveal] element as it scrolls into view (once). With reduced motion, nothing hides. */
function useReveal() {
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = root.current;
    if (!el || window.matchMedia?.('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) return undefined;
    el.classList.add(styles.armed);
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add(styles.shown);
            io.unobserve(e.target);
          }
        }),
      {rootMargin: '0px 0px -10% 0px'},
    );
    el.querySelectorAll('[data-reveal]').forEach((t) => io.observe(t));
    return () => io.disconnect();
  }, []);
  return root;
}

function Hero(): ReactNode {
  return (
    <header className={styles.hero}>
      <div className={`container ${styles.heroInner}`}>
        <div className={styles.heroText}>
          <h1 className={styles.title}>
            <span className={styles.sketch}>
              Go live a little.
              <Squiggle />
            </span>
            <span className={styles.titleRest}>FiveStar plans the rest.</span>
          </h1>
          <p className={styles.lede}>
            Ask for tacos, the best seat for the sunset or a whole week away, in plain words. FiveStar answers like a
            friend who knows the town, plans the trip day by day, and puts every place on the map.
          </p>
          <div className={styles.actions}>
            <Link className={`button button--lg button--coral ${styles.primary}`} href={APP}>
              <Star className={styles.ctaStar} />
              Ask FiveStar
            </Link>
            <Link className={styles.secondary} to="#your-email-and-calendar">
              How FiveStar uses your email and calendar
            </Link>
          </div>
          <p className={styles.note}>
            Free, in your browser at <Link href={APP}>askfivestar.ai</Link>. Nothing to install.
          </p>
        </div>
        <ChatScene />
      </div>
    </header>
  );
}

function TryAsking(): ReactNode {
  return (
    <section className={styles.try} aria-labelledby="try-asking">
      <div className="container">
        <h2 id="try-asking" className={styles.tryLabel}>
          try asking…
          <Arrow className={styles.tryArrow} d="M8 20 C 40 10, 70 30, 96 60" head="M80 58 L 97 62 L 95 44" />
        </h2>
        <ul className={styles.prompts}>
          {PROMPTS.map((p) => (
            <li key={p}>
              <Link className={styles.prompt} href={APP} title="Opens FiveStar, where you can ask it">
                “{p}”
              </Link>
            </li>
          ))}
        </ul>
        <p className={styles.tryNote}>Each one opens FiveStar. Ask it there, in your own words.</p>
      </div>
    </section>
  );
}

function MapSection(): ReactNode {
  return (
    <section className={styles.section}>
      <div className={`container ${styles.mapGrid}`}>
        <div className={styles.copy}>
          <h2 className={styles.sectionTitle}>The map follows the conversation</h2>
          <p>
            Every answer lands on the map as numbered pins, with a card for each place: what it is, how far, and how
            many minutes on foot. Swipe through the cards, tap Navigate, and FiveStar draws the way there, turn by turn.
          </p>
          <ul className={styles.notes}>
            <li>
              <span className={`${styles.noteDot} ${styles.coral}`} aria-hidden="true"><span>1</span></span>Pins numbered in the order it suggests them
            </li>
            <li>
              <span className={`${styles.noteDot} ${styles.golden}`} aria-hidden="true"><span>2</span></span>Cards you swipe, one per place
            </li>
            <li>
              <span className={`${styles.noteDot} ${styles.mint}`} aria-hidden="true"><span>3</span></span>Real walking minutes from where you are
            </li>
          </ul>
        </div>
        <figure className={styles.phoneWrap} data-reveal>
          <div className={styles.phone}>
            <img
              src="/img/screens/phone-tacos-light.webp"
              width={468}
              height={1014}
              loading="lazy"
              alt="FiveStar on a phone, after asking for the best tacos within a 10 minute walk near South Congress in Austin: a map with numbered red pins, a swipeable card for Torchy’s Tacos, a 6 minute walk, with a Navigate button, and the answer below."
            />
          </div>
          <span className={`${styles.callout} ${styles.calloutPins}`} aria-hidden="true">
            numbered pins
            <Arrow className={styles.calloutArrow} d="M100 12 C 70 10, 40 25, 22 58" head="M14 44 L 21 60 L 36 52" />
          </span>
          <span className={`${styles.callout} ${styles.calloutCards}`} aria-hidden="true">
            swipe for more
            <Arrow className={styles.calloutArrow} d="M100 18 C 75 30, 45 30, 18 50" head="M18 34 L 16 51 L 33 56" />
          </span>
          <figcaption className={styles.caption}>A real answer, on a phone, near South Congress in Austin.</figcaption>
        </figure>
      </div>
    </section>
  );
}

function PlanSection(): ReactNode {
  return (
    <section className={`${styles.section} ${styles.band}`}>
      <div className={`container ${styles.planGrid}`}>
        <figure className={styles.browserWrap} data-reveal>
          <div className={styles.browser}>
            <div className={styles.browserBar} aria-hidden="true">
              <i />
              <i />
              <i />
              <span>askfivestar.ai</span>
            </div>
            <img
              src="/img/screens/desktop-plan-light.webp"
              width={1388}
              height={868}
              loading="lazy"
              alt="FiveStar on a laptop, answering “Plan a Saturday in Austin with the kids”: a Halloween Saturday in the conversation on the left, starting at the Texas Toy Museum, and the map of Austin on the right with ten numbered pins and a row of place cards."
            />
          </div>
          <figcaption className={styles.caption}>“Plan a Saturday in Austin with the kids,” answered live.</figcaption>
        </figure>
        <div className={styles.copy}>
          <h2 className={styles.sectionTitle}>A Saturday, or a whole vacation, sorted</h2>
          <p>
            Ask for an afternoon, a long weekend or a full vacation of up to a month, and FiveStar plans it day by day:
            where to base yourself, what to do each day and where to eat, with the walk or the drive between each stop.
            The flights and hotels you’ve booked are already in it. Change your mind and it changes the plan.
          </p>
          <div className={styles.fly}>
            <svg className={styles.flyPath} viewBox="0 0 320 90" aria-hidden="true">
              <path d="M18 70 C 70 10, 120 10, 160 45 S 250 85, 302 22" fill="none" stroke="var(--indigo-ink)" strokeWidth="3" strokeDasharray="2 9" strokeLinecap="round" />
              <circle cx="18" cy="70" r="9" fill="var(--mint)" />
              <circle cx="160" cy="45" r="9" fill="var(--golden)" />
              <circle cx="302" cy="22" r="9" fill="var(--coral)" />
              <g className={styles.flyStar}>
                {/* The logo's star, about 9 across its points, centered on the path. */}
                <g transform="scale(0.28) translate(-100 -83.16)">
                  <path d={PATHS.star} fill="var(--ink)" />
                  <path d={PATHS.needle[0]} fill={NEEDLE_COLORS[0]} />
                  <path d={PATHS.needle[1]} fill={NEEDLE_COLORS[1]} />
                </g>
              </g>
            </svg>
            <p>
              <strong>Then fly through it.</strong> Keep it as a trip and step through it stop by stop: Next, Back, and
              the map glides to each place, with Navigate when you’re ready to go.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function SunsetSection(): ReactNode {
  return (
    <section className={styles.section}>
      <div className={`container ${styles.sunGrid}`}>
        <div className={styles.copy}>
          <h2 className={styles.sectionTitle}>Light by day, dark after sunset</h2>
          <p>
            FiveStar’s look follows the sun where you are, so the map is easy on the eyes at the taco stand at 10 pm.
            Rather pick for yourself? Choose Light or Dark and it stays put.
          </p>
          <p className={styles.aside}>This page does it too. Come back after sunset.</p>
        </div>
        <div className={styles.pair} data-reveal>
          <img
            className={styles.pairDay}
            src="/img/screens/desktop-tacos-light.webp"
            width={1388}
            height={868}
            loading="lazy"
            alt="FiveStar in the light theme: the answer to “Best tacos within a 10 minute walk” beside a light map of South Congress with numbered pins."
          />
          <img
            className={styles.pairNight}
            src="/img/screens/desktop-tacos-dark.webp"
            width={1388}
            height={868}
            loading="lazy"
            alt="The same question in the dark theme, with a dark map."
          />
        </div>
      </div>
    </section>
  );
}

function Tricks(): ReactNode {
  return (
    <section className={`${styles.section} ${styles.band}`}>
      <div className="container">
        <h2 className={styles.sectionTitle}>A few more tricks</h2>
        <ul className={styles.tricks}>
          {TRICKS.map((t) => (
            <li key={t.title} className={styles.trick}>
              <span className={`${styles.trickMark} ${styles[t.tone]}`} aria-hidden="true">
                <Star className={styles.trickStar} />
              </span>
              <div>
                <h3>{t.title}</h3>
                <p>{t.body}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function EmailAndCalendar(): ReactNode {
  // The hero links here; a raw id is invisible to the broken-anchor check unless it is registered.
  useBrokenLinks().collectAnchor('your-email-and-calendar');
  return (
    <section className={styles.section} id="your-email-and-calendar">
      <div className={`container ${styles.narrow}`}>
        <h2 className={styles.sectionTitle}>Why FiveStar asks for your email and calendar</h2>
        <p>
          Connecting an email account or a calendar is optional. FiveStar works without it. If you connect one, here is
          exactly what happens:
        </p>
        <ul className={styles.plainList}>
          <li>
            <strong>What it’s for.</strong> FiveStar looks for your own travel bookings (flight, hotel, restaurant and tour
            confirmations, and itineraries) so it can build your trips and learn how you like to travel:
            the seat you pick, the hotels you return to, the places you love.
          </li>
          <li>
            <strong>What it reads.</strong> Gmail and Outlook access is read-only. FiveStar searches only for travel
            bookings and reads only those messages. It never sends, deletes or changes your mail. Calendar access is
            read-only too, and is used only to see your travel dates and plans.
          </li>
          <li>
            <strong>What it keeps.</strong> The trips and travel preferences it found, which you can see and remove in
            the app. It does not keep copies of your emails.
          </li>
          <li>
            <strong>What it never does.</strong> Your email and calendar data is never sold, never used for
            advertising, never used to train general AI models, and never read by a person except with your
            permission, for security, or when the law requires it.
          </li>
          <li>
            <strong>Stopping.</strong> Disconnect at any time in your account in FiveStar. Disconnecting Gmail also
            revokes FiveStar’s access at Google. “Forget everything about me” erases what FiveStar learned.
          </li>
        </ul>
        <p className={styles.small}>
          FiveStar’s use and transfer of information received from Google APIs to any other app will adhere to the{' '}
          <Link href="https://developers.google.com/terms/api-services-user-data-policy">
            Google API Services User Data Policy
          </Link>
          , including the{' '}
          <Link href="https://developers.google.com/terms/api-services-user-data-policy#additional_requirements_for_specific_api_scopes">
            Limited Use requirements
          </Link>
          . The details, for every provider, are in our <Link to="/privacy">Privacy Policy</Link>.
        </p>
      </div>
    </section>
  );
}

function SignIn(): ReactNode {
  return (
    <section className={`${styles.section} ${styles.band}`}>
      <div className={`container ${styles.twoUp}`}>
        <div>
          <h2 className={styles.sectionTitle}>Sign in, or don’t</h2>
          <p>
            You can ask FiveStar anything without an account. Sign in with Google or another supported account when
            you want FiveStar to remember you across devices, keep your trips, check in, or write a review. Signing in
            gives FiveStar your name, your picture and, if the provider shares it, your email address. Nothing else.
          </p>
        </div>
        <div>
          <h2 className={styles.sectionTitle}>Yours to delete</h2>
          <p>
            Everything FiveStar remembers about you is listed in the app, and one tap on “Forget everything about me”
            erases it. Here is <Link to="/data-deletion">how to delete your data</Link>, step by step.
          </p>
        </div>
      </div>
    </section>
  );
}

function Closing(): ReactNode {
  return (
    <section className={`${styles.section} ${styles.closing}`}>
      <div className="container">
        <img className={styles.closingMark} src="/img/mark-on-dark.svg" alt="" width={49} height={64} />
        <h2>Where to next?</h2>
        <p>Ask FiveStar. It’s free, and it fits in your pocket.</p>
        <Link className={`button button--lg button--coral ${styles.primary}`} href={APP}>
          <Star className={styles.ctaStar} />
          Ask FiveStar
        </Link>
        <p className={styles.madeBy}>
          Questions, ideas, a great taco spot we missed?{' '}
          <Link href="mailto:support@askfivestar.com">support@askfivestar.com</Link>
        </p>
      </div>
    </section>
  );
}

export default function Home(): ReactNode {
  const root = useReveal();
  return (
    <Layout
      title="Your personal AI concierge"
      description="FiveStar is a personal AI travel concierge: ask in plain words, see places on a map, plan trips, and let it learn how you like to travel.">
      <div ref={root}>
        <Hero />
        <main>
          <TryAsking />
          <MapSection />
          <PlanSection />
          <SunsetSection />
          <Tricks />
          <EmailAndCalendar />
          <SignIn />
          <Closing />
        </main>
      </div>
    </Layout>
  );
}
