# Technical Assembly Plan — Round 23

**Tech Lead: Marcus Webb**
**For: Atlas Novak (Developer)**
**Build: saas-startup-simulator.html (working from current game.html)**

---

## 1. MERGE ORDER

There are no department patches to merge. This is a **greenfield integration** against the existing engine. Atlas builds directly into `game.html`. Order of implementation:

**Step 1: Character Creation Completion (fix what's there)**
- The name entry and role selection screens already exist and function. Verify the full flow: title → nameEntry → characterCreation → play. Currently works. No changes needed unless broken. This is a **verification step**, not a code step.

**Step 2: Jordan Day 1 Dialogue**
- Replace Jordan's random dialogue pool with a Day 1-specific dialogue set. On Day 1, Jordan should deliver a fixed opening dialogue instead of pulling from the random pool. Add a `getJordanDialogue()` function or a day-check branch inside `getNPCDialogue()`.
- Two dialogues total:
  - **First interaction**: "You're finally up." → sets up the $150K/0 customers situation, points player to laptop.
  - **Second interaction** (same day, if player talks again): A shorter line — "Check the laptop. We need a plan." or similar.
- Track whether Jordan has been spoken to on Day 1 with a flag like `gameState.jordanDay1Talked` (boolean).

**Step 3: Email System — Day 1 Chad + Mom Emails**
- The email system already exists (`EMAIL_TEMPLATES`, `generateDailyEmails`, `openEmailInbox`). Add two Day 1-specific emails:
  - **Chad email**: Subject like "WELCOME TO THE ARENA", taunting tone. `day: 1` filter.
  - **Mom email**: Subject like "SO PROUD OF YOU", supportive tone. `day: 1` filter.
- These are **display-only**. No response mechanics. No action effects. Just `priority: 'info'`.
- Remove or gate the existing Day 1 Jordan email from `EMAIL_TEMPLATES` (index 0) — it conflicts with the new in-person Jordan dialogue covering the same content.

**Step 4: Laptop Dashboard**
- The laptop menu option "TEAM STATUS" (index 2) already shows a dialogue-based dashboard. Enhance it to display the starting situation clearly on Day 1: `$150K cash, 0 customers, 18 months runway, 0 MRR`. This already works via `formatCash(gameState.cash)` etc. — verify the numbers display correctly at game start. No structural changes needed.

**Step 5: Whiteboard Interaction**
- The whiteboard interactable exists in the **office** room at tile (9,2). Per the Producer's scope, we need it accessible from the **apartment**. Two options:
  - **Option A (recommended):** Add a whiteboard interactable to the apartment room data. Place it at tile (6,1) on the wall. Add tile type for apartment whiteboard (reuse tile `5` which is already a wall-mounted whiteboard). Add it to `ROOMS.apartment.interactables`.
  - **Option B:** Keep whiteboard in office only. Player must walk to office on Day 1.
  - Go with **Option A**. The whiteboard should show Jordan's revenue math: "$150K / 18 months = $8,333/mo burn limit" and a response like "We need revenue before month 6."

---

## 2. PROTECTED SYSTEMS

`protected-systems.json` currently has an **empty protected list**. No functions are formally protected yet.

However, Atlas must verify these **core functions** still exist and maintain their signatures after changes, since they form the engine backbone:

| Function | Signature | Why |
|---|---|---|
| `drawText` | `(ctx, text, x, y, color, scale)` | Every screen depends on it |
| `measureText` | `(text, scale)` | Layout calculations everywhere |
| `initCanvas` | `()` | Bootstrap |
| `gameLoop` | `(timestamp)` | Main loop |
| `update` | `(dt)` | Update dispatch |
| `draw` | `(ctx)` | Render dispatch |
| `isCollision` | `(tx, ty)` | Movement system |
| `transitionToScreen` | `(targetState, callback)` | All screen changes |
| `transitionToRoom` | `(targetRoom, spawnKey)` | All location changes |
| `showDialogue` | `(speaker, lines)` | All NPC/object interactions |
| `advanceDay` | `()` | Day cycle |
| `getNPCDialogue` | `(id)` | NPC interaction — **this one will be modified internally but must keep its signature** |

---

## 3. NEW FUNCTION SIGNATURES

Minimal new functions. Keep it tight:

| Function | Signature | Purpose |
|---|---|---|
| `getJordanDay1Dialogue` | `()` → returns `string[]` | Returns the appropriate Day 1 Jordan lines based on `gameState.jordanDay1Talked` |

That's it. Everything else wires into existing functions.

---

## 4. DATA INTEGRATION

**Jordan Dialogue:**
- Add a day-check at the top of `getNPCDialogue('jordan')`. If `gameState.day === 1`, call `getJordanDay1Dialogue()` instead of pulling from the random pool.
- Add `jordanDay1Talked: false` to the `gameState` object.
- After first Day 1 Jordan dialogue completes, set it to `true`.

**Emails:**
- Add two objects to `EMAIL_TEMPLATES` array with `day: 1`:
```
{ subject, from, body, day: 1, priority: 'info' }
```
- Remove or modify the existing Day 1 email (index 0, `jordan@startup.io`) to avoid redundancy with in-person dialogue.

**Whiteboard:**
- Add to `ROOMS.apartment.interactables`: `{id: 'whiteboard', x: 6, y: 1}`
- Add whiteboard collision: `'1,6'` to apartment collisions (already blocked — row 1 is wall row, already in collision set for all x values via the loop). Verify this.
- Modify the whiteboard interaction check in `checkInteraction()` to show different content when in apartment vs office. Or: add a new interactable id like `'whiteboard_apt'` with its own handler showing Jordan's revenue math.

**Apartment Tile:**
- Place a whiteboard tile at `ROOMS.apartment.tiles[1][6] = 5` (tile 5 is already the whiteboard tile graphic).

---

## 5. DANGER ZONES

**Collision Set Construction (apartment):**
Lines where `ROOMS.apartment.collisions` is built. The wall rows (y=0, y=1) are added via a loop over all x. Adding a whiteboard interactable at y=1 means the player can never walk onto it — they interact by facing it from y=2. This is correct behavior, but Atlas must verify the player can actually stand at (6,2) and face up to interact.

**`getNPCDialogue` modification:**
This function is called from `checkInteraction()`. If Atlas adds state tracking (`jordanDay1Talked`), the flag must be set **after** the dialogue is shown, not before. The dialogue is async (player presses space to advance). The flag should be set at the moment `showDialogue` is called, not when it ends, since `getNPCDialogue` would be called again on a second interaction and needs to see the updated flag.

**Screen state machine (`gameState.screen`):**
The `switch` in `draw()` and `handleInput()` must remain in sync. If Atlas adds any new screen state, it must appear in **both** `draw()` and `handleInput()`. Currently no new screens are needed.

**`generateDailyEmails` filter logic:**
The function uses `e.day === gameState.day` for exact-day emails and `Math.random() < 0.35` for recurring ones. Day 1 emails with `day: 1` will always appear on Day 1. But the function also has `.slice(0, 3)` — if Atlas adds 2 new Day 1 emails plus the existing one, that's 3 Day 1 emails filling the entire inbox. Remove the old Jordan email to keep it at 2 Day 1 emails with room for variety.

**`gameState` initialization:**
All new state fields (`jordanDay1Talked`) must be added to the `gameState` object literal at declaration time, not injected later. This keeps the state shape predictable.

---

## 6. EXPECTED OUTPUT SIZE

Current `game.html`: ~750 lines of JavaScript (roughly — the full file is one HTML document with inline JS).

Additions:
- Day 1 Jordan dialogue function + state flag: ~15 lines
- Two new email templates: ~6 lines
- Apartment whiteboard tile + interactable: ~5 lines
- Whiteboard interaction branch for apartment: ~10 lines
- Minor getNPCDialogue modification: ~5 lines

**Expected final size: ~790-810 lines of JS.** Net addition of roughly 40-60 lines. This should be a tight, surgical integration. If Atlas finds himself writing more than 80 new lines, he's overbuilding.

---

## SUMMARY FOR ATLAS

This is a **small, precise integration**. You are not building new systems. You are:
1. Verifying the existing title→name→role→play flow works
2. Adding Day 1-aware Jordan dialogue (2 conversations, 1 flag)
3. Adding 2 emails to the existing template array
4. Adding a whiteboard to the apartment room data
5. Wiring the apartment whiteboard to show revenue math

Do not refactor. Do not restructure. Do not add systems that aren't scoped. Wire new content into existing patterns. The codebase already has the patterns — follow them.
