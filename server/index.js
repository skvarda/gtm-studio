// GTM Studio — Phase 3: Multi-Agent Loop
const express = require('express');
const { execSync, exec } = require('child_process');
const { promisify } = require('util');
const execAsync = promisify(exec);
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const BASE = '/opt/gtm-studio';
const BUILDS = path.join(BASE, 'builds');
const AGENT_LOGS = path.join(BUILDS, 'agent-logs');
const DOCS = path.join(BASE, 'docs');

app.use(express.json());
app.use(express.static(path.join(BASE, 'ui')));

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
    id: 'orchestrator', name: 'Orchestrator', emoji: '🧠',
    buildPrompt(round, currentLogs) {
      const prev = getPrevRoundLogs(round, 'developer');
      return `You are the Orchestrator for GTM Studio, a self-hosted agentic game studio.\n\n${GAME_VISION}\n\nThis is Round ${round}.\n\n${prev ? `PREVIOUS ROUND Developer output:\n${prev.slice(0, 2000)}` : 'This is the FIRST round. Establish the foundational game vision.'}\n\nWrite a strategic brief (300-500 words):\n1. The number one development priority for this round\n2. Two or three specific features or improvements to implement\n3. Clear direction to the 6 downstream agents\n4. If round > 1: specific bugs or quality issues to fix\n\nBe decisive and specific. Sign off: Orchestrator Round ${round}`;
    }
  },
  {
    id: 'gtm-specialist', name: 'GTM Specialist', emoji: '📣',
    buildPrompt(round, currentLogs) {
      const orch = currentLogs['orchestrator'] || '(awaiting)';
      return `You are the GTM Specialist for a 16-bit SaaS Startup Simulator.\n\n${GAME_VISION}\n\nORCHESTRATOR BRIEF Round ${round}:\n${orch}\n\nWrite a GTM and narrative design doc (200-350 words):\n1. The core viral hook\n2. Key narrative beats for this round\n3. How the mystery co-founder NPC should evolve (keep it subtle)\n4. One specific piece of dialog that captures the game tone\n5. Startup tropes or real GTM mechanics to incorporate`;
    }
  },
  {
    id: 'game-designer', name: 'Game Designer', emoji: '🎮',
    buildPrompt(round, currentLogs) {
      const orch = currentLogs['orchestrator'] || '(awaiting)';
      const gtm = currentLogs['gtm-specialist'] || '(awaiting)';
      return `You are the Game Designer for a 16-bit SaaS Startup Simulator.\n\n${GAME_VISION}\n\nORCHESTRATOR BRIEF Round ${round}:\n${orch}\n\nGTM INPUT:\n${gtm.slice(0, 600)}\n\nWrite a game mechanics design doc (250-400 words):\n1. Core gameplay loop for this round\n2. Specific mechanics to implement\n3. Progression gates\n4. Difficulty curve\n5. Player feedback loops\n6. One specific fun moment to engineer\n\nBe concrete and implementable.`;
    }
  },
  {
    id: 'art-director', name: 'Art Director', emoji: '🎨',
    buildPrompt(round, currentLogs) {
      const orch = currentLogs['orchestrator'] || '(awaiting)';
      return `You are the Art Director for a 16-bit SaaS Startup Simulator.\n\n${GAME_VISION}\n\nORCHESTRATOR BRIEF Round ${round}:\n${orch}\n\nWrite a visual direction doc (200-350 words):\n1. CSS color palette with hex values\n2. Pixel art style notes for sprites and tiles\n3. UI and HUD specs, fonts, retro styling\n4. Animation priorities\n5. One visual gag or easter egg\n\nThe Developer implements in HTML5 Canvas and CSS. Think SNES era constraints.`;
    }
  },
  {
    id: 'producer', name: 'Producer', emoji: '📋',
    buildPrompt(round, currentLogs) {
      const orch = currentLogs['orchestrator'] || '(awaiting)';
      const designer = currentLogs['game-designer'] || '(awaiting)';
      return `You are the Producer for a 16-bit SaaS Startup Simulator.\n\n${GAME_VISION}\n\nORCHESTRATOR BRIEF Round ${round}:\n${orch}\n\nGAME DESIGNER INPUT:\n${designer.slice(0, 600)}\n\nWrite a scope and prioritization doc (200-300 words):\n1. What to BUILD this round, top 3 items maximum\n2. What to CUT or defer, name specific things\n3. Complexity estimate for each item\n4. Non-negotiables for this round\n5. Known risks\n\nPrevent scope creep. Be ruthless.`;
    }
  },
  {
    id: 'playtester', name: 'Playtester', emoji: '🕹️',
    buildPrompt(round, currentLogs) {
      const prevGame = getPrevRoundLogs(round, 'developer');
      return `You are the Playtester for a 16-bit SaaS Startup Simulator.\n\n${GAME_VISION}\n\nRound ${round}.\n\n${prevGame ? `LAST ROUND GAME CODE (partial):\n${prevGame.slice(0, 2000)}\n\nImagine playing this game.` : 'No previous build. Focus on what the first playable version must nail.'}\n\nWrite a playtesting report (200-350 words):\n1. What works well\n2. Top 3 bugs or anticipated issues\n3. Feel assessment\n4. Pacing assessment\n5. One improvement that would make the most difference\n\nBe a tough honest critic.`;
    }
  },
  {
    id: 'developer', name: 'Developer', emoji: '💻',
    buildPrompt(round, currentLogs) {
      const prevGame = fs.existsSync(path.join(BUILDS, 'game.html'))
        ? fs.readFileSync(path.join(BUILDS, 'game.html'), 'utf8') : null;
      return `CRITICAL OUTPUT RULES:\n- Your ENTIRE response must be a single, complete, valid HTML document\n- The first character of your response MUST be < (the opening of <!DOCTYPE html>)\n- Do NOT write files to disk. Do NOT use any file I/O tools.\n- Do NOT include any explanation, commentary, or markdown\n- Do NOT wrap output in code fences\n- Output ONLY the raw HTML, nothing else\n- The HTML must be COMPLETE — do not truncate or summarize any section\n- If the file would exceed your output limit, REDUCE FEATURES rather than truncating the HTML\n\nYou are the Developer for GTM Studio. Produce a COMPLETE PLAYABLE HTML5 game file.\n\n${GAME_VISION}\n\nROUND ${round} BRIEFS:\n\nORCHESTRATOR:\n${(currentLogs['orchestrator']||'').slice(0,1000)}\n\nGAME DESIGNER:\n${(currentLogs['game-designer']||'').slice(0,700)}\n\nART DIRECTOR:\n${(currentLogs['art-director']||'').slice(0,500)}\n\nPRODUCER - follow this scope carefully:\n${(currentLogs['producer']||'').slice(0,500)}\n\nPLAYTESTER FEEDBACK:\n${(currentLogs['playtester']||'').slice(0,500)}\n\n${prevGame ? `PREVIOUS BUILD - improve on this:\n${prevGame.slice(0,5000)}` : 'NO PREVIOUS BUILD - create the first playable version'}\n\nCRITICAL OUTPUT REQUIREMENTS:\n1. Output a SINGLE COMPLETE self-contained HTML file\n2. Start with <!DOCTYPE html>, include html/head/body tags\n3. Include a canvas element\n4. All JS inline in script tags, no external dependencies\n5. All CSS inline in style tags\n6. Must be PLAYABLE with keyboard controls and a game loop\n7. Follow the Producer scope - not the full wish list\n8. Fix all Playtester bugs\n9. 16-bit pixel art aesthetic\n10. DO NOT truncate - output the ENTIRE file\n\nOutput ONLY the raw HTML. No commentary. No markdown. Start with <!DOCTYPE html> and end with </html>.`;
    }
  }
];

async function runAgent(agent, prompt) {
  const tmpFile = `/tmp/gtm-${agent.id}.txt`;
  try { fs.unlinkSync(tmpFile); } catch (_) {}
  fs.writeFileSync(tmpFile, prompt, 'utf8');
  fs.chmodSync(tmpFile, 0o666);
  try { execSync(`chown gtm:gtm ${tmpFile}`); } catch (_) {}
  const isDeveloper = agent.id === 'developer';
  try {
    const { stdout } = await execAsync(
      `su - gtm -s /bin/bash -c 'claude --print --dangerously-skip-permissions < ${tmpFile}'`,
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

async function runRound() {
  if (isRunning) throw new Error('Round already running');
  isRunning = true;
  const round = getNextRound();
  currentRound = round;
  const currentLogs = {};
  broadcast({ type: 'round_start', round });
  console.log(`\n=== ROUND ${round} START ===`);

  try {
    for (const agent of AGENTS) {
      broadcast({ type: 'agent_start', round, agentId: agent.id, agentName: agent.name, emoji: agent.emoji });
      console.log(`[Round ${round}] ${agent.emoji} ${agent.name} starting...`);
      const prompt = agent.buildPrompt(round, currentLogs);
      let output;
      try {
        output = await runAgent(agent, prompt);
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
      console.log(`[Round ${round}] ${agent.name} complete (${output.length} bytes)`);
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
        execSync(`cd ${BASE} && git add builds/ docs/ && git commit -m "Round ${round}: multi-agent build" && git push origin main`, { timeout: 60_000 });
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

    broadcast({ type: 'round_complete', round });
    console.log(`=== ROUND ${round} COMPLETE ===\n`);
  } finally {
    isRunning = false;
  }
}

app.post('/run', async (req, res) => {
  if (isRunning) return res.status(409).json({ error: 'Round already in progress' });
  res.json({ status: 'started', round: getNextRound() });
  runRound().catch(err => { console.error('Round failed:', err); broadcast({ type: 'error', message: err.message }); isRunning = false; });
});

app.get('/status', (req, res) => res.json({ isRunning, currentRound }));

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
  console.log(`Agents: ${AGENTS.map(a => a.emoji + a.name).join(' → ')}`);
});
