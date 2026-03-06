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

// PALETTE
const P={
bg:'#1a1a2e',flA:'#2a2a4a',flB:'#252545',
wT:'#533483',wF:'#2e2e4e',
dk:'#5c4033',dkT:'#7a5a42',dkL:'#4a3028',
mon:'#1a1a2e',mG:'#58b868',mGl:'#a8e6a3',
chr:'#333355',chrS:'#3d3d60',
skin:'#f5c8a0',hd:'#e94560',hdD:'#cc3350',
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
};

const T=16,MW=20,MH=14;
const TL={E:0,F:1,WT:2,WF:3,DK:4,CH:5,TM:6,PL:7,CF:8,DR:9,RG:10,WB:11,CM:12,WN:13,TR:14};
const SOL_SET=new Set([0,2,3,6,7,8,11,12,13,14]);
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
function gT(x,y){if(x<0||y<0||x>=MW||y>=MH)return 0;return map[y][x];}
function isSolid(tx,ty){return SOL_SET.has(gT(tx,ty));}

// MILESTONES
const MILES=[
{name:'MVP',thr:30,desc:'Minimum Viable Product launched!'},
{name:'Beta',thr:60,desc:'Beta release - early adopters!'},
{name:'V1.0',thr:100,desc:'Version 1.0 shipped!'},
{name:'Scale',thr:150,desc:'Platform at scale!'},
{name:'Transcend',thr:200,desc:'Product transcended!'},
];

// EMPLOYEE TYPES
const EMP_TYPES=[
{role:'Developer',cost:300,icon:'dev',effect:'product'},
{role:'Salesperson',cost:300,icon:'sales',effect:'customers'},
{role:'Designer',cost:250,icon:'design',effect:'morale'},
{role:'Marketer',cost:350,icon:'market',effect:'revenue'},
];

// RANDOM EVENTS
const EVENTS=[
{name:'Server Crash',desc:'Servers went down!',effect:()=>{G.product=Math.max(0,G.product-5);return'-5 Product';}},
{name:'Viral Tweet',desc:'Your product went viral!',effect:()=>{G.customers+=8;return'+8 Customers';}},
{name:'Bug Report',desc:'Critical bug found!',effect:()=>{G.product=Math.max(0,G.product-3);G.morale=Math.max(0,G.morale-10);return'-3 Product, -10 Morale';}},
{name:'Press Coverage',desc:'Tech blog featured you!',effect:()=>{G.customers+=5;G.cash+=2000;return'+5 Customers, +$2K';}},
{name:'Investor Interest',desc:'Angel investor noticed you!',effect:()=>{G.cash+=5000;return'+$5K Cash';}},
{name:'Team Lunch',desc:'Team bonding over pizza!',effect:()=>{G.morale=Math.min(100,G.morale+15);return'+15 Morale';}},
{name:'Competitor Launch',desc:'A rival shipped a similar product!',effect:()=>{G.customers=Math.max(0,G.customers-3);return'-3 Customers';}},
{name:'Hackathon Win',desc:'Your team won a hackathon!',effect:()=>{G.product+=8;G.morale=Math.min(100,G.morale+10);return'+8 Product, +10 Morale';}},
{name:'Office Leak',desc:'Water pipe burst in the office!',effect:()=>{G.cash-=1000;G.morale=Math.max(0,G.morale-5);return'-$1K, -5 Morale';}},
{name:'Referral Spike',desc:'Word of mouth is spreading!',effect:()=>{G.customers+=4;return'+4 Customers';}},
];

// CO-FOUNDER QUOTES
const COF_QUOTES=[
"I'm pivoting our synergy matrix...","Have you seen the burn rate dashboard?",
"I scheduled a meeting about our meetings.","The blockchain angle could work...",
"I updated the pitch deck. Again.","I'm networking. Virtually.",
"Our TAM is basically infinite.","Working on something big. Can't say what.",
"I think we need more whiteboards.","Just vibing with the product roadmap.",
"The cap table is... interesting.","I'll handle the investor relations.",
];

// GAME STATE
let G={};
function initGame(){
G={
state:'title',day:1,hour:9,phase:'morning',ap:5,maxAp:5,
cash:50000,revenue:0,burn:500,
product:0,customers:0,morale:80,productLevel:0,
employees:[],maxEmp:2,
profitStreak:0,
cofX:15*T+4,cofY:7*T+4,cofDir:2,cofFrame:0,cofMoveT:0,
dayLog:[],totalRevenue:0,totalSpent:0,
hiresDone:0,featuresShipped:0,coffeesDrunk:0,
victoryType:null,
dialogLines:[],dialogIdx:0,dialogCb:null,
menuIdx:0,menuItems:[],
hireOptions:[],hireIdx:0,
px:9*T+4,py:7*T+4,pDir:0,pFrame:0,pMoving:false,
animT:0,dayTrans:0,dayTransDir:0,
flash:null,flashT:0,
notifications:[],
milesAnnounced:{},
titleIdx:0,statsScroll:0,
};
}
initGame();

// INPUT
const keys={};
let kp={};
document.addEventListener('keydown',e=>{keys[e.key]=true;kp[e.key]=true;e.preventDefault();});
document.addEventListener('keyup',e=>{keys[e.key]=false;});
function wasPressed(k){return!!kp[k];}
function clearInput(){kp={};}

// SAVE / LOAD
function saveGame(){
const s={day:G.day,hour:G.hour,phase:G.phase,ap:G.ap,maxAp:G.maxAp,
cash:G.cash,revenue:G.revenue,burn:G.burn,product:G.product,
customers:G.customers,morale:G.morale,productLevel:G.productLevel,
employees:G.employees,maxEmp:G.maxEmp,profitStreak:G.profitStreak,
px:G.px,py:G.py,pDir:G.pDir,
totalRevenue:G.totalRevenue,totalSpent:G.totalSpent,
hiresDone:G.hiresDone,featuresShipped:G.featuresShipped,
coffeesDrunk:G.coffeesDrunk,milesAnnounced:G.milesAnnounced};
try{localStorage.setItem('saas_save',JSON.stringify(s));}catch(e){}
}
function loadGame(){
try{
const d=JSON.parse(localStorage.getItem('saas_save'));
if(!d)return false;
Object.assign(G,d);
G.state='playing';G.dialogLines=[];G.menuItems=[];G.hireOptions=[];
G.notifications=[];G.dayLog=[];G.flash=null;G.pMoving=false;
G.animT=0;G.dayTrans=0;G.cofX=15*T+4;G.cofY=7*T+4;G.cofDir=2;G.cofFrame=0;G.cofMoveT=0;
return true;
}catch(e){return false;}
}
function hasSave(){try{return!!localStorage.getItem('saas_save');}catch(e){return false;}}

// DRAWING HELPERS
function rect(x,y,w,h,c){B.fillStyle=c;B.fillRect(x|0,y|0,w,h);}
function text(str,x,y,c,sz){B.fillStyle=c||P.dTx;B.font=(sz||7)+'px monospace';B.fillText(str,x|0,y|0);}
function textC(str,y,c,sz){const s=sz||7;B.font=s+'px monospace';const w=B.measureText(str).width;text(str,(NW-w)/2,y,c,s);}
function outline(x,y,w,h,c,t){B.strokeStyle=c;B.lineWidth=t||1;B.strokeRect(x|0,y|0,w,h);}

// TILE DRAWING
function drawTile(tx,ty){
const x=tx*T,y=ty*T,t=map[ty][tx];
const checker=(tx+ty)%2===0;
switch(t){
case TL.F:rect(x,y,T,T,checker?P.flA:P.flB);break;
case TL.WT:rect(x,y,T,T,P.wT);rect(x+1,y+12,T-2,3,'#6644aa');break;
case TL.WF:rect(x,y,T,T,P.wF);rect(x,y,1,T,'#3e3e5e');break;
case TL.DK:
rect(x,y,T,T,checker?P.flA:P.flB);
rect(x+1,y+2,T-2,T-4,P.dk);rect(x+2,y+3,T-4,T-6,P.dkT);
rect(x+3,y+4,4,3,P.mon);rect(x+4,y+5,2,1,P.mG);
break;
case TL.CH:
rect(x,y,T,T,checker?P.flA:P.flB);
rect(x+4,y+4,8,10,P.chr);rect(x+5,y+5,6,8,P.chrS);
break;
case TL.TM:
rect(x,y,T,T,checker?P.flA:P.flB);
rect(x+2,y+1,12,10,P.mon);rect(x+3,y+2,10,8,P.mG);
for(let i=0;i<3;i++)rect(x+4,y+3+i*2,8,1,P.mGl);
rect(x+5,y+12,6,3,P.chr);
break;
case TL.PL:
rect(x,y,T,T,checker?P.flA:P.flB);
rect(x+5,y+10,6,5,P.pot);
rect(x+3,y+3,10,8,P.pl);rect(x+5,y+1,6,5,P.plD);
rect(x+7,y+0,2,3,'#3e9b50');
break;
case TL.CF:
rect(x,y,T,T,checker?P.flA:P.flB);
rect(x+3,y+2,10,12,P.cfe);rect(x+4,y+3,8,4,'#8b6e50');
rect(x+5,y+8,3,3,P.mug);rect(x+6,y+9,1,1,'#aa8866');
break;
case TL.DR:
rect(x,y,T,T,checker?P.flA:P.flB);
rect(x+6,y+0,4,T,'#8b7355');rect(x+7,y+6,2,2,P.hGd);
break;
case TL.RG:
rect(x,y,T,T,P.rug);
if((tx+ty)%3===0)rect(x+2,y+2,T-4,T-4,P.rugB);
break;
case TL.WB:
rect(x,y,T,T,P.wT);
rect(x+2,y+2,T-4,T-6,P.wb);rect(x+3,y+3,T-6,T-8,'#e8e8f0');
rect(x+4,y+5,4,1,P.acc);rect(x+4,y+7,6,1,P.hGr);
break;
case TL.CM:
rect(x,y,T,T,checker?P.flA:P.flB);
rect(x+2,y+1,12,14,'#555577');rect(x+3,y+2,10,8,'#222240');
rect(x+4,y+3,8,6,P.mG);
rect(x+4,y+11,3,2,'#777799');rect(x+9,y+11,3,2,'#777799');
break;
case TL.WN:
rect(x,y,T,T,P.wT);
rect(x+2,y+2,T-4,T-4,P.win);rect(x+3,y+3,T-6,T-6,P.winL);
rect(x+T/2-0.5,y+2,1,T-4,'#6644aa');rect(x+2,y+T/2-0.5,T-4,1,'#6644aa');
break;
case TL.TR:
rect(x,y,T,T,'#3a3a5a');rect(x,y,T,2,'#4a4a6a');
break;
default:rect(x,y,T,T,P.bg);
}
}

// SPRITE DRAWING
function drawChar(x,y,dir,frame,hoodie,hairC,isCofounder){
const sx=x|0,sy=y|0;
// shadow
rect(sx-4,sy+4,12,4,P.sh);
// body
const hc=hoodie||P.hd;
const bw=12,bh=10;
rect(sx-bw/2,sy-bh+2,bw,bh,hc);
// darker trim
rect(sx-bw/2,sy-bh+2,1,bh,isCofounder?'#3a3a58':'#cc3350');
rect(sx+bw/2-1,sy-bh+2,1,bh,isCofounder?'#3a3a58':'#cc3350');
// head
rect(sx-4,sy-12,10,8,P.skin);
// hair
const hrc=hairC||P.hair;
rect(sx-4,sy-14,10,4,hrc);
if(dir===2)rect(sx-4,sy-12,10,2,hrc);
// eyes
if(dir!==2){
const ex=dir===3?-2:2;
rect(sx+ex,sy-10,2,2,'#1a1a2e');
if(dir===0)rect(sx+ex+3,sy-10,2,2,'#1a1a2e');
}
// legs
const legOff=frame%2===0?0:1;
rect(sx-3,sy+2,4,4,P.pnt);rect(sx+1,sy+2+legOff,4,4,P.pnt);
rect(sx-2,sy+5,3,2,P.shoe);rect(sx+2,sy+5+legOff,3,2,P.shoe);
}

function drawEmployee(emp,idx){
const baseX=2*T+8+(idx%4)*3*T;
const baseY=8*T+8+Math.floor(idx/4)*2*T;
const colors={dev:'#4488ee',sales:'#ee8844',design:'#ee44aa',market:'#44eeaa'};
const hairs=['#3a2a1a','#8b6e50','#2a1a0a','#aa6633','#554433'];
drawChar(baseX,baseY,0,(G.animT/20|0)%2,colors[emp.icon],hairs[idx%5],false);
}

// NOTIFICATION SYSTEM
function notify(msg,color){
G.notifications.push({msg,color:color||P.pos,t:180});
}

function flash(msg,color){
G.flash=msg;G.flashT=90;G.flashColor=color||P.pos;
}

// VICTORY CHECK
function checkVictory(){
if(G.cash>=50000&&G.customers>=50){G.victoryType='IPO';return true;}
if(G.profitStreak>=3){G.victoryType='Profit';return true;}
if(G.productLevel>=10){G.victoryType='R&D';return true;}
if(G.customers>=100&&G.employees.length>=10){G.victoryType='World';return true;}
return false;
}

// DAY END
function endDay(){
// Revenue calc
const devs=G.employees.filter(e=>e.effect==='product').length;
const sales=G.employees.filter(e=>e.effect==='customers').length;
const mktrs=G.employees.filter(e=>e.effect==='revenue').length;
const designers=G.employees.filter(e=>e.effect==='morale').length;

// Auto-produce from employees
G.product+=devs*3;
G.customers+=sales*2;
G.morale=Math.min(100,G.morale+designers*5);

// Product levels
const newLevel=Math.floor(G.product/20);
if(newLevel>G.productLevel){
const gained=newLevel-G.productLevel;
G.productLevel=newLevel;
flash('Product Level '+G.productLevel+'!',P.hGr);
}

// Revenue = customers * base + marketer bonus
const baseRev=G.customers*100+mktrs*200;
G.revenue=baseRev;
const expenses=G.burn+G.employees.reduce((s,e)=>s+e.cost,0);
const netIncome=G.revenue-expenses;
G.cash+=netIncome;
G.totalRevenue+=Math.max(0,G.revenue);
G.totalSpent+=expenses;

// Profit streak
if(netIncome>0)G.profitStreak++;
else G.profitStreak=0;

// Morale effects
if(G.morale<20){G.customers=Math.max(0,G.customers-1);}
if(G.morale>80)G.product+=1;
G.morale=Math.max(0,Math.min(100,G.morale-2));

// Milestone check
for(const m of MILES){
if(G.product>=m.thr&&!G.milesAnnounced[m.name]){
G.milesAnnounced[m.name]=true;
notify(m.name+': '+m.desc,P.hGd);
}
}

// Random event (40% chance)
if(Math.random()<0.4){
const ev=EVENTS[Math.random()*EVENTS.length|0];
const result=ev.effect();
G.dayLog.push(ev.name+': '+result);
notify(ev.name+' - '+result,P.hYl);
}

// Check game over
if(G.cash<=0){
G.state='gameover';
return;
}

// Check victory
if(checkVictory()){
G.state='victory';
saveGame();
return;
}

// Next day
G.day++;
G.hour=9;
G.phase='morning';
G.ap=G.maxAp;
G.dayLog=[];

// Auto-save
saveGame();

// Day transition
G.dayTrans=60;
G.dayTransDir=1;
}

// ACTIONS
function doBuild(){
if(G.ap<=0){flash('No AP left!',P.acc);return;}
G.ap--;
const gain=3+Math.floor(Math.random()*3);
G.product+=gain;
G.featuresShipped++;
flash('+'+gain+' Product!',P.hGr);
notify('Built feature: +'+gain+' product',P.pos);
}

function doSell(){
if(G.ap<=0){flash('No AP left!',P.acc);return;}
G.ap--;
const gain=1+Math.floor(Math.random()*3);
G.customers+=gain;
flash('+'+gain+' Customers!',P.hGr);
notify('Sales call: +'+gain+' customers',P.pos);
}

function doCoffee(){
if(G.ap<=0){flash('No AP left!',P.acc);return;}
G.ap--;
G.morale=Math.min(100,G.morale+10);
G.coffeesDrunk++;
flash('+10 Morale!',P.hYl);
}

function doHire(){
if(G.employees.length>=G.maxEmp){flash('Office full! ('+G.maxEmp+' max)',P.acc);return;}
G.hireOptions=[];
const shuffled=[...EMP_TYPES].sort(()=>Math.random()-0.5);
for(let i=0;i<Math.min(3,shuffled.length);i++){
const t=shuffled[i];
const cost=t.cost+Math.floor(Math.random()*100)-50;
G.hireOptions.push({...t,cost:Math.max(150,cost)});
}
G.hireIdx=0;
G.state='hire';
}

function hireEmployee(emp){
if(G.cash<emp.cost*3){flash('Need $'+(emp.cost*3)+' (3mo runway)',P.acc);return;}
G.employees.push({role:emp.role,cost:emp.cost,icon:emp.icon,effect:emp.effect});
G.hiresDone++;
G.cash-=emp.cost;
flash('Hired '+emp.role+'!',P.hGr);
notify(emp.role+' joined! ($'+emp.cost+'/day)',P.pos);
if(G.employees.length>=G.maxEmp&&G.maxEmp<12){
G.maxEmp=Math.min(12,G.maxEmp+2);
notify('Office expanded! Max '+G.maxEmp+' employees',P.hYl);
}
G.state='playing';
}

function doEndDay(){
G.state='playing';
endDay();
}

// CO-FOUNDER DIALOG
function talkToCofounder(){
const q=COF_QUOTES[Math.random()*COF_QUOTES.length|0];
G.dialogLines=['Co-Founder:',q];
G.dialogIdx=0;
G.dialogCb=null;
G.state='dialog';
}

// INTERACTION
function interact(){
// Check co-founder proximity
const dx=Math.abs(G.px-G.cofX),dy=Math.abs(G.py-G.cofY);
if(dx<20&&dy<20){talkToCofounder();return;}
// Check tile interactions
const tx=Math.floor(G.px/T),ty=Math.floor(G.py/T);
const dirs=[[0,-1],[0,1],[-1,0],[1,0]];
for(const[ddx,ddy]of dirs){
const ct=gT(tx+ddx,ty+ddy);
if(ct===TL.DK||ct===TL.TM){openMenu('work');return;}
if(ct===TL.CF){doCoffee();return;}
if(ct===TL.CM){openMenu('computer');return;}
if(ct===TL.WB){openMenu('whiteboard');return;}
if(ct===TL.DR){
G.dialogLines=['Exit the office?','(End the day and process revenue)'];
G.dialogIdx=0;G.dialogCb=()=>doEndDay();G.state='dialog';return;
}
}
openMenu('general');
}

function openMenu(type){
if(type==='work'){
G.menuItems=[{label:'Build Feature (1 AP)',action:doBuild},{label:'Sales Call (1 AP)',action:doSell},{label:'Hire (free)',action:doHire},{label:'End Day',action:doEndDay},{label:'Stats',action:()=>{G.state='stats';G.statsScroll=0;}},{label:'Save & Quit',action:()=>{saveGame();flash('Game Saved!',P.hGr);}},{label:'Cancel',action:()=>{}}];
}else if(type==='computer'){
G.menuItems=[{label:'Build Feature (1 AP)',action:doBuild},{label:'Check Stats',action:()=>{G.state='stats';G.statsScroll=0;}},{label:'Cancel',action:()=>{}}];
}else if(type==='whiteboard'){
G.menuItems=[{label:'Plan Feature (+2 Product)',action:()=>{if(G.ap>0){G.ap--;G.product+=2;flash('+2 Product',P.hGr);}else flash('No AP!',P.acc);}},{label:'Cancel',action:()=>{}}];
}else{
G.menuItems=[{label:'Build Feature (1 AP)',action:doBuild},{label:'Sales Call (1 AP)',action:doSell},{label:'Hire',action:doHire},{label:'End Day',action:doEndDay},{label:'Stats',action:()=>{G.state='stats';G.statsScroll=0;}},{label:'Cancel',action:()=>{}}];
}
G.menuIdx=0;
G.state='menu';
}

// CO-FOUNDER AI
function updateCofounder(dt){
G.cofMoveT-=dt;
if(G.cofMoveT<=0){
G.cofMoveT=1000+Math.random()*2000;
G.cofDir=Math.random()*4|0;
}
// Simple wandering
const speed=0.3;
let nx=G.cofX,ny=G.cofY;
if(G.cofDir===0)ny-=speed;
else if(G.cofDir===2)ny+=speed;
else if(G.cofDir===3)nx-=speed;
else if(G.cofDir===1)nx+=speed;
const ctxF=Math.floor(nx/T),ctyF=Math.floor(ny/T);
if(!isSolid(ctxF,ctyF)&&nx>T&&nx<(MW-1)*T&&ny>T&&ny<(MH-1)*T){
G.cofX=nx;G.cofY=ny;G.cofFrame=(G.cofFrame+1)%20;
}else{
G.cofDir=(G.cofDir+1)%4;
}
}

// MOVEMENT
function updatePlayer(dt){
if(G.state!=='playing')return;
const speed=1.2;
let dx=0,dy=0;
if(keys['ArrowUp']||keys['w']||keys['W']){dy=-speed;G.pDir=0;}
if(keys['ArrowDown']||keys['s']||keys['S']){dy=speed;G.pDir=2;}
if(keys['ArrowLeft']||keys['a']||keys['A']){dx=-speed;G.pDir=3;}
if(keys['ArrowRight']||keys['d']||keys['D']){dx=speed;G.pDir=1;}
G.pMoving=dx!==0||dy!==0;
if(G.pMoving){
const nx=G.px+dx,ny=G.py+dy;
const ntx=Math.floor(nx/T),nty=Math.floor(ny/T);
if(!isSolid(ntx,nty)){G.px=nx;G.py=ny;}
else{
// Try sliding
const stx=Math.floor(G.px/T);
if(!isSolid(stx,nty))G.py=ny;
else if(!isSolid(ntx,Math.floor(G.py/T)))G.px=nx;
}
G.px=Math.max(T,Math.min((MW-1)*T-1,G.px));
G.py=Math.max(T,Math.min((MH-1)*T-1,G.py));
G.pFrame++;
}
}

// ============ DRAWING ============

function drawMap(){
for(let y=0;y<MH;y++)for(let x=0;x<MW;x++)drawTile(x,y);
}

function drawHUD(){
// Top bar
rect(0,0,NW,14,P.hBg);
text('Day '+G.day,4,10,P.hTx);
text('$'+G.cash.toLocaleString(),60,10,G.cash>5000?P.hGr:P.acc);
text('AP:'+G.ap+'/'+G.maxAp,135,10,G.ap>0?P.hYl:P.acc);
text('Cust:'+G.customers,185,10,P.hTx);
text('Prod:'+G.product,240,10,P.hTx);
// Morale bar
rect(280,3,36,8,'#333');
rect(281,4,Math.floor(34*(G.morale/100)),6,G.morale>50?P.hGr:G.morale>25?P.hYl:P.acc);

// Bottom bar
rect(0,NH-20,NW,20,P.hBg);
const phase=G.phase==='morning'?'Morning':'Afternoon';
text(phase+' | '+G.employees.length+'/'+G.maxEmp+' staff | Burn: $'+(G.burn+G.employees.reduce((s,e)=>s+e.cost,0))+'/day',4,NH-8,P.neu,6);
text('[Z] Act [X] Menu [C] Stats',160,NH-8,P.neu,6);

// Notifications
let ny=20;
for(let i=G.notifications.length-1;i>=0;i--){
const n=G.notifications[i];
if(n.t>0){
const alpha=Math.min(1,n.t/30);
B.globalAlpha=alpha;
rect(4,ny,NW-8,10,'#0008');
text(n.msg,6,ny+8,n.color,6);
B.globalAlpha=1;
ny+=11;
n.t--;
}
}
G.notifications=G.notifications.filter(n=>n.t>0);

// Flash message
if(G.flash&&G.flashT>0){
G.flashT--;
const alpha=Math.min(1,G.flashT/20);
B.globalAlpha=alpha;
B.font='10px monospace';
const fw=B.measureText(G.flash).width;
rect(NW/2-fw/2-6,NH/2-30,fw+12,16,'#000c');
outline(NW/2-fw/2-6,NH/2-30,fw+12,16,G.flashColor);
text(G.flash,NW/2-fw/2,NH/2-21,G.flashColor,10);
B.globalAlpha=1;
}
}

function drawDialog(){
rect(16,NH-70,NW-32,55,P.dBg);
outline(16,NH-70,NW-32,55,P.dBd,2);
for(let i=0;i<=G.dialogIdx&&i<G.dialogLines.length;i++){
text(G.dialogLines[i],24,NH-58+i*14,P.dTx,7);
}
if(G.dialogIdx<G.dialogLines.length-1){
text('▼',NW-36,NH-22,P.dBd,8);
}else{
text('[Z] OK',NW-60,NH-22,P.dBd,6);
}
}

function drawMenu(){
const items=G.menuItems;
const mw=160,mh=items.length*14+10;
const mx=NW/2-mw/2,my=NH/2-mh/2;
rect(mx,my,mw,mh,P.dBg);
outline(mx,my,mw,mh,P.dBd,2);
for(let i=0;i<items.length;i++){
const sel=i===G.menuIdx;
if(sel)rect(mx+2,my+4+i*14,mw-4,13,'#58b86833');
text((sel?'► ':'  ')+items[i].label,mx+8,my+14+i*14,sel?P.hGr:P.dTx,7);
}
}

function drawHireScreen(){
rect(20,20,NW-40,NH-40,P.dBg);
outline(20,20,NW-40,NH-40,P.dBd,2);
textC('— HIRE EMPLOYEE —',36,P.hGd,9);
text('Cash: $'+G.cash.toLocaleString(),30,50,P.hGr,7);
text('Staff: '+G.employees.length+'/'+G.maxEmp,180,50,P.hTx,7);
for(let i=0;i<G.hireOptions.length;i++){
const h=G.hireOptions[i];
const sel=i===G.hireIdx;
const y=68+i*32;
if(sel)rect(28,y-4,NW-56,28,'#58b86822');
outline(28,y-4,NW-56,28,sel?P.hGr:'#444',1);
text((sel?'► ':' ')+h.role,36,y+6,sel?P.hGr:P.dTx,8);
text('$'+h.cost+'/day',160,y+6,P.hYl,7);
text('Boosts: '+h.effect,36,y+18,P.neu,6);
text('Hiring cost: $'+h.cost,160,y+18,P.acc,6);
}
text('[Z] Hire  [X] Cancel',80,NH-32,P.neu,7);
}

function drawVictory(){
const colors={IPO:P.vIPO,Profit:P.vPr,'R&D':P.vRD,World:P.vWd};
const titles={IPO:'IPO GLORY!',Profit:'PROFIT MACHINE!','R&D':'R&D UTOPIA!',World:'WORLD DOMINATION!'};
const descs={
IPO:'You took the company public!\nWall Street celebrates your vision.',
Profit:'Sustainable profits achieved!\nBootstrapped brilliance.',
'R&D':'Technology transcended!\nYour R&D lab changed the world.',
World:'Global domination complete!\nYour SaaS empire spans the globe.'
};
const vc=colors[G.victoryType]||P.hGd;
const vt=titles[G.victoryType]||'VICTORY!';
const vd=descs[G.victoryType]||'You won!';
// Overlay
B.fillStyle='#000000cc';B.fillRect(0,0,NW,NH);
// Border
rect(30,20,NW-60,NH-40,'#1a1a2eee');
outline(30,20,NW-60,NH-40,vc,3);
// Stars animation
const st=G.animT/10;
for(let i=0;i<12;i++){
const sx=NW/2+Math.cos(st+i*0.52)*80+Math.sin(st*0.7+i)*20;
const sy=60+Math.sin(st+i*0.52)*25;
rect(sx,sy,2,2,vc);
}
// Title
textC('★ '+vt+' ★',50,vc,11);
// Description
const lines=vd.split('\n');
for(let i=0;i<lines.length;i++)textC(lines[i],72+i*12,P.dTx,7);
// Stats
const sy=105;
text('Days Survived: '+G.day,60,sy,P.hTx,7);
text('Final Cash: $'+G.cash.toLocaleString(),60,sy+12,P.hGr,7);
text('Customers: '+G.customers,60,sy+24,P.hTx,7);
text('Product Level: '+G.productLevel,60,sy+36,P.hTx,7);
text('Employees: '+G.employees.length,60,sy+48,P.hTx,7);
text('Features Shipped: '+G.featuresShipped,170,sy,P.hTx,7);
text('Total Revenue: $'+G.totalRevenue.toLocaleString(),170,sy+12,P.hTx,7);
text('Coffees: '+G.coffeesDrunk,170,sy+24,P.hYl,7);
textC('[ENTER] New Game   [S] Stats',NH-8,P.neu,7);
}

function drawGameOver(){
B.fillStyle='#000000dd';B.fillRect(0,0,NW,NH);
rect(40,40,NW-80,NH-80,'#1a1a2e');
outline(40,40,NW-80,NH-80,P.acc,3);
textC('GAME OVER',65,P.acc,12);
textC('Your startup ran out of cash!',85,P.dTx,7);
text('Days: '+G.day,80,110,P.hTx,7);
text('Customers: '+G.customers,80,124,P.hTx,7);
text('Product: '+G.product,80,138,P.hTx,7);
text('Revenue: $'+G.totalRevenue.toLocaleString(),80,152,P.hTx,7);
textC('[ENTER] Try Again',175,P.hGr,8);
}

function drawStats(){
B.fillStyle='#000000dd';B.fillRect(0,0,NW,NH);
rect(20,10,NW-40,NH-20,'#1a1a2eee');
outline(20,10,NW-40,NH-20,P.dBd,2);
textC('— COMPANY STATS —',28,P.hGd,9);
const col1=35,col2=170;let y=44;
text('Day: '+G.day,col1,y,P.hTx);text('Phase: '+G.phase,col2,y,P.hTx);y+=12;
text('Cash: $'+G.cash.toLocaleString(),col1,y,P.hGr);text('Burn: $'+(G.burn+G.employees.reduce((s,e)=>s+e.cost,0)),col2,y,P.acc);y+=12;
text('Revenue: $'+G.revenue+'/day',col1,y,P.hGr);text('Customers: '+G.customers,col2,y,P.hTx);y+=12;
text('Product: '+G.product+' (Lv.'+G.productLevel+')',col1,y,P.hTx);text('Morale: '+G.morale+'%',col2,y,G.morale>50?P.hGr:P.acc);y+=12;
text('Profit Streak: '+G.profitStreak+' days',col1,y,G.profitStreak>0?P.hGr:P.neu);y+=14;
text('— EMPLOYEES ('+G.employees.length+'/'+G.maxEmp+') —',col1,y,P.hYl);y+=12;
if(G.employees.length===0)text('No employees yet',col1,y,P.neu);
for(const e of G.employees){text(e.role+' ($'+e.cost+'/day)',col1,y,P.hTx);y+=10;}
y+=6;
text('— TOTALS —',col1,y,P.hYl);y+=12;
text('Revenue: $'+G.totalRevenue.toLocaleString(),col1,y,P.hTx);text('Spent: $'+G.totalSpent.toLocaleString(),col2,y,P.hTx);y+=12;
text('Hires: '+G.hiresDone,col1,y,P.hTx);text('Features: '+G.featuresShipped,col2,y,P.hTx);y+=12;
text('Coffees: '+G.coffeesDrunk,col1,y,P.hYl);y+=14;
text('— VICTORY CONDITIONS —',col1,y,P.hGd);y+=12;
const vcs=[
{n:'IPO Glory',c:G.cash>=50000&&G.customers>=50,d:'$50K + 50 cust'},
{n:'Profit Machine',c:G.profitStreak>=3,d:'3-day profit streak'},
{n:'R&D Utopia',c:G.productLevel>=10,d:'Product Lv.10'},
{n:'World Domination',c:G.customers>=100&&G.employees.length>=10,d:'100 cust + 10 emp'},
];
for(const v of vcs){
text((v.c?'✓':'○')+' '+v.n,col1,y,v.c?P.hGr:P.neu,6);
text(v.d,col2,y,P.neu,6);y+=10;
}
textC('[X] Close',NH-18,P.neu,7);
}

function drawTitle(){
B.fillStyle=P.bg;B.fillRect(0,0,NW,NH);
// Office background suggestion
for(let x=0;x<NW;x+=T)for(let y=0;y<NH;y+=T){
rect(x,y,T,T,(x+y)%32===0?P.flA:P.bg);
}
// Logo area
rect(40,30,NW-80,50,'#1a1a2ecc');
outline(40,30,NW-80,50,P.hGr,2);
// Animated title
const bounce=Math.sin(G.animT/15)*3;
textC('SaaS STARTUP',52+bounce,P.hGr,12);
textC('SIMULATOR',68+bounce,P.hGd,10);
// Pixel art character preview
drawChar(NW/2-30,120,2,(G.animT/15|0)%2,P.hd,P.hair,false);
drawChar(NW/2+30,120,2,(G.animT/18|0)%2,P.cof,'#555',true);
// Menu
const items=hasSave()?['New Game','Continue','Controls']:['New Game','Controls'];
for(let i=0;i<items.length;i++){
const sel=G.titleIdx===i;
const y=148+i*16;
if(sel)rect(NW/2-60,y-8,120,14,'#58b86822');
textC((sel?'► ':'')+items[i],y,sel?P.hGr:P.dTx,8);
}
// Footer
textC('Arrow Keys to Move | Z to Act | X to Cancel',NH-14,P.neu,6);
// Version
text('v0.18',NW-36,NH-6,'#333',5);
}

// DAY TRANSITION
function drawDayTransition(){
if(G.dayTrans>0){
const alpha=G.dayTrans>30?((60-G.dayTrans)/30):(G.dayTrans/30);
B.fillStyle='rgba(0,0,0,'+alpha+')';
B.fillRect(0,0,NW,NH);
if(G.dayTrans>20&&G.dayTrans<50){
B.globalAlpha=Math.min(1,(G.dayTrans-20)/10);
textC('Day '+G.day,NH/2-10,P.hGd,14);
textC(G.phase==='morning'?'☀ Morning':'☾ Evening',NH/2+10,P.hTx,8);
B.globalAlpha=1;
}
G.dayTrans--;
}
}

// MAIN UPDATE
function update(dt){
G.animT++;

if(G.state==='title'){
const items=hasSave()?3:2;
if(wasPressed('ArrowUp'))G.titleIdx=(G.titleIdx-1+items)%items;
if(wasPressed('ArrowDown'))G.titleIdx=(G.titleIdx+1)%items;
if(wasPressed('z')||wasPressed('Z')||wasPressed('Enter')){
if(hasSave()){
if(G.titleIdx===0){initGame();G.state='playing';G.dayTrans=60;flash('Welcome, Co-Founder!',P.hGr);}
else if(G.titleIdx===1){if(loadGame())flash('Game Loaded!',P.hGr);else{initGame();G.state='playing';}}
else if(G.titleIdx===2){G.dialogLines=['Controls:','Arrows/WASD: Move','Z/Enter: Interact/Confirm','X/Esc: Cancel/Back','C: Quick Stats'];G.dialogIdx=0;G.dialogCb=null;G.state='dialog';}
}else{
if(G.titleIdx===0){initGame();G.state='playing';G.dayTrans=60;flash('Welcome, Co-Founder!',P.hGr);}
else{G.dialogLines=['Controls:','Arrows/WASD: Move','Z/Enter: Interact/Confirm','X/Esc: Cancel/Back','C: Quick Stats'];G.dialogIdx=0;G.dialogCb=null;G.state='dialog';}
}
}
}
else if(G.state==='playing'){
updatePlayer(dt);
updateCofounder(dt);
if(wasPressed('z')||wasPressed('Z'))interact();
if(wasPressed('x')||wasPressed('X'))openMenu('general');
if(wasPressed('c')||wasPressed('C')){G.state='stats';G.statsScroll=0;}
}
else if(G.state==='dialog'){
if(wasPressed('z')||wasPressed('Z')||wasPressed('Enter')){
if(G.dialogIdx<G.dialogLines.length-1)G.dialogIdx++;
else{
G.state=G.dialogCb?'playing':'title';
if(G.dialogCb){G.dialogCb();G.dialogCb=null;}
if(G.state!=='playing'&&G.state!=='title'){}
}
}
if(wasPressed('x')||wasPressed('X')||wasPressed('Escape')){
G.state=G.dialogCb?'playing':'title';
G.dialogCb=null;
}
}
else if(G.state==='menu'){
if(wasPressed('ArrowUp'))G.menuIdx=(G.menuIdx-1+G.menuItems.length)%G.menuItems.length;
if(wasPressed('ArrowDown'))G.menuIdx=(G.menuIdx+1)%G.menuItems.length;
if(wasPressed('z')||wasPressed('Z')||wasPressed('Enter')){
const act=G.menuItems[G.menuIdx].action;
G.state='playing';
act();
}
if(wasPressed('x')||wasPressed('X')||wasPressed('Escape'))G.state='playing';
}
else if(G.state==='hire'){
if(wasPressed('ArrowUp'))G.hireIdx=(G.hireIdx-1+G.hireOptions.length)%G.hireOptions.length;
if(wasPressed('ArrowDown'))G.hireIdx=(G.hireIdx+1)%G.hireOptions.length;
if(wasPressed('z')||wasPressed('Z')||wasPressed('Enter'))hireEmployee(G.hireOptions[G.hireIdx]);
if(wasPressed('x')||wasPressed('X')||wasPressed('Escape'))G.state='playing';
}
else if(G.state==='victory'){
if(wasPressed('Enter')){try{localStorage.removeItem('saas_save');}catch(e){}initGame();G.state='title';}
if(wasPressed('s')||wasPressed('S')){G.state='stats';}
}
else if(G.state==='gameover'){
if(wasPressed('Enter')){try{localStorage.removeItem('saas_save');}catch(e){}initGame();G.state='title';}
}
else if(G.state==='stats'){
if(wasPressed('x')||wasPressed('X')||wasPressed('Escape')||wasPressed('c')||wasPressed('C')){
G.state=G.victoryType?'victory':'playing';
}
}

clearInput();
}

// MAIN DRAW
function draw(){
B.fillStyle=P.bg;
B.fillRect(0,0,NW,NH);

if(G.state==='title'){
drawTitle();
}else{
drawMap();
// Draw employees
for(let i=0;i<G.employees.length;i++)drawEmployee(G.employees[i],i);
// Draw co-founder
drawChar(G.cofX,G.cofY,G.cofDir,(G.cofFrame/10|0)%2,P.cof,'#555',true);
// Draw player
drawChar(G.px,G.py,G.pDir,G.pMoving?(G.pFrame/5|0)%2:0,P.hd,P.hair,false);
// Interaction hint
const tx=Math.floor(G.px/T),ty=Math.floor(G.py/T);
const dirs=[[0,-1],[0,1],[-1,0],[1,0]];
let canInteract=false;
for(const[dx,dy]of dirs){
const ct=gT(tx+dx,ty+dy);
if([TL.DK,TL.TM,TL.CF,TL.CM,TL.WB,TL.DR].includes(ct)){canInteract=true;break;}
}
if(Math.abs(G.px-G.cofX)<20&&Math.abs(G.py-G.cofY)<20)canInteract=true;
if(canInteract&&G.state==='playing'){
const blink=Math.sin(G.animT/8)>0;
if(blink)text('[Z]',G.px-6,G.py-20,P.hGr,6);
}
drawHUD();
if(G.state==='dialog')drawDialog();
if(G.state==='menu')drawMenu();
if(G.state==='hire')drawHireScreen();
if(G.state==='victory')drawVictory();
if(G.state==='gameover')drawGameOver();
if(G.state==='stats')drawStats();
drawDayTransition();
}

// Render to screen
ctx.imageSmoothingEnabled=false;
ctx.drawImage(buf,0,0,NW*SC,NH*SC);
}

// GAME LOOP
let lastTime=0;
function loop(time){
const dt=time-lastTime;
lastTime=time;
update(dt);
draw();
requestAnimationFrame(loop);
}
requestAnimationFrame(loop);
</script>
</body>
</html>