# Scope & Prioritization — Round 6

## BUILD (Top 3)

**1. Day/Cash Economy + HUD**
Core simulation loop: 1 second = 1 day, $500K starting cash, $2K/day base burn, MRR from customers at $49/mo avg. HUD displays day count, cash, burn rate, MRR, headcount. Game over at $0.
*Complexity: Medium.* Math is simple; HUD rendering and game-over flow need polish.

**2. Office Map + Player Movement**
Single-room top-down office with tile-based floor, 3-4 furniture objects, wall boundaries. Hoodie founder with 4-direction sprite walking. Collision detection against furniture. Interaction prompt when near objects.
*Complexity: Medium.* Tile map, sprite animation, collision — standard but takes lines of code.

**3. Hiring System + Co-Founder NPC**
Interact with hiring board to hire dev ($8K/mo, +1 quality/day) or salesperson ($6K/mo, +0.5 customers/day modified by quality). Cap at 3 hires. Co-founder sits at desk, delivers random cryptic line on interact. Hired employees appear at desks.
*Complexity: Medium-Low.* Menu UI + state changes + NPC dialog.

## CUT / DEFER

- **Sound/music** — explicitly deferred per brief
- **Multiple rooms/maps** — one room only
- **Save/load system** — not this round
- **Customer segments/tiers** — flat $49 ARPU, no tiers
- **Animated co-founder mystery events** — just dialog
- **Title screen, settings, pause menu** — game starts immediately

## Non-Negotiables

- Playable end-to-end: walk, hire, survive or go bankrupt
- Economy must be balanced: ~250 days runway solo, winnable with smart hires
- Single self-contained `game.html`, zero dependencies

## Known Risks

1. **Shell quoting** — Round 5 died here. Must write file via tool, not echo/heredoc in bash.
2. **Scope creep in art** — pixel sprites can eat hours. Use minimal 8x8 or 16x16 blocks, no perfectionism.
3. **Balance tuning** — if numbers are wrong, game is trivially easy or impossible. Hardcode but keep constants grouped for quick adjustment.