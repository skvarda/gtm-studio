# Visual Direction — Round 7

## 1. CSS Color Palette

```
--floor-light:    #c8b89a    /* worn carpet tan */
--floor-dark:     #a89878    /* carpet shadow */
--wall-base:      #e8dcc8    /* drywall beige */
--wall-trim:      #786858    /* baseboard brown */
--desk-top:       #b0a090    /* laminate gray-tan */
--desk-shadow:    #787068    /* furniture dark */
--monitor-shell:  #404048    /* CRT housing */
--monitor-glow:   #58b868    /* terminal green */
--player-hoodie:  #4868a8    /* startup blue */
--player-skin:    #e8b888    /* skin tone */
--player-hair:    #483828    /* dark brown */
--cofounder-shirt:#689068    /* olive mystery */
--ui-bg:          #181820    /* HUD background */
--ui-text:        #e8e0d0    /* HUD text cream */
--ui-accent:      #d8a830    /* gold highlight */
--ui-danger:      #c04040    /* burn rate red */
```

## 2. Pixel Art Style Notes

32x32 tiles, 16x16 character sprites scaled 2x. Max 15 colors per sprite sheet. Black outlines 1px only on exterior edges — interior detail uses adjacent darker hues, never black. Top-down 3/4 perspective: tops of desks visible, fronts of monitors visible. Dithering for shadows — checkerboard pattern only, no gradients. Walls are 2 tiles tall: lower tile is baseboard, upper is flat drywall. Floor uses a 2-tile alternating pattern for worn carpet texture.

## 3. UI & HUD Specs

HUD bar pinned to screen bottom, 32px tall, `--ui-bg` with 1px `--ui-accent` top border. Display: `$CASH` left-aligned, `MONTH X` centered, `BURN: $X/mo` right-aligned in `--ui-danger`. Font: system monospace rendered to canvas at 8px, scaled 2x for crispness. No anti-aliasing. Menu boxes use single-pixel `--ui-accent` borders with 4px padding.

## 4. Animation Priorities

1. **Player walk cycle** — 2 frames per direction (stand/step), 150ms per frame. Tile-to-tile movement takes 180ms lerp.
2. **Monitor flicker** — `--monitor-glow` alternates opacity 90%-100% every 500ms on co-founder's screen.
3. **Co-founder idle** — single subtle frame swap every 3 seconds (slight head shift). He's "working."

## 5. Easter Egg

The co-founder's monitor, if the player walks behind his desk and faces it, shows a 4x3 pixel art of *Solitaire*. He's been playing cards the entire time. The screen content is baked into the sprite sheet — no special rendering needed. Just swap his desk tile to a variant when the player occupies the "behind desk" tile facing down.