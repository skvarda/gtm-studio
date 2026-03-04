# Game Mechanics Design Doc — Round 7

## 1. Core Gameplay Loop

**Move → Observe → Discover → Loop.** The player spawns at the office door, walks to their desk, and explores the room. This round's loop is purely spatial: navigate the office, notice the co-founder, internalize the space. No menus, no economy, no dialogue. Movement IS the game right now. Every tile the player steps on should feel deliberate — grid snapping at ~150ms per tile, with a brief 2-frame walk animation between positions.

## 2. Specific Mechanics to Implement

**Grid Movement**: Arrow key input queues one move per press. Player moves tile-to-tile (32x32). Holding a key triggers repeat movement after a 200ms delay, then 150ms per step. Collision checks happen BEFORE movement — reject the input, don't rubberband.

**Collision Layer**: Binary collision map matching the tilemap. Walls, desks, chairs, and the co-founder's tile are all solid. The door tile is walkable but visually distinct (future interaction point).

**Tile Interaction Hint**: When the player stands adjacent to the computer terminal, render a small bouncing arrow indicator above it. No interaction fires yet — this is a teach-without-teaching moment. Players learn "objects are interactive" before we add the interaction system.

## 3. Progression Gates

None this round. The office is fully explorable from spawn. Future rounds gate areas behind hires (need a dev to unlock the server room) and funding milestones.

## 4. Difficulty Curve

Flat. This is the tutorial space. Difficulty comes from information asymmetry later — the player doesn't know what matters yet. The co-founder's idle presence is a narrative seed, not a challenge.

## 5. Player Feedback Loops

**Movement feel**: Crisp grid snap with a subtle screen-shake of 1px on collision (walk into a wall, get a tiny bump). Reinforces boundaries without text.

**Ambient awareness**: The co-founder plays a 2-frame idle animation (typing, then pausing) on a 3-second loop. The player notices him without prompting. This is environmental storytelling — no UI needed.

## 6. One Specific Fun Moment to Engineer

**The Co-Founder Glance.** When the player walks directly adjacent to the co-founder's desk, his sprite briefly turns toward the player (1 frame, 0.5s) then turns back. No text, no prompt. Just acknowledgment. Players will screenshot this. They'll post "HE LOOKED AT ME" and debate what it means. It costs us one extra sprite frame and a proximity check. The ROI is infinite.