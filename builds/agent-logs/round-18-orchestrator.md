---

# ORCHESTRATOR STRATEGIC BRIEF — Round 18

## Situation Assessment

The Round 17 developer output is **truncated mid-definition** — it cuts off inside the `SOL` (solidity) object at line ~30 of the script. This is the third time we've had a truncation failure. The game.html on disk is still the Round 7 build (32px tiles, 675 lines). The saas-startup-simulator.html (Round 9, 1744 lines, 320x224 native res) remains our most complete working codebase. **Round 17's consolidation, victory states, and save/load were not delivered.**

## #1 Priority: Ship a Complete, Runnable game.html

This is non-negotiable. We cannot keep producing truncated output. The Developer must build from `saas-startup-simulator.html` (Round 9) as the canonical base and deliver a **complete, runnable** `game.html`. If the file risks exceeding output limits, **aggressively compress**: collapse sprite helpers into parameterized functions, use data arrays instead of verbose draw calls, minimize whitespace. Target 700 lines. If a feature threatens completeness, cut it — a working 600-line game beats a truncated 900-line one every time.

## Features to Implement (in priority order)

1. **Victory States & Stats Screen** — Four endgame paths (IPO: $50k cash + 50 customers; Profit Machine: $30k cash + 3 consecutive profitable days; R&D Utopia: product level 10; World Domination: 100 customers + 10 employees). Tinted overlay fade, co-founder stands up, stats box with line-by-line reveal, "NEW GAME" prompt. This is the core loop completion.

2. **localStorage Save/Load** — Auto-save at day-end. Title screen shows "Continue (Day X)" if save exists. Load restores day, cash, customers, product, team. Save icon flash in HUD. This is the retention hook.

3. **Co-Founder Purple Monitor Easter Egg** — Deferred from Round 17, now in scope. After Day 15, second monitor appears on co-founder's desk with purple flicker. Interact to trigger meta-dialog: "You glance at the screen. It's... a spreadsheet? No, wait — it's a game. Inside a game. You feel briefly uncertain about the nature of your Series A." One-time flag, 3 lines of code max for the trigger.

## Direction to Agents

- **Scope**: Do NOT expand beyond these three features. Everything else is polish for later rounds.
- **Art Director**: Provide the exact PAL object, victory tint colors per path (gold/green/blue/red), and the co-founder standing sprite spec. Keep it minimal.
- **Mechanics**: Define exact victory thresholds, save/load schema, and the Day 15 easter egg trigger condition. No new systems.
- **GTM/Narrative**: Write the four victory screen stat-box texts and the purple monitor dialog. That's it.
- **Developer**: Build from `saas-startup-simulator.html`. Your output MUST be complete. If you are approaching length limits, stop adding features and close out the file. A runnable game with two victory paths beats a truncated game with four. Test mentally: does the `</script></body></html>` exist at the end?
- **QA**: Verify completeness first. Does the file parse? Do all braces close? Then check victory triggers and save/load.

## Bugs to Fix

1. **Truncation** — The game file must be complete. This is bug #1, #2, and #3.
2. **Codebase divergence** — Delete references to the old 32px tile system. One coordinate system: 320x224 native, 16px tiles, 3x scale.
3. **Employee sprite stacking** — Round 17 scope noted index-based X-offset fix. Apply it: each hired employee gets `i * 1` pixel X-offset to prevent overlap.

---

*Orchestrator Round 18*