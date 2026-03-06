# Round 23 Scope & Prioritization

---

## BUILD (Top 3)

**1. Idle Animation System** — Medium complexity
Co-founder bob (2px vertical, 1.2s cycle), dev fidget (1px shift, 3-5s random), salesperson sprite flip (4s). Uses `setInterval` off the main game loop. Touches sprite render only — low blast radius.

**2. AP Spending Feedback** — Low complexity
Screen flash (CSS overlay, 150ms), floating text ("+1 Product", CSS animation, fades over 0.8s). No game logic changes. Pure DOM/canvas layer on top of existing `spendAP()` call sites.

**3. Cosmetic Day Clock (3-phase window tint)** — Low-Medium complexity
Morning/Afternoon/Evening tied to AP count (3→2→1→0). Background tint shift via canvas fillRect with low alpha. Read-only from existing AP state — zero risk of touching day-end logic.

---

## CUT / DEFER

- **Flickering monitors** — defer. Requires per-tile animation tracking; adds complexity without proportional feel payoff. Round 24 candidate.
- **Terminal processing beat** — defer. Sound/timing infrastructure not in codebase. Audio is a separate round.
- **Head-turn via actual sprite flip** — simplify to 1px offset only. True flipping requires sprite sheet work not in scope.

---

## Non-Negotiables

- Zero changes to `endDay()`, AP logic, or game state machine.
- All animations must degrade gracefully if employee not hired yet.
- Single-file constraint: no new files.

---

## Known Risks

- `setInterval` idle timers conflicting with game state (e.g., animating during `gameOver`). Mitigation: gate all timers on `gameState === 'play'`.
- Floating text z-index fighting canvas. Mitigation: use canvas-native drawing, not DOM overlays.