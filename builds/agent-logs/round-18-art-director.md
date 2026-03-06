# Art Direction — Round 18

## 1. CSS Color Palette (PAL Object)

```
BG_DARK:    #1a1a2e   (office floor, dark UI panels)
BG_MID:     #16213e   (desk surfaces, mid-tone fills)
BG_LIGHT:   #0f3460   (window sky, lighter accents)
WALL:       #533483   (office walls)
SKIN:       #f5c6a0   (character skin tone)
HOODIE:     #e94560   (player hoodie, brand red)
COFOUND:    #4a4a68   (co-founder jacket, muted gray-purple)
HAIR_DARK:  #2b2b3d   (dark hair)
MONITOR_ON: #a8e6cf   (active screen glow)
MONITOR_PR: #9b59b6   (purple monitor easter egg flicker)
CASH_GOLD:  #ffd700   (cash text, gold UI highlights)
TEXT_WHITE:  #eaeaea   (primary text)
TEXT_DIM:    #7a7a8e   (secondary/flavor text)
```

**Victory tint overlays** (drawn as full-screen rect, alpha 0.35):
- IPO Glory: `#ffd700` (gold wash)
- Profit Machine: `#27ae60` (green wash)
- R&D Utopia: `#3498db` (blue wash)
- World Domination: `#c0392b` (red wash)

## 2. Sprite & Tile Notes

All sprites on 16px grid, 320×224 native canvas scaled 3×. No anti-aliasing — `imageSmoothingEnabled = false`. Max 4 colors per sprite (SNES constraint). Characters are 8×14px drawn into 16px cells. **Co-founder standing sprite**: same seated body, shift torso up 2px, remove chair pixels, add 2px legs. Reuse existing head/hair exactly.

**Employee X-offset**: each hired NPC gets `baseX + (i * 1)` pixel offset to prevent stacking.

## 3. UI / HUD

Top bar: 8px tall strip in `BG_DARK`, 1px `WALL` bottom border. Left-aligned: `DAY XX` in `TEXT_WHITE`. Right-aligned: `$XX,XXX` in `CASH_GOLD`. Font: canvas `fillText` at 7px, all-caps, no smoothing. Save icon: 3×4px floppy disk shape, flashes `CASH_GOLD` for 20 frames on auto-save.

**Victory stats box**: centered 140×90px rect, `BG_DARK` fill, 1px `TEXT_WHITE` border. Title line in victory tint color. Stats reveal line-by-line, 30-frame delay each. "NEW GAME" prompt blinks at bottom.

## 4. Animation Priorities

1. Victory overlay fade-in (alpha 0→0.35 over 40 frames)
2. Co-founder stand-up (2-frame swap: seated→standing)
3. Stats box line reveal (sequential text draw)
4. Save icon flash (on/off toggle, 4 frames each, 5 cycles)
5. Purple monitor flicker (alternate `MONITOR_ON`/`MONITOR_PR` every 30 frames)

## 5. Visual Gag: Purple Monitor

After Day 15, co-founder's desk gains a second 5×4px monitor block. It flickers between green and purple. On interact, the screen zooms to a 2px-art rendition of *the game itself* inside the monitor — just a colored rectangle with a tiny blinking cursor. Three frames of "recursion" before the dialog box fires.