# Round 8 Scope & Prioritization

## BUILD (Top 3)

**1. Dialog/Menu System**
SNES-style bottom-panel dialog box with typewriter text and arrow-cursor option selection. This is the UI backbone — everything else depends on it.
*Complexity: HIGH. Typewriter animation, cursor navigation, state management (open/closed/animating/waiting-for-input), input lock during animation. Hardest piece this round.*

**2. Game State Engine + Day Cycle**
Real `gameState` object (`day`, `cash`, `mrr`, `ap`, `productProgress`, `customers`). Terminal interaction opens decision menu (Build/Research/Sell), each costs 1 AP. When AP hits 0, prompt End Day. Day advance: decrement cash by $2,740, add MRR, increment day. Game over at cash ≤ 0.
*Complexity: MEDIUM. State logic is straightforward. Wiring it to the dialog system is the integration risk.*

**3. HUD Wired to Live State**
Replace hardcoded HUD strings with values from `gameState`. Day, cash, MRR update every frame.
*Complexity: LOW. Mostly find-replace in the render loop.*

## CUT / DEFER

- **Co-founder idle animations** (head-turn, stretch) — cosmetic, zero gameplay value
- **Randomized outcome messages** — ship with 1 message per action type first; add variety only if time remains
- **MRR probability curves / product milestones** — use flat values (Build always +8%, Sales always 40% chance of +$200 MRR). Tune later.
- **Rug border bounds fix** — low-risk edge case, defer
- **Coffee machine dialog migration** — defer; terminal is the only critical interaction

## Non-Negotiables

1. Dialog box renders, types text, accepts cursor input, and dismisses cleanly
2. Player can spend 3 AP per day and trigger End Day
3. Cash decreases daily; game over fires when cash ≤ 0
4. HUD shows real numbers

## Known Risks

- **Input conflict**: Dialog cursor (up/down/Z) vs. player movement. Must lock player movement when dialog is open.
- **State transitions**: Dialog open → selecting → animating outcome → back to menu → AP exhausted → End Day prompt. Many states, easy to get bugs at edges.
- **Single-file complexity**: All logic in one HTML file is getting heavy. Not refactoring now, but it's accumulating debt.

---

Want me to proceed with implementation?