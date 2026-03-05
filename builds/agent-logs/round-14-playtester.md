# Playtesting Report — SaaS Startup Simulator, Round 14

## 1. What Works Well

The aesthetic commitment is strong. Native 320x224 with 3x scaling and `image-rendering: pixelated` nails the SNES feel. The palette is cohesive — that `#58b868` green as the accent color across monitor glow, wall trim, HUD, and dialog borders gives the whole thing a unified "terminal startup" identity. The top-down office setting reads clearly even at low resolution. Having distinct desk/chair/monitor colors at this pixel density is smart art direction.

## 2. Top 3 Bugs / Anticipated Issues

1. **Canvas scaling fragility.** Hardcoded `SCALE = 3` with no responsive fallback means the 960x672 canvas will overflow on smaller screens and laptops. No resize listener visible. This will be the #1 player-reported issue on launch.

2. **Double-buffer without clear.** You're drawing to `bctx` then presumably blitting to `ctx`, but if the main loop ever skips a `bctx.clearRect` before a frame, you'll get ghosting artifacts — especially during dialog transitions where sprites move underneath UI layers.

3. **The co-founder is a design debt bomb.** "Unclear what he does, no interference, late-game reveals possible" means he's an NPC taking up screen space and narrative oxygen for 80% of the game with zero mechanical payoff. Players will either forget he exists or be frustrated by the tease.

## 3. Feel Assessment

The tone reads more *ambient* than *engaging*. The palette is moody and the office is atmospheric, but 14 rounds in I'd expect more juice — screen shake on a failed deploy, a flash when you close a deal, particle confetti on a shipped feature. The simulation layer needs more sensory feedback loops to feel alive.

## 4. Pacing Assessment

The early-game "hire dev or salesperson first" fork is a strong opener. But mid-game risks the Harvest Moon plateau: once you have a team and revenue, what creates tension? Market shifts are mentioned but I don't see event systems driving urgency. Without external pressure, turns become rote optimization.

## 5. Single Highest-Impact Improvement

**Add a visible week/month countdown with a cash-zero death clock.** Right now the burn rate is abstract. A literal doomsday counter ticking down on the HUD — "14 weeks until bankrupt" — would instantly inject tension, make every AP decision feel consequential, and give the simulation the strategic teeth the aesthetic already promises. Every great management sim needs a clock the player can't ignore.