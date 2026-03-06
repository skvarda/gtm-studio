---

## QA Playtesting Report — Round 28

### 1. What Works Well

The pixel art rendering pipeline is solid — native 320x224 buffer scaled 3x with `imageSmoothingEnabled = false` produces clean, authentic SNES visuals. The Y-sorted renderable system ensures correct sprite overlap. The HUD is information-dense without being cluttered: cash, MRR, burn, runway, AP, product %, customers, and team comp all visible at a glance. The dialog queue system handles chained narrative beats gracefully. The hiring confirmation flow (menu → confirm → result) prevents costly mis-clicks. Interaction prompts ("Z" bubble, "HIRE" sign) appearing contextually near objects is good spatial UX for a tile-based game.

### 2. Top 3 Bugs / Anticipated Issues

1. **Title screen still says "Round 9: The First Hire"** (line 17) and the hiring teaser on the title screen reads "NEW: Hire developers & salespeople!" — this is 19 rounds stale. Feels like a build that was never updated. Players see a game that doesn't know what version it is.

2. **Menu cursor infinite loop risk.** If all options are disabled, the `do...while` loops at lines 1586-1593 will spin forever. Currently nothing triggers this, but one bad `disabledIndices` array will hard-lock the game.

3. **No win condition exists.** Product can hit 100%, MRR can grow indefinitely, but there's no endgame trigger — no IPO, no Profit Machine, nothing. The game just... continues until you die or get bored. This is the single biggest structural gap after 28 rounds.

### 3. Feel Assessment

Movement feels slightly sluggish — 140ms per tile with a 220ms hold delay means traversing the 20x14 map is tedious. The office is small enough that this should feel snappy, not wading-through-mud. Dialog typewriter at 28ms/char is fine. The co-founder's periodic "?" bubble is a nice touch but there's no payoff yet.

### 4. Pacing Assessment

Day pacing is player-controlled (manual `endDay`), which is correct per director preferences. However, 3 AP with only 3 meaningful actions (build/research/sell) means every day plays identically: spend 3 AP, end day, read summary. No tension in the decision because there's no opportunity cost beyond the obvious. Days blur together by Day 10.

### 5. One Improvement That Would Make the Most Difference

**Implement at least one win condition.** Without it, there is no game — just a sandbox with a loss state. Even a simple "reach $10K MRR" victory screen would give players a goal to optimize toward and make every AP decision feel consequential. The four endgame paths (IPO, Profit Machine, R&D Utopia, World Domination) have been in the design doc since the beginning. Ship one.