# Art Direction — Round 15: Events & Milestones

## 1. CSS Color Palette

| Role | Hex | Use |
|------|-----|-----|
| BG Dark | `#1a1a2e` | Night/menu backgrounds |
| BG Mid | `#16213e` | Office floor base |
| Wall | `#0f3460` | Office walls |
| Accent Warm | `#e94560` | Crises, alerts, cash loss |
| Accent Green | `#53d769` | Good news, revenue, milestones |
| Accent Gold | `#f5a623` | TechCrunch, VC events |
| Text Primary | `#e0e0e0` | Dialog body |
| Text Dim | `#7a7a8c` | Flavor text, cooldown labels |
| Whiteboard White | `#f0ece2` | Board surface |
| Whiteboard Ink | `#2d3436` | Board drawings |
| Whiteboard Red | `#d63031` | Board milestone markers |

## 2. Sprite & Tile Notes

**Whiteboard progression** — four states drawn directly to the board tile:
- **Empty**: Blank white rectangle, single dry-erase marker pixel in tray
- **MVP (30)**: 3-4 wobbly lines suggesting a wireframe sketch, one small box
- **Beta (60)**: Wireframe plus arrow-connected boxes — crude system diagram
- **V1.0 (100+)**: Full board — diagram, a tiny bar chart, a circled "V1!" in whiteboard red

Each state is a simple tile swap. No animation, just redraw on milestone hit.

## 3. UI / HUD Specs

Event dialogs reuse the existing menu box. Add a **2px colored border** on the dialog frame: `#e94560` for crisis events, `#53d769` for opportunities, `#f5a623` for neutral/VC. This is the only new UI element — no icons, no portraits.

Font stays monospace system font at pixel-snapped sizes. Title screen update: replace "NEW:" line with `"Expect the unexpected."` in `#7a7a8c`.

## 4. Animation Priorities

**Screen-edge flash** — single-frame 8px border overlay on event trigger. Red for bad, green for good, gold for neutral. Renders one frame then gone. Canvas `globalAlpha = 0.35` rectangle inset. Cheap, effective, zero sprite cost.

**Milestone pop** — when a tier is hit, flash the whiteboard tile white for 3 frames (150ms) before swapping to the new drawing. Feels like a camera flash / achievement moment.

No other new animations this round.

## 5. Easter Egg

**Whiteboard V1.0 state** includes a tiny `=)` face drawn in whiteboard ink at the bottom-right corner of the board — 3x2 pixels. It's the co-founder's only confirmed contribution to the product.