# GTM Studio v4 — Architecture Decision Record

## Date: March 2026

## Decision: Migrate from single-file HTML5 Canvas to Godot 4.6 Engine

### Context
v3 produced a single `game.html` file (~3000+ lines) using vanilla JS and HTML5 Canvas.
This approach hit a ceiling:
- Agent context window bloat (entire game in every prompt)
- No scene graph, physics, or built-in tooling
- Prompt drift caused regressions (agents rewrote working systems)
- Single-file architecture couldn't scale to a real game

### New Stack
| Component | v3 | v4 |
|-----------|----|----|
| Engine | Vanilla JS + Canvas | Godot 4.6.1 (GDScript) |
| Renderer | Manual canvas draws | Compatibility (WebGL 2.0) via TileMapLayer + Sprite2D |
| Art | Imagen 4 → PixelLab | PixelLab v2 (kept) |
| Output | Single game.html | Godot web export (HTML + WASM + PCK) |
| Agent output | Complete HTML file | Individual .gd/.tscn files via marker protocol |
| Deployment | GitHub Pages static | GitHub Pages (single-threaded Godot web export) |
| Threading | N/A | Single-threaded (avoids SharedArrayBuffer/CORS on GH Pages) |
| Save data | N/A | user:// (IndexedDB in browser) |

### Key Benefits
1. **Agents output individual files** — scripts and scenes, not the entire game
2. **Godot handles rendering, physics, input, scenes** — agents focus on game logic
3. **Scene tree prevents regressions** — changing one scene doesn't break another
4. **Built-in tilemap editor format** — PixelLab tiles import as TileSet resources
5. **Web export** — still plays in browser, still served from GitHub Pages
6. **Export validates** — Godot CLI export catches script errors, missing resources

### Agent Pipeline Changes
- Atlas outputs .gd scripts and .tscn scene files (multi-file marker protocol)
- Server writes files to Godot project tree, triggers headless export
- Marcus plans in terms of Godot nodes, scenes, and autoloads (not JS functions)
- Protected systems manifest tracks files and autoload dependencies (not function sigs)
- Bea reviews exported build + Atlas's build report
- Validation = successful Godot web export (export itself checks scripts + resources)

### Web Export Constraints (Godot 4.6)
- Compatibility renderer only (WebGL 2.0) — Forward+/Mobile not supported on web
- Single-threaded recommended — no COOP/COEP headers needed on GitHub Pages
- No C# (fundamental .NET limitation on web) — GDScript only
- No GDExtension (requires cross-origin isolation headers)
- user:// backed by IndexedDB — persistence depends on browser settings
- Browser tabs that lose focus pause _process() and _physics_process()
- Full screen / mouse capture must happen inside input event handlers

### What Stays the Same
- 10 named agents, same roles and models
- Department-based rounds (engine/story/art/integration/hotfix)
- Manifest contract layer (game-state, story-state, etc.)
- PixelLab for art generation
- Sean as creative director via feedback system
- Batch/checkpoint execution model
- Express server as control panel backend
