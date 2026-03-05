Now I have a clear picture of the project state. Let me write the strategic brief.

---

# GTM Studio — Orchestrator Brief, Round 12

## Situation Assessment

The game (`saas-startup-simulator.html`, 1744 lines) has been stuck at Round 9 state due to **permission errors in Rounds 10-11** (`EACCES: permission denied, open '/tmp/gtm-developer.txt'`). The codebase is solid — a fully playable single-file HTML/Canvas game with tile map, player movement, dialog/menu system, hiring mechanics, AP-based day cycle, and a title screen. But we've lost two rounds of progress. Time to make up ground.

## Priority #1: Mid-Game Systems

The early game (survive cash burn, first hire decision) is functional. What's completely missing is the **mid-game loop** — the strategic depth that keeps players engaged after their first few hires. We need events, milestones, and consequences.

## Features to Implement This Round

### 1. Random Event System (Highest Priority)
Add a pool of 12-15 random events that trigger at day-end with weighted probability. Examples: "Server outage! Lose 1 customer," "TechCrunch mentions you! +3 customers," "Key developer wants a raise," "Competitor launches similar feature." Each event should present a choice with tradeoffs (spend cash to fix vs. lose customers). This is the single biggest gameplay gap — without events, days feel repetitive.

### 2. Product Milestone Tiers
Product progress currently is just a number. Add 3-4 named milestones: MVP (progress 30), Beta (60), V1.0 (100), Scale (150). Each milestone should unlock a dialog celebration, increase customer conversion rates, and visually change the whiteboard. This gives the player concrete goals and a sense of progression.

### 3. Basic Sound Effects (Stretch Goal)
Add Web Audio API beeps/chirps for: menu selection, dialog advance, day end chime, cash register (new customer), and warning tone (low cash). Keep it 8-bit style — simple oscillator tones, no audio files needed. Even 5 sound effects will dramatically improve game feel.

## Direction to Downstream Agents

- **Developer**: Fix the `/tmp/` permission issue first — write output to `/home/gtm/` instead. Then implement the random event system as the core feature. Use the existing dialog/menu system to present event choices.
- **Art Director**: Design whiteboard states that reflect product milestones. Add subtle visual indicators for active events (screen flash for crises, sparkle for good news).
- **Writer**: Write 15 random event descriptions with choice text. Keep the startup humor tone — absurd but grounded. Each event needs: title, description, two choices with outcomes.
- **QA**: Regression test all existing mechanics after new code merges. Specifically verify: hiring still works at max capacity, cash can't go negative without triggering game over, day-end sequence completes cleanly.
- **Sound Designer**: Implement 5 core sound effects using Web Audio oscillators. Keep durations under 200ms for UI sounds, up to 500ms for the day-end chime.
- **Game Designer**: Balance the event probabilities and outcomes. Negative events should be survivable but punishing. Positive events should feel earned. Target: ~40% neutral, ~30% negative, ~30% positive.

## Bugs to Fix

1. **Permission error**: The build pipeline must not write to `/tmp/gtm-developer.txt` — use the home directory.
2. **Cofounder sprite Y-offset**: Line 1716-1717, the cofounder renders at `(cofounder.gy + 1) * T` which places them one tile lower than their logical position — verify this is intentional or fix the Y-sort.
3. **No save state**: If the player refreshes, all progress is lost. Add `localStorage` save/load as a quick win.

---

**Orchestrator Round 12**