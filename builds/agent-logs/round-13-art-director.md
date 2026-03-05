# Round 13 — Visual Direction Document

## 1. CSS Color Palette

| Token | Hex | Use |
|-------|-----|-----|
| `bg-dark` | `#1a1a2e` | Night/deep UI backgrounds |
| `bg-mid` | `#16213e` | Office floor, panels |
| `bg-light` | `#0f3460` | Whiteboard surface, modals |
| `white` | `#e8e8e8` | Text, whiteboard border (never pure white) |
| `green-cash` | `#53a653` | Revenue, customer gain flash, positive events |
| `red-churn` | `#c0392b` | Churn flash, burn warnings, storm clouds |
| `gold-mile` | `#f1c40f` | Milestone banners, "First Dollar" coin |
| `blue-morale` | `#5dade2` | Morale bar fill, speech bubble outline |
| `pink-heart` | `#e74c8c` | Happy-employee heart bubble |
| `sticky-yellow` | `#f9e547` | "Default Alive" sticky note |
| `skin` | `#f5c6a0` | Character faces (single shade, no sub-pixel shading) |

Carry forward all Round 12 palette tokens unchanged. These extend, not replace.

## 2. Sprite & Tile Notes

**Customer board icons**: 4×4 px, one solid color + 1px darker outline. Shapes only — square for enterprise, circle for SMB, triangle for dev-tool buyer. On churn, swap to `red-churn` for 6 frames then delete. On acquire, pop in at 120% scale for 3 frames then settle.

**Morale bubbles**: 7×7 px, drawn above employee head. Heart (2 frames: appear/gone), storm cloud (static single frame, 3 grey pixels stacked), code bracket `</>` (static). Only one bubble type visible per employee at a time. No floating animation — SNES didn't waste cycles.

**"Default Alive" sticky**: 12×10 px, placed on office wall at Ramen Profitable. Hand-lettered look via 1px irregular font. `sticky-yellow` fill, 1px `#b8a030` shadow on bottom/right edge.

## 3. UI / HUD Specs

- Font: existing pixel font, 8px. Milestone toast: 10px bold variant, centered, `gold-mile` text on `bg-dark` pill with 1px white border.
- Customer count moves from raw number to a mini-bar: 48×6 px, `green-cash` fill, tick marks at milestone thresholds (1, ramen, PMF).
- Morale per-employee: no HUD bar. Visible only via sprite bubbles. Team-average morale shows on hover/inspect of the coffee machine (keeps HUD clean).

## 4. Animation Priorities

1. **Churn flash** — most important feedback. Red overlay on lost customer icon, 6-frame fade-out.
2. **Milestone toast** — slide down from top, hold 90 frames, slide up. No bounce.
3. **Morale bubble pop-in** — 2 frames (0% → 100%). Stays for 120 frames, then gone. Cycles every ~10 seconds per employee.
4. **Ramen Profitable light shift** — darken `bg-mid` by one step *before* milestone, brighten to normal *at* milestone. Player feels it without knowing why.

Skip: employee walk-cycle changes for morale, customer board scroll animation. Not worth the frame budget.

## 5. Easter Egg

When the player reaches exactly **$0 cash** but has 1+ customers (the "Schrödinger's Startup" state), the co-founder's sprite briefly flickers into a pixel cat that is simultaneously alive and dead — half normal sprite, half skeleton, for exactly 1 frame. Blink and you miss it. If the player screenshots it and survives to IPO, the ending text adds: *"Your co-founder was never fully here, but never fully gone."*

---

*~310 words. All specs assume HTML5 Canvas at 2× nearest-neighbor scaling, no anti-aliasing, 60fps target with frame-skip tolerance to 30.*