# Round 7 Scope & Prioritization

## BUILD (3 items only)

**1. Office Tilemap Rendering**
Render a 20x15 tile grid on an HTML canvas. Tile types: floor, wall, desk, computer, door. Tilemap defined as a 2D array in code. Each tile is 32x32px, drawn as colored rectangles with minimal pixel detail — no sprite sheet required yet. Single-screen, no scrolling.
*Complexity: Medium. ~150 lines. Biggest risk is getting the 3/4 perspective look right with simple drawing calls.*

**2. Player Grid Movement + Collision**
Arrow key input moves a 32x32 player sprite tile-to-tile. 150ms movement cooldown. Collision check against a parallel 2D array marking solid tiles (walls, desks). Player drawn as a simple hoodie character using canvas primitives or a tiny inline sprite.
*Complexity: Medium. ~120 lines. Input handling + collision + movement timing.*

**3. Co-Founder Static NPC**
One NPC sprite placed at a desk tile. No interaction, no animation. Just a colored sprite sitting there. Establishes tone.
*Complexity: Low. ~20 lines. Just a draw call at a fixed position.*

## CUT / DEFER

- Walk animation frames — snap is fine, no 2-frame animation this round
- Sprite sheets or external asset loading — draw with canvas primitives
- Any dialogue, menus, or interaction system
- Sound, music
- Game state, saving, economy
- Scrolling or multi-room maps
- NPC AI or pathfinding

## Non-Negotiables

- Player moves with arrow keys and cannot walk through walls
- Office is visible and recognizable as a room
- Game runs in browser, single HTML file, no build tools
- Must not timeout — total codebase under 500 lines

## Known Risks

1. **Timeout repeat** — mitigate by keeping everything in one file, no external deps
2. **3/4 perspective** looking flat — accept "good enough" over pixel-perfect
3. **Movement feel** — if 150ms cooldown feels sluggish, we tune next round, don't rat-hole now