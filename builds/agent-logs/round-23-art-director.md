Saved to `/home/gtm/docs/visual-direction-round23.md`. Here's the full doc:

---

# Visual Direction — Round 23: "Make It Feel Alive"

## 1. CSS Color Palette

The palette splits into five functional zones: office environment (warm laminate floors, slate-blue walls), time-of-day tints (amber morning, cool afternoon, orange-red evening), HUD chrome (navy bg, SNES blue borders), feedback floaters (green for product, gold for revenue, white flash), and sprites (phosphor teal monitors, blue hoodie, wood desks).

Key values: `--monitor-on: #40E8C0`, `--ap-pip-full: #58D068`, `--tint-evening: #FF8060`.

## 2. Pixel Art Style Notes

16px tile grid, max 16 colors per sprite sheet, no anti-aliasing. Black outlines on exposed edges only. Checkerboard dithering for desk/floor gradients. Monitors use 2-row scanline dither between `--monitor-on` and `--monitor-flicker`. All movement snaps to whole pixels. Three-frame character cycles maximum.

## 3. UI and HUD Specs

320x32px HUD strip at bottom. 8px monospace font scaled 3x with `image-rendering: pixelated`. AP pips are 8x8px squares. Day phase label ("MORNING / AFTERNOON / EVENING") center-justified and color-matched to the active window tint. Floating text rises 24px over 600ms, fades last 200ms. Screen flash is 80ms white overlay per AP spend.

## 4. Animation Priorities

- **Tier 1:** Co-founder typing bob (800ms), monitor flicker (random 3-8s), AP flash + floater
- **Tier 2:** Player breathing (1px, 2000ms), employee random head turn (4-12s)
- **Tier 3:** Window light shaft slow drift (8s loop)

## 5. Visual Gag

The co-founder's monitor reads: `"COMPILING... 97%"` — permanently. It has been at 97% since Day 1.