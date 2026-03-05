# Round 12 — Scope & Prioritization

## BUILD (3 Items)

**1. Random Event System**
12 events, two choices each, triggering from Day 5 onward. Uses existing dialog/menu system for presentation. Weighted probability: 40% neutral, 30% negative, 30% positive.
- **Complexity: Medium.** Event pool is data; the trigger/choice/outcome engine is ~150 lines wired into the day-end sequence.

**2. Product Milestone Tiers**
Four named gates: MVP (30), Beta (60), V1.0 (100), Scale (150). MVP gates customer acquisition. Each milestone fires a celebration dialog and bumps conversion rate.
- **Complexity: Low.** Mostly conditional checks on existing `productProgress` value plus 4 dialog entries. Whiteboard visual swap is a sprite change.

**3. localStorage Save/Load**
Save game state on day-end, load on title screen. Serialize: day, cash, team, customers, productProgress, event history.
- **Complexity: Low.** Single `JSON.stringify`/`parse` pair. Add "Continue" option to title menu.

## CUT / DEFER

- **Sound effects** — Deferred to Round 13. Improves feel but adds zero gameplay. Not worth the debug surface this round.
- **Cofounder sprite Y-offset bug** — Cosmetic. Defer unless it takes <5 minutes.
- **Art-heavy whiteboard states** — Ship milestone text changes only. Pixel art whiteboard variants are Round 13 scope.
- **Event count beyond 12** — 12 is enough for variety. Don't gold-plate to 15.

## Non-Negotiables

- Events MUST use existing dialog/menu system — no new UI paradigms
- MVP gate MUST block customer growth — this is the core strategic tension
- No writes to `/tmp/` — all file output to `/home/gtm/`
- Regression: hiring, cash flow, day-end cycle must pass manual smoke test

## Known Risks

- **Event balance** — Overtesting needed. One busted event (e.g., lose all customers) can wreck a run. Cap maximum single-event loss at 30% of current customers.
- **Save corruption** — Schema changes in future rounds break old saves. Add a version field now; don't solve migration yet.
- **Day-end sequence bloat** — Events + milestones + save all fire at day-end. Keep execution order explicit: events → milestone check → save → advance.