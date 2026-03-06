Now I have what I need. Here's the architecture review:

---

## Technical Architecture Review — Round 25

### 1. Canvas Architecture Decisions

The existing double-buffer pattern (native 320×224 `buf` → scaled 3× to display canvas) is correct and should not change. All new rendering (employee dialog, ping pong table, text outlines) must target `bctx` exclusively. The ping pong table replaces `RUG` (tile type 10) in the tilemap — swap the constant value, not the grid coordinates. Add a new tile constant `PING_PONG = 10` and rename, keeping the same map positions (cols 8-11, rows 4-6). Mark it solid (`SOLID[PING_PONG] = 1`) with an interaction zone on adjacent floor tiles.

### 2. Performance Considerations

There are ~31 `fillText` calls. Adding a shadow pass doubles that to ~62 — negligible at this resolution. Wrap all text drawing in a helper like `drawText(ctx, str, x, y, color, size)` that handles `Math.round()`, shadow offset, and font setting in one place. This avoids 62 individual call-site edits and guarantees consistency. Employee `interactionCount` is a per-day integer lookup — zero performance cost.

### 3. Code Structure Recommendations

- Add `interactionCount: 0` and `tempMultiplier: 1.0` fields to the employee object literal at hire time.
- Reset both in `endDay()` alongside existing employee iteration (line ~588).
- Apply `tempMultiplier` inside the existing `endDay()` employee output loop — multiply `devGain` or `passiveChance` by it. No new loops needed.
- Co-founder chair rotation: add `interactionCount` to the `cofounder` object. No dialog trigger — just flip `cofounder.dir` on third interaction.

### 4. Technical Risks & Mitigations

| Risk | Mitigation |
|---|---|
| Rug→table swap breaks collision/pathfinding | Keep same tile indices, change only rendering and SOLID value. Test player can walk around but not through. |
| Text helper refactor introduces regressions | Audit all 31 `fillText` sites. Extract to helper in a single pass before any feature work. |
| `imageSmoothingEnabled` reset after `clearRect` | Re-assert `bctx.imageSmoothingEnabled = false` at top of render loop, not just init. |

### 5. Implementation Patterns

```js
// Text helper — use everywhere, never call fillText directly
function drawText(str, x, y, color, size = 8) {
    x = Math.round(x); y = Math.round(y);
    bctx.font = size + 'px monospace';
    bctx.fillStyle = PAL.bgDark;
    bctx.fillText(str, x + 1, y + 1);
    bctx.fillStyle = color;
    bctx.fillText(str, x, y);
}

// Employee interaction — call from existing interact handler
function interactEmployee(emp) {
    emp.interactionCount++;
    const lines = emp.type === 'dev' ? DEV_DIALOG : SALES_DIALOG;
    const tier = Math.min(emp.interactionCount - 1, lines.length - 1);
    showDialog(emp.name + ': "' + lines[tier] + '"');
    if (emp.interactionCount >= 3) {
        emp.tempMultiplier = emp.type === 'dev' ? 0.7 : 1.3;
    }
}
```

Dialog arrays and multiplier application go inline with existing patterns — no new systems, no new game loop phases.