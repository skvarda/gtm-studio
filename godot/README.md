# SaaS Quest — Godot 4.6 Project

## Directory Structure (this folder is the project root)
- `project.godot` — Open this folder in Godot Editor 4.6.x
- `scenes/` — .tscn scene files (rooms, UI, entities)
- `scripts/` — GDScript files (autoloads, entities, UI, rooms)
- `assets/` — Sprites, tiles, UI art (imported by Godot)
- `data/` — JSON data files (dialogue, economy, NPC definitions)

## Build Pipeline
1. Agents generate/modify .gd scripts + .tscn scene files
2. Server writes files to this project directory
3. `godot --headless --export-release "Web" output/index.html`
4. Export output copied to docs/ for GitHub Pages

## Key Constraints
- Godot 4.6.1 stable, Compatibility renderer (WebGL 2.0)
- Single-threaded web export (no SharedArrayBuffer/CORS needed)
- GDScript only (no C# — cannot web export)
- No GDExtension (requires cross-origin isolation)
- Resolution: 640x360 native, 2x integer scale (1280x720 display)
- Tile size: 32x32, Character sprites: 32x48
- Texture filter: Nearest (pixel art — no smoothing)
- Save data: user:// (IndexedDB on web)
