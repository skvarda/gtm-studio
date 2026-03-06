# Game Mechanics Design Doc — Round 19

## 1. Core Gameplay Loop

Day loop unchanged: **Assign team → Execute tasks → Collect revenue → Pay burn → Evaluate victory → Auto-save → Next day.** The new victory evaluation slot happens after burn calculation but before the day-advance prompt. This means players see their final numbers *before* the victory screen fires — no confusion about what triggered it.

## 2. Victory State Mechanics

Evaluated in priority order (first match wins):

| Path | Conditions | Tint |
|---|---|---|
| **World Domination** | customers ≥ 100 AND team size ≥ 5 | `vWd` (deep red) |
| **IPO Glory** | cash ≥ $50,000 AND customers ≥ 50 | `vIPO` (gold) |
| **R&D Utopia** | productProgress ≥ 100% | `vRD` (cyan) |
| **Profit Machine** | cash ≥ $30,000 AND netBurn > 0 for 10 consecutive days | `vPr` (green) |

Priority order matters: World Domination is hardest (requires both scale metrics), so it checks first. Profit Machine checks last because it's the "quiet" ending — the player who just survives well.

Profit Machine tracks a `profitStreak` counter: increments when daily revenue minus daily costs > 0, resets to 0 otherwise. This creates tension — one bad hire or lost customer resets the streak.

## 3. Progression Gates

- **Days 1–15:** Survival. No victory is reachable. Cash drains, product is nascent.
- **Days 15–30:** First strategic fork. Hiring salespeople accelerates customers toward IPO/World Dom. Hiring devs accelerates product toward R&D Utopia. Hoarding cash seeds Profit Machine.
- **Days 30–60:** Victory windows open. With 2 salespeople generating ~3 customers/day, World Domination (100 customers) is reachable by Day 45. R&D Utopia needs ~4 devs shipping consistently.
- **Day 90:** Soft deadline. If no victory by Day 90, burn almost certainly kills you.

## 4. Difficulty Curve

Early game is tight by design — $10K starting cash, ~$200/day burn with one employee. Each hire increases burn but unlocks exponential returns. The curve is convex: painful early, explosive mid-game. Victory should feel *earned* around Day 45–65 for skilled players, Day 70–85 for cautious ones.

## 5. Player Feedback Loops

- **HUD pulse:** When any victory metric crosses 50% of its threshold, that stat flashes once in the HUD (gold text for 30 frames). No tooltip, no hand-holding — observant players notice.
- **Save icon:** 4×4 floppy sprite flashes in HUD top-right for 45 frames at each day-end auto-save. Subtle confirmation the game persists.
- **Profit streak counter:** Displayed nowhere explicitly. Players pursuing Profit Machine must track it mentally or notice the pattern. Rewards attentiveness.

## 6. The Engineered Fun Moment

**The Co-Founder Stands Up.** On every victory screen, the co-founder NPC — who has sat motionless at his desk for the entire game — physically stands and walks to center screen before the stat card renders. This is the *only* time he moves. Players who've spent 50+ days wondering what he does get a single, silent acknowledgment. No dialog. He just stands, faces the player sprite, and the victory card appears. It should feel like the quiet guy at the office finally nodding at you.