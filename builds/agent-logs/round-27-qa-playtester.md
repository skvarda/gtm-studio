---

## QA Playtesting Report — Round 27

**Build reviewed:** `saas-startup-simulator.html` (1744 lines, still labeled "Round 9: The First Hire" internally)

### 1. What Works Well

The core loop is solid: walk to terminal, spend AP on build/research/sales, end day manually, repeat. The manual day system respects player agency — no timer pressure. The HUD is information-dense without being cluttered (day, cash, runway, MRR, AP dots all visible at a glance). Hiring via the door is intuitive, and the confirmation sub-menus prevent misclicks. Dialog text typewriter effect with skip-ahead feels appropriately retro. Y-sorted rendering is correct. The co-founder mystery NPC with his "?" bubble is a nice narrative hook. Employee name tags with color-coded dev/sales roles read clearly.

### 2. Top 3 Bugs / Anticipated Issues

1. **Escape from menu can fire unintended action.** Pressing X/Escape in a menu forces `cursor` to the last option and calls `menuSelect()` (line 1599-1600). In the terminal menu, the last option is "Cancel" — fine. But in the hiring confirmation menu, the last option is "No, go back," which then calls `openHiringMenu()` again. In menus where the last option *isn't* a safe cancel (e.g., a 2-option "Yes/No" where "No" is index 1), this *happens* to work — but it's fragile and will break the moment any menu's last option isn't the escape route.

2. **Dialog box truncates at 5 lines** (line 1231). The end-of-day summary with a full team of 4 employees can easily exceed 5 lines of wrapped text, cutting off runway warnings and the "Day X begins" message. Players will miss critical information.

3. **No win condition exists.** Product can reach 100%, MRR can grow indefinitely, but nothing triggers an ending. Players who survive will just... keep going forever. There's no IPO, no acquisition, no "you win" — the only outcome is death by cash depletion.

### 3. Feel Assessment

Feels like a functional prototype, not a game yet. Walking around the office is pleasant but purposeless — you could remove movement entirely and just present the terminal menu. The office environment is decoration, not gameplay. Interactions with the whiteboard, plants, and coffee are one-line flavor text with no mechanical impact. The co-founder is atmospheric but inert.

### 4. Pacing Assessment

Pacing is player-controlled and comfortable — the manual day system works as designed. However, each day is mechanically identical: walk to terminal, click 3 actions, end day. There's no escalation, no events, no surprises. By day 10 you've seen everything the game offers. The lack of milestones or phase transitions makes the mid-game feel flat.

### 5. One Improvement That Would Make the Most Difference

**Add random events and milestone triggers.** Even 5-8 random events (server outage, competitor launch, press coverage, investor call) injected between days would break monotony, create decision points, and make each playthrough feel different. This is the cheapest-to-implement change that would most dramatically improve replayability and the feeling that your startup exists in a living world.