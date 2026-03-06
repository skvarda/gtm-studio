# Visual Direction: SaaS Startup Simulator
**Art Director Brief — Round 22**

---

## CSS Color Palette

```css
:root {
  --bg-dark:      #1a1c2c;  /* deep office night */
  --bg-mid:       #2d2b55;  /* wall shadow */
  --floor:        #3a3250;  /* carpet tile */
  --accent-teal:  #38b764;  /* money, growth */
  --accent-red:   #b13e53;  /* burn rate, danger */
  --accent-gold:  #f4c430;  /* milestones, coins */
  --ui-bg:        #0f0f1b;  /* HUD panels */
  --ui-border:    #566c86;  /* panel edges */
  --text-light:   #e8f1ff;  /* primary text */
  --text-dim:     #7a8fa6;  /* secondary labels */
  --hoodie-blue:  #29366f;  /* player sprite */
  --desk-wood:    #8b5e3c;  /* furniture */
  --monitor-glow: #00e5ff;  /* screen light */
}
```

---

## Pixel Art Style

- **Resolution:** 320×224 native, scaled 3× — strict SNES constraints
- **Tile size:** 16×16px. Sprites: 16×24px characters, 3-frame walk cycles
- **Color limit per sprite:** 4 colors + transparency (Mode 7 discipline)
- **Dithering:** checkerboard only — no gradients, ever
- **Perspective:** top-down 3/4. Desks face south. Monitors face player
- **Outline rule:** 1px dark outline on all characters, none on floor tiles

---

## UI / HUD Specs

- **Font:** 8×8 bitmap (Press Start 2P at 8px). No antialiasing
- **HUD strip:** 32px bottom bar — AP pips (filled/empty circles), day label, cash counter
- **Dialog box:** 4-line window, bottom-third overlay, rounded 2px corners, `--ui-border` frame
- **AP pips:** Solid `--accent-gold` when full. Hollow `--ui-border` when spent
- **Menu:** Dark panel, 2px inset shadow, cursor blinks at 4fps

---

## Animation Priorities

1. AP spend: screen flash + coin pop (3 frames, highest priority)
2. Idle: employees bobble heads every 3–5 seconds
3. Day clock icon cycles sun/cloud/moon at day phase changes
4. Cash counter: digits scroll up on gain, red flash on burn

---

## Visual Gag

The mysterious co-founder's monitor displays a spinning beach ball — permanently. Always. Every frame. No exceptions.