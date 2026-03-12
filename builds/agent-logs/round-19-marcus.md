# Implementation Plan: Round — `ap_system_email_inbox`

**Tech Lead:** Marcus Webb
**Developer:** Atlas
**Priority:** `action_point_system` + `email_inbox`

---

## Scope

Build the Action Point system (5 AP/day, activities cost 1-3 AP) and the morning email inbox phase. These two systems together create the core gameplay rhythm: wake up → read emails → spend AP → end day.

This round does NOT build: hiring, economy tick, location transitions, or NPC dialogue trees. It builds the skeleton those systems will plug into.

---

## 1. Systems to Build

### 1A. `action_point_system`

**Engine spec ref:** `systems.action_point_system`
**Status change:** `planned` → `implemented`

#### Data

```js
const AP = {
  max: 5,
  current: 5,
  costs: {
    code:        2,  // write code / build product
    sell:        2,  // outbound sales
    recruit:     2,  // search for hires
    plan:        1,  // strategy / whiteboard
    network:     1,  // coffee shop networking
    fundraise:   3,  // pitch investors
    research:    1,  // market research
  }
};
```

#### Functions

| Signature | Description |
|---|---|
| `initAP()` | Reset `AP.current` to `AP.max`. Called at start of each afternoon phase. |
| `canSpendAP(activityKey) → boolean` | Check if `AP.current >= AP.costs[activityKey]`. |
| `spendAP(activityKey) → boolean` | If `canSpendAP`, deduct cost, return `true`. Otherwise return `false`. |
| `getAPRemaining() → number` | Returns `AP.current`. |
| `getAPMax() → number` | Returns `AP.max`. |
| `drawAPPips(ctx, x, y)` | Draw 5 diamond-shaped pips in the HUD area. Filled = remaining, hollow = spent. Use `PAL.uiGold` for filled, `PAL.uiDark` for hollow. Each pip 10px wide, 2px gap. |

#### AP Activity Menu

| Signature | Description |
|---|---|
| `openActivityMenu()` | Set `gameState = 'activityMenu'`. Show list of available activities with AP costs. Grayed out if insufficient AP. |
| `selectActivity(index)` | On confirm key: call `spendAP`, show result text via `showActivityResult(activityKey)`, return to play state. |
| `showActivityResult(activityKey)` | Display a 2-3 second result panel (e.g., "You wrote 200 lines of code. Product progress +5%"). Use dialogue box area. |
| `drawActivityMenu(ctx)` | Render the menu. Highlight selected item. Show cost in AP pips next to each option. |

**Input:** Player opens activity menu by pressing `interact` key while near the **laptop** interactable, OR via the `menu` key during afternoon phase. Arrow keys navigate, `interact` confirms, `cancel` closes.

---

### 1B. `email_inbox`

**Engine spec ref:** `systems.email_inbox`
**Status change:** `planned` → `implemented`

#### Data

```js
const EMAIL_TEMPLATES = [
  // Each template:
  {
    id: 'investor_intro',
    from: 'angel@vcfund.com',
    fromName: 'Sarah Chen',
    subject: 'Re: Your pitch deck',
    body: 'Loved your demo. Let\'s talk terms.',
    choices: [
      { text: 'Schedule meeting', effect: { flag: 'investor_interested', ap_bonus: 0 } },
      { text: 'Not ready yet', effect: { flag: null, ap_bonus: 1 } }
    ],
    day_range: [1, 30],   // eligible day range
    priority: 'high',
    once: true            // only show once ever
  },
  // ... more templates
];
```

Ship with **at least 15 email templates** across these categories:
- **Investor** (3): intro meeting, follow-up, term sheet tease
- **Customer** (3): trial signup, support ticket, feature request
- **Team** (3): Jordan's thoughts, morale check, someone wants to quit
- **Industry** (3): TechCrunch mention, competitor launch, conference invite
- **Random/Flavor** (3): spam, recruiter poaching you, your mom checking in

#### Functions

| Signature | Description |
|---|---|
| `generateDailyEmails(day) → Email[]` | Pick 2-4 emails from `EMAIL_TEMPLATES` filtered by `day_range` and `once` flag. Randomize. Return array. |
| `initEmailPhase()` | Set `gameState = 'email'`. Call `generateDailyEmails`. Set `emailIndex = 0`. |
| `drawEmailInbox(ctx)` | Left panel: list of emails (from, subject, unread dot). Right panel: selected email body + choices. SNES-style window chrome. |
| `drawEmailDetail(ctx, email)` | Render the currently selected email body text with word-wrap. Show choice buttons at bottom. |
| `selectEmailChoice(email, choiceIndex)` | Apply `effect` from the choice. Mark email as read. Advance to next email or exit phase. |
| `exitEmailPhase()` | Set `gameState = 'afternoon'`. Transition to free-roam + AP spending. |
| `markEmailRead(emailId)` | Track in `gameFlags.emailsRead[]` so `once: true` emails don't repeat. |

**Input:** Arrow up/down to select email in list. `interact` to open. Arrow up/down to pick choice. `interact` to confirm choice. After last email, auto-transition or press `interact` to continue.

**Layout:** Full-screen overlay. No walking. Think "Pokemon PC" interface.
- Inbox list on left (40% width)
- Email body on right (60% width)
- Bottom bar shows "Day X — Morning"

---

### 1C. `day_cycle` (partial — build the phase structure)

**Engine spec ref:** `systems.day_cycle`
**Status change:** `planned` → `implemented`

This is the glue. Without it, AP and email don't connect.

#### Day Phases

```
morning  →  email inbox phase (mandatory)
afternoon → free-roam, spend AP (core gameplay)
evening   →  results summary, advance day counter
```

#### Functions

| Signature | Description |
|---|---|
| `startDay(dayNumber)` | Set `time.current_day = dayNumber`. Set `currentPhase = 'morning'`. Call `initEmailPhase()`. |
| `startAfternoon()` | Set `currentPhase = 'afternoon'`. Call `initAP()`. Set `gameState = 'play'` (free-roam). |
| `startEvening()` | Set `currentPhase = 'evening'`. Show day summary panel (AP spent, revenue delta, events). |
| `advanceDay()` | Increment `time.current_day`. Call `startDay(time.current_day)`. |
| `drawDaySummary(ctx)` | Render evening summary. Press `interact` to call `advanceDay()`. |
| `endDayManually()` | Called when player chooses "End Day" from menu OR when AP hits 0. Triggers `startEvening()`. Player can also end day with AP remaining (skip). |
| `getCurrentPhase() → string` | Returns `'morning'` / `'afternoon'` / `'evening'`. |

**Critical rule:** The player controls day pacing. No auto-timers. The day advances ONLY when the player presses confirm on the evening summary screen.

---

### 1D. `hud_display` (extend)

**Engine spec ref:** `systems.hud_display`
**Status change:** `planned` → `implemented`

#### Functions

| Signature | Description |
|---|---|
| `drawHUD(ctx)` | Top bar: Day number (left), Cash (center-left), MRR (center), Runway (center-right), AP pips (right). Background: semi-transparent dark bar, 28px tall. |
| `formatCash(amount) → string` | Format as `$150K`, `$1.2M`, etc. |
| `formatRunway(months) → string` | Format as `∞` if no burn, otherwise `Xmo`. |

HUD is visible during `afternoon` phase (free-roam). Hidden during email and evening phases (those are full-screen overlays).

---

## 2. What MUST NOT Change

No systems are currently in `protected-systems.json`. There are no protected systems to worry about.

However, Atlas must preserve these **engine-spec contracts**:
- `input_map` key bindings — do not change the mapping
- `rendering` settings — 640x360 native, 2x scale, 32px tiles
- `player.action_points_per_day: 5` in game state

---

## 3. New Protections to Add After This Round

Once Atlas delivers and the round is verified, add to `protected-systems.json`:

```json
{
  "protected": [
    {
      "system": "action_point_system",
      "functions": ["initAP", "canSpendAP", "spendAP", "getAPRemaining", "drawAPPips"],
      "reason": "Core gameplay loop. AP costs and max may be tuned but function signatures are locked."
    },
    {
      "system": "day_cycle",
      "functions": ["startDay", "startAfternoon", "startEvening", "advanceDay", "getCurrentPhase"],
      "reason": "Phase flow is the game's backbone. Do not change phase order or add auto-timers."
    },
    {
      "system": "email_inbox",
      "functions": ["generateDailyEmails", "initEmailPhase", "exitEmailPhase"],
      "reason": "Email phase entry/exit points. Template data can expand freely."
    }
  ]
}
```

---

## 4. Engine Spec Updates

After implementation, update `engine-spec.json`:

| System | Field | Old | New |
|---|---|---|---|
| `action_point_system` | `status` | `planned` | `implemented` |
| `action_point_system` | `protected` | `false` | `true` |
| `email_inbox` | `status` | `planned` | `implemented` |
| `email_inbox` | `protected` | `false` | `true` |
| `day_cycle` | `status` | `planned` | `implemented` |
| `day_cycle` | `protected` | `false` | `true` |
| `hud_display` | `status` | `planned` | `implemented` |
| `hud_display` | `protected` | `false` | `false` |

Also update `game-state.json`:
- Move `action_point_system`, `email_inbox`, `day_cycle`, `hud_display` from `systems_planned` to `systems_implemented`

---

## 5. Implementation Order

Atlas must build in this order (dependencies flow downward):

1. **`hud_display`** — standalone, no deps. Get the top bar rendering.
2. **`day_cycle`** — phase state machine. Stub the phase transitions.
3. **`action_point_system`** — depends on HUD for pips, day_cycle for reset.
4. **`email_inbox`** — depends on day_cycle for morning phase trigger. Build all 15 templates.
5. **Wire it together** — `startDay()` → email → afternoon → AP menu → evening → next day.

---

## 6. Acceptance Criteria

The round is **done** when:

- [ ] Game starts on Day 1 morning with 2-4 emails displayed
- [ ] Player can read each email and pick a choice
- [ ] After emails, transitions to afternoon (free-roam with AP)
- [ ] HUD shows Day, Cash ($150K), MRR ($0), Runway (∞), AP (5 filled pips)
- [ ] Player can open activity menu, see costs, select an activity
- [ ] AP pips decrement correctly after spending
- [ ] Activities with cost > remaining AP are grayed out
- [ ] Player can end day manually (even with AP remaining)
- [ ] Evening summary shows what happened
- [ ] Pressing confirm on summary starts Day 2 with fresh emails and full AP
- [ ] No auto-timers. Days only advance on player input.
- [ ] Runs in a single HTML file, no external dependencies

---

## 7. Palette Reference

Use these for UI elements:

```js
const PAL = {
  uiGold:    '#F2C94C',  // AP pips filled, highlights
  uiDark:    '#2D2D3A',  // AP pips empty, backgrounds
  uiBg:      '#1A1A2E',  // panel backgrounds
  uiBorder:  '#4A4A5A',  // window chrome borders
  textLight: '#E8E8E8',  // primary text
  textDim:   '#8888AA',  // secondary text, grayed options
  emailNew:  '#4FC3F7',  // unread email dot
  emailRead: '#555566',  // read email text
  hudBg:     'rgba(26, 26, 46, 0.85)',  // HUD bar background
  morning:   '#FFD54F',  // morning phase accent
  afternoon: '#81C784',  // afternoon phase accent
  evening:   '#7986CB',  // evening phase accent
};
```

---

That's the plan. Atlas: build it in order, ship it in one HTML file, and don't add any auto-timers. The player owns the clock.

— Marcus
