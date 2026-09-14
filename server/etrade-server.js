#!/usr/bin/env node
"use strict";

/*
 * Local bridge server for the "Connected Accounts" (E*TRADE) feature.
 *
 * Why this exists: E*TRADE's API uses OAuth 1.0a, which requires a
 * consumer secret and signs every request. That secret can never be
 * shipped inside portfolio-tracker.html (anyone who opened the file
 * could read it out of the page source) — it has to stay on a
 * machine you control. This script is that machine: it holds your
 * E*TRADE developer keys, does the OAuth handshake, and exposes a
 * few small local endpoints the tracker's browser page calls instead
 * of talking to E*TRADE directly.
 *
 * Setup:
 *   1. Register at https://developer.etrade.com and create an app to
 *      get a Consumer Key + Consumer Secret (sandbox keys first).
 *   2. Copy server/.env.example to server/.env and fill in your keys.
 *   3. Run:  node server/etrade-server.js
 *   4. In the tracker, open "Connected accounts" and click Connect.
 *
 * Nothing here is shared with anyone but E*TRADE. Tokens are cached
 * in server/.etrade-session.json (gitignored) so you don't have to
 * re-approve every time you restart the tracker — only when E*TRADE
 * expires the session (midnight ET, or ~2 hours idle).
 */

const http = require("http");
const https = require("https");
const crypto = require("crypto");
const fs = require("fs");
const path = require("path");
const { URL } = require("url");

function loadEnvFile(file) {
  const out = {};
  if (!fs.existsSync(file)) return out;
  for (const line of fs.readFileSync(file, "utf8").split("\n")) {
    const m = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*?)\s*$/);
    if (!m) continue;
    out[m[1]] = m[2].replace(/^["']|["']$/g, "");
  }
  return out;
}

const envFile = loadEnvFile(path.join(__dirname, ".env"));
function cfg(name, fallback) {
  return process.env[name] || envFile[name] || fallback;
}

const CONSUMER_KEY = cfg("ETRADE_CONSUMER_KEY", "");
const CONSUMER_SECRET = cfg("ETRADE_CONSUMER_SECRET", "");
const ENVIRONMENT = cfg("ETRADE_ENV", "sandbox").toLowerCase(); // "sandbox" | "production"
const PORT = parseInt(cfg("PORT", "8787"), 10);
const BASE = ENVIRONMENT === "production" ? "https://api.etrade.com" : "https://apisb.etrade.com";
const SESSION_FILE = path.join(__dirname, ".etrade-session.json");

if (!CONSUMER_KEY || !CONSUMER_SECRET) {
  console.error("Missing ETRADE_CONSUMER_KEY / ETRADE_CONSUMER_SECRET.");
  console.error("Copy server/.env.example to server/.env and fill in your E*TRADE developer keys, then run this again.");
  process.exit(1);
}

/* ---------- OAuth 1.0a signing (RFC 5849, HMAC-SHA1) ---------- */

function pctEncode(str) {
  return encodeURIComponent(str).replace(/[!*'()]/g, c => "%" + c.charCodeAt(0).toString(16).toUpperCase());
}

function nonce() {
  return crypto.randomBytes(16).toString("hex");
}

function authHeader(method, url, extraOauthParams, token, tokenSecret) {
  const u = new URL(url);
  const oauthParams = Object.assign({
    oauth_consumer_key: CONSUMER_KEY,
    oauth_nonce: nonce(),
    oauth_signature_method: "HMAC-SHA1",
    oauth_timestamp: String(Math.floor(Date.now() / 1000)),
    oauth_version: "1.0"
  }, token ? { oauth_token: token } : {}, extraOauthParams || {});

  const allParams = Object.assign({}, oauthParams);
  u.searchParams.forEach((v, k) => { allParams[k] = v; });

  const paramString = Object.keys(allParams).sort()
    .map(k => pctEncode(k) + "=" + pctEncode(allParams[k]))
    .join("&");
  const baseUrl = u.origin + u.pathname;
  const baseString = method.toUpperCase() + "&" + pctEncode(baseUrl) + "&" + pctEncode(paramString);
  const signingKey = pctEncode(CONSUMER_SECRET) + "&" + pctEncode(tokenSecret || "");
  const signature = crypto.createHmac("sha1", signingKey).update(baseString).digest("base64");

  const headerParams = Object.assign({}, oauthParams, { oauth_signature: signature });
  return "OAuth " + Object.keys(headerParams).map(k => pctEncode(k) + '="' + pctEncode(headerParams[k]) + '"').join(", ");
}

function httpsRequest(method, urlStr, headers) {
  return new Promise((resolve, reject) => {
    const u = new URL(urlStr);
    const req = https.request({
      method,
      hostname: u.hostname,
      port: u.port || undefined,
      path: u.pathname + u.search,
      headers: Object.assign({ Accept: "application/json" }, headers)
    }, res => {
      let body = "";
      res.on("data", c => { body += c; });
      res.on("end", () => resolve({ status: res.statusCode, body }));
    });
    req.on("error", reject);
    req.end();
  });
}

function parseFormBody(body) {
  const out = {};
  for (const pair of body.split("&")) {
    if (!pair) continue;
    const [k, v] = pair.split("=");
    out[decodeURIComponent(k)] = decodeURIComponent(v || "");
  }
  return out;
}

/* ---------- session persistence ---------- */

function loadSession() {
  try { return JSON.parse(fs.readFileSync(SESSION_FILE, "utf8")); } catch (e) { return {}; }
}
function saveSession(s) {
  fs.writeFileSync(SESSION_FILE, JSON.stringify(s, null, 2));
}

/* ---------- E*TRADE calls ---------- */

async function getRequestToken() {
  const url = BASE + "/oauth/request_token";
  const res = await httpsRequest("GET", url, { Authorization: authHeader("GET", url, { oauth_callback: "oob" }) });
  if (res.status !== 200) throw new Error("Getting a request token failed (" + res.status + "): " + res.body);
  const p = parseFormBody(res.body);
  return { token: p.oauth_token, secret: p.oauth_token_secret };
}

async function getAccessToken(requestToken, requestSecret, verifier) {
  const url = BASE + "/oauth/access_token";
  const auth = authHeader("GET", url, { oauth_verifier: verifier }, requestToken, requestSecret);
  const res = await httpsRequest("GET", url, { Authorization: auth });
  if (res.status !== 200) throw new Error("Exchanging the verification code failed (" + res.status + "): " + res.body);
  const p = parseFormBody(res.body);
  return { token: p.oauth_token, secret: p.oauth_token_secret };
}

async function apiGet(apiPath, accessToken, accessSecret) {
  const url = BASE + apiPath;
  const auth = authHeader("GET", url, {}, accessToken, accessSecret);
  const res = await httpsRequest("GET", url, { Authorization: auth, Accept: "application/json" });
  if (res.status !== 200) throw new Error("E*TRADE API " + apiPath + " failed (" + res.status + "): " + res.body);
  return JSON.parse(res.body);
}

function asArray(x) { return x === undefined || x === null ? [] : (Array.isArray(x) ? x : [x]); }

async function fetchAllPositions(accessToken, accessSecret) {
  const accountsRes = await apiGet("/v1/accounts/list.json", accessToken, accessSecret);
  const accounts = asArray(accountsRes.AccountListResponse && accountsRes.AccountListResponse.Accounts && accountsRes.AccountListResponse.Accounts.Account);
  const positions = [];
  for (const acct of accounts) {
    if (acct.accountStatus && acct.accountStatus !== "ACTIVE") continue;
    let port;
    try {
      port = await apiGet("/v1/accounts/" + acct.accountIdKey + "/portfolio.json", accessToken, accessSecret);
    } catch (e) {
      continue; // an empty or unsupported account shouldn't sink the whole sync
    }
    const pr = port.PortfolioResponse;
    const accountPortfolios = asArray(pr && pr.AccountPortfolio);
    for (const ap of accountPortfolios) {
      for (const p of asArray(ap.Position)) {
        const symbol = p.Product && p.Product.symbol;
        if (!symbol) continue;
        positions.push({
          account: acct.accountDesc || acct.accountId || "E*TRADE",
          ticker: symbol,
          qty: Number(p.quantity) || 0,
          costBasis: p.pricePaid !== undefined ? Number(p.pricePaid) : null,
          price: p.Quick && p.Quick.lastTrade !== undefined ? Number(p.Quick.lastTrade) : null
        });
      }
    }
  }
  return positions;
}

/* ---------- tiny HTTP API for the tracker's browser page ---------- */

function withCors(res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
}

function sendJson(res, status, obj) {
  const body = JSON.stringify(obj);
  withCors(res);
  res.writeHead(status, { "Content-Type": "application/json", "Content-Length": Buffer.byteLength(body) });
  res.end(body);
}

function readBody(req) {
  return new Promise(resolve => {
    let data = "";
    req.on("data", c => { data += c; });
    req.on("end", () => resolve(data));
  });
}

const server = http.createServer(async (req, res) => {
  if (req.method === "OPTIONS") { withCors(res); res.writeHead(204); return res.end(); }

  const u = new URL(req.url, "http://localhost");
  try {
    if (u.pathname === "/etrade/status") {
      const s = loadSession();
      return sendJson(res, 200, { ok: true, environment: ENVIRONMENT, connected: !!(s.accessToken && s.accessSecret) });
    }

    if (u.pathname === "/etrade/connect" && req.method === "POST") {
      const rt = await getRequestToken();
      const session = loadSession();
      session.requestToken = rt.token;
      session.requestSecret = rt.secret;
      saveSession(session);
      const authorizeUrl = "https://us.etrade.com/e/t/etws/authorize?key=" + encodeURIComponent(CONSUMER_KEY) + "&token=" + encodeURIComponent(rt.token);
      return sendJson(res, 200, { authorizeUrl });
    }

    if (u.pathname === "/etrade/verify" && req.method === "POST") {
      const body = JSON.parse((await readBody(req)) || "{}");
      const session = loadSession();
      if (!session.requestToken) return sendJson(res, 400, { error: "No pending connection — click Connect again." });
      const at = await getAccessToken(session.requestToken, session.requestSecret, body.verifier || "");
      session.accessToken = at.token;
      session.accessSecret = at.secret;
      delete session.requestToken;
      delete session.requestSecret;
      saveSession(session);
      return sendJson(res, 200, { connected: true });
    }

    if (u.pathname === "/etrade/disconnect" && req.method === "POST") {
      saveSession({});
      return sendJson(res, 200, { connected: false });
    }

    if (u.pathname === "/etrade/portfolio" && req.method === "GET") {
      const session = loadSession();
      if (!session.accessToken) return sendJson(res, 401, { error: "Not connected." });
      const positions = await fetchAllPositions(session.accessToken, session.accessSecret);
      return sendJson(res, 200, { positions });
    }

    return sendJson(res, 404, { error: "Unknown endpoint." });
  } catch (e) {
    return sendJson(res, 500, { error: e && e.message ? e.message : "Unexpected error." });
  }
});

server.listen(PORT, () => {
  console.log("E*TRADE bridge listening on http://localhost:" + PORT + " (" + ENVIRONMENT + ")");
  console.log("Leave this running, then use \"Connected accounts\" in the tracker.");
});
