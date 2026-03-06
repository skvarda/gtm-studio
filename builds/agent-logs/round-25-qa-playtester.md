## QA Playtesting Report — Round 25

**Build reviewed:** `saas-startup-simulator.html` (1744 lines, Round 9 codebase — note: header still says "Round 9" despite being the Round 24/25 candidate)

---

### 1. What Works Well

The pixel art rendering is genuinely charming — the procedural sprites, checkerboard floors, coffee machine steam, and monitor glow give it authentic SNES personality. The manual day system with 3 AP is solid design: it forces real tradeoffs without time pressure. Dialog typewriter effect, Y-sorted rendering, hold-to-repeat movement, and the interaction prompt bubbles ("Z", "HIRE") are all polished touches. The co-founder mystery arc (random "?" bubble, vague quotes) lands the humor. End-of-day summaries with employee activity reports give satisfying feedback.

### 2. Top 3 Bugs / Issues

**BUG 1 — No win condition exists.** Product can hit 100%, MRR can soar, but nothing triggers. The game just... continues until you die. There are no endgame paths (IPO, Profit Machine, etc.) despite being core to the vision. Players will grind indefinitely with no payoff.

**BUG 2 — Dialog box overflow on long text.** The dialog renderer hard-caps at 5 lines (`i < 5` at line 1231), but end-of-day summaries with 4 employees easily exceed this. Team activity reports get silently clipped — players miss critical info about what their hires accomplished.

**BUG 3 — Escape/X on terminal "Cancel" exits to play without re-checking state.** Pressing X/Escape forces `menu.cursor` to the last option and selects it (line 1598-1601). For the hiring sub-menus ("Hire a Developer? Yes/No"), the last option is "No, go back" which re-opens the hiring menu — correct. But for the root terminal menu, "Cancel" just closes. This is inconsistent and can confuse navigation.

### 3. Feel Assessment

**6/10.** Mechanically functional but emotionally flat past day 10. Every day is the same loop: walk to terminal, pick 3 actions, end day. No random events, no market shifts, no competitor pressure, no narrative beats. The office feels static — employees sit motionless at desks forever. The humor in the writing carries early, but repetition sets in fast once you've seen all 8 messages per category.

### 4. Pacing Assessment

**7/10.** Day pacing is correct — fully player-controlled, no auto-timers, compliant with director preferences. However, the *strategic* pacing stalls. With $150k and $2,740/day burn, you have ~55 days of runway. That's enough time to see every message, max product to 100%, and still feel no escalation. There's no mid-game inflection point where the dynamics shift. The game needs milestone events (product launch at 100%, first $1k MRR, etc.) to create pacing arcs.

### 5. One Improvement That Would Make the Most Difference

**Add win/loss milestone events.** At minimum: a product launch event at 100% progress, victory conditions at revenue thresholds (e.g., MRR > burn = "Profit Machine"), and 2-3 random events per 10-day stretch (competitor launches, server outage, VC call). Without these, there's no game — just a sandbox with a death timer. The mechanics are ready; they just need something to *mean* something.