The game file has been written to `/home/gtm/game.html`. Here's what's included:

**Office Tilemap (20x15 grid, 32x32 tiles)**
- Floor with checkerboard carpet pattern, walls with baseboard trim, doors, desks with monitors, chairs, plants, coffee machine, and a central area rug
- All drawn with the Art Director's SNES color palette in 3/4 perspective

**Player Grid Movement**
- Arrow keys (+ WASD) for tile-to-tile movement with smooth eased interpolation (~140ms per tile)
- Hold-to-repeat after 180ms delay
- 2-frame walk animation with arm swing and leg alternation
- Collision detection against walls, furniture, and the co-founder NPC

**Co-Founder NPC**
- Seated at the right desk, facing his monitor
- Subtle typing animation with bobbing
- Interactable — responds with random startup-absurdity quotes

**Interactions (Z/Space/Enter)**
- Terminal, coffee machine, door, plants, co-founder all have unique responses
- Context-sensitive prompt bubble appears above the player when facing interactable objects

**Polish**
- Y-sorted entity rendering for correct overlap
- Floating dust motes for ambient atmosphere
- HUD with game state display (Day, Cash, MRR, Team)
- Notification bar with fade-out for interaction text
- Responsive canvas scaling