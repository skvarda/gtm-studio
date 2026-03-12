# TECHNICAL ASSEMBLY PLAN — ROUND 24
**Author: Marcus Webb, Tech Lead**
**For: Atlas Novak, Developer**

---

## 0. CURRENT STATE ASSESSMENT

The codebase already implements the full game loop: title → character select → morning inbox → afternoon play → evening summary → next day. **This is not a greenfield build.** Most of Ren's Tier 1 items already exist. The real work is refinement, not construction.

What actually needs doing:
- Replace the garage tilemap with a Day 1 apartment layout
- Wire Day 1-specific story dialogue for Jordan (replace generic `getJordanLines`)
- Ensure Day 1 emails include Chad intro and Mom email (they already exist in `EMAIL_TEMPLATES` but verify triggering)
- Verify the day pacing bug from Round 22 is resolved (no auto-timers exist in current code — confirmed clean)
- Minor UX polish on the core loop

---

## 1. MERGE ORDER

Since there are no department patches to merge, Atlas is working directly on `saas-startup-simulator.html` (copy current `game.html` content if that's the latest).

**Step 1: Tilemap — Apartment Layout**
Replace the `GARAGE` array and related constants. This is the foundation — sprites and NPCs position on top of it.

**Step 2: NPC Positioning**
Update `staticNPCs` Jordan coordinates to match new apartment layout. Add any new interaction zones (laptop, whiteboard equivalent).

**Step 3: Day 1 Story Dialogue**
Replace `getJordanLines()` with day-1-specific content from the narrative docs. Keep the function signature identical — it's called from `handlePlayInput`.

**Step 4: Email Verification**
Confirm `EMAIL_TEMPLATES` entries `jordan_day1`, `mom1`, and any Chad-related emails fire correctly on Day 1. Add a Chad introduction email if one doesn't exist (it doesn't — this is new content).

**Step 5: Tile Action Mapping**
Update `TILE_ACTIONS` to match new apartment furniture tiles (laptop instead of computer, etc). Keep the action IDs the same where possible (`code`, `plan`, etc).

**Step 6: HUD/UI Polish**
Minor — update era label from "GARAGE" to "APARTMENT" for early days. Adjust `getEra()` if needed.

---

## 2. PROTECTED SYSTEMS

The `protected` array in `protected-systems.json` is **empty**. No functions are currently protected. Atlas has free rein on all modifications.

However, these functions are **load-bearing** and their signatures must be preserved even though they aren't formally protected:

| Function | Why |
|---|---|
| `drawText(ctx, text, x, y, color, scale)` | Called ~100 times across all draw functions |
| `handleInput(e)` | Single entry point for all keyboard input |
| `gameLoop(ts)` | requestAnimationFrame callback, core loop |
| `initCanvas()` | Boot sequence |
| `performAction(actionId)` | Returns `{success, message, effects}` — action menu and tile interactions depend on this shape |
| `startDay(d)` | Called by `advanceDay()` and character select confirm |
| `startAfternoon()` | Called by `exitEmailPhase()` |
| `startEvening()` | Called when AP hits 0 |
| `economyTick()` | Returns object consumed by evening summary renderer |

---

## 3. NEW FUNCTION SIGNATURES

Minimal new functions needed. Prefer modifying existing ones.

| Function | Parameters | Purpose |
|---|---|---|
| `getApartmentMap()` | none, returns 2D array | Factory for apartment tilemap (or just redefine `GARAGE` as `APARTMENT`) |
| `getChadEmail()` | none, returns email template object | Chad Thunderpitch introduction email for Day 1 |

That's it. Do not create new systems, managers, or abstractions. If Jordan needs day-specific dialogue, expand the `if/else` chain inside `getJordanLines()`.

---

## 4. DATA INTEGRATION

**Dialogue:** Keep inline in `getJordanLines()`. Do not create a separate JSON structure. The current pattern of day-range conditionals returning string arrays works fine. Add/modify the `d<=2` branch with Day 1 narrative content:
- Laptop dashboard first look
- Whiteboard revenue math
- Jordan's day_1 content from docs

**Emails:** Add Chad's introduction email to `EMAIL_TEMPLATES` array with `day_range:[1,1]` and `unique:true`. Format identical to existing templates — `{id, from, subject, body, day_range, unique, category, choices}`.

**Tile interactions:** Map new apartment furniture tile IDs in the `TILE_ACTIONS` object. Keep action IDs from `ENGINE_ACTIONS` (e.g., tile type 4 → `'code'`). If adding a "laptop" tile distinct from "computer", assign it a new tile type number and map it to `'code'` in `TILE_ACTIONS`.

**NPC data:** Update coordinates in `staticNPCs[0]` (Jordan). Do not change the object shape — `{id, name, gx, gy, dir, color, hair}`.

---

## 5. DANGER ZONES

**`drawTile()` switch statement** (around line 130-ish in current code)
Every tile type needs a case. If you add new tile types for apartment furniture, you must add corresponding draw cases or they render as nothing. Easy to miss.

**`isTileWalkable()` function**
Currently only returns true for types 0 (floor) and 9 (rug). If you add new walkable tile types (e.g., a doormat), you must update this function or the player gets stuck.

**`TILE_ACTIONS` ↔ `ENGINE_ACTIONS` coupling**
`TILE_ACTIONS` maps tile types to action IDs. Those IDs must match `ENGINE_ACTIONS[].id` exactly, or `performAction()` returns "Unknown action." No validation exists — silent failure.

**`handlePlayInput` interact block**
This checks NPC first, then tile action. The `getTileAt` call uses the facing tile (`fx, fy`), not the player's current tile. If Jordan stands on an interactive tile, talking to Jordan takes priority. This is correct but easy to accidentally break.

**Email `day_range` matching**
`generateDailyEmails` checks `day < day_range[0] || day > day_range[1]`. For Day 1 mandatory emails, both bounds must be `[1,1]`. A typo like `[1,2]` makes it non-mandatory (goes into story pool instead).

**Canvas dimensions**
The memory file says 320x224, the code says 640x360. **The code is authoritative.** Do not change canvas dimensions. The engine spec confirms 640x360 at 2x. Map is 20x10 tiles at 32px = 640x320, with 32px HUD top and 8px status bar bottom = 360. It all fits exactly.

---

## 6. EXPECTED OUTPUT SIZE

Current code: ~780 lines (estimated from what's shown).

Additions:
- New apartment tilemap: +10-15 lines (replacing existing garage, net ~0)
- New tile draw cases: +20-40 lines
- Chad email template: +5-8 lines
- Jordan Day 1 dialogue expansion: +10-15 lines
- Minor adjustments: +10-20 lines

**Expected total: ~830-860 lines.** This should remain a single-file HTML build under 900 lines. If Atlas is approaching 950+, something is being over-engineered.

---

## 7. VERIFICATION CHECKLIST

Atlas must confirm before submitting:

- [ ] Title screen → Enter → Character select works
- [ ] Character select → role applied → Day 1 inbox loads
- [ ] Day 1 inbox contains Jordan email, Mom email, Chad intro email
- [ ] Reading all emails → E key → afternoon play state with apartment map
- [ ] WASD movement works on apartment map, no stuck tiles
- [ ] Interacting with Jordan triggers Day 1 dialogue
- [ ] Interacting with furniture triggers actions, costs AP
- [ ] "End Day Early" or depleting AP → evening summary
- [ ] Evening summary → Enter → Day 2 inbox loads
- [ ] No auto-timers anywhere — days only advance via player action
- [ ] AP resets to 5 each afternoon

**The deliverable is one playable loop: Day 1 → Day 2 start.** Nothing more.
