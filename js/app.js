"use strict";

/* ---------- seed data ---------- */
/* [group, account, ticker, sub-label, qty, buyPrice, priceNow] */
const SEED = [
  ["Metals", "apmex", "GOLD", "Gold — ring + bullion · 2023", 3, 1610, 4500],
  ["Metals", "apmex", "SILVER", "Silver — bullion · 2018", 90, 18, 80],
  ["Stocks — Linqto", "linqto", "RIPPLE-PRIV", "Ripple private shares · Nov 2023", 84, 59.63, 0],
  ["Stocks — Linqto", "linqto", "RIPPLE-PRIV", "Ripple private shares · Oct 2023", 83, 60.54, 0],
  ["Stocks — Linqto", "linqto", "POLYSIGN", "Polysign private shares · Nov 2023", 1613, 3.10, 0],
  ["Crypto — Main wallets", "dcent", "XRP", "XRP Ledger · via Coinbase", 20000, 0.50, 1.4218],
  ["Crypto — Main wallets", "itrust", "XRP", "XRP Ledger · via UpHold", 15000, 0.4795, 1.4218],
  ["Crypto — Main wallets", "dcent", "XLM", "Stellar · Tangem swap", 10000, 0.48, 0.1855],
  ["Crypto — Main wallets", "itrust", "XLM", "Stellar · Tangem swap", 10000, 0.48, 0.1855],
  ["Crypto — Main wallets", "dcent", "LINK", "Ethereum · D'Cent swap", 150, 22.12, 11.94],
  ["Crypto — Main wallets", "itrust", "LINK", "Ethereum", 150, 22.12, 11.94],
  ["Crypto — Main wallets", "itrust", "SOL", "Solana · via UpHold", 21.42080992, 225, 103.60],
  ["Crypto — Main wallets", "dcent", "HBAR", "Hedera · via UpHold", 15000, 0.04, 0.07965],
  ["Crypto — Main wallets", "itrust", "HBAR", "Hedera · via UpHold", 20000, 0.04, 0.07965],
  ["Crypto — Main wallets", "itrust", "ADA", "Cardano · via Coinbase", 10000, 0.45, 0.2176],
  ["Crypto — Main wallets", "dcent", "FLR", "Flare · via Bitrue", 61000, 0.01, 0.0081],
  ["Crypto — Main wallets", "dcent", "SGB", "Songbird · via Bitrue", 60000, 0.006, 0.001531],
  ["Crypto — Main wallets", "dcent", "ZBCN", "Zebec · D'Cent swap", 188140.7, 0.004, 0.0077530],
  ["Crypto — Main wallets", "dcent", "XPR", "XPR Network · D'Cent swap", 192000, 0.006, 0.0075279],
  ["Crypto — Main wallets", "coinbase", "VET", "VeChain · Dec 2025", 18789.6, 0.0127, null],
  ["Crypto — Main wallets", "coinbase", "VET", "VeChain · Dec 2025", 21814.609, 0.011, null],
  ["Crypto — Cristina's wallets", "dcent2", "XRP", "XRP Ledger · D'Cent 2", 1003.25021, 0.50, 1.4218],
  ["Crypto — Cristina's wallets", "dcent2", "XLM", "Stellar · D'Cent 2", 1003.04758, 0.48, 0.1855],
  ["Crypto — Cristina's wallets", "dcent2", "XDC", "XDC Network · D'Cent 2", 4999.99974, 0.03, 0.09743],
  ["Crypto — Cristina's wallets", "dcent2", "HBAR", "Hedera · D'Cent 2", 1041.50968, 0.04, 0.07965],
  ["Crypto — Cristina's wallets", "dcent2", "SHIB", "Ethereum · D'Cent 2", 1000000, 0.0000055490, 0.0000055490],
  ["Crypto — Cristina's wallets", "dcent2", "PEPE", "Ethereum · D'Cent 2", 2120088.4, 0.0000055490, null],
  ["Crypto — Cristina's wallets", "dcent2", "XCN", "Onyxcoin · D'Cent 2", 1000, 0.00465, null],
  ["Watchlist — Crypto", "coinbase", "BTC", "Coinbase · no position", 0, 0, 78748.01],
  ["Watchlist — Crypto", "coinbase", "ETH", "Coinbase · no position", 0, 0, 2494.21],
  ["Watchlist — Crypto", "coinbase", "ALGO", "Algorand · no position", 0, 0, null],
  ["Watchlist — Crypto", "metamask", "FET", "AI basket · unassigned", 0, 0, null],
  ["Watchlist — Crypto", "metamask", "DAG", "Constellation · unassigned", 0, 0, null],
  ["Watchlist — Crypto", "metamask", "COPI", "Cornucopias staking", 0, 0.0347, null],
  ["Watchlist — Stocks", "etrade", "IONQ", "IonQ · quantum", 0, 26.01, 39.52],
  ["Watchlist — Stocks", "etrade", "QBTS", "D-Wave Quantum", 0, 9.155, 16.58],
  ["Watchlist — Stocks", "etrade", "QUBT", "Quantum Computing Inc", 0, 6.415, 8.01],
  ["Watchlist — Stocks", "etrade", "ARQQ", "Arqit Quantum", 0, 18, 21.37],
  ["Watchlist — ETFs", "robinhood", "SCHG", "Large-cap growth", 0, 32.92, 35.52],
  ["Watchlist — ETFs", "robinhood", "SCHD", "Dividend equity", 0, 27.26, 34.155],
  ["Watchlist — ETFs", "robinhood", "SGOV", "0–3mo Treasuries", 0, 100.49, 100.485],
  ["Watchlist — ETFs", "robinhood", "QQQI", "Nasdaq covered call", 0, 66.07, 54.75],
  ["Watchlist — ETFs", "robinhood", "BSOL", "Solana staking ETF", 0, 20.16, 14.21],
  ["Watchlist — ETFs", "robinhood", "EZRP", "XRP ETF", 0, 22.78, 22.78]
];

/* [id, name, kind, connectedByDefault] */
const ACCOUNTS = [
  ["dcent", "D'Cent Wallet", "Hardware wallet · read-only key", true],
  ["itrust", "iTrustCapital", "Crypto IRA · API key", true],
  ["coinbase", "Coinbase", "Exchange · OAuth", true],
  ["dcent2", "D'Cent 2 (Cristina)", "Hardware wallet · read-only key", true],
  ["apmex", "Apmex / Home safe", "Manual entry", true],
  ["linqto", "Linqto", "Private markets · in bankruptcy", true],
  ["etrade", "E-Trade", "Brokerage · OAuth", false],
  ["robinhood", "Robinhood", "Brokerage · OAuth", false],
  ["metamask", "MetaMask", "Self-custody · address watch", false]
];

const GROUP_COLORS = {
  "Metals": "oklch(0.78 0.1 85)",
  "Stocks — Linqto": "oklch(0.66 0.15 25)",
  "Crypto — Main wallets": "oklch(0.72 0.13 200)",
  "Crypto — Cristina's wallets": "oklch(0.72 0.13 300)",
  "Watchlist — Crypto": "oklch(0.55 0.03 255)",
  "Watchlist — Stocks": "oklch(0.5 0.03 255)",
  "Watchlist — ETFs": "oklch(0.45 0.03 255)"
};
const IMPORT_COLOR = "oklch(0.74 0.14 155)";

// ticker -> live feed mapping. coinbase = spot API; finnhub = stocks/ETFs (needs a free key)
const FEED_MAP = {
  BTC: ["coinbase", "BTC-USD"], ETH: ["coinbase", "ETH-USD"], XRP: ["coinbase", "XRP-USD"],
  XLM: ["coinbase", "XLM-USD"], LINK: ["coinbase", "LINK-USD"], SOL: ["coinbase", "SOL-USD"],
  HBAR: ["coinbase", "HBAR-USD"], ADA: ["coinbase", "ADA-USD"], FLR: ["coinbase", "FLR-USD"],
  VET: ["coinbase", "VET-USD"], ALGO: ["coinbase", "ALGO-USD"], SHIB: ["coinbase", "SHIB-USD"],
  PEPE: ["coinbase", "PEPE-USD"], XCN: ["coinbase", "XCN-USD"], XDC: ["coinbase", "XDC-USD"],
  FET: ["coinbase", "FET-USD"], DAG: ["coinbase", "DAG-USD"], SGB: ["coinbase", "SGB-USD"],
  IONQ: ["finnhub", "IONQ"], QBTS: ["finnhub", "QBTS"], QUBT: ["finnhub", "QUBT"],
  ARQQ: ["finnhub", "ARQQ"], SCHG: ["finnhub", "SCHG"], SCHD: ["finnhub", "SCHD"],
  SGOV: ["finnhub", "SGOV"], QQQI: ["finnhub", "QQQI"], BSOL: ["finnhub", "BSOL"],
  EZRP: ["finnhub", "EZRP"], GOLD: ["coinbase", "PAXG-USD"]
};
// CoinGecko ids — fallback for tickers Coinbase has no pair for
const GECKO_IDS = {
  SGB: "songbird", XDC: "xdce-crowd-sale", DAG: "constellation-labs", FLR: "flare-networks",
  XCN: "onyxcoin", ZBCN: "zebec-network", XPR: "proton", VET: "vechain", HBAR: "hedera-hashgraph",
  PEPE: "pepe", SHIB: "shiba-inu", ALGO: "algorand", FET: "fetch-ai", ADA: "cardano",
  XLM: "stellar", XRP: "ripple", SOL: "solana", LINK: "chainlink", BTC: "bitcoin", ETH: "ethereum",
  GOLD: "pax-gold"
};
const FEED_LABELS = {
  coinbase: ["Coinbase spot", "Crypto pairs plus spot gold via PAXG. Public endpoint, no key."],
  coingecko: ["CoinGecko", "Fallback for small-cap tokens Coinbase has no USD pair for."],
  finnhub: ["Finnhub — stocks & ETFs", "US equities and ETFs. Needs a free API key; no keyless stock feed is reachable from a browser."]
};
const KEY = "portfolio-tracker-v2";

/* ---------- formatting helpers ---------- */
function money(n, dp) {
  if (n === null || n === undefined || !isFinite(n)) return "—";
  const d = dp !== undefined ? dp : (Math.abs(n) >= 1000 ? 0 : 2);
  return (n < 0 ? "-$" : "$") + Math.abs(n).toLocaleString(undefined, { minimumFractionDigits: d, maximumFractionDigits: d });
}
function signed(n) {
  if (n === null || n === undefined || !isFinite(n)) return "—";
  const d = Math.abs(n) >= 1000 ? 0 : 2;
  return (n < 0 ? "−$" : "+$") + Math.abs(n).toLocaleString(undefined, { minimumFractionDigits: d, maximumFractionDigits: d });
}
function qtyFmt(n) {
  if (!n) return "0";
  if (n >= 1000) return n.toLocaleString(undefined, { maximumFractionDigits: 0 });
  return n.toLocaleString(undefined, { maximumFractionDigits: n < 1 ? 6 : 2 });
}
function priceFmt(n) {
  if (n === null || n === undefined) return "";
  if (n === 0) return "0";
  if (n < 0.01) return n.toPrecision(4);
  return String(Number(n.toFixed(n < 1 ? 4 : 2)));
}
function priceMoney(n) {
  if (n === null || n === undefined || !isFinite(n)) return "";
  return "$" + n.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}
function plClass(n) { return n > 0.005 ? "pl-pos" : (n < -0.005 ? "pl-neg" : "pl-flat"); }
function num(v) {
  if (v === null || v === undefined) return NaN;
  return parseFloat(String(v).replace(/[$,%\s]/g, "").replace(/[()]/g, ""));
}
function esc(s) {
  return String(s === undefined || s === null ? "" : s)
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
function escAttr(s) { return esc(s).replace(/"/g, "&quot;"); }

/* ---------- file import helpers ---------- */
async function inflateEntry(entry) {
  if (entry.method === 0) return new TextDecoder().decode(entry.data);
  const stream = new Blob([entry.data]).stream().pipeThrough(new DecompressionStream("deflate-raw"));
  return await new Response(stream).text();
}

async function xlsxToRows(file) {
  const buf = new Uint8Array(await file.arrayBuffer());
  const dv = new DataView(buf.buffer);
  let eocd = -1;
  for (let i = buf.length - 22; i >= 0; i--) { if (dv.getUint32(i, true) === 0x06054b50) { eocd = i; break; } }
  if (eocd < 0) throw new Error("Not a readable .xlsx file.");
  const count = dv.getUint16(eocd + 10, true);
  let off = dv.getUint32(eocd + 16, true);
  const files = {};
  for (let i = 0; i < count; i++) {
    const nl = dv.getUint16(off + 28, true), el = dv.getUint16(off + 30, true), cl = dv.getUint16(off + 32, true);
    const lho = dv.getUint32(off + 42, true);
    const name = new TextDecoder().decode(buf.subarray(off + 46, off + 46 + nl));
    const lnl = dv.getUint16(lho + 26, true), lel = dv.getUint16(lho + 28, true);
    const start = lho + 30 + lnl + lel;
    files[name] = { method: dv.getUint16(off + 10, true), data: buf.subarray(start, start + dv.getUint32(off + 20, true)) };
    off += 46 + nl + el + cl;
  }
  let shared = [];
  if (files["xl/sharedStrings.xml"]) {
    const ss = await inflateEntry(files["xl/sharedStrings.xml"]);
    shared = Array.from(ss.matchAll(/<si>([\s\S]*?)<\/si>/g)).map(m =>
      Array.from(m[1].matchAll(/<t[^>]*>([\s\S]*?)<\/t>/g)).map(x => x[1]).join(""));
  }
  const sheetNames = Object.keys(files).filter(n => /^xl\/worksheets\/sheet\d+\.xml$/.test(n)).sort();
  let best = [];
  for (const sn of sheetNames) {
    const xml = await inflateEntry(files[sn]);
    const rows = Array.from(xml.matchAll(/<row[^>]*>([\s\S]*?)<\/row>/g)).map(r => {
      const arr = [];
      Array.from(r[1].matchAll(/<c r="([A-Z]+)\d+"([^>]*)>([\s\S]*?)<\/c>/g)).forEach(c => {
        let col = 0;
        for (const ch of c[1]) col = col * 26 + (ch.charCodeAt(0) - 64);
        const t = /t="(\w+)"/.exec(c[2]);
        const v = /<v>([\s\S]*?)<\/v>/.exec(c[3]);
        const inl = /<t[^>]*>([\s\S]*?)<\/t>/.exec(c[3]);
        let val = v ? v[1] : (inl ? inl[1] : "");
        if (t && t[1] === "s" && v) val = shared[+v[1]] || "";
        arr[col - 1] = String(val).replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">");
      });
      for (let i = 0; i < arr.length; i++) if (arr[i] === undefined) arr[i] = "";
      return arr;
    });
    const parsed = rowsToLots(rows);
    if (parsed.length > best.length) best = parsed;
  }
  return best;
}

function csvToRows(text) {
  const delim = text.indexOf("\t") > -1 && text.indexOf(",") < 0 ? "\t" : ",";
  const rows = [];
  let row = [], cell = "", q = false;
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (q) {
      if (ch === '"' && text[i + 1] === '"') { cell += '"'; i++; }
      else if (ch === '"') q = false;
      else cell += ch;
    } else if (ch === '"') q = true;
    else if (ch === delim) { row.push(cell); cell = ""; }
    else if (ch === "\n") { row.push(cell); rows.push(row); row = []; cell = ""; }
    else if (ch !== "\r") cell += ch;
  }
  if (cell.length || row.length) { row.push(cell); rows.push(row); }
  return rows;
}

function rowsToLots(rows) {
  const find = (hdr, list, exclude) => {
    for (const k of list) {
      for (let c = 0; c < hdr.length; c++) {
        const h = hdr[c];
        if (h.indexOf(k) < 0) continue;
        if (exclude && exclude.some(x => h.indexOf(x) > -1)) continue;
        return c;
      }
    }
    return -1;
  };
  const NOT_CURRENT = ["buy", "cost", "paid", "purchase", "avg", "average", "basis"];
  let map = null, headerAt = -1;
  for (let i = 0; i < Math.min(rows.length, 25); i++) {
    const hdr = rows[i].map(c => String(c || "").toLowerCase().trim());
    const ticker = find(hdr, ["ticker", "symbol", "coin", "asset"]);
    const qty = find(hdr, ["total shares", "quantity", "shares", "qty", "units", "amount held", "balance"]);
    if (ticker > -1 && qty > -1) {
      map = {
        ticker: ticker, qty: qty,
        name: find(hdr, ["name", "description", "investment type"]),
        buy: find(hdr, ["buy price", "cost per", "average", "avg", "purchase price", "unit cost"]),
        cost: find(hdr, ["total buy", "total paid", "cost basis", "total cost"]),
        price: find(hdr, ["today's price", "todays price", "price now", "current price", "market price", "last price", "mark price", "price"], NOT_CURRENT),
        group: find(hdr, ["group", "account", "exchange", "wallet"])
      };
      headerAt = i;
      break;
    }
  }
  if (!map) return [];
  const out = [];
  for (let i = headerAt + 1; i < rows.length; i++) {
    const r = rows[i];
    const ticker = String(r[map.ticker] || "").trim().toUpperCase().split("/")[0].replace(/[^A-Z0-9.\-]/g, "");
    if (!ticker || ticker.length > 12) continue;
    const qty = num(r[map.qty]);
    if (!isFinite(qty)) continue;
    let buy = map.buy > -1 ? num(r[map.buy]) : NaN;
    const cost = map.cost > -1 ? num(r[map.cost]) : NaN;
    if (!isFinite(buy) && isFinite(cost) && qty) buy = cost / qty;
    const price = map.price > -1 ? num(r[map.price]) : NaN;
    out.push({
      ticker: ticker,
      qty: qty,
      buy: isFinite(buy) ? buy : 0,
      price: isFinite(price) ? price : null,
      name: map.name > -1 ? String(r[map.name] || "").trim() : "",
      group: map.group > -1 ? String(r[map.group] || "").trim() : ""
    });
  }
  return out;
}

/* ---------- app ---------- */
class PortfolioApp {
  constructor(root) {
    this.root = root;
    const seedPrices = {};
    SEED.forEach(r => { if (!(r[2] in seedPrices)) seedPrices[r[2]] = r[6]; });
    const conn = {};
    ACCOUNTS.forEach(a => { conn[a[0]] = a[3]; });
    let saved = {};
    try { saved = JSON.parse(localStorage.getItem(KEY) || "{}") || {}; } catch (e) {}
    this.seedPrices = seedPrices;
    this.defaultConn = conn;
    this.state = {
      prices: Object.assign({}, seedPrices, saved.prices || {}),
      connected: Object.assign({}, conn, saved.connected || {}),
      synced: saved.synced || {},
      imported: saved.imported || [],
      edits: saved.edits || {},
      deleted: saved.deleted || {},
      live: saved.live || {},
      pinned: saved.pinned || {},
      auto: saved.auto !== undefined ? saved.auto : true,
      intervalMs: saved.intervalMs || 60000,
      refreshing: false,
      feedStatus: saved.feedStatus || {},
      theme: saved.theme || "auto",
      custom: saved.custom || [],
      groupDrafts: {},
      extraGroups: saved.extraGroups || [],
      groupNames_: saved.groupNames_ || {},
      groupOrder: saved.groupOrder || [],
      newSectionDraft: "",
      newSectionError: "",
      customAccounts: saved.customAccounts || [],
      deletedAccounts: saved.deletedAccounts || {},
      accountDraft: { name: "", kind: "", error: "" },
      showRestoreBar: false,
      showAccountRestoreBar: false,
      apiKey: saved.apiKey || "",
      keyDraft: saved.apiKey || "",
      lastRefresh: saved.lastRefresh || "",
      savedAt: saved.at || "—",
      group: "All",
      tickerSearch: "",
      watchlist: false,
      hideZero: false,
      drafts: {},
      syncing: {},
      dragging: false,
      importStatus: "",
      importError: false,
      preview: null,
      previewName: ""
    };
    this.render();
    this.attachEvents();
    this.mount();
  }

  /* ---------- theme ---------- */
  resolveTheme() {
    if (this.state.theme === "light" || this.state.theme === "dark") return this.state.theme;
    const prefersLight = typeof matchMedia === "function" && matchMedia("(prefers-color-scheme: light)").matches;
    return prefersLight ? "light" : "dark";
  }
  applyTheme() {
    document.documentElement.dataset.theme = this.resolveTheme();
  }

  /* ---------- state helpers ---------- */
  render() {
    const active = document.activeElement;
    const activeId = active && this.root.contains(active) ? active.id : "";
    const selStart = activeId && "selectionStart" in active ? active.selectionStart : null;
    const selEnd = activeId && "selectionEnd" in active ? active.selectionEnd : null;
    this.applyTheme();
    const vm = this.buildViewModel();
    this.root.innerHTML = template(vm);
    if (activeId) {
      const el = document.getElementById(activeId);
      if (el && typeof el.focus === "function") {
        el.focus();
        if (typeof selStart === "number" && el.setSelectionRange) {
          try { el.setSelectionRange(selStart, selEnd); } catch (e) {}
        }
      }
    }
  }
  persist() {
    const at = new Date().toLocaleString(undefined, { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" });
    const payload = {
      prices: this.state.prices, connected: this.state.connected, synced: this.state.synced,
      imported: this.state.imported, edits: this.state.edits, deleted: this.state.deleted,
      live: this.state.live, pinned: this.state.pinned, auto: this.state.auto, intervalMs: this.state.intervalMs,
      feedStatus: this.state.feedStatus, lastRefresh: this.state.lastRefresh, apiKey: this.state.apiKey,
      theme: this.state.theme, custom: this.state.custom, extraGroups: this.state.extraGroups,
      groupNames_: this.state.groupNames_, customAccounts: this.state.customAccounts,
      deletedAccounts: this.state.deletedAccounts, groupOrder: this.state.groupOrder, at: at
    };
    try { localStorage.setItem(KEY, JSON.stringify(payload)); } catch (e) {}
    this.state.savedAt = at;
  }

  mount() {
    if (typeof matchMedia === "function") {
      this.mq = matchMedia("(prefers-color-scheme: light)");
      this.mqListener = () => { if (this.state.theme === "auto") this.render(); };
      if (this.mq.addEventListener) this.mq.addEventListener("change", this.mqListener);
    }
    if (this.state.auto) { this.refresh(); this.startTimer(); }
  }
  startTimer() {
    this.stopTimer();
    this.timer = setInterval(() => this.refresh(), this.state.intervalMs);
  }
  stopTimer() { if (this.timer) { clearInterval(this.timer); this.timer = null; } }

  /* ---------- live price feed ---------- */
  neededTickers() {
    const live = {};
    SEED.forEach(r => { live[r[2]] = true; });
    this.state.imported.forEach(l => { live[l.ticker] = true; });
    return Object.keys(live).filter(t => FEED_MAP[t]);
  }

  async fetchCoinbase(tickers) {
    const got = {}, failed = [];
    await Promise.all(tickers.map(async t => {
      try {
        const res = await fetch("https://api.coinbase.com/v2/prices/" + FEED_MAP[t][1] + "/spot", { cache: "no-store" });
        if (!res.ok) throw new Error(String(res.status));
        const json = await res.json();
        const n = parseFloat(json && json.data && json.data.amount);
        if (isFinite(n)) got[t] = n; else failed.push(t);
      } catch (e) { failed.push(t); }
    }));
    return { got, failed };
  }

  async fetchGecko(tickers) {
    const list = tickers.filter(t => GECKO_IDS[t]);
    if (!list.length) return { got: {}, failed: tickers.slice() };
    const ids = list.map(t => GECKO_IDS[t]);
    try {
      const res = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=" + ids.join(",") + "&vs_currencies=usd", { cache: "no-store" });
      if (!res.ok) throw new Error(String(res.status));
      const json = await res.json();
      const got = {}, failed = [];
      list.forEach(t => {
        const n = json[GECKO_IDS[t]] && json[GECKO_IDS[t]].usd;
        if (isFinite(n)) got[t] = n; else failed.push(t);
      });
      tickers.filter(t => !GECKO_IDS[t]).forEach(t => failed.push(t));
      return { got, failed };
    } catch (e) {
      return { got: {}, failed: tickers.slice(), error: e && e.message ? e.message : "blocked" };
    }
  }

  async fetchFinnhub(tickers, key) {
    if (!key) return { got: {}, failed: tickers.slice(), needsKey: true };
    const got = {}, failed = [];
    let error = "";
    await Promise.all(tickers.map(async t => {
      try {
        const res = await fetch("https://finnhub.io/api/v1/quote?symbol=" + FEED_MAP[t][1] + "&token=" + encodeURIComponent(key), { cache: "no-store" });
        if (!res.ok) { if (res.status === 401 || res.status === 403) error = "key rejected"; throw new Error(String(res.status)); }
        const json = await res.json();
        const n = parseFloat(json && json.c);
        if (isFinite(n) && n > 0) got[t] = n; else failed.push(t);
      } catch (e) { failed.push(t); if (!error) error = e && e.message ? e.message : "failed"; }
    }));
    return { got, failed, error: Object.keys(got).length ? "" : error };
  }

  async refresh() {
    if (this.state.refreshing) return;
    this.state.refreshing = true; this.render();
    const needed = this.neededTickers();
    const cb = needed.filter(t => FEED_MAP[t][0] === "coinbase");
    const eq = needed.filter(t => FEED_MAP[t][0] === "finnhub");
    const stamp = new Date().toLocaleTimeString(undefined, { hour: "numeric", minute: "2-digit", second: "2-digit" });
    const [cbRes, eqRes] = await Promise.all([this.fetchCoinbase(cb), this.fetchFinnhub(eq, this.state.apiKey)]);
    const gkRes = await this.fetchGecko(cbRes.failed);
    const live = this.state.live;
    const apply = (res, source) => {
      Object.keys(res.got).forEach(t => {
        if (this.state.pinned[t]) return;
        live[t] = { price: res.got[t], at: stamp, source: source };
      });
    };
    apply(cbRes, "coinbase");
    apply(gkRes, "coingecko");
    apply(eqRes, "finnhub");
    this.state.feedStatus = {
      coinbase: { ok: Object.keys(cbRes.got).length, total: cb.length, failed: cbRes.failed.filter(t => !gkRes.got[t]), rescued: cbRes.failed.filter(t => gkRes.got[t]), error: "", at: stamp },
      coingecko: { ok: Object.keys(gkRes.got).length, total: cbRes.failed.length, failed: gkRes.failed, error: gkRes.error || "", at: stamp },
      finnhub: { ok: Object.keys(eqRes.got).length, total: eq.length, failed: eqRes.failed, error: eqRes.error || "", needsKey: !!eqRes.needsKey, at: stamp }
    };
    this.state.refreshing = false;
    this.state.lastRefresh = stamp;
    this.persist();
    this.render();
  }

  editLot(key, field, draftKey, text) {
    this.state.drafts[draftKey] = text;
    const n = num(text);
    if (isFinite(n) && n >= 0) {
      this.state.edits[key] = Object.assign({}, this.state.edits[key], { [field]: n });
      this.persist();
    }
    this.render();
  }

  async handleFile(file) {
    if (!file) return;
    this.state.importStatus = "Reading " + file.name + "…";
    this.state.importError = false;
    this.state.preview = null;
    this.state.dragging = false;
    this.render();
    try {
      let lots;
      if (/\.xlsx$/i.test(file.name)) lots = await xlsxToRows(file);
      else lots = rowsToLots(csvToRows(await file.text()));
      if (!lots.length) {
        this.state.importStatus = "No positions found in " + file.name + ". The file needs a symbol/ticker column and a quantity column.";
        this.state.importError = true;
        this.render();
        return;
      }
      this.state.preview = lots;
      this.state.previewName = file.name;
      this.state.importError = false;
      this.state.importStatus = "Found " + lots.length + " position" + (lots.length === 1 ? "" : "s") + " in " + file.name + ".";
      this.render();
    } catch (err) {
      this.state.importStatus = "Could not read that file: " + (err && err.message ? err.message : "unknown error");
      this.state.importError = true;
      this.render();
    }
  }

  /* ---------- actions (dispatched from delegated events) ---------- */
  toggleAccount(id) {
    if (this.state.syncing[id]) return;
    if (this.state.connected[id]) {
      this.state.connected[id] = false;
      this.persist(); this.render();
    } else {
      this.state.syncing[id] = true;
      this.render();
      setTimeout(() => {
        this.state.connected[id] = true;
        this.state.synced[id] = new Date().toLocaleTimeString(undefined, { hour: "numeric", minute: "2-digit" });
        delete this.state.syncing[id];
        this.persist(); this.render();
      }, 1100);
    }
  }
  effectiveAccounts() {
    const seedAccts = ACCOUNTS.filter(a => !this.state.deletedAccounts[a[0]]);
    const customAccts = this.state.customAccounts.map(a => [a.id, a.name, a.kind]);
    return seedAccts.concat(customAccts);
  }
  accountDraftChange(field, text) {
    this.state.accountDraft = Object.assign({}, this.state.accountDraft, { [field]: text, error: "" });
    this.render();
  }
  addAccount() {
    const draft = this.state.accountDraft;
    const name = (draft.name || "").trim();
    const kind = (draft.kind || "").trim();
    if (!name) { this.state.accountDraft = Object.assign({}, draft, { error: "Give the account a name." }); this.render(); return; }
    const existingIds = this.effectiveAccounts().map(a => a[0]);
    let base = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "") || "account";
    let id = base, n = 2;
    while (existingIds.indexOf(id) > -1) { id = base + "-" + n; n++; }
    this.state.customAccounts = this.state.customAccounts.concat([{ id, name, kind: kind || "Manual entry" }]);
    this.state.connected[id] = true;
    this.state.accountDraft = { name: "", kind: "", error: "" };
    this.persist(); this.render();
  }
  deleteAccount(id) {
    const isCustom = this.state.customAccounts.some(a => a.id === id);
    if (isCustom) {
      this.state.customAccounts = this.state.customAccounts.filter(a => a.id !== id);
    } else {
      this.state.deletedAccounts[id] = true;
      this.armAccountRestoreBar();
    }
    this.persist(); this.render();
  }
  armAccountRestoreBar() {
    this.state.showAccountRestoreBar = true;
    if (this.accountRestoreBarTimer) clearTimeout(this.accountRestoreBarTimer);
    this.accountRestoreBarTimer = setTimeout(() => {
      this.state.showAccountRestoreBar = false;
      this.accountRestoreBarTimer = null;
      this.render();
    }, 10000);
  }
  restoreDeletedAccounts() {
    this.state.deletedAccounts = {};
    this.state.showAccountRestoreBar = false;
    if (this.accountRestoreBarTimer) { clearTimeout(this.accountRestoreBarTimer); this.accountRestoreBarTimer = null; }
    this.persist(); this.render();
  }
  setTheme(mode) { this.state.theme = mode; this.persist(); this.render(); }
  resetPrices() {
    try { localStorage.removeItem(KEY); } catch (e) {}
    if (this.restoreBarTimer) { clearTimeout(this.restoreBarTimer); this.restoreBarTimer = null; }
    if (this.accountRestoreBarTimer) { clearTimeout(this.accountRestoreBarTimer); this.accountRestoreBarTimer = null; }
    this.state = Object.assign({}, this.state, {
      prices: Object.assign({}, this.seedPrices), connected: Object.assign({}, this.defaultConn),
      synced: {}, imported: [], custom: [], edits: {}, deleted: {}, drafts: {}, groupDrafts: {},
      extraGroups: [], groupNames_: {}, savedAt: "—", preview: null, importStatus: "",
      live: {}, pinned: {}, feedStatus: {}, lastRefresh: "",
      customAccounts: [], deletedAccounts: {}, accountDraft: { name: "", kind: "", error: "" },
      showRestoreBar: false, showAccountRestoreBar: false, groupOrder: []
    });
    this.render();
  }
  toggleAuto() {
    const on = !this.state.auto;
    this.state.auto = on;
    if (on) { this.refresh(); this.startTimer(); } else this.stopTimer();
    this.persist(); this.render();
  }
  setInterval_(ms) {
    this.state.intervalMs = ms;
    this.persist();
    if (this.state.auto) this.startTimer();
    this.render();
  }
  onKeyDraftChange(text) { this.state.keyDraft = text; this.render(); }
  saveKey() {
    this.state.apiKey = (this.state.keyDraft || "").trim();
    this.persist(); this.render();
    this.refresh();
  }
  clearKey() { this.state.keyDraft = ""; this.state.apiKey = ""; this.persist(); this.render(); }
  unpinAll() { this.state.pinned = {}; this.persist(); this.render(); this.refresh(); }
  setDragging(on) { if (this.state.dragging !== on) { this.state.dragging = on; this.render(); } }
  cancelImport() { this.state.preview = null; this.state.importStatus = ""; this.render(); }
  commitImport() {
    const pv = this.state.preview || [];
    const file = this.state.previewName.replace(/\.[^.]+$/, "");
    const rows = pv.map(l => ({
      file: file, ticker: l.ticker, qty: l.qty, buy: l.buy, price: l.price,
      sub: [l.name, l.group].filter(Boolean).join(" · ") || "imported position"
    }));
    rows.forEach(r => { if (r.price !== null && (this.state.prices[r.ticker] === undefined || this.state.prices[r.ticker] === null)) this.state.prices[r.ticker] = r.price; });
    this.state.imported = this.state.imported.concat(rows);
    this.state.preview = null;
    this.state.importStatus = "Added " + rows.length + " position" + (rows.length === 1 ? "" : "s") + " from " + this.state.previewName + ".";
    this.persist(); this.render();
  }
  setGroupFilter(name) { this.state.group = name; this.render(); }
  setTickerSearch(text) { this.state.tickerSearch = text; this.render(); }
  onNewSectionDraftChange(text) { this.state.newSectionDraft = text; this.state.newSectionError = ""; this.render(); }
  addSection() {
    const name = (this.state.newSectionDraft || "").trim();
    const vm = this.buildViewModel();
    if (!name) { this.state.newSectionError = "Give the section a name."; this.render(); return; }
    if (vm.groupNames.indexOf(name) > -1) { this.state.newSectionError = "A section with that name already exists."; this.render(); return; }
    this.state.newSectionDraft = "";
    this.state.extraGroups = this.state.extraGroups.concat([name]);
    this.persist(); this.render();
  }
  toggleWatchlist() { this.state.watchlist = !this.state.watchlist; this.render(); }
  toggleHideZero() { this.state.hideZero = !this.state.hideZero; this.render(); }
  restoreDeleted() {
    this.state.deleted = {};
    this.state.showRestoreBar = false;
    if (this.restoreBarTimer) { clearTimeout(this.restoreBarTimer); this.restoreBarTimer = null; }
    this.persist(); this.render();
  }
  armRestoreBar() {
    this.state.showRestoreBar = true;
    if (this.restoreBarTimer) clearTimeout(this.restoreBarTimer);
    this.restoreBarTimer = setTimeout(() => {
      this.state.showRestoreBar = false;
      this.restoreBarTimer = null;
      this.render();
    }, 10000);
  }
  orderedGroupNames(groupNames) {
    const order = this.state.groupOrder || [];
    const known = order.filter(g => groupNames.indexOf(g) > -1);
    const extra = groupNames.filter(g => known.indexOf(g) < 0);
    return known.concat(extra);
  }
  discoverGroupNames() {
    const deleted = this.state.deleted;
    const entries = SEED.map((r, n) => [r[0], "s" + n])
      .concat(this.state.imported.map((l, n) => ["Imported — " + l.file, "i" + n]))
      .concat(this.state.custom.map((l, n) => [l.group, "c" + n]));
    const names = [];
    entries.forEach(([g, key]) => { if (!deleted[key] && names.indexOf(g) < 0) names.push(g); });
    this.state.extraGroups.forEach(g => { if (names.indexOf(g) < 0) names.push(g); });
    return names;
  }
  moveGroup(name, dir) {
    const orderedNames = this.orderedGroupNames(this.discoverGroupNames());
    const idx = orderedNames.indexOf(name);
    const swapIdx = idx + dir;
    if (idx < 0 || swapIdx < 0 || swapIdx >= orderedNames.length) return;
    const next = orderedNames.slice();
    const tmp = next[idx]; next[idx] = next[swapIdx]; next[swapIdx] = tmp;
    this.state.groupOrder = next;
    this.persist(); this.render();
  }
  renameGroup(group, text) {
    if (text.trim()) this.state.groupNames_[group] = text;
    else delete this.state.groupNames_[group];
    this.persist(); this.render();
  }
  editQty(key, text) { this.editLot(key, "qty", "q" + key, text); }
  editBuy(key, text) { this.editLot(key, "buy", "b" + key, text); }
  editPrice(ticker, text) {
    this.state.drafts[ticker] = text;
    const n = num(text);
    if (isFinite(n)) {
      this.state.prices[ticker] = n;
      this.state.pinned[ticker] = true;
      this.persist();
    }
    this.render();
  }
  deleteRow(key) { this.state.deleted[key] = true; this.armRestoreBar(); this.persist(); this.render(); }
  groupDraftChange(group, field, text) {
    const gd = Object.assign({ ticker: "", qty: "", buy: "", price: "", error: "" }, this.state.groupDrafts[group]);
    gd[field] = text;
    this.state.groupDrafts[group] = gd;
    this.render();
  }
  groupDraftAdd(group) {
    const gd = Object.assign({ ticker: "", qty: "", buy: "", price: "", error: "" }, this.state.groupDrafts[group]);
    const ticker = (gd.ticker || "").trim().toUpperCase();
    const qty = num(gd.qty);
    const buy = num(gd.buy);
    const price = num(gd.price);
    if (!ticker) { gd.error = "Ticker is required."; this.state.groupDrafts[group] = gd; this.render(); return; }
    if (!isFinite(qty) || qty <= 0) { gd.error = "Quantity must be a positive number."; this.state.groupDrafts[group] = gd; this.render(); return; }
    const entry = { group: group, ticker: ticker, qty: qty, buy: isFinite(buy) ? buy : 0, price: isFinite(price) ? price : null, sub: "Added manually" };
    this.state.groupDrafts[group] = { ticker: "", qty: "", buy: "", price: "", error: "" };
    this.state.custom = this.state.custom.concat([entry]);
    this.persist(); this.render();
  }

  /* ---------- view model ---------- */
  buildViewModel() {
    const prices = this.state.prices;
    const dust = 0;
    const conn = this.state.connected;
    const edits = this.state.edits;
    const deleted = this.state.deleted;
    const importedLots = this.state.imported.map((l, n) => ["Imported — " + l.file, "imported", l.ticker, l.sub, l.qty, l.buy, l.price, "i" + n]);
    const customLots = this.state.custom.map((l, n) => [l.group, "custom", l.ticker, l.sub, l.qty, l.buy, l.price, "c" + n]);
    const all = SEED.map((r, n) => r.concat(["s" + n])).concat(importedLots).concat(customLots)
      .filter(r => !deleted[r[7]])
      .map(r => {
        const key = r[7];
        const e = edits[key] || {};
        const group = r[0], acct = r[1], ticker = r[2], sub = r[3];
        const qty = e.qty !== undefined ? e.qty : r[4];
        const buy = e.buy !== undefined ? e.buy : r[5];
        const feed = this.state.live[ticker];
        const usingFeed = !!feed && !this.state.pinned[ticker];
        const price = usingFeed ? feed.price : (prices[ticker] !== undefined ? prices[ticker] : r[6]);
        const has = price !== null && price !== undefined && isFinite(price);
        const live = (acct === "imported" || acct === "custom") ? true : !!conn[acct];
        const cost = qty * buy;
        const edited = e.qty !== undefined || e.buy !== undefined;
        return { key, group, acct, ticker, sub, qty, buy, price, has, live, edited, cost, usingFeed, feedAt: feed ? feed.at : "", feedSource: feed ? feed.source : "", pinned: !!this.state.pinned[ticker], value: has ? qty * price : null, pl: has ? qty * price - cost : null };
      });

    const isWatch = g => g.indexOf("Watchlist") === 0;
    const groupNames = [];
    all.forEach(l => { if (groupNames.indexOf(l.group) < 0) groupNames.push(l.group); });
    this.state.extraGroups.forEach(g => { if (groupNames.indexOf(g) < 0) groupNames.push(g); });
    const orderedNames = this.orderedGroupNames(groupNames);

    const counted = all.filter(l => !isWatch(l.group));
    const totalCost = counted.reduce((a, l) => a + l.cost, 0);
    const totalValue = counted.reduce((a, l) => a + (l.value || 0), 0);
    const totalPl = totalValue - totalCost;

    const allocation = orderedNames.filter(g => !isWatch(g)).map(g => {
      const v = counted.filter(l => l.group === g).reduce((a, l) => a + (l.value || 0), 0);
      return {
        name: g.replace("Crypto — ", "").replace("Stocks — ", "Linqto ").replace(/^Imported — /, "Imported: "),
        label: g, grow: Math.max(v, 0.0001),
        color: GROUP_COLORS[g] || IMPORT_COLOR,
        pct: totalValue > 0 ? (v / totalValue * 100).toFixed(1) + "%" : "—"
      };
    }).filter(s => s.grow > 1);

    const search = (this.state.tickerSearch || "").trim().toUpperCase();
    const groups = orderedNames.filter(g => {
      if (isWatch(g) && !this.state.watchlist && !search) return false;
      if (this.state.group !== "All" && g !== this.state.group) return false;
      return true;
    }).map(g => {
      const orderIdx = orderedNames.indexOf(g);
      const gl = all.filter(l => l.group === g && (isWatch(g) || l.cost >= dust || (l.value || 0) >= dust))
        .filter(l => !search || l.ticker.toUpperCase().indexOf(search) > -1)
        .filter(l => isWatch(g) || !this.state.hideZero || l.qty > 0);
      const c = gl.reduce((a, l) => a + l.cost, 0);
      const v = gl.reduce((a, l) => a + (l.value || 0), 0);
      const p = v - c;
      const missing = gl.filter(l => !l.has).length;
      let note = gl.length + " lot" + (gl.length === 1 ? "" : "s");
      if (missing) note += " · " + missing + " needs price";
      const gd = Object.assign({ ticker: "", qty: "", buy: "", price: "", error: "" }, this.state.groupDrafts[g]);
      const displayName = this.state.groupNames_[g] || g;
      return {
        name: g, displayName: displayName,
        shortName: displayName.replace(/^(Crypto|Stocks|Watchlist|Imported)\s*[—-]\s*/, ""),
        canMoveUp: orderIdx > 0, canMoveDown: orderIdx < orderedNames.length - 1,
        color: GROUP_COLORS[g] || IMPORT_COLOR, note: note, draft: gd,
        cost: money(c), value: money(v),
        pl: isWatch(g) ? "—" : signed(p),
        ret: isWatch(g) || !c ? "—" : (p / c * 100).toFixed(1) + "%",
        plClass: isWatch(g) ? "pl-flat" : plClass(p),
        rows: gl.map(l => ({
          key: l.key,
          ticker: l.ticker,
          sub: l.sub + (l.has ? "" : " · needs price") + (l.edited ? " · edited" : ""),
          qtyInput: this.state.drafts["q" + l.key] !== undefined ? this.state.drafts["q" + l.key] : qtyFmt(l.qty),
          buyInput: this.state.drafts["b" + l.key] !== undefined ? this.state.drafts["b" + l.key] : (l.buy ? priceMoney(l.buy) : ""),
          cost: l.cost ? money(l.cost) : "—",
          priceInput: this.state.drafts[l.ticker] !== undefined ? this.state.drafts[l.ticker] : priceMoney(l.price),
          priceClass: l.usingFeed ? "live" : (l.pinned ? "pinned" : ""),
          priceTitle: l.usingFeed ? ("Live from " + l.feedSource + " at " + l.feedAt + " — type a value to pin your own") : (l.pinned ? "Pinned manual price — the feed will not overwrite it" : "Spreadsheet price — no live feed for this ticker"),
          value: l.qty ? money(l.value) : "—",
          pl: l.qty && l.has ? signed(l.pl) : "—",
          ret: l.qty && l.has && l.cost ? (l.pl / l.cost * 100).toFixed(1) + "%" : "—",
          plClass: l.qty && l.has ? plClass(l.pl) : "pl-flat"
        }))
      };
    }).filter(gr => (!search && !this.state.hideZero) || gr.rows.length > 0);

    const accountsRaw = this.effectiveAccounts();
    const accounts = accountsRaw.map(a => {
      const [id, name, kind] = a;
      const mine = all.filter(l => l.acct === id);
      const heldLots = mine.filter(l => l.qty > 0);
      const v = heldLots.reduce((a2, l) => a2 + (l.value || 0), 0);
      const on = !!conn[id];
      const busy = !!this.state.syncing[id];
      return {
        id, name: name, kind: kind,
        value: on ? money(v) : "—",
        lotLabel: heldLots.length ? heldLots.length + " lots" : "watchlist only",
        synced: busy ? "syncing…" : (on ? "synced " + (this.state.synced[id] || "from file") : "not connected"),
        statusLabel: busy ? "Syncing" : (on ? "Live" : "Off"),
        statusClass: busy ? "status-busy" : (on ? "status-on" : "status-off"),
        on: on, busy: busy,
        btnLabel: busy ? "Connecting" : (on ? "Disconnect" : "Connect"),
        btnClass: on ? "disconnect" : "connect"
      };
    });

    const filters = ["All"].concat(orderedNames.filter(g => !isWatch(g))).map(label => ({
      label: label === "All" ? "All holdings" : label,
      group: label,
      active: this.state.group === label
    }));

    const feedable = this.neededTickers().length;
    const liveCount = all.filter(l => l.usingFeed).reduce((acc, l) => (acc.indexOf(l.ticker) < 0 ? acc.concat([l.ticker]) : acc), []).length;
    const pinnedList = Object.keys(this.state.pinned).filter(t => this.state.pinned[t]);

    const pv = this.state.preview || [];
    const preview = pv.slice(0, 8).map(l => ({
      ticker: l.ticker,
      qty: qtyFmt(l.qty),
      buy: l.buy ? priceFmt(l.buy) : "—",
      price: l.price !== null ? priceFmt(l.price) : "needs price",
      cost: l.qty && l.buy ? money(l.qty * l.buy) : "—"
    }));

    return {
      groupNames,
      themeModes: [["auto", "Auto"], ["light", "Light"], ["dark", "Dark"]].map(m => ({
        mode: m[0], label: m[1], active: this.state.theme === m[0]
      })),
      groups, filters, allocation, accounts, preview,
      totalCost: money(totalCost),
      totalValue: money(totalValue),
      totalPl: signed(totalPl),
      totalReturn: totalCost ? (totalPl / totalCost * 100).toFixed(1) + "%" : "—",
      totalPlClass: plClass(totalPl),
      lotCount: counted.filter(l => l.qty > 0).length,
      connectedCount: accountsRaw.filter(a => conn[a[0]]).length,
      savedAt: this.state.savedAt,
      watchlistOn: this.state.watchlist,
      hideZeroOn: this.state.hideZero,
      autoOn: this.state.auto,
      intervalMs: this.state.intervalMs,
      intervals: [["30s", 30000], ["1m", 60000], ["5m", 300000], ["15m", 900000]].map(iv => ({
        label: iv[0], ms: iv[1], active: this.state.intervalMs === iv[1]
      })),
      refreshLabel: this.state.refreshing ? "Refreshing…" : "Refresh now",
      feedClass: this.state.refreshing ? "status-checking" : (liveCount ? "status-live" : "status-idle"),
      feedHeadline: liveCount ? liveCount + " of " + feedable + " tickers on a live feed" : "No live prices yet",
      feedSub: this.state.lastRefresh
        ? ("Last refresh " + this.state.lastRefresh + (this.state.auto ? " · auto every " + Math.round(this.state.intervalMs / 1000) + "s" : " · auto-refresh off"))
        : "Feeds are fetched straight from your browser — no server, no API key. Opening this file from your desktop may need the browser's local-file security prompt allowed.",
      feeds: ["coinbase", "coingecko", "finnhub"].map(id => {
        const s = this.state.feedStatus[id] || {};
        const total = s.total || 0;
        const ok = s.ok || 0;
        const needsKey = id === "finnhub" && !this.state.apiKey;
        const rescued = (s.rescued || []).length;
        const covered = ok + rescued;
        const down = !needsKey && total > 0 && covered === 0;
        let status, cls;
        if (this.state.refreshing) { status = "Checking"; cls = "status-checking"; }
        else if (needsKey) { status = "Key needed"; cls = "status-checking"; }
        else if (!total) { status = "Idle"; cls = "status-idle"; }
        else if (down) { status = "Unreachable"; cls = "status-down"; }
        else if (covered < total) { status = covered + "/" + total; cls = "status-partial"; }
        else { status = "Live " + covered + "/" + total; cls = "status-live"; }
        let detail = FEED_LABELS[id][1];
        if (needsKey) detail = "Paste a free Finnhub key below and stock/ETF quotes go live. Until then these rows keep your spreadsheet prices.";
        else if (down) detail = "Request failed" + (s.error ? " (" + s.error + ")" : "") + " — those tickers keep their last known price.";
        else if (s.failed && s.failed.length) detail = "No quote for " + s.failed.join(", ") + ". " + FEED_LABELS[id][1];
        else if (rescued) detail = rescued + " covered by the CoinGecko fallback (" + (s.rescued || []).join(", ") + "). " + FEED_LABELS[id][1];
        return { name: FEED_LABELS[id][0], status: status, cls: cls, detail: detail };
      }),
      keyDraft: this.state.keyDraft,
      keyStatus: this.state.apiKey ? "Key saved in this browser only." : "finnhub.io/register issues a free key in about a minute.",
      keyButtonLabel: this.state.apiKey ? "Replace key" : "Save key",
      hasKey: !!this.state.apiKey,
      hasPinned: pinnedList.length > 0,
      pinnedLabel: pinnedList.length + " ticker" + (pinnedList.length === 1 ? "" : "s") + " (" + pinnedList.slice(0, 6).join(", ") + (pinnedList.length > 6 ? "…" : "") + ")",
      newSectionDraft: this.state.newSectionDraft,
      newSectionError: this.state.newSectionError,
      hasDeleted: this.state.showRestoreBar && Object.keys(deleted).length > 0,
      deletedLabel: Object.keys(deleted).length + " position" + (Object.keys(deleted).length === 1 ? "" : "s"),
      tickerSearch: this.state.tickerSearch,
      noGroupsMessage: groups.length > 0 ? "" : (search ? "No tickers match “" + this.state.tickerSearch.trim() + "”." : (this.state.hideZero ? "No positions with a balance to show." : "")),
      accountDraft: this.state.accountDraft,
      hasDeletedAccounts: this.state.showAccountRestoreBar && Object.keys(this.state.deletedAccounts).length > 0,
      deletedAccountsLabel: Object.keys(this.state.deletedAccounts).length + " account" + (Object.keys(this.state.deletedAccounts).length === 1 ? "" : "s"),
      importStatus: this.state.importStatus,
      importError: this.state.importError,
      hasPreview: pv.length > 0,
      previewNote: pv.length > 8 ? "showing 8 of " + pv.length : "",
      commitLabel: "Add " + pv.length + " position" + (pv.length === 1 ? "" : "s"),
      dragging: this.state.dragging
    };
  }
}

/* ---------- template ---------- */
function template(vm) {
  return `
<div class="page"><div class="wrap">
  <header class="header">
    <div>
      <div class="eyebrow mono">Crypto · Metals · Equities</div>
      <h1>Investment Portfolio Tracker</h1>
    </div>
    <div class="header-right">
      <div class="pill-group">
        ${vm.themeModes.map(m => `<button class="pill mono${m.active ? " active" : ""}" data-action="set-theme" data-mode="${m.mode}">${esc(m.label)}</button>`).join("")}
      </div>
      <button class="link-btn" data-action="reset-prices">Reset all edits</button>
      <div class="meta">${vm.lotCount} lots · ${vm.connectedCount} accounts live<br>edited ${esc(vm.savedAt)}</div>
    </div>
  </header>

  <section>
    <div class="row-between">
      <div class="section-label">Connected accounts</div>
      <div class="hint">Toggling an account includes or excludes its holdings from every total below.</div>
    </div>
    <div class="accounts-grid">
      ${vm.accounts.map(a => `
      <div class="account-card${a.on ? " on" : ""}">
        <div class="account-top">
          <div style="display:flex;flex-direction:column;gap:4px;min-width:0;flex:1 1 auto;">
            <span class="account-name">${esc(a.name)}</span>
            <span class="account-kind">${esc(a.kind)}</span>
          </div>
          <div style="display:flex;align-items:center;gap:8px;flex-shrink:0;">
            <span class="status ${a.statusClass}"><span class="dot"></span>${a.statusLabel}</span>
            <button class="del-btn" title="Remove this account" data-action="delete-account" data-id="${escAttr(a.id)}">×</button>
          </div>
        </div>
        <div class="account-value-row">
          <span class="account-value mono">${a.value}</span>
          <span class="account-lots">${a.lotLabel}</span>
        </div>
        <div class="account-bottom">
          <span class="account-synced">${esc(a.synced)}</span>
          <button class="btn-toggle ${a.btnClass}" data-action="toggle-account" data-id="${escAttr(a.id)}">${a.btnLabel}</button>
        </div>
      </div>`).join("")}
    </div>
    <div class="add-row">
      <input type="text" class="field add-ticker" style="flex:0 1 200px;text-transform:none;" value="${escAttr(vm.accountDraft.name)}" placeholder="Account name" data-action="account-draft-name">
      <input type="text" class="field add-ticker" style="flex:0 1 220px;text-transform:none;" value="${escAttr(vm.accountDraft.kind)}" placeholder="Kind (optional)" data-action="account-draft-kind">
      <button class="btn-gold" data-action="add-account">+ Add account</button>
      ${vm.accountDraft.error ? `<span class="error-text" style="flex-basis:100%;margin-top:0;">${esc(vm.accountDraft.error)}</span>` : ""}
    </div>
    ${vm.hasDeletedAccounts ? `
    <div class="deleted-bar">
      <span>${esc(vm.deletedAccountsLabel)} removed.</span>
      <button class="btn-danger" data-action="restore-accounts">Restore all</button>
    </div>` : ""}
    <div class="max-note">Live brokerage and wallet links are not wired up in this prototype — connecting simulates a sync and pulls in the positions already on file for that account. Use <strong>Import a file</strong> below to load real balances.</div>
  </section>

  <section>
    <div class="section-label">Price connector</div>
    <div class="connector">
      <div class="connector-top">
        <div class="connector-left">
          <span class="feed-dot ${vm.feedClass}" style="background:currentColor;"></span>
          <div>
            <div class="connector-headline">${esc(vm.feedHeadline)}</div>
            <div class="connector-sub">${esc(vm.feedSub)}</div>
          </div>
        </div>
        <div class="connector-controls">
          <label class="checkbox-label">
            <input type="checkbox" ${vm.autoOn ? "checked" : ""} data-action="toggle-auto">
            Auto-refresh
          </label>
          ${vm.intervals.map(iv => `<button class="pill mono${iv.active ? " active" : ""}" data-action="set-interval" data-ms="${iv.ms}">${iv.label}</button>`).join("")}
          <button class="btn-accent" data-action="refresh-now">${esc(vm.refreshLabel)}</button>
        </div>
      </div>
      <div class="feeds-grid">
        ${vm.feeds.map(f => `
        <div class="feed-card">
          <div class="feed-card-top">
            <span class="feed-name">${esc(f.name)}</span>
            <span class="feed-status mono ${f.cls}">${esc(f.status)}</span>
          </div>
          <span class="feed-detail">${esc(f.detail)}</span>
        </div>`).join("")}
      </div>
      <div class="key-row">
        <span class="key-label">Stock &amp; ETF quotes</span>
        <input type="password" class="field key-input" value="${escAttr(vm.keyDraft)}" data-action="key-draft" placeholder="Finnhub API key">
        <button class="btn-gold" data-action="save-key">${esc(vm.keyButtonLabel)}</button>
        ${vm.hasKey ? `<button class="btn-ghost" data-action="clear-key">Remove</button>` : ""}
        <span class="key-status">${esc(vm.keyStatus)}</span>
      </div>
      ${vm.hasPinned ? `
      <div class="pinned-bar">
        <span>${esc(vm.pinnedLabel)} held at your manual price — the feed will not overwrite them.</span>
        <button class="btn-warn" data-action="unpin-all">Let the feed take over</button>
      </div>` : ""}
    </div>
  </section>

  <section>
    <div class="section-label">Import a file</div>
    <div class="dropzone${vm.dragging ? " dragging" : ""}" data-dropzone>
      <div class="dropzone-top">
        <div>
          <div class="dropzone-title">Drop a .csv or .xlsx export here</div>
          <div class="dropzone-sub">Any export with symbol, quantity and cost columns works — column names are matched automatically.</div>
        </div>
        <label class="file-label">
          Choose file
          <input type="file" accept=".csv,.xlsx,.tsv,.txt" data-action="file-input">
        </label>
      </div>
      ${vm.importStatus ? `<div class="import-status mono${vm.importError ? " error" : ""}">${esc(vm.importStatus)}</div>` : ""}
      ${vm.hasPreview ? `
      <div class="preview">
        <div class="preview-grid preview-head">
          <div>Symbol</div><div class="right">Qty</div><div class="right">Buy</div><div class="right">Price</div><div class="right">Cost</div>
        </div>
        ${vm.preview.map(p => `
        <div class="preview-grid preview-row">
          <div>${esc(p.ticker)}</div><div class="right">${esc(p.qty)}</div><div class="right">${esc(p.buy)}</div><div class="right">${esc(p.price)}</div><div class="right">${esc(p.cost)}</div>
        </div>`).join("")}
        <div class="preview-actions">
          <button class="btn-accent" data-action="commit-import">${esc(vm.commitLabel)}</button>
          <button class="btn-ghost" data-action="cancel-import">Discard</button>
          <span class="hint">${esc(vm.previewNote)}</span>
        </div>
      </div>` : ""}
    </div>
  </section>

  <section class="tiles">
    <div class="tile"><div class="section-label">Cost basis</div><div class="tile-value">${vm.totalCost}</div></div>
    <div class="tile"><div class="section-label">Current value</div><div class="tile-value">${vm.totalValue}</div></div>
    <div class="tile"><div class="section-label">Unrealized P/L</div><div class="tile-value ${vm.totalPlClass}">${vm.totalPl}</div></div>
    <div class="tile"><div class="section-label">Return</div><div class="tile-value ${vm.totalPlClass}">${vm.totalReturn}</div></div>
  </section>

  <section>
    <div class="section-label">Allocation by current value</div>
    <div class="alloc-bar">
      ${vm.allocation.map(s => `<div class="alloc-slice" title="${escAttr(s.label)}" style="flex-grow:${s.grow};background:${s.color};"></div>`).join("")}
    </div>
    <div class="alloc-legend">
      ${vm.allocation.map(s => `<div class="alloc-item"><span class="swatch" style="background:${s.color};"></span><span>${esc(s.name)}</span><span class="alloc-pct mono">${esc(s.pct)}</span></div>`).join("")}
    </div>
  </section>

  <section class="filters-row" style="flex-direction:row;">
    ${vm.filters.map(f => `<button class="filter-btn${f.active ? " active" : ""}" data-action="set-group" data-group="${escAttr(f.group)}">${esc(f.label)}</button>`).join("")}
    <input type="search" id="ticker-search" class="field pill-input" value="${escAttr(vm.tickerSearch)}" data-action="ticker-search" placeholder="Search ticker…">
    <div class="spacer"></div>
    <input type="text" class="field pill-input" value="${escAttr(vm.newSectionDraft)}" data-action="new-section-draft" placeholder="New section name">
    <button class="filter-btn" data-action="add-section">+ Add section</button>
    <label class="checkbox-label">
      <input type="checkbox" ${vm.watchlistOn ? "checked" : ""} data-action="toggle-watchlist">
      Show watchlist (0 qty)
    </label>
    <label class="checkbox-label">
      <input type="checkbox" ${vm.hideZeroOn ? "checked" : ""} data-action="toggle-hide-zero">
      Hide zero-balance positions
    </label>
  </section>
  ${vm.newSectionError ? `<div class="error-text">${esc(vm.newSectionError)}</div>` : ""}

  ${vm.hasDeleted ? `
  <div class="deleted-bar">
    <span>${esc(vm.deletedLabel)} removed from this portfolio.</span>
    <button class="btn-danger" data-action="restore-deleted">Restore all</button>
  </div>` : ""}

  ${vm.noGroupsMessage ? `<div class="hint" style="padding:14px 0;">${esc(vm.noGroupsMessage)}</div>` : ""}

  ${vm.groups.map(group => `
  <section class="group">
    <div class="group-head">
      <div class="group-head-left">
        <div class="move-btns">
          <button class="move-btn" title="Move section up" data-action="move-group-up" data-group="${escAttr(group.name)}" ${group.canMoveUp ? "" : "disabled"}>▲</button>
          <button class="move-btn" title="Move section down" data-action="move-group-down" data-group="${escAttr(group.name)}" ${group.canMoveDown ? "" : "disabled"}>▼</button>
        </div>
        <span class="swatch" style="background:${group.color};"></span>
        <input type="text" class="group-rename" value="${escAttr(group.displayName)}" data-action="rename-group" data-group="${escAttr(group.name)}">
        <span class="group-note">${esc(group.note)}</span>
      </div>
      <div class="group-stats mono">
        <span class="cost">cost ${group.cost}</span>
        <span class="value">value ${group.value}</span>
        <span class="${group.plClass}">${group.pl} · ${group.ret}</span>
      </div>
    </div>

    <div class="cols col-head">
      <div>Asset</div><div class="right">Qty</div><div class="right">Buy Price</div><div class="right">Cost</div>
      <div class="right">Price now</div><div class="right">Value</div><div class="right">P/L</div><div class="right">Return</div><div style="text-align:center;">Del</div>
    </div>

    ${group.rows.map(row => `
    <div class="cols lot-row">
      <div class="lot-asset">
        <span class="lot-ticker">${esc(row.ticker)}</span>
        <span class="lot-sub">${esc(row.sub)}</span>
      </div>
      <div class="lot-input-cell">
        <input type="text" class="lot-input" value="${escAttr(row.qtyInput)}" title="Shares / units held" data-action="edit-qty" data-key="${escAttr(row.key)}">
      </div>
      <div class="lot-input-cell">
        <input type="text" class="lot-input" value="${escAttr(row.buyInput)}" title="Average buy price for this lot" data-action="edit-buy" data-key="${escAttr(row.key)}">
      </div>
      <div class="lot-static right">${row.cost}</div>
      <div class="lot-input-cell">
        <input type="text" class="lot-input price-input ${row.priceClass}" value="${escAttr(row.priceInput)}" title="${escAttr(row.priceTitle)}" data-action="edit-price" data-ticker="${escAttr(row.ticker)}">
      </div>
      <div class="lot-static right">${row.value}</div>
      <div class="lot-static right ${row.plClass}">${row.pl}</div>
      <div class="lot-static right ${row.plClass}">${row.ret}</div>
      <div class="del-cell">
        <button class="del-btn" title="Remove this position" data-action="delete-row" data-key="${escAttr(row.key)}">×</button>
      </div>
    </div>`).join("")}

    <div class="add-row">
      <input type="text" class="field add-ticker" value="${escAttr(group.draft.ticker)}" placeholder="Ticker" data-action="draft-ticker" data-group="${escAttr(group.name)}">
      <input type="text" class="field add-num" value="${escAttr(group.draft.qty)}" placeholder="Qty" data-action="draft-qty" data-group="${escAttr(group.name)}">
      <input type="text" class="field add-num" value="${escAttr(group.draft.buy)}" placeholder="Buy $" data-action="draft-buy" data-group="${escAttr(group.name)}">
      <input type="text" class="field add-price" value="${escAttr(group.draft.price)}" placeholder="Price now (optional)" data-action="draft-price" data-group="${escAttr(group.name)}">
      <button class="btn-gold" data-action="draft-add" data-group="${escAttr(group.name)}">+ Add to ${esc(group.shortName)}</button>
      ${group.draft.error ? `<span class="error-text" style="flex-basis:100%;margin-top:0;">${esc(group.draft.error)}</span>` : ""}
    </div>
  </section>`).join("")}

  <section class="notes">
    <div class="section-label">Data notes</div>
    <ul>
      <li>Positions and cost bases come from the <strong>Investments (Clean)</strong> sheet of your tracker. One price per ticker: the feed or your edit applies to every lot of that asset.</li>
      <li>Live prices are fetched by your browser: Coinbase's public spot endpoint for crypto, CoinGecko as fallback for small-cap tokens Coinbase has no pair for, and Finnhub for stocks and ETFs once you add a free key. A green price border means live; gold means pinned by you. Treat all of it as indicative, not as a broker statement.</li>
      <li>Gold tracks <strong>PAXG</strong>, a tokenised troy-ounce claim — a spot-gold proxy, not an Apmex bullion quote, and it typically prints a little under retail. <strong>Silver stays manual</strong>: no keyless silver feed is reachable from a browser.</li>
      <li>Quantity and buy price are editable per lot; <strong>×</strong> removes a position and a restore bar appears so a mis-click is recoverable. Edits, deletions and imports save in this browser and survive a reload — <strong>Reset all edits</strong> returns everything to the spreadsheet values.</li>
      <li>Linqto positions (Ripple, Polysign) are marked at <strong>$0</strong> — the spreadsheet notes Linqto filed for bankruptcy. That is a placeholder, not a recovery estimate.</li>
      <li>Several prices in the sheet were broken lookups (VET, PEPE, XCN, ALGO at 0; Cristina's XRP at $0.02 against $1.42 in the main wallet). The live feed now supplies those, so they price like every other lot. Anything with no source at all — silver, COPI, imported rows without a price column — is flagged <strong>needs price</strong> and stays out of allocation until you type one.</li>
      <li>Realized P/L is not carried over — the clean sheet records $0 realized to date.</li>
    </ul>
  </section>
</div></div>`;
}

/* ---------- event delegation ---------- */
PortfolioApp.prototype.attachEvents = function () {
  const root = this.root;

  root.addEventListener("click", e => {
    const el = e.target.closest("[data-action]");
    if (!el) return;
    const action = el.dataset.action;
    switch (action) {
      case "set-theme": this.setTheme(el.dataset.mode); break;
      case "reset-prices": this.resetPrices(); break;
      case "toggle-account": this.toggleAccount(el.dataset.id); break;
      case "delete-account": this.deleteAccount(el.dataset.id); break;
      case "add-account": this.addAccount(); break;
      case "restore-accounts": this.restoreDeletedAccounts(); break;
      case "set-interval": this.setInterval_(parseInt(el.dataset.ms, 10)); break;
      case "refresh-now": this.refresh(); break;
      case "save-key": this.saveKey(); break;
      case "clear-key": this.clearKey(); break;
      case "unpin-all": this.unpinAll(); break;
      case "cancel-import": this.cancelImport(); break;
      case "commit-import": this.commitImport(); break;
      case "set-group": this.setGroupFilter(el.dataset.group); break;
      case "add-section": this.addSection(); break;
      case "restore-deleted": this.restoreDeleted(); break;
      case "delete-row": this.deleteRow(el.dataset.key); break;
      case "draft-add": this.groupDraftAdd(el.dataset.group); break;
      case "move-group-up": this.moveGroup(el.dataset.group, -1); break;
      case "move-group-down": this.moveGroup(el.dataset.group, 1); break;
    }
  });

  root.addEventListener("change", e => {
    const el = e.target.closest("[data-action]");
    if (!el) return;
    const action = el.dataset.action;
    switch (action) {
      case "toggle-auto": this.toggleAuto(); break;
      case "toggle-watchlist": this.toggleWatchlist(); break;
      case "toggle-hide-zero": this.toggleHideZero(); break;
      case "account-draft-name": this.accountDraftChange("name", el.value); break;
      case "account-draft-kind": this.accountDraftChange("kind", el.value); break;
      case "key-draft": this.onKeyDraftChange(el.value); break;
      case "new-section-draft": this.onNewSectionDraftChange(el.value); break;
      case "rename-group": this.renameGroup(el.dataset.group, el.value); break;
      case "edit-qty": this.editQty(el.dataset.key, el.value); break;
      case "edit-buy": this.editBuy(el.dataset.key, el.value); break;
      case "edit-price": this.editPrice(el.dataset.ticker, el.value); break;
      case "draft-ticker": this.groupDraftChange(el.dataset.group, "ticker", el.value); break;
      case "draft-qty": this.groupDraftChange(el.dataset.group, "qty", el.value); break;
      case "draft-buy": this.groupDraftChange(el.dataset.group, "buy", el.value); break;
      case "draft-price": this.groupDraftChange(el.dataset.group, "price", el.value); break;
      case "file-input": {
        const f = el.files && el.files[0];
        this.handleFile(f);
        el.value = "";
        break;
      }
    }
  });

  root.addEventListener("input", e => {
    const el = e.target.closest("[data-action]");
    if (!el) return;
    if (el.dataset.action === "ticker-search") this.setTickerSearch(el.value);
  });

  root.addEventListener("dragover", e => {
    if (!e.target.closest("[data-dropzone]")) return;
    e.preventDefault();
    this.setDragging(true);
  });
  root.addEventListener("dragleave", e => {
    if (!e.target.closest("[data-dropzone]")) return;
    this.setDragging(false);
  });
  root.addEventListener("drop", e => {
    if (!e.target.closest("[data-dropzone]")) return;
    e.preventDefault();
    const f = e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files[0];
    this.handleFile(f);
  });
};

document.addEventListener("DOMContentLoaded", () => {
  new PortfolioApp(document.getElementById("root"));
});
