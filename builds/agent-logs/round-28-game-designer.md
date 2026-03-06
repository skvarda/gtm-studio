# Game Mechanics Design Doc — Round 28: "First Light"

## 1. Core Gameplay Loop

Round 28 introduces zero new gameplay systems. The loop is identical to Round 27: spend AP on hire/build/sell actions, end day manually, survive cash burn. The only change players *feel* is visual — Jordan now renders as a sprite instead of a colored rectangle. The loop must be confirmed intact before any visual work is considered done.

## 2. Specific Mechanics to Implement

**Asset preloader** — Fires on game init, attempts to load three PNGs asynchronously before the title screen renders. Uses a simple counter: `assetsLoaded / assetsTotal`. No blocking. If load fails, flag falls back to rectangle renderer.

**Fallback renderer** — Every sprite draw call checks `sprite.loaded`. If false, draw the existing colored rectangle with the same bounding box. No visible break, no console errors.

**Jordan idle sprite** — `npc_jordan_idle` (32×48) renders at Jordan's NPC position during the `play` state, drawn to `bctx` only. Replaces the placeholder rectangle when loaded. Drawn before UI layer, after floor tiles.

**Tile and HUD sprites** — `tile_office_floor` (32×32) tiles the walkable floor area. `ui_hud_panel` (128×32) replaces the HUD bar background rectangle. Both optional — game functions without them.

## 3. Progression Gates

None new. AP gating, hire caps, and cash-burn pressure remain unchanged. The preloader completing is a technical gate, not a player-facing one.

## 4. Difficulty Curve

Flat for this round. No new obstacles, no stat rebalancing. The difficulty curve must be verified *unchanged* — any regression in day pacing or AP costs is a bug, not a design choice.

## 5. Player Feedback Loops

- If Jordan's sprite loads, player sees a real character on screen — silent positive signal.
- If assets fail, player sees the same rectangles as before — no negative feedback, no error state exposed.
- HUD panel sprite, if loaded, makes the interface feel more polished without changing any information density.

## 6. The Fun Moment to Engineer

**The First Frame.** Jordan's sprite appears for the first time on Day 1, standing at his desk. No fanfare, no announcement. The player just… sees him. A hoodie. Pixel hair. It should feel like the lights came on. That quiet visual upgrade — with nothing else changing — is the entire emotional payload of this round.