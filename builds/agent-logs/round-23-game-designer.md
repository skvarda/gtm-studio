# Round 23 Game Mechanics Design Doc
## "Make It Feel Alive"

---

### Core Gameplay Loop

Spend AP → feel the action → watch the office react → end day → repeat. The loop is unchanged structurally. This round layers *sensation* onto every step so the loop feels earned rather than clerical.

---

### Specific Mechanics to Implement

**1. Idle Animation System**
- Co-founder: 2px vertical bob every 1.2s (typing rhythm). Cycle: up → hold → down → hold.
- Hired dev: random fidget every 3-5s — shift 1px left or right, return.
- Hired salesperson: head-turn animation (sprite flip) every 4s.
- Monitors: flicker between 100% and 85% brightness on a 2.5s sine cycle.
- All timers use `performance.now()` delta accumulation, no `setInterval`. Driven by the existing game loop.

**2. AP Spending Feedback**
- On any AP spend: 4-frame white vignette flash (opacity 0→0.3→0.15→0), drawn to `bctx` after scene render.
- Floating text spawns at action target position: "+1 Product", "+1 Customer", "-$5k". Rises 20px over 60 frames, fades last 20.
- Terminal flicker: the bottom HUD text blinks twice ("PROCESSING...") before resolving to the new stat. 12-frame effect.

**3. Cosmetic Day Clock**
- Three phases tied to AP remaining: 3 AP = Morning (no tint), 2 AP = Afternoon (warm amber overlay, 8% opacity), 1 AP = Evening (deep orange, 15% opacity), 0 AP = Late Night (blue-gray, 20% opacity).
- Tint renders as a full-screen `bctx.fillRect` with `globalAlpha` after all sprites, before HUD.
- Phase label ("MORNING", "AFTERNOON", "EVENING") renders in small caps in the HUD clock zone.
- Day never advances automatically. Zero AP just unlocks the "End Day" prompt.

---

### Progression Gates

Idle animations activate on day 1. Floating text and flash require at least 1 AP spent (always true). Window tints are always visible — even new players feel the day phase shift on their first action.

---

### Difficulty Curve

No mechanical difficulty change this round. The tint system creates *psychological* pressure at Evening phase — orange light makes the empty cash meter feel more urgent without changing numbers.

---

### Player Feedback Loops

Action → flash → float text → tint shift → HUD update. Four distinct signals per AP spend, each hitting a different sensory register (screen, world space, ambient, numbers).

---

### The Fun Moment to Engineer

It's Day 3, 11pm tint, $8k cash left. Player spends their last AP on a sale. White flash, "+1 Customer" floats up through the orange-lit office. The monitor flickers. The co-founder keeps typing. **The world doesn't care — but you felt it.**