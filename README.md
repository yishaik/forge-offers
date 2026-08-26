# Forge

Paste the job. Send a priced page. Get paid.

Forge turns a messy brief — a WhatsApp dump, a half-sentence on price — into a client-ready offer page the client can approve. Built in Tel Aviv. English and Hebrew.

This is the first live demo: a static site, no build step, no backend.

## Open locally

```bash
cd /workspace/forge
python3 -m http.server 8765
```

Then:

- Landing: http://127.0.0.1:8765/
- Builder: http://127.0.0.1:8765/app.html
- Client offer: forged from the builder, or any `offer.html#<urlencoded JSON>`

You can also open the HTML files directly (`file://`). Shareable links work best over `http://`.

## How to demo

1. Open the builder.
2. Click **Sample · Hebrew / ₪** or **Sample · English / $**.
3. Edit line items if you want.
4. **Copy shareable link** or **Open client view**.
5. On the offer page: **Approve** (mailto) or **Request a change**.

## Pricing (product)

- Free — 3 offers / month
- Pro — $29 / month
- 2.5% only if you collect payment in Forge

## Files

| File | Role |
| --- | --- |
| `index.html` | Marketing landing |
| `app.html` | Offer builder |
| `offer.html` | Client-facing offer (hash or localStorage) |
| `app.js` | Heuristic parser + builder + offer render |
| `styles.css` | Shared design system |

Parser is heuristic only (prices, currency, days/weeks, bullets / commas / plus). No LLM.

## GitHub Pages

https://yishaik.github.io/forge-offers/

## Brand

Warm black `#0B0A09`, ember `#E07A3D`, cream `#F4EDE4`. Fraunces + IBM Plex Sans.
