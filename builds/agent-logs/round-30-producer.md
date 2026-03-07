---

# Round 30 Scope & Prioritization

**Producer Assessment — "The Finish Line"**

---

## Build List (Top 3, in order)

**1. Victory condition at $10K MRR** — *Low-medium complexity*
One new phase (`'victory'`), one render function, one threshold check wired into `doSales()` and `endDay()`. Jordan's line is already written in the brief. This is the round's entire reason for existing. Ships first, ships clean.

**2. Fix the asset preloader** — *Low complexity*
Surgical: wrap `requestAnimationFrame(gameLoop)` in a `preloadAssets().then(...)` call, add a "Loading..." canvas text, set `imageSmoothingEnabled = false`. Zero risk to gameplay. Must remain graceful with no PNGs on disk — resolve on failure, not reject.

**3. One mid-game random event** — *Low complexity*
A pool of 4 events, a 30% roll inside `endDay()` on days 15-25, one dialog before the day-end summary. This is a proof-of-pattern, not a system. Four strings and an RNG check.

---

## Cut / Defer

- **No new art passes.** Iris assets (victory overlay, Jordan victory sprite) get referenced if they exist; no blocking dependency on them.
- **No expanded event system.** No categories, no weights, no event history. That's Round 32.
- **No new endgame paths.** IPO / R&D / World Domination remain deferred.
- **No movement or HUD refactoring.** Touch nothing that isn't in scope.

---

## Non-Negotiables

- Build from `saas-startup-simulator.html` (Round 9). The Round 29 output is dead.
- Preloader must not block the game if PNGs are missing.
- `restart()` must cleanly reset the `'victory'` phase.

---

## Known Risks

- **`textAlign` leak** on victory screen (flagged in brief) — Atlas must explicitly audit this or it bleeds into every subsequent draw call.
- **Victory trigger placement** — if the check only lives in `doSales()` and passive MRR in `endDay()` isn't also checked, a player can cross $10K without triggering the screen. Must wire both paths.