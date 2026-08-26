# Forge

**Paste the job. Send a priced page. Get paid.**

Quote-to-cash for freelancers, consultants, and SMB service businesses.

## What is Forge?

Forge turns messy client briefs into polished, shareable offer pages in seconds. No templates, no spreadsheets—just paste the brief, review the parsed line items, and send a professional offer link.

### Features

- **Smart Brief Parser** — Heuristic parser detects prices (₪, $, ILS, USD), durations, and bullet points from any client message
- **Bilingual Support** — Full English and Hebrew (RTL) support
- **Multi-Currency** — ILS (₪) and USD ($) with VAT (17%) toggle
- **Shareable Links** — Compressed URL contains the full offer, no backend required
- **Print-Ready** — Client offer pages are optimized for printing/PDF
- **Client Actions** — One-click approve or request changes via email

## Live Demo

**[https://yishaik.github.io/forge-offers/](https://yishaik.github.io/forge-offers/)**

## Running Locally

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## Tech Stack

- **Next.js 16** with App Router
- **TypeScript**
- **Tailwind CSS 4**
- **Static Export** (`output: 'export'`) for GitHub Pages

## Pages

| Route | Description |
|-------|-------------|
| `/` | Landing page with hero, value props, and pricing |
| `/app` | Builder — paste brief, parse, edit line items, copy link |
| `/offer` | Client-facing offer page (reconstructs from URL) |

## How It Works

1. Paste your client's messy brief into the builder
2. Forge parses prices, currencies, and deliverables automatically
3. Edit line items, add your business details
4. Copy the shareable link — the entire offer is encoded in the URL
5. Client views, approves, or requests changes via email

## Sample Briefs

Try the sample briefs in the builder:
- **Hebrew**: WordPress site with booking for a Tel Aviv yoga studio (ILS)
- **English**: Brand website with SEO for a consulting business (USD)

## Brand

- **Colors**: Warm black (#1a1917), Ember/copper accent (#c45c3e)
- **Typography**: Libre Baskerville (serif headlines), Inter (sans body)
- **Design**: Mobile-first, editorial, not generic SaaS purple

## Roadmap

- [ ] Stripe integration for payments
- [ ] WhatsApp sharing
- [ ] User accounts & offer history
- [ ] PDF export
- [ ] Custom branding per business

## License

MIT

---

**Forge · Tel Aviv · 2026**
