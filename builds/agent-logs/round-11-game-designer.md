# Mechanics Design Doc — Round 11

## 1. Core Gameplay Loop

Wake → Spend AP at terminal (Build/Research/Sales) → End Day → **Random Event fires** → Make choice → See consequences → Cash burn deducts → Next day. The event system injects a decision point *after* the player has committed their AP, meaning they can't optimize around it. This is intentional — startups don't schedule their crises.

## 2. Specific Mechanics

**Event System**: Pool of 14 events. Each day-end, 60% chance an event fires. Roll weighted random from eligible pool (events have state guards). Each event offers 2-3 choices with concrete mechanical outcomes.

Event outcome ranges (tuned to early-game cash of ~$2000-5000):
- Cash deltas: -$500 to +$1000
- MRR deltas: -$50 to +$150
- Product progress deltas: -10% to +15%
- Employee loss: 0 or 1

**Weighted tiers**: Neutral/flavor events (weight 3), minor positive (weight 2), minor negative (weight 2), major positive (weight 1), major negative (weight 1). Same event can't fire twice in 5 days (cooldown tracking).

**State guards**: "Employee Poached" requires employees ≥ 1. "Server Outage" requires product ≥ 20%. "Churn Wave" requires MRR ≥ $200. "Angel Call" requires day ≥ 5 and cash < $3000. Co-founder flavor events have no guards.

## 3. Progression Gates

| Milestone | Trigger | Unlock |
|---|---|---|
| **First Revenue** | MRR ≥ $100 | Sales events enter pool |
| **Real Product** | Product ≥ 50% | "Acquisition Offer" event unlocked |
| **Team Built** | Employees ≥ 3 | "Culture Crisis" event, team-scaling events |
| **Survivor** | Reach Day 15 | Co-founder story events begin |

Milestones display as 4 small checkbox icons below the HUD. Filled = achieved. Permanent once earned.

## 4. Difficulty Curve

Days 1-5: Only neutral/flavor events fire. Lets player learn base loop safely. Days 6-10: Full event pool opens, but major negatives still rare (weight 0.5). Days 11+: Full weights active, multiple-negative streaks possible. Cash burn increases by $50 every 10 days to maintain pressure.

## 5. Player Feedback Loops

**Positive spiral**: Higher MRR → survive negative events → reach milestones → unlock better event options. **Negative spiral check**: If cash < $1000, "Emergency Loan" event gets weight 4 — offers $2000 at cost of future MRR (-$100/day starting Day 20). This is a rubber-band mechanic disguised as narrative.

## 6. Engineered Fun Moment

**"The Angel Call"**: Fires when cash is critically low (<$3000, day ≥ 5). Investor offers $5000 but demands you fire your first hire, OR $2000 with no strings. Players with one beloved employee face a genuine gut-punch. The fired employee's desk goes empty. The co-founder says "...harsh." This is the moment players screenshot.