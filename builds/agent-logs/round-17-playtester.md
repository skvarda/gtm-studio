# Playtesting Report — SaaS Startup Simulator, Round 17

## 1. What Works Well

The pixel art foundation is solid. The SNES-era palette choices — that `#58b868` green glow on monitors against the dark purple walls — nail the 16-bit aesthetic immediately. Rendering to a native 320x224 buffer and scaling 3x with `image-rendering: pixelated` is the correct approach; it avoids the subpixel blurriness that kills most retro-style browser games. The co-founder sitting at his desk with a purple monitor glow while yours is green is a great subtle visual detail — it communicates "this person is doing something different" without a single line of dialogue. The palette system itself is well-organized and will scale cleanly as you add more room types.

## 2. Top 3 Bugs / Anticipated Issues

1. **Canvas cursor is hidden (`cursor: none`) but I see no custom cursor implementation in the visible code.** Players will lose their mouse entirely. Either draw a software cursor every frame or remove the CSS override until one exists.
2. **No responsive scaling.** The canvas is hardcoded to 960x672. On smaller laptops or ultrawide monitors, this will either overflow or sit awkwardly. A `resize` listener that fits the integer-scaled canvas to `window.innerHeight` is a 10-line fix you're deferring at your peril.
3. **Single-file architecture at 16+ rounds is a ticking time bomb.** State, rendering, palette, dialogue, HUD, and game logic in one `<script>` block means any merge or refactor risks regression everywhere. This will bite hardest when you add save/load.

## 3. Feel Assessment

The vibe reads more "tech demo" than "game" right now. The office looks good but feels static. There's no ambient animation — no monitor flicker, no blinking cursor on the screen, no coffee steam. The world needs two or three idle loops to feel alive.

## 4. Pacing Assessment

Hard to judge from partial code, but the described early-game "hire dev or salesperson" fork is strong design. The risk is the mid-game grind — shipping features and acquiring customers can flatten into repetitive clicking without event interrupts (server outage, competitor launch, co-founder drama).

## 5. Single Highest-Impact Improvement

**Add ambient micro-animations.** A blinking cursor on your monitor, the co-founder occasionally shifting in his chair, a subtle light flicker. This is the difference between a screenshot and a world. Three small sprite-state toggles on timers would transform the entire feel from tech prototype to something players want to inhabit.