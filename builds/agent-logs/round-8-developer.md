The game file has been written to `/home/gtm/saas-startup-simulator.html`. Here's what Round 8 delivers:

**Core Game Loop**
- 3 Action Points per day, spent at the Terminal
- Day cycle with $2,740/day burn rate, MRR income offsets burn
- Game over when cash hits $0

**Terminal Actions**
- **Build Product** — +5-12% progress (random), improves sales success at 25%/50% thresholds
- **Research Market** — gains Market Insight, boosts sales chance
- **Sales Outreach** — chance-based MRR gain, halved success below 25% product progress (selling vaporware penalty)

**Dialog/Menu System**
- SNES-style bottom-panel dialog box with typewriter text animation
- Arrow-cursor menu selection with blinking green cursor
- Z/Enter to confirm, X/Escape to cancel
- Input locked during typewriter animation (press to skip)

**HUD**
- Day counter, Cash (turns red below $30k), MRR, Product Progress %, AP dots, Customer count, Runway estimate

**Office & Interaction**
- 20x14 tile map with checkerboard floor, walls, windows, rug meeting area
- Terminal, desks, chairs, plants, coffee machine, whiteboard, door — all interactable
- Mysterious co-founder NPC with idle animations and "?" thought bubble
- Y-sorted rendering for proper depth
- Eased tile movement (140ms) with hold-to-repeat (220ms delay, 100ms repeat)

**Art**
- 320x224 native resolution scaled 3x with nearest-neighbor (crisp pixels)
- Full SNES-style palette from Art Director spec
- Pixel art sprites for player (4-directional) and co-founder (glasses, messy hair)