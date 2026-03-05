# Round 15 — Game Mechanics Design Doc

## 1. Core Gameplay Loop

Wake → Walk to desk → Choose action (Build/Research/Sell) → End Day → **Event Check** → Milestone Check → Auto-save → Repeat. The event check is the new heartbeat. Every end-of-day now has tension: "what's going to happen tonight?" This transforms the loop from predictable optimization into reactive decision-making.

## 2. Specific Mechanics

**Random Events:** 40% trigger chance per day after Day 5. Pool of 12 events, each with two choices. Cooldown: no repeat within 5 days. Outcomes are immediate — applied before the next day starts.

- **Bad events** cost $5k-$15k or 1-3 customers. Safe choice mitigates ~60% of damage. Risky choice has 50/50 to dodge entirely or take 120% damage.
- **Good events** grant $3k-$10k, 2-5 customers, or 10-20 product progress. Safe choice gives the floor. Risky choice has 40% chance of 2.5x payoff, 60% chance of nothing.

**Milestones:** MVP (30 progress) unlocks passive customer gain (+1/day per salesperson). Beta (60) doubles it. V1.0 (100) triples and unlocks premium pricing ($200 MRR/customer). Scale (150) unlocks endgame paths.

**Save/Load:** Auto-save end of day. Title screen shows "Continue (Day X, $Yk)" if save exists.

## 3. Progression Gates

- **Day 5:** Events unlock. No training wheels after this.
- **MVP (30):** Customer acquisition turns on. Before this, selling yields one-off cash but no recurring revenue growth.
- **V1.0 (100):** Premium pricing. This is the "real business" gate.
- **Scale (150):** Endgame menu appears.

## 4. Difficulty Curve

Days 1-5: Safe sandbox, learn actions. Days 5-15: Events introduce variance but stakes are low ($5k hurts, isn't lethal with $50k+ runway). Days 15-25: Events hit harder as expectations scale — losing 3 customers when you have 8 is devastating. Days 25+: Events become strategic puzzles, not survival threats.

## 5. Player Feedback Loops

**Positive:** Milestone hit → celebration dialog → whiteboard updates visually → passive income increases → cash buffer grows → risky event choices become viable → bigger rewards. **Negative:** Ignoring product → no MVP → no passive customers → cash bleeds → forced into safe event choices → slower growth. Both loops are legible within 2-3 days.

## 6. Engineered Fun Moment: The TechCrunch Doom Cycle

Day 12-18 window: TechCrunch Feature fires. Choice: "Go all in on press" (+8 customers, +$5k) or "Stay focused on product" (+3 customers, +15 progress). If player takes the customers, the *next eligible day* forces a Support Ticket Avalanche: lose 3 customers or spend $12k on emergency support. Net gain is still positive, but the emotional whiplash — rich Tuesday, broke Thursday — is the moment players screenshot. The math: +8 customers then -3 = +5 net, or +$5k then -$12k = -$7k net. One resource wins, the other loses. No free lunch.