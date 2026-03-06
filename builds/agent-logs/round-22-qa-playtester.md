---

## QA Playtesting Report — Round 22

**Build:** `saas-startup-simulator.html` (Round 9 codebase, 1744 lines)
**Tester:** QA Agent

---

### 1. What Works Well

The core loop is surprisingly solid for a single-file build. Walking around a pixel-art office, interacting with objects via Z/Enter, and spending AP at the terminal creates a legible decision space. The hiring system through the door is intuitive — confirmation dialogs prevent misclicks, color-coded employees (green dev, gold sales) give instant visual feedback, and the team roster is a nice touch. The HUD packs a lot of info (day, cash, MRR, runway, AP, team comp) without feeling cluttered. Flavor text is genuinely funny — the co-founder lines and whiteboard gags land well. Y-sorted rendering and the off-screen buffer approach are technically clean.

### 2. Top 3 Bugs / Anticipated Issues

1. **Day pacing is player-controlled — but there's no clock or ambient pressure.** The brief flags a 1-2 second auto-advance bug, but the code shows NO auto-timer at all — `endDay()` only fires from explicit menu selection. The "bug" may have been from a different build. The real issue is the opposite: without any time-of-day indicator, days feel weightless. There's no rhythm.

2. **Dialog overflow.** The dialog box renders max 5 lines at 9px spacing in a 56px box. End-of-day summaries with multiple employees easily exceed this. Text gets clipped silently — no scrolling, no pagination.

3. **Co-founder renders at wrong position.** `drawCofounderSprite` is called at `(cofounder.gy + 1) * T` (line 1716), placing him one tile below his logical position (gy=10), so he renders at y=11 — overlapping the bottom desk row visually.

### 3. Feel Assessment

**6/10.** The office has charm but feels static. No ambient animation beyond monitor glow and coffee steam. Employees don't animate — they're frozen sprites. The co-founder's occasional "?" bubble is the only life. The game reads more like a menu simulator with a walking wrapper than a living office. It needs idle behaviors badly.

### 4. Pacing Assessment

**5/10.** Days are player-controlled (good), but each day collapses into: walk to terminal, spend 3 AP, select End Day. That's ~15 seconds of real engagement. No reason to explore after the first playthrough. Coffee and whiteboard are one-line flavor — no AP cost, no mechanical reward. The walk-to-door hiring loop adds variety but the office is small enough that traversal is trivial.

### 5. One Improvement That Would Make the Most Difference

**Add a visible day phase clock (Morning/Afternoon/Evening) with phase-triggered events.** Not as a coercive timer, but as a narrative heartbeat. Random micro-events per phase ("A prospect emails you mid-afternoon," "The co-founder leaves early") would give each day texture, make the office feel alive, and create reasons to pay attention between AP spends. Right now every day is identical except for the numbers. The clock gives time weight without taking away player control.