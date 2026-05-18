// Cordelia Command — main orchestrator.
// Loads config + source markdown, renders all sections, wires events.

import {
  loadAll, loadConfig,
  getAffiliateTiers, getPillars, getHardNos,
  getStyleSubjects, getStylePrompts, getBaselineGoals,
  getCaptions, getCurrentState,
} from "./lib/data.js";
import { state, nextStatus } from "./lib/state.js";
import { tiles, groups } from "./lib/launcher.js";

let CFG = null;
let SRC = null;

// ============ Boot ============
async function boot() {
  CFG = await loadConfig();
  SRC = await loadAll();
  if (!CFG) {
    document.body.innerHTML = `<main class="error"><h1>Config failed</h1><p>command/config.json could not be loaded. Make sure you ran <code>python -m http.server 8080</code> from the repo root and are visiting <code>http://localhost:8080/command/</code>.</p></main>`;
    return;
  }
  renderAll();
  setInterval(tickClock, 1000 * 30); // refresh clock + day counter every 30s
}

function renderAll() {
  renderStatusBar();
  renderQuest();
  renderQuota();
  renderPhase();
  renderPlatforms();
  renderLedger();
  renderAffiliates();
  renderPillars();
  renderPromptAssembler();
  renderAtelier();
  renderCaptions();
  renderFooter();
}

// ============ Helpers ============
function $(sel) { return document.querySelector(sel); }
function el(tag, attrs = {}, ...kids) {
  const node = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (k === "class") node.className = v;
    else if (k === "html") node.innerHTML = v;
    else if (k.startsWith("on") && typeof v === "function") node.addEventListener(k.slice(2), v);
    else if (v !== null && v !== undefined) node.setAttribute(k, v);
  }
  for (const kid of kids) {
    if (kid == null || kid === false) continue;
    node.appendChild(typeof kid === "string" ? document.createTextNode(kid) : kid);
  }
  return node;
}

function dayOfProject() {
  if (!CFG) return 0;
  const launch = new Date(CFG.launch_date + "T00:00:00");
  const now = new Date();
  const ms = now - launch;
  return Math.floor(ms / 86400000) + 1; // day 1 = launch day
}

function formatTime() {
  const d = new Date();
  return d.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", hour12: false });
}

function pad(n, w = 0) {
  return n.toLocaleString("en-GB").padStart(w);
}

async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    // Fallback for older browsers / non-HTTPS contexts
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    let ok = false;
    try { ok = document.execCommand("copy"); } catch {}
    document.body.removeChild(ta);
    return ok;
  }
}

function flashCopied(button) {
  const original = button.textContent;
  button.textContent = "copied";
  button.classList.add("copied");
  setTimeout(() => {
    button.textContent = original;
    button.classList.remove("copied");
  }, 1200);
}

// ============ 1. Status bar ============
function renderStatusBar() {
  const bar = $("#status-bar");
  bar.replaceChildren(
    el("div", { class: "status-left" },
      el("span", { class: "status-handle" }, CFG.handle),
      el("span", { class: "status-sep" }, "·"),
      el("span", { class: "status-persona" }, CFG.persona_name),
    ),
    el("div", { class: "status-right" },
      el("span", { class: "status-day" }, `Day ${dayOfProject()} of ${CFG.horizon_days}`),
      el("span", { class: "status-sep" }, "·"),
      el("span", { class: "status-clock", id: "status-clock" }, formatTime()),
    ),
  );
}

function tickClock() {
  const c = document.getElementById("status-clock");
  const d = document.getElementById("status-day");
  if (c) c.textContent = formatTime();
  if (d) d.textContent = `Day ${dayOfProject()} of ${CFG.horizon_days}`;
}

// ============ 2. Quest ============
const SCHED = {
  weekday: { am: "09:00", noon: "14:00", pm: "20:30" },
  fri:     { am: "09:00", noon: "14:00", pm: "21:00" },
  sat:     { am: "11:00", noon: "16:00", pm: "21:00" },
  sun:     { am: "11:00", noon: "16:00", pm: "20:30" },
};

function questForToday() {
  const dow = new Date().getDay(); // 0=Sun .. 6=Sat
  let key = "weekday";
  if (dow === 5) key = "fri";
  if (dow === 6) key = "sat";
  if (dow === 0) key = "sun";
  const t = SCHED[key];
  const pinCount = (dow === 0 || dow === 6) ? 5 : 3;
  return [
    { id: "am_tt",    time: t.am,   label: "Post TikTok #1" },
    { id: "am_ig",    time: t.am,   label: "Post Instagram Reel #1" },
    { id: "am_yt",    time: t.am,   label: "Post YouTube Short #1" },
    { id: "noon_tt",  time: t.noon, label: "Post TikTok #2" },
    { id: "noon_pin", time: t.noon, label: `Post ${pinCount} Pinterest pins (afternoon batch)` },
    { id: "noon_rep", time: t.noon, label: "Reply to morning comments" },
    { id: "pm_tt",    time: t.pm,   label: "Post TikTok #3" },
    { id: "pm_ig",    time: t.pm,   label: "Post Instagram Reel #2" },
    { id: "pm_yt",    time: t.pm,   label: "Post YouTube Short #2" },
    { id: "pm_rep",   time: t.pm,   label: "Reply to lunch comments + DMs" },
  ];
}

function renderQuest() {
  const root = $("#quest");
  const items = questForToday();
  const checked = state.getQuest();
  const done = items.filter(i => checked[i.id]).length;

  root.replaceChildren(
    el("div", { class: "section-head" },
      el("h2", {}, "Tonight's Quest"),
      el("span", { class: "section-meta" }, `${done} / ${items.length} shipped`),
    ),
    el("ul", { class: "quest-list" },
      ...items.map(item => {
        const isChecked = !!checked[item.id];
        const li = el("li", { class: "quest-item" + (isChecked ? " done" : "") },
          el("button", {
            class: "quest-check",
            "aria-label": isChecked ? "mark undone" : "mark done",
            onclick: () => {
              state.setQuestItem(item.id, !isChecked);
              renderQuest();
            },
          }, isChecked ? "◉" : "◯"),
          el("span", { class: "quest-time" }, item.time),
          el("span", { class: "quest-label" }, item.label),
        );
        return li;
      }),
    ),
    el("p", { class: "section-note" }, "checkboxes reset daily at midnight (local)"),
  );
}

// ============ 3. Quota ============
function renderQuota() {
  const root = $("#quota");
  const q = state.getQuota();
  const seedMax = CFG.quotas.seedance_daily;
  const klingMax = CFG.quotas.kling_daily;

  root.replaceChildren(
    el("div", { class: "section-head" },
      el("h2", {}, "Daily quotas"),
      el("span", { class: "section-meta" }, "resets at midnight"),
    ),
    el("div", { class: "quota-grid" },
      quotaRow("Seedance 2.0", "seedance", q.seedance || 0, seedMax, "1080p · no watermark · primary"),
      quotaRow("Kling AI",     "kling",    q.kling || 0,    klingMax, "720p · watermarked · secondary"),
    ),
  );
}

function quotaRow(label, key, used, max, hint) {
  const pct = Math.min(100, Math.round((used / max) * 100));
  return el("div", { class: "quota-row" },
    el("div", { class: "quota-label" },
      el("span", { class: "quota-name" }, label),
      el("span", { class: "quota-count" }, `${used} / ${max}`),
    ),
    el("div", { class: "quota-bar" },
      el("div", { class: "quota-fill", style: `width: ${pct}%` }),
    ),
    el("div", { class: "quota-meta" },
      el("span", { class: "quota-hint" }, hint),
      el("div", { class: "quota-buttons" },
        el("button", {
          class: "quota-btn",
          onclick: () => { state.incQuota(key, -1); renderQuota(); },
        }, "−"),
        el("button", {
          class: "quota-btn",
          onclick: () => { state.incQuota(key, +1); renderQuota(); },
        }, "+"),
        el("button", {
          class: "quota-btn small",
          onclick: () => { state.resetQuota(key); renderQuota(); },
        }, "reset"),
      ),
    ),
  );
}

// ============ 4. Phase progress ============
function renderPhase() {
  const root = $("#phase");
  const day = dayOfProject();
  const horizon = CFG.horizon_days;
  const pct = Math.max(0, Math.min(100, Math.round((day / horizon) * 100)));
  const next = CFG.milestones.find(m => m.day > day);
  const past = CFG.milestones.filter(m => m.day <= day);

  root.replaceChildren(
    el("div", { class: "section-head" },
      el("h2", {}, "Phase progress"),
      el("span", { class: "section-meta" }, `${pct}% to day ${horizon}`),
    ),
    el("div", { class: "phase-bar" },
      el("div", { class: "phase-fill", style: `width: ${pct}%` }),
    ),
    el("div", { class: "phase-meta" },
      next
        ? el("p", { class: "phase-next" },
            el("span", { class: "phase-eyebrow" }, `${next.day - day} days to Day ${next.day}: `),
            el("span", {}, next.label),
            el("span", { class: "phase-metric" }, ` — ${next.metric}`),
          )
        : el("p", { class: "phase-next" }, "All charted milestones reached — set new targets."),
      past.length
        ? el("p", { class: "phase-past" }, `Cleared: ${past.map(m => `❦ ${m.label}`).join("  ·  ")}`)
        : null,
    ),
  );
}

// ============ 5. Platforms ============
const PLATFORMS = [
  { key: "tiktok",    label: "TikTok",         unit: "followers" },
  { key: "instagram", label: "Instagram",      unit: "followers" },
  { key: "youtube",   label: "YouTube",        unit: "subscribers" },
  { key: "pinterest", label: "Pinterest",      unit: "monthly viewers" },
  { key: "gumroad",   label: "Gumroad",        unit: "sales" },
];

function renderPlatforms() {
  const root = $("#platforms");
  const f = state.getFollowers();

  root.replaceChildren(
    el("div", { class: "section-head" },
      el("h2", {}, "The five rails"),
      el("span", { class: "section-meta" }, "click any card to update"),
    ),
    el("div", { class: "platform-grid" },
      ...PLATFORMS.map(p => platformCard(p, f[p.key])),
    ),
  );
}

function platformCard(p, entry) {
  const count = entry ? entry.count : null;
  const prev = entry && entry.prev != null ? entry.prev : null;
  const delta = prev != null && count != null ? count - prev : null;
  const milestones = CFG.follower_milestones?.[p.key] || [];
  const nextMs = milestones.find(m => count == null || m > count);
  const gap = nextMs != null && count != null ? nextMs - count : null;

  return el("div", { class: "platform-card" },
    el("div", { class: "platform-head" },
      el("span", { class: "platform-name" }, p.label),
      el("a", {
        class: "platform-link",
        href: CFG.platforms[p.key] || "#",
        target: "_blank",
        rel: "noopener",
      }, "↗"),
    ),
    el("div", { class: "platform-count" }, count == null ? "—" : count.toLocaleString("en-GB")),
    el("div", { class: "platform-unit" }, p.unit),
    delta != null && delta !== 0
      ? el("div", { class: "platform-delta " + (delta > 0 ? "up" : "down") },
          (delta > 0 ? "↑ +" : "↓ ") + Math.abs(delta).toLocaleString("en-GB"))
      : el("div", { class: "platform-delta neutral" }, prev != null ? "no change" : "first entry"),
    nextMs
      ? el("div", { class: "platform-next" },
          count == null ? `target: ${nextMs.toLocaleString("en-GB")}` : `${gap.toLocaleString("en-GB")} to ${nextMs.toLocaleString("en-GB")}`)
      : null,
    el("form", {
      class: "platform-edit",
      onsubmit: (e) => {
        e.preventDefault();
        const input = e.target.querySelector("input");
        if (input.value !== "") {
          state.setFollowers(p.key, input.value);
          renderPlatforms();
        }
      },
    },
      el("input", { type: "number", min: "0", placeholder: "update", value: count != null ? count : "" }),
      el("button", { type: "submit" }, "save"),
    ),
  );
}

// ============ 6. Ledger ============
const STREAMS = ["Amazon UK", "TT Shop", "Awin", "Impact", "ShareASale", "Gumroad", "Brand deal", "Other"];

function renderLedger() {
  const root = $("#ledger");
  const entries = state.getLedger();
  const totals = {};
  let grand = 0;
  for (const e of entries) {
    totals[e.stream] = (totals[e.stream] || 0) + e.amount_gbp;
    grand += e.amount_gbp;
  }

  root.replaceChildren(
    el("div", { class: "section-head" },
      el("h2", {}, "The Ledger"),
      el("span", { class: "section-meta" }, `cumulative: £${grand.toFixed(2)}`),
    ),
    Object.keys(totals).length
      ? el("ul", { class: "ledger-totals" },
          ...Object.entries(totals).map(([stream, sum]) =>
            el("li", { class: "ledger-total" },
              el("span", { class: "ledger-stream" }, stream),
              el("span", { class: "ledger-sum" }, `£${sum.toFixed(2)}`),
            )
          ),
        )
      : el("p", { class: "ledger-empty" }, "No revenue logged yet. Every entry counts — even £0.10."),

    el("form", {
      class: "ledger-form",
      onsubmit: (e) => {
        e.preventDefault();
        const form = e.target;
        const stream = form.stream.value;
        const amount = form.amount.value;
        const note = form.note.value;
        if (!amount) return;
        state.appendLedger({ stream, amount_gbp: amount, note });
        form.reset();
        renderLedger();
      },
    },
      el("select", { name: "stream" }, ...STREAMS.map(s => el("option", { value: s }, s))),
      el("input", { name: "amount", type: "number", step: "0.01", min: "0", placeholder: "£ amount" }),
      el("input", { name: "note", type: "text", placeholder: "note (optional)" }),
      el("button", { type: "submit" }, "add"),
    ),
    entries.length
      ? el("details", { class: "ledger-details" },
          el("summary", {}, `${entries.length} entries`),
          el("ul", { class: "ledger-entries" },
            ...entries.map((e, i) =>
              el("li", { class: "ledger-entry" },
                el("span", { class: "ledger-ts" }, e.ts),
                el("span", { class: "ledger-stream" }, e.stream),
                el("span", { class: "ledger-amount" }, `£${e.amount_gbp.toFixed(2)}`),
                el("span", { class: "ledger-note" }, e.note || ""),
                el("button", {
                  class: "ledger-del",
                  onclick: () => { state.removeLedger(i); renderLedger(); },
                  "aria-label": "delete",
                }, "×"),
              )
            ),
          ),
        )
      : null,
  );
}

// ============ 7. Affiliate scrying board ============
function renderAffiliates() {
  const root = $("#affiliates");
  const { tier1, tier2, tier3 } = getAffiliateTiers(SRC.affiliates);
  const overrides = state.getAffiliateStatus();

  root.replaceChildren(
    el("div", { class: "section-head" },
      el("h2", {}, "Affiliate scrying board"),
      el("span", { class: "section-meta" }, "click status to cycle"),
    ),
    affiliateBlock("Tier 1 — apply day one", tier1, overrides, /*open*/ true),
    affiliateBlock("Tier 2 — niche gothic/alt", tier2, overrides, /*open*/ false),
    affiliateBlock("Tier 3 — high-commission SaaS", tier3, overrides, /*open*/ false),
  );
}

function affiliateBlock(title, table, overrides, open) {
  if (!table.rows.length) return el("p", { class: "section-note" }, `${title}: no rows parsed.`);
  // Heuristics: column 0 = program name. Column 1 may be network/brand. Status column is often last.
  const nameIdx = 0;
  const statusIdx = findHeaderIndex(table.headers, ["status"]) ?? table.headers.length - 1;
  const networkIdx = findHeaderIndex(table.headers, ["network"]);
  const commissionIdx = findHeaderIndex(table.headers, ["commission"]);

  const details = el("details", { class: "affiliate-block" + (open ? " open" : ""), ...(open ? { open: "open" } : {}) },
    el("summary", {},
      el("span", {}, title),
      el("span", { class: "section-meta" }, `${table.rows.length} programs`),
    ),
    el("ul", { class: "affiliate-list" },
      ...table.rows.map(row => {
        const name = stripMarkdown(row[nameIdx] || "");
        const override = overrides[name];
        const mdStatus = (row[statusIdx] || "").match(/\[(\w+)\]/);
        const current = override != null ? override : (mdStatus ? mdStatus[1] : "");
        return el("li", { class: "affiliate-row" },
          el("div", { class: "affiliate-main" },
            el("span", { class: "affiliate-name" }, name),
            networkIdx != null ? el("span", { class: "affiliate-network" }, stripMarkdown(row[networkIdx] || "")) : null,
            commissionIdx != null ? el("span", { class: "affiliate-commission" }, stripMarkdown(row[commissionIdx] || "")) : null,
          ),
          el("button", {
            class: `status-badge status-${current || "empty"}`,
            onclick: () => {
              state.setAffiliateStatus(name, nextStatus(current));
              renderAffiliates();
            },
          }, current || "—"),
        );
      }),
    ),
  );
  return details;
}

function findHeaderIndex(headers, names) {
  for (let i = 0; i < headers.length; i++) {
    const h = headers[i].toLowerCase();
    if (names.some(n => h.includes(n))) return i;
  }
  return null;
}

function stripMarkdown(s) {
  return s.replace(/\*\*/g, "").replace(/`/g, "").trim();
}

// ============ 8. Pillars ============
function renderPillars() {
  const root = $("#pillars");
  const t = getPillars(SRC.bible);
  if (!t.rows.length) {
    root.replaceChildren(el("p", { class: "section-note" }, "Could not parse content pillars from persona/bible.md."));
    return;
  }

  root.replaceChildren(
    el("div", { class: "section-head" }, el("h2", {}, "Content pillars")),
    el("div", { class: "pillar-grid" },
      ...t.rows.map(r => el("div", { class: "pillar-card" },
        el("span", { class: "pillar-index" }, r[0]),
        el("h3", { class: "pillar-name" }, r[1]),
        el("p", { class: "pillar-format" }, r[2]),
        el("p", { class: "pillar-freq" }, r[3]),
        el("p", { class: "pillar-mono" }, r[4]),
      )),
    ),
  );
}

// ============ 9. Prompt assembler ============
function renderPromptAssembler() {
  const root = $("#prompts");
  const subjects = getStyleSubjects(SRC.style);
  const { positive, negative } = getStylePrompts(SRC.style);

  if (!subjects.rows.length) {
    root.replaceChildren(el("p", { class: "section-note" }, "Could not parse subject library from persona/style.md."));
    return;
  }

  const pillars = subjects.rows.map(r => ({ pillar: r[0], subject: r[1] }));
  let chosen = pillars[0].pillar;

  const assembled = () => {
    const subj = pillars.find(p => p.pillar === chosen)?.subject || "";
    return positive.replace(/\[SUBJECT DESCRIPTION\]/g, subj);
  };

  function rerender() {
    const pre = root.querySelector(".prompt-output");
    if (pre) pre.textContent = assembled();
  }

  root.replaceChildren(
    el("div", { class: "section-head" }, el("h2", {}, "Prompt assembler")),
    el("div", { class: "prompt-controls" },
      el("label", {},
        el("span", { class: "prompt-label" }, "Pillar"),
        el("select", {
          onchange: (e) => { chosen = e.target.value; rerender(); },
        }, ...pillars.map(p => el("option", { value: p.pillar }, p.pillar))),
      ),
      el("button", {
        class: "prompt-copy",
        onclick: async (e) => {
          const ok = await copyToClipboard(assembled());
          if (ok) flashCopied(e.target);
        },
      }, "copy positive"),
      el("button", {
        class: "prompt-copy",
        onclick: async (e) => {
          const ok = await copyToClipboard(negative);
          if (ok) flashCopied(e.target);
        },
      }, "copy negative"),
    ),
    el("pre", { class: "prompt-output" }, assembled()),
    el("details", { class: "prompt-negative" },
      el("summary", {}, "negative prompt"),
      el("pre", { class: "prompt-output dim" }, negative),
    ),
  );
}

// ============ 10. The Atelier ============
function renderAtelier() {
  const root = $("#atelier");
  root.replaceChildren(
    el("div", { class: "section-head" }, el("h2", {}, "The Atelier")),
    ...Object.entries(groups).map(([groupKey, group]) => {
      const groupTiles = tiles.filter(t => t.group === groupKey);
      return el("div", { class: "atelier-group" },
        el("div", { class: "atelier-group-head" },
          el("h3", {}, group.label),
          el("span", { class: "section-meta" }, group.note),
        ),
        el("div", { class: "tile-grid" },
          ...groupTiles.map(t => tileButton(t)),
        ),
      );
    }),
  );
}

function tileButton(t) {
  const a = el("a", {
    class: "tile" + (t.url ? "" : " tile-disabled"),
    href: t.url || "#",
    target: t.url ? "_blank" : null,
    rel: "noopener",
    onclick: t.url ? null : (e) => { e.preventDefault(); if (t.fallback) alert(t.fallback); },
  },
    el("span", { class: "tile-label" }, t.label),
    el("span", { class: "tile-note" }, t.note),
  );
  return a;
}

// ============ 11. Captions ============
function renderCaptions() {
  const root = $("#captions");
  const all = getCaptions(SRC.captions);
  if (!all.length) {
    root.replaceChildren(el("p", { class: "section-note" }, "No captions parsed from content/week_01/captions.md."));
    return;
  }

  const platforms = ["All", ...new Set(all.map(c => c.platform))];
  let activePlatform = "All";

  function visible() {
    return activePlatform === "All" ? all : all.filter(c => c.platform === activePlatform);
  }

  function paint() {
    const list = root.querySelector(".caption-list");
    if (!list) return;
    list.replaceChildren(
      ...visible().map(c => el("article", { class: "caption-card" },
        el("div", { class: "caption-head" },
          el("span", { class: "caption-day" }, `Day ${c.day} · ${c.weekday}`),
          el("span", { class: "caption-platform" }, c.platform),
        ),
        el("h3", { class: "caption-title" }, c.title),
        el("p", { class: "caption-hook" }, c.hook),
        el("p", { class: "caption-body" }, c.body),
        c.hashtags ? el("p", { class: "caption-hashtags" }, c.hashtags) : null,
        el("button", {
          class: "caption-copy",
          onclick: async (e) => {
            const text = [c.hook, "", c.body, "", c.hashtags].filter(Boolean).join("\n");
            const ok = await copyToClipboard(text);
            if (ok) flashCopied(e.target);
          },
        }, "copy"),
      )),
    );
  }

  root.replaceChildren(
    el("div", { class: "section-head" },
      el("h2", {}, "Caption browser"),
      el("span", { class: "section-meta" }, `${all.length} captions · week 01`),
    ),
    el("div", { class: "caption-filter" },
      ...platforms.map(p => el("button", {
        class: "caption-tab" + (p === activePlatform ? " active" : ""),
        onclick: (e) => {
          activePlatform = p;
          root.querySelectorAll(".caption-tab").forEach(t => t.classList.remove("active"));
          e.target.classList.add("active");
          paint();
        },
      }, p)),
    ),
    el("div", { class: "caption-list" }),
  );
  paint();
}

// ============ 12. Footer (hard-nos + disclosure) ============
function renderFooter() {
  const root = $("#footer-panel");
  const hardNos = getHardNos(SRC.bible);

  root.replaceChildren(
    el("div", { class: "footer-cols" },
      el("div", { class: "footer-col" },
        el("h3", {}, "Hard-no list"),
        hardNos.length
          ? el("ul", { class: "hard-nos" }, ...hardNos.map(n => el("li", {}, n)))
          : el("p", { class: "section-note" }, "Could not load hard-no list."),
      ),
      el("div", { class: "footer-col" },
        el("h3", {}, "Disclosure"),
        el("p", {}, `Cordelia Vale is not a person. AI-generated character — disclosure in bio, ${"#AI"} on every visual post. Affiliate links are disclosed in plain text on each platform.`),
        el("p", { class: "footer-meta" }, "@cordelia.cult · MMXXVI"),
      ),
    ),
  );
}

// ============ Go ============
boot();
