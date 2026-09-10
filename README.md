# Portfolio Tracker

A single-page investment portfolio tracker for crypto, metals, and equities. Plain HTML/CSS/JS, no build step, no backend.

## Features

- Live price feeds pulled straight from the browser: Coinbase (crypto spot), CoinGecko (fallback for small-cap tokens), and Finnhub (stocks/ETFs, needs a free API key)
- Editable lots (quantity, buy price, current price) with per-lot delete/restore (10s undo window)
- CSV/XLSX import with automatic column detection
- Custom, reorderable sections and manually-added positions
- Ticker search and a filter to hide zero-balance positions
- Export to PDF via the browser's print dialog
- Light/dark/auto theme, persisted locally
- All edits, imports, and settings persist in the browser via `localStorage` — nothing leaves your machine except the live price lookups

## Running it

No build step, no server required.

**Single file:** open `portfolio-tracker.html` directly (double-click it, or drag it into a browser tab) — everything is bundled inline, so it works standalone from anywhere, including your desktop.

**Multi-file (for editing):** open `index.html`, or serve the folder statically:

```
python3 -m http.server 8080
```

then visit `http://localhost:8080`.

## Structure

- `portfolio-tracker.html` — standalone single-file build (CSS/JS inlined) for opening directly with no setup
- `index.html` — page shell (multi-file version, for development)
- `css/style.css` — theme tokens (light/dark) and layout
- `js/app.js` — seed data, state, live price fetching, file import, and rendering

If you edit `css/style.css` or `js/app.js`, regenerate `portfolio-tracker.html` by re-inlining them (ask Claude to do this, or paste them into the `<style>`/`<script>` tags by hand).
