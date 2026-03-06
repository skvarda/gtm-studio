Good — I can see the existing palette and style conventions. Here's the visual direction doc for Round 20:

---

# VISUAL DIRECTION — ROUND 20: Victory & Events

## 1. Color Palette (New Additions)

Extend `PAL` with these hex values:

| Token | Hex | Use |
|---|---|---|
| `victoryGold` | `#f0c040` | Trophy icons, IPO victory glow |
| `victoryBlue` | `#4488cc` | R&D Utopia accents |
| `victoryGreen` | `#58b868` | Profit Machine / existing brand green |
| `victoryRed` | `#e94560` | World Domination accents |
| `pathDim` | `#555566` | Inactive path pips (reuse `apEmpty`) |
| `eventBdr` | `#f0c040` | Event dialog border — gold to distinguish from green NPC dialogs |
| `eventBg` | `#1e1a2e` | Event dialog fill, slightly warmer than `dialogBg` |
| `launchFlash` | `#ffffff` | 2-frame flash for v1.0 launch moment |

All existing `PAL` values stay unchanged.

## 2. Pixel Art Style Notes

**Victory screens**: Full 320×224 canvas. Dark vignette border (2px of `bgDark` fading in), centered trophy/icon at 48×48px, stats block below in monospace. No new sprite sheets — compose trophies from simple geometric shapes: crown (IPO), coin stack (Profit), beaker (R&D), globe (World Dom). 4-color max per icon using path-specific accent + `white` + `shadow` + one midtone.

**Event popup**: Reuse the existing dialog box renderer but swap border color to `eventBdr`. Add a 16×16 alert icon (exclamation triangle: `hudYellow` + `bgDark`) drawn top-left of the dialog.

**HUD path tracker**: 4 tiny pips (4×4px each) in the HUD bar, bottom-right. Unlit = `pathDim`. Lit = that path's victory color. Tooltip not needed — pips pulse gently when a path crosses 75% progress.

## 3. UI / HUD Specs

- **Font**: Continue using the 5×7 pixel font renderer already in-engine. Victory screen titles render at 2× (10×14 effective). Body text at 1×.
- **Victory overlay**: Semi-transparent black fill (`#0f0f1aDD`) over gameplay, then victory panel (200×160px centered, `dialogBg` fill, 2px border in path color).
- **Stats layout**: Left-aligned, 8px margin. Lines: "Days: N", "Cash: $N", "MRR: $N", "Team: N", separated by 10px vertical spacing.
- **Event choice buttons**: Rendered as the existing menu system — green cursor arrow, two options max.

## 4. Animation Priorities

1. **Victory screen fade-in**: 8-frame alpha ramp (0→1 over ~0.5s), then trophy icon does a 4-frame "bounce-land" (scale 0.5→1.1→0.9→1.0).
2. **Path pip pulse**: When ≥75%, pip alternates between full and half brightness every 30 frames.
3. **v1.0 launch flash**: 2 frames pure white overlay → 6 frame fade back to gameplay. Simple and impactful.
4. **Event alert icon**: 3-frame wobble (rotate ±2px offset) when event triggers, then static.

## 5. Visual Easter Egg

**IPO Bell**: If you achieve IPO Glory, the co-founder is briefly visible in the victory screen background — wearing a top hat and monocle, pixel-rendered in 2 frames. First time he's ever shown doing anything. Tooltip-style text below: `"I handled the paperwork."`