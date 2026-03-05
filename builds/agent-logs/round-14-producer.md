# PRODUCER SCOPE DOC — Round 14

## BUILD THIS ROUND (3 items only)

**1. Title Screen + Phase Gate**
Add `titleScreen` phase to `gameState`. Pixel art title text rendered via canvas, animated cursor blink, "Press Z to Start" prompt. Z press transitions to `intro` phase → 3-line dialog queue → `gameplay` phase. Game loop frozen until gameplay phase. **Complexity: Medium.** Mostly new code, isolated from existing systems.

**2. Day/Night Ambient Tint**
Single `fillRect` overlay that shifts from transparent (5 AP) to warm amber at 20% opacity (0 AP). Linear interpolation: `alpha = (1 - currentAP/maxAP) * 0.2`. Drawn after all sprites, before UI. **Complexity: Low.** ~8 lines of code.

**3. Product Launch at 100%**
When `productProgress >= 100`, trigger celebration dialog, set `gameState.productLaunched = true`, double MRR gains from sales actions going forward. One-time flag check. **Complexity: Low.** ~15 lines of code.

## CUT / DEFER

- **Co-founder sprite direction fix** — cosmetic, defer to Round 15
- **Chair collision / Y-sorting** — defer, requires render pipeline changes
- **Sound design comments** — skip entirely, adds no player value
- **Intro sequence beyond 3 dialogs** — no lore dumps, no cutscenes
- **Any new map areas or NPCs** — not this round

## NON-NEGOTIABLES

- Developer outputs a **complete, untruncated HTML file**. If approaching length limits, stop adding features and close the file cleanly.
- Title screen must gate gameplay. No more cold-start into the office.
- Existing systems (hiring, terminal, dialog, game over) must not regress.

## KNOWN RISKS

1. **Truncation** — the only critical risk. Developer must prioritize file completeness over feature completeness. Ship 2 features complete over 3 features truncated.
2. **Phase state bugs** — input handlers must respect current phase or Z presses will leak between states.
3. **AP tint on top of dark palette** — may look muddy. Art director should validate the amber overlay against the existing background colors before developer commits to it.