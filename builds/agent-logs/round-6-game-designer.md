# Game Mechanics Design Doc — Round 6

## 1. Core Gameplay Loop

**Walk → Interact → Decide → Wait → React.** Each real-time second equals one game day. The player walks the office, interacts with objects (desks, co-founder, hiring board), makes resource allocation decisions, then watches the consequences play out through the HUD. The tension is simple: cash goes down, and only smart hiring makes revenue go up faster than burn.

## 2. Specific Mechanics

**Economy Engine**: Cash starts at $500,000. Base burn rate: $2,000/day. Each developer adds $8,000/month ($267/day) to burn. Each salesperson adds $6,000/month ($200/day). Revenue = customer_count × $49/30 per day (~$1.63/customer/day). Customers acquired per day = salesperson_count × 0.5 × (1 + product_quality/20). Product quality increases +1/day per developer. Customers churn at 3%/month (1 lost per 33 customers per day).

**Hiring**: Interact with the hiring board (wall-mounted whiteboard). Choose Developer or Salesperson. Hire is instant but costs start next day. Cap: 4 total employees in Round 6. Each hire gets a visible desk and sprite in the office — the room fills up.

**Co-Founder Interaction**: 10 cryptic lines, randomly selected, no repeat until all seen. No mechanical effect. Pure narrative seasoning.

## 3. Progression Gates

- **Day 1-30**: Survival tension. No revenue. Every day the cash number drops. First decision: dev or sales?
- **Day 60-90**: First customers arrive if you hired a salesperson. MRR crosses $100.
- **Day 150+**: Compound growth kicks in if balanced correctly. Cash curve inflects upward.
- **Day 250+**: Breakeven possible. "Ramen profitable" milestone.

## 4. Difficulty Curve

Hiring a developer first is the "hard mode" — better long-term but delays revenue. Hiring sales first is "easy mode" — immediate revenue but low product quality caps growth. Hiring nothing is a death spiral (200-250 day runway). Optimal play: sales first, dev second around day 40, reaches breakeven ~day 200.

## 5. Player Feedback Loops

- **HUD updates every day**: Cash (red when <$50K), MRR (green when growing), Day count, Employee count.
- **Milestone toasts**: "First customer!", "MRR $1K!", "$100K remaining — runway getting short."
- **Visual feedback**: Office fills with employees. Empty office = lonely. Full office = thriving.
- **Cash color shifts**: White → yellow (<$100K) → red (<$50K) → flashing red (<$20K).

## 6. Engineered Fun Moment

**"The First Customer" pop-up on ~Day 20-30** (if salesperson hired early). The HUD flashes, a little chime-style visual sparkle appears, and the message reads: *"Holy shit — someone is paying you $49/month. For software you built. In your pajamas."* This is the moment the player feels the loop click. Revenue is no longer zero. The game shifts from pure dread to possibility. It's the emotional hook that keeps them playing through the mid-game grind.