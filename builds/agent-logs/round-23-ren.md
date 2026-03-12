# Scoped Integration Plan — Round 23

**Producer:** Ren Tanaka  
**Target:** Beat 3 Core Loop  
**Priority:** Ship a playable 3-day experience

---

## 1. What Goes In (Integration Order)

### LAYER 1: ENGINE BASE (Round 20 Atlas)
- [x] **Title screen system** — Character select, role bonuses, title→game flow
- [x] **Tile-based garage map** — 20x10 grid, tile→action mapping, interaction hints
- [x] **Player movement system** — Grid-based movement with interpolation, WASD controls
- [x] **NPC framework** — Jordan positioning, basic dialogue system, interaction triggers
- [x] **Core game states** — title, character_select, play, dialog, menu, dayEnd, gameOver

### LAYER 2: GAMEPLAY SYSTEMS (Round 19 Atlas)
- [x] **5 AP system** — Daily allowance, action costs, visual pips, spend/check functions
- [x] **Email inbox with choices** — Choice emails, effect application, flag system
- [x] **Day cycle** — Manual phase transitions, morning→afternoon→evening flow
- [x] **Scrollable action menu** — 11 actions, ESC fallback, tile interaction preferred

### LAYER 3: STORY CONTENT (Round 21 Sage/Felix)
- [ ] **Days 2-3 Jordan dialogue** — Wire R21 dialogue data into R20's NPC system
- [ ] **Chad email progression** — Day 1-3 escalating emails, intelligence gathering tone
- [ ] **Economy progression flags** — Burn rate anxiety, money reality checks
- [ ] **Interactive object responses** — Laptop, whiteboard contextual text for each day

### LAYER 4: UI POLISH (Round 22 Iris)
- [ ] **Dialogue box asset** — Replace rectangle with ui_dialogue_box_v1.png
- [ ] **AP counter asset** — Replace circles with ui_action_points_full_v1.png
- [ ] **Email panel asset** — Overlay ui_email_inbox_panel_v1.png on current list
- [ ] **Jordan sprite v4** — Load npc_jordan_idle_v4.png for garage positioning

---

## 2. What Gets Cut or Deferred

| Item | Reason | Target Round |
|------|--------|-------------|
| **Chad/Gina NPC encounters** | No café/conference rooms exist yet. Sprites ready but nowhere to place them. | Location expansion |
| **Player sprite upgrades** | R17/R18 revised sprites exist but current sprite works for 3-day test. | Art polish round |
| **Hiring system integration** | Email flags exist for Maya/Derek but no hiring UI/flow implemented. | Systems expansion |
| **Advanced email effects** | Beyond basic flag-setting. Choice consequences need deeper economy integration. | Story depth round |
| **UI asset fallback handling** | If assets fail to load, current rectangles work. Ship first, polish later. | Bug fix round |
| **HUD panel redesign** | Current HUD displays all needed info. Asset is nice-to-have. | Visual polish |

---

## 3. Unresolved Cross-Department References

⚠️ **Jordan dialogue trigger mapping** — Sage wrote "walk_past", "interact", "event" triggers but R20 system uses different interaction patterns. Need to map R21 triggers → R20 NPC system calls.

⚠️ **Email choice effect flags** — R21 dialogue references `jordan_relationship` flag but R20 gameState may not have flags object. Need to verify/create gameState.flags structure.

⚠️ **Day-specific content loading** — R21 content is organized by day but unclear how R20's day advancement triggers content switches. Need to wire day number → dialogue/email pool selection.

⚠️ **Asset loading robustness** — R22 UI assets need error handling. If dialogue box image fails, fallback to current rectangle rendering without breaking game.

---

## 4. The ONE Thing This Integration MUST Accomplish

**A first-time player can start the game, play through 3 complete days (morning emails → afternoon AP spending → evening summary → next day) without getting stuck, confused, or encountering any crashes.**

This means:
- Title screen → character select → Day 1 works flawlessly
- All 5 AP can be spent on garage objects without errors
- Day transitions advance properly through Day 3
- Jordan provides day-appropriate dialogue when interacted with
- Morning email inbox loads new content each day
- Evening summary shows meaningful progress/changes
- No softlocks, no console errors, no broken state

**Success metric:** Hand game to someone who's never seen it. If they play 3 days without asking "what do I do?" or hitting a bug, we ship.

---

## Integration Notes

- **Start with R20 file as base** — Most complete engine, proven state flow
- **Layer systems carefully** — Test each layer before adding next
- **Prioritize player experience over feature completeness** — 3 working days beats 10 half-broken features
- **Zero tolerance for softlocks** — Every state must have clear exit path
- **Fallback gracefully** — Missing assets shouldn't break core loop
