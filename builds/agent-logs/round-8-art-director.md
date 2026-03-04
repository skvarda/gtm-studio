# Art Direction — Round 8: The Dialog Box Era

## 1. Color Palette

| Role | Hex | Usage |
|------|-----|-------|
| Dialog Panel BG | `#1a1a2e` | Dark navy, all dialog/menu boxes |
| Dialog Border | `#58b868` | 2px pixel border, green glow feel |
| Dialog Text | `#f5f0e1` | Cream, typewriter text |
| Cursor Arrow | `#58b868` | Menu selection indicator |
| Cursor Flash | `#a8e6a3` | Alternates with cursor green, 400ms blink |
| Disabled/Spent AP | `#555566` | Grayed-out action points in HUD |
| Active AP | `#f4c542` | Gold diamonds in HUD |
| Danger/Low Cash | `#e85d5d` | Cash text when < $50k |
| Game Over Overlay | `#0a0a12` at 85% opacity | Darkens screen behind GO message |

## 2. Pixel Art Notes

All sprites stay 16x16 on a 32px render grid. Dialog box is **not** canvas-drawn — render it as a CSS-styled `div` overlaying the canvas. This keeps text crisp and avoids subpixel blurring. The menu arrow cursor is a 8x8 right-pointing triangle (`▶`), rendered in monospace at the pixel font size. No anti-aliasing anywhere.

## 3. UI & HUD Specs

**Dialog Box**: Fixed to bottom of screen, 90% viewport width, 120px tall, 8px padding inside border. Border is `2px solid #58b868` with a `1px` inner shadow of `#2d6e3a` to fake depth. Text types at **30 characters/sec**. Press Z to instant-complete, then Z again to dismiss.

**Menu Mode**: Options listed vertically, 20px line height. Arrow cursor sits 12px left of text. Up/Down to navigate, Z to confirm. No wrapping — cursor stops at top/bottom.

**HUD Updates**: AP display as 3 small diamond shapes (filled = `#f4c542`, empty = `#555566`). Cash animates down on day-end via a 500ms count-down tick effect. MRR pulses green briefly when it increases.

**Font**: `Press Start 2P` at 10px for dialog, 8px for HUD. Fallback: monospace.

## 4. Animation Priorities

1. **Text typewriter** — non-negotiable, defines the feel
2. **Cursor blink** — 400ms toggle, signals "your turn"
3. **Cash tick-down** — end-of-day drama, numbers rolling like a meter
4. **AP diamond drain** — filled → empty with a brief white flash per spent point
5. *(Low priority)* Co-founder idle head-turn: flip sprite horizontally every 8-12 seconds for 2 seconds, then flip back

## 5. Visual Gag

When cash drops below `$10,000`, the office coffee machine sprite swaps to an empty pot with a tiny pixel sign taped to it: **"HOT WATER ONLY."** Dialog when interacted: types out *"The good beans are gone. This is austerity."* Reverts if MRR pushes cash back above threshold.