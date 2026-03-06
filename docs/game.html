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
// ============================================================
// SaaS STARTUP SIMULATOR — Round 17
// ============================================================
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
wT:'#533483',wF:'#2e2e4e',wTr:'#58b868',
dk:'#5c4033',dkT:'#7a5a42',dkL:'#4a3028',
mon:'#1a1a2e',mG:'#58b868',mGl:'#a8e6a3',
chr:'#333355',chrS:'#3d3d60',
skin:'#f5c8a0',hd:'#4466aa',hdD:'#335599',
hair:'#3a2a1a',pnt:'#2a2a4a',shoe:'#1a1a2e',
cof:'#555577',cofH:'#665577',cofM:'#9944cc',cofMl:'#bb77ee',
dBg:'#1a1a2eee',dBd:'#58b868',dTx:'#f5f0e1',
hBg:'#0f0f1acc',hTx:'#f5f0e1',hGr:'#58b868',
hRd:'#e94560',hYl:'#f0c040',hGd:'#f5c842',
apF:'#58b868',apE:'#555566',
pos:'#4ecca3',acc:'#e94560',neu:'#a8a8b3',
wh:'#eaeaea',sh:'#00000044',
pl:'#2e8b40',plD:'#1e6b30',pot:'#8b5e3c',potD:'#6b4e2c',
rug:'#3a2255',rugB:'#4a3265',
win:'#4488cc',winL:'#88bbee',
wb:'#d0d0e0',wbB:'#888899',
cfe:'#6b4423',mug:'#ddddee',
vIPO:'#f5c842',vPr:'#58b868',vRD:'#4488ee',vWd:'#e94560',
};

// TILES
const T=16,MW=20,MH=14;
const TL={E:0,F:1,WT:2,WF:3,DK:4,CH:5,TM:6,PL:7,CF:8,DR:9,RG:10,WB:11,CM:12,WN:13,TR:14};
const SOL={0:1,1:0,2:1,3:1,4:1,5:0,6:1,7:1,8:1,9:0,10:0,11:1,12:1,13:1,14:1};
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
function gT(x,y){if(x<0||y<0||x>=MW||y>=MH)return TL.E;return map[y][x];}
function isSolid(x,y){return SOL[gT(x,y)]===1;}

// MILESTONES
const MILES=[
{name:'MVP',thr:30,ann:false,desc:'Minimum Viable Product launched!'},
{name:'Beta',thr:60,ann:false,desc:'Beta release - early adopters!'},
{name:'V1.0',thr:100,ann:false,desc:'Version 1.0 shipped!'},
{name:'Scale',thr:150,ann:false,desc:'Platform at scale!'},
{name:'Transcend',thr:200,ann:false,desc:'Product transcended the market!'},
];
function curMile(pts){let m=null;for(let i=MILES.length-1;i>=0;i--)if(pts>=MILES[i].thr){m=MILES[i];break;}return m;}
function nxtMile(pts){for(let i=0;i<MILES.length;i++)if(pts<MILES[i].thr)return MILES[i];return null;}

// GAME STATE
const GS={
state:'title', // title, playing, dialog, menu, hire, victory, stats, gameover
day:1, hour:9, ap:5, maxAp:5,
cash:50000, revenue:0, burn:500,
product:0, customers:0, morale:80,
employees:[], maxEmp:2,
cofStandUp:false, cofStandUpDay:-1,
dayLog:[], totalRevenue:0, totalSpent:0,
hiresDone:0, featuresShipped:0, coffeesDrunk:0,
victoryType:null,
dialogLines:[], dialogIdx:0, dialogCb:null,
menuIdx:0, menuItems:[],
hireOptions:[], hireIdx:0,
px:9*T+4, py:7*T+4, pDir:0, pFrame:0, pMoving:false,
animT:0, dayTrans:0, dayTransDir:0,
flash:null, flashT:0,
events:[], pendingEvent:null,
saveExists:false,
titleIdx:0,
};

// EMPLOYEE TYPES
const EMP_TYPES=[
{role:'Developer',cost:300,icon:'dev',effect:'product'},
{role:'Salesperson',cost:300,icon:'sales',effect:'customers'},
{role:'Designer',cost:250,icon:'design',effect:'morale'},
{role:'Marketer',cost:350,icon:'market',effect:'revenue'},
];

// RANDOM EVENTS
const EVENTS=[
{name:'Server Crash',desc:'Servers went down! Lost productivity.',effect:()=>{GS.product=Math.max(0,GS.product-5);return'-5 Product';}},
{name:'Viral Tweet',desc:'Your product went viral on social media!',effect:()=>{GS.customers+=8;return'+8 Customers';}},
{name:'Bug Report',desc:'Critical bug found. Engineers scrambling.',effect:()=>{GS.product=Math.max(0,GS.product-3);GS.morale=Math.max(0,GS.morale-10);return'-3 Product, -10 Morale';}},
{name:'Press Coverage',desc:'Tech blog featured your startup!',effect:()=>{GS.customers+=5;GS.cash+=2000;return'+5 Customers, +$2K';}},
{name:'Investor Interest',desc:'An angel investor noticed you!',effect:()=>{GS.cash+=10000;return'+$10K Cash';}},
{name:'Team Lunch',desc:'Great team bonding over pizza.',effect:()=>{GS.morale=Math.min(100,GS.morale+15);return'+15 Morale';}},
{name:'Competitor Launch',desc:'A competitor just launched a similar product!',effect:()=>{GS.customers=Math.max(0,GS.customers-3);return'-3 Customers';}},
{name:'Coffee Machine Broke',desc:'The sacred coffee machine is down!',effect:()=>{GS.morale=Math.max(0,GS.morale-10);return'-10 Morale';}},
];

// VICTORY CONDITIONS
const VICTORIES={
ipo:{name:'IPO Glory',color:P.vIPO,req:'$200K cash + 50 customers + 150 product',
check:()=>GS.cash>=200000&&GS.customers>=50&&GS.product>=150,
desc:'Your startup went public! Wall Street is buzzing. You ring the bell in a hoodie.'},
profit:{name:'Profit Machine',color:P.vPr,req:'$150K cash + revenue > burn + 30 days',
check:()=>GS.cash>=150000&&GS.revenue>GS.burn&&GS.day>=30,
desc:'Sustainable profitability achieved. No VC needed. Bootstrap legend.'},
rd:{name:'R&D Utopia',color:P.vRD,req:'200 product + 3 devs',
check:()=>GS.product>=200&&GS.employees.filter(e=>e.role==='Developer').length>=3,
desc:'Your engineering team built something beautiful. Open source thrives.'},
world:{name:'World Domination',color:P.vWd,req:'100 customers + 150 product + $100K',
check:()=>GS.customers>=100&&GS.product>=150&&GS.cash>=100000,
desc:'Total market dominance. Competitors tremble. Conferences beg you to keynote.'},
};

// INPUT
const keys={};
let justPressed={};
document.addEventListener('keydown',e=>{if(!keys[e.key])justPressed[e.key]=true;keys[e.key]=true;e.preventDefault();});
document.addEventListener('keyup',e=>{keys[e.key]=false;});
function jp(k){return justPressed[k]||false;}

// PIXEL TEXT RENDERER
function drawText(x,y,text,color,size){
B.fillStyle=color||P.hTx;
const s=size||1;
let cx=x;
const FONT={
'A':[[0,1,1,0],[1,0,0,1],[1,1,1,1],[1,0,0,1],[1,0,0,1]],
'B':[[1,1,1,0],[1,0,0,1],[1,1,1,0],[1,0,0,1],[1,1,1,0]],
'C':[[0,1,1,1],[1,0,0,0],[1,0,0,0],[1,0,0,0],[0,1,1,1]],
'D':[[1,1,1,0],[1,0,0,1],[1,0,0,1],[1,0,0,1],[1,1,1,0]],
'E':[[1,1,1,1],[1,0,0,0],[1,1,1,0],[1,0,0,0],[1,1,1,1]],
'F':[[1,1,1,1],[1,0,0,0],[1,1,1,0],[1,0,0,0],[1,0,0,0]],
'G':[[0,1,1,1],[1,0,0,0],[1,0,1,1],[1,0,0,1],[0,1,1,1]],
'H':[[1,0,0,1],[1,0,0,1],[1,1,1,1],[1,0,0,1],[1,0,0,1]],
'I':[[1,1,1],[0,1,0],[0,1,0],[0,1,0],[1,1,1]],
'J':[[0,0,1],[0,0,1],[0,0,1],[1,0,1],[0,1,0]],
'K':[[1,0,0,1],[1,0,1,0],[1,1,0,0],[1,0,1,0],[1,0,0,1]],
'L':[[1,0,0,0],[1,0,0,0],[1,0,0,0],[1,0,0,0],[1,1,1,1]],
'M':[[1,0,0,0,1],[1,1,0,1,1],[1,0,1,0,1],[1,0,0,0,1],[1,0,0,0,1]],
'N':[[1,0,0,1],[1,1,0,1],[1,0,1,1],[1,0,0,1],[1,0,0,1]],
'O':[[0,1,1,0],[1,0,0,1],[1,0,0,1],[1,0,0,1],[0,1,1,0]],
'P':[[1,1,1,0],[1,0,0,1],[1,1,1,0],[1,0,0,0],[1,0,0,0]],
'Q':[[0,1,1,0],[1,0,0,1],[1,0,0,1],[1,0,1,0],[0,1,0,1]],
'R':[[1,1,1,0],[1,0,0,1],[1,1,1,0],[1,0,1,0],[1,0,0,1]],
'S':[[0,1,1,1],[1,0,0,0],[0,1,1,0],[0,0,0,1],[1,1,1,0]],
'T':[[1,1,1,1,1],[0,0,1,0,0],[0,0,1,0,0],[0,0,1,0,0],[0,0,1,0,0]],
'U':[[1,0,0,1],[1,0,0,1],[1,0,0,1],[1,0,0,1],[0,1,1,0]],
'V':[[1,0,0,0,1],[1,0,0,0,1],[0,1,0,1,0],[0,1,0,1,0],[0,0,1,0,0]],
'W':[[1,0,0,0,1],[1,0,0,0,1],[1,0,1,0,1],[1,1,0,1,1],[1,0,0,0,1]],
'X':[[1,0,0,1],[1,0,0,1],[0,1,1,0],[1,0,0,1],[1,0,0,1]],
'Y':[[1,0,0,0,1],[0,1,0,1,0],[0,0,1,0,0],[0,0,1,0,0],[0,0,1,0,0]],
'Z':[[1,1,1,1],[0,0,1,0],[0,1,0,0],[1,0,0,0],[1,1,1,1]],
'0':[[0,1,1,0],[1,0,0,1],[1,0,0,1],[1,0,0,1],[0,1,1,0]],
'1':[[0,1,0],[1,1,0],[0,1,0],[0,1,0],[1,1,1]],
'2':[[0,1,1,0],[1,0,0,1],[0,0,1,0],[0,1,0,0],[1,1,1,1]],
'3':[[1,1,1,0],[0,0,0,1],[0,1,1,0],[0,0,0,1],[1,1,1,0]],
'4':[[1,0,0,1],[1,0,0,1],[1,1,1,1],[0,0,0,1],[0,0,0,1]],
'5':[[1,1,1,1],[1,0,0,0],[1,1,1,0],[0,0,0,1],[1,1,1,0]],
'6':[[0,1,1,0],[1,0,0,0],[1,1,1,0],[1,0,0,1],[0,1,1,0]],
'7':[[1,1,1,1],[0,0,0,1],[0,0,1,0],[0,1,0,0],[0,1,0,0]],
'8':[[0,1,1,0],[1,0,0,1],[0,1,1,0],[1,0,0,1],[0,1,1,0]],
'9':[[0,1,1,0],[1,0,0,1],[0,1,1,1],[0,0,0,1],[0,1,1,0]],
' ':[[0,0],[0,0],[0,0],[0,0],[0,0]],
'.':[[0],[0],[0],[0],[1]],
',':[[0],[0],[0],[1],[1]],
'!':[[1],[1],[1],[0],[1]],
'?':[[0,1,1,0],[1,0,0,1],[0,0,1,0],[0,0,0,0],[0,0,1,0]],
'-':[[0,0,0],[0,0,0],[1,1,1],[0,0,0],[0,0,0]],
'+':[[0,0,0],[0,1,0],[1,1,1],[0,1,0],[0,0,0]],
'$':[[0,1,1],[1,0,0],[0,1,0],[0,0,1],[1,1,0]],
':':[[0],[1],[0],[1],[0]],
'/':[[0,0,1],[0,0,1],[0,1,0],[1,0,0],[1,0,0]],
'%':[[1,0,1],[0,0,1],[0,1,0],[1,0,0],[1,0,1]],
"'":[[1],[1],[0],[0],[0]],
'(':[[0,1],[1,0],[1,0],[1,0],[0,1]],
')':[[1,0],[0,1],[0,1],[0,1],[1,0]],
'=':[[0,0,0],[1,1,1],[0,0,0],[1,1,1],[0,0,0]],
'<':[[0,0,1],[0,1,0],[1,0,0],[0,1,0],[0,0,1]],
'>':[[1,0,0],[0,1,0],[0,0,1],[0,1,0],[1,0,0]],
'#':[[0,1,0,1,0],[1,1,1,1,1],[0,1,0,1,0],[1,1,1,1,1],[0,1,0,1,0]],
'@':[[0,1,1,0],[1,0,1,1],[1,0,1,1],[1,0,0,0],[0,1,1,1]],
'&':[[0,1,0,0],[1,0,1,0],[0,1,0,0],[1,0,1,1],[0,1,1,0]],
'*':[[0,0,0],[1,0,1],[0,1,0],[1,0,1],[0,0,0]],
'_':[[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[1,1,1,1]],
};
const str=text.toString().toUpperCase();
for(let i=0;i<str.length;i++){
const ch=str[i];
const g=FONT[ch];
if(!g){cx+=4*s;continue;}
for(let r=0;r<g.length;r++)for(let c=0;c<g[r].length;c++)
if(g[r][c])B.fillRect(cx+c*s,y+r*s,s,s);
cx+=(g[0].length+1)*s;
}
return cx-x;
}

function textWidth(text,size){
const s=size||1;
const WIDTHS={'M':5,'W':5,'T':5,'V':5,'Y':5,'N':4,'#':5,' ':2,'.':1,',':1,'!':1,':':1,"'":1,'(':2,')':2,'<':3,'>':3};
let w=0;const str=text.toString().toUpperCase();
for(let i=0;i<str.length;i++){w+=(WIDTHS[str[i]]||4)+1;}
return (w-1)*s;
}

function drawTextCentered(y,text,color,size){
const w=textWidth(text,size);
drawText(Math.floor((NW-w)/2),y,text,color,size);
}

// DRAW TILE
function drawTile(tx,ty){
const x=tx*T,y=ty*T;
const t=map[ty][tx];
// Floor base
if(t!==TL.WT&&t!==TL.WF&&t!==TL.TR&&t!==TL.WN){
B.fillStyle=(tx+ty)%2?P.flA:P.flB;
B.fillRect(x,y,T,T);
}
switch(t){
case TL.WT:
B.fillStyle=P.wT;B.fillRect(x,y,T,T);
B.fillStyle=P.wF;B.fillRect(x,y+12,T,4);
break;
case TL.WF:
B.fillStyle=P.wF;B.fillRect(x,y,T,T);
B.fillStyle=P.wT;B.fillRect(x,y,T,2);
break;
case TL.TR:
B.fillStyle=P.wF;B.fillRect(x,y,T,T);
B.fillStyle=P.wTr;B.fillRect(x,y,T,2);
break;
case TL.WN:
B.fillStyle=P.wT;B.fillRect(x,y,T,T);
B.fillStyle=P.win;B.fillRect(x+2,y+2,T-4,8);
B.fillStyle=P.winL;B.fillRect(x+3,y+3,T-6,3);
B.fillStyle=P.wF;B.fillRect(x,y+12,T,4);
break;
case TL.DK:
B.fillStyle=P.dk;B.fillRect(x+1,y+4,14,10);
B.fillStyle=P.dkT;B.fillRect(x+1,y+4,14,3);
B.fillStyle=P.dkL;B.fillRect(x+2,y+12,3,4);B.fillRect(x+11,y+12,3,4);
break;
case TL.CH:
B.fillStyle=P.chr;B.fillRect(x+4,y+3,8,10);
B.fillStyle=P.chrS;B.fillRect(x+5,y+6,6,6);
break;
case TL.TM:
B.fillStyle=P.dk;B.fillRect(x+1,y+6,14,8);
B.fillStyle=P.dkT;B.fillRect(x+1,y+6,14,2);
B.fillStyle=P.mon;B.fillRect(x+3,y+1,10,7);
B.fillStyle=P.mG;B.fillRect(x+4,y+2,8,5);
// Flicker
if(Math.random()>0.95)B.fillStyle=P.mGl;
B.fillRect(x+5,y+3,2,1);B.fillRect(x+5,y+5,4,1);
break;
case TL.PL:
B.fillStyle=P.pot;B.fillRect(x+5,y+10,6,4);
B.fillStyle=P.potD;B.fillRect(x+5,y+13,6,1);
B.fillStyle=P.pl;B.fillRect(x+4,y+4,8,7);
B.fillStyle=P.plD;B.fillRect(x+6,y+2,4,3);
break;
case TL.CF:
// Co-founder spot: desk + purple monitor
B.fillStyle=P.dk;B.fillRect(x+1,y+6,14,8);
B.fillStyle=P.dkT;B.fillRect(x+1,y+6,14,2);
B.fillStyle=P.mon;B.fillRect(x+3,y+1,10,7);
B.fillStyle=P.cofM;B.fillRect(x+4,y+2,8,5);
if(Math.random()>0.9)B.fillStyle=P.cofMl;
B.fillRect(x+5,y+3,3,1);B.fillRect(x+5,y+5,5,1);
break;
case TL.DR:
B.fillStyle=P.dkT;B.fillRect(x+2,y,12,T);
B.fillStyle=P.dk;B.fillRect(x+6,y+5,2,3);
break;
case TL.RG:
B.fillStyle=(tx+ty)%2?P.rug:P.rugB;
B.fillRect(x,y,T,T);
break;
case TL.WB:
B.fillStyle=P.wb;B.fillRect(x+1,y+2,14,10);
B.fillStyle=P.wbB;B.fillRect(x,y+1,T,1);B.fillRect(x,y+13,T,1);
B.fillRect(x,y+1,1,13);B.fillRect(x+15,y+1,1,13);
B.fillStyle=P.hRd;B.fillRect(x+3,y+4,4,1);
B.fillStyle=P.hGr;B.fillRect(x+3,y+7,6,1);
break;
case TL.CM:
B.fillStyle='#444466';B.fillRect(x+3,y+2,10,12);
B.fillStyle='#555577';B.fillRect(x+4,y+3,8,5);
B.fillStyle=P.cfe;B.fillRect(x+5,y+9,6,3);
B.fillStyle=P.mug;B.fillRect(x+6,y+10,4,2);
break;
}
}

// DRAW PLAYER
function drawPlayer(x,y,dir,frame,isCofounder){
const px=Math.floor(x),py=Math.floor(y);
const hc=isCofounder?P.cofH:P.hd;
const hcd=isCofounder?P.cof:P.hdD;
const hr=isCofounder?'#4a3a5a':P.hair;
// Shadow
B.fillStyle=P.sh;B.fillRect(px+2,py+13,12,3);
// Body
B.fillStyle=hc;B.fillRect(px+4,py+5,8,7);
B.fillStyle=hcd;B.fillRect(px+3,py+7,2,4);B.fillRect(px+11,py+7,2,4);
// Head
B.fillStyle=P.skin;B.fillRect(px+5,py+1,6,5);
// Hair
B.fillStyle=hr;B.fillRect(px+5,py,6,2);
if(dir===2)B.fillRect(px+4,py+1,2,3);
else if(dir===3)B.fillRect(px+10,py+1,2,3);
// Eyes
if(dir!==1){
B.fillStyle=P.bg;
if(dir===0||dir===2){B.fillRect(px+6,py+3,1,1);B.fillRect(px+9,py+3,1,1);}
if(dir===3){B.fillRect(px+8,py+3,1,1);B.fillRect(px+10,py+3,1,1);}
if(dir===2){B.fillRect(px+5,py+3,1,1);B.fillRect(px+7,py+3,1,1);}
}
// Pants
B.fillStyle=P.pnt;B.fillRect(px+5,py+11,3,3);B.fillRect(px+8,py+11,3,3);
// Shoes
B.fillStyle=P.shoe;B.fillRect(px+4,py+13,3,2);B.fillRect(px+9,py+13,3,2);
// Walk animation
if(frame%2&&(dir===2||dir===3)){
B.fillStyle=hc;B.fillRect(px+(dir===2?2:12),py+8,2,3);
}
}

// CO-FOUNDER
const cofPos={x:14*T,y:10*T-2};
function drawCofounder(){
if(GS.cofStandUp){
// Standing, facing player
drawPlayer(cofPos.x,cofPos.y-4,0,0,true);
// Speech bubble
B.fillStyle=P.dBg;B.fillRect(cofPos.x-8,cofPos.y-18,32,12);
B.fillStyle=P.dBd;
B.fillRect(cofPos.x-8,cofPos.y-18,32,1);B.fillRect(cofPos.x-8,cofPos.y-7,32,1);
B.fillRect(cofPos.x-8,cofPos.y-18,1,12);B.fillRect(cofPos.x+23,cofPos.y-18,1,12);
drawText(cofPos.x-4,cofPos.y-15,'...',P.dTx);
} else {
// Sitting at desk, back to camera
const px=cofPos.x,py=cofPos.y;
B.fillStyle=P.chrS;B.fillRect(px+4,py+6,8,8);
B.fillStyle=P.cofH;B.fillRect(px+4,py+2,8,6);
B.fillStyle='#4a3a5a';B.fillRect(px+5,py,6,3);
}
}

// DRAW HIRED EMPLOYEES (seated at desks)
function drawEmployees(){
const spots=[{x:2,y:11,dir:1},{x:3,y:11,dir:1},{x:13,y:2,dir:0},{x:14,y:2,dir:0},{x:13,y:11,dir:1},{x:14,y:11,dir:1}];
for(let i=0;i<GS.employees.length&&i<spots.length;i++){
const s=spots[i];
const e=GS.employees[i];
const px=s.x*T,py=s.y*T;
// Seated employee
B.fillStyle=P.chrS;B.fillRect(px+4,py+6,8,8);
const colors={Developer:'#4488aa',Salesperson:'#aa6644',Designer:'#aa44aa',Marketer:'#44aa66'};
B.fillStyle=colors[e.role]||P.hd;
B.fillRect(px+4,py+2,8,6);
B.fillStyle=P.skin;B.fillRect(px+5,py,6,3);
B.fillStyle=P.hair;B.fillRect(px+5,py-1,6,2);
}
}

// HUD
function drawHUD(){
// Top bar
B.fillStyle=P.hBg;B.fillRect(0,0,NW,18);
// Day
drawText(4,2,'DAY '+GS.day,P.hGd);
// Cash
const cashStr='$'+formatNum(GS.cash);
drawText(50,2,cashStr,GS.cash<5000?P.hRd:P.hGr);
// Hour
drawText(110,2,GS.hour+':00',P.hYl);
// AP
drawText(150,2,'AP',P.hTx);
for(let i=0;i<GS.maxAp;i++){
B.fillStyle=i<GS.ap?P.apF:P.apE;
B.fillRect(164+i*7,3,5,5);
}
// Product
drawText(4,10,('PRD:'+GS.product),P.pos);
// Customers
drawText(60,10,('CST:'+GS.customers),P.hYl);
// Revenue
drawText(120,10,('REV:$'+formatNum(GS.revenue)),P.hGr);
// Burn
drawText(200,10,('-$'+formatNum(GS.burn)+'/D'),P.hRd);
// Employees
drawText(210,2,'TEAM:'+GS.employees.length,P.hTx);
// Morale
const mc=GS.morale>50?P.hGr:GS.morale>25?P.hYl:P.hRd;
drawText(265,2,'MRL:'+GS.morale,mc);
// Milestone
const cm=curMile(GS.product);
if(cm)drawText(265,10,cm.name,P.pos);
}

function formatNum(n){
if(n>=1000000)return (n/1000000).toFixed(1)+'M';
if(n>=1000)return (n/1000).toFixed(1)+'K';
return Math.floor(n).toString();
}

// DIALOG SYSTEM
function showDialog(lines,cb){
GS.dialogLines=Array.isArray(lines)?lines:[lines];
GS.dialogIdx=0;GS.state='dialog';GS.dialogCb=cb||null;
}

function drawDialog(){
const bx=16,by=NH-60,bw=NW-32,bh=50;
B.fillStyle=P.dBg;B.fillRect(bx,by,bw,bh);
B.fillStyle=P.dBd;
B.fillRect(bx,by,bw,2);B.fillRect(bx,by+bh-2,bw,2);
B.fillRect(bx,by,2,bh);B.fillRect(bx+bw-2,by,2,bh);
const line=GS.dialogLines[GS.dialogIdx]||'';
// Word wrap
const words=line.split(' ');
let row='',ry=0;
for(const w of words){
const test=row?row+' '+w:w;
if(textWidth(test)>bw-16){
drawText(bx+8,by+8+ry*8,row,P.dTx);
row=w;ry++;
} else row=test;
}
if(row)drawText(bx+8,by+8+ry*8,row,P.dTx);
// Blink arrow
if(Math.floor(GS.animT/30)%2)
drawText(bx+bw-16,by+bh-12,'>',P.dBd);
}

// INTERACTION PROMPTS
function getInteraction(){
const gx=Math.floor((GS.px+8)/T);
const gy=Math.floor((GS.py+8)/T);
const checks=[{x:gx,y:gy-1},{x:gx,y:gy+1},{x:gx-1,y:gy},{x:gx+1,y:gy},
{x:gx,y:gy},{x:gx+1,y:gy-1},{x:gx-1,y:gy-1}];
for(const c of checks){
const t=gT(c.x,c.y);
if(t===TL.TM)return{type:'terminal',x:c.x,y:c.y};
if(t===TL.CM)return{type:'coffee',x:c.x,y:c.y};
if(t===TL.WB)return{type:'whiteboard',x:c.x,y:c.y};
if(t===TL.CF)return{type:'cofounder',x:c.x,y:c.y};
if(t===TL.DR)return{type:'door',x:c.x,y:c.y};
}
return null;
}

function drawPrompt(){
const inter=getInteraction();
if(!inter||GS.state!=='playing')return;
const labels={terminal:'Z: CODE',coffee:'Z: COFFEE',whiteboard:'Z: PLAN',cofounder:'Z: TALK',door:'Z: RECRUIT'};
const label=labels[inter.type];
if(label){
const w=textWidth(label)+8;
B.fillStyle=P.dBg;B.fillRect(NW/2-w/2,NH-24,w,12);
B.fillStyle=P.dBd;B.fillRect(NW/2-w/2,NH-24,w,1);B.fillRect(NW/2-w/2,NH-13,w,1);
drawText(NW/2-w/2+4,NH-22,label,P.dTx);
}
}

// MENU SYSTEM
function showMenu(title,items,cb){
GS.state='menu';GS.menuItems=items.map((it,i)=>({label:it,idx:i}));
GS.menuIdx=0;GS.menuTitle=title;GS.menuCb=cb;
}

function drawMenu(){
const bw=160,bh=20+GS.menuItems.length*14;
const bx=(NW-bw)/2,by=(NH-bh)/2;
B.fillStyle=P.dBg;B.fillRect(bx,by,bw,bh);
B.fillStyle=P.dBd;
B.fillRect(bx,by,bw,2);B.fillRect(bx,by+bh-2,bw,2);
B.fillRect(bx,by,2,bh);B.fillRect(bx+bw-2,by,2,bh);
drawText(bx+8,by+6,GS.menuTitle||'MENU',P.hGd);
for(let i=0;i<GS.menuItems.length;i++){
const sel=i===GS.menuIdx;
if(sel){B.fillStyle=P.dBd;B.fillRect(bx+4,by+18+i*14,bw-8,12);}
drawText(bx+12,by+20+i*14,GS.menuItems[i].label,sel?P.bg:P.dTx);
}
}

// HIRE SCREEN
function showHire(){
GS.state='hire';GS.hireIdx=0;
GS.hireOptions=EMP_TYPES.map(e=>({...e,salary:e.cost+Math.floor(Math.random()*100)}));
}

function drawHire(){
const bw=200,bh=100;
const bx=(NW-bw)/2,by=(NH-bh)/2;
B.fillStyle=P.dBg;B.fillRect(bx,by,bw,bh);
B.fillStyle=P.dBd;
B.fillRect(bx,by,bw,2);B.fillRect(bx,by+bh-2,bw,2);
B.fillRect(bx,by,2,bh);B.fillRect(bx+bw-2,by,2,bh);
drawText(bx+8,by+6,'HIRE - SLOTS '+GS.employees.length+'/'+GS.maxEmp,P.hGd);
drawText(bx+8,by+16,'ESC: CANCEL',P.neu);
for(let i=0;i<GS.hireOptions.length;i++){
const sel=i===GS.hireIdx;
const e=GS.hireOptions[i];
if(sel){B.fillStyle=P.dBd+'33';B.fillRect(bx+4,by+26+i*16,bw-8,14);}
const col=sel?P.wh:P.dTx;
drawText(bx+12,by+28+i*16,e.role,col);
drawText(bx+100,by+28+i*16,'$'+e.salary+'/D',sel?P.hYl:P.neu);
}
if(GS.employees.length>=GS.maxEmp)
drawText(bx+8,by+bh-12,'TEAM IS FULL!',P.hRd);
}

// ACTIONS
function doCode(){
if(GS.ap<=0){showDialog(['No action points left! End the day.']);return;}
GS.ap--;
const devs=GS.employees.filter(e=>e.role==='Developer').length;
const gain=3+devs*2+Math.floor(Math.random()*3);
GS.product+=gain;GS.featuresShipped++;
showDialog(['+'+gain+' Product points! (Total: '+GS.product+')']);
checkMilestones();
}

function doCoffee(){
if(GS.ap<=0){showDialog(['No AP left!']);return;}
GS.coffeesDrunk++;
GS.morale=Math.min(100,GS.morale+10);
if(Math.random()<0.3){GS.ap++;showDialog(['Great coffee! +10 Morale, +1 AP bonus!']);}
else showDialog(['+10 Morale. The coffee is mediocre but needed.']);
}

function doPlan(){
if(GS.ap<=0){showDialog(['No AP left!']);return;}
GS.ap--;
const marketers=GS.employees.filter(e=>e.role==='Marketer').length;
const gain=2+marketers*2+Math.floor(Math.random()*3);
GS.customers+=gain;
const rev=GS.customers*50;
GS.revenue=rev;
showDialog(['+'+gain+' Customers! Revenue now $'+formatNum(GS.revenue)+'/day']);
}

function doSales(){
if(GS.ap<=0){showDialog(['No AP left!']);return;}
GS.ap--;
const salesfolk=GS.employees.filter(e=>e.role==='Salesperson').length;
const gain=1+salesfolk*2+Math.floor(Math.random()*2);
GS.customers+=gain;
GS.revenue=GS.customers*50;
const cashGain=1000+salesfolk*500;
GS.cash+=cashGain;GS.totalRevenue+=cashGain;
showDialog(['+'+gain+' Customers, +$'+formatNum(cashGain)+' immediate deal!']);
}

function doTalkCofounder(){
const msgs=[
"He nods vaguely. Is he... meditating?",
"'The metrics are interesting,' he says, staring at his purple screen.",
"He's reading something. You can't tell what.",
"He gives a thumbs up without looking away from his monitor.",
"'Trust the process,' he whispers. Helpful.",
"You hear him typing furiously. Then silence.",
"He appears to be on a call. With whom?",
"'We should sync later,' he says. You've been here 5 minutes.",
];
if(!GS.cofStandUp&&GS.day>=15&&Math.random()<0.15){
GS.cofStandUp=true;GS.cofStandUpDay=GS.day;
showDialog([
"He stands up. For the first time, he faces you.",
"'I've been watching. You're doing great.'",
"'I handle the things you don't see. Trust me.'",
"He sits back down. What just happened?"
]);
} else {
showDialog([msgs[Math.floor(Math.random()*msgs.length)]]);
}
}

function doHire(idx){
const e=GS.hireOptions[idx];
if(GS.employees.length>=GS.maxEmp){showDialog(['Team is full! Grow the company first.']);return;}
GS.employees.push({role:e.role,salary:e.salary,day:GS.day});
GS.burn+=e.salary;GS.hiresDone++;
GS.state='playing';
showDialog(['Hired a '+e.role+'! Burn rate now $'+formatNum(GS.burn)+'/day']);
}

function checkMilestones(){
for(const m of MILES){
if(!m.ann&&GS.product>=m.thr){
m.ann=true;
GS.flash={text:m.name+' REACHED!',color:P.pos};GS.flashT=120;
}
}
}

// DAY CYCLE
function endDay(){
// Revenue
const dailyRev=GS.revenue;
GS.cash+=dailyRev;GS.totalRevenue+=dailyRev;
GS.cash-=GS.burn;GS.totalSpent+=GS.burn;
// Employee effects
for(const e of GS.employees){
if(e.role==='Developer')GS.product+=1;
if(e.role==='Salesperson'){GS.customers+=1;GS.revenue=GS.customers*50;}
if(e.role==='Designer')GS.morale=Math.min(100,GS.morale+2);
if(e.role==='Marketer'){GS.customers+=1;GS.revenue=GS.customers*50;}
}
// Morale decay
GS.morale=Math.max(0,GS.morale-2);
// Progression gates
if(GS.day>=8)GS.maxEmp=4;
if(GS.day>=15)GS.maxEmp=6;
// Random event
if(Math.random()<(GS.day<8?0.2:GS.day<15?0.35:0.5)){
const ev=EVENTS[Math.floor(Math.random()*EVENTS.length)];
const result=ev.effect();
GS.pendingEvent={name:ev.name,desc:ev.desc,result:result};
}
GS.day++;GS.hour=9;GS.ap=GS.maxAp;
// Save
saveGame();
// Day transition
GS.dayTrans=60;GS.dayTransDir=1;
// Check game over
if(GS.cash<=0){
GS.state='gameover';return;
}
// Check victory
checkVictory();
}

function checkVictory(){
const order=['ipo','profit','rd','world'];
for(const k of order){
if(VICTORIES[k].check()){
GS.victoryType=k;
GS.state='victory';
saveGame();
return;
}
}
}

// VICTORY SCREEN
function drawVictory(){
const v=VICTORIES[GS.victoryType];
// Tint overlay
B.fillStyle=v.color+'44';B.fillRect(0,0,NW,NH);
// Box
const bw=260,bh=140;
const bx=(NW-bw)/2,by=(NH-bh)/2;
B.fillStyle=P.dBg;B.fillRect(bx,by,bw,bh);
B.fillStyle=v.color;
B.fillRect(bx,by,bw,2);B.fillRect(bx,by+bh-2,bw,2);
B.fillRect(bx,by,2,bh);B.fillRect(bx+bw-2,by,2,bh);
drawTextCentered(by+8,'VICTORY!',v.color,2);
drawTextCentered(by+28,v.name,v.color);
// Wrap description
const words=v.desc.split(' ');
let row='',ry=0;
for(const w of words){
const test=row?row+' '+w:w;
if(textWidth(test)>bw-20){drawText(bx+10,by+44+ry*8,row,P.dTx);row=w;ry++;}
else row=test;
}
if(row)drawText(bx+10,by+44+ry*8,row,P.dTx);
// Stats
drawText(bx+10,by+80,'DAYS: '+GS.day,P.hYl);
drawText(bx+10,by+90,'CASH: $'+formatNum(GS.cash),P.hGr);
drawText(bx+10,by+100,'PRODUCT: '+GS.product,P.pos);
drawText(bx+10,by+110,'CUSTOMERS: '+GS.customers,P.hYl);
drawText(bx+130,by+80,'TEAM: '+GS.employees.length,P.hTx);
drawText(bx+130,by+90,'FEATURES: '+GS.featuresShipped,P.pos);
drawText(bx+130,by+100,'COFFEES: '+GS.coffeesDrunk,P.cfe);
drawText(bx+130,by+110,'HIRES: '+GS.hiresDone,P.hTx);
drawTextCentered(by+bh-10,'PRESS ENTER FOR STATS',P.dBd);
}

// STATS SCREEN
function drawStats(){
B.fillStyle=P.bg;B.fillRect(0,0,NW,NH);
drawTextCentered(10,'FINAL STATS',P.hGd,2);
const v=GS.victoryType?VICTORIES[GS.victoryType]:null;
if(v)drawTextCentered(28,v.name,v.color);
const stats=[
['Days Survived',GS.day],
['Final Cash','$'+formatNum(GS.cash)],
['Total Revenue','$'+formatNum(GS.totalRevenue)],
['Total Spent','$'+formatNum(GS.totalSpent)],
['Product Points',GS.product],
['Customers',GS.customers],
['Team Size',GS.employees.length],
['Features Shipped',GS.featuresShipped],
['Coffees Drunk',GS.coffeesDrunk],
['Hires Made',GS.hiresDone],
['Final Morale',GS.morale+'%'],
['Burn Rate','$'+formatNum(GS.burn)+'/day'],
];
for(let i=0;i<stats.length;i++){
drawText(40,44+i*13,stats[i][0],P.neu);
drawText(200,44+i*13,stats[i][1].toString(),P.hTx);
}
// Milestone reached
const cm=curMile(GS.product);
drawText(40,44+stats.length*13+4,'MILESTONE',P.neu);
drawText(200,44+stats.length*13+4,cm?cm.name:'NONE',P.pos);
drawTextCentered(NH-14,'PRESS ENTER TO RESTART',P.dBd);
}

// GAME OVER
function drawGameOver(){
B.fillStyle=P.bg+'dd';B.fillRect(0,0,NW,NH);
drawTextCentered(60,'GAME OVER',P.hRd,2);
drawTextCentered(80,'YOUR STARTUP RAN OUT OF CASH',P.dTx);
drawTextCentered(100,'YOU SURVIVED '+GS.day+' DAYS',P.hYl);
drawTextCentered(115,'PRODUCT: '+GS.product+' CUSTOMERS: '+GS.customers,P.neu);
drawTextCentered(135,'COFFEES DRUNK: '+GS.coffeesDrunk,P.cfe);
drawTextCentered(NH-30,'PRESS ENTER TO RESTART',P.dBd);
}

// TITLE SCREEN
function drawTitle(){
B.fillStyle=P.bg;B.fillRect(0,0,NW,NH);
// Stars
for(let i=0;i<30;i++){
const sx=(i*37+GS.animT*0.2)%NW;
const sy=(i*53)%NH;
B.fillStyle=Math.floor(GS.animT/20+i)%3?P.neu:P.wh;
B.fillRect(Math.floor(sx),Math.floor(sy),1,1);
}
drawTextCentered(30,'SAAS STARTUP',P.hGd,2);
drawTextCentered(50,'SIMULATOR',P.mG,2);
// Pixel art logo - monitor
const lx=140,ly=70;
B.fillStyle=P.mon;B.fillRect(lx,ly,40,28);
B.fillStyle=P.mG;B.fillRect(lx+3,ly+3,34,18);
B.fillStyle=P.dkL;B.fillRect(lx+15,ly+28,10,4);B.fillRect(lx+10,ly+32,20,3);
// Glowing text on monitor
if(Math.floor(GS.animT/20)%2){
B.fillStyle=P.mGl;B.fillRect(lx+6,ly+7,8,2);B.fillRect(lx+6,ly+11,14,2);B.fillRect(lx+6,ly+15,10,2);
}
// Menu
const items=GS.saveExists?['NEW GAME','CONTINUE (DAY '+GS.savedDay+')']:['NEW GAME'];
for(let i=0;i<items.length;i++){
const sel=i===GS.titleIdx;
if(sel){
const w=textWidth(items[i])+12;
B.fillStyle=P.dBd+'44';B.fillRect(NW/2-w/2,147+i*16,w,12);
}
drawTextCentered(149+i*16,items[i],sel?P.wh:P.neu);
}
drawTextCentered(200,'ARROWS: MOVE  Z: INTERACT  X: MENU',P.neu);
drawTextCentered(210,'SPACE: END DAY',P.neu);
}

// SAVE/LOAD
function saveGame(){
const data={
day:GS.day,hour:GS.hour,cash:GS.cash,revenue:GS.revenue,burn:GS.burn,
product:GS.product,customers:GS.customers,morale:GS.morale,
employees:GS.employees,maxEmp:GS.maxEmp,ap:GS.ap,maxAp:GS.maxAp,
cofStandUp:GS.cofStandUp,cofStandUpDay:GS.cofStandUpDay,
totalRevenue:GS.totalRevenue,totalSpent:GS.totalSpent,
hiresDone:GS.hiresDone,featuresShipped:GS.featuresShipped,coffeesDrunk:GS.coffeesDrunk,
px:GS.px,py:GS.py,pDir:GS.pDir,
milestones:MILES.map(m=>m.ann),
victoryType:GS.victoryType,
};
try{localStorage.setItem('saas_sim_save',JSON.stringify(data));}catch(e){}
}

function loadGame(){
try{
const raw=localStorage.getItem('saas_sim_save');
if(!raw)return false;
const d=JSON.parse(raw);
GS.day=d.day;GS.hour=d.hour||9;GS.cash=d.cash;GS.revenue=d.revenue;GS.burn=d.burn;
GS.product=d.product;GS.customers=d.customers;GS.morale=d.morale;
GS.employees=d.employees||[];GS.maxEmp=d.maxEmp||2;
GS.ap=d.ap||5;GS.maxAp=d.maxAp||5;
GS.cofStandUp=d.cofStandUp||false;GS.cofStandUpDay=d.cofStandUpDay||-1;
GS.totalRevenue=d.totalRevenue||0;GS.totalSpent=d.totalSpent||0;
GS.hiresDone=d.hiresDone||0;GS.featuresShipped=d.featuresShipped||0;GS.coffeesDrunk=d.coffeesDrunk||0;
GS.px=d.px||9*T+4;GS.py=d.py||7*T+4;GS.pDir=d.pDir||0;
if(d.milestones)MILES.forEach((m,i)=>m.ann=d.milestones[i]||false);
GS.victoryType=d.victoryType||null;
GS.state=GS.victoryType?'victory':'playing';
return true;
}catch(e){return false;}
}

function checkSave(){
try{
const raw=localStorage.getItem('saas_sim_save');
if(raw){const d=JSON.parse(raw);GS.saveExists=true;GS.savedDay=d.day||1;}
else{GS.saveExists=false;}
}catch(e){GS.saveExists=false;}
}

function newGame(){
GS.day=1;GS.hour=9;GS.ap=5;GS.maxAp=5;
GS.cash=50000;GS.revenue=0;GS.burn=500;
GS.product=0;GS.customers=0;GS.morale=80;
GS.employees=[];GS.maxEmp=2;
GS.cofStandUp=false;GS.cofStandUpDay=-1;
GS.totalRevenue=0;GS.totalSpent=0;
GS.hiresDone=0;GS.featuresShipped=0;GS.coffeesDrunk=0;
GS.victoryType=null;
GS.px=9*T+4;GS.py=7*T+4;GS.pDir=0;GS.pFrame=0;
GS.dayLog=[];GS.flash=null;GS.flashT=0;GS.pendingEvent=null;
MILES.forEach(m=>m.ann=false);
GS.state='playing';
showDialog([
"Welcome to your new startup office!",
"You have $50K in angel funding. Burn rate is $500/day.",
"Use ARROWS to move, Z to interact, X for menu.",
"SPACE to end the day. Build product, get customers, survive!",
"Your co-founder is in the corner. He seems... busy.",
]);
}

// X MENU (in-game)
function showGameMenu(){
const items=['RESUME','STATUS','END DAY','SAVE + QUIT'];
showMenu('MENU',items,(idx)=>{
if(idx===0)GS.state='playing';
if(idx===1){GS.state='stats';GS.victoryType=null;/* temp stats view */}
if(idx===2)endDay();
if(idx===3){saveGame();GS.state='title';checkSave();}
});
}

// DOOR INTERACTION
function doDoor(){
if(GS.employees.length<GS.maxEmp){
showMenu('THE DOOR',['GO RECRUITING (1 AP)','MAKE A SALES CALL (1 AP)','NEVERMIND'],(idx)=>{
if(idx===0){if(GS.ap<=0){showDialog(['No AP!']);return;}showHire();}
if(idx===1)doSales();
if(idx===2)GS.state='playing';
});
} else {
showMenu('THE DOOR',['MAKE A SALES CALL (1 AP)','NEVERMIND'],(idx)=>{
if(idx===0)doSales();
if(idx===1)GS.state='playing';
});
}
}

// FLASH MESSAGES
function drawFlash(){
if(!GS.flash||GS.flashT<=0)return;
const alpha=Math.min(1,GS.flashT/30);
B.globalAlpha=alpha;
const w=textWidth(GS.flash.text,2)+16;
B.fillStyle=P.dBg;B.fillRect(NW/2-w/2,80,w,20);
drawTextCentered(84,GS.flash.text,GS.flash.color||P.wh,2);
B.globalAlpha=1;
}

// UPDATE
function update(){
GS.animT++;
if(GS.flashT>0)GS.flashT--;
if(GS.dayTrans>0){
GS.dayTrans--;
if(GS.dayTrans===30&&GS.pendingEvent){
const ev=GS.pendingEvent;GS.pendingEvent=null;
showDialog(['EVENT: '+ev.name,ev.desc,ev.result]);
}
}
switch(GS.state){
case 'title':
if(jp('ArrowUp'))GS.titleIdx=Math.max(0,GS.titleIdx-1);
if(jp('ArrowDown'))GS.titleIdx=Math.min((GS.saveExists?1:0),GS.titleIdx+1);
if(jp('Enter')||jp('z')||jp('Z')){
if(GS.titleIdx===0)newGame();
else if(GS.titleIdx===1&&GS.saveExists){if(loadGame())GS.state=GS.victoryType?'victory':'playing';}
}
break;
case 'playing':
// Movement
let dx=0,dy=0;
if(keys['ArrowLeft']){dx=-2;GS.pDir=2;}
if(keys['ArrowRight']){dx=2;GS.pDir=3;}
if(keys['ArrowUp']){dy=-2;GS.pDir=1;}
if(keys['ArrowDown']){dy=2;GS.pDir=0;}
GS.pMoving=dx!==0||dy!==0;
if(GS.pMoving)GS.pFrame=(GS.pFrame+1)%16;
// Collision
if(dx!==0){
const nx=GS.px+dx;
const gx=Math.floor((nx+(dx>0?12:3))/T);
const gy1=Math.floor((GS.py+4)/T);
const gy2=Math.floor((GS.py+14)/T);
if(!isSolid(gx,gy1)&&!isSolid(gx,gy2))GS.px=nx;
}
if(dy!==0){
const ny=GS.py+dy;
const gx1=Math.floor((GS.px+3)/T);
const gx2=Math.floor((GS.px+12)/T);
const gy=Math.floor((ny+(dy>0?14:4))/T);
if(!isSolid(gx1,gy)&&!isSolid(gx2,gy))GS.py=ny;
}
// Bounds
GS.px=Math.max(T,Math.min(GS.px,(MW-1)*T-T));
GS.py=Math.max(T,Math.min(GS.py,(MH-1)*T-T));
// Interact
if(jp('z')||jp('Z')){
const inter=getInteraction();
if(inter){
switch(inter.type){
case 'terminal':
showMenu('TERMINAL',['WRITE CODE (1 AP)','CHECK METRICS','CANCEL'],(idx)=>{
if(idx===0)doCode();
if(idx===1)showDialog(['Product: '+GS.product+' | Next: '+(nxtMile(GS.product)?nxtMile(GS.product).name+' ('+nxtMile(GS.product).thr+')':'MAX'),'Customers: '+GS.customers+' | Revenue: $'+formatNum(GS.revenue)+'/day','Burn: $'+formatNum(GS.burn)+'/day | Cash runway: '+Math.floor(GS.cash/GS.burn)+' days']);
if(idx===2)GS.state='playing';
});break;
case 'coffee':doCoffee();break;
case 'whiteboard':
showMenu('WHITEBOARD',['PLAN MARKETING (1 AP)','REVIEW ROADMAP','CANCEL'],(idx)=>{
if(idx===0)doPlan();
if(idx===1){
const nm=nxtMile(GS.product);
const roadmap=nm?'Next milestone: '+nm.name+' at '+nm.thr+' pts':'All milestones reached!';
showDialog(['ROADMAP',roadmap,'Current product: '+GS.product+' pts']);
}
if(idx===2)GS.state='playing';
});break;
case 'cofounder':doTalkCofounder();break;
case 'door':doDoor();break;
}
}
}
if(jp('x')||jp('X'))showGameMenu();
if(jp(' '))endDay();
// Hour advance per AP spent
break;
case 'dialog':
if(jp('z')||jp('Z')||jp('Enter')||jp(' ')){
GS.dialogIdx++;
if(GS.dialogIdx>=GS.dialogLines.length){
GS.state='playing';
if(GS.dialogCb){const cb=GS.dialogCb;GS.dialogCb=null;cb();}
}
}
break;
case 'menu':
if(jp('ArrowUp'))GS.menuIdx=Math.max(0,GS.menuIdx-1);
if(jp('ArrowDown'))GS.menuIdx=Math.min(GS.menuItems.length-1,GS.menuIdx+1);
if(jp('z')||jp('Z')||jp('Enter')){
const cb=GS.menuCb;const idx=GS.menuIdx;
GS.state='playing';
if(cb)cb(idx);
}
if(jp('x')||jp('X')||jp('Escape'))GS.state='playing';
break;
case 'hire':
if(jp('ArrowUp'))GS.hireIdx=Math.max(0,GS.hireIdx-1);
if(jp('ArrowDown'))GS.hireIdx=Math.min(GS.hireOptions.length-1,GS.hireIdx+1);
if(jp('z')||jp('Z')||jp('Enter')){
if(GS.employees.length<GS.maxEmp)doHire(GS.hireIdx);
else showDialog(['Team is full!']);
}
if(jp('x')||jp('X')||jp('Escape'))GS.state='playing';
break;
case 'victory':
if(jp('Enter'))GS.state='stats';
break;
case 'stats':
if(jp('Enter')){
if(GS.victoryType){
try{localStorage.removeItem('saas_sim_save');}catch(e){}
GS.saveExists=false;GS.state='title';GS.titleIdx=0;checkSave();
} else {
GS.state='playing';
}
}
if(jp('Escape')||jp('x')||jp('X')){
if(!GS.victoryType)GS.state='playing';
}
break;
case 'gameover':
if(jp('Enter')){
try{localStorage.removeItem('saas_sim_save');}catch(e){}
GS.saveExists=false;GS.state='title';GS.titleIdx=0;checkSave();
}
break;
}
justPressed={};
}

// RENDER
function render(){
B.fillStyle=P.bg;B.fillRect(0,0,NW,NH);
if(GS.state==='title'){drawTitle();}
else if(GS.state==='stats'&&GS.victoryType){drawStats();}
else if(GS.state==='gameover'){
// Draw office behind
drawOffice();drawGameOver();
} else if(GS.state==='victory'){
drawOffice();drawVictory();
} else {
drawOffice();
drawHUD();
drawPrompt();
if(GS.state==='dialog')drawDialog();
if(GS.state==='menu')drawMenu();
if(GS.state==='hire')drawHire();
drawFlash();
// Day transition overlay
if(GS.dayTrans>0){
const alpha=GS.dayTrans>30?(60-GS.dayTrans)/30:(GS.dayTrans)/30;
B.fillStyle='rgba(0,0,0,'+Math.min(1,alpha*1.5)+')';
B.fillRect(0,0,NW,NH);
if(GS.dayTrans>25&&GS.dayTrans<35){
drawTextCentered(100,'DAY '+GS.day,P.hGd,2);
drawTextCentered(120,'CASH: $'+formatNum(GS.cash),GS.cash<10000?P.hRd:P.hGr);
}
}
// Stats overlay (temporary from menu)
if(GS.state==='stats'&&!GS.victoryType)drawStats();
}
// Blit
ctx.imageSmoothingEnabled=false;
ctx.drawImage(buf,0,0,NW,NH,0,0,NW*SC,NH*SC);
}

function drawOffice(){
// Draw tiles
for(let y=0;y<MH;y++)for(let x=0;x<MW;x++)drawTile(x,y);
// Collect sprites for Y-sort
const sprites=[];
// Employees
const spots=[{x:2,y:11},{x:3,y:11},{x:13,y:2},{x:14,y:2},{x:13,y:11},{x:14,y:11}];
for(let i=0;i<GS.employees.length&&i<spots.length;i++){
sprites.push({y:spots[i].y*T+14,draw:()=>{
const s=spots[i];const e=GS.employees[i];
const px=s.x*T,py=s.y*T;
B.fillStyle=P.chrS;B.fillRect(px+4,py+6,8,8);
const colors={Developer:'#4488aa',Salesperson:'#aa6644',Designer:'#aa44aa',Marketer:'#44aa66'};
B.fillStyle=colors[e.role]||P.hd;
B.fillRect(px+4,py+2,8,6);
B.fillStyle=P.skin;B.fillRect(px+5,py,6,3);
B.fillStyle=P.hair;B.fillRect(px+5,py-1,6,2);
// Role label
drawText(px,py-6,e.role.substr(0,3),colors[e.role]||P.neu);
}});
}
// Cofounder
sprites.push({y:cofPos.y+14,draw:drawCofounder});
// Player
sprites.push({y:GS.py+14,draw:()=>drawPlayer(GS.px,GS.py,GS.pDir,Math.floor(GS.pFrame/4),false)});
// Sort by Y
sprites.sort((a,b)=>a.y-b.y);
for(const s of sprites)s.draw();
}

// GAME LOOP
function loop(){
update();render();requestAnimationFrame(loop);
}

// INIT
checkSave();
loop();
</script>
</body>
</html>