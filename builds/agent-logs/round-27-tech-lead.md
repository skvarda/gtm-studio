Good. Here's the full picture. Now I can write the review.

---

# Round 27 Technical Architecture Review

## 1. Canvas Architecture

The existing dual-canvas pipeline (320×224 `buf` → 960×672 `canvas` via `drawImage` at line 1544) is ideal for this round. All game rendering stays on `bctx` at native resolution. The CRT post-processing pass should operate on `ctx` (the scaled canvas) **after** the `drawImage` blit — insert the call between lines 1544 and 1546. This keeps game rendering completely untouched.

## 2. Performance Considerations

- **Scanlines**: Draw horizontal lines using `ctx.fillRect` with `globalAlpha ~0.15` in a single loop over canvas height, stepping by `SCALE` (3px). This is a ~224-iteration loop per frame — trivial.
- **Vignette**: Pre-render a radial gradient to a cached offscreen canvas once at init, then composite it each frame with `globalAlpha`. Never regenerate per-frame.
- **Audio**: Create a single `AudioContext` lazily on first user gesture (line ~1552 where `consumePress` fires on title screen). Reuse it for all playback. Pre-build note sequences as arrays of `{freq, duration}` objects — don't construct oscillator graphs per-frame.
- **Music loops**: Use `oscillator.start(time)` with pre-scheduled `stop(time)` and a lookahead scheduler (~100ms) to avoid timing drift from `requestAnimationFrame`.

## 3. Code Structure

Add a single `AudioManager` object before the game loop (~line 1530). It should own: `ctx` (AudioContext), `muted` flag, `playBGM(track)`, `stopBGM()`, `playSFX(name)`. Keep SFX definitions as plain data (frequency/duration/wave arrays) in a `SFX_DEFS` map. The CRT effect should be one function: `applyCRT(ctx, w, h)`.

## 4. Risks & Mitigations

- **Audio stacking**: Call `stopBGM()` before every `playBGM()` and on state transitions (game over, title). Track active oscillators in an array and disconnect on stop.
- **Browser autoplay**: Guard `AudioContext` creation behind a user gesture handler. Check `ctx.state === 'suspended'` and call `resume()`.
- **CRT perf on low-end**: Gate the vignette behind a simple FPS check — if `dt > 32` (sub-30fps), skip vignette/RGB fringe, keep only scanlines.

## 5. Implementation Patterns

```js
// SFX pattern — short-lived, self-cleaning
playSFX(name) {
  const def = SFX_DEFS[name];
  const osc = this.ctx.createOscillator();
  const gain = this.ctx.createGain();
  osc.type = def.wave;
  osc.frequency.setValueAtTime(def.freq, this.ctx.currentTime);
  gain.gain.setValueAtTime(def.vol, this.ctx.currentTime);
  gain.gain.linearRampToValueAtTime(0, this.ctx.currentTime + def.dur);
  osc.connect(gain).connect(this.ctx.destination);
  osc.start(); osc.stop(this.ctx.currentTime + def.dur);
}
```

For BGM, use a scheduler that queues notes 100ms ahead via `setTimeout`, checking a `playing` flag each iteration to enable clean stops. This avoids the garbage collection pauses of recreating oscillators in `requestAnimationFrame`.