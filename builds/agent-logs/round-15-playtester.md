# Playtesting Report — SaaS Startup Simulator, Round 15

## 1. What Works Well

The palette is excellent. The SNES-era color choices — that `#58b868` green glow on dark purple walls — nail the 16-bit aesthetic without feeling like a lazy nostalgia grab. The action point system visible in the palette (`apFull`/`apEmpty`) suggests a turn-based resource economy, which is the right call for a strategy sim wearing a pixel-art costume. The double-buffered canvas rendering at 320×224 native is authentic and will keep the pixel art crisp. The co-founder as a mysterious, non-interfering NPC is a strong narrative hook — genuinely funny startup satire.

## 2. Top 3 Bugs / Anticipated Issues

1. **Canvas scaling fragility.** You're hardcoding `SCALE = 3`, giving a fixed 960×672 output. On smaller screens, ultrawide monitors, or mobile, this will either overflow or look tiny. No resize handler is visible — this will bite you on any non-standard viewport.

2. **Single-file monolith.** Even from the partial code, this is clearly a massive single `<script>` block. At 15 rounds of iteration, state management bugs become near-inevitable. One stale reference to a game-state variable during a dialog callback will produce silent, unreproducible corruption.

3. **Palette-as-strings everywhere.** Every color is a hex string constant. Any typo (the code already truncates `positive` mid-value) produces a silent black fill with no error. This is a ticking time bomb as the palette grows.

## 3. Feel Assessment

The vibe reads more "menu simulator" than "Harvest Moon." The strategic bones are there, but without visible character animation, environmental storytelling, or idle office life, the office will feel like a spreadsheet with a pixel-art skin. The tone promises warmth; the architecture delivers data.

## 4. Pacing Assessment

Hard to assess without seeing the turn/week loop, but the presence of AP suggests discrete turns. Risk: early game grinds if the player has too few meaningful choices per turn. The "hire dev or salesperson first" fork needs to hit by turn 2-3, not turn 8.

## 5. Single Highest-Impact Improvement

**Add idle office micro-animations.** A monitor screen flickering, the co-founder occasionally glancing up, a coffee cup steam wisp. Two or three 3-frame sprite cycles would transform a static diorama into a living space and bridge the gap between "strategy game" and "place I care about." No gameplay change needed — just life.