## Build Report: location_transitions_coffee_shop

### What Changed
1. **Room Registry (ROOMS object)**: New data structure holding room definitions for `apartment` and `coffee_shop`. Each room has tilemap, doors, dimensions, and optional palette override. Functions: `getRoom()`, `loadRoom()`.

2. **Location Transition System**: Full fade-to-black transition when player walks onto door tiles.
   - `checkDoorCollision(tileX, tileY, location)` — checks if tile is a registered door
   - `startTransition(door)` — begins fade_out phase, locks input
   - `updateTransition(dt)` — advances alpha linearly, 400ms per phase (800ms total)
   - `switchLocation(door)` — swaps room, repositions player mid-fade
   - `drawTransitionOverlay(ctx)` — black rect at current alpha, drawn last in render
   - Player input fully locked during transitions via `transition.active` checks

3. **Coffee Shop Room**: 10x8 tile room with warm brown palette, centered on screen.
   - New tile types: 11 (counter with espresso machine detail), 12 (cafe table with coffee cup)
   - Door at tile (4,7) exits to apartment spawn (9,8)
   - Gina NPC at (1,2) with green apron sprite, facing down
   - Counter interactable with flavor dialogue

4. **Apartment Door Update**: Existing door tiles at (9,9) and (10,9) now walkable and registered as transition doors targeting coffee_shop spawn (4,6).

5. **Room-Aware Systems Modified**:
   - `isTileWalkable()` — uses current room tilemap, door tiles (type 3) now walkable
   - `getTileAt()` — uses current room tilemap
   - `drawMap()` — renders with room offset for centering
   - `drawTile()` — palette-aware floor/wall/door rendering, new tile types 11/12
   - `getAllNPCs()` — filters by `currentLocation` (apartment: Jordan/Maya/Derek, coffee_shop: Gina)
   - `drawEntities()` — uses roomOffX/roomOffY for NPC pixel positions
   - `tryMove()` — uses room offset for target pixels, blocks during transition
   - `initPlayer()` — calls `loadRoom('apartment')`, resets transition state
   - HUD shows current location name (APARTMENT / BYTE CAFE)
   - Hint bar shows "Walk: Coffee Shop | E: Menu" when facing transition doors

6. **Gina NPC**: Visible and interactable with 5-line dialogue. Green apron (#2d6a4f), reddish-brown hair.

### What Was Preserved
- All existing gameplay: AP, economy, email, day cycle, dialogue, character select
- Starting cash: $150,000
- All existing function signatures maintained
- Input map unchanged (WASD + arrows + E/Space/Enter)
- Native resolution 640x360, tile size 32px
- Door tiles still open action menu via E key (dual purpose: walk-through = transition, interact = menu)

### What's Fragile
- Room offset calculation assumes rooms <= 640px wide. Larger rooms would need camera/scrolling.
- `MAP_W` and `MAP_H` are mutable globals overwritten by `loadRoom()` — any code caching these between rooms could break.
- Coffee shop table tiles (12) at edges (e.g. column 8) sit adjacent to walls; no collision issue but visual seam is tight.
- Transition during action_result or other overlay states shouldn't occur (input is locked) but no explicit guard exists.

### Recommendations for Next Round
- Add `npc_interaction` system formally — Gina's dialogue is ad-hoc, same pattern as Jordan/Maya/Derek
- Consider adding a location name popup on room entry ("BYTE CAFE" text fades in after transition)
- Coffee shop could get more interactables: menu board, tip jar, window with street view
- Camera/scrolling system needed before adding rooms larger than 20x11 tiles
- `protected-systems.json` should be updated per Marcus's spec to protect the 5 transition functions