# Game Mechanics Design Doc — Round 20

## 1. Core Gameplay Loop

The daily loop now has stakes: **Act → Event Check → Burn → Victory Check**. Each day-end evaluates all four victory paths against current state. Players feel the tension of multiple meters rising simultaneously — MRR climbing toward IPO while cash dwindles, forcing the question: push for glory or pivot to profit?

## 2. Specific Mechanics

**Victory Tracking**: Each path stores a 0-100% composite score derived from its sub-thresholds. IPO = average of (MRR/50K, customers/200, product/100, team/6). Display the leading path's icon + percentage in the HUD corner. Players can open a full Paths panel showing all four.

**Random Events**: Roll every day against a 15-20% chance (guaranteeing roughly one event per 5-7 days). Maintain a 4-day cooldown after each event fires. Events are weighted by game state — "competitor launches" can't fire before day 10; "VC offers Series A" requires MRR > $5K. Each event presents exactly two choices. Choices have immediate numeric consequences (±customers, ±burn, ±cash, ±AP).

**Product Launch**: When product reaches 100%, queue a mandatory event next day-start. Post-launch: sales actions gain +30% customer conversion, "Build Product" becomes "Scale Product" (costs 2 AP, adds +$5 MRR-per-customer premium pricing). Launch fires exactly once via a `hasLaunched` flag.

## 3. Progression Gates

- **Days 1-10**: Pure survival, no events, learn mechanics
- **Days 10-25**: Events begin, product likely 40-60%, first hire decision matters
- **Days 25-50**: Product launch window, second/third hire, MRR should hit $5-15K
- **Days 50-90**: Victory path commitment, events create divergence pressure
- **Days 90-120**: Closing window — if no path is above 70%, you're probably losing

## 4. Difficulty Curve

Starting cash of $150K with ~$3K/day burn gives ~50 days runway before first revenue. Each hire adds ~$500-800/day burn. Victory requires aggressive reinvestment — hoarding cash leads nowhere. The "safe middle" is a trap by design.

## 5. Player Feedback Loops

- Path percentages tick up visibly after relevant actions (dopamine)
- Events reference your actual state ("Your 47 customers noticed the outage")
- Burn rate turning green (net positive) is a major visual reward
- Approaching any path threshold triggers a "milestone nearby" HUD pulse at 80%

## 6. Engineered Fun Moment

**"The Launch."** Product hits 100%. Screen flash. Chiptune fanfare. The co-founder walks over unprompted — his only proactive action in the entire game — and says: *"Version 1.0. Not bad. I handled the DNS."* Then walks back. Players will screenshot this. It's the moment the game earns its heart.