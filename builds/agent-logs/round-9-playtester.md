## Playtesting Report — Round 8, SaaS Startup Simulator

### 1. What Works Well

The SNES aesthetic is genuinely charming. The title screen sets mood immediately, the typewriter dialog feels right, and the co-founder's "?" bubble is a perfect comedic touch. The writing is the standout — lines like "Q4 just says '??? → PROFIT'" land perfectly. The HUD is information-dense without feeling cluttered, and the runway countdown creates real tension. The 3-AP-per-day structure gives each day meaningful weight.

### 2. Top 3 Bugs / Anticipated Issues

**Bug 1 — Movement interpolation has dead code and feels off.** Lines 1173-1176 compute `sx`, `oldX`, `oldY` that are never used (there's even a comment "wait this isn't right"). The actual lerp on lines 1178-1179 uses an exponential chase, not a proper ease, which will feel floaty at varying framerates.

**Bug 2 — First movement requires double-tap.** On initial move, `lastDir` is -1, so the first keypress in a direction sets `lastDir` and calls `tryMove`. But if you release and press the *same* direction again, `dir === lastDir` is true, so you fall into the hold-repeat path — which demands 220ms before moving. This creates a perceptible stutter on repeated taps in the same direction.

**Bug 3 — Terminal interaction has a fragile adjacency check.** Line 438 uses `&&` without grouping: `getTile(player.gx, player.gy) === CHAIR && getTile(player.gx - 1, player.gy) === TERMINAL` binds to the outer `if` incorrectly due to operator precedence with `||`. It works by accident but only for the one chair at (3,3) facing the terminal at (2,2). Approaching the terminal from above or right may silently fail.

### 3. Feel Assessment

Movement feels slightly sluggish — the 220ms hold delay before continuous movement is too conservative for a small office. Should be ~150ms. The dialog box text at 6px monospace is functional but cramped; longer outcome messages risk running past the 5-line clamp and getting silently truncated. The game *feels* like a SNES RPG, which is exactly right.

### 4. Pacing Assessment

Early game pacing is a problem. You have ~55 days of runway with zero revenue. Each day takes ~30 seconds (walk to terminal, pick 3 actions, read dialogs, end day). That's ~27 minutes of pure terminal interaction before game over. But the decision space stays flat — the same 3 options every day with no new unlocks, no events, no interruptions. By day 10, muscle memory has replaced strategy.

### 5. One Improvement That Would Make the Most Difference

**Random events between days.** A 25% chance per day-end of a random event — "A competitor just launched," "Your co-founder accidentally deployed to prod," "A VC wants to chat" — with a forced choice. This single system would break the grind monotony, create stories, and give the co-founder narrative purpose before endgame. The infrastructure (dialog + menu) already supports it; it's just content and a dice roll in `endDay()`.