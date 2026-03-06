---

## ORCHESTRATOR BRIEF — ROUND 20

### Priority #1: Win Conditions & Endgame Paths

We are 20 rounds in with solid core mechanics (movement, hiring, terminal actions, day cycle, burn rate, dialog/menu systems) but **zero win conditions**. The game has no goal beyond "don't run out of money." This round we ship the four endgame paths so the game is actually completable.

### Features to Implement

**1. Victory Paths & Milestone System**
Add four trackable victory paths with milestone thresholds:
- **IPO Glory**: Reach $50K MRR, 200+ customers, 100% product, team of 6 → triggers IPO sequence
- **Profit Machine**: Net positive cash flow for 30 consecutive days with $500K+ cash
- **R&D Utopia**: 100% product, 5+ market insight, 3+ devs, ship 3 "breakthrough" features
- **World Domination**: $100K MRR, 500+ customers, all employee slots filled

Each path gets a victory screen with stats summary and a unique flavor message. Track progress in the HUD — add a small "Paths" indicator showing which ones are closest.

**2. Random Events System**
Every 5-7 days, trigger a random event via dialog that forces a strategic decision:
- "A competitor launched a similar product" → lose customers or spend AP to respond
- "A blog post went viral" → bonus customers if product > 50%
- "Key employee wants a raise" → pay more burn or risk losing them
- "VC offers Series A" → take $500K but add board pressure (higher burn)
- "Server outage" → lose MRR temporarily, spend AP to fix

This gives mid-game variety and replayability. 6-8 events minimum.

**3. Product Launch Milestone**
When product hits 100%, trigger a "v1.0 Launch" event with a special dialog sequence. After launch, sales success rates permanently increase, and a new "Scale Product" action replaces "Build Product" at the terminal (gives smaller incremental gains but unlocks premium pricing tiers that boost MRR per customer).

### Direction to Agents

- **Art Director**: Design victory screens for each of the four paths. Keep the 16-bit SNES aesthetic. Add a small trophy/flag icon system for the HUD path tracker.
- **Sound Designer**: Add a victory jingle (short, triumphant, chiptune). Add an event notification sound (distinct from normal dialog). Add a "product launch" fanfare.
- **Writer**: Write victory screen text for all four paths (2-3 paragraphs each, humor intact). Write 8+ random event descriptions with choice text. Write the v1.0 launch sequence dialog.
- **Developer**: Implement victory condition checking each end-of-day. Build the random events engine (weighted random, cooldown timer, choice callbacks). Wire up product launch milestone. Add victory screen rendering. **Use `saas-startup-simulator.html` as the canonical file — ignore `game.html`.**
- **QA**: Test all four victory paths are reachable. Verify random events don't fire on day 1-3. Confirm product launch triggers exactly once. Check that game over still works correctly alongside new victory checks.
- **Game Designer**: Balance the victory thresholds — they should be achievable in 60-120 days of game time with good play. Ensure no path is trivially easy or impossibly hard with $150K starting cash and current burn rates.

### Bugs & Quality Issues to Fix
- The co-founder sprite renders at `(cofounder.gy + 1) * T` which places them one tile lower than their logical position — verify this is intentional or fix the offset
- `game.html` is an outdated Round 7 version that should be deleted to avoid confusion
- The `window.TILE` / direction mapping inconsistency between `tryInteract` (down=0, up=1) and visual expectations should be audited — several testers reported facing the wrong way when interacting
- Menu cursor wraps infinitely if all options are disabled — add a safety break

---

**Orchestrator Round 20**