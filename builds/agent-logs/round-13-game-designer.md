# Round 13 — Mechanics Design Doc

## Core Gameplay Loop

Each day-tick: customers generate revenue, revenue offsets burn rate, morale modifies productivity. The player's job shifts from "survive" to "optimize the engine." Hire salespeople to fill the pipeline, hire devs to reduce churn through product quality, manage morale to keep the multiplier positive. Every decision now has a visible consequence on the customer board.

## Specific Mechanics

**Customer Pipeline.** Daily acquisition = `salespeople * 0.4 + (productQuality > 50 ? 0.2 : 0)`, fractional accumulation tracked internally. Daily churn = `customers * churnRate`, where `churnRate = max(0.02, 0.15 - (productQuality * 0.001))`. Each customer = $500 MRR. Board displays up to 24 customer icons (4x6 grid). Gained customers fade in green; churned customers flash red then vanish.

**Revenue Milestones.** Three gates, each checked at end-of-day:
- **First Dollar**: customers >= 1. Unlocks: celebratory dialog, +5 morale.
- **Ramen Profitable**: `customers * 500 >= burnRate`. Unlocks: lights brighten (palette swap background tiles +1 value), "Default Alive" sticky renders on wall, +10 morale.
- **PMF Signal**: customers >= 15 AND churnRate < 0.10. Unlocks: VC email event queued for next day, +15 morale, co-founder raises coffee mug (single sprite swap).

Each milestone fires once, saved to state.

**Morale System.** Team morale: 0-100, starts 70. Modifiers per day-tick: `-3` if AP spent exceeds `teamSize * 2` (overwork), `-8` on layoff, `-2` per day below Ramen Profitable after Day 15 (despair), `+3` coffee machine interaction (1x/day), `+5` on milestone. Productivity multiplier: `0.7` at morale 0, `1.0` at morale 50, `1.15` at morale 80+. Applied to dev output and sales conversion. At morale <30: "Threatening to Quit" event — lose the employee unless you spend 2 AP on a team pizza (+12 morale).

## Progression Gates

Day 8-10: First Dollar (confirms pipeline works). Day 12-15: Ramen Profitable (survival secured). Day 18-22: PMF Signal (unlocks endgame arc). Missing a gate by 5+ days triggers a co-founder check-in dialog hinting at strategy.

## Difficulty Curve

Early churn is brutal (15% base) to make dev hiring feel urgent. Once product quality passes 50, churn drops enough that growth compounds. The morale tax on overwork prevents brute-forcing AP. The sweet spot: player must balance 2 salespeople + 2 devs by Day 15 or the math doesn't work.

## Player Feedback Loops

Positive: board fills, lights brighten, speech bubbles show hearts. Negative: board empties with red flashes, storm clouds over employees, burn rate line in HUD turns red. Every number has a visual mirror.

## Engineered Fun Moment

**The Ramen Flip.** The day revenue first exceeds burn, the HUD cash delta switches from red negative to green positive. The sticky appears. The lights shift. One employee gets a heart bubble. No fanfare dialog until the player walks to the whiteboard and interacts — then the founder says: *"We're not dying anymore."* Quiet. Earned. Screenshottable.