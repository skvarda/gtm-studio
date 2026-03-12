# TECHNICAL ASSEMBLY PLAN — ROUND 22

**Tech Lead:** Marcus Webb
**Developer:** Atlas Novak
**Build:** Integration Round 22 — Day 1 Core Interaction Loop

---

## 1. MERGE ORDER

There are no department patches to merge. This is a greenfield integration against the existing `saas-startup-simulator.html` (which is the file at `/home/gtm/saas-startup-simulator.html` — but we're working from the game.html provided above). Apply changes in this exact sequence:

**Pass 1 — Data Layer (no rendering changes)**
1. Rewrite `NPC_DATA.jordan.dialogues` to replace random pool with day-aware structured dialogue (two Day 1 conversations)
2. Add new dialogue data objects for laptop dashboard and whiteboard math interactions
3. Add two email entries to `EMAIL_TEMPLATES`: Chad's competitive taunt (day 1) and Mom's support email (day 1)

**Pass 2 — Dialogue System Enhancement**
4. Extend `showDialogue` to accept an optional choices array parameter
5. Add choice selection state tracking to `gameState.dialogue`
6. Add choice rendering to `drawDialogue`
7. Add choice input handling to `handleDialogueInput`

**Pass 3 — Interaction Rewiring**
8. Replace the laptop interaction in `checkInteraction` to use new first-look dashboard dialogue instead of jumping straight to laptop menu
9. Replace the whiteboard interaction in `checkInteraction` to use new revenue math dialogue
10. Make Jordan's dialogue context-aware (check `gameState.day` and whether player has interacted before)

**Pass 4 — Jordan Animation**
11. Add `animTimer` field to Jordan's NPC entry in room data
12. Add idle typing animation frame logic to `drawJordan` (subtle hand movement, 2 frames)
13. Update Jordan's position from `(8,5)` to `(8,3)` in apartment room, facing `down`

**Pass 5 — Email Overhaul for Day 1**
14. Override `generateDailyEmails` behavior for Day 1 specifically: always return Chad + Mom emails, ignore random roll
15. Remove action effects from Day 1 emails (read-only, no pipeline/quality side effects)

---

## 2. PROTECTED SYSTEMS

From `protected-systems.json`: **the protected list is empty.** No functions are currently locked.

However, Atlas must still verify these core function signatures remain intact and callable after all changes, as they form the engine spine:

| Function | Why it matters |
|---|---|
| `drawText(ctx, text, x, y, color, scale)` | Every UI element depends on this |
| `measureText(text, scale)` | Layout calculations everywhere |
| `initCanvas()` | Game bootstrap |
| `gameLoop(timestamp)` | Main loop |
| `update(dt)` / `draw(ctx)` | Core loop pair |
| `isCollision(tx, ty)` | Movement gating |
| `transitionToScreen(targetState, callback)` | Screen flow |
| `transitionToRoom(targetRoom, spawnKey)` | Location flow |
| `advanceDay()` | Day cycle |
| `economyTick()` | Economy calculations |
| `calculateMRR()` / `calculateBurnRate()` / `getRunway()` | HUD data |
| `drawHUD(ctx)` | Top bar |
| `drawPlayer(ctx, x, y, facing)` | Player sprite |
| `drawJordan(ctx, x, y)` | Jordan sprite (may extend, not break) |
| `drawNPCSprite(ctx, id, x, y)` | NPC dispatch |

**Rule: None of these may have their parameter signatures changed. Extend only by adding optional parameters at the end.**

---

## 3. NEW FUNCTION SIGNATURES

```
getJordanDialogue(day: number, hasSpokenToday: boolean) → string[]
```
Returns the appropriate Jordan dialogue lines based on game day and prior interaction. Replaces random selection for Jordan only.

```
getLaptopFirstLook() → {speaker: string, lines: string[], choices?: {text: string, result: string}[]}
```
Returns the first-time laptop interaction dialogue with dashboard numbers and an optional player reaction choice.

```
getWhiteboardDialogue() → {speaker: string, lines: string[]}
```
Returns the revenue math breakdown dialogue ("$150K / $2K burn = 75 weeks runway" style).

```
showDialogueWithChoices(speaker: string, lines: string[], choices: {text: string, callback: function}[])
```
Extended dialogue entry point. After final line, presents 2-3 choices. Player selects with arrow keys, confirms with Space/Enter. Falls back to `showDialogue` behavior if choices is null/empty.

```
drawDialogueChoices(ctx: CanvasRenderingContext2D)
```
Renders the choice selector UI within the dialogue box. Called from `drawDialogue` when on the final line and choices exist.

```
updateJordanAnim(dt: number)
```
Ticks Jordan's idle typing animation timer. Called from `update(dt)` when in play state and currentRoom is apartment.

---

## 4. DATA INTEGRATION

### Jordan Dialogue Structure
Replace the random array in `NPC_DATA.jordan.dialogues` with a keyed structure:

```
NPC_DATA.jordan.dialogues → {
  day1_first: ["line", "line", "line"],
  day1_second: ["line", "line"],
  default: ["line", "line"]
}
```

Add a tracking flag: `gameState.jordanTalkedToday: false` — reset in `resetAP()` alongside AP reset.

`getJordanDialogue()` checks this flag. First call returns `day1_first`, second returns `day1_second`, subsequent returns generic.

### Laptop Dashboard Data
Add to a new `DASHBOARD_DATA` object:

```
DASHBOARD_DATA.day1 = {
  lines: ["$150,000 in the bank.", "0 customers. 0 revenue.", "$2,000/week burn rate.", "75 weeks until we're dead."],
  choices: [{text: "We can do this.", result: "optimist"}, {text: "...that's terrifying.", result: "realist"}]
}
```

Choice result is stored in `gameState.dashboardResponse` for potential future use but has no mechanical effect this round.

### Whiteboard Data
Static object, no progression needed:

```
WHITEBOARD_DATA.day1 = {
  lines: ["THE MATH:", "$150,000 cash / $2,000 burn = 75 weeks", "To break even: need 21 customers at $99/mo", "To be comfortable: 50 customers", "Current customers: 0"]
}
```

### Email Wiring
Add two entries to `EMAIL_TEMPLATES` with `day: 1` (exact day match, not minDay):

- Chad email: subject "JUST RAISED $5M", from "chad@thundercorp.io", priority "warning", no action
- Mom email: subject "SO PROUD OF YOU", from "mom@family.net", priority "info", no action

Modify `generateDailyEmails`: on Day 1, force-return these two emails in order (Chad first, Mom second). Skip the random filter.

---

## 5. DANGER ZONES

### Zone A — `checkInteraction()` (lines ~470-485)
This function does NPC lookup, interactable lookup, and door lookup in sequence. The laptop and whiteboard branches are single-line conditionals. When rewriting these to call new dialogue functions, **do not break the early return pattern.** Each branch must still `return` after triggering its interaction.

### Zone B — `gameState.screen` state machine
The screen value drives the entire `draw()` switch and all input routing. The new `showDialogueWithChoices` function **must set screen to 'dialogue'**, not introduce a new screen state. Choice handling lives inside `handleDialogueInput`, gated by checking whether choices exist on the current dialogue object. Adding a new screen state here would require touching `draw()`, `handleInput()`, and transition logic — too much blast radius.

### Zone C — `ROOMS.apartment` collision set and NPC positions
Jordan is currently at `(8,5)`. Moving to `(8,3)` means:
- Verify `(8,3)` is not in the collision set (it's currently a floor tile, type 0 — safe)
- Verify the old position `(8,5)` doesn't have a collision entry that needs cleanup
- The rug tiles at `(6-8, 8-11)` are cosmetic only, no collision impact

### Zone D — `drawDialogue()` box dimensions
The dialogue box is hardcoded: `boxH=80, boxY=280, boxW=608`. If adding choices below the text, the box height must grow. **Compute boxH dynamically** when choices are present (add ~40px for 2-3 choice lines). Do not change the default 80px for non-choice dialogues.

### Zone E — `handleDialogueInput()` currently only handles advance
It calls `advanceDialogue()` on Space/Enter/E. The choice system must intercept: if on the last line AND choices exist, arrow keys change selection and Space/Enter triggers the selected choice's callback — then closes dialogue. **Do not let advanceDialogue() fire when choices are showing.**

### Zone F — `generateDailyEmails()` filter logic
Currently uses `.filter()` with random chance and `.slice(0,3)`. The Day 1 override must happen **before** the filter, not inside it. An early return for `gameState.day === 1` is the safest approach.

---

## 6. EXPECTED OUTPUT SIZE

| Component | Current | Delta | Notes |
|---|---|---|---|
| Engine + rendering | ~650 lines | +0 | No engine changes |
| Data (NPC, rooms, tiles) | ~250 lines | +40 | Jordan restructure, dashboard/whiteboard data |
| Dialogue system | ~40 lines | +65 | Choice selection, dynamic box height, choice rendering |
| Email system | ~80 lines | +15 | Day 1 override, 2 new templates |
| Jordan animation | ~20 lines (drawJordan) | +25 | Animation timer, 2-frame idle, update hook |
| Interaction logic | ~30 lines | +20 | Laptop/whiteboard rewiring, Jordan day-awareness |

**Current file: ~780 lines of JS**
**Expected final: ~945 lines of JS (~165 line addition)**
**Total HTML file: ~1,000 lines** including markup/style

This is a moderate addition. If it starts creeping past 1,050 lines, Atlas is overbuilding.

---

## VALIDATION CHECKLIST (Atlas runs before submitting)

- [ ] Title screen → Name entry → Character select → Play flow works unchanged
- [ ] Walk to Jordan in apartment, get Day 1 first dialogue with choices
- [ ] Walk to Jordan again, get Day 1 second dialogue
- [ ] Face laptop, press E, get dashboard dialogue (not laptop menu on first look)
- [ ] Face laptop again, get normal laptop menu
- [ ] Walk to office, face whiteboard, get revenue math dialogue
- [ ] End Day 1 via laptop menu, Day 1 emails show Chad then Mom
- [ ] HUD displays correctly throughout
- [ ] All room transitions still work (apartment ↔ street ↔ office ↔ cafe)
- [ ] No console errors

**Atlas: build clean, build tight. Ship Day 1.**
