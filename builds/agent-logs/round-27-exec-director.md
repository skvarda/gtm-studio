# Round 27 Strategic Brief — "Sound & Scanlines"

## Priority One: Audio System

This round's top priority is bringing the game to life with sound. A silent game feels incomplete — audio is the single highest-impact addition we can make right now. We need a lightweight, self-contained audio system using the Web Audio API (no external files). Everything generated procedurally at runtime.

## Features to Implement

### 1. Procedural Soundtrack (Primary)
Build a simple chiptune music engine using OscillatorNodes and GainNodes. We need:
- **Title screen theme**: Upbeat, short loop (4-8 bars), major key, classic SNES RPG feel. Two voices — lead melody and bass line.
- **Gameplay BGM**: Chill, lo-fi office vibe loop. Quieter than title, doesn't fatigue over long play sessions. Think Stardew Valley's gentler tracks but 8-bit.
- **Day-end jingle**: Short 2-second stinger that plays on day transition.
- Include a mute toggle (M key) and keep volume conservative by default. Store mute state so it persists during the session.

### 2. Sound Effects (Primary)
Short procedural SFX for key interactions:
- **Menu open/close**: Soft blip
- **Menu select**: Confirm chime
- **Dialog advance**: Text tick/chirp
- **Hire employee**: Cash register or positive ding
- **Action denied** (no AP): Negative buzz
- **Game over**: Descending tone
- **Victory**: Ascending fanfare (brief)

Keep all SFX under 200ms except jingles. Use square and triangle waves for that authentic 16-bit character.

### 3. CRT/Retro TV Post-Processing Effect (Secondary)
Apply a scanline and CRT effect as a post-processing pass on the final scaled canvas:
- **Scanlines**: Semi-transparent dark horizontal lines every 3px (matching SCALE factor)
- **Slight RGB fringe**: Subtle chromatic aberration at edges (1px color offset)
- **Vignette**: Darken corners slightly
- **Screen curvature**: Optional very subtle barrel distortion, but only if it doesn't hurt performance. Skip if complex.
- Render this AFTER the buffer is scaled to the main canvas, so it doesn't interfere with game rendering logic.

## Direction to Agents

- Do NOT refactor existing game logic, state machine, or rendering code. This round is additive only.
- The audio system should be a self-contained module (AudioManager or similar object) initialized on first user interaction (click/keypress) to satisfy browser autoplay policies.
- The CRT effect should be a single function called at the end of the render loop, operating on the final canvas.
- Preserve all existing gameplay, palette, tile rendering, and input handling exactly as-is.
- Test that mute toggle works and that audio doesn't stack/leak on state transitions.
- The previous round's code is the baseline — do not drop any existing features.

## Bugs / Quality Notes

- No known gameplay bugs from Round 26 to fix.
- Watch for audio context suspension on page load — must resume on first user gesture.
- Ensure the CRT overlay doesn't tank framerate. Use globalAlpha for scanlines rather than per-pixel manipulation. Canvas composite operations are your friend here.

---

**Signed,**
**Executive Director — Round 27**