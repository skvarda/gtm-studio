require('dotenv').config({ path: '/opt/gtm-studio/.env' });
// GTM Studio v3 — Department-Based Round Dispatch
const express = require('express');
const { execSync, spawn } = require('child_process');
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const app = express();
const PORT = process.env.PORT || 3000;
const BASE = '/opt/gtm-studio';
const BUILDS = path.join(BASE, 'builds');
const AGENT_LOGS = path.join(BUILDS, 'agent-logs');
const DOCS = path.join(BASE, 'docs');
const MANIFEST = path.join(BASE, 'manifest');

app.use(express.json());

// Ensure directories exist at startup
[AGENT_LOGS, path.join(BUILDS, 'feedback'), MANIFEST, DOCS,
 path.join(BASE, 'assets', 'originals', 'sprites'),
 path.join(BASE, 'assets', 'originals', 'tiles'),
 path.join(BASE, 'assets', 'originals', 'ui'),
 path.join(BASE, 'assets', 'sprites'),
 path.join(BASE, 'assets', 'tiles'),
 path.join(BASE, 'assets', 'ui'),
 path.join(DOCS, 'assets', 'sprites'),
 path.join(DOCS, 'assets', 'tiles'),
 path.join(DOCS, 'assets', 'ui')
].forEach(d => fs.mkdirSync(d, { recursive: true }));

// ── SSE ─────────────────────────────────────────────────────────────────────

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

// SSE heartbeat every 30s
setInterval(() => {
  for (const res of sseClients) { try { res.write(': heartbeat\n\n'); } catch (_) {} }
}, 30000);

// ── Module-level state ──────────────────────────────────────────────────────

let isRunning = false;
let currentRoundType = null;
let batchState = null;

// ── Agent Roster ────────────────────────────────────────────────────────────

const AGENTS = {
  'vivian-cross':    { name: 'Vivian Cross',    role: 'Executive Director', emoji: '👔', model: 'claude-opus-4-20250514' },
  'luna-reyes':      { name: 'Luna Reyes',      role: 'Creative Director',  emoji: '🎬', model: 'claude-sonnet-4-20250514' },
  'marcus-webb':     { name: 'Marcus Webb',      role: 'Tech Lead',          emoji: '🏗️', model: 'claude-opus-4-20250514' },
  'sage-moretti':    { name: 'Sage Moretti',     role: 'Writer',             emoji: '✍️', model: 'claude-sonnet-4-20250514' },
  'felix-park':      { name: 'Felix Park',       role: 'Game Designer',      emoji: '🎮', model: 'claude-sonnet-4-20250514' },
  'priya-vasquez':   { name: 'Priya Vasquez',    role: 'Art Director',       emoji: '🎨', model: 'claude-sonnet-4-20250514' },
  'iris-nakamura':   { name: 'Iris Nakamura',    role: 'Asset Generator',    emoji: '🖼️', model: 'api' },
  'ren-tanaka':      { name: 'Ren Tanaka',       role: 'Producer',           emoji: '📋', model: 'claude-sonnet-4-20250514' },
  'atlas-novak':     { name: 'Atlas Novak',      role: 'Developer',          emoji: '💻', model: 'claude-opus-4-20250514' },
  'bea-ortiz':       { name: 'Bea Ortiz',        role: 'QA Playtester',      emoji: '🕹️', model: 'claude-opus-4-20250514' },
};

// ── Game Vision ─────────────────────────────────────────────────────────────

const GAME_VISION = `SaaS Quest: Startup Simulator — 16-bit top-down SaaS startup RPG. Stardew Valley meets Silicon Valley (the show) meets Earthbound.
Player: Tech co-founder, $150K angel funding, hoodie, coffee, tired eyes.
Co-Founder Jordan: Mysterious NPC, glasses, messy hair, cryptic dialogue, secret depends on endgame path.
Core Loop: Each day = 1 week. 5 Action Points. Morning: email/dashboard. Afternoon: spend AP. Evening: results.
NPCs: Maya Chen (first dev), Derek Williams (sales gong guy), Gina (all-knowing barista), Chad Thunderpitch (rival).
Economy: MRR from customers ($49-$999/mo), hire named employees with stats, fundraising dilutes ownership.
Endgame: IPO Glory, Profit Machine, R&D Utopia, World Domination.
Art: SNES-era pixel art, 640x360 native, 2x scale, warm amber/teal palette.`;

// ── Manifest Helpers ────────────────────────────────────────────────────────

function readManifest(filename) {
  try { return JSON.parse(fs.readFileSync(path.join(MANIFEST, filename), 'utf8')); }
  catch(e) { return null; }
}

function writeManifest(filename, data) {
  fs.writeFileSync(path.join(MANIFEST, filename), JSON.stringify(data, null, 2));
}

// ── Feedback System ─────────────────────────────────────────────────────────

function readFeedback() {
  const feedbackPath = path.join(BUILDS, 'sean-feedback.md');
  try { return fs.readFileSync(feedbackPath, 'utf8'); } catch(e) { return ''; }
}

function archiveFeedback(round) {
  const feedbackPath = path.join(BUILDS, 'sean-feedback.md');
  const archivePath = path.join(BUILDS, 'feedback', `round-${round}-feedback.md`);
  try {
    const content = fs.readFileSync(feedbackPath, 'utf8');
    if (content.trim()) {
      fs.writeFileSync(archivePath, content);
      fs.writeFileSync(feedbackPath, '');
    }
  } catch(e) {}
}

// ── runAgent ────────────────────────────────────────────────────────────────

async function runAgent(agentId, model, prompt, timeoutMs = 300000) {
  const tmpFile = `/tmp/gtm-${agentId}.txt`;
  try { fs.unlinkSync(tmpFile); } catch(_) {}
  fs.writeFileSync(tmpFile, prompt);
  try { execSync(`chown gtm:gtm ${tmpFile}`); } catch(_) {}

  return new Promise((resolve, reject) => {
    const proc = spawn('su', ['-', 'gtm', '-s', '/bin/bash', '-c',
      `claude --model ${model} --print --tools "" < ${tmpFile}`
    ], { timeout: timeoutMs });

    let stdout = '';
    let stderr = '';
    proc.stdout.on('data', d => stdout += d);
    proc.stderr.on('data', d => stderr += d);
    proc.on('close', code => {
      try { fs.unlinkSync(tmpFile); } catch(e) {}
      if (code !== 0) {
        // If we got substantial stdout despite non-zero exit, use it
        if (stdout.length > 100) resolve(stdout);
        else reject(new Error(`Agent ${agentId} failed (code ${code}): ${stderr.slice(0, 500)}`));
      }
      else resolve(stdout);
    });
    proc.on('error', err => {
      try { fs.unlinkSync(tmpFile); } catch(e) {}
      reject(new Error(`Agent ${agentId} spawn error: ${err.message}`));
    });
  });
}

// ── Validation ──────────────────────────────────────────────────────────────

function validateEngineOutput(html, protectedSystems, previousHtml) {
  const errors = [];

  // 1. HTML structure
  if (!html.trim().startsWith('<!DOCTYPE') && !html.trim().startsWith('<html')) {
    errors.push('HTML_INVALID: Output does not start with <!DOCTYPE or <html');
  }

  // 2. Protected systems check
  if (protectedSystems && protectedSystems.protected) {
    for (const sys of protectedSystems.protected) {
      for (const fn of sys.signature_functions) {
        const patterns = [
          new RegExp(`function\\s+${fn}\\s*\\(`),
          new RegExp(`const\\s+${fn}\\s*=`),
          new RegExp(`let\\s+${fn}\\s*=`),
          new RegExp(`var\\s+${fn}\\s*=`)
        ];
        const found = patterns.some(p => p.test(html));
        if (!found) {
          errors.push(`PROTECTED_MISSING: Function "${fn}" from protected system "${sys.system}" not found in output`);
        }
      }
    }
  }

  // 3. Size sanity — skip ratio check for early builds under 5000 chars
  if (previousHtml && previousHtml.length >= 5000) {
    const ratio = html.length / previousHtml.length;
    if (ratio < 0.5) errors.push(`SIZE_SHRUNK: Output is ${Math.round(ratio * 100)}% of previous size — possible truncation`);
    if (ratio > 3.0) errors.push(`SIZE_BLOATED: Output is ${Math.round(ratio * 100)}% of previous size — suspicious`);
  }

  // 4. Economy sanity
  if (!html.includes('150000') && !html.includes('150,000') && !html.includes('150_000')) {
    errors.push('ECONOMY_WRONG: $150,000 starting cash not found in output');
  }

  return errors;
}

// ── Iris (Asset Generator — API, not Claude) ────────────────────────────────

async function generateAsset(assetId, prompt, subfolder = 'sprites', targetWidth = 32, targetHeight = 48) {
  const apiKey = process.env.GOOGLE_AI_API_KEY;
  if (!apiKey) {
    console.error('GOOGLE_AI_API_KEY not set — skipping asset generation');
    return null;
  }

  try {
    const ratio = targetWidth / targetHeight;
    let aspectRatio = '1:1';
    if (ratio < 0.85) aspectRatio = '3:4';
    else if (ratio > 1.15) aspectRatio = '4:3';

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
          parameters: { sampleCount: 1, aspectRatio }
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

    const registryPath = path.join(BUILDS, 'asset-registry.json');
    let registry = { version: 1, assets: {} };
    try { registry = JSON.parse(fs.readFileSync(registryPath, 'utf8')); } catch(e) {}

    const existing = registry.assets[assetId];
    const version = existing ? existing.version + 1 : 1;
    const filename = `${assetId}_v${version}.png`;
    const originalFilename = `${assetId}_v${version}_original.png`;

    const originalBuffer = Buffer.from(b64, 'base64');
    const originalPath = path.join(BASE, 'assets', 'originals', subfolder, originalFilename);
    fs.mkdirSync(path.dirname(originalPath), { recursive: true });
    fs.writeFileSync(originalPath, originalBuffer);
    console.log(`[Iris] Saved original: ${originalFilename} (${originalBuffer.length} bytes)`);

    const gameReadyPath = path.join(BASE, 'assets', subfolder, filename);
    fs.mkdirSync(path.dirname(gameReadyPath), { recursive: true });
    await sharp(originalBuffer)
      .resize(targetWidth, targetHeight, { kernel: sharp.kernel.nearest, fit: 'fill' })
      .png()
      .toFile(gameReadyPath);

    const docsAssetPath = path.join(DOCS, 'assets', subfolder, filename);
    fs.mkdirSync(path.dirname(docsAssetPath), { recursive: true });
    fs.copyFileSync(gameReadyPath, docsAssetPath);

    console.log(`[Iris] Processed: ${filename} (${targetWidth}x${targetHeight})`);

    return { filename, originalFilename, version, path: `assets/${subfolder}/${filename}`, targetWidth, targetHeight };
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
  broadcast({ type: 'agent_start', round, agentId: 'iris-nakamura', agentName: 'Iris Nakamura', displayName: 'Asset Generator', emoji: '🖼️', model: 'api' });

  const registryPath = path.join(BUILDS, 'asset-registry.json');
  let registry = { assets: {} };
  try { registry = JSON.parse(fs.readFileSync(registryPath, 'utf8')); } catch(e) {}

  const assetMatch = priyaOutput.match(/<!-- ASSET_REQUESTS_START -->([\s\S]*?)<!-- ASSET_REQUESTS_END -->/);

  if (!assetMatch) {
    console.log('[Iris] No asset requests found in Art Spec — skipping generation');
    const skipReport = `# Iris Asset Generation Report — Round ${round}\n\nNo asset requests found in Art Spec. Skipping.\n`;
    fs.writeFileSync(path.join(AGENT_LOGS, `round-${round}-iris.md`), skipReport);
    broadcast({ type: 'agent_complete', round, agentId: 'iris-nakamura', agentName: 'Iris Nakamura', displayName: 'Asset Generator', emoji: '🖼️', outputLength: 0 });
    return { generated: [], skipped: [], report: skipReport };
  }

  let assetRequests = [];
  try {
    assetRequests = JSON.parse(assetMatch[1].trim());
  } catch(e) {
    console.error('[Iris] Failed to parse asset requests JSON:', e.message);
    const errReport = `# Iris Asset Generation Report — Round ${round}\n\nFailed to parse asset requests: ${e.message}\n`;
    fs.writeFileSync(path.join(AGENT_LOGS, `round-${round}-iris.md`), errReport);
    broadcast({ type: 'agent_complete', round, agentId: 'iris-nakamura', agentName: 'Iris Nakamura', displayName: 'Asset Generator', emoji: '🖼️', outputLength: 0 });
    return { generated: [], skipped: [], report: errReport };
  }

  if (assetRequests.length > 5) {
    console.log(`[Iris] Capping asset requests from ${assetRequests.length} to 5`);
    assetRequests = assetRequests.slice(0, 5);
  }

  const generated = [];
  const skipped = [];

  for (const req of assetRequests) {
    const { asset_id, prompt, subfolder = 'sprites', force_regenerate = false, style_notes = '', target_width = 32, target_height = 48 } = req;

    const existing = registry.assets[asset_id];
    if (existing && existing.status === 'approved' && !force_regenerate) {
      console.log(`[Iris] Skipping approved asset: ${asset_id}`);
      skipped.push(asset_id);
      continue;
    }

    if (generated.length > 0) {
      console.log('[Iris] Rate limit pause (10s)...');
      await new Promise(resolve => setTimeout(resolve, 10000));
    }

    const result = await generateAsset(asset_id, prompt, subfolder, target_width, target_height);
    if (result) {
      updateAssetRegistry(asset_id, result, prompt, round, style_notes, target_width, target_height);
      generated.push({ asset_id, ...result });
      broadcast({ type: 'asset_complete', round, assetId: asset_id, filename: result.filename });
      console.log(`[Iris] Done: ${asset_id} -> ${result.filename} (${target_width}x${target_height})`);
    } else {
      skipped.push(asset_id);
      broadcast({ type: 'asset_skipped', round, assetId: asset_id });
      console.log(`[Iris] Failed: ${asset_id}`);
    }
  }

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

  fs.writeFileSync(path.join(AGENT_LOGS, `round-${round}-iris.md`), irisReport);
  broadcast({ type: 'agent_complete', round, agentId: 'iris-nakamura', agentName: 'Iris Nakamura', displayName: 'Asset Generator', emoji: '🖼️', outputLength: irisReport.length });

  return { generated, skipped, report: irisReport };
}

// ── HTML Extraction Helpers ─────────────────────────────────────────────────

function extractHtmlAndReport(rawOutput) {
  let gameHtml = rawOutput;
  let buildReport = '';

  // Layer 0: If output is wrapped in tool_use/tool_call XML, extract the HTML content from the JSON field
  const toolContentMatch = rawOutput.match(/"content"\s*:\s*"((?:[^"\\]|\\.)*)"/);
  if (toolContentMatch && toolContentMatch[1].includes('<!DOCTYPE')) {
    try {
      gameHtml = JSON.parse('"' + toolContentMatch[1] + '"');
    } catch(e) {
      // JSON unescape failed, fall through to normal extraction
    }
  }

  // Extract build report from raw output first (before fence stripping mangles markers)
  const reportMatch = gameHtml.match(/<!-- BUILD_REPORT_START -->([\s\S]*?)<!-- BUILD_REPORT_END -->/);
  if (!reportMatch) {
    const rawReportMatch = rawOutput.match(/<!-- BUILD_REPORT_START -->([\s\S]*?)<!-- BUILD_REPORT_END -->/);
    if (rawReportMatch) buildReport = rawReportMatch[1].trim();
  } else {
    buildReport = reportMatch[1].trim();
  }

  // Layer 1: Aggressively strip markdown fences (with or without language tag, multiple blocks)
  gameHtml = gameHtml.replace(/^\s*```(?:html)?\s*\n?/gim, '').replace(/\n?\s*```\s*$/gim, '');

  // Layer 2: Find HTML boundaries — first <!DOCTYPE or <html, last </html>
  const doctypeIndex = gameHtml.search(/<!DOCTYPE/i);
  const htmlOpenIndex = gameHtml.search(/<html/i);
  const startIndex = doctypeIndex !== -1 ? doctypeIndex : htmlOpenIndex;
  if (startIndex > 0) {
    gameHtml = gameHtml.substring(startIndex);
  }

  // Trim after last </html>
  const lastClose = gameHtml.lastIndexOf('</html>');
  if (lastClose !== -1) {
    gameHtml = gameHtml.substring(0, lastClose + '</html>'.length);
  }

  // Layer 3: If still not starting with valid HTML, try regex extraction
  if (!gameHtml.trim().startsWith('<!DOCTYPE') && !gameHtml.trim().startsWith('<html')) {
    const htmlMatch = gameHtml.match(/(<!DOCTYPE[\s\S]*<\/html>)/i);
    if (htmlMatch) {
      gameHtml = htmlMatch[1];
    } else {
      // Layer 4: Check for Build Report or preamble text followed by HTML
      const preambleThenHtml = rawOutput.match(/(<!DOCTYPE[\s\S]*<\/html>)/i);
      if (preambleThenHtml) {
        gameHtml = preambleThenHtml[1];
      } else {
        return { gameHtml: null, buildReport: "" };
      }
    }
  }

  // Remove build report markers from the HTML body if present
  gameHtml = gameHtml.replace(/<!-- BUILD_REPORT_START -->[\s\S]*<!-- BUILD_REPORT_END -->/, '').trim();

  return { gameHtml, buildReport };
}

// ── Department Round Dispatch ───────────────────────────────────────────────

async function runRound(roundType, priority, note, broadcast) {
  const studioState = JSON.parse(fs.readFileSync(path.join(BUILDS, 'studio-state.json'), 'utf8'));
  const round = studioState.lastRound + 1;

  broadcast({ type: 'round_start', round, roundType });
  console.log(`\n=== ROUND ${round} (${roundType}) START ===`);

  let result;
  try {
    switch (roundType) {
      case 'engine':
        result = await runEngineRound(round, priority, note, broadcast);
        break;
      case 'story':
        result = await runStoryRound(round, priority, note, broadcast);
        break;
      case 'art':
        result = await runArtRound(round, priority, note, broadcast);
        break;
      case 'integration':
        result = await runIntegrationRound(round, priority, note, broadcast);
        break;
      case 'hotfix':
        result = await runHotfixRound(round, priority, note, broadcast);
        break;
      default:
        throw new Error(`Unknown round type: ${roundType}`);
    }
  } catch (err) {
    if (batchState && batchState.active) {
      batchState.active = false;
      batchState.stoppedReason = 'error';
      broadcast({ type: 'batch_stopped', reason: 'round_failed', completed: batchState.completedRounds, failedRound: round });
    }
    broadcast({ type: 'round_error', round, error: err.message });
    throw err;
  }

  // Update studio state
  studioState.lastRound = round;
  studioState.lastRoundType = roundType;
  studioState.lastQAVerdict = result.verdict || null;
  if (result.knownIssues) studioState.knownIssues = result.knownIssues;
  if (result.deferredWork) studioState.deferredWork = result.deferredWork;
  studioState.roundHistory.push({
    round, type: roundType, priority, verdict: result.verdict || 'complete',
    timestamp: new Date().toISOString()
  });
  fs.writeFileSync(path.join(BUILDS, 'studio-state.json'), JSON.stringify(studioState, null, 2));

  broadcast({ type: 'round_complete', round, roundType, verdict: result.verdict || 'complete' });
  console.log(`=== ROUND ${round} (${roundType}) COMPLETE — ${result.verdict || 'complete'} ===\n`);

  // Batch continuation logic
  if (batchState && batchState.active) {
    batchState.completedRounds++;
    const queue = readManifest('round-queue.json');
    const q = (queue && queue.queue) || [];
    if (q.length === 0) {
      batchState.active = false;
      batchState.stoppedReason = 'complete';
      broadcast({ type: 'batch_complete', reason: 'queue_empty', completed: batchState.completedRounds });
    } else if (q[0].type === 'integration' || q[0].type === 'hotfix') {
      batchState.active = false;
      batchState.stoppedReason = 'checkpoint';
      broadcast({ type: 'batch_paused', reason: 'checkpoint', completed: batchState.completedRounds, nextRound: q[0] });
    } else if (batchState.completedRounds >= batchState.totalRounds) {
      batchState.active = false;
      batchState.stoppedReason = 'complete';
      broadcast({ type: 'batch_complete', reason: 'batch_done', completed: batchState.completedRounds });
    } else {
      broadcast({ type: 'batch_progress', completed: batchState.completedRounds, total: batchState.totalRounds });
      setTimeout(() => triggerRunNext(), 3000);
    }
  }

  return result;
}

// ── ENGINE ROUND ────────────────────────────────────────────────────────────

async function runEngineRound(round, priority, note, broadcast) {
  const engineSpec = readManifest('engine-spec.json');
  const gameState = readManifest('game-state.json');
  const protectedSystems = readManifest('protected-systems.json');
  const feedback = readFeedback();
  const gameExists = fs.existsSync(path.join(BUILDS, 'game.html'));
  const currentGame = gameExists ? fs.readFileSync(path.join(BUILDS, 'game.html'), 'utf8') : '';

  // Game file context: full if under 3000 lines, truncated otherwise
  let gameContext = currentGame;
  if (currentGame) {
    const gameLines = currentGame.split('\n');
    if (gameLines.length > 3000) {
      const first80 = gameLines.slice(0, 80).join('\n');
      const last80 = gameLines.slice(-80).join('\n');
      gameContext = first80 + '\n\n... [TRUNCATED — ' + gameLines.length + ' total lines] ...\n\n' + last80;
    }
  }

  // Previous engine build report if exists
  let prevReport = '';
  try { prevReport = fs.readFileSync(path.join(AGENT_LOGS, `round-${round-1}-atlas-engine.md`), 'utf8'); } catch(e) {}

  // --- MARCUS (Tech Lead) ---
  const marcus = AGENTS['marcus-webb'];
  broadcast({ type: 'agent_start', round, agentId: 'marcus-webb', agentName: marcus.name, displayName: marcus.role, emoji: marcus.emoji, model: 'opus' });

  const marcusPrompt = `You are Marcus Webb, Tech Lead at GTM Studio. You are planning an ENGINE round for SaaS Quest.

GAME VISION:
${GAME_VISION}

ROUND PRIORITY: ${priority}
ROUND NOTE: ${note || 'None'}
${feedback ? `SEAN'S FEEDBACK:\n${feedback}` : ''}

CURRENT ENGINE SPEC:
${JSON.stringify(engineSpec, null, 2)}

CURRENT GAME STATE:
${JSON.stringify(gameState, null, 2)}

PROTECTED SYSTEMS (DO NOT MODIFY THESE):
${JSON.stringify(protectedSystems, null, 2)}

${prevReport ? `PREVIOUS ENGINE BUILD REPORT:\n${prevReport}` : ''}

YOUR TASK:
Write an Implementation Plan for Atlas (the Developer). Be specific about:
1. What systems to build or modify (reference engine-spec.json system names)
2. What function signatures to create
3. What MUST NOT change (reference protected systems by name)
4. Any updates to protected-systems.json (new protections to add)
5. Any updates to engine-spec.json (system status changes)

Output your plan in markdown. Be precise — Atlas will follow your plan literally.`;

  let marcusOutput;
  try {
    marcusOutput = await runAgent('marcus-webb', marcus.model, marcusPrompt);
    fs.writeFileSync(path.join(AGENT_LOGS, `round-${round}-marcus.md`), marcusOutput);
    broadcast({ type: 'agent_complete', round, agentId: 'marcus-webb', agentName: marcus.name, displayName: marcus.role, emoji: marcus.emoji, outputLength: marcusOutput.length });
  } catch (err) {
    broadcast({ type: 'agent_error', round, agentId: 'marcus-webb', error: err.message });
    throw err;
  }

  // --- ATLAS (Developer — Engine mode) ---
  const atlas = AGENTS['atlas-novak'];
  broadcast({ type: 'agent_start', round, agentId: 'atlas-novak', agentName: atlas.name, displayName: atlas.role, emoji: atlas.emoji, model: 'opus' });

  const atlasPrompt = `You are Atlas Novak, Developer at GTM Studio. This is an ENGINE round.

GAME VISION:
${GAME_VISION}

MARCUS'S IMPLEMENTATION PLAN:
${marcusOutput}

PROTECTED SYSTEMS — DO NOT MODIFY THESE FUNCTIONS:
${JSON.stringify(protectedSystems, null, 2)}

ENGINE SPEC:
${JSON.stringify(engineSpec, null, 2)}

CURRENT game.html:
${(!currentGame || currentGame.trim() === '<!-- empty -->') ? '(No game.html exists yet — you must create the COMPLETE game.html from scratch starting with <!DOCTYPE html>)' : currentGame}

YOUR TASK:
Implement Marcus's plan. Output the COMPLETE updated game.html file.

CRITICAL RULES:
- Your output MUST start with <!DOCTYPE html> or <html
- Your output MUST be a complete, self-contained HTML file
- Do NOT output any text before the HTML — no explanations, no markdown
- All protected system functions MUST remain intact (check the signature_functions lists)
- Starting cash MUST be $150,000
- After the closing </html> tag, add a build report between these markers:
  <!-- BUILD_REPORT_START -->
  What changed, what was attempted but cut, what's fragile, recommendations for next round
  <!-- BUILD_REPORT_END -->`;

  let atlasOutput;
  try {
    atlasOutput = await runAgent('atlas-novak', atlas.model, atlasPrompt, 600000);
  } catch (err) {
    broadcast({ type: 'agent_error', round, agentId: 'atlas-novak', error: err.message });
    throw err;
  }

  // Diagnostic: save raw Atlas output BEFORE parsing so we can inspect failures
  console.log(`[DIAG] Atlas raw output length: ${atlasOutput.length}`);
  console.log(`[DIAG] Atlas raw output first 500 chars:\n${atlasOutput.slice(0, 500)}`);
  fs.writeFileSync(path.join(AGENT_LOGS, `round-${round}-atlas-raw.txt`), atlasOutput);

  // Parse Atlas output
  let { gameHtml, buildReport } = extractHtmlAndReport(atlasOutput);

  if (!gameHtml) {
    // Retry once with explicit instructions to output raw HTML
    console.log(`[DIAG] Atlas extraction failed — retrying with error context`);
    broadcast({ type: 'developer_retry', round, reason: 'extraction_failed' });
    const extractRetryPrompt = atlasPrompt + `\n\nYOUR PREVIOUS OUTPUT FAILED VALIDATION: Developer output is not valid HTML. You MUST output raw HTML starting with <!DOCTYPE html>. No markdown fences. No commentary before or after the HTML. The first character of your response must be '<'.`;
    try {
      atlasOutput = await runAgent('atlas-novak', atlas.model, extractRetryPrompt, 600000);
      fs.writeFileSync(path.join(AGENT_LOGS, `round-${round}-atlas-raw-retry.txt`), atlasOutput);
      const retry = extractHtmlAndReport(atlasOutput);
      if (!retry.gameHtml) {
        fs.writeFileSync(path.join(AGENT_LOGS, `round-${round}-atlas-engine.md`), '# FAILED — Output was not valid HTML even after retry\n\nSee round-' + round + '-atlas-raw.txt and round-' + round + '-atlas-raw-retry.txt for raw output.');
        broadcast({ type: 'agent_error', round, agentId: 'atlas-novak', error: 'Developer output is not valid HTML (retry also failed)' });
        throw new Error('Developer output is not valid HTML and no fallback found');
      }
      gameHtml = retry.gameHtml;
      buildReport = retry.buildReport;
    } catch (retryErr) {
      if (retryErr.message === 'Developer output is not valid HTML and no fallback found') throw retryErr;
      fs.writeFileSync(path.join(AGENT_LOGS, `round-${round}-atlas-engine.md`), '# FAILED — Retry execution error\n\n' + retryErr.message);
      broadcast({ type: 'agent_error', round, agentId: 'atlas-novak', error: 'Retry failed: ' + retryErr.message });
      throw new Error('Developer output is not valid HTML and no fallback found');
    }
  }

  // VALIDATION
  const validationErrors = validateEngineOutput(gameHtml, protectedSystems, currentGame || null);

  if (validationErrors.length > 0) {
    broadcast({ type: 'validation_failed', round, errors: validationErrors });

    // ONE RETRY
    broadcast({ type: 'developer_retry', round });
    const retryPrompt = atlasPrompt + `\n\nYOUR PREVIOUS OUTPUT FAILED VALIDATION:\n${validationErrors.join('\n')}\n\nFix these issues. Output the complete corrected game.html.`;

    try {
      atlasOutput = await runAgent('atlas-novak', atlas.model, retryPrompt, 600000);
      const retry = extractHtmlAndReport(atlasOutput);
      if (!retry.gameHtml) {
        return { verdict: 'reject', errors: ['Retry output is not valid HTML'] };
      }
      gameHtml = retry.gameHtml;
      buildReport = retry.buildReport;

      const retryErrors = validateEngineOutput(gameHtml, protectedSystems, currentGame || null);
      if (retryErrors.length > 0) {
        broadcast({ type: 'agent_error', round, agentId: 'atlas-novak', error: 'Retry also failed validation: ' + retryErrors.join('; ') });
        return { verdict: 'reject', errors: retryErrors };
      }
    } catch (err) {
      broadcast({ type: 'agent_error', round, agentId: 'atlas-novak', error: 'Retry failed: ' + err.message });
      return { verdict: 'reject', errors: ['Retry execution failed'] };
    }
  }

  // Save outputs
  fs.writeFileSync(path.join(BUILDS, 'game.html'), gameHtml);
  fs.writeFileSync(path.join(DOCS, 'game.html'), gameHtml);
  fs.writeFileSync(path.join(AGENT_LOGS, `round-${round}-atlas-engine.md`), buildReport || 'No build report provided.');
  broadcast({ type: 'agent_complete', round, agentId: 'atlas-novak', agentName: atlas.name, displayName: atlas.role, emoji: atlas.emoji, outputLength: gameHtml.length });

  // Archive feedback
  archiveFeedback(round);

  // Git commit
  try {
    execSync(`cd ${BASE} && git add builds/game.html docs/game.html builds/agent-logs/ builds/studio-state.json manifest/`, { timeout: 15000 });
    execSync(`cd ${BASE} && git commit -m "Round ${round} (engine): ${priority} | Verdict: SHIP"`, { timeout: 15000 });
    execSync(`cd ${BASE} && git push origin v3-dev`, { timeout: 30000 });
    broadcast({ type: 'committed', round });
  } catch (err) {
    broadcast({ type: 'git_error', round, error: err.message });
  }

  return { verdict: 'ship' };
}

// ── STORY ROUND ─────────────────────────────────────────────────────────────

async function runStoryRound(round, priority, note, broadcast) {
  const gameState = readManifest('game-state.json');
  const storyState = readManifest('story-state.json') || { dialogue: {}, emails: {}, gazette_headlines: {} };
  const engineSpec = readManifest('engine-spec.json');
  const feedback = readFeedback();

  let bibleExcerpt = '';
  try { bibleExcerpt = fs.readFileSync(path.join(BASE, 'game-design-bible.md'), 'utf8').slice(0, 3000); } catch(e) {}

  // --- LUNA (Creative Director) ---
  const luna = AGENTS['luna-reyes'];
  broadcast({ type: 'agent_start', round, agentId: 'luna-reyes', agentName: luna.name, displayName: luna.role, emoji: luna.emoji, model: 'sonnet' });

  const lunaPrompt = `You are Luna Reyes, Creative Director at GTM Studio. This is a STORY round for SaaS Quest.

GAME VISION:
${GAME_VISION}

ROUND PRIORITY: ${priority}
ROUND NOTE: ${note || 'None'}
${feedback ? `SEAN'S FEEDBACK:\n${feedback}` : ''}

GAME DESIGN BIBLE (excerpt):
${bibleExcerpt}

CURRENT GAME STATE:
${JSON.stringify(gameState, null, 2)}

CURRENT STORY STATE:
${JSON.stringify(storyState, null, 2)}

IMPLEMENTED SYSTEMS (what the engine can currently do):
${JSON.stringify(engineSpec && engineSpec.systems ? Object.entries(engineSpec.systems).filter(([k,v]) => v.status === 'implemented').map(([k]) => k) : [], null, 2)}

YOUR TASK:
Write a Creative Brief for Sage (Writer) and Felix (Game Designer). Include:
1. Tone direction for this content
2. Which NPCs speak this round
3. Emotional beat target
4. What MUST be included
5. What is explicitly out of scope
6. IMPORTANT: Only reference locations in locations_available: ${JSON.stringify(gameState ? gameState.locations_available : [])}
7. IMPORTANT: Only reference NPCs in npcs or pending_npcs

Output in markdown.`;

  let lunaOutput;
  try {
    lunaOutput = await runAgent('luna-reyes', luna.model, lunaPrompt);
    fs.writeFileSync(path.join(AGENT_LOGS, `round-${round}-luna.md`), lunaOutput);
    broadcast({ type: 'agent_complete', round, agentId: 'luna-reyes', agentName: luna.name, displayName: luna.role, emoji: luna.emoji, outputLength: lunaOutput.length });
  } catch (err) {
    broadcast({ type: 'agent_error', round, agentId: 'luna-reyes', error: err.message });
    throw err;
  }

  // --- SAGE (Writer) ---
  const sage = AGENTS['sage-moretti'];
  broadcast({ type: 'agent_start', round, agentId: 'sage-moretti', agentName: sage.name, displayName: sage.role, emoji: sage.emoji, model: 'sonnet' });

  const sagePrompt = `You are Sage Moretti, Writer at GTM Studio. This is a STORY round.

GAME VISION:
${GAME_VISION}

LUNA'S CREATIVE BRIEF:
${lunaOutput}

GAME DESIGN BIBLE (excerpt):
${bibleExcerpt}

CURRENT STORY STATE (existing dialogue):
${JSON.stringify(storyState, null, 2)}

YOUR TASK:
Write a Content Package. Output ALL content as structured JSON blocks that can be merged into story-state.json.

For dialogue, use this format:
\`\`\`json
{
  "dialogue": {
    "npc_id": {
      "day_N": [
        {
          "id": "unique_dialogue_id",
          "trigger": "walk_past | interact | event",
          "text": "The dialogue line",
          "player_responses": [
            { "id": "a", "text": "Response option A", "effect": null },
            { "id": "b", "text": "Response option B", "effect": { "jordan_relationship": 1 } }
          ]
        }
      ]
    }
  }
}
\`\`\`

For emails:
\`\`\`json
{
  "emails": {
    "day_N": [
      {
        "id": "unique_email_id",
        "sender": "Name",
        "sender_company": "Company",
        "subject": "Subject line",
        "body": "Email body",
        "requires_response": false,
        "emotional_intent": "destabilize | encourage | inform"
      }
    ]
  }
}
\`\`\`

For Gazette headlines:
\`\`\`json
{
  "gazette_headlines": {
    "day_N": ["Headline 1", "Headline 2"]
  }
}
\`\`\`

RULES:
- Only reference NPCs that exist in game-state or are in pending_npcs
- Only reference locations in locations_available
- All dialogue IDs must be unique
- Every player response option must feel like a real person would say it
- Jordan's dialogue follows Jordan's writing style: specific numbers, no startup jargon, alternating sentence lengths
- Include role_variants where appropriate (seller/dev/marketer variations)`;

  let sageOutput;
  try {
    sageOutput = await runAgent('sage-moretti', sage.model, sagePrompt);
    fs.writeFileSync(path.join(AGENT_LOGS, `round-${round}-sage.md`), sageOutput);
    broadcast({ type: 'agent_complete', round, agentId: 'sage-moretti', agentName: sage.name, displayName: sage.role, emoji: sage.emoji, outputLength: sageOutput.length });
  } catch (err) {
    broadcast({ type: 'agent_error', round, agentId: 'sage-moretti', error: err.message });
    throw err;
  }

  // --- FELIX (Game Designer) ---
  const felix = AGENTS['felix-park'];
  broadcast({ type: 'agent_start', round, agentId: 'felix-park', agentName: felix.name, displayName: felix.role, emoji: felix.emoji, model: 'sonnet' });

  const felixPrompt = `You are Felix Park, Game Designer at GTM Studio. This is a STORY round.

GAME VISION:
${GAME_VISION}

LUNA'S CREATIVE BRIEF:
${lunaOutput}

CURRENT GAME STATE:
${JSON.stringify(gameState, null, 2)}

IMPLEMENTED SYSTEMS:
${JSON.stringify(engineSpec && engineSpec.systems ? Object.entries(engineSpec.systems).filter(([k,v]) => v.status === 'implemented').map(([k]) => k) : [], null, 2)}

YOUR TASK:
Write a Design Spec covering:
1. Mechanical definitions (AP costs for activities, stat effects, economy numbers)
2. Interaction flows (what happens when player walks to NPC, interacts with object)
3. NPC behavior rules (where they stand, what triggers dialogue)
4. Any new game-state entries needed (new NPCs, new interactables)

Output as markdown with embedded JSON blocks where precision is needed.

RULES:
- Economy must balance: starting cash $150K, don't burn faster than the design supports
- AP costs must use the role modifier table: Seller/Dev/Marketer get +1/-1 on different activities
- Only design for systems that are implemented or being built this sprint
- If a system isn't implemented yet, flag it as a dependency, don't design around it`;

  let felixOutput;
  try {
    felixOutput = await runAgent('felix-park', felix.model, felixPrompt);
    fs.writeFileSync(path.join(AGENT_LOGS, `round-${round}-felix.md`), felixOutput);
    broadcast({ type: 'agent_complete', round, agentId: 'felix-park', agentName: felix.name, displayName: felix.role, emoji: felix.emoji, outputLength: felixOutput.length });
  } catch (err) {
    broadcast({ type: 'agent_error', round, agentId: 'felix-park', error: err.message });
    throw err;
  }

  // Update story-state.json with Sage's content (merge, don't overwrite)
  try {
    const jsonBlocks = sageOutput.match(/```json\n([\s\S]*?)```/g);
    if (jsonBlocks) {
      for (const block of jsonBlocks) {
        const json = JSON.parse(block.replace(/```json\n/, '').replace(/```/, ''));
        if (json.dialogue) {
          storyState.dialogue = storyState.dialogue || {};
          for (const [npc, days] of Object.entries(json.dialogue)) {
            storyState.dialogue[npc] = storyState.dialogue[npc] || {};
            Object.assign(storyState.dialogue[npc], days);
          }
        }
        if (json.emails) {
          storyState.emails = storyState.emails || {};
          Object.assign(storyState.emails, json.emails);
        }
        if (json.gazette_headlines) {
          storyState.gazette_headlines = storyState.gazette_headlines || {};
          Object.assign(storyState.gazette_headlines, json.gazette_headlines);
        }
      }
      storyState.last_updated_round = round;
      writeManifest('story-state.json', storyState);
    }
  } catch (e) {
    console.error('Failed to merge Sage output into story-state:', e.message);
  }

  // Archive feedback
  archiveFeedback(round);

  // Git commit
  try {
    execSync(`cd ${BASE} && git add manifest/story-state.json builds/agent-logs/`, { timeout: 15000 });
    execSync(`cd ${BASE} && git commit -m "Round ${round} (story): ${priority}"`, { timeout: 15000 });
    execSync(`cd ${BASE} && git push origin v3-dev`, { timeout: 30000 });
    broadcast({ type: 'committed', round });
  } catch (err) {
    broadcast({ type: 'git_error', round, error: err.message });
  }

  return { verdict: 'complete' };
}

// ── ART ROUND ───────────────────────────────────────────────────────────────

async function runArtRound(round, priority, note, broadcast) {
  const artState = readManifest('art-state.json') || { assets: {}, last_updated_round: 0 };
  const gameState = readManifest('game-state.json');
  const storyState = readManifest('story-state.json');
  const feedback = readFeedback();

  // --- PRIYA (Art Director) ---
  const priya = AGENTS['priya-vasquez'];
  broadcast({ type: 'agent_start', round, agentId: 'priya-vasquez', agentName: priya.name, displayName: priya.role, emoji: priya.emoji, model: 'sonnet' });

  const priyaPrompt = `You are Priya "Pixel" Vasquez, Art Director at GTM Studio. This is an ART round.

GAME VISION:
${GAME_VISION}

ROUND PRIORITY: ${priority}
ROUND NOTE: ${note || 'None'}
${feedback ? `SEAN'S FEEDBACK:\n${feedback}` : ''}

CURRENT ART STATE:
${JSON.stringify(artState, null, 2)}

CURRENT NPCs (need sprites):
${JSON.stringify(gameState ? gameState.npcs : [], null, 2)}

PENDING NPCs FROM STORY:
${JSON.stringify(storyState && storyState.pending_npcs ? storyState.pending_npcs : [], null, 2)}

LOCATIONS IMPLEMENTED:
${JSON.stringify(gameState ? gameState.locations_implemented : [], null, 2)}

YOUR TASK:
1. Write Art Direction notes for this round
2. Output a structured asset request block for Iris (the Asset Generator)

At the END of your output, include asset requests between these exact markers:

<!-- ASSET_REQUESTS_START -->
[
  {
    "asset_id": "npc_jordan_idle",
    "prompt": "16-bit pixel art character sprite, SNES Stardew Valley style, [specific visual description], warm amber and teal palette, transparent background, clean linework, retro nostalgic feel",
    "subfolder": "sprites",
    "target_width": 32,
    "target_height": 48,
    "force_regenerate": false,
    "style_notes": "description of what must read clearly at target size"
  }
]
<!-- ASSET_REQUESTS_END -->

RULES:
- Maximum 5 asset requests per round ($0.03 per image)
- Only request NEW assets or assets flagged for revision (status: needs_revision)
- Don't regenerate approved assets unless force_regenerate is true
- Prompts MUST include: "16-bit pixel art", "SNES" reference, specific palette colors
- Use descriptive asset_ids: npc_{name}_{state}, tile_{type}_{variant}, ui_{element}
- Target dimensions: characters 32x48, tiles 16x16 or 32x32, UI varies
- If no new assets needed, output an empty array between the markers`;

  let priyaOutput;
  try {
    priyaOutput = await runAgent('priya-vasquez', priya.model, priyaPrompt);
    fs.writeFileSync(path.join(AGENT_LOGS, `round-${round}-priya.md`), priyaOutput);
    broadcast({ type: 'agent_complete', round, agentId: 'priya-vasquez', agentName: priya.name, displayName: priya.role, emoji: priya.emoji, outputLength: priyaOutput.length });
  } catch (err) {
    broadcast({ type: 'agent_error', round, agentId: 'priya-vasquez', error: err.message });
    throw err;
  }

  // --- IRIS (Asset Generator — API calls, not Claude) ---
  const irisResult = await runIris(round, priyaOutput, broadcast);

  // Update art-state.json
  artState.last_updated_round = round;
  writeManifest('art-state.json', artState);

  // Archive feedback
  archiveFeedback(round);

  // Git commit
  try {
    execSync(`cd ${BASE} && git add manifest/art-state.json builds/agent-logs/ assets/ docs/assets/ builds/asset-registry.json`, { timeout: 15000 });
    execSync(`cd ${BASE} && git commit -m "Round ${round} (art): ${priority} | Assets: ${irisResult.generated.length} generated"`, { timeout: 15000 });
    execSync(`cd ${BASE} && git push origin v3-dev`, { timeout: 30000 });
    broadcast({ type: 'committed', round });
  } catch (err) {
    broadcast({ type: 'git_error', round, error: err.message });
  }

  return { verdict: 'complete' };
}

// ── INTEGRATION ROUND ───────────────────────────────────────────────────────

async function runIntegrationRound(round, priority, note, broadcast) {
  const gameState = readManifest('game-state.json');
  const storyState = readManifest('story-state.json') || {};
  const artState = readManifest('art-state.json') || {};
  const engineSpec = readManifest('engine-spec.json');
  const protectedSystems = readManifest('protected-systems.json');
  const studioState = JSON.parse(fs.readFileSync(path.join(BUILDS, 'studio-state.json'), 'utf8'));
  const gameExists = fs.existsSync(path.join(BUILDS, 'game.html'));
  const currentGame = gameExists ? fs.readFileSync(path.join(BUILDS, 'game.html'), 'utf8') : '';
  const feedback = readFeedback();

  // Gather all department logs since last integration
  let recentLogs = '';
  const lastIntegration = studioState.roundHistory.filter(r => r.type === 'integration').pop();
  const since = lastIntegration ? lastIntegration.round : 0;
  for (let r = since + 1; r < round; r++) {
    const logFiles = ['marcus', 'luna', 'sage', 'felix', 'priya', 'iris', 'atlas-engine'];
    for (const agent of logFiles) {
      try {
        const log = fs.readFileSync(path.join(AGENT_LOGS, `round-${r}-${agent}.md`), 'utf8');
        if (log) recentLogs += `\n--- Round ${r} ${agent} ---\n${log.slice(0, 1500)}\n`;
      } catch(e) {}
    }
  }

  // --- VIVIAN (Executive Director) ---
  const vivian = AGENTS['vivian-cross'];
  broadcast({ type: 'agent_start', round, agentId: 'vivian-cross', agentName: vivian.name, displayName: vivian.role, emoji: vivian.emoji, model: 'opus' });

  const vivianPrompt = `You are Vivian Cross, Executive Director of GTM Studio. This is an INTEGRATION round.

GAME VISION:
${GAME_VISION}

ROUND PRIORITY: ${priority}
ROUND NOTE: ${note || 'None'}
${feedback ? `SEAN'S FEEDBACK:\n${feedback}` : ''}

STUDIO STATE:
${JSON.stringify(studioState, null, 2)}

DEPARTMENT OUTPUTS SINCE LAST INTEGRATION:
${recentLogs || 'No department rounds since last integration.'}

YOUR TASK:
Write an Integration Directive:
1. Priority order for merging department outputs (what goes in first)
2. Known conflicts to watch for
3. Quality bar for this integration
4. Deferred work to carry forward
5. The ONE thing this integration MUST accomplish`;

  let vivianOutput;
  try {
    vivianOutput = await runAgent('vivian-cross', vivian.model, vivianPrompt);
    fs.writeFileSync(path.join(AGENT_LOGS, `round-${round}-vivian.md`), vivianOutput);
    broadcast({ type: 'agent_complete', round, agentId: 'vivian-cross', agentName: vivian.name, displayName: vivian.role, emoji: vivian.emoji, outputLength: vivianOutput.length });
  } catch (err) {
    broadcast({ type: 'agent_error', round, agentId: 'vivian-cross', error: err.message });
    throw err;
  }

  // --- REN (Producer) ---
  const ren = AGENTS['ren-tanaka'];
  broadcast({ type: 'agent_start', round, agentId: 'ren-tanaka', agentName: ren.name, displayName: ren.role, emoji: ren.emoji, model: 'sonnet' });

  const renPrompt = `You are Ren Tanaka, Producer at GTM Studio. This is an INTEGRATION round.

VIVIAN'S INTEGRATION DIRECTIVE:
${vivianOutput}

CURRENT GAME STATE:
${JSON.stringify(gameState, null, 2)}

DEPARTMENT OUTPUTS TO INTEGRATE:
${recentLogs || 'No new department outputs.'}

STORY STATE (new content):
${JSON.stringify(storyState, null, 2)}

ART STATE (available assets):
${JSON.stringify(artState.assets || {}, null, 2)}

YOUR TASK:
Write a Scoped Integration Plan:
1. What goes in (ordered list with specific items)
2. What gets cut or deferred (with reason)
3. Unresolved cross-department references (warnings)
4. The ONE thing this integration MUST accomplish

Be ruthless about scope. Better to ship 3 things that work than 8 things that are half-baked.`;

  let renOutput;
  try {
    renOutput = await runAgent('ren-tanaka', ren.model, renPrompt);
    fs.writeFileSync(path.join(AGENT_LOGS, `round-${round}-ren.md`), renOutput);
    broadcast({ type: 'agent_complete', round, agentId: 'ren-tanaka', agentName: ren.name, displayName: ren.role, emoji: ren.emoji, outputLength: renOutput.length });
  } catch (err) {
    broadcast({ type: 'agent_error', round, agentId: 'ren-tanaka', error: err.message });
    throw err;
  }

  // --- MARCUS (Tech Lead — Integration mode) ---
  const marcus = AGENTS['marcus-webb'];
  broadcast({ type: 'agent_start', round, agentId: 'marcus-webb', agentName: marcus.name, displayName: marcus.role, emoji: marcus.emoji, model: 'opus' });

  // Load game.html for Marcus's context (truncate if very large)
  let gameHtmlForMarcus = currentGame || '(No game.html yet)';
  if (currentGame && currentGame.split('\n').length > 3000) {
    gameHtmlForMarcus = currentGame.slice(0, 2000) + '\n... [TRUNCATED] ...\n' + currentGame.slice(-2000);
  }

  const marcusIntPrompt = `You are Marcus Webb, Tech Lead for SaaS Quest. You are providing the Technical Assembly Plan for an integration round.

Ren Tanaka (Producer) has scoped what goes into this build:

${renOutput}

Here is the current game.html:
${gameHtmlForMarcus}

Here is the engine spec:
${JSON.stringify(engineSpec, null, 2)}

Here are the protected systems that MUST NOT be modified:
${JSON.stringify(protectedSystems, null, 2)}

Here are the department outputs being integrated:
${recentLogs || 'No department rounds since last integration.'}

Write a TECHNICAL ASSEMBLY PLAN for the Developer (Atlas Novak). Be specific:

1. MERGE ORDER — which changes apply first, second, third (engine changes before story content before art wiring)
2. PROTECTED SYSTEMS — list every function name from protected-systems.json that Atlas must verify still exists after his changes
3. NEW FUNCTION SIGNATURES — if any new functions need to be created, specify their names and parameters
4. DATA INTEGRATION — how new dialogue JSON, NPC data, or asset references should be wired into the existing code structure
5. DANGER ZONES — specific areas of game.html that are fragile or tightly coupled, where Atlas must be careful
6. EXPECTED OUTPUT SIZE — rough estimate of how large the final game.html should be (based on current size + additions)

Do NOT write any code. Just the plan. Atlas will write the code.`;

  let marcusOutput;
  try {
    marcusOutput = await runAgent('marcus-webb', marcus.model, marcusIntPrompt);
    fs.writeFileSync(path.join(AGENT_LOGS, `round-${round}-marcus.md`), marcusOutput);
    broadcast({ type: 'agent_complete', round, agentId: 'marcus-webb', agentName: marcus.name, displayName: marcus.role, emoji: marcus.emoji, outputLength: marcusOutput.length });
  } catch (err) {
    broadcast({ type: 'agent_error', round, agentId: 'marcus-webb', error: err.message });
    throw err;
  }

  // --- ATLAS (Developer — Integration mode) ---
  const atlas = AGENTS['atlas-novak'];
  broadcast({ type: 'agent_start', round, agentId: 'atlas-novak', agentName: atlas.name, displayName: atlas.role, emoji: atlas.emoji, model: 'opus' });

  // Build compact context for Atlas — lean prompt to avoid context overload
  const protectedFnList = (protectedSystems && protectedSystems.protected)
    ? protectedSystems.protected.flatMap(s => s.signature_functions).join(', ')
    : 'none';

  const engineSystemsSummary = (engineSpec && engineSpec.systems)
    ? Object.entries(engineSpec.systems).map(([k, v]) => `  ${k}: ${v.status}`).join('\n')
    : '(no engine spec)';

  let storyDelta = '(No pending story content)';
  if (storyState && Object.keys(storyState).length > 0) {
    const delta = {};
    if (storyState.pending_content) delta.pending_content = storyState.pending_content;
    if (storyState.pending_npcs) delta.pending_npcs = storyState.pending_npcs;
    if (Object.keys(delta).length > 0) {
      storyDelta = JSON.stringify(delta, null, 2);
    } else if (storyState.dialogue || storyState.emails) {
      storyDelta = `Available: ${storyState.dialogue ? Object.keys(storyState.dialogue).length + ' NPCs with dialogue' : '0 NPCs'}, ${storyState.emails ? Object.keys(storyState.emails).length + ' email days' : '0 email days'}`;
    }
  }

  let artDelta = '(No pending art assets)';
  if (artState && artState.assets) {
    const pending = {};
    for (const [id, a] of Object.entries(artState.assets)) {
      if (a.status === 'pending' || a.status === 'needs_revision') {
        pending[id] = { file: a.file, status: a.status };
      }
    }
    if (Object.keys(pending).length > 0) {
      artDelta = JSON.stringify(pending, null, 2);
    }
  }

  const atlasIntPrompt = `You are Atlas Novak, Developer at GTM Studio. This is an INTEGRATION round.

REN'S SCOPED INTEGRATION PLAN:
${renOutput}

PROTECTED FUNCTIONS (do not remove or rename):
${protectedFnList}

ENGINE SYSTEMS (current status):
${engineSystemsSummary}

NEW STORY CONTENT TO INTEGRATE:
${storyDelta}

NEW ART ASSETS TO WIRE:
${artDelta}

CURRENT game.html:
${currentGame || '(No game.html yet — create the first version)'}

YOUR TASK:
Follow Ren's plan above. Modify the current game.html to integrate the scoped changes.

CRITICAL RULES:
- Output MUST start with <!DOCTYPE html> — no preamble, no markdown
- Complete, self-contained HTML file
- All protected functions MUST remain intact
- Starting cash = $150,000
- Fallback to colored rectangles for missing sprites:
  if (GAME_ASSETS[id]) ctx.drawImage(...) else ctx.fillRect(...)
- ctx.imageSmoothingEnabled = false before drawing any sprites
- After </html>, include build report between markers:
  <!-- BUILD_REPORT_START --> ... <!-- BUILD_REPORT_END -->`;

  let atlasOutput;
  try {
    atlasOutput = await runAgent('atlas-novak', atlas.model, atlasIntPrompt, 600000);
  } catch (err) {
    broadcast({ type: 'agent_error', round, agentId: 'atlas-novak', error: err.message });
    throw err;
  }

  // Diagnostic: save raw Atlas output BEFORE parsing
  console.log(`[DIAG-INT] Atlas raw output length: ${atlasOutput.length}`);
  console.log(`[DIAG-INT] Atlas raw output first 500 chars:\n${atlasOutput.slice(0, 500)}`);
  fs.writeFileSync(path.join(AGENT_LOGS, `round-${round}-atlas-int-raw.txt`), atlasOutput);

  let { gameHtml, buildReport } = extractHtmlAndReport(atlasOutput);

  if (!gameHtml) {
    // Retry once with explicit instructions to output raw HTML
    console.log(`[DIAG-INT] Atlas extraction failed — retrying with error context`);
    broadcast({ type: 'developer_retry', round, reason: 'extraction_failed' });
    const renSummaryForRetry = renOutput.slice(0, 200);
    const extractRetryPrompt = `You are Atlas Novak. Your previous integration output was not valid HTML.

ERROR: Output did not contain valid HTML. Your response must be a complete HTML file.

INTEGRATION GOAL (from Ren's plan):
${renSummaryForRetry}

PROTECTED FUNCTIONS (do not remove):
${protectedFnList}

CURRENT game.html:
${currentGame || '(No game.html)'}

Output ONLY the complete HTML file. Start with <!DOCTYPE html> and end with </html>. No explanation, no markdown, no build report — ONLY the HTML file.`;
    try {
      atlasOutput = await runAgent('atlas-novak', atlas.model, extractRetryPrompt, 600000);
      fs.writeFileSync(path.join(AGENT_LOGS, `round-${round}-atlas-int-raw-retry.txt`), atlasOutput);
      const retry = extractHtmlAndReport(atlasOutput);
      if (!retry.gameHtml) {
        fs.writeFileSync(path.join(AGENT_LOGS, `round-${round}-atlas-integration.md`), '# FAILED — Output was not valid HTML even after retry\n\nSee round-' + round + '-atlas-int-raw.txt and round-' + round + '-atlas-int-raw-retry.txt for raw output.');
        broadcast({ type: 'agent_error', round, agentId: 'atlas-novak', error: 'Developer output is not valid HTML (retry also failed)' });
        throw new Error('Developer output is not valid HTML');
      }
      gameHtml = retry.gameHtml;
      buildReport = retry.buildReport;
    } catch (retryErr) {
      if (retryErr.message === 'Developer output is not valid HTML') throw retryErr;
      fs.writeFileSync(path.join(AGENT_LOGS, `round-${round}-atlas-integration.md`), '# FAILED — Retry execution error\n\n' + retryErr.message);
      broadcast({ type: 'agent_error', round, agentId: 'atlas-novak', error: 'Retry failed: ' + retryErr.message });
      throw new Error('Developer output is not valid HTML');
    }
  }

  // AUTOMATED VALIDATION
  const validationErrors = validateEngineOutput(gameHtml, protectedSystems, currentGame || null);

  if (validationErrors.length > 0) {
    broadcast({ type: 'validation_failed', round, errors: validationErrors });
    broadcast({ type: 'developer_retry', round });
    const valErrorText = validationErrors.join('\n').slice(0, 500);
    const renSummaryForValRetry = renOutput.slice(0, 200);
    const retryPrompt = `You are Atlas Novak. Your previous integration output failed validation.

ERROR:
${valErrorText}

INTEGRATION GOAL (from Ren's plan):
${renSummaryForValRetry}

PROTECTED FUNCTIONS (do not remove):
${protectedFnList}

CURRENT game.html:
${currentGame || '(No game.html)'}

Output ONLY the complete HTML file. Start with <!DOCTYPE html> and end with </html>. No explanation, no markdown, no build report — ONLY the HTML file.`;
    try {
      atlasOutput = await runAgent('atlas-novak', atlas.model, retryPrompt, 600000);
      const retry = extractHtmlAndReport(atlasOutput);
      if (!retry.gameHtml) {
        fs.writeFileSync(path.join(AGENT_LOGS, `round-${round}-atlas-integration.md`), 'Validation failed on retry — no valid HTML.');
        broadcast({ type: 'agent_complete', round, agentId: 'atlas-novak', agentName: atlas.name, displayName: atlas.role, emoji: atlas.emoji, outputLength: 0 });
        return { verdict: 'reject', errors: ['Retry output is not valid HTML'] };
      }
      gameHtml = retry.gameHtml;
      buildReport = retry.buildReport;
      const retryErrors = validateEngineOutput(gameHtml, protectedSystems, currentGame || null);
      if (retryErrors.length > 0) {
        fs.writeFileSync(path.join(AGENT_LOGS, `round-${round}-atlas-integration.md`), buildReport || 'Validation failed on retry.');
        broadcast({ type: 'agent_complete', round, agentId: 'atlas-novak', agentName: atlas.name, displayName: atlas.role, emoji: atlas.emoji, outputLength: 0 });
        return { verdict: 'reject', errors: retryErrors };
      }
    } catch (err) {
      return { verdict: 'reject', errors: ['Retry failed'] };
    }
  }

  fs.writeFileSync(path.join(AGENT_LOGS, `round-${round}-atlas-integration.md`), buildReport || 'No build report.');
  broadcast({ type: 'agent_complete', round, agentId: 'atlas-novak', agentName: atlas.name, displayName: atlas.role, emoji: atlas.emoji, outputLength: gameHtml.length });

  // --- BEA (QA Playtester) ---
  const bea = AGENTS['bea-ortiz'];
  broadcast({ type: 'agent_start', round, agentId: 'bea-ortiz', agentName: bea.name, displayName: bea.role, emoji: bea.emoji, model: 'opus' });

  const beaPrompt = `You are Bea "Bug" Ortiz, QA Playtester at GTM Studio.

NEW game.html TO REVIEW:
${gameHtml.slice(0, 15000)}${gameHtml.length > 15000 ? '\n... [TRUNCATED]' : ''}

DEVELOPER BUILD REPORT:
${buildReport}

PREVIOUS game.html (first 5000 chars for comparison):
${currentGame ? currentGame.slice(0, 5000) : '(No previous build)'}

PROTECTED SYSTEMS:
${JSON.stringify(protectedSystems, null, 2)}

REN'S SCOPED PLAN (what should be in this build):
${renOutput}

YOUR TASK:
Review the build. Check:
1. Does it look like valid HTML/JS? (static analysis)
2. Are all items from Ren's plan present?
3. Do protected systems appear intact?
4. Any obvious regressions vs previous build?
5. Any JS that would cause runtime errors?

START your output with exactly one of:
VERDICT: SHIP
or
VERDICT: REJECT

Then provide your detailed findings.`;

  let beaOutput;
  try {
    beaOutput = await runAgent('bea-ortiz', bea.model, beaPrompt);
    fs.writeFileSync(path.join(AGENT_LOGS, `round-${round}-bea.md`), beaOutput);
    broadcast({ type: 'agent_complete', round, agentId: 'bea-ortiz', agentName: bea.name, displayName: bea.role, emoji: bea.emoji, outputLength: beaOutput.length });
  } catch (err) {
    broadcast({ type: 'agent_error', round, agentId: 'bea-ortiz', error: err.message });
    throw err;
  }

  // Parse verdict
  const verdict = beaOutput.includes('VERDICT: SHIP') ? 'ship' : 'reject';
  broadcast({ type: 'qa_verdict', round, verdict });

  if (verdict === 'ship') {
    fs.writeFileSync(path.join(BUILDS, 'game.html'), gameHtml);
    fs.writeFileSync(path.join(DOCS, 'game.html'), gameHtml);
    fs.writeFileSync(path.join(AGENT_LOGS, `round-${round}-build-report.md`), buildReport);
    fs.writeFileSync(path.join(AGENT_LOGS, `round-${round}-qa-report.md`), beaOutput);

    gameState.last_updated_round = round;
    writeManifest('game-state.json', gameState);

    archiveFeedback(round);

    try {
      execSync(`cd ${BASE} && git add builds/ docs/ manifest/ assets/`, { timeout: 15000 });
      execSync(`cd ${BASE} && git commit -m "Round ${round} (integration): ${priority} | Verdict: SHIP"`, { timeout: 15000 });
      execSync(`cd ${BASE} && git push origin v3-dev`, { timeout: 30000 });
      broadcast({ type: 'committed', round });
    } catch (err) {
      broadcast({ type: 'git_error', round, error: err.message });
    }

    return { verdict: 'ship' };
  } else {
    // REJECT — give Atlas one retry
    broadcast({ type: 'developer_retry', round });
    const qaErrorText = beaOutput.slice(0, 500);
    const renSummaryForQARetry = renOutput.slice(0, 200);
    const retryPrompt = `You are Atlas Novak. QA rejected your integration build.

QA FEEDBACK:
${qaErrorText}

INTEGRATION GOAL (from Ren's plan):
${renSummaryForQARetry}

PROTECTED FUNCTIONS (do not remove):
${protectedFnList}

CURRENT game.html:
${currentGame || '(No game.html)'}

Output ONLY the complete HTML file. Start with <!DOCTYPE html> and end with </html>. No explanation, no markdown, no build report — ONLY the HTML file.`;

    try {
      atlasOutput = await runAgent('atlas-novak', atlas.model, retryPrompt, 600000);
      const retry = extractHtmlAndReport(atlasOutput);
      if (!retry.gameHtml) {
        return { verdict: 'reject', errors: ['Retry output is not valid HTML'] };
      }
      gameHtml = retry.gameHtml;
      buildReport = retry.buildReport;

      const retryValErrors = validateEngineOutput(gameHtml, protectedSystems, currentGame || null);
      if (retryValErrors.length > 0) {
        return { verdict: 'reject', errors: retryValErrors };
      }

      // Re-QA (abbreviated)
      const beaRetryPrompt = `You are Bea Ortiz. Quick re-review after Atlas's fix.

ATLAS'S REVISED game.html (first 10000 chars):
${gameHtml.slice(0, 10000)}

PREVIOUS QA ISSUES:
${beaOutput}

Did Atlas fix the issues? VERDICT: SHIP or VERDICT: REJECT`;

      const beaRetry = await runAgent('bea-ortiz', bea.model, beaRetryPrompt);
      const retryVerdict = beaRetry.includes('VERDICT: SHIP') ? 'ship' : 'reject';
      broadcast({ type: 'qa_verdict', round, verdict: retryVerdict });

      if (retryVerdict === 'ship') {
        fs.writeFileSync(path.join(BUILDS, 'game.html'), gameHtml);
        fs.writeFileSync(path.join(DOCS, 'game.html'), gameHtml);
        fs.writeFileSync(path.join(AGENT_LOGS, `round-${round}-build-report.md`), buildReport);
        fs.writeFileSync(path.join(AGENT_LOGS, `round-${round}-qa-report.md`), beaRetry);
        archiveFeedback(round);
        try {
          execSync(`cd ${BASE} && git add builds/ docs/ manifest/ assets/`, { timeout: 15000 });
          execSync(`cd ${BASE} && git commit -m "Round ${round} (integration): ${priority} | Verdict: SHIP (retry)"`, { timeout: 15000 });
          execSync(`cd ${BASE} && git push origin v3-dev`, { timeout: 30000 });
          broadcast({ type: 'committed', round });
        } catch (err) {
          broadcast({ type: 'git_error', round, error: err.message });
        }
        return { verdict: 'ship' };
      } else {
        return { verdict: 'reject', errors: ['QA rejected on retry'] };
      }
    } catch (err) {
      return { verdict: 'reject', errors: ['Retry execution failed'] };
    }
  }
}

// ── HOTFIX ROUND ────────────────────────────────────────────────────────────

async function runHotfixRound(round, priority, note, broadcast) {
  const protectedSystems = readManifest('protected-systems.json');
  const currentGame = fs.readFileSync(path.join(BUILDS, 'game.html'), 'utf8');
  const feedback = readFeedback();

  const atlas = AGENTS['atlas-novak'];
  broadcast({ type: 'agent_start', round, agentId: 'atlas-novak', agentName: atlas.name, displayName: atlas.role, emoji: atlas.emoji, model: 'opus' });

  const atlasPrompt = `You are Atlas Novak. HOTFIX round — fix ONE specific issue.

ISSUE TO FIX: ${priority}
${note ? `DETAILS: ${note}` : ''}
${feedback ? `SEAN'S FEEDBACK:\n${feedback}` : ''}

PROTECTED SYSTEMS:
${JSON.stringify(protectedSystems, null, 2)}

CURRENT game.html:
${currentGame}

Fix the specific issue described above. Do NOT refactor, do NOT add features, do NOT change anything else.
Output the complete game.html starting with <!DOCTYPE html>.
Include build report after </html> between <!-- BUILD_REPORT_START --> and <!-- BUILD_REPORT_END --> markers.`;

  let atlasOutput;
  try {
    atlasOutput = await runAgent('atlas-novak', atlas.model, atlasPrompt, 600000);
  } catch (err) {
    broadcast({ type: 'agent_error', round, agentId: 'atlas-novak', error: err.message });
    throw err;
  }

  // Diagnostic: save raw Atlas hotfix output BEFORE parsing
  fs.writeFileSync(path.join(AGENT_LOGS, `round-${round}-atlas-hotfix-raw.txt`), atlasOutput);

  let { gameHtml, buildReport } = extractHtmlAndReport(atlasOutput);

  if (!gameHtml) {
    // Retry once with explicit instructions
    console.log(`[DIAG-HOTFIX] Atlas extraction failed — retrying with error context`);
    broadcast({ type: 'developer_retry', round, reason: 'extraction_failed' });
    const extractRetryPrompt = atlasPrompt + `\n\nYOUR PREVIOUS OUTPUT FAILED VALIDATION: Developer output is not valid HTML. You MUST output raw HTML starting with <!DOCTYPE html>. No markdown fences. No commentary before or after the HTML. The first character of your response must be '<'.`;
    try {
      atlasOutput = await runAgent('atlas-novak', atlas.model, extractRetryPrompt, 600000);
      fs.writeFileSync(path.join(AGENT_LOGS, `round-${round}-atlas-hotfix-raw-retry.txt`), atlasOutput);
      const retry = extractHtmlAndReport(atlasOutput);
      if (!retry.gameHtml) {
        broadcast({ type: 'agent_error', round, agentId: 'atlas-novak', error: 'Hotfix output is not valid HTML (retry also failed)' });
        throw new Error('Hotfix output is not valid HTML');
      }
      gameHtml = retry.gameHtml;
      buildReport = retry.buildReport;
    } catch (retryErr) {
      if (retryErr.message === 'Hotfix output is not valid HTML') throw retryErr;
      broadcast({ type: 'agent_error', round, agentId: 'atlas-novak', error: 'Retry failed: ' + retryErr.message });
      throw new Error('Hotfix output is not valid HTML');
    }
  }

  const valErrors = validateEngineOutput(gameHtml, protectedSystems, currentGame);
  if (valErrors.length > 0) {
    broadcast({ type: 'agent_complete', round, agentId: 'atlas-novak', agentName: atlas.name, displayName: atlas.role, emoji: atlas.emoji, outputLength: 0 });
    return { verdict: 'reject', errors: valErrors };
  }

  broadcast({ type: 'agent_complete', round, agentId: 'atlas-novak', agentName: atlas.name, displayName: atlas.role, emoji: atlas.emoji, outputLength: gameHtml.length });

  // Quick QA
  const bea = AGENTS['bea-ortiz'];
  broadcast({ type: 'agent_start', round, agentId: 'bea-ortiz', agentName: bea.name, displayName: bea.role, emoji: bea.emoji, model: 'opus' });

  const beaPrompt = `You are Bea Ortiz. Quick QA on a HOTFIX.

ISSUE THAT WAS FIXED: ${priority}
BUILD REPORT: ${buildReport}

NEW game.html (first 8000 chars):
${gameHtml.slice(0, 8000)}

Does the fix look correct without breaking anything? VERDICT: SHIP or VERDICT: REJECT`;

  const beaOutput = await runAgent('bea-ortiz', bea.model, beaPrompt);
  fs.writeFileSync(path.join(AGENT_LOGS, `round-${round}-bea.md`), beaOutput);
  broadcast({ type: 'agent_complete', round, agentId: 'bea-ortiz', agentName: bea.name, displayName: bea.role, emoji: bea.emoji, outputLength: beaOutput.length });

  const verdict = beaOutput.includes('VERDICT: SHIP') ? 'ship' : 'reject';
  broadcast({ type: 'qa_verdict', round, verdict });

  if (verdict === 'ship') {
    fs.writeFileSync(path.join(BUILDS, 'game.html'), gameHtml);
    fs.writeFileSync(path.join(DOCS, 'game.html'), gameHtml);
    fs.writeFileSync(path.join(AGENT_LOGS, `round-${round}-build-report.md`), buildReport);
    archiveFeedback(round);
    try {
      execSync(`cd ${BASE} && git add builds/ docs/`, { timeout: 15000 });
      execSync(`cd ${BASE} && git commit -m "Round ${round} (hotfix): ${priority} | Verdict: SHIP"`, { timeout: 15000 });
      execSync(`cd ${BASE} && git push origin v3-dev`, { timeout: 30000 });
      broadcast({ type: 'committed', round });
    } catch (err) {
      broadcast({ type: 'git_error', round, error: err.message });
    }
  }

  return { verdict };
}

// ── API ENDPOINTS ───────────────────────────────────────────────────────────

// ── Batch / Run-to-Checkpoint helpers ────────────────────────────────────────

async function triggerRunNext() {
  if (isRunning) return;
  const queue = readManifest('round-queue.json');
  if (!queue || !queue.queue || queue.queue.length === 0) return;
  const next = queue.queue.shift();
  writeManifest('round-queue.json', queue);
  isRunning = true;
  currentRoundType = next.type;
  try {
    await runRound(next.type, next.priority || '', next.note || '', broadcast);
  } catch (err) {
    console.error('Round failed:', err);
  } finally {
    isRunning = false;
    currentRoundType = null;
  }
}

app.post('/run-to-checkpoint', (req, res) => {
  if (isRunning) return res.status(409).json({ error: 'Round already in progress' });
  const queue = readManifest('round-queue.json');
  if (!queue || !queue.queue || queue.queue.length === 0) {
    return res.status(400).json({ error: 'Queue empty' });
  }
  const q = queue.queue;
  if (q[0].type === 'integration' || q[0].type === 'hotfix') {
    return res.status(400).json({ error: 'Next round is an ' + q[0].type + ' checkpoint \u2014 run it manually after reviewing the build' });
  }
  // Count consecutive non-checkpoint rounds
  let batchSize = 0;
  let checkpointLabel = null;
  for (let i = 0; i < q.length; i++) {
    if (q[i].type === 'integration' || q[i].type === 'hotfix') {
      checkpointLabel = 'Round #' + q[i].round + ' (' + q[i].type + ')';
      break;
    }
    batchSize++;
  }
  if (!checkpointLabel && q.length > batchSize) {
    checkpointLabel = 'end of queue';
  }
  batchState = {
    active: true,
    totalRounds: batchSize,
    completedRounds: 0,
    stoppedReason: null
  };
  const nextCheckpoint = checkpointLabel || 'end of queue';
  broadcast({ type: 'batch_start', totalRounds: batchSize, nextCheckpoint });
  res.json({ batchSize, nextCheckpoint });
  // Kick off the first round
  triggerRunNext();
});

app.post('/cancel-batch', (req, res) => {
  if (!batchState || !batchState.active) {
    return res.status(400).json({ error: 'No active batch' });
  }
  batchState.active = false;
  batchState.stoppedReason = 'cancelled';
  broadcast({ type: 'batch_cancelled', completed: batchState.completedRounds });
  res.json({ ok: true, completed: batchState.completedRounds });
});

// Start a round
app.post('/run', async (req, res) => {
  if (isRunning) return res.status(409).json({ error: 'Round already in progress' });
  const { roundType, priority, note } = req.body;
  if (!roundType) return res.status(400).json({ error: 'roundType required' });
  if (!['engine', 'story', 'art', 'integration', 'hotfix'].includes(roundType)) {
    return res.status(400).json({ error: 'Invalid roundType' });
  }
  isRunning = true;
  currentRoundType = roundType;
  res.json({ status: 'started', roundType });
  try {
    await runRound(roundType, priority || '', note || '', broadcast);
  } catch (err) {
    console.error('Round failed:', err);
  } finally {
    isRunning = false;
    currentRoundType = null;
  }
});

// Run next from queue
app.post('/run-next', async (req, res) => {
  if (isRunning) return res.status(409).json({ error: 'Round already in progress' });
  const queue = readManifest('round-queue.json');
  if (!queue || !queue.queue || queue.queue.length === 0) {
    return res.status(404).json({ error: 'Round queue is empty' });
  }
  const next = queue.queue.shift();
  writeManifest('round-queue.json', queue);
  isRunning = true;
  currentRoundType = next.type;
  res.json({ status: 'started', round: next });
  try {
    await runRound(next.type, next.priority || '', next.note || '', broadcast);
  } catch (err) {
    console.error('Round failed:', err);
  } finally {
    isRunning = false;
    currentRoundType = null;
  }
});

// Feedback endpoints
app.post('/feedback', (req, res) => {
  const { message } = req.body;
  if (!message) return res.status(400).json({ error: 'message required' });
  const feedbackPath = path.join(BUILDS, 'sean-feedback.md');
  const existing = readFeedback();
  fs.writeFileSync(feedbackPath, existing ? existing + '\n\n' + message : message);
  broadcast({ type: 'feedback_received' });
  res.json({ ok: true });
});

app.get('/feedback', (req, res) => {
  res.json({ feedback: readFeedback() });
});

app.delete('/feedback', (req, res) => {
  fs.writeFileSync(path.join(BUILDS, 'sean-feedback.md'), '');
  res.json({ ok: true });
});

// Status and data endpoints
app.get('/status', (req, res) => {
  try {
    const studioState = JSON.parse(fs.readFileSync(path.join(BUILDS, 'studio-state.json'), 'utf8'));
    res.json({ isRunning, currentRound: studioState.lastRound, currentRoundType, lastRoundType: studioState.lastRoundType, lastQAVerdict: studioState.lastQAVerdict, batch: batchState });
  } catch(e) {
    res.json({ isRunning, currentRound: 0, currentRoundType, lastRoundType: null, lastQAVerdict: null, batch: batchState });
  }
});

app.get('/studio-state', (req, res) => {
  try {
    res.json(JSON.parse(fs.readFileSync(path.join(BUILDS, 'studio-state.json'), 'utf8')));
  } catch(e) {
    res.status(404).json({ error: 'studio-state.json not found' });
  }
});

app.get('/manifest/:file', (req, res) => {
  const data = readManifest(req.params.file);
  if (data) res.json(data);
  else res.status(404).json({ error: 'Not found' });
});

app.get('/rounds', (req, res) => {
  try {
    const state = JSON.parse(fs.readFileSync(path.join(BUILDS, 'studio-state.json'), 'utf8'));
    res.json(state.roundHistory || []);
  } catch(e) {
    res.json([]);
  }
});

app.get('/logs/:round/:agent', (req, res) => {
  try {
    const log = fs.readFileSync(path.join(AGENT_LOGS, `round-${req.params.round}-${req.params.agent}.md`), 'utf8');
    res.type('text/plain').send(log);
  } catch(e) {
    res.status(404).send('Log not found');
  }
});

app.get('/build-report/:round', (req, res) => {
  try {
    const report = fs.readFileSync(path.join(AGENT_LOGS, `round-${req.params.round}-build-report.md`), 'utf8');
    res.type('text/plain').send(report);
  } catch(e) {
    res.status(404).send('Report not found');
  }
});

app.get('/round-queue', (req, res) => {
  res.json(readManifest('round-queue.json') || { queue: [] });
});

app.get('/suggest-priority', async (req, res) => {
  const type = req.query.type || 'engine';
  try {
    let suggestion = '';
    if (type === 'engine') {
      const spec = JSON.parse(fs.readFileSync(path.join(MANIFEST, 'engine-spec.json'), 'utf8'));
      const next = Object.entries(spec.systems || {}).find(([, v]) => v.status === 'planned');
      suggestion = next ? next[0] : 'engine-improvements';
    } else if (type === 'story') {
      const story = JSON.parse(fs.readFileSync(path.join(MANIFEST, 'story-state.json'), 'utf8'));
      const beats = story.beats || {};
      const next = Object.entries(beats).find(([, v]) => !v.dialogue || v.dialogue.length === 0);
      suggestion = next ? next[0] : 'story-content';
    } else if (type === 'art') {
      const art = JSON.parse(fs.readFileSync(path.join(MANIFEST, 'art-state.json'), 'utf8'));
      const assets = art.assets || {};
      const next = Object.entries(assets).find(([, v]) => v.status !== 'approved');
      suggestion = next ? `${next[0]}-sprite` : 'core-sprites';
    } else if (type === 'integration') {
      suggestion = 'assemble-latest';
    } else if (type === 'hotfix') {
      suggestion = '';
    }
    res.json({ suggestion, type });
  } catch (e) {
    res.json({ suggestion: type + '-round', type });
  }
});

app.post('/round-queue', (req, res) => {
  const { queue } = req.body;
  writeManifest('round-queue.json', { queue, paused: false, auto_advance: false });
  res.json({ ok: true });
});

// Asset registry endpoints
app.get('/asset-registry', (req, res) => {
  try {
    res.json(JSON.parse(fs.readFileSync(path.join(BUILDS, 'asset-registry.json'), 'utf8')));
  } catch(e) {
    res.json({ version: 1, assets: {} });
  }
});

app.patch('/asset-registry/:assetId', (req, res) => {
  const { assetId } = req.params;
  const { status, revision_notes } = req.body;
  const registryPath = path.join(BUILDS, 'asset-registry.json');
  try {
    const registry = JSON.parse(fs.readFileSync(registryPath, 'utf8'));
    if (registry.assets[assetId]) {
      registry.assets[assetId].status = status;
      if (revision_notes) registry.assets[assetId].revision_notes = revision_notes;
      fs.writeFileSync(registryPath, JSON.stringify(registry, null, 2));
      res.json({ ok: true });
    } else {
      res.status(404).json({ error: 'Asset not found' });
    }
  } catch(e) {
    res.status(500).json({ error: e.message });
  }
});

// Static files
app.use('/assets', express.static(path.join(BASE, 'assets')));
app.use(express.static(path.join(BASE, 'ui')));
app.use("/docs", express.static(path.join(BASE, "docs")));

// ── Start Server ────────────────────────────────────────────────────────────

app.listen(PORT, () => {
  console.log(`GTM Studio v3 running on port ${PORT}`);
  console.log('Departments: engine | story | art | integration | hotfix');
});
