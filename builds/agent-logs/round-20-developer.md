<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>SaaS Startup Simulator</title>
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{background:#0f0f1a;display:flex;justify-content:center;align-items:center;height:100vh;overflow:hidden;font-family:monospace}
canvas{image-rendering:pixelated;image-rendering:crisp-edges;cursor:none}
</style>
</head>
<body>
<canvas id="game"></canvas>
<script>
const canvas=document.getElementById('game');
const ctx=canvas.getContext('2d');
const NW=320,NH=224,SC=3;
canvas.width=NW*SC;canvas.height=NH*SC;
canvas.style.width=(NW*SC)+'px';canvas.style.height=(NH*SC)+'px';
const buf=document.createElement('canvas');
buf.width=NW;buf.height=NH;
const B=buf.getContext('2d');
B.imageSmoothingEnabled=false;

const PAL={
bg:'#1a1a2e',flA:'#2a2a4a',flB:'#252545',
wT:'#533483',wF:'#2e2e4e',
dk:'#5c4033',dkT:'#7a5a42',dkL:'#4a3028',
mon:'#1a1a2e',mG:'#58b868',mGl:'#a8e6a3',
skin:'#f5c8a0',hd:'#3a7ecf',hdD:'#2a5eaf',
hair:'#3a2a1a',pnt:'#2a2a4a',shoe:'#1a1a2e',
cof:'#4a4a68',cofH:'#665577',
dBg:'#1a1a2eee',dBd:'#58b868',dTx:'#f5f0e1',
hBg:'#0f0f1acc',hTx:'#f5f0e1',hGr:'#58b868',
hRd:'#e94560',hYl:'#f0c040',hGd:'#f5c842',
pos:'#4ecca3',acc:'#e94560',neu:'#a8a8b3',
wh:'#eaeaea',sh:'#00000044',
pl:'#2e8b40',plD:'#1e6b30',pot:'#8b5e3c',
rug:'#3a2255',rugB:'#4a3265',
win:'#4488cc',winL:'#88bbee',
wb:'#d0d0e0',wbB:'#888899',
cfe:'#6b4423',mug:'#ddddee',
vIPO:'#f5c842',vPr:'#58b868',vRD:'#4488ee',vWd:'#e94560',
coSkin:'#e8c898',coShirt:'#444466',
};

const T=16,MW=20,MH=14;
const TL={EMPTY:0,FLOOR:1,WALLT:2,WALLF:3,DESK:4,CHAIR:5,TEAMD:6,PLANT:7,COFFEE:8,DOOR:9,RUG:10,WBOARD:11,COUCH:12,WINDOW:13,TRIM:14};
const SOLID=new Set([TL.WALLT,TL.WALLF,TL.DESK,TL.TEAMD,TL.PLANT,TL.COFFEE,TL.WBOARD,TL.COUCH,TL.WINDOW,TL.TRIM]);

const map=[
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

function getTile(x,y){if(x<0||y<0||x>=MW||y>=MH)return TL.WALLT;return map[y][x];}
function isSolid(tx,ty){return SOLID.has(getTile(tx,ty));}

const EMP_TYPES=[
{role:'Developer',cost:300,icon:'dev',effect:'product',color:'#58b868'},
{role:'Salesperson',cost:300,icon:'sales',effect:'customers',color:'#e94560'},
{role:'Designer',cost:250,icon:'design',effect:'morale',color:'#c850c0'},
{role:'Marketer',cost:350,icon:'market',effect:'revenue',color:'#f0c040'},
];

const EVENTS=[
{name:'Server Crash',desc:'Servers went down overnight!',effect:g=>{g.product=Math.max(0,g.product-5);return'-5 Product';}},
{name:'Viral Tweet',desc:'Your product went viral on social media!',effect:g=>{g.customers+=8;return'+8 Customers';}},
{name:'Bug Report',desc:'Critical bug found in production!',effect:g=>{g.product=Math.max(0,g.product-3);g.morale=Math.max(0,g.morale-10);return'-3 Product, -10 Morale';}},
{name:'Press Coverage',desc:'Tech blog featured your startup!',effect:g=>{g.customers+=5;g.cash+=2000;return'+5 Customers, +$2K';}},
{name:'Investor Interest',desc:'An angel investor noticed you!',effect:g=>{g.cash+=5000;return'+$5K Cash';}},
{name:'Team Lunch',desc:'Team bonding over pizza!',effect:g=>{g.morale=Math.min(100,g.morale+15);return'+15 Morale';}},
{name:'Competitor Launch',desc:'A rival shipped a similar product!',effect:g=>{g.customers=Math.max(0,g.customers-3);return'-3 Customers';}},
{name:'Hackathon Win',desc:'Your team won a local hackathon!',effect:g=>{g.product+=8;g.morale=Math.min(100,g.morale+10);return'+8 Product, +10 Morale';}},
{name:'Office Leak',desc:'Water pipe burst in the office!',effect:g=>{g.cash-=1000;g.morale=Math.max(0,g.morale-5);return'-$1K, -5 Morale';}},
{name:'Referral Spike',desc:'Word of mouth is spreading!',effect:g=>{g.customers+=4;return'+4 Customers';}},
{name:'Coffee Machine Broke',desc:'The coffee machine is dead...',effect:g=>{g.morale=Math.max(0,g.morale-8);return'-8 Morale';}},
{name:'Feature Request',desc:'Big client wants a custom feature!',effect:g=>{g.cash+=3000;g.product+=3;return'+$3K, +3 Product';}},
{name:'Talent Poaching',desc:'A FAANG recruiter is sniffing around!',effect:g=>{g.morale=Math.max(0,g.morale-12);return'-12 Morale';}},
{name:'Product Hunt Launch',desc:'Front page of Product Hunt!',effect:g=>{g.customers+=12;g.morale=Math.min(100,g.morale+5);return'+12 Customers, +5 Morale';}},
{name:'Tax Surprise',desc:'Unexpected tax bill arrived.',effect:g=>{g.cash-=3000;return'-$3K Cash';}},
{name:'Partnership Offer',desc:'A bigger company wants to integrate!',effect:g=>{g.customers+=6;g.cash+=2000;return'+6 Customers, +$2K';}},
{name:'Intern Miracle',desc:'The intern accidentally shipped a killer feature!',effect:g=>{g.product+=10;return'+10 Product';}},
];

const COFOUNDER_LINES=[
"Just doing some research...",
"I'm working on the big picture.",
"Don't worry about what I'm doing.",
"I have a call with... someone.",
"It's a strategic initiative.",
"Reading Wikipedia for... inspiration.",
"Synergies. You wouldn't understand.",
"I'm disrupting disruption itself.",
"This spreadsheet is very important.",
"Trust the process.",
"Working on our Series B pitch... maybe.",
"Have you tried turning the product off and on?",
"I'm building relationships. Vital ones.",
];

const VICTORY_PATHS={
ipo:{name:'IPO Glory',color:PAL.vIPO,icon:'$',
desc:'Ring the bell! Your startup goes public.',
check:g=>g.mrr>=50000&&g.customers>=200&&g.product>=100&&g.employees.length>=6,
flavor:'Wall Street trembles as another tech company proves that hoodies are formal wear.',
thresholds:[
{label:'MRR $50K',get:g=>Math.min(1,g.mrr/50000)},
{label:'200 Customers',get:g=>Math.min(1,g.customers/200)},
{label:'100% Product',get:g=>Math.min(1,g.product/100)},
{label:'Team of 6',get:g=>Math.min(1,g.employees.length/6)},
]},
profit:{name:'Profit Machine',color:PAL.vPr,icon:'%',
desc:'Sustainable profits. The dream.',
check:g=>g.profitStreak>=30&&g.cash>=500000,
flavor:'You did it. You built a company that actually makes money. VCs are confused.',
thresholds:[
{label:'30-Day Profit Streak',get:g=>Math.min(1,g.profitStreak/30)},
{label:'$500K Cash',get:g=>Math.min(1,g.cash/500000)},
]},
rnd:{name:'R&D Utopia',color:PAL.vRD,icon:'*',
desc:'Innovation paradise achieved.',
check:g=>g.product>=100&&g.marketInsight>=5&&g.devCount>=3&&g.breakthroughs>=3,
flavor:'Your engineers are so happy they forgot what LinkedIn looks like.',
thresholds:[
{label:'100% Product',get:g=>Math.min(1,g.product/100)},
{label:'5 Market Insights',get:g=>Math.min(1,g.marketInsight/5)},
{label:'3+ Developers',get:g=>Math.min(1,g.devCount/3)},
{label:'3 Breakthroughs',get:g=>Math.min(1,g.breakthroughs/3)},
]},
world:{name:'World Domination',color:PAL.vWd,icon:'!',
desc:'Total market conquest.',
check:g=>g.mrr>=100000&&g.customers>=500&&g.employees.length>=8,
flavor:'Your competitors have pivoted to selling artisanal coffee. You win.',
thresholds:[
{label:'MRR $100K',get:g=>Math.min(1,g.mrr/100000)},
{label:'500 Customers',get:g=>Math.min(1,g.customers/500)},
{label:'8 Employees',get:g=>Math.min(1,g.employees.length/8)},
]},
};

// GAME STATE
const G={
cash:50000,product:0,customers:0,morale:70,
day:1,hour:9,dayPhase:'morning',
mrr:0,burnRate:500,revenue:0,
employees:[],maxEmployees:8,
profitStreak:0,marketInsight:0,devCount:0,breakthroughs:0,
totalProductBuilt:0,
px:9*T+4,py:7*T+4,pDir:0,pFrame:0,pMoving:false,
speed:1.5,
menuOpen:false,menuType:null,menuSel:0,menuItems:[],
dialogOpen:false,dialogText:'',dialogQueue:[],dialogCharIdx:0,dialogDone:false,
interactTarget:null,
victory:null,victoryAnim:0,
gameOver:false,gameOverAnim:0,
eventPopup:null,eventTimer:0,
pathsOpen:false,
dayTimer:0,dayLength:600,
actionsToday:{built:false,sold:false,researched:false},
cofounderX:3*T+4,cofounderY:3*T+4,cofounderDir:0,cofounderBubble:'',cofounderBubbleTimer:0,
tick:0,
started:false,
};

const keys={};
document.addEventListener('keydown',e=>{
keys[e.key]=true;
if(['ArrowUp','ArrowDown','ArrowLeft','ArrowRight',' ','Enter','Escape'].includes(e.key))e.preventDefault();
handleKeyPress(e.key);
});
document.addEventListener('keyup',e=>{keys[e.key]=false;});

function handleKeyPress(key){
if(!G.started){G.started=true;return;}
if(G.victory){
if(key===' '||key==='Enter'){G.victory=null;resetGame();}
return;
}
if(G.gameOver){
if(key===' '||key==='Enter'){G.gameOver=false;resetGame();}
return;
}
if(G.eventPopup){
if(key===' '||key==='Enter'){G.eventPopup=null;G.eventTimer=0;}
return;
}
if(G.dialogOpen){
if(key===' '||key==='Enter'||key==='z'){
if(!G.dialogDone){G.dialogCharIdx=G.dialogText.length;G.dialogDone=true;}
else if(G.dialogQueue.length>0){showDialog(G.dialogQueue.shift());}
else{G.dialogOpen=false;G.dialogText='';G.dialogCharIdx=0;G.dialogDone=false;}
}
return;
}
if(G.pathsOpen){
if(key==='Escape'||key==='p'||key===' '||key==='Enter'){G.pathsOpen=false;}
return;
}
if(G.menuOpen){
if(key==='ArrowUp'||key==='w'){G.menuSel=(G.menuSel-1+G.menuItems.length)%G.menuItems.length;}
if(key==='ArrowDown'||key==='s'){G.menuSel=(G.menuSel+1)%G.menuItems.length;}
if(key===' '||key==='Enter'||key==='z'){executeMenuAction();}
if(key==='Escape'||key==='x'){G.menuOpen=false;}
return;
}
if(key==='p'){G.pathsOpen=true;return;}
if(key===' '||key==='z'||key==='Enter'){interact();}
}

function resetGame(){
G.cash=50000;G.product=0;G.customers=0;G.morale=70;
G.day=1;G.hour=9;G.dayPhase='morning';
G.mrr=0;G.burnRate=500;G.revenue=0;
G.employees=[];G.profitStreak=0;G.marketInsight=0;G.devCount=0;G.breakthroughs=0;
G.totalProductBuilt=0;
G.px=9*T+4;G.py=7*T+4;G.pDir=0;
G.menuOpen=false;G.dialogOpen=false;G.pathsOpen=false;
G.victory=null;G.victoryAnim=0;G.gameOver=false;G.gameOverAnim=0;
G.eventPopup=null;G.eventTimer=0;
G.dayTimer=0;G.actionsToday={built:false,sold:false,researched:false};
G.tick=0;
}

function showDialog(text){
G.dialogOpen=true;G.dialogText=text;G.dialogCharIdx=0;G.dialogDone=false;
}

function queueDialog(texts){
if(texts.length===0)return;
showDialog(texts[0]);
G.dialogQueue=texts.slice(1);
}

function interact(){
const px=Math.floor(G.px/T),py=Math.floor(G.py/T);
const dirs=[[0,-1],[0,1],[-1,0],[1,0]];
const d=dirs[G.pDir];
const tx=px+d[0],ty=py+d[1];
const tile=getTile(tx,ty);

// Co-founder interaction
const cfTx=Math.floor(G.cofounderX/T),cfTy=Math.floor(G.cofounderY/T);
if(tx===cfTx&&ty===cfTy){
const line=COFOUNDER_LINES[Math.floor(Math.random()*COFOUNDER_LINES.length)];
queueDialog(['Co-Founder: '+line]);
return;
}

if(tile===TL.DESK||tile===TL.TEAMD){
G.menuType='desk';
G.menuItems=[
{label:'Build Product',action:'build',desc:'Write code (+product)'},
{label:'Sell to Clients',action:'sell',desc:'Chase revenue (+customers)'},
{label:'Research Market',action:'research',desc:'Gain market insight'},
{label:'Cancel',action:'cancel'},
];
G.menuSel=0;G.menuOpen=true;
}else if(tile===TL.WBOARD){
G.menuType='whiteboard';
G.menuItems=[
{label:'View Roadmap',action:'roadmap'},
{label:'Cancel',action:'cancel'},
];
G.menuSel=0;G.menuOpen=true;
}else if(tile===TL.COFFEE){
if(G.morale<90){G.morale=Math.min(100,G.morale+10);queueDialog(['You grab a coffee. +10 Morale']);}
else{queueDialog(['You are already fully caffeinated!']);}
}else if(tile===TL.COUCH){
G.menuType='couch';
G.menuItems=[
{label:'Hire Employee',action:'hire'},
{label:'Team Meeting',action:'meeting'},
{label:'Cancel',action:'cancel'},
];
G.menuSel=0;G.menuOpen=true;
}else if(tile===TL.DOOR){
queueDialog(["Can't leave now. The startup needs you."]);
}else if(tile===TL.WINDOW){
queueDialog(["You gaze outside. Other people have weekends..."]);
}else if(tile===TL.PLANT){
queueDialog(["A resilient plant. Just like your runway... hopefully."]);
}
}

function executeMenuAction(){
const item=G.menuItems[G.menuSel];
G.menuOpen=false;
if(!item||item.action==='cancel')return;

if(item.action==='build'){
if(G.actionsToday.built){queueDialog(["Already shipped code today. Try again tomorrow."]);return;}
const devBonus=G.employees.filter(e=>e.role==='Developer').length;
const gain=3+devBonus*2+Math.floor(Math.random()*3);
G.product+=gain;G.totalProductBuilt+=gain;
G.actionsToday.built=true;
if(G.totalProductBuilt>=50&&G.breakthroughs<1){G.breakthroughs=1;queueDialog([`You built a breakthrough feature! (+${gain} Product)`,'BREAKTHROUGH #1: Auto-scaling achieved!']);}
else if(G.totalProductBuilt>=120&&G.breakthroughs<2){G.breakthroughs=2;queueDialog([`You built a breakthrough feature! (+${gain} Product)`,'BREAKTHROUGH #2: AI integration shipped!']);}
else if(G.totalProductBuilt>=200&&G.breakthroughs<3){G.breakthroughs=3;queueDialog([`You built a breakthrough feature! (+${gain} Product)`,'BREAKTHROUGH #3: Platform singularity!']);}
else{queueDialog([`Wrote code today. +${gain} Product`]);}
}else if(item.action==='sell'){
if(G.actionsToday.sold){queueDialog(["Already did sales today. Try again tomorrow."]);return;}
const salesBonus=G.employees.filter(e=>e.role==='Salesperson').length;
const gain=1+salesBonus+Math.floor(Math.random()*2);
const rev=(500+salesBonus*300)*gain;
G.customers+=gain;G.cash+=rev;
G.actionsToday.sold=true;
queueDialog([`Closed ${gain} deal${gain>1?'s':''}! +${gain} Customers, +$${rev}`]);
}else if(item.action==='research'){
if(G.actionsToday.researched){queueDialog(["Already researched today. Try again tomorrow."]);return;}
G.marketInsight++;G.actionsToday.researched=true;
const tips=['Customers want simpler onboarding.','Enterprise segment is untapped.','Competitors are raising prices.','Freemium could 3x signups.','API access is a top request.'];
queueDialog([`Market insight gained! (${G.marketInsight} total)`,tips[Math.min(G.marketInsight-1,tips.length-1)]]);
}else if(item.action==='roadmap'){
const pct=Math.min(100,Math.floor(G.product));
let bar='[';for(let i=0;i<20;i++)bar+=i<pct/5?'#':'.';bar+=']';
queueDialog([`Product Progress: ${bar} ${pct}%`,`MRR: $${G.mrr} | Customers: ${G.customers}`,`Market Insight: ${G.marketInsight} | Breakthroughs: ${G.breakthroughs}`]);
}else if(item.action==='hire'){
if(G.employees.length>=G.maxEmployees){queueDialog(["Office is full! Max "+G.maxEmployees+" employees."]);return;}
G.menuType='hire';
G.menuItems=EMP_TYPES.map(t=>({label:`${t.role} ($${t.cost}/day)`,action:'dohire',data:t}));
G.menuItems.push({label:'Cancel',action:'cancel'});
G.menuSel=0;G.menuOpen=true;
}else if(item.action==='dohire'){
const t=item.data;
if(G.cash<t.cost*5){queueDialog([`Can't afford a ${t.role}. Need $${t.cost*5} (5 days salary).`]);return;}
const emp={role:t.role,cost:t.cost,color:t.color,day:G.day};
G.employees.push(emp);
if(t.role==='Developer')G.devCount++;
queueDialog([`Hired a ${t.role}! ($${t.cost}/day)`,`Team size: ${G.employees.length}`]);
}else if(item.action==='meeting'){
if(G.employees.length===0){queueDialog(["No team to meet with. It's just you and the co-founder."]);return;}
G.morale=Math.min(100,G.morale+5+G.employees.length*2);
queueDialog([`Team standup complete. +${5+G.employees.length*2} Morale`,`"Let's ship it!" everyone says.`]);
}
}

function updateDay(dt){
if(G.victory||G.gameOver||G.dialogOpen||G.menuOpen||G.eventPopup||G.pathsOpen)return;
G.dayTimer+=dt;
if(G.dayTimer>=G.dayLength){
G.dayTimer=0;
endOfDay();
}
G.hour=9+Math.floor((G.dayTimer/G.dayLength)*10);
if(G.hour<12)G.dayPhase='morning';
else if(G.hour<15)G.dayPhase='afternoon';
else G.dayPhase='evening';
}

function endOfDay(){
// Employee effects
G.employees.forEach(e=>{
if(e.role==='Developer'){G.product+=1.5;}
if(e.role==='Salesperson'){G.customers+=Math.random()<0.5?1:0;}
if(e.role==='Designer'){G.morale=Math.min(100,G.morale+2);}
if(e.role==='Marketer'){G.customers+=Math.random()<0.3?1:0;}
});

// MRR & Revenue
G.mrr=G.customers*Math.floor(50+G.product*2);
G.revenue=Math.floor(G.mrr/30);

// Burn rate
const empCost=G.employees.reduce((s,e)=>s+e.cost,0);
G.burnRate=500+empCost;
const netFlow=G.revenue-G.burnRate;
G.cash+=netFlow;

// Profit streak
if(netFlow>0){G.profitStreak++;}else{G.profitStreak=0;}

// Morale drift
if(G.cash<10000)G.morale=Math.max(0,G.morale-3);
if(G.morale<20){/* employees might leave */
if(G.employees.length>0&&Math.random()<0.15){
const idx=Math.floor(Math.random()*G.employees.length);
const gone=G.employees.splice(idx,1)[0];
if(gone.role==='Developer')G.devCount--;
queueDialog([`${gone.role} quit due to low morale!`]);
}
}

G.day++;
G.actionsToday={built:false,sold:false,researched:false};

// Random event (30% chance)
if(Math.random()<0.3){
const ev=EVENTS[Math.floor(Math.random()*EVENTS.length)];
const result=ev.effect(G);
G.eventPopup={name:ev.name,desc:ev.desc,result:result};
G.eventTimer=0;
}

// Game over check
if(G.cash<=0){
G.gameOver=true;G.gameOverAnim=0;
return;
}

// Victory checks
for(const[key,path] of Object.entries(VICTORY_PATHS)){
if(path.check(G)){
G.victory={key:key,...path};G.victoryAnim=0;
return;
}
}

// Cofounder random bubble
if(Math.random()<0.2){
G.cofounderBubble=COFOUNDER_LINES[Math.floor(Math.random()*COFOUNDER_LINES.length)].substring(0,20);
G.cofounderBubbleTimer=180;
}
}

function updatePlayer(dt){
if(G.victory||G.gameOver||G.dialogOpen||G.menuOpen||G.eventPopup||G.pathsOpen)return;
let dx=0,dy=0;
if(keys['ArrowUp']||keys['w']){dy=-1;G.pDir=0;}
if(keys['ArrowDown']||keys['s']){dy=1;G.pDir=1;}
if(keys['ArrowLeft']||keys['a']){dx=-1;G.pDir=2;}
if(keys['ArrowRight']||keys['d']){dx=1;G.pDir=3;}

G.pMoving=dx!==0||dy!==0;
if(G.pMoving){
const nx=G.px+dx*G.speed;
const ny=G.py+dy*G.speed;
const ntx=Math.floor(nx/T),nty=Math.floor(ny/T);
const ctx_=Math.floor(G.px/T),cty=Math.floor(G.py/T);

if(!isSolid(Math.floor(nx/T),cty))G.px=nx;
if(!isSolid(ctx_,Math.floor(ny/T)))G.py=ny;

// Clamp
G.px=Math.max(T+2,Math.min((MW-1)*T-2,G.px));
G.py=Math.max(T+2,Math.min((MH-1)*T-2,G.py));
}
if(G.pMoving)G.pFrame+=0.15;
}

// DRAWING FUNCTIONS
function drawTile(x,y,type){
const px=x*T,py=y*T;
switch(type){
case TL.FLOOR:
B.fillStyle=(x+y)%2===0?PAL.flA:PAL.flB;
B.fillRect(px,py,T,T);
break;
case TL.WALLT:
B.fillStyle=PAL.wT;B.fillRect(px,py,T,T);
B.fillStyle='#6344a3';B.fillRect(px+2,py+2,T-4,T-4);
break;
case TL.WALLF:
B.fillStyle=PAL.wF;B.fillRect(px,py,T,T);
B.fillStyle='#3e3e5e';B.fillRect(px,py,T,2);
break;
case TL.DESK:
B.fillStyle=(x+y)%2===0?PAL.flA:PAL.flB;B.fillRect(px,py,T,T);
B.fillStyle=PAL.dk;B.fillRect(px+1,py+2,T-2,T-4);
B.fillStyle=PAL.dkT;B.fillRect(px+2,py+3,T-4,T-6);
B.fillStyle=PAL.mon;B.fillRect(px+4,py+1,8,6);
B.fillStyle=PAL.mG;B.fillRect(px+5,py+2,6,4);
break;
case TL.CHAIR:
B.fillStyle=(x+y)%2===0?PAL.flA:PAL.flB;B.fillRect(px,py,T,T);
B.fillStyle=PAL.chr;B.fillRect(px+4,py+4,8,8);
B.fillStyle=PAL.chrS;B.fillRect(px+5,py+5,6,6);
break;
case TL.TEAMD:
B.fillStyle=(x+y)%2===0?PAL.flA:PAL.flB;B.fillRect(px,py,T,T);
B.fillStyle='#4a6a8a';B.fillRect(px+1,py+2,T-2,T-4);
B.fillStyle='#5a7a9a';B.fillRect(px+2,py+3,T-4,T-6);
B.fillStyle=PAL.mon;B.fillRect(px+3,py+1,10,6);
B.fillStyle='#66cc88';B.fillRect(px+4,py+2,8,4);
break;
case TL.PLANT:
B.fillStyle=(x+y)%2===0?PAL.flA:PAL.flB;B.fillRect(px,py,T,T);
B.fillStyle=PAL.pot;B.fillRect(px+4,py+8,8,6);
B.fillStyle=PAL.pl;B.fillRect(px+3,py+2,10,8);
B.fillStyle=PAL.plD;B.fillRect(px+5,py+4,6,4);
break;
case TL.COFFEE:
B.fillStyle=(x+y)%2===0?PAL.flA:PAL.flB;B.fillRect(px,py,T,T);
B.fillStyle=PAL.cfe;B.fillRect(px+2,py+3,12,10);
B.fillStyle='#7b5433';B.fillRect(px+3,py+4,10,8);
B.fillStyle=PAL.mug;B.fillRect(px+5,py+1,4,5);
B.fillStyle=PAL.cfe;B.fillRect(px+6,py+2,2,3);
break;
case TL.DOOR:
B.fillStyle=(x+y)%2===0?PAL.flA:PAL.flB;B.fillRect(px,py,T,T);
B.fillStyle='#8b6040';B.fillRect(px+2,py+0,12,T);
B.fillStyle='#9b7050';B.fillRect(px+3,py+1,10,T-2);
B.fillStyle='#c0a060';B.fillRect(px+10,py+7,2,3);
break;
case TL.RUG:
B.fillStyle=PAL.rug;B.fillRect(px,py,T,T);
B.fillStyle=PAL.rugB;
B.fillRect(px,py,T,1);B.fillRect(px,py,1,T);
B.fillRect(px+T-1,py,1,T);B.fillRect(px,py+T-1,T,1);
break;
case TL.WBOARD:
B.fillStyle=(x+y)%2===0?PAL.flA:PAL.flB;B.fillRect(px,py,T,T);
B.fillStyle=PAL.wbB;B.fillRect(px+1,py+1,T-2,T-4);
B.fillStyle=PAL.wb;B.fillRect(px+2,py+2,T-4,T-6);
B.fillStyle=PAL.hRd;B.fillRect(px+4,py+4,3,1);
B.fillStyle=PAL.hGr;B.fillRect(px+4,py+6,5,1);
B.fillStyle=PAL.hYl;B.fillRect(px+4,py+8,2,1);
break;
case TL.COUCH:
B.fillStyle=(x+y)%2===0?PAL.flA:PAL.flB;B.fillRect(px,py,T,T);
B.fillStyle='#5a4a6a';B.fillRect(px+1,py+3,T-2,10);
B.fillStyle='#6a5a7a';B.fillRect(px+2,py+4,T-4,8);
B.fillStyle='#5a4a6a';B.fillRect(px+1,py+2,3,9);
B.fillRect(px+T-4,py+2,3,9);
break;
case TL.WINDOW:
B.fillStyle=PAL.wT;B.fillRect(px,py,T,T);
B.fillStyle=PAL.win;B.fillRect(px+2,py+2,T-4,T-4);
B.fillStyle=PAL.winL;B.fillRect(px+3,py+3,T-6,T-6);
B.fillStyle=PAL.wT;B.fillRect(px+T/2-1,py+2,2,T-4);
break;
case TL.TRIM:
B.fillStyle='#3e2e5e';B.fillRect(px,py,T,T);
B.fillStyle='#4e3e6e';B.fillRect(px,py,T,3);
break;
}
}

function drawSprite(x,y,dir,frame,isCofounder){
const sx=Math.floor(x),sy=Math.floor(y);
const bobY=Math.floor(Math.sin(frame*2)*1);

// Shadow
B.fillStyle=PAL.sh;
B.beginPath();B.ellipse(sx+6,sy+14,5,2,0,0,Math.PI*2);B.fill();

// Body
const skinC=isCofounder?PAL.coSkin:PAL.skin;
const topC=isCofounder?PAL.coShirt:PAL.hd;
const topD=isCofounder?'#333355':PAL.hdD;

// Legs
B.fillStyle=PAL.pnt;
if(dir===0||dir===1){
const legOff=Math.floor(Math.sin(frame*3)*2);
B.fillRect(sx+3,sy+11+bobY,3,3);B.fillRect(sx+7,sy+11+bobY,3,3);
}else{
B.fillRect(sx+4,sy+11+bobY,5,3);
}

// Torso (hoodie/shirt)
B.fillStyle=topC;
B.fillRect(sx+2,sy+5+bobY,9,7);
B.fillStyle=topD;
B.fillRect(sx+2,sy+5+bobY,9,2);

// Arms
B.fillStyle=topC;
if(dir===2){B.fillRect(sx+0,sy+6+bobY,3,5);}
else if(dir===3){B.fillRect(sx+10,sy+6+bobY,3,5);}
else{B.fillRect(sx+0,sy+6+bobY,3,4);B.fillRect(sx+10,sy+6+bobY,3,4);}

// Head
B.fillStyle=skinC;
B.fillRect(sx+3,sy+1+bobY,7,5);

// Hair
B.fillStyle=isCofounder?'#555566':PAL.hair;
B.fillRect(sx+3,sy+0+bobY,7,2);
if(dir===2)B.fillRect(sx+2,sy+1+bobY,2,3);
if(dir===3)B.fillRect(sx+9,sy+1+bobY,2,3);

// Eyes
if(dir!==0){
B.fillStyle='#1a1a2e';
if(dir===1){B.fillRect(sx+4,sy+3+bobY,2,1);B.fillRect(sx+7,sy+3+bobY,2,1);}
else if(dir===2){B.fillRect(sx+3,sy+3+bobY,2,1);}
else{B.fillRect(sx+8,sy+3+bobY,2,1);}
}

// Cofounder ? bubble
if(isCofounder&&G.cofounderBubbleTimer<=0){
const blink=Math.floor(G.tick/40)%4===0;
if(!blink){
B.fillStyle='#ffffff';B.fillRect(sx+4,sy-6,5,7);
B.fillStyle='#1a1a2e';
B.font='5px monospace';B.fillText('?',sx+5,sy-1);
}
}
}

function drawMap(){
for(let y=0;y<MH;y++)for(let x=0;x<MW;x++)drawTile(x,y,map[y][x]);
}

function drawHUD(){
const hh=18;
B.fillStyle=PAL.hBg;B.fillRect(0,0,NW,hh);
B.fillStyle='#222244';B.fillRect(0,hh-1,NW,1);

B.font='7px monospace';
// Cash
B.fillStyle=G.cash<10000?PAL.hRd:PAL.hGr;
const cashStr=G.cash>=1000?`$${(G.cash/1000).toFixed(1)}K`:`$${G.cash}`;
B.fillText(cashStr,3,11);

// Day
B.fillStyle=PAL.hTx;B.fillText(`D${G.day}`,55,11);

// Product
const pPct=Math.min(100,Math.floor(G.product));
B.fillStyle=PAL.hYl;B.fillText(`Prod:${pPct}%`,80,11);

// Customers
B.fillStyle=PAL.acc;B.fillText(`Cust:${G.customers}`,130,11);

// MRR
B.fillStyle=PAL.hGr;
const mrrStr=G.mrr>=1000?`$${(G.mrr/1000).toFixed(1)}K`:`$${G.mrr}`;
B.fillText(`MRR:${mrrStr}`,178,11);

// Team
B.fillStyle=PAL.neu;B.fillText(`Team:${G.employees.length}`,230,11);

// Morale bar
B.fillStyle='#333355';B.fillRect(273,4,40,8);
B.fillStyle=G.morale>50?PAL.hGr:G.morale>25?PAL.hYl:PAL.hRd;
B.fillRect(273,4,Math.floor(40*(G.morale/100)),8);
B.fillStyle=PAL.hTx;B.fillText('M',267,11);

// Burn indicator
const netFlow=G.revenue-G.burnRate;
B.font='5px monospace';
B.fillStyle=netFlow>=0?PAL.hGr:PAL.hRd;
B.fillText(netFlow>=0?`+$${netFlow}/d`:`-$${Math.abs(netFlow)}/d`,3,17);

// Leading victory path indicator
let best=null,bestPct=0;
for(const[key,path] of Object.entries(VICTORY_PATHS)){
let pct=0;
path.thresholds.forEach(t=>{pct+=t.get(G);});
pct/=path.thresholds.length;
if(pct>bestPct){bestPct=pct;best={key,path,pct};}
}
if(best&&bestPct>0){
B.fillStyle=best.path.color;
B.fillText(`${best.path.icon}${Math.floor(bestPct*100)}%`,55,17);
}

B.fillStyle='#555577';
B.fillText('[P]aths',85,17);
}

function drawDialog(){
if(!G.dialogOpen)return;
const dw=NW-20,dh=44;
const dx=10,dy=NH-dh-10;
B.fillStyle=PAL.dBg;B.fillRect(dx,dy,dw,dh);
B.strokeStyle=PAL.dBd;B.lineWidth=1;
B.strokeRect(dx+1,dy+1,dw-2,dh-2);

B.font='7px monospace';B.fillStyle=PAL.dTx;
const shown=G.dialogText.substring(0,G.dialogCharIdx);
const lines=wrapText(shown,dw-16);
lines.forEach((l,i)=>{B.fillText(l,dx+8,dy+14+i*10);});

if(G.dialogDone){
const blink=Math.floor(G.tick/15)%2;
if(blink)B.fillText('▼',dx+dw-16,dy+dh-6);
}
if(!G.dialogDone)G.dialogCharIdx+=0.8;
if(G.dialogCharIdx>=G.dialogText.length)G.dialogDone=true;
}

function wrapText(text,maxW){
const words=text.split(' ');
const lines=[];let line='';
for(const w of words){
const test=line?line+' '+w:w;
if(B.measureText(test).width>maxW){lines.push(line);line=w;}
else{line=test;}
}
if(line)lines.push(line);
return lines.slice(0,3);
}

function drawMenu(){
if(!G.menuOpen)return;
const mw=160,mh=G.menuItems.length*16+12;
const mx=NW/2-mw/2,my=NH/2-mh/2;
B.fillStyle='#1a1a2eee';B.fillRect(mx,my,mw,mh);
B.strokeStyle=PAL.dBd;B.lineWidth=1;B.strokeRect(mx+1,my+1,mw-2,mh-2);

B.font='7px monospace';
G.menuItems.forEach((item,i)=>{
const iy=my+10+i*16;
if(i===G.menuSel){
B.fillStyle='#58b86833';B.fillRect(mx+4,iy-8,mw-8,14);
B.fillStyle=PAL.hGr;B.fillText('►',mx+6,iy);
}
B.fillStyle=i===G.menuSel?PAL.wh:PAL.neu;
B.fillText(item.label,mx+16,iy);
});
}

function drawEventPopup(){
if(!G.eventPopup)return;
const ew=220,eh=70;
const ex=NW/2-ew/2,ey=NH/2-eh/2;
G.eventTimer++;
const slide=Math.min(1,G.eventTimer/15);

B.save();B.globalAlpha=slide;
B.fillStyle='#1a1a2ef0';B.fillRect(ex,ey,ew,eh);
B.strokeStyle=PAL.hYl;B.lineWidth=1;B.strokeRect(ex+1,ey+1,ew-2,eh-2);

B.font='8px monospace';B.fillStyle=PAL.hYl;
B.fillText('⚡ '+G.eventPopup.name,ex+8,ey+16);
B.font='6px monospace';B.fillStyle=PAL.dTx;
const dLines=wrapText(G.eventPopup.desc,ew-20);
dLines.forEach((l,i)=>B.fillText(l,ex+8,ey+28+i*9));
B.fillStyle=PAL.hGr;B.fillText(G.eventPopup.result,ex+8,ey+50);
B.fillStyle=PAL.neu;B.fillText('[SPACE] Continue',ex+ew-90,ey+eh-6);
B.restore();
}

function drawVictoryScreen(){
if(!G.victory)return;
G.victoryAnim=Math.min(1,G.victoryAnim+0.02);
const a=G.victoryAnim;

B.save();
B.globalAlpha=a;
B.fillStyle='#0a0a15e8';B.fillRect(0,0,NW,NH);

const cy=30+Math.sin(G.tick*0.05)*3;

// Trophy/icon
B.font='24px monospace';B.fillStyle=G.victory.color;
B.fillText(G.victory.icon,NW/2-8,cy+25);

// Title
B.font='12px monospace';B.fillStyle=G.victory.color;
const title='VICTORY: '+G.victory.name.toUpperCase();
B.fillText(title,NW/2-B.measureText(title).width/2,cy+45);

// Description
B.font='7px monospace';B.fillStyle=PAL.dTx;
B.fillText(G.victory.desc,NW/2-B.measureText(G.victory.desc).width/2,cy+60);

// Stats
B.fillStyle=PAL.neu;
const stats=[
`Day ${G.day}`,
`Cash: $${G.cash.toLocaleString()}`,
`MRR: $${G.mrr.toLocaleString()}`,
`Customers: ${G.customers}`,
`Product: ${Math.floor(G.product)}%`,
`Team: ${G.employees.length}`,
];
stats.forEach((s,i)=>{B.fillText(s,NW/2-40,cy+78+i*11);});

// Flavor text
B.font='6px monospace';B.fillStyle=G.victory.color;
const flav=wrapText(G.victory.flavor,NW-40);
flav.forEach((l,i)=>{B.fillText(l,NW/2-B.measureText(l).width/2,cy+150+i*9);});

// Stars/particles
for(let i=0;i<8;i++){
const sx=NW/2+Math.cos(G.tick*0.03+i*0.8)*80*a;
const sy=cy+30+Math.sin(G.tick*0.04+i*1.1)*40*a;
B.fillStyle=G.victory.color;
B.globalAlpha=a*(0.3+Math.sin(G.tick*0.1+i)*0.3);
B.fillRect(sx,sy,2,2);
}
B.globalAlpha=a;

B.fillStyle=PAL.wh;B.font='7px monospace';
const rt='[SPACE] Play Again';
B.fillText(rt,NW/2-B.measureText(rt).width/2,NH-15);

B.restore();
}

function drawGameOver(){
if(!G.gameOver)return;
G.gameOverAnim=Math.min(1,G.gameOverAnim+0.02);

B.save();B.globalAlpha=G.gameOverAnim;
B.fillStyle='#1a0000e8';B.fillRect(0,0,NW,NH);

B.font='14px monospace';B.fillStyle=PAL.hRd;
const t1='GAME OVER';
B.fillText(t1,NW/2-B.measureText(t1).width/2,70);

B.font='8px monospace';B.fillStyle=PAL.dTx;
B.fillText('Your startup ran out of money.',NW/2-100,95);

B.font='7px monospace';B.fillStyle=PAL.neu;
const stats=[`Survived ${G.day} days`,`Peak MRR: $${G.mrr}`,`Final customers: ${G.customers}`,`Product: ${Math.floor(G.product)}%`];
stats.forEach((s,i)=>{B.fillText(s,NW/2-50,120+i*12);});

B.fillStyle=PAL.wh;
const rt='[SPACE] Try Again';
B.fillText(rt,NW/2-B.measureText(rt).width/2,NH-20);

B.restore();
}

function drawPathsPanel(){
if(!G.pathsOpen)return;
const pw=260,ph=170;
const px_=NW/2-pw/2,py_=NH/2-ph/2;
B.fillStyle='#0f0f1af0';B.fillRect(px_,py_,pw,ph);
B.strokeStyle=PAL.hYl;B.lineWidth=1;B.strokeRect(px_+1,py_+1,pw-2,ph-2);

B.font='8px monospace';B.fillStyle=PAL.hYl;
B.fillText('VICTORY PATHS',px_+pw/2-45,py_+14);

let oy=28;
for(const[key,path] of Object.entries(VICTORY_PATHS)){
B.font='7px monospace';B.fillStyle=path.color;
B.fillText(path.icon+' '+path.name,px_+8,py_+oy);
oy+=4;
path.thresholds.forEach(t=>{
const pct=t.get(G);
const bw=100,bh=5;
const bx=px_+12,by=py_+oy;
B.fillStyle='#333355';B.fillRect(bx,by,bw,bh);
B.fillStyle=pct>=1?path.color:(path.color+'88');
B.fillRect(bx,by,Math.floor(bw*pct),bh);
B.font='5px monospace';B.fillStyle=PAL.neu;
B.fillText(t.label+' '+Math.floor(pct*100)+'%',bx+bw+4,by+5);
oy+=9;
});
oy+=5;
}

B.font='5px monospace';B.fillStyle=PAL.neu;
B.fillText('[P/ESC] Close',px_+pw-70,py_+ph-6);
}

function drawTitleScreen(){
B.fillStyle='#0f0f1a';B.fillRect(0,0,NW,NH);

// Office silhouette
B.fillStyle='#1a1a2e';
B.fillRect(40,100,240,80);
B.fillRect(50,80,30,20);
B.fillRect(120,85,40,15);
B.fillRect(200,75,50,25);

// Windows glow
for(let i=0;i<5;i++){
const wx=60+i*42;
const flicker=Math.sin(G.tick*0.05+i*1.3)*0.15+0.85;
B.fillStyle=`rgba(88,184,104,${flicker*0.6})`;
B.fillRect(wx,110,14,10);
}

// Title
const bounce=Math.sin(G.tick*0.04)*3;
B.font='14px monospace';B.fillStyle=PAL.hGr;
const t1='SaaS STARTUP';
B.fillText(t1,NW/2-B.measureText(t1).width/2,40+bounce);
B.font='10px monospace';B.fillStyle=PAL.hYl;
const t2='SIMULATOR';
B.fillText(t2,NW/2-B.measureText(t2).width/2,56+bounce);

// Tagline
B.font='6px monospace';B.fillStyle=PAL.neu;
B.fillText('"Move fast and fix things... eventually"',NW/2-110,72);

// Instructions
B.font='7px monospace';B.fillStyle=PAL.dTx;
const blink=Math.floor(G.tick/25)%2;
if(blink){
const pt='Press any key to start';
B.fillText(pt,NW/2-B.measureText(pt).width/2,200);
}

B.font='5px monospace';B.fillStyle=PAL.neu;
B.fillText('Arrow keys / WASD = Move   SPACE/Z = Interact   P = Paths',30,215);
}

function drawCofounderBubble(){
if(G.cofounderBubbleTimer>0){
G.cofounderBubbleTimer--;
const bx=Math.floor(G.cofounderX)-10;
const by=Math.floor(G.cofounderY)-18;
const text=G.cofounderBubble;
const tw=B.measureText(text).width+8;
B.fillStyle='#ffffffdd';B.fillRect(bx,by,tw,10);
B.fillStyle='#1a1a2e';B.font='5px monospace';
B.fillText(text,bx+4,by+8);
}
}

function drawInteractPrompt(){
if(G.dialogOpen||G.menuOpen||G.eventPopup||G.pathsOpen||G.victory||G.gameOver)return;
const px=Math.floor(G.px/T),py=Math.floor(G.py/T);
const dirs=[[0,-1],[0,1],[-1,0],[1,0]];
const d=dirs[G.pDir];
const tx=px+d[0],ty=py+d[1];
const tile=getTile(tx,ty);

const interactable=new Set([TL.DESK,TL.TEAMD,TL.WBOARD,TL.COFFEE,TL.COUCH,TL.DOOR,TL.WINDOW,TL.PLANT]);
const cfTx=Math.floor(G.cofounderX/T),cfTy=Math.floor(G.cofounderY/T);

if(interactable.has(tile)||( tx===cfTx&&ty===cfTy)){
const ix=tx*T+T/2,iy=ty*T-4;
const blink=Math.floor(G.tick/12)%2;
if(blink){
B.fillStyle=PAL.hYl;B.font='6px monospace';
B.fillText('[Z]',ix-6,iy);
}
}
}

// Employees visual - show at team desks
function drawEmployees(){
const deskSpots=[
{x:13,y:2},{x:14,y:2},{x:2,y:11},{x:3,y:11},{x:13,y:11},{x:14,y:11},{x:3,y:2},{x:2,y:2}
];
G.employees.forEach((emp,i)=>{
if(i>=deskSpots.length)return;
const spot=deskSpots[i];
const ex=spot.x*T+2,ey=spot.y*T+T-2;
// Mini sprite
B.fillStyle=emp.color;
B.fillRect(ex+4,ey-8,5,5);
B.fillStyle=PAL.skin;
B.fillRect(ex+5,ey-12,3,4);
B.fillStyle=PAL.hair;
B.fillRect(ex+5,ey-13,3,2);
});
}

// MAIN LOOP
let lastTime=0;
function gameLoop(ts){
const dt=Math.min(ts-lastTime,50);
lastTime=ts;
G.tick++;

B.clearRect(0,0,NW,NH);

if(!G.started){
drawTitleScreen();
}else{
updatePlayer(dt);
updateDay(dt);

drawMap();
drawEmployees();

// Draw cofounder
drawSprite(G.cofounderX-6,G.cofounderY-7,G.pDir===0?1:0,0,true);
drawCofounderBubble();

// Draw player
drawSprite(G.px-6,G.py-7,G.pDir,G.pMoving?G.pFrame:0,false);

drawInteractPrompt();
drawHUD();
drawDialog();
drawMenu();
drawEventPopup();
drawPathsPanel();
drawVictoryScreen();
drawGameOver();

// Day progress bar at bottom
if(!G.victory&&!G.gameOver){
const dpw=NW;
const prog=G.dayTimer/G.dayLength;
const dayColor=G.dayPhase==='morning'?'#f0c040':G.dayPhase==='afternoon'?'#e09030':'#9060a0';
B.fillStyle='#0f0f1a88';B.fillRect(0,NH-3,dpw,3);
B.fillStyle=dayColor;B.fillRect(0,NH-3,Math.floor(dpw*prog),3);
}
}

ctx.clearRect(0,0,canvas.width,canvas.height);
ctx.drawImage(buf,0,0,NW,NH,0,0,NW*SC,NH*SC);

requestAnimationFrame(gameLoop);
}
requestAnimationFrame(gameLoop);
</script>
</body>
</html>