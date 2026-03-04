# Game Mechanics Design Doc — Round 8

## 1. Core Gameplay Loop

**Wake → Spend 3 AP at Terminal → See Outcomes → End Day → Watch Burn → Repeat.**

Each day: player walks to terminal, opens decision menu, picks 3 actions (1 AP each), reads outcome dialogs, then confirms "End Day." HUD updates: day increments, cash drops by $2,740, any earned MRR adds to cash. Loop until cash hits $0 or player reaches mid-game unlock.

## 2. Specific Mechanics

**Starting State:** Day 1, Cash $150,000, MRR $0, AP 3/3, Product Progress 0%, Customers 0.

**Three Actions:**
- **Build Product**: +5-12% product progress (random). Below 25% progress, sales actions have halved success rates — you're selling vaporware.
- **Research Market**: Adds a hidden "market insight" counter (0-5). Each point increases sales conversion by +8%. Occasional dialog reveals a tip: "Founders want integrations, not dashboards."
- **Sales Outreach**: Base 25% chance of landing a customer. Each customer = +$200-500 MRR (random). Modified by product progress and market insight. Below 25% product: 12% chance. At 50%+ product with 3+ insights: 45% chance.

**Daily Burn:** $2,740/day flat. MRR accumulates monthly — every 30 days, `cash += mrr * 30`. This forces early pain: MRR doesn't save you until Day 30.

## 3. Progression Gates

- **Product v0.1 (25%)**: Unlocks full sales conversion rates. Dialog: "It's ugly, but it works."
- **Product v0.5 (50%)**: Sales outcomes can yield $500 MRR customers instead of $200. "Prospects stop asking if you have a landing page."
- **Product v1.0 (100%)**: Unlocks mid-game hiring menu (Round 9+).
- **$3,000 MRR**: Second mid-game gate — proves revenue before hiring.

## 4. Difficulty Curve

At pure-build (3 builds/day), player hits v1.0 around Day 12 but has $0 MRR and $117,120 cash left — 43 days of runway with no income. At pure-sales from Day 1, terrible conversion burns cash while producing nothing. **Optimal play: ~8 days building to v0.5, then mix sales and build.** This gives ~Day 55 survival with moderate MRR. Tight but winnable. Bad strategy bankrupts around Day 40-45.

## 5. Player Feedback Loops

Every action produces a typed-out outcome message (4-5 variants per action). Failed sales sting: "They said they'll 'circle back.' They won't." Successful builds feel earned: "You shipped auth. Users can finally log in... to nothing." MRR gains trigger a brief HUD flash. Crossing each product milestone shows a special dialog. Below $30,000 cash, the HUD cash display turns red — panic mode.

## 6. Engineered Fun Moment

**"The First Dollar."** When the player lands their first customer, the entire HUD pulses once, the MRR counter ticks from $0 to a real number, and the dialog reads: *"Someone is paying you real money. For software you wrote. In a hoodie. The future is now."* This is the screenshot moment — the number going from zero to not-zero. It's deliberately hard to get before Day 5, making the payoff land.