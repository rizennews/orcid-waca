# ORCID-WACA

The official website for the **ORCID West and Central Africa (ORCID-WACA)** initiative — a WACREN-led programme supported by the ORCID Global Participation Fund, driving ORCID adoption and persistent identifier (PID) awareness across West and Central Africa.

🌐 **Live Site:** [orcid.wacren.net](https://orcid.wacren.net)

---

## About the Project

ORCID-WACA works to raise awareness of ORCID's benefits, support its integration with institutional repositories and research infrastructure, and grow regional capacity through the **Ambassadors Programme** and the **Community of Practice (CoP)**.

---

## Tech Stack

| Technology | Purpose |
|---|---|
| [Next.js 16](https://nextjs.org/) | App framework (App Router) |
| [React 19](https://react.dev/) | UI rendering |
| [TypeScript](https://www.typescriptlang.org/) | Type safety |
| [Tailwind CSS v4](https://tailwindcss.com/) | Styling |
| [next-intl](https://next-intl-docs.vercel.app/) | Internationalisation (i18n) |
| [Framer Motion](https://www.framer.com/motion/) | Animations |

---

## Features

- **Multilingual** — Full support for English 🇬🇧, French 🇫🇷, and Portuguese 🇵🇹 across all pages
- **Internationalised SEO** — Per-page `generateMetadata` with canonical URLs, Open Graph, Twitter Cards, and `hreflang` alternate links in all three languages
- **Production URL** — All SEO metadata resolves to `https://orcid.wacren.net`
- **Scroll Animations** — Tasteful Framer Motion `FadeIn` animations on all key sections
- **Automatic Sitemap** — `/sitemap.xml` and `/robots.txt` auto-generated
- **Schema.org JSON-LD** — `Organization` and `WebSite` structured data in the root layout

### Pages

| Route | Description |
|---|---|
| `/` | Home — Hero, stats, initiatives, benefits, timeline, FAQ |
| `/about` | About — Story, mission & vision |
| `/ambassadors` | Ambassador Programme & profiles |
| `/community` | Community of Practice |
| `/resources` | Resource hub |
| `/updates` | News & updates listing |
| `/updates/[slug]` | Individual news article |
| `/contact` | Contact form & connect info |

---

## Getting Started

**Prerequisites:** Node.js 18+

```bash
# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Project Structure

```
src/
├── app/
│   ├── layout.tsx              # Root layout (JSON-LD, fonts)
│   ├── robots.ts               # robots.txt generation
│   ├── sitemap.ts              # sitemap.xml generation
│   ├── icon.png                # Favicon
│   └── [locale]/               # Locale-scoped routes (en | fr | pt)
│       ├── layout.tsx          # Locale layout (next-intl provider)
│       ├── page.tsx            # Home page
│       ├── about/
│       ├── ambassadors/
│       ├── community/
│       ├── contact/
│       ├── resources/
│       └── updates/
│           └── [slug]/         # Dynamic article pages
├── components/
│   ├── Header.tsx              # Sticky nav with language switcher
│   ├── Footer.tsx              # Footer with social links
│   ├── FadeIn.tsx              # Reusable Framer Motion wrapper
│   ├── AmbassadorGrid.tsx
│   ├── FAQ.tsx
│   ├── NewsGrid.tsx
│   ├── ResourceHub.tsx
│   ├── Timeline.tsx
│   └── VideoPlayer.tsx
└── i18n/
    └── routing.ts              # Locale routing config

messages/
├── en.json                     # English translations
├── fr.json                     # French translations
└── pt.json                     # Portuguese translations

public/
└── orcid-waca.png              # Logo
```

---

## Translations

All UI strings live in `messages/{locale}.json`. To add or update content:

1. Update the key in `messages/en.json`
2. Add the corresponding translated value in `messages/fr.json` and `messages/pt.json`
3. Reference it in the component via `t('namespace.key')`

African country names in the contact form are automatically translated using the browser-native `Intl.DisplayNames` API, so no manual country list maintenance is needed.

---

## Environment Variables

Create a `.env.local` file for local development (optional — the site uses sensible defaults):

```env
NEXT_PUBLIC_SITE_URL=https://orcid.wacren.net
```

---

## Deployment

```bash
# Build for production
npm run build

# Start production server
npm start
```

The app is designed to be deployed on any Node.js-compatible platform (Vercel, Railway, bare VPS, etc.).

---

## Implementing Organisation

**WACREN** — West and Central African Research and Education Network
🌐 [wacren.net](https://wacren.net) | 📧 [orcid@wacren.net](mailto:orcid@wacren.net)
