# Scoped Integration Plan — Round 11

**Context:** Three rejected integrations. No new department outputs. One deliverable: `saas-startup-simulator.html` (1744 lines, functional but misaligned with vision spec).

---

## 1. What Goes In (Ordered by Risk/Dependency)

### **Phase 1: Foundation Fixes (MUST COMPLETE)**
1. **Resolution upgrade: 320x224 → 640x360 native, 2x scale**
   - Update canvas creation and scaling logic
   - Recalculate all draw functions: `drawPlayer`, `drawNPC`, `drawMap`, `drawHUD`, `drawMenu`, `drawDialog`
   - Update tile positions and UI element coordinates
   - Test: Game launches and renders without errors

2. **AP system: 3 → 5 per day**
   - Update `actionPointsPerDay` constant
   - Update starting AP and reset logic
   - Test: All 5 AP can be spent, day progression works

### **Phase 2: Structure Improvements (IF TIME ALLOWS)**
3. **Day phase structure: Morning/Afternoon/Evening**
   - Add phase tracking to game state
   - Update HUD to show current phase
   - Email delivery in morning phase only
   - Test: Phase transitions work, AP spending gated properly

4. **Named NPC integration: Maya Chen & Derek Williams**
   - Add Maya as first dev hire option (replaces generic dev)
   - Add Derek as first sales hire option (replaces generic sales)
   - Update hiring dialog to use names
   - Test: Named hires work, provide correct bonuses

---

## 2. What Gets Cut/Deferred

### **Cut from this round:**
- **Economy tier variety** — Current flat $49/customer works fine, tiers add complexity
- **Ownership/dilution tracking** — Requires new UI, can be stubbed later
- **4 endgame path stubs** — Pure narrative, no gameplay impact
- **Coffee shop location expansion** — Not in current build anyway
- **Advanced day structure** (specific morning/afternoon/evening actions) — Basic phases only
- **Sound improvements** — Current oscillator beeps are functional

### **Reason:** Resolution change is a full rewrite of rendering pipeline. Adding economic complexity while the graphics are broken is a recipe for another rejection.

---

## 3. Unresolved Cross-Department References

### **Story → Game Integration Gaps:**
- **Jordan dialogue from story state** — Current build has basic Jordan interaction, but story state has specific day 1 conversations. Integration needed but low priority.
- **Chad email content** — Story state has Chad introduction email, current build has generic email system. Can be manually copied.
- **Laptop/whiteboard specific interactions** — Story state has detailed responses, current build has generic interactions.

### **Art → Game Integration Gaps:**
- **No art assets available** — All sprites are still placeholder colored rectangles
- **Named NPC sprites** — Maya and Derek will need placeholder graphics like Jordan

### **Warning:** Story content exists but may not match current game's interaction system. Test all dialogue paths after integration.

---

## 4. The ONE Thing This Integration MUST Accomplish

**Get the game rendering correctly at 640x360 native resolution with 5 AP per day, and verify the core gameplay loop (move → interact → spend AP → end day → repeat) runs for 10+ days without errors.**

Everything else is secondary. If the resolution is wrong or the core loop breaks, we reject ourselves.

---

## 5. Integration Risk Assessment

**HIGH RISK:** Resolution change touches 15+ draw functions. One miscalculation breaks the entire visual system.

**MEDIUM RISK:** AP balance — 5 AP vs 3 AP may make game too easy/fast. Monitor economy balance.

**LOW RISK:** Named NPCs are just string replacements in existing hire system.

---

## 6. Success Criteria (Shipping Checklist)

- [ ] Game launches at 640x360 native (1280x720 display)
- [ ] Player sprite renders at correct position and scale
- [ ] Map tiles render without gaps or overlaps  
- [ ] HUD displays correctly (cash/MRR/AP counters)
- [ ] Menu system renders and responds to input
- [ ] 5 AP available per day, all spendable
- [ ] Day transitions remain manual (no auto-advance)
- [ ] Can hire employees and track economy stats
- [ ] Game runs 10+ days without JS errors
- [ ] Win/lose conditions still trigger correctly

**If any checklist item fails → DO NOT SHIP. Fix or cut features until all items pass.**

---

*This is our foundation round. Get the graphics right, get the AP right, ship it clean.*

**Ren Tanaka, Producer**  
*"Three strikes means we swing for singles, not home runs."*
