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
// SaaS STARTUP SIMULATOR — Round 14
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
    { name:'MVP', threshold:30, announced:false, desc:'Minimum Viable Product launched!' },
    { name:'Beta', threshold:60, announced:false, desc:'Beta release - early adopters incoming!' },
    { name:'V1.0', threshold:100, announced:false, desc:'Version 1.0 shipped! Market ready.' },
    { name:'Scale', threshold:150, announced:false, desc:'Platform at scale! Enterprise deals unlocked.' },
];

const REVENUE_MILESTONES = [
    { name:'First Dollar', threshold:1, announced:false, desc:'Your first dollar of revenue!', bonus:'morale' },
    { name:'Ramen Profitable', threshold:0, announced:false, desc:'Revenue covers burn! Ramen forever.', bonus:'confidence' },
    { name:'Series A Ready', threshold:500, announced:false, desc:'Investors are calling YOU now.', bonus:'funding' },
];

// ============================================================
// GAME STATE
// ============================================================
const gameState = {
    phase: 'titleScreen',
    day: 1,
    maxAP: 5,
    ap: 5,
    cash: 10000,
    burnRate: 200,
    revenue: 0,
    customers: 0,
    churnRate: 0.05,
    productProgress: 0,
    productQuality: 1,
    morale: 80,
    bugs: 0,
    teamDevs: 0,
    teamSales: 0,
    teamSupport: 0,
    hireSlots: [null,null,null,null],
    features: [],
    notifications: [],
    notifTimer: 0,
    dialogQueue: [],
    dialogActive: false,
    currentDialog: null,
    menuOpen: false,
    menuIndex: 0,
    menuItems: [],
    menuContext: '',
    paused: false,
    cofMood: 'neutral',
    cofDialog: [
        "Don't mind me. Just... thinking about equity structures.",
        "Did you know we're burning $200 a day? Me neither. Ha.",
        "I've been networking. You wouldn't understand.",
        "I'm working on something big. Can't say what yet.",
        "Have you tried turning the product off and on again?",
    ],
    cofDialogIndex: 0,
    eventLog: [],
    interactTarget: null,
    moveTimer: 0,
    titleTimer: 0,
    titleCursorBlink: 0,
    titleStarField: [],
    introStep: 0,
    introDialogs: [
        { speaker:'???', text:"Welcome to the grind, co-founder." },
        { speaker:'You', text:"Angel check cleared. Office lease signed. Let's do this." },
        { speaker:'???', text:"Your co-founder is already here... somewhere. Press arrows to move, Z to interact. Good luck." },
    ],
    dayPhase: 0,
};

// Generate title star field
for(let i=0;i<40;i++){
    gameState.titleStarField.push({
        x: Math.random()*NATIVE_W,
        y: Math.random()*NATIVE_H,
        speed: 0.1+Math.random()*0.3,
        bright: 0.3+Math.random()*0.7,
        twinkle: Math.random()*Math.PI*2,
    });
}

// ============================================================
// PLAYER
// ============================================================
const player = {
    gx:9, gy:7, px:9*T, py:7*T,
    dir:0, frame:0, frameTimer:0, moving:false, speed:1.5,
    targetPx:9*T, targetPy:7*T,
};

// ============================================================
// CO-FOUNDER NPC
// ============================================================
const cofounder = {
    gx:14, gy:10, px:14*T, py:10*T,
    dir:2, frame:0, frameTimer:0,
    wanderTimer:180, idle:true,
};

// ============================================================
// INPUT
// ============================================================
const keys = {};
const justPressed = {};
document.addEventListener('keydown', e => {
    if(!keys[e.key]) justPressed[e.key] = true;
    keys[e.key] = true;
    e.preventDefault();
});
document.addEventListener('keyup', e => { keys[e.key] = false; });
function consumeKey(k){ if(justPressed[k]){justPressed[k]=false;return true;} return false; }

// ============================================================
// NOTIFICATION SYSTEM
// ============================================================
function notify(text, color=PAL.white, duration=180){
    gameState.notifications.push({text,color,timer:duration,maxTimer:duration});
}

function addEventLog(text){
    gameState.eventLog.unshift({text,day:gameState.day});
    if(gameState.eventLog.length>20) gameState.eventLog.pop();
}

// ============================================================
// DIALOG SYSTEM
// ============================================================
function showDialog(speaker, text){
    gameState.dialogQueue.push({speaker, text});
    if(!gameState.dialogActive) advanceDialog();
}
function advanceDialog(){
    if(gameState.dialogQueue.length>0){
        gameState.currentDialog = gameState.dialogQueue.shift();
        gameState.dialogActive = true;
    } else {
        gameState.dialogActive = false;
        gameState.currentDialog = null;
        if(gameState.phase === 'intro'){
            gameState.introStep++;
            if(gameState.introStep >= gameState.introDialogs.length){
                gameState.phase = 'gameplay';
                notify('Day 1 begins! You have 5 AP.', PAL.hudGreen);
                addEventLog('Opened the office for the first time.');
            }
        }
    }
}

// ============================================================
// MENU SYSTEM
// ============================================================
function openMenu(items, context){
    gameState.menuOpen = true;
    gameState.menuItems = items;
    gameState.menuIndex = 0;
    gameState.menuContext = context;
}
function closeMenu(){
    gameState.menuOpen = false;
    gameState.menuItems = [];
    gameState.menuContext = '';
}

// ============================================================
// ACTIONS
// ============================================================
function spendAP(cost){
    if(gameState.ap >= cost){ gameState.ap -= cost; return true; }
    notify('Not enough AP!', PAL.hudRed);
    return false;
}

function actionCode(){
    if(!spendAP(1)) return;
    let progress = 8 + Math.floor(Math.random()*5) + gameState.teamDevs*4;
    if(gameState.morale > 70) progress += 2;
    let bugChance = 0.2 - gameState.productQuality*0.02;
    if(Math.random() < bugChance){
        gameState.bugs++;
        notify('Introduced a bug while coding...', PAL.hudYellow);
        addEventLog('A sneaky bug crept into the code.');
    }
    gameState.productProgress += progress;
    notify('Coded! +' + progress + ' progress', PAL.hudGreen);
    addEventLog('Wrote code. Progress +' + progress);
    checkMilestones();
}

function actionFixBugs(){
    if(gameState.bugs <= 0){ notify('No bugs to fix!', PAL.neutral); return; }
    if(!spendAP(1)) return;
    let fixed = Math.min(gameState.bugs, 1 + Math.floor(Math.random()*2));
    gameState.bugs -= fixed;
    gameState.productQuality = Math.min(10, gameState.productQuality + 0.2);
    notify('Fixed ' + fixed + ' bug(s)!', PAL.hudGreen);
    addEventLog('Squashed ' + fixed + ' bug(s).');
}

function actionSell(){
    if(!spendAP(1)) return;
    let milestone = getCurrentMilestone();
    let productMult = milestone ? 1 + MILESTONES.indexOf(milestone)*0.5 : 0.5;
    let gained = Math.floor((1 + gameState.teamSales*2) * productMult * (1 + Math.random()));
    if(gameState.bugs > 3) gained = Math.max(1, Math.floor(gained * 0.5));
    gameState.customers += gained;
    notify('Sold! +' + gained + ' customer(s)', PAL.custBlue);
    addEventLog('Closed ' + gained + ' new customer(s).');
    recalcRevenue();
}

function actionHire(type){
    if(!spendAP(2)) return;
    let cost = type === 'dev' ? 3000 : type === 'sales' ? 2500 : 2000;
    if(gameState.cash < cost){ notify('Not enough cash to hire!', PAL.hudRed); return; }
    gameState.cash -= cost;
    if(type === 'dev'){ gameState.teamDevs++; gameState.burnRate += 150; }
    if(type === 'sales'){ gameState.teamSales++; gameState.burnRate += 120; }
    if(type === 'support'){ gameState.teamSupport++; gameState.burnRate += 100; }
    notify('Hired a ' + type + '!', PAL.hudGreen);
    addEventLog('Hired a new ' + type + '. Burn rate increased.');
}

function actionCoffee(){
    if(!spendAP(1)) return;
    gameState.morale = Math.min(100, gameState.morale + 15);
    notify('Coffee break! Morale +15', PAL.hudYellow);
    addEventLog('Took a well-deserved coffee break.');
}

function actionWhiteboard(){
    if(!spendAP(1)) return;
    let insight = Math.random();
    if(insight > 0.6){
        gameState.productQuality = Math.min(10, gameState.productQuality + 0.5);
        notify('Great brainstorm! Quality +0.5', PAL.hudGreen);
        addEventLog('Whiteboard session yielded key insights.');
    } else {
        notify('Drew some boxes and arrows. Felt productive.', PAL.neutral);
        addEventLog('Whiteboard session... mostly doodles.');
    }
}

function endDay(){
    gameState.day++;
    // Churn
    let churned = Math.floor(gameState.customers * gameState.churnRate);
    if(gameState.teamSupport > 0) churned = Math.max(0, churned - gameState.teamSupport);
    if(gameState.bugs > 5) churned += Math.floor(gameState.bugs * 0.5);
    gameState.customers = Math.max(0, gameState.customers - churned);
    // Revenue
    recalcRevenue();
    // Burn
    gameState.cash = gameState.cash - gameState.burnRate + gameState.revenue;
    // Team auto-work
    if(gameState.teamDevs > 0){
        let autoProgress = gameState.teamDevs * (3 + Math.floor(Math.random()*3));
        gameState.productProgress += autoProgress;
    }
    if(gameState.teamSales > 0){
        let milestone = getCurrentMilestone();
        let mult = milestone ? 1 : 0.3;
        let autoCust = Math.floor(gameState.teamSales * mult * (1 + Math.random()));
        gameState.customers += autoCust;
        recalcRevenue();
    }
    // Morale decay
    if(gameState.cash < 2000) gameState.morale = Math.max(10, gameState.morale - 5);
    else gameState.morale = Math.max(30, gameState.morale - 2);
    // Restore AP
    gameState.ap = gameState.maxAP;
    gameState.dayPhase = 0;
    // Random events
    if(Math.random() < 0.15) triggerRandomEvent();
    // Check game over
    if(gameState.cash <= 0){
        showDialog('Reality', 'Your bank account hit zero. The dream is over... for now.');
        addEventLog('GAME OVER — Ran out of cash on day ' + gameState.day);
        gameState.phase = 'gameOver';
        return;
    }
    checkMilestones();
    checkRevenueMilestones();
    notify('Day ' + gameState.day + ' — $' + gameState.cash + ' in the bank', PAL.hudGreen);
    if(churned > 0) notify(churned + ' customer(s) churned', PAL.redChurn);
}

function recalcRevenue(){
    let arpu = 50 - gameState.bugs * 2;
    if(arpu < 10) arpu = 10;
    gameState.revenue = gameState.customers * arpu;
}

function getCurrentMilestone(){
    let m = null;
    for(let i=0;i<MILESTONES.length;i++){
        if(gameState.productProgress >= MILESTONES[i].threshold) m = MILESTONES[i];
    }
    return m;
}

function checkMilestones(){
    for(let m of MILESTONES){
        if(!m.announced && gameState.productProgress >= m.threshold){
            m.announced = true;
            showDialog('Milestone!', m.desc);
            notify('MILESTONE: ' + m.name, PAL.goldMile);
            addEventLog('Reached milestone: ' + m.name);
        }
    }
}

function checkRevenueMilestones(){
    for(let m of REVENUE_MILESTONES){
        if(m.announced) continue;
        if(m.name === 'Ramen Profitable' && gameState.revenue >= gameState.burnRate){
            m.announced = true;
            showDialog('Milestone!', m.desc);
            notify('RAMEN PROFITABLE!', PAL.goldMile);
        } else if(m.name !== 'Ramen Profitable' && gameState.revenue >= m.threshold){
            m.announced = true;
            showDialog('Milestone!', m.desc);
            notify(m.name + '!', PAL.goldMile);
        }
    }
}

function triggerRandomEvent(){
    const events = [
        () => { gameState.cash += 500; notify('Found $500 in the couch cushions!', PAL.greenCash); addEventLog('Lucky find: $500 in the couch.'); },
        () => { gameState.morale = Math.min(100, gameState.morale+10); notify('Team pizza party! Morale +10', PAL.hudYellow); addEventLog('Spontaneous pizza party.'); },
        () => { gameState.bugs += 2; notify('Legacy code strikes! +2 bugs', PAL.hudRed); addEventLog('Legacy code introduced 2 bugs.'); },
        () => { let c = 1+Math.floor(Math.random()*3); gameState.customers+=c; recalcRevenue(); notify('Organic signup! +'+c+' customer(s)', PAL.custGreen); addEventLog('Organic signups: +'+c); },
        () => { gameState.burnRate += 50; notify('Rent increase! Burn +$50/day', PAL.hudRed); addEventLog('Landlord raised the rent.'); },
        () => { notify('Your co-founder sent a cryptic Slack message...', PAL.neutral); addEventLog('Co-founder: "Big things coming. Trust the process."'); },
        () => { if(gameState.teamDevs > 0){ gameState.productProgress += 15; notify('Dev had a breakthrough! +15 progress', PAL.hudGreen); addEventLog('Developer breakthrough!'); }},
        () => { gameState.productQuality = Math.min(10, gameState.productQuality+0.3); notify('User feedback improved quality!', PAL.positive); addEventLog('User feedback improved the product.'); },
    ];
    events[Math.floor(Math.random()*events.length)]();
}

// ============================================================
// INTERACTION SYSTEM
// ============================================================
function getInteractTile(){
    const dirs = [[0,-1],[1,0],[0,1],[-1,0]];
    let d = dirs[player.dir];
    let gx = Math.round(player.px/T) + d[0];
    let gy = Math.round(player.py/T) + d[1];
    return {gx, gy, tile: getTile(gx, gy)};
}

function interact(){
    if(gameState.phase !== 'gameplay') return;
    let {gx, gy, tile} = getInteractTile();
    // Check cofounder proximity
    if(Math.abs(gx - cofounder.gx) <= 1 && Math.abs(gy - cofounder.gy) <= 1){
        let line = gameState.cofDialog[gameState.cofDialogIndex % gameState.cofDialog.length];
        gameState.cofDialogIndex++;
        showDialog('Co-Founder', line);
        return;
    }
    switch(tile){
        case TERMINAL:
            openMenu([
                {label:'Write Code (1 AP)', action:actionCode},
                {label:'Fix Bugs (1 AP)', action:actionFixBugs},
                {label:'Cancel', action:closeMenu},
            ], 'Terminal');
            break;
        case DESK:
            openMenu([
                {label:'Review Metrics', action:()=>{ closeMenu(); showMetrics(); }},
                {label:'End Day', action:()=>{ closeMenu(); endDay(); }},
                {label:'Cancel', action:closeMenu},
            ], 'Desk');
            break;
        case WHITEBOARD:
            openMenu([
                {label:'Brainstorm (1 AP)', action:()=>{ closeMenu(); actionWhiteboard(); }},
                {label:'Cancel', action:closeMenu},
            ], 'Whiteboard');
            break;
        case COFFEE_MACHINE:
            openMenu([
                {label:'Get Coffee (1 AP)', action:()=>{ closeMenu(); actionCoffee(); }},
                {label:'Cancel', action:closeMenu},
            ], 'Coffee Machine');
            break;
        case DOOR:
            openMenu([
                {label:'Hire Developer ($3000, 2 AP)', action:()=>{ closeMenu(); actionHire('dev'); }},
                {label:'Hire Salesperson ($2500, 2 AP)', action:()=>{ closeMenu(); actionHire('sales'); }},
                {label:'Hire Support ($2000, 2 AP)', action:()=>{ closeMenu(); actionHire('support'); }},
                {label:'Go Sell (1 AP)', action:()=>{ closeMenu(); actionSell(); }},
                {label:'Cancel', action:closeMenu},
            ], 'Front Door');
            break;
        default:
            break;
    }
}

function showMetrics(){
    let m = getCurrentMilestone();
    let mName = m ? m.name : 'None';
    let nextM = MILESTONES.find(x => !x.announced);
    let nextStr = nextM ? (nextM.name + ' (' + nextM.threshold + ')') : 'All reached!';
    showDialog('Metrics',
        'Day ' + gameState.day + ' | Cash: $' + gameState.cash +
        ' | Rev: $' + gameState.revenue + '/day' +
        ' | Burn: $' + gameState.burnRate + '/day'
    );
    showDialog('Metrics',
        'Customers: ' + gameState.customers +
        ' | Product: ' + gameState.productProgress +
        ' (' + mName + ') | Next: ' + nextStr
    );
    showDialog('Metrics',
        'Team: ' + gameState.teamDevs + ' dev, ' + gameState.teamSales + ' sales, ' + gameState.teamSupport + ' support' +
        ' | Bugs: ' + gameState.bugs + ' | Morale: ' + gameState.morale + '%'
    );
}

// ============================================================
// PIXEL ART DRAWING HELPERS
// ============================================================
function drawRect(x,y,w,h,col){
    bctx.fillStyle=col; bctx.fillRect(Math.floor(x),Math.floor(y),w,h);
}

function drawTile(tx,ty){
    let x=tx*T, y=ty*T;
    let tile=getTile(tx,ty);
    let checker=(tx+ty)%2===0;
    switch(tile){
        case FLOOR:
            drawRect(x,y,T,T,checker?PAL.floorA:PAL.floorB);
            break;
        case WALL_TOP:
            drawRect(x,y,T,T,PAL.wallTop);
            drawRect(x,y+12,T,4,'#443377');
            break;
        case WALL_FACE:
            drawRect(x,y,T,T,PAL.wallFace);
            drawRect(x,y,1,T,'#252540');
            break;
        case WALL_TRIM_TILE:
            drawRect(x,y,T,T,PAL.wallFace);
            drawRect(x,y,T,3,PAL.wallTrim);
            drawRect(x,y+3,T,2,'#3a8848');
            break;
        case DESK:
            drawRect(x,y,T,T,checker?PAL.floorA:PAL.floorB);
            drawRect(x+1,y+4,14,10,PAL.desk);
            drawRect(x+1,y+4,14,3,PAL.deskTop);
            drawRect(x+2,y+12,2,4,PAL.deskLeg);
            drawRect(x+12,y+12,2,4,PAL.deskLeg);
            break;
        case CHAIR:
            drawRect(x,y,T,T,checker?PAL.floorA:PAL.floorB);
            drawRect(x+4,y+6,8,8,PAL.chair);
            drawRect(x+5,y+7,6,6,PAL.chairSeat);
            break;
        case TERMINAL:
            drawRect(x,y,T,T,checker?PAL.floorA:PAL.floorB);
            drawRect(x+1,y+4,14,10,PAL.desk);
            drawRect(x+1,y+4,14,3,PAL.deskTop);
            drawRect(x+3,y+1,10,6,PAL.monitor);
            drawRect(x+4,y+2,8,4,PAL.monGlow);
            // Screen flicker
            if(Math.random()>0.92) drawRect(x+4,y+2,8,4,PAL.monGlowLt);
            drawRect(x+6,y+7,4,1,PAL.deskLeg);
            break;
        case PLANT:
            drawRect(x,y,T,T,checker?PAL.floorA:PAL.floorB);
            drawRect(x+5,y+9,6,6,PAL.pot);
            drawRect(x+5,y+9,6,2,PAL.potDk);
            drawRect(x+6,y+4,4,6,PAL.plant);
            drawRect(x+4,y+3,3,3,PAL.plantDk);
            drawRect(x+9,y+2,3,4,PAL.plant);
            drawRect(x+7,y+1,2,3,PAL.plantDk);
            break;
        case COFOUNDER_SPOT:
            drawRect(x,y,T,T,checker?PAL.floorA:PAL.floorB);
            break;
        case DOOR:
            drawRect(x,y,T,T,checker?PAL.floorA:PAL.floorB);
            drawRect(x+3,y,10,T,'#5a4a3a');
            drawRect(x+4,y+1,8,14,'#7a6a5a');
            drawRect(x+10,y+7,2,3,'#ccaa44');
            break;
        case RUG:
            drawRect(x,y,T,T,checker?PAL.rug:PAL.rugB);
            if(tx===8&&ty===4){ drawRect(x,y,T,2,PAL.wallTrim); }
            if(tx===11&&ty===4){ drawRect(x,y,T,2,PAL.wallTrim); }
            if(ty===6){ drawRect(x,y+14,T,2,PAL.wallTrim); }
            if(tx===8){ drawRect(x,y,2,T,PAL.wallTrim); }
            if(tx===11){ drawRect(x+14,y,2,T,PAL.wallTrim); }
            break;
        case WHITEBOARD:
            drawRect(x,y,T,T,PAL.wallFace);
            drawRect(x+1,y+2,14,10,PAL.wbBorder);
            drawRect(x+2,y+3,12,8,PAL.whiteboard);
            drawRect(x+4,y+5,5,1,PAL.hudRed);
            drawRect(x+4,y+7,8,1,PAL.hudGreen);
            break;
        case WINDOW_TILE:
            drawRect(x,y,T,T,PAL.wallTop);
            drawRect(x+2,y+2,12,10,PAL.window);
            drawRect(x+3,y+3,10,8,PAL.windowLt);
            drawRect(x+8,y+2,1,10,'#666688');
            drawRect(x+2,y+6,12,1,'#666688');
            break;
    }
}

// ============================================================
// SPRITE DRAWING
// ============================================================
function drawPlayer(px,py,dir,frame){
    let x = Math.floor(px), y = Math.floor(py);
    // Shadow
    drawRect(x+3,y+13,10,3,PAL.shadow);
    // Body
    let hoodieC = PAL.hoodie;
    let hoodieD = PAL.hoodieDk;
    // Facing down (0), right (1), up (2), left (3)
    let bobY = (frame%2===0 && player.moving) ? -1 : 0;
    // Hoodie body
    drawRect(x+4,y+6+bobY,8,7,hoodieC);
    drawRect(x+4,y+6+bobY,2,7,hoodieD);
    // Head
    drawRect(x+4,y+1+bobY,8,6,PAL.skinTone);
    // Hair
    if(dir===2){
        drawRect(x+4,y+1+bobY,8,3,PAL.hair);
    } else {
        drawRect(x+4,y+0+bobY,8,3,PAL.hair);
    }
    // Eyes
    if(dir!==2){
        let eyeOff = dir===1 ? 2 : dir===3 ? 0 : 1;
        drawRect(x+5+eyeOff,y+3+bobY,2,2,'#222233');
        if(dir===0) drawRect(x+9,y+3+bobY,2,2,'#222233');
    }
    // Pants
    drawRect(x+4,y+12+bobY,4,2,PAL.pants);
    drawRect(x+8,y+12+bobY,4,2,PAL.pants);
    // Shoes
    let walkOff = (frame%2===0 && player.moving) ? 1 : 0;
    drawRect(x+4,y+14,4,2,PAL.shoes);
    drawRect(x+8+walkOff,y+14,4,2,PAL.shoes);
    // Hoodie strings
    if(dir===0){
        drawRect(x+7,y+6+bobY,1,3,PAL.white);
        drawRect(x+8,y+6+bobY,1,3,PAL.white);
    }
}

function drawCofounder(px,py,dir,frame){
    let x = Math.floor(px), y = Math.floor(py);
    drawRect(x+3,y+13,10,3,PAL.shadow);
    let bobY = (frame%2===0 && !cofounder.idle) ? -1 : 0;
    drawRect(x+4,y+6+bobY,8,7,PAL.cofHoodie);
    drawRect(x+4,y+6+bobY,2,7,'#554466');
    drawRect(x+4,y+1+bobY,8,6,PAL.skinTone);
    drawRect(x+4,y+0+bobY,8,3,'#555555');
    if(dir!==2){
        let eyeOff = dir===1?2:dir===3?0:1;
        drawRect(x+5+eyeOff,y+3+bobY,2,2,'#222233');
        if(dir===0) drawRect(x+9,y+3+bobY,2,2,'#222233');
    }
    drawRect(x+4,y+12+bobY,4,2,'#444455');
    drawRect(x+8,y+12+bobY,4,2,'#444455');
    drawRect(x+4,y+14,4,2,'#333344');
    drawRect(x+8,y+14,4,2,'#333344');
    // Mysterious glint
    if(Math.random()>0.97){
        drawRect(x+11,y+2+bobY,2,2,'#ffffff');
    }
}

// ============================================================
// HUD DRAWING
// ============================================================
function drawHUD(){
    // Top bar
    drawRect(0,0,NATIVE_W,18,PAL.hudBg);
    drawRect(0,18,NATIVE_W,1,PAL.wallTrim);

    bctx.font = '8px monospace';
    bctx.textBaseline = 'top';

    // Day
    bctx.fillStyle = PAL.hudTxt;
    bctx.fillText('Day ' + gameState.day, 4, 2);

    // Cash
    let cashCol = gameState.cash < 2000 ? PAL.hudRed : gameState.cash < 5000 ? PAL.hudYellow : PAL.hudGreen;
    bctx.fillStyle = cashCol;
    bctx.fillText('$' + gameState.cash, 50, 2);

    // Revenue
    bctx.fillStyle = PAL.hudGreen;
    bctx.fillText('+$' + gameState.revenue, 110, 2);

    // Customers
    bctx.fillStyle = PAL.custBlue;
    bctx.fillText(gameState.customers + ' cust', 160, 2);

    // Bugs
    if(gameState.bugs > 0){
        bctx.fillStyle = PAL.hudRed;
        bctx.fillText(gameState.bugs + ' bug' + (gameState.bugs>1?'s':''), 215, 2);
    }

    // Product milestone
    let m = getCurrentMilestone();
    bctx.fillStyle = PAL.goldMile;
    bctx.fillText(m ? m.name : 'Pre-MVP', 260, 2);

    // AP bar
    bctx.fillStyle = PAL.hudTxt;
    bctx.fillText('AP', 4, 10);
    for(let i=0;i<gameState.maxAP;i++){
        let col = i < gameState.ap ? PAL.apFull : PAL.apEmpty;
        drawRect(18+i*12, 10, 10, 6, col);
        drawRect(18+i*12, 10, 10, 1, '#ffffff33');
    }

    // Morale
    let moraleCol = gameState.morale < 30 ? PAL.hudRed : gameState.morale < 60 ? PAL.hudYellow : PAL.hudGreen;
    bctx.fillStyle = moraleCol;
    bctx.fillText('Morale: ' + gameState.morale + '%', 90, 10);

    // Burn rate
    bctx.fillStyle = PAL.hudRed;
    bctx.fillText('-$' + gameState.burnRate + '/d', 170, 10);

    // Team
    bctx.fillStyle = PAL.neutral;
    bctx.fillText('Team: ' + gameState.teamDevs + 'D ' + gameState.teamSales + 'S ' + gameState.teamSupport + 'C', 230, 10);
}

// ============================================================
// NOTIFICATIONS DRAWING
// ============================================================
function drawNotifications(){
    let ny = 24;
    for(let i=gameState.notifications.length-1;i>=0;i--){
        let n = gameState.notifications[i];
        let alpha = Math.min(1, n.timer / 30);
        bctx.globalAlpha = alpha;
        drawRect(4, ny, NATIVE_W-8, 10, '#0f0f1aCC');
        bctx.font = '7px monospace';
        bctx.fillStyle = n.color;
        bctx.textBaseline = 'top';
        bctx.fillText(n.text, 8, ny+1);
        bctx.globalAlpha = 1;
        ny += 12;
        if(ny > 80) break;
    }
}

// ============================================================
// DIALOG DRAWING
// ============================================================
function drawDialog(){
    if(!gameState.dialogActive || !gameState.currentDialog) return;
    let d = gameState.currentDialog;
    let dx = 10, dy = NATIVE_H - 56, dw = NATIVE_W - 20, dh = 48;
    // Border
    drawRect(dx-1,dy-1,dw+2,dh+2,PAL.dialogBdr);
    drawRect(dx,dy,dw,dh,PAL.dialogBg);
    // Inner highlight
    drawRect(dx+1,dy+1,dw-2,1,'#333355');

    bctx.font = '8px monospace';
    bctx.textBaseline = 'top';
    bctx.fillStyle = PAL.wallTrim;
    bctx.fillText(d.speaker, dx+6, dy+4);

    bctx.fillStyle = PAL.dialogTxt;
    // Word wrap
    let words = d.text.split(' ');
    let line = '';
    let lineY = dy + 16;
    let maxW = dw - 16;
    for(let w of words){
        let test = line + w + ' ';
        if(bctx.measureText(test).width > maxW){
            bctx.fillText(line, dx+8, lineY);
            line = w + ' ';
            lineY += 10;
        } else {
            line = test;
        }
    }
    bctx.fillText(line, dx+8, lineY);

    // Advance prompt
    let blink = Math.floor(Date.now()/400)%2;
    if(blink){
        drawRect(dx+dw-12, dy+dh-10, 6, 6, PAL.wallTrim);
    }
}

// ============================================================
// MENU DRAWING
// ============================================================
function drawMenu(){
    if(!gameState.menuOpen) return;
    let items = gameState.menuItems;
    let mw = 160;
    let mh = items.length * 14 + 10;
    let mx = (NATIVE_W - mw) / 2;
    let my = (NATIVE_H - mh) / 2 - 10;

    drawRect(mx-1,my-1,mw+2,mh+2,PAL.dialogBdr);
    drawRect(mx,my,mw,mh,PAL.dialogBg);
    drawRect(mx+1,my+1,mw-2,1,'#333355');

    bctx.font = '8px monospace';
    bctx.textBaseline = 'top';
    bctx.fillStyle = PAL.wallTrim;
    bctx.fillText(gameState.menuContext, mx+6, my+2);

    for(let i=0;i<items.length;i++){
        let iy = my + 14 + i * 14;
        if(i === gameState.menuIndex){
            drawRect(mx+2, iy-1, mw-4, 12, '#333355');
            bctx.fillStyle = PAL.white;
            bctx.fillText('>', mx+6, iy);
        } else {
            bctx.fillStyle = PAL.neutral;
        }
        bctx.fillText(items[i].label, mx+16, iy);
    }
}

// ============================================================
// INTERACTION INDICATOR
// ============================================================
function drawInteractIndicator(){
    if(gameState.dialogActive || gameState.menuOpen) return;
    let {gx,gy,tile} = getInteractTile();
    let interactable = [TERMINAL,DESK,WHITEBOARD,COFFEE_MACHINE,DOOR].includes(tile);
    // Check cofounder
    if(Math.abs(gx-cofounder.gx)<=1 && Math.abs(gy-cofounder.gy)<=1) interactable=true;
    if(!interactable) return;
    let blink = Math.floor(Date.now()/500)%2;
    if(blink){
        bctx.font='7px monospace';
        bctx.fillStyle=PAL.hudYellow;
        bctx.textBaseline='top';
        bctx.fillText('[Z]', gx*T+3, gy*T-4);
    }
}

// ============================================================
// DAY/NIGHT TINT OVERLAY
// ============================================================
function drawDayNightTint(){
    // dayPhase goes from 0 (morning) to 1 (night) based on AP spent
    let spent = gameState.maxAP - gameState.ap;
    let t = spent / gameState.maxAP; // 0=full AP (morning), 1=no AP (night)
    gameState.dayPhase = t;

    // Morning: warm golden overlay; Evening: cool blue overlay
    if(t < 0.3){
        // Morning glow
        let alpha = (0.3 - t) / 0.3 * 0.1;
        bctx.fillStyle = 'rgba(255,230,150,' + alpha.toFixed(3) + ')';
        bctx.fillRect(0, 0, NATIVE_W, NATIVE_H);
    } else if(t > 0.5){
        // Evening/night darkening
        let alpha = (t - 0.5) / 0.5 * 0.35;
        bctx.fillStyle = 'rgba(10,10,50,' + alpha.toFixed(3) + ')';
        bctx.fillRect(0, 0, NATIVE_W, NATIVE_H);
    }

    // Window tiles reflect time of day
    // (handled visually by tint overlay)
}

// ============================================================
// TITLE SCREEN
// ============================================================
function drawTitleScreen(){
    bctx.fillStyle = PAL.titleBg;
    bctx.fillRect(0,0,NATIVE_W,NATIVE_H);

    // Animated stars
    gameState.titleTimer++;
    for(let s of gameState.titleStarField){
        s.twinkle += 0.03;
        let bright = s.bright * (0.5 + 0.5 * Math.sin(s.twinkle));
        bctx.fillStyle = 'rgba(255,255,255,' + bright.toFixed(2) + ')';
        bctx.fillRect(Math.floor(s.x), Math.floor(s.y), 1, 1);
        s.y -= s.speed;
        if(s.y < 0){ s.y = NATIVE_H; s.x = Math.random()*NATIVE_W; }
    }

    // Scanline effect (subtle)
    for(let i=0;i<NATIVE_H;i+=2){
        bctx.fillStyle = 'rgba(0,0,0,0.08)';
        bctx.fillRect(0,i,NATIVE_W,1);
    }

    // Big pixel title "SaaS Startup"
    let titleY = 40;
    drawPixelTitle(titleY);

    // Subtitle
    bctx.font = '8px monospace';
    bctx.textBaseline = 'top';
    bctx.fillStyle = PAL.neutral;
    let subText = 'S I M U L A T O R';
    let sw = bctx.measureText(subText).width;
    bctx.fillText(subText, (NATIVE_W - sw)/2, titleY + 42);

    // Decorative line
    let lineW = 120;
    let lineX = (NATIVE_W - lineW)/2;
    drawRect(lineX, titleY+54, lineW, 1, PAL.wallTrim);
    drawRect(lineX+10, titleY+56, lineW-20, 1, '#333355');

    // Version tag
    bctx.fillStyle = '#555577';
    bctx.fillText('v0.14 alpha', 4, NATIVE_H - 12);

    // Blinking prompt
    gameState.titleCursorBlink += 0.05;
    let promptAlpha = 0.4 + 0.6 * Math.abs(Math.sin(gameState.titleCursorBlink));
    bctx.globalAlpha = promptAlpha;
    bctx.fillStyle = PAL.white;
    let pText = 'Press Z to Start';
    let pw = bctx.measureText(pText).width;
    bctx.fillText(pText, (NATIVE_W - pw)/2, titleY + 80);
    bctx.globalAlpha = 1;

    // Small office preview at bottom
    drawMiniOffice(titleY + 100);

    // Credits
    bctx.fillStyle = '#444466';
    bctx.font = '7px monospace';
    let cText = 'GTM Studio';
    let cw = bctx.measureText(cText).width;
    bctx.fillText(cText, (NATIVE_W - cw)/2, NATIVE_H - 12);
}

function drawPixelTitle(baseY){
    // Render "SaaS Startup" as large pixel text
    bctx.font = '16px monospace';
    bctx.textBaseline = 'top';

    // Shadow
    bctx.fillStyle = '#000011';
    let t1 = 'SaaS';
    let t1w = bctx.measureText(t1).width;
    bctx.fillText(t1, (NATIVE_W - t1w)/2 + 1, baseY + 1);

    // Main color - green accent
    bctx.fillStyle = PAL.wallTrim;
    bctx.fillText(t1, (NATIVE_W - t1w)/2, baseY);

    // Second line
    bctx.font = '12px monospace';
    let t2 = 'Startup';
    let t2w = bctx.measureText(t2).width;
    bctx.fillStyle = '#000011';
    bctx.fillText(t2, (NATIVE_W - t2w)/2 + 1, baseY + 21);
    bctx.fillStyle = PAL.titleAccent;
    bctx.fillText(t2, (NATIVE_W - t2w)/2, baseY + 20);
}

function drawMiniOffice(baseY){
    // Tiny preview of office scene
    let ox = (NATIVE_W - 80)/2;
    let oy = baseY;
    // Floor
    drawRect(ox, oy, 80, 40, PAL.floorA);
    // Walls
    drawRect(ox, oy, 80, 4, PAL.wallTop);
    drawRect(ox, oy, 2, 40, PAL.wallFace);
    drawRect(ox+78, oy, 2, 40, PAL.wallFace);
    // Mini desk
    drawRect(ox+10, oy+12, 12, 6, PAL.desk);
    drawRect(ox+12, oy+10, 8, 4, PAL.monGlow);
    // Mini player
    drawRect(ox+12, oy+22, 6, 8, PAL.hoodie);
    drawRect(ox+13, oy+19, 4, 4, PAL.skinTone);
    // Mini cofounder
    drawRect(ox+55, oy+25, 6, 8, PAL.cofHoodie);
    drawRect(ox+56, oy+22, 4, 4, PAL.skinTone);
    // Mini plant
    drawRect(ox+68, oy+28, 4, 5, PAL.plant);
    drawRect(ox+67, oy+33, 6, 4, PAL.pot);
    // Mini rug
    drawRect(ox+30, oy+15, 20, 14, PAL.rug);
    drawRect(ox+30, oy+15, 20, 1, PAL.wallTrim);
    // Trim
    drawRect(ox, oy+38, 80, 2, PAL.wallTrim);
}

// ============================================================
// GAME OVER SCREEN
// ============================================================
function drawGameOver(){
    bctx.fillStyle = 'rgba(10,10,20,0.85)';
    bctx.fillRect(0,0,NATIVE_W,NATIVE_H);

    bctx.font = '16px monospace';
    bctx.textBaseline = 'top';
    bctx.fillStyle = PAL.hudRed;
    let goText = 'GAME OVER';
    let gow = bctx.measureText(goText).width;
    bctx.fillText(goText, (NATIVE_W-gow)/2, 60);

    bctx.font = '8px monospace';
    bctx.fillStyle = PAL.neutral;
    let stats = [
        'Survived ' + gameState.day + ' days',
        'Peak customers: ' + gameState.customers,
        'Product progress: ' + gameState.productProgress,
        'Team size: ' + (gameState.teamDevs + gameState.teamSales + gameState.teamSupport),
    ];
    for(let i=0;i<stats.length;i++){
        let sw = bctx.measureText(stats[i]).width;
        bctx.fillText(stats[i], (NATIVE_W-sw)/2, 90 + i*14);
    }

    let blink = Math.floor(Date.now()/500)%2;
    if(blink){
        bctx.fillStyle = PAL.white;
        let rt = 'Press Z to Restart';
        let rw = bctx.measureText(rt).width;
        bctx.fillText(rt, (NATIVE_W-rw)/2, 160);
    }
}

// ============================================================
// CO-FOUNDER AI
// ============================================================
function updateCofounder(){
    cofounder.wanderTimer--;
    if(cofounder.wanderTimer <= 0){
        cofounder.wanderTimer = 120 + Math.floor(Math.random()*180);
        if(Math.random() > 0.4){
            let dirs = [[0,-1],[1,0],[0,1],[-1,0]];
            let d = dirs[Math.floor(Math.random()*4)];
            let nx = cofounder.gx + d[0];
            let ny = cofounder.gy + d[1];
            if(!isSolid(nx,ny) && !(nx===Math.round(player.px/T)&&ny===Math.round(player.py/T))){
                cofounder.gx = nx;
                cofounder.gy = ny;
                cofounder.dir = dirs.indexOf(d);
                cofounder.idle = false;
                cofounder.frameTimer = 15;
            }
        }
    }
    // Smooth movement
    let tpx = cofounder.gx * T;
    let tpy = cofounder.gy * T;
    cofounder.px += (tpx - cofounder.px) * 0.1;
    cofounder.py += (tpy - cofounder.py) * 0.1;
    if(cofounder.frameTimer > 0){
        cofounder.frameTimer--;
        cofounder.frame = Math.floor(cofounder.frameTimer/8)%2;
    } else {
        cofounder.idle = true;
        cofounder.frame = 0;
    }
}

// ============================================================
// PLAYER UPDATE
// ============================================================
function updatePlayer(){
    if(gameState.dialogActive || gameState.menuOpen || gameState.phase !== 'gameplay') return;

    let dx = 0, dy = 0;
    if(keys['ArrowUp']||keys['w']) { dy = -1; player.dir = 2; }
    if(keys['ArrowDown']||keys['s']) { dy = 1; player.dir = 0; }
    if(keys['ArrowLeft']||keys['a']) { dx = -1; player.dir = 3; }
    if(keys['ArrowRight']||keys['d']) { dx = 1; player.dir = 1; }

    if(dx !== 0 || dy !== 0){
        player.moving = true;
        let npx = player.px + dx * player.speed;
        let npy = player.py + dy * player.speed;
        let ngx = Math.round(npx / T);
        let ngy = Math.round(npy / T);
        // Check collision separately for each axis
        let cpx = player.px, cpy = player.py;
        // X axis
        let txgx = Math.round((player.px + dx*player.speed)/T);
        let tygy = Math.round(player.py/T);
        if(!isSolid(txgx, tygy)){
            cpx = player.px + dx*player.speed;
        }
        // Y axis
        let rxgx = Math.round(cpx/T);
        let rygy = Math.round((player.py + dy*player.speed)/T);
        if(!isSolid(rxgx, rygy)){
            cpy = player.py + dy*player.speed;
        }
        // Bounds
        cpx = Math.max(T, Math.min((MAP_W-2)*T, cpx));
        cpy = Math.max(T, Math.min((MAP_H-2)*T, cpy));
        player.px = cpx;
        player.py = cpy;

        player.frameTimer++;
        if(player.frameTimer > 8){ player.frameTimer = 0; player.frame = (player.frame+1)%4; }
    } else {
        player.moving = false;
        player.frame = 0;
    }
}

// ============================================================
// MAIN UPDATE
// ============================================================
function update(){
    // Title screen
    if(gameState.phase === 'titleScreen'){
        if(consumeKey('z') || consumeKey('Z') || consumeKey('Enter')){
            gameState.phase = 'intro';
            // Queue intro dialogs
            for(let d of gameState.introDialogs){
                gameState.dialogQueue.push(d);
            }
            advanceDialog();
        }
        return;
    }

    // Intro phase - only dialog advances
    if(gameState.phase === 'intro'){
        if(consumeKey('z') || consumeKey('Z') || consumeKey('Enter')){
            if(gameState.dialogActive){
                advanceDialog();
            }
        }
        return;
    }

    // Game over
    if(gameState.phase === 'gameOver'){
        if(consumeKey('z') || consumeKey('Z') || consumeKey('Enter')){
            restartGame();
        }
        return;
    }

    // Gameplay
    if(gameState.phase !== 'gameplay') return;

    // Dialog advance
    if(gameState.dialogActive){
        if(consumeKey('z') || consumeKey('Z') || consumeKey('Enter')){
            advanceDialog();
        }
        return;
    }

    // Menu navigation
    if(gameState.menuOpen){
        if(consumeKey('ArrowUp') || consumeKey('w')){
            gameState.menuIndex = (gameState.menuIndex - 1 + gameState.menuItems.length) % gameState.menuItems.length;
        }
        if(consumeKey('ArrowDown') || consumeKey('s')){
            gameState.menuIndex = (gameState.menuIndex + 1) % gameState.menuItems.length;
        }
        if(consumeKey('z') || consumeKey('Z') || consumeKey('Enter')){
            let item = gameState.menuItems[gameState.menuIndex];
            if(item && item.action) item.action();
        }
        if(consumeKey('x') || consumeKey('X') || consumeKey('Escape')){
            closeMenu();
        }
        return;
    }

    // Player movement
    updatePlayer();

    // Interaction
    if(consumeKey('z') || consumeKey('Z')){
        interact();
    }

    // Open end day with X
    if(consumeKey('x') || consumeKey('X')){
        openMenu([
            {label:'End Day', action:()=>{ closeMenu(); endDay(); }},
            {label:'View Metrics', action:()=>{ closeMenu(); showMetrics(); }},
            {label:'Cancel', action:closeMenu},
        ], 'Quick Menu');
    }

    // Co-founder
    updateCofounder();

    // Notifications
    for(let i=gameState.notifications.length-1;i>=0;i--){
        gameState.notifications[i].timer--;
        if(gameState.notifications[i].timer<=0) gameState.notifications.splice(i,1);
    }
}

// ============================================================
// RESTART
// ============================================================
function restartGame(){
    gameState.phase = 'titleScreen';
    gameState.day = 1;
    gameState.ap = 5;
    gameState.cash = 10000;
    gameState.burnRate = 200;
    gameState.revenue = 0;
    gameState.customers = 0;
    gameState.churnRate = 0.05;
    gameState.productProgress = 0;
    gameState.productQuality = 1;
    gameState.morale = 80;
    gameState.bugs = 0;
    gameState.teamDevs = 0;
    gameState.teamSales = 0;
    gameState.teamSupport = 0;
    gameState.notifications = [];
    gameState.dialogQueue = [];
    gameState.dialogActive = false;
    gameState.currentDialog = null;
    gameState.menuOpen = false;
    gameState.cofDialogIndex = 0;
    gameState.eventLog = [];
    gameState.dayPhase = 0;
    gameState.introStep = 0;
    gameState.titleTimer = 0;
    gameState.titleCursorBlink = 0;
    for(let m of MILESTONES) m.announced = false;
    for(let m of REVENUE_MILESTONES) m.announced = false;
    player.px = 9*T; player.py = 7*T; player.gx=9; player.gy=7; player.dir=0;
    cofounder.gx=14; cofounder.gy=10; cofounder.px=14*T; cofounder.py=10*T;
}

// ============================================================
// MAIN RENDER
// ============================================================
function render(){
    bctx.fillStyle = PAL.bgDark;
    bctx.fillRect(0,0,NATIVE_W,NATIVE_H);

    if(gameState.phase === 'titleScreen'){
        drawTitleScreen();
    } else if(gameState.phase === 'intro'){
        // Show office dimly behind intro dialog
        drawOfficeScene();
        bctx.fillStyle = 'rgba(10,10,30,0.5)';
        bctx.fillRect(0,0,NATIVE_W,NATIVE_H);
        drawDialog();
    } else if(gameState.phase === 'gameplay' || gameState.phase === 'gameOver'){
        drawOfficeScene();
        drawDayNightTint();
        drawHUD();
        drawNotifications();
        drawInteractIndicator();
        drawMenu();
        drawDialog();
        if(gameState.phase === 'gameOver') drawGameOver();
    }

    // Scale buffer to main canvas
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(buf, 0, 0, NATIVE_W, NATIVE_H, 0, 0, NATIVE_W*SCALE, NATIVE_H*SCALE);
}

function drawOfficeScene(){
    // Draw all tiles
    for(let ty=0;ty<MAP_H;ty++){
        for(let tx=0;tx<MAP_W;tx++){
            drawTile(tx,ty);
        }
    }

    // Sort sprites by Y for depth
    let sprites = [
        {type:'player', y:player.py},
        {type:'cofounder', y:cofounder.py},
    ];
    sprites.sort((a,b) => a.y - b.y);

    for(let s of sprites){
        if(s.type === 'player') drawPlayer(player.px, player.py, player.dir, player.frame);
        if(s.type === 'cofounder') drawCofounder(cofounder.px, cofounder.py, cofounder.dir, cofounder.frame);
    }
}

// ============================================================
// GAME LOOP
// ============================================================
function gameLoop(){
    update();
    render();
    // Clear justPressed
    for(let k in justPressed) justPressed[k] = false;
    requestAnimationFrame(gameLoop);
}

gameLoop();
</script>
</body>
</html>