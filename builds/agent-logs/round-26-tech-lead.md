Now I have a solid understanding of the codebase. Here's the review:

---

# Technical Architecture Review — Round 26

## 1. Canvas Architecture

The existing double-buffer pattern (offscreen `buf` at 320x224, scaled 3x to display canvas) is the right foundation. All three new screens — `nameEntry`, `introScene`, `classSelect` — must render exclusively to `bctx`, never directly to `ctx`. This preserves pixel-perfect scaling and avoids mixed-resolution artifacts. No DOM overlays (no `<input>` elements for name entry); keep everything on-canvas.

## 2. Performance Considerations

These screens are static/near-static UI — performance risk is minimal. The main concern is **text rendering volume** on the class selection screen (three panels of flavor text plus stats). Avoid calling `fillText` per-frame for unchanging content; render the static panel to a cached offscreen canvas once on state entry, then blit it each frame. Name entry redraws only the cursor blink and current text — trivially cheap.

## 3. Code Structure

Add `playerName` (default `'Alex'`) and `playerClass` (`'seller'|'dev'|'marketer'`) to `gameState`. Add three new phase values: `nameEntry`, `introScene`, `classSelect`. The game loop's phase switch already dispatches update/render by phase — extend it with three new branches. Keep each screen's logic in dedicated `updateNameEntry()`/`drawNameEntry()` pairs (same pattern as existing `dialog`/`menu`). Wire class modifiers into `recalcBurn()` and the product/customer tick functions using a multiplier lookup:

```js
const CLASS_MOD = {
    seller:   { product: 0.8, customer: 1.3 },
    dev:      { product: 1.3, customer: 0.8 },
    marketer: { product: 1.15, customer: 1.15 }
};
```

## 4. Technical Risks & Mitigations

- **Input collision**: `keydown` for name entry will conflict with movement/menu handlers. Gate all input handling on `gameState.phase` — each phase consumes only its relevant keys.
- **State bypass**: Rapid key mashing could skip screens. Use a `canAdvance` flag per screen, set `true` only after minimum display time or required input.
- **Name in dialog**: Inject `playerName` via template replacement at `showDialog` call sites, not inside the dialog system itself. Keeps the system generic.

## 5. Implementation Patterns

- Reuse `consumePress()` for all confirmation inputs across the three screens.
- Use the existing `showDialog()` queue for Darren's intro — chain 3 dialogs, with the final callback setting phase to `classSelect`.
- Draw class selection as a custom render (not the generic `menu` system) since it needs multi-column layout with portraits and stat blocks.
- Flow: `titleScreen` → press start → `nameEntry` → confirm → `introScene` (queued dialogs) → `classSelect` → confirm → `play`.