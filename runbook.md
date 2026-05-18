# Daily Content Production Runbook

> The point of this document: zero decisions on a posting day. Open the runbook, follow the steps, ship 9 pieces. Decisions happen on Sunday batch-day.

## Sunday — weekly batch (90 min, with me driving)

1. **Review last week's analytics** (`analytics/log.md`)
   - Top-performing post format → multiply
   - Bottom-performing → cut from rotation
   - Follower delta + which platform is fastest growing
2. **Plan 21 source pieces for the coming 7 days** (3/day across pillars)
   - Aim for: 2 library, 2 outfit, 1 tarot, 1 haul, 1 study = 7 unique source pieces (× 3 platform variants each = 21 posts)
3. **Generate all source stills in one Colab session**
   - Open `colab/sdxl_pipeline.ipynb` in Google Colab
   - Connect to free T4 GPU
   - Run all cells; the notebook generates ~50 stills based on the week's prompt plan
   - Download the output zip
   - **Compose for motion:** leave headroom and negative space in stills — image-to-video tools animate that empty space (camera pans, candle flicker, hair movement). Tightly cropped stills produce stiff videos.
4. **Animate stills → source clips** (image-to-video, see `content/video_stack.md`)
   - **Primary: Seedance 2.0** — upload best ~7 stills, prompt camera motion ("slow dolly in", "candle flicker, hair drifts"), 1080p, no watermark, commercial OK. 100 credits/day = ~5 finished clips.
   - **Secondary: Kling AI** — when Seedance motion is too tame, run the same still through Kling for more dramatic camera work. 66 credits/day = ~6 watermarked 5-sec clips (crop watermark in CapCut step).
   - **Backup: Wan 2.2 on Colab** when daily quotas are gone and you still need clips.
   - **Precision-only: LivePortrait / SadTalker** (`colab/video_realistic.ipynb`) — use for talking-head voice posts where Cordelia's lips need to match audio, or for precise face control Seedance can't deliver.
   - Save all source clips to `content/[week]/source/` before editing.
5. **Edit all 7 source videos in one CapCut session**
   - Template: load `templates/dark_academia_master.ccd` (we build this in week 1)
   - Import source clips from step 4, apply colour grade, add text overlay, export at 1080×1920
   - For any Kling clip with a watermark: zoom 5–8% on import to crop it out
6. **Generate 3 platform variants per video**
   - TikTok: native CapCut export, add TikTok-library music
   - IG Reels: same but with IG-trending audio (find via Reel pulse trends)
   - YouTube Shorts: re-render with YT-friendly title card
   - Pinterest: take the strongest still, format as 4:5 idea pin with text overlay
7. **Write 21 captions + hooks** (I generate, you review)
   - Caption template in `prompts/captions.md`
   - Each caption: hook (8 words max), body (1–2 sentences), CTA (vague: "more in bio" not "buy now"), 5–8 hashtags
8. **Schedule the week**
   - Manual post times — see "posting schedule" below
   - Drop all 21 files into `content/2026-MM-DD/` folder, named `[day]_[pillar]_[platform].mp4`

## Daily (15–25 min)

### Morning (08:30 GMT)
1. Open `content/[today's date]/` folder
2. Post **9:00 GMT**: TikTok piece #1
3. Post **9:30 GMT**: IG Reel #1
4. Post **10:00 GMT**: YT Short #1

### Lunch (13:30 GMT)
5. Post **14:00 GMT**: TikTok piece #2 + 2 Pinterest pins
6. Reply to morning comments on all 3 platforms (5–10 min)

### Evening (20:00 GMT)
7. Post **20:30 GMT**: TikTok piece #3
8. Post **21:00 GMT**: IG Reel #2 + YT Short #2
9. Reply to lunch comments + check DMs (10 min)

### Total daily time: ~45–60 min spread across 3 touchpoints.

## Posting schedule (UK time)

| Day | Slot 1 | Slot 2 | Slot 3 | Pinterest |
|---|---|---|---|---|
| Mon | 9:00 | 14:00 | 20:30 | 3 pins evening |
| Tue | 9:00 | 14:00 | 20:30 | 3 pins evening |
| Wed | 9:00 | 14:00 | 20:30 | 3 pins evening |
| Thu | 9:00 | 14:00 | 20:30 | 3 pins evening |
| Fri | 9:00 | 14:00 | 21:00 (later — weekend night) | 3 pins evening |
| Sat | 11:00 | 16:00 | 21:00 | 5 pins evening (best Pinterest day) |
| Sun | 11:00 | 16:00 | 20:30 | 5 pins evening |

## Hashtag bank (rotate, don't repeat day-to-day)

**Primary niche (always include 2–3):**
`#darkacademia #gothicgirl #academicaesthetic #darkacademiaaesthetic #vintageaesthetic #gothicaesthetic`

**Visual mood (1–2):**
`#candlelight #autumnaesthetic #cottagegoth #vintagebooks #aestheticphotography`

**AI disclosure (mandatory):**
`#AI #aiart #aigenerated`

**Format-specific (1–2):**
`#GRWM #aestheticgrwm #darkacademiagrwm` (outfit)
`#tarotreading #tarotcommunity #witchyvibes` (tarot)
`#booktok #bookrecommendations #darkacademiabooks` (books)
`#studywithme #studyaesthetic #darkacademiastudy` (study)

## When something performs unusually well

1. **Within 30 min:** Cross-post the same piece to all platforms if not already done.
2. **Within 4 hours:** Post a follow-up using the same format (e.g., "Tarot card #2 because you all loved the last one").
3. **Within 24 hours:** Save the format. Add to the rotation. Re-use prompt + composition in next week's batch.
4. **Within 7 days:** Find the affiliate/product angle. If "the candle from the library still" got 50K views, the candle gets linked in bio + featured in a haul.

## When something flops

- < 200 views in 6 hours on a TikTok with > 1K followers = algorithmic ding. Stop posting in the same format for the rest of the week.
- 3 flops in a row = the niche is wrong-tuned. Pause batch, re-analyse top 5 posts, pivot the prompt library.
- Don't delete flops — TikTok punishes deletion harder than poor performance.

## Phase milestones to track here

- [ ] Day 1 — handle picked + accounts registered
- [ ] Day 3 — LoRA trained, first 30 character-consistent stills generated
- [ ] Day 7 — first 7 days of posts shipped on schedule
- [ ] Day 14 — 500+ TT followers
- [ ] Day 21 — 1K TT followers, TT Shop affiliate applied
- [ ] Day 30 — first affiliate commission tracked (any amount)
- [ ] Day 45 — Digital Product #1 (Wallpaper Pack) live on Gumroad
- [ ] Day 60 — Amazon Influencer approved, onsite videos uploading
- [ ] Day 75 — first brand-deal DM sent
- [ ] Day 90 — £400+ monthly run-rate confirmed
