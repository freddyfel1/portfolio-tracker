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
- Optional "Connected accounts" section that pulls real positions from E*TRADE via a small local bridge server (see below) — everything else in the tracker stays a plain offline file

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

## Connecting E*TRADE

E*TRADE's API uses OAuth 1.0a, which needs a consumer secret to sign every
request. That secret can't live inside `portfolio-tracker.html` — anyone who
opened the file could read it out of the page source — so it lives instead in
a small local server you run yourself. The tracker's browser page never sees
your E*TRADE credentials; it only talks to this server on `localhost`.

**Setup (one time):**

1. Register a developer app at [developer.etrade.com](https://developer.etrade.com)
   to get a Consumer Key and Consumer Secret. Start with **sandbox** keys —
   they return fake test data, so you can confirm the connection works before
   asking E*TRADE to approve production (real account) access.
2. `cp server/.env.example server/.env` and fill in your key, secret, and
   `ETRADE_ENV` (`sandbox` or `production`).
3. Run the bridge: `node server/etrade-server.js` (plain Node, no npm install
   needed). Leave it running in a terminal.
4. Open the tracker and use the **Connected accounts** panel: click
   **Connect**, approve access on E*TRADE's site in the tab that opens, then
   paste the verification code E*TRADE shows you back into the tracker.
5. Click **Sync now**. Your E*TRADE positions appear in a
   "Connected — E*TRADE" section, editable like any other position. Disconnecting
   or re-syncing never deletes positions already on the page — it only
   replaces the E*TRADE-sourced ones with the latest sync.

**Notes:**

- The bridge only runs when you start it, and only on your machine —
  nothing about your E*TRADE account is ever sent anywhere else.
- This only works when the tracker is opened locally (the file directly, or
  `index.html` over `python3 -m http.server`) with the bridge also running.
  The hosted Artifact preview link can't reach a server on your own
  computer, so **connected accounts won't work from that link** — use your
  local `portfolio-tracker.html` for this feature.
- E*TRADE expires your session at midnight (US Eastern) or after ~2 hours
  idle. When that happens, click **Connect** again — it takes a few seconds.
- `server/.env` and `server/.etrade-session.json` (where your tokens are
  cached between runs) are gitignored — never commit either one.
