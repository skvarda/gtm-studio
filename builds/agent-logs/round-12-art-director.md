# Visual Direction — Round 12: Mid-Game Systems

## 1. Color Palette

| Role | Hex | Usage |
|------|-----|-------|
| BG Dark | `#1a1a2e` | Night/UI backing |
| BG Mid | `#16213e` | Office floor base |
| Wall | `#533483` | Office walls, borders |
| Accent | `#e94560` | Alerts, crises, low-cash warnings |
| Positive | `#4ecca3` | Good events, milestones, cash gain |
| Gold | `#f5c842` | Milestone banners, sparkle particles |
| Neutral | `#a8a8b3` | Inactive UI, dialog borders |
| White | `#eaeaea` | Body text, HUD numbers |
| Skin | `#f2c4a0` | Character sprites |
| Hoodie | `#3a86c8` | Player co-founder |

## 2. Sprite & Tile Notes

All sprites on a 16×16 grid, 2x render scale. **Whiteboard tile** gets 4 states: empty (gray scribbles), MVP (green sticky notes), Beta (diagrams + arrows), V1.0 (full mockup, gold border). Swap tile index at each milestone — no animation needed, just a palette-shifted variant. Event popup box: 9-slice panel using `#16213e` fill, `#533483` 2px border, 1px `#eaeaea` inner highlight.

## 3. UI / HUD Specs

HUD bar: top of screen, 8px tall, `#1a1a2e` background. Render cash, customers, day count in a monospace bitmap font (6×8 glyphs). Milestone name displays right-aligned in `#f5c842` when achieved. Event dialogs reuse existing dialog box but add a **colored pip** top-left: red `#e94560` for crisis, green `#4ecca3` for opportunity, gray `#a8a8b3` for neutral.

## 4. Animation Priorities

1. **Screen flash** — crisis events: 2-frame full-screen overlay, `#e94560` at 30% opacity, then clear. Cheap, impactful.
2. **Sparkle** — good events/milestones: 3–4 single-pixel particles around whiteboard, yellow `#f5c842`, 6-frame lifespan, random drift. Draw as 1×1 or 2×2 rects.
3. **Cash tick** — when customers pay: brief +$ floater text, green, rises 8px over 20 frames then gone.

## 5. Easter Egg

**The Cofounder's Monitor**: If the player walks behind the cofounder and faces his screen, the whiteboard milestone text briefly flickers to `"DEFINITELY NOT CRYPTO"` for 30 frames before reverting. No gameplay effect — pure flavor.