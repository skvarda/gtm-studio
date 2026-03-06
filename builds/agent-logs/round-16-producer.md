# Round 16 — Scope & Prioritization

## BUILD (Top 3)

**1. Victory Conditions + Win Screen**
Check four win states at day-end. On trigger: show 3-line dialog, tinted overlay, stats summary (days survived, peak cash, total hires), "New Game" button that resets state. This is the round's reason to exist.
- *Complexity*: Medium. Logic is simple conditionals. The stats screen is a new UI panel but reuses existing dialog/overlay patterns. Profit Machine needs a `consecutiveProfitDays` counter — one new state variable.

**2. localStorage Save/Load**
Auto-save full game state at day-end. Title screen shows "Continue (Day X)" if save exists. Serialize: day, cash, MRR, AP, productProgress, customers, employees array, consecutiveProfitDays, milestone flags.
- *Complexity*: Low-Medium. Straightforward JSON serialize/deserialize. Main risk is missing a state field and getting a corrupted resume.

**3. Bug Fixes (palette truncation, employee sprite stacking)**
Fix the truncated `positive:'#4` palette value. Add 1px Y-offset per employee index to prevent visual stacking.
- *Complexity*: Low. Both are one-line fixes.

## CUT / DEFER

- **Co-founder late-game tell** (second monitor sprite, reveal dialog). Defer to Round 17. It's narrative polish, not core gameplay. Zero impact on playability.
- **Door tile collision reconciliation**. Defer. Pick "passable" as default, revisit when it actually breaks something.
- **Victory screen "shareability" polish**. Not this round. Get the win screen working first; make it pretty later.

## Non-Negotiables

- All four victory paths must be triggerable and testable
- Save/load must round-trip without state loss
- Game-over (cash = 0) must still function alongside victory checks
- "New Game" must fully reset state (no leaks from previous run)

## Known Risks

- Profit Machine's "5 consecutive days" tracker can silently break if MRR or burn calculation has off-by-one errors — needs explicit logging during test
- Save schema has no versioning yet; future rounds will break old saves. Accept this debt now, solve in Round 17
- Victory thresholds may be unreachable by Day 35 — need one manual playtest per path before calling it done