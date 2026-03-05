# Game Mechanics Design Doc — Round 10

## 1. Core Gameplay Loop

**Start Day → Read Morning Flavor → Choose Action → See Result → Check Resources → End Day.**

Each day costs $500 in burn. The player starts with $15,000 (30 days of runway with zero team). Every action takes one full day. There is no free lunch — skipping a day still burns cash. The loop ends when cash hits zero (game over) or product reaches 100% and revenue exceeds burn (you survive).

## 2. Specific Mechanics

**Daily Actions (pick one):**
- **Work on Product**: +10% product completion. Solo founder rate. Each developer hired adds +8% per day passively.
- **Hire Developer**: Costs $2,000 signing bonus, adds $400/day to burn rate. Adds passive product progress.
- **Hire Salesperson**: Costs $1,500 signing bonus, adds $350/day to burn. Generates $200/day revenue per 25% product completion (rounded down). A salesperson selling a 50% product earns $400/day.
- **Go to Meeting**: Costs nothing. 40% chance of gaining one customer worth $150/day revenue, 30% chance of nothing, 30% chance of "pivot pressure" event (lose 1 day to existential dread, no progress).

**Resource Formulas:**
- `daily_burn = 500 + (devs × 400) + (sales × 350)`
- `daily_revenue = (customers × 150) + (sales × 200 × floor(product_pct / 25))`
- `end_of_day_cash = cash - daily_burn + daily_revenue`

## 3. Progression Gates

- **Day 1-3**: Pure survival tutorial. No hires affordable without accepting risk.
- **Day 7**: If product < 30%, morning text warns "investors are asking questions."
- **Day 15**: If revenue < burn, co-founder appears for the first time: "We should talk."

## 4. Difficulty Curve

Days 1-5 are forgiving — solo burn is low. Days 6-12 spike hard as hires add burn before generating value. Days 13-20 reward good sequencing as revenue compounds. First-time players should die around Day 8-12. Skilled players stabilize by Day 10.

## 5. Player Feedback Loops

- **Positive**: Revenue ticking up turns the cash HUD number green. New hire triggers a celebratory jingle and dialogue.
- **Negative**: When runway drops below 5 days, HUD cash flashes red. Morning flavor text gets increasingly panicked.

## 6. Engineered Fun Moment

**First Hire.** When the player hires their first team member, the game pauses. A pixel-art character walks into the office. Three lines of dialogue play: they're nervous, they believe in the vision, they ask where the snacks are. The office jingle plays. The team counter ticks from 1 to 2. It should feel like the loneliness just broke. This is the moment players remember.