Now I have enough context. Here's the review:

---

# Technical Architecture Review — Round 29

## 1. Canvas Architecture

The existing double-buffer pattern (native 320×224 `buf` canvas scaled 3× to display) is the correct foundation. The `nameEntry` screen should render entirely to `bctx` (the buffer context), same as all other states. **Do not introduce DOM elements** (no `<input>`, no HTML overlays). All text input must be captured via the existing `keydown` listener and rendered as canvas-drawn pixel text. This keeps rendering uniform and avoids z-index/scaling mismatches between DOM and canvas.

## 2. Performance Considerations

Name entry is a near-static screen — no tile map, no sprite movement, no per-frame collision. The render cost is trivial: a background fill, bordered box, ~12 character glyphs, one static sprite, and a blinking cursor (toggle every 30 frames using the existing frame counter). **Skip the full `drawMap`/`drawEntities` pipeline** during `nameEntry` phase to avoid unnecessary work. No performance risks this round.

## 3. Code Structure

- Add `nameEntry` to the `phase` string union at line 180.
- Store the name as `gameState.playerName` (string, default `"Alex"`).
- Add a `nameBuffer` array to accumulate keystrokes during entry — join on confirm.
- Gate the new phase in the main `keydown` handler (line 227) with a `gameState.phase === 'nameEntry'` branch. Handle `Backspace`, printable characters (filter to `[A-Za-z0-9 _-]`), and `Enter` to confirm.
- Add a single `drawNameEntry()` function (~40-60 lines) called from the main render loop. Use existing `drawText`/`drawBox` helpers.

## 4. Technical Risks & Mitigations

| Risk | Mitigation |
|---|---|
| Keyboard event conflicts with movement keys | Early-return from movement/action handling when `phase === 'nameEntry'` |
| Empty name submission | On confirm, if trimmed string is empty, set `"Alex"` |
| Special/non-ASCII characters breaking pixel font | Whitelist printable ASCII only; ignore others |
| Name length overflowing dialog boxes | Cap at 12 chars; dialog box width already fits ~28+ chars per line |

## 5. Implementation Patterns

Use string interpolation in dialog calls: replace hardcoded references with `` `Welcome to the office, ${gameState.playerName}` ``. For the blinking cursor, use `Math.floor(frameCount / 30) % 2` to toggle visibility — no `setInterval`. Wire the state transition as: title screen `Enter` → set `phase = 'nameEntry'` → on name confirm → set `phase = 'play'` + fire welcome dialog. This slots cleanly into the existing state machine with zero refactoring of downstream states.