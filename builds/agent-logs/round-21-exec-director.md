Now I have full context on the codebase. Let me write the strategic brief.

---

## GTM Studio — Strategic Brief, Round 21

### Priority 1: Victory Conditions & Endgame Paths

The game currently has no win state. Product progress can hit 100% with zero consequence. Cash runs out and you lose. That's it. **Round 21 must add endgame paths and victory conditions.** This is the single most important missing piece — without it, we don't have a game, we have a toy.

### Features to Implement

**1. Product Launch Milestone & Victory Paths (PRIMARY)**

When product progress hits 100%, trigger a "v1.0 Launch" event. After launch, unlock the four endgame paths as terminal menu options, each with specific thresholds:

- **IPO Glory**: Reach $5,000 MRR + 50 customers + 6 team members. The prestige ending.
- **Profit Machine**: Reach cash-flow positive (MRR income > burn) and sustain for 10 days. The bootstrap ending.
- **R&D Utopia**: Reach 100% product + 10 Market Insight + 3+ devs. The tech ending.
- **World Domination**: Reach $10,000 MRR + 100 customers. The scale ending.

Each victory triggers a unique ending screen with pixel art and stats summary. Add a "Victory" game phase alongside the existing "gameOver" phase.

**2. Random Events System**

Every 5-7 days, trigger a random event via dialog: server outage (-product%), viral tweet (+customers), competitor launch (-sales chance), VC interest (+cash offer with strings), key employee poaching risk. These create mid-game texture and replayability. Keep it to 8-10 event types. Events should present a choice where possible (e.g., "Take the VC money?" yes/no).

**3. Product Launch Visual Polish**

When v1.0 launches, flash the screen green, show a special dialog sequence. Post-launch, the terminal monitor glow should change color. The HUD should show "v1.0 LIVE" instead of the percentage. This signals to the player that the game has shifted phases.

### Direction to Downstream Agents

- **Work from `saas-startup-simulator.html`** (1744 lines, Round 9 codebase). This is the canonical file. Ignore `game.html` — it's an older Round 7 build.
- Do NOT rewrite from scratch. Extend the existing codebase in place.
- Victory screens should reuse the existing `drawGameOver` pattern but with green/gold colors and different messaging.
- Random events should use the existing `showDialog` + `showMenu` systems. No new UI framework needed.
- Keep the endgame checks in `endDay()` — that's the natural place to evaluate win conditions.
- The product launch event should fire exactly once when `productProgress` hits 100. Add a `launched` boolean to `gameState`.
- Maintain the existing pixel art style and PAL color system. New colors for victory screens should be added to PAL.

### Bugs & Quality Issues to Fix

- **Co-founder sprite Y-position is wrong**: Line 1716-1717 renders cofounder at `(cofounder.gy + 1) * T` which places them one tile too low. The sprite draws at `gy+1` then the body draws upward, but the Y-sort key is also `(cofounder.gy + 1) * T + T`, double-offsetting. Verify and fix.
- **Menu escape selects last option blindly**: Line 1599 sets cursor to last option and calls `menuSelect()`. If the last option isn't "Cancel," this executes an unintended action. Add a proper cancel/close path.
- **Hold-to-move can stick**: If you press two directions simultaneously, `lastDir` tracking can desync. Not critical but polish it if touching movement code.
- **Title screen "NEW: Hire" text** (line 1393) is stale after 12 rounds. Remove or replace with current feature callout.

---

*Signed,*
**Executive Director, Round 21**
*GTM Studio*