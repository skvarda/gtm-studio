Now I have a solid understanding of the codebase. Here's the architecture review:

---

## Technical Architecture Review — Round 24: "The Status Screen"

### 1. Canvas Architecture Decisions

The existing double-buffer pattern (offscreen `buf` at 320×224, scaled 3× to display canvas) is the correct place to render the status overlay. Draw the status panel directly to `bctx` in screen-space (after `bctx.restore()`, alongside HUD/dialog), **not** in world-space. This keeps it resolution-independent and avoids camera transform artifacts. The panel should be a filled rect at ~80% of native res (~256×180), centered at `(32, 22)`.

### 2. Performance Considerations

Minimal risk. The status screen is a static overlay — no per-frame sprite sorting or tile iteration needed while it's open. Key optimization: **skip the Y-sort renderable loop entirely when `phase === 'statusMenu'`**. The world is frozen underneath, so just draw the last frame's tiles + HUD, then paint the panel on top. `fillRect` and `fillText` calls for a stats panel cost virtually nothing at 320×224. No offscreen caching needed.

### 3. Code Structure Recommendations

- Add `'statusMenu'` as a new `phase` value. Do **not** reuse the existing `menu` object — it has cursor/callback semantics tied to action menus. Instead, create a dedicated `drawStatusScreen()` function (~80-100 lines) called from `render()` after HUD.
- Handle input in `update()` with a new block **before** the `menu.active` check: if `phase === 'statusMenu'`, process cursor movement between Resume/Exit options and ESC to close. Use a simple local `statusCursor` variable, not the shared `menu.cursor`.
- Hotkey: intercept `Escape` and `KeyM` in the `phase === 'play'` block (line ~1637) to set `phase = 'statusMenu'`.

### 4. Technical Risks & Mitigations

- **Key conflict**: `Escape` currently triggers "select last option" in menus (line 1598). Safe because the status hotkey only fires during `play` phase — but verify `KeyM` doesn't conflict with movement keys (it doesn't; movement uses WASD).
- **Runway division by zero**: If `dayBurn` is 0 (no burn), guard with `dayBurn > 0 ? Math.floor(cash / dayBurn) : '∞'`.
- **Text clipping at native res**: At 320px wide, use the existing 5px font. Limit labels to ~30 chars per line. Test employee roster rendering with max 4 employees.

### 5. Implementation Patterns

- **Color-coded runway**: `const rDays = Math.floor(gameState.cash / gameState.dayBurn); const rColor = rDays > 30 ? PAL.hudGreen : rDays > 15 ? PAL.hudYellow : PAL.hudRed;`
- **Section dividers**: `bctx.fillStyle = PAL.hudGreen; bctx.fillRect(panelX+8, y, panelW-16, 1);` — single-pixel lines, SNES-authentic.
- **First-open narrative beat**: Track with a `statusOpenedOnce` boolean. On first open, render the tooltip string below the panel for ~3 seconds using a decrementing timer.
- **Border pulse for red zone**: When `rDays < 15`, alternate border color between `PAL.dialogBdr` and `PAL.hudRed` using `Math.floor(Date.now()/500) % 2`.