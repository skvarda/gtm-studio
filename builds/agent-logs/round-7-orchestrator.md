# Orchestrator Brief — Round 7

## Status Assessment

Round 6 ended with a developer agent timeout failure. This means no code was shipped last round. We need to treat Round 7 as a recovery round: re-establish momentum, keep scope tight, and ensure we get a clean build out the door. No ambitious new systems — just solid, shippable progress.

## Priority #1: Office Interior & Player Movement

The core gameplay loop starts with the player walking around their office. If we don't have a playable character moving through a visible space, nothing else matters. This round's top priority is getting the office map rendered and the player avatar moving with arrow key input. Everything else is secondary.

## Features to Implement This Round

**1. Office Tilemap Rendering**
Build or refine the top-down 3/4 perspective office interior using a tile-based system. We need: floor tiles, walls, at least one desk, a door, and a computer terminal. Keep the palette limited — 16-bit SNES style, muted office tones. The map should be a small single-screen room (roughly 20x15 tiles). Use a JSON or array-based tilemap that the renderer reads. No scrolling needed yet.

**2. Player Avatar & Grid Movement**
The player character (hoodie-wearing tech founder) should move in four directions with arrow keys. Snap to grid movement, not free-roaming — this keeps collision simple and matches the Harvest Moon feel. Render a simple 16x16 or 32x32 sprite. Movement should feel responsive with a short step animation or tile-to-tile snap. Implement basic collision so the player can't walk through walls or furniture.

**3. Co-Founder NPC Placement**
Place the co-founder NPC in the office — sitting at a desk, idle. No interaction system yet, just a static sprite presence. He's there, he's mysterious, he's doing... something. This establishes the narrative tone early.

## Direction to Downstream Agents

- **Art/Tileset Agent**: Produce the office tileset (floor, wall, desk, chair, computer, door) and player/NPC sprites. Stick to 32x32 tiles, 16-color palette per sprite. SNES aesthetic is law.
- **Map Agent**: Define the office layout as a data structure. Keep it small and playable. Mark collision tiles.
- **Engine/Renderer Agent**: Render the tilemap to a canvas. Draw sprites on top. Handle the game loop (requestAnimationFrame).
- **Input/Player Agent**: Wire arrow keys to grid-based player movement with collision checks against the map data.
- **Narrative/NPC Agent**: Define the co-founder's desk position and idle state. No dialogue yet — just presence.
- **Build/QA Agent**: The Round 6 timeout is unacceptable. Keep the build lean. If any agent's output is incomplete, stub it rather than blocking the whole pipeline. We ship something playable this round, even if minimal.

## Bugs & Quality Issues

- **Round 6 timeout**: Likely caused by excessive scope or a hung process. All agents must keep execution time short. Prefer small, incremental outputs. If a task is taking too long, output what you have.
- **No known code bugs** since nothing shipped last round. Clean slate.

The goal is simple: a player walking around a small pixel-art office with an NPC sitting at a desk. That's a win.

---

*Orchestrator Round 7*