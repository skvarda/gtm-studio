# Mechanics Design Doc — Round 18

## 1. Core Gameplay Loop

Day cycle unchanged: **Morning (hire/build) → Afternoon (events) → Evening (revenue tick, expenses deduct, day-end auto-save)**. Round 18 adds a termination condition — every day-end now checks four victory predicates. Hit one, the loop ends, overlay fires. Save/load means the loop persists across sessions.

## 2. Specific Mechanics to Implement

**Victory State Checks** (evaluated at day-end, after cash/customer update):
- **IPO Glory**: `cash >= 50000 && customers >= 50`
- **Profit Machine**: `profitStreak >= 3` (track consecutive days where `revenue - expenses > 0`; reset to 0 on any loss day)
- **R&D Utopia**: `productLevel >= 10`
- **World Domination**: `customers >= 100 && employees.length >= 10`

New state variable: `profitStreak` (int, starts 0). Increment if daily net positive, else reset. Saved to localStorage.

**Save/Load Schema** — Single `localStorage` key `sss_save`, JSON object: `{ day, cash, customers, productLevel, employees: [{type, name}], profitStreak, cofounderEgg: bool }`. Write at day-end. On title screen, check for key; if present, show "Continue (Day X)" option. Load hydrates all state and jumps to office scene.

**Purple Monitor Easter Egg** — Flag `cofounderEgg`. After `day >= 15 && !cofounderEgg`, render a 3x2px purple-flickering rectangle on co-founder's desk. Player walks adjacent + interact → dialog box fires, sets `cofounderEgg = true`. One-time. Saved.

## 3. Progression Gates

No new gates. Victory thresholds ARE the gates. IPO and World Domination are late-game (Day 30+); Profit Machine is mid-game achievable (Day 15-20 with lean hiring); R&D Utopia rewards pure build strategy (Day 20-25 if you skip sales).

## 4. Difficulty Curve

Early tension: cash burn vs. hire timing (unchanged). Mid-game fork: players naturally lean sales-heavy or build-heavy, which channels them toward different victories. Profit Machine is the "easiest" exit — rewards discipline. World Domination is hardest — requires both scaling AND hiring, maximum cash pressure.

## 5. Player Feedback Loops

- **Profit streak counter** in HUD (small flame icon + number) — visible positive reinforcement for staying profitable
- **Victory proximity**: at 75% of any threshold, flash a subtle HUD hint ("IPO investors are watching...")
- **Save icon**: brief floppy-disk sprite flash at day-end confirms persistence

## 6. One Specific Fun Moment

**The co-founder stands up.** Every victory trigger freezes gameplay, tints the screen, and the co-founder — who has sat motionless for the entire game — rises from his chair. Two-frame animation: seated → standing. He turns to face the player. That's it. No dialog from him. Just the implication that he was paying attention the whole time. Players will lose their minds.