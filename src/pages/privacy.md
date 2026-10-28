---
title: Privacy Policy
description: What FiveStar collects, why, where it is kept, how long, and how to delete it, including how FiveStar uses Gmail, Outlook and calendar access.
wrapperClassName: policy
hide_table_of_contents: true
---

# Privacy Policy

_Last updated October 28, 2026._

FiveStar is a personal AI travel concierge at [askfivestar.ai](https://askfivestar.ai). In this policy
"FiveStar", "we" and "us" mean the people who run it. This policy covers the FiveStar app and this website,
askfivestar.com. It says what we collect, why, where it is kept, for how long, who else touches it, and how you
delete it.

If you have a question, write to [support@askfivestar.com](mailto:support@askfivestar.com).

## The short version

- You can use FiveStar without an account. If you sign in, FiveStar gets your name, picture and (if the provider
  shares it) your email address, and nothing else from your account.
- FiveStar remembers what you tell it so it can help you better. You can see everything it remembers and remove any
  of it, or all of it at once.
- Connecting Gmail, Outlook, a calendar or a forwarding address is optional. FiveStar uses that access only to find
  **your own travel bookings** and learn your travel preferences from them. It is read-only, it is never used for
  advertising, never sold, and never used to train general AI models.
- Your check-ins are private to you. Your reviews are public, with your name, because that is what a review is.
- We do not sell your data, show ads, or use third-party analytics or advertising trackers.

## What we collect, and why

### When you use FiveStar without signing in

- **Your messages.** What you type or say to FiveStar is sent to our servers and to the AI model that writes the
  answer. The conversation on your screen is kept in your browser tab (session storage) so it survives a page
  reload or a sign-in; it is not kept in an account.
- **A random visitor id.** A cookie holds a random id that is not linked to your name or to any account. FiveStar
  may remember preferences you state in conversation (for example "we're vegetarian") under that id, so the next
  answer fits. It does **not** keep "interests" (what you have been looking at) for visitors who are not signed in.
- **Your location, only if you allow it.** If you tap "Use my location", your browser shares its position. Our
  server uses it to find the nearest point on the map's road or walking network, then drops the coordinates: they
  are not logged, not stored and not put in memory, and the AI model is told a nearby point on the network or your
  town, never your coordinates.
- **Addresses you type.** Suggestions come from our own map data. What you type is sent in the body of the request,
  not the address bar, and is not logged.
- **Your voice, only if you use the microphone.** Audio is sent to Google Cloud Speech-to-Text to turn it into text,
  and FiveStar's spoken replies are made with Google Cloud Text-to-Speech. We do not store the audio.

### When you sign in

FiveStar offers sign-in with Google, and where offered, Microsoft, Amazon, X and Facebook. From the provider we
receive your account's user id, name, and where the provider shares them, your email address and profile picture.
We ask for nothing more at sign-in (scopes `openid`, `email`, `profile` or the provider's equivalent). Your FiveStar
traveler id is a one-way hash of the provider and that user id. Your email address is a label in your account
panel; it is never used to merge accounts. You can link more than one sign-in to the same traveler, and remove a
link, in your account.

Once you are signed in, FiveStar can keep the following for you:

- **Memory.** Durable facts about how you travel, written by FiveStar after each conversation: preferences ("likes
  small coffee bars"), who travels with you, places you have been, loyalty programs and status you mention, and
  your home town or address if you give it. When you say "remember this", it saves your own words. Everything is
  listed under **What FiveStar remembers** in the app, where you can remove any item.
- **Interests.** What you have been looking for recently, always phrased as "Has been looking at ...", so the
  concierge can suggest what fits. Interests are never kept about health, religion, politics, sexuality, ethnicity or
  hardship, fade if you stop looking, and are listed with your memory.
- **Your preferences.** What you choose in **Your preferences** (travel style, dining, interests, who is with you).
- **Trips.** The trips you plan with FiveStar or that it finds in your bookings: places, dates, times, who is going,
  and a booking's confirmation number when it is printed in the booking as one.
- **Check-ins.** When you tap "I'm here", FiveStar records the place, the time, and the position your device reported
  (with its accuracy) when you tapped. To catch faked check-ins it also stores a keyed one-way hash of a random
  device id kept in a cookie, and a keyed one-way hash of your IP address's network. These hashes cannot be turned
  back into the id or the address. Your check-ins are private to you (see [What is public](#what-is-public)).
- **Places you add or correct.** A new place, or a fix to a place's details, is kept as part of that place's
  history so other travelers can confirm it.
- **Reviews.** Your star rating, your text (optional), your name and picture as they were when you wrote it, and
  whether you had checked in at that place.

### When you connect email or a calendar

This is optional and described in full in [Email and calendar access](#email-and-calendar-access).

### On this website

askfivestar.com is a static site. It sets no cookies of its own and runs no analytics. Our hosting provider
(GitHub Pages) processes standard request data, such as your IP address, to serve and protect the site. A light or
dark theme choice may be saved in your browser.

## Email and calendar access

FiveStar can read your travel bookings from your email or calendar so it can build your trips and learn how you
like to travel. Every one of these connections is **off until you turn it on**, **read-only**, and limited to
**your own travel bookings**. The same rules apply to every provider:

- **Purpose.** We use this data only to find your travel bookings (flights, hotels, restaurant and tour
  reservations, itineraries) and to learn your travel preferences from them (for example the seat you choose or the
  hotel brands you return to), so FiveStar can show your trips and personalize its suggestions to you. We do not use
  it for anything else.
- **What is kept.** The trips and travel facts found, which you see in **Your trips** and **What FiveStar
  remembers**, and the connection's access token (encrypted). We do **not** keep copies of your messages or
  attachments, and we do not keep membership numbers, payment details or passwords found in them. To resume a long
  read where it left off, FiveStar keeps progress notes (years, counts and dates read) that contain nothing from
  the messages.
- **No ads, no sale, no training.** Data from your email or calendar is never used for advertising or ad
  targeting, never sold, never used to build profiles for anyone else, and never used to train or improve general
  AI models (ours or anyone else's).
- **No human reading.** No person at FiveStar reads your email or calendar data, except with your explicit consent
  for specific messages (for example when you ask us for help with a problem), when it is necessary for security
  (such as investigating abuse), to comply with the law, or when the data has been aggregated and anonymized for
  internal operations.
- **No transfer.** We do not transfer this data to anyone except the service providers that process it for us to
  provide these features (Google Cloud, which hosts FiveStar and runs its AI models), as needed to comply with the
  law, or as part of a merger or acquisition with notice to you.
- **Stopping.** Disconnect at any time in your account in FiveStar. Disconnecting deletes the stored access token
  and, where the provider supports it, revokes FiveStar's access at the provider. "Forget everything about me" also
  disconnects and erases what was learned. You can also revoke access from your account at the provider at any
  time.

### Google: Gmail and Google Calendar

FiveStar requests these Google scopes:

- `openid`, `email`, `profile`: to sign you in (your Google account id, name, email address and picture).
- `https://www.googleapis.com/auth/gmail.readonly`: only if you choose **Connect Gmail**. FiveStar uses it to search
  your mailbox for travel booking emails (confirmations and itineraries from airlines, hotels, booking sites and
  reservation services, leaving out Promotions, Social, Spam and Trash), and to read those messages and their PDF
  attachments. The text is extracted in our search engine without being stored, and our AI model reads it to find
  your bookings and travel preferences. You choose whether FiveStar reads recent mail only or your travel mail
  going back further, year by year.
- `https://www.googleapis.com/auth/calendar.events.readonly`: only if you choose to connect Google Calendar.
  FiveStar reads your calendar events to find your trips and travel dates (for example a flight or hotel stay on
  your calendar) and to avoid planning over them. It never creates, changes or deletes events.

> **Limited Use.** FiveStar's use and transfer of information received from Google APIs to any other app will adhere
> to the [Google API Services User Data Policy](https://developers.google.com/terms/api-services-user-data-policy),
> including the
> [Limited Use requirements](https://developers.google.com/terms/api-services-user-data-policy#additional_requirements_for_specific_api_scopes).

Gmail data is used only to find your own travel bookings and travel preferences and to show them to you in
FiveStar. It is not used for advertising, not sold, not used to train general AI models, and not read by humans
except with your consent, for security, or to comply with the law, as described above. The same applies to Google
Calendar data.

Your Gmail and Google Calendar refresh token is stored encrypted (AES-256-GCM) and bound to your traveler id.
**Disconnect Gmail** in your account deletes it from FiveStar and revokes it at Google. You can also remove
FiveStar's access at [myaccount.google.com/permissions](https://myaccount.google.com/permissions).

### Microsoft: Outlook mail and calendar

If you sign in with Microsoft, FiveStar asks only for your basic profile (`openid`, `email`, `profile`,
`User.Read`). If you choose to connect Outlook, FiveStar also asks for `Mail.Read` (read your mail),
`Calendars.Read` (read your calendar) and `offline_access` (keep reading until you disconnect). FiveStar uses them
exactly as described above for Google: it searches only for travel bookings, reads only those messages and
calendar events, never sends, changes or deletes mail or events, and keeps only the trips and travel facts it
finds. Microsoft data is never used for advertising, never sold, never used to train general AI models, and never
read by humans except with your consent, for security, or to comply with the law.

Disconnect Outlook in your account in FiveStar. You can also remove FiveStar's access at
[account.microsoft.com/privacy/app-access](https://account.microsoft.com/privacy/app-access) (personal accounts) or
ask your organization's administrator (work or school accounts).

### Forwarded emails

FiveStar can give you a personal forwarding address. If you forward a booking confirmation to it, FiveStar reads
that message, adds the booking to your trips and learns from it as described above. Mail sent to the address
passes through Cloudflare's email routing on its way to FiveStar. FiveStar reads only mail sent to your forwarding
address, never your mailbox, and does not keep the message after reading it: only the bookings and preferences it
found, a fingerprint of the message (so it is read once), and the date and outcome of the last one. One exception: when
Gmail sends a confirmation code to set up automatic forwarding, FiveStar keeps that code and link, encrypted, so it
can show them to you, and deletes them after 7 days or when you replace the address. Treat the address like a
password: anyone who has it can send bookings to your trips. You can replace it with a new one in your account at any
time, and the old one stops working at once; "Forget everything" removes it.

### Calendar subscription (.ics) links

If you give FiveStar a calendar's subscription link (an address ending in `.ics`, which most calendar apps offer),
FiveStar fetches that link from time to time to read the events on it and find your trips and travel dates. It
keeps the link only to do that, uses the events only as described above, and deletes the link when you remove it.
Remove the link in FiveStar, or reset the private link in your calendar app, to stop it. Trips it already added
stay until you remove them.

### Your trips feed

FiveStar can also give you a private link to your own trips in calendar format, so a calendar app (such as Apple
Calendar) can show them. Anyone with the link can see the trips on it (places and dates, never booking numbers), so
treat it like a password. You can replace the link or turn it off in your account at any time.

## How FiveStar uses AI

FiveStar's answers, memory and email reading are done by AI models (Claude models, made by Anthropic) that we run
on Google Cloud's Vertex AI. Your messages, and the text of booking emails you let FiveStar read, are sent to those
models to produce answers and find bookings. Under Google Cloud's terms, Google and the model provider do not use
this data to train their models, and we do not use it to train any model either.

When its own data is not enough (for example "what's on this weekend"), FiveStar may search the web through the AI
model's web search tool. The search is written from your question and may include your town or your trip's city,
never your coordinates, name or account.

## What is public

- **Reviews** are public, like reviews on a map: anyone, signed in or not, can read your rating, your review text,
  your name and your picture (FiveStar shows pictures from Google and X; for other sign-ins it shows your initials).
  The form says "Posting publicly as" your name before you post. A place's average rating and review count are
  public too.
- **Check-ins are never shown to anyone else.** Where FiveStar shows activity at a place drawn from check-ins (such
  as how many travelers have been there, or how popular it is), it is an aggregate across at least five different
  travelers. Nothing FiveStar shows reveals who is at a place right now, or anyone's times or trail.
- **Places you add** become visible to others once enough independent travelers confirm them, without your name.

## Where your data is kept

FiveStar runs on Google Cloud. Your account data, memory, trips, check-ins, reviews and connections are stored in a
search engine on Google Cloud servers in the United States. AI processing on Vertex AI may take place in
Google data centers in other countries. Data is encrypted in transit (HTTPS) and at rest by Google Cloud, and email
and calendar tokens are additionally encrypted by FiveStar.

Each traveler's data is read with a credential for that traveler alone, so the engine itself keeps one traveler
from reading another's memory or check-ins. Your browser never talks to the engine directly.

## Who else processes your data

We use these service providers, each only to run FiveStar:

- **Google Cloud**: hosting, storage, AI models (Vertex AI), speech-to-text and text-to-speech.
- **Cloudflare**: DNS, and routing mail sent to your forwarding address.
- **GitHub** (GitHub Pages): hosting this website, askfivestar.com. It does not host the app.
- **Your sign-in provider** (Google, Microsoft, Amazon, X or Facebook): to sign you in, and for Google and
  Microsoft, the email and calendar access you choose to give.
- **MET Norway** (weather): our server asks for the forecast at the map's position rounded to about one kilometer.
  Your IP address and identity are not sent.
- **OpenFreeMap** (map tiles): your browser loads map images directly from OpenFreeMap, which therefore sees your IP
  address and the area of the map you are viewing.

We do not sell or rent personal information, and we do not share it for cross-context behavioral advertising. We
may disclose information if the law requires it, to protect the safety and rights of people or of FiveStar, or as
part of a merger or acquisition, in which case this policy continues to apply to it.

## Cookies and storage in your browser

FiveStar (askfivestar.ai) uses only what it needs to work. There are no advertising or analytics cookies.

- `fivestar_session`: who you are signed in as; HttpOnly and encrypted; 30 days.
- `fivestar_guest`: the random visitor id described above; HttpOnly and signed; one year.
- `fivestar_oidc`: a sign-in in progress (security values for the round trip to the provider); minutes.
- `fivestar_mail`: on older connections, your email connection on this browser, encrypted.
- `fivestar-pod`: keeps your requests on one server; session.
- Browser storage for your theme, distance units and voice settings, and your current conversation (cleared when
  you close the tab, sign out, or forget everything).

## How long we keep it

- **Memory, interests, preferences, trips, check-ins, reviews and connections** are kept until you delete them or
  ask us to delete your account. There is no automatic expiry, except that interests fade from use when you stop
  looking for them.
- **Visitors who are not signed in**: what FiveStar remembers is tied to the visitor cookie. "Forget everything about
  me" erases it; if the cookie is cleared or expires, it can no longer be linked to you.
- **Places you added or corrected** stay as part of the place's history after you delete your check-ins or your
  account, with your name removed.
- **Operational logs** (such as errors and request records with IP addresses) are kept for up to 30 days for
  security and troubleshooting. FiveStar does not log the content of your messages, your emails or your location.

## Your choices and rights

In the app, at any time:

- See and remove anything FiveStar remembers (**What FiveStar remembers**), or tap **Forget everything about me** to
  erase your memory, interests, preferences, trips and email-reading progress, disconnect every email and calendar
  connection, and remove your forwarding address, calendar link and trips feed.
- See and delete your check-ins (**Your check-ins** in your account), one at a time or all at once.
- Edit or delete your reviews.
- Disconnect any email or calendar connection.
- Remove a linked sign-in.

The step-by-step guide is at [Delete your data](/data-deletion). To delete your whole account, or to ask for a copy
of your data or a correction, email [support@askfivestar.com](mailto:support@askfivestar.com) from the address on your
account. We answer within 30 days. Depending on where you live (for example the EU, the UK or California) you may
have further rights, including to object to or restrict processing and to complain to your data protection
authority. We will not treat you differently for using them.

Where the law requires a legal basis: we process your data to provide the service you ask for (contract), with your
consent for email, calendar and location access (which you can withdraw at any time), and for our legitimate
interest in keeping FiveStar secure and the map accurate.

## Children

FiveStar is not for children under 13, and we do not knowingly collect personal information from them. If you
believe a child has given us personal information, email us and we will delete it.

## Security

All traffic is encrypted with HTTPS. Sign-in uses the providers' standard OAuth flows with state and PKCE. Session
and connection data is encrypted with AES-256-GCM, and each traveler's data is isolated by the engine itself. No
system is perfectly secure; if we learn of a breach that affects you, we will tell you as the law requires.

## Changes to this policy

If we change this policy, we will update the date at the top, and for material changes, tell you in the app before
they take effect. The previous versions are kept in our records.

## Contact

Email [support@askfivestar.com](mailto:support@askfivestar.com).
