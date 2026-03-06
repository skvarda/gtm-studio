# Playtesting Report — SaaS Startup Simulator, Round 19

## 1. What Works Well

The pixel art foundation is solid. The palette is well-chosen — the dark purples and teals evoke a late-night coding session vibe that fits the theme. The tile system with 15+ tile types (desks, chairs, coffee, plants, whiteboards, rugs, windows) shows real environmental storytelling. Rendering to a 320x224 buffer scaled 3x is the correct approach for crisp SNES-style visuals. The custom cursor (`cursor:none`) signals commitment to full aesthetic control.

## 2. Top 3 Bugs / Anticipated Issues

1. **Collision mapping is fragile.** `SOL_SET` hardcodes solid tiles by index, but includes tile 0 (empty). If empty space is "solid," the player is trapped on spawn unless placed perfectly on a floor tile. This is almost certainly a wall-clip or soft-lock bug waiting to happen.

2. **The map is truncated at row 5 of 14.** If the full 20x14 map isn't loading, the renderer will either throw errors indexing undefined rows or render garbage. Any NPC pathfinding referencing lower rows will break silently.

3. **No visible game loop or state machine in the partial code.** Without clear state management (menu → gameplay → dialogue → pause), adding features will create spaghetti. Event handling, dialogue triggers, and the HUD are likely racing against each other if they share raw flags instead of a proper state enum.

## 3. Feel Assessment

**Atmosphere: strong. Interactivity: unclear.** The office reads well visually, but 19 rounds in, I need to feel the *startup tension* — cash ticking down, the pressure of a hire decision. If the HUD doesn't communicate burn rate front-and-center, the strategic layer is invisible.

## 4. Pacing Assessment

Too early to judge full pacing, but the tile density suggests a small, contained office. That's good — don't let scope creep bloat the map. The risk is the opposite: not enough to *do* in the space. Each tile should be interactable or meaningful.

## 5. One Improvement That Would Make the Most Difference

**Implement a proper finite state machine for game states.** Menu, exploration, dialogue, hiring screen, end-of-month — each needs isolated input handling and rendering. Without this spine, every new feature will introduce bugs in unrelated systems. Get the architecture right now before layering on more content.