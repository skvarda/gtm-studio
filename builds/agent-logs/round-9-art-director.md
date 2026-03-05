# Round 9 — Art Direction Document

## 1. Color Palette

| Role | Hex | Use |
|------|-----|-----|
| BG Dark | `#1a1a2e` | Night/menu backgrounds |
| BG Mid | `#16213e` | Office floor shadow |
| Office Floor | `#3a506b` | Carpet tile base |
| Wall | `#5bc0be` | Upper wall panels |
| Accent Warm | `#e07a5f` | Hire buttons, alerts, burn warnings |
| Accent Cool | `#81b29a` | Dev role text, product progress bar |
| Gold | `#f2cc8f` | Sales revenue, MRR numbers, coin sparkle |
| Text Primary | `#edf2f4` | Dialog text, roster names |
| Text Dim | `#8d99ae` | Flavor text, timestamps |
| Danger Red | `#ef476f` | Burn rate increases, "office full" warning |

## 2. Pixel Art Style Notes

No new sprites this round — employees exist as **text-only entities**. When we do render them (Round 10+), plan for 16x24 px character frames, 4-color-per-sprite limit (SNES restrictions). The door tile should pulse subtly (2-frame toggle, 800ms interval) to hint it's now interactive for hiring. Whiteboard tile: no change, interaction already reads.

## 3. UI / HUD Specs

Hiring menu: reuse the existing dialog box. Render options as a vertical list with `►` cursor, 1px white border, `#1a1a2e` fill at 90% opacity. Role labels use **accent cool** for Dev, **gold** for Sales. Burn rate delta shown inline: `+$1,800/day` in **danger red**. Whiteboard roster: plain text list inside standard dialog frame, role prefix colored by type. Font remains your current pixel font at 8px grid-snapped. No anti-aliasing.

## 4. Animation Priorities

1. **Door hint pulse** — 2-frame brightness oscillation on tile 9, signals new interaction
2. **End-of-day employee results** — text prints character-by-character (existing typewriter system), with a 200ms pause between each employee's line for readability
3. **Burn rate tick-up** — when hire confirms, the HUD burn number briefly flashes **danger red** then settles (4-frame flash, 80ms per frame)

## 5. Visual Gag

**The LaCroix Stack**: after hiring your second employee, a single 8x8 pixel can appears on the break room counter (tile near kitchenette if one exists, otherwise atop the filing cabinet). Third hire adds a second can. Fourth hire — a tiny pyramid of 3 cans, 1 on top. It's never referenced in dialog. Pure environmental storytelling. Palette: `#c8f7c5` with a `#edf2f4` highlight pixel. If a player interacts with it post-pyramid: *"The LaCroix situation is getting out of hand."*