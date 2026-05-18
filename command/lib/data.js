// Fetch + parse source markdown files into typed shapes for app.js.
// All paths are repo-root-relative — assumes `python -m http.server` is run
// from the repo root, not from command/.

import { parseTables, extractSection, extractCodeBlockAfter, extractBullets } from "./markdown.js";

const FILES = {
  claude:     "/CLAUDE.md",
  analytics:  "/analytics/log.md",
  affiliates: "/affiliate/programs.md",
  bible:      "/persona/bible.md",
  style:      "/persona/style.md",
  captions:   "/content/week_01/captions.md",
  videoStack: "/content/video_stack.md",
  runbook:    "/runbook.md",
};

async function fetchText(path) {
  try {
    const res = await fetch(path, { cache: "no-store" });
    if (!res.ok) throw new Error(`${path} → HTTP ${res.status}`);
    return await res.text();
  } catch (e) {
    console.warn(`[data] failed to load ${path}:`, e.message);
    return "";
  }
}

export async function loadAll() {
  const entries = await Promise.all(
    Object.entries(FILES).map(async ([k, p]) => [k, await fetchText(p)])
  );
  return Object.fromEntries(entries);
}

export async function loadConfig() {
  try {
    const res = await fetch("/command/config.json", { cache: "no-store" });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (e) {
    console.error("[data] config.json failed to load:", e.message);
    return null;
  }
}

// ---------- Affiliates ----------
// Tier 1 = first table, Tier 2 = second table, Tier 3 = third, Tier 4 (no table = pinterest workflow)
export function getAffiliateTiers(affiliatesMd) {
  const tables = parseTables(affiliatesMd);
  return {
    tier1: tables[0] || { headers: [], rows: [] },
    tier2: tables[1] || { headers: [], rows: [] },
    tier3: tables[2] || { headers: [], rows: [] },
  };
}

// ---------- Pillars ----------
export function getPillars(bibleMd) {
  const section = extractSection(bibleMd, "Content pillars");
  const tables = parseTables(section);
  return tables[0] || { headers: [], rows: [] };
}

export function getHardNos(bibleMd) {
  return extractBullets(bibleMd, "Hard-no list");
}

// ---------- Style / prompts ----------
export function getStyleSubjects(styleMd) {
  const section = extractSection(styleMd, "Subject description library");
  const tables = parseTables(section);
  return tables[0] || { headers: [], rows: [] };
}

export function getStylePrompts(styleMd) {
  return {
    positive: extractCodeBlockAfter(styleMd, "Master positive prompt"),
    negative: extractCodeBlockAfter(styleMd, "Master negative prompt"),
  };
}

// ---------- Baseline goals (analytics) ----------
export function getBaselineGoals(analyticsMd) {
  const section = extractSection(analyticsMd, "Baseline goals");
  const tables = parseTables(section);
  return tables[0] || { headers: [], rows: [] };
}

// ---------- Captions ----------
// captions.md is structured as:
//   ## DAY N (Day) — Pillar
//     ### TikTok / ### Instagram Reel / ### YouTube Short
//       > **Hook:** ...
//       > **Caption:** ...
//       > #hashtags
export function getCaptions(captionsMd) {
  if (!captionsMd) return [];
  const dayBlocks = captionsMd.split(/^## DAY /m).slice(1);
  const result = [];
  for (const block of dayBlocks) {
    const headerLine = block.split("\n")[0]; // e.g. "1 (Mon) — Library Reading Nook #1"
    const dayMatch = headerLine.match(/^(\d+)\s*\(([^)]+)\)\s*[—-]\s*(.+)$/);
    if (!dayMatch) continue;
    const [, dayNum, weekday, title] = dayMatch;
    const platformBlocks = block.split(/^### /m).slice(1);
    for (const pb of platformBlocks) {
      const lines = pb.split("\n");
      const platform = lines[0].trim();
      const text = lines.slice(1).join("\n").trim();
      // Pull out hook + body + hashtags from blockquoted lines
      const hookMatch = text.match(/\*\*Hook[^:]*:\*\*\s*([^\n]+)/i);
      const captionMatch = text.match(/\*\*Caption:\*\*\s*\n>([\s\S]*?)(?=\n>\s*#|\n>\s*$|\n\n|$)/i);
      const titleMatch = text.match(/\*\*Title:\*\*\s*([^\n]+)/i);
      const descMatch = text.match(/\*\*Description:\*\*\s*\n>([\s\S]*?)(?=\n>\s*#|\n>\s*$|\n\n|$)/i);
      const hashtagMatch = text.match(/(#\S+(?:\s+#\S+)+)/);
      result.push({
        day: Number(dayNum),
        weekday,
        title: title.trim(),
        platform,
        hook: hookMatch ? hookMatch[1].trim() : (titleMatch ? titleMatch[1].trim() : ""),
        body: cleanBlockquote(captionMatch ? captionMatch[1] : (descMatch ? descMatch[1] : "")),
        hashtags: hashtagMatch ? hashtagMatch[1].trim() : "",
      });
    }
  }
  return result;
}

function cleanBlockquote(s) {
  if (!s) return "";
  return s
    .split("\n")
    .map((l) => l.replace(/^>\s?/, "").trim())
    .filter((l) => l && !l.startsWith("#"))
    .join("\n\n")
    .trim();
}

// ---------- CLAUDE.md current state ----------
export function getCurrentState(claudeMd) {
  const section = extractSection(claudeMd, "Current state", 2);
  const bullets = section
    .split("\n")
    .map((l) => l.trim())
    .filter((l) => l.startsWith("- "))
    .map((l) => l.slice(2));
  return bullets;
}
