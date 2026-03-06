---

# ORCHESTRATOR BRIEF — Round 16

## Priority #1: Endgame Victory Conditions

We're 16 rounds deep. The core loop works — movement, hiring, events, day cycle, dialog. What's missing is *the point*. Players can grind days but there's nothing to win. This round, we implement the four endgame paths and the win screen that makes players want to replay.

**Victory conditions to implement:**
- **IPO Glory**: Reach $500K cash + 50 customers + product progress 150. Triggers IPO sequence.
- **Profit Machine**: Sustain 5 consecutive days where MRR exceeds burn by 3x. Quiet, efficient win.
- **R&D Utopia**: Hit product progress 200 with 3+ devs. The product transcends the market.
- **World Domination**: 100 customers + $300K cash + product progress 120. You ate the market.

Each victory triggers a unique 3-line dialog, a screen tint, and returns to a stats summary showing days survived, peak cash, total hires. Then offer "New Game" to restart.

## Feature #2: localStorage Save/Load

The design doc from Round 12 specced this and it's still missing. Auto-save at day end. On title screen, show "Continue (Day X)" if save exists. Save: day, cash, MRR, AP, product progress, customers, employees array, event cooldowns, milestone flags. This is table stakes for a game people will actually play across sessions.

## Feature #3: Co-Founder Late-Game Tell

Per the narrative doc: after Day 15, a second monitor appears on the co-founder's desk tile. After any victory condition is met, the co-founder stands up and delivers one line: *"I knew you'd figure it out. Now let me show you what I've been building."* Screen fades. That's it — sequel hook. Don't over-reveal. The mystery is the product.

## Direction to Agents

- **Developer**: Implement victory condition checks at day-end. Add localStorage save/load. Add co-founder desk evolution (second monitor sprite after Day 15). Wire victory dialogs and stats summary screen. Keep it under the existing architecture — no refactors.
- **Art Director**: Design the victory screen tint colors (gold for IPO, green for Profit, blue for R&D, red for Domination). Ensure the stats summary screen uses the existing palette. Second monitor on co-founder desk should be a subtle 2-pixel addition.
- **Game Designer**: Balance the victory thresholds. They should be achievable by Day 25-35 with good play. Profit Machine should be the "quiet skill" path, IPO the "obvious" one. World Domination should require aggressive sales hiring.
- **Narrative**: Write the four victory dialog sets (3 lines each). Write the co-founder's single reveal line. Keep the tone: dry startup humor, earned satisfaction, hint of something bigger.
- **QA**: Test all four victory paths are reachable. Test save/load round-trips correctly. Test that game-over (cash hits 0) still works alongside victory conditions. Verify no state leaks between new games.
- **GTM/Marketing**: The victory screen is the screenshot moment. Make sure the stats summary is visually shareable — players will post "Day 22 IPO" vs "Day 31 Profit Machine" comparisons. That's organic replay pressure.

## Bugs to Fix
- The Round 15 palette definition was truncated mid-value (`positive:'#4`). Ensure all PAL entries are complete.
- Verify the door tile (tile 9) collision is consistent — in `saas-startup-simulator.html` doors are passable, in `game.html` they're blocked during certain states. Pick one behavior.
- Employee sprites may stack visually if two occupy adjacent desk tiles. Add a 1px offset per employee index.

---

**Orchestrator Round 16**