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
const PAL={
bg:'#1a1a2e',flA:'#2a2a4a',flB:'#252545',
wT:'#533483',wF:'#2e2e4e',
dk:'#5c4033',dkT:'#7a5a42',dkL:'#4a3028',
mon:'#1a1a2e',mG:'#58b868',mGl:'#a8e6a3',
chr:'#333355',chrS:'#3d3d60',
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

// Tile types
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

// MILESTONES
const MILESTONES=[
{name:'MVP',thr:30,desc:'Minimum Viable Product launched!'},
{name:'Beta',thr:60,desc:'Beta release - early adopters incoming!'},
{name:'V1.0',thr:100,desc:'Version 1.0 shipped!'},
{name:'Scale',thr:150,desc:'Platform scaling up!'},
{name:'Transcend',thr:200,desc:'Product has transcended!'},
];

// EMPLOYEE TYPES
const EMP_TYPES=[
{role:'Developer',cost:300,icon:'dev',effect:'product',color:'#58b868'},
{role:'Salesperson',cost:300,icon:'sales',effect:'customers',color:'#e94560'},
{role:'Designer',cost:250,icon:'design',effect:'morale',color:'#c850c0'},
{role:'Marketer',cost:350,icon:'market',effect:'revenue',color:'#f0c040'},
];

// RANDOM EVENTS
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
];

// CO-FOUNDER QUOTES
const COF_QUOTES=[
"I'm pivoting our synergy matrix...","Have you seen the burn rate dashboard?",
"I scheduled a meeting about meetings.","The blockchain angle could work...",
"I updated the pitch deck. Again.","I'm networking. Virtually.",
"Our TAM is basically infinite.","Working on something big. Can't say what.",
"I think we need more whiteboards.","Just vibing with the product roadmap.",
"The cap table is... interesting.","I'll handle the investor relations.",
"Did you read my 40-page strategy doc?","We should pivot. Or not. Let me think.",
"I'm optimizing our meeting cadence.","Trust the process.",
];

// INTERACTION ZONES
const ZONES=[
{x:2,y:2,w:2,h:2,name:'Dev Station',action:'work',desc:'Write code and build product'},
{x:13,y:2,w:2,h:2,name:'Sales Desk',action:'sell',desc:'Make calls and find customers'},
{x:6,y:2,w:1,h:1,name:'Whiteboard',action:'plan',desc:'Plan your strategy'},
{x:14,y:10,w:1,h:1,name:'Coffee Machine',action:'coffee',desc:'Grab some coffee'},
{x:5,y:10,w:1,h:1,name:'Lounge',action:'rest',desc:'Take a break'},
{x:13,y:11,w:2,h:2,name:'Meeting Room',action:'meet',desc:'Hold a team meeting'},
{x:9,y:12,w:1,h:1,name:'Door',action:'door',desc:'Step outside for air'},
];

// GAME STATE
let G={};
function newGame(){
G={
state:'title',day:1,hour:9,
cash:10000,burn:500,customers:0,product:0,morale:75,revenue:0,
team:[],maxTeam:6,
px:9*T+4,py:7*T+4,pDir:0,pFrame:0,pMoving:false,
cofX:3*T+4,cofY:7*T+4,cofDir:2,cofFrame:0,cofTimer:0,cofQuote:'',cofShowQuote:false,
menuOpen:false,menuIdx:0,menuPage:'main',
hireIdx:0,
msg:'',msgTimer:0,
eventActive:null,eventResult:'',
dialog:null,dialogIdx:0,
milestone:0,
profitDays:0,
victoryState:null,
log:[],
blinkTimer:0,
dayPhase:'morning',
actionCooldown:0,
};
}
newGame();

// INPUT
const keys={};
let justPressed={};
document.addEventListener('keydown',e=>{
if(!keys[e.key])justPressed[e.key]=true;
keys[e.key]=true;
e.preventDefault();
});
document.addEventListener('keyup',e=>{keys[e.key]=false;});
function wasPressed(k){return justPressed[k]||false;}

// SAVE/LOAD
function saveGame(){
const s={day:G.day,hour:G.hour,cash:G.cash,burn:G.burn,customers:G.customers,
product:G.product,morale:G.morale,revenue:G.revenue,team:G.team,
px:G.px,py:G.py,milestone:G.milestone,profitDays:G.profitDays,log:G.log.slice(-20)};
try{localStorage.setItem('saas_sim_save',JSON.stringify(s));return true;}catch(e){return false;}
}
function loadGame(){
try{
const raw=localStorage.getItem('saas_sim_save');
if(!raw)return false;
const s=JSON.parse(raw);
newGame();
Object.assign(G,s);
G.state='play';G.menuOpen=false;G.dialog=null;G.eventActive=null;G.victoryState=null;
G.cofX=3*T+4;G.cofY=7*T+4;G.cofDir=2;G.cofFrame=0;G.cofTimer=0;
G.cofQuote='';G.cofShowQuote=false;G.pDir=0;G.pFrame=0;G.pMoving=false;
G.blinkTimer=0;G.actionCooldown=0;G.dayPhase='morning';
G.menuPage='main';G.menuIdx=0;G.hireIdx=0;
return true;
}catch(e){return false;}
}
function hasSave(){return !!localStorage.getItem('saas_sim_save');}
function deleteSave(){localStorage.removeItem('saas_sim_save');}

// DRAWING HELPERS
function drawRect(x,y,w,h,c){B.fillStyle=c;B.fillRect(x,y,w,h);}
function drawText(txt,x,y,c,sz,align){
B.fillStyle=c||PAL.wh;
B.font=(sz||8)+'px monospace';
B.textAlign=align||'left';
B.textBaseline='top';
B.fillText(txt,x,y);
}
function drawTextShadow(txt,x,y,c,sz,align){
drawText(txt,x+1,y+1,'#000000',sz,align);
drawText(txt,x,y,c,sz,align);
}

// TILE RENDERING
function drawTile(tx,ty){
const x=tx*T,y=ty*T;
const t=map[ty][tx];
// Floor base
const checker=(tx+ty)%2===0;
drawRect(x,y,T,T,checker?PAL.flA:PAL.flB);
switch(t){
case TL.WALLT:
drawRect(x,y,T,T,PAL.wT);
drawRect(x,y+12,T,4,'#3a2060');
drawRect(x,y,T,2,'#6a44a3');
break;
case TL.WALLF:
drawRect(x,y,T,T,PAL.wF);
drawRect(x,y,1,T,'#252540');
drawRect(x+T-1,y,1,T,'#252540');
break;
case TL.DESK:
drawRect(x+1,y+2,T-2,T-4,PAL.dk);
drawRect(x+1,y+2,T-2,2,PAL.dkT);
drawRect(x+1,y+T-4,T-2,2,PAL.dkL);
// Monitor
drawRect(x+4,y+3,8,6,PAL.mon);
drawRect(x+5,y+4,6,4,PAL.mG);
drawRect(x+7,y+9,2,2,'#555');
break;
case TL.CHAIR:
drawRect(x+3,y+2,10,12,PAL.chr);
drawRect(x+4,y+3,8,4,PAL.chrS);
drawRect(x+5,y+8,6,5,'#2a2a50');
break;
case TL.TEAMD:
drawRect(x,y,T,T,PAL.dk);
drawRect(x,y,T,2,PAL.dkT);
drawRect(x+3,y+3,4,4,PAL.mG);
drawRect(x+9,y+3,4,4,PAL.mG);
drawRect(x+2,y+10,5,3,'#777');
drawRect(x+9,y+10,5,3,'#777');
break;
case TL.PLANT:
drawRect(x+5,y+8,6,7,PAL.pot);
drawRect(x+3,y+2,10,8,PAL.pl);
drawRect(x+5,y+1,6,4,'#3aab50');
drawRect(x+7,y+0,2,2,PAL.pl);
break;
case TL.COFFEE:
drawRect(x+2,y+4,12,11,PAL.cfe);
drawRect(x+2,y+4,12,2,'#7b5433');
drawRect(x+4,y+1,3,4,PAL.mug);
drawRect(x+9,y+1,3,4,PAL.mug);
// Steam
if(Math.random()>0.5){drawRect(x+5,y-1,1,2,'#ffffff44');drawRect(x+10,y-1,1,2,'#ffffff44');}
break;
case TL.DOOR:
drawRect(x+2,y,12,T,'#8b6914');
drawRect(x+4,y+2,8,T-2,'#a07818');
drawRect(x+10,y+7,2,2,'#f0c040');
break;
case TL.RUG:
drawRect(x,y,T,T,PAL.rug);
if((tx+ty)%3===0)drawRect(x+2,y+2,T-4,T-4,PAL.rugB);
break;
case TL.WBOARD:
drawRect(x+1,y+1,T-2,T-3,PAL.wb);
drawRect(x+1,y+1,T-2,1,PAL.wbB);
drawRect(x+1,y+T-3,T-2,1,PAL.wbB);
drawRect(x+3,y+4,4,1,PAL.hRd);
drawRect(x+3,y+7,6,1,PAL.hGr);
drawRect(x+3,y+10,3,1,'#4488ee');
break;
case TL.COUCH:
drawRect(x+1,y+3,T-2,T-4,'#554477');
drawRect(x+1,y+3,3,T-4,'#665588');
drawRect(x+T-4,y+3,3,T-4,'#665588');
drawRect(x+2,y+5,T-4,T-8,'#443366');
break;
case TL.WINDOW:
drawRect(x,y,T,T,PAL.wT);
drawRect(x+2,y+2,T-4,T-6,PAL.win);
drawRect(x+2,y+2,T-4,2,PAL.winL);
drawRect(x+T/2-1,y+2,2,T-6,'#fff4');
drawRect(x+2,y+T/2,T-4,1,'#fff3');
break;
case TL.TRIM:
drawRect(x,y,T,T,'#3d3d5e');
drawRect(x,y,T,3,'#4d4d6e');
drawRect(x,y+T-2,T,2,'#2d2d4e');
break;
}
}

// CHARACTER DRAWING
function drawCharBody(x,y,dir,frame,hoodieCol,hoodieD,skinCol,hairCol,isCofounder){
const bx=Math.floor(x),by=Math.floor(y);
const bob=frame%2===0?0:-1;
// Shadow
drawRect(bx-4,by+10,10,3,PAL.sh);
// Body
const bodyY=by+bob;
// Legs
if(dir===0||dir===2){
drawRect(bx-2,bodyY+8,3,4,PAL.pnt);
drawRect(bx+1,bodyY+8,3,4,PAL.pnt);
}else{
drawRect(bx-1,bodyY+8,4,4,PAL.pnt);
}
// Torso
drawRect(bx-3,bodyY+1,8,8,hoodieCol);
drawRect(bx-3,bodyY+1,8,1,hoodieD);
// Head
drawRect(bx-2,bodyY-5,6,7,skinCol);
// Eyes
if(dir===0){
drawRect(bx-1,bodyY-3,2,2,'#222');
drawRect(bx+2,bodyY-3,2,2,'#222');
// Mouth
drawRect(bx,bodyY-1,2,1,'#c88');
}else if(dir===2){
drawRect(bx-1,bodyY-4,6,2,hairCol);
drawRect(bx-2,bodyY-5,6,2,hairCol);
}else if(dir===1){
drawRect(bx,bodyY-3,2,2,'#222');
drawRect(bx-1,bodyY-4,5,2,hairCol);
}else{
drawRect(bx,bodyY-3,2,2,'#222');
drawRect(bx-1,bodyY-4,5,2,hairCol);
}
// Hair top
if(dir===0){
drawRect(bx-2,bodyY-6,6,2,hairCol);
}else{
drawRect(bx-2,bodyY-6,6,2,hairCol);
}
// Hoodie detail
if(!isCofounder){
drawRect(bx-1,bodyY+3,1,1,'#fff3');
drawRect(bx+2,bodyY+3,1,1,'#fff3');
}
}

function drawPlayer(){
drawCharBody(G.px,G.py,G.pDir,G.pFrame,PAL.hd,PAL.hdD,PAL.skin,PAL.hair,false);
}

function drawCofounder(){
drawCharBody(G.cofX,G.cofY,G.cofDir,G.cofFrame,PAL.coShirt,'#333355',PAL.coSkin,'#2a1a0a',true);
// Name tag
if(Math.abs(G.px-G.cofX)<30&&Math.abs(G.py-G.cofY)<30){
drawTextShadow('Co-Founder',Math.floor(G.cofX)-16,Math.floor(G.cofY)-16,PAL.neu,7,'left');
}
}

// HUD
function drawHUD(){
const hh=28;
drawRect(0,0,NW,hh,PAL.hBg);
drawRect(0,hh,NW,1,'#58b86844');
// Day
drawTextShadow('Day '+G.day,4,3,PAL.hGr,8);
drawTextShadow(G.hour+':00',4,14,PAL.neu,7);
// Cash
const cashCol=G.cash<2000?PAL.hRd:(G.cash<5000?PAL.hYl:PAL.hGr);
drawTextShadow('$'+G.cash.toLocaleString(),60,3,cashCol,8);
// Burn
drawTextShadow('Burn: $'+G.burn+'/d',60,14,PAL.hRd,7);
// Customers
drawTextShadow('Cust: '+G.customers,150,3,PAL.pos,8);
// Product
drawTextShadow('Prod: '+G.product,150,14,PAL.hGr,7);
// Morale bar
drawTextShadow('Morale',230,3,PAL.neu,7);
drawRect(230,13,60,5,'#333');
const mw=Math.floor(60*(G.morale/100));
const mc=G.morale>60?PAL.hGr:(G.morale>30?PAL.hYl:PAL.hRd);
drawRect(230,13,mw,5,mc);
// Team count
drawTextShadow('Team:'+G.team.length,295,3,PAL.neu,7,'right');
}

// INTERACTION PROMPTS
function getPlayerZone(){
const ptx=Math.floor(G.px/T),pty=Math.floor(G.py/T);
for(const z of ZONES){
if(ptx>=z.x&&ptx<z.x+z.w&&pty>=z.y&&pty<z.y+z.h)return z;
}
return null;
}

function drawInteractionPrompt(){
const z=getPlayerZone();
if(z&&!G.menuOpen&&!G.dialog&&!G.eventActive){
const bx=Math.floor(G.px)-30,by=Math.floor(G.py)-22;
drawRect(bx,by,62,12,'#000000aa');
drawRect(bx,by,62,1,PAL.dBd);
drawText('[E] '+z.name,bx+2,by+2,PAL.dTx,7);
}
// Co-founder interaction
if(!G.menuOpen&&!G.dialog&&!G.eventActive){
if(Math.abs(G.px-G.cofX)<24&&Math.abs(G.py-G.cofY)<24){
const bx=Math.floor(G.cofX)-20,by=Math.floor(G.cofY)-24;
drawRect(bx,by,42,10,'#000000aa');
drawText('[E] Talk',bx+2,by+1,PAL.hYl,7);
}
}
}

// MESSAGE SYSTEM
function showMsg(txt,dur){G.msg=txt;G.msgTimer=dur||120;}
function drawMsg(){
if(G.msgTimer<=0)return;
const w=Math.min(G.msg.length*5+16,NW-20);
const x=(NW-w)/2,y=NH-40;
drawRect(x,y,w,16,'#000000cc');
drawRect(x,y,w,1,PAL.dBd);
drawText(G.msg,x+8,y+4,PAL.dTx,7,'left');
}

// DIALOG SYSTEM
function showDialog(title,lines,onClose){
G.dialog={title,lines,idx:0,onClose:onClose||null};
}
function drawDialog(){
if(!G.dialog)return;
const d=G.dialog;
const w=240,h=80;
const x=(NW-w)/2,y=NH-h-10;
drawRect(x,y,w,h,PAL.dBg);
drawRect(x,y,w,1,PAL.dBd);
drawRect(x,y+h-1,w,1,PAL.dBd);
drawRect(x,y,1,h,PAL.dBd);
drawRect(x+w-1,y,1,h,PAL.dBd);
drawTextShadow(d.title,x+8,y+6,PAL.hGd,8);
drawRect(x+4,y+16,w-8,1,PAL.dBd+'44');
const line=d.lines[d.idx]||'';
// Word wrap
const maxCh=38;
const words=line.split(' ');
let ly=y+22,cl='';
for(const wd of words){
if((cl+' '+wd).trim().length>maxCh){
drawText(cl.trim(),x+8,ly,PAL.dTx,7);
ly+=10;cl=wd;
}else{cl=(cl+' '+wd).trim();}
}
if(cl)drawText(cl,x+8,ly,PAL.dTx,7);
// Prompt
const more=d.idx<d.lines.length-1;
const pTxt=more?'[SPACE] Next...':'[SPACE] Close';
const blink=Math.floor(G.blinkTimer/20)%2===0;
if(blink)drawText(pTxt,x+w-8,y+h-12,PAL.neu,7,'right');
}

// MENU SYSTEM
function drawMenu(){
if(!G.menuOpen)return;
const w=200,h=160;
const x=(NW-w)/2,y=(NH-h)/2;
drawRect(x-2,y-2,w+4,h+4,'#000');
drawRect(x,y,w,h,PAL.dBg);
drawRect(x,y,w,1,PAL.dBd);
drawRect(x,y+h-1,w,1,PAL.dBd);
if(G.menuPage==='main'){
drawTextShadow('STARTUP MENU',x+w/2,y+6,PAL.hGd,8,'center');
const items=['Continue Day','Hire Employee','View Team','End Day','Save Game','Quit to Title'];
for(let i=0;i<items.length;i++){
const sel=G.menuIdx===i;
const iy=y+22+i*20;
if(sel)drawRect(x+4,iy-2,w-8,16,PAL.dBd+'33');
drawText((sel?'> ':' ')+items[i],x+12,iy,sel?PAL.hGd:PAL.dTx,8);
}
}else if(G.menuPage==='hire'){
drawTextShadow('HIRE EMPLOYEE',x+w/2,y+6,PAL.hGd,8,'center');
drawText('Cash: $'+G.cash.toLocaleString(),x+12,y+18,PAL.hGr,7);
for(let i=0;i<EMP_TYPES.length;i++){
const et=EMP_TYPES[i];
const sel=G.hireIdx===i;
const iy=y+32+i*28;
if(sel)drawRect(x+4,iy-2,w-8,24,PAL.dBd+'33');
drawText((sel?'> ':' ')+et.role,x+12,iy,sel?et.color:PAL.dTx,8);
drawText(' $'+et.cost+'/day - Boosts '+et.effect,x+22,iy+11,PAL.neu,7);
}
const canAfford=G.team.length<G.maxTeam;
drawText(canAfford?'[ENTER] Hire  [ESC] Back':'Team is full!',x+12,y+h-16,canAfford?PAL.neu:PAL.hRd,7);
}else if(G.menuPage==='team'){
drawTextShadow('YOUR TEAM ('+G.team.length+'/'+G.maxTeam+')',x+w/2,y+6,PAL.hGd,8,'center');
if(G.team.length===0){
drawText('No employees yet.',x+12,y+30,PAL.neu,7);
}else{
for(let i=0;i<G.team.length;i++){
const emp=G.team[i];
const iy=y+24+i*18;
const sel=G.menuIdx===i;
if(sel)drawRect(x+4,iy-2,w-8,16,PAL.dBd+'22');
const et=EMP_TYPES.find(e=>e.role===emp.role);
drawText((sel?'> ':' ')+emp.role,x+12,iy,et?et.color:PAL.dTx,8);
drawText(' $'+emp.cost+'/d',x+100,iy,PAL.hRd,7);
}
}
drawText('[F] Fire selected  [ESC] Back',x+12,y+h-16,PAL.neu,7);
}
}

// EVENT POPUP
function drawEvent(){
if(!G.eventActive)return;
const ev=G.eventActive;
const w=220,h=80;
const x=(NW-w)/2,y=(NH-h)/2;
drawRect(x-2,y-2,w+4,h+4,'#000');
drawRect(x,y,w,h,'#1a1a2eee');
drawRect(x,y,w,2,PAL.hYl);
drawTextShadow('EVENT: '+ev.name,x+w/2,y+8,PAL.hYl,8,'center');
drawText(ev.desc,x+10,y+24,PAL.dTx,7);
drawText('Result: '+G.eventResult,x+10,y+40,PAL.pos,7);
const blink=Math.floor(G.blinkTimer/20)%2===0;
if(blink)drawText('[SPACE] Continue',x+w/2,y+h-14,PAL.neu,7,'center');
}

// VICTORY SCREEN
function drawVictory(){
if(!G.victoryState)return;
const v=G.victoryState;
const tints={ipo:PAL.vIPO,profit:PAL.vPr,rd:PAL.vRD,world:PAL.vWd};
const names={ipo:'IPO GLORY',profit:'PROFIT MACHINE',rd:'R&D UTOPIA',world:'WORLD DOMINATION'};
const descs={
ipo:'Your company went public! Investors are thrilled!',
profit:'Sustainable profits! A lean, mean SaaS machine!',
rd:'A research powerhouse! Innovation knows no bounds!',
world:'Total market domination! You rule the SaaS world!'
};
const col=tints[v]||PAL.hGd;
// Full screen overlay
drawRect(0,0,NW,NH,PAL.bg+'dd');
// Glowing border
for(let i=0;i<3;i++){
B.strokeStyle=col+((i===0)?'88':'44');
B.lineWidth=1;
B.strokeRect(10+i*4,20+i*4,NW-20-i*8,NH-40-i*8);
}
drawTextShadow('VICTORY!',NW/2,40,col,8,'center');
drawTextShadow(names[v]||'',NW/2,56,col,8,'center');
drawText(descs[v]||'',NW/2,76,PAL.dTx,7,'center');
// Stats
drawText('Days: '+G.day,NW/2-50,100,PAL.neu,7);
drawText('Cash: $'+G.cash.toLocaleString(),NW/2-50,112,PAL.hGr,7);
drawText('Customers: '+G.customers,NW/2-50,124,PAL.pos,7);
drawText('Product: '+G.product,NW/2-50,136,PAL.hGr,7);
drawText('Team Size: '+G.team.length,NW/2-50,148,PAL.neu,7);
const blink=Math.floor(G.blinkTimer/15)%2===0;
if(blink)drawTextShadow('[ENTER] New Game',NW/2,175,col,8,'center');
drawText('[S] Save Score',NW/2,190,PAL.neu,7,'center');
}

// TITLE SCREEN
let titleIdx=0;
function drawTitle(){
drawRect(0,0,NW,NH,PAL.bg);
// Stars
for(let i=0;i<40;i++){
const sx=(i*37+i*i*13)%NW;
const sy=(i*23+i*i*7)%NH;
const bright=Math.sin(G.blinkTimer*0.05+i)*0.5+0.5;
if(bright>0.3)drawRect(sx,sy,1,1,'#ffffff'+(Math.floor(bright*9))+'0');
}
// Office silhouette
drawRect(40,120,240,80,'#151530');
for(let i=0;i<12;i++){
const wx=50+i*20;
const lit=Math.sin(G.blinkTimer*0.02+i)>0;
drawRect(wx,130,12,14,lit?'#3a5a3a':'#1a2a2a');
if(lit)drawRect(wx+2,132,8,10,PAL.mG+'66');
}
// Title
drawTextShadow('SaaS STARTUP',NW/2,30,PAL.hGd,8,'center');
drawTextShadow('SIMULATOR',NW/2,44,PAL.hGr,8,'center');
// Subtitle
drawText('A 16-bit entrepreneurship adventure',NW/2,62,PAL.neu,7,'center');
// Menu
const items=hasSave()?['New Game','Continue','Controls']:['New Game','Controls'];
for(let i=0;i<items.length;i++){
const sel=titleIdx===i;
const iy=90+i*16;
if(sel){
drawRect(NW/2-50,iy-2,100,14,PAL.dBd+'22');
const blink=Math.floor(G.blinkTimer/10)%2===0;
if(blink)drawText('>',NW/2-46,iy,PAL.hGd,8);
}
drawText(items[i],NW/2-30,iy,sel?PAL.hGd:PAL.dTx,8);
}
drawText('v0.19 - Angel Funded Edition',NW/2,NH-14,PAL.neu,7,'center');
}

// CONTROLS SCREEN
function drawControls(){
drawRect(0,0,NW,NH,PAL.bg);
drawTextShadow('CONTROLS',NW/2,20,PAL.hGd,8,'center');
const lines=[
'Arrow Keys / WASD - Move',
'E - Interact with objects / NPCs',
'TAB - Open Startup Menu',
'SPACE - Advance dialog / Confirm',
'ENTER - Select menu option',
'ESC - Close menu / Go back',
'','',
'GOAL: Build your SaaS startup from',
'nothing to glory! Manage cash, hire',
'a team, build product, and find',
'customers before you run out of money.',
'','Four victory paths await...',
];
for(let i=0;i<lines.length;i++){
drawText(lines[i],30,40+i*12,PAL.dTx,7);
}
const blink=Math.floor(G.blinkTimer/20)%2===0;
if(blink)drawText('[ESC] Back',NW/2,NH-20,PAL.neu,7,'center');
}

// GAME OVER
function drawGameOver(){
drawRect(0,0,NW,NH,'#0a0a15ee');
drawTextShadow('GAME OVER',NW/2,50,PAL.hRd,8,'center');
drawText('Your startup ran out of cash!',NW/2,70,PAL.dTx,7,'center');
drawText('You survived '+G.day+' days.',NW/2,86,PAL.neu,7,'center');
drawText('Peak Customers: '+G.customers,NW/2,100,PAL.pos,7);
drawText('Product Level: '+G.product,NW/2,112,PAL.hGr,7);
const blink=Math.floor(G.blinkTimer/15)%2===0;
if(blink)drawTextShadow('[ENTER] Try Again',NW/2,145,PAL.hYl,8,'center');
}

// MOVEMENT & COLLISION
function movePlayer(dt){
if(G.menuOpen||G.dialog||G.eventActive||G.victoryState)return;
let dx=0,dy=0;
const spd=1.5;
if(keys['ArrowUp']||keys['w']||keys['W'])dy=-spd;
if(keys['ArrowDown']||keys['s']||keys['S'])dy=spd;
if(keys['ArrowLeft']||keys['a']||keys['A'])dx=-spd;
if(keys['ArrowRight']||keys['d']||keys['D'])dx=spd;
if(dx!==0&&dy!==0){dx*=0.707;dy*=0.707;}
G.pMoving=dx!==0||dy!==0;
if(dx>0)G.pDir=1;
if(dx<0)G.pDir=3;
if(dy<0)G.pDir=2;
if(dy>0)G.pDir=0;
if(G.pMoving){
G.pFrame+=0.15;
// Collision X
let nx=G.px+dx;
const tx1=Math.floor((nx-4)/T),tx2=Math.floor((nx+4)/T);
const ty1=Math.floor((G.py)/T),ty2=Math.floor((G.py+8)/T);
if(!isSolid(tx1,ty1)&&!isSolid(tx2,ty1)&&!isSolid(tx1,ty2)&&!isSolid(tx2,ty2)){
G.px=nx;
}
// Collision Y
let ny=G.py+dy;
const tx3=Math.floor((G.px-4)/T),tx4=Math.floor((G.px+4)/T);
const ty3=Math.floor((ny)/T),ty4=Math.floor((ny+8)/T);
if(!isSolid(tx3,ty3)&&!isSolid(tx4,ty3)&&!isSolid(tx3,ty4)&&!isSolid(tx4,ty4)){
G.py=ny;
}
// Bounds
G.px=Math.max(8,Math.min(MW*T-8,G.px));
G.py=Math.max(20,Math.min(MH*T-8,G.py));
}
}

// CO-FOUNDER AI
function updateCofounder(){
G.cofTimer++;
if(G.cofTimer%120===0){
const dirs=[0,1,2,3];
G.cofDir=dirs[Math.floor(Math.random()*4)];
}
if(G.cofTimer%60===0){
const dx=[0,1,0,-1][G.cofDir]*0.8;
const dy=[1,0,-1,0][G.cofDir]*0.8;
let nx=G.cofX+dx*8,ny=G.cofY+dy*8;
const tx1=Math.floor((nx-4)/T),tx2=Math.floor((nx+4)/T);
const ty1=Math.floor(ny/T),ty2=Math.floor((ny+8)/T);
if(!isSolid(tx1,ty1)&&!isSolid(tx2,ty1)&&!isSolid(tx1,ty2)&&!isSolid(tx2,ty2)
&&nx>16&&nx<MW*T-16&&ny>30&&ny<MH*T-16){
G.cofX=nx;G.cofY=ny;G.cofFrame++;
}
}
if(G.cofShowQuote){
const bx=Math.floor(G.cofX)-40,by=Math.floor(G.cofY)-32;
const w=Math.min(G.cofQuote.length*5+8,120);
drawRect(bx,by,w,12,'#000000cc');
drawText(G.cofQuote,bx+4,by+2,PAL.hYl,7);
}
}

// ACTIONS
function doAction(zone){
if(G.actionCooldown>0)return;
G.actionCooldown=30;
switch(zone.action){
case 'work':
G.product+=2;
if(G.morale>50)G.product+=1;
showMsg('Wrote some code! Product +'+((G.morale>50)?3:2),90);
G.hour++;
break;
case 'sell':
const newCust=Math.floor(Math.random()*3)+1;
G.customers+=newCust;
showMsg('Made sales calls! Customers +'+newCust,90);
G.hour++;
break;
case 'plan':
G.product+=1;G.morale=Math.min(100,G.morale+3);
showMsg('Strategic planning! Product +1, Morale +3',90);
G.hour++;
break;
case 'coffee':
G.morale=Math.min(100,G.morale+5);
showMsg('Coffee break! Morale +5',90);
break;
case 'rest':
G.morale=Math.min(100,G.morale+8);
showMsg('Relaxed on the couch. Morale +8',90);
G.hour++;
break;
case 'meet':
if(G.team.length>0){
G.morale=Math.min(100,G.morale+5);
G.product+=G.team.filter(e=>e.role==='Developer').length;
showMsg('Team sync complete! Morale +5',90);
}else{
showMsg('No team to meet with yet!',90);
}
G.hour++;
break;
case 'door':
showMsg('Fresh air! The startup grind continues...',90);
G.morale=Math.min(100,G.morale+2);
break;
}
}

// DAY PROCESSING
function processDay(){
// Team contributions
for(const emp of G.team){
switch(emp.role){
case 'Developer':G.product+=3;break;
case 'Salesperson':G.customers+=Math.floor(Math.random()*3)+1;break;
case 'Designer':G.morale=Math.min(100,G.morale+4);G.product+=1;break;
case 'Marketer':G.customers+=2;G.cash+=500;break;
}
}
// Revenue from customers
G.revenue=G.customers*50;
G.cash+=G.revenue;
// Burn rate
G.burn=500;
for(const emp of G.team)G.burn+=emp.cost;
G.cash-=G.burn;
// Morale decay
G.morale=Math.max(0,G.morale-2);
if(G.morale<20){G.product=Math.max(0,G.product-1);}
// Check milestones
while(G.milestone<MILESTONES.length&&G.product>=MILESTONES[G.milestone].thr){
const m=MILESTONES[G.milestone];
G.log.push('Day '+G.day+': '+m.name+' reached!');
showDialog('MILESTONE: '+m.name,[m.desc,'Product level: '+G.product]);
G.milestone++;
}
// Track profit days
if(G.revenue>G.burn)G.profitDays++;
else G.profitDays=0;
// Random event (30% chance)
if(Math.random()<0.3&&!G.dialog){
const ev=EVENTS[Math.floor(Math.random()*EVENTS.length)];
G.eventResult=ev.effect(G);
G.eventActive=ev;
G.log.push('Day '+G.day+': '+ev.name+' - '+G.eventResult);
}
// Victory check
checkVictory();
// Game over check
if(G.cash<0&&!G.victoryState){
G.state='gameover';
return;
}
// Auto-save
saveGame();
// Advance day
G.day++;G.hour=9;
G.log.push('Day '+G.day+' started. Cash: $'+G.cash.toLocaleString());
}

function checkVictory(){
// Priority order: World Dom > IPO > R&D > Profit
if(G.customers>=100&&G.team.length>=5){
G.victoryState='world';
}else if(G.cash>=50000&&G.customers>=50){
G.victoryState='ipo';
}else if(G.product>=200&&G.morale>=80){
G.victoryState='rd';
}else if(G.cash>=30000&&G.profitDays>=10){
G.victoryState='profit';
}
}

// MAIN UPDATE
function update(){
G.blinkTimer++;
if(G.actionCooldown>0)G.actionCooldown--;
if(G.msgTimer>0)G.msgTimer--;
if(G.state==='title'){
const items=hasSave()?3:2;
if(wasPressed('ArrowUp')||wasPressed('w'))titleIdx=(titleIdx-1+items)%items;
if(wasPressed('ArrowDown')||wasPressed('s'))titleIdx=(titleIdx+1)%items;
if(wasPressed('Enter')||wasPressed(' ')){
if(hasSave()){
if(titleIdx===0){newGame();G.state='play';showMsg('Welcome to your startup!',120);}
else if(titleIdx===1){if(loadGame())showMsg('Game loaded! Day '+G.day,120);else{newGame();G.state='play';}}
else if(titleIdx===2){G.state='controls';}
}else{
if(titleIdx===0){newGame();G.state='play';showMsg('Welcome to your startup!',120);}
else if(titleIdx===1){G.state='controls';}
}
}
}else if(G.state==='controls'){
if(wasPressed('Escape')||wasPressed('Enter')){G.state='title';}
}else if(G.state==='gameover'){
if(wasPressed('Enter')){newGame();G.state='title';titleIdx=0;}
}else if(G.state==='play'){
// Victory input
if(G.victoryState){
if(wasPressed('Enter')){
deleteSave();newGame();G.state='title';titleIdx=0;
}
return;
}
// Event popup
if(G.eventActive){
if(wasPressed(' ')||wasPressed('Enter')){G.eventActive=null;}
return;
}
// Dialog
if(G.dialog){
if(wasPressed(' ')||wasPressed('Enter')){
G.dialog.idx++;
if(G.dialog.idx>=G.dialog.lines.length){
const cb=G.dialog.onClose;
G.dialog=null;
if(cb)cb();
}
}
return;
}
// Menu
if(wasPressed('Tab')||wasPressed('Escape')&&G.menuOpen){
if(G.menuOpen){
if(G.menuPage!=='main'){G.menuPage='main';G.menuIdx=0;}
else G.menuOpen=false;
}else{
G.menuOpen=true;G.menuPage='main';G.menuIdx=0;
}
}
if(G.menuOpen){
if(G.menuPage==='main'){
if(wasPressed('ArrowUp')||wasPressed('w'))G.menuIdx=(G.menuIdx-1+6)%6;
if(wasPressed('ArrowDown')||wasPressed('s'))G.menuIdx=(G.menuIdx+1)%6;
if(wasPressed('Enter')||wasPressed(' ')){
switch(G.menuIdx){
case 0:G.menuOpen=false;break;
case 1:G.menuPage='hire';G.hireIdx=0;break;
case 2:G.menuPage='team';G.menuIdx=0;break;
case 3:// End day
G.menuOpen=false;
processDay();
break;
case 4:// Save
if(saveGame())showMsg('Game saved!',90);
G.menuOpen=false;
break;
case 5:// Quit
G.menuOpen=false;G.state='title';titleIdx=0;
break;
}
}
if(wasPressed('Escape'))G.menuOpen=false;
}else if(G.menuPage==='hire'){
if(wasPressed('ArrowUp')||wasPressed('w'))G.hireIdx=(G.hireIdx-1+EMP_TYPES.length)%EMP_TYPES.length;
if(wasPressed('ArrowDown')||wasPressed('s'))G.hireIdx=(G.hireIdx+1)%EMP_TYPES.length;
if(wasPressed('Enter')){
const et=EMP_TYPES[G.hireIdx];
if(G.team.length>=G.maxTeam){showMsg('Team is full!',90);}
else if(G.cash<et.cost*5){showMsg('Need at least $'+(et.cost*5)+' to hire!',90);}
else{
G.team.push({role:et.role,cost:et.cost});
showMsg('Hired a '+et.role+'!',90);
G.log.push('Day '+G.day+': Hired '+et.role);
}
}
if(wasPressed('Escape')){G.menuPage='main';G.menuIdx=1;}
}else if(G.menuPage==='team'){
if(G.team.length>0){
if(wasPressed('ArrowUp')||wasPressed('w'))G.menuIdx=(G.menuIdx-1+G.team.length)%G.team.length;
if(wasPressed('ArrowDown')||wasPressed('s'))G.menuIdx=(G.menuIdx+1)%G.team.length;
if(wasPressed('f')||wasPressed('F')){
if(G.team.length>0){
const fired=G.team.splice(G.menuIdx,1)[0];
showMsg('Fired '+fired.role,90);
G.log.push('Day '+G.day+': Fired '+fired.role);
G.menuIdx=Math.min(G.menuIdx,G.team.length-1);
if(G.menuIdx<0)G.menuIdx=0;
}
}
}
if(wasPressed('Escape')){G.menuPage='main';G.menuIdx=2;}
}
return;
}
// Movement
movePlayer();
// Interaction
if(wasPressed('e')||wasPressed('E')){
// Check co-founder
if(Math.abs(G.px-G.cofX)<24&&Math.abs(G.py-G.cofY)<24){
G.cofQuote=COF_QUOTES[Math.floor(Math.random()*COF_QUOTES.length)];
G.cofShowQuote=true;
setTimeout(()=>{G.cofShowQuote=false;},3000);
showDialog('Co-Founder',[G.cofQuote]);
}else{
const z=getPlayerZone();
if(z)doAction(z);
}
}
// Auto end day at 18:00
if(G.hour>=18){
showDialog('End of Day '+G.day,['Time to wrap up! Processing day...'],()=>{processDay();});
}
}
justPressed={};
}

// MAIN RENDER
function render(){
B.clearRect(0,0,NW,NH);
if(G.state==='title'){
drawTitle();
}else if(G.state==='controls'){
drawControls();
}else if(G.state==='gameover'){
// Draw office behind
for(let ty=0;ty<MH;ty++)for(let tx=0;tx<MW;tx++)drawTile(tx,ty);
drawGameOver();
}else if(G.state==='play'){
// Draw map
for(let ty=0;ty<MH;ty++){
for(let tx=0;tx<MW;tx++){
drawTile(tx,ty);
}
}
// Draw characters sorted by Y
const chars=[
{y:G.py,draw:drawPlayer},
{y:G.cofY,draw:drawCofounder},
];
// Draw team members at desks
const deskPositions=[
{x:3*T+8,y:3*T+8},{x:14*T+8,y:3*T+8},
{x:3*T+8,y:12*T+8},{x:14*T+8,y:12*T+8},
{x:5*T+8,y:5*T+8},{x:15*T+8,y:5*T+8},
];
for(let i=0;i<G.team.length&&i<deskPositions.length;i++){
const dp=deskPositions[i];
const emp=G.team[i];
const et=EMP_TYPES.find(e=>e.role===emp.role);
const col=et?et.color:'#888';
chars.push({y:dp.y,draw:()=>{
drawCharBody(dp.x,dp.y,0,0,col,col+'aa',PAL.skin,'#5a3a1a',true);
drawText(emp.role.substring(0,3),dp.x-6,dp.y-16,col,6);
}});
}
chars.sort((a,b)=>a.y-b.y);
for(const c of chars)c.draw();
// UI layers
drawHUD();
drawInteractionPrompt();
drawMsg();
drawMenu();
drawDialog();
drawEvent();
drawVictory();
// Custom cursor
const mx=Math.floor(mouseX/SC),my=Math.floor(mouseY/SC);
drawRect(mx-1,my-4,2,9,PAL.wh);
drawRect(mx-4,my-1,9,2,PAL.wh);
}
// Scale to main canvas
ctx.imageSmoothingEnabled=false;
ctx.drawImage(buf,0,0,NW,NH,0,0,NW*SC,NH*SC);
}

// Mouse tracking for cursor
let mouseX=0,mouseY=0;
canvas.addEventListener('mousemove',e=>{
const r=canvas.getBoundingClientRect();
mouseX=e.clientX-r.left;mouseY=e.clientY-r.top;
});

// GAME LOOP
let lastTime=0;
function gameLoop(ts){
const dt=ts-lastTime;
lastTime=ts;
update();
render();
requestAnimationFrame(gameLoop);
}
requestAnimationFrame(gameLoop);
</script>
</body>
</html>