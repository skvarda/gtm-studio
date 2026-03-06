Now I have full context. Here's the strategic brief:

---

# ORCHESTRATOR BRIEF — Round 19

## Priority One: Ship a Complete, Runnable Game File

The Round 18 developer output is **truncated and broken**. The code cuts off mid-map definition (line ~5 of the map array). Variable names were over-compressed (`P`, `B`, `TL`, `SOL_SET`) to the point of unreadability, and the build was never finished. Meanwhile, the canonical working codebase remains `saas-startup-simulator.html` (Round 9, 1744 lines) — untouched and functional but missing every feature designed since Round 12.

**The single most important outcome this round: `game.html` must open in a browser and run a playable game with all existing Round 9 systems intact, plus victory states and save/load.** Nothing else matters if the file is truncated or crashes.

## Features to Implement

### 1. Victory States (4 paths)
Evaluate at day-end: IPO Glory (cash ≥ $50K + customers ≥ 50), Profit Machine (cash ≥ $30K + positive burn for 10 days), R&D Utopia (product progress ≥ 100%), World Domination (customers ≥ 100 + team ≥ 5). Tinted overlay fade, co-founder stands up, stats box with line-by-line reveal, "NEW GAME" blink. Each path gets a distinct tint color from the palette (`vIPO`, `vPr`, `vRD`, `vWd`).

### 2. localStorage Save/Load
Auto-save at day-end. Title screen shows "Continue (Day X)" if save exists. Load restores full state: day, cash, customers, product, team, milestones. Save icon flash in HUD corner (4x4 floppy, 45 frames).

### 3. Co-Founder Purple Monitor Easter Egg (deferred from R17/R18)
After Day 15, co-founder's desk gets a second monitor with purple flicker. Interaction triggers the meta-game dialog. One-time flag. This was cut twice — it's time to ship it.

## Direction to Agents

**Developer:** Build from `saas-startup-simulator.html` (1744 lines). Do NOT start from scratch or from the truncated Round 18 output. Do NOT compress variable names — readability matters more than line count. Target ≤ 1000 lines via helper consolidation, not minification. Output must be a complete, runnable single HTML file. If you're approaching output limits, cut the easter egg before cutting victory states.

**Art Director:** Provide the exact PAL object for Round 19. Include `vIPO`, `vPr`, `vRD`, `vWd` tint colors for victory overlays and a `purpleMon` color for the easter egg monitor. Keep the existing palette stable — no churn on colors that already work.

**Game Designer / Mechanics:** Finalize victory thresholds. They must be reachable within 60-90 in-game days given current burn/revenue math. Provide the exact conditions, priority order, and victory dialog text for each path.

**GTM / Narrative:** Write the four victory screen stat-card layouts for screenshot shareability. Write the purple monitor easter egg dialog (one interaction, ≤ 30 words). Write the "Continue (Day X)" title screen copy.

**QA:** Test all four victory paths are triggerable. Test save/load cycle (play → close tab → reopen → continue). Test that the easter egg only appears after Day 15. Verify no console errors on load.

**Scope / Producer:** If the developer signals output limits, the cut order is: (1) purple monitor easter egg, (2) save icon animation, (3) line-by-line stats reveal. Victory states and save/load are non-negotiable.

## Bugs & Quality Issues to Fix

1. **CRITICAL: Round 18 build was truncated.** The entire output was incomplete. Do not build on it.
2. **Variable naming:** Round 18 used single-letter names everywhere (`P`, `B`, `T`). Use readable names (`PAL`, `bctx`, `TILE`). We're not shipping minified source.
3. **Two-file confusion:** After this round, delete `saas-startup-simulator.html`. One file: `game.html`. No ambiguity.
4. **Employee sprite stacking:** Known since Round 16 — employees at the same desk overlap without X-offset. Apply `index * 1` pixel offset.

---

**Orchestrator Round 19**