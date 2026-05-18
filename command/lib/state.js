// localStorage wrapper with daily-reset helpers.
// Namespace: cc:* (cordelia command)

const NS = "cc:";

function todayISO() {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function get(key, fallback) {
  const raw = localStorage.getItem(NS + key);
  if (raw === null) return fallback;
  try {
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

function set(key, val) {
  localStorage.setItem(NS + key, JSON.stringify(val));
}

export const state = {
  today: todayISO,

  // ---------- Quest (daily reset) ----------
  getQuest() {
    return get(`quest:${todayISO()}`, {});
  },
  setQuestItem(id, bool) {
    const q = this.getQuest();
    q[id] = bool;
    set(`quest:${todayISO()}`, q);
  },
  clearQuest() {
    set(`quest:${todayISO()}`, {});
  },

  // ---------- Quota (daily reset) ----------
  getQuota() {
    return get(`quota:${todayISO()}`, { seedance: 0, kling: 0 });
  },
  incQuota(tool, delta = 1) {
    const q = this.getQuota();
    q[tool] = Math.max(0, (q[tool] || 0) + delta);
    set(`quota:${todayISO()}`, q);
    return q[tool];
  },
  resetQuota(tool) {
    const q = this.getQuota();
    q[tool] = 0;
    set(`quota:${todayISO()}`, q);
  },

  // ---------- Followers (manual, persistent) ----------
  getFollowers() {
    return get("followers", {});
  },
  setFollowers(platform, count) {
    const numeric = Number(count) || 0;
    const f = this.getFollowers();
    const prev = f[platform];
    f[platform] = { count: numeric, ts: todayISO(), prev: prev ? prev.count : null };
    set("followers", f);

    const hist = get("followers:history", []);
    let entry = hist.find((e) => e.ts === todayISO());
    if (!entry) {
      entry = { ts: todayISO() };
      hist.push(entry);
    }
    entry[platform] = numeric;
    set("followers:history", hist);
  },
  getFollowersHistory() {
    return get("followers:history", []);
  },

  // ---------- Ledger (manual, persistent) ----------
  getLedger() {
    return get("ledger", []);
  },
  appendLedger(entry) {
    const l = this.getLedger();
    l.push({
      ts: entry.ts || todayISO(),
      stream: entry.stream,
      amount_gbp: Number(entry.amount_gbp) || 0,
      note: entry.note || "",
    });
    set("ledger", l);
  },
  removeLedger(index) {
    const l = this.getLedger();
    l.splice(index, 1);
    set("ledger", l);
  },

  // ---------- Affiliate status (manual, persistent) ----------
  getAffiliateStatus() {
    return get("affiliate_status", {});
  },
  setAffiliateStatus(name, status) {
    const s = this.getAffiliateStatus();
    s[name] = status;
    set("affiliate_status", s);
  },

  // ---------- Misc ----------
  exportAll() {
    const dump = {};
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (k && k.startsWith(NS)) dump[k] = localStorage.getItem(k);
    }
    return dump;
  },
  wipeAll() {
    const toDelete = [];
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (k && k.startsWith(NS)) toDelete.push(k);
    }
    toDelete.forEach((k) => localStorage.removeItem(k));
  },
};

// Status cycle order for affiliate badges
export const AFFILIATE_STATUS_CYCLE = ["", "apply", "wait", "live", "reject"];

export function nextStatus(current) {
  const idx = AFFILIATE_STATUS_CYCLE.indexOf(current || "");
  return AFFILIATE_STATUS_CYCLE[(idx + 1) % AFFILIATE_STATUS_CYCLE.length];
}
