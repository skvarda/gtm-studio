---

# Round 30 — Game Mechanics Design Doc
**"The Finish Line"**

---

## 1. Core Gameplay Loop

The loop this round gains its missing piece: a **terminal goal**. Previously the player optimized with no destination. Now every action has a horizon.

**Daily rhythm:** Wake → spend 3 AP (hire / sell / build / rest) → end day manually → event check (days 15-25) → passive MRR accrues → check $10K threshold → repeat.

The loop now has shape: **survive early, scale mid, sprint to $10K**.

---

## 2. Specific Mechanics to Implement

**Victory Condition**
- Threshold check fires after every MRR mutation (both `doSales()` and `endDay()` passive accumulation)
- `gameState.phase = 'victory'` halts movement, AP spending, and day-end processing
- `drawVictory()` renders a gold/green overlay with five stats: day, MRR, cash, team size, customers
- Jordan delivers his line; R key restarts cleanly (phase resets to `'titleScreen'`)

**Asset Preloader**
- `preloadAssets()` returns a Promise; resolves even on 404s so the game never hangs
- Canvas shows "Loading..." text during the await
- `imageSmoothingEnabled = false` set once before first draw, never toggled

**Random Mid-Game Events**
- On `endDay()`, gated to days 15-25: single 30% roll
- Pool of 4 events with direct stat mutations — no new data structures needed
- Event dialog fires *before* the day-end summary so the player sees the consequence before committing to the next day

---

## 3. Progression Gates

| Gate | Condition | Effect |
|---|---|---|
| First hire | ~Day 3-5, $5K+ cash | Unlock second AP-consumer role |
| Second hire | ~Day 8-12 | Mid-game scaling begins |
| Event window | Days 15-25 | Chaos injected; player must adapt |
| $10K MRR | ~Day 40-50 (skilled play) | Victory — game ends |

Gates are soft (cash-gated, not locked) so a player who over-hires can fall behind and the window feels earned, not scripted.

---

## 4. Difficulty Curve

- **Days 1-14:** Pure survival. Cash burns, MRR grows slowly. No events. Teach the loop.
- **Days 15-25:** Event window destabilizes a fragile team — a server outage on Day 16 with one salesperson hurts badly. A tech blog hit with two salespeople accelerates the run. Same roll, asymmetric impact by build.
- **Days 26+:** No new events. The player either has momentum or doesn't. The $10K finish line is visible and the pressure is arithmetic, not random — which feels fair at the end.

---

## 5. Player Feedback Loops

- **Immediate:** MRR number ticks up in the HUD after every sale action — the number is the dopamine
- **Daily:** Day-end summary shows net MRR delta so the player can see compound growth
- **Event:** Dialog text names the exact stat change ("+ $300 MRR") — no ambiguity
- **Victory:** The final stats screen acts as a personal scorecard. Players will compare Day counts. That's the replay hook.

---

## 6. The Fun Moment to Engineer

**The Almost-Win.**

When MRR crosses ~$8,500–$9,000, the HUD number is close enough to $10K that players start counting. They skip hiring. They hoard AP for sales. They end days faster.

The fun isn't the victory screen — it's the **last three days before it**, when the player is doing mental arithmetic on every action. To engineer this: make the MRR counter visible at all times in the HUD (it already is), and do not add any progress bar or proximity indicator. Let the raw number do the work. Players who do the math feel smart. That feeling is the payoff.

---

*Ready for Atlas to implement. Build from `saas-startup-simulator.html` — Round 9 is the source of truth.*