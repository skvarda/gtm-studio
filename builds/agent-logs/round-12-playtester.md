# Playtesting Report — Round 12

## 1. What Works Well

The core loop of balancing cash burn against hiring decisions remains compelling twelve rounds in. The tension between "build product" and "chase revenue" creates genuine strategic anxiety that mirrors real startup life. The Harvest Moon pacing influence — where each round feels like a season — gives weight to decisions without dragging. The mysterious co-founder NPC continues to be an effective narrative hook; I keep glancing at his sprite in the corner wondering when he'll do something.

## 2. Top 3 Bugs / Anticipated Issues

**Bug #1 — EACCES on developer hire (CRITICAL).** Attempting to interact with the developer resource triggered a permission denied error on `/tmp/gtm-developer.txt`. This is a hard crash on a core gameplay action. Players literally cannot hire their first dev. This is a progression blocker that kills the run.

**Bug #2 — File path dependency on `/tmp/`.** The game appears to write state files to `/tmp/` which is environment-dependent and permission-volatile. On shared systems or restrictive setups, this will fail silently or loudly. State should live in a user-writable game directory, not a system temp folder.

**Bug #3 — No error recovery.** When the permission error fires, there's no fallback, no retry, no graceful message. The round just dies. A startup sim about surviving failure should itself survive failure gracefully.

## 3. Feel Assessment

**Broken.** Round 12 should be mid-game momentum — team growing, features shipping, first real customers. Instead I hit a wall trying to do the most fundamental action in the game. The feel went from "strategic anticipation" to "staring at a stack trace." The vibe is less "16-bit charm" and more "production incident."

## 4. Pacing Assessment

**Stalled.** Can't assess mid-game pacing when the game won't let me take actions. Twelve rounds in with no developer hired suggests either the early game is too slow or I've been misallocating — but I can't tell because the system broke before I could test the path.

## 5. One Improvement That Would Make the Most Difference

**Fix file I/O to use a reliable, user-scoped directory with proper error handling.** Nothing else matters until the game can persist state without crashing. Wrap every file operation in a fallback that creates directories as needed and presents an in-game error ("Your developer ghosted you...") rather than an OS-level exception. Ship this before tuning anything else.