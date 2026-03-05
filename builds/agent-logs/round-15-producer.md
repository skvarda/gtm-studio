# Round 15 — Scope & Prioritization

## BUILD

1. **Random Events System** — 12 events, 40% chance/day after Day 5, two-choice dialogs via existing `showMenu()`, 5-day cooldown per event, outcomes applied to gameState. *Complexity: High. ~200 lines. Touches endDay(), needs new gameState fields (eventHistory, eventPool).*

2. **Product Milestones** — 4 tiers (MVP/30, Beta/60, V1.0/100, Scale/150). Celebration dialog on hit, passive customer acquisition bump, remove progress cap. *Complexity: Medium. ~60 lines. Milestone check in endDay() after progress update, gate customer growth behind MVP.*

3. **localStorage Save/Load** — Auto-save end of day, "Continue" option on title screen, corrupt save fallback (just delete it). *Complexity: Low. ~40 lines. JSON round-trip on gameState, guard with try/catch.*

## CUT / DEFER

- **Whiteboard sprite updates per milestone** — Deferred. Art polish, not gameplay. Ship milestones without visual whiteboard changes.
- **Screen flash/pulse VFX for events** — Deferred. Events work fine with dialog alone. No rendering changes this round.
- **Co-founder Y-position bug** — Cosmetic. Fix only if time remains.
- **Sound design** — Already scoped out. Stays out.

## Non-Negotiables

- Events must use existing `showMenu()` — zero new UI code
- No event can silently kill the player; if cash hits 0, game over must fire
- MVP milestone gates customer growth — this gives product progress actual meaning
- Save corruption must not crash the game

## Known Risks

- **Event balance** — Numbers need playtesting. Bad events that feel unfair will kill retention. Start conservative (low end of -$5k to -$15k range), tune later.
- **gameState bloat** — Adding eventHistory, milestones, save/load means gameState is now the source of truth for everything. Any missed field in the save object = broken load. Serialize the entire object, not cherry-picked fields.
- **Milestone + event stacking** — If a milestone fires the same turn as an event, player gets two dialogs back-to-back. Acceptable, but event dialog must come first (it's the surprise), milestone second (it's the reward).