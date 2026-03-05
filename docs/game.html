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
// SaaS STARTUP SIMULATOR — Round 13
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
// PRODUCT MILESTONE TIERS
// ============================================================
const MILESTONES = [
    { name:'MVP', threshold:30, announced:false, desc:'Minimum Viable Product launched!' },
    { name:'Beta', threshold:60, announced:false, desc:'Beta release - early adopters incoming!' },
    { name:'V1.0', threshold:100, announced:false, desc:'Version 1.0 shipped! Market ready.' },
    { name:'Scale', threshold:150, announced:false, desc:'Platform at scale! Enterprise deals unlocked.' },
];

// ============================================================
// REVENUE MILESTONES
// ============================================================
const REVENUE_MILESTONES = [
    { name:'First Dollar', threshold:1, announced:false, desc:'Your first dollar of revenue! The dream is real.', bonus:'morale' },
    { name:'Ramen Profitable', threshold:0, announced:false, desc:'Revenue covers burn! You can survive on ramen forever.', bonus:'confidence', checkFn: (gs) => gs.revenue >= gs.burnRate && gs.customers >= 3 },
    { name:'PMF Signal', threshold:0, announced:false, desc:'Product-Market Fit! Growth is accelerating.', bonus:'growth', checkFn: (gs) => gs.customers >= 15 && gs.churnRate < 0.06 },
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
        desc:'Your cloud provider is down. Customers are unhappy.',
        effect(gs){ gs.productQuality = Math.max(0, gs.productQuality - 5); gs.morale = Math.max(0, gs.morale - 10); addChurnBurst(gs, 2); }
    },
    {
        id:'viral_tweet', type:'positive', weight:2, minDay:3,
        title:'Viral Tweet!',
        desc:'Someone tweeted about your product. Traffic is spiking!',
        effect(gs){ gs.customerFrac += 3; gs.morale = Math.min(100, gs.morale + 10); }
    },
    {
        id:'competitor_launch', type:'negative', weight:2, minDay:10,
        title:'Competitor Launched!',
        desc:'A well-funded competitor just launched a similar product.',
        effect(gs){ gs.churnRate = Math.min(0.15, gs.churnRate + 0.02); gs.morale = Math.max(0, gs.morale - 5); }
    },
    {
        id:'angel_interest', type:'positive', weight:1, minDay:8,
        title:'Angel Interest!',
        desc:'An angel investor wants to put in $50K!',
        effect(gs){ gs.cash += 50; }
    },
    {
        id:'feature_request', type:'neutral', weight:3, minDay:4,
        title:'Big Feature Request',
        desc:'A potential whale customer wants a custom feature. +10 quality if you have a dev.',
        effect(gs){ if(gs.employees.some(e=>e.type==='dev')){ gs.productQuality += 10; } else { gs.morale = Math.max(0, gs.morale - 5); } }
    },
    {
        id:'coffee_machine_break', type:'negative', weight:2, minDay:1,
        title:'Coffee Machine Broke!',
        desc:'The coffee machine is broken. Team morale takes a hit.',
        effect(gs){ gs.morale = Math.max(0, gs.morale - 15); }
    },
    {
        id:'hackathon_win', type:'positive', weight:1, minDay:7,
        title:'Hackathon Win!',
        desc:'Your team won a local hackathon! Great PR.',
        effect(gs){ gs.productQuality += 8; gs.morale = Math.min(100, gs.morale + 15); gs.customerFrac += 2; }
    },
    {
        id:'tech_debt', type:'negative', weight:3, minDay:12,
        title:'Tech Debt Crisis!',
        desc:'Accumulated shortcuts are slowing everything down.',
        effect(gs){ gs.productQuality = Math.max(0, gs.productQuality - 10); }
    },
    {
        id:'press_coverage', type:'positive', weight:1, minDay:15,
        title:'TechCrunch Feature!',
        desc:'A major tech blog covered your startup!',
        effect(gs){ gs.customerFrac += 5; gs.morale = Math.min(100, gs.morale + 10); }
    },
    {
        id:'key_employee_poached', type:'negative', weight:1, minDay:20,
        title:'Poaching Attempt!',
        desc:'A big tech company is trying to hire your best people. Morale shaken.',
        effect(gs){ gs.morale = Math.max(0, gs.morale - 20); }
    },
];

// ============================================================
// CUSTOMER BOARD — Pixel Avatars
// ============================================================
const CUST_COLORS = [PAL.custBlue, PAL.custGreen, PAL.custOrange, PAL.custPurple, PAL.custPink, '#44aaaa', '#aa8844', '#7766bb'];
const CUST_NAMES = ['Acme','Globex','Initech','Hooli','Umbrella','Soylent','Cyberdyn','Wonka','Weyland','Aperture','Oscorp','Tyrell','Abstergo','Massive','Vehement','Stark','Wayne','LexCo','Pied P.','Dunder'];

class CustomerAvatar {
    constructor(id) {
        this.id = id;
        this.name = CUST_NAMES[id % CUST_NAMES.length];
        this.color = CUST_COLORS[id % CUST_COLORS.length];
        this.flashTimer = 30; // green flash on acquire
        this.dying = false;
        this.deathTimer = 0;
        this.slot = -1;
    }
}

// ============================================================
// GAME STATE
// ============================================================
let GS = {};
function resetGame() {
    GS = {
        day: 1, hour: 9, tick: 0, ticksPerHour: 120,
        phase: 'title', // title, play, dialog, menu, gameover, milestone_popup
        cash: 200, // $K
        burnRate: 15, // $K per month (deducted daily as burnRate/30)
        revenue: 0, // $K per month from customers
        revenuePerCustomer: 3, // $K/month per customer
        customers: 0,
        customerFrac: 0, // fractional accumulator for acquisition
        churnFrac: 0, // fractional accumulator for churn
        churnRate: 0.12, // daily churn probability per customer (starts high)
        productQuality: 0,
        morale: 70,
        ap: 4, apMax: 4,
        employees: [],
        nextEmployeeId: 1,
        playerX: 9 * T + 4, playerY: 7 * T + 4,
        playerDir: 0, // 0=down,1=up,2=left,3=right
        playerFrame: 0, playerFrameTimer: 0,
        dialogQueue: [],
        currentDialog: null,
        menuType: null,
        menuItems: [],
        menuIdx: 0,
        eventCooldown: 0,
        lastEvent: null,
        milestonePopup: null,
        milestoneTimer: 0,
        // Customer board state
        customerAvatars: [],
        nextCustomerId: 0,
        boardFlashes: [], // {x, y, timer, color} for churn/gain visual effects
        // Cofounder
        cofState: 'idle', cofTimer: 0, cofMsg: '',
        cofX: 14 * T, cofY: 10 * T,
        // Revenue milestones
        revMilestones: REVENUE_MILESTONES.map(m => ({...m, announced: false})),
        // Stats
        totalRevenue: 0,
        customersLost: 0,
        peakCustomers: 0,
        // Hire costs
        hireCosts: { dev: 30, sales: 25, designer: 35 },
        // Notifications
        notifications: [],
    };
    MILESTONES.forEach(m => m.announced = false);
}
resetGame();

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
function consumeKey(k) { if (justPressed[k]) { justPressed[k] = false; return true; } return false; }
function clearJustPressed() { for (let k in justPressed) justPressed[k] = false; }

// ============================================================
// HELPERS
// ============================================================
function rng(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }
function clamp(v, lo, hi) { return Math.max(lo, Math.min(hi, v)); }
function lerpColor(a, b, t) { return b; } // simple version

function addNotification(text, color) {
    GS.notifications.push({ text, color: color || PAL.white, timer: 180, y: 0 });
}

function addChurnBurst(gs, count) {
    for (let i = 0; i < count && gs.customers > 0; i++) {
        removeCustomer(gs);
    }
}

function addCustomer(gs) {
    const av = new CustomerAvatar(gs.nextCustomerId++);
    gs.customerAvatars.push(av);
    gs.customers = gs.customerAvatars.filter(a => !a.dying).length;
    if (gs.customers > gs.peakCustomers) gs.peakCustomers = gs.customers;
    assignCustomerSlots(gs);
    // Board flash
    const slot = av.slot;
    if (slot >= 0) {
        const pos = getSlotPos(slot);
        gs.boardFlashes.push({ x: pos.x, y: pos.y, timer: 20, color: PAL.greenCash });
    }
}

function removeCustomer(gs) {
    const alive = gs.customerAvatars.filter(a => !a.dying);
    if (alive.length === 0) return;
    const victim = alive[rng(0, alive.length - 1)];
    victim.dying = true;
    victim.deathTimer = 30;
    gs.customersLost++;
    // Board flash
    const slot = victim.slot;
    if (slot >= 0) {
        const pos = getSlotPos(slot);
        gs.boardFlashes.push({ x: pos.x, y: pos.y, timer: 25, color: PAL.redChurn });
    }
}

// Whiteboard area: tiles (6,2) to (8,2), so pixel area ~96,32 to ~144,48
// We'll draw the customer board on the whiteboard area
const BOARD_X = 6 * T;
const BOARD_Y = 2 * T;
const BOARD_W = 3 * T; // 48px
const BOARD_H = T; // 16px
const SLOTS_PER_ROW = 8;
const MAX_BOARD_SLOTS = 24; // 3 rows of 8

function getSlotPos(slot) {
    const row = Math.floor(slot / SLOTS_PER_ROW);
    const col = slot % SLOTS_PER_ROW;
    return { x: BOARD_X + 2 + col * 5, y: BOARD_Y + 2 + row * 5 };
}

function assignCustomerSlots(gs) {
    let idx = 0;
    for (const av of gs.customerAvatars) {
        if (!av.dying) {
            av.slot = idx++;
        }
    }
}

// ============================================================
// EMPLOYEE SYSTEM
// ============================================================
function hireEmployee(type) {
    const cost = GS.hireCosts[type] || 25;
    if (GS.cash < cost) {
        showDialog([`Not enough cash! Need $${cost}K.`]);
        return;
    }
    if (GS.ap < 2) {
        showDialog(["Not enough AP! Hiring costs 2 AP."]);
        return;
    }
    GS.cash -= cost;
    GS.ap -= 2;
    const names_dev = ['Alex','Sam','Jordan','Casey','Riley','Morgan','Quinn','Avery'];
    const names_sales = ['Blake','Taylor','Drew','Pat','Jamie','Dana','Logan','Reese'];
    const names_design = ['Sage','Ash','Sky','Wren','Kai','Nova','Lux','Indigo'];
    let name;
    if (type === 'dev') name = names_dev[rng(0, names_dev.length - 1)];
    else if (type === 'sales') name = names_sales[rng(0, names_sales.length - 1)];
    else name = names_design[rng(0, names_design.length - 1)];

    const emp = {
        id: GS.nextEmployeeId++,
        name, type,
        skill: rng(40, 80),
        morale: 70,
        salary: type === 'dev' ? 12 : (type === 'sales' ? 10 : 13),
        deskAssigned: false,
    };
    GS.employees.push(emp);
    GS.burnRate += emp.salary;
    showDialog([`Hired ${name} as ${type}!`, `Skill: ${emp.skill} | Salary: $${emp.salary}K/mo`, `Monthly burn is now $${GS.burnRate}K.`]);
    addNotification(`${name} joined as ${type}!`, PAL.positive);
}

// ============================================================
// DIALOG SYSTEM
// ============================================================
function showDialog(lines, choices) {
    GS.currentDialog = {
        lines: lines || [],
        choices: choices || null,
        choiceIdx: 0,
        lineIdx: 0,
        charIdx: 0,
        charTimer: 0,
        done: false,
    };
    GS.phase = 'dialog';
}

function advanceDialog() {
    const d = GS.currentDialog;
    if (!d) return;
    if (d.charIdx < d.lines[d.lineIdx].length) {
        d.charIdx = d.lines[d.lineIdx].length;
        return;
    }
    if (d.lineIdx < d.lines.length - 1) {
        d.lineIdx++;
        d.charIdx = 0;
        return;
    }
    if (d.choices) {
        d.done = true;
        return;
    }
    closeDialog();
}

function closeDialog() {
    GS.currentDialog = null;
    if (GS.dialogQueue.length > 0) {
        const next = GS.dialogQueue.shift();
        showDialog(next.lines, next.choices);
    } else {
        GS.phase = 'play';
    }
}

// ============================================================
// MENU SYSTEM
// ============================================================
function openMenu(type) {
    GS.menuType = type;
    GS.menuIdx = 0;
    if (type === 'terminal') {
        GS.menuItems = [
            { label: 'Code (1 AP) — Build product', action: 'code' },
            { label: 'Review Metrics', action: 'metrics' },
            { label: 'Check Email', action: 'email' },
            { label: 'Cancel', action: 'cancel' },
        ];
    } else if (type === 'hire') {
        const dc = GS.hireCosts.dev, sc = GS.hireCosts.sales, dsc = GS.hireCosts.designer;
        GS.menuItems = [
            { label: `Hire Developer ($${dc}K, 2 AP)`, action: 'hire_dev' },
            { label: `Hire Salesperson ($${sc}K, 2 AP)`, action: 'hire_sales' },
            { label: `Hire Designer ($${dsc}K, 2 AP)`, action: 'hire_designer' },
            { label: 'Cancel', action: 'cancel' },
        ];
    } else if (type === 'coffee') {
        GS.menuItems = [
            { label: 'Drink Coffee (+10 Morale, 0 AP)', action: 'coffee' },
            { label: 'Team Coffee Run (+5 All Morale, 1 AP)', action: 'team_coffee' },
            { label: 'Cancel', action: 'cancel' },
        ];
    } else if (type === 'whiteboard') {
        GS.menuItems = [
            { label: 'Strategy Session (1 AP)', action: 'strategy' },
            { label: 'View Customer Board', action: 'view_board' },
            { label: 'Cancel', action: 'cancel' },
        ];
    }
    GS.phase = 'menu';
}

function executeMenuAction(action) {
    GS.phase = 'play';
    GS.menuType = null;
    if (action === 'cancel') return;

    if (action === 'code') {
        if (GS.ap < 1) { showDialog(["No AP left! End the day to rest."]); return; }
        GS.ap--;
        const devBonus = GS.employees.filter(e => e.type === 'dev').reduce((s, e) => s + e.skill * 0.05, 0);
        const moraleMultiplier = GS.morale >= 70 ? 1.2 : (GS.morale >= 40 ? 1.0 : 0.7);
        const pts = Math.ceil((rng(5, 12) + devBonus) * moraleMultiplier);
        GS.productQuality += pts;
        showDialog([`Wrote code! Product quality +${pts}`, `Total quality: ${GS.productQuality}`]);
        checkProductMilestones();
    } else if (action === 'metrics') {
        const devs = GS.employees.filter(e => e.type === 'dev').length;
        const sales = GS.employees.filter(e => e.type === 'sales').length;
        const designers = GS.employees.filter(e => e.type === 'designer').length;
        const dailyBurn = (GS.burnRate / 30).toFixed(1);
        const dailyRev = (GS.customers * GS.revenuePerCustomer / 30).toFixed(1);
        const acqRate = (sales * 0.4 + (GS.productQuality > 50 ? 0.2 : 0)).toFixed(1);
        const churn = (GS.churnRate * 100).toFixed(1);
        const runway = GS.burnRate > GS.revenue ? Math.floor(GS.cash / ((GS.burnRate - GS.revenue) / 30)) : 999;
        showDialog([
            `Day ${GS.day} | Cash: $${GS.cash.toFixed(0)}K`,
            `Customers: ${GS.customers} | Churn: ${churn}%/day`,
            `Revenue: $${GS.revenue.toFixed(1)}K/mo | Burn: $${GS.burnRate}K/mo`,
            `Team: ${devs}D ${sales}S ${designers}Ds | Morale: ${GS.morale}`,
            `Acq Rate: ~${acqRate}/day | Runway: ${runway > 900 ? '∞' : runway + ' days'}`,
            `Quality: ${GS.productQuality} | ${getNextMilestone(GS.productQuality) ? 'Next: ' + getNextMilestone(GS.productQuality).name + ' (' + getNextMilestone(GS.productQuality).threshold + ')' : 'All milestones reached!'}`,
        ]);
    } else if (action === 'email') {
        const emails = [
            "Subject: URGENT - Nigerian Prince wants to invest $10M",
            "Subject: Re: Re: Re: Meeting about the meeting",
            "Subject: Your free trial of CloudHostPro expires tomorrow",
            "Subject: LinkedIn: 47 people viewed your profile",
            "Subject: Recruiter here - have you considered a REAL job?",
            "Subject: Y Combinator - Application received",
            "Subject: Customer feedback: 'This changed my life'",
            "Subject: AWS bill alert: You spent $0.03 this month",
        ];
        showDialog([emails[rng(0, emails.length - 1)]]);
    } else if (action === 'hire_dev') {
        hireEmployee('dev');
    } else if (action === 'hire_sales') {
        hireEmployee('sales');
    } else if (action === 'hire_designer') {
        hireEmployee('designer');
    } else if (action === 'coffee') {
        GS.morale = Math.min(100, GS.morale + 10);
        showDialog(["Ahh, fresh coffee! Morale +10"]);
        addNotification("Coffee boost! +10 morale", PAL.positive);
    } else if (action === 'team_coffee') {
        if (GS.ap < 1) { showDialog(["No AP left!"]); return; }
        GS.ap--;
        GS.morale = Math.min(100, GS.morale + 5);
        GS.employees.forEach(e => e.morale = Math.min(100, e.morale + 5));
        showDialog(["Team coffee run! Everyone's morale up."]);
    } else if (action === 'strategy') {
        if (GS.ap < 1) { showDialog(["No AP left!"]); return; }
        GS.ap--;
        const designerBonus = GS.employees.filter(e => e.type === 'designer').reduce((s, e) => s + e.skill * 0.03, 0);
        const boost = Math.ceil(rng(3, 8) + designerBonus);
        GS.productQuality += boost;
        GS.morale = Math.min(100, GS.morale + 3);
        showDialog([`Strategy session! Quality +${boost}, Morale +3`]);
    } else if (action === 'view_board') {
        const alive = GS.customerAvatars.filter(a => !a.dying);
        if (alive.length === 0) {
            showDialog(["The customer board is empty.", "Hire salespeople and improve your product!"]);
        } else {
            const names = alive.slice(0, 6).map(a => a.name).join(', ');
            const more = alive.length > 6 ? ` +${alive.length - 6} more` : '';
            showDialog([
                `Customer Board: ${alive.length} active`,
                names + more,
                `Churn rate: ${(GS.churnRate * 100).toFixed(1)}%/day`,
            ]);
        }
    }
}

// ============================================================
// CHECK MILESTONES
// ============================================================
function checkProductMilestones() {
    for (const m of MILESTONES) {
        if (!m.announced && GS.productQuality >= m.threshold) {
            m.announced = true;
            GS.milestonePopup = m;
            GS.milestoneTimer = 180;
            addNotification(`MILESTONE: ${m.name}!`, PAL.goldMile);
            if (m.name === 'MVP') {
                GS.dialogQueue.push({ lines: [m.desc, "You can now start acquiring customers!"] });
            } else {
                GS.dialogQueue.push({ lines: [m.desc] });
            }
        }
    }
}

function checkRevenueMilestones() {
    for (const m of GS.revMilestones) {
        if (m.announced) continue;
        let triggered = false;
        if (m.checkFn) {
            triggered = m.checkFn(GS);
        } else if (m.threshold > 0) {
            triggered = GS.totalRevenue >= m.threshold;
        }
        if (triggered) {
            m.announced = true;
            GS.milestonePopup = m;
            GS.milestoneTimer = 180;
            addNotification(`${m.name}!`, PAL.goldMile);
            if (m.bonus === 'morale') GS.morale = Math.min(100, GS.morale + 15);
            if (m.bonus === 'confidence') { GS.morale = Math.min(100, GS.morale + 10); }
            if (m.bonus === 'growth') { GS.churnRate = Math.max(0.02, GS.churnRate - 0.02); }
            GS.dialogQueue.push({ lines: [m.desc] });
        }
    }
}

// ============================================================
// DAY TICK — runs every ticksPerHour * 10 ticks (end of day)
// ============================================================
function processDayEnd() {
    GS.day++;
    GS.hour = 9;
    GS.ap = GS.apMax;

    // Employee contributions
    let devProductivity = 0;
    let salesPower = 0;
    let designPower = 0;
    for (const emp of GS.employees) {
        const mMult = emp.morale >= 60 ? 1.0 : 0.6;
        if (emp.type === 'dev') devProductivity += emp.skill * 0.1 * mMult;
        if (emp.type === 'sales') salesPower += emp.skill * 0.01 * mMult;
        if (emp.type === 'designer') designPower += emp.skill * 0.05 * mMult;
    }

    // Auto product quality from devs
    if (devProductivity > 0) {
        const autoQuality = Math.ceil(devProductivity);
        GS.productQuality += autoQuality;
    }

    // Design improves quality
    if (designPower > 0) {
        GS.productQuality += Math.ceil(designPower * 0.5);
    }

    // Customer acquisition
    const salesCount = GS.employees.filter(e => e.type === 'sales').length;
    const hasMVP = GS.productQuality >= 30;
    if (hasMVP) {
        const acqRate = salesCount * 0.4 + (GS.productQuality > 50 ? 0.2 : 0) + salesPower;
        GS.customerFrac += acqRate;
        while (GS.customerFrac >= 1) {
            GS.customerFrac -= 1;
            addCustomer(GS);
        }
    }

    // Customer churn
    GS.churnRate = Math.max(0.02, 0.15 - (GS.productQuality * 0.001));
    if (GS.customers > 0) {
        GS.churnFrac += GS.customers * GS.churnRate;
        while (GS.churnFrac >= 1 && GS.customers > 0) {
            GS.churnFrac -= 1;
            removeCustomer(GS);
        }
    }

    // Clean up dead customer avatars
    GS.customerAvatars = GS.customerAvatars.filter(a => !a.dying || a.deathTimer > 0);
    GS.customers = GS.customerAvatars.filter(a => !a.dying).length;
    assignCustomerSlots(GS);

    // Revenue
    GS.revenue = GS.customers * GS.revenuePerCustomer;
    const dailyRev = GS.revenue / 30;
    const dailyBurn = GS.burnRate / 30;
    GS.cash += dailyRev - dailyBurn;
    GS.totalRevenue += dailyRev;

    // Morale drift
    if (GS.cash < 30) GS.morale = Math.max(0, GS.morale - 3);
    if (GS.customers > 5) GS.morale = Math.min(100, GS.morale + 1);
    GS.employees.forEach(e => {
        e.morale += (GS.morale > 60 ? 1 : -1);
        e.morale = clamp(e.morale, 10, 100);
    });

    // Random events
    if (GS.eventCooldown > 0) GS.eventCooldown--;
    if (GS.eventCooldown <= 0 && Math.random() < 0.25) {
        const eligible = EVENTS.filter(e => GS.day >= e.minDay && e.id !== GS.lastEvent);
        if (eligible.length > 0) {
            const totalWeight = eligible.reduce((s, e) => s + e.weight, 0);
            let roll = Math.random() * totalWeight;
            let chosen = eligible[0];
            for (const ev of eligible) {
                roll -= ev.weight;
                if (roll <= 0) { chosen = ev; break; }
            }
            chosen.effect(GS);
            GS.lastEvent = chosen.id;
            GS.eventCooldown = 3;
            const typeColor = chosen.type === 'positive' ? PAL.greenCash : (chosen.type === 'negative' ? PAL.redChurn : PAL.hudYellow);
            addNotification(chosen.title, typeColor);
            GS.dialogQueue.push({ lines: [chosen.title, chosen.desc] });
        }
    }

    // Check milestones
    checkProductMilestones();
    checkRevenueMilestones();

    // Game over check
    if (GS.cash <= 0) {
        GS.phase = 'gameover';
    }

    // Cofounder behavior
    GS.cofTimer = rng(60, 300);
    const cofMsgs = [
        "...", "*typing intensely*", "*sips coffee*", "*stares at spreadsheet*",
        "*on a mysterious call*", "*adjusts glasses*", "*scribbles on napkin*",
        "*reading HN*", "*nods thoughtfully*",
    ];
    if (GS.day >= 15) {
        cofMsgs.push("We should talk soon...", "*looks concerned*", "*checks bank account*");
    }
    GS.cofMsg = cofMsgs[rng(0, cofMsgs.length - 1)];
}

// ============================================================
// PIXEL DRAWING HELPERS
// ============================================================
function drawPixelRect(x, y, w, h, color) {
    bctx.fillStyle = color;
    bctx.fillRect(Math.floor(x), Math.floor(y), w, h);
}

function drawPixelText(text, x, y, color, size) {
    bctx.fillStyle = color || PAL.white;
    bctx.font = (size || 7) + 'px monospace';
    bctx.fillText(text, Math.floor(x), Math.floor(y));
}

// ============================================================
// TILE RENDERER
// ============================================================
function drawTile(gx, gy) {
    const px = gx * T;
    const py = gy * T;
    const tile = getTile(gx, gy);
    const checker = (gx + gy) % 2 === 0;

    switch (tile) {
        case FLOOR:
            drawPixelRect(px, py, T, T, checker ? PAL.floorA : PAL.floorB);
            // subtle floor detail
            if ((gx * 7 + gy * 13) % 5 === 0) {
                drawPixelRect(px + 6, py + 6, 2, 2, PAL.floorB);
            }
            break;
        case WALL_TOP:
            drawPixelRect(px, py, T, T, PAL.wallTop);
            drawPixelRect(px, py + 14, T, 2, PAL.wallTrim);
            break;
        case WALL_FACE:
            drawPixelRect(px, py, T, T, PAL.wallFace);
            drawPixelRect(px, py, T, 1, PAL.wallTop);
            break;
        case WALL_TRIM_TILE:
            drawPixelRect(px, py, T, T, PAL.wallTrim);
            drawPixelRect(px, py, T, 2, '#4a9a5a');
            drawPixelRect(px, py + 14, T, 2, '#3a7a4a');
            break;
        case WINDOW_TILE:
            drawPixelRect(px, py, T, T, PAL.wallTop);
            drawPixelRect(px + 2, py + 3, 12, 9, PAL.window);
            drawPixelRect(px + 3, py + 4, 4, 7, PAL.windowLt);
            drawPixelRect(px + 9, py + 4, 4, 7, PAL.windowLt);
            drawPixelRect(px + 7, py + 3, 2, 9, PAL.wallTop);
            drawPixelRect(px, py + 14, T, 2, PAL.wallTrim);
            break;
        case DESK:
            drawPixelRect(px, py, T, T, checker ? PAL.floorA : PAL.floorB);
            // desk top
            drawPixelRect(px, py + 2, T, 10, PAL.desk);
            drawPixelRect(px + 1, py + 1, T - 2, 3, PAL.deskTop);
            // legs
            drawPixelRect(px + 1, py + 12, 2, 3, PAL.deskLeg);
            drawPixelRect(px + 13, py + 12, 2, 3, PAL.deskLeg);
            // monitor
            drawPixelRect(px + 4, py - 2, 8, 6, PAL.monitor);
            drawPixelRect(px + 5, py - 1, 6, 4, PAL.monGlow);
            // screen flicker
            if (Math.random() > 0.95) {
                drawPixelRect(px + 5, py - 1, 6, 4, PAL.monGlowLt);
            }
            break;
        case CHAIR:
            drawPixelRect(px, py, T, T, checker ? PAL.floorA : PAL.floorB);
            drawPixelRect(px + 4, py + 4, 8, 8, PAL.chair);
            drawPixelRect(px + 5, py + 5, 6, 6, PAL.chairSeat);
            break;
        case TERMINAL:
            drawPixelRect(px, py, T, T, checker ? PAL.floorA : PAL.floorB);
            // big terminal
            drawPixelRect(px + 2, py + 2, 12, 10, '#222240');
            drawPixelRect(px + 3, py + 3, 10, 7, PAL.monGlow);
            // text lines on screen
            drawPixelRect(px + 4, py + 4, 6, 1, '#1a1a2e');
            drawPixelRect(px + 4, py + 6, 8, 1, '#1a1a2e');
            drawPixelRect(px + 4, py + 8, 4, 1, '#1a1a2e');
            // cursor blink
            if (Math.floor(GS.tick / 30) % 2 === 0) {
                drawPixelRect(px + 9, py + 8, 2, 1, PAL.monGlowLt);
            }
            drawPixelRect(px + 5, py + 12, 6, 2, '#333355');
            break;
        case PLANT:
            drawPixelRect(px, py, T, T, checker ? PAL.floorA : PAL.floorB);
            drawPixelRect(px + 5, py + 9, 6, 6, PAL.pot);
            drawPixelRect(px + 4, py + 8, 8, 2, PAL.potDk);
            drawPixelRect(px + 6, py + 2, 4, 7, PAL.plant);
            drawPixelRect(px + 3, py + 3, 3, 4, PAL.plantDk);
            drawPixelRect(px + 10, py + 4, 3, 3, PAL.plant);
            break;
        case COFOUNDER_SPOT:
            drawPixelRect(px, py, T, T, checker ? PAL.floorA : PAL.floorB);
            break;
        case DOOR:
            drawPixelRect(px, py, T, T, checker ? PAL.floorA : PAL.floorB);
            drawPixelRect(px + 3, py, 10, 15, '#5a4a3a');
            drawPixelRect(px + 4, py + 1, 8, 13, '#7a6a5a');
            drawPixelRect(px + 10, py + 7, 2, 2, PAL.hudGold);
            break;
        case RUG:
            drawPixelRect(px, py, T, T, PAL.rug);
            if (checker) drawPixelRect(px + 2, py + 2, T - 4, T - 4, PAL.rugB);
            break;
        case WHITEBOARD:
            drawPixelRect(px, py, T, T, checker ? PAL.floorA : PAL.floorB);
            drawPixelRect(px, py, T, 14, PAL.wbBorder);
            drawPixelRect(px + 1, py + 1, T - 2, 12, PAL.whiteboard);
            break;
        case COFFEE_MACHINE:
            drawPixelRect(px, py, T, T, checker ? PAL.floorA : PAL.floorB);
            drawPixelRect(px + 3, py + 4, 10, 10, '#444466');
            drawPixelRect(px + 4, py + 5, 8, 4, '#333355');
            drawPixelRect(px + 5, py + 6, 2, 2, PAL.hudRed);
            drawPixelRect(px + 6, py + 10, 4, 3, PAL.coffeeMug);
            // steam
            if (Math.floor(GS.tick / 20) % 3 !== 0) {
                drawPixelRect(px + 7, py + 2 + (GS.tick % 3), 1, 2, '#aaaaaa44');
            }
            break;
    }
}

// ============================================================
// SPRITE RENDERERS
// ============================================================
function drawPlayer(px, py, dir, frame) {
    const x = Math.floor(px);
    const y = Math.floor(py);
    const bobY = Math.abs(Math.sin(frame * 0.3)) * 1;

    // Shadow
    drawPixelRect(x + 2, y + 13, 10, 3, PAL.shadow);

    // Body
    const bodyY = y + 3 - bobY;
    drawPixelRect(x + 3, bodyY + 4, 10, 8, PAL.hoodie);
    drawPixelRect(x + 4, bodyY + 4, 8, 2, PAL.hoodieDk); // collar

    // Head
    drawPixelRect(x + 4, bodyY - 1, 8, 6, PAL.skinTone);
    // Hair
    drawPixelRect(x + 4, bodyY - 2, 8, 3, PAL.hair);

    // Eyes based on direction
    if (dir === 0) { // down
        drawPixelRect(x + 5, bodyY + 2, 2, 2, '#1a1a2e');
        drawPixelRect(x + 9, bodyY + 2, 2, 2, '#1a1a2e');
    } else if (dir === 1) { // up
        drawPixelRect(x + 5, bodyY + 1, 2, 1, PAL.hair);
        drawPixelRect(x + 9, bodyY + 1, 2, 1, PAL.hair);
    } else if (dir === 2) { // left
        drawPixelRect(x + 4, bodyY + 2, 2, 2, '#1a1a2e');
    } else { // right
        drawPixelRect(x + 10, bodyY + 2, 2, 2, '#1a1a2e');
    }

    // Legs
    const legFrame = Math.floor(frame * 0.3) % 2;
    drawPixelRect(x + 4, bodyY + 12, 3, 3, PAL.pants);
    drawPixelRect(x + 9, bodyY + 12, 3, 3, PAL.pants);
    if (keys['ArrowLeft'] || keys['ArrowRight'] || keys['ArrowUp'] || keys['ArrowDown'] ||
        keys['a'] || keys['d'] || keys['w'] || keys['s']) {
        if (legFrame) {
            drawPixelRect(x + 4, bodyY + 12, 3, 3 + 1, PAL.pants);
            drawPixelRect(x + 9, bodyY + 12, 3, 3, PAL.pants);
        } else {
            drawPixelRect(x + 4, bodyY + 12, 3, 3, PAL.pants);
            drawPixelRect(x + 9, bodyY + 12, 3, 3 + 1, PAL.pants);
        }
    }
}

function drawCofounder(px, py) {
    const x = Math.floor(px);
    const y = Math.floor(py);

    drawPixelRect(x + 2, y + 13, 10, 3, PAL.shadow);

    // Body
    drawPixelRect(x + 3, y + 4, 10, 8, PAL.cofHoodie);
    drawPixelRect(x + 4, y + 4, 8, 2, '#554466');

    // Head
    drawPixelRect(x + 4, y + 0, 8, 6, '#e0b890');
    drawPixelRect(x + 4, y - 1, 8, 3, '#4a3a2a');

    // Glasses
    drawPixelRect(x + 4, y + 2, 3, 2, '#333355');
    drawPixelRect(x + 9, y + 2, 3, 2, '#333355');
    drawPixelRect(x + 7, y + 2, 2, 1, '#333355');

    // Mystery aura (subtle)
    if (GS.day >= 20 && Math.floor(GS.tick / 40) % 3 === 0) {
        drawPixelRect(x + 1, y - 2, 1, 1, '#8855aa44');
        drawPixelRect(x + 13, y + 1, 1, 1, '#8855aa44');
    }
}

function drawEmployeeSprite(emp, px, py) {
    const x = Math.floor(px);
    const y = Math.floor(py);
    const colors = {
        dev: ['#44aa66', '#339955'],
        sales: ['#cc8833', '#aa6622'],
        designer: ['#aa44cc', '#8833aa'],
    };
    const [main, dark] = colors[emp.type] || ['#888888', '#666666'];

    drawPixelRect(x + 2, y + 13, 10, 3, PAL.shadow);
    drawPixelRect(x + 3, y + 4, 10, 8, main);
    drawPixelRect(x + 4, y + 4, 8, 2, dark);
    drawPixelRect(x + 4, y + 0, 8, 6, PAL.skinTone);
    drawPixelRect(x + 4, y - 1, 8, 2, '#5a4a3a');
    drawPixelRect(x + 5, y + 2, 2, 2, '#1a1a2e');
    drawPixelRect(x + 9, y + 2, 2, 2, '#1a1a2e');
    drawPixelRect(x + 4, y + 12, 3, 3, '#2a2a4a');
    drawPixelRect(x + 9, y + 12, 3, 3, '#2a2a4a');
}

// ============================================================
// CUSTOMER BOARD RENDERER
// ============================================================
function drawCustomerBoard() {
    // The whiteboard spans tiles (6,2), (7,2), (8,2)
    const bx = 6 * T;
    const by = 2 * T;
    const bw = 3 * T;
    const bh = T;

    // Already drawn as whiteboard tiles, but draw customer icons on top
    // Draw inside the whiteboard area
    const alive = GS.customerAvatars.filter(a => !a.dying);
    const dying = GS.customerAvatars.filter(a => a.dying && a.deathTimer > 0);

    // Draw alive customer dots/icons
    for (let i = 0; i < alive.length && i < MAX_BOARD_SLOTS; i++) {
        const av = alive[i];
        const pos = getSlotPos(i);
        // Tiny 3x3 pixel avatar
        drawPixelRect(pos.x, pos.y, 4, 4, av.color);
        drawPixelRect(pos.x + 1, pos.y, 2, 1, av.color === PAL.custBlue ? '#88bbee' : '#ffffff');
        // Flash on new
        if (av.flashTimer > 0) {
            const alpha = av.flashTimer / 30;
            bctx.globalAlpha = alpha * 0.5;
            drawPixelRect(pos.x - 1, pos.y - 1, 6, 6, PAL.greenCash);
            bctx.globalAlpha = 1;
        }
    }

    // Draw dying customers with red flash
    for (const av of dying) {
        if (av.slot >= 0 && av.slot < MAX_BOARD_SLOTS) {
            const pos = getSlotPos(av.slot);
            const flash = Math.floor(av.deathTimer / 5) % 2;
            if (flash) {
                drawPixelRect(pos.x - 1, pos.y - 1, 6, 6, PAL.redChurn);
            }
        }
    }

    // Board flashes
    for (const f of GS.boardFlashes) {
        if (f.timer > 0) {
            bctx.globalAlpha = f.timer / 25 * 0.6;
            drawPixelRect(f.x - 2, f.y - 2, 8, 8, f.color);
            bctx.globalAlpha = 1;
        }
    }

    // Customer count on whiteboard
    if (alive.length > 0) {
        drawPixelText(alive.length + '', bx + bw - 8, by + bh - 3, '#555577', 5);
    }
}

// ============================================================
// HUD
// ============================================================
function drawHUD() {
    // Top bar
    drawPixelRect(0, 0, NATIVE_W, 18, '#0f0f1aDD');
    drawPixelRect(0, 18, NATIVE_W, 1, PAL.wallTrim);

    // Day & Time
    const timeStr = `Day ${GS.day}  ${GS.hour}:00`;
    drawPixelText(timeStr, 4, 8, PAL.hudTxt, 7);

    // Cash
    const cashColor = GS.cash < 30 ? PAL.hudRed : (GS.cash < 80 ? PAL.hudYellow : PAL.hudGreen);
    drawPixelText(`$${GS.cash.toFixed(0)}K`, 80, 8, cashColor, 7);

    // Customers
    const custStr = `Cust:${GS.customers}`;
    drawPixelText(custStr, 125, 8, GS.customers > 0 ? PAL.greenCash : PAL.neutral, 7);

    // Revenue vs Burn indicator
    const netDaily = ((GS.revenue - GS.burnRate) / 30).toFixed(1);
    const netColor = parseFloat(netDaily) >= 0 ? PAL.greenCash : PAL.hudRed;
    drawPixelText(`${parseFloat(netDaily) >= 0 ? '+' : ''}${netDaily}/d`, 178, 8, netColor, 7);

    // AP pips
    for (let i = 0; i < GS.apMax; i++) {
        const apx = 228 + i * 8;
        drawPixelRect(apx, 4, 6, 8, i < GS.ap ? PAL.apFull : PAL.apEmpty);
        if (i < GS.ap) {
            drawPixelRect(apx + 1, 5, 4, 2, '#8efa8e');
        }
    }

    // Morale bar
    drawPixelRect(266, 4, 42, 8, '#333355');
    const moraleW = Math.floor(40 * GS.morale / 100);
    const moraleColor = GS.morale >= 60 ? PAL.hudGreen : (GS.morale >= 30 ? PAL.hudYellow : PAL.hudRed);
    drawPixelRect(267, 5, moraleW, 6, moraleColor);
    drawPixelText('M', 260, 10, PAL.neutral, 6);

    // Bottom bar - quality & milestone
    drawPixelRect(0, NATIVE_H - 14, NATIVE_W, 14, '#0f0f1aDD');
    drawPixelRect(0, NATIVE_H - 14, NATIVE_W, 1, PAL.wallTrim);

    const current = getCurrentMilestone(GS.productQuality);
    const next = getNextMilestone(GS.productQuality);
    const mileStr = current ? current.name : 'Pre-MVP';
    drawPixelText(`Q:${GS.productQuality}`, 4, NATIVE_H - 6, PAL.hudTxt, 6);
    drawPixelText(mileStr, 42, NATIVE_H - 6, PAL.goldMile, 6);

    if (next) {
        // Progress bar to next milestone
        const prev = current ? current.threshold : 0;
        const progress = (GS.productQuality - prev) / (next.threshold - prev);
        drawPixelRect(90, NATIVE_H - 10, 60, 6, '#333355');
        drawPixelRect(91, NATIVE_H - 9, Math.floor(58 * clamp(progress, 0, 1)), 4, PAL.goldMile);
        drawPixelText(next.name, 155, NATIVE_H - 6, PAL.neutral, 6);
    }

    // Team count
    const devs = GS.employees.filter(e => e.type === 'dev').length;
    const sales = GS.employees.filter(e => e.type === 'sales').length;
    const designers = GS.employees.filter(e => e.type === 'designer').length;
    drawPixelText(`Team: ${devs}D ${sales}S ${designers}X`, 210, NATIVE_H - 6, PAL.neutral, 6);

    // Runway warning
    if (GS.burnRate > GS.revenue && GS.cash > 0) {
        const runway = Math.floor(GS.cash / ((GS.burnRate - GS.revenue) / 30));
        if (runway < 30) {
            const blink = Math.floor(GS.tick / 20) % 2;
            if (blink) {
                drawPixelText(`! ${runway}d runway !`, NATIVE_W / 2 - 30, 28, PAL.hudRed, 7);
            }
        }
    }
}

// ============================================================
// INTERACTION PROMPTS
// ============================================================
function getInteraction() {
    const pgx = Math.floor((GS.playerX + 7) / T);
    const pgy = Math.floor((GS.playerY + 8) / T);

    // Check adjacent tiles based on direction
    const dirOffsets = [[0, 1], [0, -1], [-1, 0], [1, 0]];
    const [dx, dy] = dirOffsets[GS.playerDir];
    const tx = pgx + dx;
    const ty = pgy + dy;
    const tile = getTile(tx, ty);

    // Also check current tile neighbors
    const facingTile = tile;

    if (facingTile === TERMINAL) return { type: 'terminal', label: '[Z] Use Terminal' };
    if (facingTile === DOOR) return { type: 'hire', label: '[Z] Recruitment' };
    if (facingTile === COFFEE_MACHINE) return { type: 'coffee', label: '[Z] Coffee' };
    if (facingTile === WHITEBOARD) return { type: 'whiteboard', label: '[Z] Whiteboard' };
    if (facingTile === COFOUNDER_SPOT) return { type: 'cofounder', label: '[Z] Talk' };

    // Check if near cofounder
    const cofGx = Math.floor(GS.cofX / T);
    const cofGy = Math.floor(GS.cofY / T);
    if (Math.abs(pgx - cofGx) <= 1 && Math.abs(pgy - cofGy) <= 1) {
        return { type: 'cofounder', label: '[Z] Talk to Co-founder' };
    }

    return null;
}

// ============================================================
// DRAW DIALOG BOX
// ============================================================
function drawDialog() {
    const d = GS.currentDialog;
    if (!d) return;

    const bx = 16;
    const by = NATIVE_H - 70;
    const bw = NATIVE_W - 32;
    const bh = 54;

    // Box
    drawPixelRect(bx - 1, by - 1, bw + 2, bh + 2, PAL.dialogBdr);
    drawPixelRect(bx, by, bw, bh, PAL.dialogBg);
    drawPixelRect(bx + 1, by + 1, bw - 2, 1, PAL.dialogBdr + '44');

    // Text
    const line = d.lines[d.lineIdx];
    const visibleText = line.substring(0, d.charIdx);
    // Word wrap
    const maxChars = 38;
    const words = visibleText.split(' ');
    let lines = [''];
    for (const word of words) {
        if (lines[lines.length - 1].length + word.length + 1 > maxChars) {
            lines.push(word);
        } else {
            lines[lines.length - 1] += (lines[lines.length - 1] ? ' ' : '') + word;
        }
    }
    for (let i = 0; i < lines.length && i < 4; i++) {
        drawPixelText(lines[i], bx + 8, by + 12 + i * 10, PAL.dialogTxt, 7);
    }

    // Line indicator
    if (d.charIdx >= line.length) {
        const triX = bx + bw - 14;
        const triY = by + bh - 8 + (Math.floor(GS.tick / 15) % 2);
        drawPixelRect(triX, triY, 5, 3, PAL.dialogBdr);
        drawPixelRect(triX + 1, triY + 1, 3, 1, PAL.dialogBdr);
    }

    // Choices
    if (d.done && d.choices) {
        for (let i = 0; i < d.choices.length; i++) {
            const cy = by + 10 + i * 12;
            const sel = i === d.choiceIdx;
            if (sel) drawPixelRect(bx + 4, cy - 2, bw - 8, 11, PAL.wallTrim + '44');
            drawPixelText((sel ? '> ' : '  ') + d.choices[i].label, bx + 8, cy + 5, sel ? PAL.hudGreen : PAL.dialogTxt, 7);
        }
    }

    // Page indicator
    if (d.lines.length > 1) {
        drawPixelText(`${d.lineIdx + 1}/${d.lines.length}`, bx + bw - 30, by + 6, PAL.neutral, 5);
    }
}

// ============================================================
// DRAW MENU
// ============================================================
function drawMenu() {
    const bx = 40;
    const by = 40;
    const bw = NATIVE_W - 80;
    const bh = 20 + GS.menuItems.length * 16;

    drawPixelRect(bx - 1, by - 1, bw + 2, bh + 2, PAL.dialogBdr);
    drawPixelRect(bx, by, bw, bh, PAL.dialogBg);

    const title = GS.menuType === 'terminal' ? 'TERMINAL' :
                  GS.menuType === 'hire' ? 'RECRUITMENT' :
                  GS.menuType === 'coffee' ? 'COFFEE MACHINE' :
                  GS.menuType === 'whiteboard' ? 'WHITEBOARD' : 'MENU';
    drawPixelText(title, bx + bw / 2 - title.length * 2.5, by + 8, PAL.hudGold, 7);

    for (let i = 0; i < GS.menuItems.length; i++) {
        const iy = by + 18 + i * 16;
        const sel = i === GS.menuIdx;
        if (sel) {
            drawPixelRect(bx + 4, iy - 1, bw - 8, 14, PAL.wallTrim + '33');
        }
        drawPixelText((sel ? '> ' : '  ') + GS.menuItems[i].label, bx + 10, iy + 7, sel ? PAL.hudGreen : PAL.dialogTxt, 7);
    }
}

// ============================================================
// NOTIFICATIONS
// ============================================================
function drawNotifications() {
    let ny = 24;
    for (let i = GS.notifications.length - 1; i >= 0; i--) {
        const n = GS.notifications[i];
        if (n.timer <= 0) continue;
        const alpha = Math.min(1, n.timer / 30);
        bctx.globalAlpha = alpha;
        drawPixelRect(NATIVE_W / 2 - 60, ny, 120, 10, '#0f0f1aCC');
        drawPixelText(n.text, NATIVE_W / 2 - 56, ny + 7, n.color, 6);
        bctx.globalAlpha = 1;
        ny += 12;
    }
}

// ============================================================
// MILESTONE POPUP
// ============================================================
function drawMilestonePopup() {
    if (!GS.milestonePopup || GS.milestoneTimer <= 0) return;

    const alpha = Math.min(1, GS.milestoneTimer / 30);
    bctx.globalAlpha = alpha;

    const bx = NATIVE_W / 2 - 70;
    const by = 30;
    const bw = 140;
    const bh = 24;

    // Glow effect
    drawPixelRect(bx - 2, by - 2, bw + 4, bh + 4, PAL.goldMile + '44');
    drawPixelRect(bx - 1, by - 1, bw + 2, bh + 2, PAL.goldMile);
    drawPixelRect(bx, by, bw, bh, '#1a1a2eEE');

    const stars = '★ ';
    drawPixelText(stars + GS.milestonePopup.name + ' ' + stars, bx + 10, by + 10, PAL.goldMile, 8);
    if (GS.milestonePopup.desc) {
        drawPixelText(GS.milestonePopup.desc.substring(0, 30), bx + 6, by + 19, PAL.white, 5);
    }

    bctx.globalAlpha = 1;
}

// ============================================================
// TITLE SCREEN
// ============================================================
function drawTitleScreen() {
    bctx.fillStyle = PAL.bgDark;
    bctx.fillRect(0, 0, NATIVE_W, NATIVE_H);

    // Animated background grid
    for (let x = 0; x < NATIVE_W; x += 16) {
        for (let y = 0; y < NATIVE_H; y += 16) {
            const t = GS.tick * 0.02;
            const d = Math.sin(x * 0.05 + t) * Math.cos(y * 0.05 + t);
            if (d > 0.3) {
                drawPixelRect(x, y, 14, 14, '#1a1a3e');
            }
        }
    }

    // Title
    const ty = 40 + Math.sin(GS.tick * 0.03) * 3;
    drawPixelText('SaaS STARTUP', NATIVE_W / 2 - 48, ty, PAL.hudGreen, 10);
    drawPixelText('SIMULATOR', NATIVE_W / 2 - 36, ty + 16, PAL.hudGold, 10);

    // Subtitle
    drawPixelText('A 16-bit journey in venture capital', NATIVE_W / 2 - 90, ty + 38, PAL.neutral, 6);

    // Version
    drawPixelText('v0.13', NATIVE_W / 2 - 12, ty + 50, PAL.neutral, 5);

    // Instructions
    const blink = Math.floor(GS.tick / 30) % 2;
    if (blink) {
        drawPixelText('Press ENTER or Z to start', NATIVE_W / 2 - 65, ty + 80, PAL.white, 7);
    }

    // Controls help
    drawPixelText('Arrow keys / WASD to move', NATIVE_W / 2 - 65, ty + 100, PAL.neutral, 6);
    drawPixelText('Z / Enter to interact', NATIVE_W / 2 - 55, ty + 112, PAL.neutral, 6);
    drawPixelText('X to end day early', NATIVE_W / 2 - 48, ty + 124, PAL.neutral, 6);

    // Pixel art decoration
    drawPixelRect(30, ty + 70, 8, 8, PAL.monGlow);
    drawPixelRect(32, ty + 72, 4, 4, '#1a1a2e');
    drawPixelRect(NATIVE_W - 38, ty + 70, 8, 8, PAL.monGlow);
    drawPixelRect(NATIVE_W - 36, ty + 72, 4, 4, '#1a1a2e');
}

// ============================================================
// GAME OVER SCREEN
// ============================================================
function drawGameOver() {
    bctx.fillStyle = '#0a0a15';
    bctx.fillRect(0, 0, NATIVE_W, NATIVE_H);

    drawPixelText('GAME OVER', NATIVE_W / 2 - 36, 50, PAL.hudRed, 10);
    drawPixelText('Your startup ran out of cash.', NATIVE_W / 2 - 75, 75, PAL.neutral, 7);

    // Stats
    drawPixelText(`Survived ${GS.day} days`, NATIVE_W / 2 - 50, 100, PAL.white, 7);
    drawPixelText(`Peak Customers: ${GS.peakCustomers}`, NATIVE_W / 2 - 55, 115, PAL.white, 7);
    drawPixelText(`Total Revenue: $${GS.totalRevenue.toFixed(1)}K`, NATIVE_W / 2 - 60, 130, PAL.greenCash, 7);
    drawPixelText(`Team Size: ${GS.employees.length}`, NATIVE_W / 2 - 40, 145, PAL.white, 7);

    const milestone = getCurrentMilestone(GS.productQuality);
    if (milestone) {
        drawPixelText(`Reached: ${milestone.name}`, NATIVE_W / 2 - 45, 160, PAL.goldMile, 7);
    }

    const blink = Math.floor(GS.tick / 30) % 2;
    if (blink) {
        drawPixelText('Press ENTER to try again', NATIVE_W / 2 - 62, 190, PAL.white, 7);
    }
}

// ============================================================
// EMPLOYEE POSITIONS (wandering)
// ============================================================
function getEmployeePos(emp, idx) {
    // Employees hang around desks or wander
    const spots = [
        { x: 2 * T, y: 3 * T }, { x: 3 * T, y: 3 * T },
        { x: 13 * T, y: 3 * T }, { x: 14 * T, y: 3 * T },
        { x: 2 * T, y: 12 * T }, { x: 3 * T, y: 12 * T },
        { x: 13 * T, y: 12 * T }, { x: 14 * T, y: 12 * T },
        { x: 5 * T, y: 7 * T }, { x: 15 * T, y: 7 * T },
    ];
    const spot = spots[idx % spots.length];
    // Gentle wobble
    const wobbleX = Math.sin(GS.tick * 0.01 + idx * 2) * 2;
    const wobbleY = Math.cos(GS.tick * 0.015 + idx * 3) * 1;
    return { x: spot.x + wobbleX, y: spot.y + wobbleY };
}

// ============================================================
// INTERACTION PROMPT DRAW
// ============================================================
function drawInteractionPrompt() {
    const inter = getInteraction();
    if (!inter) return;

    const px = NATIVE_W / 2 - 40;
    const py = NATIVE_H - 82;
    drawPixelRect(px - 2, py - 2, 84, 12, PAL.dialogBg + 'CC');
    drawPixelRect(px - 2, py - 2, 84, 1, PAL.wallTrim);
    drawPixelText(inter.label, px, py + 5, PAL.hudGreen, 6);
}

// ============================================================
// UPDATE
// ============================================================
function update() {
    GS.tick++;

    // Update notification timers
    GS.notifications = GS.notifications.filter(n => { n.timer--; return n.timer > 0; });

    // Update customer flash timers
    for (const av of GS.customerAvatars) {
        if (av.flashTimer > 0) av.flashTimer--;
        if (av.dying && av.deathTimer > 0) av.deathTimer--;
    }
    // Clean dead avatars with expired timers
    const beforeLen = GS.customerAvatars.length;
    GS.customerAvatars = GS.customerAvatars.filter(a => !a.dying || a.deathTimer > 0);
    if (GS.customerAvatars.length !== beforeLen) {
        GS.customers = GS.customerAvatars.filter(a => !a.dying).length;
        assignCustomerSlots(GS);
    }

    // Board flashes
    GS.boardFlashes = GS.boardFlashes.filter(f => { f.timer--; return f.timer > 0; });

    // Milestone popup timer
    if (GS.milestoneTimer > 0) GS.milestoneTimer--;

    // TITLE SCREEN
    if (GS.phase === 'title') {
        if (consumeKey('Enter') || consumeKey('z') || consumeKey('Z')) {
            GS.phase = 'play';
            showDialog([
                "Welcome to your new startup!",
                "You're a tech co-founder with $200K in angel funding.",
                "Use the TERMINAL to code, the DOOR to hire,",
                "the WHITEBOARD for strategy, and COFFEE for morale.",
                "Survive the burn. Ship the product. Get customers.",
                "Arrow keys move. Z interacts. X ends the day.",
            ]);
        }
        clearJustPressed();
        return;
    }

    // GAME OVER
    if (GS.phase === 'gameover') {
        if (consumeKey('Enter')) {
            resetGame();
            GS.phase = 'title';
        }
        clearJustPressed();
        return;
    }

    // DIALOG
    if (GS.phase === 'dialog') {
        const d = GS.currentDialog;
        if (d) {
            // Auto-type
            if (d.charIdx < d.lines[d.lineIdx].length) {
                d.charTimer++;
                if (d.charTimer >= 2) {
                    d.charTimer = 0;
                    d.charIdx++;
                }
            }

            if (consumeKey('z') || consumeKey('Z') || consumeKey('Enter') || consumeKey(' ')) {
                if (d.done && d.choices) {
                    d.choices[d.choiceIdx].action();
                    closeDialog();
                } else {
                    advanceDialog();
                }
            }
            if (d && d.done && d.choices) {
                if (consumeKey('ArrowUp') || consumeKey('w')) d.choiceIdx = Math.max(0, d.choiceIdx - 1);
                if (consumeKey('ArrowDown') || consumeKey('s')) d.choiceIdx = Math.min(d.choices.length - 1, d.choiceIdx + 1);
            }
        }
        clearJustPressed();
        return;
    }

    // MENU
    if (GS.phase === 'menu') {
        if (consumeKey('ArrowUp') || consumeKey('w')) GS.menuIdx = Math.max(0, GS.menuIdx - 1);
        if (consumeKey('ArrowDown') || consumeKey('s')) GS.menuIdx = Math.min(GS.menuItems.length - 1, GS.menuIdx + 1);
        if (consumeKey('z') || consumeKey('Z') || consumeKey('Enter')) {
            executeMenuAction(GS.menuItems[GS.menuIdx].action);
        }
        if (consumeKey('x') || consumeKey('X') || consumeKey('Escape')) {
            GS.phase = 'play';
            GS.menuType = null;
        }
        clearJustPressed();
        return;
    }

    // PLAY STATE
    if (GS.phase === 'play') {
        // Player movement
        let dx = 0, dy = 0;
        const speed = 1.5;
        if (keys['ArrowLeft'] || keys['a']) { dx = -speed; GS.playerDir = 2; }
        if (keys['ArrowRight'] || keys['d']) { dx = speed; GS.playerDir = 3; }
        if (keys['ArrowUp'] || keys['w']) { dy = -speed; GS.playerDir = 1; }
        if (keys['ArrowDown'] || keys['s']) { dy = speed; GS.playerDir = 0; }

        if (dx !== 0 || dy !== 0) {
            GS.playerFrameTimer++;
            if (GS.playerFrameTimer >= 8) { GS.playerFrameTimer = 0; GS.playerFrame++; }

            // Collision check
            const newX = GS.playerX + dx;
            const newY = GS.playerY + dy;
            const px = 3, pw = 10, py = 8, ph = 7; // collision box offsets

            // Check X movement
            const testGx1 = Math.floor((newX + px) / T);
            const testGx2 = Math.floor((newX + px + pw - 1) / T);
            const testGy1 = Math.floor((GS.playerY + py) / T);
            const testGy2 = Math.floor((GS.playerY + py + ph - 1) / T);
            let canMoveX = true;
            for (let gx = testGx1; gx <= testGx2; gx++) {
                for (let gy = testGy1; gy <= testGy2; gy++) {
                    if (isSolid(gx, gy)) canMoveX = false;
                }
            }
            if (canMoveX) GS.playerX = newX;

            // Check Y movement
            const testGx3 = Math.floor((GS.playerX + px) / T);
            const testGx4 = Math.floor((GS.playerX + px + pw - 1) / T);
            const testGy3 = Math.floor((newY + py) / T);
            const testGy4 = Math.floor((newY + py + ph - 1) / T);
            let canMoveY = true;
            for (let gx = testGx3; gx <= testGx4; gx++) {
                for (let gy = testGy3; gy <= testGy4; gy++) {
                    if (isSolid(gx, gy)) canMoveY = false;
                }
            }
            if (canMoveY) GS.playerY = newY;

            // Clamp to map
            GS.playerX = clamp(GS.playerX, T, (MAP_W - 2) * T);
            GS.playerY = clamp(GS.playerY, T * 1.5, (MAP_H - 2) * T);
        }

        // Interaction
        if (consumeKey('z') || consumeKey('Z') || consumeKey('Enter')) {
            const inter = getInteraction();
            if (inter) {
                if (inter.type === 'cofounder') {
                    const msgs = [
                        ["*adjusts glasses*", "I'm working on something big. You'll see."],
                        ["Metrics look interesting today...", "*goes back to typing*"],
                        ["Have you checked our burn rate?", "Just... keep an eye on it."],
                        ["*mysterious smile*", "Everything is going according to plan."],
                        ["I sent some emails. Important ones.", "You'll thank me later."],
                        ["*stares at screen*", "The patterns... they're emerging."],
                    ];
                    if (GS.day >= 20) {
                        msgs.push(
                            ["We should discuss equity splits soon...", "Not now. But soon."],
                            ["I've been talking to some... people.", "Investor types. Don't worry about it."],
                        );
                    }
                    showDialog(msgs[rng(0, msgs.length - 1)]);
                } else {
                    openMenu(inter.type);
                }
            }
        }

        // End day early
        if (consumeKey('x') || consumeKey('X')) {
            processDayEnd();
        }

        // Time progression
        GS.tick++;
        if (GS.tick % GS.ticksPerHour === 0) {
            GS.hour++;
            if (GS.hour >= 19) { // End of day at 7 PM
                processDayEnd();
            }
        }

        // Cofounder timer
        if (GS.cofTimer > 0) GS.cofTimer--;
    }

    clearJustPressed();
}

// ============================================================
// RENDER
// ============================================================
function render() {
    bctx.fillStyle = PAL.bgDark;
    bctx.fillRect(0, 0, NATIVE_W, NATIVE_H);

    if (GS.phase === 'title') {
        drawTitleScreen();
        ctx.drawImage(buf, 0, 0, NATIVE_W, NATIVE_H, 0, 0, NATIVE_W * SCALE, NATIVE_H * SCALE);
        return;
    }

    if (GS.phase === 'gameover') {
        drawGameOver();
        ctx.drawImage(buf, 0, 0, NATIVE_W, NATIVE_H, 0, 0, NATIVE_W * SCALE, NATIVE_H * SCALE);
        return;
    }

    // Draw map
    for (let gy = 0; gy < MAP_H; gy++) {
        for (let gx = 0; gx < MAP_W; gx++) {
            drawTile(gx, gy);
        }
    }

    // Draw customer board on whiteboard
    drawCustomerBoard();

    // Draw employees (sorted by Y for depth)
    const sprites = [];

    // Add employees
    for (let i = 0; i < GS.employees.length; i++) {
        const pos = getEmployeePos(GS.employees[i], i);
        sprites.push({ type: 'emp', emp: GS.employees[i], x: pos.x, y: pos.y, sortY: pos.y + 16 });
    }

    // Add cofounder
    sprites.push({ type: 'cof', x: GS.cofX, y: GS.cofY, sortY: GS.cofY + 16 });

    // Add player
    sprites.push({ type: 'player', x: GS.playerX, y: GS.playerY, sortY: GS.playerY + 16 });

    // Sort by Y
    sprites.sort((a, b) => a.sortY - b.sortY);

    for (const s of sprites) {
        if (s.type === 'player') {
            drawPlayer(s.x, s.y, GS.playerDir, GS.playerFrame);
        } else if (s.type === 'cof') {
            drawCofounder(s.x, s.y);
            // Draw cofounder status
            if (GS.cofMsg && GS.cofTimer > 0) {
                const textW = GS.cofMsg.length * 4;
                drawPixelRect(s.x - textW / 2 + 7, s.y - 10, textW + 4, 8, '#0f0f1aCC');
                drawPixelText(GS.cofMsg, s.x - textW / 2 + 9, s.y - 4, PAL.neutral, 5);
            }
        } else if (s.type === 'emp') {
            drawEmployeeSprite(s.emp, s.x, s.y);
            // Name tag
            const nameW = s.emp.name.length * 4;
            drawPixelRect(s.x + 7 - nameW / 2, s.y - 6, nameW + 2, 6, '#0f0f1aAA');
            drawPixelText(s.emp.name, s.x + 8 - nameW / 2, s.y - 2, PAL.white, 5);
        }
    }

    // Interaction prompt
    if (GS.phase === 'play') drawInteractionPrompt();

    // HUD
    drawHUD();

    // Notifications
    drawNotifications();

    // Milestone popup
    drawMilestonePopup();

    // Dialog
    if (GS.phase === 'dialog') drawDialog();

    // Menu
    if (GS.phase === 'menu') drawMenu();

    // Blit to main canvas
    ctx.drawImage(buf, 0, 0, NATIVE_W, NATIVE_H, 0, 0, NATIVE_W * SCALE, NATIVE_H * SCALE);
}

// ============================================================
// GAME LOOP
// ============================================================
function gameLoop() {
    update();
    render();
    requestAnimationFrame(gameLoop);
}

gameLoop();
</script>
</body>
</html>