# Taklifnoma — wedding invitation

A mobile-first wedding invitation page (Next.js 16, App Router) in a burgundy-lace and ivory style, with Russian and Uzbek text.

The page opens on a sealed envelope. Tapping the wax seal opens it, slides the letter out, starts the music and reveals the invitation. After that come the cover photo, greeting, date with calendar and countdown, day program, venue with map links, RSVP form, and closing.

## Run

```bash
npm install
npm run dev
```

Open http://localhost:3000. Add `?lang=uz` to a link to open it in Uzbek.

## Personal links for each guest

Open `/links` (for example http://localhost:3000/links), type a guest's name, pick the language, and send the link to Telegram or copy it.

A link like `/?to=Aziz%20aka%20oilasi%20bilan&lang=uz`:

- shows the guest's name on the envelope and in the greeting
- pre-fills the name in the RSVP form
- gets its own Telegram preview card with the guest's name

The `/links` page is not linked from the invitation and is hidden from search engines. Anyone who knows its address can still use it, but all it can do is create personalised links.

## Personalise

Everything is in [`src/content/wedding.ts`](src/content/wedding.ts):

- `couple`, `date` (keep the `+05:00` offset), `venue` and the map links
- `program`
- all visible texts in the `ru` and `uz` dictionaries

Cover photo: `public/photos/cover.jpg`. Use JPG or PNG, because the Telegram preview card reuses the same photo.

## Link preview (Telegram, WhatsApp)

The preview image is generated at `/og`. It needs the site's public address: set `NEXT_PUBLIC_SITE_URL` (see `.env.example`). On Vercel the production URL is used automatically. The preview fonts are loaded from Google Fonts the first time the image is generated.

## Background music

The site ships with Pachelbel's Canon on piano, played by Lee Galloway ([Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Pachelbel's_Canon.ogg)). It is licensed CC BY-SA 3.0, which requires a credit, so the footer shows one (`music.credit` in `wedding.ts`). If you switch to a song that doesn't need a credit, set `credit: null`.

To use a different song, put it at `public/music/wedding.mp3` (or change `music.src` in `wedding.ts`). The round music button appears only once that file exists. If you add the file while `npm run dev` is running, refresh the page. The song starts when the guest opens the envelope, and the button pauses or resumes it. Keep the file small (a 128 kbps MP3 of about 3–5 MB) so it loads quickly on mobile data.

## RSVP answers in Telegram

Copy `.env.example` to `.env.local` and fill in `TELEGRAM_BOT_TOKEN` and `TELEGRAM_CHAT_ID`. Every submitted answer then arrives as a message in that chat. Without these values, answers are only printed in the server log.

## Deploy

Deploy to Vercel (or any Node host running `npm run build && npm start`), and set the environment variables there.
