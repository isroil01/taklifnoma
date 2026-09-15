# Taklifnoma — wedding invitation

A mobile-first wedding invitation page (Next.js 16, App Router) in a burgundy-lace and ivory style, with Russian and Uzbek text.

Sections, top to bottom: lace cover with polaroid, photo booth (tap to open the gallery), greeting, date with calendar and countdown, day program, venue with map links, dress code with palette, RSVP form, closing.

## Run

```bash
npm install
npm run dev
```

Open http://localhost:3000. Add `?lang=uz` to a link to open it in Uzbek.

## Personalise

Everything is in [`src/content/wedding.ts`](src/content/wedding.ts):

- `couple`, `date` (keep the `+05:00` offset), `venue` and the map links
- `program` and the dress-code `palette`
- all visible texts in the `ru` and `uz` dictionaries

Photos: put real images into `public/photos/` and update `photos.cover`, `photos.booth` (4 portrait shots for the strip) and `gallery`. JPG and WebP work, and `next/image` optimises them automatically. The SVGs that ship in that folder are placeholders.

## RSVP answers in Telegram

Copy `.env.example` to `.env.local` and fill in `TELEGRAM_BOT_TOKEN` and `TELEGRAM_CHAT_ID`. Every submitted answer then arrives as a message in that chat. Without these values, answers are only printed in the server log.

## Deploy

Deploy to Vercel (or any Node host running `npm run build && npm start`), and set the same two environment variables there.
