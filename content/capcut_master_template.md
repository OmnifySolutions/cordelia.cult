# CapCut Master Template — build once, reuse forever

> Build this template in CapCut Desktop, save as `dark_academia_master.ccd`, then drop new clips into it weekly. The colour grade + fonts + watermark + transitions are the brand's visual moat. Every video must look like it came from the same camera, the same room, the same week.

## 1. Project settings

- **Resolution:** 1080 × 1920 (9:16 vertical) — base export for TikTok / IG Reels / YT Shorts
- **Frame rate:** 30 fps
- **Aspect-ratio variants:** save additional export presets for 4:5 (1080 × 1350) Pinterest idea pin + 1:1 (1080 × 1080) IG carousel still
- **Project length:** start with a 10-sec timeline; vary 6–15 sec per piece. Cordelia's best-performing pillar is "slow burn" — don't rush.

## 2. Colour grade — exact values

In CapCut: select clip → *Adjust* tab. Apply these in order:

| Adjust | Value | Note |
|---|---|---|
| Exposure | −0.5 | Pull blacks darker |
| Contrast | +12 | Adds chiaroscuro |
| Highlights | −10 | Preserve candle warmth, prevent blowout |
| Shadows | −20 | Sink the cool-tone shadows |
| White | −5 | |
| Black | −15 | Deep shadow pools |
| Saturation | −18 | Desaturated overall |
| Vibrance | +8 | Keep amber pop |
| Sharpness | +10 | Subtle detail in lace/parchment |
| Temperature | −8 | Cool the midtones (teal shadows) |
| Tint | +4 | Faint magenta to balance |

Then *Adjust > HSL*:

| Hue | Saturation | Luminance | Note |
|---|---|---|---|
| Red | −5 | +5 | Skin warmth preserved |
| Orange (skin) | −3 | +3 | Candlelight on skin amber-leaning |
| Yellow (candles) | +5 | +8 | Push warmth in flame |
| Green | −10 | −5 | Suppress modern green tints |
| Aqua | −15 | −10 | Suppress digital cyan |
| Blue (shadows) | −8 | −12 | Deep teal shadow lock |
| Purple | +5 | 0 | Faintly enriches velvet |
| Magenta | 0 | 0 | Leave alone |

Save this combination as a **custom preset** named `cordelia_grade_v1` so you apply it to every clip with one click.

## 3. Film grain + vignette

- **Film grain:** Effects → *Vintage* → *Film Grain 35mm* → intensity 35–40%
- **Vignette:** Effects → *Basic* → *Vignette* → size 0.6, feather 0.5, opacity 30% (very subtle)
- **Skip:** any retro-VHS, glitch, "Cinematic" presets that introduce light leaks. Keep grain organic, vignette small.

## 4. Typography — text-on-screen

CapCut → *Text* → *Add Text*

**Body / caption text:**
- Font: **EB Garamond** (if not present in CapCut: download from Google Fonts → install on Windows → restart CapCut; or use *Garamond* / *Cormorant Garamond* as a fallback)
- Style: Italic
- Size: 32–40 (depending on length)
- Colour: `#f1ead6` (warm cream — match the brand palette)
- Drop shadow: opacity 30%, blur 6, x +2, y +2
- Stroke: none
- Background: none (legibility comes from the drop shadow + film grain texture, not a hard box)

**Hook text (first 0–2 sec):**
- Font: **EB Garamond Bold Italic**
- Size: 48–56
- Colour: `#f1ead6`
- Same drop shadow
- Position: lower-third for hooks, dead-centre for reveal text

**Animation:**
- Hook text: *typewriter* reveal at 12 chars/sec
- Body text: *fade-in* (200 ms), no exit animation — let it sit on the frame
- Avoid: bounce, swing, slide-right, anything kinetic. The brand is *slow*.

## 5. Watermark

Bottom-left corner of every export:

- Text: `@cordelia.cult · AI`
- Font: EB Garamond Italic 18pt
- Colour: `#f1ead6`
- Opacity: 70%
- Position: bottom-left, 32 px in from edges
- Drop shadow: opacity 30%, blur 4

Save the watermark as a **custom text style** named `watermark_brand` so it's one click per export.

## 6. Transitions

- **Between cuts in same clip:** no transition — hard cut. The slow pace doesn't need crossfades.
- **Scene-to-scene (rare):** *Fade* — 500 ms only.
- **Strict no:** zoom, swipe, push, glitch, 3D-cube, any pre-2018 wedding-video transition. They break the period feel.

## 7. Music

Three legal sources, in order of preference:

1. **TikTok Commercial Music Library** (only when uploading natively to TikTok — boosts reach because TT favours music from its own library). Browse → filter by *Cinematic / Classical / Ambient*. Save 5 go-to tracks to your favourites.
2. **Uppbeat free tier** (uppbeat.io) — 10 downloads/month free. Filter: *Cinematic*, *Classical*, *Mood: Mysterious / Dark*. Acceptable for IG and YouTube; attribution required (one-line credit in caption).
3. **CapCut royalty-free library** — built-in, no attribution needed. Lowest quality of the three but functional for filler.

**Avoid:** trending TT songs (algorithmic spike but breaks the genre + attribution paperwork). Pop. Anything with vocals in English unless it's a deliberate moment.

**Recommended Uppbeat tracks for the brand** (verify availability before download):
- "Whispered Halls" — slow piano
- "October Hymn" — strings + ambient
- "Wintergreen Lament" — solo cello

## 8. Sound effects

Subtle, optional, free from CapCut library:

- **Candle flicker** — overlay at 15% volume under quiet B-roll
- **Page turn** — when a book is opened
- **Quill scratch** — under writing-letter scenes
- **Distant church bell** — once per video, max

Avoid: ASMR-style heavy breathing, exaggerated mouth sounds, any sound effect that would feel out of place in a 19th-century novel.

## 9. Export presets (build all three once)

### TikTok / IG Reels / YT Shorts (vertical)
- Resolution: 1080 × 1920
- Frame rate: 30 fps
- Bitrate: 8 Mbps
- Codec: H.264, AAC audio
- Watermark: on
- Filename: `YYYY-MM-DD_[pillar]_vertical.mp4`

### Pinterest idea pin (4:5)
- Resolution: 1080 × 1350
- Frame rate: 30 fps
- Bitrate: 6 Mbps
- Watermark: on
- Filename: `YYYY-MM-DD_[pillar]_pinterest.mp4`

### IG carousel still (1:1)
- Resolution: 1080 × 1080
- Single frame export (PNG)
- Watermark: on
- Filename: `YYYY-MM-DD_[pillar]_square.png`

## 10. Build sequence (do once)

1. Open CapCut Desktop → new project at 1080×1920 / 30fps
2. Drop a placeholder clip onto the timeline
3. Apply `cordelia_grade_v1` preset
4. Add film grain + vignette as above
5. Add a placeholder text in EB Garamond italic with the brand drop shadow
6. Add the watermark in bottom-left as `watermark_brand`
7. Save the project as `dark_academia_master.ccd` in `templates/` folder
8. Duplicate it weekly: *File → Save As* → `2026-MM-DD_week_N.ccd`

Once built, weekly batches take ~30 min instead of ~3 hrs — the grade, fonts, watermark all carry over from the duplicate.

## 11. Quality-control checklist (before posting)

- [ ] Shadows are teal, not grey or blue
- [ ] Candle warmth is preserved (amber, not yellow)
- [ ] Skin is not over-orange (the orange-saturation slider is sneaky)
- [ ] Film grain is visible but not crunchy
- [ ] Watermark is in bottom-left, not centred, not huge
- [ ] Text uses EB Garamond italic, not the default sans
- [ ] No glitch / swipe / zoom transitions
- [ ] Watermark says `@cordelia.cult · AI`, not the placeholder text
- [ ] Audio levels: music at −12 dB to −18 dB; voiceover (if any) at −6 dB
- [ ] Final file < 50 MB (TikTok cap is 287 MB but smaller files upload faster)
