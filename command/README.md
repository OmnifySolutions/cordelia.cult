# Cordelia Command

Local operator dashboard. Private by design — never deploy to GH Pages.

## Launch — one click

Double-click **`cordelia.bat`** in the repo root. It opens the dashboard in your default browser and runs the local server. Close the resulting console window to stop the server.

Right-click `cordelia.bat` → *Pin to taskbar* (or copy it to your desktop) for one-click access from anywhere.

## Launch — manual (if you prefer)

From the **repo root** (`C:\Users\Daryll\Documents\OF Girl #1`):

```powershell
python -m http.server 8080
```

Then open <http://localhost:8080/command/> in any browser.

> Must be served from the repo root (not from `command/`). The dashboard fetches `/CLAUDE.md`, `/analytics/log.md`, etc. — running the server one level down breaks every read.

## Always-on (optional)

If you want the dashboard running 24/7 without thinking about it:

1. Press `Win + R` → type `shell:startup` → Enter. (Opens your Startup folder.)
2. Right-click `cordelia.bat` → *Copy*. Paste into the Startup folder as a shortcut (right-click in the folder → *Paste shortcut*).
3. Next login, the dashboard launches automatically.

Trade-off: a console window opens every login (you can minimise it). Stop it later by closing the console.

## Daily ritual

1. Open the dashboard with the morning coffee.
2. Tick **Tonight's Quest** as you ship each post.
3. Increment the **Seedance / Kling** quota counters when you generate clips.
4. When a follower count tips up on a platform, click the card → enter the new number → save.
5. When a commission lands, add it to **The Ledger**.

Everything resets correctly at midnight (local) for the daily items.

## Sections

| # | Section | What it does |
|---|---|---|
| 1 | Status bar | Phase day-counter + clock + handle |
| 2 | Tonight's Quest | Today's posting checklist from the runbook |
| 3 | Daily quotas | Seedance + Kling fill bars (manual +/− buttons) |
| 4 | Phase progress | Bar to Day 180 + next milestone countdown |
| 5 | The five rails | TT / IG / YT / Pinterest / Gumroad cards with delta |
| 6 | The Ledger | Revenue per stream + grand total |
| 7 | Affiliate scrying board | Tier 1–3 programs from `affiliate/programs.md` with click-to-cycle status |
| 8 | Content pillars | 6 pillars from `persona/bible.md` |
| 9 | Prompt assembler | Pick pillar → assembles SDXL prompt → copy to clipboard |
| 10 | The Atelier | Tool launcher — Colab, Seedance, Kling, all 5 platforms, affiliate dashboards |
| 11 | Caption browser | Week 1 captions filtered by platform, one-click copy |
| 12 | Footer | Hard-no list + AI disclosure (always visible reminder) |

## Where data lives

- **Source of truth** — markdown files at the repo root. Read-only from the dashboard.
- **Quick-edit state** — your browser's `localStorage` under the `cc:` namespace.
  - `cc:quest:YYYY-MM-DD` — today's checked items (resets daily)
  - `cc:quota:YYYY-MM-DD` — today's Seedance/Kling usage (resets daily)
  - `cc:followers` — last-entered counts + history
  - `cc:ledger` — all revenue entries
  - `cc:affiliate_status` — your manual overrides to the program statuses in markdown

To wipe everything and start clean: DevTools → Application → Local Storage → delete all `cc:*` keys. Or in the console: `Object.keys(localStorage).filter(k=>k.startsWith('cc:')).forEach(k=>localStorage.removeItem(k))`.

## When to edit `config.json`

- **Launch date drifted** (you backdated the project) → edit `launch_date`
- **Handle changed** → edit `handle` + every URL in `platforms`
- **Seedance/Kling raised free quota** → edit `quotas`
- **Added a new milestone** → push into `milestones[]`

Edit it. Refresh the page. Done.

## Troubleshooting

**Status bar says "loading…" forever and console shows `404 /CLAUDE.md`** — you started `python -m http.server` from inside `command/`. Stop it, `cd` back to the repo root, restart.

**Affiliate board shows "no rows parsed"** — `affiliate/programs.md` was reformatted and the parser can't see the table. Open DevTools console; the parser logs a warning with the file path. Restore the standard markdown table format (header row, separator row, data rows all starting with `|`).

**Quota counters won't reset** — they reset when the *date* changes. If you stayed up past midnight working, the counter only resets when the system clock ticks over to the next calendar day. If you want a manual reset, click the `reset` button on the quota row.

**"Could not parse" on subject library** — `persona/style.md` lost its "Subject description library" heading or its table. The parser is case-insensitive but needs `## Subject description library` to exist.

## What it explicitly does NOT do

- Auto-fetch follower counts (no public APIs without OAuth)
- Auto-post to platforms (TT/IG/YT detect & punish automation)
- Trigger Colab notebooks remotely (Colab has no external trigger)
- Sync between machines (localStorage is browser-local)
- Write back to markdown files (markdown stays hand-edited)

If you need any of these later, ask Claude to extend the dashboard. The current shape is intentional v1.
