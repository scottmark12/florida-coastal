const VIBES={beaches:"Best Beaches",oldfl:"Old Florida",bluezone:"Healthy Living",island:"Island Life",dock:"Dock of the Bay",sophhigh:"High Energy",social:"Social Scene",sophcalm:"Sophisticated Laid Back",active:"Active Outdoors",walk:"Walkable",remote:"Remote Work",afford:"Affordable"};
const VCOL={oldfl:'#2F9460',dock:'#3A62C8',island:'#1FA39A',sophcalm:'#7B62D8',sophhigh:'#C8407F',social:'#E0604F',active:'#6FA53E',bluezone:'#2A93CF',walk:'#B055C0',remote:'#DB8430',beaches:'#D2A52A',afford:'#B5643F'};
const VSUB={island:"Barefoot, small and slow",oldfl:"Fish houses, bait shops and no hurry",dock:"Life on and around the water",sophcalm:"Polished and easy",sophhigh:"Polished with a pulse",afford:"More house for less",active:"Trails, paddling and the outdoors",walk:"Daily life on foot",bluezone:"Long walks, time outside, friendly faces",remote:"Pretty, with an easy airport",social:"Bars, events and people",beaches:"Nationally ranked sand"};
const SIG=['pensacola','30a','apalachicola','cedarkey','dunedin','siesta-key','naples','keywest','stuart','cocoa','daytona','staug'];
const REG=[['Panhandle',-87.6,-85.2,29.9,30.75],['Forgotten Coast',-85.6,-84.1,29.55,30.2],['Big Bend',-84.4,-82.4,28.8,30.25],['Tampa Bay',-83.1,-82.2,27.25,28.45],['Southwest Gulf',-82.8,-81.2,25.75,27.45],['The Keys',-82.0,-80.2,24.45,25.4],['Southeast',-80.6,-79.9,25.6,27.2],['Treasure Coast',-80.7,-79.95,26.95,28.0],['Space Coast',-81.1,-80.3,27.9,29.4],['Northeast',-81.75,-80.95,29.3,30.8]];
const CITIES=[['Tallahassee',30.44,-84.28],['Jacksonville',30.33,-81.66],['Gainesville',29.65,-82.32],['Orlando',28.54,-81.38],['Tampa',27.95,-82.46],['Miami',25.77,-80.19],['Fort Myers',26.64,-81.87],['Ocala',29.19,-82.14],['Pensacola',30.42,-87.22]];
const COS=.883,X=l=>(l+89)*100*COS,Y=l=>(36.8-l)*100;
const ORD={panhandle:0,gulf:1,keys:2,atlantic:3},KEY={panhandle:t=>t.lo,gulf:t=>-t.la,keys:t=>t.lo,atlantic:t=>t.la};
T.forEach(t=>{t.x=X(t.lo);t.y=Y(t.la);const m=(t.p||'').match(/\$([\d.]+)([KM])/);t.pv=m?(+m[1])*(m[2]=='M'?1000:1):null});
T.sort((a,b)=>ORD[a.c]-ORD[b.c]||KEY[a.c](a)-KEY[b.c](b));T.forEach((t,i)=>t.o=i);
const $=id=>document.getElementById(id),svg=$('map'),box=$('mapbox');
const RELIEF='<image href="img/map/fl-relief.webp" x="0" y="0" width="1192" height="1380" preserveAspectRatio="none" opacity=".9"/>';
document.getElementById('base').outerHTML=`<svg class="terr" id="base" x="0" y="0" width="1192" height="1380" viewBox="0 0 1192 1380" overflow="visible">${(window.FLMAP||'')}</svg>`;
const base=$('base'),ov=$('ov');
const S={vb:null,style:'',price:'',sort:'coast',region:'',pop:null,hover:null};
const params=new URLSearchParams(location.search);
// style select
$('sty').innerHTML='<option value="">All styles</option>'+Object.keys(VIBES).map(k=>`<option value="${k}">${VIBES[k]}</option>`).join('');
function curReg(){const v=S.vb||[0,0,1200,1400],cx=v[0]+v[2]/2,cy=v[1]+v[3]/2;const near=v[2]<700?REG.map((r,i)=>[i,Math.hypot(X((r[1]+r[2])/2)-cx,Y((r[3]+r[4])/2)-cy)]).sort((a,b)=>a[1]-b[1])[0][0]:-1;return S.region?REG.findIndex(r=>r[0]==S.region):near}
function chips(){const cur=curReg();$('rname').textContent=cur>=0?REG[cur][0]:'All of Florida';
 const G=[['Panhandle',[0,1]],['Gulf Coast',[2,3,4]],['Keys',[5]],['Atlantic Coast',[6,7,8,9]]];
 $('rmenu').innerHTML=`<button data-r="all" class="${cur<0?'on':''}">All of Florida</button>`+G.map(([g,ix])=>`<h6>${g}</h6>`+ix.map(i=>`<button data-r="${i}" class="${i==cur?'on':''}">${REG[i][0]}</button>`).join('')).join('')}
chips();
function size(){const r=box.getBoundingClientRect();return [r.width,r.height]}
function fit(b,pad=.08){const [w,h]=size(),x0=X(b[0]),x1=X(b[1]),y0=Y(b[3]),y1=Y(b[2]);let bw=(x1-x0)*(1+pad*2),bh=(y1-y0)*(1+pad*2);const ar=w/h;if(bw/bh<ar)bw=bh*ar;else bh=bw/ar;if(bw<MINW){bh*=MINW/bw;bw=MINW}return [(x0+x1)/2-bw/2,(y0+y1)/2-bh/2,bw,bh]}
const ALL=[-87.75,-79.75,24.4,31.1];const MINW=150;
let anim=null;
function go(vb,ms=450){cancelAnimationFrame(anim);const a=S.vb.slice(),t0=performance.now();const step=n=>{let p=Math.min(1,(n-t0)/ms);p=1-Math.pow(1-p,3);S.vb=a.map((v,i)=>v+(vb[i]-v)*p);render(p<1);if(p<1)anim=requestAnimationFrame(step);else{render();list()}};anim=requestAnimationFrame(step)}
function match(t){if(S.style&&!t.v.includes(S.style))return false;if(S.price){const[a,b]=S.price.split('-').map(Number);if(t.pv==null||t.pv<a||t.pv>=b)return false}return true}
function inView(t,m=0){const v=S.vb;return t.x>v[0]+m&&t.x<v[0]+v[2]-m&&t.y>v[1]+m&&t.y<v[1]+v[3]-m}
function render(fast){
 {const[w0,h0]=size();if(w0<20||h0<20||!S.vb||!S.vb.every(isFinite))return}/* the quiz map is hidden until results; drawing at zero size made NaN view boxes */
 const [w,h]=size(),v=S.vb,k=v[2]/w;svg.setAttribute('viewBox',v.join(' '));base.style.setProperty('--k',k);
 const zoomed=v[2]<330,deep=v[2]<200;
 let s='';const boxes=[];
 {const mb=box.getBoundingClientRect();['rdd','all'].forEach(id=>{const el=$(id);if(!el||!el.offsetWidth)return;const r=el.getBoundingClientRect();boxes.push([r.left-mb.left-6,r.top-mb.top-6,r.width+12,r.height+12])})}
 if(S.pop&&w>=600){const pe=$('pop');boxes.push([0,h-pe.offsetHeight-32,pe.offsetWidth+32,pe.offsetHeight+32])}
 const hit=(x,y,bw,bh)=>{if(x<4||x+bw>w-4||y<2||y+bh>h-2)return true;for(const b of boxes)if(x<b[0]+b[2]&&x+bw>b[0]&&y<b[1]+b[3]&&y+bh>b[1])return true;boxes.push([x,y,bw,bh]);return false};
 // sea
 const seaDone={};[['Gulf of Mexico',26.9,-84.7],['Gulf of Mexico',28.6,-84.0],['Atlantic Ocean',29.2,-79.9],['Atlantic Ocean',26.6,-79.6],['Atlantic Ocean',30.3,-81.15],['Atlantic Ocean',28.7,-80.45],['Atlantic Ocean',27.6,-80.1],['Atlantic Ocean',25.6,-79.95],['Gulf of Mexico',30.05,-86.6],['Gulf of Mexico',29.5,-84.7],['Gulf of Mexico',29.15,-83.75],['Gulf of Mexico',28.4,-83.2],['Gulf of Mexico',27.3,-83.2],['Gulf of Mexico',25.9,-82.0]].forEach(([n,la,lo])=>{if(seaDone[n])return;const fs=zoomed?15:16,sx=(X(lo)-v[0])/k,sy=(Y(la)-v[1])/k,tw=n.length*fs*.62;if(sx<16||sx+tw>w-16||sy<fs+16||sy>h-16)return;if(T.some(t=>{const dx=(t.x-v[0])/k,dy=(t.y-v[1])/k;return dx>sx-40&&dx<sx+tw+40&&dy>sy-fs-30&&dy<sy+30}))return;if(hit(sx,sy-fs,tw,fs+4))return;seaDone[n]=1;s+=`<text class="sea" x="${X(lo)}" y="${Y(la)}" font-size="${fs*k}">${n}</text>`});
 const gk=S.mode=='vibes'?(S.gHover||(S.style&&S.gT0?S.style:null)):null;let gop=0;
 if(gk){if(S.gHover)gop=.45;else{const el=performance.now()-S.gT0;gop=el<900?.5:el<2600?.5*(1-(el-900)/1700):0;if(gop>0){cancelAnimationFrame(S.gRaf);S.gRaf=requestAnimationFrame(()=>render())}else S.gT0=0}}
 if(gk&&gop>0){const col=VCOL[gk];const L=T.filter(t=>t.v.includes(gk));let segs=[],cur=[];
  for(const t of L){const p=cur[cur.length-1];if(p&&(t.o-p.o<=6)&&Math.hypot(t.x-p.x,t.y-p.y)<70&&t.c==p.c)cur.push(t);else{if(cur.length)segs.push(cur);cur=[t]}}if(cur.length)segs.push(cur);
  let gp='';segs.forEach(sg=>{const all=T.filter(t=>t.o>=sg[0].o&&t.o<=sg[sg.length-1].o);gp+=`<path d="M${all.map(t=>t.x.toFixed(1)+','+t.y.toFixed(1)).join('L')}" fill="none" stroke="${col}" stroke-width="${30*k}" stroke-linecap="round" stroke-linejoin="round"/>`});
  s+=`<defs><filter id="gl" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="${7*k}"/></filter></defs><g filter="url(#gl)" opacity="${gop.toFixed(3)}">${gp}</g>`}
 // dots
 const vis=T.filter(t=>inView(t,-20*k));
 const pin=t=>S.pop&&S.pop.id==t.id||S.hover==t.id;
 vis.forEach(t=>{const m=match(t),sg=SIG.includes(t.id);const any=S.style||S.price;
  let r=any?(m?6:3):(sg?6.5:(zoomed?5:3.4));const op=any&&!m?(S.mode=='vibes'?1:.45):(sg||any?1:(zoomed?.85:.7));const fill=any&&!m?'#8C9799':(sg||any?'#152A2E':'#7F8B8D');
  if(pin(t))r=7;
  const vc=S.mode=='vibes'&&S.style&&m?VCOL[S.style]:null;
  if(vc){const rr=pin(t)?7.5:6;s+=`<circle class="dot" data-id="${t.id}" cx="${t.x}" cy="${t.y}" r="${rr*k}" fill="${vc}" stroke="#fff" stroke-width="${2.2*k}" style="filter:drop-shadow(0 1px 1.5px rgba(0,0,0,.25))"/>`}
  else s+=`<circle class="dot" data-id="${t.id}" cx="${t.x}" cy="${t.y}" r="${(S.mode=='vibes'&&S.style&&!m?(sg?4.5:3.2):r)*k}" fill="${S.mode=='vibes'&&S.style&&!m?'#152A2E':fill}" ${S.mode=='vibes'&&S.style&&!m?'fill-opacity=".55"':''} opacity="${op}" stroke="#fff" stroke-width="${(r>3?2:1)*k}"/>`});
 // labels: pinned first, then matched sig, then matched zoomed
 const want=[];vis.forEach(t=>{const m=match(t),sg=SIG.includes(t.id);if(pin(t))want.push([t,0]);else if(m&&(S.style||S.price))want.push([t,sg?1:2]);else if(sg&&(m||!S.style&&!S.price))want.push([t,2]);else if(sg&&S.mode=='vibes')want.push([t,3]);else if(zoomed&&m)want.push([t,3])});
 want.sort((a,b)=>a[1]-b[1]);
 let lab='';
 want.forEach(([t,pr])=>{const fs=(pr==3?14:16),cw=fs*.56,tw=t.n.length*cw+4,th=fs+4;
  const left=t.c=='gulf'||t.c=='panhandle'&&false;const sx=(t.x-v[0])/k,sy=(t.y-v[1])/k;
  const opts=t.c=='atlantic'?[[12,1],[-12,-1]]:[[-12,-1],[12,1]];
  for(const [dx,dir] of opts){const bx=dir>0?sx+dx:sx+dx-tw;if(pr>0&&hit(bx,sy-th/2,tw,th))continue;if(pr==0)boxes.push([bx,sy-th/2,tw,th]);
   if(pr==0)lab+=`<rect x="${v[0]+(bx-8)*k}" y="${v[1]+(sy-15)*k}" width="${(tw+16)*k}" height="${30*k}" rx="${15*k}" fill="#152A2E"/><text class="lbl" x="${v[0]+(bx+tw/2)*k}" y="${v[1]+(sy+5.5)*k}" text-anchor="middle" font-size="${fs*k}" fill="#fff" style="fill:#fff;stroke:none">${t.n}</text>`;
   else lab+=`<text class="lbl ${pr==3?'sm':''}" x="${v[0]+(dir>0?bx:bx+tw)*k}" y="${v[1]+(sy+fs*.35)*k}" text-anchor="${dir>0?'start':'end'}" font-size="${fs*k}" stroke-width="${4*k}">${t.n}</text>`;break}});
 vis.forEach(t=>{const sx=(t.x-v[0])/k,sy=(t.y-v[1])/k;boxes.push([sx-6,sy-6,12,12])});
 // cities last, only where free
 let cs='';if(!(S.mode=='sliders'&&S.top.length&&w<600))CITIES.forEach(([n,la,lo])=>{const x=X(lo),y=Y(la);if(x<v[0]||x>v[0]+v[2]||y<v[1]||y>v[1]+v[3])return;if(T.some(t=>t.n.startsWith(n)))return;const sx=(x-v[0])/k,sy=(y-v[1])/k,fs=12.5,tw=n.length*fs*.72;if(vis.some(t=>Math.hypot((t.x-x)/k,(t.y-y)/k)<(S.mode=='sliders'&&S.top.slice(0,5).includes(t.id)?90:S.mode=='sliders'&&S.top.includes(t.id)?50:26)))return;if(hit(sx+6,sy-9,tw+4,18))return;cs+=`<circle cx="${x}" cy="${y}" r="${3.6*k}" fill="#fff" stroke="#9AA3A5" stroke-width="${1.4*k}"/><text class="city" x="${x+9*k}" y="${y+5*k}" font-size="${fs*k}" stroke-width="${3.5*k}">${n}</text>`});
 if(S.mode=='sliders'&&S.top.length){let tp='',tl='',tpB='',tpS='';const order=S.top.map((id,i)=>[id,i]);const big=order.slice(0,5),sm=order.slice(5).reverse();
 const placed=[];const one=([id,i],B)=>{const t0=T.find(x=>x.id==id);if(!inView(t0,-40*k))return;
  let px=t0.x,py=t0.y;if(B){const R=34*k,free=(x,y)=>!placed.some(q=>Math.hypot(q[0]-x,q[1]-y)<R);if(!free(px,py)){const sea=t0.c=='atlantic'?1:-1;let best=null;for(let ring=1;ring<=3&&!best;ring++){for(const a of [0,40,-40,80,-80,120,-120,180]){const ang=(sea>0?0:180)+a*sea,rad=ang*Math.PI/180,x=t0.x+Math.cos(rad)*R*ring,y=t0.y+Math.sin(rad)*R*ring;if(free(x,y)){best=[x,y];break}}}if(best){px=best[0];py=best[1]}}placed.push([px,py]);
   if(px!=t0.x||py!=t0.y)tpS+=`<circle cx="${t0.x}" cy="${t0.y}" r="${3.2*k}" fill="#152A2E" stroke="#fff" stroke-width="${1.2*k}"/>`}
  const t=Object.assign({},t0,{x:px,y:py});const r=(B?(i==0?18:16):9.5)*k,fs=B?16.5:13;const hv=S.hover==id;
  const tw=t.n.length*(B?9.2:7.2),sx=(t.x-v[0])/k,sy=(t.y-v[1])/k;let side=t.c=='atlantic'?1:-1,dy=0;const off=B?22:15;
  const tryb=(sd,yy)=>{const bx=sd>0?sx+off:sx-off-tw;return hit(bx,sy+yy-10,tw,20)};
  let show=true;if(tryb(side,0)){const c=[[-side,0],[side,-20],[side,20],[-side,-20],[-side,20],[side,-40],[-side,40]].find(([a,b])=>!tryb(a,b));if(c){side=c[0];dy=c[1]}else show=hv||B}
  const c1=(i==0&&B?`<circle cx="${t.x}" cy="${t.y}" r="${r+6*k}" fill="none" stroke="#152A2E" stroke-width="${1.6*k}"/>`:'')+`<circle class="dot" data-id="${t.id}" cx="${t.x}" cy="${t.y}" r="${r}" fill="${i==0?'#152A2E':(B||hv?'#152A2E':'#fff')}" stroke="${B||hv?'#fff':'#5E6B6D'}" stroke-width="${(B?3:1.6)*k}" ${B?'style="filter:drop-shadow(0 1px 2px rgba(0,0,0,.3))"':''}/><text x="${t.x}" y="${t.y+(B?5.8:4.4)*k}" text-anchor="middle" style="font-family:var(--mapf)" font-weight="${B?700:600}" font-size="${(B?15.5:11.5)*k}" fill="${B||hv?'#fff':'#3A4A4D'}" pointer-events="none">${i+1}</text>`;if(B)tpB=c1+tpB;else tpS+=c1;
  if(show)tl+=`<text class="lbl ${B?'':'sm'}" x="${t.x+side*off*k}" y="${t.y+(fs*.35+dy)*k}" text-anchor="${side>0?'start':'end'}" font-size="${fs*k}" stroke-width="${4*k}" ${B?'':'style="font-weight:500;fill:#5E6B6D"'}>${t.n}</text>`};
 big.forEach(x=>one(x,true));if(!document.body.classList.contains("quiz"))sm.forEach(x=>one(x,false));
 tp=tpS+tpB;ov.innerHTML=s.replace(/<circle class="dot"([^>]*)r="[^"]*" fill="#152A2E"/g,'<circle class="dot"$1r="'+(2.6*k)+'" fill="#8C9799"')+cs+tp+tl;if(S.pop)placePop();return}
 ov.innerHTML=s+cs+lab;if(S.mode=='explore')title();chips();
 if(S.pop)placePop();
}
function title(){const ci=curReg(),r=ci>=0?REG[ci][0]:'All of Florida';$('h').textContent=r;const n=T.filter(t=>match(t)&&inView(t)).length;$('sub').textContent=`${n} ${S.style?VIBES[S.style]:'beach'} town${n==1?'':'s'}`+(S.style?` · ${VSUB[S.style]}`:'')}
function list(){chips();if(S.mode=='sliders')return;title();document.querySelectorAll('.tile').forEach(x=>x.classList.toggle('on',x.dataset.k==S.style));if(S.mode=='vibes'){$('h').textContent='Find towns by style';$('sub').textContent='12 styles across 167 beach towns. Pick one to see where it lives.';if(S.style){const n=T.filter(t=>t.v.includes(S.style)).length;$('seeall').innerHTML=`<span><b>${VIBES[S.style]}</b> &nbsp;${n} towns lit up on the map</span><button id="sa">See the towns</button>`;$('sa').onclick=()=>setMode('explore')}return}
 let L=T.filter(t=>match(t)&&(S.mode=='vibes'||inView(t)));
 if(S.sort=='lo')L.sort((a,b)=>(a.pv??1e9)-(b.pv??1e9));else if(S.sort=='hi')L.sort((a,b)=>(b.pv??-1)-(a.pv??-1));
 $('n').textContent='';
 const tot=T.filter(match).length;
 if(!L.length){$('grid').innerHTML=`<div class="empty" style="grid-column:1/-1">No ${S.style?VIBES[S.style]+' ':''}towns in this part of the map.<br>${tot} on the whole coast.<br><button id="ea">Show all of Florida</button></div>`;$('ea').onclick=()=>{S.region='';tags();go(fit(ALL,.02))};return}
 $('grid').innerHTML=L.map(t=>{const tg=t.v.slice(0,1).map(x=>`<b>${VIBES[x].toUpperCase()}</b>`).join('');const st=S.style?`<b>${VIBES[S.style].toUpperCase()}</b>`:'';
  return `<a class="card" href="towns/${t.id}-v3.html" data-id="${t.id}"><div class="ph" style="background-image:url('${t.img}')"><div class="tg">${st}</div></div>${t.p?`<div class="pr">${t.p}<small>typical home</small></div><div class="nm">${t.n}</div>`:`<div class="nm big" style="margin-top:10px">${t.n}</div><div class="rg">Too few sales for a median</div>`}<div class="rg">${t.r.replace(/ · /g,', ')}</div></a>`}).join('');
}
function rowOn(){document.querySelectorAll('.t5,.r15').forEach(r=>r.classList.toggle('on',!!S.pop&&r.dataset.id==S.pop.id))}
function placePop(){rowOn();const p=$('pop');p.style.left='16px';p.style.bottom='16px';p.style.top='auto'}
function openPop(t,nopan){S.pop=t;const p=$('pop');const rk=S.mode=='sliders'?S.top.indexOf(t.id):-1;p.innerHTML=`<div class="ph" style="background-image:url('${t.img}')"></div><button class="x" aria-label="Close">&times;</button><div class="bd">${rk>=0?`<div style="font-size:14px;font-weight:600;color:#152A2E">#${rk+1} ${SLK.some(([k])=>S.sv[k]!=50)?`of your top ${rk<5?5:15}`:'best all around'} &middot; ${Math.round(t.sc/5*100)}% match</div><div style="font-size:13px;color:#6B7678;margin:2px 0 6px">${whyOf(t)}</div>`:''}<h3>${t.n}</h3>${t.p?`<div class="pr">${t.p}<small>typical home</small></div>`:`<div class="pr" style="font-weight:400;color:#6B7678;font-size:15px">Too few sales for a median</div>`}<div class="rg">${t.r.replace(/ · /g,', ')}</div><p>${t.b}</p><a class="go" href="towns/${t.id}-v3.html">Explore this town</a></div>`;p.classList.remove('full');p.onclick=ev=>{if(!ev.target.closest('.x,.go'))p.classList.add('full')};p.classList.add('on');p.querySelector('.x').onclick=e=>{e.stopPropagation();closePop()};render();placePop();
 const [w,h]=size(),v=S.vb,k=v[2]/w,sx=(t.x-v[0])/k,sy=(t.y-v[1])/k,pw=p.offsetWidth+32,ph=p.offsetHeight+32;
 if(nopan){const[w,h]=size(),v=S.vb,k=v[2]/w,sx=(t.x-v[0])/k,sy=(t.y-v[1])/k;if(w>=600&&(sx<380||sx>w-60||sy<60||sy>h-40)){const cx=(380+w)/2;go([t.x-cx*k,t.y-h/2*k,v[2],v[3]],400)}return}const nar=w<600,under=nar?sy>h-ph:(sx<pw&&sy>h-ph),out=sx<40||sx>w-40||sy<40||sy>h-40;
 if(under||out){const cx=nar?w/2:(pw+w)/2,cy=nar?(h-ph)/2:h/2;go([t.x-cx*k,t.y-cy*k,v[2],v[3]])}}
function closePop(){S.pop=null;rowOn();$('pop').classList.remove('on');render()}
function tags(){chips();const tg=$('tag');const r=S.region;tg.textContent=r?r+' ✕':'';tg.classList.toggle('on',!!r)}
// events
$('rbtn').onclick=e=>{e.stopPropagation();$('rdd').classList.toggle('open')};document.addEventListener('click',e=>{if(!e.target.closest('#rdd'))$('rdd').classList.remove('open')});
$('rmenu').onclick=e=>{$('rdd').classList.remove('open');if(e.target.closest('button')&&e.target.closest('button').dataset.r=='all'){$('all').click();return}const b=e.target.closest('button');if(!b)return;const r=REG[b.dataset.r];S.region=r[0];tags();closePop();go(fit(r.slice(1)))};
$('tag').onclick=()=>{S.region='';tags();title()};
$('all').onclick=()=>{S.region='';tags();closePop();go(fit(ALL,.02))};
$('sty').onchange=e=>{S.style=e.target.value;e.target.classList.toggle('on',!!S.style);render();list()};
const pc=()=>{const a=+$('pmin').value,b=+$('pmax').value;S.price=(a>0||b<99999)?a+'-'+b:'';render();list()};$('pmin').onchange=pc;$('pmax').onchange=pc;
$('sort').onchange=e=>{S.sort=e.target.value;list()};
const zoomAt=(f,cx,cy)=>{const v=S.vb,[w,h]=size(),k=v[2]/w;const mx=v[0]+cx*k,my=v[1]+cy*k;let nw=Math.max(MINW,Math.min(1400,v[2]*f)),nh=nw*v[3]/v[2];return [mx-(mx-v[0])*nw/v[2],my-(my-v[1])*nh/v[3],nw,nh]};
$('zin').onclick=()=>{const[w,h]=size();go(zoomAt(.6,w/2,h/2),300)};$('zout').onclick=()=>{const[w,h]=size();go(zoomAt(1.6,w/2,h/2),300)};
let wt;let mapActive=false;box.addEventListener('pointerdown',()=>{mapActive=true});document.addEventListener('pointerdown',e=>{if(!e.target.closest('#mapbox'))mapActive=false});
const hint=document.createElement('div');hint.className='whint';hint.textContent='Click the map or hold Ctrl to zoom with your mouse';box.appendChild(hint);let ht;
box.addEventListener('wheel',e=>{if(!(mapActive||e.ctrlKey||e.metaKey)){hint.classList.add('on');clearTimeout(ht);ht=setTimeout(()=>hint.classList.remove('on'),1400);return}e.preventDefault();const r=box.getBoundingClientRect();S.vb=zoomAt(Math.exp(e.deltaY*.0015),e.clientX-r.left,e.clientY-r.top);S.region&&(S.region='',tags());render();clearTimeout(wt);wt=setTimeout(list,180)},{passive:false});
let dr=null;box.addEventListener('pointerdown',e=>{if(e.target.closest('.pop,.ctl,.zoom,.rdd'))return;dr={x:e.clientX,y:e.clientY,vb:S.vb.slice(),moved:false,t:e.target};box.setPointerCapture(e.pointerId)});
box.addEventListener('pointermove',e=>{if(!dr)return;const dx=e.clientX-dr.x,dy=e.clientY-dr.y;if(Math.abs(dx)+Math.abs(dy)>4){dr.moved=true;box.classList.add('drag')}if(!dr.moved)return;const[w]=size(),k=dr.vb[2]/w;S.vb=[dr.vb[0]-dx*k,dr.vb[1]-dy*k,dr.vb[2],dr.vb[3]];render()});
box.addEventListener('pointerup',e=>{if(!dr)return;box.classList.remove('drag');if(dr.moved){if(S.region){S.region='';tags()}list()}else{const el=document.elementFromPoint(e.clientX,e.clientY);const c=el&&el.closest('circle.dot');if(c){openPop(T.find(t=>t.id==c.dataset.id))}else if(!el.closest('.pop'))closePop()}dr=null});
$('grid').addEventListener('mouseover',e=>{const c=e.target.closest('.card');const id=c?c.dataset.id:null;if(id!==S.hover){S.hover=id;render()}});
$('grid').addEventListener('mouseleave',()=>{S.hover=null;render()});
$('q').addEventListener('keydown',e=>{if(e.key!='Enter')return;const q=e.target.value.trim().toLowerCase();if(!q)return;
 const r=REG.find(r=>r[0].toLowerCase().includes(q));const t=T.find(t=>t.n.toLowerCase().startsWith(q));const st=Object.keys(VIBES).find(k=>VIBES[k].toLowerCase().includes(q));
 if(t){go([t.x-MINW/2,t.y-MINW/2*S.vb[3]/S.vb[2],MINW,MINW*S.vb[3]/S.vb[2]]);setTimeout(()=>openPop(t),460)}else if(r){S.region=r[0];tags();go(fit(r.slice(1)))}else if(st){$('sty').value=st;$('sty').dispatchEvent(new Event('change'))}e.target.value=''});

// vibes mode
const VSUB2={island:"Barefoot and slow",oldfl:"Bait shops, no hurry",dock:"Life on the water",sophcalm:"Polished and easy",sophhigh:"Polished with a pulse",afford:"More house for less",active:"Trails and paddling",walk:"Daily life on foot",bluezone:"Walks and time outside",remote:"Pretty, with an easy airport",social:"Bars and events",beaches:"Top ranked sand"};
S.mode='explore';
function setMode(m){S.mode=m;setTimeout(()=>{render();if(m!='sliders')list()},30);$('mhint').textContent={explore:'See every beach town on the map and narrow by style or price.',vibes:'Pick the feel you want and see where it lives.',sliders:'Tell us what matters and we rank all 167 towns for you.'}[m];document.body.classList.toggle('vibes',m=='vibes');document.body.classList.toggle('sliders',m=='sliders');if(m=='sliders'){requestAnimationFrame(()=>{render()});document.querySelectorAll('#mode button').forEach(b=>b.classList.toggle('on',b.dataset.m==m));closePop();S.region='';tags();slRender();if(!S.top.length)go(fit(ALL,.02));return}document.body.classList.toggle('pick',m=='vibes'&&!!S.style);document.querySelectorAll('#mode button').forEach(b=>b.classList.toggle('on',b.dataset.m==m));
 if(m=='vibes'&&!S.style){S.region='';tags();closePop();go(fit(ALL,.02))}list()}
function fitStyle(k){const L=T.filter(t=>t.v.includes(k));const b=[Math.min(...L.map(t=>t.lo)),Math.max(...L.map(t=>t.lo)),Math.min(...L.map(t=>t.la)),Math.max(...L.map(t=>t.la))];const pad=.35;return fit([b[0]-1.1,b[1]+1.1,b[2]-pad,b[3]+pad],.04)}
$('tiles').innerHTML=Object.keys(VIBES).map(k=>`<button class="tile" data-k="${k}"><div class="ph" style="background-image:url('img/vibes/${k}.webp')"><i><span style="display:inline-block;width:9px;height:9px;border-radius:50%;background:${VCOL[k]};margin-right:6px"></span>${T.filter(t=>t.v.includes(k)).length} towns</i></div><b>${VIBES[k]}</b><small>${VSUB2[k]}</small></button>`).join('');
$('tiles').onclick=e=>{const b=e.target.closest('.tile');if(!b)return;const k=b.dataset.k;if(S.style==k){$('back').onclick();return}S.style=k;S.gHover=null;S.gT0=performance.now()+450;$('sty').value=k;$('sty').classList.add('on');S.region='';tags();document.body.classList.add('pick');closePop();go(fitStyle(k));$('res').scrollTop=0};
$('tiles').addEventListener('mouseover',e=>{const b=e.target.closest('.tile');const k=b?b.dataset.k:null;if(k!==S.gHover){S.gHover=k;render()}});$('tiles').addEventListener('mouseleave',()=>{S.gHover=null;render()});
$('back').onclick=()=>{S.style='';$('sty').value='';$('sty').classList.remove('on');document.body.classList.remove('pick');closePop();go(fit(ALL,.02))};
$('mode').onclick=e=>{const b=e.target.closest('button');if(!b)return;setMode(b.dataset.m)};

// sliders mode
const SLK=[['beach','Beaches'],['water','On the water'],['walk','Walkability'],['afford','Value for the money'],['outdoors','Active outdoors'],['airport','Near an airport'],['nightlife','Nightlife']];
const SLW={afford:["Price is no issue","Price matters a little","Either way","Want good value","Most house for the money"],beach:["Any beach is fine","Some sand nearby","Either way","A real sandy beach nearby","Nationally ranked beaches"],walk:["Happy to drive","A few things on foot","Either way","Walk to coffee and dinner","Walk everywhere"],water:["Not a boater","Water nearby is nice","Either way","Want to be on the water","Live right on the water"],airport:["Don't fly much","An airport within reach","Either way","I fly often","Airport close by"],nightlife:["Early nights","A night out now and then","Either way","Out most weekends","Lots of nightlife"],outdoors:["Not a priority","Some trails and paddling","Either way","Outside a lot","Paddle, surf or ride every day"]};
const WHYW={beach:'beaches',water:'the water',walk:'walkability',afford:'value',outdoors:'the outdoors',airport:'the airport',nightlife:'nightlife'};
S.sv={};SLK.forEach(([k])=>S.sv[k]=50);S.top=[];
function whyOf(t){const pri=SLK.filter(([k])=>S.sv[k]>50).map(([k])=>k);const best=(pri.length?pri:SLK.map(([k])=>k)).filter(k=>rank[t.id][k]<=40).sort((a,b)=>rank[t.id][a]-rank[t.id][b]).slice(0,2);return best.length?best.map(k=>'#'+rank[t.id][k]+' in Florida for '+WHYW[k]).join(', '):'A good all around match'}
const band=v=>v<=0?0:v<35?1:v<65?2:v<85?3:4;
const rank={};SLK.forEach(([k])=>{const L=T.slice().sort((a,b)=>(b.f[k]||0)-(a.f[k]||0));L.forEach((t,i)=>{(rank[t.id]=rank[t.id]||{})[k]=i+1})});
function slRender(){
 const rows=SLK.map(([k,n])=>{const v=S.sv[k];return `<div class="srow ${v!=50?'set':''}"><div class="st"><b>${n}</b><span>${v!=50?SLW[k][band(v)]:''}</span></div><input type="range" min="0" max="100" value="${v}" data-k="${k}" style="--p:${v}%" aria-label="${n}"></div>`}).join('');
 $('sl').innerHTML=`<div class="sbox">${rows}</div><div class="top5" id="top5"></div><div id="m15"></div><div class="recv" id="recv"></div><button class="slsave" onclick="document.querySelector('.save').click()">Save these results</button>`;
 $('sl').querySelectorAll('input').forEach(i=>i.oninput=e=>{const k=i.dataset.k,v=+i.value;S.sv[k]=v;i.style.setProperty('--p',v+'%');const row=i.closest('.srow');row.classList.toggle('set',v!=50);row.querySelector('span').textContent=v!=50?SLW[k][band(v)]:'';score()});
 score(true)}
function slReset(){SLK.forEach(([k])=>S.sv[k]=50);slRender()}
let i0;
function score(first){const set=SLK.filter(([k])=>S.sv[k]!=50);
 
 const W={};SLK.forEach(([k])=>{W[k]=Math.pow(S.sv[k]/50,2)});const tw=Object.values(W).reduce((a,b)=>a+b,0);
 if(window.QF){T.forEach(t=>t.sc=QF(t)*5)}else T.forEach(t=>{let sc=0;SLK.forEach(([k])=>{let x=t.f[k]||0;if(S.sv[k]>=90&&x<2.5)x-=1.5;sc+=W[k]*x});t.sc=sc/tw});
 const L15=(window.QR?QR():T.filter(t=>!S.style||t.v.includes(S.style)).sort((a,b)=>b.sc-a.sc)).slice(0,15),L=L15.slice(0,5);S.top=L15.map(t=>t.id);
 const pri=SLK.filter(([k])=>S.sv[k]>50).map(([k])=>k);
 $('top5').innerHTML=`<h2>${set.length?'Your top 5':'Best all around'}</h2>`+L.map((t,i)=>{const best=(pri.length?pri:SLK.map(([k])=>k)).filter(k=>rank[t.id][k]<=40).sort((a,b)=>rank[t.id][a]-rank[t.id][b]).slice(0,2);const why=best.length?best.map(k=>'#'+rank[t.id][k]+' for '+WHYW[k]).join(', '):'A good all around fit';
  return `<a class="t5" href="towns/${t.id}-v3.html" data-id="${t.id}" data-n="${i}"><i class="rk">${i+1}</i><div class="ph" style="background-image:url('${t.img}')"><i>${i+1}</i></div><div><b>${t.n}</b><div class="fit"><span class="mp">${Math.round(t.sc/5*100)}% match</span>${t.p?' &nbsp;<span style="font-weight:400;color:#6B7678">'+t.p+'</span>':''}</div><div class="why">${why}</div></div></a>`}).join('');$('m15').innerHTML=`<div class="more15"><h3>Also a good fit</h3>${L15.slice(5).map((t,i)=>`<a class="r15" href="towns/${t.id}-v3.html" data-id="${t.id}"><i>${i+6}</i>${t.n}<span>${Math.round(t.sc/5*100)}% match</span></a>`).join('')}</div>`;
 {const c={};L15.forEach((t,i)=>t.v.forEach(v=>c[v]=(c[v]||0)+(i<5?2:1)));const k=Object.keys(c).sort((a,b)=>c[b]-c[a])[0];if(k&&$('recv')){const n=L.filter(t=>t.v.includes(k)).length,tot=T.filter(t=>t.v.includes(k)).length;$('recv').innerHTML=`<h4>Your vibe</h4><div class="ph" style="background-image:url('img/vibes/${k}.webp')"><i>${tot} towns</i></div><b>${VIBES[k]}</b><small>${VSUB[k]}</small><div class="why">${n==5?`All 5 of your top towns are ${VIBES[k].toLowerCase()}.`:n==1?`1 of your top 5 towns fits, plus more in your top 15.`:`${n} of your top 5 towns fit this vibe.`}</div><button onclick="S.style='${k}';$('sty').value='${k}';$('sty').classList.add('on');setMode('vibes');document.body.classList.add('pick');S.gT0=performance.now()+450;go(fitStyle('${k}'))">See all ${tot} ${VIBES[k]} towns</button>`}}
 $('h').textContent='Weigh what matters';$('sub').innerHTML=set.length?`${set.length} set &middot; your top 5 are on the map <button class="sreset" onclick="slReset()">Reset</button>`:'Slide up what you care about. Your top 5 light up on the map.';
 clearTimeout(S.ft);S.ft=setTimeout(()=>{const P=L;const[w,h]=size(),nw=w<600;
  if(nw){const b=[Math.min(...P.map(t=>t.lo)),Math.max(...P.map(t=>t.lo)),Math.min(...P.map(t=>t.la)),Math.max(...P.map(t=>t.la))];go(fit([b[0]-1.3,b[1]+1.3,b[2]-.35,b[3]+.35],.04),first?0:500);return}
  const pe=$('pop'),cw=(pe.offsetWidth||320)+40,ch=(pe.offsetHeight||400)+40,KS=fit(ALL,0)[2]/w;
  const xs=P.map(t=>t.x),ys=P.map(t=>t.y),x0=Math.min(...xs),x1=Math.max(...xs),y0=Math.min(...ys),y1=Math.max(...ys);
  const QL=window.QLEFT?QLEFT():0,gl=QL?QL+(P.some(t=>t.c!='atlantic')?150:40):(P.some(t=>t.c!='atlantic')?195:30),ar=P.some(t=>t.c=='atlantic')?165:30,T0=62,B0=h-34;
  let k=Math.max((x1-x0)/(w-gl-ar-40),(y1-y0)/(B0-T0),KS*.3),cx,cy,sx,sy,ok=false;
  for(let it=0;it<40&&!ok;it++){const bw=(x1-x0)/k,bh=(y1-y0)/k;
   sx=Math.max(gl+20+bw/2,w-ar-bw/2-10);sx=Math.min(sx,w-ar-bw/2);sy=(T0+B0)/2;cx=(x0+x1)/2;cy=(y0+y1)/2;
   ok=QL?true:P.every(t=>{const px=sx+(t.x-cx)/k,py=sy+(t.y-cy)/k;return !(px<cw+(t.c!='atlantic'?120:20)&&py>h-ch-20)});
   if(!ok){const up=P.every(t=>{const px=sx+(t.x-cx)/k,py=sy+(t.y-cy)/k-(sy-T0-bh/2);return !(px<cw+(t.c!='atlantic'?120:20)&&py>h-ch-20)});if(up){sy=T0+bh/2;ok=true;break}k*=1.07}}
  if(k>=KS){go(fit(ALL,.02),first?0:500);return}go([cx-sx*k,cy-sy*k,w*k,h*k],first?0:500)},first?0:250);if(size()[0]>=600){const t1=T.find(t=>t.id==S.top[0]);if(!S.pop||!S.top.includes(S.pop.id)||S.pop.id===S.auto||S.pop.id!==S.pinned)openPop(t1,true);S.pinned=t1.id;S.auto=t1.id}render()}
$('sl').addEventListener('mouseover',e=>{const c=e.target.closest('.t5,.r15');const id=c?c.dataset.id:null;if(id!==S.hover){S.hover=id;if(id&&size()[0]>=600){S.pinned=id;openPop(T.find(t=>t.id==id),true)}render()}});
document.getElementById('mhint').textContent='See every beach town on the map and narrow by style or price.';

// save search
function shareURL(){const q=new URLSearchParams();const ci=curReg();if(ci>=0)q.set('region',REG[ci][0]);if(S.style)q.set('style',S.style);if(S.price)q.set('price',S.price);if(S.mode!='explore')q.set('mode',S.mode);if(S.mode=='sliders'){const sv=SLK.filter(([k])=>S.sv[k]!=50).map(([k])=>k+':'+S.sv[k]).join(',');if(sv)q.set('sv',sv)}return location.origin+location.pathname+'?'+q.toString()}
function sumText(){const ci=curReg(),parts=[ci>=0?REG[ci][0]:'All of Florida'];if(S.style)parts.push(VIBES[S.style]);if(S.price){const[a,b]=S.price.split('-').map(Number);parts.push(`$${a>=1000?a/1000+'M':a+'K'} to ${b>=99999?'any':'$'+(b>=1000?b/1000+'M':b+'K')}`)}if(S.mode=='sliders'){const n=SLK.filter(([k])=>S.sv[k]!=50).length;if(n)parts.push(`${n} priorities set`)}return parts.join(' · ')}
document.querySelector('.save').onclick=()=>{$('svb').classList.remove('sent');$('svsum').textContent=sumText();$('svl').value=shareURL();$('sv').classList.add('on');setTimeout(()=>$('sve').focus(),50)};
$('svx').onclick=()=>$('sv').classList.remove('on');$('sv').onclick=e=>{if(e.target.id=='sv')$('sv').classList.remove('on')};
$('svc').onclick=()=>{$('svl').select();try{navigator.clipboard.writeText($('svl').value)}catch(e){}$('svc').textContent='Copied'};
$('svgo').onclick=()=>{const e=$('sve').value.trim();if(!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(e)){$('sve').style.borderColor='#B3261E';$('sve').focus();return}
 /* TODO dev build: POST {email, url:shareURL(), summary:sumText()} to the lead pipeline (same as quiz leads) */
 $('svdone').textContent=`We'll send the link to ${e}. Open it anytime to pick up right here.`;$('svb').classList.add('sent')};
addEventListener('resize',()=>{render();list()});
// start: zoomed in like Compass
if(params.get('price')){S.price=params.get('price');const[a,b]=S.price.split('-');$('pmin').value=a;$('pmax').value=b}
const st0=params.get('style')||'';if(st0){S.style=st0;$('sty').value=st0;$('sty').classList.add('on')}
const r0=REG.find(r=>r[0]==(params.get('region')||'Southwest Gulf'));S.region=r0[0];S.vb=fit(r0.slice(1));tags();render();list();
if(params.get('mode')=='vibes'){S.mode='vibes';document.body.classList.add('vibes');document.querySelectorAll('#mode button').forEach(b=>b.classList.toggle('on',b.dataset.m=='vibes'));if(S.style){document.body.classList.add('pick');S.region='';tags();S.vb=fitStyle(S.style);S.gT0=performance.now()}else{S.region='';tags();S.vb=fit(ALL,.02)}render();list()}
if(params.get('mode')=='sliders'){setMode('sliders');const pr=params.get('sv');if(pr){pr.split(',').forEach(x=>{const[a,b]=x.split(':');S.sv[a]=+b});slRender()}}
if(params.get('open')){const t=T.find(t=>t.id==params.get('open'));if(t)openPop(t)}
