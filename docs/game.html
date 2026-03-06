<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>SaaS Startup Simulator</title>
<style>
* { margin: 0; padding: 0; box-sizing: border-box; }
body { background: #0f0f1a; display: flex; justify-content: center; align-items: center; height: 100vh; overflow: hidden; image-rendering: pixelated; }
canvas { image-rendering: pixelated; image-rendering: crisp-edges; }
</style>
</head>
<body>
<canvas id="game"></canvas>
<script>
// ============================================================
// SaaS STARTUP SIMULATOR — Round 27: "Sound & Scanlines"
// ============================================================
const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

const NATIVE_W = 320;
const NATIVE_H = 224;
const SCALE = 3;
canvas.width = NATIVE_W * SCALE;
canvas.height = NATIVE_H * SCALE;
canvas.style.width = (NATIVE_W * SCALE) + 'px';
canvas.style.height = (NATIVE_H * SCALE) + 'px';

const buf = document.createElement('canvas');
buf.width = NATIVE_W;
buf.height = NATIVE_H;
const bctx = buf.getContext('2d');
bctx.imageSmoothingEnabled = false;

// ============================================================
// PALETTE
// ============================================================
const PAL = {
    bgDark:     '#0f0f1a',
    floorA:     '#2a2a4a',
    floorB:     '#252545',
    wallTop:    '#3a3a5c',
    wallFace:   '#2e2e4e',
    wallTrim:   '#58b868',
    desk:       '#5c4033',
    deskTop:    '#7a5a42',
    deskLeg:    '#4a3028',
    monitor:    '#1a1a2e',
    monGlow:    '#58b868',
    monGlowLt:  '#a8e6a3',
    chair:      '#333355',
    chairSeat:  '#3d3d60',
    carpet:     '#2a2a4a',
    carpetB:    '#252545',
    skinTone:   '#f5c8a0',
    hoodie:     '#4466aa',
    hoodieDk:   '#335599',
    hair:       '#3a2a1a',
    pants:      '#2a2a4a',
    shoes:      '#1a1a2e',
    cofounder:  '#555577',
    cofHoodie:  '#665577',
    dialogBg:   '#1a1a2e',
    dialogBdr:  '#58b868',
    dialogTxt:  '#f5f0e1',
    hudBg:      '#0f0f1aCC',
    hudTxt:     '#f5f0e1',
    hudGreen:   '#58b868',
    hudRed:     '#e94560',
    hudYellow:  '#f0c040',
    apFull:     '#58b868',
    apEmpty:    '#555566',
    cursorGrn:  '#58b868',
    cursorLt:   '#a8e6a3',
    white:      '#f5f0e1',
    shadow:     '#00000044',
    plant:      '#2e8b40',
    plantDk:    '#1e6b30',
    pot:        '#8b5e3c',
    potDk:      '#6b4e2c',
    rug:        '#3a2255',
    rugB:       '#4a3265',
    window:     '#4488cc',
    windowLt:   '#88bbee',
    whiteboard: '#d0d0e0',
    wbBorder:   '#888899',
    coffee:     '#6b4423',
    coffeeMug:  '#ddddee',
    devColor:   '#81b29a',
    salesColor: '#f2cc8f',
    hireWarn:   '#e07a5f',
    panelBdr:   '#e94560',
    textHighlight: '#f5a623',
    textDim:    '#6c7a8a',
};

// ============================================================
// AUDIO MANAGER — Procedural Web Audio chiptune system
// ============================================================
const AudioManager = {
    ctx: null,
    masterGain: null,
    musicGain: null,
    sfxGain: null,
    muted: false,
    currentTrack: null,
    initialized: false,
    trackNodes: [],

    init() {
        if (this.initialized) return;
        try {
            this.ctx = new (window.AudioContext || window.webkitAudioContext)();
            this.masterGain = this.ctx.createGain();
            this.masterGain.gain.value = 0.35;
            this.masterGain.connect(this.ctx.destination);

            this.musicGain = this.ctx.createGain();
            this.musicGain.gain.value = 0.5;
            this.musicGain.connect(this.masterGain);

            this.sfxGain = this.ctx.createGain();
            this.sfxGain.gain.value = 0.7;
            this.sfxGain.connect(this.masterGain);

            this.initialized = true;
            // Restore mute state
            const saved = sessionStorage.getItem('sss_muted');
            if (saved === 'true') {
                this.muted = true;
                this.masterGain.gain.value = 0;
            }
        } catch(e) {}
    },

    toggleMute() {
        if (!this.initialized) return;
        this.muted = !this.muted;
        this.masterGain.gain.setTargetAtTime(this.muted ? 0 : 0.35, this.ctx.currentTime, 0.02);
        sessionStorage.setItem('sss_muted', this.muted);
    },

    stopMusic() {
        for (const n of this.trackNodes) {
            try { n.stop(); } catch(e) {}
        }
        this.trackNodes = [];
        this.currentTrack = null;
    },

    // Note frequency helper
    noteFreq(note, octave) {
        const notes = { C:0, 'C#':1, D:2, 'D#':3, E:4, F:5, 'F#':6, G:7, 'G#':8, A:9, 'A#':10, B:11 };
        const n = notes[note] || 0;
        return 440 * Math.pow(2, (n - 9) / 12 + (octave - 4));
    },

    // Play a sequence of notes as a looping track
    playTrack(trackName, melody, bass, tempo, loop) {
        if (!this.initialized) return;
        if (this.currentTrack === trackName) return;
        this.stopMusic();
        this.currentTrack = trackName;

        const beatDur = 60 / tempo;
        const totalBeats = melody.reduce((s, n) => s + n.dur, 0);
        const loopLen = totalBeats * beatDur;

        const scheduleVoice = (notes, waveType, gainVal, detune) => {
            const schedule = (startOffset) => {
                let t = this.ctx.currentTime + 0.05 + startOffset;
                for (const n of notes) {
                    const dur = n.dur * beatDur;
                    if (n.note !== 'R') {
                        const osc = this.ctx.createOscillator();
                        const g = this.ctx.createGain();
                        osc.type = waveType;
                        osc.frequency.value = this.noteFreq(n.note, n.oct);
                        if (detune) osc.detune.value = detune;
                        g.gain.setValueAtTime(gainVal, t);
                        g.gain.setValueAtTime(gainVal, t + dur * 0.7);
                        g.gain.linearRampToValueAtTime(0, t + dur * 0.95);
                        osc.connect(g);
                        g.connect(this.musicGain);
                        osc.start(t);
                        osc.stop(t + dur);
                        this.trackNodes.push(osc);
                    }
                    t += dur;
                }
            };

            if (loop) {
                // Schedule several loops ahead
                for (let i = 0; i < 80; i++) {
                    schedule(i * loopLen);
                }
            } else {
                schedule(0);
            }
        };

        scheduleVoice(melody, 'square', 0.15, 0);
        if (bass && bass.length > 0) {
            scheduleVoice(bass, 'triangle', 0.2, 0);
        }
    },

    // ---- TITLE THEME ----
    playTitleTheme() {
        const melody = [
            {note:'E',oct:5,dur:1},{note:'G',oct:5,dur:1},{note:'A',oct:5,dur:1},{note:'B',oct:5,dur:1},
            {note:'A',oct:5,dur:1},{note:'G',oct:5,dur:1},{note:'E',oct:5,dur:2},
            {note:'D',oct:5,dur:1},{note:'E',oct:5,dur:1},{note:'G',oct:5,dur:1},{note:'A',oct:5,dur:1},
            {note:'G',oct:5,dur:1},{note:'E',oct:5,dur:1},{note:'D',oct:5,dur:2},
            {note:'C',oct:5,dur:1},{note:'D',oct:5,dur:1},{note:'E',oct:5,dur:1},{note:'G',oct:5,dur:1},
            {note:'A',oct:5,dur:2},{note:'G',oct:5,dur:1},{note:'E',oct:5,dur:1},
            {note:'D',oct:5,dur:1},{note:'C',oct:5,dur:1},{note:'D',oct:5,dur:1},{note:'E',oct:5,dur:1},
            {note:'G',oct:5,dur:2},{note:'R',oct:0,dur:2},
        ];
        const bass = [
            {note:'C',oct:3,dur:2},{note:'G',oct:3,dur:2},{note:'A',oct:3,dur:2},{note:'E',oct:3,dur:2},
            {note:'D',oct:3,dur:2},{note:'G',oct:3,dur:2},{note:'A',oct:3,dur:2},{note:'E',oct:3,dur:2},
            {note:'C',oct:3,dur:2},{note:'G',oct:3,dur:2},{note:'A',oct:3,dur:2},{note:'E',oct:3,dur:2},
            {note:'D',oct:3,dur:2},{note:'G',oct:3,dur:2},{note:'C',oct:3,dur:2},{note:'R',oct:0,dur:2},
        ];
        this.playTrack('title', melody, bass, 180, true);
    },

    // ---- GAMEPLAY BGM ----
    playGameplayBGM() {
        const melody = [
            {note:'E',oct:4,dur:2},{note:'R',oct:0,dur:1},{note:'G',oct:4,dur:1},
            {note:'A',oct:4,dur:2},{note:'R',oct:0,dur:2},
            {note:'G',oct:4,dur:1},{note:'E',oct:4,dur:1},{note:'D',oct:4,dur:2},
            {note:'R',oct:0,dur:2},{note:'C',oct:4,dur:1},{note:'D',oct:4,dur:1},
            {note:'E',oct:4,dur:2},{note:'R',oct:0,dur:1},{note:'D',oct:4,dur:1},
            {note:'C',oct:4,dur:2},{note:'R',oct:0,dur:2},
            {note:'D',oct:4,dur:1},{note:'E',oct:4,dur:1},{note:'G',oct:4,dur:2},
            {note:'R',oct:0,dur:4},
        ];
        const bass = [
            {note:'A',oct:2,dur:4},{note:'E',oct:2,dur:4},
            {note:'G',oct:2,dur:4},{note:'D',oct:2,dur:4},
            {note:'A',oct:2,dur:4},{note:'C',oct:3,dur:4},
            {note:'G',oct:2,dur:4},{note:'D',oct:2,dur:4},
        ];
        this.playTrack('gameplay', melody, bass, 100, true);
    },

    // ---- DAY END JINGLE ----
    playDayEndJingle() {
        if (!this.initialized) return;
        this.stopMusic();
        const melody = [
            {note:'C',oct:5,dur:1},{note:'E',oct:5,dur:1},{note:'G',oct:5,dur:1},{note:'C',oct:6,dur:2},
        ];
        const bass = [
            {note:'C',oct:3,dur:2},{note:'G',oct:3,dur:2},{note:'R',oct:0,dur:1},
        ];
        this.playTrack('jingle', melody, bass, 200, false);
        this.currentTrack = 'jingle';
    },

    // ---- SFX ----
    playSFX(type) {
        if (!this.initialized) return;
        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const g = this.ctx.createGain();
        osc.connect(g);
        g.connect(this.sfxGain);

        switch(type) {
            case 'menuOpen':
                osc.type = 'square';
                osc.frequency.setValueAtTime(400, now);
                osc.frequency.linearRampToValueAtTime(800, now + 0.06);
                g.gain.setValueAtTime(0.12, now);
                g.gain.linearRampToValueAtTime(0, now + 0.08);
                osc.start(now); osc.stop(now + 0.08);
                break;
            case 'menuClose':
                osc.type = 'square';
                osc.frequency.setValueAtTime(600, now);
                osc.frequency.linearRampToValueAtTime(300, now + 0.06);
                g.gain.setValueAtTime(0.1, now);
                g.gain.linearRampToValueAtTime(0, now + 0.07);
                osc.start(now); osc.stop(now + 0.07);
                break;
            case 'select':
                osc.type = 'square';
                osc.frequency.setValueAtTime(660, now);
                osc.frequency.setValueAtTime(880, now + 0.04);
                g.gain.setValueAtTime(0.12, now);
                g.gain.linearRampToValueAtTime(0, now + 0.1);
                osc.start(now); osc.stop(now + 0.1);
                break;
            case 'cursor':
                osc.type = 'square';
                osc.frequency.value = 440;
                g.gain.setValueAtTime(0.06, now);
                g.gain.linearRampToValueAtTime(0, now + 0.03);
                osc.start(now); osc.stop(now + 0.03);
                break;
            case 'dialogTick':
                osc.type = 'square';
                osc.frequency.value = 600 + Math.random() * 100;
                g.gain.setValueAtTime(0.04, now);
                g.gain.linearRampToValueAtTime(0, now + 0.02);
                osc.start(now); osc.stop(now + 0.02);
                break;
            case 'hire':
                osc.type = 'triangle';
                osc.frequency.setValueAtTime(523, now);
                osc.frequency.setValueAtTime(659, now + 0.08);
                osc.frequency.setValueAtTime(784, now + 0.16);
                osc.frequency.setValueAtTime(1047, now + 0.24);
                g.gain.setValueAtTime(0.15, now);
                g.gain.linearRampToValueAtTime(0, now + 0.35);
                osc.start(now); osc.stop(now + 0.35);
                break;
            case 'apSpend':
                osc.type = 'triangle';
                osc.frequency.setValueAtTime(500, now);
                osc.frequency.linearRampToValueAtTime(350, now + 0.08);
                g.gain.setValueAtTime(0.1, now);
                g.gain.linearRampToValueAtTime(0, now + 0.1);
                osc.start(now); osc.stop(now + 0.1);
                break;
            case 'gameOver':
                osc.type = 'sawtooth';
                osc.frequency.setValueAtTime(400, now);
                osc.frequency.linearRampToValueAtTime(100, now + 0.6);
                g.gain.setValueAtTime(0.12, now);
                g.gain.linearRampToValueAtTime(0, now + 0.7);
                osc.start(now); osc.stop(now + 0.7);
                break;
        }
    },

    // Dialog tick throttle
    _lastTickTime: 0,
    playDialogTick() {
        if (!this.initialized) return;
        const now = this.ctx.currentTime;
        if (now - this._lastTickTime < 0.04) return;
        this._lastTickTime = now;
        this.playSFX('dialogTick');
    }
};

// ============================================================
// TEXT RENDERING
// ============================================================
function drawText(text, x, y, color, font) {
    const rx = Math.round(x);
    const ry = Math.round(y);
    if (font) bctx.font = font;
    bctx.fillStyle = PAL.bgDark;
    bctx.fillText(text, rx + 1, ry + 1);
    bctx.fillStyle = color || PAL.dialogTxt;
    bctx.fillText(text, rx, ry);
}

// ============================================================
// TILE MAP
// ============================================================
const T = 16;
const MAP_W = 20;
const MAP_H = 14;

const EMPTY = 0, FLOOR = 1, WALL_TOP = 2, WALL_FACE = 3, DESK = 4, CHAIR = 5,
      TERMINAL = 6, PLANT = 7, COFOUNDER_SPOT = 8, DOOR = 9, RUG = 10,
      WHITEBOARD = 11, COFFEE_MACHINE = 12, WINDOW_TILE = 13, WALL_TRIM_TILE = 14;

const SOLID = {
    [EMPTY]: 1, [FLOOR]: 0, [WALL_TOP]: 1, [WALL_FACE]: 1, [DESK]: 1,
    [CHAIR]: 0, [TERMINAL]: 1, [PLANT]: 1, [COFOUNDER_SPOT]: 1, [DOOR]: 0,
    [RUG]: 0, [WHITEBOARD]: 1, [COFFEE_MACHINE]: 1, [WINDOW_TILE]: 1, [WALL_TRIM_TILE]: 1
};

// prettier-ignore
const map = [
    [2, 2, 2,13, 2, 2, 2,13, 2, 2, 2, 2,13, 2, 2, 2,13, 2, 2, 2],
    [3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3],
    [3, 1, 6, 4, 1, 1,11, 1, 1, 1, 1, 1, 1, 4, 4, 1, 1, 7, 1, 3],
    [3, 1, 1, 5, 1, 1, 1, 1, 1, 1, 1, 1, 1, 5, 5, 1, 1, 1, 1, 3],
    [3, 1, 1, 1, 1, 1, 1, 1,10,10,10,10, 1, 1, 1, 1, 1, 1, 1, 3],
    [3, 1, 1, 1, 1, 1, 1, 1,10,10,10,10, 1, 1, 1, 1, 1, 1, 1, 3],
    [3, 1, 1, 1, 1, 1, 1, 1,10,10,10,10, 1, 1, 1, 1, 1, 1, 1, 3],
    [3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3],
    [3, 1, 7, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 7, 1, 3],
    [3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3],
    [3, 1, 1, 1, 1,12, 1, 1, 1, 1, 1, 1, 1, 1, 8, 1, 1, 1, 1, 3],
    [3, 1, 4, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4, 4, 1, 1, 1, 1, 3],
    [3, 1, 5, 5, 1, 1, 1, 1, 1, 9, 1, 1, 1, 5, 5, 1, 1, 1, 1, 3],
   [14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14],
];

function getTile(gx, gy) {
    if (gx < 0 || gy < 0 || gx >= MAP_W || gy >= MAP_H) return EMPTY;
    return map[gy][gx];
}
function isSolid(gx, gy) {
    return SOLID[getTile(gx, gy)] === 1;
}

// ============================================================
// EMPLOYEE NAME POOLS
// ============================================================
const DEV_NAMES = [
    'Alex', 'Jordan', 'Riley', 'Morgan', 'Casey', 'Quinn',
    'Avery', 'Taylor', 'Skyler', 'Sage', 'Reese', 'Blake',
    'Kai', 'Rory', 'Finley', 'Emery', 'Drew', 'Logan',
];
const SALES_NAMES = [
    'Dana', 'Cameron', 'Jamie', 'Hayden', 'Parker', 'Rowan',
    'Ellis', 'Harper', 'Peyton', 'Kendall', 'Dakota', 'Aubrey',
    'Ashton', 'Marley', 'Tatum', 'Devon', 'Shannon', 'Pat',
];
const usedNames = new Set();

function pickName(pool) {
    const available = pool.filter(n => !usedNames.has(n));
    if (available.length === 0) return pool[Math.floor(Math.random() * pool.length)];
    const name = available[Math.floor(Math.random() * available.length)];
    usedNames.add(name);
    return name;
}

// ============================================================
// GAME STATE
// ============================================================
const MAX_EMPLOYEES = 4;

const gameState = {
    day: 1,
    cash: 150000,
    mrr: 0,
    ap: 3,
    maxAp: 3,
    productProgress: 0,
    customers: 0,
    marketInsight: 0,
    phase: 'play',
    dayBurn: 2740,
    baseBurn: 2740,
    employees: [],
};

function getDevCount() { return gameState.employees.filter(e => e.type === 'dev').length; }
function getSalesCount() { return gameState.employees.filter(e => e.type === 'sales').length; }
function getTeamSize() { return 2 + gameState.employees.length; }

function recalcBurn() {
    let burn = gameState.baseBurn;
    for (const emp of gameState.employees) {
        burn += emp.type === 'dev' ? 1800 : 1500;
    }
    gameState.dayBurn = burn;
}

// ============================================================
// PLAYER
// ============================================================
const player = {
    gx: 9, gy: 7,
    px: 9 * T, py: 7 * T,
    tx: 9 * T, ty: 7 * T,
    dir: 0,
    moving: false,
    moveTimer: 0,
    moveDuration: 140,
    frame: 0,
    animTimer: 0,
};

const cofounder = {
    gx: 14, gy: 10,
    dir: 0,
    frame: 0,
    animTimer: 0,
    idleTimer: 0,
};

// ============================================================
// INPUT
// ============================================================
const keys = {};
const justPressed = {};
window.addEventListener('keydown', e => {
    if (!keys[e.code]) justPressed[e.code] = true;
    keys[e.code] = true;
    // Init audio on first user gesture
    if (!AudioManager.initialized) AudioManager.init();
    e.preventDefault();
});
window.addEventListener('keyup', e => {
    keys[e.code] = false;
});

function consumePress(code) {
    if (justPressed[code]) { justPressed[code] = false; return true; }
    return false;
}
function clearJustPressed() {
    for (const k in justPressed) justPressed[k] = false;
}

let holdTimer = 0;
const HOLD_DELAY = 220;
const HOLD_REPEAT = 100;
let lastDir = -1;
let holdActive = false;

// ============================================================
// DIALOG / MENU SYSTEM
// ============================================================
const dialog = {
    active: false,
    text: '',
    displayText: '',
    charIndex: 0,
    charTimer: 0,
    charSpeed: 28,
    done: false,
    callback: null,
    queue: [],
};

const menu = {
    active: false,
    title: '',
    options: [],
    cursor: 0,
    cursorBlink: 0,
    callback: null,
    disabledIndices: [],
    optionColors: [],
};

function showDialog(text, callback) {
    if (dialog.active || menu.active) {
        dialog.queue.push({ text, callback });
        return;
    }
    dialog.active = true;
    dialog.text = text;
    dialog.displayText = '';
    dialog.charIndex = 0;
    dialog.charTimer = 0;
    dialog.done = false;
    dialog.callback = callback || null;
    gameState.phase = 'dialog';
}

function advanceDialog() {
    if (!dialog.active) return;
    if (!dialog.done) {
        dialog.displayText = dialog.text;
        dialog.charIndex = dialog.text.length;
        dialog.done = true;
    } else {
        dialog.active = false;
        gameState.phase = 'play';
        AudioManager.playSFX('menuClose');
        if (dialog.callback) {
            dialog.callback();
            dialog.callback = null;
        }
        if (dialog.queue.length > 0) {
            const next = dialog.queue.shift();
            showDialog(next.text, next.callback);
        }
    }
}

function showMenu(title, options, callback, disabledIndices, optionColors) {
    menu.active = true;
    menu.title = title;
    menu.options = options;
    menu.cursor = 0;
    menu.cursorBlink = 0;
    menu.callback = callback;
    menu.disabledIndices = disabledIndices || [];
    menu.optionColors = optionColors || [];
    gameState.phase = 'menu';
    AudioManager.playSFX('menuOpen');
    while (menu.disabledIndices.includes(menu.cursor) && menu.cursor < menu.options.length - 1) {
        menu.cursor++;
    }
}

function menuSelect() {
    if (!menu.active) return;
    if (menu.disabledIndices.includes(menu.cursor)) return;
    const choice = menu.cursor;
    menu.active = false;
    gameState.phase = 'play';
    AudioManager.playSFX('select');
    if (menu.callback) menu.callback(choice);
}

// ============================================================
// OUTCOME MESSAGES
// ============================================================
const buildMessages = [
    "You refactored the authentication module. Clean code!",
    "Pushed a new feature branch. CI is green!",
    "Fixed that nasty race condition in the API.",
    "Shipped a landing page update. Looks sharp.",
    "Wrote integration tests. Future you says thanks.",
    "Deployed a database migration. No downtime!",
    "Built a new onboarding flow. Users will love it.",
    "Optimized the search algorithm. 3x faster queries.",
];

const researchMessages = [
    "Browsed Hacker News. Found a promising market niche.",
    "Interviewed a potential customer. Great insights!",
    "Analyzed competitor pricing. You can undercut them.",
    "Read an industry report. The TAM is huge.",
    "Joined a Slack community. Made some connections.",
    "Studied churn data patterns. Retention is key.",
    "Discovered an underserved vertical market.",
    "Found a subreddit full of your target audience.",
];

const salesMessages = [
    "Cold emailed 50 prospects. Fingers crossed!",
    "Demo'd the product to a startup founder.",
    "Got a warm intro from a VC contact.",
    "Pitched at a local meetup. Good reception!",
    "Set up a free trial for a mid-size company.",
    "A prospect replied: \"This is exactly what we need!\"",
    "Launched a Product Hunt post. Traffic incoming!",
    "Negotiated a pilot deal. Revenue is close!",
];

const coffeMessages = [
    "You brew a cup of artisanal pour-over. +10 Morale.",
    "The coffee machine gurgles ominously but delivers.",
    "Espresso shot. You feel invincible (temporarily).",
    "Your third cup today. The code practically writes itself.",
];

const cofounderMessages = [
    "Your co-founder glances up from his laptop... then back down.",
    "\"Oh hey. Yeah, I'm working on... the thing. It's going great.\"",
    "He seems to be reading Wikipedia. \"Research,\" he mutters.",
    "\"Trust the process,\" he says without looking up.",
    "You notice he's reorganizing his desktop icons. Again.",
    "\"I've been thinking about our long-term strategy...\" He trails off.",
    "He's wearing the same hoodie as yesterday. Or is it a new one?",
    "\"I had a breakthrough last night. I'll show you... eventually.\"",
];

const whiteboardMessages = [
    "The whiteboard is covered in complex diagrams. Are those... org charts or spaghetti recipes?",
    "Someone wrote 'MOVE FAST AND BREAK THINGS' then crossed out 'BREAK THINGS'.",
    "There's a detailed roadmap here. Q4 just says '???  -> PROFIT'.",
    "The whiteboard has your burn rate graphed out. The line goes... down.",
];

const devPassiveMessages = [
    "shipped a bug fix while you weren't looking.",
    "pushed clean code to main. CI green.",
    "refactored the auth module. Nice.",
    "squashed 3 bugs before lunch.",
    "deployed a performance optimization.",
    "wrote tests for the payment flow.",
];

const salesPassiveMessages = [
    "cold-called 20 leads. Hustle mode.",
    "got a callback from a warm prospect!",
    "sent a killer follow-up email chain.",
    "booked 3 demo calls for tomorrow.",
    "worked the LinkedIn DMs hard today.",
    "polished the pitch deck between calls.",
];

function randFrom(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

// ============================================================
// HIRING
// ============================================================
const DEV_BURN = 1800;
const SALES_BURN = 1500;

function hireEmployee(type) {
    if (gameState.employees.length >= MAX_EMPLOYEES) {
        showDialog("No room! You can only have " + MAX_EMPLOYEES + " employees right now. Maybe find a bigger office someday.");
        return;
    }
    if (gameState.ap <= 0) {
        showDialog("No action points left today. Try again tomorrow.");
        return;
    }

    const name = pickName(type === 'dev' ? DEV_NAMES : SALES_NAMES);
    const emp = { type, name, hireDay: gameState.day };
    gameState.employees.push(emp);
    gameState.ap--;
    recalcBurn();
    AudioManager.playSFX('hire');

    const role = type === 'dev' ? 'Developer' : 'Salesperson';
    const cost = type === 'dev' ? DEV_BURN : SALES_BURN;

    let msg = name + " has joined as " + role + "!\n\n";
    msg += "Salary: +$" + cost.toLocaleString() + "/day burn\n";
    msg += "New burn rate: $" + gameState.dayBurn.toLocaleString() + "/day\n";
    msg += "Team size: " + getTeamSize();

    if (type === 'dev') {
        msg += "\n\n" + name + " will contribute +3-6% product progress each day.";
    } else {
        msg += "\n\n" + name + " will make passive sales attempts each day.";
    }

    showDialog(msg);
}

function openHiringMenu() {
    if (gameState.ap <= 0) {
        showDialog("No action points left to recruit today. Come back tomorrow.");
        return;
    }
    if (gameState.employees.length >= MAX_EMPLOYEES) {
        showDialog("The office is full! " + MAX_EMPLOYEES + " employees max. You'd need a bigger place.");
        return;
    }

    const devCostStr = "$" + DEV_BURN.toLocaleString() + "/day";
    const salesCostStr = "$" + SALES_BURN.toLocaleString() + "/day";
    const slotsLeft = MAX_EMPLOYEES - gameState.employees.length;

    const opts = [
        "Hire Developer    (" + devCostStr + " burn)  [1 AP]",
        "Hire Salesperson  (" + salesCostStr + " burn)  [1 AP]",
        "View Team Roster",
        "Cancel",
    ];

    const colors = [PAL.devColor, PAL.salesColor, PAL.hudTxt, PAL.dialogTxt];

    showMenu("Hiring — " + slotsLeft + " slot" + (slotsLeft !== 1 ? "s" : "") + " open  |  " + gameState.ap + " AP", opts, (choice) => {
        if (choice === 0) {
            showMenu("Hire a Developer?", [
                "Yes — +$" + DEV_BURN.toLocaleString() + "/day burn, +3-6% product/day",
                "No, go back"
            ], (c) => {
                if (c === 0) hireEmployee('dev');
                else openHiringMenu();
            });
        } else if (choice === 1) {
            showMenu("Hire a Salesperson?", [
                "Yes — +$" + SALES_BURN.toLocaleString() + "/day burn, passive sales",
                "No, go back"
            ], (c) => {
                if (c === 0) hireEmployee('sales');
                else openHiringMenu();
            });
        } else if (choice === 2) {
            showTeamRoster();
        }
    }, [], colors);
}

function showTeamRoster() {
    let msg = "— TEAM ROSTER —\n\n";
    msg += "You (Founder) — Building the dream\n";
    msg += "??? (Co-Founder) — ???\n";

    if (gameState.employees.length === 0) {
        msg += "\nNo employees yet. Visit the door to hire!";
    } else {
        msg += "\n";
        for (const emp of gameState.employees) {
            const role = emp.type === 'dev' ? 'Developer' : 'Salesperson';
            const cost = emp.type === 'dev' ? DEV_BURN : SALES_BURN;
            const days = gameState.day - emp.hireDay;
            msg += emp.name + " (" + role + ") — $" + cost.toLocaleString() + "/day";
            if (days > 0) msg += " — " + days + "d tenure";
            msg += "\n";
        }
    }

    msg += "\nTeam: " + getTeamSize() + "  |  Burn: $" + gameState.dayBurn.toLocaleString() + "/day";
    showDialog(msg, () => { openHiringMenu(); });
}

// ============================================================
// ACTIONS
// ============================================================
function doBuild() {
    const gain = 5 + Math.floor(Math.random() * 8);
    gameState.productProgress = Math.min(100, gameState.productProgress + gain);
    gameState.ap--;
    AudioManager.playSFX('apSpend');
    showDialog(randFrom(buildMessages) + "\n\n[Product Progress +" + gain + "%  ->  " + gameState.productProgress + "%]");
}

function doResearch() {
    const gain = 1 + Math.floor(Math.random() * 2);
    gameState.marketInsight += gain;
    gameState.ap--;
    AudioManager.playSFX('apSpend');
    showDialog(randFrom(researchMessages) + "\n\n[Market Insight +" + gain + "  ->  " + gameState.marketInsight + "]");
}

function doSales() {
    gameState.ap--;
    AudioManager.playSFX('apSpend');
    let successChance = 0.25;
    if (gameState.productProgress < 25) successChance *= 0.5;
    if (gameState.marketInsight > 3) successChance += 0.15;
    if (gameState.productProgress >= 50) successChance += 0.15;

    if (Math.random() < successChance) {
        const mrrGain = 50 + Math.floor(Math.random() * 150);
        const custGain = 1;
        gameState.mrr += mrrGain;
        gameState.customers += custGain;
        showDialog(randFrom(salesMessages) + "\n\nDeal closed! [+$" + mrrGain + " MRR, +1 Customer]");
    } else {
        const failMsgs = [
            "No bites today. The grind continues.",
            "\"We'll circle back next quarter.\" Translation: no.",
            "Left a voicemail. Into the void it goes.",
            "The demo crashed mid-pitch. Classic.",
        ];
        let extra = '';
        if (gameState.productProgress < 25) {
            extra = "\n\n(Low product progress is hurting sales...)";
        }
        showDialog(randFrom(failMsgs) + extra);
    }
}

// ============================================================
// END OF DAY
// ============================================================
function endDay() {
    AudioManager.playDayEndJingle();

    const dailyMrrIncome = Math.floor(gameState.mrr / 30);
    gameState.cash -= gameState.dayBurn;
    gameState.cash += dailyMrrIncome;

    let empReport = '';
    let totalDevProgress = 0;
    let totalSalesRevenue = 0;
    let totalNewCustomers = 0;

    for (const emp of gameState.employees) {
        if (emp.type === 'dev') {
            const devGain = 3 + Math.floor(Math.random() * 4);
            totalDevProgress += devGain;
            empReport += emp.name + " " + randFrom(devPassiveMessages) + " [+" + devGain + "% prod]\n";
        } else if (emp.type === 'sales') {
            let passiveChance = 0.15;
            if (gameState.productProgress < 25) passiveChance *= 0.4;
            if (gameState.marketInsight > 3) passiveChance += 0.08;
            if (gameState.productProgress >= 50) passiveChance += 0.10;

            if (Math.random() < passiveChance) {
                const mrrGain = 30 + Math.floor(Math.random() * 100);
                totalSalesRevenue += mrrGain;
                totalNewCustomers += 1;
                empReport += emp.name + " closed a deal! [+$" + mrrGain + " MRR]\n";
            } else {
                empReport += emp.name + " " + randFrom(salesPassiveMessages) + "\n";
            }
        }
    }

    if (totalDevProgress > 0) {
        gameState.productProgress = Math.min(100, gameState.productProgress + totalDevProgress);
    }
    if (totalSalesRevenue > 0) {
        gameState.mrr += totalSalesRevenue;
        gameState.customers += totalNewCustomers;
    }

    gameState.day++;
    gameState.ap = gameState.maxAp;

    if (gameState.cash <= 0) {
        gameState.cash = 0;
        gameState.phase = 'gameOver';
        AudioManager.playSFX('gameOver');
        return;
    }

    const runway = Math.floor(gameState.cash / Math.max(1, gameState.dayBurn - dailyMrrIncome));
    let summary = "-- End of Day " + (gameState.day - 1) + " --\n\n";
    summary += "Burn: -$" + gameState.dayBurn.toLocaleString() + "\n";
    if (dailyMrrIncome > 0) summary += "MRR Income: +$" + dailyMrrIncome.toLocaleString() + "\n";
    summary += "Cash: $" + gameState.cash.toLocaleString() + "\n";
    summary += "Runway: ~" + runway + " days\n";

    if (empReport) {
        summary += "\n-- Team Activity --\n" + empReport;
        if (totalDevProgress > 0) {
            summary += "\nProduct: " + gameState.productProgress + "%";
        }
    }

    summary += "\nDay " + gameState.day + " begins. You have " + gameState.maxAp + " action points.";

    if (runway <= 10 && runway > 0) {
        summary += "\n\n!! RUNWAY CRITICAL — " + runway + " days left !!";
    }

    showDialog(summary, () => {
        // Resume gameplay BGM after jingle dialog dismissed
        AudioManager.playGameplayBGM();
    });
}

// ============================================================
// INTERACTION
// ============================================================
function tryInteract() {
    const dx = [0, 0, -1, 1][player.dir];
    const dy = [1, -1, 0, 0][player.dir];
    const fx = player.gx + dx;
    const fy = player.gy + dy;
    const tile = getTile(fx, fy);

    if (tile === TERMINAL || (getTile(player.gx, player.gy) === CHAIR && getTile(player.gx - 1, player.gy) === TERMINAL)) {
        openTerminal();
    } else if (tile === COFOUNDER_SPOT || (fx === cofounder.gx && fy === cofounder.gy)) {
        showDialog(randFrom(cofounderMessages));
    } else if (tile === COFFEE_MACHINE) {
        showDialog(randFrom(coffeMessages));
    } else if (tile === WHITEBOARD) {
        showDialog(randFrom(whiteboardMessages));
    } else if (tile === DOOR) {
        openHiringMenu();
    } else if (tile === DESK) {
        showDialog("A standard-issue startup desk. Covered in sticky notes and energy drink cans.");
    } else if (tile === PLANT) {
        showDialog("A hardy pothos plant. The only living thing in this office that doesn't need funding.");
    } else if (tile === WINDOW_TILE) {
        showDialog("Through the window you see other startups burning cash. You're not alone.");
    } else {
        if (getTile(player.gx, player.gy) === RUG) {
            if (gameState.employees.length === 0) {
                showDialog("A meeting area rug. No meetings scheduled (there's no one to meet with yet).");
            } else {
                showDialog("A meeting area rug. " + gameState.employees.length + " employee" + (gameState.employees.length !== 1 ? "s" : "") + " busy working around the office.");
            }
        }
    }
}

function openTerminal() {
    if (gameState.ap <= 0) {
        showMenu("Terminal -- No AP Remaining", [
            "End Day  ->  Day " + (gameState.day + 1),
            "Cancel"
        ], (choice) => {
            if (choice === 0) endDay();
        });
        return;
    }

    const disabled = [];
    const opts = [
        "Build Product     (+" + "5-12% Progress)  [1 AP]",
        "Research Market    (+" + "Market Insight)  [1 AP]",
        "Sales Outreach     (" + (gameState.productProgress < 25 ? "Low success" : "Normal chance") + ")  [1 AP]",
        "End Day  ->  Day " + (gameState.day + 1),
        "Cancel"
    ];

    showMenu("Terminal -- " + gameState.ap + " AP remaining", opts, (choice) => {
        if (choice === 0) doBuild();
        else if (choice === 1) doResearch();
        else if (choice === 2) doSales();
        else if (choice === 3) {
            showMenu("End day with " + gameState.ap + " AP unspent?", ["Yes, end day", "No, go back"], (c) => {
                if (c === 0) endDay();
            });
        }
    }, disabled);
}

// ============================================================
// PIXEL ART DRAWING HELPERS
// ============================================================
function drawRect(x, y, w, h, color) {
    bctx.fillStyle = color;
    bctx.fillRect(Math.floor(x), Math.floor(y), w, h);
}

function drawPixel(x, y, color) {
    bctx.fillStyle = color;
    bctx.fillRect(Math.floor(x), Math.floor(y), 1, 1);
}

// ============================================================
// TILE RENDERING
// ============================================================
function drawFloorTile(x, y, gx, gy) {
    const checker = (gx + gy) % 2 === 0;
    drawRect(x, y, T, T, checker ? PAL.floorA : PAL.floorB);
    if ((gx * 7 + gy * 13) % 5 === 0) {
        drawPixel(x + 3, y + 5, checker ? PAL.floorB : PAL.floorA);
    }
    if ((gx * 11 + gy * 3) % 7 === 0) {
        drawPixel(x + 11, y + 9, checker ? PAL.floorB : PAL.floorA);
    }
}

function drawWallTop(x, y) {
    drawRect(x, y, T, T, PAL.wallTop);
    drawRect(x, y + 7, T, 1, PAL.wallFace);
    drawRect(x + 7, y, 1, 7, PAL.wallFace);
    drawRect(x + 3, y + 8, 1, 7, PAL.wallFace);
    drawRect(x + 11, y + 8, 1, 6, PAL.wallFace);
}

function drawWallFace(x, y) {
    drawRect(x, y, T, T, PAL.wallFace);
    drawRect(x, y, T, 1, PAL.wallTrim);
    drawRect(x, y + 14, T, 2, PAL.wallTrim);
}

function drawWallTrimTile(x, y) {
    drawRect(x, y, T, T, PAL.wallFace);
    drawRect(x, y, T, 2, PAL.wallTrim);
    drawRect(x, y + 14, T, 2, '#1a1a2e');
}

function drawDesk(x, y) {
    drawRect(x + 1, y + 12, 14, 3, PAL.shadow);
    drawRect(x + 2, y + 10, 2, 5, PAL.deskLeg);
    drawRect(x + 12, y + 10, 2, 5, PAL.deskLeg);
    drawRect(x + 1, y + 4, 14, 7, PAL.desk);
    drawRect(x + 1, y + 4, 14, 2, PAL.deskTop);
    drawRect(x + 1, y + 4, 14, 1, '#8a6a52');
}

function drawTerminal(x, y) {
    drawRect(x + 1, y + 12, 14, 3, PAL.shadow);
    drawRect(x + 2, y + 10, 2, 5, PAL.deskLeg);
    drawRect(x + 12, y + 10, 2, 5, PAL.deskLeg);
    drawRect(x + 1, y + 4, 14, 7, PAL.desk);
    drawRect(x + 1, y + 4, 14, 2, PAL.deskTop);
    drawRect(x + 1, y + 4, 14, 1, '#8a6a52');
    drawRect(x + 3, y + 0, 10, 5, '#222233');
    drawRect(x + 4, y + 1, 8, 3, PAL.monitor);
    const glowColor = (Math.sin(performance.now() * 0.003) > 0) ? PAL.monGlow : PAL.monGlowLt;
    drawRect(x + 5, y + 1, 6, 1, glowColor);
    drawPixel(x + 5, y + 2, glowColor);
    drawPixel(x + 7, y + 2, glowColor);
    drawPixel(x + 9, y + 2, glowColor);
    drawPixel(x + 5, y + 3, glowColor);
    drawPixel(x + 6, y + 3, glowColor);
    drawPixel(x + 8, y + 3, glowColor);
    drawRect(x + 7, y + 5, 2, 1, '#444466');
    drawRect(x + 4, y + 6, 8, 2, '#444466');
    drawRect(x + 5, y + 6, 6, 1, '#555577');
    const pdx = Math.abs(player.gx - Math.floor(x / T));
    const pdy = Math.abs(player.gy - Math.floor(y / T));
    if (pdx <= 1 && pdy <= 1 && gameState.phase === 'play') {
        const bobY = Math.sin(performance.now() * 0.005) * 1.5;
        drawRect(x + 5, y - 5 + bobY, 6, 5, PAL.dialogBg);
        drawRect(x + 5, y - 5 + bobY, 6, 1, PAL.dialogBdr);
        drawRect(x + 5, y - 1 + bobY, 6, 1, PAL.dialogBdr);
        drawRect(x + 5, y - 5 + bobY, 1, 5, PAL.dialogBdr);
        drawRect(x + 10, y - 5 + bobY, 1, 5, PAL.dialogBdr);
        bctx.fillStyle = PAL.white;
        bctx.font = '4px monospace';
        bctx.fillText('Z', x + 7, y - 1 + bobY);
    }
}

function drawChair(x, y) {
    drawRect(x + 4, y + 6, 8, 6, PAL.chairSeat);
    drawRect(x + 4, y + 6, 8, 1, PAL.chair);
    drawRect(x + 5, y + 3, 6, 4, PAL.chair);
    drawRect(x + 5, y + 3, 6, 1, '#444466');
    drawPixel(x + 5, y + 13, PAL.chair);
    drawPixel(x + 10, y + 13, PAL.chair);
    drawPixel(x + 7, y + 14, PAL.chair);
}

function drawPlant(x, y) {
    drawRect(x + 5, y + 9, 6, 5, PAL.pot);
    drawRect(x + 6, y + 14, 4, 2, PAL.potDk);
    drawRect(x + 5, y + 9, 6, 1, PAL.potDk);
    drawRect(x + 4, y + 3, 3, 3, PAL.plant);
    drawRect(x + 9, y + 3, 3, 3, PAL.plant);
    drawRect(x + 6, y + 1, 4, 4, PAL.plant);
    drawRect(x + 5, y + 5, 6, 4, PAL.plant);
    drawPixel(x + 7, y + 2, PAL.plantDk);
    drawPixel(x + 5, y + 4, '#3eb050');
    drawPixel(x + 10, y + 4, '#3eb050');
    drawPixel(x + 7, y + 6, '#3eb050');
}

function drawRug(x, y, gx, gy) {
    const checker = (gx + gy) % 2 === 0;
    drawRect(x, y, T, T, checker ? PAL.rug : PAL.rugB);
    if (checker) {
        drawPixel(x + 7, y + 4, PAL.rugB);
        drawPixel(x + 8, y + 4, PAL.rugB);
        drawPixel(x + 6, y + 7, PAL.rugB);
        drawPixel(x + 9, y + 7, PAL.rugB);
        drawPixel(x + 7, y + 10, PAL.rugB);
        drawPixel(x + 8, y + 10, PAL.rugB);
    }
}

function drawWhiteboard(x, y) {
    drawRect(x + 1, y + 1, 14, 12, PAL.wbBorder);
    drawRect(x + 2, y + 2, 12, 10, PAL.whiteboard);
    drawRect(x + 3, y + 3, 5, 1, '#6688bb');
    drawRect(x + 3, y + 5, 8, 1, '#bb6666');
    drawRect(x + 3, y + 7, 4, 1, '#6688bb');
    drawRect(x + 9, y + 7, 3, 1, '#66aa66');
    drawRect(x + 3, y + 9, 6, 1, '#bb6666');
    drawRect(x + 3, y + 13, 10, 1, '#666677');
}

function drawCoffeeMachine(x, y) {
    drawRect(x + 4, y + 3, 8, 10, '#555566');
    drawRect(x + 4, y + 3, 8, 1, '#666677');
    drawRect(x + 5, y + 4, 6, 4, PAL.coffee);
    drawRect(x + 5, y + 4, 6, 1, '#7b5433');
    drawRect(x + 6, y + 10, 4, 3, PAL.coffeeMug);
    drawRect(x + 6, y + 10, 4, 1, '#ccccdd');
    drawRect(x + 10, y + 11, 1, 2, PAL.coffeeMug);
    if (Math.sin(performance.now() * 0.004) > 0) {
        drawPixel(x + 7, y + 8, '#aaaaaa');
        drawPixel(x + 8, y + 7, '#aaaaaa');
    }
}

function drawWindow(x, y) {
    drawRect(x, y, T, T, PAL.wallTop);
    drawRect(x + 2, y + 2, 12, 12, '#444466');
    drawRect(x + 3, y + 3, 10, 10, PAL.window);
    drawRect(x + 7, y + 2, 2, 12, '#444466');
    drawRect(x + 2, y + 7, 12, 2, '#444466');
    drawRect(x + 4, y + 4, 2, 2, PAL.windowLt);
    drawRect(x + 10, y + 4, 2, 2, PAL.windowLt);
}

function drawDoor(x, y) {
    drawRect(x, y, T, T, PAL.floorA);
    drawRect(x + 3, y + 0, 10, T, '#5a4030');
    drawRect(x + 4, y + 1, 8, 14, '#6a5040');
    drawRect(x + 10, y + 8, 2, 2, PAL.hudYellow);
    drawRect(x + 3, y + 0, 1, T, '#4a3020');
    drawRect(x + 12, y + 0, 1, T, '#4a3020');

    const pdx = Math.abs(player.gx - Math.floor(x / T));
    const pdy = Math.abs(player.gy - Math.floor(y / T));
    if (pdx <= 2 && pdy <= 2 && gameState.phase === 'play') {
        const bobY = Math.sin(performance.now() * 0.004) * 1;
        drawRect(x + 2, y - 7 + bobY, 12, 6, PAL.dialogBg);
        drawRect(x + 2, y - 7 + bobY, 12, 1, PAL.hireWarn);
        drawRect(x + 2, y - 2 + bobY, 12, 1, PAL.hireWarn);
        drawRect(x + 2, y - 7 + bobY, 1, 6, PAL.hireWarn);
        drawRect(x + 13, y - 7 + bobY, 1, 6, PAL.hireWarn);
        bctx.fillStyle = PAL.white;
        bctx.font = '4px monospace';
        bctx.fillText('HIRE', x + 4, y - 2 + bobY);
    }
}

function drawCofounderSpot(x, y) {
    drawFloorTile(x, y, x / T, y / T);
    drawRect(x + 1, y + 0, 14, 6, PAL.desk);
    drawRect(x + 1, y + 0, 14, 2, PAL.deskTop);
    drawRect(x + 4, y + 1, 8, 4, '#333344');
    drawRect(x + 5, y + 2, 6, 2, '#1a1a2e');
    const g = (Math.sin(performance.now() * 0.002) > 0) ? '#4477aa' : '#5588bb';
    drawPixel(x + 6, y + 2, g);
    drawPixel(x + 8, y + 2, g);
    drawPixel(x + 7, y + 3, g);
}

function drawTile(gx, gy) {
    const x = gx * T;
    const y = gy * T;
    const tile = getTile(gx, gy);

    switch (tile) {
        case FLOOR: drawFloorTile(x, y, gx, gy); break;
        case WALL_TOP: drawWallTop(x, y); break;
        case WALL_FACE: drawWallFace(x, y); break;
        case WALL_TRIM_TILE: drawWallTrimTile(x, y); break;
        case RUG: drawRug(x, y, gx, gy); break;
        case DOOR: drawDoor(x, y); break;
        case EMPTY: drawRect(x, y, T, T, PAL.bgDark); break;
        default: drawFloorTile(x, y, gx, gy); break;
    }
}

function drawObject(gx, gy) {
    const x = gx * T;
    const y = gy * T;
    const tile = getTile(gx, gy);

    switch (tile) {
        case DESK: drawDesk(x, y); break;
        case TERMINAL: drawTerminal(x, y); break;
        case CHAIR: drawChair(x, y); break;
        case PLANT: drawPlant(x, y); break;
        case WHITEBOARD: drawWhiteboard(x, y); break;
        case COFFEE_MACHINE: drawCoffeeMachine(x, y); break;
        case COFOUNDER_SPOT: drawCofounderSpot(x, y); break;
    }
}

// ============================================================
// CHARACTER SPRITES
// ============================================================
function drawPlayerSprite(px, py, dir, frame) {
    const x = Math.floor(px);
    const y = Math.floor(py);
    const walkBob = (frame % 2 === 1) ? -1 : 0;

    drawRect(x + 3, y + 14, 10, 2, PAL.shadow);

    if (dir === 0) {
        drawRect(x + 5, y + 14 + walkBob, 2, 2, PAL.shoes);
        drawRect(x + 9, y + 14 - walkBob, 2, 2, PAL.shoes);
        drawRect(x + 5, y + 11, 2, 4, PAL.pants);
        drawRect(x + 9, y + 11, 2, 4, PAL.pants);
        drawRect(x + 4, y + 5, 8, 7, PAL.hoodie);
        drawRect(x + 4, y + 5, 8, 1, PAL.hoodieDk);
        drawRect(x + 3, y + 6, 2, 5, PAL.hoodie);
        drawRect(x + 11, y + 6, 2, 5, PAL.hoodie);
        drawRect(x + 3, y + 11, 2, 1, PAL.skinTone);
        drawRect(x + 11, y + 11, 2, 1, PAL.skinTone);
        drawRect(x + 5, y + 4, 6, 2, PAL.hoodieDk);
        drawRect(x + 5, y + 1, 6, 5, PAL.skinTone);
        drawRect(x + 5, y + 0, 6, 2, PAL.hair);
        drawRect(x + 4, y + 1, 1, 2, PAL.hair);
        drawRect(x + 11, y + 1, 1, 2, PAL.hair);
        drawPixel(x + 6, y + 3, '#1a1a2e');
        drawPixel(x + 9, y + 3, '#1a1a2e');
        drawPixel(x + 7, y + 5, '#d4a880');
        drawPixel(x + 8, y + 5, '#d4a880');
    } else if (dir === 1) {
        drawRect(x + 5, y + 14 + walkBob, 2, 2, PAL.shoes);
        drawRect(x + 9, y + 14 - walkBob, 2, 2, PAL.shoes);
        drawRect(x + 5, y + 11, 2, 4, PAL.pants);
        drawRect(x + 9, y + 11, 2, 4, PAL.pants);
        drawRect(x + 4, y + 5, 8, 7, PAL.hoodie);
        drawRect(x + 3, y + 6, 2, 5, PAL.hoodie);
        drawRect(x + 11, y + 6, 2, 5, PAL.hoodie);
        drawRect(x + 5, y + 4, 6, 2, PAL.hoodieDk);
        drawRect(x + 5, y + 1, 6, 5, PAL.skinTone);
        drawRect(x + 4, y + 0, 8, 3, PAL.hair);
        drawRect(x + 5, y + 3, 6, 2, PAL.hair);
    } else if (dir === 2) {
        drawRect(x + 5, y + 14 + walkBob, 3, 2, PAL.shoes);
        drawRect(x + 8, y + 14 - walkBob, 2, 2, PAL.shoes);
        drawRect(x + 6, y + 11, 2, 4, PAL.pants);
        drawRect(x + 8, y + 11, 2, 4, PAL.pants);
        drawRect(x + 5, y + 5, 7, 7, PAL.hoodie);
        drawRect(x + 4, y + 6, 2, 5, PAL.hoodie);
        drawRect(x + 11, y + 7, 1, 4, PAL.hoodie);
        drawRect(x + 4, y + 11, 2, 1, PAL.skinTone);
        drawRect(x + 5, y + 4, 6, 2, PAL.hoodieDk);
        drawRect(x + 5, y + 1, 6, 5, PAL.skinTone);
        drawRect(x + 6, y + 0, 6, 3, PAL.hair);
        drawRect(x + 7, y + 3, 4, 1, PAL.hair);
        drawPixel(x + 6, y + 3, '#1a1a2e');
    } else {
        drawRect(x + 5, y + 14 + walkBob, 2, 2, PAL.shoes);
        drawRect(x + 8, y + 14 - walkBob, 3, 2, PAL.shoes);
        drawRect(x + 6, y + 11, 2, 4, PAL.pants);
        drawRect(x + 8, y + 11, 2, 4, PAL.pants);
        drawRect(x + 4, y + 5, 7, 7, PAL.hoodie);
        drawRect(x + 10, y + 6, 2, 5, PAL.hoodie);
        drawRect(x + 4, y + 7, 1, 4, PAL.hoodie);
        drawRect(x + 10, y + 11, 2, 1, PAL.skinTone);
        drawRect(x + 5, y + 4, 6, 2, PAL.hoodieDk);
        drawRect(x + 5, y + 1, 6, 5, PAL.skinTone);
        drawRect(x + 4, y + 0, 6, 3, PAL.hair);
        drawRect(x + 5, y + 3, 4, 1, PAL.hair);
        drawPixel(x + 9, y + 3, '#1a1a2e');
    }
}

function drawCofounderSprite(px, py) {
    const x = Math.floor(px);
    const y = Math.floor(py);
    const idle = Math.sin(performance.now() * 0.001) > 0.5 ? 1 : 0;

    drawRect(x + 3, y + 14, 10, 2, PAL.shadow);
    drawRect(x + 5, y + 14, 2, 2, PAL.shoes);
    drawRect(x + 9, y + 14, 2, 2, PAL.shoes);
    drawRect(x + 5, y + 11, 2, 4, '#333344');
    drawRect(x + 9, y + 11, 2, 4, '#333344');
    drawRect(x + 4, y + 5, 8, 7, PAL.cofHoodie);
    drawRect(x + 4, y + 5, 8, 1, '#554466');
    drawRect(x + 3, y + 6, 2, 5, PAL.cofHoodie);
    drawRect(x + 11, y + 6, 2, 5, PAL.cofHoodie);
    drawRect(x + 3, y + 11, 2, 1, PAL.skinTone);
    drawRect(x + 11, y + 11, 2, 1, PAL.skinTone);
    drawRect(x + 5, y + 4, 6, 2, '#554466');
    drawRect(x + 5, y + 1, 6, 5, PAL.skinTone);
    drawRect(x + 5, y + 0, 6, 2, '#2a2a3a');
    drawRect(x + 4, y + 1, 1, 2, '#2a2a3a');
    drawRect(x + 11, y + 1, 1, 3, '#2a2a3a');
    drawRect(x + 5, y + 3, 3, 2, '#444466');
    drawRect(x + 9, y + 3, 2, 2, '#444466');
    drawPixel(x + 8, y + 3, '#444466');
    drawPixel(x + 6, y + 3, '#aaccee');
    drawPixel(x + 9, y + 3, '#aaccee');
    if (idle && Math.sin(performance.now() * 0.0007) > 0.3) {
        drawRect(x + 13, y - 3, 5, 6, PAL.dialogBg);
        drawRect(x + 13, y - 3, 5, 1, PAL.dialogBdr);
        drawRect(x + 13, y + 2, 5, 1, PAL.dialogBdr);
        drawRect(x + 13, y - 3, 1, 6, PAL.dialogBdr);
        drawRect(x + 17, y - 3, 1, 6, PAL.dialogBdr);
        bctx.fillStyle = PAL.white;
        bctx.font = '5px monospace';
        bctx.fillText('?', x + 14, y + 1);
    }
}

// ============================================================
// EMPLOYEE SPRITES
// ============================================================
const EMP_POSITIONS = [
    { gx: 13, gy: 3, deskGx: 13, deskGy: 2 },
    { gx: 14, gy: 3, deskGx: 14, deskGy: 2 },
    { gx: 2, gy: 12, deskGx: 2, deskGy: 11 },
    { gx: 3, gy: 12, deskGx: 3, deskGy: 11 },
];

function drawEmployeeSprite(emp, posIndex) {
    const pos = EMP_POSITIONS[posIndex];
    if (!pos) return;

    const x = Math.floor(pos.gx * T);
    const y = Math.floor(pos.gy * T);

    const hoodieColor = emp.type === 'dev' ? PAL.devColor : PAL.salesColor;
    const hoodieDark = emp.type === 'dev' ? '#618a7a' : '#c2a06f';

    drawRect(x + 3, y + 14, 10, 2, PAL.shadow);
    drawRect(x + 5, y + 14, 2, 2, PAL.shoes);
    drawRect(x + 9, y + 14, 2, 2, PAL.shoes);
    drawRect(x + 5, y + 11, 2, 4, PAL.pants);
    drawRect(x + 9, y + 11, 2, 4, PAL.pants);
    drawRect(x + 4, y + 5, 8, 7, hoodieColor);
    drawRect(x + 4, y + 5, 8, 1, hoodieDark);
    drawRect(x + 3, y + 6, 2, 5, hoodieColor);
    drawRect(x + 11, y + 6, 2, 5, hoodieColor);
    drawRect(x + 3, y + 11, 2, 1, PAL.skinTone);
    drawRect(x + 11, y + 11, 2, 1, PAL.skinTone);
    drawRect(x + 5, y + 4, 6, 2, hoodieDark);
    drawRect(x + 5, y + 1, 6, 5, PAL.skinTone);
    const hairHash = emp.name.charCodeAt(0) % 4;
    const hairColors = ['#3a2a1a', '#5a3a1a', '#2a1a1a', '#6a4a2a'];
    const hairCol = hairColors[hairHash];
    drawRect(x + 5, y + 0, 6, 2, hairCol);
    drawRect(x + 4, y + 1, 1, 2, hairCol);
    drawRect(x + 11, y + 1, 1, 2, hairCol);
    drawPixel(x + 6, y + 3, '#1a1a2e');
    drawPixel(x + 9, y + 3, '#1a1a2e');

    if (gameState.phase === 'play') {
        const nameW = emp.name.length * 4 + 4;
        const tagX = x + 8 - nameW / 2;
        const tagColor = emp.type === 'dev' ? PAL.devColor : PAL.salesColor;
        drawRect(tagX, y - 4, nameW, 5, PAL.dialogBg);
        drawRect(tagX, y - 4, nameW, 1, tagColor);
        bctx.fillStyle = tagColor;
        bctx.font = '4px monospace';
        bctx.fillText(emp.name, tagX + 2, y);
    }
}

// ============================================================
// HUD
// ============================================================
function drawHUD() {
    const hudH = 28;
    const y = 0;

    drawRect(0, y, NATIVE_W, hudH, PAL.hudBg);
    drawRect(0, y + hudH - 1, NATIVE_W, 1, PAL.dialogBdr);

    bctx.font = '7px monospace';
    bctx.textBaseline = 'top';

    // Row 1
    bctx.fillStyle = PAL.hudTxt;
    bctx.fillText('Day ' + gameState.day, 4, y + 3);

    const cashColor = gameState.cash < 30000 ? PAL.hudRed : PAL.hudGreen;
    bctx.fillStyle = cashColor;
    bctx.fillText('$' + gameState.cash.toLocaleString(), 48, y + 3);

    bctx.fillStyle = PAL.hudYellow;
    bctx.fillText('MRR $' + gameState.mrr.toLocaleString(), 120, y + 3);

    bctx.fillStyle = PAL.hudTxt;
    bctx.fillText('Prod ' + gameState.productProgress + '%', 210, y + 3);

    const apX = 270;
    bctx.fillStyle = PAL.hudTxt;
    bctx.fillText('AP', apX, y + 3);
    for (let i = 0; i < gameState.maxAp; i++) {
        const dotColor = i < gameState.ap ? PAL.apFull : PAL.apEmpty;
        drawRect(apX + 16 + i * 8, y + 4, 6, 6, dotColor);
        drawRect(apX + 16 + i * 8, y + 4, 6, 1, i < gameState.ap ? '#7aea8a' : '#444455');
    }

    // Row 2
    const dailyMrrIncome = Math.floor(gameState.mrr / 30);
    const netBurn = gameState.dayBurn - dailyMrrIncome;
    const runway = netBurn > 0 ? Math.floor(gameState.cash / netBurn) : 999;
    const runwayColor = runway < 20 ? PAL.hudRed : runway < 40 ? PAL.hudYellow : PAL.hudGreen;
    bctx.fillStyle = runwayColor;
    bctx.fillText('~' + Math.min(runway, 999) + 'd runway', 4, y + 14);

    bctx.fillStyle = PAL.hireWarn;
    bctx.fillText('Burn $' + gameState.dayBurn.toLocaleString() + '/d', 90, y + 14);

    bctx.fillStyle = PAL.hudTxt;
    bctx.fillText(gameState.customers + ' cust', 185, y + 14);

    const devs = getDevCount();
    const sales = getSalesCount();
    let teamStr = 'Team ' + getTeamSize();
    if (devs > 0 || sales > 0) {
        teamStr += ' (';
        const parts = [];
        if (devs > 0) parts.push(devs + 'D');
        if (sales > 0) parts.push(sales + 'S');
        teamStr += parts.join('/');
        teamStr += ')';
    }
    bctx.fillStyle = PAL.hudTxt;
    bctx.fillText(teamStr, 235, y + 14);

    // Mute indicator
    if (AudioManager.muted) {
        bctx.fillStyle = PAL.hudRed;
        bctx.font = '5px monospace';
        bctx.fillText('MUTE', NATIVE_W - 24, y + 22);
    }
}

// ============================================================
// DIALOG BOX RENDERING
// ============================================================
function drawDialogBox() {
    if (!dialog.active) return;

    const bx = 8;
    const by = NATIVE_H - 64;
    const bw = NATIVE_W - 16;
    const bh = 56;

    drawRect(bx, by, bw, bh, PAL.dialogBg);
    drawRect(bx, by, bw, 2, PAL.dialogBdr);
    drawRect(bx, by + bh - 2, bw, 2, PAL.dialogBdr);
    drawRect(bx, by, 2, bh, PAL.dialogBdr);
    drawRect(bx + bw - 2, by, 2, bh, PAL.dialogBdr);
    drawRect(bx + 2, by + 2, 2, 2, PAL.dialogBdr);
    drawRect(bx + bw - 4, by + 2, 2, 2, PAL.dialogBdr);
    drawRect(bx + 2, by + bh - 4, 2, 2, PAL.dialogBdr);
    drawRect(bx + bw - 4, by + bh - 4, 2, 2, PAL.dialogBdr);

    bctx.font = '6px monospace';
    bctx.fillStyle = PAL.dialogTxt;
    bctx.textBaseline = 'top';

    const lines = wrapText(dialog.displayText, bw - 20);
    for (let i = 0; i < lines.length && i < 5; i++) {
        bctx.fillText(lines[i], bx + 8, by + 8 + i * 9);
    }

    if (dialog.done) {
        const blink = Math.sin(performance.now() * 0.006) > 0;
        if (blink) {
            const triX = bx + bw - 14;
            const triY = by + bh - 10;
            drawRect(triX, triY, 5, 1, PAL.dialogBdr);
            drawRect(triX + 1, triY + 1, 3, 1, PAL.dialogBdr);
            drawRect(triX + 2, triY + 2, 1, 1, PAL.dialogBdr);
        }
    }
}

function drawMenuBox() {
    if (!menu.active) return;

    const optCount = menu.options.length;
    const bx = 8;
    const by = NATIVE_H - 16 - optCount * 12 - 20;
    const bw = NATIVE_W - 16;
    const bh = optCount * 12 + 22;

    drawRect(bx, by, bw, bh, PAL.dialogBg);
    drawRect(bx, by, bw, 2, PAL.dialogBdr);
    drawRect(bx, by + bh - 2, bw, 2, PAL.dialogBdr);
    drawRect(bx, by, 2, bh, PAL.dialogBdr);
    drawRect(bx + bw - 2, by, 2, bh, PAL.dialogBdr);
    drawRect(bx + 2, by + 2, 2, 2, PAL.dialogBdr);
    drawRect(bx + bw - 4, by + 2, 2, 2, PAL.dialogBdr);
    drawRect(bx + 2, by + bh - 4, 2, 2, PAL.dialogBdr);
    drawRect(bx + bw - 4, by + bh - 4, 2, 2, PAL.dialogBdr);

    bctx.font = '6px monospace';
    bctx.fillStyle = PAL.hudYellow;
    bctx.textBaseline = 'top';
    bctx.fillText(menu.title, bx + 10, by + 5);

    for (let i = 0; i < optCount; i++) {
        const oy = by + 18 + i * 12;
        const disabled = menu.disabledIndices.includes(i);

        if (i === menu.cursor) {
            menu.cursorBlink += 0.05;
            const cursorColor = Math.sin(menu.cursorBlink * 3) > 0 ? PAL.cursorGrn : PAL.cursorLt;
            bctx.fillStyle = cursorColor;
            drawRect(bx + 8, oy + 1, 2, 5, cursorColor);
            drawRect(bx + 10, oy + 2, 1, 3, cursorColor);
            drawRect(bx + 11, oy + 3, 1, 1, cursorColor);
        }

        let optColor;
        if (disabled) {
            optColor = PAL.apEmpty;
        } else if (menu.optionColors.length > i && menu.optionColors[i]) {
            optColor = i === menu.cursor ? PAL.white : menu.optionColors[i];
        } else {
            optColor = i === menu.cursor ? PAL.white : PAL.dialogTxt;
        }

        bctx.fillStyle = optColor;
        bctx.fillText(menu.options[i], bx + 16, oy);
    }
}

function wrapText(text, maxWidth) {
    const lines = [];
    const paragraphs = text.split('\n');
    for (const para of paragraphs) {
        if (para === '') { lines.push(''); continue; }
        const words = para.split(' ');
        let line = '';
        for (const word of words) {
            const test = line ? line + ' ' + word : word;
            const w = bctx.measureText(test).width;
            if (w > maxWidth && line) {
                lines.push(line);
                line = word;
            } else {
                line = test;
            }
        }
        if (line) lines.push(line);
    }
    return lines;
}

// ============================================================
// GAME OVER SCREEN
// ============================================================
function drawGameOver() {
    drawRect(0, 0, NATIVE_W, NATIVE_H, '#0f0f1aDD');
    bctx.font = '12px monospace';
    bctx.fillStyle = PAL.hudRed;
    bctx.textBaseline = 'top';
    bctx.textAlign = 'center';
    bctx.fillText('GAME OVER', NATIVE_W / 2, 50);
    bctx.font = '7px monospace';
    bctx.fillStyle = PAL.dialogTxt;
    bctx.fillText('Your startup ran out of cash.', NATIVE_W / 2, 75);
    bctx.fillText('Day ' + gameState.day + '  |  ' + gameState.customers + ' customers  |  $' + gameState.mrr + ' MRR', NATIVE_W / 2, 90);

    bctx.fillStyle = PAL.hudTxt;
    bctx.fillText('Product: ' + gameState.productProgress + '%  |  Team: ' + getTeamSize(), NATIVE_W / 2, 108);
    if (gameState.employees.length > 0) {
        bctx.fillStyle = PAL.apEmpty;
        let empLine = 'Employees: ';
        empLine += gameState.employees.map(e => e.name + '(' + (e.type === 'dev' ? 'D' : 'S') + ')').join(', ');
        bctx.fillText(empLine, NATIVE_W / 2, 120);
    }

    bctx.font = '6px monospace';
    bctx.fillStyle = PAL.hudYellow;
    bctx.fillText('Press R to restart', NATIVE_W / 2, 145);
    bctx.textAlign = 'left';
}

// ============================================================
// TITLE SCREEN
// ============================================================
let titlePhase = true;
let titleBlink = 0;

function drawTitleScreen() {
    drawRect(0, 0, NATIVE_W, NATIVE_H, '#0f0f1a');

    for (let i = 0; i < 20; i++) {
        const shade = (i % 2 === 0) ? '#15152a' : '#12122a';
        drawRect(i * 16, 140, 16, 84, shade);
    }
    const glow = Math.sin(performance.now() * 0.003) > 0 ? PAL.monGlow : PAL.monGlowLt;
    drawRect(50, 155, 6, 3, glow);
    drawRect(130, 160, 6, 3, glow);
    drawRect(220, 150, 6, 3, glow);

    bctx.textAlign = 'center';
    bctx.textBaseline = 'top';

    bctx.font = '14px monospace';
    bctx.fillStyle = PAL.hudGreen;
    bctx.fillText('SaaS STARTUP', NATIVE_W / 2, 25);
    bctx.fillText('SIMULATOR', NATIVE_W / 2, 43);

    bctx.font = '6px monospace';
    bctx.fillStyle = PAL.hudYellow;
    bctx.fillText('A 16-bit tale of burn rates and pivot tables', NATIVE_W / 2, 65);

    bctx.font = '6px monospace';
    bctx.fillStyle = PAL.dialogTxt;
    bctx.fillText('Angel Funding: $150,000', NATIVE_W / 2, 85);
    bctx.fillText('Team: You + mysterious co-founder', NATIVE_W / 2, 97);
    bctx.fillText('Burn Rate: $2,740/day', NATIVE_W / 2, 109);

    bctx.fillStyle = PAL.hireWarn;
    bctx.fillText('NOW WITH SOUND! Press M to mute/unmute', NATIVE_W / 2, 125);

    titleBlink += 0.04;
    if (Math.sin(titleBlink * 2) > 0) {
        bctx.fillStyle = PAL.white;
        bctx.fillText('Press Z or ENTER to begin', NATIVE_W / 2, 185);
    }

    bctx.fillStyle = PAL.apEmpty;
    bctx.fillText('Arrow Keys / WASD: Move  |  Z / Enter: Interact', NATIVE_W / 2, 205);

    bctx.textAlign = 'left';
}

// ============================================================
// CRT SCANLINE POST-PROCESSING
// ============================================================
let crtEnabled = true;

function applyCRT() {
    if (!crtEnabled) return;
    const w = canvas.width;
    const h = canvas.height;

    // Scanlines — draw semi-transparent dark lines every 3 pixels (SCALE)
    ctx.fillStyle = 'rgba(0,0,0,0.12)';
    for (let y = 0; y < h; y += SCALE) {
        ctx.fillRect(0, y + SCALE - 1, w, 1);
    }

    // Subtle vignette corners
    const grd = ctx.createRadialGradient(w / 2, h / 2, w * 0.35, w / 2, h / 2, w * 0.7);
    grd.addColorStop(0, 'rgba(0,0,0,0)');
    grd.addColorStop(1, 'rgba(0,0,0,0.25)');
    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, w, h);
}

// ============================================================
// MOVEMENT
// ============================================================
function getMovementDir() {
    if (keys['ArrowUp'] || keys['KeyW']) return 1;
    if (keys['ArrowDown'] || keys['KeyS']) return 0;
    if (keys['ArrowLeft'] || keys['KeyA']) return 2;
    if (keys['ArrowRight'] || keys['KeyD']) return 3;
    return -1;
}

function tryMove(dir) {
    if (player.moving) return;

    const dx = [0, 0, -1, 1][dir];
    const dy = [1, -1, 0, 0][dir];
    const nx = player.gx + dx;
    const ny = player.gy + dy;

    player.dir = dir;

    for (let i = 0; i < gameState.employees.length; i++) {
        const pos = EMP_POSITIONS[i];
        if (pos && nx === pos.gx && ny === pos.gy) return;
    }

    if (!isSolid(nx, ny)) {
        player.gx = nx;
        player.gy = ny;
        player.tx = nx * T;
        player.ty = ny * T;
        player.moving = true;
        player.moveTimer = 0;
        player.frame = (player.frame + 1) % 4;
    }
}

function updatePlayer(dt) {
    if (player.moving) {
        player.moveTimer += dt;
        player.px = player.px + (player.tx - player.px) * Math.min(1, dt / (player.moveDuration * 0.4));
        player.py = player.py + (player.ty - player.py) * Math.min(1, dt / (player.moveDuration * 0.4));

        if (Math.abs(player.px - player.tx) < 0.5 && Math.abs(player.py - player.ty) < 0.5) {
            player.px = player.tx;
            player.py = player.ty;
            player.moving = false;
        }
    } else {
        player.px = player.gx * T;
        player.py = player.gy * T;
    }
}

// ============================================================
// CAMERA
// ============================================================
const camera = { x: 0, y: 0 };

function updateCamera() {
    const targetX = player.px + 8 - NATIVE_W / 2;
    const targetY = player.py + 8 - NATIVE_H / 2;
    const maxX = MAP_W * T - NATIVE_W;
    const maxY = MAP_H * T - NATIVE_H;
    camera.x = Math.max(0, Math.min(maxX, targetX));
    camera.y = Math.max(0, Math.min(maxY, targetY));
}

// ============================================================
// INTRO SEQUENCE
// ============================================================
let introShown = false;

function showIntro() {
    introShown = true;
    showDialog("Day 1. You've just signed the angel investment papers.", () => {
        showDialog("$150,000 in the bank. A mysterious co-founder. And a dream.", () => {
            showDialog("Walk to the TERMINAL (green monitor) and press Z to work.", () => {
                showDialog("Visit the DOOR to hire your first employee!", () => {
                    showDialog("You get 3 Action Points per day. Spend them wisely -- the burn rate is real.", () => {
                        // done
                    });
                });
            });
        });
    });
}

// ============================================================
// RESTART
// ============================================================
function restart() {
    gameState.day = 1;
    gameState.cash = 150000;
    gameState.mrr = 0;
    gameState.ap = 3;
    gameState.maxAp = 3;
    gameState.productProgress = 0;
    gameState.customers = 0;
    gameState.marketInsight = 0;
    gameState.phase = 'play';
    gameState.dayBurn = 2740;
    gameState.baseBurn = 2740;
    gameState.employees = [];
    usedNames.clear();
    player.gx = 9;
    player.gy = 7;
    player.px = 9 * T;
    player.py = 7 * T;
    player.tx = 9 * T;
    player.ty = 7 * T;
    player.dir = 0;
    player.moving = false;
    dialog.active = false;
    dialog.queue = [];
    menu.active = false;
    introShown = false;
    titlePhase = true;
    AudioManager.stopMusic();
}

// ============================================================
// MAIN LOOP
// ============================================================
let lastTime = performance.now();
let prevTitlePhase = true;
let prevGamePhase = 'play';

function gameLoop(now) {
    const dt = Math.min(now - lastTime, 50);
    lastTime = now;

    update(dt);

    bctx.clearRect(0, 0, NATIVE_W, NATIVE_H);
    render();

    ctx.imageSmoothingEnabled = false;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(buf, 0, 0, NATIVE_W, NATIVE_H, 0, 0, canvas.width, canvas.height);

    // CRT post-process on scaled canvas
    applyCRT();

    clearJustPressed();
    requestAnimationFrame(gameLoop);
}

function update(dt) {
    // Mute toggle — works in any phase
    if (consumePress('KeyM')) {
        if (!AudioManager.initialized) AudioManager.init();
        AudioManager.toggleMute();
    }

    if (titlePhase) {
        // Start title music
        if (AudioManager.initialized && AudioManager.currentTrack !== 'title') {
            AudioManager.playTitleTheme();
        }
        if (consumePress('KeyZ') || consumePress('Enter') || consumePress('Space')) {
            titlePhase = false;
            AudioManager.playGameplayBGM();
            showIntro();
        }
        return;
    }

    if (gameState.phase === 'gameOver') {
        if (AudioManager.currentTrack !== null && AudioManager.currentTrack !== 'jingle') {
            AudioManager.stopMusic();
        }
        if (consumePress('KeyR')) restart();
        return;
    }

    // Dialog input
    if (dialog.active) {
        if (!dialog.done) {
            dialog.charTimer += dt;
            while (dialog.charTimer >= dialog.charSpeed && dialog.charIndex < dialog.text.length) {
                dialog.charTimer -= dialog.charSpeed;
                dialog.charIndex++;
                dialog.displayText = dialog.text.substring(0, dialog.charIndex);
                AudioManager.playDialogTick();
            }
            if (dialog.charIndex >= dialog.text.length) {
                dialog.done = true;
            }
        }
        if (consumePress('KeyZ') || consumePress('Enter') || consumePress('Space')) {
            advanceDialog();
        }
        return;
    }

    // Menu input
    if (menu.active) {
        if (consumePress('ArrowUp') || consumePress('KeyW')) {
            do {
                menu.cursor = (menu.cursor - 1 + menu.options.length) % menu.options.length;
            } while (menu.disabledIndices.includes(menu.cursor));
            AudioManager.playSFX('cursor');
        }
        if (consumePress('ArrowDown') || consumePress('KeyS')) {
            do {
                menu.cursor = (menu.cursor + 1) % menu.options.length;
            } while (menu.disabledIndices.includes(menu.cursor));
            AudioManager.playSFX('cursor');
        }
        if (consumePress('KeyZ') || consumePress('Enter') || consumePress('Space')) {
            menuSelect();
        }
        if (consumePress('KeyX') || consumePress('Escape') || consumePress('Backspace')) {
            menu.cursor = menu.options.length - 1;
            menuSelect();
        }
        return;
    }

    // Movement
    if (gameState.phase === 'play') {
        const dir = getMovementDir();
        if (dir >= 0 && !player.moving) {
            if (dir !== lastDir) {
                holdTimer = 0;
                holdActive = false;
                lastDir = dir;
                tryMove(dir);
            } else {
                holdTimer += dt;
                if (!holdActive && holdTimer >= HOLD_DELAY) {
                    holdActive = true;
                    holdTimer = 0;
                    tryMove(dir);
                } else if (holdActive) {
                    if (holdTimer >= HOLD_REPEAT) {
                        holdTimer = 0;
                        tryMove(dir);
                    }
                } else if (consumePress('Arrow' + ['Down','Up','Left','Right'][dir]) ||
                           consumePress(['KeyS','KeyW','KeyA','KeyD'][dir])) {
                    tryMove(dir);
                }
            }
        } else if (dir < 0) {
            lastDir = -1;
            holdTimer = 0;
            holdActive = false;
        }

        // Interaction
        if (consumePress('KeyZ') || consumePress('Enter') || consumePress('Space')) {
            tryInteract();
        }
    }

    updatePlayer(dt);
    updateCamera();

    // Cofounder idle animation
    cofounder.idleTimer += dt;
    if (cofounder.idleTimer > 3000) {
        cofounder.idleTimer = 0;
        cofounder.dir = Math.floor(Math.random() * 4);
    }
}

// ============================================================
// RENDER
// ============================================================
function render() {
    if (titlePhase) {
        drawTitleScreen();
        return;
    }

    const cx = Math.floor(camera.x);
    const cy = Math.floor(camera.y);

    bctx.save();
    bctx.translate(-cx, -cy);

    const startGx = Math.max(0, Math.floor(cx / T));
    const startGy = Math.max(0, Math.floor(cy / T));
    const endGx = Math.min(MAP_W - 1, Math.floor((cx + NATIVE_W) / T));
    const endGy = Math.min(MAP_H - 1, Math.floor((cy + NATIVE_H) / T));

    for (let gy = startGy; gy <= endGy; gy++) {
        for (let gx = startGx; gx <= endGx; gx++) {
            drawTile(gx, gy);
        }
    }

    const renderables = [];

    for (let gy = startGy; gy <= endGy; gy++) {
        for (let gx = startGx; gx <= endGx; gx++) {
            const tile = getTile(gx, gy);
            if (tile === DESK || tile === TERMINAL || tile === CHAIR || tile === PLANT ||
                tile === WHITEBOARD || tile === COFFEE_MACHINE || tile === COFOUNDER_SPOT) {
                renderables.push({ type: 'tile', gx, gy, y: gy * T + T });
            }
        }
    }

    renderables.push({ type: 'player', y: player.py + T });
    renderables.push({ type: 'cofounder', y: (cofounder.gy + 1) * T + T });

    for (let i = 0; i < gameState.employees.length; i++) {
        const pos = EMP_POSITIONS[i];
        if (pos) {
            renderables.push({ type: 'employee', empIndex: i, y: pos.gy * T + T });
        }
    }

    renderables.sort((a, b) => a.y - b.y);

    for (const r of renderables) {
        if (r.type === 'tile') {
            drawObject(r.gx, r.gy);
        } else if (r.type === 'player') {
            drawPlayerSprite(player.px, player.py, player.dir, player.frame);
        } else if (r.type === 'cofounder') {
            drawCofounderSprite(cofounder.gx * T, (cofounder.gy + 1) * T);
        } else if (r.type === 'employee') {
            drawEmployeeSprite(gameState.employees[r.empIndex], r.empIndex);
        }
    }

    bctx.restore();

    drawHUD();
    drawDialogBox();
    drawMenuBox();

    if (gameState.phase === 'gameOver') {
        drawGameOver();
    }
}

// ============================================================
// START
// ============================================================
requestAnimationFrame(gameLoop);

</script>
</body>
</html>