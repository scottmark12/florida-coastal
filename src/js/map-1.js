const VIBES={beaches:"Best Beaches",oldfl:"Old Florida",bluezone:"Healthy Living",island:"Island Life",dock:"Dock of the Bay",sophhigh:"High Energy",social:"Social Scene",sophcalm:"Sophisticated Laid Back",active:"Active Outdoors",walk:"Walkable",remote:"Remote Work",afford:"Affordable"};
const VCOL={oldfl:'#2F9460',dock:'#3A62C8',island:'#1FA39A',sophcalm:'#7B62D8',sophhigh:'#C8407F',social:'#E0604F',active:'#6FA53E',bluezone:'#2A93CF',walk:'#B055C0',remote:'#DB8430',beaches:'#D2A52A',afford:'#B5643F'};


const VSUB={island:"Barefoot, small and slow",oldfl:"Fish houses, bait shops and no hurry",dock:"Life on and around the water",sophcalm:"Polished and easy",sophhigh:"Polished with a pulse",afford:"More house for less",active:"Trails, paddling and the outdoors",walk:"Daily life on foot",bluezone:"Long walks, time outside, friendly faces",remote:"Pretty, with an easy airport",social:"Bars, events and people",beaches:"Nationally ranked sand"};
const SIG=['30a','apalachicola','cedarkey','clearwaterbeach','siesta-key','naples','keywest','delray','vero-beach','cocoa','nsb','staug'];
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
const SAT=(()=>{let v=0;const f=()=>{const d=document.createElement('div');d.style.cssText='position:fixed;top:0;height:env(safe-area-inset-top);visibility:hidden';document.body.appendChild(d);v=d.offsetHeight||0;d.remove()};if(document.body)f();else addEventListener('DOMContentLoaded',f);return()=>v})();
const HDR=()=>matchMedia('(max-width:760px)').matches?64+SAT():0;
function fit(b,pad=.08,raw){const [w,h0]=size(),hd=HDR(),bt=(!raw&&typeof SHON=='function'&&SHON())?Math.max(PK()+10,(typeof SHEET!='undefined'&&SHEET.st=='half')?SHRES()-4:0):0,h=Math.max(160,h0-hd-bt);const r0=fit0(b,pad,w,h);const kk=r0[2]/w;return [r0[0],r0[1]-hd*kk,r0[2],r0[3]+(h0-h-hd+hd)*kk]}
function fit0(b,pad,w,h){const x0=X(b[0]),x1=X(b[1]),y0=Y(b[3]),y1=Y(b[2]);let bw=(x1-x0)*(1+pad*2),bh=(y1-y0)*(1+pad*2);const ar=w/h;if(bw/bh<ar)bw=bh*ar;else bh=bw/ar;if(bw<MINW){bh*=MINW/bw;bw=MINW}return [(x0+x1)/2-bw/2,(y0+y1)/2-bh/2,bw,bh]}
const ALL=[-87.75,-79.75,24.4,31.1];const MINW=150;
let anim=null;
function vbOk(vb){return vb&&vb.length==4&&vb.every(Number.isFinite)&&vb[2]>=MINW*.85&&vb[3]>=60&&vb[2]<6000}
function go(vb,ms=450){if(!vbOk(vb)){const[w,h]=size();vb=(w>20&&h>20)?fit0(ALL,.02,w,h):S.vb}if(!vbOk(S.vb))S.vb=vb.slice();cancelAnimationFrame(anim);const a=S.vb.slice(),t0=performance.now();const step=n=>{let p=Math.min(1,(n-t0)/ms);p=1-Math.pow(1-p,3);S.vb=a.map((v,i)=>v+(vb[i]-v)*p);render(p<1);if(p<1)anim=requestAnimationFrame(step);else{render();list()}};anim=requestAnimationFrame(step)}
function match(t){if(S.style&&!t.v.includes(S.style))return false;if(S.mode=="vibes"&&!needOk(t))return false;if(S.price){const[a,b]=S.price.split('-').map(Number);if(t.pv==null||t.pv<a||t.pv>=b)return false}return true}
function inView(t,m=0){const v=S.vb;return t.x>v[0]+m&&t.x<v[0]+v[2]-m&&t.y>v[1]+m&&t.y<v[1]+v[3]-m}
function render(fast){
 if(!vbOk(S.vb)){const[w0,h0]=size();if(w0>20&&h0>20)S.vb=fit0(ALL,.02,w0,h0)}
 const [w,h]=size(),v=S.vb,k=v[2]/w;svg.setAttribute('viewBox',v.join(' '));base.style.setProperty('--k',k);
 const zoomed=v[2]<330,deep=v[2]<200;
 let s='';const boxes=[];
 {const mb=box.getBoundingClientRect();['rdd','all'].forEach(id=>{const el=$(id);if(!el||!el.offsetWidth)return;const r=el.getBoundingClientRect();boxes.push([r.left-mb.left-6,r.top-mb.top-6,r.width+12,r.height+12])})}
 if(S.pop&&w>=600){const pe=$('pop');boxes.push([0,h-pe.offsetHeight-32,pe.offsetWidth+32,pe.offsetHeight+32])}
 const hit=(x,y,bw,bh)=>{if(x<4||x+bw>w-4||y<2||y+bh>h-2)return true;for(const b of boxes)if(x<b[0]+b[2]&&x+bw>b[0]&&y<b[1]+b[3]&&y+bh>b[1])return true;boxes.push([x,y,bw,bh]);return false};
 // sea
 const seaDone={};if(!(S.mode=='sliders'&&S.top.length))[['Gulf of Mexico',26.9,-84.7],['Gulf of Mexico',28.6,-84.0],['Atlantic Ocean',29.2,-79.9],['Atlantic Ocean',26.6,-79.6],['Atlantic Ocean',30.3,-81.15],['Atlantic Ocean',28.7,-80.45],['Atlantic Ocean',27.6,-80.1],['Atlantic Ocean',25.6,-79.95],['Gulf of Mexico',30.05,-86.6],['Gulf of Mexico',29.5,-84.7],['Gulf of Mexico',29.15,-83.75],['Gulf of Mexico',28.4,-83.2],['Gulf of Mexico',27.3,-83.2],['Gulf of Mexico',25.9,-82.0]].forEach(([n,la,lo])=>{if(seaDone[n])return;const fs=zoomed?15:16,sx=(X(lo)-v[0])/k,sy=(Y(la)-v[1])/k,tw=n.length*fs*.62;if(sx<16||sx+tw>w-16||sy<fs+16||sy>h-16)return;if(T.some(t=>{const dx=(t.x-v[0])/k,dy=(t.y-v[1])/k;return dx>sx-40&&dx<sx+tw+40&&dy>sy-fs-30&&dy<sy+30}))return;if(hit(sx,sy-fs,tw,fs+4))return;seaDone[n]=1;s+=`<text class="sea" x="${X(lo)}" y="${Y(la)}" font-size="${fs*k}">${n}</text>`});
 const gk=S.mode=='vibes'?(S.gHover||(S.style&&S.gT0?S.style:null)):null;let gop=0;
 if(gk){if(S.gHover)gop=.45;else{const el=performance.now()-S.gT0;gop=el<900?.5:el<2600?.5*(1-(el-900)/1700):0;if(gop>0){cancelAnimationFrame(S.gRaf);S.gRaf=requestAnimationFrame(()=>render())}else S.gT0=0}}
 if(false&&gk&&gop>0){const col=VCOL[gk];const L=T.filter(t=>t.v.includes(gk));let segs=[],cur=[];
  for(const t of L){const p=cur[cur.length-1];if(p&&(t.o-p.o<=6)&&Math.hypot(t.x-p.x,t.y-p.y)<70&&t.c==p.c)cur.push(t);else{if(cur.length)segs.push(cur);cur=[t]}}if(cur.length)segs.push(cur);
  let gp='';segs.forEach(sg=>{const all=T.filter(t=>t.o>=sg[0].o&&t.o<=sg[sg.length-1].o);gp+=`<path d="M${all.map(t=>t.x.toFixed(1)+','+t.y.toFixed(1)).join('L')}" fill="none" stroke="${col}" stroke-width="${30*k}" stroke-linecap="round" stroke-linejoin="round"/>`});
  s+=`<defs><filter id="gl" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="${7*k}"/></filter></defs><g filter="url(#gl)" opacity="${gop.toFixed(3)}">${gp}</g>`}
 // dots
 const vis=T.filter(t=>inView(t,-20*k));
 const pin=t=>S.pop&&S.pop.id==t.id||S.hover==t.id;
 const slTop=S.mode=='sliders'&&S.top.length,dflt=!S.style&&!S.price&&!slTop;
 /* Nov 12: no clusters (Mark: every town is a dot, like the live map) */const CL=[],inClu=new Set();const s0=s.length;let sg0='';CL.forEach(c=>c.forEach(t=>inClu.add(t.id)));
 vis.forEach(t=>{if(inClu.has(t.id))return;const m=match(t),sg=SIG.includes(t.id);const any=S.style||S.price;if(!pin(t)&&slTop)return;if(!pin(t)&&S.mode=='vibes'&&!S.style&&S.demo&&!t.v.includes(S.demo))return;if(S.mode=='vibes'&&S.style&&!m&&!pin(t)){sg0+=`<circle class="dot" data-id="${t.id}" cx="${t.x}" cy="${t.y}" r="${3.2*k}" fill="#A7B0B2" stroke="#fff" stroke-width="${1.1*k}"/>`;return}
  let r=any?(m?5.5:3):(sg?5:(zoomed?4.5:3));const op=any&&!m?(S.mode=='vibes'?1:.45):(sg||any?1:(zoomed?.85:.8));const fill=any&&!m?'#8C9799':(sg||any?'#152A2E':'#6B7678');
  if(pin(t))r=7;
  const dm=S.mode=='vibes'&&!S.style&&S.demo&&t.v.includes(S.demo),vc=S.mode=='vibes'&&S.style&&m?VCOL[S.style]:dm?VCOL[S.demo]:null;
  if(vc){const rr=pin(t)?7:dm?6:5;if(dm)s+=`<circle class="ddh" cx="${t.x}" cy="${t.y}" r="${13*k}" fill="${vc}" style="animation-delay:${((t.o||t.x|0)*137)%1400}ms"/>`;s+=`<circle class="dot${dm?' dd':''}" data-id="${t.id}" cx="${t.x}" cy="${t.y}" r="${rr*k}" fill="${vc}" stroke="#fff" stroke-width="${2.2*k}" style="filter:drop-shadow(0 1px 1.5px rgba(0,0,0,.25))"/>`}
  else s+=`<circle class="dot" data-id="${t.id}" cx="${t.x}" cy="${t.y}" r="${(S.mode=='vibes'&&S.style&&!m?(sg?4.5:3.2):r)*k}" fill="${S.mode=='vibes'&&S.style&&!m?'#152A2E':fill}" ${S.mode=='vibes'&&S.style&&!m?'fill-opacity=".55"':''} opacity="${op}" stroke="#fff" stroke-width="${(r>3?2:1)*k}"/>`});
 s=s.slice(0,s0)+sg0+s.slice(s0);
 CL.forEach(c=>{const L=c[0],n=c.length,bx=(L.x-v[0])/k,by=(L.y-v[1])/k;boxes.push([bx-16,by-16,32,32]);s+=`<g class="clu" data-ids="${c.map(t=>t.id).join(',')}" style="cursor:pointer"><circle cx="${L.x}" cy="${L.y}" r="${13*k}" fill="${VCOL[S.style]||'#152A2E'}" stroke="#fff" stroke-width="${2.4*k}" style="filter:drop-shadow(0 1px 2px rgba(0,0,0,.3))"/><text x="${L.x}" y="${L.y+4.6*k}" text-anchor="middle" font-size="${13*k}" font-weight="600" fill="#fff" style="font-family:var(--mapf);pointer-events:none">${n}</text></g>`});
 // labels: pinned first, then matched sig, then matched zoomed
 const want=[];CL.forEach(c=>want.push([Object.assign({},c[0],c.length<=3?{n:c.map(t=>t.n.replace(/ \(.*\)$/,'')).sort((p,q)=>q.length-p.length)[0],_names:c.slice().sort((p,q)=>p.y-q.y).map(t=>[t.id,t.n.replace(/ \(.*\)$/,'')]),_clu:1,_off:20}:{n:c[0].n.replace(/ \(.*\)$/,'')+' +'+(c.length-1),_clu:1,_off:20}),c.length<=3?0.5:1]));vis.forEach(t=>{if(inClu.has(t.id))return;const m=match(t),sg=SIG.includes(t.id);if(pin(t))want.push([t,0]);else if(m&&(S.style||S.price)){if(sg)want.push([t,1]);else if(zoomed||(S.mode=='vibes'&&isR(S.style)))want.push([t,2])}else if(sg&&!S.style&&!S.price&&!(S.mode=='vibes'&&S.demo&&!t.v.includes(S.demo)))want.push([t,2]);else if(zoomed&&m)want.push([t,3])});
 if(S.mode=='vibes'&&isR(S.style)){const cap=w<600?5:8,ok=new Set(T.filter(t=>t.v.includes(S.style)).map(t=>[t,-t.v.filter(v=>!isR(v)).length,Math.min(...['beach','walk','charm','meet','water'].map(k=>LD[t.id].rk[k]||999))]).sort((a,b)=>a[1]-b[1]||a[2]-b[2]).map(x=>x[0]).slice(0,cap).map(t=>t.id));for(let i=want.length-1;i>=0;i--)if(want[i][1]>0&&!want[i][0]._clu&&!ok.has(want[i][0].id))want.splice(i,1)}
 want.sort((a,b)=>a[1]-b[1]);if(!zoomed&&(S.style||S.price)){let c=0;const keep=[];want.forEach(w=>{if(w[1]==0||c<6){keep.push(w);if(w[1]>0)c++}});want.length=0;keep.forEach(w=>want.push(w))}
 {const any=S.style||S.price;vis.forEach(t=>{if(slTop)return;const show=any?match(t):SIG.includes(t.id);if(!show||pin(t))return;const sx=(t.x-v[0])/k,sy=(t.y-v[1])/k;boxes.push([sx-5,sy-5,10,10])})}
 let lab='';const placed=new Set();
 want.forEach(([t0,pr])=>{const t=t0._clu?t0:Object.assign({},t0,{n:t0.n.replace(/ \(.*\)$/,'')}),fs=(pr==3?12:13.5),cw=fs*.57,tw=t.n.length*cw+4,nl=t._names?t._names.length:1,th=(fs+4)*nl;
  const left=t.c=='gulf'||t.c=='panhandle'&&false;const sx=(t.x-v[0])/k,sy=(t.y-v[1])/k;
  const o0=t._off||10,opts=t.c=='atlantic'?[[o0,1],[-o0,-1]]:[[-o0,-1],[o0,1]];
  for(const [dx,dir] of opts){const bx=dir>0?sx+dx:sx+dx-tw;if(pr>0&&hit(bx,sy-th/2,tw,th))continue;placed.add(t.id);if(pr==0)boxes.push([bx,sy-th/2,tw,th]);
   if(pr==0)lab+=`<rect x="${v[0]+(bx-8)*k}" y="${v[1]+(sy-15)*k}" width="${(tw+16)*k}" height="${30*k}" rx="${15*k}" fill="#152A2E"/><text class="lbl" x="${v[0]+(bx+tw/2)*k}" y="${v[1]+(sy+5.5)*k}" text-anchor="middle" font-size="${fs*k}" fill="#fff" style="fill:#fff;stroke:none">${t.n}</text>`;
   else if(t._names){boxes.push([bx,sy-th/2,tw,th]);t._names.forEach(([id,nm],i)=>{lab+=`<text class="lbl clul" data-id="${id}" x="${v[0]+(dir>0?bx:bx+tw)*k}" y="${v[1]+(sy-th/2+(fs+4)*i+fs*.9)*k}" text-anchor="${dir>0?'start':'end'}" font-size="${fs*k}" stroke-width="${2.4*k}">${nm}</text>`})}
   else lab+=`<text class="lbl ${pr==3?'sm':''}" x="${v[0]+(dir>0?bx:bx+tw)*k}" y="${v[1]+(sy+fs*.35)*k}" text-anchor="${dir>0?'start':'end'}" font-size="${fs*k}" stroke-width="${2.4*k}">${t.n}</text>`;break}});
 if(dflt&&!zoomed)SIG.forEach(id=>{if(!placed.has(id)&&!(S.pop&&S.pop.id==id))s=s.replace(new RegExp('<circle class="dot" data-id="'+id+'"[^>]*/>'),'')});
 vis.forEach(t=>{if(!pin(t)&&((!zoomed&&dflt&&!SIG.includes(t.id))||(slTop&&!S.top.includes(t.id))))return;const sx=(t.x-v[0])/k,sy=(t.y-v[1])/k;boxes.push([sx-6,sy-6,12,12])});
 // cities last, only where free
 let cs='';if(!(S.mode=='sliders'&&S.top.length&&w<600))CITIES.forEach(([n,la,lo])=>{const x=X(lo),y=Y(la);if(x<v[0]||x>v[0]+v[2]||y<v[1]||y>v[1]+v[3])return;if(T.some(t=>t.n.startsWith(n)))return;const sx=(x-v[0])/k,sy=(y-v[1])/k,fs=12.5,tw=n.length*fs*.72;if(vis.some(t=>Math.hypot((t.x-x)/k,(t.y-y)/k)<(S.mode=='sliders'&&S.top.slice(0,5).includes(t.id)?90:S.mode=='sliders'&&S.top.includes(t.id)?50:26)))return;if(hit(sx+6,sy-9,tw+4,18))return;cs+=`<circle cx="${x}" cy="${y}" r="${3.6*k}" fill="#fff" stroke="#9AA3A5" stroke-width="${1.4*k}"/><text class="city" x="${x+9*k}" y="${y+5*k}" font-size="${fs*k}" stroke-width="${3.5*k}">${n}</text>`});
 if(S.mode=='sliders'&&S.top.length){let tp='',tl='',tpB='',tpS='';const order=S.top.map((id,i)=>[id,i]);const big=order.slice(0,5),sm=order.slice(5,25).reverse();
 {boxes.length=0;big.forEach(([id])=>{const t=T.find(x=>x.id==id);boxes.push([(t.x-v[0])/k-17,(t.y-v[1])/k-17,34,34])})}const TB=[];const own=(bx,by,bw,bh,px,py)=>{if(bx<4||bx+bw>w-4||by<2||by+bh>h-2)return true;for(const q of boxes){if(px>=q[0]&&px<=q[0]+q[2]&&py>=q[1]&&py<=q[1]+q[3])continue;if(bx<q[0]+q[2]&&bx+bw>q[0]&&by<q[1]+q[3]&&by+bh>q[1])return true}return false};
 const one=([id,i],B)=>{const t=T.find(x=>x.id==id);if(!inView(t,-40*k))return;const hv=S.hover==id||(S.pop&&S.pop.id==id),sx=(t.x-v[0])/k,sy=(t.y-v[1])/k;
  if(B){/* Nov 12 (option C): black numbered circle plus the name in the map label style */const nm=t.n.replace(/ \(.*\)$/,''),fs=14,tw=nm.length*fs*.58,R=11,ext=tw+8;let side=0;
   const tryS=sd=>{const bx=sd>0?sx-R:sx-R-ext,bw=2*R+ext;return own(bx,sy-R-2,bw,2*R+4,sx,sy)?null:[bx,bw]};
   const pref=t.c=='atlantic'?1:-1;let r=tryS(pref);if(r)side=pref;else{r=tryS(-pref);if(r)side=-pref}
   if(!side&&hv){side=pref;r=[pref>0?sx-R:sx-R-ext,2*R+ext]}
   boxes.push(side?[r[0],sy-R-2,r[1],2*R+4]:[sx-R-2,sy-R-2,2*R+4,2*R+4]);
   let g=`<circle class="dot" data-id="${t.id}" cx="${t.x}" cy="${t.y}" r="${(hv?R+2:R)*k}" fill="#152A2E" stroke="#fff" stroke-width="${2*k}" style="filter:drop-shadow(0 1px 2px rgba(0,0,0,.28))"/><text x="${t.x}" y="${t.y+4.4*k}" text-anchor="middle" style="font-family:var(--mapf);pointer-events:none" font-weight="700" font-size="${12.5*k}" fill="#fff">${i+1}</text>`;
   if(side)g+=`<text class="lbl pnm2" data-id="${t.id}" x="${t.x+side*(R+6)*k}" y="${t.y+fs*.36*k}" text-anchor="${side>0?'start':'end'}" font-size="${fs*k}" stroke-width="${2.6*k}" style="font-weight:600">${nm}</text>`;
   TB.unshift(`<g class="pp" data-id="${t.id}">${g}</g>`);return}
  /* Nov 12: next best towns as small black dots (Regions map size), no numbers */tpS+=`<circle class="dot" data-id="${t.id}" cx="${t.x}" cy="${t.y}" r="${(hv?6:4.6)*k}" fill="#152A2E" stroke="#fff" stroke-width="${1.6*k}"/>`;
  if(hv){const nm=t.n.replace(/ \(.*\)$/,''),sd=t.c=='atlantic'?1:-1;tl+=`<text class="lbl sm" x="${t.x+sd*15*k}" y="${t.y+4.6*k}" text-anchor="${sd>0?'start':'end'}" font-size="${13*k}" stroke-width="${2.4*k}" style="font-weight:600">${nm}</text>`}};
 big.forEach(x=>one(x,true));sm.forEach(x=>one(x,false));
 tp=tpS+TB.join('');ov.innerHTML=s.replace(/<circle class="dot"([^>]*)r="[^"]*" fill="#152A2E"/g,'<circle class="dot"$1r="'+(2.6*k)+'" fill="#8C9799"')+cs+tp+tl;if(S.pop)placePop();return}
 ov.innerHTML=s+cs+lab;if(S.mode=='explore')title();chips();
 if(S.pop)placePop();
}
function title(){const ci=curReg(),r=ci>=0?REG[ci][0]:'All of Florida';$('h').textContent=r;const n=T.filter(t=>match(t)&&inView(t)).length;$('sub').textContent=`${n} ${S.style?VIBES[S.style]:'beach'} town${n==1?'':'s'}`+(S.style?` · ${VSUB[S.style]}`:'')}
function list(){chips();if(S.mode=='sliders')return;title();document.querySelectorAll('.tile').forEach(x=>x.classList.toggle('on',x.dataset.k==S.style));if(S.mode=='vibes'){vRender();return}
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
function vTag(v){return `<span class="stag"><i style="background:${VCOL[v]}"></i>${LK.VSHORT[v]||VIBES[v]}</span>`}
function ndWhy(t){const n=S.need,L=[],d=LD[t.id];S.style&&!isR(S.style)&&t.v.includes(S.style)&&L.push('Your style: '+(LK.VSHORT[S.style]||VIBES[S.style]));
 n.bud&&d.med&&L.push(`Median home about ${fK(d.med)}, under ${fK(n.bud)}`);n.school&&L.push(`Public schools rated ${d.es} of 5`);n.air&&L.push(`Close to ${d.ap||'a major airport'}`);
 return L.length?`<div class="why2"><b>Why it fits</b><ul>${L.map(x=>`<li>${x}</li>`).join('')}</ul></div>`:''}
const fK=k=>k>=1000?'$'+(k/1000).toFixed(k>=10000?0:2).replace(/\.?0+$/,'')+'M':'$'+Math.round(k)+'K';
function popList(){if(S.mode=='sliders')return S.top.slice(0,5).map(id=>T.find(t=>t.id==id));if(S.mode=='vibes'&&S.style)return vOrder();return []}
function openPop(t,nopan){S.pop=t;const p=$('pop');const L=popList(),ki=L.findIndex(x=>x.id==t.id),n=L.length,nx=n>1&&ki>=0?L[(ki+1)%n]:null,sh=x=>x.n.replace(/ \(.*\)$/,'');
 const d=LD[t.id],tags=(S.style&&!isR(S.style)&&t.v.includes(S.style)?[S.style]:[]).concat(t.v.filter(v=>v!==S.style&&LK.VFEEL.includes(v))).slice(0,3).map(vTag).join('');
 let eb=S.mode=='vibes'&&S.style=='best'&&t.bestRk?`#${t.bestRk} well rounded · ${d.rn}`:d.rn,mid='';
 if(S.mode=='sliders'&&ki>=0){{const fw=slFitWord(fitSl(t),S.best,ki),wy=slWhy(t);eb=fw?`${d.rn} · <b>${fw}</b>`:d.rn;mid=wy?`<div class="why1">${wy}</div>`:''}}
 else if(S.mode=='vibes')mid=ndWhy(t);
 const nav=ki>=0&&n>1;
 p.innerHTML=`<div class="ph" style="background-image:url('${t.img}')">${S.mode=='sliders'&&ki>=0?`<span class="rkb">${ki+1}</span>`:''}</div><button class="x" aria-label="Close">&times;</button><div class="bd"><div class="eb">${eb}</div><h3>${t.n}</h3>${tags?`<div class="tags">${tags}</div>`:''}${S.mode=='explore'?(t.p?`<div class="pr">${t.p}<small>typical home</small></div>`:''):''}${mid}<p>${t.b}</p>${nav?`<div class="pnav"><button data-st="-1" aria-label="Previous town">‹</button><a class="go" href="towns/${t.id}-v3.html">Explore ${sh(t)} →</a><button data-st="1" aria-label="Next town">›</button></div><div class="of">${ki+1} of ${S.mode=='sliders'?'your top 5':n} · next up ${sh(nx)}</div>`:`<a class="go" href="towns/${t.id}-v3.html">Explore this town →</a>`}</div>`;
 p.querySelectorAll('[data-st]').forEach(bn=>bn.onclick=e=>{e.stopPropagation();const j=(ki+(+bn.dataset.st)+n)%n;flyTo(L[j])});
 p.classList.remove('full');p.onclick=ev=>{if(!ev.target.closest('.x,.go'))p.classList.add('full')};p.classList.add('on');p.querySelector('.x').onclick=e=>{e.stopPropagation();closePop()};render();placePop();
 const [w,h]=size(),v=S.vb,k=v[2]/w,sx=(t.x-v[0])/k,sy=(t.y-v[1])/k,pw=p.offsetWidth+32,ph=p.offsetHeight+32;
 if(PH()){if(SHON()&&SHEET.st!='peek'&&!nopan)shSet('peek',true);const avail=SHON()?h-SHRES()-6:h-p.offsetHeight-10-14;if(sy<70+HDR()||sy>avail||sx<30||sx>w-30)go([t.x-w/2*k,t.y-Math.max(90+HDR(),(70+HDR()+avail)/2)*k,v[2],v[3]],420);return}if(FIXED())return;if(nopan){const[w,h]=size(),v=S.vb,k=v[2]/w,sx=(t.x-v[0])/k,sy=(t.y-v[1])/k;if(w>=600&&(sx<380||sx>w-60||sy<60||sy>h-40)){const cx=(380+w)/2;go([t.x-cx*k,t.y-h/2*k,v[2],v[3]],400)}return}const nar=w<600,under=nar?sy>h-ph:(sx<pw&&sy>h-ph),out=sx<40||sx>w-40||sy<40||sy>h-40;
 if(under||out){const cx=nar?w/2:(pw+w)/2,cy=nar?(h-ph)/2:h/2;go([t.x-cx*k,t.y-cy*k,v[2],v[3]])}}
function closePop(){S.pop=null;rowOn();$('pop').classList.remove('on');render();if(S.mode=='vibes'){document.querySelectorAll('.vm-row.on').forEach(r=>r.classList.remove('on'))}}
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
box.addEventListener('wheel',e=>{if(PH())return;if(!(mapActive||e.ctrlKey||e.metaKey)){hint.classList.add('on');clearTimeout(ht);ht=setTimeout(()=>hint.classList.remove('on'),1400);return}e.preventDefault();const r=box.getBoundingClientRect();S.vb=zoomAt(Math.exp(e.deltaY*.0015),e.clientX-r.left,e.clientY-r.top);S.region&&(S.region='',tags());render();clearTimeout(wt);wt=setTimeout(list,180)},{passive:false});
function clampVb(v){const[w,h]=size();if(w<20||h<20)return v;const full=fit0(ALL,.02,w,h),mx=w<600?Math.min(full[2]*1.25,FLW()*1.08):full[2]*1.25,mn=MINW*.9;let nw=Math.min(mx,Math.max(mn,v[2])),q=nw/v[2],nh=v[3]*q;let cx=v[0]+v[2]/2,cy=v[1]+v[3]/2;cx=Math.min(X(ALL[1]),Math.max(X(ALL[0]),cx));cy=Math.min(Y(ALL[2]),Math.max(Y(ALL[3]),cy));return [cx-nw/2,cy-nh/2,nw,nh]}
const PTR=new Map();let pinch=null;
let dr=null;box.addEventListener('pointerdown',e=>{if(e.target.closest('.pop,.ctl,.zoom,.rdd'))return;PTR.set(e.pointerId,[e.clientX,e.clientY]);try{box.setPointerCapture(e.pointerId)}catch(x){}
 if(PTR.size==2){const[a,b]=[...PTR.values()],r=box.getBoundingClientRect();pinch={d0:Math.hypot(a[0]-b[0],a[1]-b[1]),vb:S.vb.slice(),mx:(a[0]+b[0])/2-r.left,my:(a[1]+b[1])/2-r.top};if(dr)dr.moved=true;return}
 dr={x:e.clientX,y:e.clientY,vb:S.vb.slice(),moved:false,t:e.target}});
box.addEventListener('pointermove',e=>{if(!PTR.has(e.pointerId))return;PTR.set(e.pointerId,[e.clientX,e.clientY]);if(pinch&&PTR.size>=2){const[a,b]=[...PTR.values()],d=Math.hypot(a[0]-b[0],a[1]-b[1]);if(d<10)return;const f=pinch.d0/d,v=pinch.vb,[w,h]=size(),kx=v[2]/w,ky=v[3]/h,px=v[0]+pinch.mx*kx,py=v[1]+pinch.my*ky,nw=v[2]*f,nh=v[3]*f;S.vb=clampVb([px-(px-v[0])*f,py-(py-v[1])*f,nw,nh]);render(true);S.userMoved=1}});
const ptrEnd=e=>{PTR.delete(e.pointerId);if(PTR.size<2&&pinch){pinch=null;if(dr){const p0=[...PTR.values()][0];if(p0){dr.x=p0[0];dr.y=p0[1];dr.vb=S.vb.slice()}}render()}};
box.addEventListener('pointerup',ptrEnd);box.addEventListener('pointercancel',ptrEnd);
box.addEventListener('pointercancel',()=>{dr=null;box.classList.remove('drag')});box.addEventListener('pointermove',e=>{if(!dr||pinch)return;const dx=e.clientX-dr.x,dy=e.clientY-dr.y;if(Math.abs(dx)+Math.abs(dy)>6){dr.moved=true;box.classList.add('drag')}if(!dr.moved)return;const[w]=size(),k=dr.vb[2]/w;S.vb=clampVb([dr.vb[0]-dx*k,dr.vb[1]-dy*k,dr.vb[2],dr.vb[3]]);S.userMoved=1;render(true)});
box.addEventListener('pointerup',e=>{if(!dr||PTR.size)return;box.classList.remove('drag');if(dr.moved){if(S.region){S.region='';tags()}list()}else{const el=document.elementFromPoint(e.clientX,e.clientY);const nl=el&&el.closest('.clul');const cg=el&&el.closest('.clu');if(nl){const t=T.find(x=>x.id==nl.dataset.id);t&&flyTo(t)}else if(cg){cluZoom(cg.dataset.ids.split(','))}else{const c=el&&el.closest('circle.dot');if(c){openPop(T.find(t=>t.id==c.dataset.id))}else if(!el.closest('.pop'))closePop()}}dr=null});
$('grid').addEventListener('mouseover',e=>{const c=e.target.closest('.card');const id=c?c.dataset.id:null;if(id!==S.hover){S.hover=id;render()}});
$('grid').addEventListener('mouseleave',()=>{S.hover=null;render()});
$('q').addEventListener('keydown',e=>{if(e.key!='Enter')return;const q=e.target.value.trim().toLowerCase();if(!q)return;
 const r=REG.find(r=>r[0].toLowerCase().includes(q));const t=T.find(t=>t.n.toLowerCase().startsWith(q))||T.find(t=>((window.FCAKA||{})[t.id]||'').toLowerCase().includes(q));const st=Object.keys(VIBES).find(k=>VIBES[k].toLowerCase().includes(q));
 if(t){go([t.x-MINW/2,t.y-MINW/2*S.vb[3]/S.vb[2],MINW,MINW*S.vb[3]/S.vb[2]]);setTimeout(()=>openPop(t),460)}else if(r){S.region=r[0];tags();go(fit(r.slice(1)))}else if(st){$('sty').value=st;$('sty').dispatchEvent(new Event('change'))}e.target.value=''});


// vibes mode: built like the live Vibe Map
S.need={};
function cluPrio(t){return [-t.v.filter(v=>!isR(v)).length,Math.min(...['beach','walk','charm','meet','water'].map(q=>LD[t.id].rk[q]||999))]}
function mkClu(L,v,k){const R=40,P=L.map(t=>[t,cluPrio(t)]).sort((a,b)=>a[1][0]-b[1][0]||a[1][1]-b[1][1]).map(x=>x[0]),cs=[];
 P.forEach(t=>{const sx=(t.x-v[0])/k,sy=(t.y-v[1])/k;const c=cs.find(c=>Math.hypot((c[0].x-v[0])/k-sx,(c[0].y-v[1])/k-sy)<R);if(c)c.push(t);else cs.push([t])});return cs.filter(c=>c.length>1)}
function cluZoom(ids){const M=ids.map(id=>T.find(t=>t.id==id)).filter(Boolean);if(S.vb[2]<=MINW*1.08){cluList(M);return}
 const lo=M.map(t=>t.lo),la=M.map(t=>t.la),to=fit([Math.min(...lo)-.04,Math.max(...lo)+.04,Math.min(...la)-.03,Math.max(...la)+.03],.2);closePop();S.zoomedTo='clu';go(to,520);setTimeout(zoomPill,60);
 // towns that sit nearly on top of each other never split, so the list opens as soon as the zoom lands
 if(to[2]<=MINW*1.08)setTimeout(()=>cluList(M),560)}
function cluList(M){closePop();{const cx=M.reduce((s,t)=>s+t.x,0)/M.length,cy=M.reduce((s,t)=>s+t.y,0)/M.length,v=S.vb;go([cx-v[2]/2,cy-v[3]*.3,v[2],v[3]],380)}let el=$('clist');if(!el){el=document.createElement('div');el.id='clist';el.className='clist';el.setAttribute('role','dialog');el.setAttribute('aria-label','Towns here');box.appendChild(el);document.addEventListener('pointerdown',e=>{if(el.classList.contains('on')&&!e.target.closest('#clist'))el.classList.remove('on')},true)}
 el.innerHTML=`<div class="cl-hd"><b>${M.length} towns here</b><button type="button" class="cl-x" aria-label="Close">&times;</button></div>`+M.map(t=>`<button type="button" class="cl-r" data-id="${t.id}"><i style="background-image:url('${t.img}')"></i><span><b>${t.n.replace(/ \(.*\)$/,'')}</b><small>${(t.r||'').split(' · ').pop()}</small></span><em>${t.p||''}</em></button>`).join('');
 el.querySelector('.cl-x').onclick=()=>el.classList.remove('on');el.querySelectorAll('.cl-r').forEach(b=>b.onclick=()=>{el.classList.remove('on');const t=T.find(x=>x.id==b.dataset.id);openPop(t);S.mode=='vibes'&&vRender()});
 requestAnimationFrame(()=>el.classList.add('on'))}
function needOk(t){const n=S.need,d=LD[t.id];if(n.bud&&!(d.med&&d.med<=n.bud))return false;if(n.school&&!d.sc)return false;if(n.air&&!d.air)return false;return true}
const needOn=()=>Object.keys(S.need).some(k=>S.need[k]);
function vOrder(){if(S.style=='best')return T.filter(t=>t.v.includes('best')&&needOk(t)).sort((a,b)=>a.bestRk-b.bestRk);const R=LK.REGIONS.map(r=>r.id),pos=t=>t.c=='panhandle'?t.lo:t.c=='gulf'?-t.la:t.c=='keys'?-t.lo:t.la;
 return T.filter(t=>(!S.style||t.v.includes(S.style))&&needOk(t)).sort((x,y)=>R.indexOf(LD[x.id].reg)-R.indexOf(LD[y.id].reg)||pos(x)-pos(y))}
function needsHTML(){const n=S.need,c=T.filter(t=>(!S.style||t.v.includes(S.style))&&needOk(t)).length;
 return `<div class="nd"><div class="vm-eb">What you need</div><div class="nd-row"><label class="nd-sel${n.bud?' on':''}"><select id="ndbud" aria-label="Budget">${LK.NBUD.map(([v,l])=>`<option value="${v}"${(n.bud||0)==v?' selected':''}>${l}</option>`).join('')}</select></label><button class="nd-c${n.school?' on':''}" data-need="school" aria-pressed="${!!n.school}">Good schools</button><button class="nd-c${n.air?' on':''}" data-need="air" aria-pressed="${!!n.air}">Near airport</button></div>${needOn()?`<p class="nd-fine"><b>${c}</b> town${c==1?'':'s'} match · <button class="nd-clear" id="ndclr">Clear</button></p>`:''}</div>`}
function vRender(){const _r=document.querySelector('#vp .tiles.vt'),_sl=_r?_r.scrollLeft:0;setTimeout(()=>{const r=document.querySelector('#vp .tiles.vt');if(r&&_sl)r.scrollLeft=_sl},0);const v=S.style;let h;const MOB=matchMedia('(max-width:760px)').matches;
 if(true){const cnt=k=>T.filter(t=>t.v.includes(k)&&needOk(t)).length;
  const RG=S.sub=='regions',KS=RG?R7.map(r=>'r:'+r[0]):LK.VFEEL,img=k=>RG?(T.find(t=>t.id==RPH[k.slice(2)])||T.find(t=>t.v.includes(k))).img:`img/vibes/${k}.webp`,ri=v&&RG?RCOPY[v.slice(2)]:null;
  h=`<div class="vm-lh"><div class="vm-eb">${ri?`Region · ${cnt(v)} beach towns`:`${T.length} beach towns · ${KS.length} ${RG?'regions':'styles'}`}</div>${ri?`<h2>${VIBES[v]}</h2>`:''}<button type="button" class="vm-all" onclick="this.closest('.vp').classList.toggle('vt-open');this.textContent=this.closest('.vp').classList.contains('vt-open')?'Show less':'See all ${KS.length}'">See all ${KS.length}</button></div>${ri?`<p class="vm-ri">${ri.intro}</p>`:''}${v&&LK.VGUIDE[v]?`<a class="vm-guide vm-guide-t" href="articles/best-florida-beach-towns-for-${LK.VGUIDE[v]}.html">Read the ${LK.VSHORT[v]||VIBES[v]} guide →</a>`:''}<div class="tiles vt${RG?' rg':''}">${KS.map(k=>`<button class="tile" data-k="${k}"><div class="ph" style="background-image:url('${img(k)}')"><i>${RG?'':`<span style="display:inline-block;width:9px;height:9px;border-radius:50%;background:${VCOL[k]};margin-right:6px"></span>`}${cnt(k)}</i><span class="tt"><b>${VIBES[k]}</b><small>${LK.VSUBL[k]||VSUB[k]}</small></span></div></button>`).join('')}</div>`}
 else{const L=vOrder();
  h=`<div class="vm-sh" style="background-image:url('img/vibes/${v}.webp')"><button class="vm-back" id="vback">← All styles</button><div class="vm-sht"><h2><i style="background:${VCOL[v]}"></i>${VIBES[v]}</h2><p>${L.length} towns · ${LK.VSUBL[v]||VSUB[v]}</p></div></div>${LK.VGUIDE[v]?`<a class="vm-guide" href="articles/best-florida-beach-towns-for-${LK.VGUIDE[v]}.html">Read the ${LK.VSHORT[v]||VIBES[v]} guide →</a>`:''}<div class="vm-eb vm-lt">Panhandle around to the Keys</div><ol class="vm-list">${L.map((t,i)=>`<li><button class="vm-row${S.pop&&S.pop.id==t.id?' on':''}" data-vpick="${t.id}" style="--vc:${VCOL[v]}"><span class="vm-n">${i+1}</span><span class="vm-rt"><b>${t.n}</b><small>${LD[t.id].rn}</small></span></button></li>`).join('')}</ol>`}
 /* Nov 12: no See your top 5 button on Vibe and Regions sheets (Mark: it gets in the way when you swipe up) */
 $('vp').innerHTML=h;
 $('vp').querySelectorAll('.tile').forEach(b=>{b.classList.toggle('on',b.dataset.k==S.style);b.onclick=()=>{if(S.style==b.dataset.k)return;const sl=$('vp').querySelector('.tiles.vt').scrollLeft;pickStyle(b.dataset.k);const r=$('vp').querySelector('.tiles.vt');if(r)r.scrollLeft=sl}});
 $('vp').querySelectorAll('[data-vpick]').forEach(b=>{b.onclick=()=>flyTo(T.find(t=>t.id==b.dataset.vpick));b.onmouseenter=()=>{S.hover=b.dataset.vpick;render()};b.onmouseleave=()=>{S.hover=null;render()}});
 $('vp').querySelectorAll('[data-need]').forEach(b=>b.onclick=()=>{const k=b.dataset.need;S.need[k]=!S.need[k];needChange()});
 $('ndbud')&&($('ndbud').onchange=e=>{S.need.bud=+e.target.value||0;needChange()});
 $('ndclr')&&($('ndclr').onclick=()=>{S.need={};needChange()});
 $('vback')&&($('vback').onclick=()=>$('back').onclick());
 zoomPill()}
function needChange(){if(S.pop&&!needOk(S.pop))closePop();render();vRender()}
const RKEY='fcRegion',rGet=()=>{try{return localStorage.getItem(RKEY)}catch(e){return null}},rSet=v=>{try{localStorage.setItem(RKEY,v)}catch(e){}};
function pickStyle(k){if(!S.auto)S.touchedPick=1;if(SHON()&&SHEET.st!='peek'){const vp=$('vp');vp&&vp.classList.remove('vt-open');setTimeout(()=>shSet('peek',true),0)}if(isR(k)&&!S.auto)rSet(k.slice(2));S.style=k;S.gHover=null;S.gT0=performance.now()+450;$('sty').value=k;S.region='';tags();document.body.classList.add('pick');closePop();if(isR(k)){S.zoomedTo=null;go(fitStyle(k),500)}else home();vRender();$('res').scrollTop=0}
const FIXED=()=>S.mode=='vibes'||S.mode=='sliders';
function home(){const h=fit(ALL,.02);if(!S.vb||S.vb.some((v,i)=>Math.abs(v-h[i])>1))go(h,350)}
function flyTo(t){if(FIXED()){openPop(t,true);S.mode=='vibes'&&vRender();return}const[w,h]=size(),nw=w<600,W=nw?MINW*1.6:Math.max(MINW,170),H=W*h/w,cx=nw?w/2:(Math.min(460,w*.45)+w)/2,k=W/w;S.zoomedTo=t.id;go([t.x-cx*k,t.y-h/2*k,W,H],520);setTimeout(()=>{openPop(t,true);S.mode=='vibes'&&vRender()},20)}
function zoomPill(){let z=$('zpill');if(!z){z=document.createElement('button');z.id='zpill';z.className='zpill';box.appendChild(z);z.onclick=()=>{S.zoomedTo=null;closePop();if(S.mode=='vibes'&&S.style)go(fitStyle(S.style));else go(fit(ALL,.02));z.classList.remove('on')}}
 const on=S.mode=='vibes'&&S.zoomedTo&&S.style;z.classList.toggle('on',!!on);if(on){const n=vOrder().length;z.innerHTML=`<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5M8 11h6"/></svg> ${isR(S.style)?`Zoom out to ${VIBES[S.style]}`:`Zoom out to all ${n} ${LK.VSHORT[S.style]||VIBES[S.style]} towns`}`}}
// vibes mode
const VSUB2={island:"Barefoot and slow",oldfl:"Bait shops, no hurry",dock:"Life on the water",sophcalm:"Polished and easy",sophhigh:"Polished with a pulse",afford:"More house for less",active:"Trails and paddling",walk:"Daily life on foot",bluezone:"Walks and time outside",remote:"Pretty, with an easy airport",social:"Bars and events",beaches:"Top ranked sand"};
S.mode='explore';
// Regions map (Nov 11): each region acts like a style; copy reused from the Beach Towns page
const RPH={"emerald-coast": "30a", "forgotten-coast": "apalachicola", "nature-coast": "cedarkey", "st-pete-clearwater": "st-pete-beach", "tampa-south-shore": "apollo-beach", "sarasota-bradenton": "siesta-key", "fort-myers-sanibel": "sanibel-island", "naples-marco": "naples", "florida-keys": "keywest", "miami-fort-lauderdale": "ftl", "palm-beaches": "palm-beach", "treasure-coast": "stuart", "space-coast": "cocoa", "daytona-flagler": "nsb", "first-coast": "staug"},RCOL='#152A2E',isR=k=>!!k&&k.startsWith('r:');
LK.REGIONS.forEach(r=>{const k='r:'+r.id;VIBES[k]=RCOPY[r.id]?RCOPY[r.id].h:r.map;VCOL[k]=RCOL;VSUB[k]=RCOPY[r.id]?RCOPY[r.id].tag:''});
T.forEach(t=>{const g=LD[t.id]&&LD[t.id].reg;if(g&&!t.v.includes('r:'+g))t.v.push('r:'+g)});
// Seven regions (Nov 11): built from the 15 areas, used for the Regions map and the slider Where menu
const R7=[['panhandle','The Panhandle',['emerald-coast','forgotten-coast'],'30a'],['nature-coast-r','The Nature Coast',['nature-coast'],'cedarkey'],['tampa-bay','Tampa Bay',['st-pete-clearwater','tampa-south-shore'],'st-pete-beach'],['southwest','Southwest Florida',['sarasota-bradenton','fort-myers-sanibel','naples-marco'],'siesta-key'],['south-keys','South Florida and the Keys',['miami-fort-lauderdale','palm-beaches','florida-keys'],'palm-beach'],['treasure-space','Treasure and Space Coast',['treasure-coast','space-coast'],'stuart'],['northeast','Northeast Florida',['daytona-flagler','first-coast'],'staug']];
const R7M=Object.fromEntries(R7.map(r=>[r[0],r[2]])),R7OF={};R7.forEach(r=>r[2].forEach(a=>R7OF[a]=r[0]));
const fs1=x=>(x||'').split(/(?<=\.)\s/)[0];
R7.forEach(([id,h,A,ph])=>{const k='r:'+id;VIBES[k]=h;VCOL[k]=RCOL;VSUB[k]=A.length>1?A.map(a=>(RCOPY[a]?RCOPY[a].h:a).replace(/^The /,'')).join(' · '):(RCOPY[A[0]]?RCOPY[A[0]].tag:'');RPH[id]=ph;RCOPY[id]={h,tag:VSUB[k],intro:A.length>1?A.map(a=>fs1(RCOPY[a]&&RCOPY[a].intro)).join(' '):(RCOPY[A[0]]?RCOPY[A[0]].intro:'')}});
T.forEach(t=>{const g=LD[t.id]&&R7OF[LD[t.id].reg];if(g&&!t.v.includes('r:'+g))t.v.push('r:'+g)});
const r7of=x=>x&&R7M[x]?x:(x&&R7OF[x])||x;

S.sub='styles';
function setMode(m){S.hover=null;{const k0=S.mode=='vibes'?S.sub:S.mode;S.mem=S.mem||{};if(S.booted&&k0)S.mem[k0]={st:S.style||'',op:S.pop&&S.pop.id||null,vb:S.vb&&S.vb.slice()}}setTimeout(()=>{shSync();slPill();if(m!='sliders')slCar([])},60);if(m=='regions'||m=='explore'){m='vibes';if(S.sub!='regions'){S.style='';S.zoomedTo=null;document.body.classList.remove('pick')}S.sub='regions'}else if(m=='vibes'){if(S.sub!='styles'){S.style='';S.zoomedTo=null;document.body.classList.remove('pick')}S.sub='styles'}else if(m=='sliders'){S.style='';S.zoomedTo=null;document.body.classList.remove('pick')}S.mode=m;zoomPill();if(m!='explore')setTimeout(()=>{S.zoomedTo=null;home()},40);setTimeout(()=>{render();if(m!='sliders')list()},30);$('mhint').textContent=S.sub=='regions'&&m=='vibes'?'Pick a stretch of coast and tap a town.':{explore:'See every beach town on the map and narrow by style or price.',vibes:'Pick the feel you want and see where it lives.',sliders:'Tell us what matters and we rank all 167 towns for you.'}[m];document.body.classList.toggle('vibes',m=='vibes');document.body.classList.toggle('sliders',m=='sliders');if(m=='sliders'){requestAnimationFrame(()=>{render()});document.querySelectorAll('#mode button').forEach(b=>b.classList.toggle('on',b.dataset.m==m));closePop();S.region='';tags();slRender();if(!S.top.length)go(fit(ALL,.02));return}document.body.classList.toggle('pick',m=='vibes'&&!!S.style);document.querySelectorAll('#mode button').forEach(b=>b.classList.toggle('on',b.dataset.m==(m=='vibes'&&S.sub=='regions'?'regions':m)));
 if(m=='vibes'&&!S.style){S.region='';tags();closePop();go(fit(ALL,.02))}list();const mm=m=='vibes'&&S.mem&&S.mem[S.sub];if(S.booted&&!S.restoring&&mm&&mm.st&&VIBES[mm.st]){setTimeout(()=>{pickStyle(mm.st);setTimeout(()=>{const t=mm.op&&T.find(x=>x.id==mm.op);if(t)openPop(t,true);if(mm.vb&&vbOk(mm.vb))go(mm.vb,300)},140)},70)}else if(S.booted&&!S.restoring&&m=='vibes'&&S.sub=='regions'&&!S.style){const r=r7of(rGet());if(r&&VIBES['r:'+r])setTimeout(()=>pickStyle('r:'+r),60);else setTimeout(ensurePick,90)}else if(m=='vibes')setTimeout(ensurePick,120)}
function fitStyle(k){const L=T.filter(t=>t.v.includes(k));const b=[Math.min(...L.map(t=>t.lo)),Math.max(...L.map(t=>t.lo)),Math.min(...L.map(t=>t.la)),Math.max(...L.map(t=>t.la))];if(isR(k)){const p=.15,f=fit([b[0]-p,b[1]+p,b[2]-p,b[3]+p],.1),[w,h]=size();if(w<600)return f;const L0=Math.min(470,w*.42),nw=f[2]*w/(w-L0),nh=nw*h/w;return [f[0]+f[2]-nw,f[1]+f[3]/2-nh/2,nw,nh]}const pad=.35;return fit([b[0]-1.1,b[1]+1.1,b[2]-pad,b[3]+pad],.04)}
$('tiles').innerHTML='';[].map(k=>`<button class="tile" data-k="${k}"><div class="ph" style="background-image:url('img/vibes/${k}.webp')"><i><span style="display:inline-block;width:9px;height:9px;border-radius:50%;background:${VCOL[k]};margin-right:6px"></span>${T.filter(t=>t.v.includes(k)).length} towns</i></div><b>${VIBES[k]}</b><small>${VSUB2[k]}</small></button>`).join('');
$('tiles').onclick=e=>{const b=e.target.closest('.tile');if(!b)return;const k=b.dataset.k;if(S.style==k)return;S.style=k;S.gHover=null;S.gT0=performance.now()+450;$('sty').value=k;$('sty').classList.add('on');S.region='';tags();document.body.classList.add('pick');closePop();home();$('res').scrollTop=0};
$('tiles').addEventListener('mouseover',e=>{const b=e.target.closest('.tile');const k=b?b.dataset.k:null;if(k!==S.gHover){S.gHover=k;render()}});$('tiles').addEventListener('mouseleave',()=>{S.gHover=null;render()});
$('back').onclick=()=>{if(S.mode=='vibes'&&S.style){S.zoomedTo=null;closePop();go(fitStyle(S.style),400);return}if(S.sub=='regions')rSet('');S.zoomedTo=null;S.style='';setTimeout(vRender,0);$('sty').value='';$('sty').classList.remove('on');document.body.classList.remove('pick');closePop();go(fit(ALL,.02))};
$('mode').onclick=e=>{const b=e.target.closest('button');if(!b)return;setMode(b.dataset.m)};

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
function slCar(L){const c=$('slcar');if(!c)return;if(true){c.innerHTML='';c.classList.remove('on');if(S.mode=='sliders')S.hover=null;return}
 c.innerHTML=L.map((t,i)=>{const wy=slWhy(t);return `<a class="sc" href="towns/${t.id}-v3.html" data-id="${t.id}"><span class="ph" style="background-image:url('${t.img}')"></span><span class="bd"><span class="hd"><i>${i+1}</i><b>${t.n}</b></span><small>${wy||LD[t.id].rn}</small><span class="go">Explore →</span></span></a>`}).join('');
 c.classList.add('on');c.scrollLeft=0;S.hover=L[0].id;
 if(!c.dataset.w){c.dataset.w=1;let tm;c.addEventListener('scroll',()=>{clearTimeout(tm);tm=setTimeout(()=>{const cs=[...c.children];if(!cs.length)return;const mid=c.scrollLeft+c.clientWidth/2;let best=cs[0],bd=1e9;cs.forEach(e=>{const d=Math.abs(e.offsetLeft+e.offsetWidth/2-mid);if(d<bd){bd=d;best=e}});if(S.hover!==best.dataset.id){S.hover=best.dataset.id;slPanTo(T.find(t=>t.id==S.hover))}},110)},{passive:true})}}
function slCarTo(id,smooth){const c=$('slcar'),e=c&&c.querySelector(`[data-id="${id}"]`);if(!e)return;S.hover=id;c.scrollTo({left:e.offsetLeft-(c.clientWidth-e.offsetWidth)/2,behavior:smooth?'smooth':'auto'});render()}
function slFit(P){const[w,h]=size(),SH=SHON(),T0=SH?78:64+HDR(),pe=$('pop'),B0=SH?SHRES():(pe&&pe.classList.contains('on')?pe.offsetHeight+24:40),avH=Math.max(170,h-T0-B0),xs=P.map(t=>t.x),ys=P.map(t=>t.y),x0=Math.min(...xs),x1=Math.max(...xs),y0=Math.min(...ys),y1=Math.max(...ys),mx=w<600?96:150,my=34;let k=Math.max((x1-x0)/Math.max(80,w-2*mx),(y1-y0)/Math.max(60,avH-2*my),MINW*1.15/w);k=Math.min(k,FLW()/w);const cx=(x0+x1)/2,cy=(y0+y1)/2;return [cx-w/2*k,cy-(T0+avH/2)*k,w*k,h*k]}
const FLW=()=>(X(ALL[1])-X(ALL[0]))*1.04;
function slPanTo(t){if(!t)return;const[w,h]=size(),v=S.vb,k=v[2]/w,sx=(t.x-v[0])/k,sy=(t.y-v[1])/k;if(sx<50||sx>w-50||sy<50||sy>h-170)go([t.x-w/2*k,t.y-(h-150)/2*k,v[2],v[3]],450);else render()}
// Phone Slider Map: Compass style sheet over a fixed map (peek, half, full)
const SHEET={st:'peek',y:0};
const SHON=()=>document.body.classList.contains('sheet');
const IOSB=()=>(/iPhone|iPod/.test(navigator.userAgent)&&!navigator.standalone&&matchMedia('(max-width:760px)').matches)?72:0;
function PK(){return PK0()+IOSB()}
function PK0(){return 233;const r=$('res'),tl=$('vp')&&$('vp').querySelector('.tiles.vt');if(!r||!tl)return 300;const pr=r.getBoundingClientRect(),tb=tl.getBoundingClientRect();return Math.min(380,Math.round(tb.top-pr.top+Math.min(tb.height,140)+16))}
function shStops(){const vh=innerHeight;return {peek:vh-PK(),half:Math.round(vh*.44),full:60+SAT()}}
function SHRES(){const vh=innerHeight,pe=$('pop');if(SHEET.st=='peek')return PK()+(pe&&pe.classList.contains('on')?pe.offsetHeight+12:0)+14;return vh-shStops()[SHEET.st]+14}
function shApply(y,anim){const r=$('res');SHEET.y=y;r.style.transition=anim?'transform .32s cubic-bezier(.2,.8,.2,1)':'none';r.style.transform=`translate3d(0,${y}px,0)`;
 const st=shStops(),pe=$('pop');if(pe){const o=Math.max(0,Math.min(1,(y-st.half)/(st.peek-st.half-40)));pe.style.opacity=o;pe.style.pointerEvents=o<.5?'none':''}}
function shSet(name,noFit){document.body.style.setProperty('--pk',PK()+'px');const st=shStops();SHEET.st=name;shApply(st[name],true);const r=$('res');r.classList.toggle('sh-full',name=='full');r.classList.toggle('sh-up',name!='peek');if(name!='full')r.scrollTop=0;
 if(!noFit&&name!='full')setTimeout(shRefit,40)}
function shRefit(){if(S.mode=='sliders'){if(S.top&&S.top.length)go(slFit(S.top.slice(0,5).map(id=>T.find(t=>t.id==id))),450);else go(fit(ALL,.02),450)}else if(S.mode=='vibes'){if(S.pop)return;if(S.style&&isR(S.style))go(fitStyle(S.style),450);else go(fit(ALL,.02),450)}}
function shSync(){const on=(S.mode=='sliders'||S.mode=='vibes')&&PH();const r=$('res');if(!r)return;if(on){const was=SHON();document.body.classList.add('sheet');setTimeout(()=>{shSet('peek',true);render();shRefit()},was?60:30)}
 else if(!on&&SHON()){document.body.classList.remove('sheet');r.style.transform='';r.style.transition='';const pe=$('pop');if(pe){pe.style.opacity='';pe.style.pointerEvents=''}}}
(function(){const r=$('res');let d=null;
 $('vp')&&$('vp').addEventListener('click',e=>{const a=e.target.closest('.vm-all');if(!a||!SHON())return;setTimeout(()=>shSet($('vp').classList.contains('vt-open')?'full':'peek'),0)});
 const skip=t=>t.closest('select,textarea,input:not([type=range])');
 r.addEventListener('touchstart',e=>{if(!SHON()||skip(e.target))return;const t=e.touches[0];d={x0:t.clientX,y0:t.clientY,s0:SHEET.y,t0:performance.now(),own:false,last:t.clientY,lt:performance.now(),v:0}},{passive:true});
 r.addEventListener('touchmove',e=>{if(!d)return;const t=e.touches[0],dy=t.clientY-d.y0;
  if(!d.own){const dx=t.clientX-d.x0;if(Math.abs(dy)<6&&Math.abs(dx)<6)return;if(Math.abs(dx)>Math.abs(dy)){d=null;return}if(SHEET.st=='full'&&(r.scrollTop>0||dy<0)){d=null;return}d.own=true}
  e.preventDefault();const st=shStops();let y=d.s0+dy;if(y<st.full)y=st.full-(st.full-y)*.3;if(y>st.peek)y=st.peek+(y-st.peek)*.3;shApply(y,false);
  const now=performance.now();d.v=(t.clientY-d.last)/Math.max(1,now-d.lt);d.last=t.clientY;d.lt=now},{passive:false});
 r.addEventListener('touchend',()=>{if(!d)return;const own=d.own,v=d.v;d=null;if(!own)return;const st=shStops(),y=SHEET.y;let n;
  const tg=y+Math.max(-1.5,Math.min(1.5,v))*260;n=['peek','half','full'].sort((a,b)=>Math.abs(st[a]-tg)-Math.abs(st[b]-tg))[0];shSet(n)});
 const g=document.createElement('button');g.className='sh-grab';g.type='button';g.setAttribute('aria-label','Show more');r.prepend(g);
 g.addEventListener('click',()=>{if(!SHON())return;shSet(SHEET.st=='peek'?'half':SHEET.st=='half'?'full':'peek')});
 addEventListener('resize',()=>{if(SHON())shSet(SHEET.st,true)});})();
function slPill(){let p=$('slpill');if(!p){p=document.createElement('button');p.id='slpill';p.className='slpill';document.body.appendChild(p);p.onclick=()=>{const sl=$('sl');if(!sl)return;const y=sl.getBoundingClientRect().top+scrollY-12;scrollTo({top:p.classList.contains('dn')?y:0,behavior:'smooth'})};addEventListener('scroll',()=>slPill(),{passive:true})}
 const sl=$('sl');if(!sl||!SLM()||SHON()){p.classList.remove('on');return}const y=sl.getBoundingClientRect().top+scrollY-12,dn=scrollY<y/2;p.classList.add('on');p.classList.toggle('dn',dn);
 const ic='<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M4 7h10M18 7h2M4 17h4M12 17h8"/><circle cx="16" cy="7" r="2"/><circle cx="10" cy="17" r="2"/></svg>';
 p.innerHTML=dn?`${ic} Set your priorities`:(S.top.length?'See your top 5 on the map ↑':'Back to the map ↑')}
function slFitWord(v,best,i){return S.tie?'':i===0?'Best fit':best-v<=.01?'':best-v<=.04?'Great fit':'Good fit'}
function slWhy(t){const P=slPri(),best=P.filter(k=>rkk(t,k)<=40).sort((x,y)=>rkk(t,x)-rkk(t,y)),weak=P.filter(k=>rkk(t,k)>110),
 extra=LK.CATS.filter(k=>P.indexOf(k)<0&&rkk(t,k)<=10).sort((x,y)=>rkk(t,x)-rkk(t,y)),no=k=>'#'+rkk(t,k)+' for '+LK.WHY[k];
 let s=best.length?best.slice(0,2).map(no).join(', '):extra.length?'Known for '+LK.WHY[extra[0]]+' (#'+rkk(t,extra[0])+')':'';
 best.length&&extra.length&&best.length<2&&(s+=', plus '+LK.WHY[extra[0]]);weak.length&&(s+='. Lower on '+LK.WHY[weak[0]]);return s}
function whyOf(t){return slWhy(t)}
const slEnds=k=>{const w=k=='pace'?LK.PACE2:LK.SL_WORDS[k];return w?`<div class="sl-ends" aria-hidden="true"><span>${w[0]}</span><span>${w[4]}</span></div>`:''};
const SNAP=[0,33,67,100],SNAPI=v=>Math.max(0,Math.min(3,Math.round(v*3/100)));
const SLINFO={pace:"Ranks towns on traffic, visitor crowds and noise, with 2020 Census population breaking ties. Slide left for the quietest towns, right for the most going on.",
bud:"We match your range to typical home prices in each town. Towns inside your range get full credit and lose ground for every step pricier. It's a guide to what's typical, not a search of homes for sale.",
beach:"Public beach access, sand and water quality, and national beach rankings, which also break ties.",
charm:"Our local call, scored the same way for every town: a real historic downtown, local spots instead of chains, no wall of condo towers, an old waterfront, older buildings still standing and well kept streets. National Register listings and map data break ties.",
water:"Counts marinas, boat ramps and docks nearby. Towns with residential canals, a dock out back, are top tier.",
meet:"Counts the restaurants, cafes, bars, gyms, studios, courts and community centers within a mile of downtown, how walkable the center is, and whether the town is the size where you keep running into people, roughly 8,000 to 80,000.",
walk:"How many daily needs are within a short walk of the center of town.",
outdoors:"Paddling launches, blueways and springs, a real surf break, trails and bike paths, nature preserves close by, and outfitters and clubs.",
airport:"Drive time to the nearest major airport.",
edu:"Averages the official Florida grades of the nearest public elementary, middle and high schools. Check the official school grades for a specific address."};
const SLFOOT=k=>k=='pace'||k=='bud'?'':'Every town is ranked 1 to 167. Push it up and it counts in your ranking. All the way up makes it a must have.';
function slRow(id,key,lab,word,v,min,max,step,set,ends){const inf=SLINFO[key];return `<div class="sl2${set?' set':''}"><label for="${id}"><b>${lab}</b>${inf?`<button type="button" class="sl-i" aria-label="How we rank ${lab}" aria-expanded="false" onclick="event.preventDefault();const r=this.closest('.sl2'),o=r.classList.toggle('inf');this.setAttribute('aria-expanded',o)">i</button>`:''}<output>${word}</output></label><div class="sl2c"><input id="${id}" type="range" min="${min}" max="${max}" step="${step}" value="${v}" data-slk="${key}" aria-valuetext="${word}" style="--p:${(v-min)/(max-min)*100}%;--lo:${Math.min(50,v)}%;--hi:${Math.max(50,v)}%">${ends||''}</div>${inf?`<div class="sl-inf">${inf}${SLFOOT(key)?` <span>${SLFOOT(key)}</span>`:''} <a href="scoring.html">How we score</a></div>`:''}</div>`}
function slWhere(){const G=R7.map(([id,h,A])=>A.length>1?`<optgroup label="${h}"><option value="${id}"${S.slPc===id&&!S.slPr?' selected':''}>All of ${/^The /.test(h)?h.replace(/^The /,'the '):/Coast$/.test(h)?'the '+h:h}</option>${A.map(a=>{const r=LK.REGIONS.find(r=>r.id==a);return `<option value="r:${a}"${S.slPr===a?' selected':''}>${r?r.map:a}</option>`}).join('')}</optgroup>`:`<option value="${id}"${S.slPc===id?' selected':''}>${h}</option>`).join('');
 return `<label class="sl2-where"><span>Where</span><select id="slwhere"><option value="">Anywhere in Florida</option>${G}</select></label>`}
function slRender(){
 const bv=S.slBud==null?0:5-S.slBud,lab=k=>SLC.find(c=>c[0]==k)[1].replace('Public schools','Public schools');
 const r2=k=>slRow('sl-'+k,k,lab(k),slWord2(k,S.sl[k]),SNAPI(S.sl[k]),0,3,1,slOn(k,S.sl[k]),slEnds(k));
 const moreOn=SL_MORE.some(k=>slOn(k,S.sl[k]));
 $('sl').innerHTML=`<div class="slh"><div class="slh-eb"><span>${T.length} beach towns · ${SLC.length} priorities</span><button class="sl-reset" id="slreset"${slAnySet()||S.slPc?'':' disabled'}>↺ Reset</button></div><h2>What matters to you?</h2><ol class="sl-how"><li><b>1</b>Push up what matters</li><li><b>2</b>Slide quiet or lively</li><li><b>3</b>Your top 5 light up on the map</li></ol></div>
 <div id="sltop"></div>${slWhere()}<div class="sl2-grp">${slRow('sl-pace','pace','Quiet or lively',slWord2('pace',S.sl.pace),S.sl.pace,0,100,25,S.sl.pace!==50,slEnds('pace'))}${slRow('sl-bud','bud','Budget',LK.BUDW[bv],bv,0,5,1,bv>0,'')}</div>
 <div class="sl2-list">${SL_CORE.concat(SL_MORE).map(r2).join('')}</div>
 <div class="sl-mail"${(()=>{try{return localStorage.getItem('fc-mail')?' style="display:none"':''}catch(e){return ''}})()}><b>Email me these 5 towns</b><div><input id="slmail" type="email" placeholder="you@example.com" autocomplete="email"><button id="slsend">Send them</button></div><p id="slmsg"></p></div>
 <div class="sl-quiz"><a href="quiz-photo.html">See your top 5 towns</a><p>Rather answer 8 quick questions? We'll match you.</p></div>`;
 $('sl').querySelectorAll('input[type=range]').forEach(i=>{const row=i.closest('.sl2');let ht;const on=()=>{clearTimeout(ht);row.classList.add('act')},off=()=>{clearTimeout(ht);ht=setTimeout(()=>row.classList.remove('act'),900)};i.addEventListener('pointerdown',on);i.addEventListener('pointerup',off);i.addEventListener('pointercancel',off);i.addEventListener('focus',on);i.addEventListener('blur',off);i.addEventListener('keyup',off)});$('sl').querySelectorAll('input[type=range]').forEach(i=>i.oninput=()=>{i.closest('.sl2').classList.add('act');const k=i.dataset.slk,raw=+i.value,v=k=='bud'||k=='pace'?raw:SNAP[raw],min=+i.min,max=+i.max;i.style.setProperty('--p',(raw-min)/(max-min)*100+'%');i.style.setProperty('--lo',Math.min(50,v)+'%');i.style.setProperty('--hi',Math.max(50,v)+'%');let w,on;
  if(k=='bud'){S.slBud=v==0?null:5-v;S.sl.afford=LK.BUDSET[v][1];w=LK.BUDW[v];on=v>0}else{S.sl[k]=v;w=slWord2(k,v);on=slOn(k,v)}
  const row=i.closest('.sl2');row.classList.toggle('set',on);row.querySelector('output').textContent=w;i.setAttribute('aria-valuetext',w);$('slreset').disabled=!(slAnySet()||S.slPc);score()});
 $('slwhere').onchange=e=>{const v=e.target.value;if(v.startsWith('r:')){const r=LK.REGIONS.find(r=>r.id==v.slice(2));S.slPr=r.id;S.slPc=R7OF[r.id]}else{S.slPc=v||null;S.slPr=null}$('slreset').disabled=!(slAnySet()||S.slPc);score()};
 $('slreset').onclick=slReset;
 $('slsend').onclick=()=>{const e=$('slmail').value.trim();if(!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(e)){$('slmail').style.borderColor='#B3261E';$('slmail').focus();return}
  const top=S.top.slice(0,5).map(id=>T.find(t=>t.id==id));
  FC.lead({kind:'matches',email:e,matches:top.map((t,i)=>({id:t.id,name:t.n,rank:i+1})),message:('Slider Map top 5: '+top.map(t=>t.n).join(', ')+'\n'+shareURL()).slice(0,2000)})
   .then(r=>{$('slmsg').textContent=r&&r.preview?'Preview: saved as a test, no email sent.':`On its way to ${e}.`}).catch(()=>{$('slmsg').textContent=FC.LIVE?"That didn't send. Check your connection and try again.":'Preview only: this works once the new site is live. Nothing was sent.'})};
 score(true)}
function slReset(){SLC.forEach(([k])=>S.sl[k]=slDef(k));S.slBud=null;S.slPc=null;S.slPr=null;closePop();slRender()}
function score(first){
 const R=slRank(),L=R.slice(0,5);S.top=R.slice(0,15).map(t=>t.id);S.F=fitSl;S.best=R.length?fitSl(R[0]):1;S.tie=L.length>1&&S.best-fitSl(L[1])<=.01;slCar(L);setTimeout(slPill,0);
 $('sltop')&&($('sltop').innerHTML=`<div class="vm-eb">${slAnySet()?'Your top 5':'Best all around · move a slider to make it yours'}</div><ol>${L.map((t,i)=>`<li><a href="towns/${t.id}-v3.html"><span class="n">${i+1}</span><span class="nm"><b>${t.n}</b>${slWhy(t)?`<small>${slWhy(t)}</small>`:''}</span><span class="fw">${slFitWord(fitSl(t),S.best,i)}</span></a></li>`).join('')}</ol>`);
 clearTimeout(S.ft);if(SLM()&&L.length&&SHON()&&SHEET.st=='full'){S.refit=1}else if(SLM()&&L.length){S.ft=setTimeout(()=>{if(!slAnySet()&&!S.introDone&&!S.pop){mapIntro('sliders')}else if(!S.pop||!S.top.slice(0,5).includes(S.pop.id)||S.pop.id===S.auto)openPop(L[0],true);S.auto=L[0].id;go(slFit(L),first?0:550)},first?0:200)}else if(FIXED()){home()}else S.ft=setTimeout(()=>{const P=L;const[w,h]=size(),nw=w<600;
  if(nw){const b=[Math.min(...P.map(t=>t.lo)),Math.max(...P.map(t=>t.lo)),Math.min(...P.map(t=>t.la)),Math.max(...P.map(t=>t.la))];let f=fit([b[0]-1.3,b[1]+1.3,b[2]-.35,b[3]+.35],.04);if(SLM()){const T0=64,B0=160,f0=fit([b[0]-.3,b[1]+.3,b[2]-.18,b[3]+.18],.04),q=h/Math.max(200,h-T0-B0),nw=f0[2]*q,nh=f0[3]*q,kk=nh/h;f=[f0[0]-(nw-f0[2])/2,f0[1]-T0*kk,nw,nh]}go(f,first?0:500);return}
  const pe=$('pop'),cw=(pe.offsetWidth||320)+40,ch=(pe.offsetHeight||400)+40,KS=fit(ALL,0)[2]/w;
  const xs=P.map(t=>t.x),ys=P.map(t=>t.y),x0=Math.min(...xs),x1=Math.max(...xs),y0=Math.min(...ys),y1=Math.max(...ys);
  const gl=P.some(t=>t.c!='atlantic')?195:30,ar=P.some(t=>t.c=='atlantic')?165:30,T0=62,B0=h-34;
  let k=Math.max((x1-x0)/(w-gl-ar-40),(y1-y0)/(B0-T0),KS*.3),cx,cy,sx,sy,ok=false;
  for(let it=0;it<40&&!ok;it++){const bw=(x1-x0)/k,bh=(y1-y0)/k;
   sx=Math.max(gl+20+bw/2,w-ar-bw/2-10);sx=Math.min(sx,w-ar-bw/2);sy=(T0+B0)/2;cx=(x0+x1)/2;cy=(y0+y1)/2;
   ok=P.every(t=>{const px=sx+(t.x-cx)/k,py=sy+(t.y-cy)/k;return !(px<cw+(t.c!='atlantic'?120:20)&&py>h-ch-20)});
   if(!ok){const up=P.every(t=>{const px=sx+(t.x-cx)/k,py=sy+(t.y-cy)/k-(sy-T0-bh/2);return !(px<cw+(t.c!='atlantic'?120:20)&&py>h-ch-20)});if(up){sy=T0+bh/2;ok=true;break}k*=1.07}}
  if(k>=KS){go(fit(ALL,.02),first?0:500);return}go([cx-sx*k,cy-sy*k,w*k,h*k],first?0:500)},first?0:250);
if(size()[0]>=600&&L.length){const t1=L[0];if(!slAnySet()&&!S.introDone&&!S.pop)setTimeout(()=>mapIntro('sliders'),0);else if(!S.pop||!S.top.slice(0,5).includes(S.pop.id)||S.pop.id===S.auto||S.pop.id!==S.pinned)openPop(t1,true);S.pinned=t1.id;S.auto=t1.id}render()}
document.getElementById('mhint').textContent='See every beach town on the map and narrow by style or price.';

// save search
function shareURL(){const q=new URLSearchParams();const ci=curReg();if(ci>=0)q.set('region',REG[ci][0]);if(S.style)q.set('style',S.style);if(S.price)q.set('price',S.price);if(S.mode!='explore')q.set('mode',S.mode);if(S.mode=='sliders'){const sv=SLC.filter(([k])=>slOn(k,S.sl[k])).map(([k])=>k+':'+S.sl[k]).join(',');if(sv)q.set('sv',sv);if(S.slBud!=null)q.set('bud',S.slBud);if(S.slPr)q.set('where','r:'+S.slPr);else if(S.slPc)q.set('where',S.slPc)}return location.origin+location.pathname+'?'+q.toString()}
function sumText(){const ci=curReg(),parts=[ci>=0?REG[ci][0]:'All of Florida'];if(S.style)parts.push(VIBES[S.style]);if(S.price){const[a,b]=S.price.split('-').map(Number);parts.push(`$${a>=1000?a/1000+'M':a+'K'} to ${b>=99999?'any':'$'+(b>=1000?b/1000+'M':b+'K')}`)}if(S.mode=='sliders'){const n=SLC.filter(([k])=>slOn(k,S.sl[k])).length;if(n)parts.push(`${n} priorities set`)}return parts.join(' · ')}
document.querySelector('.save').onclick=()=>{$('svb').classList.remove('sent');$('svsum').textContent=sumText();$('svl').value=shareURL();$('sv').classList.add('on');setTimeout(()=>$('sve').focus(),50)};
$('svx').onclick=()=>$('sv').classList.remove('on');$('sv').onclick=e=>{if(e.target.id=='sv')$('sv').classList.remove('on')};
$('svc').onclick=()=>{$('svl').select();try{navigator.clipboard.writeText($('svl').value)}catch(e){}$('svc').textContent='Copied'};
$('svgo').onclick=()=>{const e=$('sve').value.trim();if(!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(e)){$('sve').style.borderColor='#B3261E';$('sve').focus();return}
 const fin=m=>{$('svdone').textContent=m;$('svb').classList.add('sent')};let msg='Saved search';try{msg='Saved search: '+shareURL()+'\n'+sumText()}catch(x){}
 FC.lead({kind:'matches',email:e,message:msg.slice(0,2000)}).then(r=>fin(r.preview?'Preview: saved as a test, no email sent.':`We'll send the link to ${e}. Open it anytime to pick up right here.`)).catch(()=>fin(FC.LIVE?"That didn't send. Check your connection and try again.":'Preview only: this works once the new site is live. Nothing was sent.'))};
addEventListener('resize',()=>{render();list()});
// start: zoomed in like Compass
if(params.get('price')){S.price=params.get('price');const[a,b]=S.price.split('-');$('pmin').value=a;$('pmax').value=b}
const st0=params.get('style')||'';if(st0){S.style=st0;$('sty').value=st0;$('sty').classList.add('on')}
const r0=REG.find(r=>r[0]==params.get('region'))||REG.find(r=>r[0]=='Southwest Gulf');S.region=r0[0];S.vb=fit(r0.slice(1));tags();render();list();
if(params.get('mode')=='vibes'){setTimeout(shSync,80);S.mode='vibes';document.body.classList.add('vibes');document.querySelectorAll('#mode button').forEach(b=>b.classList.toggle('on',b.dataset.m=='vibes'));if(S.style){document.body.classList.add('pick');S.region='';tags();S.vb=fit(ALL,.02);S.gT0=performance.now()}else{S.region='';tags();S.vb=fit(ALL,.02)}render();list()}
if(params.get('mode')=='sliders'){setMode('sliders');const pr=params.get('sv');if(pr)pr.split(',').forEach(x=>{const[a,b]=x.split(':');if(a in S.sl)S.sl[a]=+b});if(params.get('bud')!=null){S.slBud=+params.get('bud');S.sl.afford=LK.BUDSET[5-S.slBud][1]}const wh=params.get('where');if(wh){if(wh.startsWith('r:')){const r=LK.REGIONS.find(r=>r.id==wh.slice(2));if(r){S.slPr=r.id;S.slPc=R7OF[r.id]}}else S.slPc=wh}if(pr||wh||params.get('bud')!=null)slRender()}
if(!['vibes','sliders'].includes(params.get('mode'))){S.region='';tags();S.vb=fit(ALL,.02);setMode('regions');const rs=rGet(),rq0=params.get('region')||rs,rq=rq0?r7of(rq0):null;if(rq&&VIBES['r:'+rq])setTimeout(()=>pickStyle('r:'+rq),80)}
// ---- Navigation (Nov 11): Back button works through map states, list view, search bar ----
function navURL(){const q=new URLSearchParams();const m=S.mode=='sliders'?'sliders':(S.sub=='regions'?'regions':'vibes');q.set('mode',m);
 if(m=='regions'&&isR(S.style))q.set('region',S.style.slice(2));if(m=='vibes'&&S.style&&!isR(S.style))q.set('style',S.style);
 if(S.pop)q.set('open',S.pop.id);if(S.listOn)q.set('view','list');return location.pathname+'?'+q.toString()}
let navT=null;function navSync(){clearTimeout(navT);navT=setTimeout(()=>{if(S.restoring)return;const u=navURL(),cur=location.pathname+location.search;if(u==cur)return;
 const prevOpen=new URLSearchParams(location.search).get('open'),nowOpen=S.pop&&S.pop.id,swap=prevOpen&&nowOpen&&prevOpen!=nowOpen;
 if(S.navReady&&!swap&&!S.auto)history.pushState({fc:1},'',u);else history.replaceState({fc:1},'',u)},120)}
[['setMode'],['pickStyle'],['openPop'],['closePop']].forEach(([n])=>{const f=window[n];window[n]=function(){const r=f.apply(this,arguments);navSync();return r}});
{const b0=$('back').onclick;$('back').onclick=function(){b0.apply(this,arguments);navSync()}}
addEventListener('popstate',()=>{const q=new URLSearchParams(location.search),m=q.get('mode')||'regions';S.restoring=1;
 listShow(q.get('view')=='list',true);
 const want=m=='regions'?(q.get('region')?'r:'+q.get('region'):''):m=='vibes'?(q.get('style')||''):'';
 const curM=S.mode=='sliders'?'sliders':(S.sub=='regions'?'regions':'vibes');if(curM!=m)setMode(m);
 setTimeout(()=>{if(m!='sliders'){if(want&&S.style!=want)pickStyle(want);else if(!want&&S.style)$('back').onclick()}
  const o=q.get('open');setTimeout(()=>{if(o){const t=T.find(t=>t.id==o);if(t&&(!S.pop||S.pop.id!=o))openPop(t)}else if(S.pop)closePop();setTimeout(()=>{S.restoring=0},200)},350)},120)});
// list view
function listTowns(){if(S.mode=='sliders'&&S.top&&S.top.length)return [S.top.slice(0,15).map(id=>T.find(t=>t.id==id)),'Your top 15'];
 if(S.style)return [vOrder(),VIBES[S.style]];return [T.slice(),'All '+T.length+' beach towns']}
function listShow(on,quiet){let el=$('mlist');if(!el){el=document.createElement('div');el.id='mlist';el.className='mlist';document.body.appendChild(el)}
 S.listOn=!!on;document.body.classList.toggle('list-on',S.listOn);if(!on){if(!quiet)navSync();return}
 const [L,title]=listTowns();el.innerHTML=`<div class="ml-hd"><button type="button" class="ml-map" onclick="listShow(false)">‹ Map</button><b>${title}</b><span>${L.length} towns</span></div><div class="ml-list">${L.map((t,i)=>`<a class="ml-row" href="towns/${t.id}-v3.html"><span class="ph" style="background-image:url('${t.img}')">${S.mode=='sliders'&&S.top.length?`<i>${i+1}</i>`:''}</span><span class="tx"><small>${LD[t.id].rn}</small><b>${t.n}</b><em>${t.b||''}</em></span></a>`).join('')}</div>`;el.scrollTop=0;if(!quiet)navSync()}
(function(){const r=$('res');if(!r)return;/* Nov 12: List button removed, the full sheet is the list */
 const hd=document.querySelector('body > header');if(hd){const sb=document.createElement('button');sb.type='button';sb.className='msearch';sb.innerHTML='<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><circle cx="11" cy="11" r="6.5"/><path d="M16 16l4.5 4.5"/></svg><span>Search a town or region</span>';sb.onclick=()=>{if(window.FCS)FCS.open('');else location.href='towns/index-v2.html'};hd.appendChild(sb)}})();
setTimeout(()=>{S.navReady=1;const q=new URLSearchParams(location.search);if(q.get('view')=='list')listShow(true,true);history.replaceState({fc:1},'',navURL())},1500);
S.booted=1;
if(params.get('open')){const t=T.find(t=>t.id==params.get('open'));if(t)setTimeout(()=>{S.restoring=1;openPop(t);setTimeout(()=>{S.restoring=0},300)},450)}

// ---- Nov 12: the maps never sit empty. They always show a real pick; on a first visit they step through real picks until the first touch, then stop for good ----
/* Nov 12: Best overall. Our top 15 on the Slider Map's Best all around scoring becomes the first Vibe Map style, and the page opens on it */
(function(){const R=T.slice().sort((a,b)=>fitSl(b)-fitSl(a)).slice(0,15);R.forEach((t,i)=>{if(!t.v.includes('best'))t.v.push('best');t.bestRk=i+1});
 VIBES.best='Well rounded';VCOL.best='#152A2E';VSUB.best='Strong on everything';if(LK.VSUBL)LK.VSUBL.best='Our top 15, strong on all 10 priorities';if(LK.VSHORT)LK.VSHORT.best='Well rounded';if(!LK.VFEEL.includes('best'))LK.VFEEL.unshift('best')})();
function mapIntro(kind){const p=$('pop');if(!p||S.pop)return;let f,eb,h3,tx,img;const sh=x=>x.n.replace(/ \(.*\)$/,'');
 if(kind=='sliders'){f=T.find(t=>t.id==S.top[0]);eb='The Slider Map';h3='Best all around';tx='Every priority counts the same until you move a slider. Then your top 5 update as you go.';img=f&&f.img}
 else if(kind=='regions'){f=vOrder()[0];eb='The Regions Map';h3='Seven regions';tx='Pick a region and see all its towns side by side, Pensacola to the Keys.';img=(T.find(t=>t.id==RPH[(S.style||'').slice(2)])||f||{}).img}
 else{f=vOrder()[0];eb='The Vibe Map';h3='Find your feel';tx=`Pick a style and every town with it lights up. We start with our ${vOrder().length} most well rounded.`;img='img/vibes/best.webp'}
 if(!f)return;p.innerHTML=`<div class="ph" style="background-image:url('${img}')"></div><button class="x" aria-label="Close">&times;</button><div class="bd bintro"><div class="eb">${eb}</div><h3>${h3}</h3><p>${tx}</p><div class="pnav"><a class="go" href="#" data-first="1">Meet ${kind=='regions'?'':'#1, '}${sh(f)} →</a><button data-st="1" aria-label="Next town">›</button></div></div>`;
 const go1=e=>{e&&e.preventDefault();e&&e.stopPropagation();p.dataset.intro='';S.introDone=1;if(kind=='sliders')openPop(f,true);else flyTo(f)};p.querySelector('[data-first]').onclick=go1;p.querySelector('[data-st]').onclick=go1;p.querySelector('.x').onclick=e=>{e.stopPropagation();S.introDone=1;p.classList.remove('on')};p.onclick=null;p.dataset.intro=kind;p.classList.remove('full');p.classList.add('on');placePop()}
function bestIntro(){if(S.mode=='vibes'&&S.style=='best')mapIntro('vibes')}
// swipe a town card left or right to step through the list (the intro card swipes to #1)
(function(){const p=$('pop');if(!p)return;let x0=null,y0=0;p.addEventListener('touchstart',e=>{const t=e.touches[0];x0=t.clientX;y0=t.clientY},{passive:true});
 p.addEventListener('touchend',e=>{if(x0==null)return;const t=e.changedTouches[0],dx=t.clientX-x0,dy=t.clientY-y0;x0=null;if(Math.abs(dx)<44||Math.abs(dx)<Math.abs(dy)*1.3)return;const b=p.querySelector(`[data-st="${dx<0?1:-1}"]`)||(dx<0&&p.querySelector('[data-st="1"]'));b&&b.click()},{passive:true})})();
const VDEF={regions:'r:panhandle',styles:'best'};
function ensurePick(){if(S.mode!='vibes'||S.style||S.restoring)return;let k;if(S.sub=='regions'){const r=r7of(rGet());k=r&&VIBES['r:'+r]?'r:'+r:VDEF.regions}else{const m=S.mem&&S.mem.styles&&S.mem.styles.st;k=m&&VIBES[m]?m:VDEF.styles}S.auto=1;pickStyle(k);setTimeout(()=>{S.auto=0},400);if(k=='best')setTimeout(bestIntro,650);else if(S.sub=='regions'&&!S.introR){S.introR=1;setTimeout(()=>{if(S.mode=='vibes'&&S.sub=='regions')mapIntro('regions')},650)}}
(function(){let touched=false;const stop=()=>{touched=true};['pointerdown','keydown','wheel','touchstart'].forEach(ev=>addEventListener(ev,stop,{passive:true,capture:true}));
 const fresh=()=>S.sub=='regions'?rGet()===null:!(S.mem&&S.mem.styles&&S.mem.styles.st);
 const tick=()=>{if(S.sub!='regions'||$('pop').classList.contains('on'))return;if(touched||S.touchedPick||document.hidden||S.mode!='vibes'||S.pop||!fresh())return;const K=S.sub=='regions'?R7.map(r=>'r:'+r[0]):LK.VFEEL;const i=Math.max(0,K.indexOf(S.style));S.auto=1;pickStyle(K[(i+1)%K.length]);setTimeout(()=>{S.auto=0},400)};
 setTimeout(ensurePick,700);setInterval(tick,3200)})();

// ---- Nov 12 (v2): Apple style tips. One small tip at a time, it goes away the moment you do what it says (and never comes back), or fades on its own after a few seconds ----
(function(){
 const done=id=>{try{return !!localStorage.getItem('fc-tip-'+id)}catch(e){return true}},mark=id=>{try{localStorage.setItem('fc-tip-'+id,'1')}catch(e){}};
 const TIPS=[
  {id:'pick',when:()=>S.mode=='vibes',el:()=>document.querySelector('#vp .tiles.vt'),txt:()=>S.sub=='regions'?'Pick a region to see its towns.':'Pick a style that feels like home.'},
  {id:'dot',when:()=>S.mode=='vibes'&&done('pick'),el:()=>null,txt:()=>'Tap any dot to meet that town.'},
  {id:'drag',when:()=>SHON()&&done('pick')&&done('dot'),el:()=>$('res'),txt:()=>'Drag up to see more.'},
  {id:'slide',when:()=>S.mode=='sliders'&&SHON(),el:()=>$('res'),txt:()=>'Drag up and slide what matters to you.'}];
 let on=null,tm=null;
 const hide=()=>{clearTimeout(tm);if(on){const b=on.b;b.classList.remove('in');setTimeout(()=>b.remove(),250);on=null}};
 const finish=id=>{mark(id);if(on&&on.id==id)hide();setTimeout(next,900)};
 function next(){if(on||document.hidden)return;try{if(sessionStorage.getItem('fc-tip-v'))return}catch(e){}const t=TIPS.find(t=>!done(t.id)&&t.when());if(!t)return;
  const b=document.createElement('div');b.className='ftip';b.setAttribute('role','status');b.innerHTML=`<span>${t.txt()}</span><i class="ft-arr"></i>`;document.body.appendChild(b);
  const el=t.el(),w=Math.min(280,innerWidth-32);let x=(innerWidth-w)/2,y=Math.round(innerHeight*.42),arr=false;
  if(el){const r=el.getBoundingClientRect();if(r.width){const top=el===$('res')?r.top:r.top;x=Math.max(16,Math.min(innerWidth-w-16,r.left+r.width/2-w/2));y=top-b.offsetHeight-12;arr=true}}
  Object.assign(b.style,{left:x+'px',top:Math.max(80,y)+'px',width:w+'px'});b.querySelector('.ft-arr').style.display=arr?'':'none';
  b.onclick=()=>finish(t.id);on={id:t.id,b};try{sessionStorage.setItem('fc-tip-v','1')}catch(e){}requestAnimationFrame(()=>b.classList.add('in'));
  tm=setTimeout(()=>{if(on&&on.id==t.id){hide()}},3000)}
 // any touch, scroll, drag or key anywhere kills the tip right away (and it never comes back)
 ['pointerdown','touchstart','wheel','keydown'].forEach(ev=>addEventListener(ev,()=>{if(on){const id=on.id;mark(id);clearTimeout(tm);const b=on.b;b.remove();on=null}},{passive:true,capture:true}));
 // the actions that complete each tip
 const wrap=(n,f)=>{const o=window[n];window[n]=function(){const r=o.apply(this,arguments);try{f.apply(this,arguments)}catch(e){}return r}};
 wrap('pickStyle',()=>{if(!S.auto&&!S.restoring)finish('pick')});
 wrap('openPop',()=>{if(!S.restoring)finish('dot')});
 document.addEventListener('pointerdown',e=>{if(e.target.closest&&e.target.closest('#res')&&SHON())setTimeout(()=>{if(SHEET.st!='peek'){finish('drag');if(S.mode=='sliders')finish('slide')}},700)},true);
 document.addEventListener('input',e=>{if(e.target.closest&&e.target.closest('#sl'))finish('slide')},true);
 addEventListener('resize',hide);
 setTimeout(next,2200);const sm=window.setMode;window.setMode=setMode=function(m){hide();sm.apply(this,arguments);setTimeout(next,1800)};
})();
// ---- Nov 12: phone hint that the sheet pulls up. Shows on the closed sheet until the first pull, then never again ----
(function(){if(!$('res'))return;const el=document.createElement('button');el.type='button';el.className='shint';el.setAttribute('aria-label','Swipe up for all towns');el.innerHTML='<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M6 15l6-6 6 6"/></svg><span>Swipe up for all towns</span>';document.body.appendChild(el);
 const seen=()=>{try{return !!localStorage.getItem('fc-shint')}catch(e){return false}};
 el.onclick=()=>{try{localStorage.setItem('fc-shint','1')}catch(e){}shSet('half')};
 const up=()=>{if(SHON()&&SHEET.st!='peek'){try{localStorage.setItem('fc-shint','1')}catch(e){}}const on=SHON()&&SHEET.st=='peek'&&S.mode=='vibes';el.classList.toggle('on',on)};
 setInterval(up,400);up()})();
