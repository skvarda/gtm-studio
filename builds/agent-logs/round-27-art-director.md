# Visual Direction — Round 27: "Sound & Scanlines"

## CSS Color Palette

```
Background (deep office dark):  #1a1c2c
Floor tile base:                #3d3d3d
Floor tile accent:              #2e2e2e
Wall upper:                     #4a3728
Wall trim:                      #6b4c35
Desk wood:                      #8b6914
Monitor glow (idle):            #0a7a3e
Monitor glow (active):          #00ff7f
UI panel bg:                    #16213e
UI border:                      #4fc3f7
UI border highlight:            #ffffff
Text primary:                   #e8e8e8
Text secondary:                 #a0a0b0
Cash green:                     #00e676
Danger red:                     #ff1744
HUD bar fill:                   #ffd600
CRT vignette:                   rgba(0,0,0,0.45)
Scanline stripe:                rgba(0,0,0,0.18)
```

## Pixel Art Style

16px tile grid, SNES 3/4 top-down. Sprites use 3-shade rule: shadow, midtone, highlight. No anti-aliasing — nearest-neighbor scaling only. Characters are 16x24px standing, 2-frame walk cycle. Desks face south. Monitors emit a soft 1px green bloom halo drawn as a second pass at reduced alpha.

## UI & HUD

Menu panels: solid fill with 1px border, pixel-font (Press Start 2P or fallback monospace). HUD anchored top-left: Day counter, AP pips (filled circle / empty circle, 8px each), Cash display. Mute indicator: small speaker icon top-right, crossed when muted — 8x8px sprite drawn in canvas.

## Animation Priorities

1. Monitor flicker on dialog open (2-frame alternating glow)
2. AP pip "pop" scale effect when spent
3. Hire event: coin particle burst, 4 frames, 3 coins arcing up then gravity

## Easter Egg

The co-founder's monitor displays a slowly scrolling green ticker. Look closely at the hex dump — it spells `HELPME` in ASCII, one character per day. Nobody mentions it.