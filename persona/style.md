# Style Guide — visual + prompt signature

## Colour grade (apply to every image)

- **Shadows:** cool teal-black (#0a1218), never pure black
- **Midtones:** desaturated, slight green-grey cast
- **Highlights:** warm amber (candlelight, #d4a76a) — preserved bright
- **Saturation:** −20% global, +10% on warm tones only
- **Grain:** light film grain (35mm equivalent), applied in CapCut "Vintage Film" preset at 40% strength

## Composition rules

- **Aspect ratios:** generate native 1024×1536 (2:3 portrait) in SDXL. Resize to 9:16 (1080×1920) for TikTok / Reels / Shorts. Use 4:5 crop for Pinterest. 1:1 square for IG static carousels.
- **Subject framing:** rule-of-thirds, never centred. Eyes on upper-third line.
- **Negative space:** lots of it. Empty corner with single object (candleholder, raven feather) is the signature beat.
- **Depth of field:** always shallow (f/1.4–f/2.0 equivalent). Background bokeh = brand.
- **Light direction:** single source from window or candle, never multi-source.

## Master positive prompt (SDXL Pony Realism)

```
score_9, score_8_up, score_7_up, source_photo, masterpiece, best quality, 
[SUBJECT DESCRIPTION], 
22 year old woman, fair skin, long dark wavy hair, gentle melancholic expression, 
gothic dark academia fashion, victorian-inspired clothing, lace high collar, silver locket, 
candlelit interior, warm amber highlights, cool teal shadows, deep chiaroscuro lighting, 
shallow depth of field, bokeh background, vermeer interior, painterly atmosphere, 
35mm film grain, desaturated colour grade, autumn mood, vintage academia aesthetic, 
<lora:[CHARACTER_LORA]:0.85> <lora:dark_academia_v3:0.4>
```

## Master negative prompt

```
score_4, score_5, score_6, source_anime, source_cartoon, 3d, plastic skin, 
bright colours, neon, saturated, overexposed, harsh shadows, modern clothing, 
streetwear, sportswear, athleisure, smiling teeth, glasses (unless prompted), 
multiple light sources, fluorescent lighting, sunlight on face, beach, summer, 
text, watermark, signature, blurry, low quality, deformed hands, deformed eyes, 
two heads, extra limbs, asymmetric face
```

> Subject description is the only field that changes per image. Everything else stays locked.

## Subject description library

| Pillar | Subject prompt |
|---|---|
| Library | `sitting at antique wooden desk, leather-bound book open, brass three-arm candleholder, stained glass window behind, reading pose, fingers tracing text` |
| Forest | `walking through misty autumn woodland, fallen leaves, hooded velvet cloak, single candle lantern, dusk light through bare branches, contemplative` |
| Tarot | `holding single tarot card up to candlelight, smith-waite deck, silver rings, dramatic shadow, ace of swords visible, ritual table with crystals` |
| Outfit (GRWM) | `full-body shot, gothic victorian dress, lace high collar, corset detail, dark velvet, standing by tall window, mirror reflection partial, getting ready` |
| Study | `close-up of journal page, fountain pen mid-stroke, ink stains, dried pressed flowers, hands only (no face), warm desk lamp, tarot card as bookmark` |
| Books | `stack of leather-bound books on velvet cloth, single candle, raven feather quill, no person, top-down 45-degree angle, autumn leaves scattered` |
| Church | `seated in empty gothic church pew, candle in hand, stained glass casting coloured light on face, contemplative, hands folded, single shaft of warm light` |
| Bedroom | `seated on canopy bed with velvet curtains, surrounded by books and candles, reading in nightgown, dim warm lamp, cat curled on coverlet` |

## Typography (text-on-screen)

- **Body text:** EB Garamond Italic 32pt, off-white (#f1ead6), drop shadow at 30% opacity
- **Hook text:** EB Garamond Bold 48pt, same colour
- **Caption position:** lower-third for hooks, centre for reveal text
- **Animation:** typewriter reveal at 12 chars/sec for hooks; static for body
- **Never use:** sans-serif fonts, all-caps, emojis in the text overlay itself

## Consistency tests (run weekly)

1. Generate 5 fresh images from 5 different prompts. Do they all read as the same character? If <4/5, retrain LoRA.
2. Print 4 random posts from the last 7 days side-by-side. Is the colour grade identical? If not, fix CapCut preset.
3. View IG grid as a thumbnail. Is the colour palette coherent left-to-right? If a single post stands out, replace it.
