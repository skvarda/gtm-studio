# Art Direction — Round 19

## 1. CSS Color Palette (PAL Object)

```javascript
const PAL = {
  bg:        '#1a1a2e',  // deep navy, night-office floor
  wall:      '#2d2d44',  // muted indigo walls
  desk:      '#8b6914',  // warm oak desks
  deskHi:    '#a07818',  // desk highlight edge
  monitor:   '#0f380f',  // dark green CRT off-state
  monGlow:   '#9bbc0f',  // green CRT glow (Game Boy nod)
  skin:      '#f8d8b0',  // character skin tone
  hoodie:    '#3a7ecf',  // player hoodie blue
  cofounder: '#5b5b7b',  // co-founder grey sweater
  hair:      '#2a1f14',  // dark brown hair
  cash:      '#44e844',  // HUD cash green
  burn:      '#e84444',  // HUD burn red
  text:      '#e8e8e8',  // primary UI text
  textDim:   '#7a7a8a',  // secondary/disabled text
  tile:      '#252540',  // floor tile base
  tileLt:    '#2e2e4e',  // floor tile alternate (checkerboard)
  hud:       '#12122a',  // HUD bar background
  hudBorder: '#3a3a5e',  // HUD border line
  vIPO:      '#ffd700',  // victory tint — IPO Glory (gold)
  vPr:       '#44e844',  // victory tint — Profit Machine (green)
  vRD:       '#00bfff',  // victory tint — R&D Utopia (cyan)
  vWd:       '#e84444',  // victory tint — World Domination (red)
  purpleMon: '#9b59b6',  // easter egg second monitor flicker
  save:      '#f0c040',  // save icon floppy disk color
};
```

## 2. Pixel Art Style Notes

All sprites on an **8×8 base grid**, characters 8×12. Two-frame idle animations only (breathe cycle). No anti-aliasing — hard pixel edges, 1px outlines in `#000` or nearest dark neighbor. Employee sprites offset by `index * 1px` on X to prevent desk stacking. Co-founder's second monitor is a 4×3 px rectangle using `purpleMon`, toggling brightness every 30 frames after Day 15.

## 3. UI / HUD Specs

Top HUD bar: 2px tall `hudBorder` line, `hud` fill. Font: system monospace at 8px equivalent (rendered via `ctx.font = '8px monospace'`). Day counter left-aligned, cash center, burn rate right. Save icon: 4×4 floppy in `save` color, top-right corner, flashes for 45 frames on auto-save. Victory overlay: full-screen rect at 40% opacity using path tint color, stats box centered (120×80 px), text revealed line-by-line at 12-frame intervals.

## 4. Animation Priorities

1. **Victory overlay fade** — 60-frame alpha ramp from 0 to 0.4, then stats box appears
2. **Save icon flash** — 4×4 floppy blinks 3 times over 45 frames
3. **Purple monitor flicker** — alternates `purpleMon` / `#7b3f9b` every 30 frames
4. **Player walk cycle** — existing 2-frame swap (keep as-is)

## 5. Visual Gag: The Purple Monitor

After Day 15 the co-founder's desk sprouts a second tiny monitor glowing purple. If the player interacts, the screen briefly shows `"> WORLD.EXE"` in `monGlow` text on the purple background — then the co-founder turns away. One-time trigger. It's small, weird, and exactly on-brand.