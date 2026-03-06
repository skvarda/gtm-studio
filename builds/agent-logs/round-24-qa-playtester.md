---

## QA Playtesting Report — Round 24

**Build:** `saas-startup-simulator.html` (1744 lines, Round 9 codebase — note: header still says "Round 9: The First Hire" despite being Round 24)

---

### 1. What Works Well

The tile map, Y-sorted rendering, and pixel art sprites are genuinely charming — the co-founder's idle `?` bubble, the bobbing "HIRE" sign on the door, and the terminal glow all sell the 16-bit aesthetic. The core gameplay loop (walk → interact → spend AP → end day) is clear and learnable in under a minute. Dialog queuing and the typewriter text effect are solid. The HUD packs a lot of information (cash, MRR, burn, runway, AP, team comp) without feeling cluttered. Employee passive effects at end-of-day give the team-building decisions real weight.

---

### 2. Top 3 Bugs / Anticipated Issues

1. **No win condition exists.** Product can hit 100%, MRR can grow indefinitely, but there's no victory screen, milestone check, or endgame path. The game just... continues. This is the single biggest gap — players have no goal to chase.

2. **Menu cursor infinite loop risk.** If all menu options are disabled, the `do { cursor++ } while (disabled)` loops at lines 1586-1593 will spin forever and freeze the browser. Currently no menu disables all options, but it's a latent crash waiting for a future change.

3. **Co-founder sprite renders at wrong position.** Line 1716: `drawCofounderSprite(cofounder.gx * T, (cofounder.gy + 1) * T)` adds an extra tile of Y-offset, placing the sprite one full tile below its logical grid position. He'll visually overlap furniture below him or float off his desk.

---

### 3. Feel Assessment

**6/10.** The office feels like a diorama you poke at, not a world you inhabit. There's no sound, no screen shake, no particle feedback when you close a deal or ship code. Interactions produce text boxes — functionally correct, emotionally flat. The co-founder's mystery is a great hook but goes nowhere yet. Hiring feels impactful thanks to burn-rate feedback, but the lack of any mid-game events, random encounters, or narrative beats makes days blur together fast.

---

### 4. Pacing Assessment

**Adequate but monotonous.** Manual day control is correct (no runaway timer — good). Three AP per day is the right constraint. But every day feels identical: walk to terminal, spend 3 AP, end day, repeat. No variation in day structure — no emails, no random investor calls, no employee drama, no market events. By day 10, muscle memory replaces engagement.

---

### 5. One Improvement That Would Make the Most Difference

**Add random events at day start.** A simple event system — "A competitor just launched!", "Your dev found a critical bug!", "An investor wants to chat" — with meaningful choices (spend AP to respond, ignore at a cost, gain a bonus) would break the monotony, create strategic tension, and make each day feel distinct. This is the single cheapest change with the highest impact on replayability and feel.