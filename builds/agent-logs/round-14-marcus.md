# Implementation Plan: Round AP_SYSTEM_EMAIL_INBOX

**Tech Lead:** Marcus Webb
**Developer:** Atlas
**Priority:** `action_point_system` + `email_inbox`

---

## Scope

This round implements two interconnected systems: the **Action Point system** (5 AP/day, activities cost 1-3 AP) and the **Morning Email Inbox** phase. These sit on top of `day_cycle` and `hud_display`, which must also be built as dependencies since nothing is implemented yet.

Atlas: we have zero systems implemented. This round bootstraps the core loop. You are building the foundation — canvas, font, HUD, day cycle, AP, and email. No tile movement, no NPCs, no walking around yet. This is a **systems-only** round with a minimal UI to prove it works.

---

## 1. Systems to Build

### 1.1 `canvas_rendering` (dependency, build first)

Single-file HTML. Canvas element, 640x360 native, scaled 2x via CSS (`image-rendering: pixelated`). DPR correction on context.

```js
function initCanvas() → { canvas, ctx }
```

- Create `<canvas>` element, set `width=640`, `height=360`
- CSS scales to 1280x720, `image-rendering: crisp-edges` + `pixelated`
- Get 2D context, disable image smoothing
- Return references stored in a global `ENGINE` object

### 1.2 `pixel_font_renderer` (dependency)

Custom bitmap font. Define a minimal 5x7 pixel font for A-Z, 0-9, common punctuation. Render character-by-character onto canvas.

```js
function drawText(ctx, text, x, y, color, scale=1) → void
```

- `text`: string to render (auto-uppercase)
- `x, y`: pixel position (native 640x360 coords)
- `color`: hex string from palette
- `scale`: integer multiplier (1 = 5px wide chars, 2 = 10px)
- Kerning: 1px between chars, 2px space for ` `
- **Do NOT use `ctx.fillText()` or any canvas text API.** This is a bitmap renderer.

### 1.3 `hud_display`

Top bar showing Day, Cash, MRR, Runway, AP pips.

```js
function drawHUD(ctx, gameState) → void
```

- Draws a 640x24 bar at top of screen
- Background: `PAL.hudBg` (dark blue-gray, `#1a1a2e`)
- Fields left-to-right: `DAY {n}`, `${cash}`, `MRR ${mrr}`, `RWY {months}mo`, AP pips
- AP pips: 5 small diamonds. Filled = available, hollow = spent. Color: `#f4a261` filled, `#555` hollow
- Format cash with commas. Runway = `Math.floor(cash / monthlyBurn)` or `∞` if burn is 0

### 1.4 `day_cycle`

Manual day advancement. Three phases per day: `morning`, `afternoon`, `evening`.

```js
function initDay(gameState) → void          // reset AP, set phase to morning, trigger email
function advancePhase(gameState) → string   // morning→afternoon→evening→triggers advanceDay
function advanceDay(gameState) → void       // increment day, run economyTick, call initDay
function getCurrentPhase(gameState) → string
```

- `initDay`: sets `gameState.time.phase = 'morning'`, resets AP to 5, queues email inbox
- `advancePhase`: transitions phase. Morning→afternoon is triggered when player closes inbox. Afternoon→evening triggered when AP hits 0 OR player manually ends day. Evening→next morning triggered after results screen.
- `advanceDay`: increments `current_day`, recalculates `current_era` from era definitions, calls `economyTick`
- **Player controls transitions. No auto-timers. No real-time countdown.**

### 1.5 `action_point_system` (primary target)

```js
function getAP(gameState) → number
function spendAP(gameState, cost) → boolean    // returns false if insufficient
function canAfford(gameState, cost) → boolean
function resetAP(gameState) → void             // called by initDay
function getAvailableActions(gameState) → Action[]
```

**Action definitions** — store in `ENGINE.actions` array:

| Action | AP Cost | Phase | Effect |
|--------|---------|-------|--------|
| `code_feature` | 2 | afternoon | +product progress |
| `fix_bugs` | 1 | afternoon | -bug count |
| `sales_call` | 2 | afternoon | chance to gain customer |
| `cold_email` | 1 | afternoon | small chance customer |
| `post_on_hn` | 1 | afternoon | random outcome |
| `nap` | 1 | afternoon | flavor text only |
| `end_day` | 0 | afternoon | skip remaining AP, go to evening |

Each Action:

```js
{
  id: string,
  label: string,        // display name
  cost: number,          // AP cost
  phase: 'afternoon',    // when available
  enabled: (gs) => bool, // conditional availability
  execute: (gs) => ActionResult
}
```

```js
ActionResult = { text: string, effects: { cash?, mrr?, customers?, product? } }
```

When player is in `afternoon` phase, show action menu. Player picks action → `spendAP` → `action.execute()` → show result text → if AP > 0, show menu again. If AP === 0, auto-advance to evening.

### 1.6 `email_inbox` (primary target)

Morning phase UI. Player reads 2-4 emails, then phase advances to afternoon.

```js
function generateEmails(gameState) → Email[]
function drawInbox(ctx, inbox, selectedIndex) → void
function drawEmailDetail(ctx, email) → void
function handleInboxInput(key, inboxState) → void
```

**Email structure:**

```js
{
  id: string,
  from: string,          // sender name
  subject: string,
  body: string,
  day: number,
  choices: null | [{ label: string, effect: (gs) => void }],
  read: boolean
}
```

**Email pool** — define 30+ email templates categorized by era/day range:

- **Day 1 mandatory:** "Welcome to the grind" from Jordan
- **Day 1-10 pool:** investor check-ins, spam, cold inbound, AWS bill warnings, mom asking if you're eating
- **Recurring:** MRR milestone congratulations, churn alerts, employee complaints (later eras)

**Email generation:** `generateEmails(gameState)` picks 2-4 from eligible pool (filtered by day range, era, not-yet-sent for unique emails). At least 1 email per morning. Some emails have choices (reply options) that affect gameState.

**Inbox UI:**

- Full-screen overlay (640x360), dark background
- Left panel: email list (from, subject, read/unread dot)
- Right panel: selected email body
- Arrow keys navigate list, Enter opens/closes detail, Escape or "Done" button advances to afternoon
- Must read all emails before "Done" becomes available (unread count shown)

### 1.7 `economy_tick` (dependency for day end)

```js
function economyTick(gameState) → TickResult
```

- Called at end of each day (in `advanceDay`)
- `newMRR = customers * avgRevenuePerCustomer` (start with flat $99/customer)
- `monthlyBurn = employeeSalaries + baseBurn` (base burn = $2000/day i.e. ~$8K/month for garage era)
- `cash -= dailyBurn` (burn is per-day since each day = 1 week, so `monthlyBurn / 4`)
- `runway = cash / (monthlyBurn / 4)` in days, convert to months for display
- Random churn: each customer has 3% chance to churn per tick
- Returns `{ revenue, burn, churnedCustomers, newRunway }` for evening summary screen

---

## 2. Game Loop & State Machine

```js
function gameLoop(timestamp) → void   // requestAnimationFrame loop
```

**Game states for this round:**

```
BOOT → PLAYING (morning/inbox → afternoon/actions → evening/summary) → loop
```

No title screen, no character creation this round. Game boots straight into Day 1 morning.

**Minimal `gameState` object** Atlas must initialize:

```js
const gameState = {
  phase: 'morning',        // morning | afternoon | evening
  day: 1,
  era: 'garage',
  cash: 150000,
  mrr: 0,
  customers: 0,
  monthlyBurn: 8000,
  ap: 5,
  maxAP: 5,
  employees: [],
  product: 0,
  bugs: 0,
  emailsSent: [],          // track sent unique email IDs
  inbox: [],               // current day's emails
  uiState: 'inbox',       // inbox | action_menu | action_result | evening_summary
  selectedIndex: 0         // cursor position in current UI list
}
```

---

## 3. Palette

Use this palette object. Atlas can extend but must not remove any entries:

```js
const PAL = {
  bg: '#0f0e17',
  hudBg: '#1a1a2e',
  hudText: '#e0d9c8',
  apFull: '#f4a261',
  apEmpty: '#555555',
  emailBg: '#16213e',
  emailSelected: '#0f3460',
  emailUnread: '#e94560',
  emailRead: '#888888',
  textPrimary: '#fffffe',
  textSecondary: '#a7a9be',
  textAccent: '#ff8906',
  positive: '#2cb67d',
  negative: '#e53170',
  buttonBg: '#242629',
  buttonHover: '#3a3d42'
}
```

---

## 4. What MUST NOT Change

No protected systems exist yet. Nothing is off-limits this round.

---

## 5. Updates to `protected-systems.json` After This Round

Once Atlas delivers and systems are verified working, protect:

```json
{
  "protected": [
    {
      "system": "canvas_rendering",
      "reason": "Foundation. All rendering depends on this.",
      "locked_functions": ["initCanvas"]
    },
    {
      "system": "pixel_font_renderer",
      "reason": "Custom bitmap font. Must never be replaced with fillText.",
      "locked_functions": ["drawText"]
    },
    {
      "system": "action_point_system",
      "reason": "Core gameplay mechanic. Signature changes break all actions.",
      "locked_functions": ["getAP", "spendAP", "canAfford", "resetAP"]
    }
  ]
}
```

---

## 6. Updates to `engine-spec.json` After This Round

Set status to `"implemented"` for:
- `canvas_rendering`
- `pixel_font_renderer`
- `hud_display`
- `day_cycle`
- `action_point_system`
- `email_inbox`
- `economy_tick`

Leave as `"planned"`:
- `tile_movement`
- `character_creation`
- `dialogue_system`
- `npc_interaction`
- `location_transitions`
- `asset_preloader`

---

## 7. Deliverable

Single file: `/home/gtm/saas-startup-simulator.html`

Must be playable in browser. On load: Day 1 morning, inbox appears with Jordan's welcome email, player reads emails, advances to afternoon, picks actions from menu, spends AP, sees evening summary, advances to Day 2. Loop continues until cash hits 0 (game over screen with "RUNWAY EXHAUSTED").

No external dependencies. No images required (rectangle placeholders fine). No build step.

---

## 8. Acceptance Criteria

1. HUD displays Day, Cash (comma-formatted), MRR, Runway, and 5 AP pips
2. Morning phase shows inbox with 2-4 emails, navigable with arrow keys
3. Cannot skip inbox until all emails read
4. Afternoon phase shows action menu, each action costs correct AP
5. AP pips update in HUD immediately when spent
6. When AP hits 0, auto-advance to evening
7. Evening summary shows day's revenue, burn, churn, net cash change
8. Pressing Enter/Space on evening summary advances to next day
9. Economy tick runs: cash decreases by weekly burn, customers can churn
10. Game over triggers when cash ≤ 0
11. Pixel font renderer used for ALL text (no `fillText` anywhere)
12. Runs at 60fps with no visible jank

---

Atlas, build it clean. This is the skeleton everything else hangs on.

— Marcus
