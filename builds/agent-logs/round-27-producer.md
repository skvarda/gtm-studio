# Round 27 Scope & Prioritization Doc — "Sound & Scanlines"

---

## Build This Round (Top 3)

**1. AudioManager Module** *(High complexity)*
Self-contained object with Web Audio API. Handles title theme, gameplay BGM, and day-end jingle. Initialized on first user gesture. Mute toggle (M key), session-persistent state. Two voices max per track — melody + bass. This is the round's identity.

**2. Sound Effects Suite** *(Medium complexity)*
Seven SFX: menu open/close, select, dialog tick, hire ding, action-denied buzz, game over descent, victory fanfare. All procedural, all under 200ms except victory. Wire to existing interaction hooks — no logic changes required.

**3. CRT Post-Processing Pass** *(Low-medium complexity)*
Single function called at end of render loop. Scanlines via globalAlpha stripes, corner vignette, 1px RGB edge fringe. No barrel distortion — skip it entirely.

---

## Cut / Defer

- **Barrel distortion**: Deferred. Risk/reward is poor; adds complexity, marginal visual gain.
- **AudioManager persistence across page reloads** (localStorage mute): Deferred. Session-only is sufficient.
- **Per-track volume mixing UI**: Deferred. Single master volume + mute is enough.
- **Any gameplay changes**: Hard cut. Zero scope.

---

## Non-Negotiables

- Audio context must not auto-start — first user gesture only.
- No audio stacking on state transitions.
- CRT pass must not drop framerate below 60fps.
- All existing game logic untouched.

---

## Known Risks

- **Browser autoplay policy**: Mitigated by gesture-gated init.
- **OscillatorNode cleanup**: Stale nodes will leak. Must disconnect and nullify on track stop.
- **CRT overdraw cost**: globalAlpha approach is safe; pixel manipulation is not.