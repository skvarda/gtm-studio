## Build Report — Engine Round 2: Character Creation

### What Changed
1. **Name Entry Screen** (`nameEntry` state): New screen between title and role selection. Shows "WHAT'S YOUR NAME?" header, bordered input box with blinking cursor, uppercase A-Z input (max 10 chars). Enter confirms, stores name in `gameState.player.name`.

2. **Role Selection Rework**: Replaced Hacker/Designer/Hustler with **Seller/Dev/Marketer** per game-state.json spec. Each role has proper stat bonuses (sales, dev, marketing, hustle, focus). Cards show role icon, name, description, and 5 stat bars. Left/Right wraps around. ESC/Backspace returns to name entry with name preserved.

3. **Player Stats Structure**: `gameState.player.stats` now has `{sales, dev, marketing, hustle, focus}`. Set from `getRoleData()` on role confirmation. Stats are cosmetic this round — not wired into gameplay.

4. **Player Preview Sprite**: 2x-scaled player sprite drawn on the left side of role selection screen, with player name underneath.

5. **Screen Transitions**: `transitionToScreen()` handles fade-out/fade-in (300ms each) between title→nameEntry→characterCreation→play. Input blocked during transitions.

6. **Palette Additions**: Added `PAL.magenta` (#E040A0), `PAL.panelDark`, `PAL.uiBorder`, `PAL.textDim`, `PAL.textLight`. Added `_` glyph to font data.

7. **State Flow**: `title → nameEntry → characterCreation → play` with ESC back-nav from characterCreation to nameEntry.

8. **Input Router**: Added `nameEntry` case. Name entry uses `e.key` (not `e.code`) for proper letter detection.

### What Was Preserved
- `initCanvas()`, `drawText()`, `measureText()`, `gameLoop()` — all untouched signatures
- All room/tile/movement/dialogue/laptop/HUD/day-cycle systems intact
- Starting cash remains $150,000
- Post-creation apartment spawn, Jordan, laptop interaction, day cycling all work

### What's Fragile
- Player preview positioning is hardcoded for current card layout; if card count changes, preview may overlap
- Name entry only accepts A-Z (no numbers, spaces, or special chars) — intentional per spec but may feel limiting
- The `drawRoleIcon` pixel art for seller/dev/marketer is minimal — could use polish in a future art pass

### Recommendations for Next Round
- Consider adding number support to name entry if players want names like "P1" 
- Stats should get wired into gameplay mechanics (action effectiveness) in a future engine round
- Character creation is NOT marked protected — good for iteration in narrative rounds
- The role descriptions could be expanded with a tooltip or second page showing gameplay implications