require('dotenv').config({ path: '/opt/gtm-studio/.env' });
// GTM Studio — Phase 3: Multi-Agent Loop
const express = require('express');
const { execSync, exec } = require('child_process');
const { promisify } = require('util');
const execAsync = promisify(exec);
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const app = express();
const PORT = process.env.PORT || 3000;
const BASE = '/opt/gtm-studio';
const BUILDS = path.join(BASE, 'builds');
const AGENT_LOGS = path.join(BUILDS, 'agent-logs');
const DOCS = path.join(BASE, 'docs');
const ASSET_REGISTRY = path.join(BUILDS, 'asset-registry.json');
const ASSETS_DIR = path.join(BASE, 'assets');
const ASSETS_ORIGINALS_DIR = path.join(BASE, 'assets', 'originals');
const DOCS_ASSETS_DIR = path.join(DOCS, 'assets');

app.use(express.json());
app.use(express.static(path.join(BASE, 'ui')));
app.use('/assets', express.static(path.join(BASE, 'assets')));

const sseClients = new Set();
app.get('/events', (req, res) => {
  res.set({ 'Content-Type': 'text/event-stream', 'Cache-Control': 'no-cache', 'Connection': 'keep-alive' });
  res.flushHeaders();
  res.write('data: {"type":"connected"}\n\n');
  sseClients.add(res);
  req.on('close', () => sseClients.delete(res));
});

function broadcast(data) {
  const payload = `data: ${JSON.stringify(data)}\n\n`;
  for (const res of sseClients) { try { res.write(payload); } catch (_) {} }
}

let isRunning = false;
let currentRound = 0;

function getNextRound() {
  const existing = fs.existsSync(AGENT_LOGS)
    ? fs.readdirSync(AGENT_LOGS).map(f => parseInt(f.match(/^round-(\d+)-/)?.[1])).filter(Boolean)
    : [];
  return existing.length ? Math.max(...existing) + 1 : 1;
}

function getPrevRoundLogs(round, agentId) {
  const prevRound = round - 1;
  if (prevRound < 1) return null;
  const file = path.join(AGENT_LOGS, `round-${prevRound}-${agentId}.md`);
  if (!fs.existsSync(file)) return null;
  return fs.readFileSync(file, 'utf8');
}

function writeAgentLog(round, agentId, content) {
  fs.mkdirSync(AGENT_LOGS, { recursive: true });
  fs.writeFileSync(path.join(AGENT_LOGS, `round-${round}-${agentId}.md`), content, 'utf8');
}

const GAME_VISION = `GAME VISION - SaaS Startup Simulator
Genre: 16-bit SaaS Startup Simulator, Harvest Moon and Pokemon aesthetic
Setting: Small software company office, top-down 3/4 perspective, SNES pixel art style
Player: Tech co-founder, angel funded, hoodie
The Co-Founder: Mysterious NPC, keeps to himself, unclear what he does, no interference (late-game reveals possible)
Early Game: Survive cash burn, hire developer or salesperson first, build product or chase revenue
Mid Game: Grow team, ship features, acquire customers, navigate market shifts
Endgame Paths: IPO Glory, Profit Machine, R&D Utopia, World Domination
Tone: Lighthearted but strategically deep, startup absurdity humor`.trim();

const AGENTS = [
  {
    id: 'exec-director', name: 'Vivian Cross', role: 'Executive Director', emoji: '👔', model: 'opus',
    buildPrompt(round, currentLogs) {
      const prev = getPrevRoundLogs(round, 'developer');
      const feedback = fs.existsSync(FEEDBACK_FILE) ? fs.readFileSync(FEEDBACK_FILE, 'utf8').trim() : null;
      return `You are the Executive Director for GTM Studio, a self-hosted agentic game studio.\n\n${GAME_VISION}\n\nThis is Round ${round}.\n\n${prev ? `PREVIOUS ROUND Developer output:\n${prev.slice(0, 2000)}` : 'This is the FIRST round. Establish the foundational game vision.'}${feedback ? `\n\nDIRECTOR FEEDBACK (from studio owner — treat as top priority):\n${feedback}` : ''}\n\nWrite a strategic brief (300-500 words):\n1. The number one development priority for this round\n2. Two or three specific features or improvements to implement\n3. Clear direction to the 7 downstream agents\n4. If round > 1: specific bugs or quality issues to fix\n\nBe decisive and specific. Sign off: Executive Director Round ${round}`;
    }
  },
  {
    id: 'creative-director', name: 'Luna Reyes', role: 'Creative Director', emoji: '🎬', model: 'sonnet',
    buildPrompt(round, currentLogs) {
      const exec = currentLogs['exec-director'] || '(awaiting)';
      return `You are the Creative Director for a 16-bit SaaS Startup Simulator.\n\n${GAME_VISION}\n\nEXECUTIVE DIRECTOR BRIEF Round ${round}:\n${exec}\n\nWrite a GTM and narrative design doc (200-350 words):\n1. The core viral hook\n2. Key narrative beats for this round\n3. How the mystery co-founder NPC should evolve (keep it subtle)\n4. One specific piece of dialog that captures the game tone\n5. Startup tropes or real GTM mechanics to incorporate`;
    }
  },
  {
    id: 'tech-lead', name: 'Marcus Webb', role: 'Tech Lead', emoji: '🏗️', model: 'opus',
    buildPrompt(round, currentLogs) {
      const exec = currentLogs['exec-director'] || '(awaiting)';
      const creative = currentLogs['creative-director'] || '(awaiting)';
      return `You are the Tech Lead for a 16-bit SaaS Startup Simulator.\n\n${GAME_VISION}\n\nEXECUTIVE DIRECTOR BRIEF Round ${round}:\n${exec}\n\nCREATIVE DIRECTOR INPUT:\n${creative.slice(0, 600)}\n\nWrite a technical architecture review (200-350 words):\n1. HTML5 Canvas architecture decisions for this round\n2. Performance considerations\n3. Code structure recommendations\n4. Technical risks and mitigations\n5. Specific implementation patterns the Developer should use\n\nBe concrete and implementable.`;
    }
  },
  {
    id: 'writer', name: 'Sage Moretti', role: 'Writer', emoji: '✍️', model: 'sonnet',
    buildPrompt(round, currentLogs) {
      const exec = currentLogs['exec-director'] || '(awaiting)';
      const creative = currentLogs['creative-director'] || '(awaiting)';
      return `You are the Writer for a 16-bit SaaS Startup Simulator.\n\n${GAME_VISION}\n\nEXECUTIVE DIRECTOR BRIEF Round ${round}:\n${exec}\n\nCREATIVE DIRECTOR INPUT:\n${creative.slice(0, 600)}\n\nWrite a narrative and dialog doc (200-350 words):\n1. Key story beats and narrative moments for this round\n2. NPC dialog lines (especially the mysterious co-founder)\n3. UI text, tooltips, and flavor text\n4. Event descriptions and notifications\n5. Tone guidelines — startup absurdity with strategic depth\n\nMake the writing punchy and memorable.`;
    }
  },
  {
    id: 'game-designer', name: 'Felix Park', role: 'Game Designer', emoji: '🎮', model: 'sonnet',
    buildPrompt(round, currentLogs) {
      const exec = currentLogs['exec-director'] || '(awaiting)';
      const creative = currentLogs['creative-director'] || '(awaiting)';
      const tech = currentLogs['tech-lead'] || '(awaiting)';
      return `You are the Game Designer for a 16-bit SaaS Startup Simulator.\n\n${GAME_VISION}\n\nEXECUTIVE DIRECTOR BRIEF Round ${round}:\n${exec}\n\nCREATIVE DIRECTOR INPUT:\n${creative.slice(0, 400)}\n\nTECH LEAD INPUT:\n${tech.slice(0, 400)}\n\nWrite a game mechanics design doc (250-400 words):\n1. Core gameplay loop for this round\n2. Specific mechanics to implement\n3. Progression gates\n4. Difficulty curve\n5. Player feedback loops\n6. One specific fun moment to engineer\n\nBe concrete and implementable.`;
    }
  },
  {
    id: 'art-director', name: 'Priya Vasquez', role: 'Art Director', emoji: '🎨', model: 'sonnet',
    buildPrompt(round, currentLogs) {
      const exec = currentLogs['exec-director'] || '(awaiting)';
      return `You are the Art Director for a 16-bit SaaS Startup Simulator.\n\n${GAME_VISION}\n\nEXECUTIVE DIRECTOR BRIEF Round ${round}:\n${exec}\n\nWrite a visual direction doc (200-350 words):\n1. CSS color palette with hex values\n2. Pixel art style notes for sprites and tiles\n3. UI and HUD specs, fonts, retro styling\n4. Animation priorities\n5. One visual gag or easter egg\n\nThe Developer implements in HTML5 Canvas and CSS. Think SNES era constraints.\n\nAt the END of your Art Spec output, include a structured asset request block between these exact markers:\n\n<!-- ASSET_REQUESTS_START -->\n[\n  {\n    \"asset_id\": \"npc_jordan_idle\",\n    \"prompt\": \"16-bit pixel art character sprite, SNES Stardew Valley style, character with messy dark hair and round glasses, casual hoodie, neutral-friendly expression, facing forward, warm amber and teal palette, transparent background, clean linework, retro nostalgic feel, inspired by Harvest Moon and Chrono Trigger character design\",\n    \"subfolder\": \"sprites\",\n    \"target_width\": 32,\n    \"target_height\": 48,\n    \"force_regenerate\": false,\n    \"style_notes\": \"Must match Stardew Valley character proportions and warmth\"\n  }\n]\n<!-- ASSET_REQUESTS_END -->\n\nRules for asset requests:\n- Only request assets that are NEW this round or need revision (status: needs_revision)\n- Maximum 5 assets per round (API cost constraint — $0.03 per image)\n- Use descriptive asset_ids: npc_{name}_{state}, tile_{type}_{variant}, ui_{element}_{state}\n- Prompts MUST specify: '16-bit pixel art', SNES-era reference games (Stardew Valley, Harvest Moon, Chrono Trigger), specific palette colors, warm retro nostalgic feel\n- Prompts should describe the LOOK AND FEEL you want, not the pixel dimensions — the post-processor handles sizing\n- target_width and target_height are the FINAL game-ready pixel dimensions after downscaling:\n  - Characters: 32x48 (or 32x64 for tall characters)\n  - Tiles: 16x16 or 32x32\n  - UI elements: varies by element\n- Set force_regenerate: true only if Sean or QA specifically flagged this asset for revision\n- If no new assets are needed this round, output an empty array between the markers`;
    }
  },
  {
    id: 'asset-generator', name: 'Iris Nakamura', displayName: 'Asset Generator', emoji: '🖼️', model: 'sonnet', role: 'iris',
    buildPrompt() { return ''; }
  },
  {
    id: 'producer', name: 'Ren Tanaka', role: 'Producer', emoji: '📋', model: 'sonnet',
    buildPrompt(round, currentLogs) {
      const exec = currentLogs['exec-director'] || '(awaiting)';
      const designer = currentLogs['game-designer'] || '(awaiting)';
      const irisReport = currentLogs['asset-generator'] || '';
      return `You are the Producer for a 16-bit SaaS Startup Simulator.\n\n${GAME_VISION}\n\nEXECUTIVE DIRECTOR BRIEF Round ${round}:\n${exec}\n\nGAME DESIGNER INPUT:\n${designer.slice(0, 600)}\n${irisReport ? `\nIRIS ASSET REPORT (assets available this round):\n${irisReport.slice(0, 400)}\n` : ''}\nWrite a scope and prioritization doc (200-300 words):\n1. What to BUILD this round, top 3 items maximum\n2. What to CUT or defer, name specific things\n3. Complexity estimate for each item\n4. Non-negotiables for this round\n5. Known risks\n\nPrevent scope creep. Be ruthless.`;
    }
  },
  {
    id: 'developer', name: 'Atlas Novak', role: 'Developer', emoji: '💻', model: 'opus',
    buildPrompt(round, currentLogs) {
      const prevGame = fs.existsSync(path.join(BUILDS, 'game.html'))
        ? fs.readFileSync(path.join(BUILDS, 'game.html'), 'utf8') : null;
      const irisReport = currentLogs['asset-generator'] || '';
      return `CRITICAL OUTPUT RULES:\n- Your ENTIRE response must be a single, complete, valid HTML document\n- The first character of your response MUST be < (the opening of <!DOCTYPE html>)\n- Do NOT write files to disk. Do NOT use any file I/O tools.\n- Do NOT include any explanation, commentary, or markdown\n- Do NOT wrap output in code fences\n- Output ONLY the raw HTML, nothing else\n- The HTML must be COMPLETE — do not truncate or summarize any section\n- If the file would exceed your output limit, REDUCE FEATURES rather than truncating the HTML\n\nYou are the Developer for GTM Studio. Produce a COMPLETE PLAYABLE HTML5 game file.\n\n${GAME_VISION}\n\nROUND ${round} BRIEFS:\n\nEXECUTIVE DIRECTOR:\n${(currentLogs['exec-director']||'').slice(0,1000)}\n\nCREATIVE DIRECTOR:\n${(currentLogs['creative-director']||'').slice(0,500)}\n\nTECH LEAD:\n${(currentLogs['tech-lead']||'').slice(0,500)}\n\nGAME DESIGNER:\n${(currentLogs['game-designer']||'').slice(0,700)}\n\nART DIRECTOR:\n${(currentLogs['art-director']||'').slice(0,500)}\n\nPRODUCER - follow this scope carefully:\n${(currentLogs['producer']||'').slice(0,500)}\n\nQA PLAYTESTER FEEDBACK:\n${(currentLogs['qa-playtester']||'').slice(0,500)}\n\n${irisReport ? `AVAILABLE ASSETS this round (generated by Iris — use these instead of drawing rectangles/shapes in code):\n${irisReport.slice(0, 800)}\n\nASSET LOADING PATTERN — you MUST use this preloader pattern:\n\`\`\`javascript\nconst GAME_ASSETS = {};\nconst ASSET_MANIFEST = [\n  // Populate from Iris Asset Manifest above\n  // { id: 'npc_jordan_idle', path: '/assets/sprites/npc_jordan_idle_v1.png', width: 32, height: 48 }\n];\nfunction preloadAssets() {\n  return Promise.all(ASSET_MANIFEST.map(asset =>\n    new Promise((resolve) => {\n      const img = new Image();\n      img.onload = () => { GAME_ASSETS[asset.id] = img; resolve(); };\n      img.onerror = () => { console.warn('Failed to load:', asset.path); resolve(); };\n      img.src = asset.path;\n    })\n  ));\n}\npreloadAssets().then(() => startGameLoop());\n\`\`\`\n\nWhen drawing sprites, ALWAYS set: ctx.imageSmoothingEnabled = false;\nDraw assets like this:\n\`\`\`javascript\nconst sprite = GAME_ASSETS['npc_jordan_idle'];\nif (sprite) {\n  ctx.imageSmoothingEnabled = false;\n  ctx.drawImage(sprite, x, y, drawWidth, drawHeight);\n}\n\`\`\`\nIf an asset doesn't exist yet, fall back to the current colored-rectangle approach.\n` : ''}\n${prevGame ? `PREVIOUS BUILD - improve on this:\n${prevGame.slice(0,5000)}` : 'NO PREVIOUS BUILD - create the first playable version'}\n\nCRITICAL OUTPUT REQUIREMENTS:\n1. Output a SINGLE COMPLETE self-contained HTML file\n2. Start with <!DOCTYPE html>, include html/head/body tags\n3. Include a canvas element\n4. All JS inline in script tags, no external dependencies\n5. All CSS inline in style tags\n6. Must be PLAYABLE with keyboard controls and a game loop\n7. Follow the Producer scope - not the full wish list\n8. Fix all QA Playtester bugs\n9. 16-bit pixel art aesthetic — ctx.imageSmoothingEnabled = false on all canvas draws\n10. DO NOT truncate - output the ENTIRE file\n\nOutput ONLY the raw HTML. No commentary. No markdown. Start with <!DOCTYPE html> and end with </html>.`;
    }
  },
  {
    id: 'qa-playtester', name: 'Bea Ortiz', role: 'QA Playtester', emoji: '🕹️', model: 'opus',
    buildPrompt(round, currentLogs) {
      const prevGame = getPrevRoundLogs(round, 'developer');
      return `You are the QA Playtester for a 16-bit SaaS Startup Simulator.\n\n${GAME_VISION}\n\nRound ${round}.\n\n${prevGame ? `LAST ROUND GAME CODE (partial):\n${prevGame.slice(0, 2000)}\n\nImagine playing this game.` : 'No previous build. Focus on what the first playable version must nail.'}\n\nWrite a playtesting report (200-350 words):\n1. What works well\n2. Top 3 bugs or anticipated issues\n3. Feel assessment\n4. Pacing assessment\n5. One improvement that would make the most difference\n\nBe a tough honest critic.`;
    }
  },
];

async function generateAsset(assetId, prompt, subfolder = 'sprites', targetWidth = 32, targetHeight = 48) {
  const apiKey = process.env.GOOGLE_AI_API_KEY;
  if (!apiKey) {
    console.error('GOOGLE_AI_API_KEY not set — skipping asset generation');
    return null;
  }

  try {
    // Determine aspect ratio from target dimensions
    const ratio = targetWidth / targetHeight;
    let aspectRatio = '1:1';
    if (ratio < 0.85) aspectRatio = '3:4';      // tall (characters)
    else if (ratio > 1.15) aspectRatio = '4:3';  // wide (backgrounds)

    // Call Imagen 4 API
    const response = await fetch(
      'https://generativelanguage.googleapis.com/v1beta/models/imagen-4.0-generate-001:predict',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-goog-api-key': apiKey
        },
        body: JSON.stringify({
          instances: [{ prompt }],
          parameters: {
            sampleCount: 1,
            aspectRatio
          }
        })
      }
    );

    if (!response.ok) {
      const err = await response.text();
      console.error(`[Iris] API error for ${assetId}:`, err);
      return null;
    }

    const data = await response.json();
    const b64 = data?.predictions?.[0]?.bytesBase64Encoded;
    if (!b64) {
      console.error(`[Iris] No image data returned for ${assetId}`);
      return null;
    }

    // Load asset registry for versioning
    const registryPath = path.join(BUILDS, 'asset-registry.json');
    let registry = { version: 1, assets: {} };
    try { registry = JSON.parse(fs.readFileSync(registryPath, 'utf8')); } catch(e) {}

    const existing = registry.assets[assetId];
    const version = existing ? existing.version + 1 : 1;
    const filename = `${assetId}_v${version}.png`;
    const originalFilename = `${assetId}_v${version}_original.png`;

    // Save hi-res original
    const originalBuffer = Buffer.from(b64, 'base64');
    const originalPath = path.join(BASE, 'assets', 'originals', subfolder, originalFilename);
    fs.writeFileSync(originalPath, originalBuffer);
    console.log(`[Iris] Saved original: ${originalFilename} (${originalBuffer.length} bytes)`);

    // Post-process: downscale to game-ready dimensions with nearest-neighbor
    const gameReadyPath = path.join(BASE, 'assets', subfolder, filename);
    await sharp(originalBuffer)
      .resize(targetWidth, targetHeight, {
        kernel: sharp.kernel.nearest,  // Nearest-neighbor = crisp pixels
        fit: 'fill'
      })
      .png()
      .toFile(gameReadyPath);

    // Also copy to docs/ for GitHub Pages
    const docsAssetPath = path.join(BASE, 'docs', 'assets', subfolder, filename);
    fs.copyFileSync(gameReadyPath, docsAssetPath);

    console.log(`[Iris] Processed: ${filename} (${targetWidth}x${targetHeight})`);

    return {
      filename,
      originalFilename,
      version,
      path: `/assets/${subfolder}/${filename}`,
      targetWidth,
      targetHeight
    };
  } catch (err) {
    console.error(`[Iris] generateAsset error for ${assetId}:`, err.message);
    return null;
  }
}

function updateAssetRegistry(assetId, assetData, prompt, roundNum, styleNotes = '', targetWidth = 32, targetHeight = 48) {
  const registryPath = path.join(BUILDS, 'asset-registry.json');
  let registry = { version: 1, lastUpdated: `round-${roundNum}`, assets: {} };
  try { registry = JSON.parse(fs.readFileSync(registryPath, 'utf8')); } catch(e) {}

  const existing = registry.assets[assetId] || {};
  registry.assets[assetId] = {
    file: assetData.filename,
    original_file: assetData.originalFilename,
    version: assetData.version,
    status: 'pending',
    prompt,
    style_notes: styleNotes,
    revision_notes: existing.revision_notes || '',
    target_width: targetWidth,
    target_height: targetHeight,
    created_round: existing.created_round || roundNum,
    last_modified_round: roundNum
  };
  registry.lastUpdated = `round-${roundNum}`;
  fs.writeFileSync(registryPath, JSON.stringify(registry, null, 2));
}

async function runIris(round, priyaOutput, broadcast) {
  broadcast({ type: 'agent_start', round, agentId: 'asset-generator', agentName: 'Iris Nakamura', displayName: 'Asset Generator', emoji: '🖼️', model: 'sonnet' });

  const registryPath = path.join(BUILDS, 'asset-registry.json');
  let registry = { assets: {} };
  try { registry = JSON.parse(fs.readFileSync(registryPath, 'utf8')); } catch(e) {}

  // Parse asset requests from Priya's output
  // Priya outputs a JSON block between markers: <!-- ASSET_REQUESTS_START --> ... <!-- ASSET_REQUESTS_END -->
  const assetMatch = priyaOutput.match(/<!-- ASSET_REQUESTS_START -->([\s\S]*?)<!-- ASSET_REQUESTS_END -->/);

  if (!assetMatch) {
    console.log('[Iris] No asset requests found in Art Spec — skipping generation');
    const skipReport = `# Iris Asset Generation Report — Round ${round}\n\nNo asset requests found in Art Spec. Skipping.\n`;
    const reportPath = path.join(AGENT_LOGS, `round-${round}-iris.md`);
    fs.writeFileSync(reportPath, skipReport);
    broadcast({ type: 'agent_complete', round, agentId: 'asset-generator', agentName: 'Iris Nakamura', displayName: 'Asset Generator', emoji: '🖼️', outputLength: 0 });
    return { generated: [], skipped: [], report: skipReport };
  }

  let assetRequests = [];
  try {
    assetRequests = JSON.parse(assetMatch[1].trim());
  } catch(e) {
    console.error('[Iris] Failed to parse asset requests JSON:', e.message);
    const errReport = `# Iris Asset Generation Report — Round ${round}\n\nFailed to parse asset requests: ${e.message}\n`;
    const reportPath = path.join(AGENT_LOGS, `round-${round}-iris.md`);
    fs.writeFileSync(reportPath, errReport);
    broadcast({ type: 'agent_complete', round, agentId: 'asset-generator', agentName: 'Iris Nakamura', displayName: 'Asset Generator', emoji: '🖼️', outputLength: 0 });
    return { generated: [], skipped: [], report: errReport };
  }

  // Cap at 5 assets per round
  if (assetRequests.length > 5) {
    console.log(`[Iris] Capping asset requests from ${assetRequests.length} to 5`);
    assetRequests = assetRequests.slice(0, 5);
  }

  const generated = [];
  const skipped = [];

  for (const req of assetRequests) {
    const {
      asset_id,
      prompt,
      subfolder = 'sprites',
      force_regenerate = false,
      style_notes = '',
      target_width = 32,
      target_height = 48
    } = req;

    // Skip if already approved and not forced
    const existing = registry.assets[asset_id];
    if (existing && existing.status === 'approved' && !force_regenerate) {
      console.log(`[Iris] Skipping approved asset: ${asset_id}`);
      skipped.push(asset_id);
      continue;
    }

    // Pause between requests to respect API rate limits
    if (generated.length > 0) {
      console.log('[Iris] Rate limit pause (10s)...');
      await new Promise(resolve => setTimeout(resolve, 10000));
    }

    const result = await generateAsset(asset_id, prompt, subfolder, target_width, target_height);
    if (result) {
      updateAssetRegistry(asset_id, result, prompt, round, style_notes, target_width, target_height);
      generated.push({ asset_id, ...result });
      broadcast({ type: 'asset_complete', round, assetId: asset_id, filename: result.filename });
      console.log(`[Iris] ✓ ${asset_id} → ${result.filename} (${target_width}x${target_height})`);
    } else {
      skipped.push(asset_id);
      broadcast({ type: 'asset_skipped', round, assetId: asset_id });
      console.log(`[Iris] ✗ Failed: ${asset_id}`);
    }
  }

  // Build Iris report
  const irisReport = `# Iris Asset Generation Report — Round ${round}

Generated: ${generated.length} assets
Skipped: ${skipped.length} assets (approved or failed)
Post-processing: All assets downscaled with nearest-neighbor resampling to target pixel dimensions.

## Generated This Round
${generated.map(a => `- ${a.asset_id}: ${a.path} (v${a.version}, ${a.targetWidth}x${a.targetHeight})`).join('\n') || 'None'}

## Skipped
${skipped.map(id => `- ${id}`).join('\n') || 'None'}

## Asset Manifest (for Atlas)
${JSON.stringify(generated.map(a => ({ id: a.asset_id, path: a.path, version: a.version, width: a.targetWidth, height: a.targetHeight })), null, 2)}
`;

  const reportPath = path.join(AGENT_LOGS, `round-${round}-iris.md`);
  fs.writeFileSync(reportPath, irisReport);

  broadcast({ type: 'agent_complete', round, agentId: 'asset-generator', agentName: 'Iris Nakamura', displayName: 'Asset Generator', emoji: '🖼️', outputLength: irisReport.length });

  return { generated, skipped, report: irisReport };
}

async function runAgent(agent, prompt) {
  const tmpFile = `/tmp/gtm-${agent.id}.txt`;
  try { fs.unlinkSync(tmpFile); } catch (_) {}
  fs.writeFileSync(tmpFile, prompt, 'utf8');
  fs.chmodSync(tmpFile, 0o666);
  try { execSync(`chown gtm:gtm ${tmpFile}`); } catch (_) {}
  const isDeveloper = agent.id === 'developer';
  try {
    const { stdout } = await execAsync(
      `su - gtm -s /bin/bash -c 'claude --model ${agent.model} --print --dangerously-skip-permissions < ${tmpFile}'`,
      { timeout: isDeveloper ? 600_000 : 300_000, maxBuffer: 50 * 1024 * 1024 }
    );
    return stdout.trim();
  } catch (err) {
    const output = (err.stdout || '').toString('utf8').trim();
    if (output.length > 100) return output;
    throw new Error(`Agent ${agent.id} failed: ${err.message}`);
  } finally {
    try { fs.unlinkSync(tmpFile); } catch (_) {}
  }
}

// Agents skipped during bugfix rounds (creative/asset work only runs on feature, polish, bigchange)
const BUGFIX_SKIP_AGENTS = new Set(['creative-director', 'writer', 'asset-generator']);

async function runRound(roundType = 'feature') {
  if (isRunning) throw new Error('Round already running');
  isRunning = true;
  const round = getNextRound();
  currentRound = round;
  const currentLogs = {};
  broadcast({ type: 'round_start', round, roundType });
  console.log(`\n=== ROUND ${round} START (${roundType}) ===`);

  try {
    for (const agent of AGENTS) {
      if (roundType === 'bugfix' && BUGFIX_SKIP_AGENTS.has(agent.id)) {
        console.log(`[Round ${round}] Skipping ${agent.name} (bugfix round)`);
        continue;
      }
      broadcast({ type: 'agent_start', round, agentId: agent.id, name: agent.name, role: agent.role, emoji: agent.emoji, model: agent.model });
      console.log(`[Round ${round}] ${agent.emoji} ${agent.role} starting...`);
      const prompt = agent.buildPrompt(round, currentLogs);
      let output;
      try {
        if (agent.role === 'iris') {
          const priyaOutput = currentLogs['art-director'] || '';
          const irisResult = await runIris(round, priyaOutput, broadcast);
          output = irisResult.report;
        } else {
          output = await runAgent(agent, prompt);
        }
      } catch (err) {
        const errMsg = `## Error\n\n${err.message}`;
        writeAgentLog(round, agent.id, errMsg);
        broadcast({ type: 'agent_error', round, agentId: agent.id, error: err.message });
        console.error(`[Round ${round}] ${agent.name} ERROR:`, err.message);
        currentLogs[agent.id] = errMsg;
        continue;
      }
      // Fallback for Developer: if output doesn't start with '<', check if it wrote a file instead
      if (agent.id === 'developer' && !output.startsWith('<')) {
        const fallbackPath = '/home/gtm/saas-startup-simulator.html';
        try {
          const stat = fs.statSync(fallbackPath);
          const ageMs = Date.now() - stat.mtimeMs;
          if (ageMs < 5 * 60 * 1000) {
            console.log(`[Round ${round}] Developer wrote to disk instead of stdout — reading ${fallbackPath}`);
            output = fs.readFileSync(fallbackPath, 'utf8').trim();
          }
        } catch (_) {}
      }
      currentLogs[agent.id] = output;
      writeAgentLog(round, agent.id, output);
      broadcast({ type: 'agent_complete', round, agentId: agent.id, agentName: agent.name, emoji: agent.emoji, outputLength: output.length });
      console.log(`[Round ${round}] ${agent.emoji} ${agent.role} complete (${output.length} bytes)`);
    }

    const devOutput = currentLogs['developer'] || '';
    const htmlMatch = devOutput.match(/<!DOCTYPE html>[\s\S]*<\/html>/i);
    if (htmlMatch) {
      const gameHtml = htmlMatch[0];
      fs.mkdirSync(BUILDS, { recursive: true });
      fs.writeFileSync(path.join(BUILDS, 'game.html'), gameHtml, 'utf8');
      fs.mkdirSync(DOCS, { recursive: true });
      fs.copyFileSync(path.join(BUILDS, 'game.html'), path.join(DOCS, 'game.html'));
      console.log(`[Round ${round}] game.html written (${gameHtml.length} chars)`);
      try {
        execSync(`cd ${BASE} && git add builds/ docs/ assets/ && git commit -m "Round ${round}: multi-agent build" && git push origin main`, { timeout: 60_000 });
        broadcast({ type: 'committed', round });
        console.log(`[Round ${round}] Pushed to GitHub`);
      } catch (gitErr) {
        console.error(`[Round ${round}] Git push failed:`, gitErr.message);
        broadcast({ type: 'git_error', round, error: gitErr.message });
      }
    } else {
      console.warn(`[Round ${round}] Developer did not produce valid HTML`);
      broadcast({ type: 'no_html', round });
    }

    // Clear consumed feedback
    if (fs.existsSync(FEEDBACK_FILE)) {
      fs.unlinkSync(FEEDBACK_FILE);
      broadcast({ type: 'feedback_cleared' });
    }
    broadcast({ type: 'round_complete', round });
    console.log(`=== ROUND ${round} COMPLETE ===\n`);
  } finally {
    isRunning = false;
  }
}

app.post('/run', async (req, res) => {
  if (isRunning) return res.status(409).json({ error: 'Round already in progress' });
  const roundType = (req.body && req.body.roundType) || 'feature';
  res.json({ status: 'started', round: getNextRound(), roundType });
  runRound(roundType).catch(err => { console.error('Round failed:', err); broadcast({ type: 'error', message: err.message }); isRunning = false; });
});

app.get('/status', (req, res) => res.json({ isRunning, currentRound }));

app.get('/asset-registry', (req, res) => {
  if (!fs.existsSync(ASSET_REGISTRY)) return res.json({ version: 1, lastUpdated: 'round-0', assets: {} });
  try { res.json(JSON.parse(fs.readFileSync(ASSET_REGISTRY, 'utf8'))); }
  catch (e) { res.status(500).json({ error: 'Invalid registry JSON' }); }
});

app.patch('/asset-registry/:assetId', (req, res) => {
  const { assetId } = req.params;
  const { status, revision_notes } = req.body || {};
  const allowed = ['approved', 'needs_revision', 'pending'];
  if (!allowed.includes(status)) return res.status(400).json({ error: 'Invalid status' });
  if (!fs.existsSync(ASSET_REGISTRY)) return res.status(404).json({ error: 'Registry not found' });
  try {
    const reg = JSON.parse(fs.readFileSync(ASSET_REGISTRY, 'utf8'));
    if (!reg.assets[assetId]) return res.status(404).json({ error: 'Asset not found' });
    reg.assets[assetId].status = status;
    if (revision_notes) reg.assets[assetId].revision_notes = revision_notes;
    fs.writeFileSync(ASSET_REGISTRY, JSON.stringify(reg, null, 2));
    broadcast({ type: 'asset_status_changed', assetId, status });
    res.json({ ok: true });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

app.get('/logs/:round/:agent', (req, res) => {
  const file = path.join(AGENT_LOGS, `round-${req.params.round}-${req.params.agent}.md`);
  if (!fs.existsSync(file)) return res.status(404).json({ error: 'Not found' });
  res.type('text/plain').send(fs.readFileSync(file, 'utf8'));
});

app.get('/rounds', (req, res) => {
  if (!fs.existsSync(AGENT_LOGS)) return res.json([]);
  const files = fs.readdirSync(AGENT_LOGS);
  const rounds = [...new Set(files.map(f => parseInt(f.match(/^round-(\d+)-/)?.[1])).filter(Boolean))].sort((a, b) => b - a);
  res.json(rounds);
});

app.get('/build-report/:round', (req, res) => {
  const reportFile = path.join(BUILDS, `round-${req.params.round}-build-report.md`);
  if (fs.existsSync(reportFile)) {
    return res.type('text/plain').send(fs.readFileSync(reportFile, 'utf8'));
  }
  // Fallback: last ~500 chars of developer log
  const devLog = path.join(AGENT_LOGS, `round-${req.params.round}-developer.md`);
  if (fs.existsSync(devLog)) {
    const content = fs.readFileSync(devLog, 'utf8');
    return res.type('text/plain').send(content.slice(-500));
  }
  res.status(404).json({ error: 'Not found' });
});

// ── v2 routes ──────────────────────────────────────────────────────────────

const STUDIO_STATE = path.join(BUILDS, 'studio-state.json');
const FEEDBACK_FILE = path.join(BUILDS, 'sean-feedback.md');

app.get('/studio-state', (req, res) => {
  if (!fs.existsSync(STUDIO_STATE)) return res.status(404).json({ error: 'Not found' });
  try {
    res.json(JSON.parse(fs.readFileSync(STUDIO_STATE, 'utf8')));
  } catch (e) {
    res.status(500).json({ error: 'Invalid JSON in studio-state.json' });
  }
});

app.get('/feedback', (req, res) => {
  const msg = fs.existsSync(FEEDBACK_FILE) ? fs.readFileSync(FEEDBACK_FILE, 'utf8') : '';
  res.json({ message: msg });
});

app.post('/feedback', (req, res) => {
  const msg = (req.body && req.body.message) ? String(req.body.message).trim() : '';
  if (!msg) return res.status(400).json({ error: 'message required' });
  fs.mkdirSync(BUILDS, { recursive: true });
  fs.writeFileSync(FEEDBACK_FILE, msg, 'utf8');
  broadcast({ type: 'feedback_received' });
  res.json({ status: 'ok' });
});

app.delete('/feedback', (req, res) => {
  if (fs.existsSync(FEEDBACK_FILE)) fs.unlinkSync(FEEDBACK_FILE);
  res.json({ status: 'ok' });
});

let isPaused = false;
let resumeCallback = null;

app.post('/resume', (req, res) => {
  if (isRunning && isPaused && typeof resumeCallback === 'function') {
    isPaused = false;
    resumeCallback();
    resumeCallback = null;
    res.json({ status: 'resumed' });
  } else {
    res.status(400).json({ error: 'No paused round to resume' });
  }
});

// ───────────────────────────────────────────────────────────────────────────

app.listen(PORT, () => {
  console.log(`GTM Studio Phase 3 running on port ${PORT}`);
  console.log(`Agents: ${AGENTS.map(a => `${a.emoji} ${a.name}`).join(' → ')}`);
});
