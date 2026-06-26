# ORCID-WACA

Website for the ORCID-WACA initiative — a WACREN programme working to get ORCID and persistent identifiers adopted across West and Central Africa.

🌐 [orcid.wacren.net](https://orcid.wacren.net)

---

## What this is

A lot of African researchers only encounter ORCID when a journal forces them to register during submission. This project is about changing that — building awareness, capacity, and genuine adoption of persistent identifiers across the region, through an Ambassadors Programme and a Community of Practice.

This repo is the public website for that initiative.

---

## Stack

- **Next.js 16** (App Router)
- **React 19** + **TypeScript**
- **Tailwind CSS v4**
- **next-intl** — English, French, and Portuguese
- **Framer Motion** — scroll animations

---

## Pages

- `/` — Home
- `/about` — Background, mission & vision
- `/ambassadors` — The ambassador programme and profiles
- `/community` — Community of Practice
- `/resources` — Resource hub
- `/updates` — News and updates
- `/updates/[slug]` — Individual articles
- `/contact` — Contact form

---

## Running locally

```bash
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

---

## Translations

All text lives in `messages/en.json`, `messages/fr.json`, and `messages/pt.json`. To add or change something, update the key in all three files. Country names in the contact form are handled automatically via the `Intl.DisplayNames` API — no manual lists to maintain.

---

## Environment

```env
NEXT_PUBLIC_SITE_URL=https://orcid.wacren.net
```

For local dev, this defaults to `http://localhost:3000` if not set.

---

## Deploying

```bash
npm run build
npm start
```

Works on any Node.js host — Vercel, Railway, a bare VPS, whatever.

---

Built by [WACREN](https://wacren.net) — questions to [orcid@wacren.net](mailto:orcid@wacren.net)
