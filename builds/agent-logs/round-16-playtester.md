# Playtesting Report — SaaS Startup Simulator, Round 16

## 1. What Works Well

The pixel art palette is well-chosen — the dark purples and greens nail the "late night coding in a startup office" vibe while staying readable. The double-buffered rendering at 320x224 native resolution scaled 3x is the correct approach for crisp SNES-style visuals. The co-founder as a mysterious do-nothing NPC is genuinely funny and feels true to startup life. The strategic fork of "hire dev or salesperson first" is a strong early-game hook that mirrors real founder anxiety.

## 2. Top 3 Bugs / Anticipated Issues

1. **Palette object truncation risk.** The PAL object is massive and growing. One misplaced comma or quote in that block kills the entire game with no error feedback for the player — just a black screen. This needs defensive loading or at minimum a try/catch with a visible error state.

2. **No responsive scaling.** The canvas is hardcoded to 960x672. On smaller laptop screens or ultrawide monitors, this will either overflow or look tiny. There's no resize listener adapting SCALE to `window.innerHeight`.

3. **Action Point / turn economy is opaque.** Without playing deeper, the AP system (hinted by `apFull`/`apEmpty` palette entries) likely lacks clear feedback on *why* a turn ended or how many points each action costs. Players will burn AP on exploration and feel cheated when they can't afford the action that matters.

## 3. Feel Assessment

The tone reads right on paper — startup absurdity meets strategic depth. But 16-bit aesthetic plus business simulation is a tricky marriage. The danger is that the office environment feels static. Desks and monitors don't move. Without animated NPCs, weather-like events, or environmental storytelling, the office becomes wallpaper you stop noticing by month 3 in-game.

## 4. Pacing Assessment

Early game likely paces well because cash burn creates urgency. Mid-game is the risk zone — once you have 3-4 employees and stable revenue, what prevents the player from just grinding? The endgame paths (IPO, Profit Machine, etc.) need foreshadowing by mid-game or players will disengage before reaching them.

## 5. Single Highest-Impact Improvement

**Add random events with real consequences.** A competitor launches your feature. Your best dev gets poached. A viral tweet brings 10x signups you can't handle. Right now the game risks feeling like a spreadsheet with pixel art. Emergent chaos is what makes Harvest Moon compelling — the storm that kills your crops. This game needs its storms.