# Round 9 Scope & Prioritization

## BUILD (Top 3)

**1. Hiring Menu via Door Interaction**
Player interacts with door → menu offers Developer ($1,800/day burn, 1 AP) or Salesperson ($1,500/day burn, 1 AP). Add `gameState.employees[]` array, 4-hire cap, dynamic burn rate update. Random name assignment from const pool.
- **Complexity: Medium.** Reuses existing dialog/menu system. Main work is state management and burn rate wiring.

**2. Passive Employee Effects at End-of-Day**
Extend `endDay()`: each Developer rolls +3-6% product progress, each Salesperson runs a sale attempt at 60% player rate. Results appear in end-of-day summary text.
- **Complexity: Medium.** Logic is straightforward but must integrate cleanly with existing endDay flow and respect product cap at 100%.

**3. Whiteboard Team Roster**
Door interaction on whiteboard tile shows team list (name, role, days employed) via existing dialog system. No new UI.
- **Complexity: Low.** Pure text output using existing systems.

## CUT / DEFER

- **Employee sprites in the office** — deferred, text-only representation this round
- **Employee morale, leveling, or quitting** — future round
- **Hiring interview mini-game** — cut
- **Detailed per-employee stats screen** — cut, roster is enough
- **Sound effects for hiring** — deferred

## NON-NEGOTIABLES

- Hiring **must** increase `dayBurn` permanently and correctly
- Passive effects **must not** push product above 100%
- Game over **must** still trigger correctly with higher burn
- 3 bug fixes (dead code cleanup, cofounder Y-position, terminal operator precedence)

## KNOWN RISKS

1. **Balance:** If devs compound too fast, mid-game becomes trivial. Mitigate by testing a 4-dev scenario — product shouldn't hit 100% before day ~15 with all devs and no player building.
2. **End-of-day summary bloat:** With 4 employees reporting, the summary text could feel like a wall. Keep messages to one line each, max 6 lines total.
3. **Burn rate death spiral:** A player who hires 4 people on day 2 should lose fast. This is intended, but verify it doesn't feel unfair — the menu should show the new daily burn before confirming.