## Build Report: ap_system_email_inbox

### What Changed
1. **Action Point System** — Implemented as standalone AP object with `initAP()`, `canSpendAP()`, `spendAP()`, `getAPRemaining()`, `getAPMax()`, `drawAPPips()` matching Marcus's spec signatures exactly.
2. **Email Inbox with Choices** — Major addition. ~15 emails now have binary choices with effects (flags, morale, customers, product, cash). New `email_choice` UI state with navigation. `selectEmailChoice()` applies effects. `initEmailPhase()` and `exitEmailPhase()` per spec.
3. **Day Cycle** — Refactored into `startDay()`, `startAfternoon()`, `startEvening()`, `advanceDay()`, `endDayManually()`, `getCurrentPhase()` per spec. Phase transitions are explicit function calls.
4. **HUD Display** — Updated with phase-colored indicator (morning=gold, afternoon=green, evening=indigo). AP pips via `drawAPPips()`. Runway uses `formatRunway()`.
5. **New Actions** — Added Recruit (2 AP), Whiteboard Session/Plan (1 AP), Grab Coffee/Network (1 AP), Pitch Investors/Fundraise (3 AP), Market Research (1 AP). Fundraise success chance influenced by `investor_interested` flag from emails.
6. **Palette** — Merged Marcus's spec palette (uiGold, uiBg, morning/afternoon/evening colors, etc.) with existing colors.
7. **Scrollable Action Menu** — 11 actions now scroll in an 8-item window to fit 360px height.
8. **Email-to-gameplay bridge** — Email choices set flags (e.g., `investor_interested`) that affect action outcomes (e.g., fundraise success rate). Maya/Derek hire flags set for future hiring system integration.

### What Was Attempted But Cut
- Email choice "preview effects" tooltip — too cluttered for the small detail panel.
- AP pip animation on spend — deferred, pure visual polish.

### What's Fragile
- **Action menu scroll** — Works but if more actions are added (>15), the description area at bottom gets squeezed. Consider pagination for future rounds.
- **Email choice effects** — Currently only supports additive effects. No negative cash effects or conditional effects.  Flag system is simple key=true, no complex state.
- **Morale** — Tracked and displayed but doesn't mechanically affect anything yet. Future rounds should wire morale to churn, productivity, or random events.

### Recommendations for Next Round
- Wire `maya_hired`/`derek_hired` flags into actual employee system with salaries and stat bonuses.
- Add morale mechanics (affects productivity, churn rate, random events).
- Build location transitions — the afternoon phase is pure menu; adding office walk-around would use the tile_movement system.
- Consider adding a "skip to afternoon" shortcut for experienced players who don't want to read every email.
- The `investor_interested` flag boosting fundraise is a good pattern — more cross-system flag effects would add depth.