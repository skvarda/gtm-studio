# Round 1 Implementation Plan — Marcus Webb, Tech Lead

**Target file:** `/home/gtm/game.html` (create from scratch)
**Resolution:** 640×360 native, 2× scale → 1280×720 display
**Deliverable:** Single self-contained HTML file. No external assets. No external fonts.

---

## Systems to Build

Build these 6 systems from `engine-spec.json` in the order listed. Each system below includes exact function signatures Atlas must implement.

---

### 1. `canvas_rendering`

Set up the HTML page and canvas. Black background on `<body>`. Canvas centered on page.

```js
function initCanvas()
// Creates <canvas>, sets width/height to 640×360.
// Applies CSS scale: width 1280px, height 720px.
// Sets imageSmoothingEnabled = false.
// Handles window.devicePixelRatio correction:
//   - canvas.width = 640 * dpr, canvas.height = 360 * dpr
//   - CSS size stays 1280×720
//   - ctx.scale(dpr, dpr) so all draw calls use 640×360 coords
// Stores ctx globally. Returns ctx.

function gameLoop(timestamp)
// requestAnimationFrame loop. Calculates dt (capped at 50ms).
// Calls update(dt) then render(ctx).

function update(dt)
// Dispatches to current state's update logic.

function render(ctx)
// Clears canvas. Dispatches to current state's render logic.
// Render order: background tiles → sprites → HUD → overlays.
```

**Global state variable:** `let gameState = 'play';` — valid values for this round: `'play'`, `'dayEnd'`.

---

### 2. `pixel_font_renderer`

Custom bitmap font. **Do NOT use `ctx.fillText()` anywhere in the codebase.** Every character is drawn pixel-by-pixel from a glyph map.

```js
const FONT_GLYPHS = { /* A-Z, a-z, 0-9, common punctuation, space */ }
// Each glyph: array of rows, each row a binary string or array of 0/1.
// Glyph size: 5×7 pixels per character. 1px spacing between chars.

function drawText(ctx, text, x, y, color, scale)
// Renders text string at (x,y) using FONT_GLYPHS.
// color: hex string or PAL key. scale: integer multiplier (default 1).
// Draws each pixel of each glyph as a filled rect of size (scale × scale).
// Supports uppercase + lowercase + digits + basic punctuation.
// Unknown chars render as a 5×7 filled block (visible placeholder).

function measureText(text, scale)
// Returns { width, height } in pixels for the given text at given scale.
```

**Critical:** Include glyphs for at minimum: `A-Z`, `0-9`, `$`, `,`, `.`, `/`, `:`, `!`, `?`, `-`, `(`, `)`, `%`, `SPACE`. Lowercase maps to uppercase for this round (case-insensitive rendering is acceptable).

---

### 3. `tile_movement`

Grid-based player movement with smooth interpolation. Tile size: 32×32 pixels.

```js
const TILE_SIZE = 32;

const player = {
  x: 5,           // grid position (tile coords)
  y: 5,
  px: 160,        // pixel position (for interpolation)
  py: 160,
  targetX: 5,     // target grid position
  targetY: 5,
  moving: false,
  facing: 'down', // 'up','down','left','right'
  speed: 160      // pixels per second
};

const keys = {};  // track pressed keys via keydown/keyup

function initInput()
// Adds keydown/keyup listeners on window.
// Populates keys{} by event.code.
// Prevents default on arrow keys and Tab to avoid page scroll.

function handleMovement(dt)
// If not moving: check keys{} for movement input (ArrowUp/KeyW, etc).
//   Set targetX/targetY. Set moving=true. Set facing direction.
//   Collision check: if target tile is solid, cancel move.
// If moving: lerp px/py toward target * TILE_SIZE at player.speed.
//   When within 1px of target, snap to grid. Set moving=false.
//   Update player.x/y to targetX/targetY.

function isWalkable(tileX, tileY)
// Checks current room's collision map. Returns true if tile is walkable.
// Out-of-bounds = not walkable.
```

**Input map** must match `engine-spec.json`:
- Move: `ArrowUp/KeyW`, `ArrowDown/KeyS`, `ArrowLeft/KeyA`, `ArrowRight/KeyD`
- Interact: `Space`, `Enter`, `KeyE` (wire up listener, no interaction logic this round beyond day-end trigger)

---

### 4. Apartment Room (tilemap data — part of `tile_movement` system)

The apartment is the only location this round. 12 tiles wide × 10 tiles tall (384×320 px). Centered on the 640×360 canvas.

```js
const rooms = {
  apartment: {
    width: 12,
    height: 10,
    // Tile types: 0=floor, 1=wall, 2=furniture, 3=laptop, 4=jordan_npc
    tiles: [ /* 10 rows of 12 values */ ],
    collision: [ /* matching array: 0=walkable, 1=solid */ ],
    offsetX: 128,  // (640 - 384) / 2
    offsetY: 20    // top margin for HUD
  }
};

function drawRoom(ctx, room)
// Draws the room tile by tile using PAL colors.
// Floor tiles: PAL.floor (warm wood tone)
// Wall tiles: PAL.wall (darker tone) — top 2 rows
// Furniture: PAL.furniture — colored rectangles
// Laptop: small distinct colored rect on a desk tile
// Jordan NPC: simple 2-color sprite (standing, facing down)

function drawPlayer(ctx)
// Draws player at (player.px, player.py) offset by room offset.
// Simple 32×32 sprite: hoodie (teal), skin tone face, dark hair.
// 4 facing directions — at minimum vary a couple pixels to show direction.
// If moving, alternate between 2 frames (step timer) for walk animation.
```

**Palette** — define a global `PAL` object:
```js
const PAL = {
  bg:        '#1a1a2e',  // dark blue-black (page/void)
  floor:     '#c4a882',  // warm wood
  wall:      '#5c4033',  // dark brown
  wallTop:   '#7a5c47',  // lighter brown accent
  furniture: '#8b7355',  // medium brown
  laptop:    '#4ecdc4',  // teal glow
  hud_bg:    '#2d1b00',  // dark amber
  hud_text:  '#f4e4c1',  // warm cream
  hud_accent:'#e8a735',  // amber/gold
  player_hoodie: '#2a9d8f',  // teal
  player_skin:   '#f4c27f',  // warm skin
  player_hair:   '#3d2b1f',  // dark brown
  jordan_shirt:  '#e76f51',  // burnt orange
  jordan_skin:   '#f4c27f',
  jordan_hair:   '#5c3a21',
  ap_full:   '#e8a735',  // gold pip
  ap_empty:  '#4a3520',  // dim pip
  cash_green:'#7bc67e',  // for cash numbers
  mrr_blue:  '#4ecdc4',  // for MRR numbers
  danger:    '#e74c3c'   // red for low runway
};
```

---

### 5. `hud_display`

Persistent bar across the top of the screen.

```js
function drawHUD(ctx)
// Draws a filled rect across top: x=0, y=0, w=640, h=20. Color: PAL.hud_bg.
// Using drawText(), render these left-to-right with spacing:
//   "DAY 1"           — PAL.hud_text
//   "$150,000"        — PAL.cash_green
//   "MRR $0"          — PAL.mrr_blue
//   "RUNWAY --"       — PAL.hud_text (or PAL.danger if < 3 months)
//   AP pips: 5 small squares, filled=PAL.ap_full, empty=PAL.ap_empty
// All text at scale=1 (5×7 px glyphs).

function formatCash(amount)
// Returns string like "$150,000" or "$1,234,567". Comma-separated.
```

---

### 6. `day_cycle`

Manual day advancement. No auto-timers. Player controls pacing.

```js
const gameData = {
  day: 1,
  phase: 'afternoon',  // only 'afternoon' active this round
  cash: 150000,
  mrr: 0,
  burn: 0,
  customers: 0,
  ap: 5,
  apMax: 5
};

function advanceDay()
// Increments gameData.day by 1.
// Resets gameData.ap to gameData.apMax.
// Applies economy tick: cash += mrr, cash -= burn.
// Recalculates runway.
// Sets gameState = 'dayEnd' briefly to show day summary, then back to 'play'.

function drawDayEnd(ctx)
// Overlay showing "DAY X COMPLETE" with summary stats.
// Press interact key to continue to next day.

function calculateRunway()
// If burn <= 0: return null (infinite).
// Else: return Math.floor(gameData.cash / gameData.burn).
```

**Day-end trigger:** Player walks to the laptop tile (tile type 3) and presses interact key → calls `advanceDay()`. Display a brief confirmation before advancing.

---

## What MUST NOT Change

No protected systems exist yet. The `protected-systems.json` list is empty. Atlas has full freedom this round.

---

## Updates to `protected-systems.json` After This Round

Once Atlas delivers and the build is verified working, **add these protections:**

```json
{
  "protected": [
    {
      "system": "canvas_rendering",
      "functions": ["initCanvas"],
      "reason": "DPR correction is fragile. Changing this breaks all rendering."
    },
    {
      "system": "pixel_font_renderer",
      "functions": ["drawText", "measureText"],
      "reason": "All UI depends on this. Must not be replaced with fillText."
    },
    {
      "system": "tile_movement",
      "functions": ["handleMovement", "isWalkable"],
      "reason": "Core movement contract. Signature and grid-based behavior locked."
    }
  ]
}
```

---

## Updates to `engine-spec.json` After This Round

Set status to `"implemented"` for:
- `canvas_rendering`
- `pixel_font_renderer`
- `tile_movement`
- `hud_display`
- `day_cycle`

All other systems remain `"planned"`.

---

## Constraints for Atlas

1. **Single file.** Everything in `game.html`. No external dependencies.
2. **No `fillText`.** Every text character rendered via `drawText()` from `FONT_GLYPHS`.
3. **No auto-day-advance.** Day only advances when player interacts with laptop.
4. **No `setInterval`/`setTimeout` for game logic.** Only `requestAnimationFrame`.
5. **`imageSmoothingEnabled = false`** on every context operation that might reset it.
6. **Tab key must not leave the game.** `preventDefault` on Tab in keydown handler.
7. **All colors from PAL.** No hardcoded hex strings in draw functions.
8. **Minimum glyphs:** A-Z, 0-9, `$,./:-!?()%` and space. Missing = filled block.
9. **Player starts at tile (5, 5).** Jordan stands at tile (8, 3) facing down.
10. **Room must have walls on all edges.** No walking off-screen.

---

## Verification Checklist (for Integration)

- [ ] `game.html` opens in browser, shows 1280×720 canvas
- [ ] Player sprite visible in apartment room
- [ ] WASD and arrow keys move player smoothly between tiles
- [ ] Cannot walk through walls or furniture
- [ ] HUD shows DAY 1, $150,000, MRR $0, RUNWAY --, 5 AP pips
- [ ] Walking to laptop + pressing Space/Enter/E shows day-end overlay
- [ ] Pressing interact on day-end screen advances to DAY 2, resets AP
- [ ] Jordan NPC visible and non-walkable
- [ ] All text rendered via bitmap font (no fillText in source)
- [ ] No console errors

---

That's the plan. Atlas: build it exactly as specified. Don't improvise systems not listed here. Ship it clean.
