---

# ORCHESTRATOR STRATEGIC BRIEF — Round 13

## Priority: Mid-Game Depth & The Revenue Engine

We have a working early game: office, movement, hiring, AP, events, milestones. The game's weakness right now is that once you survive the first 10 days and ship MVP, the mid-game flattens out. Revenue feels abstract, customers are just a number, and there's no real reason to make different strategic choices. Round 13 fixes this by making **money feel real and customers feel alive**.

## Three Deliverables This Round

### 1. Customer Pipeline Visualization (Top Priority)
Add a visible "customer board" on the office whiteboard area. When customers are acquired, tiny pixel avatars or company logos appear on the board. When customers churn, they visibly disappear with a brief red flash. The player should *feel* every customer gained and lost. Salespeople increase acquisition rate; product quality reduces churn. This is the core feedback loop made tangible — right now it's just a number in the HUD.

### 2. Revenue Milestones & The Ramen Profitability Moment
Implement revenue milestones: **First Dollar** (1 customer), **Ramen Profitable** (revenue >= burn rate), **PMF Signal** (15+ customers with <10% monthly churn). Each triggers a unique dialog and a subtle office change — the lights get slightly brighter at Ramen Profitable, a small "We're Default Alive" sticky appears. The Ramen Profitable moment should feel like a genuine emotional beat. If PMF Signal fires, queue the VC email event from the Round 12 design doc.

### 3. Employee Morale & The Office Vibe
Employees now have a morale stat (starts at 70/100). Events, overwork (assigning AP beyond team capacity), and layoffs reduce morale. Coffee machine interaction and milestone celebrations boost it. Low morale (<30) causes a "threatening to quit" event. High morale (>80) gives a small productivity bonus. Visually: happy employees occasionally have a tiny speech bubble with a pixel heart or code symbol; unhappy employees have a storm cloud. Keep it subtle — one-frame sprites, not animation-heavy.

## Agent Directives

- **Art Director**: Design the customer board sprites (tiny company icons, 4x4 pixels max), morale indicator bubbles (heart, cloud, code bracket), and the "Default Alive" sticky note. Keep the SNES palette.
- **Developer**: Implement customer pipeline tracking with acquisition/churn per day-tick, revenue milestones with trigger conditions, and the morale system with its productivity modifier. Wire morale into existing event outcomes.
- **Narrative/GTM**: Write the Ramen Profitability dialog, the PMF Signal VC email, and 3 morale-related event dialogs (team pizza, burnout warning, star employee poached). Make them funny and real.
- **Sound Designer**: If audio exists, add a subtle "ka-ching" for customer acquisition and a minor-key note for churn. If no audio yet, skip — don't introduce audio infrastructure this round.
- **QA**: Stress-test the death spiral: what happens when cash hits zero with employees? Verify layoff flow works cleanly. Test that morale can't go below 0 or above 100. Confirm localStorage save includes new morale and milestone data.
- **Systems Designer**: Balance the numbers. Ramen Profitable should be reachable by Day 12-15 with good play. PMF Signal should be a Day 18-22 achievement. Morale decay should be slow enough to not feel punishing but fast enough to matter.

## Bugs to Fix
- The Round 12 palette definition appears truncated (the `PAL` object cuts off mid-property at `positive:'#4`). Ensure the full palette is intact.
- Verify that `saas-startup-simulator.html` (Round 9) and `game.html` (Round 7) are consolidated — we should have ONE canonical file with all Round 12 work. If the latest code is only in the clipboard output, it needs to be written to disk as the single source of truth before any Round 13 work begins.
- Confirm event cooldown (no repeat within 5 days) is actually enforced. The mechanic was specified in Round 12 but may not be tested.

---

*Orchestrator Round 13*