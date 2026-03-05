# Round 10 — Developer Scope & Prioritization

## BUILD (in priority order)

**1. Day Cycle State Machine**
Player starts day → sees action menu → picks action → resources update → day ends → repeat. This is the entire game right now. States: `DAY_START` → `ACTION_MENU` → `ACTION_RESULT` → `DAY_END` → loop. Simple switch-based FSM, no fancy transitions.
*Complexity: Medium. ~150-200 lines. Touches game state, input, and rendering.*

**2. HUD Resource Bar**
Fixed bottom bar showing: Cash ($), Burn Rate ($/day), Product (%), Team Size. Rendered every frame on top of everything. Static layout, bitmap font numbers, 4 icon sprites.
*Complexity: Low. ~80-100 lines. Self-contained rendering code.*

**3. First Hire Dialogue**
When player picks "Hire Developer" or "Hire Salesperson" for the first time, show 3-4 line dialogue box sequence. Textbox with portrait, advance on keypress. Updates team roster and burn rate.
*Complexity: Low-Medium. ~120 lines. Needs dialogue box renderer + scripted sequence.*

## CUT / DEFER

- **Office tilemap scrolling or room transitions** — one static screen is fine
- **Walk animations / player movement** — menu-driven is sufficient for the loop
- **Save/load system** — not needed until the loop is proven
- **Co-founder NPC interactions** — late-game content, ignore completely
- **Sound/music integration** — silent is fine, wire audio later
- **Meeting action** — two actions (build/hire) are enough, meetings add nothing yet

## NON-NEGOTIABLES

- Game compiles and runs before any new code lands
- Full day loop is playable: start → choose → result → repeat
- Cash reaches zero = game over screen
- Resource math matches designer spec ($500/day burn, +10% product per work day)

## KNOWN RISKS

- **Round 9 timeout**: Codebase state is unknown. First task is build verification — could eat significant time if broken
- **Asset gaps**: HUD icons and dialogue portraits may not exist yet. Use colored rectangles as placeholders, do not block on art
- **Scope pressure**: "Just one more feature" is the enemy. Three items, no more