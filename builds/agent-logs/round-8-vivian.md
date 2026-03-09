# Integration Directive — Round 8

**Director:** Vivian Cross
**Round Type:** Integration
**Priority:** `beats_1_2` — Character Creation + Apartment Day 1, playable

---

## The ONE Thing This Integration MUST Accomplish

A human player can open the HTML file, see a title screen, enter their name, pick a role through Jordan's dialogue (not abstract menu cards), wake up in the apartment, walk around, talk to Jordan, check the laptop, read a first email, and end Day 1. **One continuous playable flow from title to Day 2 morning.** If it doesn't flow start-to-finish without crashes, it doesn't ship.

---

## 1. Merge Priority Order

1. **Engine (Round 4 / Atlas build)** — This is the foundation. The Round 4 build has rooms, NPCs, economy, email, activities, day cycle. Start here. File: `/home/gtm/saas-quest.html` (or wherever the latest Atlas build lives).

2. **Story content (Rounds 5–6 / Sage)** — Wire Jordan's Day 1 dialogue into the existing NPC interaction system. Specifically:
   - `jordan_morning_greeting` → first interaction with Jordan in apartment
   - `jordan_runway_response` → follow-up
   - `jordan_role_question` + 3 role variants → replaces the abstract card-based character creation screen
   - `jordan_chad_email_reaction` → triggered after player reads Chad's email
   - Chad's "fellow founder" email → add to email inbox system, gated to Day 1

3. **Design spec (Round 6 / Felix)** — Use as reference for role stat values and AP modifiers, but do NOT over-engineer. Wire the three roles (Seller/Dev/Marketer) with their stat bonuses. AP cost modifiers are **deferred** — flag them but don't implement until activities actually use them.

4. **Art assets (Round 7 / Iris)** — Integrate the 5 generated PNG assets if they exist on disk. If asset files are missing or broken, fall back to the existing programmatic sprites (fillRect drawings). The game must never fail to render because an image didn't load.

---

## 2. Known Conflicts to Watch

| Conflict | Resolution |
|---|---|
| **Two character creation flows** — Engine has card-based role select; Story has dialogue-based role select through Jordan | **Story wins.** Replace the standalone `characterCreation` screen state with Jordan's dialogue flow inside the apartment. Player picks role by talking to Jordan, not from a menu. Keep name entry screen as-is (it works). |
| **Role names mismatch** — Engine uses Seller/Dev/Marketer; Felix uses "Sales Leader"/"Technical Founder"/"Growth Hacker" display names | Use Felix's display names in dialogue, engine's internal keys (`seller`/`dev`/`marketer`) in gameState. |
| **Stat schema conflict** — Engine has `{sales, dev, marketing, hustle, focus}`; Felix has `{charisma, technical, creativity}` | **Engine wins.** Keep the 5-stat system already implemented. Map Felix's intent: Seller gets high sales+hustle, Dev gets high dev+focus, Marketer gets high marketing+hustle. |
| **Art assets vs programmatic sprites** — Round 7 produced PNGs at 32x48 characters / 16x16 tiles; engine draws everything with fillRect | Load PNGs as `Image` objects with fallback. If image loads, draw it. If not, use existing programmatic drawing. Wrap in a simple asset loader with `onload`/`onerror`. |
| **Day 1 is not a normal day** — Felix spec says Day 1 is character creation + world intro, not a full day cycle | Correct. Day 1 should NOT tick AP or show activity menus. Player explores apartment, talks to Jordan (picks role), checks laptop (reads emails), then ends day. Day 2 is when real gameplay starts. |

---

## 3. Quality Bar

**Must pass all of these to ship:**

- [ ] Title screen → name entry → apartment spawn (no card-based role screen)
- [ ] Jordan dialogue triggers on first interaction, includes role choice
- [ ] Role selection persists to `gameState.player.role` and sets stats
- [ ] Apartment is walkable, furniture is interactable, no collision bugs
- [ ] Laptop shows email inbox with at least 1 Day 1 email (Chad intro or David Chen welcome)
- [ ] Player can end Day 1 via laptop menu; Day 2 splash appears
- [ ] No console errors, no freezes, no black screens
- [ ] Works in Chrome at 1280x720 display size
- [ ] Entire flow completable in under 3 minutes (this is a checkpoint, not a grind)

**Nice-to-have but not blocking:**

- PNG sprite assets rendering
- Jordan's post-role-selection ambient dialogue variants
- Gazette email content
- Sound (not even attempted yet — fully deferred)

---

## 4. Deferred Work

| Item | Carry to |
|---|---|
| AP cost modifiers per role | Next engine round (when activities get rebalanced) |
| Player response choices in dialogue (branching) | Next story integration (current dialogue system is linear; adding choice UI is real work) |
| Jordan relationship tracking | Future — `jordan_relationship` effects in Sage's content are noted but not wired |
| Remaining NPCs on Main Street (Maya, Derek, Gina, Chad) | Day 2+ content rounds |
| Sound/music | Dedicated audio round |
| Gazette / newsletter content | Day 2 email batch |
| `walk_past` dialogue triggers | Requires proximity detection system — defer |

---

## 5. Notes to Atlas

The flow after this integration should be:

```
Title Screen → [PRESS START]
  → Name Entry → [type name, ENTER]
    → Apartment (Day 1) → [walk to Jordan, press E]
      → Jordan greeting dialogue (linear for now)
        → Jordan asks role → [player picks Seller/Dev/Marketer]
          → Role confirmed, stats set
            → Free exploration: walk around, check laptop, read email
              → Laptop menu: END DAY
                → Day 1 report → Day 2 begins
```

Kill the standalone `characterCreation` screen state entirely. The role selection now lives inside Jordan's dialogue tree. Name entry stays as its own screen — it works and it's clean.

For the dialogue-based role choice: if the current dialogue system only supports linear text advancement, add a minimal choice UI — show 3 options, arrow keys to select, Enter to confirm. Keep it simple. A bordered box with highlighted text is enough. Don't build a full branching dialogue engine.

**Ship target: playable from title to Day 2 in one sitting. That's the checkpoint.**
