# Technical Assembly Plan — Round 11
**Marcus Webb, Tech Lead**
**For: Atlas Novak, Developer**

---

## 1. MERGE ORDER

There are no department patches to merge. This is an internal engine round. Atlas is modifying the existing `saas-startup-simulator.html` directly. Order of changes:

**Step 1: Resolution Upgrade (Foundation)**
Touch the rendering pipeline first. Everything else depends on coordinates being correct.

1. `initCanvas()` — change native dimensions from 640x360 to 640x360. **Wait.** Re-reading Ren's spec: 640x360 native, 2x scale to 1280x720. The current code already does 640x360 native with `canvas.style.width = '1280px'`. However, it's using DPR scaling internally which may be doubling again on high-DPI screens. Clarification: the current canvas is **already 640x360 native at 2x display scale**. The engine spec confirms this. Atlas, verify the current rendering matches the spec before making changes. If it already renders correctly at 640x360, **skip the resolution change entirely** and move to AP.

If Ren's brief says "320x224 → 640x360" — that was Round 9's resolution. The current file already uses 640x360. **Confirm this by checking `initCanvas()` constants and actual browser rendering before touching anything.**

**Step 2: AP System Update**
- Change `maxAP` from 5 to 5. **It's already 5.** Check `gameState.ap:5, maxAP:5`. Confirmed: already 5 AP. **Skip.**

**Step 3: Day Phase Structure (Phase 2 — if time)**
- Add phase tracking
- Update HUD
- Gate email delivery to morning

**Step 4: Named NPC Integration (Phase 2 — if time)**
- Wire Maya and Derek as first hire options
- Update hiring dialogue strings

---

## 2. PROTECTED SYSTEMS

From `protected-systems.json`: the `protected` array is **empty**. No systems are currently protected.

Atlas has no protected functions to verify. However, treat the following as **informally protected** — they are stable, tested, and should not have their signatures changed without reason:

- `drawText(ctx, text, x, y, color, scale)`
- `measureText(text, scale)`
- `initCanvas()`
- `drawPlayer(ctx, x, y, facing)`
- `drawNPCSprite(ctx, id, x, y)`
- `drawHUD(ctx)`
- `drawRoom(ctx)`
- `isCollision(tx, ty)`
- `economyTick()`
- `advanceDay()`
- `gameLoop(timestamp)`

**Do not rename, remove, or change the parameter lists of any of these.** You may modify their internals.

---

## 3. NEW FUNCTION SIGNATURES

**Phase 1:** None required if resolution and AP are already correct.

**Phase 2 (if time):**

For day phases:
- `getCurrentPhase()` — returns `'morning'` | `'afternoon'` | `'evening'` based on AP spent or explicit phase state
- `advancePhase()` — moves to next phase within a day, no parameters
- `drawPhaseIndicator(ctx, x, y)` — renders current phase label in the HUD

For named NPC hiring:
- No new functions. Modify `ACTIVITIES.hire.run()` internally to use named candidates instead of random generation. The existing structure supports this — it already has name arrays per type.

---

## 4. DATA INTEGRATION

**Named NPCs (Maya Chen & Derek Williams):**

Maya and Derek already exist in `NPC_DATA` and `ROOMS.office.npcs`. They have sprites via `drawNPCSprite()` configs. The integration point is the **hiring system** in `ACTIVITIES.hire.run()`.

Current hire logic picks a random type and random name from a pool. Change it to:

- First dev hire should always be "Maya Chen" (not random from pool)
- First sales hire should always be "Derek Williams" (not random from pool)
- Subsequent hires can remain random
- Check `economy.employees` for existing names before offering

Wire their skill levels to fixed values: Maya skill 3 (dev), Derek skill 2 (sales). These are named characters, not random rolls.

**Day Phase Data:**

Add a `phase` field to `gameState`: `gameState.phase = 'morning'`. Phases cycle: morning → afternoon → evening. Define AP thresholds or explicit transitions:
- Morning: 0 AP spent (start of day, email delivery)
- Afternoon: 1-3 AP spent
- Evening: 4-5 AP spent

This is display-only for now. Don't gate actions by phase except email delivery in morning.

**No new dialogue JSON or art assets to integrate this round.**

---

## 5. DANGER ZONES

**`initCanvas()` — FRAGILE**
Uses `window.devicePixelRatio` to scale the internal canvas buffer. If you change the native resolution, you must also update the DPR multiplication or you'll get blurry rendering or incorrect mouse/touch coordinates (if added later). The current approach of `canvas.width = 640 * dpr` with `ctx.scale(dpr, dpr)` means all draw calls use 640x360 logical coordinates. **Do not change this pattern.**

**`drawTile()` switch statement — TIGHTLY COUPLED**
34 tile cases with hardcoded pixel offsets based on `TILE=32`. If you change TILE size, every case breaks. Since we're not changing tile size, don't touch this.

**`ROOMS` object — TIGHTLY COUPLED**
Collision sets use string keys like `'3,3'`. Tile arrays are hand-built. NPC positions are hardcoded coordinates. Any change to grid dimensions or tile size invalidates all room data. **Don't touch room definitions.**

**`ACTIVITIES.hire.run()` — MODERATE RISK**
Modifying hire logic to use named characters could break if you don't handle the edge case where Maya/Derek are already hired. Check `economy.employees` by name before offering them.

**`drawHUD()` — MODERATE RISK**
Already cramped with Day, Room, Cash, Runway, MRR, Customers, AP diamonds, Quality, Pipeline, Leads. Adding a phase indicator requires careful positioning. The HUD is 28px tall at the top. You have roughly 640px width to work with. Find space or slightly reorganize, but **do not increase HUD height** — it will push the map down and break tile positioning since `HUD_H=32` is used as a y-offset everywhere.

Wait — `HUD_H=32` but the HUD only draws 28px + 1px border = 29px. There's 3px of dead space. The phase indicator can fit in existing space. Use the gap between Room name and Cash display, or append to the Day label.

**`gameLoop` / `update` / `draw` — ENTRY POINTS**
These are the main loop. Any new screen state must be added to both `update()` and `draw()` switch cases. If you add `'phaseTransition'` as a screen state, register it in both places or the game freezes.

---

## 6. EXPECTED OUTPUT SIZE

Current file: ~1744 lines.

- Resolution/AP changes (if needed): +0 lines (modifications only)
- Day phase system: ~+60-80 lines (state tracking, phase logic, HUD indicator, morning email gating)
- Named NPC hiring: ~+20-30 lines (conditional logic in hire function)
- Minor cleanup: net neutral

**Expected final size: 1800-1860 lines.**

If it exceeds 1900 lines, Atlas is over-engineering. If it's under 1750, he probably forgot something.

---

## VERIFICATION CHECKLIST FOR ATLAS

Before declaring done, run through Ren's shipping checklist manually:

1. Open in browser. Does it render at 1280x720 window with crisp pixels? No blur?
2. Title screen → name entry → character select → gameplay. Any screen broken?
3. Walk around apartment. Tiles aligned? No gaps?
4. HUD readable? All counters updating?
5. Open laptop menu. All 4 options work?
6. Spend all 5 AP. Counter goes to 0? Activities block correctly?
7. End day. Day report shows? Day increments? AP resets to 5?
8. Walk to street, office, cafe. Door transitions work? No stuck states?
9. Talk to all NPCs: Jordan, Maya, Derek, Gina, Chad. Dialogue displays and dismisses?
10. Play 10 days. Console open. Any JS errors? Economy numbers make sense?

**If any of these fail, fix before shipping. Do not ship broken.**

---

**Marcus Webb, Tech Lead**
*"The current build may already be closer to spec than we think. Verify before you modify."*
