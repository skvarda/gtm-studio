# Engine Round 1 — Foundation Build Plan

**Tech Lead:** Marcus Webb
**Developer:** Atlas
**Priority:** Foundation — fresh build from scratch

---

## Output Requirements

- Single file: `/home/gtm/saas-quest.html`
- First character must be `<` — no markdown, no preamble, no explanation
- Under 3000 lines
- Zero external dependencies

---

## 1. Systems to Build

### 1.1 `canvas_rendering`
Set up DPR-corrected canvas at 640×360 native resolution.

```
initCanvas() → void
```
- Create a `<canvas>` element, append to document body
- Detect `window.devicePixelRatio`, set canvas buffer size to `640*dpr × 360*dpr`
- Set CSS size to `1280×720` (2x scale)
- Apply `ctx.imageSmoothingEnabled = false` for nearest-neighbor
- Apply `ctx.scale(dpr, dpr)` so all draw calls use 640×360 coordinates
- Black background, centered on page with CSS (`margin: 0; background: #000; display: flex; align-items: center; justify-content: center`)
- Store `ctx` globally

### 1.2 `pixel_font_renderer`
Custom bitmap font. Define a 4×6 (or 5×7) pixel font as binary data for A-Z, a-z, 0-9, and common punctuation (`.,:;!?'-/$%&()+`). Space = 4px advance.

```
drawText(ctx, text, x, y, color, scale) → void
```
- `color`: string (hex or CSS color)
- `scale`: integer, default 1 (each font pixel = `scale` screen pixels)
- Render character-by-character using `ctx.fillRect` per pixel
- 1px spacing between characters
- Support uppercase and lowercase (can map lowercase to uppercase glyphs if needed)

```
measureText(text, scale) → { width, height }
```

### 1.3 `tile_movement`
Grid-based player movement with smooth interpolation. 32×32 tiles. Grid is 20×11.25 — use 20×11 playable area (top 32px reserved for HUD).

```
handleInput(e) → void          // keydown listener
handleInputUp(e) → void        // keyup listener
updateMovement(dt) → void      // called each frame
```
- Track keys held via `keysDown` map
- Player moves tile-to-tile with eased interpolation (lerp over ~150ms)
- During interpolation, buffer next input but don't start new move
- Collision check against `currentRoom.collisions[]` array (tile coords)
- Movement uses input_map from engine spec (arrows + WASD)
- Player position stored as `player.tileX, player.tileY` (grid) and `player.drawX, player.drawY` (pixel, for interpolation)

### 1.4 `hud_display`
Top 32px bar showing game stats.

```
drawHUD(ctx) → void
```
- Dark semi-transparent bar across top (full 640px width, 28px tall)
- Left side: `DAY {n}` in white
- Center-left: `${cash}` with dollar formatting (abbreviate: $150K, $1.2M)
- Center: `MRR: ${mrr}`
- Center-right: `AP: {remaining}/{max}` — draw AP pips as filled/empty diamonds or dots
- Use `drawText()` at scale 1

### 1.5 `day_cycle`
Manual day advancement. No auto-timer.

```
advanceDay() → void
resetAP() → void
spendAP(cost) → boolean
```
- `advanceDay()`: increment `gameState.day`, call `resetAP()`, brief fade-to-black transition, show "Day {n}" splash for 1 second, return to apartment
- `resetAP()`: set `gameState.ap = gameState.maxAP` (5)
- `spendAP(cost)`: if `ap >= cost`, deduct and return true, else return false
- Day phases are implicit for now (no morning/afternoon/evening split yet)

### 1.6 `character_creation`
Role selection screen with 3 cards.

```
drawCharacterCreation(ctx) → void
handleCharCreationInput(key) → void
```
- 3 role cards side by side, centered vertically: **Hacker**, **Designer**, **Hustler**
- Each card: ~180×200px, bordered rectangle with role name, pixel art icon (simple: laptop/paintbrush/megaphone drawn with rectangles), 2-3 stat lines
  - **Hacker**: +2 Dev Speed, +1 Debug Luck, -1 Sales
  - **Designer**: +2 Product Quality, +1 UX, -1 Dev Speed
  - **Hustler**: +2 Sales, +1 Networking, -1 Dev Speed
- Arrow keys (left/right) move selection highlight between cards
- Enter/Space confirms selection
- Selected card has bright border (amber `#F0C060`), others have muted border
- On confirm: store role in `gameState.playerRole`, transition to `play` state

### 1.7 `npc_interaction`
Jordan NPC in apartment.

```
checkInteraction() → void
drawInteractionPrompt(ctx) → void
```
- Jordan stands at a fixed tile position in apartment (e.g., tile 7,5)
- When player is adjacent (1 tile away, facing Jordan), show `[E] Talk` prompt above Jordan
- On interact key: enter `dialogue` game state, show dialogue box

### 1.8 `dialogue_system`
Bottom-of-screen dialogue box.

```
showDialogue(speakerName, lines) → void
advanceDialogue() → void
drawDialogue(ctx) → void
```
- `lines`: array of strings
- Draw box: bottom 80px of screen, dark blue-gray background, 2px border
- Speaker name in amber/gold top-left of box
- Text rendered with `drawText()`, auto-wrapped to fit box width (~600px)
- Space/Enter/E advances to next line or closes dialogue
- Jordan's initial lines: `["Hey. You're finally up.", "We've got $150K and zero customers.", "Maybe check the laptop. We should get to work."]`

### 1.9 Apartment Room (part of `tile_movement` / room system)
Define the apartment tilemap.

```
const ROOMS = { apartment: { ... } }
drawRoom(ctx, room) → void
```
- 20×11 tile grid (below HUD)
- Floor tiles: warm wood tone (`#C09060` with darker `#A07848` alternating)
- Walls: top 2 rows, gray-blue (`#506078`)
- Furniture drawn as colored rectangles on specific tiles:
  - **Desk with laptop** at tile (3, 3): dark brown desk, lighter laptop shape. Interactable.
  - **Bed** at tiles (14-15, 2-3): blue-ish rectangle
  - **Jordan** at tile (8, 5): NPC sprite (simple 16×28 character shape)
  - **Door** at tile (10, 9): marks bottom edge, darker rectangle (stub — not functional yet, just visual)
  - **Whiteboard** at tile (6, 1): white rectangle on wall row
  - **Rug** at center: warm red-brown patch, tiles (8-11, 6-8)
- Collision tiles: walls, furniture (not floor, rug, or player-traversable tiles)
- Player spawn: tile (5, 6)

### 1.10 Laptop Interaction (End Day action)

```
showLaptopMenu() → void
drawLaptopMenu(ctx) → void
handleLaptopInput(key) → void
```
- When player interacts with laptop tile, show a simple overlay menu:
  - "END DAY" option (always available)
  - "CHECK STATS" option (shows cash/MRR/day — stub)
- Arrow keys up/down to select, Enter to confirm
- "END DAY" calls `advanceDay()`
- ESC closes laptop menu

### 1.11 Title Screen

```
drawTitleScreen(ctx) → void
handleTitleInput(key) → void
```
- Black background
- "SAAS QUEST" in large text (scale 4-5), centered, amber/gold color (`#F0C060`)
- Subtitle: "Startup Simulator" below in smaller text (scale 2), teal (`#60C0B0`)
- "PRESS START" blinking at bottom (toggle every 500ms), white
- Any key (Space/Enter) transitions to `characterCreation` state

---

## 2. Game State Structure

```javascript
const gameState = {
  screen: 'title',  // 'title' | 'characterCreation' | 'play' | 'dialogue' | 'laptopMenu' | 'dayTransition'
  day: 1,
  cash: 150000,
  mrr: 0,
  ap: 5,
  maxAP: 5,
  playerRole: null,  // 'hacker' | 'designer' | 'hustler'
  currentRoom: 'apartment',
  player: {
    tileX: 5, tileY: 6,
    drawX: 0, drawY: 0,
    facing: 'down',  // 'up' | 'down' | 'left' | 'right'
    moving: false,
    moveProgress: 0
  }
};
```

---

## 3. Game Loop

```
gameLoop(timestamp) → void
update(dt) → void
draw(ctx) → void
```
- `requestAnimationFrame` loop
- `dt` capped at 50ms (prevent spiral)
- `update()` calls `updateMovement(dt)` when in `play` state
- `draw()` switches on `gameState.screen` to call appropriate draw function
- Clear canvas each frame with `#1A1A2E` (dark blue-black)

---

## 4. Player Sprite

```
drawPlayer(ctx, x, y, facing) → void
```
- 16×28 pixel character drawn with `fillRect` calls
- Hoodie (teal `#408080`), skin tone face (`#F0C8A0`), dark hair, jeans (`#405880`)
- 4 facings: simple variations (front shows face, back shows hair, sides show profile)
- No animation frames yet — static per facing

```
drawJordan(ctx, x, y) → void
```
- Similar construction: glasses (two small squares on face), messier hair, different hoodie color (muted purple `#706088`)

---

## 5. Color Palette

Define a `PAL` object:
```javascript
const PAL = {
  bg: '#1A1A2E',
  hudBg: '#0D0D1A',
  text: '#E8E8E8',
  gold: '#F0C060',
  teal: '#60C0B0',
  amber: '#D4A04A',
  wood: '#C09060',
  woodDark: '#A07848',
  wall: '#506078',
  wallLight: '#607890',
  skin: '#F0C8A0',
  hair: '#3A2820',
  hoodie: '#408080',
  jordanHoodie: '#706088',
  jeans: '#405880',
  desk: '#6B4830',
  laptop: '#A0A0B0',
  bed: '#4060A0',
  rug: '#A06040',
  door: '#8B6840',
  white: '#FFFFFF',
  black: '#000000',
  danger: '#E05050',
  success: '#50C050'
};
```

---

## 6. Input Handling

- Single `keydown` and `keyup` listener on `window`
- Route input based on `gameState.screen`:
  - `title` → `handleTitleInput`
  - `characterCreation` → `handleCharCreationInput`
  - `play` → movement via `keysDown` map + interact key check via `checkInteraction`
  - `dialogue` → `advanceDialogue`
  - `laptopMenu` → `handleLaptopInput`
- Prevent default on game keys to stop page scrolling

---

## 7. What MUST NOT Change

No protected systems exist yet (`protected-systems.json` has empty `protected` array). Nothing is restricted.

---

## 8. Updates to `protected-systems.json`

After this round, add the following to the protected list:

```json
{
  "protected": [
    {
      "system": "canvas_rendering",
      "function": "initCanvas",
      "reason": "DPR correction is foundational — must not be replaced",
      "protected_round": 1
    },
    {
      "system": "pixel_font_renderer",
      "function": "drawText",
      "reason": "All UI depends on this signature",
      "protected_round": 1
    },
    {
      "system": "tile_movement",
      "functions": ["handleInput", "updateMovement"],
      "reason": "Core movement loop — signature stable",
      "protected_round": 1
    }
  ]
}
```

---

## 9. Updates to `engine-spec.json`

Set status to `"implemented"` for:
- `canvas_rendering`
- `pixel_font_renderer`
- `tile_movement`
- `hud_display`
- `day_cycle`
- `character_creation`
- `dialogue_system`
- `npc_interaction`
- `action_point_system` (basic — spendAP/resetAP)

Leave as `"planned"`:
- `email_inbox`
- `economy_tick`
- `location_transitions`
- `asset_preloader`

---

## 10. Execution Order

Atlas should build systems in this order (dependency-safe):

1. HTML shell + canvas init (`canvas_rendering`)
2. Color palette (`PAL`)
3. Pixel font (`pixel_font_renderer`)
4. Game state object
5. Game loop (`gameLoop`, `update`, `draw`)
6. Title screen
7. Character creation screen
8. Room definition + room renderer (apartment)
9. Player sprite + Jordan sprite
10. Tile movement + collision
11. HUD
12. NPC interaction + dialogue system
13. Laptop menu + End Day
14. Day cycle + transitions
15. Input routing

---

## 11. Acceptance Criteria

Atlas, the build passes if ALL of these work:

1. Page loads → black screen → title screen with "SAAS QUEST" and blinking "PRESS START"
2. Press Enter → character creation with 3 cards, arrow keys move selection, Enter confirms
3. After selection → apartment room renders with player at spawn point
4. HUD visible at top: DAY 1, $150K, MRR: $0, AP: 5/5
5. WASD/arrows move player tile-to-tile with smooth interpolation
6. Player cannot walk through walls or furniture
7. Walk next to Jordan → "[E] Talk" prompt appears
8. Press E → dialogue box with Jordan's lines, Space advances, closes after last line
9. Walk to laptop, press E → laptop menu appears with END DAY option
10. Select END DAY → day transition → DAY 2, AP resets to 5
11. No console errors, no external requests, canvas is crisp at any DPR
12. File is under 3000 lines, starts with `<!DOCTYPE html>`

---

**Ship it, Atlas.** First character is `<`. No wrapping. No commentary.
