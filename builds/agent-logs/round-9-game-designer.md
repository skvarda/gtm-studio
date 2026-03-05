# Game Mechanics Design Doc — Round 9: "The First Hire"

## 1. Core Gameplay Loop

Wake → Spend AP (build/sell/hire) → Employees work passively → End-of-day summary → Burn tick → Repeat. The loop now has a **leverage layer**: each AP spent hiring compounds future output, but accelerates the death clock. The player stops asking "what do I do today?" and starts asking "what does my *team* do today?"

## 2. Specific Mechanics

**Hiring (Door Interaction, 1 AP):**
- Developer: +$1,800/day burn. Each dev adds +3-6% product progress passively at end-of-day (random roll). Devs are slow-compound value — they make your product better, which makes *your* sales attempts more likely to close.
- Salesperson: +$1,500/day burn. Each salesperson runs one passive sale at 60% of the player's current close rate (which is product-quality dependent). Salespeople are high-variance — they can save a run or drain cash closing nothing.
- Cap: 4 hires. Rejection text: "No more desk space. The co-founder won't share his."
- Names pulled randomly from a const pool. No duplicates.

**Passive End-of-Day Resolution:**
Devs roll first (product improves), then salespeople attempt closes against the *updated* product quality. This ordering matters — it means a dev hire on Day 5 makes your salesperson's Day 5 attempt slightly better. Subtle compounding the player can discover.

## 3. Progression Gates

- **First hire unlocked from Day 1** — no gate. The tension IS the gate (can you afford the burn?).
- **Hiring employee #3 and #4** should feel scary. At 4 employees + base burn, you're losing ~$9,000+/day. You need meaningful MRR or you're dead in under a week.

## 4. Difficulty Curve

Solo play (Days 1-5) is tight but survivable. First hire (Days 3-7) adds pressure. Second hire is the cliff — burn roughly doubles from starting rate. The player must have revenue by hire #3 or they're in a death spiral. This creates a natural "terror valley" around Days 8-12.

## 5. Player Feedback Loops

End-of-day summary is the core feedback surface. "Dev Priya shipped a bugfix (+5%)" and "Sales Marcus closed a deal (+$95 MRR)" make employees feel *alive*. Conversely, "Sales Jordan struck out today" while burning $1,500 teaches cost-of-bad-hires viscerally.

## 6. Engineered Fun Moment

**The First Passive Sale.** The player hires a salesperson, ends the day, and for the first time sees revenue they *didn't manually click for*. The summary reads: "Sales Kenji closed a deal! +$110 MRR." It's the moment the company feels real — you built something that works without you. Chase that dopamine. It's the startup fantasy distilled into one line of text.