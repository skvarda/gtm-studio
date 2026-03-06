<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>SaaS Startup Simulator</title>
<style>
* { margin: 0; padding: 0; box-sizing: border-box; }
body { background: #0f0f1a; display: flex; justify-content: center; align-items: center; height: 100vh; overflow: hidden; image-rendering: pixelated; }
canvas { image-rendering: pixelated; image-rendering: crisp-edges; cursor: none; }
</style>
</head>
<body>
<canvas id="game"></canvas>
<script>
// ============================================================
// SaaS STARTUP SIMULATOR — Round 16
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
    cofounder:'#555577', cofHoodie:'#665577', cofMon:'#9944cc', cofMonLt:'#bb77ee',
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
    victoryIPO:'#f5c842', victoryProfit:'#58b868', victoryRD:'#4488ee', victoryWorld:'#e94560',
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
// PRODUCT MILESTONES
// ============================================================
const MILESTONES = [
    { name:'MVP', threshold:30, announced:false, desc:'Minimum Viable Product launched!' },
    { name:'Beta', threshold:60, announced:false, desc:'Beta release - early adopters incoming!' },
    { name:'V1.0', threshold:100, announced:false, desc:'Version 1.0 shipped! Market ready.' },
    { name:'Scale', threshold:150, announced:false, desc:'Platform at scale! Enterprise deals unlocked.' },
    { name:'Transcend', threshold:200, announced:false, desc:'The product has transcended the market!' },
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
// RANDOM EVENTS
// ============================================================
const EVENTS = [
    { id:'server_outage', type:'negative', weight:3, minDay:5,
      title:'Server Outage!', desc:'Your cloud provider is down. Customers are angry.',
      effect(gs){ gs.customers = Math.max(0, gs.customers - 3); },
      resultText:'Lost 3 customers!' },
    { id:'viral_tweet', type:'positive', weight:2, minDay:3,
      title:'Viral Tweet!', desc:'Someone influential tweeted about your product!',
      effect(gs){ gs.customers += 5; },
      resultText:'Gained 5 customers!' },
    { id:'competitor_launch', type:'negative', weight:3, minDay:10,
      title:'Competitor Launches!', desc:'A well-funded competitor just launched a similar product.',
      effect(gs){ gs.customers = Math.max(0, gs.customers - 2); },
      resultText:'Lost 2 customers to the competition.' },
    { id:'press_coverage', type:'positive', weight:2, minDay:7,
      title:'TechCrunch Feature!', desc:'TechCrunch wrote about your startup!',
      effect(gs){ gs.customers += 8; gs.cash += 5000; },
      resultText:'Gained 8 customers and some investor buzz!' },
    { id:'bug_crisis', type:'negative', weight:4, minDay:4,
      title:'Critical Bug!', desc:'A major bug is causing data loss for users.',
      effect(gs){ gs.productProgress = Math.max(0, gs.productProgress - 10); gs.customers = Math.max(0, gs.customers - 2); },
      resultText:'Lost progress and 2 customers.' },
    { id:'conference', type:'positive', weight:2, minDay:8,
      title:'Conference Invite!', desc:'You got invited to speak at SaaSConf!',
      effect(gs){ gs.customers += 4; },
      resultText:'Great networking! +4 customers.' },
    { id:'churn_wave', type:'negative', weight:3, minDay:12,
      title:'Churn Wave!', desc:'Several customers cancelled this month.',
      effect(gs){ gs.customers = Math.max(0, Math.floor(gs.customers * 0.8)); },
      resultText:'Lost 20% of customers!' },
    { id:'angel_check', type:'positive', weight:1, minDay:15,
      title:'Angel Investment!', desc:'An angel investor loved your demo!',
      effect(gs){ gs.cash += 50000; },
      resultText:'+$50K in angel funding!' },
    { id:'office_pizza', type:'positive', weight:4, minDay:1,
      title:'Pizza Party!', desc:'Someone ordered pizza for the office.',
      effect(gs){ gs.ap = Math.min(gs.ap + 1, gs.maxAp); },
      resultText:'Morale boost! +1 AP.' },
    { id:'aws_bill', type:'negative', weight:3, minDay:6,
      title:'Surprise AWS Bill!', desc:'Your cloud costs spiked unexpectedly.',
      effect(gs){ gs.cash -= 3000; },
      resultText:'-$3,000 in cloud costs.' },
    { id:'key_hire_poach', type:'negative', weight:2, minDay:20,
      title:'Poached!', desc:'A big tech company is trying to poach your best dev.',
      effect(gs){ if(gs.devs > 0){ gs.devs--; gs.teamSize--; } },
      resultText:'Lost a developer to BigCorp.' },
    { id:'product_hunt', type:'positive', weight:2, minDay:10,
      title:'Product Hunt Launch!', desc:'You hit #1 on Product Hunt today!',
      effect(gs){ gs.customers += 12; },
      resultText:'+12 customers from Product Hunt!' },
];

function rollEvent(gs){
    const eligible = EVENTS.filter(e => gs.day >= e.minDay);
    if(eligible.length === 0) return null;
    const totalW = eligible.reduce((s,e)=>s+e.weight,0);
    let r = Math.random()*totalW;
    for(const e of eligible){r-=e.weight;if(r<=0)return e;}
    return eligible[eligible.length-1];
}

// ============================================================
// GAME STATE
// ============================================================
function newGameState(){
    return {
        day: 1,
        hour: 9,
        cash: 50000,
        peakCash: 50000,
        mrr: 0,
        burn: 2000,
        customers: 0,
        productProgress: 0,
        devs: 0,
        sales: 0,
        teamSize: 0,
        totalHires: 0,
        ap: 4,
        maxAp: 4,
        consecutiveProfitDays: 0,
        // player
        px: 5 * T,
        py: 7 * T,
        pdir: 0, // 0=down,1=up,2=left,3=right
        pframe: 0,
        // state flags
        gameOver: false,
        victory: null,
        victoryName: '',
        cofoundrRevealed: false,
        menuOpen: false,
        menuIdx: 0,
        dialogQueue: [],
        dialogActive: false,
        dialogText: '',
        dialogSpeaker: '',
        dialogCallback: null,
        interactTarget: null,
        // hiring
        hiringOpen: false,
        hiringIdx: 0,
        // ticker
        tickerText: '',
        tickerTimer: 0,
        // events
        eventActive: false,
        eventData: null,
        // walk anim
        walkTimer: 0,
        // frame counter
        frameCount: 0,
        // day transition
        dayTransition: false,
        dayTransAlpha: 0,
        dayTransDir: 0,
        // save meta
        saveExists: false,
        // stats screen
        statsScreen: false,
        // title screen
        titleScreen: true,
        // cofounder dialog lines
        cofLines: [
            "...",
            "I'm working on something big.",
            "Don't worry about my part.",
            "Have you checked the burn rate?",
            "Trust the process.",
            "We'll pivot if we have to.",
            "I've been researching... things.",
            "My LinkedIn says 'Visionary'.",
        ],
        cofLineIdx: 0,
        // music placeholder
        started: false,
    };
}

let gs = newGameState();
let keys = {};

// ============================================================
// SAVE / LOAD
// ============================================================
const SAVE_KEY = 'saas_sim_save';

function saveGame(){
    const saveData = {};
    const skipKeys = ['dialogQueue','dialogCallback','eventData','started'];
    for(const k in gs){
        if(skipKeys.includes(k)) continue;
        if(typeof gs[k] === 'function') continue;
        saveData[k] = gs[k];
    }
    try {
        localStorage.setItem(SAVE_KEY, JSON.stringify(saveData));
        showTicker('Game saved!');
    } catch(e){}
}

function loadGame(){
    try {
        const data = localStorage.getItem(SAVE_KEY);
        if(!data) return false;
        const parsed = JSON.parse(data);
        const fresh = newGameState();
        for(const k in parsed){
            if(k in fresh) fresh[k] = parsed[k];
        }
        fresh.dialogQueue = [];
        fresh.dialogActive = false;
        fresh.dialogCallback = null;
        fresh.eventActive = false;
        fresh.eventData = null;
        fresh.started = true;
        fresh.titleScreen = false;
        fresh.menuOpen = false;
        fresh.hiringOpen = false;
        fresh.statsScreen = false;
        Object.assign(gs, fresh);
        return true;
    } catch(e){ return false; }
}

function hasSave(){
    try { return !!localStorage.getItem(SAVE_KEY); } catch(e){ return false; }
}

function deleteSave(){
    try { localStorage.removeItem(SAVE_KEY); } catch(e){}
}

// ============================================================
// INPUT
// ============================================================
document.addEventListener('keydown', e => {
    keys[e.key] = true;
    keys[e.code] = true;
    if(['ArrowUp','ArrowDown','ArrowLeft','ArrowRight','Space',' '].includes(e.key)) e.preventDefault();
    handleKeyPress(e.key, e.code);
});
document.addEventListener('keyup', e => {
    keys[e.key] = false;
    keys[e.code] = false;
});

function handleKeyPress(key, code){
    // Title screen
    if(gs.titleScreen){
        if(key === ' ' || key === 'Enter' || code === 'Space'){
            if(gs.menuIdx === 0){
                gs.titleScreen = false;
                gs.started = true;
                showDialog('System','Welcome to your startup! You have $50K in angel funding. Hire a team, build a product, and find your path to success!');
                showDialog('System','WASD/Arrows to move. SPACE to interact. E for menu. The office is yours.');
            } else if(gs.menuIdx === 1 && hasSave()){
                if(loadGame()){
                    showTicker('Game loaded!');
                }
            }
        }
        if(key === 'ArrowDown' || key === 's' || key === 'S'){
            gs.menuIdx = hasSave() ? 1 : 0;
        }
        if(key === 'ArrowUp' || key === 'w' || key === 'W'){
            gs.menuIdx = 0;
        }
        return;
    }

    // Victory stats screen
    if(gs.statsScreen){
        if(key === ' ' || key === 'Enter' || code === 'Space'){
            deleteSave();
            gs = newGameState();
        }
        return;
    }

    // Dialog
    if(gs.dialogActive){
        if(key === ' ' || key === 'Enter' || code === 'Space'){
            if(gs.dialogCallback){
                const cb = gs.dialogCallback;
                gs.dialogCallback = null;
                gs.dialogActive = false;
                cb();
            } else {
                gs.dialogActive = false;
            }
            // check queue
            if(!gs.dialogActive && gs.dialogQueue.length > 0){
                const next = gs.dialogQueue.shift();
                gs.dialogActive = true;
                gs.dialogSpeaker = next.speaker;
                gs.dialogText = next.text;
                gs.dialogCallback = next.cb || null;
            }
        }
        return;
    }

    // Event popup
    if(gs.eventActive){
        if(key === ' ' || key === 'Enter' || code === 'Space'){
            if(gs.eventData){
                gs.eventData.effect(gs);
                showDialog('Event', gs.eventData.resultText);
            }
            gs.eventActive = false;
            gs.eventData = null;
        }
        return;
    }

    // Hiring menu
    if(gs.hiringOpen){
        if(key === 'ArrowUp' || key === 'w' || key === 'W') gs.hiringIdx = Math.max(0, gs.hiringIdx-1);
        if(key === 'ArrowDown' || key === 's' || key === 'S') gs.hiringIdx = Math.min(2, gs.hiringIdx+1);
        if(key === 'Escape' || key === 'e' || key === 'E'){ gs.hiringOpen = false; return; }
        if(key === ' ' || key === 'Enter' || code === 'Space'){
            if(gs.hiringIdx === 0){
                // hire dev - $8k/mo
                if(gs.cash >= 8000){
                    gs.devs++;
                    gs.teamSize++;
                    gs.totalHires++;
                    gs.burn += 8000;
                    showDialog('HR','New developer hired! Monthly burn +$8K.');
                } else {
                    showDialog('HR','Not enough cash to hire a developer ($8K/mo).');
                }
            } else if(gs.hiringIdx === 1){
                // hire sales - $6k/mo
                if(gs.cash >= 6000){
                    gs.sales++;
                    gs.teamSize++;
                    gs.totalHires++;
                    gs.burn += 6000;
                    showDialog('HR','New salesperson hired! Monthly burn +$6K.');
                } else {
                    showDialog('HR','Not enough cash to hire a salesperson ($6K/mo).');
                }
            } else {
                gs.hiringOpen = false;
            }
        }
        return;
    }

    // Menu
    if(gs.menuOpen){
        if(key === 'ArrowUp' || key === 'w' || key === 'W') gs.menuIdx = Math.max(0, gs.menuIdx-1);
        if(key === 'ArrowDown' || key === 's' || key === 'S') gs.menuIdx = Math.min(3, gs.menuIdx+1);
        if(key === 'Escape' || key === 'e' || key === 'E'){ gs.menuOpen = false; return; }
        if(key === ' ' || key === 'Enter' || code === 'Space'){
            if(gs.menuIdx === 0){
                // Status
                gs.menuOpen = false;
                const m = getCurrentMilestone(gs.productProgress);
                const nm = getNextMilestone(gs.productProgress);
                const mName = m ? m.name : 'None';
                const nName = nm ? `${nm.name} (${nm.threshold})` : 'MAX';
                showDialog('Status', `Day ${gs.day} | Cash: $${fmtK(gs.cash)} | MRR: $${fmtK(gs.mrr)} | Burn: $${fmtK(gs.burn)}`);
                showDialog('Status', `Team: ${gs.devs} devs, ${gs.sales} sales | Customers: ${gs.customers}`);
                showDialog('Status', `Product: ${gs.productProgress}pts [${mName}] | Next: ${nName}`);
            } else if(gs.menuIdx === 1){
                // Save
                gs.menuOpen = false;
                saveGame();
            } else if(gs.menuIdx === 2){
                // Hire
                gs.menuOpen = false;
                gs.hiringOpen = true;
                gs.hiringIdx = 0;
            } else if(gs.menuIdx === 3){
                gs.menuOpen = false;
            }
        }
        return;
    }

    // Open menu
    if(key === 'e' || key === 'E'){
        gs.menuOpen = true;
        gs.menuIdx = 0;
        return;
    }

    // Interact with space
    if(key === ' ' || code === 'Space'){
        tryInteract();
        return;
    }
}

// ============================================================
// DIALOG SYSTEM
// ============================================================
function showDialog(speaker, text, cb){
    if(gs.dialogActive){
        gs.dialogQueue.push({speaker, text, cb});
    } else {
        gs.dialogActive = true;
        gs.dialogSpeaker = speaker;
        gs.dialogText = text;
        gs.dialogCallback = cb || null;
    }
}

function showTicker(text, duration){
    gs.tickerText = text;
    gs.tickerTimer = duration || 180;
}

function fmtK(n){
    if(Math.abs(n) >= 1000) return (n/1000).toFixed(1)+'K';
    return n.toString();
}

// ============================================================
// INTERACTION
// ============================================================
function facingTile(){
    const cx = Math.floor(gs.px / T);
    const cy = Math.floor(gs.py / T);
    const dirs = [[0,1],[0,-1],[-1,0],[1,0]];
    const d = dirs[gs.pdir];
    return { x: cx + d[0], y: cy + d[1] };
}

function tryInteract(){
    if(gs.gameOver) return;
    const ft = facingTile();
    const tile = getTile(ft.x, ft.y);

    if(tile === TERMINAL){
        // Code at terminal
        if(gs.ap > 0){
            gs.ap--;
            const devBonus = gs.devs * 2;
            const prog = 5 + devBonus + Math.floor(Math.random()*3);
            gs.productProgress += prog;
            showTicker('Coding! +' + prog + ' progress');
            checkMilestones();
        } else {
            showDialog('System','No action points left. End the day to recharge.');
        }
    } else if(tile === COFFEE_MACHINE){
        if(gs.ap < gs.maxAp){
            gs.ap = Math.min(gs.ap + 1, gs.maxAp);
            showDialog('Coffee','Refilled! +1 AP. The fuel of startups.');
        } else {
            showDialog('Coffee','Already fully caffeinated!');
        }
    } else if(tile === COFOUNDER_SPOT){
        const line = gs.cofLines[gs.cofLineIdx % gs.cofLines.length];
        gs.cofLineIdx++;
        // Late-game reveal
        if(gs.day >= 30 && !gs.cofoundrRevealed){
            gs.cofoundrRevealed = true;
            showDialog('Co-Founder', "Actually... I've been building an AI that automates our entire backend.");
            showDialog('Co-Founder', "It's not ready yet. But when it is... everything changes.");
            gs.productProgress += 20;
            showTicker('+20 product progress from co-founder!');
        } else {
            showDialog('Co-Founder', line);
        }
    } else if(tile === WHITEBOARD){
        if(gs.ap > 0){
            gs.ap--;
            const salesBonus = gs.sales * 2;
            const custs = 1 + Math.floor(gs.sales * 0.5) + Math.floor(Math.random()*2);
            gs.customers += custs;
            gs.mrr = gs.customers * 100;
            showTicker('Strategy session! +' + custs + ' customers');
        } else {
            showDialog('System','No AP left. End the day.');
        }
    } else if(tile === DESK){
        // Sales call from desk
        if(gs.ap > 0){
            gs.ap--;
            const salesBonus = gs.sales;
            const custs = 1 + salesBonus + Math.floor(Math.random()*2);
            gs.customers += custs;
            gs.mrr = gs.customers * 100;
            showTicker('Sales calls! +' + custs + ' customers');
        } else {
            showDialog('System','No AP left today.');
        }
    } else if(tile === DOOR){
        endDay();
    } else if(tile === PLANT){
        const msgs = ['The plant seems happy.','A nice fern. Very startup.','It\'s alive, unlike your servers.','Green. Like your burn rate isn\'t.'];
        showDialog('...', msgs[Math.floor(Math.random()*msgs.length)]);
    }
}

function checkMilestones(){
    for(const m of MILESTONES){
        if(gs.productProgress >= m.threshold && !m.announced){
            m.announced = true;
            showDialog('Milestone', m.desc);
        }
    }
}

// ============================================================
// DAY CYCLE
// ============================================================
function endDay(){
    gs.dayTransition = true;
    gs.dayTransAlpha = 0;
    gs.dayTransDir = 1; // fading out

    setTimeout(()=>{
        processDayEnd();
        gs.dayTransDir = -1; // fading back in
    }, 600);
}

function processDayEnd(){
    gs.day++;
    gs.hour = 9;
    gs.ap = gs.maxAp;

    // Dev auto-progress
    const autoProgress = gs.devs * 3;
    if(autoProgress > 0){
        gs.productProgress += autoProgress;
        checkMilestones();
    }

    // Sales auto-customers
    const autoCustomers = Math.floor(gs.sales * 1.5);
    if(autoCustomers > 0){
        gs.customers += autoCustomers;
    }

    // MRR calculation
    gs.mrr = gs.customers * 100;

    // Burn & revenue
    gs.cash += gs.mrr;
    gs.cash -= gs.burn;

    // Track peak cash
    if(gs.cash > gs.peakCash) gs.peakCash = gs.cash;

    // Profit streak for Profit Machine victory
    if(gs.mrr >= gs.burn * 3 && gs.mrr > 0){
        gs.consecutiveProfitDays++;
    } else {
        gs.consecutiveProfitDays = 0;
    }

    // Random event (30% chance)
    if(Math.random() < 0.3){
        const evt = rollEvent(gs);
        if(evt){
            gs.eventActive = true;
            gs.eventData = evt;
        }
    }

    // Auto-save
    saveGame();

    // Check bankruptcy
    if(gs.cash <= 0){
        gs.gameOver = true;
        gs.victory = null;
        showDialog('GAME OVER','Your startup ran out of money on Day ' + gs.day + '.');
        showDialog('GAME OVER','Final stats: ' + gs.customers + ' customers, ' + gs.productProgress + ' product progress.');
        showDialog('GAME OVER','Press SPACE to start a new game.', ()=>{
            gs.statsScreen = true;
        });
        return;
    }

    // Check victory conditions
    checkVictoryConditions();
}

// ============================================================
// VICTORY CONDITIONS
// ============================================================
function checkVictoryConditions(){
    // IPO Glory: cash >= 500K, customers >= 50, productProgress >= 150
    if(gs.cash >= 500000 && gs.customers >= 50 && gs.productProgress >= 150){
        triggerVictory('IPO Glory',
            'The bell rings on Wall Street.',
            'Your SaaS company goes public at a $2B valuation.',
            'You did it. From a small office to the NASDAQ.',
            PAL.victoryIPO);
        return;
    }

    // World Domination: 100 customers, $300K cash, productProgress 120
    if(gs.customers >= 100 && gs.cash >= 300000 && gs.productProgress >= 120){
        triggerVictory('World Domination',
            'Every company in the market uses your product.',
            'Competitors have given up. You ARE the category.',
            'Total market domination achieved.',
            PAL.victoryWorld);
        return;
    }

    // R&D Utopia: productProgress >= 200, devs >= 3
    if(gs.productProgress >= 200 && gs.devs >= 3){
        triggerVictory('R&D Utopia',
            'Your engineering team has built something transcendent.',
            'The product is so advanced, it practically sells itself.',
            'A temple of pure innovation. Beautiful.',
            PAL.victoryRD);
        return;
    }

    // Profit Machine: 5 consecutive days where MRR >= burn * 3
    if(gs.consecutiveProfitDays >= 5){
        triggerVictory('Profit Machine',
            'Five days of pure profit dominance.',
            'No VC needed. The business prints money.',
            'Quiet efficiency. The rarest startup win.',
            PAL.victoryProfit);
        return;
    }
}

function triggerVictory(name, line1, line2, line3, color){
    gs.victory = { name, line1, line2, line3, color };
    gs.victoryName = name;
    gs.gameOver = true;

    showDialog(name, line1);
    showDialog(name, line2);
    showDialog(name, line3, ()=>{
        gs.statsScreen = true;
    });
}

// ============================================================
// PLAYER MOVEMENT
// ============================================================
function updatePlayer(){
    if(gs.gameOver || gs.dialogActive || gs.menuOpen || gs.hiringOpen ||
       gs.eventActive || gs.dayTransition || gs.titleScreen || gs.statsScreen) return;

    const speed = 2;
    let dx = 0, dy = 0;

    if(keys['ArrowLeft']||keys['a']||keys['A']){ dx = -speed; gs.pdir = 2; }
    if(keys['ArrowRight']||keys['d']||keys['D']){ dx = speed; gs.pdir = 3; }
    if(keys['ArrowUp']||keys['w']||keys['W']){ dy = -speed; gs.pdir = 1; }
    if(keys['ArrowDown']||keys['s']||keys['S']){ dy = speed; gs.pdir = 0; }

    if(dx !== 0 || dy !== 0){
        gs.walkTimer++;
        gs.pframe = Math.floor(gs.walkTimer / 8) % 4;
    } else {
        gs.pframe = 0;
        gs.walkTimer = 0;
    }

    // Try X
    if(dx !== 0){
        const nx = gs.px + dx;
        const gx = Math.floor(nx / T);
        const gy = Math.floor(gs.py / T);
        if(!isSolid(gx, gy) && nx >= T && nx < (MAP_W-1)*T){
            gs.px = nx;
        }
    }
    // Try Y
    if(dy !== 0){
        const ny = gs.py + dy;
        const gx = Math.floor(gs.px / T);
        const gy = Math.floor(ny / T);
        if(!isSolid(gx, gy) && ny >= T && ny < (MAP_H-1)*T){
            gs.py = ny;
        }
    }
}

// ============================================================
// RENDERING
// ============================================================
function drawTile(x, y, tile){
    const px = x * T;
    const py = y * T;

    switch(tile){
        case FLOOR:
            bctx.fillStyle = ((x+y)%2===0) ? PAL.floorA : PAL.floorB;
            bctx.fillRect(px, py, T, T);
            break;
        case WALL_TOP:
            bctx.fillStyle = PAL.wallTop;
            bctx.fillRect(px, py, T, T);
            // brick pattern
            bctx.fillStyle = '#644494';
            if(y%2===0){
                bctx.fillRect(px+1, py+2, 6, 3);
                bctx.fillRect(px+9, py+2, 6, 3);
                bctx.fillRect(px+5, py+9, 6, 3);
            } else {
                bctx.fillRect(px+3, py+2, 6, 3);
                bctx.fillRect(px+3, py+9, 6, 3);
                bctx.fillRect(px+11, py+9, 4, 3);
            }
            break;
        case WALL_FACE:
            bctx.fillStyle = PAL.wallFace;
            bctx.fillRect(px, py, T, T);
            bctx.fillStyle = '#353558';
            bctx.fillRect(px, py, T, 1);
            break;
        case WALL_TRIM_TILE:
            bctx.fillStyle = PAL.wallFace;
            bctx.fillRect(px, py, T, T);
            bctx.fillStyle = PAL.wallTrim;
            bctx.fillRect(px, py, T, 3);
            bctx.fillStyle = '#3a8848';
            bctx.fillRect(px, py+3, T, 1);
            break;
        case DESK:
            bctx.fillStyle = ((x+y)%2===0) ? PAL.floorA : PAL.floorB;
            bctx.fillRect(px, py, T, T);
            // desk
            bctx.fillStyle = PAL.deskTop;
            bctx.fillRect(px, py+2, T, 8);
            bctx.fillStyle = PAL.desk;
            bctx.fillRect(px, py+10, T, 4);
            bctx.fillStyle = PAL.deskLeg;
            bctx.fillRect(px+1, py+14, 2, 2);
            bctx.fillRect(px+13, py+14, 2, 2);
            // monitor on desk
            bctx.fillStyle = PAL.monitor;
            bctx.fillRect(px+4, py, 8, 6);
            bctx.fillStyle = PAL.monGlow;
            bctx.fillRect(px+5, py+1, 6, 4);
            // screen flicker
            if(gs.frameCount % 60 < 30){
                bctx.fillStyle = PAL.monGlowLt;
                bctx.fillRect(px+6, py+2, 4, 2);
            }
            break;
        case CHAIR:
            bctx.fillStyle = ((x+y)%2===0) ? PAL.floorA : PAL.floorB;
            bctx.fillRect(px, py, T, T);
            bctx.fillStyle = PAL.chair;
            bctx.fillRect(px+4, py+4, 8, 8);
            bctx.fillStyle = PAL.chairSeat;
            bctx.fillRect(px+5, py+5, 6, 6);
            // wheels
            bctx.fillStyle = '#222';
            bctx.fillRect(px+3, py+13, 2, 2);
            bctx.fillRect(px+11, py+13, 2, 2);
            break;
        case TERMINAL:
            bctx.fillStyle = ((x+y)%2===0) ? PAL.floorA : PAL.floorB;
            bctx.fillRect(px, py, T, T);
            // desk underneath
            bctx.fillStyle = PAL.deskTop;
            bctx.fillRect(px, py+6, T, 6);
            bctx.fillStyle = PAL.desk;
            bctx.fillRect(px, py+12, T, 4);
            // big monitor
            bctx.fillStyle = PAL.monitor;
            bctx.fillRect(px+2, py, 12, 8);
            bctx.fillStyle = PAL.monGlow;
            bctx.fillRect(px+3, py+1, 10, 6);
            // code lines
            bctx.fillStyle = PAL.monGlowLt;
            const codeOff = (gs.frameCount >> 4) % 4;
            for(let i=0;i<3;i++){
                const lw = 3 + ((i+codeOff)%3)*2;
                bctx.fillRect(px+4, py+2+i*2, lw, 1);
            }
            break;
        case PLANT:
            bctx.fillStyle = ((x+y)%2===0) ? PAL.floorA : PAL.floorB;
            bctx.fillRect(px, py, T, T);
            // pot
            bctx.fillStyle = PAL.pot;
            bctx.fillRect(px+5, py+10, 6, 5);
            bctx.fillStyle = PAL.potDk;
            bctx.fillRect(px+4, py+9, 8, 2);
            // leaves
            bctx.fillStyle = PAL.plant;
            bctx.fillRect(px+6, py+3, 4, 7);
            bctx.fillRect(px+4, py+4, 8, 5);
            bctx.fillStyle = PAL.plantDk;
            bctx.fillRect(px+3, py+5, 2, 3);
            bctx.fillRect(px+11, py+5, 2, 3);
            // highlight
            bctx.fillStyle = '#4ab855';
            bctx.fillRect(px+7, py+4, 2, 2);
            break;
        case COFOUNDER_SPOT:
            bctx.fillStyle = ((x+y)%2===0) ? PAL.floorA : PAL.floorB;
            bctx.fillRect(px, py, T, T);
            // desk
            bctx.fillStyle = PAL.deskTop;
            bctx.fillRect(px-2, py+6, T+2, 6);
            bctx.fillStyle = PAL.desk;
            bctx.fillRect(px-2, py+12, T+2, 4);
            // main monitor (green)
            bctx.fillStyle = PAL.monitor;
            bctx.fillRect(px+1, py, 8, 7);
            bctx.fillStyle = PAL.monGlow;
            bctx.fillRect(px+2, py+1, 6, 5);
            // second monitor (purple glow) — co-founder's secret
            bctx.fillStyle = PAL.monitor;
            bctx.fillRect(px+10, py+1, 5, 5);
            const purpleFlicker = (gs.frameCount % 90 < 70);
            bctx.fillStyle = purpleFlicker ? PAL.cofMon : PAL.cofMonLt;
            bctx.fillRect(px+11, py+2, 3, 3);
            // mysterious co-founder sitting
            drawCofounder(px-2, py-6);
            break;
        case DOOR:
            bctx.fillStyle = PAL.floorA;
            bctx.fillRect(px, py, T, T);
            bctx.fillStyle = '#8B4513';
            bctx.fillRect(px+3, py, 10, T);
            bctx.fillStyle = '#A0522D';
            bctx.fillRect(px+4, py+1, 8, T-2);
            // doorknob
            bctx.fillStyle = PAL.hudYellow;
            bctx.fillRect(px+10, py+7, 2, 2);
            // "EXIT" sign
            bctx.fillStyle = PAL.hudRed;
            bctx.fillRect(px+3, py-2, 10, 3);
            bctx.fillStyle = PAL.white;
            // E X I T tiny
            bctx.fillRect(px+4, py-1, 1, 1);
            bctx.fillRect(px+6, py-1, 1, 1);
            bctx.fillRect(px+8, py-1, 1, 1);
            bctx.fillRect(px+10, py-1, 1, 1);
            break;
        case RUG:
            bctx.fillStyle = ((x+y)%2===0) ? PAL.rug : PAL.rugB;
            bctx.fillRect(px, py, T, T);
            // rug pattern
            bctx.fillStyle = '#5a4275';
            if((x+y)%3===0){
                bctx.fillRect(px+6, py+6, 4, 4);
            }
            break;
        case WHITEBOARD:
            bctx.fillStyle = ((x+y)%2===0) ? PAL.floorA : PAL.floorB;
            bctx.fillRect(px, py, T, T);
            bctx.fillStyle = PAL.wbBorder;
            bctx.fillRect(px+1, py+1, 14, 12);
            bctx.fillStyle = PAL.whiteboard;
            bctx.fillRect(px+2, py+2, 12, 10);
            // scribbles
            bctx.fillStyle = PAL.hudRed;
            bctx.fillRect(px+3, py+4, 5, 1);
            bctx.fillStyle = '#3355aa';
            bctx.fillRect(px+4, py+6, 6, 1);
            bctx.fillStyle = PAL.monGlow;
            bctx.fillRect(px+3, py+8, 4, 1);
            break;
        case COFFEE_MACHINE:
            bctx.fillStyle = ((x+y)%2===0) ? PAL.floorA : PAL.floorB;
            bctx.fillRect(px, py, T, T);
            bctx.fillStyle = PAL.coffee;
            bctx.fillRect(px+4, py+4, 8, 10);
            bctx.fillStyle = '#7b5433';
            bctx.fillRect(px+5, py+5, 6, 4);
            // steam
            if(gs.frameCount % 40 < 20){
                bctx.fillStyle = '#ffffff55';
                bctx.fillRect(px+6, py+1, 1, 2);
                bctx.fillRect(px+9, py+2, 1, 2);
            }
            bctx.fillStyle = PAL.coffeeMug;
            bctx.fillRect(px+6, py+10, 4, 3);
            break;
        case WINDOW_TILE:
            bctx.fillStyle = PAL.wallTop;
            bctx.fillRect(px, py, T, T);
            // window
            const timeOfDay = gs.hour;
            const windowColor = timeOfDay >= 18 ? '#223355' : timeOfDay >= 15 ? '#dd8844' : PAL.window;
            bctx.fillStyle = '#888899';
            bctx.fillRect(px+2, py+2, 12, 12);
            bctx.fillStyle = windowColor;
            bctx.fillRect(px+3, py+3, 10, 10);
            // panes
            bctx.fillStyle = '#888899';
            bctx.fillRect(px+8, py+3, 1, 10);
            bctx.fillRect(px+3, py+7, 10, 1);
            // highlight
            bctx.fillStyle = PAL.windowLt + '44';
            bctx.fillRect(px+4, py+4, 3, 2);
            break;
    }
}

function drawCofounder(px, py){
    // body
    bctx.fillStyle = PAL.cofHoodie;
    bctx.fillRect(px+4, py+6, 8, 7);
    bctx.fillStyle = '#776688';
    bctx.fillRect(px+5, py+7, 6, 5);
    // head
    bctx.fillStyle = PAL.skinTone;
    bctx.fillRect(px+5, py+1, 6, 5);
    // hair
    bctx.fillStyle = '#2a1a0a';
    bctx.fillRect(px+4, py, 8, 3);
    // mystery glasses
    bctx.fillStyle = '#222';
    bctx.fillRect(px+5, py+3, 3, 2);
    bctx.fillRect(px+9, py+3, 3, 2);
    bctx.fillStyle = '#6666cc';
    bctx.fillRect(px+6, py+3, 1, 1);
    bctx.fillRect(px+10, py+3, 1, 1);
}

function drawPlayer(){
    const px = gs.px;
    const py = gs.py;
    const dir = gs.pdir;
    const frame = gs.pframe;
    const bob = (frame === 1 || frame === 3) ? -1 : 0;

    // Shadow
    bctx.fillStyle = PAL.shadow;
    bctx.fillRect(px-1, py+12, 10, 3);

    // Legs
    const legOffset = (frame === 1) ? 1 : (frame === 3) ? -1 : 0;
    bctx.fillStyle = PAL.pants;
    bctx.fillRect(px+1, py+10+bob, 3, 4);
    bctx.fillRect(px+5, py+10+bob, 3, 4);
    // Shoes
    bctx.fillStyle = PAL.shoes;
    bctx.fillRect(px+1, py+13+bob, 3, 2);
    bctx.fillRect(px+5, py+13+bob, 3, 2);

    // Hoodie body
    bctx.fillStyle = PAL.hoodie;
    bctx.fillRect(px, py+4+bob, 9, 7);
    bctx.fillStyle = PAL.hoodieDk;
    bctx.fillRect(px+1, py+5+bob, 7, 5);

    // Hoodie zipper
    bctx.fillStyle = '#777';
    bctx.fillRect(px+4, py+5+bob, 1, 5);

    // Arms
    bctx.fillStyle = PAL.hoodie;
    if(dir === 2){ // left
        bctx.fillRect(px-2, py+5+bob + legOffset, 3, 5);
        bctx.fillRect(px+8, py+5+bob, 2, 5);
    } else if(dir === 3){ // right
        bctx.fillRect(px-1, py+5+bob, 2, 5);
        bctx.fillRect(px+8, py+5+bob + legOffset, 3, 5);
    } else {
        bctx.fillRect(px-1, py+5+bob, 2, 5);
        bctx.fillRect(px+8, py+5+bob, 2, 5);
    }

    // Head
    bctx.fillStyle = PAL.skinTone;
    bctx.fillRect(px+1, py+bob, 7, 5);

    // Hair
    bctx.fillStyle = PAL.hair;
    bctx.fillRect(px, py-1+bob, 9, 2);
    if(dir === 1){
        bctx.fillRect(px, py+bob, 9, 3);
    }

    // Face
    if(dir !== 1){
        // Eyes
        bctx.fillStyle = '#222';
        if(dir === 0){
            bctx.fillRect(px+2, py+2+bob, 2, 2);
            bctx.fillRect(px+5, py+2+bob, 2, 2);
        } else if(dir === 2){
            bctx.fillRect(px+1, py+2+bob, 2, 2);
            bctx.fillRect(px+4, py+2+bob, 2, 2);
        } else {
            bctx.fillRect(px+3, py+2+bob, 2, 2);
            bctx.fillRect(px+6, py+2+bob, 2, 2);
        }
        // Mouth
        bctx.fillStyle = '#c4956a';
        bctx.fillRect(px+3, py+4+bob, 3, 1);
    }

    // Hoodie hood outline
    bctx.fillStyle = PAL.hoodieDk;
    bctx.fillRect(px, py+3+bob, 1, 2);
    bctx.fillRect(px+8, py+3+bob, 1, 2);
}

// ============================================================
// HUD
// ============================================================
function drawHUD(){
    // Top bar
    bctx.fillStyle = PAL.hudBg;
    bctx.fillRect(0, 0, NATIVE_W, 14);

    bctx.fillStyle = PAL.hudGreen;
    drawText(`Day ${gs.day}`, 4, 4, PAL.hudGreen);

    drawText(`$${fmtK(gs.cash)}`, 52, 4, gs.cash < 10000 ? PAL.hudRed : PAL.hudYellow);

    drawText(`MRR:$${fmtK(gs.mrr)}`, 110, 4, PAL.hudGreen);

    drawText(`Cust:${gs.customers}`, 186, 4, PAL.hudTxt);

    // Product progress bar
    const barX = 248;
    const barW = 60;
    const nm = getNextMilestone(gs.productProgress);
    const cm = getCurrentMilestone(gs.productProgress);
    const prevT = cm ? cm.threshold : 0;
    const nextT = nm ? nm.threshold : 200;
    const prog = Math.min(1, (gs.productProgress - prevT) / (nextT - prevT));

    bctx.fillStyle = PAL.apEmpty;
    bctx.fillRect(barX, 4, barW, 5);
    bctx.fillStyle = PAL.hudGreen;
    bctx.fillRect(barX, 4, Math.floor(barW * prog), 5);
    bctx.fillStyle = PAL.hudTxt;
    drawText(nm ? nm.name : 'MAX', barX + 2, 4, PAL.white);

    // Bottom bar - AP + burn + team
    bctx.fillStyle = PAL.hudBg;
    bctx.fillRect(0, NATIVE_H - 14, NATIVE_W, 14);

    // AP dots
    drawText('AP:', 4, NATIVE_H - 10, PAL.hudTxt);
    for(let i=0;i<gs.maxAp;i++){
        bctx.fillStyle = i < gs.ap ? PAL.apFull : PAL.apEmpty;
        bctx.fillRect(22 + i*8, NATIVE_H - 10, 6, 5);
    }

    drawText(`Burn:$${fmtK(gs.burn)}`, 62, NATIVE_H - 10, PAL.hudRed);

    drawText(`Dev:${gs.devs} Sal:${gs.sales}`, 140, NATIVE_H - 10, PAL.hudTxt);

    // Profit streak indicator
    if(gs.consecutiveProfitDays > 0){
        drawText(`Streak:${gs.consecutiveProfitDays}/5`, 230, NATIVE_H - 10, PAL.hudGold);
    }

    // Product pts
    drawText(`Prod:${gs.productProgress}`, 280, NATIVE_H - 10, PAL.hudGreen);
}

// ============================================================
// TEXT RENDERING (pixel font)
// ============================================================
const FONT = {};
const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789:$!?.,-+/\'() ';

function initFont(){
    // 4x5 pixel font glyphs
    const glyphs = {
        'A':[0x6,0x9,0xf,0x9,0x9],'B':[0xe,0x9,0xe,0x9,0xe],'C':[0x7,0x8,0x8,0x8,0x7],
        'D':[0xe,0x9,0x9,0x9,0xe],'E':[0xf,0x8,0xe,0x8,0xf],'F':[0xf,0x8,0xe,0x8,0x8],
        'G':[0x7,0x8,0xb,0x9,0x7],'H':[0x9,0x9,0xf,0x9,0x9],'I':[0xe,0x4,0x4,0x4,0xe],
        'J':[0xf,0x1,0x1,0x9,0x6],'K':[0x9,0xa,0xc,0xa,0x9],'L':[0x8,0x8,0x8,0x8,0xf],
        'M':[0x9,0xf,0xf,0x9,0x9],'N':[0x9,0xd,0xf,0xb,0x9],'O':[0x6,0x9,0x9,0x9,0x6],
        'P':[0xe,0x9,0xe,0x8,0x8],'Q':[0x6,0x9,0x9,0xb,0x7],'R':[0xe,0x9,0xe,0xa,0x9],
        'S':[0x7,0x8,0x6,0x1,0xe],'T':[0xf,0x4,0x4,0x4,0x4],'U':[0x9,0x9,0x9,0x9,0x6],
        'V':[0x9,0x9,0x9,0x6,0x6],'W':[0x9,0x9,0xf,0xf,0x9],'X':[0x9,0x9,0x6,0x9,0x9],
        'Y':[0x9,0x9,0x6,0x4,0x4],'Z':[0xf,0x1,0x6,0x8,0xf],
        '0':[0x6,0x9,0x9,0x9,0x6],'1':[0x4,0xc,0x4,0x4,0xe],'2':[0x6,0x1,0x6,0x8,0xf],
        '3':[0xe,0x1,0x6,0x1,0xe],'4':[0x9,0x9,0xf,0x1,0x1],'5':[0xf,0x8,0xe,0x1,0xe],
        '6':[0x7,0x8,0xf,0x9,0x6],'7':[0xf,0x1,0x2,0x4,0x4],'8':[0x6,0x9,0x6,0x9,0x6],
        '9':[0x6,0x9,0xf,0x1,0xe],
        ':':[0x0,0x4,0x0,0x4,0x0],'$':[0x7,0xc,0x6,0x3,0xe],'!':[0x4,0x4,0x4,0x0,0x4],
        '?':[0x6,0x1,0x2,0x0,0x2],'.':[0x0,0x0,0x0,0x0,0x4],',':[0x0,0x0,0x0,0x4,0x8],
        '-':[0x0,0x0,0xf,0x0,0x0],'+':[0x0,0x4,0xe,0x4,0x0],'/':[0x1,0x2,0x4,0x8,0x0],
        '\'':[0x4,0x4,0x0,0x0,0x0],'(':[0x2,0x4,0x4,0x4,0x2],')':[0x4,0x2,0x2,0x2,0x4],
        ' ':[0x0,0x0,0x0,0x0,0x0],
    };
    // lowercase maps to uppercase
    for(const c of 'abcdefghijklmnopqrstuvwxyz'){
        glyphs[c] = glyphs[c.toUpperCase()];
    }
    Object.assign(FONT, glyphs);
}
initFont();

function drawText(str, x, y, color){
    bctx.fillStyle = color || PAL.hudTxt;
    for(let i=0; i<str.length; i++){
        const ch = str[i];
        const g = FONT[ch];
        if(!g) { continue; }
        for(let row=0; row<5; row++){
            for(let col=0; col<4; col++){
                if(g[row] & (0x8 >> col)){
                    bctx.fillRect(x + i*5 + col, y + row, 1, 1);
                }
            }
        }
    }
}

function measureText(str){ return str.length * 5; }

// ============================================================
// DIALOG RENDERING
// ============================================================
function drawDialog(){
    if(!gs.dialogActive) return;

    const dw = 280;
    const dh = 48;
    const dx = (NATIVE_W - dw) / 2;
    const dy = NATIVE_H - dh - 20;

    // Border
    bctx.fillStyle = PAL.dialogBdr;
    bctx.fillRect(dx-2, dy-2, dw+4, dh+4);
    // BG
    bctx.fillStyle = PAL.dialogBg;
    bctx.fillRect(dx, dy, dw, dh);

    // Speaker
    drawText(gs.dialogSpeaker, dx+6, dy+4, PAL.hudGold);

    // Text wrapping
    const words = gs.dialogText.split(' ');
    let line = '';
    let lineY = dy + 14;
    const maxW = dw - 12;

    for(const w of words){
        const test = line ? line + ' ' + w : w;
        if(measureText(test) > maxW){
            drawText(line, dx+6, lineY, PAL.dialogTxt);
            lineY += 8;
            line = w;
        } else {
            line = test;
        }
    }
    if(line) drawText(line, dx+6, lineY, PAL.dialogTxt);

    // Blink prompt
    if(gs.frameCount % 40 < 20){
        drawText('>', dx + dw - 12, dy + dh - 10, PAL.hudGreen);
    }
}

// ============================================================
// EVENT POPUP
// ============================================================
function drawEvent(){
    if(!gs.eventActive || !gs.eventData) return;

    const ew = 240;
    const eh = 56;
    const ex = (NATIVE_W - ew)/2;
    const ey = 40;

    // Border
    const borderColor = gs.eventData.type === 'positive' ? PAL.positive : PAL.accent;
    bctx.fillStyle = borderColor;
    bctx.fillRect(ex-2, ey-2, ew+4, eh+4);
    bctx.fillStyle = PAL.dialogBg;
    bctx.fillRect(ex, ey, ew, eh);

    drawText(gs.eventData.title, ex+6, ey+4, borderColor);

    // Word wrap desc
    const words = gs.eventData.desc.split(' ');
    let line = '';
    let lineY = ey + 16;
    for(const w of words){
        const test = line ? line + ' ' + w : w;
        if(measureText(test) > ew - 12){
            drawText(line, ex+6, lineY, PAL.dialogTxt);
            lineY += 8;
            line = w;
        } else {
            line = test;
        }
    }
    if(line) drawText(line, ex+6, lineY, PAL.dialogTxt);

    if(gs.frameCount % 40 < 20){
        drawText('SPACE', ex + ew - 34, ey + eh - 10, PAL.hudYellow);
    }
}

// ============================================================
// MENU
// ============================================================
function drawMenu(){
    if(!gs.menuOpen) return;

    const mw = 100;
    const mh = 60;
    const mx = (NATIVE_W - mw)/2;
    const my = (NATIVE_H - mh)/2;

    bctx.fillStyle = PAL.dialogBdr;
    bctx.fillRect(mx-2, my-2, mw+4, mh+4);
    bctx.fillStyle = PAL.dialogBg;
    bctx.fillRect(mx, my, mw, mh);

    const items = ['Status', 'Save', 'Hire', 'Close'];
    for(let i=0; i<items.length; i++){
        const sel = i === gs.menuIdx;
        drawText((sel ? '> ' : '  ') + items[i], mx+8, my+6+i*13, sel ? PAL.hudGold : PAL.hudTxt);
    }
}

// ============================================================
// HIRING MENU
// ============================================================
function drawHiring(){
    if(!gs.hiringOpen) return;

    const hw = 200;
    const hh = 70;
    const hx = (NATIVE_W - hw)/2;
    const hy = (NATIVE_H - hh)/2;

    bctx.fillStyle = PAL.dialogBdr;
    bctx.fillRect(hx-2, hy-2, hw+4, hh+4);
    bctx.fillStyle = PAL.dialogBg;
    bctx.fillRect(hx, hy, hw, hh);

    drawText('HIRE', hx+8, hy+4, PAL.hudGold);

    const items = [
        `Developer ($8K/mo) [${gs.devs}]`,
        `Salesperson ($6K/mo) [${gs.sales}]`,
        'Cancel'
    ];
    for(let i=0;i<items.length;i++){
        const sel = i === gs.hiringIdx;
        drawText((sel?'> ':'  ') + items[i], hx+8, hy+18+i*15, sel ? PAL.hudGold : PAL.hudTxt);
    }
}

// ============================================================
// TICKER
// ============================================================
function drawTicker(){
    if(gs.tickerTimer <= 0) return;
    gs.tickerTimer--;

    const alpha = gs.tickerTimer > 30 ? 1 : gs.tickerTimer / 30;
    const tw = measureText(gs.tickerText) + 8;
    const tx = (NATIVE_W - tw)/2;
    const ty = 20;

    bctx.globalAlpha = alpha;
    bctx.fillStyle = PAL.hudBg;
    bctx.fillRect(tx, ty, tw, 12);
    drawText(gs.tickerText, tx+4, ty+3, PAL.hudYellow);
    bctx.globalAlpha = 1;
}

// ============================================================
// INTERACTION PROMPT
// ============================================================
function drawInteractPrompt(){
    if(gs.dialogActive || gs.menuOpen || gs.hiringOpen || gs.eventActive || gs.gameOver) return;

    const ft = facingTile();
    const tile = getTile(ft.x, ft.y);
    let prompt = '';

    if(tile === TERMINAL) prompt = 'SPACE: Code';
    else if(tile === COFFEE_MACHINE) prompt = 'SPACE: Coffee';
    else if(tile === COFOUNDER_SPOT) prompt = 'SPACE: Talk';
    else if(tile === WHITEBOARD) prompt = 'SPACE: Strategize';
    else if(tile === DESK) prompt = 'SPACE: Sales call';
    else if(tile === DOOR) prompt = 'SPACE: End day';
    else if(tile === PLANT) prompt = 'SPACE: Inspect';

    if(prompt){
        const pw = measureText(prompt) + 8;
        const px = (NATIVE_W - pw)/2;
        const py = NATIVE_H - 36;
        bctx.fillStyle = '#000000aa';
        bctx.fillRect(px, py, pw, 12);
        drawText(prompt, px+4, py+3, PAL.hudGreen);
    }
}

// ============================================================
// TITLE SCREEN
// ============================================================
function drawTitleScreen(){
    bctx.fillStyle = PAL.bgDark;
    bctx.fillRect(0, 0, NATIVE_W, NATIVE_H);

    // Starfield-like dots
    for(let i=0; i<30; i++){
        const sx = ((i*37+gs.frameCount)%NATIVE_W);
        const sy = ((i*53)%NATIVE_H);
        bctx.fillStyle = (gs.frameCount + i)%60 < 40 ? '#555577' : '#333355';
        bctx.fillRect(sx, sy, 1, 1);
    }

    // Title
    const title = 'SaaS Startup Simulator';
    const tw = measureText(title);
    drawText(title, (NATIVE_W-tw)/2, 50, PAL.hudGold);

    // Subtitle
    const sub = 'From Angel Round to Exit';
    drawText(sub, (NATIVE_W-measureText(sub))/2, 64, PAL.hudGreen);

    // ASCII art office
    drawMiniOffice(120, 85);

    // Menu
    const newG = '> New Game';
    const loadG = '> Load Game';
    const hasS = hasSave();

    drawText(gs.menuIdx===0 ? newG : '  New Game', (NATIVE_W-measureText(newG))/2, 140, gs.menuIdx===0 ? PAL.hudGold : PAL.hudTxt);
    if(hasS){
        drawText(gs.menuIdx===1 ? loadG : '  Load Game', (NATIVE_W-measureText(loadG))/2, 155, gs.menuIdx===1 ? PAL.hudGold : PAL.neutral);
    }

    // Blink
    if(gs.frameCount % 60 < 40){
        drawText('Press SPACE', (NATIVE_W-measureText('Press SPACE'))/2, 185, PAL.hudTxt);
    }

    // Version
    drawText('v0.16', 4, NATIVE_H-10, PAL.neutral);
}

function drawMiniOffice(ox, oy){
    // Mini pixel art office preview
    bctx.fillStyle = PAL.floorA;
    bctx.fillRect(ox, oy, 80, 40);
    // walls
    bctx.fillStyle = PAL.wallTop;
    bctx.fillRect(ox, oy, 80, 4);
    bctx.fillRect(ox, oy, 4, 40);
    bctx.fillRect(ox+76, oy, 4, 40);
    // desks
    bctx.fillStyle = PAL.deskTop;
    bctx.fillRect(ox+10, oy+10, 12, 6);
    bctx.fillRect(ox+58, oy+10, 12, 6);
    // monitors
    bctx.fillStyle = PAL.monGlow;
    bctx.fillRect(ox+13, oy+8, 4, 3);
    bctx.fillRect(ox+61, oy+8, 4, 3);
    // purple monitor
    bctx.fillStyle = PAL.cofMon;
    bctx.fillRect(ox+66, oy+9, 3, 2);
    // rug
    bctx.fillStyle = PAL.rug;
    bctx.fillRect(ox+30, oy+15, 20, 12);
    // player
    bctx.fillStyle = PAL.hoodie;
    bctx.fillRect(ox+38, oy+25, 4, 5);
    bctx.fillStyle = PAL.skinTone;
    bctx.fillRect(ox+38, oy+23, 4, 3);
}

// ============================================================
// VICTORY / STATS SCREEN
// ============================================================
function drawStatsScreen(){
    if(!gs.statsScreen) return;

    // Tinted overlay
    if(gs.victory){
        bctx.globalAlpha = 0.4;
        bctx.fillStyle = gs.victory.color;
        bctx.fillRect(0, 0, NATIVE_W, NATIVE_H);
        bctx.globalAlpha = 1;
    }

    const sw = 240;
    const sh = 130;
    const sx = (NATIVE_W - sw)/2;
    const sy = (NATIVE_H - sh)/2;

    // Panel border
    bctx.fillStyle = gs.victory ? gs.victory.color : PAL.hudRed;
    bctx.fillRect(sx-3, sy-3, sw+6, sh+6);
    bctx.fillStyle = PAL.dialogBg;
    bctx.fillRect(sx, sy, sw, sh);

    const headerText = gs.victory ? gs.victory.name : 'GAME OVER';
    const headerColor = gs.victory ? gs.victory.color : PAL.hudRed;
    drawText(headerText, sx + (sw - measureText(headerText))/2, sy+8, headerColor);

    // Divider
    bctx.fillStyle = headerColor;
    bctx.fillRect(sx+10, sy+18, sw-20, 1);

    // Stats
    let statY = sy + 26;
    const stats = [
        ['Days Survived', gs.day.toString()],
        ['Peak Cash', '$' + fmtK(gs.peakCash)],
        ['Final Cash', '$' + fmtK(Math.max(0,gs.cash))],
        ['Total Hires', gs.totalHires.toString()],
        ['Customers', gs.customers.toString()],
        ['Product Progress', gs.productProgress.toString()],
        ['Team Size', gs.teamSize.toString()],
    ];

    for(const [label, val] of stats){
        drawText(label, sx+12, statY, PAL.hudTxt);
        drawText(val, sx+sw-12-measureText(val), statY, PAL.hudYellow);
        statY += 10;
    }

    // Divider
    bctx.fillStyle = headerColor;
    bctx.fillRect(sx+10, statY+2, sw-20, 1);

    // New Game prompt
    if(gs.frameCount % 50 < 30){
        const ngText = 'SPACE: New Game';
        drawText(ngText, sx + (sw - measureText(ngText))/2, statY+8, PAL.hudGreen);
    }
}

// ============================================================
// DAY TRANSITION
// ============================================================
function updateDayTransition(){
    if(!gs.dayTransition) return;

    if(gs.dayTransDir === 1){
        gs.dayTransAlpha += 0.03;
        if(gs.dayTransAlpha >= 1){
            gs.dayTransAlpha = 1;
        }
    } else {
        gs.dayTransAlpha -= 0.03;
        if(gs.dayTransAlpha <= 0){
            gs.dayTransAlpha = 0;
            gs.dayTransition = false;
        }
    }
}

function drawDayTransition(){
    if(!gs.dayTransition) return;

    bctx.globalAlpha = gs.dayTransAlpha;
    bctx.fillStyle = '#000';
    bctx.fillRect(0, 0, NATIVE_W, NATIVE_H);

    if(gs.dayTransAlpha > 0.5){
        bctx.globalAlpha = 1;
        const dayText = `Day ${gs.day}`;
        drawText(dayText, (NATIVE_W - measureText(dayText))/2, NATIVE_H/2 - 4, PAL.hudGold);
    }

    bctx.globalAlpha = 1;
}

// ============================================================
// GAME OVER HANDLING
// ============================================================
function drawGameOverOverlay(){
    if(!gs.gameOver || gs.statsScreen) return;
    // handled via dialog system flowing into stats screen
}

// ============================================================
// MAIN LOOP
// ============================================================
function update(){
    gs.frameCount++;

    if(gs.titleScreen) return;
    if(gs.statsScreen) return;

    updateDayTransition();
    updatePlayer();
}

function render(){
    bctx.fillStyle = PAL.bgDark;
    bctx.fillRect(0, 0, NATIVE_W, NATIVE_H);

    if(gs.titleScreen){
        drawTitleScreen();
        // Blit
        ctx.imageSmoothingEnabled = false;
        ctx.drawImage(buf, 0, 0, NATIVE_W, NATIVE_H, 0, 0, NATIVE_W*SCALE, NATIVE_H*SCALE);
        return;
    }

    // Draw tiles
    for(let y=0; y<MAP_H; y++){
        for(let x=0; x<MAP_W; x++){
            drawTile(x, y, map[y][x]);
        }
    }

    // Draw player (sort by Y)
    drawPlayer();

    // Overlays
    drawHUD();
    drawInteractPrompt();
    drawTicker();
    drawDialog();
    drawEvent();
    drawMenu();
    drawHiring();
    drawDayTransition();
    drawGameOverOverlay();
    drawStatsScreen();

    // Blit buffer to screen
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(buf, 0, 0, NATIVE_W, NATIVE_H, 0, 0, NATIVE_W*SCALE, NATIVE_H*SCALE);
}

function gameLoop(){
    update();
    render();
    requestAnimationFrame(gameLoop);
}

// ============================================================
// INIT
// ============================================================
gs.saveExists = hasSave();
// Reset milestones
for(const m of MILESTONES) m.announced = false;

gameLoop();
</script>
</body>
</html>