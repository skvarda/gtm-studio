# Scoped Integration Plan — Round 12

## The ONE Thing This Integration MUST Accomplish

**A human player loads the HTML file in a browser and successfully plays: Title Screen → Character Creation → Apartment → reads Jordan's email → approaches door.** Zero crashes, zero dead ends, zero console errors. This vertical slice demonstrates that our game systems can work together.

---

## What Goes In (strict order)

### Layer 1: Foundation Systems
- **Game loop** - `requestAnimationFrame` with delta time, 60fps target
- **State machine** - clean transitions between `titleScreen`, `characterCreation`, `gameplay`, `dialogue`
- **Input mode system** - only one input context active (`game`, `menu`, `text`, `dialogue`)
- **Render pipeline** - clear → world → entities → UI (explicit z-order)
- **Source:** Adapt from `game.html` functions, keep `saas-startup-simulator.html` display config (640x360, PAL palette)

### Layer 2: Title Screen
- **Title text rendering** - game name in pixel font
- **Start prompt** - "Press ENTER to Start" with blink effect
- **Input handling** - Enter key transitions to character creation
- **Source:** `game.html:drawTitleScreen()` (line 408), `updateTitleScreen()` (line 585)

### Layer 3: Character Creation Flow
- **Name input** - keyboard capture, max 12 chars, `inputMode = 'text'` (prevents movement bleed)
- **Trait selection** - pick 2 of 4 traits (Hacker/Hustler/Hipster/Hoarder), arrow keys + Enter
- **Confirmation screen** - shows name + selected traits, Enter to continue
- **State transitions** - character creation → gameplay state
- **Source:** `game.html:drawCharacterCreation()` (line 444), `updateCharacterCreation()` (line 601)
- **Content:** `/home/gtm/docs/day1-content.md` character creation section

### Layer 4: Apartment Scene
- **Tilemap rendering** - 12x10 apartment layout from day1-content.md
- **Player sprite** - 16x24 hoodie character, spawns near bed
- **Movement system** - WASD/arrow keys, walking animation, collision with walls/furniture
- **Source:** `game.html:drawApartment()` (line 216), `drawTile()` (line 142), `drawPixelCharacter()` (line 52)
- **Content:** Apartment layout and furniture from `/home/gtm/docs/day1-content.md`

### Layer 5: Interaction System
- **Proximity detection** - interaction prompt appears when facing objects
- **Dialogue box** - text display at screen bottom, advance with Enter
- **7 interactive objects** - bed, coffee maker, mirror, bookshelf, poster, laptop, door
- **Email system** - laptop shows Jordan's email, sets `hasReadEmail = true`
- **Door gating** - requires reading email first, then prompts "Meet Jordan at Gina's?"
- **Source:** `game.html:drawDialogBox()` (line 311), `interact()` (line 787)
- **Content:** All object text from `/home/gtm/docs/day1-content.md`, Jordan's email from `/home/gtm/docs/story-beats.md`

---

## What Gets Cut or Deferred

### Deferred to Round 13+
- **Coffee Shop scene** (Beat 2) - next major location
- **Walking to coffee shop** - transition between locations
- **Jordan NPC dialogue** - only his email appears
- **Sound/music system** - no audio implementation
- **Save/load system** - session-based play only
- **Action Points system** - not needed until office gameplay
- **Economy tracking** - MRR/customers/etc., office phase feature

### Cut Entirely This Round  
- **Multiple character sprites** - only player hoodie character
- **NPC animations** - no NPCs appear in apartment
- **Multiple rooms** - only single apartment scene
- **Day cycle system** - single morning sequence
- **Menu system** - no in-game menus beyond character creation
- **Achievement tracking** - not core to vertical slice

**Reasoning:** Focus on proving the state machine and basic interactions work. Coffee shop adds location transitions and NPC dialogue - significant complexity that can wait. The apartment scene alone demonstrates all core systems working together.

---

## Unresolved Cross-Department References

### ⚠️ ART ASSETS MISSING
- **Player sprite frames** - need 16x24 hoodie character (walk cycle, idle)
- **Furniture tiles** - bed, desk, coffee maker, bookshelf, etc. (16x16 each)
- **Floor/wall tiles** - wood flooring, apartment walls
- **UI elements** - dialogue box background, interaction prompt

**Mitigation:** Use colored rectangles as placeholder sprites. Functional > pretty.

### ⚠️ STORY CONTENT GAPS
- **Mirror dialogue** - should show player name + traits, needs dynamic text generation
- **Character trait effects** - traits selected but no mechanical impact shown
- **Email timestamp** - Jordan's email needs realistic formatting

**Mitigation:** Static text for non-critical interactions. Mirror can show "You see yourself" placeholder.

### ⚠️ INPUT SYSTEM CONFLICTS
- **Text input during name entry** - must completely disable movement keys
- **Dialogue advancement** - Enter/Space conflicts with interaction key
- **State transition timing** - prevent double-key-press triggering multiple transitions

**Mitigation:** Strict `inputMode` checks before processing any input. Reference Round 8 postmortem for specific conflict patterns.

---

## Integration Source Priority

1. **Base file:** `saas-startup-simulator.html` (keep display config, PAL palette, input setup)
2. **Reference implementation:** `game.html` (copy/adapt working functions)
3. **Content source:** `/home/gtm/docs/day1-content.md` (dialogue, layout, interactions)
4. **Anti-pattern guide:** `/home/gtm/docs/round8-postmortem.md` (what NOT to do)

## Success Metrics

**MUST WORK:**
- Load page → no console errors
- Title screen renders, Enter starts game
- Type character name without triggering movement
- Select 2 traits, confirm selection
- Walk around apartment with WASD
- Cannot walk through walls or furniture  
- All 7 objects show interaction prompt when approached
- Laptop displays Jordan's email
- Door requires email to be read first
- Selecting "Yes" at door ends demo gracefully

**Failure = Reject:** Any of the above broken. No exceptions.

---

**Producer Note:** Four rejections in a row. This round we prove the core systems work by building the smallest possible complete experience. No feature creep, no "while we're at it" additions. Ship the vertical slice that works, then iterate.
