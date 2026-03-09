# TECHNICAL ASSEMBLY PLAN — Round 24

**Tech Lead: Marcus Webb**
**Developer: Atlas Novak**

---

## SITUATION ASSESSMENT

There are **no department outputs to integrate this round**. The current `saas-startup-simulator.html` (897 lines) already implements every item in Ren's Phase 1 Critical Path:

- Character creation (name entry + role select): **done**
- Apartment scene with Jordan at (8,5): **done**
- Click-to-interact (laptop, whiteboard, Jordan): **done**
- Dialogue framework: **done**

This is a **verification and stabilization round**, not a content integration round.

---

## 1. MERGE ORDER

There is nothing to merge. Atlas's task is **audit and verify**, in this order:

1. **Verify the core loop works end-to-end**: Title → Name Entry → Character Creation → Apartment → Interact with laptop → Return to play
2. **Verify Jordan interaction**: Walk to Jordan, face him, press E, dialogue displays and completes
3. **Verify door transitions**: Apartment → Street → Office → Cafe and back
4. **Verify day cycle**: Laptop → End Day → Day transition → Day report → Return to play
5. **Document any bugs found** for next round's backlog

---

## 2. PROTECTED SYSTEMS

`protected-systems.json` has an **empty protected array**. No functions are currently protected. Atlas has no verification obligations here.

However, Atlas should **not refactor** any of these core functions, as they are candidates for protection once stable:

- `initCanvas()`
- `drawText()`
- `measureText()`
- `updateMovement()`
- `drawHUD()`
- `advanceDay()`
- `economyTick()`

---

## 3. NEW FUNCTION SIGNATURES

**None.** No new functions should be created this round.

---

## 4. DATA INTEGRATION

**None.** No new dialogue JSON, NPC data, or asset references exist from departments. The existing `NPC_DATA`, `EMAIL_TEMPLATES`, and `ACTIVITIES` objects remain unchanged.

---

## 5. DANGER ZONES

If Atlas finds bugs and wants to fix them, these areas are fragile:

| Area | Lines (approx) | Risk |
|---|---|---|
| `isCollision()` | ~280 | Collision set uses `'y,x'` string format — easy to confuse with `'x,y'` |
| `checkDoorTransition()` / `transitionToRoom()` | ~340-370 | Player spawn positioning has HUD_H offset math that's easy to break |
| `ROOMS` object tile arrays | ~230-310 | Inline IIFEs with hardcoded collision sets — one wrong coordinate breaks walkability |
| `handleInput()` switch | ~370 | Screen state routing — adding/removing cases can create input dead states |
| `drawDayTransition()` | ~680 | References `gameState.day` before and after increment — off-by-one risk |

---

## 6. EXPECTED OUTPUT SIZE

**~897 lines, unchanged.** No additions this round.

---

## DIRECTIVE TO ATLAS

This is a **no-op integration round**. The build already contains the scoped features. Your job:

1. Open the file in a browser
2. Play through the full loop (title → name → role → apartment → talk to Jordan → use laptop → end day)
3. Report any bugs you find
4. **Do not write code unless a bug blocks the core loop**

If the loop works, ship the file as-is. The next content round will give you actual department outputs to wire in.
