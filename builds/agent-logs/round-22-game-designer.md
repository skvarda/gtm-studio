# Game Mechanics Design Doc — Round 22

## 1. Core Gameplay Loop

Wake up → Survey office ambiance → Spend 3 AP across available actions → Watch resolve animations play out → Review results → End day voluntarily → See day-end summary → Repeat until funded, bankrupt, or victorious.

The loop must *breathe*. Each AP spend should feel like a small narrative beat, not a spreadsheet click.

## 2. Specific Mechanics to Implement

**Day Clock (Cosmetic)**
Three phases: Morning (☀️), Afternoon (🌤), Evening (🌙). Phase advances at AP 2 spent and AP 3 spent. Clock displays in HUD. No auto-end — player still hits "End Day" from menu.

**AP Spend Animations**
Each action triggers a 1.2-second resolve sequence: character walks to desk/phone, a sprite flashes (code lines, dollar sign, handshake), then a result popup fades in. Total animation budget: 3–4 seconds per AP spend. Three AP = ~10 seconds of satisfying rhythm before the player decides to end the day.

**Idle Office Ambiance**
Hired employees run a looping 3-frame idle animation on a 4-second cycle: dev types, tilts back, types again. Salesperson paces, checks phone, sits. Co-founder stares at whiteboard. These fire between player inputs, making the office feel alive during deliberation.

## 3. Progression Gates

- Day 1–5: 1 employee max, 2 AP actions available (Code, Prospect)
- Day 6–10: 2 employees unlocked, Hire action appears
- Day 11+: Full action menu, market event cards begin appearing

## 4. Difficulty Curve

Cash burn is fixed at $500/day base + $800 per employee. Revenue only arrives after 3 cumulative successful Sales actions. Early game is deliberately lean — the player *should* feel the knife-edge before their first customer closes.

## 5. Player Feedback Loops

- Green "+$" floaters on revenue actions, red "-$" on burn at day-end
- AP pip drains visually (filled circle → empty) as actions resolve
- Day-end summary screen shows net cash change with a one-line "mood" quip (e.g., *"Co-founder nodded. Maybe."*)

## 6. The Fun Moment to Engineer

**"The First Customer Close."** On the Sales action that lands customer #1, interrupt normal flow: freeze the office, play a 2-second chime, show the customer sprite walk through the door and wave. Co-founder looks up from his whiteboard for exactly one frame — then looks back down. Player gets the joke. That moment will be screenshot.