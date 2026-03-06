Good — I've reviewed the architecture. No auto-timer drives day transitions; `endDay()` is only called from player menu choices. Here's the review:

---

# Technical Architecture Review — Round 22

## 1. Canvas Architecture

The double-buffer approach is solid: native 320×224 off-screen canvas (`bctx`) scaled 3× to the display canvas via `drawImage`. This preserves pixel-perfect rendering and keeps `imageSmoothingEnabled = false` consistent. **No changes needed here.** For the new day clock HUD element, render it directly to `bctx` in the existing `render()` pipeline — do not add a separate canvas layer.

## 2. Performance Considerations

The game loop caps `dt` at 50ms (line 1534), preventing spiral-of-death on tab-switch. Good. However, idle employee animations (feature #3) will add per-frame draw calls for each employee sprite. With `MAX_EMPLOYEES = 4` plus co-founder, this is 5 animated NPCs max — negligible on any hardware. **No spatial culling or sprite batching needed.** Keep animations frame-counter driven (increment on `dt` accumulation), not `setTimeout`-based, to stay in sync with the game loop.

## 3. Code Structure Recommendations

The single-file architecture is fine at ~1744 lines but approaching the limit. For Round 22, use clearly delimited section comments (already established pattern). Add new systems in this order within the file:

- **Day clock state** → next to `gameState` (line ~171)
- **Idle animation data** → next to `cofounder` object (line ~214)
- **AP animation system** → new section between dialog system and action handlers

Do **not** split into modules — the single-file constraint is a project decision.

## 4. Technical Risks & Mitigations

- **False bug:** Day pacing is already player-controlled — `endDay()` only fires from menu choices (lines 697, 717). There is no auto-timer. The "1-2 second" report likely stems from a playtester mashing through menus. **Mitigation:** Add the cosmetic day clock and AP animations to create perceived duration, but no timer logic needs fixing.
- **Animation state leaks:** AP spending animations must block input during playback. Use a `gameState.phase = 'animating'` guard that falls through to `'play'` on completion. Don't use `setTimeout` — use `dt` accumulation in `update()`.
- **Employee sprite z-ordering:** Idle NPCs walking around the office need y-sort rendering. Sort all entities (player, co-founder, employees) by `py` before drawing.

## 5. Implementation Patterns

```javascript
// Day clock — cosmetic only, never triggers endDay()
gameState.dayPhase = 0; // 0=morning, 1=afternoon, 2=evening
gameState.dayTimer = 0;
const DAY_PHASE_MS = 20000; // 20sec per phase

// In update(dt):
if (gameState.phase === 'play') {
    gameState.dayTimer += dt;
    if (gameState.dayTimer >= DAY_PHASE_MS) {
        gameState.dayTimer = 0;
        gameState.dayPhase = Math.min(2, gameState.dayPhase + 1);
    }
}

// AP animation — block input, accumulate dt
gameState.apAnim = { active: false, timer: 0, duration: 600, label: '' };
```

Use `dt`-accumulation for all timing. No `setTimeout`. No `setInterval`. Everything flows through `update(dt)`.