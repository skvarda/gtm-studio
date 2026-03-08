# Art Direction - Round 1: Core Foundation

## Vision Alignment
This round establishes the visual foundation for our 16-bit SaaS startup RPG. We're creating the essential sprites and tiles that will define the game's aesthetic DNA. Think **Chrono Trigger's intimate indoor spaces** meets **Stardew Valley's cozy pixel warmth** with a distinctly modern tech startup vibe.

## Priority Focus: Essential Game Elements
1. **Jordan's Character Presence** - Our mysterious co-founder needs their idle sprite to establish their enigmatic personality through pixel art body language
2. **Apartment Foundation** - Basic tileset to render the starting location where the player and Jordan begin their journey  
3. **Tech Workspace Objects** - Laptop and essential furniture to create authentic startup atmosphere
4. **Player Character** - The hoodie-wearing, coffee-fueled protagonist we'll be controlling

## Style Direction for This Round
- **Proportions**: 2.5 head-heights for characters, emphasizing readability over realism
- **Lighting**: Warm ambient lighting suggesting late-night coding sessions and startup hustle
- **Texture**: Visible pixel texture without harsh black outlines - let the colors define the forms
- **Personality**: Even static sprites should hint at character through posture and expression

## Technical Considerations
- 32x48 characters provide enough detail for personality while remaining crisp at 2x scale
- 16x16 tiles for modular apartment construction
- Amber accents on interactive tech objects to guide player attention
- Teal shadows for depth without competing with warm lighting

<!-- ASSET_REQUESTS_START -->
[
  {
    "asset_id": "npc_jordan_idle",
    "prompt": "16-bit pixel art character sprite, SNES Stardew Valley style, mysterious co-founder with glasses and messy brown hair, wearing casual hoodie, crossed arms pose suggesting thoughtful contemplation, warm amber and teal palette with muted colors, transparent background, clean linework, retro nostalgic feel",
    "subfolder": "sprites",
    "target_width": 32,
    "target_height": 48,
    "force_regenerate": false,
    "style_notes": "Glasses and thoughtful posture must read clearly at target size, mysterious but approachable vibe"
  },
  {
    "asset_id": "tile_apartment_floor",
    "prompt": "16-bit pixel art floor tile, SNES style, warm wooden apartment flooring with subtle grain texture, amber and brown tones, seamless tiling pattern, cozy indoor lighting, transparent background, retro nostalgic feel",
    "subfolder": "tiles",
    "target_width": 16,
    "target_height": 16,
    "force_regenerate": false,
    "style_notes": "Must tile seamlessly, warm wood grain visible but not distracting"
  },
  {
    "asset_id": "tile_apartment_wall",
    "prompt": "16-bit pixel art wall tile, SNES style, neutral apartment wall with subtle texture, warm beige and amber tones with teal shadows, indoor lighting, transparent background, clean linework, retro nostalgic feel",
    "subfolder": "tiles",
    "target_width": 16,
    "target_height": 16,
    "force_regenerate": false,
    "style_notes": "Clean wall surface that won't compete with foreground objects, warm startup apartment vibe"
  },
  {
    "asset_id": "object_laptop",
    "prompt": "16-bit pixel art laptop object, SNES style, modern silver laptop with glowing amber screen, viewed from 3/4 top-down angle, warm amber accent light from screen, teal shadows, transparent background, clean linework, retro nostalgic feel",
    "subfolder": "objects",
    "target_width": 32,
    "target_height": 24,
    "force_regenerate": false,
    "style_notes": "Screen glow must be visible as interactive element, laptop shape clearly readable from top-down view"
  },
  {
    "asset_id": "player_base_idle",
    "prompt": "16-bit pixel art character sprite, SNES Stardew Valley style, tech startup founder wearing dark hoodie with tired but determined expression, messy hair, holding coffee mug, warm amber and teal palette, transparent background, clean linework, retro nostalgic feel",
    "subfolder": "sprites",
    "target_width": 32,
    "target_height": 48,
    "force_regenerate": false,
    "style_notes": "Coffee mug and hoodie must read clearly, tired eyes but determined posture, relatable startup founder vibe"
  }
]
<!-- ASSET_REQUESTS_END -->
