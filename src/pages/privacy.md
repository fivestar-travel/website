---
title: Privacy Policy
description: What FiveStar collects, why, where it is kept, how long, and how to delete it, including how FiveStar uses Gmail, Outlook and calendar access.
wrapperClassName: policy
hide_table_of_contents: true
---

# Privacy Policy

_Last updated November 7, 2026._

FiveStar is a personal AI travel concierge at [askfivestar.ai](https://askfivestar.ai). In this policy
"FiveStar", "we" and "us" mean the people who run it. This policy covers the FiveStar app and this website,
askfivestar.com. It says what we collect, why, where it is kept, for how long, who else touches it, and how you
delete it.

If you have a question, write to [support@askfivestar.ai](mailto:support@askfivestar.ai).

## The short version

- You can use FiveStar without an account. If you sign in, FiveStar gets your name, picture and (if the provider
  shares it) your email address, and nothing else from your account.
- FiveStar remembers what you tell it so it can help you better. You can see everything it remembers and remove any
  of it, or all of it at once.
- Connecting Gmail, Outlook, a calendar or a forwarding address is optional. FiveStar uses that access only to find
  **your own travel bookings** and learn your travel preferences from them. It is read-only, it is never used for
  advertising, never sold, and never used to train general AI models.
- Connecting an AI app (such as Claude or ChatGPT) to FiveStar is optional too. You choose what it can see, it never
  sees your messages, events or booking numbers, and you can disconnect it at any time.
- Your check-ins are never public. Your FiveStar friends see the places you check in to, and you can hide yours from
  any friend, or all of them, in one tap. Your reviews are public, with your name, because that is what a review is.
- Sharing a trip with someone is your choice. Everyone on a shared trip keeps their own copy, but nobody sees anyone
  else's booking or confirmation numbers.
- FiveStar emails you only at an address that is verified, and only when someone asks to be your friend or shares a
  trip with you. It sends no newsletters or offers.
- We do not sell your data, show ads, or use third-party analytics or advertising trackers.

## What we collect, and why

### When you use FiveStar without signing in

- **Your messages.** What you type or say to FiveStar is sent to our servers and to the AI model that writes the
  answer. The conversation on your screen is kept in your browser tab (session storage) so it survives a page
  reload or a sign-in; it is not kept in an account.
- **A random visitor id.** A cookie holds a random id that is not linked to your name or to any account. FiveStar
  may remember preferences you state in conversation (for example "we're vegetarian") under that id, so the next
  answer fits. It does **not** keep "interests" (what you have been looking at) for visitors who are not signed in.
- **Your location, only if you allow it.** When you open FiveStar, it asks your browser for your location, and the
  first time your browser asks for your permission. Nothing is shared unless you allow it. Turn it off with "Use my
  location" and FiveStar stops asking in that browser until you turn it back on. Our server uses the position to find
  the nearest point on the map's road or walking network, then drops the coordinates: they are not logged, not stored
  and not put in memory, and the AI model is told a nearby point on the network or your town, never your coordinates.
- **Addresses you type.** Suggestions come from our own map data. What you type is sent in the body of the request,
  not the address bar, and is not logged.
- **Opening a trip in Google Maps or Apple Maps.** If FiveStar can't time a trip, it offers "Open in Google Maps" and
  "Open in Apple Maps". Nothing is sent until you tap one. When you do, your browser opens that app with the start and
  end points of the trip in the link, so Google or Apple receives them under its own privacy policy. FiveStar does
  not tell either company who you are.
- **Your voice, only if you use the microphone.** Audio is sent to Google Cloud Speech-to-Text to turn it into text,
  and FiveStar's spoken replies are made with Google Cloud Text-to-Speech. We do not store the audio.

### When you sign in

FiveStar offers sign-in with Google, and where offered, Microsoft, Amazon, X and Facebook. From the provider we
receive your account's user id, name, and where the provider shares them, your email address and profile picture.
We ask for nothing more at sign-in (scopes `openid`, `email`, `profile` or the provider's equivalent). Your FiveStar
traveler id is a one-way hash of the provider and that user id. Your email address is a label in your account
panel; it is never used to merge accounts. It is kept for email notices only when it is verified (see
[Email from FiveStar](#email-from-fivestar)). You can link more than one sign-in to the same traveler, and remove a
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
  back into the id or the address. Your check-ins are never public. Your friends see the places you check in to,
  unless you hide yours from them (see [Friends and shared trips](#friends-and-shared-trips)).
- **Places you add or correct.** A new place, or a fix to a place's details, is kept as part of that place's
  history so other travelers can confirm it.
- **Reviews.** Your star rating, your text (optional), your name and picture as they were when you wrote it, and
  whether you had checked in at that place.
- **Menu photos you add.** The photo, in two sizes, and the place it is for. Before anything leaves your device,
  FiveStar re-draws the photo, which drops what your camera wrote into it (where and when it was taken, the phone).
  Our server removes any such data again. Each photo is checked by Google Cloud Vision for explicit or violent
  content, and read by the AI model to confirm that it is a menu and to note its dishes and prices so FiveStar can
  answer questions about them. We keep a record that you added it as a keyed code, not your name. You can remove your
  photo at any time, which deletes it.
- **A profile photo, only if you choose one.** In Settings you can choose your own photo to show instead of the
  picture your sign-in gives (or your initials). It is cropped square and re-drawn on your device, which drops what
  your camera wrote into it (where and when it was taken, the phone), and our server removes any such data again. It
  is checked by Google Cloud Vision for explicit or violent content, and one that does not pass is not kept. We keep
  the photo and a record of whose it is until you remove it or replace it (either deletes the old one at once), or
  until you choose "Forget everything about me".
- **Points.** When a contribution counts (a check-in, a review, a place you add that other travelers confirm, a menu
  photo, a report or a correction that is upheld), FiveStar records what kind it was, the points, the place, when,
  and whether it is still waiting on a decision. Your total gives your rank (such as "Scout" or "Explorer"). Your
  points and their history are shown only to you, under **Your points**.
- **The town board, only if you join it.** If you choose **Join the board**, FiveStar keeps that choice with the name
  and picture your sign-in gives, so it can list you among the week's top contributors around a town. Leave it at any
  time and you are taken off.
- **Trip photos (your memory book).** Photos you add to a trip's memory book, in two sizes, with a caption if you write
  one and the audience you choose for each photo. Before anything leaves your device, FiveStar re-draws the photo,
  which drops what your camera wrote into it. It sends only the time and place the photo was taken, so it can file the
  photo under the right day and stop. Our server removes any camera data again. That time and place are shown to you
  alone; anyone else you share the photo with sees only its day and the name of its stop. Each photo is checked by
  Google Cloud Vision for explicit or violent content, and one that does not pass is kept for you alone.
- **Friends.** Who your FiveStar friends are, the name and picture each of you uses on FiveStar, when you became
  friends, and whether you share your check-ins with each one. FiveStar also keeps friend requests and invitation links
  you send until they are used, declined or expire.
- **Shared trips.** For a trip you share, or that is shared with you: who is on it, what each person may do (change
  it, or only view it), who changed it last, and the latest version of the trip. Each person's bookings stay marked
  as theirs.
- **Your email address for notices.** Only a verified address, with your choice of which notices you want. See
  [Email from FiveStar](#email-from-fivestar).

### When you attach a picture in the chat

When you attach a screenshot or photo in the chat, it is sent to the AI model that powers FiveStar so it can read it
for that conversation, and it is not kept. Location and camera details are removed from it on your device before it is
sent. What you ask FiveStar to do with it, such as adding a cruise's days to your trip, is saved to your trips like
anything else you tell FiveStar. Attaching pictures is only for signed-in travelers.

### When you connect email or a calendar

This is optional and described in full in [Email and calendar access](#email-and-calendar-access).

### On this website

askfivestar.com is a static site. It sets no cookies of its own and runs no analytics. Our hosting provider
(GitHub Pages) processes standard request data, such as your IP address, to serve and protect the site. A light or
dark theme choice may be saved in your browser.

### Usage counts

To run FiveStar we count how it is used: how many people sign in and with which provider, how many visit, and how
many questions are asked each day. Each person is counted under a keyed code made from their FiveStar id, which
cannot be turned back into the id or joined to anyone's memory, trips, check-ins or connections. Nothing else is
counted: no question, answer, place, email, calendar event or position. The counts are read only by the FiveStar team
and are not shared. No data from Gmail, Google Calendar or Outlook is used in them.

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
  provide these features (Google Cloud, which hosts FiveStar and runs its AI models), to an AI app you connect
  yourself and only as described in [Connected AI apps](#connected-ai-apps), as needed to comply with the law, or as
  part of a merger or acquisition with notice to you.
- **Stopping.** Disconnect at any time in your account in FiveStar. Disconnecting deletes the stored access token
  and, where the provider supports it, revokes FiveStar's access at the provider. "Forget everything about me" also
  disconnects and erases what was learned. You can also revoke access from your account at the provider at any
  time.

### Google: Gmail and Google Calendar

FiveStar requests these Google scopes:

- `openid`, `email`, `profile`: to sign you in (your Google account id, name, email address and picture).
- `https://www.googleapis.com/auth/gmail.readonly`: only if you choose **Connect Gmail**. FiveStar uses it to search
  your mailbox for travel booking emails (confirmations and itineraries from airlines, hotels, cruise lines, theme-park resorts, booking sites and
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

## Connected AI apps

If you sign in, you can connect an AI app you already use (such as Claude, ChatGPT, Claude Code, VS Code or Cursor)
to your FiveStar account, so it can plan trips with you. It is optional, and you start it yourself: the app sends you
to FiveStar, you sign in, and a consent page names the app and lists what it is asking for. You can untick any of it.
How to connect one, and everything it can do, is on our [developers page](/developers).

If you connect an AI app to FiveStar, it can read your trips and travel preferences, including those FiveStar found in
your travel email or calendar, but never your messages, events or booking numbers. You choose what it can see and can
disconnect it at any time.

- **What it can see and do.** Depending on what you allow: places, routes and the weather; your trips (where, when,
  who is going, the hotel and the stops); changes to your trips; what FiveStar remembers about how you travel, as you
  see it in the app; and saving new preferences you tell it.
- **What it never gets.** Your emails or calendar events (their content, subjects, senders or attachments), booking
  and confirmation numbers, your check-ins, review text, your connected accounts, your forwarding address or
  calendar links, your friends, or anyone else's data. A trip shared with you appears to it as you see it in
  FiveStar, without anyone else's bookings. It cannot check in or write a review.
- **What the app does with it.** What you share with an AI app is then handled under that app's own terms and privacy
  policy, which you agreed to with its maker. FiveStar does not sell this data, use it for advertising, or use it to
  train AI models.
- **Stopping.** Disconnect any app at any time in FiveStar (Connected apps), which ends its access at once. "Forget
  everything about me" disconnects every app.

## Friends and shared trips

Friends and shared trips are for signed-in travelers only, and nothing is shared with anyone until you, or someone
you know, starts it.

### Friends

- **Becoming friends.** You become friends with someone when one of you accepts the other's invitation link or friend
  request. Friends are always mutual: nobody can follow you. A request can be declined, and the person who sent it is
  not told.
- **What a friend sees.** Your name and picture, and the places you check in to, such as "Ana checked in here".
  Unless you turn on check-ins as they happen (below), friends never see when you checked in, and never your
  device's position. A new
  friendship shares check-ins both ways. You can hide yours from any friend, or from all of them, at any time in
  **Friends**, and share again later. Hiding takes effect at once.
- **Check-ins as they happen.** If you turn on **Let friends see my check-ins as they happen** (it is off unless you
  turn it on), the friends you share with also see a check-in shortly after you make it: the place and how long ago,
  for up to three hours. This lets them know roughly where you have been in the last few hours, so it is your choice.
  They never see your device's position. Turn it off at any time.
- **Trip photos.** A friend sees the memory book photos you set to **Friends** or **Public**, and only those.
- **Finding people by name.** Signed-in travelers can search for you by the name you use on FiveStar, so they can send
  you a friend request. The search shows your name and rank, and never your email address or anything else. Turn off
  **Let people find me by name** in **Friends** and you are taken out of everyone's search. Someone who already has
  your invitation link, or a trip you shared with them, can still reach you.
- **Removing a friend** removes the friendship for both of you at once.

### Sharing a trip

- **Who you share with.** You can share a trip with friends, or send a one-time link that works for one person within
  14 days. For each person, you choose whether they can change the trip or only view it. You can change that, remove
  someone, or stop sharing at any time. Someone a trip is shared with can leave it.
- **What everyone on the trip sees.** The trip as it is now (places, days, times, notes, the hotel, who is going), who
  else is on it by the name and picture they use on FiveStar, and who changed it last. Anyone who opens a trip link
  sees whose trip it is, where and when, before they choose to join.
- **Bookings stay yours.** A booking (such as a flight or hotel confirmation that FiveStar found in your email)
  belongs to whoever it came from. Nobody else on the trip sees your bookings or confirmation numbers, and you never
  see theirs. FiveStar reads each person's email only into trips that person owns.
- **Everyone keeps their own copy.** Each person on a shared trip has the trip in their own FiveStar memory, so it
  stays part of their travel history. If you stop sharing, remove someone, or someone leaves, each of them keeps their
  copy as it was then, marked as shared by you, and it no longer changes. If you delete a trip you shared, the others
  keep their copies unless they delete them. Their copy never includes your bookings.
- **The trip's album.** On a shared trip, you can set a memory book photo to **Everyone on this trip**. Everyone
  currently on the trip then sees it in the trip's album, with your name and picture, its day and the name of its
  stop. The photo stays in your book, and only you can change or remove it. When someone leaves or is removed, or the
  trip stops being shared, the album is closed to them at once. Their own photos stay in their own books.

## Sharing a conversation

You can turn a conversation with FiveStar into a link, instead of a screenshot, with **Share**. Anyone with the link
can read the conversation and see its places on a map, and can carry it on as their own conversation. It is your
choice, it works whether or not you are signed in, and nothing is published until you choose **Create public link**.

- **You see it first.** Before the link is made, FiveStar shows you every word the link will show, and you can take
  out any question together with its answer.
- **What a link never holds.** Where you are or were (no position, no route from where you stood, no walking or
  driving times or distances), routes to an address, your name or email address, booking and confirmation numbers,
  phone numbers, email addresses, coordinates, or your home address. FiveStar's AI model also rewrites each question
  and answer to leave out personal details such as names, ages, health, allergies and diets, relationships, and your
  own travel dates. If that check cannot run, no link is made. Your memory, check-ins and email are never part of a
  link.
- **Who it says shared it.** Nobody: the link and its preview image do not name you. We keep a keyed one-way code of
  your FiveStar id with the link so you can list and delete your own links.
- **Unlisted.** A link is not listed or searchable anywhere in FiveStar, and it asks search engines not to index it.
  But anyone you give it to can pass it on, and apps that show link previews (such as Messages, Facebook or X) show its
  first question and the places it names.
- **Someone who continues it** starts their own conversation from it. Their new questions use their own location and
  memory, never yours, and your questions never become part of their memory.
- **Deleting.** Links do not expire. Delete any of them in **Settings** (or **Delete this link** on the link itself),
  and it stops working at once. "Forget everything about me" deletes all of them. If you were not signed in, your links
  belong to that browser's visitor cookie.

## Email from FiveStar

FiveStar sends you two kinds of email, and nothing else: one when someone asks to be your friend, and one when a
friend shares a trip with you. The email says who it is from, and for a trip, the city and the dates. Each email has
one button and contains no tracking pixels or remote images. We send no newsletters, offers or advertising.

- **Only to a verified address.** FiveStar emails you only at an address that is verified in one of two ways. Either
  your sign-in provider says it is verified (Google, or Apple when you share your real address rather than a private
  relay), or you confirmed it yourself in **Settings**, under **Profile & sign-in**, by opening a one-time link
  FiveStar emailed to that address. An address waiting for confirmation gets nothing but that one link, and it is kept
  for at most 24 hours.
- **Who sees your address.** Only you, in **Settings**. It is never shown to another traveler, never included in a
  notice sent to anyone else, never written to our logs, and it cannot be used to look you up.
- **Limits.** FiveStar limits how many notices anyone can cause or receive in a day. To do that, it keeps short-lived
  records made of keyed one-way codes and times, never addresses or names.
- **Replies** go to the FiveStar team, not to the person named in the email.
- **Stopping.** Turn either kind of notice off in **Settings**, or use the unsubscribe link at the bottom of any
  notice (or your mail app's Unsubscribe button), which works without signing in. "Forget everything about me"
  deletes your address and your choices.
- **Who delivers it.** We send these emails through Amazon Web Services (Amazon SES), with Resend as a fallback. Each
  receives only your address and the email itself, to deliver it.

## What is public

- **Reviews** are public, like reviews on a map: anyone, signed in or not, can read your rating, your review text,
  your name and your picture (the profile photo you chose, if you chose one; otherwise FiveStar shows pictures from
  Google and X, and for other sign-ins your initials). Your profile photo shows wherever your name does.
  The form says "Posting publicly as" your name before you post. A place's average rating and review count are
  public too.
- **Check-ins are never public.** Only your friends see them, as described in
  [Friends and shared trips](#friends-and-shared-trips). Where FiveStar shows activity at a place drawn from check-ins
  (such as how many travelers have been there, or how popular it is), it is an aggregate across at least five different
  travelers. Nothing public reveals who is at a place right now, or anyone's times or trail.
- **Shared conversations** can be read by anyone who has the link, as described in
  [Sharing a conversation](#sharing-a-conversation).
- **Trip photos** are seen only by the audience you choose for each one: only you, everyone on a shared trip, your
  friends, or the public. Nobody but you sees exactly when or where one was taken.
- **Places you add** are public right away, marked "New · added by" with the name (and, where your sign-in gives
  one, the picture) your sign-in provides, and how many travelers have confirmed them. Deleting your contributions
  takes your name off them; the place stays, shown as added by "a traveler", because others' maps depend on it.
- **Menu photos** are public: anyone can see the photo, the date it was added, and whether it came from the
  restaurant or from a traveler. Your name is never shown with a menu photo.
- **Your rank** (such as "Explorer") is shown beside your name only where your name is already public: on your
  reviews and on places you added. Your points, and what earned them, are not public.
- **The town board** is opt-in. If you join it, it shows your name, picture, rank and the points you earned that week
  around a town to anyone who opens the board there. It never shows where you went, when, or what you checked in at.

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
- **Amazon Web Services** (Amazon SES) and **Resend**: delivering FiveStar's email notices and confirmation links.
  Each receives only the recipient's address and the email.
- **Google Workspace**: the FiveStar team's own mailboxes, which receive replies to our emails and mail to support.
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
- **Friendships** are kept until either of you removes the friendship. **Invitation links** expire after 14 days and
  **friend requests** after 30, unless they are used or declined first.
- **Shared trips** are kept until the owner stops sharing or deletes the trip. Each person's own copy is kept until
  they delete it or forget everything, including after sharing stops (see [Sharing a trip](#sharing-a-trip)).
  **Trip links** expire after 14 days, or once they are used.
- **Trip photos** are kept until you remove them, delete the trip, or forget everything.
- **Shared conversation links** are kept until you delete them or forget everything. They do not expire.
- **Your email address for notices** is kept until you change it or forget everything. An address waiting for
  confirmation is deleted after 24 hours. The records that limit how many notices are sent hold only keyed codes and
  times, and each one is reused after 24 hours.
- **Places you added or corrected** stay as part of the place's history after you delete your check-ins or your
  account, with your name removed.
- **Points** are kept until you forget everything or ask us to delete your account. Leaving the town board takes you
  off it at once.
- **Usage counts** are kept under the keyed code described in [Usage counts](#usage-counts), which cannot be linked
  back to you.
- **Operational logs** (such as errors and request records with IP addresses) are kept for up to 30 days for
  security and troubleshooting. FiveStar does not log the content of your messages, your emails or your location.

## Your choices and rights

In the app, at any time:

- See and remove anything FiveStar remembers (**What FiveStar remembers**), or tap **Forget everything about me** to
  erase your memory, interests, preferences, trips and email-reading progress, disconnect every email and calendar
  connection, remove your forwarding address, calendar link and trips feed, erase your points and take you off
  the town board, delete every conversation link you shared, remove every friendship and every invitation or request not yet used, delete your memory books, your
  profile photo, and the email address FiveStar keeps for notices, stop sharing the trips you shared and take you off
  every trip shared with you. Others on those trips keep their own copies, as described in
  [Sharing a trip](#sharing-a-trip).
- See and delete your check-ins (**Your check-ins** in your account), one at a time or all at once.
- Edit or delete your reviews.
- In **Friends**, hide your check-ins from any friend or all of them, turn check-ins as they happen on or off, stop
  people finding you by name, or remove a friend.
- Stop sharing a trip, change or remove who is on it, or leave a trip shared with you.
- Remove a trip photo or change who can see it.
- Turn email notices off in **Settings**, or with the unsubscribe link in any notice.
- Delete any conversation link you shared, in **Settings**.
- Disconnect any email or calendar connection.
- Remove a linked sign-in.

The step-by-step guide is at [Delete your data](/data-deletion). To delete your whole account, or to ask for a copy
of your data or a correction, email [support@askfivestar.ai](mailto:support@askfivestar.ai) from the address on your
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

Email [support@askfivestar.ai](mailto:support@askfivestar.ai).
