# Integration Directive — Round 23

**Director:** Vivian Cross
**Priority:** `beat_3_core_loop`
**Type:** INTEGRATION
**Baseline:** `/home/gtm/saas-startup-simulator.html`

---

## THE ONE THING

**A player must be able to: start the game → pick a role → read Day 1 emails → walk the garage → spend 5 AP on world objects → see evening summary → advance to Day 2 → repeat through Day 3 without any crashes, softlocks, or broken state transitions.**

This is our second human checkpoint. If someone picks it up and plays three days without getting stuck, we ship.

---

## 1. Merge Priority Order

| Order | Source | What | Why First |
|-------|--------|------|-----------|
| 1 | Round 20 (Atlas engine) | Title screen, character select, tile map, movement, NPC system, interaction system, dialogue boxes | This is the spatial skeleton everything else plugs into. It's the most recent and most complete engine build. **Start here as the base.** |
| 2 | Round 19 (Atlas engine) | Refined AP system, email inbox with choices, day cycle refactor, economy tick | Layer AP/email/economy on top of R20's spatial game. R20 already preserved these systems but R19 has the cleaner choice-effect email bridge. Reconcile, don't duplicate. |
| 3 | Round 21 (Sage/Felix) | Days 2-3 email templates, Jordan dialogue trees, economy progression notes | Wire story content into existing email generator and NPC dialogue system. **Data only** — no new systems needed, just populate the arrays. |
| 4 | Round 22 (Iris art) | UI assets: dialogue box, AP pips, email panel, HUD panel, Jordan v4 sprite | Load as `Image()` objects, draw over current rectangle placeholders where they exist. Fallback to rectangles if images fail to load. |
| 5 | Rounds 16-18 (Iris art) | Chad, Gina, player character revised sprites | Lower priority — Chad and Gina don't appear in Days 1-3 gameplay yet. Player sprite upgrade is nice-to-have. Load if present, don't break if missing. |

---

## 2. Known Conflicts to Watch

| Conflict | Risk | Resolution |
|----------|------|------------|
| **AP count: 5 vs 3** | R19/R20 engine uses 5 AP. Memory says 3 AP. Felix spec says 5. | **Use 5 AP.** The 3 AP reference in memory is from the old Round 9 build. 5 AP is correct for current design. |
| **Action list divergence** | R14 defined 7 actions, R19 expanded to 11 with scrolling menu, R20 maps tiles→actions. | **R20's tile→action mapping is canonical.** The action menu is a fallback accessed via ESC/door. Ensure both paths call the same `performAction()`. |
| **Email template overlap** | R15 has 48 templates. R19 added choice emails. R21 adds Days 2-3 story content. | **Deduplicate by `id` field.** R21 story emails take priority for narrative beats. R15/R19 templates fill the pool. No duplicate IDs. |
| **Jordan dialogue: system vs content** | R20 built dialogue box system + Jordan day-scaled lines. R21 wrote richer Jordan dialogue with player response choices. | **Use R20's rendering system, replace R20's placeholder lines with R21's dialogue data.** Player responses that set flags (e.g., `jordan_relationship`) need a `gameState.flags` object — create one if missing. |
| **Day cycle timing** | Memory flags a critical bug from R22 brief: "day pacing too fast (1-2 sec)." | **All phase transitions are player-initiated.** Zero auto-timers. Morning: player reads emails, presses key. Afternoon: player spends AP, manually ends day. Evening: player reads summary, presses key. Verify no `setTimeout` drives phase changes. |
| **Pixel font vs fillText** | Invariant from R15: zero calls to `ctx.fillText()` anywhere. | **Enforce.** Search the final file. Any `fillText` call is a bug. |

---

## 3. Quality Bar

**MUST PASS (ship-blocking):**
- [ ] Title screen → character select → Day 1 inbox loads without error
- [ ] All emails in morning inbox are readable and dismissable; choice emails apply effects
- [ ] Afternoon: player walks garage, interacts with objects, AP deducts correctly
- [ ] Actions grayed out / blocked when insufficient AP
- [ ] "End Day" works from both tile interaction (door) and menu
- [ ] Evening summary shows day results (customers gained, cash change, bugs)
- [ ] Day 2 starts with fresh 5 AP and new emails
- [ ] Day 3 is reachable and playable
- [ ] No softlocks (every state has a valid exit input)
- [ ] No console errors during 3-day playthrough
- [ ] Zero `ctx.fillText()` calls in final file
- [ ] Game over triggers if cash hits 0

**SHOULD PASS (nice-to-have):**
- [ ] Jordan dialogue changes between days (R21 content wired)
- [ ] Email choices set flags that affect later outcomes
- [ ] UI assets (dialogue box, HUD panel) render over rectangle fallbacks
- [ ] Player sprite uses revised art asset
- [ ] Role selection actually affects action outcomes per R20 spec

---

## 4. Deferred Work

| Item | Reason | Target Round |
|------|--------|-------------|
| Chad Thunderpitch NPC encounter | No café/conference location yet. Sprite exists, nowhere to place him. | Next location round |
| Gina barista NPC | Same — needs coffee shop location. | Next location round |
| Hiring system (Maya/Derek recruitment) | Email flags for hire exist but no hiring flow. | Next engine round |
| Fundraising pitch sequence | `fundraise` action exists but needs dedicated UI/minigame. | Future engine round |
| Days 2-3 Jordan dialogue with player response choices | Wire if time allows, but core loop ships without branching NPC dialogue. | Next story integration |
| Economy tuning | Felix notes $2K/month burn at $150K = 75 weeks runway. May be too relaxed. | Balance pass round |
| Sound/music | Not started. | Future art round |

---

## 5. Atlas — Final Notes

Build from Round 20's file as the base. It has the most complete state flow. Layer systems in order. Test each layer before adding the next.

The player should feel like they're *playing a game* after this round — not watching a tech demo. Three days of walking around a garage, reading emails, and making AP choices. That's the bar.

Ship it when a first-timer can play blind for 5 minutes without getting confused or stuck.
