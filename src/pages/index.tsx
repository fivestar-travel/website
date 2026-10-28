import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import useBrokenLinks from '@docusaurus/useBrokenLinks';
import Layout from '@theme/Layout';
import styles from './index.module.css';

const APP = 'https://askfivestar.ai';

const FEATURES: {title: string; body: string; tone: 'coral' | 'indigo' | 'golden' | 'sky' | 'mint' | 'violet'}[] = [
  {
    title: 'Ask, and see it on the map',
    body: 'Ask in plain words: dinner near the hotel, something to do with the kids, what’s on this weekend. FiveStar answers in conversation and pins each place on the map, with what’s open, how far it is, and directions.',
    tone: 'coral',
  },
  {
    title: 'Trips that keep up with you',
    body: 'Plan a long weekend or a family trip day by day. FiveStar keeps it as a trip you can step through on the map, and changes it when you ask.',
    tone: 'indigo',
  },
  {
    title: 'A memory that learns you',
    body: 'Tell FiveStar once that your partner is vegetarian or that you like small coffee bars, and it remembers. You can see everything it remembers, and remove any of it.',
    tone: 'golden',
  },
  {
    title: 'Check-ins, private to you',
    body: 'Tap “I’m here” at a place to keep your own log of where you’ve been and to help keep the map right. Your check-ins are yours: nobody else sees them.',
    tone: 'mint',
  },
  {
    title: 'Reviews from people who were there',
    body: 'Rate a place and say what it was like. Reviews from travelers who checked in there carry a “Checked in” badge, so you can tell who has actually been.',
    tone: 'sky',
  },
  {
    title: 'Your bookings, without the typing',
    body: 'If you choose, FiveStar reads your flight and hotel confirmations from Gmail or Outlook, a forwarded email, or your calendar, and turns them into trips.',
    tone: 'violet',
  },
];

function Hero(): ReactNode {
  return (
    <header className={styles.hero}>
      <div className={`container ${styles.heroInner}`}>
        <div className={styles.heroText}>
          <p className={styles.kicker}>Your personal AI concierge</p>
          <h1 className={styles.title}>Go live a little. FiveStar plans the rest.</h1>
          <p className={styles.lede}>
            FiveStar is a travel concierge for anyone: on a business trip, a free evening, or a family vacation.
            Discover places, plan your days, and get recommendations that fit you, wherever you are.
          </p>
          <div className={styles.actions}>
            <Link className={`button button--lg button--coral ${styles.primary}`} href={APP}>
              Open FiveStar
            </Link>
            <Link className={styles.secondary} to="#your-email-and-calendar">
              How FiveStar uses your email and calendar
            </Link>
          </div>
          <p className={styles.note}>
            FiveStar runs in your browser at <Link href={APP}>askfivestar.ai</Link>. Free to use, no app to install.
          </p>
        </div>
        <div className={styles.sample} aria-hidden="true">
          <div className={styles.bubbleYou}>Anything fun with the kids this afternoon, close to the hotel?</div>
          <div className={styles.bubbleStar}>
            <img src="/img/mark.svg" alt="" width={28} height={28} className={styles.lightOnly} />
            <img src="/img/mark-on-dark.svg" alt="" width={28} height={28} className={styles.darkOnly} />
            <span>Here are three that are open now and a short walk away. They’re on the map, with directions.</span>
          </div>
          <div className={styles.pins}>
            <span className={`${styles.pin} ${styles.pinCoral}`}>1</span>
            <span className={`${styles.pin} ${styles.pinGolden}`}>2</span>
            <span className={`${styles.pin} ${styles.pinMint}`}>3</span>
          </div>
        </div>
      </div>
    </header>
  );
}

function Features(): ReactNode {
  return (
    <section className={styles.section}>
      <div className="container">
        <h2 className={styles.sectionTitle}>What FiveStar does</h2>
        <div className={styles.grid}>
          {FEATURES.map((f) => (
            <article key={f.title} className={styles.card}>
              <span className={`${styles.dot} ${styles[f.tone]}`} aria-hidden="true" />
              <h3>{f.title}</h3>
              <p>{f.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function EmailAndCalendar(): ReactNode {
  // The hero links here; a raw id is invisible to the broken-anchor check unless it is registered.
  useBrokenLinks().collectAnchor('your-email-and-calendar');
  return (
    <section className={`${styles.section} ${styles.band}`} id="your-email-and-calendar">
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
    <section className={styles.section}>
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
        <img src="/img/mark-on-dark.svg" alt="" width={56} height={56} />
        <h2>Where to next?</h2>
        <p>Ask FiveStar. It’s free, and it works on your phone.</p>
        <Link className="button button--lg button--coral" href={APP}>
          Open FiveStar
        </Link>
        <p className={styles.madeBy}>
          Questions? <Link href="mailto:support@askfivestar.com">support@askfivestar.com</Link>
        </p>
      </div>
    </section>
  );
}

export default function Home(): ReactNode {
  return (
    <Layout
      title="Your personal AI concierge"
      description="FiveStar is a personal AI travel concierge: ask in plain words, see places on a map, plan trips, and let it learn how you like to travel.">
      <Hero />
      <main>
        <Features />
        <EmailAndCalendar />
        <SignIn />
        <Closing />
      </main>
    </Layout>
  );
}
