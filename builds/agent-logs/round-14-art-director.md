# ART DIRECTION — Round 14

## 1. COLOR PALETTE

| Role | Hex | Use |
|------|-----|-----|
| **BG Dark** | `#1a1a2e` | Canvas clear, deep night sky |
| **BG Mid** | `#16213e` | Office floor base, UI panels |
| **Accent Teal** | `#0f3460` | Terminal screens, selected UI |
| **Accent Warm** | `#e94560` | Logo highlight, alerts, low-cash warnings |
| **Text Primary** | `#eaeaea` | Dialog, HUD numbers |
| **Text Dim** | `#7f8c8d` | Disabled options, flavor text |
| **Morning Tint** | `rgba(255,248,220,0.0)` | Full AP — no overlay |
| **Afternoon Tint** | `rgba(255,183,77,0.08)` | Mid AP — faint amber wash |
| **Evening Tint** | `rgba(255,111,0,0.15)` | Low AP — warm sunset glow |
| **Night Tint** | `rgba(20,20,46,0.25)` | 0 AP — day's over, deep blue |

Day/night is one `fillRect` over the entire viewport. Lerp between stops based on `currentAP / maxAP`.

## 2. PIXEL ART STYLE

16×16 base tiles, 2-3px outlines max. **No anti-aliasing.** Sprites use 4-color shading per material (base, shadow, highlight, outline). Co-founder sprite needs 4 directional frames — fix the facing bug by indexing `spriteRow = dir * 16` into the sheet. Title logo: hand-pixel "SaaS Startup Simulator" at 8px tall glyphs, rendered to buffer then scaled — chunky and legible.

## 3. UI / HUD

HUD bar pinned to top: dark panel (`#16213e`, 1px `#0f3460` border). Monospace font via `ctx.font` — no web fonts. Cash left-aligned, MRR center, AP right as pip dots (filled = remaining, hollow = spent). Dialog box: bottom 20% of screen, same panel style, text renders one character per frame for typewriter effect. Title screen "PRESS Z" blinks at 500ms interval via frame counter modulo.

## 4. ANIMATION PRIORITIES

1. **Title cursor blink** — underscore block cursor toggles on the title terminal. Cheapest, highest impact.
2. **Day tint lerp** — smooth per-frame overlay shift. One line of draw code.
3. **Product launch flash** — screen flashes white for 3 frames then fades when v1.0 ships. Simple and celebratory.
4. **Co-founder 4-dir fix** — sprite sheet row selection per facing direction.

## 5. EASTER EGG

When cash drops below $1,000, the office coffee machine tile dims to a single dark pixel — the coffee ran out. If the player inspects it, dialog reads: *"Empty. This is how startups die."*