# Art Direction - Round 23: Coffee Shop Sprites

## Vision for This Round
Creating the **Cozy Corner Coffee** location - the social hub where key NPCs gather and pivotal conversations happen. This needs to feel like the warm, inviting third space every startup founder needs for "coffee meetings" and chance encounters.

## Coffee Shop Aesthetic Goals
- **Atmosphere**: Warm amber lighting, worn wood surfaces, lived-in comfort
- **Layout**: Top-down 3/4 view with clear interaction zones (counter, booths, standing areas)  
- **NPCs**: Gina as the wise barista archetype, angel investor as approachable-but-serious
- **Props**: Espresso machine, pastry case, laptop-friendly seating, bulletin board with startup flyers

## Key Design Requirements
- **Readability**: Counter and booth boundaries must be clear for pathfinding
- **Scale**: Objects sized for 16x16 tile grid, larger items on 32x32
- **Warmth**: Heavy use of amber palette, soft edge lighting on furniture
- **Character Integration**: NPCs should feel naturally placed in this environment

## Priority Assets This Round
1. **Gina Sprite**: All-knowing barista, maternal energy, ethnic ambiguity, coffee-stained apron
2. **Coffee Counter**: L-shaped or straight, with espresso machine, registers, pastry display
3. **Booth Seating**: 2-person intimate seating, laptop-friendly tables
4. **Angel Investor**: Professional but warm, could be any gender, tablet/briefcase
5. **Floor Tile**: Worn hardwood or industrial concrete with coffee shop warmth

<!-- ASSET_REQUESTS_START -->
[
  {
    "asset_id": "npc_gina_idle",
    "prompt": "16-bit pixel art character sprite, SNES Stardew Valley style, wise all-knowing barista woman, coffee-stained apron over casual clothes, warm smile, ethnic ambiguity, shoulder-length hair, holding coffee mug, amber and teal palette with warm browns, transparent background, clean linework, retro nostalgic feel",
    "subfolder": "sprites",
    "target_width": 32,
    "target_height": 48,
    "force_regenerate": false,
    "style_notes": "maternal energy and wisdom must read clearly, apron and coffee mug as key identifiers"
  },
  {
    "asset_id": "tile_coffee_counter",
    "prompt": "16-bit pixel art coffee shop counter tile, SNES style, top-down 3/4 view, wooden counter with espresso machine and register, warm amber lighting, teal and brown accents, worn wood texture, transparent background, clean readable edges for tile placement",
    "subfolder": "tiles",
    "target_width": 32,
    "target_height": 32,
    "force_regenerate": false,
    "style_notes": "counter edge must be clearly defined for collision, espresso machine recognizable at small size"
  },
  {
    "asset_id": "tile_coffee_booth",
    "prompt": "16-bit pixel art coffee shop booth seating, SNES style, top-down 3/4 view, cozy 2-person booth with small table, warm amber wood and teal cushions, laptop-friendly surface, transparent background, clean readable silhouette",
    "subfolder": "tiles", 
    "target_width": 32,
    "target_height": 32,
    "force_regenerate": false,
    "style_notes": "table surface and seating areas must be visually distinct, intimate but business-appropriate"
  },
  {
    "asset_id": "npc_angel_investor_idle",
    "prompt": "16-bit pixel art character sprite, SNES style, professional angel investor, gender neutral business casual, tablet or small briefcase, approachable but serious expression, amber and teal palette with navy/gray accents, transparent background, clean linework, confident posture",
    "subfolder": "sprites",
    "target_width": 32, 
    "target_height": 48,
    "force_regenerate": false,
    "style_notes": "professional authority must read clearly, tablet/briefcase as key business identifier"
  },
  {
    "asset_id": "tile_coffee_floor",
    "prompt": "16-bit pixel art coffee shop floor tile, SNES style, worn hardwood planks with warm amber tones, subtle texture and wood grain, seamlessly tileable, top-down view, cozy coffee shop atmosphere, transparent background if needed",
    "subfolder": "tiles",
    "target_width": 16,
    "target_height": 16, 
    "force_regenerate": false,
    "style_notes": "must tile seamlessly without visible seams, warm wood grain readable at 16x16"
  }
]
<!-- ASSET_REQUESTS_END -->
