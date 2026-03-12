# Implementation Plan: `location_transitions_coffee_shop`

**Round Type:** ENGINE
**Tech Lead:** Marcus Webb
**Developer:** Atlas
**Priority:** `location_transitions` system + Coffee Shop room definition

---

## 1. Overview

This round implements door-tile transitions with a fade effect, and defines the Coffee Shop as a second playable location. The player walks onto a door tile, a fade-to-black transition plays, and the player spawns in the target location. This is foundational infrastructure — every future location depends on it.

---

## 2. Systems to Build

### 2.1 `location_transitions` (engine-spec system — status: `planned` → `implemented`)

This is the core deliverable. Grid-based door tiles that trigger location changes with a fade.

#### Data Structures

```js
// Door definition — stored per-room in the room data object
// Each door is a tile position + destination
const door = {
  x: Number,          // tile x in current room
  y: Number,          // tile y in current room
  targetLocation: String,  // e.g. "coffee_shop"
  targetX: Number,    // spawn tile x in target room
  targetY: Number,    // spawn tile y in target room
  direction: String   // "up"|"down"|"left"|"right" — player facing after transition
};
```

```js
// Transition state object — lives on game state
const transitionState = {
  active: false,
  phase: "none",      // "fade_out" | "switch" | "fade_in" | "none"
  alpha: 0.0,         // 0.0 (clear) to 1.0 (black)
  targetDoor: null,    // the door object being transitioned to
  duration: 400        // ms per fade direction (400 out + 400 in = 800ms total)
};
```

#### Function Signatures

| Function | Description |
|---|---|
| `checkDoorCollision(tileX, tileY, currentLocation)` → `door or null` | Checks if the tile the player just moved onto is a door. Returns the door object or null. |
| `startTransition(door)` | Sets `transitionState.active = true`, phase to `"fade_out"`, stores target. Locks player input. |
| `updateTransition(dt)` | Called each frame. Advances alpha based on phase and dt. When fade_out completes (alpha ≥ 1.0), calls `switchLocation()`. When fade_in completes (alpha ≤ 0.0), ends transition, unlocks input. |
| `switchLocation(door)` | Sets `currentLocation` to `door.targetLocation`. Sets player position to `door.targetX, door.targetY`. Sets player facing to `door.direction`. Loads the target room's tilemap and NPCs. Sets phase to `"fade_in"`. |
| `drawTransitionOverlay(ctx)` | If `transitionState.active`, draws a black rect over the full canvas at `transitionState.alpha` opacity. Called **last** in the render loop (after everything else). |

#### Integration Points

- **`handleMovement(dt)`**: After a successful tile move completes, call `checkDoorCollision()`. If it returns a door, call `startTransition()`.
- **Game loop update**: Call `updateTransition(dt)` every frame. If `transitionState.active`, skip player movement input.
- **Game loop render**: Call `drawTransitionOverlay(ctx)` as the final draw call.

### 2.2 Room/Location Registry (new internal structure, supports `location_transitions`)

A registry of all room definitions so `switchLocation()` knows what to load.

```js
const ROOMS = {
  "apartment": { /* ... */ },
  "coffee_shop": { /* ... */ }
};
```

#### Function Signatures

| Function | Description |
|---|---|
| `getRoom(locationId)` → `room object` | Returns room definition from `ROOMS`. |
| `loadRoom(locationId)` | Sets the active tilemap, spawns NPCs for that room, sets room dimensions. |

#### Room Object Shape

```js
const room = {
  id: String,              // "apartment", "coffee_shop"
  width: Number,           // tiles wide
  height: Number,          // tiles tall
  tilemap: Number[][],     // 2D array of tile IDs
  doors: door[],           // array of door definitions
  npcs: Object[],          // NPC spawn positions for this room
  interactables: Object[], // interactable objects
  palette: {               // room-specific color overrides (optional)
    floor: String,
    wall: String,
    accent: String
  }
};
```

### 2.3 Coffee Shop Room Definition (new location)

Define the Coffee Shop as a concrete room in `ROOMS`.

#### Layout: 10 tiles wide × 8 tiles tall

```
  0123456789
0 WWWWWWWWWW    W = wall
1 W........W    . = floor
2 W.CC..TT.W    C = counter (2 tiles)
3 W.CC.....W    T = table (2 tiles)
4 W........W    G = Gina (behind counter)
5 W..TT..TTW   S = stool
6 W........W    D = door (exit)
7 WWWWDWWWWW
```

**Gina NPC**: Position tile (1, 2) — behind the counter. Interactable.

**Door**: Tile (4, 7) — exits to apartment. Target: apartment door tile (facing down).

**Color palette override**:
- Floor: warm wood tone (`#8B6914` or nearest PAL equivalent)
- Walls: darker brown (`#5C4033`)
- Counter: `PAL.teal` or similar accent
- Ambient feel: warm, cozy, slightly darker than apartment

#### Apartment Room Update

Add a door tile to the existing apartment room definition:
- Door position: bottom edge of apartment (e.g., tile (6, 9) if apartment is 12×10)
- Target: `coffee_shop`, spawn at (4, 6), facing up

---

## 3. What MUST NOT Change

**Protected systems:** The `protected-systems.json` currently lists **zero** protected systems. There is nothing to avoid modifying.

However, Atlas must **not**:
- Change the `input_map` key bindings in engine-spec
- Change the native resolution (640×360) or scale factor (2x)
- Change the tile size (32px)
- Alter any existing function signatures from prior rounds if they exist in the game file

---

## 4. Updates to `protected-systems.json`

After this round, add the following to the protected list:

```json
{
  "protected": [
    {
      "system": "location_transitions",
      "reason": "Core infrastructure — every future location depends on door tiles and fade transitions.",
      "protected_functions": [
        "checkDoorCollision",
        "startTransition",
        "updateTransition",
        "switchLocation",
        "drawTransitionOverlay"
      ],
      "protected_round": "location_transitions_coffee_shop"
    }
  ]
}
```

---

## 5. Updates to `engine-spec.json`

```json
{
  "location_transitions": {
    "status": "implemented",
    "protected": true,
    "description": "Move between locations via door tiles. Fade transition. 800ms total (400 out + 400 in).",
    "entry_function": "checkDoorCollision(tileX, tileY, currentLocation)",
    "dependencies": ["tile_movement"],
    "rooms_registered": ["apartment", "coffee_shop"]
  }
}
```

---

## 6. Updates to `game-state.json`

```json
{
  "locations_available": ["apartment", "coffee_shop"],
  "locations_implemented": {
    "apartment": {
      "tilemap_defined": true,
      "npcs": ["jordan"],
      "interactables": ["laptop", "whiteboard"],
      "doors": [{ "target": "coffee_shop", "tile": [6, 9] }],
      "dimensions": { "width_tiles": 12, "height_tiles": 10 }
    },
    "coffee_shop": {
      "tilemap_defined": true,
      "npcs": ["gina"],
      "interactables": ["counter"],
      "doors": [{ "target": "apartment", "tile": [4, 7] }],
      "dimensions": { "width_tiles": 10, "height_tiles": 8 }
    }
  },
  "npcs": {
    "gina": {
      "name": "Gina",
      "location": "coffee_shop",
      "sprite_id": "npc_gina_idle",
      "has_sprite": false,
      "dialogue_pool_size": 0,
      "relationship_level": 0,
      "role": "barista"
    }
  }
}
```

---

## 7. Implementation Order

Atlas should build in this exact sequence:

1. **Room data structure and registry** (`ROOMS` object, `getRoom()`, `loadRoom()`)
2. **Apartment room definition** — convert any existing apartment layout into the `ROOMS` format, add door tile
3. **Coffee Shop room definition** — new room with tilemap, Gina NPC position, door tile, palette
4. **Transition state object** — add to game state
5. **`checkDoorCollision()`** — pure lookup function
6. **`startTransition()` and `updateTransition()`** — fade logic
7. **`switchLocation()`** — room swap during fade
8. **`drawTransitionOverlay()`** — black rect with alpha
9. **Wire into game loop** — movement hook, update call, render call
10. **Test**: Walk to door in apartment → fade out → coffee shop loads → fade in → player at spawn tile. Walk back → same in reverse.

---

## 8. Acceptance Criteria

- [ ] Player walks onto apartment door tile → 800ms fade transition → spawns in coffee shop
- [ ] Player walks onto coffee shop door tile → 800ms fade transition → spawns in apartment
- [ ] Player input is locked during transition (no movement, no interaction)
- [ ] Fade is smooth (not stepped) — alpha interpolates linearly over duration
- [ ] Coffee shop renders with distinct palette (visually different from apartment)
- [ ] Gina NPC is visible in coffee shop at correct position (not yet interactable — that's `npc_interaction` system)
- [ ] No rendering glitches at frame of room switch (black screen covers the swap)
- [ ] Transition works repeatedly without state leaks (can go back and forth 20+ times)

---

**Atlas — this is your spec. Build it clean, build it tight. No scope creep. Ship it.**

— Marcus
