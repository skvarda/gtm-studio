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
// SaaS STARTUP SIMULATOR — Round 12
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
    bgDark:'#1a1a2e', floorA:'#2a2a4a', floorB:'#252545',
    wallTop:'#533483', wallFace:'#2e2e4e', wallTrim:'#58b868',
    desk:'#5c4033', deskTop:'#7a5a42', deskLeg:'#4a3028',
    monitor:'#1a1a2e', monGlow:'#58b868', monGlowLt:'#a8e6a3',
    chair:'#333355', chairSeat:'#3d3d60',
    skinTone:'#f5c8a0', hoodie:'#4466aa', hoodieDk:'#335599',
    hair:'#3a2a1a', pants:'#2a2a4a', shoes:'#1a1a2e',
    cofounder:'#555577', cofHoodie:'#665577',
    dialogBg:'#1a1a2e', dialogBdr:'#58b868', dialogTxt:'#f5f0e1',
    hudBg:'#0f0f1aCC', hudTxt:'#f5f0e1', hudGreen:'#58b868',
    hudRed:'#e94560', hudYellow:'#f0c040', hudGold:'#f5c842',
    apFull:'#58b868', apEmpty:'#555566',
    positive:'#4ecca3', accent:'#e94560', neutral:'#a8a8b3',
    white:'#eaeaea', shadow:'#00000044',
    plant:'#2e8b40', plantDk:'#1e6b30', pot:'#8b5e3c', potDk:'#6b4e2c',
    rug:'#3a2255', rugB:'#4a3265',
    window:'#4488cc', windowLt:'#88bbee',
    whiteboard:'#d0d0e0', wbBorder:'#888899',
    coffee:'#6b4423', coffeeMug:'#ddddee',
};

// ============================================================
// TILE MAP
// ============================================================
const T = 16;
const MAP_W = 20;
const MAP_H = 14;

const EMPTY=0,FLOOR=1,WALL_TOP=2,WALL_FACE=3,DESK=4,CHAIR=5,
      TERMINAL=6,PLANT=7,COFOUNDER_SPOT=8,DOOR=9,RUG=10,
      WHITEBOARD=11,COFFEE_MACHINE=12,WINDOW_TILE=13,WALL_TRIM_TILE=14;

const SOLID={[EMPTY]:1,[FLOOR]:0,[WALL_TOP]:1,[WALL_FACE]:1,[DESK]:1,
    [CHAIR]:0,[TERMINAL]:1,[PLANT]:1,[COFOUNDER_SPOT]:1,[DOOR]:0,
    [RUG]:0,[WHITEBOARD]:1,[COFFEE_MACHINE]:1,[WINDOW_TILE]:1,[WALL_TRIM_TILE]:1};

const map = [
    [2,2,2,13,2,2,2,13,2,2,2,2,13,2,2,2,13,2,2,2],
    [3,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,3],
    [3,1,6,4,1,1,11,1,1,1,1,1,1,4,4,1,1,7,1,3],
    [3,1,1,5,1,1,1,1,1,1,1,1,1,5,5,1,1,1,1,3],
    [3,1,1,1,1,1,1,1,10,10,10,10,1,1,1,1,1,1,1,3],
    [3,1,1,1,1,1,1,1,10,10,10,10,1,1,1,1,1,1,1,3],
    [3,1,1,1,1,1,1,1,10,10,10,10,1,1,1,1,1,1,1,3],
    [3,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,3],
    [3,1,7,1,1,1,1,1,1,1,1,1,1,1,1,1,1,7,1,3],
    [3,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,3],
    [3,1,1,1,1,12,1,1,1,1,1,1,1,1,8,1,1,1,1,3],
    [3,1,4,4,1,1,1,1,1,1,1,1,1,4,4,1,1,1,1,3],
    [3,1,5,5,1,1,1,1,1,9,1,1,1,5,5,1,1,1,1,3],
    [14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14],
];

function getTile(gx,gy){if(gx<0||gy<0||gx>=MAP_W||gy>=MAP_H)return EMPTY;return map[gy][gx];}
function isSolid(gx,gy){return SOLID[getTile(gx,gy)]===1;}

// ============================================================
// PRODUCT MILESTONE TIERS
// ============================================================
const MILESTONES = [
    { name:'MVP', threshold:30, announced:false, desc:'Minimum Viable Product launched!' },
    { name:'Beta', threshold:60, announced:false, desc:'Beta release - early adopters incoming!' },
    { name:'V1.0', threshold:100, announced:false, desc:'Version 1.0 shipped! Market ready.' },
    { name:'Scale', threshold:150, announced:false, desc:'Platform at scale! Enterprise deals unlocked.' },
];
function getCurrentMilestone(pts){
    let m = null;
    for(let i=MILESTONES.length-1;i>=0;i--){if(pts>=MILESTONES[i].threshold){m=MILESTONES[i];break;}}
    return m;
}
function getNextMilestone(pts){
    for(let i=0;i<MILESTONES.length;i++){if(pts<MILESTONES[i].threshold)return MILESTONES[i];}
    return null;
}

// ============================================================
// RANDOM EVENT SYSTEM
// ============================================================
const EVENTS = [
    {
        id:'server_outage', type:'negative', weight:3, minDay:5,
        title:'Server Outage!',
        desc:'Your cloud provider is down. Customers are furious.',
        choiceA:'Throw money at it (-$8,000, quick fix)', choiceB:'Have devs fix it manually (-1 product pts, save cash)',
        effectA:(gs)=>{gs.cash-=8000; return 'Paid for emergency migration. Crisis averted.';},
        effectB:(gs)=>{gs.productPoints=Math.max(0,gs.productPoints-3); return 'Devs pulled an all-nighter. Some features rolled back.';},
    },
    {
        id:'viral_tweet', type:'positive', weight:3, minDay:5,
        title:'Viral Tweet!',
        desc:'Someone influential tweeted about your product!',
        choiceA:'Ride the wave (+5 customers)', choiceB:'Invest in content marketing (-$3,000, +8 customers)',
        effectA:(gs)=>{gs.customers+=5; return 'Free press! 5 new signups.';},
        effectB:(gs)=>{gs.cash-=3000;gs.customers+=8; return 'Doubled down on the buzz. 8 new signups!';},
    },
    {
        id:'dev_burnout', type:'negative', weight:2, minDay:7,
        title:'Developer Burnout',
        desc:'One of your developers is showing signs of burnout.',
        choiceA:'Give them a week off (-1 AP this day)', choiceB:'Push through (risk: -1 morale, small prod boost)',
        effectA:(gs)=>{gs.ap=Math.max(0,gs.ap-1); gs.teamMorale=Math.min(100,gs.teamMorale+10); return 'They came back refreshed. Morale improved.';},
        effectB:(gs)=>{gs.teamMorale=Math.max(0,gs.teamMorale-15); gs.productPoints+=2; return 'Features shipped, but the team feels it.';},
    },
    {
        id:'competitor_launch', type:'negative', weight:2, minDay:8,
        title:'Competitor Launch!',
        desc:'A well-funded competitor just launched a similar product.',
        choiceA:'Differentiate - pivot a feature (+3 product pts, -$5,000)', choiceB:'Undercut their pricing (-$2,000/mo MRR temporarily)',
        effectA:(gs)=>{gs.productPoints+=3;gs.cash-=5000; return 'Pivoted fast. Your niche is secure.';},
        effectB:(gs)=>{gs.mrr=Math.max(0,gs.mrr-200); return 'Price war! MRR dipped but you held customers.';},
    },
    {
        id:'angel_interest', type:'positive', weight:2, minDay:6,
        title:'Angel Investor Interest',
        desc:'An angel investor saw your demo and wants to talk.',
        choiceA:'Take the meeting - pitch for funding (+$25,000 if product>20)', choiceB:'Stay bootstrapped (+5 morale, independence)',
        effectA:(gs)=>{if(gs.productPoints>=20){gs.cash+=25000;return 'Nailed the pitch! $25K investment secured.';}else{return 'They passed... product not ready yet.';}},
        effectB:(gs)=>{gs.teamMorale=Math.min(100,gs.teamMorale+5); return 'Staying lean and mean. Team respects the hustle.';},
    },
    {
        id:'office_pest', type:'neutral', weight:2, minDay:5,
        title:'Office Raccoon',
        desc:'A raccoon somehow got into the server room.',
        choiceA:'Call animal control (-$500)', choiceB:'Befriend it (new office mascot, +3 morale)',
        effectA:(gs)=>{gs.cash-=500; return 'Raccoon relocated. Boring but effective.';},
        effectB:(gs)=>{gs.teamMorale=Math.min(100,gs.teamMorale+3); return 'Meet Rocket, your new office mascot!';},
    },
    {
        id:'techcrunch', type:'positive', weight:1, minDay:12, requireMilestone:'MVP',
        title:'TechCrunch Feature!',
        desc:'TechCrunch wants to write about your startup!',
        choiceA:'Full feature story (+10 customers, +$0)', choiceB:'Paid sponsorship (+15 customers, -$10,000)',
        effectA:(gs)=>{gs.customers+=10; return 'Great press! 10 new customers from the article.';},
        effectB:(gs)=>{gs.customers+=15;gs.cash-=10000; return 'Premium placement. 15 new customers!';},
    },
    {
        id:'key_hire_poach', type:'negative', weight:2, minDay:10,
        title:'Poaching Attempt!',
        desc:'Google is trying to recruit your best developer.',
        choiceA:'Counter-offer with equity (-$3,000 + keep them)', choiceB:'Let them go (lose 1 dev, save cash)',
        effectA:(gs)=>{gs.cash-=3000; gs.teamMorale=Math.min(100,gs.teamMorale+5); return 'They stayed! Loyalty earned.';},
        effectB:(gs)=>{let devs=gs.team.filter(t=>t.type==='dev');if(devs.length>0){gs.team.splice(gs.team.indexOf(devs[devs.length-1]),1);}return 'They left for Google. Team feels uneasy.';},
    },
    {
        id:'tax_surprise', type:'negative', weight:2, minDay:8,
        title:'Tax Surprise',
        desc:'Your accountant found an issue. You owe back taxes.',
        choiceA:'Pay immediately (-$6,000)', choiceB:'Contest it (-$2,000 lawyer fee, 50% chance of saving)',
        effectA:(gs)=>{gs.cash-=6000; return 'Taxes paid. Painful but clean books.';},
        effectB:(gs)=>{if(Math.random()>0.5){gs.cash-=2000;return 'Lawyer won! Only paid $2K in legal fees.';}else{gs.cash-=8000;return 'Lost the case. $2K legal + $6K taxes. Ouch.';}},
    },
    {
        id:'product_hunt', type:'positive', weight:2, minDay:7, requireMilestone:'MVP',
        title:'Product Hunt Launch!',
        desc:'Your MVP is getting traction on Product Hunt!',
        choiceA:'Engage the community (+7 customers, costs 1 AP)', choiceB:'Let it ride organically (+3 customers)',
        effectA:(gs)=>{gs.customers+=7;gs.ap=Math.max(0,gs.ap-1); return 'Community loved it! 7 new customers.';},
        effectB:(gs)=>{gs.customers+=3; return 'Steady organic growth. 3 new customers.';},
    },
    {
        id:'intern_prodigy', type:'positive', weight:2, minDay:6,
        title:'Intern Prodigy',
        desc:'A college intern applied. They seem... surprisingly good.',
        choiceA:'Hire them part-time (-$1,500/mo, +small dev output)', choiceB:'Pass (no cost, no gain)',
        effectA:(gs)=>{gs.team.push({type:'intern',name:'Intern',salary:1500,output:0.4,icon:'intern'});return 'Welcome aboard! They\'re already shipping code.';},
        effectB:(gs)=>{return 'Passed. Hope they don\'t end up at a competitor...';},
    },
    {
        id:'feature_request_whale', type:'neutral', weight:2, minDay:10, requireMilestone:'MVP',
        title:'Whale Customer Request',
        desc:'A huge potential customer wants a custom feature.',
        choiceA:'Build it (-5 product pts from roadmap, +$8,000 deal)', choiceB:'Decline (keep roadmap, +2 product pts)',
        effectA:(gs)=>{gs.productPoints=Math.max(0,gs.productPoints-5);gs.cash+=8000;gs.customers+=1; return 'Custom feature built. Big deal closed!';},
        effectB:(gs)=>{gs.productPoints+=2; return 'Stayed focused on the roadmap. Smart long-term play.';},
    },
];

function rollEvent(gs) {
    if (gs.day < 5) return null;
    if (Math.random() > 0.35) return null; // 35% chance per day
    const curMilestone = getCurrentMilestone(gs.productPoints);
    const eligible = EVENTS.filter(e => {
        if (gs.day < e.minDay) return false;
        if (e.requireMilestone) {
            if (!curMilestone) return false;
            const reqIdx = MILESTONES.findIndex(m => m.name === e.requireMilestone);
            const curIdx = MILESTONES.indexOf(curMilestone);
            if (curIdx < reqIdx) return false;
        }
        return true;
    });
    if (eligible.length === 0) return null;
    // Weighted random selection
    const totalWeight = eligible.reduce((s, e) => s + e.weight, 0);
    let r = Math.random() * totalWeight;
    for (const e of eligible) {
        r -= e.weight;
        if (r <= 0) return e;
    }
    return eligible[eligible.length - 1];
}

// ============================================================
// GAME STATE
// ============================================================
const gameState = {
    day: 1,
    cash: 150000,
    mrr: 0,
    ap: 3,
    maxAp: 3,
    productPoints: 0,
    customers: 0,
    teamMorale: 70,
    team: [],
    phase: 'title', // title, play, dialog, menu, dayEnd, event, gameover, milestone
    dialogQueue: [],
    currentDialog: null,
    menuOptions: [],
    menuCallback: null,
    menuIndex: 0,
    currentEvent: null,
    eventPhase: 'choice', // choice, result
    eventResult: '',
    milestoneAnnounce: null,
    player: { gx:9, gy:7, dir:0, animFrame:0, animTimer:0, moving:false },
    cofounder: { gx:14, gy:10, dir:2, animFrame:0, animTimer:0, bobTimer:0 },
    hiredDesks: [],
    dayEndSummary: null,
    interactCooldown: 0,
    dayTransition: 0,
    dayTransitionPhase: '',
    notifications: [],
    particleEffects: [],
    cameraBob: 0,
    time: 0,
    endgamePath: null,
    gameOverReason: '',
    totalRevenue: 0,
    totalSpent: 0,
};

const GS = gameState;

// Input
const keys = {};
const justPressed = {};
document.addEventListener('keydown', e => {
    if (!keys[e.key]) justPressed[e.key] = true;
    keys[e.key] = true;
    e.preventDefault();
});
document.addEventListener('keyup', e => { keys[e.key] = false; });
function consumeKey(k) { if (justPressed[k]) { justPressed[k] = false; return true; } return false; }

// ============================================================
// TEXT RENDERING (Pixel Font)
// ============================================================
const CHAR_W = 5, CHAR_H = 7, CHAR_GAP = 1;
const FONT_CHARS = {
    'A':[0x7C,0x12,0x11,0x12,0x7C],'B':[0x7F,0x49,0x49,0x49,0x36],'C':[0x3E,0x41,0x41,0x41,0x22],
    'D':[0x7F,0x41,0x41,0x22,0x1C],'E':[0x7F,0x49,0x49,0x49,0x41],'F':[0x7F,0x09,0x09,0x09,0x01],
    'G':[0x3E,0x41,0x49,0x49,0x7A],'H':[0x7F,0x08,0x08,0x08,0x7F],'I':[0x00,0x41,0x7F,0x41,0x00],
    'J':[0x20,0x40,0x41,0x3F,0x01],'K':[0x7F,0x08,0x14,0x22,0x41],'L':[0x7F,0x40,0x40,0x40,0x40],
    'M':[0x7F,0x02,0x0C,0x02,0x7F],'N':[0x7F,0x04,0x08,0x10,0x7F],'O':[0x3E,0x41,0x41,0x41,0x3E],
    'P':[0x7F,0x09,0x09,0x09,0x06],'Q':[0x3E,0x41,0x51,0x21,0x5E],'R':[0x7F,0x09,0x19,0x29,0x46],
    'S':[0x46,0x49,0x49,0x49,0x31],'T':[0x01,0x01,0x7F,0x01,0x01],'U':[0x3F,0x40,0x40,0x40,0x3F],
    'V':[0x1F,0x20,0x40,0x20,0x1F],'W':[0x3F,0x40,0x38,0x40,0x3F],'X':[0x63,0x14,0x08,0x14,0x63],
    'Y':[0x07,0x08,0x70,0x08,0x07],'Z':[0x61,0x51,0x49,0x45,0x43],
    '0':[0x3E,0x51,0x49,0x45,0x3E],'1':[0x00,0x42,0x7F,0x40,0x00],'2':[0x42,0x61,0x51,0x49,0x46],
    '3':[0x21,0x41,0x45,0x4B,0x31],'4':[0x18,0x14,0x12,0x7F,0x10],'5':[0x27,0x45,0x45,0x45,0x39],
    '6':[0x3C,0x4A,0x49,0x49,0x30],'7':[0x01,0x71,0x09,0x05,0x03],'8':[0x36,0x49,0x49,0x49,0x36],
    '9':[0x06,0x49,0x49,0x29,0x1E],
    ' ':[0,0,0,0,0],'!':[0x00,0x00,0x5F,0x00,0x00],'?':[0x02,0x01,0x51,0x09,0x06],
    '.':[0x00,0x60,0x60,0x00,0x00],',':[0x00,0x80,0x60,0x00,0x00],
    '-':[0x08,0x08,0x08,0x08,0x08],'+':[0x08,0x08,0x3E,0x08,0x08],
    ':':[0x00,0x36,0x36,0x00,0x00],'/':[0x20,0x10,0x08,0x04,0x02],
    '$':[0x24,0x2A,0x7F,0x2A,0x12],'%':[0x23,0x13,0x08,0x64,0x62],
    '(':[0x00,0x1C,0x22,0x41,0x00],')':[0x00,0x41,0x22,0x1C,0x00],
    '#':[0x14,0x7F,0x14,0x7F,0x14],'@':[0x3E,0x41,0x5D,0x55,0x1E],
    '\'':[0x00,0x00,0x07,0x00,0x00],'"':[0x00,0x07,0x00,0x07,0x00],
    '<':[0x08,0x14,0x22,0x41,0x00],'>':[0x00,0x41,0x22,0x14,0x08],
    '=':[0x14,0x14,0x14,0x14,0x14],'_':[0x40,0x40,0x40,0x40,0x40],
    '&':[0x36,0x49,0x55,0x22,0x50],'*':[0x14,0x08,0x3E,0x08,0x14],
};

function drawChar(ctx, ch, x, y, color) {
    const data = FONT_CHARS[ch.toUpperCase()];
    if (!data) return;
    ctx.fillStyle = color;
    for (let col = 0; col < 5; col++) {
        for (let row = 0; row < 7; row++) {
            if (data[col] & (1 << row)) {
                ctx.fillRect(x + col, y + row, 1, 1);
            }
        }
    }
}

function drawText(ctx, text, x, y, color, scale) {
    scale = scale || 1;
    const str = String(text);
    let cx = x;
    for (let i = 0; i < str.length; i++) {
        if (scale === 1) {
            drawChar(ctx, str[i], cx, y, color);
        } else {
            // Render to temp then scale
            for (let col = 0; col < 5; col++) {
                const data = FONT_CHARS[str[i].toUpperCase()];
                if (!data) continue;
                for (let row = 0; row < 7; row++) {
                    if (data[col] & (1 << row)) {
                        ctx.fillStyle = color;
                        ctx.fillRect(cx + col * scale, y + row * scale, scale, scale);
                    }
                }
            }
        }
        cx += (CHAR_W + CHAR_GAP) * scale;
    }
}

function textWidth(text, scale) {
    scale = scale || 1;
    return String(text).length * (CHAR_W + CHAR_GAP) * scale - CHAR_GAP * scale;
}

function drawTextCentered(ctx, text, cx, y, color, scale) {
    drawText(ctx, text, cx - textWidth(text, scale) / 2, y, color, scale);
}

function wordWrap(text, maxW, scale) {
    scale = scale || 1;
    const words = text.split(' ');
    const lines = [];
    let line = '';
    for (const word of words) {
        const test = line ? line + ' ' + word : word;
        if (textWidth(test, scale) > maxW && line) {
            lines.push(line);
            line = word;
        } else {
            line = test;
        }
    }
    if (line) lines.push(line);
    return lines;
}

// ============================================================
// SPRITE DRAWING
// ============================================================
function drawPlayer(ctx, x, y, dir, frame, time) {
    const bob = Math.sin(time * 6) * 0.5;
    const py = Math.round(y + bob);
    // Shadow
    ctx.fillStyle = PAL.shadow;
    ctx.fillRect(x + 2, y + 14, 12, 3);
    // Shoes
    ctx.fillStyle = PAL.shoes;
    ctx.fillRect(x + 3, py + 13, 4, 2);
    ctx.fillRect(x + 9, py + 13, 4, 2);
    // Pants
    ctx.fillStyle = PAL.pants;
    ctx.fillRect(x + 3, py + 10, 4, 3);
    ctx.fillRect(x + 9, py + 10, 4, 3);
    // Hoodie body
    ctx.fillStyle = PAL.hoodie;
    ctx.fillRect(x + 2, py + 4, 12, 7);
    ctx.fillStyle = PAL.hoodieDk;
    ctx.fillRect(x + 7, py + 4, 2, 7);
    // Arms
    const armSwing = Math.sin(time * 8) * 1.5;
    ctx.fillStyle = PAL.hoodie;
    ctx.fillRect(x + 0, py + 5 + Math.round(armSwing), 2, 5);
    ctx.fillRect(x + 14, py + 5 - Math.round(armSwing), 2, 5);
    // Hands
    ctx.fillStyle = PAL.skinTone;
    ctx.fillRect(x + 0, py + 9 + Math.round(armSwing), 2, 2);
    ctx.fillRect(x + 14, py + 9 - Math.round(armSwing), 2, 2);
    // Head
    ctx.fillStyle = PAL.skinTone;
    ctx.fillRect(x + 4, py + 0, 8, 5);
    // Hair
    ctx.fillStyle = PAL.hair;
    ctx.fillRect(x + 3, py - 1, 10, 3);
    // Eyes
    ctx.fillStyle = '#fff';
    if (dir === 0) { // down
        ctx.fillRect(x + 5, py + 2, 2, 2);
        ctx.fillRect(x + 9, py + 2, 2, 2);
        ctx.fillStyle = '#222';
        ctx.fillRect(x + 6, py + 3, 1, 1);
        ctx.fillRect(x + 10, py + 3, 1, 1);
    } else if (dir === 1) { // up
        ctx.fillRect(x + 5, py + 1, 2, 2);
        ctx.fillRect(x + 9, py + 1, 2, 2);
    } else if (dir === 2) { // left
        ctx.fillRect(x + 4, py + 2, 2, 2);
        ctx.fillRect(x + 8, py + 2, 2, 2);
        ctx.fillStyle = '#222';
        ctx.fillRect(x + 4, py + 3, 1, 1);
        ctx.fillRect(x + 8, py + 3, 1, 1);
    } else { // right
        ctx.fillRect(x + 6, py + 2, 2, 2);
        ctx.fillRect(x + 10, py + 2, 2, 2);
        ctx.fillStyle = '#222';
        ctx.fillRect(x + 7, py + 3, 1, 1);
        ctx.fillRect(x + 11, py + 3, 1, 1);
    }
    // Hood
    ctx.fillStyle = PAL.hoodieDk;
    ctx.fillRect(x + 3, py + 3, 1, 3);
    ctx.fillRect(x + 12, py + 3, 1, 3);
}

function drawCofounder(ctx, x, y, time) {
    const bob = Math.sin(time * 2 + 1) * 0.5;
    const py = Math.round(y + bob);
    ctx.fillStyle = PAL.shadow;
    ctx.fillRect(x + 2, y + 14, 12, 3);
    ctx.fillStyle = PAL.shoes;
    ctx.fillRect(x + 3, py + 13, 4, 2);
    ctx.fillRect(x + 9, py + 13, 4, 2);
    ctx.fillStyle = PAL.pants;
    ctx.fillRect(x + 3, py + 10, 4, 3);
    ctx.fillRect(x + 9, py + 10, 4, 3);
    ctx.fillStyle = PAL.cofHoodie;
    ctx.fillRect(x + 2, py + 4, 12, 7);
    ctx.fillStyle = PAL.cofounder;
    ctx.fillRect(x + 0, py + 5, 2, 5);
    ctx.fillRect(x + 14, py + 5, 2, 5);
    ctx.fillStyle = PAL.skinTone;
    ctx.fillRect(x + 4, py + 0, 8, 5);
    ctx.fillStyle = '#444';
    ctx.fillRect(x + 3, py - 1, 10, 3);
    // Sunglasses
    ctx.fillStyle = '#111';
    ctx.fillRect(x + 4, py + 1, 3, 2);
    ctx.fillRect(x + 9, py + 1, 3, 2);
    ctx.fillRect(x + 7, py + 1, 2, 1);
    // Mysterious glow
    const glowAlpha = 0.15 + Math.sin(time * 3) * 0.1;
    ctx.fillStyle = `rgba(102, 85, 119, ${glowAlpha})`;
    ctx.fillRect(x - 1, py - 2, 18, 19);
}

function drawHiredNPC(ctx, x, y, type, time, idx) {
    const bob = Math.sin(time * 2.5 + idx * 1.3) * 0.5;
    const py = Math.round(y + bob);
    ctx.fillStyle = PAL.shadow;
    ctx.fillRect(x + 2, y + 14, 12, 3);
    ctx.fillStyle = PAL.shoes;
    ctx.fillRect(x + 3, py + 13, 4, 2);
    ctx.fillRect(x + 9, py + 13, 4, 2);
    ctx.fillStyle = PAL.pants;
    ctx.fillRect(x + 3, py + 10, 4, 3);
    ctx.fillRect(x + 9, py + 10, 4, 3);
    const color = type === 'dev' ? '#44aa66' : type === 'sales' ? '#aa6644' : '#6688aa';
    const colorDk = type === 'dev' ? '#338855' : type === 'sales' ? '#885533' : '#557799';
    ctx.fillStyle = color;
    ctx.fillRect(x + 2, py + 4, 12, 7);
    ctx.fillStyle = colorDk;
    ctx.fillRect(x + 0, py + 5, 2, 5);
    ctx.fillRect(x + 14, py + 5, 2, 5);
    ctx.fillStyle = PAL.skinTone;
    ctx.fillRect(x + 4, py + 0, 8, 5);
    ctx.fillStyle = type === 'dev' ? '#2a5a2a' : type === 'sales' ? '#5a3a2a' : '#3a4a5a';
    ctx.fillRect(x + 3, py - 1, 10, 3);
    ctx.fillStyle = '#fff';
    ctx.fillRect(x + 5, py + 2, 2, 2);
    ctx.fillRect(x + 9, py + 2, 2, 2);
    ctx.fillStyle = '#222';
    ctx.fillRect(x + 6, py + 3, 1, 1);
    ctx.fillRect(x + 10, py + 3, 1, 1);
}

// ============================================================
// TILE RENDERING
// ============================================================
function drawTile(ctx, tile, x, y, time) {
    switch (tile) {
        case FLOOR:
            ctx.fillStyle = ((Math.floor(x/T) + Math.floor(y/T)) % 2 === 0) ? PAL.floorA : PAL.floorB;
            ctx.fillRect(x, y, T, T);
            break;
        case WALL_TOP:
            ctx.fillStyle = PAL.wallTop;
            ctx.fillRect(x, y, T, T);
            ctx.fillStyle = PAL.wallFace;
            ctx.fillRect(x, y + 12, T, 4);
            break;
        case WALL_FACE:
            ctx.fillStyle = PAL.wallFace;
            ctx.fillRect(x, y, T, T);
            ctx.fillStyle = PAL.wallTop;
            ctx.fillRect(x + 2, y + 2, 12, 1);
            break;
        case WALL_TRIM_TILE:
            ctx.fillStyle = PAL.wallFace;
            ctx.fillRect(x, y, T, T);
            ctx.fillStyle = PAL.wallTrim;
            ctx.fillRect(x, y, T, 3);
            ctx.fillStyle = PAL.wallTop;
            ctx.fillRect(x, y + 3, T, 2);
            break;
        case DESK:
            ctx.fillStyle = ((Math.floor(x/T) + Math.floor(y/T)) % 2 === 0) ? PAL.floorA : PAL.floorB;
            ctx.fillRect(x, y, T, T);
            ctx.fillStyle = PAL.deskLeg;
            ctx.fillRect(x + 1, y + 12, 2, 4);
            ctx.fillRect(x + 13, y + 12, 2, 4);
            ctx.fillStyle = PAL.desk;
            ctx.fillRect(x, y + 6, T, 6);
            ctx.fillStyle = PAL.deskTop;
            ctx.fillRect(x, y + 5, T, 2);
            // Monitor
            ctx.fillStyle = PAL.monitor;
            ctx.fillRect(x + 4, y + 0, 8, 5);
            const glow = Math.sin(time * 4 + x) > 0.5 ? PAL.monGlowLt : PAL.monGlow;
            ctx.fillStyle = glow;
            ctx.fillRect(x + 5, y + 1, 6, 3);
            break;
        case CHAIR:
            ctx.fillStyle = ((Math.floor(x/T) + Math.floor(y/T)) % 2 === 0) ? PAL.floorA : PAL.floorB;
            ctx.fillRect(x, y, T, T);
            ctx.fillStyle = PAL.chair;
            ctx.fillRect(x + 3, y + 2, 10, 3);
            ctx.fillStyle = PAL.chairSeat;
            ctx.fillRect(x + 4, y + 5, 8, 6);
            ctx.fillStyle = PAL.chair;
            ctx.fillRect(x + 6, y + 11, 4, 4);
            break;
        case TERMINAL:
            ctx.fillStyle = ((Math.floor(x/T) + Math.floor(y/T)) % 2 === 0) ? PAL.floorA : PAL.floorB;
            ctx.fillRect(x, y, T, T);
            ctx.fillStyle = PAL.deskLeg;
            ctx.fillRect(x + 1, y + 12, 2, 4);
            ctx.fillRect(x + 13, y + 12, 2, 4);
            ctx.fillStyle = PAL.desk;
            ctx.fillRect(x, y + 6, T, 6);
            ctx.fillStyle = PAL.deskTop;
            ctx.fillRect(x, y + 5, T, 2);
            ctx.fillStyle = '#111';
            ctx.fillRect(x + 2, y - 1, 12, 6);
            const tGlow = Math.sin(time * 3) > 0 ? '#33ff66' : '#22dd55';
            ctx.fillStyle = tGlow;
            ctx.fillRect(x + 3, y, 10, 4);
            // Terminal text lines
            ctx.fillStyle = '#115522';
            for (let i = 0; i < 3; i++) ctx.fillRect(x + 4, y + i + 1, 6 - i, 1);
            break;
        case PLANT:
            ctx.fillStyle = ((Math.floor(x/T) + Math.floor(y/T)) % 2 === 0) ? PAL.floorA : PAL.floorB;
            ctx.fillRect(x, y, T, T);
            ctx.fillStyle = PAL.potDk;
            ctx.fillRect(x + 4, y + 10, 8, 6);
            ctx.fillStyle = PAL.pot;
            ctx.fillRect(x + 3, y + 9, 10, 2);
            ctx.fillStyle = PAL.plantDk;
            ctx.fillRect(x + 6, y + 3, 4, 7);
            ctx.fillStyle = PAL.plant;
            ctx.fillRect(x + 3, y + 0, 10, 5);
            ctx.fillRect(x + 5, y - 1, 6, 2);
            const sway = Math.sin(time * 1.5 + x) * 1;
            ctx.fillStyle = PAL.plant;
            ctx.fillRect(x + 2 + Math.round(sway), y + 1, 3, 3);
            ctx.fillRect(x + 11 - Math.round(sway), y + 1, 3, 3);
            break;
        case COFOUNDER_SPOT:
            ctx.fillStyle = ((Math.floor(x/T) + Math.floor(y/T)) % 2 === 0) ? PAL.floorA : PAL.floorB;
            ctx.fillRect(x, y, T, T);
            break;
        case DOOR:
            ctx.fillStyle = PAL.floorA;
            ctx.fillRect(x, y, T, T);
            ctx.fillStyle = '#6b4423';
            ctx.fillRect(x + 2, y, 12, T);
            ctx.fillStyle = '#8b6443';
            ctx.fillRect(x + 3, y + 1, 10, 6);
            ctx.fillRect(x + 3, y + 9, 10, 5);
            ctx.fillStyle = '#ffd700';
            ctx.fillRect(x + 11, y + 7, 2, 2);
            break;
        case RUG:
            const rx = Math.floor(x / T), ry = Math.floor(y / T);
            ctx.fillStyle = ((rx + ry) % 2 === 0) ? PAL.rug : PAL.rugB;
            ctx.fillRect(x, y, T, T);
            ctx.fillStyle = PAL.rugB;
            ctx.fillRect(x + 6, y + 6, 4, 4);
            break;
        case WHITEBOARD:
            ctx.fillStyle = PAL.floorA;
            ctx.fillRect(x, y, T, T);
            ctx.fillStyle = PAL.wbBorder;
            ctx.fillRect(x + 1, y + 1, 14, 12);
            ctx.fillStyle = PAL.whiteboard;
            ctx.fillRect(x + 2, y + 2, 12, 10);
            ctx.fillStyle = '#aa3333';
            ctx.fillRect(x + 3, y + 4, 8, 1);
            ctx.fillStyle = '#3333aa';
            ctx.fillRect(x + 3, y + 6, 6, 1);
            ctx.fillStyle = '#33aa33';
            ctx.fillRect(x + 3, y + 8, 9, 1);
            break;
        case COFFEE_MACHINE:
            ctx.fillStyle = ((Math.floor(x/T) + Math.floor(y/T)) % 2 === 0) ? PAL.floorA : PAL.floorB;
            ctx.fillRect(x, y, T, T);
            ctx.fillStyle = PAL.coffee;
            ctx.fillRect(x + 3, y + 2, 10, 12);
            ctx.fillStyle = '#8b6443';
            ctx.fillRect(x + 4, y + 3, 8, 4);
            ctx.fillStyle = PAL.coffeeMug;
            ctx.fillRect(x + 5, y + 9, 4, 4);
            ctx.fillStyle = '#96643a';
            ctx.fillRect(x + 6, y + 9, 2, 2);
            // Steam
            const steam = Math.sin(time * 5) > 0;
            if (steam) {
                ctx.fillStyle = 'rgba(255,255,255,0.3)';
                ctx.fillRect(x + 6, y + 6, 1, 2);
                ctx.fillRect(x + 8, y + 5, 1, 2);
            }
            break;
        case WINDOW_TILE:
            ctx.fillStyle = PAL.wallTop;
            ctx.fillRect(x, y, T, T);
            ctx.fillStyle = PAL.window;
            ctx.fillRect(x + 2, y + 2, 12, 10);
            ctx.fillStyle = PAL.windowLt;
            ctx.fillRect(x + 3, y + 3, 5, 4);
            const clouds = Math.sin(time * 0.5 + x * 0.3);
            if (clouds > 0.3) {
                ctx.fillStyle = 'rgba(255,255,255,0.4)';
                ctx.fillRect(x + 4 + Math.round(clouds * 3), y + 4, 3, 2);
            }
            ctx.fillStyle = PAL.wallFace;
            ctx.fillRect(x, y + 12, T, 4);
            break;
    }
}

// ============================================================
// NOTIFICATION SYSTEM
// ============================================================
function addNotification(text, color, duration) {
    GS.notifications.push({ text, color: color || PAL.white, timer: 0, duration: duration || 120 });
}

// ============================================================
// PARTICLE SYSTEM
// ============================================================
function spawnParticles(x, y, color, count) {
    for (let i = 0; i < count; i++) {
        GS.particleEffects.push({
            x, y, vx: (Math.random() - 0.5) * 2, vy: -Math.random() * 2 - 1,
            color, life: 30 + Math.random() * 30, maxLife: 60,
        });
    }
}

// ============================================================
// DIALOG / MENU SYSTEM
// ============================================================
function showDialog(lines, callback) {
    if (typeof lines === 'string') lines = [lines];
    GS.dialogQueue = lines.slice(1);
    GS.currentDialog = { text: lines[0], callback: lines.length <= 1 ? callback : null };
    GS.phase = 'dialog';
}

function showMenu(prompt, options, callback) {
    GS.menuPrompt = prompt;
    GS.menuOptions = options;
    GS.menuCallback = callback;
    GS.menuIndex = 0;
    GS.phase = 'menu';
}

function advanceDialog() {
    if (GS.dialogQueue.length > 0) {
        const cb = GS.dialogQueue.length === 1 ? GS.currentDialog.callback : null;
        GS.currentDialog = { text: GS.dialogQueue.shift(), callback: cb };
    } else {
        const cb = GS.currentDialog.callback;
        GS.currentDialog = null;
        GS.phase = 'play';
        if (cb) cb();
    }
}

// ============================================================
// INTERACTION SYSTEM
// ============================================================
const HIRE_DESKS = [
    { gx: 13, gy: 3 }, { gx: 14, gy: 3 }, { gx: 2, gy: 3 },
    { gx: 2, gy: 12 }, { gx: 3, gy: 12 }, { gx: 13, gy: 12 }, { gx: 14, gy: 12 },
];

function getFacingTile() {
    const p = GS.player;
    const dx = [0, 0, -1, 1][p.dir];
    const dy = [1, -1, 0, 0][p.dir];
    return { gx: p.gx + dx, gy: p.gy + dy };
}

function interact() {
    if (GS.interactCooldown > 0) return;
    GS.interactCooldown = 10;
    const facing = getFacingTile();
    const tile = getTile(facing.gx, facing.gy);

    // Co-founder interaction
    if (facing.gx === GS.cofounder.gx && facing.gy === GS.cofounder.gy) {
        interactCofounder();
        return;
    }

    // Hired NPC at desk
    for (const h of GS.hiredDesks) {
        if (h.gx === facing.gx && h.gy === facing.gy && h.member) {
            const m = h.member;
            const output = m.type === 'dev' ? 'coding features' : m.type === 'sales' ? 'closing deals' : 'interning';
            showDialog([`${m.name} is busy ${output}.`, `Salary: $${m.salary}/mo`]);
            return;
        }
    }

    switch (tile) {
        case TERMINAL:
            interactTerminal();
            break;
        case WHITEBOARD:
            interactWhiteboard();
            break;
        case COFFEE_MACHINE:
            interactCoffee();
            break;
        case DOOR:
            interactDoor();
            break;
        case DESK:
            // Check if it's a hire-able desk
            const deskIdx = HIRE_DESKS.findIndex(d => d.gx === facing.gx && d.gy === facing.gy);
            if (deskIdx >= 0 && !GS.hiredDesks.find(h => h.gx === facing.gx && h.gy === facing.gy)) {
                interactEmptyDesk(facing);
            } else {
                showDialog('Just a desk with some clutter.');
            }
            break;
        default:
            break;
    }
}

function interactTerminal() {
    if (GS.ap <= 0) { showDialog('No action points left. End the day to continue.'); return; }
    showMenu('Your Terminal', ['Code (+3 Product)', 'Review Metrics', 'End Day', 'Cancel'], (idx) => {
        if (idx === 0) {
            GS.ap--;
            const bonus = GS.teamMorale >= 80 ? 1 : 0;
            const pts = 3 + bonus;
            GS.productPoints += pts;
            spawnParticles(GS.player.gx * T + 8, GS.player.gy * T, PAL.monGlow, 8);
            addNotification('+' + pts + ' PRODUCT', PAL.positive);
            checkMilestones();
            showDialog('You wrote some clean code.' + (bonus ? ' High morale boost!' : ''));
        } else if (idx === 1) {
            const next = getNextMilestone(GS.productPoints);
            const cur = getCurrentMilestone(GS.productPoints);
            const milestoneStr = cur ? cur.name : 'None';
            const nextStr = next ? `${next.name} (${next.threshold - GS.productPoints} pts away)` : 'MAX';
            showDialog([
                `Day ${GS.day} | Cash: $${GS.cash.toLocaleString()}`,
                `MRR: $${GS.mrr.toLocaleString()} | Customers: ${GS.customers}`,
                `Product: ${GS.productPoints} pts | Milestone: ${milestoneStr}`,
                `Next: ${nextStr} | Morale: ${GS.teamMorale}%`,
                `Team: ${GS.team.length} members | Burn: $${getMonthlyBurn().toLocaleString()}/mo`,
            ]);
        } else if (idx === 2) {
            endDay();
        }
    });
}

function interactWhiteboard() {
    if (GS.ap <= 0) { showDialog('No action points left.'); return; }
    showMenu('Whiteboard', ['Plan Features (+2 Product, 1 AP)', 'Team Meeting (+5 Morale, 1 AP)', 'Cancel'], (idx) => {
        if (idx === 0) {
            GS.ap--;
            GS.productPoints += 2;
            spawnParticles(6 * T + 8, 2 * T, PAL.hudYellow, 6);
            addNotification('+2 PRODUCT', PAL.positive);
            checkMilestones();
            showDialog('Feature roadmap updated!');
        } else if (idx === 1) {
            GS.ap--;
            GS.teamMorale = Math.min(100, GS.teamMorale + 5);
            addNotification('+5 MORALE', PAL.positive);
            showDialog('Great team sync! Everyone feels aligned.');
        }
    });
}

function interactCoffee() {
    if (GS.ap >= GS.maxAp) { showDialog('You\'re already fully caffeinated!'); return; }
    GS.ap = Math.min(GS.maxAp, GS.ap + 1);
    spawnParticles(5 * T + 8, 10 * T, '#fff', 5);
    addNotification('+1 AP', PAL.hudYellow);
    showDialog('Coffee! You feel energized. +1 AP');
    GS.coffeeUsedToday = true;
}

function interactDoor() {
    showMenu('Office Door', ['Go Networking (-$500, chance of customer)', 'Step Outside (End Day)', 'Stay Inside'], (idx) => {
        if (idx === 0) {
            if (GS.cash < 500) { showDialog('Not enough cash for networking.'); return; }
            if (GS.ap <= 0) { showDialog('No AP left.'); return; }
            GS.ap--;
            GS.cash -= 500;
            const mvp = getCurrentMilestone(GS.productPoints);
            const chance = mvp ? 0.6 : 0.25;
            if (Math.random() < chance) {
                const gained = mvp ? 2 : 1;
                GS.customers += gained;
                GS.mrr += gained * 50;
                addNotification('+' + gained + ' CUSTOMERS', PAL.positive);
                showDialog(`Great networking! Signed ${gained} new customer${gained>1?'s':''}. ${mvp?'Having an MVP really helped!':''}`);
            } else {
                showDialog('Good conversations but no conversions today.');
            }
        } else if (idx === 1) {
            endDay();
        }
    });
}

function interactEmptyDesk(pos) {
    if (GS.ap <= 0) { showDialog('No AP left to hire today.'); return; }
    showMenu('Empty Desk - Hire?', ['Developer ($5,000/mo)', 'Salesperson ($4,000/mo)', 'Not yet'], (idx) => {
        if (idx === 0) {
            if (GS.cash < 5000) { showDialog('Can\'t afford a developer right now.'); return; }
            GS.ap--;
            const dev = { type:'dev', name: randomName(), salary:5000, output:1.0, icon:'dev' };
            GS.team.push(dev);
            GS.hiredDesks.push({ gx: pos.gx, gy: pos.gy, member: dev });
            addNotification('HIRED DEV: ' + dev.name, PAL.positive);
            spawnParticles(pos.gx * T + 8, pos.gy * T + 8, PAL.positive, 10);
            showDialog(`Welcome ${dev.name}! They\'ll start coding tomorrow.`);
        } else if (idx === 1) {
            if (GS.cash < 4000) { showDialog('Can\'t afford a salesperson right now.'); return; }
            GS.ap--;
            const sales = { type:'sales', name: randomName(), salary:4000, output:1.0, icon:'sales' };
            GS.team.push(sales);
            GS.hiredDesks.push({ gx: pos.gx, gy: pos.gy, member: sales });
            addNotification('HIRED SALES: ' + sales.name, PAL.positive);
            spawnParticles(pos.gx * T + 8, pos.gy * T + 8, PAL.hudYellow, 10);
            showDialog(`Welcome ${sales.name}! They\'ll start selling tomorrow.`);
        }
    });
}

function interactCofounder() {
    const msgs = [
        ['...', 'Your co-founder stares at his laptop intensely.'],
        ['He adjusts his sunglasses.', '"We should pivot to AI."'],
        ['"I\'ve been thinking about our strategy."', '"Actually, never mind."'],
        ['He\'s reading Hacker News.', '"Did you see this thread about us? ...Oh wait, that\'s someone else."'],
        ['"Trust the process."', 'He goes back to whatever he was doing.'],
        ['"I had a great meeting today."', 'You have no idea with whom.'],
        ['He shows you a chart.', 'You can\'t tell if it\'s going up or down.'],
        ['"Remember: we\'re not just building software."', '"We\'re building... the future."'],
    ];
    if (GS.day >= 20 && GS.productPoints >= 60) {
        showDialog(['"Hey, I need to tell you something."', '"I\'ve been quietly talking to enterprise clients."', '"I think I might have landed us a big deal."', '"Just... keep building. Trust me."']);
        return;
    }
    if (GS.day >= 30 && GS.cash < 30000) {
        showDialog(['"Look, things are tight."', '"But I moved some money around."', '"Don\'t ask how. We\'re going to be fine."', 'Your cash mysteriously increases by $10,000.']);
        GS.cash += 10000;
        return;
    }
    const pick = msgs[Math.floor(Math.random() * msgs.length)];
    showDialog(pick);
}

const DEV_NAMES = ['Alex','Jordan','Sam','Riley','Casey','Quinn','Morgan','Taylor','Drew','Blake','Avery','Reese','Skyler','Jamie','Dakota'];
const LAST_NAMES = ['K.','L.','M.','R.','S.','T.','W.','B.','C.','D.','F.','G.','H.','J.','N.'];
function randomName() {
    return DEV_NAMES[Math.floor(Math.random()*DEV_NAMES.length)] + ' ' + LAST_NAMES[Math.floor(Math.random()*LAST_NAMES.length)];
}

function getMonthlyBurn() {
    let burn = 2000; // Base ops
    for (const m of GS.team) burn += m.salary;
    return burn;
}

// ============================================================
// MILESTONE CHECK
// ============================================================
function checkMilestones() {
    for (const m of MILESTONES) {
        if (!m.announced && GS.productPoints >= m.threshold) {
            m.announced = true;
            GS.milestoneAnnounce = m;
            GS.phase = 'milestone';
            spawnParticles(NATIVE_W / 2, NATIVE_H / 2, PAL.hudGold, 25);
            addNotification('MILESTONE: ' + m.name + '!', PAL.hudGold, 180);
            return;
        }
    }
}

// ============================================================
// DAY END LOGIC
// ============================================================
function endDay() {
    GS.dayTransitionPhase = 'fadeout';
    GS.dayTransition = 0;
    GS.phase = 'dayEnd';
}

function processDayEnd() {
    // Team output
    let devOutput = 0, salesOutput = 0;
    for (const m of GS.team) {
        const moraleMod = GS.teamMorale / 100;
        if (m.type === 'dev' || m.type === 'intern') {
            devOutput += m.output * moraleMod;
        } else if (m.type === 'sales') {
            salesOutput += m.output * moraleMod;
        }
    }

    // Product growth from devs
    const devProd = Math.floor(devOutput * 2);
    GS.productPoints += devProd;

    // Customer acquisition from sales (only if MVP reached)
    let newCustomers = 0;
    const hasMVP = GS.productPoints >= MILESTONES[0].threshold;
    if (hasMVP && salesOutput > 0) {
        newCustomers = Math.floor(salesOutput * 1.5);
        if (Math.random() < salesOutput * 0.3) newCustomers++;
    }
    GS.customers += newCustomers;

    // MRR from customers
    const pricePerCustomer = 50;
    GS.mrr = GS.customers * pricePerCustomer;

    // Daily cash flow (MRR is monthly, so /30 per day)
    const dailyRevenue = Math.floor(GS.mrr / 30);
    const dailyBurn = Math.floor(getMonthlyBurn() / 30);
    GS.cash += dailyRevenue - dailyBurn;
    GS.totalRevenue += dailyRevenue;
    GS.totalSpent += dailyBurn;

    // Morale drift
    if (GS.cash < 20000) GS.teamMorale = Math.max(10, GS.teamMorale - 2);
    if (GS.cash > 100000 && GS.teamMorale < 70) GS.teamMorale = Math.min(100, GS.teamMorale + 1);
    // Natural drift toward 60
    if (GS.teamMorale > 65) GS.teamMorale -= 1;
    else if (GS.teamMorale < 55) GS.teamMorale += 1;

    // Churn (small %)
    if (GS.customers > 5) {
        const churn = Math.random() < 0.1 ? 1 : 0;
        GS.customers = Math.max(0, GS.customers - churn);
    }

    const summary = {
        devProd, newCustomers, dailyRevenue, dailyBurn,
        netCash: dailyRevenue - dailyBurn,
    };

    GS.day++;
    GS.ap = GS.maxAp;
    GS.coffeeUsedToday = false;

    // Check game over
    if (GS.cash <= 0) {
        GS.phase = 'gameover';
        GS.gameOverReason = 'ran out of cash';
        return null;
    }

    // Check endgame paths
    if (GS.day >= 60) {
        checkEndgame();
        if (GS.endgamePath) return null;
    }

    return summary;
}

function checkEndgame() {
    if (GS.customers >= 100 && GS.mrr >= 5000) {
        GS.endgamePath = 'ipo';
        GS.phase = 'gameover';
        GS.gameOverReason = 'IPO GLORY! Your SaaS unicorn goes public!';
    } else if (GS.mrr >= 3000 && GS.team.length <= 3) {
        GS.endgamePath = 'profit';
        GS.phase = 'gameover';
        GS.gameOverReason = 'PROFIT MACHINE! Lean team, massive margins!';
    } else if (GS.productPoints >= 200) {
        GS.endgamePath = 'rnd';
        GS.phase = 'gameover';
        GS.gameOverReason = 'R&D UTOPIA! Your tech is years ahead!';
    } else if (GS.customers >= 150 && GS.productPoints >= 150) {
        GS.endgamePath = 'domination';
        GS.phase = 'gameover';
        GS.gameOverReason = 'WORLD DOMINATION! You own the market!';
    }
}

// ============================================================
// EVENT PRESENTATION
// ============================================================
function showEvent(event) {
    GS.currentEvent = event;
    GS.eventPhase = 'choice';
    GS.eventResult = '';
    GS.menuIndex = 0;
    GS.phase = 'event';
}

// ============================================================
// UPDATE
// ============================================================
function update(dt) {
    GS.time += dt;
    if (GS.interactCooldown > 0) GS.interactCooldown--;

    // Update notifications
    for (let i = GS.notifications.length - 1; i >= 0; i--) {
        GS.notifications[i].timer++;
        if (GS.notifications[i].timer > GS.notifications[i].duration) {
            GS.notifications.splice(i, 1);
        }
    }

    // Update particles
    for (let i = GS.particleEffects.length - 1; i >= 0; i--) {
        const p = GS.particleEffects[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.05;
        p.life--;
        if (p.life <= 0) GS.particleEffects.splice(i, 1);
    }

    switch (GS.phase) {
        case 'title':
            if (consumeKey('Enter') || consumeKey('z') || consumeKey(' ')) {
                GS.phase = 'play';
                showDialog([
                    'Welcome to SaaS Startup Simulator!',
                    'You\'re a tech co-founder with $150K in angel funding.',
                    'Build your product, hire a team, and grow your startup!',
                    'Use ARROW KEYS to move, Z to interact, X to cancel.',
                    'Each day you have 3 Action Points. Spend them wisely!',
                    'Reach milestones: MVP (30pts) > Beta (60) > V1.0 (100) > Scale (150)',
                    'Good luck! Your mysterious co-founder is already here...',
                ]);
            }
            break;

        case 'play':
            updatePlayer(dt);
            if (consumeKey('z') || consumeKey('Enter')) interact();
            break;

        case 'dialog':
            if (consumeKey('z') || consumeKey('Enter') || consumeKey(' ')) advanceDialog();
            break;

        case 'menu':
            if (consumeKey('ArrowUp')) GS.menuIndex = (GS.menuIndex - 1 + GS.menuOptions.length) % GS.menuOptions.length;
            if (consumeKey('ArrowDown')) GS.menuIndex = (GS.menuIndex + 1) % GS.menuOptions.length;
            if (consumeKey('z') || consumeKey('Enter')) {
                const idx = GS.menuIndex;
                const cb = GS.menuCallback;
                GS.phase = 'play';
                GS.menuCallback = null;
                if (cb) cb(idx);
            }
            if (consumeKey('x') || consumeKey('Escape')) {
                const opts = GS.menuOptions;
                const cancelIdx = opts.length - 1; // Last option is usually cancel
                const cb = GS.menuCallback;
                GS.phase = 'play';
                GS.menuCallback = null;
                if (cb) cb(cancelIdx);
            }
            break;

        case 'event':
            if (GS.eventPhase === 'choice') {
                if (consumeKey('ArrowUp') || consumeKey('ArrowDown')) {
                    GS.menuIndex = GS.menuIndex === 0 ? 1 : 0;
                }
                if (consumeKey('z') || consumeKey('Enter')) {
                    const ev = GS.currentEvent;
                    const result = GS.menuIndex === 0 ? ev.effectA(GS) : ev.effectB(GS);
                    GS.eventResult = result;
                    GS.eventPhase = 'result';
                    checkMilestones();
                }
            } else if (GS.eventPhase === 'result') {
                if (consumeKey('z') || consumeKey('Enter') || consumeKey(' ')) {
                    GS.currentEvent = null;
                    GS.phase = 'play';
                }
            }
            break;

        case 'milestone':
            if (consumeKey('z') || consumeKey('Enter') || consumeKey(' ')) {
                GS.milestoneAnnounce = null;
                GS.phase = 'play';
            }
            break;

        case 'dayEnd':
            GS.dayTransition += dt * 2;
            if (GS.dayTransitionPhase === 'fadeout' && GS.dayTransition >= 1) {
                const summary = processDayEnd();
                if (GS.phase === 'gameover') return;
                GS.dayEndSummary = summary;
                GS.dayTransitionPhase = 'summary';
                GS.dayTransition = 0;
                // Roll for random event
                const event = rollEvent(GS);
                if (event) {
                    GS.pendingEvent = event;
                }
            }
            if (GS.dayTransitionPhase === 'summary') {
                if (consumeKey('z') || consumeKey('Enter') || consumeKey(' ')) {
                    if (GS.pendingEvent) {
                        const ev = GS.pendingEvent;
                        GS.pendingEvent = null;
                        showEvent(ev);
                    } else {
                        GS.dayTransitionPhase = 'fadein';
                        GS.dayTransition = 0;
                    }
                }
            }
            if (GS.dayTransitionPhase === 'fadein' && GS.dayTransition >= 0.5) {
                GS.phase = 'play';
                GS.dayTransitionPhase = '';
                checkMilestones();
            }
            break;

        case 'gameover':
            if (consumeKey('z') || consumeKey('Enter') || consumeKey(' ')) {
                resetGame();
            }
            break;
    }

    // Clear justPressed
    for (const k in justPressed) justPressed[k] = false;
}

function updatePlayer(dt) {
    const p = GS.player;
    let dx = 0, dy = 0;
    if (keys['ArrowLeft'] || keys['a']) { dx = -1; p.dir = 2; }
    if (keys['ArrowRight'] || keys['d']) { dx = 1; p.dir = 3; }
    if (keys['ArrowUp'] || keys['w']) { dy = -1; p.dir = 1; }
    if (keys['ArrowDown'] || keys['s']) { dy = 1; p.dir = 0; }

    p.moving = dx !== 0 || dy !== 0;
    if (p.moving) {
        p.animTimer += dt;
        if (p.animTimer > 0.15) {
            p.animFrame = (p.animFrame + 1) % 4;
            p.animTimer = 0;
        }
    }

    if (dx !== 0 && !isSolid(p.gx + dx, p.gy) && !isOccupied(p.gx + dx, p.gy)) {
        p.moveTimer = (p.moveTimer || 0) + dt;
        if (p.moveTimer > 0.12) { p.gx += dx; p.moveTimer = 0; }
    } else if (dy !== 0 && !isSolid(p.gx, p.gy + dy) && !isOccupied(p.gx, p.gy + dy)) {
        p.moveTimer = (p.moveTimer || 0) + dt;
        if (p.moveTimer > 0.12) { p.gy += dy; p.moveTimer = 0; }
    } else {
        p.moveTimer = 0;
    }
}

function isOccupied(gx, gy) {
    if (gx === GS.cofounder.gx && gy === GS.cofounder.gy) return true;
    for (const h of GS.hiredDesks) {
        if (h.gx === gx && h.gy === gy) return false; // NPCs are AT desks, not blocking floor
    }
    return false;
}

function resetGame() {
    GS.day = 1; GS.cash = 150000; GS.mrr = 0; GS.ap = 3; GS.maxAp = 3;
    GS.productPoints = 0; GS.customers = 0; GS.teamMorale = 70;
    GS.team = []; GS.phase = 'title'; GS.dialogQueue = []; GS.currentDialog = null;
    GS.menuOptions = []; GS.menuCallback = null; GS.menuIndex = 0;
    GS.currentEvent = null; GS.pendingEvent = null; GS.milestoneAnnounce = null;
    GS.player = { gx:9, gy:7, dir:0, animFrame:0, animTimer:0, moving:false };
    GS.cofounder = { gx:14, gy:10, dir:2, animFrame:0, animTimer:0, bobTimer:0 };
    GS.hiredDesks = []; GS.dayEndSummary = null; GS.interactCooldown = 0;
    GS.dayTransition = 0; GS.dayTransitionPhase = '';
    GS.notifications = []; GS.particleEffects = [];
    GS.endgamePath = null; GS.gameOverReason = '';
    GS.totalRevenue = 0; GS.totalSpent = 0; GS.coffeeUsedToday = false;
    for (const m of MILESTONES) m.announced = false;
}

// ============================================================
// RENDER
// ============================================================
function render() {
    bctx.fillStyle = PAL.bgDark;
    bctx.fillRect(0, 0, NATIVE_W, NATIVE_H);

    switch (GS.phase) {
        case 'title':
            renderTitle();
            break;
        case 'gameover':
            renderGameOver();
            break;
        default:
            renderGame();
            break;
    }

    // Scale up
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(buf, 0, 0, NATIVE_W, NATIVE_H, 0, 0, NATIVE_W * SCALE, NATIVE_H * SCALE);
}

function renderTitle() {
    // Animated background
    const t = GS.time;
    for (let i = 0; i < 40; i++) {
        const sx = (i * 37 + t * 10) % NATIVE_W;
        const sy = (i * 23 + Math.sin(t + i) * 5) % NATIVE_H;
        bctx.fillStyle = `rgba(88, 184, 104, ${0.1 + Math.sin(t + i) * 0.05})`;
        bctx.fillRect(sx, sy, 2, 2);
    }

    // Title
    const titleY = 40 + Math.sin(t * 1.5) * 3;
    drawTextCentered(bctx, 'SAAS STARTUP', NATIVE_W / 2, titleY, PAL.hudGreen, 2);
    drawTextCentered(bctx, 'SIMULATOR', NATIVE_W / 2, titleY + 20, PAL.white, 2);

    // Subtitle
    drawTextCentered(bctx, 'A 16-BIT ADVENTURE IN TECH', NATIVE_W / 2, 90, PAL.neutral);

    // Blinking prompt
    if (Math.sin(t * 3) > 0) {
        drawTextCentered(bctx, 'PRESS Z OR ENTER TO START', NATIVE_W / 2, 140, PAL.hudYellow);
    }

    // Version
    drawTextCentered(bctx, 'ROUND 12', NATIVE_W / 2, 170, PAL.neutral);

    // Credits
    drawTextCentered(bctx, 'GTM STUDIO', NATIVE_W / 2, 195, '#665577');
}

function renderGame() {
    const t = GS.time;

    // Draw tile map
    for (let gy = 0; gy < MAP_H; gy++) {
        for (let gx = 0; gx < MAP_W; gx++) {
            drawTile(bctx, map[gy][gx], gx * T, gy * T, t);
        }
    }

    // Draw hired NPCs at desks (draw them above their desk chair)
    for (let i = 0; i < GS.hiredDesks.length; i++) {
        const h = GS.hiredDesks[i];
        if (h.member) {
            drawHiredNPC(bctx, h.gx * T, (h.gy) * T - 2, h.member.type, t, i);
        }
    }

    // Draw co-founder
    drawCofounder(bctx, GS.cofounder.gx * T, GS.cofounder.gy * T - 4, t);

    // Draw player
    drawPlayer(bctx, GS.player.gx * T, GS.player.gy * T - 4, GS.player.dir, GS.player.animFrame, GS.player.moving ? t : 0);

    // Interaction indicator
    if (GS.phase === 'play') {
        const facing = getFacingTile();
        const ft = getTile(facing.gx, facing.gy);
        const isInteractable = ft === TERMINAL || ft === WHITEBOARD || ft === COFFEE_MACHINE || ft === DOOR ||
            (ft === DESK && HIRE_DESKS.some(d => d.gx === facing.gx && d.gy === facing.gy)) ||
            (facing.gx === GS.cofounder.gx && facing.gy === GS.cofounder.gy) ||
            GS.hiredDesks.some(h => h.gx === facing.gx && h.gy === facing.gy);
        if (isInteractable) {
            const blink = Math.sin(t * 6) > 0;
            if (blink) {
                bctx.fillStyle = PAL.hudYellow;
                bctx.fillRect(facing.gx * T + 6, facing.gy * T - 4, 5, 5);
                drawText(bctx, 'Z', facing.gx * T + 6, facing.gy * T - 3, PAL.bgDark);
            }
        }
    }

    // Particles
    for (const p of GS.particleEffects) {
        const alpha = p.life / p.maxLife;
        bctx.globalAlpha = alpha;
        bctx.fillStyle = p.color;
        bctx.fillRect(Math.round(p.x), Math.round(p.y), 2, 2);
    }
    bctx.globalAlpha = 1;

    // HUD
    renderHUD();

    // Dialog overlay
    if (GS.phase === 'dialog' && GS.currentDialog) renderDialog();
    if (GS.phase === 'menu') renderMenu();
    if (GS.phase === 'event') renderEvent();
    if (GS.phase === 'milestone') renderMilestone();

    // Day transition overlay
    if (GS.phase === 'dayEnd') renderDayEnd();

    // Notifications
    renderNotifications();
}

function renderHUD() {
    const hudH = 24;
    bctx.fillStyle = PAL.hudBg;
    bctx.fillRect(0, 0, NATIVE_W, hudH);
    bctx.fillStyle = PAL.hudGreen;
    bctx.fillRect(0, hudH, NATIVE_W, 1);

    // Day
    drawText(bctx, 'DAY ' + GS.day, 4, 3, PAL.hudYellow);

    // Cash
    const cashColor = GS.cash < 20000 ? PAL.hudRed : GS.cash < 50000 ? PAL.hudYellow : PAL.hudGreen;
    drawText(bctx, '$' + GS.cash.toLocaleString(), 54, 3, cashColor);

    // MRR
    drawText(bctx, 'MRR:$' + GS.mrr.toLocaleString(), 130, 3, PAL.hudTxt);

    // Customers
    drawText(bctx, 'CUS:' + GS.customers, 220, 3, PAL.hudTxt);

    // Product points & milestone
    const next = getNextMilestone(GS.productPoints);
    const cur = getCurrentMilestone(GS.productPoints);
    const mileName = cur ? cur.name : '---';
    drawText(bctx, 'PRD:' + GS.productPoints, 270, 3, PAL.positive);

    // AP row
    drawText(bctx, 'AP', 4, 14, PAL.hudTxt);
    for (let i = 0; i < GS.maxAp; i++) {
        bctx.fillStyle = i < GS.ap ? PAL.apFull : PAL.apEmpty;
        bctx.fillRect(18 + i * 8, 14, 6, 6);
    }

    // Team count
    drawText(bctx, 'TEAM:' + GS.team.length, 54, 14, PAL.hudTxt);

    // Morale
    const moraleColor = GS.teamMorale >= 70 ? PAL.hudGreen : GS.teamMorale >= 40 ? PAL.hudYellow : PAL.hudRed;
    drawText(bctx, 'MOR:' + GS.teamMorale + '%', 110, 14, moraleColor);

    // Milestone
    drawText(bctx, mileName, 175, 14, PAL.hudGold);

    // Next milestone progress bar
    if (next) {
        const prev = cur ? cur.threshold : 0;
        const progress = (GS.productPoints - prev) / (next.threshold - prev);
        const barX = 210, barY = 15, barW = 50, barH = 4;
        bctx.fillStyle = PAL.apEmpty;
        bctx.fillRect(barX, barY, barW, barH);
        bctx.fillStyle = PAL.hudGold;
        bctx.fillRect(barX, barY, Math.floor(barW * Math.min(1, progress)), barH);
        drawText(bctx, next.name, barX + barW + 3, 14, PAL.neutral);
    }
}

function renderDialog() {
    const dw = 280, dh = 48;
    const dx = (NATIVE_W - dw) / 2, dy = NATIVE_H - dh - 8;
    // BG
    bctx.fillStyle = PAL.dialogBg;
    bctx.fillRect(dx, dy, dw, dh);
    // Border
    bctx.strokeStyle = PAL.dialogBdr;
    bctx.lineWidth = 1;
    bctx.strokeRect(dx + 0.5, dy + 0.5, dw - 1, dh - 1);
    // Text
    const lines = wordWrap(GS.currentDialog.text, dw - 16);
    for (let i = 0; i < lines.length && i < 4; i++) {
        drawText(bctx, lines[i], dx + 8, dy + 8 + i * 10, PAL.dialogTxt);
    }
    // Continue indicator
    if (Math.sin(GS.time * 4) > 0) {
        drawText(bctx, '>', dx + dw - 14, dy + dh - 12, PAL.hudGreen);
    }
}

function renderMenu() {
    const dw = 220, dh = 16 + GS.menuOptions.length * 12 + (GS.menuPrompt ? 12 : 0);
    const dx = (NATIVE_W - dw) / 2, dy = NATIVE_H - dh - 16;
    bctx.fillStyle = PAL.dialogBg;
    bctx.fillRect(dx, dy, dw, dh);
    bctx.strokeStyle = PAL.dialogBdr;
    bctx.lineWidth = 1;
    bctx.strokeRect(dx + 0.5, dy + 0.5, dw - 1, dh - 1);

    let cy = dy + 6;
    if (GS.menuPrompt) {
        drawText(bctx, GS.menuPrompt, dx + 8, cy, PAL.hudYellow);
        cy += 14;
    }
    for (let i = 0; i < GS.menuOptions.length; i++) {
        const selected = i === GS.menuIndex;
        if (selected) {
            bctx.fillStyle = PAL.hudGreen;
            bctx.fillRect(dx + 6, cy + 1, 4, 4);
        }
        drawText(bctx, GS.menuOptions[i], dx + 14, cy, selected ? PAL.white : PAL.neutral);
        cy += 12;
    }
}

function renderEvent() {
    const ev = GS.currentEvent;
    if (!ev) return;

    // Full screen overlay
    bctx.fillStyle = 'rgba(26, 26, 46, 0.85)';
    bctx.fillRect(0, 25, NATIVE_W, NATIVE_H - 25);

    // Event card
    const cw = 280, ch = 140;
    const cx = (NATIVE_W - cw) / 2, cy = 40;

    // Card bg
    bctx.fillStyle = PAL.dialogBg;
    bctx.fillRect(cx, cy, cw, ch);

    // Border color based on type
    const borderColor = ev.type === 'positive' ? PAL.positive : ev.type === 'negative' ? PAL.accent : PAL.neutral;
    bctx.strokeStyle = borderColor;
    bctx.lineWidth = 2;
    bctx.strokeRect(cx, cy, cw, ch);

    // Title banner
    bctx.fillStyle = borderColor;
    bctx.fillRect(cx, cy, cw, 14);
    drawTextCentered(bctx, ev.title, NATIVE_W / 2, cy + 3, PAL.bgDark);

    if (GS.eventPhase === 'choice') {
        // Description
        const descLines = wordWrap(ev.desc, cw - 20);
        for (let i = 0; i < descLines.length; i++) {
            drawText(bctx, descLines[i], cx + 10, cy + 22 + i * 10, PAL.dialogTxt);
        }

        // Choices
        const choiceY = cy + 60;
        const choices = [ev.choiceA, ev.choiceB];
        for (let i = 0; i < 2; i++) {
            const sel = i === GS.menuIndex;
            const ly = choiceY + i * 30;
            if (sel) {
                bctx.fillStyle = 'rgba(88, 184, 104, 0.15)';
                bctx.fillRect(cx + 5, ly - 2, cw - 10, 24);
                bctx.fillStyle = PAL.hudGreen;
                bctx.fillRect(cx + 8, ly + 4, 4, 4);
            }
            const choiceLines = wordWrap(choices[i], cw - 30);
            for (let j = 0; j < choiceLines.length; j++) {
                drawText(bctx, choiceLines[j], cx + 16, ly + j * 10, sel ? PAL.white : PAL.neutral);
            }
        }
    } else {
        // Result
        const resultLines = wordWrap(GS.eventResult, cw - 20);
        for (let i = 0; i < resultLines.length; i++) {
            drawText(bctx, resultLines[i], cx + 10, cy + 30 + i * 12, PAL.dialogTxt);
        }

        // Cash display
        drawText(bctx, 'CASH: $' + GS.cash.toLocaleString(), cx + 10, cy + 80, GS.cash < 20000 ? PAL.hudRed : PAL.hudGreen);
        drawText(bctx, 'PRODUCT: ' + GS.productPoints + ' PTS', cx + 10, cy + 92, PAL.positive);

        if (Math.sin(GS.time * 4) > 0) {
            drawTextCentered(bctx, 'PRESS Z TO CONTINUE', NATIVE_W / 2, cy + ch - 14, PAL.hudYellow);
        }
    }
}

function renderMilestone() {
    const m = GS.milestoneAnnounce;
    if (!m) return;

    // Full overlay
    bctx.fillStyle = 'rgba(26, 26, 46, 0.9)';
    bctx.fillRect(0, 25, NATIVE_W, NATIVE_H - 25);

    // Sparkle banner
    const bannerY = 60;
    bctx.fillStyle = PAL.hudGold;
    bctx.fillRect(20, bannerY, NATIVE_W - 40, 3);
    bctx.fillRect(20, bannerY + 70, NATIVE_W - 40, 3);

    // Title
    drawTextCentered(bctx, 'MILESTONE REACHED!', NATIVE_W / 2, bannerY + 14, PAL.hudGold, 2);
    drawTextCentered(bctx, m.name, NATIVE_W / 2, bannerY + 36, PAL.white, 2);

    // Description
    const descLines = wordWrap(m.desc, 250);
    for (let i = 0; i < descLines.length; i++) {
        drawTextCentered(bctx, descLines[i], NATIVE_W / 2, bannerY + 80 + i * 12, PAL.positive);
    }

    // Sparkle particles
    for (let i = 0; i < 8; i++) {
        const sx = 40 + Math.sin(GS.time * 3 + i * 0.8) * 120 + 120;
        const sy = bannerY + 10 + Math.cos(GS.time * 2 + i * 1.1) * 30 + 30;
        bctx.fillStyle = Math.sin(GS.time * 5 + i) > 0 ? PAL.hudGold : PAL.white;
        bctx.fillRect(Math.round(sx), Math.round(sy), 2, 2);
    }

    if (Math.sin(GS.time * 4) > 0) {
        drawTextCentered(bctx, 'PRESS Z TO CONTINUE', NATIVE_W / 2, bannerY + 110, PAL.hudYellow);
    }
}

function renderDayEnd() {
    if (GS.dayTransitionPhase === 'fadeout') {
        const alpha = Math.min(1, GS.dayTransition);
        bctx.fillStyle = `rgba(15, 15, 26, ${alpha})`;
        bctx.fillRect(0, 0, NATIVE_W, NATIVE_H);
    } else if (GS.dayTransitionPhase === 'summary') {
        bctx.fillStyle = PAL.bgDark;
        bctx.fillRect(0, 0, NATIVE_W, NATIVE_H);

        drawTextCentered(bctx, 'DAY ' + (GS.day) + ' BEGINS', NATIVE_W / 2, 30, PAL.hudYellow, 2);

        const s = GS.dayEndSummary;
        if (s) {
            let y = 65;
            const gap = 14;
            if (s.devProd > 0) { drawText(bctx, 'DEVS BUILT: +' + s.devProd + ' PRODUCT', 40, y, PAL.positive); y += gap; }
            if (s.newCustomers > 0) { drawText(bctx, 'SALES CLOSED: +' + s.newCustomers + ' CUSTOMERS', 40, y, PAL.hudGreen); y += gap; }
            drawText(bctx, 'REVENUE: +$' + s.dailyRevenue, 40, y, PAL.hudGreen); y += gap;
            drawText(bctx, 'EXPENSES: -$' + s.dailyBurn, 40, y, PAL.hudRed); y += gap;
            const netColor = s.netCash >= 0 ? PAL.hudGreen : PAL.hudRed;
            drawText(bctx, 'NET: ' + (s.netCash >= 0 ? '+' : '') + '$' + s.netCash, 40, y, netColor); y += gap + 4;
            drawText(bctx, 'CASH: $' + GS.cash.toLocaleString(), 40, y, PAL.white); y += gap;
            drawText(bctx, 'PRODUCT: ' + GS.productPoints + ' PTS', 40, y, PAL.positive); y += gap;
            drawText(bctx, 'MORALE: ' + GS.teamMorale + '%', 40, y, PAL.hudYellow);
        }

        if (Math.sin(GS.time * 4) > 0) {
            drawTextCentered(bctx, 'PRESS Z TO CONTINUE', NATIVE_W / 2, 195, PAL.hudYellow);
        }
    } else if (GS.dayTransitionPhase === 'fadein') {
        const alpha = Math.max(0, 1 - GS.dayTransition * 2);
        bctx.fillStyle = `rgba(15, 15, 26, ${alpha})`;
        bctx.fillRect(0, 0, NATIVE_W, NATIVE_H);
    }
}

function renderNotifications() {
    for (let i = 0; i < GS.notifications.length; i++) {
        const n = GS.notifications[i];
        const fadeIn = Math.min(1, n.timer / 10);
        const fadeOut = Math.min(1, (n.duration - n.timer) / 20);
        const alpha = Math.min(fadeIn, fadeOut);
        const ny = 30 + i * 12;
        const nx = NATIVE_W - textWidth(n.text) - 8;
        bctx.globalAlpha = alpha;
        bctx.fillStyle = 'rgba(15, 15, 26, 0.7)';
        bctx.fillRect(nx - 3, ny - 2, textWidth(n.text) + 6, 10);
        drawText(bctx, n.text, nx, ny, n.color);
    }
    bctx.globalAlpha = 1;
}

function renderGameOver() {
    bctx.fillStyle = PAL.bgDark;
    bctx.fillRect(0, 0, NATIVE_W, NATIVE_H);

    const isWin = GS.endgamePath !== null;

    if (isWin) {
        // Victory screen
        const paths = {
            ipo: { title: 'IPO GLORY', color: PAL.hudGold, desc: 'YOUR STARTUP WENT PUBLIC!' },
            profit: { title: 'PROFIT MACHINE', color: PAL.hudGreen, desc: 'LEAN, MEAN, PROFIT ENGINE!' },
            rnd: { title: 'R&D UTOPIA', color: PAL.positive, desc: 'TECHNOLOGY YEARS AHEAD!' },
            domination: { title: 'WORLD DOMINATION', color: PAL.accent, desc: 'YOU OWN THE MARKET!' },
        };
        const p = paths[GS.endgamePath] || paths.ipo;

        // Victory sparkles
        for (let i = 0; i < 20; i++) {
            const sx = (i * 17 + GS.time * 30) % NATIVE_W;
            const sy = (i * 13 + Math.sin(GS.time * 2 + i) * 20 + 100) % NATIVE_H;
            bctx.fillStyle = Math.sin(GS.time * 4 + i) > 0 ? p.color : PAL.white;
            bctx.fillRect(Math.round(sx), Math.round(sy), 2, 2);
        }

        drawTextCentered(bctx, p.title, NATIVE_W / 2, 30, p.color, 2);
        drawTextCentered(bctx, p.desc, NATIVE_W / 2, 55, PAL.white);
    } else {
        drawTextCentered(bctx, 'GAME OVER', NATIVE_W / 2, 30, PAL.hudRed, 2);
        drawTextCentered(bctx, 'YOUR STARTUP ' + GS.gameOverReason.toUpperCase(), NATIVE_W / 2, 55, PAL.accent);
    }

    // Stats
    let y = 80;
    const gap = 14;
    drawTextCentered(bctx, 'FINAL STATS', NATIVE_W / 2, y, PAL.hudYellow); y += gap + 4;
    drawText(bctx, 'DAYS SURVIVED: ' + GS.day, 60, y, PAL.white); y += gap;
    drawText(bctx, 'FINAL CASH: $' + GS.cash.toLocaleString(), 60, y, PAL.white); y += gap;
    drawText(bctx, 'PEAK MRR: $' + GS.mrr.toLocaleString(), 60, y, PAL.white); y += gap;
    drawText(bctx, 'CUSTOMERS: ' + GS.customers, 60, y, PAL.white); y += gap;
    drawText(bctx, 'PRODUCT: ' + GS.productPoints + ' PTS', 60, y, PAL.white); y += gap;
    drawText(bctx, 'TEAM SIZE: ' + GS.team.length, 60, y, PAL.white); y += gap;
    drawText(bctx, 'TOTAL REVENUE: $' + GS.totalRevenue.toLocaleString(), 60, y, PAL.hudGreen); y += gap;
    drawText(bctx, 'TOTAL SPENT: $' + GS.totalSpent.toLocaleString(), 60, y, PAL.hudRed);

    if (Math.sin(GS.time * 3) > 0) {
        drawTextCentered(bctx, 'PRESS Z TO PLAY AGAIN', NATIVE_W / 2, 210, PAL.hudYellow);
    }
}

// ============================================================
// GAME LOOP
// ============================================================
let lastTime = 0;
function gameLoop(timestamp) {
    const dt = Math.min((timestamp - lastTime) / 1000, 0.05);
    lastTime = timestamp;
    update(dt);
    render();
    requestAnimationFrame(gameLoop);
}
requestAnimationFrame(gameLoop);

</script>
</body>
</html>