# Round 13 Scope & Prioritization

## BUILD (ordered by priority)

**1. Customer Pipeline with Visual Board**
Acquisition/churn math per day-tick, fractional accumulation, visible customer icons on the whiteboard area. Churn flash on loss. This is the round's centerpiece — it makes revenue tangible.
Complexity: **Medium.** New render layer, new per-tick logic, new sprite data. ~40% of round effort.

**2. Revenue Milestones (First Dollar, Ramen Profitable, PMF Signal)**
Three threshold checks per tick with dialog triggers and one-time flags. Ramen Profitable brightens the office palette slightly. PMF Signal queues the VC email event.
Complexity: **Low-Medium.** Milestone checks are simple. The palette shift and "Default Alive" sticky are small art tasks. ~25% of round effort.

**3. Employee Morale System**
Morale stat (0-100), productivity modifier, mood bubbles (heart/cloud), decay/boost from events. "Threatening to quit" event at <30.
Complexity: **Medium.** Touches hiring, events, AP assignment, and rendering. ~35% of round effort.

## CUT / DEFER

- **Sound effects** (ka-ching, churn note) — no audio infrastructure exists. Defer to a dedicated audio round.
- **Morale-driven speech bubble animations** — use static single-frame indicators only. No animation frames.
- **Star employee poached event** — defer to Round 14. Ship pizza and burnout warning only.
- **Office vibe cosmetic changes** beyond the palette brightness bump — no new furniture, no sticky note sprite this round.

## NON-NEGOTIABLES

- Consolidate to ONE canonical HTML file before any new code. Fix the truncated `PAL` object.
- Customer pipeline math must save/load from localStorage.
- Morale clamped 0-100, tested.
- Ramen Profitable reachable Day 12-15 with competent play.

## KNOWN RISKS

- **File state uncertainty.** Must verify which file has the latest Round 12 code before touching anything.
- **Balance cascades.** Morale modifier + churn + burn rate interact in ways that could create unrecoverable death spirals. Needs playtesting after implementation.
- **Render performance.** Customer board adds per-frame draw calls. Cap at 25 visible icons max.