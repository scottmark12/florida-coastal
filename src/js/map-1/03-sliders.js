/* Slider Map: sliders, scoring (fitSl) and fitting the top 5 */
// sliders mode: same sliders, same scoring as the live Slider Map (fitSl, Nov 2026)
const SLC=[['pace','Quiet or lively'],['meet','Social scene'],['walk','Walkability'],['water','On the water'],['beach','Beaches'],['outdoors','Active outdoors'],['afford','Affordability'],['airport','Airport access'],['charm','Coastal charm'],['edu','Public schools']];
const SL_CORE=['beach','charm','water'],SL_MORE=['meet','walk','outdoors','airport','edu'];
const slDef=k=>k=='pace'?50:0,slOn=(k,v)=>v!==slDef(k);
const slEv=c=>c!='pace'&&!slAnySet()?33:S.sl[c];
const slW=v=>v<=0?0:4*Math.pow(v/100,1.5);
const slAim=(k,v)=>k!='pace'?[k,v]:v<50?['quiet',2*(50-v)]:v>50?['lively',2*(v-50)]:[k,0];
const rkk=(t,k)=>(LD[t.id].rk[k])||LK.RANK_N,slVal=(t,k)=>LD[t.id].sv[k]||0;
const slWord2=(k,v)=>k=='pace'?LK.PACE2[v<=15?0:v<45?1:v<=55?2:v<85?3:4]:(LK.SL_WORDS[k]||["Doesn't matter","A little","Either way","Important","Must have"])[v<=0?0:v<40?1:v<75?3:4];
S.sl={};SLC.forEach(([k])=>S.sl[k]=slDef(k));S.slBud=null;S.slPr=null;S.slPc=null;S.top=[];S.sv=S.sl;
const slBudOn=()=>S.slBud!=null&&S.slBud<4;
const slIn=t=>S.slPr?LD[t.id].reg===S.slPr:!S.slPc||((typeof R7M!='undefined'&&R7M[S.slPc])?R7M[S.slPc].includes(LD[t.id].reg):t.c===S.slPc);
function slAnySet(){return SLC.some(([k])=>slOn(k,S.sl[k]))||S.slBud!=null}
function slNone(){return !slAnySet()&&!S.slPc&&!S.slPr}
function fitSl(t){let a=0,w=0,o=1;
 SLC.forEach(([c])=>{const [k,v]=slAim(c,slEv(c)),x=slW(v)*(LK.CATMULT[k]||1);if(!x)return;a+=x*slVal(t,k);w+=x;const r=rkk(t,k);v>=90&&r>60&&(o*=r>110?.55:.8)});
 if(slBudOn()){const n=LD[t.id].bg[S.slBud],r=Math.max(1,5-1.5*n);a+=LK.BUDGET_W*LK.SLX*Math.pow(r/5,1.5);w+=LK.BUDGET_W*LK.SLX;n&&(o*=LK.BUDGET_MISS[Math.min(3,n)])}
 return w?o*a/w:0}
function slPri(){return SLC.map(([c])=>slAim(c,slEv(c))).filter(x=>x[1]>0).sort((a,b)=>b[1]-a[1]).map(x=>x[0])}
function slTie(t){return slPri().slice(0,3).reduce((s,k,i)=>s+(LK.RANK_N-rkk(t,k))*(3-i),0)}
function slRank(){const F=fitSl;return T.filter(slIn).sort((x,y)=>Math.round(100*F(y))-Math.round(100*F(x))||slTie(y)-slTie(x)||F(y)-F(x))}
const PH=()=>matchMedia('(max-width:760px)').matches;
const SLM=()=>S.mode=='sliders'&&matchMedia('(max-width:760px)').matches;
/* the old top 5 photo strip is retired; this just clears it */
function slCar(){const c=$('slcar');if(!c)return;c.innerHTML='';c.classList.remove('on');if(S.mode=='sliders')S.hover=null}
function slFit(P){const[w0,h]=size(),pw=DPW(),w=w0-pw,SH=SHON(),T0=SH?78:(pw?92:64+HDR()),pe=$('pop'),B0=SH?SHRES():(pe&&pe.classList.contains('on')?pe.offsetHeight+24:40),avH=Math.max(170,h-T0-B0),xs=P.map(t=>t.x),ys=P.map(t=>t.y),x0=Math.min(...xs),x1=Math.max(...xs),y0=Math.min(...ys),y1=Math.max(...ys),mx=w<600?96:150,my=34;let k=Math.max((x1-x0)/Math.max(80,w-2*mx),(y1-y0)/Math.max(60,avH-2*my),MINW*1.15/w);k=Math.min(k,FLW()/w);const cx=(x0+x1)/2,cy=(y0+y1)/2;return [cx-w/2*k,cy-(T0+avH/2)*k,w0*k,h*k]}
const FLW=()=>(X(ALL[1])-X(ALL[0]))*1.04;
function slPanTo(t){if(!t)return;const[w,h]=size(),v=S.vb,k=v[2]/w,sx=(t.x-v[0])/k,sy=(t.y-v[1])/k;if(sx<50||sx>w-50||sy<50||sy>h-170)go([t.x-w/2*k,t.y-(h-150)/2*k,v[2],v[3]],450);else render()}
