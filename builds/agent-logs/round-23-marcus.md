# Technical Assembly Plan — Round 23 Integration

**Tech Lead:** Marcus Webb
**Developer:** Atlas Novak
**Base File:** `/home/gtm/saas-startup-simulator.html` (current `game.html` pasted above, ~750 lines)
**Target:** Playable 3-day experience, zero softlocks

---

## 1. MERGE ORDER

Strict sequential order. Do not skip ahead. Test after each layer.

### PASS 1: Bug Fix & Structural Prep
Apply before any new content. The current file has a bug — `initNPCs()` is called at boot but never defined. Fix:

1. Remove the `initNPCs()` call at the bottom, or define it as a no-op. The `staticNPCs` array and `getAllNPCs()` already handle NPC setup.
2. Verify boot sequence works: `initCanvas()` → `requestAnimationFrame(gameLoop)` → title screen renders without console errors.
3. Add `gameState.flags` initialization — confirm it's `{}` at start (it is, but verify no code path assumes specific keys exist before emails set them).

### PASS 2: Day-Scoped Content System
Wire the infrastructure that makes content change per day. This is plumbing, not content.

1. Add a `DAY_CONTENT` object at the top of the content section. Structure:
```
DAY_CONTENT[dayNumber] = { jordan_lines, emails, object_responses }
```
2. Refactor `getJordanLines()` to check `DAY_CONTENT[gameState.day]` first, fall back to current bracket logic for days 4+.
3. Refactor `generateDailyEmails()` to check `DAY_CONTENT[gameState.day].emails` first for mandatory day-specific emails, then fall through to the existing template pool for filler.
4. Add `getObjectResponse(tileType)` function that checks `DAY_CONTENT[gameState.day].object_responses[tileType]` for contextual text. Falls back to current action behavior if no response defined.

### PASS 3: Story Content (Round 21 — Sage/Felix)
Wire the actual dialogue and email data into the `DAY_CONTENT` structure.

1. **Jordan Day 2-3 dialogue** — Translate Sage's JSON dialogue into `DAY_CONTENT[2].jordan_lines` and `DAY_CONTENT[3].jordan_lines` arrays. Flatten the branching responses into the existing dialogue system format (sequential lines, no branching — the current `startDialogue()` doesn't support inline choices). If a line has player responses in Sage's data, pick the most narratively neutral one as a follow-up line from the player, or omit responses entirely and keep Jordan monologuing. Do NOT try to build a branching dialogue system this round.
2. **Chad email progression** — Add 3 new email templates to `EMAIL_TEMPLATES`:
   - `chad_day1`: Day range [1,1], mandatory. Friendly networking tone. Category 'story'.
   - `chad_day2`: Day range [2,2], mandatory. More probing, "intelligence gathering." Category 'story'.
   - `chad_day3`: Day range [3,3], mandatory. Escalation, competitive pressure. Category 'story'.
   - All three should be `unique: true`.
3. **Economy progression flags** — Add to `DAY_CONTENT` a `flash_message` field for each day. Day 2: something about burn rate. Day 3: money reality check. Display as flash text when afternoon starts via `showFlash()`.
4. **Interactive object responses** — Add contextual strings for laptop (tile 4), whiteboard (tile 5) for days 1-3. These show as flash messages or brief dialogue *before* the AP action triggers. Example: Day 1 laptop = "Time to write some code." Day 3 laptop = "The codebase is getting messy."

### PASS 4: UI Asset Loading (Round 22 — Iris)
Wire PNG assets with graceful fallback.

1. Add an `ASSETS` object at the top of the file:
```
ASSETS = { loaded: {}, failed: {} }
```
2. Add `loadAsset(id, path, callback)` — creates an `Image()`, sets `onload` to store in `ASSETS.loaded[id]`, sets `onerror` to store `true` in `ASSETS.failed[id]` and log a warning. No blocking — game boots immediately regardless of load state.
3. Add `getAsset(id)` — returns `ASSETS.loaded[id]` or `null`. Every draw call that uses an asset must check for `null` and fall back to the current rectangle rendering.
4. Call `loadAsset()` for each of these at boot (after `initCanvas()`, before `requestAnimationFrame`):
   - `ui_dialogue_box` → `assets/ui/ui_dialogue_box_v1.png`
   - `ui_action_points_full` → `assets/ui/ui_action_points_full_v1.png`
   - `ui_email_inbox_panel` → `assets/ui/ui_email_inbox_panel_v1.png`
   - `npc_jordan_idle` → `assets/sprites/npc_jordan_idle_v4.png`
5. In `drawDialogueBox()`: if `getAsset('ui_dialogue_box')` exists, `drawImage()` it scaled to 640x80 at position (0, 280). Otherwise keep current `fillRect` rendering.
6. In `drawAPPips()`: if `getAsset('ui_action_points_full')` exists, draw the sprite. Otherwise keep current diamond rendering.
7. In `drawInbox()`: if `getAsset('ui_email_inbox_panel')` exists, draw it as the left panel background. Otherwise keep current `fillRect`.
8. In the NPC draw path: if `getAsset('npc_jordan_idle')` exists and the NPC is Jordan, `drawImage()` instead of calling `drawSprite()`. Otherwise keep current programmatic sprite.

**Critical rule: every asset draw path must be wrapped in an if/else. Missing image = current rectangles. No crashes.**

### PASS 5: 3-Day Gate
Add a win/completion condition for the playtest scope.

1. In `advanceDay()`, after incrementing to day 4, instead of starting day 4, transition to a "DEMO COMPLETE" screen. Set `gameState.uiState = 'demo_complete'`.
2. Add a simple `drawDemoComplete(ctx)` that shows "BEAT 3 COMPLETE — THANKS FOR PLAYING" with day stats and "PRESS ENTER TO RESTART".
3. Handle input for `demo_complete` state: Enter reloads.

---

## 2. PROTECTED SYSTEMS

The `protected-systems.json` has an empty protected array. However, per prior Tech Lead directives, these function signatures are load-bearing and **must not change**:

| Function | Why |
|---|---|
| `drawText(ctx, text, x, y, color, scale)` | Every UI element depends on this. Zero `ctx.fillText()` calls allowed anywhere. |
| `measureText(text, scale)` | Used by wrapping, centering, layout. |
| `wrapText(text, maxWidth, scale)` | Dialogue, email body, action descriptions. |
| `initCanvas()` | Boot sequence entry. |
| `initAP()` / `canSpendAP(k)` / `spendAP(k)` | AP economy. |
| `performAction(actionId)` | Action dispatch. Returns `{success, message, effects}`. |
| `startDay(d)` / `startAfternoon()` / `startEvening()` / `advanceDay()` | Day cycle state machine. |
| `generateDailyEmails(day)` | Email generation. Must still return array of email objects. |
| `startDialogue(speaker, lines, color)` / `advanceDialogue()` | Dialogue state machine. |
| `isTileWalkable(x, y)` / `getTileAt(x, y)` | Map collision. |
| `tryMove(dir)` / `updatePlayer(dt)` | Movement. |
| `economyTick()` | Returns `{revenue, burn, churnedCustomers, runway, cashChange}`. |

Atlas: after your final build, `grep` for every function name in this list and confirm the signature matches. If you need to extend a function, add optional parameters at the end — do not change existing parameter order.

---

## 3. NEW FUNCTION SIGNATURES

| Function | Parameters | Returns | Purpose |
|---|---|---|---|
| `loadAsset(id, path)` | `string, string` | `void` | Async image load into `ASSETS.loaded` |
| `getAsset(id)` | `string` | `Image or null` | Safe asset retrieval with null fallback |
| `getObjectResponse(tileType, day)` | `number, number` | `string or null` | Day-specific flavor text for interactive tiles |
| `drawDemoComplete(ctx)` | `CanvasRenderingContext2D` | `void` | End-of-demo summary screen |

No other new functions. Everything else is data wiring into existing functions.

---

## 4. DATA INTEGRATION

### 4A. Jordan Dialogue (Sage R21 → `getJordanLines()`)

Sage wrote dialogue with triggers: `walk_past`, `interact`, `event`. Our system only has `interact` (player presses E while facing Jordan). Map as follows:

| Sage trigger | Our system | Handling |
|---|---|---|
| `interact` | `getJordanLines()` | Direct mapping — these become the line arrays |
| `walk_past` | Not supported | Fold best line into `interact` pool for that day |
| `event` | Not supported | Fold into `interact` pool or drop |

Sage's `player_responses` with `jordan_relationship` effects: **drop the branching, keep Jordan's lines only.** The current dialogue system is linear. Do not add choice support to dialogue this round. If a Sage line contains `*asterisks*` for stage directions, keep them — they render fine with our font.

### 4B. Chad Emails (Sage R21 → `EMAIL_TEMPLATES`)

Add 3 entries to the `EMAIL_TEMPLATES` array. Use Sage's email text. Structure matches existing template format:

```
{id, from:'Chad Thunderpitch', subject, body, day_range:[N,N], unique:true, category:'story', choices:[...] or null}
```

Day 1 Chad email should have a choice (engage vs ignore) that sets `flag: 'chad_engaged'`. Days 2-3 can be read-only or have simple choices. Keep effects to flags only — no economy changes from Chad emails.

### 4C. Object Responses (Felix R21 → `getObjectResponse()`)

Felix defined contextual text for laptop and whiteboard by day. Store as:

```js
var OBJECT_RESPONSES = {
  1: { 4: "First day. Let's see what this laptop can do.", 5: "Empty whiteboard. Full of potential." },
  2: { 4: "The code's starting to take shape.", 5: "Yesterday's plans still on the board." },
  3: { 4: "Bugs are creeping in. Stay focused.", 5: "The roadmap is getting crowded." }
};
```

Wire into the interact handler: when player presses E facing a tile with an action, check `getObjectResponse()` first. If it returns text, show as `showFlash()` for flavor, then proceed with the normal `performAction()` flow. Do not block the action behind the flavor text.

### 4D. Asset References (Iris R22 → `ASSETS`)

Asset paths are relative to the HTML file location. If the HTML is at `/home/gtm/saas-startup-simulator.html`, assets are at `/home/gtm/assets/...`. Use relative paths:

```
assets/ui/ui_dialogue_box_v1.png
assets/ui/ui_action_points_full_v1.png
assets/ui/ui_email_inbox_panel_v1.png
assets/sprites/npc_jordan_idle_v4.png
```

Do NOT load Chad/Gina sprites (R16) — they have no location to appear in. Do NOT load player sprite revisions (R17/R18) — current programmatic sprite works and we're not risking a regression.

---

## 5. DANGER ZONES

### 5A. `handleInput()` switch statement (most fragile code in the file)
Every UI state must have a clear input handler and a clear exit. When you add `demo_complete`, add it to both the switch in `handleInput()` AND the switch in the `gameLoop()` draw section. Missing either one = softlock.

### 5B. `gameState.uiState` transitions
Current valid transitions:
```
title → character_select → inbox → play ↔ dialogue
                                       ↔ action_menu → action_result → play/evening
                                   evening_summary → inbox (next day) / game_over
```
You're adding: `evening_summary → demo_complete` (when day reaches 4). Map it explicitly. The `advanceDay()` function is the gate.

### 5C. `generateDailyEmails()` — email deduplication
Unique emails are tracked in `gameState.emailsRead`. When you add Chad day-specific emails as mandatory (`day_range:[N,N]`), they'll be pushed into `emailsRead` by `makeEmail()`. Verify that on day 2 and day 3, the previous day's Chad email doesn't block the new one — each has a different `id`, so this should be fine, but verify.

### 5D. The `initNPCs()` call at boot
Line near the bottom calls `initNPCs()` which doesn't exist. This will throw on load. Fix it first thing in Pass 1 or nothing else matters.

### 5E. AP=0 → Evening transition
When `AP.current` hits 0 via action result screen, pressing Space calls `startEvening()`. When the player uses `end_day` action (0 AP cost, sets AP to 0), same path. Both must work. Test both paths on all 3 days.

### 5F. Email phase gate
`allEmailsRead()` must return true before player can press E to exit inbox. With new mandatory Chad emails added, verify they appear and can be read/responded-to. If a choice email isn't responded to, it stays unread and blocks progress.

---

## 6. EXPECTED OUTPUT SIZE

| Section | Current | Added | Notes |
|---|---|---|---|
| Engine (canvas, font, movement, etc.) | ~350 lines | 0 | Untouched |
| Game systems (AP, economy, actions) | ~150 lines | +10 | Minor refactors |
| Email templates | ~120 lines | +30 | 3 Chad emails, possible tweaks |
| Day content data | 0 | +60 | `DAY_CONTENT`, `OBJECT_RESPONSES` |
| Asset loader | 0 | +30 | `loadAsset`, `getAsset`, boot calls |
| Asset draw integration | 0 | +40 | if/else branches in 4 draw functions |
| Jordan day-specific dialogue | ~20 lines | +30 | Days 2-3 expanded lines |
| Demo complete screen | 0 | +25 | Draw function + input handler |
| Bug fixes | — | +5 | `initNPCs` fix, misc |

**Estimated final size: ~850-900 lines.** If you're over 950, you're probably duplicating something. If you're under 800, you probably forgot a layer.

---

## 7. ACCEPTANCE CHECKLIST

Atlas, before you submit, walk through this exact sequence:

1. Load page. Title screen renders. No console errors.
2. Press Enter. Character select shows 3 roles.
3. Pick any role. Day 1 inbox appears with Jordan email + Chad email + filler.
4. Read all emails (respond to choices). Press E. Afternoon starts.
5. Walk to every interactive tile. Press E. Flavor text flashes, action executes.
6. Walk to Jordan. Press E. Day-1 dialogue plays.
7. Spend all 5 AP. Evening summary shows.
8. Press Enter. Day 2 inbox with new Chad email + new content.
9. Repeat through Day 3 evening.
10. After Day 3 evening, demo complete screen shows.
11. Press Enter. Game restarts.

**If any step crashes, softlocks, or shows no content: fix it before submitting.**
