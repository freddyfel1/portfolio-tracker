# Portfolio Tracker

A single-page investment portfolio tracker for crypto, metals, and equities. Plain HTML/CSS/JS, no build step, no backend.

## Features

- Live price feeds pulled straight from the browser: Coinbase (crypto spot), CoinGecko (fallback for small-cap tokens), and Finnhub (stocks/ETFs, needs a free API key)
- Editable lots (quantity, buy price, current price) with per-lot delete/restore
- CSV/XLSX import with automatic column detection
- Custom sections and manually-added positions
- Account connect/disconnect toggles that include/exclude holdings from totals
- Light/dark/auto theme, persisted locally
- All edits, imports, and settings persist in the browser via `localStorage` — nothing leaves your machine except the live price lookups

## Running it

No build step. Open `index.html` directly in a browser, or serve the folder statically:

```
python3 -m http.server 8080
```

then visit `http://localhost:8080`.

## Structure

- `index.html` — page shell
- `css/style.css` — theme tokens (light/dark) and layout
- `js/app.js` — seed data, state, live price fetching, file import, and rendering
