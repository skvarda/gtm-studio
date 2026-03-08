# Implementation Plan — Engine Round 2: Character Creation

**Author:** Marcus Webb, Tech Lead
**Round Priority:** `character_creation`
**Target File:** `/home/gtm/saas-startup-simulator.html`

---

## Situation

Round 1 built a working character creation screen with three role cards (Hacker/Designer/Hustler), but it doesn't match the game state spec. The roles should be **Seller, Dev, Marketer** per `game-state.json`. The player also has `name: null` — we never built name entry. This round we fix character creation properly: name input, correct roles with meaningful stat differences, a proper confirmation flow, and a character preview sprite.

---

## What MUST NOT Change

**No protected systems exist yet.** However, do NOT break these Round 1 systems that character creation depends on:

- `initCanvas()` — canvas setup, DPR correction
- `drawText()` / `measureText()` — pixel font renderer
- `gameLoop()` — main RAF loop
- `PAL` — color palette object
- Title screen rendering and `PRESS START` input handling
- Post-creation flow: apartment spawn, HUD, movement, dialogue — all must still work after character creation completes

If you need to modify any of these functions, limit changes to adding new branches, not rewriting existing logic.

---

## Systems to Build / Modify

### 1. Name Entry Screen (NEW)

**Screen state:** `"nameEntry"`

Add a new screen state between title screen and role selection. Flow becomes:
`titleScreen` → `nameEntry` → `characterCreation` → `play`

**Function signatures:**

```javascript
function drawNameEntry(ctx)
// Renders: "WHAT'S YOUR NAME?" header, text input field with blinking cursor,
// current typed name, "PRESS ENTER TO CONFIRM" prompt
// Name displayed in PAL.gold, cursor blinks at 500ms interval

function handleNameEntryInput(e)
// Handles: letter keys (A-Z only, uppercase), Backspace, Enter to confirm
// Max name length: 10 characters
// Min name length: 1 character (Enter does nothing if empty)
// On confirm: set gameState.player.name, transition to characterCreation
```

**Visual spec:**
- Center of screen vertically
- Name renders in large scale (scale 3) inside a bordered box (PAL.panelDark background, PAL.uiBorder border)
- Blinking underscore cursor after last character
- If name is empty, show blinking cursor alone

### 2. Role Selection Rework (MODIFY `character_creation`)

**Screen state:** stays `"characterCreation"`

Replace the three role cards. New roles per game-state.json:

| Role | Label | Icon Color | Stat Bonuses |
|------|-------|-----------|-------------|
| `"seller"` | **THE SELLER** | `PAL.gold` | Sales +3, Hustle +2, Dev +1 |
| `"dev"` | **THE DEV** | `PAL.teal` | Dev +3, Focus +2, Sales +1 |
| `"marketer"` | **THE MARKETER** | `PAL.magenta` | Marketing +3, Hustle +2, Dev +1 |

**Function signatures:**

```javascript
function drawCharacterCreation(ctx)
// Renders: "CHOOSE YOUR PATH" header (PAL.gold, scale 3, centered)
// Three role cards side by side (each ~180px wide, ~200px tall)
// Selected card: highlighted border (role's accent color), slight vertical offset (-4px)
// Unselected cards: dimmed (PAL.textDim border)
// Each card shows: role icon (simple pixel art, 32x32), role name, 
//   one-line description, stat bars
// Below cards: "← → TO SELECT    ENTER TO CONFIRM"
// Also show: player name from gameState.player.name above the cards
//   e.g., "MARCUS, CHOOSE YOUR PATH"

function drawRoleCard(ctx, x, y, role, isSelected)
// Renders a single role card at position
// role: object with { id, label, description, icon, stats, accentColor }
// Card has: dark panel background, icon area, title, description text (word-wrapped),
//   stat bars (small horizontal bars with labels)

function drawStatBar(ctx, x, y, label, value, maxValue, color)
// Renders: "DEV" label (PAL.textLight) followed by filled bar
// Bar: value/maxValue ratio filled with color, rest with PAL.panelDark
// Bar dimensions: 60px wide, 6px tall

function getRoleData(roleId)
// Returns role object: { id, label, description, stats, accentColor }
// "seller" → { label: "THE SELLER", description: "BORN CLOSER. YOU COULD SELL ICE TO PENGUINS.",
//              stats: { sales: 3, hustle: 2, dev: 1, marketing: 0, focus: 0 }, accentColor: PAL.gold }
// "dev" → { label: "THE DEV", description: "CODE IS POETRY. BUGS ARE JUST UNDOCUMENTED FEATURES.", 
//           stats: { dev: 3, focus: 2, sales: 1, marketing: 0, hustle: 0 }, accentColor: PAL.teal }
// "marketer" → { label: "THE MARKETER", description: "GROWTH HACKER. FUNNEL WIZARD. LINKEDIN THOUGHT LEADER.",
//                stats: { marketing: 3, hustle: 2, dev: 1, sales: 0, focus: 0 }, accentColor: PAL.magenta }
```

**Input handling** (modify existing `handleCharacterCreationInput`):
- Left/Right arrows: cycle selection (wrap around)
- Enter/Space: confirm selection → set `gameState.player.role` and `gameState.player.stats` → transition to `play` state
- Escape/Backspace: go back to `nameEntry` (keep name intact)

### 3. Player Stats Structure (MODIFY `gameState`)

Update `gameState.player.stats` to match the role system:

```javascript
gameState.player.stats = {
  sales: 0,
  dev: 0, 
  marketing: 0,
  hustle: 0,
  focus: 0
}
```

On role confirmation, set stats from `getRoleData(roleId).stats`. These stats will affect gameplay later (action effectiveness, dialogue options, hire synergy). For now, just store them.

### 4. Character Preview Sprite (MODIFY `drawCharacterCreation`)

On the role selection screen, draw the player sprite (reuse existing `drawPlayer` logic) to the left of the role cards, wearing the hoodie. This gives visual feedback that this is YOUR character.

```javascript
function drawPlayerPreview(ctx, x, y)
// Draws the player sprite at 2x size (32x56 instead of 16x28) facing down
// Reuse the existing sprite drawing logic, just doubled
// Below sprite: player name in PAL.textLight
```

### 5. Transition Polish (MODIFY state transitions)

```javascript
function transitionToScreen(targetState, callback)
// Simple fade-out (10 frames to black), set state, fade-in (10 frames from black)
// Reuse the existing day transition fade if one exists, otherwise create minimal version
// Used for: titleScreen→nameEntry, nameEntry→characterCreation, characterCreation→play
```

### 6. Input Router Update (MODIFY central input handler)

Add routing for the new `"nameEntry"` state in the central `keydown` handler:

```javascript
case "nameEntry":
  handleNameEntryInput(e);
  break;
```

---

## State Flow Diagram

```
titleScreen ──[ENTER]──→ nameEntry ──[ENTER]──→ characterCreation ──[ENTER]──→ play
                           ↑                         │
                           └────────[ESC/BACKSPACE]──┘
```

---

## Acceptance Criteria

Atlas, the build passes when ALL of these are true:

1. Press ENTER on title screen → fade to name entry screen
2. Name entry shows "WHAT'S YOUR NAME?" with blinking cursor
3. Typing letters appears on screen (uppercase, max 10 chars)
4. Backspace deletes last character
5. Enter with 1+ characters → fade to role selection
6. Role selection shows 3 cards: THE SELLER, THE DEV, THE MARKETER
7. Header reads "{NAME}, CHOOSE YOUR PATH"
8. Left/Right arrows cycle selection with visual highlight
9. Each card shows role name, description, and stat bars
10. Player preview sprite visible on the role selection screen
11. Enter confirms role → `gameState.player.role` set to `"seller"`, `"dev"`, or `"marketer"`
12. `gameState.player.stats` populated with correct values for chosen role
13. `gameState.player.name` populated with entered name
14. After confirmation → apartment loads, HUD works, movement works (no regressions)
15. ESC on role selection returns to name entry with name preserved
16. No external dependencies. File starts with `<!DOCTYPE html>`. Under 3500 lines.

---

## Engine-Spec Updates After This Round

Set these system statuses to `"implemented"`:
- `canvas_rendering`
- `pixel_font_renderer`
- `tile_movement`
- `hud_display`
- `day_cycle`
- `character_creation`

These were all built in Round 1 but never marked. Character creation gets marked after this round completes.

Add to `character_creation` system entry:
```json
"substates": ["nameEntry", "roleSelection"],
"entry_function": "drawNameEntry(ctx)"
```

---

## Protected Systems Update After This Round

After Atlas delivers and the build passes acceptance, add to `protected-systems.json`:

```json
{
  "name": "pixel_font_renderer",
  "functions": ["drawText", "measureText"],
  "reason": "Core rendering primitive. Everything depends on it."
},
{
  "name": "canvas_rendering", 
  "functions": ["initCanvas"],
  "reason": "DPR correction and canvas setup. Changing this breaks all rendering."
}
```

Character creation is NOT protected yet — it'll likely get iterated on in narrative rounds.

---

## Watch Out For

- **PAL.magenta**: confirm this key exists in the palette. If not, use `PAL.pink` or add `magenta: '#FF00FF'` isn't right for SNES — use `'#E040A0'` or similar warm magenta.
- **Keyboard input for name entry**: must handle `e.key` not `e.code` for letter input. Prevent default on Space to avoid page scroll.
- **Don't break the apartment**: after character creation, the game must still spawn the player in the apartment with Jordan, laptop interaction, and day cycling all working.
- **Stats are cosmetic for now**: don't wire stats into any gameplay mechanics this round. Just store them.

Ship it clean, Atlas. No stubs, no TODOs.

— Marcus
