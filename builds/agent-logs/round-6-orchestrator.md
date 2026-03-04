Now I have a clear picture. The current `game.html` is a "Tool Station Explorer" — a simple walk-around-and-collect-stations demo. It has **nothing** to do with the SaaS Startup Simulator vision. Round 5 failed entirely due to shell quoting errors. This round must be a hard reset toward the actual game.

---

## Orchestrator Brief — Round 6

### Status Assessment

Round 5 was a total loss — cascading shell quoting failures killed both the orchestrator and developer agents. The current `game.html` is a "Tool Station Explorer" with stations labeled CRM, Email, Analytics, etc. It's a walk-and-collect demo, not a startup simulator. We are effectively starting fresh on the actual game design.

### Priority #1: Foundation Reset — Build the Core Startup Simulation Loop

The current codebase must be replaced with the actual SaaS Startup Simulator. The single most important thing this round is delivering a **playable core loop**: the player manages a startup through time-based days, makes hiring/spending decisions, and watches cash burn against revenue. Without this economic engine, nothing else matters.

### Three Specific Deliverables This Round

1. **Day/Turn System with Cash Economy** — The game runs on days. Each day, cash decreases (burn rate) and revenue trickles in from customers. The player starts with $500K angel funding, a burn rate of ~$2K/day, and zero revenue. A HUD shows: Day count, Cash balance, Monthly burn, MRR (monthly recurring revenue), and employee count. Game over when cash hits zero.

2. **Office Map with Interactive Hiring** — Top-down 3/4 perspective SNES-style office. The player character (hoodie-wearing founder) walks around a small office. There's a desk, a computer, and the mysterious co-founder sitting in a corner. An interaction menu (press Space/Enter near objects) lets you: Hire a Developer ($8K/month) or Hire a Salesperson ($6K/month). Developers increase product quality over time. Salespeople increase customer acquisition rate. Max 2-3 hires this early stage.

3. **The Co-Founder NPC** — He sits at his desk. When you interact with him, he says cryptic one-liners ("Don't worry about it." / "I'm working on something big." / "Trust the process."). He does nothing observable. This is pure atmosphere and setup for later mystery.

### Direction to Downstream Agents

- **Developer**: Rebuild `game.html` from scratch as a single-file HTML5 game. Keep the pixel-art canvas renderer approach but implement the three deliverables above. Use 16-bit color palettes. The office should feel like a cozy SNES RPG room. All game logic in one file — no external dependencies.

- **Artist/Designer**: The office needs: wood-tone floor tiles, 2-3 desks, a whiteboard, a coffee machine, a window showing a city skyline. Character sprites: hoodie founder (4-direction walk), co-founder (seated, mysterious), developer hire (glasses + laptop), salesperson hire (suit + phone). All drawn programmatically on canvas with chunky pixel style.

- **Writer/Narrative**: Write 10 co-founder cryptic lines. Write the hire dialog trees. Write game-over text ("Your startup ran out of runway...") and milestone messages ("First customer! MRR: $49"). Keep tone light and startup-absurdist.

- **Sound/Music**: Skip this round. Focus on visuals and mechanics first.

- **QA/Testing**: Verify the economic model is balanced — $500K should last roughly 200-300 days with no revenue and no hires. First hire should meaningfully change trajectory. Game over should be reachable but avoidable with smart play.

- **Systems/Balance**: Design the progression curves. Developer productivity: each dev adds +1 product quality/day. Product quality unlocks customer tiers. Salesperson effect: each salesperson adds +0.5 customers/day (modified by product quality). Customer value: $49/month average. These numbers must make the early game tense but solvable.

### Recovery Note

Since Round 5 was a total failure, this round must deliver a **complete, playable game file**. No partial work. No placeholder systems. A player should be able to open `game.html`, walk around the office, hire their first employee, watch the days tick by, and either survive or go bankrupt. That's the minimum viable game.

---

*Signed: Orchestrator, Round 6*