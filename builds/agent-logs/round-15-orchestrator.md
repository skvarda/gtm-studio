Now I have a complete picture of the codebase. Let me write the strategic brief.

---

# Orchestrator Strategic Brief — Round 15

## Priority #1: Random Events System

The game has a solid core loop (move, interact, hire, build/research/sell, end day) but every day feels the same. The Round 12 design docs explicitly call for a random events system, and it's the single highest-impact feature missing. Events are what make each playthrough unique, create viral screenshot moments, and force real strategic decisions. Without them, the game is a spreadsheet with walking. This round, events ship.

## Features to Implement

**1. Random Event Engine (PRIMARY)**
Implement a pool of 10-12 random events that fire with ~40% chance per day after Day 5. Each event presents a two-choice dialog using the existing menu system — no new UI needed. One choice is "safe but costly," the other is "risky but rewarding." Events modify cash, customers, product progress, or morale. Events cannot repeat within 5 days. Include: Server Outage, TechCrunch Feature, Competitor Launch, Key Employee Poached, VC Coffee Meeting, Churn Spike, Viral Tweet, Regulatory Scare, Office Lease Hike, Feature Request Avalanche. Wire this into `endDay()` — check probability, pick event, show dialog, apply outcomes.

**2. Product Milestones & Whiteboard Updates**
Four tiers: MVP (progress 30), Beta (60), V1.0 (100), Scale (150). Hitting a milestone triggers a celebration dialog, bumps passive customer acquisition rate, and visually updates the whiteboard drawing. MVP is the gate — no meaningful customer growth until it ships. This gives the product progress bar actual *meaning* and creates satisfying checkpoint moments.

**3. localStorage Save/Load**
Auto-save game state at end of each day. On the title screen, if a save exists, show "Continue" option. Save object: day, cash, MRR, customers, product progress, market insight, team roster, event history, milestone flags. This is critical for retention — players lose progress every browser refresh right now.

## Direction to Agents

- **Developer**: Implement all three features above in `saas-startup-simulator.html`. The event system is your primary deliverable. Use the existing `showMenu()` for event choices. Add a `gameState.eventHistory` array and `gameState.milestones` object. Wire milestone checks into `endDay()` after updating product progress. localStorage save/load uses `JSON.stringify`/`parse` on the gameState object.
- **Art Director**: Update the whiteboard sprite to reflect milestone progress — empty at start, scribbles at MVP, diagrams at Beta, full roadmap at V1.0. Add subtle visual flair for events (screen edge flash for crises, brief green pulse for good news). Keep it minimal — 1-2 pixel accent changes, not animation overhaul.
- **Sound Designer**: No audio implementation yet. Skip this round.
- **Narrative/GTM**: Write the event dialog text. Each event needs: a setup line (2 sentences max, punchy startup humor), two choices with clear tradeoff language, and a short outcome message for each path. Reference the Round 12 doc for tone — "@CloudDad69" energy. The TechCrunch moment sequence is mandatory.
- **QA**: Test event probability distribution, milestone trigger accuracy, save/load integrity (corrupt save handling), and that events respect the 5-day cooldown. Verify no event can put cash below 0 without triggering game over. Test that product progress > 100 (from milestone tier changes) doesn't break the progress bar.
- **Game Designer**: Balance event outcomes. Bad events should sting (-$5k to -$15k, or -1 to -3 customers) but be survivable with a cash buffer. Good events should feel rewarding but not game-breaking. The TechCrunch → Support Ticket one-two punch is the signature sequence — make sure the numbers create tension without guaranteed death.

## Bugs & Quality Issues to Fix

1. **Product progress capped at 100** but milestones go to 150 — change `Math.min(100, ...)` to `Math.min(200, ...)` in `doBuild()` and the employee passive section, or better, remove the cap entirely.
2. **Co-founder sprite renders at wrong Y** — line 1716-1717 places him at `(cofounder.gy + 1) * T` for both position and sort, but his desk is at gy=10 and he should be sitting behind it, not a full tile lower.
3. **No feedback when interacting with empty space** — player presses Z facing nothing and nothing happens. Add a subtle "Nothing here." or better, just face that direction silently (already works, but confirm).
4. **Title screen still says "NEW: Hire developers & salespeople!"** — this was new in Round 9. Remove the "NEW:" prefix. Replace with something that teases events: "Random events will test your startup!"

---

Orchestrator Round 15