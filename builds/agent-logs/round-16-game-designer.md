# Game Mechanics Design Doc — Round 16

## 1. Core Gameplay Loop

Day-end is now the decision point that matters. Each day close triggers: burn calculation → MRR collection → victory condition check → auto-save. Players feel the squeeze every night — am I closer to winning or closer to zero? The loop shifts from survival to *trajectory awareness*. You're not just alive, you're aiming.

## 2. Specific Mechanics to Implement

**Victory Condition Checks (evaluated at day-end, in order):**
- **IPO Glory**: cash ≥ 500K AND customers ≥ 50 AND productProgress ≥ 150
- **Profit Machine**: track a `profitStreak` counter. If MRR ≥ burn × 3, increment. If not, reset to 0. Win at streak = 5.
- **R&D Utopia**: productProgress ≥ 200 AND employees.filter(e => e.role === 'dev').length ≥ 3
- **World Domination**: customers ≥ 100 AND cash ≥ 300K AND productProgress ≥ 120

Check IPO last — it's the "obvious" path and shouldn't shadow quieter wins. Check Profit Machine first so skilled players get rewarded for efficiency even if they also qualify for others.

**Save/Load**: Serialize full game state to `localStorage` key `saas-sim-save` at day-end. Title screen reads save, shows "Continue (Day X)" button. New Game clears save.

**Co-Founder Tell**: Boolean flag `cofounderEvolved`. Set true at Day 16 start. Swaps co-founder desk tile to variant with second monitor. On any victory trigger, queue co-founder dialog before stats screen.

## 3. Progression Gates

- Days 1-10: Survival. Hire 1-2 people. Cash trends down.
- Days 11-18: Inflection. MRR should approach burn rate. First strategic fork — stack devs or stack sales?
- Days 19-30: Victory pursuit. Skilled players close a path by Day 25. Average players by Day 32.

## 4. Difficulty Curve

Profit Machine is hardest — requires disciplined hiring to keep burn low while MRR scales. World Domination requires 3+ salespeople early, meaning high burn risk. IPO is the balanced "default" path. R&D Utopia rewards dev-heavy teams but needs patience.

## 5. Player Feedback Loops

- Flash cash green/red on day-end based on net change
- Show `profitStreak` as a small flame icon (1-5 flames) in the HUD — visible even if you're not pursuing Profit Machine
- Milestone toast at 50% thresholds: "25 customers — halfway to domination"

## 6. Engineered Fun Moment

**The Profit Machine snap.** On streak day 4, the HUD flame icon pulses. The music pitch-shifts up slightly. The player knows one more clean day wins it. Then the random event rolls. If it's a churn event or server cost spike, the tension is *unbearable*. One bad day resets the streak to zero. That near-miss creates the "one more run" compulsion better than any victory screen.