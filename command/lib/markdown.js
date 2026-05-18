// Minimal markdown parser — only what the dashboard needs.
// No external dependencies. ~50 lines of real work.

const escapeRegex = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

function splitRow(line) {
  // Strip leading/trailing pipes, split on inner pipes, trim cells.
  return line
    .replace(/^\s*\|/, "")
    .replace(/\|\s*$/, "")
    .split("|")
    .map((s) => s.trim());
}

function isSeparator(line) {
  // | --- | :---: | etc.
  return /^\s*\|?\s*:?-{3,}:?\s*(\|\s*:?-{3,}:?\s*)+\|?\s*$/.test(line);
}

export function parseTables(md) {
  if (!md) return [];
  const lines = md.split("\n");
  const tables = [];
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    const trimmed = line.trim();
    if (trimmed.startsWith("|") && i + 1 < lines.length && isSeparator(lines[i + 1])) {
      const headers = splitRow(trimmed);
      const rows = [];
      i += 2;
      while (i < lines.length) {
        const r = lines[i].trim();
        if (!r.startsWith("|")) break;
        rows.push(splitRow(r));
        i++;
      }
      tables.push({ headers, rows });
      continue;
    }
    i++;
  }
  return tables;
}

// Return the markdown under `## <heading>` up to the next `## ` or end-of-file.
// Heading match is case-insensitive and tolerant of trailing punctuation.
export function extractSection(md, heading, level = 2) {
  if (!md) return "";
  const hash = "#".repeat(level);
  // Allow heading to be a prefix — many of our headings have parens.
  const re = new RegExp(
    `^${escapeRegex(hash)}\\s+${escapeRegex(heading)}[^\\n]*\\n`,
    "im"
  );
  const m = md.match(re);
  if (!m) return "";
  const start = m.index + m[0].length;
  const rest = md.slice(start);
  const stopRe = new RegExp(`^${escapeRegex(hash)}\\s`, "m");
  const stop = rest.match(stopRe);
  return stop ? rest.slice(0, stop.index) : rest;
}

// Extract a triple-backtick code block immediately following the given heading.
// Used for the master positive/negative prompts in persona/style.md.
export function extractCodeBlockAfter(md, heading) {
  const section = extractSection(md, heading, 2);
  const m = section.match(/```[a-z]*\n([\s\S]*?)```/);
  return m ? m[1].trim() : "";
}

// Return bullet items (- foo) directly under the given heading.
export function extractBullets(md, heading, level = 2) {
  const section = extractSection(md, heading, level);
  return section
    .split("\n")
    .map((l) => l.trim())
    .filter((l) => l.startsWith("- "))
    .map((l) => l.slice(2));
}
