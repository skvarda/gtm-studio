---

## ORCHESTRATOR BRIEF — ROUND 8

### #1 Priority: The Core Game Loop

We have a beautiful office and a walking sim. Now we need an actual *game*. Round 8's singular mission is **implementing the day cycle and first strategic decisions** — turning this from a tech demo into a playable prototype with real resource management.

### Features to Implement

**1. Day Cycle & Action System**
Implement a game state engine. Each "day" the player gets **3 action points** (AP). Interacting with the terminal opens a **decision menu** (not just a notification — a proper multi-option dialog box with cursor selection). Terminal choices: **Build Product** (advances product progress), **Research Market** (reveals customer insights), or **Sales Outreach** (chance to gain early MRR). When all AP are spent, a "End Day" prompt appears. Advancing the day updates the HUD: Day counter increments, cash decreases by daily burn ($2,740/day = $1M/year burn for 2-person team), MRR accumulates. Game over if cash hits $0.

**2. Dialog/Menu System**
Replace one-line notifications with a proper **SNES-style dialog box** — bottom of screen, bordered panel, text that types out character-by-character. For decision points, show selectable options with an arrow cursor (navigate with up/down, confirm with Z). This is the UI backbone for every future feature. The co-founder and coffee machine should also use this dialog box instead of the notification bar.

**3. Persistent Game State & Feedback**
Wire up real game state: `{ day, cash, mrr, ap, productProgress, customersCount }`. The HUD must reflect live values. After each action, show a brief outcome message in the dialog box ("You shipped a login page. Product progress: 15%." or "Cold email sent. A prospect is interested! +$200 MRR next month."). Add light randomness to outcomes so each playthrough feels different.

### Direction to Agents

- **Art Director**: Design the dialog box — dark navy panel, green (#58b868) border, cream text, pixel-style arrow cursor for menu selections. Keep the SNES aesthetic tight.
- **Sound Designer**: (deferred) No audio this round; focus is mechanics.
- **Writer**: Write 4-5 outcome messages per action type (Build, Research, Sell). Vary tone — some optimistic, some setbacks. Write a game-over message and a day-summary line. Keep it witty and startup-absurd.
- **Game Designer**: Define the numbers. Daily burn rate, action point costs, product progress milestones (v0.1 at 25%, v0.5 at 50%, v1.0 at 100%), MRR probability curves for sales actions, and the exact cash/MRR thresholds that unlock mid-game (hiring). Balance so the player survives ~60 days on angel funding if they play reasonably.
- **Developer**: Implement the state machine, day cycle, dialog/menu system, and wire game state to HUD. Refactor interactions to use the new dialog system. Keep it all in the single HTML file. The menu system is the hardest piece — get it right.
- **QA**: Verify AP tracking (can't exceed 3, can't go negative), day transitions, cash burn math, menu navigation edge cases (rapid key presses, selecting while animating), and that the game-over state actually triggers and is handled gracefully.

### Bugs & Quality Issues to Fix
- HUD values are hardcoded strings — must be driven by game state
- Co-founder collision works but the NPC has no idle variation — add an occasional head-turn or stretch animation (low priority, only if time permits)
- Rug border detection at `drawRug` uses raw array index without checking MAP bounds — could throw if rug tiles are placed at grid edges
- Notification bar positioning can overlap the action prompt bubble — the new dialog system should resolve this by consolidating UI into one channel

---

**Orchestrator Round 8**