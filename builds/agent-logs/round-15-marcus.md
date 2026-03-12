---

# Implementation Plan: AP_SYSTEM_EMAIL_INBOX

**Round Type:** ENGINE  
**Author:** Marcus Webb, Tech Lead  
**Target File:** `/home/gtm/saas-startup-simulator.html`  
**Baseline:** 1744 lines, prior build exists with all core systems functional

---

## 0. Situation Assessment

The prior build implemented `action_point_system`, `email_inbox`, `day_cycle`, `economy_tick`, `hud_display`, `canvas_rendering`, and `pixel_font_renderer` in a working state. This round **formalizes, hardens, and completes** these systems. Atlas should treat the existing code as the foundation — refactor and fix, don't rewrite from scratch.

---

## 1. Systems to Build or Modify

### 1A. `canvas_rendering` — STATUS: HARDEN

**Current state:** Working at lines ~50-100. `initCanvas()` sets up 640x360 native, 2x CSS scale, DPR correction.

**Required changes:** None. Verify it works. Mark as implemented.

**Function signatures (do not alter):**
```js
function initCanvas() → void  // sets up canvas, ctx, scaling
```

---

### 1B. `pixel_font_renderer` — STATUS: HARDEN

**Current state:** Working at lines ~100-280. `FONT_DATA`, `drawText()`, `measureText()`.

**Required changes:** None. This is the single text rendering system. **Zero calls to `ctx.fillText()` anywhere in the file.** Atlas must verify this invariant holds after all changes.

**Function signatures (do not alter):**
```js
function drawText(ctx, text, x, y, color, scale) → void
function measureText(text, scale) → number
```

---

### 1C. `hud_display` — STATUS: MODIFY

**Current state:** Working at lines ~370-470. Shows Day, Phase, Cash, MRR, Runway, AP diamonds, Era.

**Required changes:**
1. AP diamond pips must visually distinguish **spent** vs **available** (filled diamond = available, hollow = spent). Verify this works correctly when AP changes mid-afternoon.
2. Runway display: show "∞" when burn ≤ 0 (no expenses). Show whole number of weeks, not months. Label it "Runway: Xw".
3. Cash display: handle negative cash correctly — show in `PAL.red` when cash < 0.

**Function signatures (do not alter):**
```js
function drawHUD(ctx) → void
function formatCash(amount) → string  // returns "$X,XXX" or "-$X,XXX"
```

---

### 1D. `day_cycle` — STATUS: MODIFY

**Current state:** Working at lines ~470-550. Three phases: morning → afternoon → evening.

**Required changes:**
1. Phase transitions must be **player-controlled only**. No timers, no auto-advance. Player presses a key/button to move between phases.
2. Morning phase: player must read all emails before they can advance to afternoon. Gate the transition.
3. Evening phase: show day summary (customers gained, cash change, bugs, notable events), then player presses key to advance to next day.
4. `advanceDay()` must call `resetAP()`, `generateEmails(day)`, and `economyTick()` in that order.

**Function signatures:**
```js
function advancePhase() → void          // morning→afternoon→evening→next morning
function advanceDay() → void            // increment day, reset systems, generate content
function getEra(day) → string           // "garage"|"push"|"machine"|"empire"
function getDayPhase() → string         // "morning"|"afternoon"|"evening"
```

---

### 1E. `action_point_system` — STATUS: MODIFY (PRIMARY TARGET)

**Current state:** Working at lines ~550-650. 5 AP/day, 7 actions defined in `ACTIONS` object.

**Required changes:**

1. **Action definitions** — finalize these 7 actions with exact costs and effects:

| Action ID | Label | AP Cost | Effect | Flavor Text |
|-----------|-------|---------|--------|-------------|
| `code_feature` | "Code a Feature" | 2 | product += 1, bugs += rand(0,1) | "You hammer out code while drinking cold coffee." |
| `fix_bugs` | "Fix Bugs" | 1 | bugs -= rand(1,3), min 0 | "Squash. Squash. Squash." |
| `sales_call` | "Sales Call" | 2 | 40% chance: customers += 1 | "You pitch to a skeptical VP of Engineering." |
| `cold_email` | "Send Cold Emails" | 1 | 25% chance: customers += 1 | "Subject: Quick question..." |
| `post_on_hn` | "Post on HN" | 1 | 15% chance: customers += rand(1,5) | "You submit to Show HN and refresh obsessively." |
| `nap` | "Take a Nap" | 1 | morale += 1 (future use, track it now) | "Power nap on the couch. Jordan stares." |
| `end_day` | "End Day Early" | 0 | advance to evening phase immediately | "You call it a day." |

2. **Action results feedback**: After performing an action, show a **result toast** on screen for 2 seconds (or until next input). Use the flavor text + outcome. Example: `"You pitch to a skeptical VP of Engineering. They signed up!"` or `"...They passed."`

3. **Action gating**: Actions unavailable (not enough AP) should render grayed out. Player cannot select them.

4. **`end_day` action**: Always available (0 AP cost). Skips remaining AP and goes to evening.

**Function signatures:**
```js
const ACTIONS = { ... }                         // action definitions object
function getAP() → number                       // current AP remaining
function spendAP(cost) → boolean                // deduct AP, return false if insufficient
function canAfford(actionId) → boolean           // check if player has enough AP
function resetAP() → void                        // reset to 5 at day start
function performAction(actionId) → object        // execute action, return {success, message}
function getAvailableActions() → array            // return actions player can currently afford
```

---

### 1F. `email_inbox` — STATUS: MODIFY (PRIMARY TARGET)

**Current state:** Working at lines ~650-900. 30+ templates, list+detail UI.

**Required changes:**

1. **Email structure** — every email must have:
```js
{
  id: string,           // unique template ID
  from: string,         // sender name
  subject: string,      // subject line
  body: string,         // email body (max 4 lines at current font size)
  day_range: [min, max], // which days this can appear
  unique: boolean,       // if true, only shows once ever
  category: string       // "story"|"spam"|"investor"|"customer"|"team"
}
```

2. **Day 1 mandatory email**: From Jordan. Subject: "we're doing this". Body establishes the premise. This email ALWAYS appears on Day 1 as the first email. Non-negotiable.

3. **Email pool**: Minimum **40 unique templates** covering days 1-60 (garage era). Distribution:
   - 8 story emails (Jordan, key plot beats)
   - 8 customer emails (feedback, complaints, praise)
   - 8 spam/funny emails (VC spam, LinkedIn, newsletters)
   - 8 investor emails (interest, rejections, term sheets teasers)
   - 8 team/ops emails (server alerts, tool signups, co-working space)

4. **Email generation**: `generateEmails(day)` picks 2-4 emails per day. Prioritize unread unique/story emails for current day range. Fill remaining slots from non-unique pool. Never repeat a unique email.

5. **Email UI**:
   - Left panel: email list (from + subject, truncated). Unread = white text, read = gray.
   - Right panel: selected email detail (from, subject, body).
   - Navigation: Up/Down arrows to select email in list. Enter/Space to read. After all read, show "Press [E] to start your day" prompt.
   - Must render entirely with `drawText()`. No HTML overlays. No `fillText()`.

6. **Read tracking**: `gameState.emailsRead` array tracks IDs of all unique emails ever shown. Persists across days (for unique dedup).

**Function signatures:**
```js
const EMAIL_TEMPLATES = [ ... ]                  // array of email template objects
function generateEmails(day) → array             // pick 2-4 emails for this day
function markEmailRead(index) → void             // mark email at index as read
function allEmailsRead() → boolean               // true if all today's emails read
function drawEmailInbox(ctx) → void              // render the email UI
```

---

### 1G. `economy_tick` — STATUS: MODIFY

**Current state:** Working at lines ~900-950.

**Required changes:**
1. Each day = 1 week. Monthly values must be divided by ~4.3 for weekly tick.
2. **Base burn**: $2,000/week (covers co-founder living costs, tools, hosting).
3. **Revenue**: Each customer pays average $99/month = ~$23/week.
4. **Churn**: 3% of customers lost per week (round down, minimum 0). Only fire churn if customers > 5 (too random at small numbers).
5. **Runway calculation**: `cash / weekly_burn` if burn > revenue. Show as weeks. "∞" if revenue ≥ burn.
6. **Game over**: When cash ≤ 0 AND runway = 0, trigger game over state.
7. **Bug penalty**: If bugs > 10, churn doubles. If bugs > 20, no new customers from sales actions.

**Function signatures:**
```js
function economyTick() → object    // returns {revenue, burn, churn, runway, cashChange}
```

---

## 2. What MUST NOT Change

**Protected systems:** Currently `protected: []` — no systems are protected yet. However, Atlas must treat these as **soft-protected** during this round (do not remove or rename, only modify per instructions above):

- `initCanvas()` — signature and DPR correction logic
- `drawText()` / `measureText()` — the pixel font renderer
- `PAL` — the color palette object
- `FONT_DATA` — the bitmap font definitions

**Absolute rule:** Zero calls to `ctx.fillText()` anywhere in the output file. All text rendering goes through `drawText()`.

---

## 3. New Protections to Add (post-build)

After Atlas delivers and systems are verified working, add to `protected-systems.json`:

```json
{
  "protected": [
    {
      "system": "canvas_rendering",
      "functions": ["initCanvas"],
      "reason": "Core rendering pipeline. Stable."
    },
    {
      "system": "pixel_font_renderer", 
      "functions": ["drawText", "measureText"],
      "reason": "Custom bitmap font. Never replace with fillText.",
      "invariant": "Zero ctx.fillText() calls in entire file"
    }
  ]
}
```

Do NOT protect `action_point_system`, `email_inbox`, `day_cycle`, `economy_tick`, or `hud_display` yet — these will need balance tuning in future rounds.

---

## 4. Engine Spec Updates

After successful build, update `engine-spec.json` system statuses:

| System | Old Status | New Status |
|--------|-----------|------------|
| `canvas_rendering` | planned | **implemented** |
| `pixel_font_renderer` | planned | **implemented** |
| `hud_display` | planned | **implemented** |
| `day_cycle` | planned | **implemented** |
| `action_point_system` | planned | **implemented** |
| `email_inbox` | planned | **implemented** |
| `economy_tick` | planned | **implemented** |

Set `protected: true` on `canvas_rendering` and `pixel_font_renderer` only.

---

## 5. Game State Updates

After successful build, update `game-state.json`:

```json
{
  "systems_implemented": [
    "canvas_rendering",
    "pixel_font_renderer", 
    "hud_display",
    "day_cycle",
    "action_point_system",
    "email_inbox",
    "economy_tick"
  ],
  "demo_progress": {
    "beats_complete": ["character_creation"],
    "current_target_beat": "apartment_day1"
  }
}
```

---

## 6. Build Acceptance Criteria

Atlas, the build is **accepted** when:

1. Game boots in browser. No console errors on load.
2. Day 1 morning: Jordan's email appears. Player can read it. Cannot advance until all emails read.
3. Day 1 afternoon: All 7 actions visible. AP diamonds show 5 filled. Selecting "Code a Feature" costs 2 AP, diamonds update to 3 filled + 2 hollow. Result toast appears.
4. Actions gray out when unaffordable. "End Day Early" always available.
5. Evening phase: summary shows cash change, customers, bugs. Player presses key to advance.
6. Day 2: AP resets to 5. New emails generated. Economy tick fires (cash decreases by ~$2K burn).
7. Play through 10 days without crash. Emails don't repeat unique ones. Cash trends downward without customers.
8. `grep -c "fillText" saas-startup-simulator.html` returns **0**.
9. File remains a single self-contained HTML file. No external dependencies.

---

## 7. What NOT to Build This Round

- No tile movement, no walking, no rooms, no sprites
- No NPC interaction or dialogue system
- No title screen or character creation screen (boot straight to Day 1)
- No save/load
- No sound
- No choice-based emails (structure supports it, but don't implement choices yet)
- No hiring system (no "hire" action yet)

Stay focused. AP system + email inbox + economy + day cycle. That's the round.

— Marcus
