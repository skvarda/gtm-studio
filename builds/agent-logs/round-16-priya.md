## Art Direction Notes - Round 23

**Focus:** Character sprite creation for key NPCs Chad and Gina

**Visual Design Philosophy:**
Building on our established warm SNES aesthetic, these two characters represent opposing archetypes in startup culture:

**Chad Thunderpitch (Rival):** 
- Embodies the "bro" startup culture - polished, aggressive, venture-backed confidence
- Visual contrast to player's tired hoodie aesthetic: sharp suit/polo, perfect hair, confident posture
- Color story: cooler tones within our palette (more teal bias) to feel slightly "corporate cold"
- Personality in stance: chest out, slight smirk, power pose even in idle
- Think: every overfunded competitor you've ever met at a conference

**Gina (All-Knowing Barista):**
- Wise mentor figure disguised as coffee shop employee
- Warm, approachable design with subtle hints of deeper knowledge
- Color story: heavy amber influence, earthy tones, cozy coffee shop vibes
- Personality in stance: relaxed but alert, knowing smile, hands suggesting coffee prep
- Think: the barista who somehow knows exactly what advice you need

**Technical Notes:**
- Maintaining 32x48 sprite dimensions for consistency
- Focus on clear silhouette readability at 2x scale (64x96 on screen)
- Idle animations should convey personality immediately
- Both sprites need to feel naturally part of our established world while having distinct character

**Palette Integration:**
Using our established warm SNES colors but pushing character-specific temperature variations to support narrative roles.

<!-- ASSET_REQUESTS_START -->
[
  {
    "asset_id": "npc_chad_idle",
    "prompt": "16-bit pixel art character sprite, SNES Stardew Valley style, confident Silicon Valley startup bro rival, slicked back brown hair, expensive polo shirt or blazer, crossed arms or hands on hips power pose, slight smirk, athletic build, warm amber and teal palette with cooler teal bias, transparent background, clean linework, retro nostalgic feel",
    "subfolder": "sprites",
    "target_width": 32,
    "target_height": 48,
    "force_regenerate": false,
    "style_notes": "Must read as arrogant/competitive at small size. Posture and facial expression should immediately convey 'startup rival' energy. Sharp, clean clothing contrasts with player's casual hoodie aesthetic."
  },
  {
    "asset_id": "npc_gina_idle",
    "prompt": "16-bit pixel art character sprite, SNES Stardew Valley style, wise all-knowing coffee shop barista, shoulder-length curly hair with small ponytail or bun, cozy coffee shop apron over casual clothes, warm knowing smile, relaxed friendly posture, hands positioned as if holding coffee cup or wiping counter, warm amber and teal palette with heavy amber bias, transparent background, clean linework, retro nostalgic feel",
    "subfolder": "sprites",
    "target_width": 32,
    "target_height": 48,
    "force_regenerate": false,
    "style_notes": "Must convey wisdom and approachability at small size. Coffee shop elements should be subtle but clear. Warm, maternal energy that suggests she knows more than she lets on."
  }
]
<!-- ASSET_REQUESTS_END -->
