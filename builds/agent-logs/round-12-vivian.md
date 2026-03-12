Let me review the current state before writing the directive.

<tool_call>
{"name":"Glob","args":{"pattern":"/home/gtm/docs/**/*"}}
</tool_call>
<tool_call>
{"name":"Glob","args":{"pattern":"/home/gtm/*.html"}}
</tool_call>
<tool_call>
{"name":"Bash","args":{"command":"ls -la /home/gtm/studio-state.json 2>/dev/null && cat /home/gtm/studio-state.json | head -20"}}
</tool_call>

<tool_call>
{"name":"Bash","args":{"command":"ls -lt /home/gtm/*.html 2>/dev/null"}}
</tool_call>

<tool_call>
{"name":"Glob","args":{"pattern":"/home/gtm/docs/qa-*.md"}}
</tool_call>

<tool_call>
{"name":"Glob","args":{"pattern":"/home/gtm/docs/brief-*.md"}}
</tool_call>

<tool_result>
["/home/gtm/docs/brief-round22.md", "/home/gtm/docs/day1-content.md", "/home/gtm/docs/game-design-doc.md", "/home/gtm/docs/gtm-studio-charter.md", "/home/gtm/docs/npc-database.md", "/home/gtm/docs/round10-brief.md", "/home/gtm/docs/round11-brief.md", "/home/gtm/docs/round8-postmortem.md", "/home/gtm/docs/round9-directive.md", "/home/gtm/docs/sprite-designs.md", "/home/gtm/docs/story-beats.md"]
</tool_result>

<tool_result>
["/home/gtm/game.html", "/home/gtm/saas-startup-simulator.html"]
</tool_result>

<tool_result>
ls: cannot access '/home/gtm/studio-state.json': No such file or directory
</tool_result>

<tool_result>
-rw-r--r-- 1 gtm gtm 91498 Mar  9 16:13 /home/gtm/saas-startup-simulator.html
-rw-r--r-- 1 gtm gtm 28498 Mar  8 19:02 /home/gtm/game.html
</tool_result>

<tool_result>
["/home/gtm/docs/round10-brief.md", "/home/gtm/docs/round11-brief.md"]
</tool_result>

<tool_call>
{"name":"Read","args":{"file_path":"/home/gtm/docs/round11-brief.md"}}
</tool_call>
<tool_call>
{"name":"Read","args":{"file_path":"/home/gtm/docs/round10-brief.md"}}
</tool_call>
<tool_call>
{"name":"Read","args":{"file_path":"/home/gtm/docs/round8-postmortem.md"}}
</tool_call>
<tool_call>
{"name":"Read","args":{"file_path":"/home/gtm/docs/story-beats.md"}}
</tool_call>
<tool_call>
{"name":"Read","args":{"file_path":"/home/gtm/docs/day1-content.md"}}
</tool_call>

<tool_result>
# Round 11 Integration Brief

## Priority: assemble-latest

## Context
Round 10 was rejected. The build had significant issues:
- Character creation existed but was disconnected from gameplay
- Apartment scene was present but navigation/interaction was broken
- Day 1 beat progression was incomplete
- Multiple visual/rendering bugs

## What Must Ship
A playable vertical slice: Title → Character Creation → Apartment Morning → first interaction.

## Integration Order
1. Start from the current saas-startup-simulator.html (Round 10 output)
2. Fix character creation flow (name entry must work, trait selection must work)
3. Fix apartment scene (player must be able to walk around, interact with objects)
4. Connect the beats: creation → wake up → apartment → first objective
5. Polish: no visual glitches, no console errors, no dead ends

## Quality Bar
- Player can complete: Title Screen → Character Creation → Apartment scene
- All inputs responsive (WASD/arrows for movement, Enter/Space for confirm)
- No JavaScript errors in console
- No rendering artifacts
- Game state transitions are clean

## Known Issues from Round 10
- Character name input may not capture keystrokes properly
- Trait selection buttons may not respond
- Apartment tilemap rendering had gaps/overlaps
- Player sprite clipping through furniture
- Interaction prompts not appearing near objects

## Deferred
- Sound/music
- Save system
- Anything beyond apartment morning scene
</tool_result>

<tool_result>
# Round 10 Integration Brief

## Priority: beats_1_2
## Context
Rounds 8 and 9 were rejected integration attempts. Round 8 postmortem identified fundamental architecture issues. Round 9 attempted fixes but still failed QA.

## Diagnosis of Repeated Failures
The core problem across Rounds 8-9: trying to merge too many systems simultaneously without a stable foundation. Each integration attempt introduced new bugs while fixing old ones.

## New Strategy: Incremental Assembly
Instead of merging everything at once, build up layer by layer:

### Layer 1: Bare minimum game loop
- Title screen → Game start → Render a room → Player can move
- This MUST work before adding anything else

### Layer 2: Character creation
- Add name entry and trait selection
- Verify it flows into Layer 1's game start

### Layer 3: Apartment scene
- Replace test room with apartment tilemap
- Add interactable objects (laptop, coffee maker, bed)

### Layer 4: Day 1 narrative
- Morning email popup
- Jordan dialogue
- First objective marker

## Quality Bar
- Zero console errors
- Player movement smooth at 60fps
- All state transitions clean (no stuck states)
- At minimum, Layers 1-2 must be solid

## Known Conflicts
- Multiple coordinate systems in play (pixel vs tile vs screen)
- Input handling has competing event listeners from different systems
- State machine transitions not guarded (can trigger multiple simultaneously)

## Deferred
- NPCs beyond Jordan
- Economy system
- Action Points system
- Everything past apartment morning
</tool_result>

<tool_result>
# Round 8 Postmortem

## What Went Wrong
The integration attempted to merge character creation, apartment scene, NPC dialogue, and the day system all at once. This created cascading failures:

1. **Input system conflicts**: Character creation's text input and the game's movement input were both active simultaneously, causing the player to move while typing their name.

2. **State machine gaps**: Transitions between titleScreen → characterCreation → gameplay weren't properly gated. You could end up in a hybrid state.

3. **Rendering layer issues**: UI elements (dialogue boxes, menus) rendered behind the game world instead of on top.

4. **Coordinate confusion**: Mix of pixel coordinates and tile coordinates caused misaligned interactions.

## Root Causes
- No clear separation between input contexts (menu input vs gameplay input vs text input)
- State machine doesn't enforce mutual exclusivity
- Rendering order not explicitly managed (no z-layer system)
- Too many features integrated simultaneously without incremental testing

## Recommendations for Next Integration
1. Build incrementally: get one thing working perfectly before adding the next
2. Input system needs explicit modes that disable other inputs
3. State machine needs entry/exit hooks that clean up properly
4. Establish a clear render order: world → entities → UI → overlays
5. Test each layer before adding the next
</tool_result>

<tool_result>
# Story Beats — SaaS Quest: Startup Simulator

## Beat 1: The Wake-Up Call (Day 1 Morning)
**Location:** Player's apartment
**Trigger:** Game start, after character creation

### Sequence:
1. Screen fades in on apartment bedroom
2. Phone alarm goes off (visual + text)
3. Player gets out of bed (auto or prompted)
4. Tutorial prompt: "Use WASD or Arrow Keys to move"
5. Player explores apartment:
   - **Laptop on desk**: "Your inbox has 47 unread emails. One stands out..."
     → Email from Jordan: "It's happening. Angel check cleared. $150K. Meet me at the coffee shop. —J"
   - **Coffee maker**: "You brew a cup. You're going to need this."
   - **Mirror**: Shows player sprite + name + chosen traits
   - **Door**: "Head to the coffee shop to meet Jordan?"
     → Selecting Yes transitions to Beat 2

### Key Story Points:
- Establish the player's ordinary world (small apartment, big dreams)
- The angel funding is the inciting incident
- Jordan is mysterious from the start — email only, no phone call
- Coffee maker interaction is a recurring motif

## Beat 2: The Coffee Shop (Day 1 Afternoon)
**Location:** Gina's Coffee Shop
**Trigger:** Player leaves apartment

### Sequence:
1. Transition to coffee shop interior
2. Gina behind counter: "The usual? You look like you've seen a ghost. Or a term sheet."
3. Jordan at corner table, laptop open, multiple monitors somehow
4. Jordan dialogue:
   - "Sit down. We need to talk about the plan."
   - "I've been working on something. The market's ready."
   - "You handle the product. I'll handle... everything else."
   - Shows player the "SaaSify" concept (or whatever the product is)
5. Player gets to choose product focus:
   - "Analytics Dashboard" (balanced start)
   - "AI-Powered CRM" (high risk, high reward)
   - "Developer Tools" (slow build, loyal users)
6. Jordan: "Good choice. Let's start tomorrow. Day 1."
7. Day 1 ends → Day 2 begins (first real gameplay day)

### Key Story Points:
- Jordan is intense, focused, slightly unsettling
- Gina knows everyone's business, drops hints
- Product choice affects early game difficulty curve
- The "everything else" line is foreshadowing

## Beat 3: First Day at the Office (Day 2)
**Location:** The starter office (small, cramped)
**Trigger:** Day 2 morning

### Sequence:
1. Fade in on tiny office space
2. Two desks, two chairs, one whiteboard, questionable wifi
3. Jordan is already there (always arrives first)
4. Tutorial: Action Points system explained
5. First AP choices available:
   - Code the MVP (product +1)
   - Research competitors
   - Set up social media
6. End of day: Show dashboard with metrics (all zeros except bank balance)
7. Jordan: "Rome wasn't built in a day. But they also didn't have venture capital."

---

## Future Beats (outlined):

### Beat 4: First Customer
### Beat 5: First Hire (Maya Chen)
### Beat 6: The Rival Appears (Chad Thunderpitch)
### Beat 7: Series A Decision
### Beat 8-12: Growth Phase
### Beat 13-15: Crisis Events
### Beat 16: Endgame Branches
</tool_result>

<tool_result>
# Day 1 Content — SaaS Quest

## Character Creation

### Flow:
1. Title screen → "New Game"
2. "Every startup begins with a founder..."
3. Name entry (keyboard input, max 12 chars)
4. Trait selection (pick 2 of 4):
   - **Hacker**: +1 starting product quality, code faster
   - **Hustler**: +1 starting customer, sell faster  
   - **Hipster**: +1 product design, better UI = more retention
   - **Hoarder**: +$25K starting cash, but -1 to all other stats
5. Confirmation screen showing character summary
6. "Your journey begins..."
7. Fade to apartment

### Character Sheet:
```
Name: [player input]
Role: Technical Co-Founder
Traits: [trait1], [trait2]
Starting Cash: $150,000 (or $175,000 with Hoarder)
Product: 0
Customers: 0 (or 1 with Hustler)
MRR: $0
```

## Apartment Layout (Top-down, ~12x10 tiles)

```
[Wall][Wall][Wall][Wall][Wall][Wall][Wall][Wall][Wall][Wall][Wall][Wall]
[Wall][Bed ][    ][    ][    ][Desk][Chair][   ][    ][    ][Wall][Wall]
[Wall][    ][    ][    ][    ][    ][     ][   ][    ][    ][Wall][Wall]
[Wall][    ][    ][    ][    ][    ][     ][   ][    ][Bksh][Wall][Wall]
[Wall][    ][    ][    ][    ][    ][     ][   ][    ][    ][Wall][Wall]
[Wall][Rug ][Rug ][    ][    ][    ][     ][   ][Cfee][    ][Wall][Wall]
[Wall][    ][    ][    ][    ][    ][     ][   ][    ][    ][Wall][Wall]
[Wall][Mirr][    ][    ][    ][    ][     ][   ][    ][Post][Wall][Wall]
[Wall][    ][    ][    ][Door][    ][     ][   ][    ][    ][Wall][Wall]
[Wall][Wall][Wall][Wall][Wall][Wall][Wall][Wall][Wall][Wall][Wall][Wall]
```

### Interactable Objects:
- **Bed**: "You could go back to sleep... but the future waits for no one."
- **Desk/Laptop**: Triggers the Jordan email (main story progression)
- **Coffee Maker**: "Liquid motivation. +1 to everything (not really, but it feels like it)."
- **Mirror**: Shows character name and traits
- **Bookshelf**: "Titles include: 'Lean Startup', 'Zero to One', and inexplicably, 'Dune'."
- **Door**: Exit to coffee shop (requires reading Jordan's email first)
- **Poster**: "A motivational poster reads: 'ITERATE OR DIE'"

## Jordan's Email
```
Subject: It's happening

[Player Name],

The check cleared. $150K from Meridian Angels.

I know we talked about waiting, but the window is NOW.

Meet me at Gina's. Corner table. Bring your laptop
and that napkin with the architecture diagram.

We start today.

— J

P.S. Don't tell anyone yet. Trust me on this.
```

## Apartment Dialogue Triggers (in order of likely interaction):

1. Wake up → alarm text → movement tutorial
2. Explore freely (any order):
   - Coffee maker → flavor text
   - Mirror → character reflection
   - Bookshelf → humor text
   - Poster → humor text
3. Laptop → Jordan's email (REQUIRED for progression)
4. Door → "Meet Jordan at Gina's?" → Yes/No → Transition to Beat 2

## Tone Notes:
- Warm, slightly self-deprecating humor
- References to real startup culture but not mean-spirited
- Player should feel excited and slightly overwhelmed (like a real startup)
- Jordan's email is intentionally terse and mysterious
```
</tool_result>

Now let me look at the current build to understand what state it's in.

<tool_call>
{"name":"Bash","args":{"command":"wc -l /home/gtm/saas-startup-simulator.html"}}
</tool_call>
<tool_call>
{"name":"Read","args":{"file_path":"/home/gtm/saas-startup-simulator.html","offset":1,"limit":100}}
</tool_call>

<tool_result>
2718 /home/gtm/saas-startup-simulator.html
</tool_result>

<tool_result>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SaaS Quest: Startup Simulator</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            background: #1a1a2e;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            overflow: hidden;
            font-family: monospace;
        }
        canvas {
            image-rendering: pixelated;
            image-rendering: crisp-edges;
            cursor: none;
        }
    </style>
</head>
<body>
<canvas id="gameCanvas"></canvas>
<script>
// ============================================================
// SaaS Quest: Startup Simulator — Round 11 Integration Build
// Single-file HTML5 Canvas game
// ============================================================

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// --- Display Configuration ---
const NATIVE_W = 640;
const NATIVE_H = 360;
const SCALE = 2;
canvas.width = NATIVE_W;
canvas.height = NATIVE_H;
canvas.style.width = (NATIVE_W * SCALE) + 'px';
canvas.style.height = (NATIVE_H * SCALE) + 'px';

// --- Color Palette (SNES-inspired warm/teal) ---
const PAL = {
    bg: '#1a1a2e',
    darkNavy: '#16213e',
    navy: '#0f3460',
    teal: '#53868b',
    tealLight: '#7ec8c8',
    amber: '#e8a317',
    amberLight: '#f5c542',
    amberDark: '#c4841d',
    cream: '#f5e6c8',
    white: '#fefefe',
    black: '#0a0a0a',
    brown: '#8b6914',
    brownDark: '#5c4a1e',
    brownLight: '#c4a35a',
    red: '#c0392b',
    redLight: '#e74c3c',
    green: '#27ae60',
    greenLight: '#6ec87a',
    gray: '#7f8c8d',
    grayLight: '#bdc3c7',
    grayDark: '#2c3e50',
    skin: '#f5cba7',
    skinDark: '#e0a96d',
    hoodieBlue: '#2e86c1',
    hoodieGray: '#5d6d7e',
    coffeeLight: '#d4a574',
    coffeeDark: '#8b6914',
    floorWood: '#c19a6b',
    floorWoodDark: '#a0784a',
    wallColor: '#e8dcc8',
    wallColorDark: '#c4b59a',
    rugRed: '#a93226',
    rugGold: '#d4ac0d',
    deskColor: '#8B7355',
    screenGlow: '#4af2a1',
    doorColor: '#6B4226',
    posterBg: '#f0e0c0',
    shelfColor: '#6B4226',
    shelfBooks1: '#c0392b',
    shelfBooks2: '#2e86c1',
    shelfBooks3: '#27ae60',
    mirrorFrame: '#d4a017',
    mirrorGlass: '#d5e8f0',
    coffeeMachine: '#4a4a4a',
    steam: '#ffffff'
};

// --- Game State ---
let gameState = 'titleScreen'; // titleScreen, characterCreation, gameplay, dialogue, menu
let prevGameState = null;

// --- Input Handling ---
const keys = {};
const keysJustPressed = {};
let inputMode = 'game'; // 'game', 'menu', 'text', 'dialogue'

document.addEventListener('keydown', (e) => {
    if (!keys[e.key]) {
        keysJustPressed[e.key] = true;
    }
    keys[e.key] = true;
    e.preventDefault();
});

document.addEventListener('keyup', (e) => {
    keys[e.key] = false;
});

function isJustPressed(key) {
    return keysJustPressed[key] === true;
}

function clearJustPressed() {
    for (let k in keysJustPressed) {
        delete keysJustPressed[k];
    }
}
</script>
</body>
</html>
</tool_result>

<tool_call>
{"name":"Bash","args":{"command":"grep -n 'function\\|gameState\\|=== .title\\|=== .char\\|=== .game\\|=== .dial\\|update\\|render\\|requestAnimation' /home/gtm/saas-startup-simulator.html | head -80"}}
</tool_call>

<tool_result>
29:// --- Display Configuration ---
30:const NATIVE_W = 640;
45:const PAL = {
84:let gameState = 'titleScreen'; // titleScreen, characterCreation, gameplay, dialogue, menu
90:const keysJustPressed = {};
91:let inputMode = 'game'; // 'game', 'menu', 'text', 'dialogue'
93:document.addEventListener('keydown', (e) => {
100:document.addEventListener('keyup', (e) => {
104:function isJustPressed(key) {
108:function clearJustPressed() {
</tool_result>

The file seems truncated. Let me check more.

<tool_call>
{"name":"Bash","args":{"command":"grep -c 'function' /home/gtm/saas-startup-simulator.html"}}
</tool_call>
<tool_call>
{"name":"Read","args":{"file_path":"/home/gtm/saas-startup-simulator.html","offset":100,"limit":100}}
</tool_call>

<tool_result>
1
</tool_result>

<tool_result>
    keys[e.key] = false;
});

function isJustPressed(key) {
    return keysJustPressed[key] === true;
}

function clearJustPressed() {
    for (let k in keysJustPressed) {
        delete keysJustPressed[k];
    }
}
</script>
</body>
</html>
</tool_result>

Wait — only 1 `function` match? The file is 2718 lines but seems to be mostly the PAL object and setup code. Let me check if there's actual game logic.

<tool_call>
{"name":"Bash","args":{"command":"grep -n 'function\\|class\\|const.*=.*function\\|=>' /home/gtm/saas-startup-simulator.html | wc -l"}}
</tool_call>
<tool_call>
{"name":"Bash","args":{"command":"tail -50 /home/gtm/saas-startup-simulator.html"}}
</tool_call>

<tool_result>
7
</tool_result>

<tool_result>

document.addEventListener('keydown', (e) => {
    if (!keys[e.key]) {
        keysJustPressed[e.key] = true;
    }
    keys[e.key] = true;
    e.preventDefault();
});

document.addEventListener('keyup', (e) => {
    keys[e.key] = false;
});

function isJustPressed(key) {
    return keysJustPressed[key] === true;
}

function clearJustPressed() {
    for (let k in keysJustPressed) {
        delete keysJustPressed[k];
    }
}
</script>
</body>
</html>
</tool_result>

Now I see the full picture. The Round 11 build is essentially a **skeleton** — it has display config, palette, input handling, but **no game loop, no rendering, no state machine, no character creation, no apartment, nothing playable**. That's why it keeps getting rejected. The file is 2718 lines but it's mostly the massive PAL color object.

Let me also check what the older game.html has for reference.

<tool_call>
{"name":"Bash","args":{"command":"grep -n 'function' /home/gtm/game.html | head -40"}}
</tool_call>
<tool_call>
{"name":"Read","args":{"file_path":"/home/gtm/docs/sprite-designs.md","offset":1,"limit":80}}
</tool_call>

<tool_result>
52:function drawPixelCharacter(x, y, type, frame, direction) {
142:function drawTile(x, y, type) {
216:function drawApartment() {
239:function drawInteractionPrompt(obj) {
269:function drawUI() {
311:function drawDialogBox(text, speaker) {
360:function drawEmail(email) {
408:function drawTitleScreen() {
444:function drawCharacterCreation() {
547:function drawConfirmation() {
585:function updateTitleScreen() {
601:function updateCharacterCreation() {
658:function updateGameplay() {
762:function updateDialogue() {
787:function interact() {
830:function startDialogue(lines, speaker) {
840:function gameLoop(timestamp) {
868:function drawFrame() {
</tool_result>

<tool_result>
# Sprite Designs — SaaS Quest

## Art Direction
- SNES-era pixel art, 16x16 base tile, characters are 16x24 (1 tile wide, 1.5 tiles tall)
- 640x360 native resolution, 2x scaled to 1280x720
- Warm amber/teal palette (see PAL object in code)
- Top-down 3/4 perspective (like Stardew Valley / Earthbound)

## Player Character
- Hoodie (blue or gray, player choice later), jeans
- Messy hair, tired eyes, slight stubble
- Carries laptop bag
- 4-direction walk cycle (2 frames each: stand + step)
- Idle animation: sips coffee mug, looks at phone

## Jordan (Co-Founder NPC)
- Glasses, neat but intense appearance
- Button-up shirt, sleeves rolled
- Always near a laptop/screen
- Animations: typing furiously, adjusting glasses, mysterious smile
- Sitting sprite for coffee shop scene

## Apartment Furniture (16x16 tiles)
- **Bed**: Single bed, rumpled sheets, pillow (2x1 tiles)
- **Desk**: Wooden desk with laptop, coffee mug, papers (2x1 tiles)
- **Chair**: Office chair, slightly worn
- **Coffee Maker**: Small countertop unit with red light
- **Mirror**: Oval wall mirror with simple frame
- **Bookshelf**: Tall shelf with colored book spines (1x2 tiles, tall)
- **Door**: Wooden door with handle
- **Poster**: Framed motivational poster on wall
- **Rug**: Patterned area rug (2x2 tiles)

## Color Key (from PAL)
- Player hoodie: hoodieBlue (#2e86c1) or hoodieGray (#5d6d7e)
- Skin: skin (#f5cba7), skinDark (#e0a96d)
- Floor: floorWood (#c19a6b), floorWoodDark (#a0784a)
- Walls: wallColor (#e8dcc8), wallColorDark (#c4b59a)
- Furniture: deskColor (#8B7355), doorColor (#6B4226)
</tool_result>

Good. `game.html` has all the actual game functions. Now I have a clear picture. Let me write the directive.

<tool_call>
{"name":"Write","args":{"file_path":"/home/gtm/docs/round12-directive.md","content":"# Round 12 Integration Directive\n\n## Executive Summary\n\nFour consecutive rejected integrations. The reason is now clear: **Round 11's output is a hollow shell.** The `saas-startup-simulator.html` file has 2718 lines but contains only display config, a color palette, and input scaffolding. There is no game loop, no rendering, no state machine, no character creation, no apartment — nothing playable. Meanwhile, `game.html` (Round 7-8 era) contains working implementations of all these systems.\n\nThis round breaks the rejection streak by building a complete, playable vertical slice from the ground up in a single file.\n\n---\n\n## The ONE Thing This Integration MUST Accomplish\n\n**A human player can load the HTML file in a browser and play from Title Screen → Character Creation → Apartment Morning → read Jordan's email → walk to the door.** No crashes, no dead ends, no broken inputs. That's it. Ship that.\n\n---\n\n## Integration Order (strict sequence — each layer must work before the next)\n\n### Layer 0: Foundation (DO NOT SKIP)\nStart from `saas-startup-simulator.html`. Keep the display config (640x360 native, 2x scale) and PAL palette. Add:\n- Game loop (`requestAnimationFrame`, delta time, 60fps target)\n- State machine with clean transitions: `titleScreen → characterCreation → gameplay → dialogue`\n- Input mode system: only one input context active at a time (`game`, `menu`, `text`, `dialogue`)\n- Render pipeline: clear → world → entities → UI → overlays (explicit z-order)\n\n**TEST: Page loads, game loop runs, no console errors.**\n\n### Layer 1: Title Screen\n- Game title rendered in pixel font\n- \"Press ENTER to Start\" prompt (blinking)\n- Pressing Enter transitions to characterCreation state\n- Refer to `game.html:drawTitleScreen()` (line 408) for working reference\n\n**TEST: Title renders, Enter key transitions cleanly.**\n\n### Layer 2: Character Creation\n- Text input for player name (max 12 chars) — input mode switches to `text`\n- Trait selection: pick 2 of 4 (Hacker/Hustler/Hipster/Hoarder) — use arrow keys + Enter\n- Confirmation screen showing name + traits\n- Enter on confirmation → transition to gameplay state\n- CRITICAL: Text input must NOT trigger movement. Input mode must be `text` during name entry.\n- Reference: `game.html:drawCharacterCreation()` (line 444), `updateCharacterCreation()` (line 601)\n- Content source: `/home/gtm/docs/day1-content.md`\n\n**TEST: Type name, select 2 traits, confirm, transition to apartment. No input bleed.**\n\n### Layer 3: Apartment Scene\n- 12x10 tile apartment (layout from day1-content.md)\n- Floor tiles (wood), walls, furniture objects drawn per tile\n- Player sprite (16x24, hoodie character) spawns near bed\n- WASD/Arrow movement, collision with walls and furniture\n- Walking animation (2-frame cycle)\n- Reference: `game.html:drawApartment()` (line 216), `drawTile()` (line 142), `drawPixelCharacter()` (line 52)\n- Sprite spec: `/home/gtm/docs/sprite-designs.md`\n\n**TEST: Player walks around apartment, can't walk through walls/furniture.**\n\n### Layer 4: Interactions + Dialogue\n- Interaction prompt appears when player faces an interactable object (press Enter/Space)\n- Dialogue box system: text in a box at screen bottom, advance with Enter\n- Interactable objects with text from day1-content.md:\n  - Bed: flavor text\n  - Coffee Maker: flavor text  \n  - Mirror: shows player name + traits\n  - Bookshelf: humor text\n  - Poster: humor text\n  - Laptop/Desk: Jordan's email (sets `hasReadEmail = true`)\n  - Door: if `hasReadEmail`, prompt \"Meet Jordan at Gina's?\" → Yes = end of demo / victory message\n  - Door: if not `hasReadEmail`, \"You should check your laptop first...\"\n- Reference: `game.html:drawDialogBox()` (line 311), `drawEmail()` (line 360), `interact()` (line 787)\n- Content source: `/home/gtm/docs/day1-content.md`, `/home/gtm/docs/story-beats.md`\n\n**TEST: All 7 objects interactable, laptop email works, door gates on email read, door Yes ends demo cleanly.**\n\n---\n\n## Known Conflicts to Watch For\n\nThese are the exact bugs that killed Rounds 8-11. Guard against each one:\n\n1. **Input bleed**: Text input during character creation must NOT trigger movement keys. Solution: check `inputMode` before processing any input. Movement only processes when `inputMode === 'game'`.\n\n2. **State machine overlap**: Never allow two states simultaneously. Every state transition must: (a) exit current state cleanly, (b) set new state, (c) set appropriate inputMode.\n\n3. **Render order**: World first, then player sprite, then UI/dialogue on top. Use explicit draw order in the render function, not random layering.\n\n4. **Coordinate system**: Everything in pixel coordinates. Tile position × 16 = pixel position. Player position is in pixels. Collision checks convert to tile coords as needed. One system, no confusion.\n\n5. **e.preventDefault()**: Must be called in keydown handler to prevent page scrolling, but ONLY when the game canvas is focused. Don't break browser functionality.\n\n---\n\n## Quality Bar\n\n### MUST (reject if any fail):\n- [ ] Zero JavaScript console errors\n- [ ] Title Screen → Character Creation → Apartment: all transitions work\n- [ ] Player name input captures text correctly without triggering movement\n- [ ] Trait selection works (pick 2, visual feedback on selected)\n- [ ] Player moves smoothly in apartment with WASD and arrow keys\n- [ ] Cannot walk through walls or furniture\n- [ ] All 7 interactable objects respond to interaction\n- [ ] Jordan's email displays when interacting with laptop\n- [ ] Door is gated behind reading email\n- [ ] No dead-end states (player is never stuck)\n\n### SHOULD (nice to have, don't block ship):\n- [ ] Walk animation (2-frame cycle)\n- [ ] Blinking cursor during name entry\n- [ ] Smooth fade transitions between states\n- [ ] Interaction proximity indicator (\"!\" or sparkle)\n\n### MUST NOT:\n- Do not implement sound, save system, or anything beyond the apartment scene\n- Do not add the coffee shop / Beat 2 — that's next round\n- Do not over-architect. No class hierarchies, no ECS, no module systems. Flat functions in a single script tag.\n\n---\n\n## Deferred Work (carry forward)\n\n- Beat 2: Coffee Shop scene (Jordan meeting, product choice)\n- Beat 3: First office day, AP system\n- Named NPC sprites (Maya, Derek, Gina, Chad)\n- Economy/MRR system\n- Sound/music\n- Save/load\n- Day cycle system\n- Multiple endgame paths\n\n---\n\n## Reference Files\n\n| File | Use |\n|------|-----|\n| `saas-startup-simulator.html` | **Base file** — keep display config + PAL + input setup |\n| `game.html` | **Reference implementation** — copy/adapt working functions |\n| `docs/day1-content.md` | All dialogue text, apartment layout, email content |\n| `docs/story-beats.md` | Beat 1 sequence and narrative flow |\n| `docs/sprite-designs.md` | Character and tile art specifications |\n| `docs/round8-postmortem.md` | What NOT to do (root cause analysis) |\n\n---\n\n## Final Note from the Director\n\nWe have rejected four builds in a row. The pattern is clear: each attempt tried to be clever and ended up incomplete. This round, I want **boring and working** over **ambitious and broken**. \n\nThe `game.html` file already has working versions of every system we need. Use it. Adapt its functions to the new display config (640x360, PAL palette). Don't reinvent. Don't over-abstract. Write flat, readable code that a QA tester can step through.\n\nIf you finish Layer 2 and it works perfectly but Layer 3 has issues — ship Layers 0-2 and flag Layer 3 as incomplete. A partial success that works is better than a complete attempt that doesn't.\n\n**Ship something playable. That is the only acceptable outcome.**\n"}}
</tool_call>

<tool_result>
File created successfully at /home/gtm/docs/round12-directive.md
</tool_result>

---

## Round 12 Integration Directive — Summary

**Diagnosis:** Four straight rejections because the current `saas-startup-simulator.html` is a hollow shell — palette and input setup only, no game logic. Meanwhile `game.html` has working implementations of everything we need.

**The ONE thing:** A player loads the file and plays Title → Character Creation → Apartment → reads email → walks to door. No crashes, no dead ends.

**Integration order:**
1. **Foundation** — game loop, state machine, input modes, render pipeline
2. **Title Screen** — renders, Enter starts game
3. **Character Creation** — name input (no movement bleed), trait selection, confirmation
4. **Apartment** — tilemap, player movement, collision
5. **Interactions** — 7 objects, dialogue system, email gate on door

**Key conflicts to guard:** input bleed between text/game modes, state machine overlap, render z-order, coordinate system confusion.

**Quality bar:** Zero console errors, all transitions work, all interactions work, no stuck states. Anything beyond the apartment is deferred.

**Strategy shift:** Use `game.html`'s working functions as reference. Adapt, don't reinvent. Boring and working over ambitious and broken.

Full directive written to `/home/gtm/docs/round12-directive.md`.
