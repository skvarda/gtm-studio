Now I have full context on the ~1460-line codebase. Here's the Round 9 strategic brief:

---

## Orchestrator Brief — Round 9

### #1 Priority: The Hiring System

We have a solid core loop — walk, interact, spend AP, survive the burn. But the game's central early-game decision is missing: **"Do you hire a developer or a salesperson first?"** This round, we build the hiring system. It's the single biggest addition that transforms this from a solo-clicking exercise into a real strategy game.

### Features to Implement

**A. Hiring Menu via the Door**
The office door (tile 9, position 9,12) currently gives a dismissive one-liner. Repurpose it as the Hiring interface. When the player interacts with the door, open a menu: "Who do you want to hire?" Options: **Developer** ($1,800/day added burn), **Salesperson** ($1,500/day added burn), or Cancel. Hiring costs 1 AP. Track employees in `gameState.employees[]` with type, name, and a hire-day timestamp. Cap team at 4 hires for now (6 total including player + co-founder). Each hire increases `gameState.dayBurn` permanently.

**B. Passive Employee Effects Each Day**
Employees work automatically at end-of-day. Each **Developer** adds +3-6% product progress passively. Each **Salesperson** runs one passive sales attempt at 60% of player success rate. Show these results in the end-of-day summary: "Dev Alice shipped a bugfix (+4%). Sales Bob closed a deal (+$120 MRR)." or "Sales Bob struck out today." This makes the hire-vs-build tension real — developers are slow but compound, salespeople are risky but can generate revenue.

**C. Team Roster on the Whiteboard**
The whiteboard (tile 11, position 6,2) currently shows random flavor text. Replace it with a functional **Team Roster** display. Show each team member's name, role, and days employed. Use the existing dialog system — no new UI needed. Generate random startup-y names from a pool (e.g., "Dev: Priya", "Sales: Marcus").

### Direction to Agents

- **Game Designer**: Define the hiring cost/benefit balance. Developers at $1,800/day burn and +3-6% passive progress. Salespeople at $1,500/day burn with passive sales at 60% player rate. Ensure 4-hire cap feels natural (office space excuse). The strategic tension: hiring too early accelerates burn, hiring too late means you can't scale.
- **Writer**: Create 6-8 hiring confirmation messages with startup humor ("You found a developer on Hacker News. She negotiated equity... and free LaCroix."). Write 4-6 passive work result messages per role. Write "office is full" rejection text.
- **Programmer**: Add `gameState.employees` array, extend `endDay()` with passive employee contributions, add hiring menu to door interaction, update burn rate dynamically, add whiteboard roster display. Keep employee names in a const array and pick randomly on hire.
- **Art Director**: No new sprites needed this round — employees are represented through text and mechanics, not rendered in the office yet. Keep visual scope contained.
- **Sound Designer**: No audio this round. Stay on standby.
- **QA Tester**: Verify hiring increases burn rate correctly. Test that passive dev progress doesn't exceed 100%. Test passive sales with 0% product progress. Verify team cap of 4. Confirm game over still triggers correctly with increased burn. Check whiteboard roster updates after each hire.

### Bugs & Quality Fixes

1. **Dead code in `updatePlayer`** (lines 1173-1176): There's commented-out/broken lerp logic (`// wait this isn't right`). Clean this up — the exponential chase on lines 1178-1179 works fine, remove the dead variables.
2. **Cofounder Y-position**: The co-founder sprite renders at `(cofounder.gy + 1) * T` (line 1438), placing him one tile below his logical position. He should render at `cofounder.gy * T` to sit at his desk properly.
3. **Terminal interaction detection** (line 438): The `&&` / `||` precedence in the compound condition is ambiguous. Add explicit parentheses to prevent bugs as we add more interaction targets.

---

**Orchestrator Round 9**