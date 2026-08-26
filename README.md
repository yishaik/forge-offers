# Forge

Paste the job. Send a priced page. Get paid.

Forge turns a messy brief — a WhatsApp dump, a half-sentence on price — into a client-ready offer page the client can approve. Built in Tel Aviv. Hebrew and English.

Israel-first: WhatsApp brief → priced offer page → approve.

## Live Demo

**https://yishaik.github.io/forge-offers/**

## Open locally

```bash
python3 -m http.server 8765
```

Then:

- Landing: http://127.0.0.1:8765/
- Builder: http://127.0.0.1:8765/app.html
- Client offer: forged from the builder, or any `offer.html#<urlencoded JSON>`

You can also open the HTML files directly (`file://`). Shareable links work best over `http://`.

## How to demo

1. Open the builder — Hebrew sample loads by default.
2. Or click **Sample · English / $** to switch.
3. Edit line items if you want.
4. **Copy shareable link** or **Open client view**.
5. On the offer page: **Approve** (mailto) or **Request a change**.

## Pricing

- **Free** — 5 offers / month, ₪0
- **Pro** — ₪49 / month (unlimited offers, your mark on the page, Hebrew + English)

Payments (Bit / card) come after we license an Israeli acquirer. The page is free to send.

## Files

| File | Role |
| --- | --- |
| `index.html` | Marketing landing |
| `app.html` | Offer builder |
| `offer.html` | Client-facing offer (hash or localStorage) |
| `app.js` | Heuristic parser + builder + offer render |
| `styles.css` | Shared design system |

Parser is heuristic only (prices, currency, days/weeks, bullets / commas / plus). No LLM.

## Brand

Warm black `#0B0A09`, ember `#E07A3D`, cream `#F4EDE4`. Fraunces + IBM Plex Sans.

## Roadmap

- [ ] Stripe / Bit integration for payments
- [ ] WhatsApp sharing
- [ ] User accounts & offer history
- [ ] PDF export

---

**Forge · Tel Aviv · 2026**
