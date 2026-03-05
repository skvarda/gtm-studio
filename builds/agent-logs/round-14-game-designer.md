# GAME MECHANICS DESIGN DOC — Round 14

## 1. CORE GAMEPLAY LOOP

Title Screen → Intro Sequence → **Daily Loop**: Wake (full 5 AP) → Spend AP on actions (code, sell, hire, explore) → Watch office darken as AP drains → End Day → Cash burn tick → Repeat. The day/night tint is now the clock. Players internalize "light fading = decisions running out" within 2 days without any tutorial.

## 2. SPECIFIC MECHANICS TO IMPLEMENT

**Title Phase Gate**: `gameState.phase` cycles through `titleScreen → intro → gameplay`. Z on title triggers a 3-dialog intro queue. Gameplay loop is frozen until phase reaches `gameplay`. No tick, no burn, no movement.

**Day/Night Overlay**: Single `fillRect` over the viewport. Alpha = `(1 - currentAP/maxAP) * 0.45`. Color: `rgba(40, 20, 8, alpha)`. At 5 AP: clear morning. At 0 AP: warm amber haze. Recomputed every frame, zero performance cost.

**Product Launch at 100%**: When `productProgress >= 100`, set `gameState.productLaunched = true`, fire a 3-line celebration dialog, and apply a persistent `salesMultiplier = 2.0` to all future MRR gains from the Sell action. Product progress bar changes label from "Building..." to "v1.0 SHIPPED" with a palette-swap highlight.

## 3. PROGRESSION GATES

- **Gate 1**: Title screen blocks all input except Z.
- **Gate 2**: First hire unlocked at Day 3 (prevents instant-hire cheese).
- **Gate 3**: Product launch at 100% progress unlocks doubled sales revenue — this is the strategic fork. Rush product or chase early sales?

## 4. DIFFICULTY CURVE

Days 1-5: Burn is gentle ($800/day), teaches AP budgeting. Days 6-15: Burn scales with headcount. Post-launch: Revenue can outpace burn if player timed the pivot. Pre-launch sales are viable but half-value, creating a tension curve that peaks around Day 12-18.

## 5. PLAYER FEEDBACK LOOPS

- **Visual**: Office darkens per AP spent (immediate).
- **Numeric**: MRR and cash update on every End Day (short-term).
- **Milestone**: Product launch fanfare + doubled sales (medium-term).
- **Negative**: Co-founder sits idle regardless of player actions (ambient dread).

## 6. ENGINEERED FUN MOMENT

**The Launch Pop**: At exactly 100% product progress, the screen flashes white for 2 frames, the overlay resets to full morning brightness regardless of AP, and dialog reads: *"v1.0 is LIVE. 3 users just signed up. One of them is your mom."* The momentary brightness break from the day/night system makes the player physically feel the payoff. Then the tint resumes and the grind continues — but now with double revenue and hope.