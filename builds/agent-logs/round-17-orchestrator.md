---

# ORCHESTRATOR BRIEF — ROUND 17

## Critical Issue: File Integrity

The Round 16 Developer output was **truncated mid-palette definition**. The code cuts off at line `a` inside the `PAL` object. This means we have no confirmed working build from Round 16. Additionally, the repo contains two stale HTML files (`game.html` at Round 7, `saas-startup-simulator.html` at Round 9) that have diverged from the latest codebase. **Round 17's number one priority is producing a complete, runnable single-file build.**

## Priority #1: Complete, Playable Build Consolidation

We must ship a single `game.html` that compiles everything through Round 16 into one working file. No truncation, no partial palette, no missing systems. If the file is approaching context limits, the Developer must modularize internally (compress helper functions, deduplicate sprite code) rather than cut content.

## Features to Implement This Round

1. **Victory States & Stats Screen** — The Round 16 art direction spec (see `docs/art-direction-round16.md`) defined victory screen tints, a stats summary box, and the co-founder stand-up animation. These were specced but likely never landed due to truncation. Implement them now: IPO/Profit/R&D/Domination endgame triggers, the tinted overlay with 60-frame fade-in, and the line-by-line stats reveal.

2. **localStorage Save/Load** — Specced in Round 12 mechanics doc but not confirmed working. Auto-save at day end (day number, cash, customers, product progress, team roster, event history, milestone flags). Title screen shows "Continue (Day X)" if save exists. This is table stakes for player retention.

3. **Co-Founder Second Monitor Easter Egg** — After Day 15, the purple monitor appears on the co-founder's desk. Player interaction triggers the meta dialog ("It's a game. Inside a game.") with rapid flicker. Small scope, high viral value per the GTM doc.

## Direction to Downstream Agents

- **Art Director**: No new spec needed this round. Enforce the Round 16 palette strictly. Flag if any color is used that isn't in `PAL`.
- **Game Designer**: Audit the victory trigger conditions. Define exact thresholds: what cash/customer/product values trigger each of the four endgame paths? Write the victory dialog text for each.
- **Developer**: This is your round. Produce one complete `game.html`. If the file exceeds 800 lines, refactor internally — no external dependencies. Every system from Rounds 1-16 must be present and functional.
- **Writer**: Draft the four victory screen title texts and the stats summary labels. Keep it punchy — 6 words max per title.
- **QA**: Once the build lands, test: movement, dialog, hiring, day progression, events, milestones, save/load cycle, and all four victory paths. File specific line-number bugs.
- **GTM/Narrative**: The co-founder easter egg is your moment. Make sure the dialog lands. Also draft one tweet-length teaser for the victory screen system.

## Bugs to Fix

1. **Truncated build** — The entire Round 16 output is non-functional. Rebuild from the last known good state (Round 9 in `saas-startup-simulator.html`) incorporating all design docs through Round 16.
2. **Two stale HTML files** — Consolidate to a single `game.html`. Delete `saas-startup-simulator.html` after merge.
3. **Employee sprite stacking** — Per art direction doc: offset by `(employeeIndex * 1)px` on X-axis to prevent overlap at adjacent desk tiles.

---

**Orchestrator Round 17**