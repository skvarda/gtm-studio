---

# Technical Architecture Review — Round 28: "First Light"

## 1. Canvas Architecture

The existing dual-canvas pattern (320×224 native buffer → 3× scaled display canvas) is the correct foundation. The asset system must hook into the **buffer context (`bctx`)** exclusively — never draw sprites to the main canvas directly. Both `bctx.imageSmoothingEnabled = false` and `ctx.imageSmoothingEnabled = false` must be set (buffer already does this at line 36; verify the main `ctx` does too before the `drawImage` scale-blit). All sprite rendering goes through the buffer; the final frame blit to `ctx` stays as the single scaling point.

## 2. Performance Considerations

At 320×224 native resolution with <20 sprites, performance is a non-issue — but don't introduce one. **Pre-decode images** using `img.decode()` in the preloader rather than relying on first-draw decode stalls. Store loaded `Image` objects in a flat `Map<string, HTMLImageElement>` — no nested lookups per frame. Avoid creating new `Image` objects or calling `new Path2D` inside the game loop.

## 3. Code Structure

Add three isolated blocks, in order, before the existing game code:

1. **Asset manifest** — plain object: `{ npc_jordan_idle: 'assets/sprites/npc_jordan_idle.png', ... }`
2. **`loadAssets(manifest)`** — returns `Promise<Map>`, populates a module-level `SPRITES` map. Failed loads get `null` entries, not exceptions.
3. **`drawSprite(ctx, key, x, y, w, h)`** — checks `SPRITES.get(key)`; if truthy, draws image; if falsy, returns `false` so the caller renders the existing rectangle fallback.

Wrap the existing `requestAnimationFrame` kickoff inside `loadAssets(MANIFEST).then(() => { ... })`. The loading screen draws directly to `ctx` (not the buffer) to keep it outside the game loop entirely.

## 4. Risks & Mitigations

- **Truncated Round 27 source**: Start from the current `saas-startup-simulator.html` (Round 9, ~1744 lines, confirmed complete). Do not attempt to recover partial Round 27 output.
- **Path failures**: Use relative paths (`assets/sprites/...`). The fallback system means missing files are a visual no-op, not a crash.
- **Sprite alignment**: Jordan's sprite is 32×48 at native res but the tile grid is 16px. Draw at `(npc.x * T - 8, npc.y * T - 32)` to center horizontally and anchor feet to the tile. Test this offset explicitly.

## 5. Implementation Patterns

```js
// Preloader pattern — Promise.allSettled, not Promise.all
function loadAssets(manifest) {
  const entries = Object.entries(manifest);
  return Promise.allSettled(
    entries.map(([key, src]) => {
      const img = new Image();
      img.src = src;
      return img.decode().then(() => [key, img]);
    })
  ).then(results => {
    const map = new Map();
    results.forEach((r, i) => {
      map.set(entries[i][0], r.status === 'fulfilled' ? r.value[1] : null);
    });
    return map;
  });
}

// Sprite draw with fallback — returns boolean
function drawSprite(ctx, key, x, y, w, h) {
  const img = SPRITES.get(key);
  if (!img) return false;
  ctx.drawImage(img, x, y, w, h);
  return true;
}
```

Use `Promise.allSettled` — never `Promise.all` — so one broken PNG can't block the game. The boolean return from `drawSprite` keeps fallback logic at the call site, which is exactly where the existing rectangle-drawing code already lives.