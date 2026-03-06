# Round 20 Scope & Prioritization

## BUILD (Top 3)

**1. Victory Conditions & End Screens**
Check four win paths at end-of-day. Each path: simple threshold check against game state, trigger a victory screen with stats + flavor text, then stop the game loop. No composite scoring — just boolean "met all thresholds" checks.
- **Complexity**: Medium. Biggest piece is wiring four condition checks and rendering a victory screen overlay.
- **Estimate**: ~150 lines of logic + screen rendering.

**2. Random Events System**
Every 5-7 days (randomized), fire one event from a pool of 6-8. Each event: dialog with two choices, each choice applies a state delta. Cooldown prevents repeats. No events before day 4.
- **Complexity**: Medium. Event engine is a weighted pick + cooldown tracker. Each event is just data (text + two callbacks).
- **Estimate**: ~120 lines for engine, ~80 lines for event definitions.

**3. Product Launch Milestone (v1.0)**
When product hits 100%, fire a one-time dialog. Flip a `launched` flag. Boost sales success rate. Replace "Build Product" with "Scale Product" (smaller gains, higher MRR/customer).
- **Complexity**: Low. One flag, one conditional swap, one dialog trigger.
- **Estimate**: ~40 lines.

## CUT / DEFER

- **HUD path tracker with icons** — defer to Round 21. Victory checks work without visible progress bars.
- **Composite 0-100% scoring per path** — overkill. Use simple boolean thresholds.
- **Victory jingle / event sounds / launch fanfare** — defer all audio. Silent wins are fine.
- **Deleting `game.html`** — trivial but not a build priority. Note it, do it if time permits.
- **Premium pricing tiers post-launch** — defer. Flat MRR boost is enough for now.

## Non-Negotiables

1. All four victory paths are checkable and trigger an end screen
2. Random events fire mid-game with meaningful choices
3. Product launch fires exactly once and changes game state
4. Game-over (cash ≤ 0) still takes priority over victory checks

## Known Risks

- **Victory thresholds may be unreachable** with current burn rates. Need a playtest pass after implementation — budget time for one tuning adjustment.
- **Event callbacks mutating state** could introduce bugs if they fire simultaneously with other state changes (hiring, end-of-day burn). Events must resolve before burn calculates.
- **Direction/interaction bug** from the brief is real but non-blocking — defer the `tryInteract` facing audit to Round 21.