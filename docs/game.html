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
// SaaS STARTUP SIMULATOR — Round 15
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
    greenCash:'#53a653', redChurn:'#c0392b', goldMile:'#f5c842',
    custBlue:'#5588cc', custGreen:'#44aa66', custOrange:'#cc8833',
    custPurple:'#8855aa', custPink:'#cc5577',
    titleBg:'#0e0e1c', titlePurple:'#533483', titleGreen:'#58b868',
    titleAccent:'#e94560', morningGold:'rgba(255,230,150,0.08)',
    nightBlue:'rgba(10,10,40,0.45)',
    eventGold:'#f5a623', eventRed:'#e94560', eventGreen:'#53d769',
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
    [3,1,6,4,1,1,11,11,11,1,1,1,1,4,4,1,1,7,1,3],
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
// PRODUCT MILESTONES
// ============================================================
const MILESTONES = [
    { name:'MVP', threshold:30, announced:false, desc:'Minimum Viable Product launched!', custBonus:1 },
    { name:'Beta', threshold:60, announced:false, desc:'Beta release — early adopters incoming!', custBonus:2 },
    { name:'V1.0', threshold:100, announced:false, desc:'Version 1.0 shipped! Market ready.', custBonus:3 },
    { name:'Scale', threshold:150, announced:false, desc:'Platform at scale! Enterprise unlocked.', custBonus:5 },
];

// ============================================================
// RANDOM EVENTS POOL
// ============================================================
const EVENT_POOL = [
    {
        id:'server_crash', title:'Server Meltdown!',
        text:'Your main server just went down. Customers are tweeting angry emojis.',
        choiceA:'Pay for emergency fix ($8K)', choiceB:'Roll back and hope (risk losing customers)',
        effectA:{ cash:-8000 }, effectB:{ customers:-3, cashMin:true },
        colorTag:'eventRed'
    },
    {
        id:'techcrunch', title:'TechCrunch Spotted You!',
        text:'A reporter wants to feature your startup. But they want an exclusive demo...',
        choiceA:'Give the demo (costs 1 day progress)', choiceB:'Decline politely',
        effectA:{ customers:5, product:-5 }, effectB:{},
        colorTag:'eventGold'
    },
    {
        id:'competitor', title:'Competitor Launches!',
        text:'A well-funded competitor just launched a similar product. The market is buzzing.',
        choiceA:'Double down on features ($6K)', choiceB:'Undercut their pricing (lose revenue)',
        effectA:{ cash:-6000, product:8 }, effectB:{ customers:2, cash:-3000 },
        colorTag:'eventRed'
    },
    {
        id:'viral_tweet', title:'Viral Tweet!',
        text:'Someone influential tweeted about your product and it\'s blowing up!',
        choiceA:'Ride the wave (free customers!)', choiceB:'Invest in marketing to amplify ($5K)',
        effectA:{ customers:3 }, effectB:{ customers:7, cash:-5000 },
        colorTag:'eventGreen'
    },
    {
        id:'dev_burnout', title:'Developer Burnout',
        text:'Your lead developer says they need a break or they\'re quitting.',
        choiceA:'Give them a week off (lose progress)', choiceB:'Offer a $5K bonus',
        effectA:{ product:-8, morale:10 }, effectB:{ cash:-5000, morale:5 },
        colorTag:'eventRed'
    },
    {
        id:'investor_call', title:'Investor Interest!',
        text:'An angel investor saw your traction and wants to chat.',
        choiceA:'Take the meeting ($15K injection)', choiceB:'Stay bootstrapped (keep full control)',
        effectA:{ cash:15000, morale:5 }, effectB:{ morale:10 },
        colorTag:'eventGold'
    },
    {
        id:'security_breach', title:'Security Scare!',
        text:'A white-hat hacker found a vulnerability in your auth system.',
        choiceA:'Hire them to fix it ($7K)', choiceB:'Patch it yourself (risky, slow)',
        effectA:{ cash:-7000, product:5 }, effectB:{ product:-3, customers:-2 },
        colorTag:'eventRed'
    },
    {
        id:'conference', title:'Startup Conference',
        text:'SaaSCon is next week. You could demo your product on the main stage.',
        choiceA:'Attend and demo ($4K travel)', choiceB:'Skip it, keep building',
        effectA:{ cash:-4000, customers:4, morale:5 }, effectB:{ product:5 },
        colorTag:'eventGold'
    },
    {
        id:'enterprise_lead', title:'Enterprise Lead!',
        text:'A Fortune 500 company wants a custom integration. Big contract potential.',
        choiceA:'Pursue the deal ($10K dev cost)', choiceB:'Too early, focus on SMB',
        effectA:{ cash:-10000, customers:8, product:5 }, effectB:{ morale:3 },
        colorTag:'eventGreen'
    },
    {
        id:'office_prank', title:'Office Shenanigans',
        text:'Someone replaced all the coffee with decaf. Productivity is tanking.',
        choiceA:'Buy fancy espresso machine ($2K)', choiceB:'Declare a nap day',
        effectA:{ cash:-2000, morale:15 }, effectB:{ morale:8, product:-2 },
        colorTag:'eventGold'
    },
    {
        id:'key_hire', title:'Star Developer Available!',
        text:'A talented engineer just left Google and is looking for startup life.',
        choiceA:'Make an offer ($12K signing bonus)', choiceB:'Can\'t afford it right now',
        effectA:{ cash:-12000, devs:1 }, effectB:{},
        colorTag:'eventGreen'
    },
    {
        id:'churn_spike', title:'Churn Spike!',
        text:'Several customers canceled this week citing missing features.',
        choiceA:'Rush a hotfix sprint ($5K overtime)', choiceB:'Survey and plan (lose customers now)',
        effectA:{ cash:-5000, product:6 }, effectB:{ customers:-4, product:3 },
        colorTag:'eventRed'
    },
];

// ============================================================
// GAME STATE
// ============================================================
let gameState = {
    phase: 'title',
    day: 1,
    cash: 50000,
    customers: 0,
    product: 0,
    morale: 70,
    ap: 3,
    maxAp: 3,
    devs: 0,
    sales: 0,
    revenue: 0,
    burn: 500,
    totalRevenue: 0,
    // player position (pixel coords)
    px: 9 * T + 4,
    py: 7 * T + 4,
    pdir: 0, // 0=down,1=left,2=right,3=up
    pframe: 0,
    pMoving: false,
    // menu / dialog
    menuActive: false,
    menuItems: [],
    menuSel: 0,
    menuCallback: null,
    menuTitle: '',
    dialogActive: false,
    dialogText: '',
    dialogQueue: [],
    dialogCallback: null,
    // interaction
    interactTarget: null,
    // day transition
    dayTransition: false,
    dayTransAlpha: 0,
    dayTransDir: 0,
    dayTransCallback: null,
    // events
    eventHistory: {},  // id -> last day fired
    eventActive: false,
    pendingEvent: null,
    // milestones
    milestoneQueue: [],
    // endgame
    gameOver: false,
    endType: '',
    // passive customer gain from milestones
    passiveCustPerDay: 0,
    // animation
    tick: 0,
    cofAnimTick: 0,
    // notification
    notifications: [],
};

let gs = gameState;

// ============================================================
// INPUT
// ============================================================
const keys = {};
const justPressed = {};
document.addEventListener('keydown', e => {
    if (!keys[e.key]) justPressed[e.key] = true;
    keys[e.key] = true;
    e.preventDefault();
});
document.addEventListener('keyup', e => { keys[e.key] = false; });
function wasPressed(k) { return justPressed[k]; }
function clearInput() { for (let k in justPressed) delete justPressed[k]; }

// ============================================================
// DRAWING HELPERS
// ============================================================
function px(x,y,w,h,c){ bctx.fillStyle=c; bctx.fillRect(Math.floor(x),Math.floor(y),w,h); }
function drawText(txt,x,y,col,size,align){
    bctx.fillStyle=col||PAL.white;
    bctx.font=(size||8)+'px monospace';
    bctx.textAlign=align||'left';
    bctx.textBaseline='top';
    bctx.fillText(txt,Math.floor(x),Math.floor(y));
}
function drawTextShadow(txt,x,y,col,size,align){
    drawText(txt,x+1,y+1,'#000',size,align);
    drawText(txt,x,y,col,size,align);
}

// ============================================================
// TILE RENDERING
// ============================================================
function drawTile(tx,ty){
    const tile = getTile(tx,ty);
    const x=tx*T, y=ty*T;
    // floor under everything
    px(x,y,T,T,((tx+ty)%2)?PAL.floorA:PAL.floorB);

    switch(tile){
        case WALL_TOP:
            px(x,y,T,T,PAL.wallTop);
            px(x,y+12,T,2,PAL.wallTrim);
            // subtle brick pattern
            if((tx+ty)%3===0){ px(x+2,y+3,5,3,'#4a2873'); px(x+9,y+7,5,3,'#4a2873'); }
            break;
        case WALL_FACE:
            px(x,y,T,T,PAL.wallFace);
            px(x,y,T,1,PAL.wallTop);
            break;
        case WALL_TRIM_TILE:
            px(x,y,T,T,PAL.wallFace);
            px(x,y,T,3,PAL.wallTrim);
            px(x,y+3,T,1,'#489858');
            break;
        case WINDOW_TILE:
            px(x,y,T,T,PAL.wallTop);
            px(x+2,y+2,12,8,PAL.window);
            px(x+3,y+3,10,6,PAL.windowLt);
            px(x+7,y+2,2,8,PAL.wallTop);
            // shimmer
            if((gs.tick+tx*7)%60<30) px(x+4,y+4,3,2,'#aaddff');
            px(x,y+12,T,2,PAL.wallTrim);
            break;
        case DESK:
            px(x+1,y+6,14,4,PAL.deskTop);
            px(x+1,y+10,2,5,PAL.deskLeg);
            px(x+13,y+10,2,5,PAL.deskLeg);
            px(x+1,y+5,14,1,PAL.desk);
            break;
        case CHAIR:
            px(x+4,y+4,8,8,PAL.chair);
            px(x+5,y+5,6,6,PAL.chairSeat);
            break;
        case TERMINAL:
            // desk underneath
            px(x+1,y+8,14,4,PAL.deskTop);
            px(x+1,y+12,2,3,PAL.deskLeg);
            px(x+13,y+12,2,3,PAL.deskLeg);
            // monitor
            px(x+3,y+1,10,7,PAL.monitor);
            px(x+4,y+2,8,5,PAL.monGlow);
            // screen flicker
            if(gs.tick%40<20) px(x+5,y+3,4,1,PAL.monGlowLt);
            if(gs.tick%60<15) px(x+6,y+5,3,1,PAL.monGlowLt);
            px(x+6,y+8,4,1,PAL.chair);
            break;
        case PLANT:
            px(x+5,y+10,6,5,PAL.pot);
            px(x+6,y+11,4,4,PAL.potDk);
            px(x+6,y+4,4,7,PAL.plantDk);
            px(x+4,y+2,3,4,PAL.plant);
            px(x+9,y+3,3,3,PAL.plant);
            px(x+6,y+1,4,3,PAL.plant);
            // leaf sway
            if(gs.tick%80<40) px(x+3,y+3,2,2,PAL.plant);
            else px(x+10,y+2,2,2,PAL.plant);
            break;
        case COFOUNDER_SPOT:
            break;
        case DOOR:
            px(x+2,y,12,T,PAL.desk);
            px(x+3,y+1,10,T-2,'#7a5a42');
            px(x+11,y+7,2,2,PAL.hudGold);
            break;
        case RUG:
            px(x,y,T,T,((tx+ty)%2)?PAL.rug:PAL.rugB);
            px(x,y,T,1,PAL.rug);
            break;
        case WHITEBOARD:
            px(x,y+2,T,12,PAL.whiteboard);
            px(x,y+1,T,1,PAL.wbBorder);
            px(x,y+14,T,1,PAL.wbBorder);
            // scribbles
            px(x+2,y+4,6,1,PAL.hudGreen);
            px(x+2,y+7,8,1,PAL.accent);
            px(x+3,y+10,5,1,PAL.hudYellow);
            break;
        case COFFEE_MACHINE:
            px(x+3,y+4,10,10,PAL.coffee);
            px(x+4,y+5,8,6,'#8b6e50');
            px(x+5,y+2,6,3,PAL.coffee);
            // steam
            if(gs.tick%50<25){
                px(x+6,y,1,2,'#ffffff44');
                px(x+8,y+1,1,2,'#ffffff33');
            }
            // mug
            px(x+1,y+10,4,4,PAL.coffeeMug);
            px(x+2,y+11,2,2,'#aa8866');
            break;
    }
}

// ============================================================
// SPRITE DRAWING
// ============================================================
function drawPlayer(x, y, dir, frame, moving) {
    const bx = Math.floor(x);
    const by = Math.floor(y);
    // shadow
    px(bx-1, by+11, 10, 3, PAL.shadow);
    const bob = moving ? Math.sin(frame * 0.5) * 1 : 0;
    const dy = Math.floor(bob);
    // shoes
    if (moving) {
        const step = Math.floor(frame) % 4;
        px(bx+1, by+12+dy, 3, 2, PAL.shoes);
        px(bx+5, by+12+dy + (step<2?-1:0), 3, 2, PAL.shoes);
    } else {
        px(bx+1, by+12, 3, 2, PAL.shoes);
        px(bx+5, by+12, 3, 2, PAL.shoes);
    }
    // pants
    px(bx+1, by+9+dy, 3, 4, PAL.pants);
    px(bx+5, by+9+dy, 3, 4, PAL.pants);
    // hoodie body
    px(bx, by+3+dy, 9, 7, PAL.hoodie);
    px(bx+1, by+4+dy, 7, 5, PAL.hoodieDk);
    // arms
    if (dir === 1) {
        px(bx-1, by+4+dy, 2, 5, PAL.hoodie);
    } else if (dir === 2) {
        px(bx+8, by+4+dy, 2, 5, PAL.hoodie);
    } else {
        px(bx-1, by+4+dy, 2, 5, PAL.hoodie);
        px(bx+8, by+4+dy, 2, 5, PAL.hoodie);
    }
    // head
    px(bx+1, by-1+dy, 7, 5, PAL.skinTone);
    // hair
    px(bx+1, by-2+dy, 7, 3, PAL.hair);
    if (dir === 0) {
        // eyes
        px(bx+2, by+1+dy, 2, 1, PAL.bgDark);
        px(bx+5, by+1+dy, 2, 1, PAL.bgDark);
    } else if (dir === 3) {
        px(bx+1, by-2+dy, 7, 4, PAL.hair);
    } else if (dir === 1) {
        px(bx+2, by+1+dy, 2, 1, PAL.bgDark);
    } else {
        px(bx+5, by+1+dy, 2, 1, PAL.bgDark);
    }
}

function drawCofounder(x, y) {
    const bx = Math.floor(x);
    const by = Math.floor(y);
    px(bx-1, by+11, 10, 3, PAL.shadow);
    const bob = Math.sin(gs.cofAnimTick * 0.03) * 0.5;
    const dy = Math.floor(bob);
    // shoes
    px(bx+1, by+12, 3, 2, PAL.shoes);
    px(bx+5, by+12, 3, 2, PAL.shoes);
    // pants
    px(bx+1, by+9+dy, 3, 4, '#2a2a3e');
    px(bx+5, by+9+dy, 3, 4, '#2a2a3e');
    // hoodie
    px(bx, by+3+dy, 9, 7, PAL.cofHoodie);
    px(bx+1, by+4+dy, 7, 5, '#554466');
    px(bx-1, by+4+dy, 2, 5, PAL.cofHoodie);
    px(bx+8, by+4+dy, 2, 5, PAL.cofHoodie);
    // head
    px(bx+1, by-1+dy, 7, 5, '#e8c090');
    // mysterious hood/hair
    px(bx, by-2+dy, 9, 3, '#443355');
    // sunglasses
    px(bx+1, by+1+dy, 3, 2, '#111122');
    px(bx+5, by+1+dy, 3, 2, '#111122');
    // "?" bubble occasionally
    if (gs.tick % 200 < 40) {
        px(bx+10, by-6, 7, 8, PAL.white);
        drawText('?', bx+11, by-5, PAL.cofHoodie, 7);
    }
}

// Draw hired employees at desks
function drawEmployees() {
    // Devs sit at top-right desks (13,2) and (14,2)
    for (let i = 0; i < gs.devs; i++) {
        const dx = (13 + i) * T + 4;
        const dy = 3 * T + 2;
        px(dx, dy+11, 8, 2, PAL.shadow);
        px(dx+1, dy+8, 3, 4, PAL.pants); px(dx+4, dy+8, 3, 4, PAL.pants);
        px(dx, dy+3, 8, 6, '#4488aa');
        px(dx+1, dy-1, 6, 5, PAL.skinTone);
        px(dx+1, dy-2, 6, 3, '#5a3a2a');
        px(dx+2, dy+1, 1, 1, PAL.bgDark);
        px(dx+4, dy+1, 1, 1, PAL.bgDark);
    }
    // Sales sit at bottom-left desks (2,11) and (3,11)
    for (let i = 0; i < gs.sales; i++) {
        const sx = (2 + i) * T + 4;
        const sy = 12 * T + 2;
        px(sx, sy+11, 8, 2, PAL.shadow);
        px(sx+1, sy+8, 3, 4, PAL.pants); px(sx+4, sy+8, 3, 4, PAL.pants);
        px(sx, sy+3, 8, 6, '#aa6644');
        px(sx+1, sy-1, 6, 5, PAL.skinTone);
        px(sx+1, sy-2, 6, 3, '#8a4a2a');
        px(sx+2, sy+1, 1, 1, PAL.bgDark);
        px(sx+4, sy+1, 1, 1, PAL.bgDark);
    }
}

// ============================================================
// NOTIFICATIONS
// ============================================================
function addNotification(text, color) {
    gs.notifications.push({ text, color: color || PAL.white, timer: 120, y: 0 });
}

function updateNotifications() {
    for (let i = gs.notifications.length - 1; i >= 0; i--) {
        gs.notifications[i].timer--;
        if (gs.notifications[i].timer <= 0) gs.notifications.splice(i, 1);
    }
}

function drawNotifications() {
    let ny = 40;
    for (const n of gs.notifications) {
        const alpha = Math.min(1, n.timer / 30);
        bctx.globalAlpha = alpha;
        drawTextShadow(n.text, NATIVE_W / 2, ny, n.color, 8, 'center');
        bctx.globalAlpha = 1;
        ny += 12;
    }
}

// ============================================================
// DIALOG / MENU SYSTEM
// ============================================================
function showDialog(text, callback) {
    if (gs.menuActive) return;
    if (gs.dialogActive) {
        gs.dialogQueue.push({ text, callback });
        return;
    }
    gs.dialogActive = true;
    gs.dialogText = text;
    gs.dialogCallback = callback || null;
}

function advanceDialog() {
    if (gs.dialogCallback) {
        const cb = gs.dialogCallback;
        gs.dialogCallback = null;
        gs.dialogActive = false;
        gs.dialogText = '';
        cb();
    } else if (gs.dialogQueue.length > 0) {
        const next = gs.dialogQueue.shift();
        gs.dialogText = next.text;
        gs.dialogCallback = next.callback || null;
    } else {
        gs.dialogActive = false;
        gs.dialogText = '';
    }
}

function showMenu(title, items, callback) {
    gs.menuActive = true;
    gs.menuTitle = title;
    gs.menuItems = items;
    gs.menuSel = 0;
    gs.menuCallback = callback;
    gs.dialogActive = false;
}

function closeMenu() {
    gs.menuActive = false;
    gs.menuItems = [];
    gs.menuCallback = null;
}

function drawDialog() {
    if (!gs.dialogActive) return;
    const dw = 280;
    const dh = 52;
    const dx = (NATIVE_W - dw) / 2;
    const dy = NATIVE_H - dh - 10;
    // border
    px(dx - 2, dy - 2, dw + 4, dh + 4, PAL.dialogBdr);
    px(dx, dy, dw, dh, PAL.dialogBg);
    // text wrapping
    const words = gs.dialogText.split(' ');
    let lines = [];
    let line = '';
    for (const w of words) {
        if ((line + w).length > 42) { lines.push(line.trim()); line = ''; }
        line += w + ' ';
    }
    if (line.trim()) lines.push(line.trim());
    for (let i = 0; i < Math.min(lines.length, 4); i++) {
        drawText(lines[i], dx + 8, dy + 6 + i * 11, PAL.dialogTxt, 8);
    }
    // prompt
    if (gs.tick % 40 < 25) drawText('▼', dx + dw - 14, dy + dh - 12, PAL.dialogBdr, 8);
}

function drawMenu() {
    if (!gs.menuActive) return;
    const itemH = 14;
    const mw = 220;
    const mh = 20 + gs.menuItems.length * itemH + 8;
    const mx = (NATIVE_W - mw) / 2;
    const my = (NATIVE_H - mh) / 2;
    px(mx - 2, my - 2, mw + 4, mh + 4, PAL.dialogBdr);
    px(mx, my, mw, mh, PAL.dialogBg);
    drawTextShadow(gs.menuTitle, mx + mw / 2, my + 4, PAL.dialogBdr, 8, 'center');
    for (let i = 0; i < gs.menuItems.length; i++) {
        const iy = my + 18 + i * itemH;
        if (i === gs.menuSel) {
            px(mx + 4, iy, mw - 8, itemH - 2, '#333355');
            drawText('►', mx + 8, iy + 2, PAL.dialogBdr, 8);
        }
        const item = gs.menuItems[i];
        const col = item.disabled ? PAL.neutral : (item.color || PAL.dialogTxt);
        drawText(item.label, mx + 20, iy + 2, col, 8);
        if (item.cost) {
            drawText(item.cost, mx + mw - 10, iy + 2, PAL.hudYellow, 7, 'right');
        }
    }
}

// ============================================================
// HUD
// ============================================================
function drawHUD() {
    // top bar
    px(0, 0, NATIVE_W, 18, PAL.hudBg);
    px(0, 18, NATIVE_W, 1, PAL.wallTrim);
    drawTextShadow('Day ' + gs.day, 4, 4, PAL.hudGreen, 8);
    // cash
    const cashCol = gs.cash < 10000 ? PAL.hudRed : PAL.hudGreen;
    drawTextShadow('$' + formatNum(gs.cash), 50, 4, cashCol, 8);
    // customers
    drawTextShadow('Cust:' + gs.customers, 120, 4, PAL.custBlue, 8);
    // product
    const msName = getCurrentMilestoneName();
    drawTextShadow('Prod:' + gs.product + (msName ? ' [' + msName + ']' : ''), 180, 4, PAL.hudGold, 8);
    // AP bar - bottom left
    const apY = NATIVE_H - 14;
    drawTextShadow('AP:', 4, apY, PAL.hudTxt, 7);
    for (let i = 0; i < gs.maxAp; i++) {
        px(22 + i * 10, apY + 1, 8, 6, i < gs.ap ? PAL.apFull : PAL.apEmpty);
    }
    // morale bar
    const morCol = gs.morale > 50 ? PAL.hudGreen : (gs.morale > 25 ? PAL.hudYellow : PAL.hudRed);
    drawTextShadow('Morale:' + gs.morale, 65, apY, morCol, 7);
    // team
    drawTextShadow('Dev:' + gs.devs + ' Sales:' + gs.sales, 135, apY, PAL.neutral, 7);
    // revenue
    drawTextShadow('Rev:$' + formatNum(gs.revenue) + '/d', 220, apY, PAL.positive, 7);
}

function getCurrentMilestoneName() {
    for (let i = MILESTONES.length - 1; i >= 0; i--) {
        if (gs.product >= MILESTONES[i].threshold && MILESTONES[i].announced) return MILESTONES[i].name;
    }
    return '';
}

function formatNum(n) {
    if (n >= 1000000) return (n / 1000000).toFixed(1) + 'M';
    if (n >= 1000) return (n / 1000).toFixed(1) + 'K';
    return '' + n;
}

// ============================================================
// INTERACTION LOGIC
// ============================================================
function getFacingTile() {
    const gcx = Math.floor((gs.px + 4) / T);
    const gcy = Math.floor((gs.py + 7) / T);
    let fx = gcx, fy = gcy;
    if (gs.pdir === 0) fy++;
    else if (gs.pdir === 3) fy--;
    else if (gs.pdir === 1) fx--;
    else if (gs.pdir === 2) fx++;
    return { tx: fx, ty: fy, tile: getTile(fx, fy) };
}

function interact() {
    const f = getFacingTile();
    switch (f.tile) {
        case TERMINAL: openTerminalMenu(); break;
        case WHITEBOARD: openWhiteboardMenu(); break;
        case DOOR: openDoorMenu(); break;
        case COFFEE_MACHINE: drinkCoffee(); break;
        case COFOUNDER_SPOT: talkCofounder(); break;
        default:
            // check if facing a desk with hire potential
            if (f.tile === DESK) {
                showDialog('A desk. Could be for a new hire...');
            }
            break;
    }
}

function openTerminalMenu() {
    if (gs.ap <= 0) { showDialog('No action points left. End the day.'); return; }
    const items = [
        { label: 'Build Product (+' + getBuildAmount() + ' prog)', value: 'build' },
        { label: 'Research (+tech insight)', value: 'research' },
        { label: 'Check Metrics', value: 'metrics', noAp: true },
        { label: 'Cancel', value: 'cancel', noAp: true },
    ];
    showMenu('Terminal', items, (sel) => {
        if (sel.value === 'cancel') return;
        if (sel.value === 'metrics') { showMetrics(); return; }
        if (sel.value === 'build') {
            gs.ap--;
            const amt = getBuildAmount();
            gs.product += amt;
            addNotification('+' + amt + ' Product Progress!', PAL.hudGold);
            checkMilestones();
        } else if (sel.value === 'research') {
            gs.ap--;
            const bonus = 3 + Math.floor(Math.random() * 4);
            gs.product += bonus;
            addNotification('+' + bonus + ' Research Insight!', PAL.positive);
            checkMilestones();
        }
    });
}

function getBuildAmount() {
    return 5 + gs.devs * 3;
}

function openWhiteboardMenu() {
    const items = [
        { label: 'Hire Developer ($8K/day, +3 prod/build)', value: 'dev', cost: '$8K' },
        { label: 'Hire Salesperson ($6K/day, +cust)', value: 'sales', cost: '$6K' },
        { label: 'Team Status', value: 'status', noAp: true },
        { label: 'Cancel', value: 'cancel' },
    ];
    showMenu('Hiring Board', items, (sel) => {
        if (sel.value === 'cancel') return;
        if (sel.value === 'status') {
            showDialog('Team: ' + gs.devs + ' devs, ' + gs.sales + ' sales. Daily burn: $' + formatNum(calcBurn()));
            return;
        }
        if (sel.value === 'dev') {
            if (gs.devs >= 3) { showDialog('No more desk space for developers!'); return; }
            if (gs.cash < 8000) { showDialog('Not enough cash to hire!'); return; }
            gs.cash -= 8000;
            gs.devs++;
            addNotification('Developer hired!', PAL.hudGreen);
            showDialog('Welcome aboard! Your new dev will boost product progress.');
        } else if (sel.value === 'sales') {
            if (gs.sales >= 3) { showDialog('No more desk space for salespeople!'); return; }
            if (gs.cash < 6000) { showDialog('Not enough cash to hire!'); return; }
            gs.cash -= 6000;
            gs.sales++;
            addNotification('Salesperson hired!', PAL.hudGreen);
            showDialog('New sales rep will bring in customers every day.');
        }
    });
}

function openDoorMenu() {
    if (gs.ap <= 0) { showDialog('No action points left. End the day.'); return; }
    const items = [
        { label: 'Go Sell (pitch customers)', value: 'sell' },
        { label: 'Network (random bonus)', value: 'network' },
        { label: 'End Day', value: 'endday', noAp: true },
        { label: 'Cancel', value: 'cancel' },
    ];
    showMenu('Leave Office?', items, (sel) => {
        if (sel.value === 'cancel') return;
        if (sel.value === 'endday') { endDay(); return; }
        if (sel.value === 'sell') {
            gs.ap--;
            const gained = 1 + gs.sales + Math.floor(Math.random() * (2 + gs.sales));
            gs.customers += gained;
            addNotification('+' + gained + ' customers!', PAL.custBlue);
        } else if (sel.value === 'network') {
            gs.ap--;
            const roll = Math.random();
            if (roll < 0.3) {
                const bonus = 3000 + Math.floor(Math.random() * 5000);
                gs.cash += bonus;
                addNotification('Networking win! +$' + formatNum(bonus), PAL.hudGreen);
            } else if (roll < 0.6) {
                const c = 1 + Math.floor(Math.random() * 3);
                gs.customers += c;
                addNotification('Met ' + c + ' potential customers!', PAL.custBlue);
            } else {
                gs.morale = Math.min(100, gs.morale + 10);
                addNotification('Great connections! Morale up!', PAL.positive);
            }
        }
    });
}

function drinkCoffee() {
    if (gs.ap >= gs.maxAp) { showDialog('Already fully caffeinated!'); return; }
    gs.ap = Math.min(gs.maxAp, gs.ap + 1);
    addNotification('+1 AP from coffee!', PAL.hudGreen);
    showDialog('*sip* Ahh, that\'s the good stuff. +1 Action Point!');
}

function talkCofounder() {
    const lines = [
        '"I\'m working on something big. You\'ll see."',
        '"Just optimizing our... synergies."',
        '"Have you tried turning the revenue off and on again?"',
        '"I had a vision. We pivot to blockchain. Just kidding. ...Maybe."',
        '"I\'ve been on 47 calls today. None were customers."',
        '"My title? Chief Vibes Officer."',
        '"I\'m reading \'The Lean Startup\' for the 12th time."',
        '"Don\'t worry about what I\'m doing. Worry about product-market fit."',
    ];
    if (gs.day >= 30 && Math.random() < 0.3) {
        showDialog('"Listen... I\'ve been meaning to tell you something. I actually DO stuff around here. I\'ve been quietly building partnerships."', () => {
            gs.customers += 5;
            addNotification('Co-founder brought 5 customers!', PAL.custGreen);
        });
    } else {
        showDialog(lines[Math.floor(Math.random() * lines.length)]);
    }
}

function showMetrics() {
    const burn = calcBurn();
    const rev = calcRevenue();
    const runway = burn > rev ? Math.floor(gs.cash / (burn - rev)) : 999;
    const nextMs = MILESTONES.find(m => !m.announced);
    const msText = nextMs ? (nextMs.name + ' at ' + nextMs.threshold) : 'All milestones reached!';
    showDialog(
        'Day ' + gs.day + ' | Cash: $' + formatNum(gs.cash) +
        ' | Cust: ' + gs.customers + ' | Prod: ' + gs.product +
        ' | Burn: $' + formatNum(burn) + '/d | Rev: $' + formatNum(rev) + '/d' +
        ' | Runway: ' + (runway > 500 ? 'Infinite' : runway + 'd') +
        ' | Next: ' + msText
    );
}

function calcBurn() {
    return 500 + gs.devs * 800 + gs.sales * 600;
}

function calcRevenue() {
    // Each customer = $50/day base, product milestones multiply
    let mult = 1;
    if (gs.product >= 150) mult = 2.5;
    else if (gs.product >= 100) mult = 2;
    else if (gs.product >= 60) mult = 1.5;
    else if (gs.product >= 30) mult = 1.2;
    return Math.floor(gs.customers * 50 * mult);
}

// ============================================================
// MILESTONES
// ============================================================
function checkMilestones() {
    for (const ms of MILESTONES) {
        if (!ms.announced && gs.product >= ms.threshold) {
            ms.announced = true;
            gs.passiveCustPerDay += ms.custBonus;
            gs.milestoneQueue.push(ms);
        }
    }
}

function showNextMilestone() {
    if (gs.milestoneQueue.length === 0) return false;
    const ms = gs.milestoneQueue.shift();
    showDialog('★ MILESTONE: ' + ms.name + '! ★ ' + ms.desc + ' (+' + ms.custBonus + ' customers/day)', () => {
        addNotification(ms.name + ' milestone reached!', PAL.goldMile);
    });
    return true;
}

// ============================================================
// RANDOM EVENT SYSTEM
// ============================================================
function rollForEvent() {
    if (gs.day <= 5) return null;
    if (Math.random() > 0.4) return null;

    // Filter pool: remove events on cooldown
    const available = EVENT_POOL.filter(ev => {
        const lastFired = gs.eventHistory[ev.id] || 0;
        return (gs.day - lastFired) >= 5;
    });
    if (available.length === 0) return null;

    return available[Math.floor(Math.random() * available.length)];
}

function triggerEvent(event) {
    gs.eventHistory[event.id] = gs.day;
    const titleColor = PAL[event.colorTag] || PAL.eventGold;
    const items = [
        { label: event.choiceA, value: 'a', color: PAL.eventGreen },
        { label: event.choiceB, value: 'b', color: PAL.eventGold },
    ];
    showDialog('⚡ ' + event.title + ' ⚡ ' + event.text, () => {
        showMenu('What do you do?', items, (sel) => {
            const effects = sel.value === 'a' ? event.effectA : event.effectB;
            applyEventEffects(effects);
        });
    });
}

function applyEventEffects(effects) {
    if (!effects) return;
    let msgs = [];
    if (effects.cash) {
        gs.cash += effects.cash;
        const col = effects.cash > 0 ? PAL.hudGreen : PAL.hudRed;
        msgs.push((effects.cash > 0 ? '+' : '') + '$' + formatNum(effects.cash));
        addNotification((effects.cash > 0 ? '+' : '') + '$' + formatNum(Math.abs(effects.cash)), col);
    }
    if (effects.customers) {
        gs.customers = Math.max(0, gs.customers + effects.customers);
        const col = effects.customers > 0 ? PAL.custBlue : PAL.hudRed;
        addNotification((effects.customers > 0 ? '+' : '') + effects.customers + ' customers', col);
    }
    if (effects.product) {
        gs.product = Math.max(0, gs.product + effects.product);
        const col = effects.product > 0 ? PAL.hudGold : PAL.hudRed;
        addNotification((effects.product > 0 ? '+' : '') + effects.product + ' product', col);
        if (effects.product > 0) checkMilestones();
    }
    if (effects.morale) {
        gs.morale = Math.max(0, Math.min(100, gs.morale + effects.morale));
        const col = effects.morale > 0 ? PAL.positive : PAL.hudRed;
        addNotification((effects.morale > 0 ? '+' : '') + effects.morale + ' morale', col);
    }
    if (effects.devs) {
        if (gs.devs < 3) {
            gs.devs += effects.devs;
            addNotification('+1 Developer joined!', PAL.hudGreen);
        } else {
            addNotification('No desk space — dev couldn\'t join', PAL.neutral);
        }
    }
}

// ============================================================
// END DAY / DAY TRANSITION
// ============================================================
function endDay() {
    gs.dayTransition = true;
    gs.dayTransAlpha = 0;
    gs.dayTransDir = 1;
    gs.dayTransCallback = () => {
        processEndDay();
    };
}

function processEndDay() {
    gs.day++;
    // Revenue
    gs.revenue = calcRevenue();
    gs.burn = calcBurn();
    gs.cash += gs.revenue;
    gs.cash -= gs.burn;
    gs.totalRevenue += gs.revenue;

    // Passive customers from milestones
    if (gs.passiveCustPerDay > 0) {
        gs.customers += gs.passiveCustPerDay;
    }

    // Sales team brings customers
    if (gs.sales > 0) {
        const saleCust = gs.sales * (1 + Math.floor(Math.random() * 2));
        gs.customers += saleCust;
    }

    // Devs auto-build
    if (gs.devs > 0) {
        const devProd = gs.devs * 2;
        gs.product += devProd;
        checkMilestones();
    }

    // Churn (small %)
    if (gs.customers > 5) {
        const churn = Math.max(0, Math.floor(gs.customers * 0.03));
        if (churn > 0) {
            gs.customers -= churn;
        }
    }

    // Morale drift
    if (gs.cash < 10000) gs.morale = Math.max(0, gs.morale - 3);
    else if (gs.revenue > gs.burn) gs.morale = Math.min(100, gs.morale + 1);
    if (gs.morale < 20) {
        // low morale penalty
        if (Math.random() < 0.2 && gs.devs > 0) {
            gs.devs--;
            addNotification('A developer quit! Low morale...', PAL.hudRed);
        }
        if (Math.random() < 0.2 && gs.sales > 0) {
            gs.sales--;
            addNotification('A salesperson quit! Low morale...', PAL.hudRed);
        }
    }

    // Reset AP
    gs.ap = gs.maxAp;

    // Check game over
    if (gs.cash <= 0) {
        gs.gameOver = true;
        gs.endType = 'bankrupt';
        return;
    }

    // Check endgame wins
    checkEndgame();

    // Roll for random event
    gs.pendingEvent = rollForEvent();

    // check milestones
    checkMilestones();
}

function checkEndgame() {
    // IPO Glory: 200+ customers, 150+ product, $200K+ cash
    if (gs.customers >= 200 && gs.product >= 150 && gs.cash >= 200000) {
        gs.gameOver = true;
        gs.endType = 'ipo';
        return;
    }
    // Profit Machine: Revenue > 5x burn for 3+ days consecutively
    if (gs.revenue >= gs.burn * 5 && gs.cash >= 100000) {
        gs.gameOver = true;
        gs.endType = 'profit';
        return;
    }
    // R&D Utopia: Product 200+
    if (gs.product >= 200) {
        gs.gameOver = true;
        gs.endType = 'rnd';
        return;
    }
    // World Domination: 500+ customers
    if (gs.customers >= 500) {
        gs.gameOver = true;
        gs.endType = 'domination';
        return;
    }
}

// ============================================================
// DAY TRANSITION RENDERING
// ============================================================
function updateDayTransition() {
    if (!gs.dayTransition) return;
    if (gs.dayTransDir === 1) {
        gs.dayTransAlpha += 0.04;
        if (gs.dayTransAlpha >= 1) {
            gs.dayTransAlpha = 1;
            if (gs.dayTransCallback) {
                gs.dayTransCallback();
                gs.dayTransCallback = null;
            }
            gs.dayTransDir = -1;
        }
    } else {
        gs.dayTransAlpha -= 0.04;
        if (gs.dayTransAlpha <= 0) {
            gs.dayTransAlpha = 0;
            gs.dayTransition = false;
            gs.dayTransDir = 0;
            // After transition: show event or milestone
            afterDayTransition();
        }
    }
}

function afterDayTransition() {
    if (gs.gameOver) return;
    // Show milestones first
    if (showNextMilestone()) return;
    // Then show event
    if (gs.pendingEvent) {
        const ev = gs.pendingEvent;
        gs.pendingEvent = null;
        triggerEvent(ev);
    }
}

function drawDayTransition() {
    if (!gs.dayTransition) return;
    bctx.fillStyle = 'rgba(10,10,30,' + gs.dayTransAlpha + ')';
    bctx.fillRect(0, 0, NATIVE_W, NATIVE_H);
    if (gs.dayTransAlpha > 0.5) {
        bctx.globalAlpha = (gs.dayTransAlpha - 0.5) * 2;
        drawTextShadow('Day ' + gs.day, NATIVE_W / 2, NATIVE_H / 2 - 10, PAL.hudGreen, 12, 'center');
        if (gs.day > 1) {
            drawTextShadow('Cash: $' + formatNum(gs.cash), NATIVE_W / 2, NATIVE_H / 2 + 6, gs.cash < 10000 ? PAL.hudRed : PAL.hudGreen, 8, 'center');
            drawTextShadow('Revenue: $' + formatNum(gs.revenue) + '  Burn: $' + formatNum(gs.burn), NATIVE_W / 2, NATIVE_H / 2 + 18, PAL.neutral, 7, 'center');
        }
        bctx.globalAlpha = 1;
    }
}

// ============================================================
// TITLE SCREEN
// ============================================================
function drawTitle() {
    bctx.fillStyle = PAL.titleBg;
    bctx.fillRect(0, 0, NATIVE_W, NATIVE_H);

    // Animated background grid
    for (let x = 0; x < NATIVE_W; x += 16) {
        for (let y = 0; y < NATIVE_H; y += 16) {
            if ((x + y + gs.tick) % 48 < 16) {
                bctx.fillStyle = '#12122a';
                bctx.fillRect(x, y, 16, 16);
            }
        }
    }

    // Title
    const bounce = Math.sin(gs.tick * 0.05) * 3;
    drawTextShadow('SaaS STARTUP', NATIVE_W / 2, 40 + bounce, PAL.titleGreen, 14, 'center');
    drawTextShadow('SIMULATOR', NATIVE_W / 2, 58 + bounce, PAL.titlePurple, 12, 'center');

    // Pixel art building
    px(130, 90, 60, 50, PAL.wallFace);
    px(132, 92, 56, 3, PAL.wallTrim);
    for (let wx = 0; wx < 4; wx++) {
        const lit = (gs.tick + wx * 17) % 80 < 50;
        px(137 + wx * 14, 100, 8, 8, lit ? PAL.monGlow : PAL.monitor);
    }
    px(152, 125, 16, 15, PAL.desk);
    // ground
    px(100, 140, 120, 4, PAL.wallTrim);

    // Instructions
    if (gs.tick % 60 < 40) {
        drawTextShadow('Press ENTER or Z to start', NATIVE_W / 2, 165, PAL.white, 8, 'center');
    }
    drawTextShadow('Arrow keys: Move | Z: Interact | X: Cancel', NATIVE_W / 2, 185, PAL.neutral, 7, 'center');
    drawTextShadow('Build your startup from nothing to IPO!', NATIVE_W / 2, 198, PAL.hudYellow, 7, 'center');
}

// ============================================================
// GAME OVER SCREEN
// ============================================================
function drawGameOver() {
    bctx.fillStyle = '#0a0a1a';
    bctx.fillRect(0, 0, NATIVE_W, NATIVE_H);

    const endings = {
        bankrupt: {
            title: 'GAME OVER',
            sub: 'You ran out of money...',
            desc: 'The startup dream fizzled out on Day ' + gs.day + '.',
            col: PAL.hudRed
        },
        ipo: {
            title: '★ IPO GLORY! ★',
            sub: 'Your company went public!',
            desc: '$' + formatNum(gs.cash) + ' valuation. ' + gs.customers + ' customers. You did it!',
            col: PAL.hudGold
        },
        profit: {
            title: '★ PROFIT MACHINE! ★',
            sub: 'Sustainable profits achieved!',
            desc: 'Revenue crushes burn rate. The rarest startup: a profitable one!',
            col: PAL.hudGreen
        },
        rnd: {
            title: '★ R&D UTOPIA! ★',
            sub: 'Your tech is legendary!',
            desc: 'Product score ' + gs.product + '. Silicon Valley\'s most admired engineering team.',
            col: PAL.positive
        },
        domination: {
            title: '★ WORLD DOMINATION! ★',
            sub: gs.customers + ' customers strong!',
            desc: 'You\'ve cornered the market. Competitors weep. VCs worship you.',
            col: PAL.custPurple
        }
    };

    const e = endings[gs.endType] || endings.bankrupt;
    const pulse = Math.sin(gs.tick * 0.08) * 2;

    drawTextShadow(e.title, NATIVE_W / 2, 40 + pulse, e.col, 14, 'center');
    drawTextShadow(e.sub, NATIVE_W / 2, 62, PAL.white, 9, 'center');
    drawTextShadow(e.desc, NATIVE_W / 2, 82, PAL.neutral, 7, 'center');

    // Stats
    drawTextShadow('— Final Stats —', NATIVE_W / 2, 108, PAL.dialogBdr, 8, 'center');
    drawTextShadow('Days: ' + gs.day, NATIVE_W / 2, 124, PAL.hudTxt, 7, 'center');
    drawTextShadow('Cash: $' + formatNum(gs.cash), NATIVE_W / 2, 136, PAL.hudGreen, 7, 'center');
    drawTextShadow('Customers: ' + gs.customers, NATIVE_W / 2, 148, PAL.custBlue, 7, 'center');
    drawTextShadow('Product: ' + gs.product, NATIVE_W / 2, 160, PAL.hudGold, 7, 'center');
    drawTextShadow('Total Revenue: $' + formatNum(gs.totalRevenue), NATIVE_W / 2, 172, PAL.positive, 7, 'center');
    drawTextShadow('Team: ' + gs.devs + ' devs, ' + gs.sales + ' sales', NATIVE_W / 2, 184, PAL.neutral, 7, 'center');

    if (gs.tick % 60 < 40) {
        drawTextShadow('Press ENTER to play again', NATIVE_W / 2, 205, PAL.white, 8, 'center');
    }
}

// ============================================================
// PLAYER MOVEMENT
// ============================================================
function updatePlayer() {
    if (gs.dialogActive || gs.menuActive || gs.dayTransition || gs.gameOver) return;

    const spd = 1.5;
    let dx = 0, dy = 0;
    gs.pMoving = false;

    if (keys['ArrowLeft'] || keys['a']) { dx = -spd; gs.pdir = 1; gs.pMoving = true; }
    if (keys['ArrowRight'] || keys['d']) { dx = spd; gs.pdir = 2; gs.pMoving = true; }
    if (keys['ArrowUp'] || keys['w']) { dy = -spd; gs.pdir = 3; gs.pMoving = true; }
    if (keys['ArrowDown'] || keys['s']) { dy = spd; gs.pdir = 0; gs.pMoving = true; }

    if (gs.pMoving) gs.pframe += 0.15;

    // Collision — check tile at player bounding box corners
    const pw = 7, ph = 6;
    const newX = gs.px + dx;
    const newY = gs.py + dy;

    // X movement
    if (dx !== 0) {
        const checkX = dx > 0 ? newX + pw : newX;
        const ty1 = Math.floor((gs.py + 8) / T);
        const ty2 = Math.floor((gs.py + 13) / T);
        const tx = Math.floor(checkX / T);
        if (!isSolid(tx, ty1) && !isSolid(tx, ty2)) {
            gs.px = newX;
        }
    }
    // Y movement
    if (dy !== 0) {
        const checkY = dy > 0 ? newY + 14 : newY + 6;
        const tx1 = Math.floor(gs.px / T);
        const tx2 = Math.floor((gs.px + pw) / T);
        const ty = Math.floor(checkY / T);
        if (!isSolid(tx1, ty) && !isSolid(tx2, ty)) {
            gs.py = newY;
        }
    }

    // Clamp to map
    gs.px = Math.max(T, Math.min(gs.px, (MAP_W - 1) * T - 8));
    gs.py = Math.max(T + 4, Math.min(gs.py, (MAP_H - 1) * T - 16));
}

// ============================================================
// INPUT HANDLING
// ============================================================
function handleInput() {
    if (gs.phase === 'title') {
        if (wasPressed('Enter') || wasPressed('z') || wasPressed('Z') || wasPressed(' ')) {
            gs.phase = 'play';
            showDialog('Welcome to your startup! You\'ve got $50K in angel funding and a dream.', () => {
                showDialog('Use Arrow keys to move. Z to interact with objects. Check the terminal, whiteboard, door, and coffee machine.', () => {
                    showDialog('Survive the burn, build your product, and grow your company!');
                });
            });
        }
        return;
    }

    if (gs.gameOver) {
        if (wasPressed('Enter') || wasPressed('z') || wasPressed('Z')) {
            resetGame();
        }
        return;
    }

    if (gs.dayTransition) return;

    // Dialog
    if (gs.dialogActive) {
        if (wasPressed('z') || wasPressed('Z') || wasPressed('Enter') || wasPressed(' ')) {
            advanceDialog();
        }
        return;
    }

    // Menu
    if (gs.menuActive) {
        if (wasPressed('ArrowUp') || wasPressed('w')) {
            gs.menuSel = (gs.menuSel - 1 + gs.menuItems.length) % gs.menuItems.length;
        }
        if (wasPressed('ArrowDown') || wasPressed('s')) {
            gs.menuSel = (gs.menuSel + 1) % gs.menuItems.length;
        }
        if (wasPressed('z') || wasPressed('Z') || wasPressed('Enter')) {
            const sel = gs.menuItems[gs.menuSel];
            if (sel && !sel.disabled) {
                const cb = gs.menuCallback;
                closeMenu();
                if (cb) cb(sel);
            }
        }
        if (wasPressed('x') || wasPressed('X') || wasPressed('Escape')) {
            closeMenu();
        }
        return;
    }

    // World interaction
    if (wasPressed('z') || wasPressed('Z') || wasPressed('Enter')) {
        interact();
    }

    // Quick end day with X when at 0 AP
    if (wasPressed('x') || wasPressed('X')) {
        if (gs.ap <= 0) {
            endDay();
        }
    }
}

// ============================================================
// RESET
// ============================================================
function resetGame() {
    gs.phase = 'title';
    gs.day = 1;
    gs.cash = 50000;
    gs.customers = 0;
    gs.product = 0;
    gs.morale = 70;
    gs.ap = 3;
    gs.maxAp = 3;
    gs.devs = 0;
    gs.sales = 0;
    gs.revenue = 0;
    gs.burn = 500;
    gs.totalRevenue = 0;
    gs.px = 9 * T + 4;
    gs.py = 7 * T + 4;
    gs.pdir = 0;
    gs.pframe = 0;
    gs.menuActive = false;
    gs.dialogActive = false;
    gs.dialogQueue = [];
    gs.dayTransition = false;
    gs.dayTransAlpha = 0;
    gs.gameOver = false;
    gs.endType = '';
    gs.eventHistory = {};
    gs.pendingEvent = null;
    gs.milestoneQueue = [];
    gs.passiveCustPerDay = 0;
    gs.notifications = [];
    for (const ms of MILESTONES) ms.announced = false;
}

// ============================================================
// MAIN RENDER
// ============================================================
function drawMap() {
    for (let ty = 0; ty < MAP_H; ty++) {
        for (let tx = 0; tx < MAP_W; tx++) {
            drawTile(tx, ty);
        }
    }
}

function drawScene() {
    bctx.fillStyle = PAL.bgDark;
    bctx.fillRect(0, 0, NATIVE_W, NATIVE_H);

    // Draw map
    drawMap();

    // Draw rug highlight
    // Morning/evening ambiance overlay
    if (gs.day % 3 === 0) {
        bctx.fillStyle = PAL.morningGold;
        bctx.fillRect(0, 0, NATIVE_W, NATIVE_H);
    }

    // Draw employees
    drawEmployees();

    // Draw co-founder
    drawCofounder(14 * T + 4, 10 * T + 2);

    // Draw player (sorted by Y for overlap)
    drawPlayer(gs.px, gs.py, gs.pdir, gs.pframe, gs.pMoving);

    // Interaction prompt
    if (!gs.dialogActive && !gs.menuActive && !gs.dayTransition) {
        const f = getFacingTile();
        const interactables = [TERMINAL, WHITEBOARD, DOOR, COFFEE_MACHINE, COFOUNDER_SPOT, DESK];
        if (interactables.includes(f.tile)) {
            const labels = {
                [TERMINAL]: 'Terminal',
                [WHITEBOARD]: 'Hiring Board',
                [DOOR]: 'Door',
                [COFFEE_MACHINE]: 'Coffee',
                [COFOUNDER_SPOT]: 'Co-founder',
                [DESK]: 'Desk',
            };
            if (gs.tick % 50 < 35) {
                drawTextShadow('[Z] ' + (labels[f.tile] || 'Interact'), gs.px - 4, gs.py - 10, PAL.hudYellow, 7);
            }
        }
    }

    // HUD
    drawHUD();

    // Notifications
    drawNotifications();

    // Dialog
    drawDialog();

    // Menu
    drawMenu();

    // Day transition
    drawDayTransition();
}

// ============================================================
// GAME LOOP
// ============================================================
function update() {
    gs.tick++;
    gs.cofAnimTick++;

    if (gs.phase === 'title') {
        // just animate
    } else if (gs.phase === 'play') {
        updatePlayer();
        updateDayTransition();
        updateNotifications();
    }

    handleInput();
    clearInput();
}

function render() {
    bctx.clearRect(0, 0, NATIVE_W, NATIVE_H);

    if (gs.phase === 'title') {
        drawTitle();
    } else if (gs.gameOver) {
        drawGameOver();
    } else {
        drawScene();
    }

    // Blit buffer to main canvas
    ctx.imageSmoothingEnabled = false;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(buf, 0, 0, NATIVE_W, NATIVE_H, 0, 0, canvas.width, canvas.height);
}

function gameLoop() {
    update();
    render();
    requestAnimationFrame(gameLoop);
}

gameLoop();
</script>
</body>
</html>