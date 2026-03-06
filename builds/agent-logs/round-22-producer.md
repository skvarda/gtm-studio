---

# Round 22 Scope & Prioritization

**Producer Sign-off | Round 22**

---

## Build This Round (Top 3, Ordered)

**1. Fix Day Pacing Bug** — *Non-negotiable, ship-blocker*
Audit the day timer: find the frame counter or interval constant causing 1-2 second days. Fix it so no auto-end fires without explicit player confirmation. Remove or disable any timer-driven `endDay()` calls. Complexity: **Low** (single root cause, surgical fix).

**2. Visible Day Clock (HUD, Cosmetic Only)** — *High value, low risk*
Three phases — Morning, Afternoon, Evening — tied to AP spent (0-1 spent = Morning, 2 spent = Afternoon, 3 spent = Evening). Text label in HUD. No behavior change, no auto-trigger. Complexity: **Low**.

**3. AP Spending Animations** — *Medium value, adds rhythm*
Brief pause + visual feedback (flash, slide, or text pop) when an AP is spent. Prevents instant action resolution. 300-500ms per action, non-blocking. Complexity: **Medium** (requires action flow audit to insert hooks cleanly).

---

## Cut or Defer

- **Idle office ambiance** — deferred. Adds polish but zero gameplay value this round. Risk of bloating animation state. Revisit Round 23.
- **Day-end summary redesign** — deferred. Existing summary works. Don't touch it.
- **Any new mechanics, hires, or content** — hard cut. This is a stability round.

---

## Non-Negotiables

- Days must never auto-end. Player holds the trigger, always.
- No regressions to existing AP, employee, or game-state logic.

---

## Known Risks

- AP animation hooks may conflict with dialog state — test all action paths.
- Day clock phase logic must not be coupled to a timer (AP-count only).

---

**Verdict: 2 easy fixes, 1 medium. Ship it clean.**