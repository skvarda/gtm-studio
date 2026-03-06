# Round 19 Scope & Prioritization

## BUILD (3 items, priority order)

**1. Victory States (4 paths)**
Complexity: Medium. Day-end check against four threshold sets, tinted overlay, stats display, "NEW GAME" button. The logic is simple conditionals; the rendering is a semi-transparent rect + text. No animation beyond a blink timer. Estimate: ~80 lines added to the existing codebase.

**2. localStorage Save/Load**
Complexity: Low-Medium. Serialize game state to JSON at day-end, deserialize on title screen "Continue" selection. The state object is small (day, cash, customers, product progress, team array, milestones). Title screen gets one conditional line. Estimate: ~40 lines.

**3. Employee Sprite X-Offset Fix**
Complexity: Trivial. Add `index * 1` px horizontal offset in the employee render loop. One line change. Ships because it's free.

## CUT / DEFER

- **Purple Monitor Easter Egg** — Deferred to Round 20. Cut twice already; cutting it a third time is better than shipping a truncated file. It's flavor, not mechanics.
- **Save Icon Animation** — No floppy disk sprite flash. Save happens silently. Users don't need visual confirmation for auto-save.
- **Line-by-Line Stats Reveal** — Victory stats render all at once. The staggered animation is polish, not function.
- **Any new map tiles, NPC dialog, or feature creep** — Nothing beyond the three items above.

## Non-Negotiables

1. `game.html` opens in a browser and runs without errors
2. All Round 9 systems (hiring, tasks, revenue, burn, HUD, map, movement) remain intact
3. All four victory paths are reachable and triggerable
4. Save/load survives a tab close/reopen cycle
5. Readable variable names — no minification

## Known Risks

- **Output truncation** — the only real threat. Developer must build from the working 1744-line `saas-startup-simulator.html`, not from scratch. If approaching limits: cut easter egg (already cut), then save icon (already cut), then stats formatting.
- **Victory balance** — thresholds must be reachable in 60-90 days. If burn math makes a path impossible, that's a shipped bug. Designer must validate numbers against actual revenue/cost curves before code locks.