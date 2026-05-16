# CLAUDE.md — Project context for future sessions

This is a solo operator building an AI **dark academia / gothic** aesthetic persona account, monetised via stacked affiliate (TikTok Shop UK + Amazon UK Influencer + ShareASale/Awin alt brands), digital products on Gumroad, and brand deals at 10K+ followers.

**Approved plan:** `C:\Users\Daryll\.claude\plans\2-i-heard-about-pure-lovelace.md`

## Current state — SUSPENDED 2026-05-16 (updated same day)

Phase 0 in progress. Pick up at "Resume checklist" below.

- **Phase:** 0 (build the persona)
- **Handle:** `@cordelia.cult` ✅ registered on all 5 platforms (per user, 2026-05-15)
- **Persona name:** `Cordelia Vale`
- **Audience nickname:** `the cult`
- **Accounts:** ✅ all 5 platforms + Linktree live
- **Colab batch:** 🔄 RAN on 2026-05-16 — 120 stills generating. User will handpick 30 when done.
- **LoRA:** ⏸️ not yet trained — waiting on the 30 picks
- **GH Pages site:** ✅ **LIVE** at `https://OmnifySolutions.github.io/cordelia.cult`
- **Folder rename** (`OF Girl #1` → `cordelia.cult`): ⏸️ still pending, manual via File Explorer when Claude is closed

### What was built this session (2026-05-16)

- **CLIP token fix** — `colab/sdxl_pipeline.ipynb` Cell 5 reordered: quality boosters + character descriptors now lead the prompt so they survive the 77-token CLIP limit. Aesthetic tail is what gets trimmed, not the face/quality terms.
- **`colab/video_realistic.ipynb`** — Section A: LivePortrait (animates any Cordelia still with realistic blinks/head movement, no audio). Section B: SadTalker (lip-syncs Cordelia to Edge TTS WAV for 1-in-5 voice posts). Both run on free T4.
- **`colab/video_animated.ipynb`** — AnimateDiff text-to-video. Generates atmospheric ~2-second clips from prompts. Includes motion LoRA options (zoom-in, pan, tilt). Use for artistic/B-roll variety posts.
- **Plan updated** — `C:\Users\Daryll\.claude\plans\2-i-heard-about-pure-lovelace.md` now lists all three Colab notebooks.

### Colab notebook fixes — /simplify pass (2026-05-16)

- **`sdxl_pipeline.ipynb`** — `enable_attention_slicing(1)` in xformers fallback (was `()`, risked OOM at 832×1216); `torch.Generator` moved outside generation loops (was creating 120 CUDA allocations); `torch.cuda.empty_cache()` added after each scene block.
- **`video_animated.ipynb`** — `enable_attention_slicing(1)` (auto-heuristic unreliable for 16-frame batches); `BASE` split into `QUALITY_BASE` + `CHARACTER` so b-roll/no-face scenes don't inherit character descriptors but still share quality terms; `torch.Generator` moved outside loop; `del output` + `del frames` + `torch.cuda.empty_cache()` added after each clip.
- **`video_realistic.ipynb`** — Collapsed single-image cell (A3) and batch cell (A4) into one cell with `SOURCE_OVERRIDE = None`; output confirmed via glob rather than assumed filename.

### Confirmed decisions (do not re-litigate)
- **Video style = photorealism.** Cordelia is meant to feel like a real person (with AI disclosure). AnimateDiff is secondary/variety only. Primary pipeline: LivePortrait for standard posts, SadTalker for voice posts.
- **AnimateDiff is NOT image-to-video** — it generates fresh clips from text prompts. LivePortrait IS image-to-video (takes existing stills).

## Fixed decisions (don't re-litigate)
- **Niche:** alt / gothic / dark academia. Not fitness, not anime, not cottagecore.
- **Country / monetisation rails:** UK/EU. TikTok Shop UK affiliate (1K gate). Amazon UK Associates + Influencer.
- **Voice strategy:** hybrid — text-on-screen on most posts, voice (Edge TTS or XTTS-v2) on 1-in-5 tentpole posts.
- **Compute:** free Google Colab T4 + Civitai free LoRA trainer. Local GTX 1660 Super for upscaling + ops only.
- **Image stack:** SDXL Pony Realism (or Juggernaut XL) + custom character LoRA. Not Flux — too heavy for free Colab + bad at niche.
- **Disclosure:** every realistic AI face/voice gets `#AI` + bio disclosure. Non-negotiable for TikTok 2026 / Meta rules.
- **Cross-post targets:** TikTok (primary) + IG Reels + YouTube Shorts + Pinterest (long-tail SEO).

## Hard rules (user feedback — see global memory)
- **Never recommend freelance / service work.** Was explicitly rejected.
- **Always lead with one confident pick + defend it.** No menus of options.
- **No guru-flavoured promises.** Honest median > optimistic outlier.
- **Push back on weak premises** (e.g., the "Texas student / Maya / OnlyFans" myth was corrected — well received).

## Key targets
- **Day 21:** 1K TikTok followers → TT Shop affiliate live.
- **Day 30:** first commission tracked anywhere (£20–£100 cumulative).
- **Day 60:** £150–£500/mo run-rate, 5K–12K TT.
- **Day 90:** £400–£1.5K/mo, 10K–25K TT, brand outreach starts.
- **Day 180:** £1.5K–£4K/mo + reinvest into used RTX 3090.

## File map
- `persona/bible.md` — name, backstory, voice, pillars, hard-no list
- `persona/style.md` — visual signature (colour grade, prompt template, recurring props)
- `persona/handles.md` — handle shortlist + availability status
- `prompts/{library,forest,tarot,outfit,study,books}.md` — prompt libraries per content pillar
- `colab/sdxl_pipeline.ipynb` — image generation notebook (SDXL Juggernaut XL). CLIP fix applied 2026-05-16.
- `colab/video_realistic.ipynb` — LivePortrait (face animation) + SadTalker (lip sync). Primary video pipeline.
- `colab/video_animated.ipynb` — AnimateDiff text-to-video. Secondary/artistic/B-roll.
- `runbook.md` — daily content production workflow
- `affiliate/programs.md` — tracker for every affiliate program (status, login, commission)
- `outreach/brand_template.md` — DM template for brand deals
- `analytics/log.md` — weekly numbers + decisions

## Resume checklist — pick up here next session

### Two parallel tracks, do in either order

### Track A — Content pipeline (user-driven)

These are all USER actions. Claude can't run Colab or click Civitai.

1. **Colab run** ✅ RUNNING on 2026-05-16 — 120 stills generating via `colab/sdxl_pipeline.ipynb`.
2. **Pick 30** ⏸️ NEXT — when zip downloads, scrub locally, move the 30 most-consistent images (same face/hair/build) into a `picks/` subfolder. Upload `picks/` to Google Drive at `MyDrive/cordelia_picks/`.
3. **LoRA training** (~1 hr) — upload the 30 picks to `civitai.com/training` → free quota → download the resulting `.safetensors` → drop in Google Drive.
4. **Ping Claude:** "LoRA done, wire it in" → Claude edits Cell 4 of `sdxl_pipeline.ipynb` + wires LoRA into `video_realistic.ipynb` + writes Week 1's content batch.

### Track B — GitHub Pages push ✅ DONE 2026-05-16

- Repo: `github.com/OmnifySolutions/cordelia.cult`
- Live URL: `https://OmnifySolutions.github.io/cordelia.cult`
- Pages source: `main` branch / `(root)`

### Track C — Pre-baked content (✅ done 2026-05-16)

5. ✅ **Week 1 caption library** — 21 captions across 7 source videos × 3 platforms (TT / IG / YT) → `content/week_01/captions.md`. Pillars: 2 library, 2 GRWM, 1 tarot, 1 haul, 1 book rec. Includes 10 reusable hook archetypes for Week 2+.
6. ✅ **Pinterest seed list** — 30 affiliate-ready pin titles + descriptions + Amazon UK URL templates across 6 categories (candles, books, stationery, tarot, decor, apparel). 8 boards specced. → `content/pinterest_seed.md`. Replace `tag=XXXX-21` with your Associates ID once approved.
7. ✅ **Newsletter drafts** — welcome auto-email + Dispatches №1–3 (Hermit, High Priestess, Empress sequence) → `content/newsletter/{welcome,dispatch_01,dispatch_02,dispatch_03}.md`. Paste-ready into Beehiiv.
8. ✅ **CapCut master template spec** — exact HSL values + EB Garamond setup + watermark + export presets + QC checklist → `content/capcut_master_template.md`. Build once, save as `dark_academia_master.ccd`, duplicate weekly.

### Phase 1 ignition (after A + B + C are all done)

9. Claude generates Week 1's 7 source video pieces using the trained LoRA.
10. **USER:** edit in CapCut from the master template (one-time build, then re-use).
11. **USER:** post per `runbook.md` schedule. Phase 1 live; track in `analytics/log.md`.

### Backlog / decisions for later

- **Folder rename** (`OF Girl #1` → `cordelia.cult`): manual via File Explorer when Claude is closed.
- **Custom domain:** buy `cordelia.cult` (~£8/yr) or `cordeliavale.com` after first digital product ships (~day 45). DNS recipe in `gh-pages/README.md`.
- **TT Shop affiliate:** apply day 14–21 when TT follower count approaches 1K.
- **Awin niche-brand requests:** Killstar, Hell Bunny, Disturbia etc — only after Awin base account is approved.
