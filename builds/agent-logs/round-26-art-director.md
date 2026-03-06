# Visual Direction — Round 26: Opening Experience

## CSS Color Palette

```
--bg-dark:        #1a1a2e   /* deep navy, UI chrome background */
--bg-panel:       #16213e   /* dialog/panel fills */
--panel-border:   #e94560   /* hot pink accent, all panel borders */
--text-primary:   #eaeaea   /* near-white body text */
--text-highlight: #f5a623   /* amber — selected options, player name */
--text-dim:       #6c7a8a   /* muted — flavor text, stats */
--cursor-blink:   #ffffff   /* name entry cursor */
--class-seller:   #e94560   /* red-pink — Seller card accent */
--class-dev:      #0f9b8e   /* teal — Dev card accent */
--class-marketer: #f5a623   /* amber — Marketer card accent */
--darren-sprite:  #7c5cbf   /* purple hoodie, Darren's signature color */
--player-sprite:  #3a86ff   /* blue hoodie, player character */
--scanline:       rgba(0,0,0,0.12) /* CSS scanline overlay */
```

## Pixel Art Style Notes

All sprites: 16×16 base units, 3× scaled. Characters use 5-color palettes (shadow, base, highlight, skin, accent). Darren gets a slightly rumpled look — collar up, arms crossed. Name entry screen tiles: dark brick wall texture, one motivational poster on the wall reading "SHIP IT." Class cards use 24×24 class-icon sprites inside the panel.

## UI & HUD Specs

- Font: Press Start 2P (Google Fonts) at 8px / 16px / 24px — no intermediate sizes
- All panels: 2px solid border, `--panel-border` color, no border-radius
- Dialog boxes: bottom-anchored, 3-line max visible, triangle advance indicator bottom-right
- Name entry: underscore cursor blinks at 500ms interval
- Class selection: three cards side-by-side, selected card border pulses, stats in 8px font

## Animation Priorities

1. Name entry cursor blink (CSS `animation: blink 0.5s step-end infinite`)
2. Darren idle: 2-frame shuffle, 800ms loop — slight weight shift
3. Class card hover: 2px upward translate, border color brightens
4. Scene transition: horizontal wipe left-to-right, 300ms

## Visual Gag

Darren's office chair has a **tiny diploma** pinned to the back. The text reads *"MBA, Online, 6 Weeks."* Visible for exactly one scene frame before the dialog box covers it. No tooltip. No acknowledgment.