/* Map core: projection, drawing the map and labels, town cards, pan and zoom, search */
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
const HDR=()=>matchMedia('(max-width:760px)').matches?64+SAT():DFL()?68:0;const DFL=()=>matchMedia('(min-width:1000px)').matches,DPW=()=>DFL()?440:0;
function fit(b,pad=.08,raw){const [w,h0]=size(),hd=HDR(),bt=(!raw&&typeof SHON=='function'&&SHON())?Math.max(SHB()+10+((typeof SHEET=='undefined'||SHEET.st=='peek')&&$('pop')&&$('pop').classList.contains('on')&&!$('pop').classList.contains('full')?$('pop').offsetHeight+14+((document.querySelector('.cm-tip.on.st2')||{}).offsetHeight+14||0):0),(typeof SHEET!='undefined'&&SHEET.st=='half')?SHRES()-4:0):0,h=Math.max(160,h0-hd-bt);const pw=raw?0:DPW();if(pw){const w2=w-pw,r=fit0(b,pad,w2,h),kk2=r[2]/w2;return [r[0],r[1]-hd*kk2,w*kk2,h0*kk2]}const r0=fit0(b,pad,w,h);const kk=r0[2]/w;
 if(w<600&&!raw&&typeof PHMAX=='function'&&r0[2]>PHMAX()){/* phone: never wider than the Florida footprint; center the towns above the panel and let cards sit over the bottom */const W=PHMAX(),k2=W/w,h2=Math.max(160,h0-hd-(SHON()?SHB()+10:0)),cx=(X(b[0])+X(b[1]))/2,cy=(Y(b[3])+Y(b[2]))/2;return [cx-w/2*k2,cy-(hd+h2/2)*k2,W,h0*k2]}
 return [r0[0],r0[1]-hd*kk,r0[2],r0[3]+(h0-h-hd+hd)*kk]}
function fit0(b,pad,w,h){const x0=X(b[0]),x1=X(b[1]),y0=Y(b[3]),y1=Y(b[2]);let bw=(x1-x0)*(1+pad*2),bh=(y1-y0)*(1+pad*2);const ar=w/h;if(bw/bh<ar)bw=bh*ar;else bh=bw/ar;if(bw<MINW){bh*=MINW/bw;bw=MINW}return [(x0+x1)/2-bw/2,(y0+y1)/2-bh/2,bw,bh]}
const ALL=[-87.75,-79.75,24.4,31.1];const MINW=150;
let anim=null;
function vbOk(vb){return vb&&vb.length==4&&vb.every(Number.isFinite)&&vb[2]>=MINW*.85&&vb[3]>=60&&vb[2]<6000}
function go(vb,ms=450){if(!vbOk(vb)){const[w,h]=size();vb=(w>20&&h>20)?fit0(ALL,.02,w,h):S.vb}{const[w0]=size();if(w0>20&&w0<600&&vb[2]>PHMAX()){const f=PHMAX()/vb[2],cx=vb[0]+vb[2]/2,cy=vb[1]+vb[3]/2;vb=[cx-vb[2]*f/2,cy-vb[3]*f/2,vb[2]*f,vb[3]*f]}}if(!vbOk(S.vb))S.vb=vb.slice();cancelAnimationFrame(anim);const a=S.vb.slice(),t0=performance.now();const step=n=>{let p=Math.min(1,(n-t0)/ms);p=1-Math.pow(1-p,3);S.vb=a.map((v,i)=>v+(vb[i]-v)*p);render(p<1);if(p<1)anim=requestAnimationFrame(step);else{render();list()}};anim=requestAnimationFrame(step)}
function match(t){if(S.style&&!t.v.includes(S.style))return false;if(S.mode=="vibes"&&!needOk(t))return false;if(S.price){const[a,b]=S.price.split('-').map(Number);if(t.pv==null||t.pv<a||t.pv>=b)return false}return true}
function inView(t,m=0){const v=S.vb;return t.x>v[0]+m&&t.x<v[0]+v[2]-m&&t.y>v[1]+m&&t.y<v[1]+v[3]-m}
const RA=()=>S.mode=='vibes'&&S.sub=='regions'&&!S.style;
const RLAB=[['panhandle','The Panhandle',29.42,-86.3],['nature-coast-r','Nature Coast',28.95,-83.75],['tampa-bay','Tampa Bay',27.62,-83.4],['southwest','Southwest',26.2,-82.65],['south-keys','South Florida|and the Keys',24.35,-81.0],['treasure-space','Treasure|and Space',27.9,-79.95],['northeast','Northeast',30.1,-80.75]];
function rSweep(){try{if(sessionStorage.getItem('fc-rsweep'))return;sessionStorage.setItem('fc-rsweep','1')}catch(e){}let i=0;const step=()=>{if(!RA()){S.rHL=null;render();return}S.rHL=i<R7.length?R7[i][0]:null;render();if(i++<R7.length)setTimeout(step,1000)};setTimeout(step,700)}
function render(fast){
 if(!vbOk(S.vb)){const[w0,h0]=size();if(w0>20&&h0>20)S.vb=fit0(ALL,.02,w0,h0)}
 {const[w0]=size();if(w0>20&&w0<600&&S.vb&&S.vb[2]>PHMAX()*1.001){const f=PHMAX()/S.vb[2],c=[S.vb[0]+S.vb[2]/2,S.vb[1]+S.vb[3]/2];S.vb=[c[0]-S.vb[2]*f/2,c[1]-S.vb[3]*f/2,S.vb[2]*f,S.vb[3]*f]}}
 const [w,h]=size(),v=S.vb,k=v[2]/w;svg.setAttribute('viewBox',v.join(' '));base.style.setProperty('--k',k);
 const zoomed=v[2]<330,deep=v[2]<200;svg.classList.toggle('zin',k<.6);
 let s='';const boxes=[];
 {const mb=box.getBoundingClientRect();['rdd','all'].forEach(id=>{const el=$(id);if(!el||!el.offsetWidth)return;const r=el.getBoundingClientRect();boxes.push([r.left-mb.left-6,r.top-mb.top-6,r.width+12,r.height+12])});{const rs=$('res');if(DFL()&&rs){const r=rs.getBoundingClientRect();boxes.push([r.left-mb.left-10,r.top-mb.top-10,r.width+20,r.height+20])}}const zm=box.querySelector('.zoom');if(zm&&zm.offsetWidth){const r=zm.getBoundingClientRect();boxes.push([r.left-mb.left-8,r.top-mb.top-8,r.width+16,r.height+16])}}
 if(S.pop&&w>=600){const pe=$('pop');boxes.push([0,h-pe.offsetHeight-32,pe.offsetWidth+32,pe.offsetHeight+32])}
 const hit=(x,y,bw,bh)=>{if(x<4||x+bw>w-4||y<2||y+bh>h-2)return true;for(const b of boxes)if(x<b[0]+b[2]&&x+bw>b[0]&&y<b[1]+b[3]&&y+bh>b[1])return true;boxes.push([x,y,bw,bh]);return false};
 // sea
 if(RA()){const fs=w<600?10.5:12.5;RLAB.forEach(([id,nm,la,lo])=>{const x=X(lo),y=Y(la),L=nm.split('|'),sx=(x-v[0])/k,sy=(y-v[1])/k,tw=Math.max(...L.map(l=>l.length))*fs*.82,th=L.length*(fs+4);if(sx-tw/2<6||sx+tw/2>w-6||sy-fs<6||sy+th>h-6)return;boxes.push([sx-tw/2-4,sy-fs-4,tw+8,th+8]);s+=`<text class="sea rgn${S.rHL==id?' on':''}" data-r="${id}" x="${x}" y="${y}" text-anchor="middle" font-size="${fs*k}">${L.map((l,i)=>`<tspan x="${x}" dy="${i?(fs+3)*k:0}">${l}</tspan>`).join('')}</text>`})}
 const seaDone={};if(!RA()&&!(S.mode=='sliders'&&S.top.length))[['Gulf of Mexico',26.9,-84.7],['Gulf of Mexico',28.6,-84.0],['Atlantic Ocean',29.2,-79.9],['Atlantic Ocean',26.6,-79.6],['Atlantic Ocean',30.3,-81.15],['Atlantic Ocean',28.7,-80.45],['Atlantic Ocean',27.6,-80.1],['Atlantic Ocean',25.6,-79.95],['Gulf of Mexico',30.05,-86.6],['Gulf of Mexico',29.5,-84.7],['Gulf of Mexico',29.15,-83.75],['Gulf of Mexico',28.4,-83.2],['Gulf of Mexico',27.3,-83.2],['Gulf of Mexico',25.9,-82.0]].forEach(([n,la,lo])=>{if(seaDone[n])return;const fs=zoomed?15:16,sx=(X(lo)-v[0])/k,sy=(Y(la)-v[1])/k,tw=n.length*fs*.62;if(sx<16||sx+tw>w-16||sy<fs+16||sy>h-16)return;if(T.some(t=>{const dx=(t.x-v[0])/k,dy=(t.y-v[1])/k;return dx>sx-40&&dx<sx+tw+40&&dy>sy-fs-30&&dy<sy+30}))return;if(hit(sx,sy-fs,tw,fs+4))return;seaDone[n]=1;s+=`<text class="sea" x="${X(lo)}" y="${Y(la)}" font-size="${fs*k}">${n}</text>`});
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
 vis.forEach(t=>{if(inClu.has(t.id))return;const m=match(t),sg=SIG.includes(t.id);const any=S.style||S.price;if(!pin(t)&&slTop)return;if(!pin(t)&&S.mode=='vibes'&&!S.style&&S.demo&&!t.v.includes(S.demo))return;if(S.mode=='vibes'&&S.style&&!m&&!pin(t))return;
  let r=any?(m?5.5:3):(sg?5:(zoomed?4.5:3));let op=any&&!m?(S.mode=='vibes'?1:.45):(sg||any?1:(zoomed?.85:.8));let fill=any&&!m?'#8C9799':(sg||any?'#152A2E':'#6B7678');
  if(RA()){fill='#152A2E';r=4;op=1;if(S.rHL){const inR=t.v.includes('r:'+S.rHL);r=inR?5.5:3.4;op=inR?1:.45}}
  if(pin(t))r=7;
  const dm=S.mode=='vibes'&&!S.style&&S.demo&&t.v.includes(S.demo),vc=S.mode=='vibes'&&S.style&&m?VCOL[S.style]:dm?VCOL[S.demo]:null;
  if(vc){const rr=pin(t)?7:dm?6:5;if(dm)s+=`<circle class="ddh" cx="${t.x}" cy="${t.y}" r="${13*k}" fill="${vc}" style="animation-delay:${((t.o||t.x|0)*137)%1400}ms"/>`;s+=`<circle class="dot${dm?' dd':''}" data-id="${t.id}" cx="${t.x}" cy="${t.y}" r="${rr*k}" fill="${vc}" stroke="#fff" stroke-width="${2.2*k}" style="filter:drop-shadow(0 1px 1.5px rgba(0,0,0,.25))"/>`}
  else s+=`<circle class="dot" data-id="${t.id}" cx="${t.x}" cy="${t.y}" r="${(S.mode=='vibes'&&S.style&&!m?(sg?4.5:3.2):r)*k}" fill="${S.mode=='vibes'&&S.style&&!m?'#152A2E':fill}" ${S.mode=='vibes'&&S.style&&!m?'fill-opacity=".55"':''} opacity="${op}" stroke="#fff" stroke-width="${(r>3?2:1)*k}"/>`});
 s=s.slice(0,s0)+sg0+s.slice(s0);
 CL.forEach(c=>{const L=c[0],n=c.length,bx=(L.x-v[0])/k,by=(L.y-v[1])/k;boxes.push([bx-16,by-16,32,32]);s+=`<g class="clu" data-ids="${c.map(t=>t.id).join(',')}" style="cursor:pointer"><circle cx="${L.x}" cy="${L.y}" r="${13*k}" fill="${VCOL[S.style]||'#152A2E'}" stroke="#fff" stroke-width="${2.4*k}" style="filter:drop-shadow(0 1px 2px rgba(0,0,0,.3))"/><text x="${L.x}" y="${L.y+4.6*k}" text-anchor="middle" font-size="${13*k}" font-weight="600" fill="#fff" style="font-family:var(--mapf);pointer-events:none">${n}</text></g>`});
 // labels: pinned first, then matched sig, then matched zoomed
 const want=[];CL.forEach(c=>want.push([Object.assign({},c[0],c.length<=3?{n:c.map(t=>t.n.replace(/ \(.*\)$/,'')).sort((p,q)=>q.length-p.length)[0],_names:c.slice().sort((p,q)=>p.y-q.y).map(t=>[t.id,t.n.replace(/ \(.*\)$/,'')]),_clu:1,_off:20}:{n:c[0].n.replace(/ \(.*\)$/,'')+' +'+(c.length-1),_clu:1,_off:20}),c.length<=3?0.5:1]));vis.forEach(t=>{if(inClu.has(t.id))return;const m=match(t),sg=SIG.includes(t.id);if(pin(t))want.push([t,0]);else if(m&&(S.style||S.price)){if(sg)want.push([t,1]);else if(true)want.push([t,2])}else if(sg&&!S.style&&!S.price&&!(S.mode=='vibes'&&S.demo&&!t.v.includes(S.demo)))want.push([t,2]);else if(zoomed&&m)want.push([t,3])});
 if(S.mode=='vibes'&&isR(S.style)){const cap=99,ok=new Set(T.filter(t=>t.v.includes(S.style)).map(t=>[t,-t.v.filter(v=>!isR(v)).length,Math.min(...['beach','walk','charm','meet','water'].map(k=>LD[t.id].rk[k]||999))]).sort((a,b)=>a[1]-b[1]||a[2]-b[2]).map(x=>x[0]).slice(0,cap).map(t=>t.id));for(let i=want.length-1;i>=0;i--)if(want[i][1]>0&&!want[i][0]._clu&&!ok.has(want[i][0].id))want.splice(i,1)}
 want.sort((a,b)=>a[1]-b[1]);if(!zoomed&&(S.style||S.price)){let c=0;const keep=[];want.forEach(w=>{if(w[1]==0||c<99){keep.push(w);if(w[1]>0)c++}});want.length=0;keep.forEach(w=>want.push(w))}
 {const any=S.style||S.price;vis.forEach(t=>{if(slTop)return;const show=any?match(t):SIG.includes(t.id);if(!show||pin(t))return;const sx=(t.x-v[0])/k,sy=(t.y-v[1])/k;boxes.push([sx-5,sy-5,10,10])})}
 if(RA()&&w<600)want.length=0;/* phone Regions overview: dots and region names only */
 let lab='';const placed=new Set();
 want.forEach(([t0,pr])=>{const t=t0._clu?t0:Object.assign({},t0,{n:t0.n.replace(/ \(.*\)$/,'')}),fs=(pr==3?12:13.5),cw=fs*.57,tw=t.n.length*cw+4,nl=t._names?t._names.length:1,th=(fs+4)*nl;
  const left=t.c=='gulf'||t.c=='panhandle'&&false;const sx=(t.x-v[0])/k,sy=(t.y-v[1])/k;
  const o0=t._off||10,opts=(t.c=='atlantic'?[[o0,1],[-o0,-1]]:[[-o0,-1],[o0,1]]).concat(pr>0&&!t._names?[[0,2],[0,-2]]:[]);
  for(const [dx,dir] of opts){if(dir==2||dir==-2){const by=dir==2?sy-th-5:sy+5;if(hit(sx-tw/2,by,tw,th))continue;placed.add(t.id);lab+=`<text class="lbl ${pr==3?'sm':''}" x="${t.x}" y="${v[1]+(by+fs*.86)*k}" text-anchor="middle" font-size="${fs*k}" stroke-width="${2.4*k}">${t.n}</text>`;break}const bx=dir>0?sx+dx:sx+dx-tw;if(pr>0&&hit(bx,sy-th/2,tw,th))continue;placed.add(t.id);if(pr==0)boxes.push([bx,sy-th/2,tw,th]);
   if(pr==0)lab+=`<rect x="${v[0]+(bx-8)*k}" y="${v[1]+(sy-15)*k}" width="${(tw+16)*k}" height="${30*k}" rx="${15*k}" fill="#152A2E"/><text class="lbl" x="${v[0]+(bx+tw/2)*k}" y="${v[1]+(sy+5.5)*k}" text-anchor="middle" font-size="${fs*k}" fill="#fff" style="fill:#fff;stroke:none">${t.n}</text>`;
   else if(t._names){boxes.push([bx,sy-th/2,tw,th]);t._names.forEach(([id,nm],i)=>{lab+=`<text class="lbl clul" data-id="${id}" x="${v[0]+(dir>0?bx:bx+tw)*k}" y="${v[1]+(sy-th/2+(fs+4)*i+fs*.9)*k}" text-anchor="${dir>0?'start':'end'}" font-size="${fs*k}" stroke-width="${2.4*k}">${nm}</text>`})}
   else lab+=`<text class="lbl ${pr==3?'sm':''}" x="${v[0]+(dir>0?bx:bx+tw)*k}" y="${v[1]+(sy+fs*.35)*k}" text-anchor="${dir>0?'start':'end'}" font-size="${fs*k}" stroke-width="${2.4*k}">${t.n}</text>`;break}});
 if(dflt&&!zoomed&&!RA())SIG.forEach(id=>{if(!placed.has(id)&&!(S.pop&&S.pop.id==id))s=s.replace(new RegExp('<circle class="dot" data-id="'+id+'"[^>]*/>'),'')});
 vis.forEach(t=>{if(!pin(t)&&((!zoomed&&dflt&&!RA()&&!SIG.includes(t.id))||(slTop&&!S.top.includes(t.id))))return;const sx=(t.x-v[0])/k,sy=(t.y-v[1])/k;boxes.push([sx-6,sy-6,12,12])});
 // cities last, only where free
 let cs='';if(!(RA()&&w<600)&&!(S.mode=='sliders'&&S.top.length&&w<600))CITIES.forEach(([n,la,lo])=>{const x=X(lo),y=Y(la);if(x<v[0]||x>v[0]+v[2]||y<v[1]||y>v[1]+v[3])return;if(T.some(t=>t.n.startsWith(n)))return;const sx=(x-v[0])/k,sy=(y-v[1])/k,fs=12.5,tw=n.length*fs*.72;if(vis.some(t=>Math.hypot((t.x-x)/k,(t.y-y)/k)<(S.mode=='sliders'&&S.top.slice(0,5).includes(t.id)?90:S.mode=='sliders'&&S.top.includes(t.id)?50:26)))return;if(hit(sx+6,sy-9,tw+4,18))return;cs+=`<circle cx="${x}" cy="${y}" r="${3.6*k}" fill="#fff" stroke="#9AA3A5" stroke-width="${1.4*k}"/><text class="city" x="${x+9*k}" y="${y+5*k}" font-size="${fs*k}" stroke-width="${3.5*k}">${n}</text>`});
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
  return `<a class="card" href="towns/${t.id}.html" data-id="${t.id}"><div class="ph" style="background-image:url('${t.img}')"><div class="tg">${st}</div></div>${t.p?`<div class="pr">${t.p}<small>typical home</small></div><div class="nm">${t.n}</div>`:`<div class="nm big" style="margin-top:10px">${t.n}</div><div class="rg">Too few sales for a median</div>`}<div class="rg">${t.r.replace(/ · /g,', ')}</div></a>`}).join('');
}
function rowOn(){document.querySelectorAll('.t5,.r15').forEach(r=>r.classList.toggle('on',!!S.pop&&r.dataset.id==S.pop.id))}
function placePop(){rowOn();const p=$('pop');p.style.left='16px';p.style.bottom='16px';p.style.top='auto'}
function vTag(v){return `<span class="stag"><i style="background:${VCOL[v]}"></i>${LK.VSHORT[v]||VIBES[v]}</span>`}
function ndWhy(t){const n=S.need,L=[],d=LD[t.id];S.style&&!isR(S.style)&&t.v.includes(S.style)&&L.push('Your style: '+(LK.VSHORT[S.style]||VIBES[S.style]));
 n.bud&&d.med&&L.push(`Median home about ${fK(d.med)}, under ${fK(n.bud)}`);n.school&&L.push(`Public schools rated ${d.es} of 5`);n.air&&L.push(`Close to ${d.ap||'a major airport'}`);
 return L.length?`<div class="why2"><b>Why it fits</b><ul>${L.map(x=>`<li>${x}</li>`).join('')}</ul></div>`:''}
const fK=k=>k>=1000?'$'+(k/1000).toFixed(k>=10000?0:2).replace(/\.?0+$/,'')+'M':'$'+Math.round(k)+'K';
function popList0(){if(S.mode=='sliders')return S.top.slice(0,5).map(id=>T.find(t=>t.id==id));if(S.mode=='vibes'&&S.style)return vOrder();return []}
/* Nov 13: a town that isn't in the current list (from search, or a dot outside the style) gets arrows through its nearest towns instead of a bare card */
function popList(){const b=popList0(),t=S.pop;S.nearOn=false;if(!t||b.some(x=>x&&x.id==t.id))return b;if(!(S.near&&S.near.some(x=>x.id==t.id))){S.near=T.slice().sort((a,c)=>Math.hypot(a.x-t.x,a.y-t.y)-Math.hypot(c.x-t.x,c.y-t.y)).slice(0,10)}S.nearOn=true;return S.near}
function openPop(t,nopan){S.pop=t;const p=$('pop');const L=popList(),ki=L.findIndex(x=>x.id==t.id),n=L.length,nx=n>1&&ki>=0?L[(ki+1)%n]:null,sh=x=>x.n.replace(/ \(.*\)$/,'');
 const d=LD[t.id],tags=(S.style&&!isR(S.style)&&t.v.includes(S.style)?[S.style]:[]).concat(t.v.filter(v=>v!==S.style&&LK.VFEEL.includes(v))).slice(0,3).map(vTag).join('');
 let eb=S.mode=='vibes'&&S.style=='best'&&t.bestRk?`#${t.bestRk} quality of life · ${d.rn}`:d.rn,mid='';
 if(S.mode=='sliders'&&ki>=0){{const fw=slFitWord(fitSl(t),S.best,ki),wy=slWhy(t);eb=fw?`${d.rn} · <b>${fw}</b>`:d.rn;mid=wy?`<div class="why1">${wy}</div>`:''}}
 else if(S.mode=='vibes')mid=ndWhy(t);
 const nav=ki>=0&&n>1;
 p.innerHTML=`<div class="ph" style="background-image:url('${t.img}')">${S.mode=='sliders'&&ki>=0?`<span class="rkb">${ki+1}</span>`:''}</div><button class="x" aria-label="Close">&times;</button><div class="bd"><div class="eb">${eb}</div><h3>${t.n}</h3>${tags?`<div class="tags">${tags}</div>`:''}${S.mode=='explore'?(t.p?`<div class="pr">${t.p}<small>typical home</small></div>`:''):''}${mid}<p>${t.b}</p>${nav?`<div class="pnav"><button data-st="-1" aria-label="Previous town">‹</button><a class="go" href="towns/${t.id}.html">Explore →</a><button data-st="1" aria-label="Next town">›</button></div><div class="of">${S.nearOn?`Nearby · ${ki+1} of ${n}`:`${ki+1} of ${S.mode=='sliders'?'your top 5':n}`} · next up ${sh(nx)}</div>`:`<a class="go" href="towns/${t.id}.html">Explore →</a>`}</div>`;
 p.querySelectorAll('[data-st]').forEach(bn=>bn.onclick=e=>{e.stopPropagation();const j=(ki+(+bn.dataset.st)+n)%n;flyTo(L[j])});
 p.classList.remove('full');p.onclick=ev=>{if(!ev.target.closest('.x,.go'))p.classList.add('full')};p.classList.add('on');p.querySelector('.x').onclick=e=>{e.stopPropagation();closePop()};render();placePop();
 const [w,h]=size(),v=S.vb,k=v[2]/w,sx=(t.x-v[0])/k,sy=(t.y-v[1])/k,pw=p.offsetWidth+32,ph=p.offsetHeight+32;
 if(PH()){if(SHON()&&SHEET.st!='peek'&&SHEET.st!='low'&&!nopan)shSet('peek',true);const avail=SHON()?h-SHRES()-6:h-p.offsetHeight-10-14;if(sy<70+HDR()||sy>avail||sx<30||sx>w-30)go([t.x-w/2*k,t.y-Math.max(90+HDR(),(70+HDR()+avail)/2)*k,v[2],v[3]],420);return}if(FIXED())return;if(nopan){const[w,h]=size(),v=S.vb,k=v[2]/w,sx=(t.x-v[0])/k,sy=(t.y-v[1])/k;if(w>=600&&(sx<380||sx>w-60||sy<60||sy>h-40)){const cx=(380+w)/2;go([t.x-cx*k,t.y-h/2*k,v[2],v[3]],400)}return}const nar=w<600,under=nar?sy>h-ph:(sx<pw&&sy>h-ph),out=sx<40||sx>w-40||sy<40||sy>h-40;
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
/* Nov 12: on phones the map never zooms out past the Florida footprint (you can always zoom in) */
const PHMAX=()=>{try{return FLW()*.82}catch(e){return 1e9}};
function clampVb(v){const[w,h]=size();if(w<20||h<20)return v;const full=fit0(ALL,.02,w,h),mx=w<600?PHMAX():full[2]*1.25,mn=MINW*.9;let nw=Math.min(mx,Math.max(mn,v[2])),q=nw/v[2],nh=v[3]*q;let cx=v[0]+v[2]/2,cy=v[1]+v[3]/2;cx=Math.min(X(ALL[1]),Math.max(X(ALL[0]),cx));cy=Math.min(Y(ALL[2]),Math.max(Y(ALL[3]),cy));return [cx-nw/2,cy-nh/2,nw,nh]}
const PTR=new Map();let pinch=null;
let dr=null;box.addEventListener('pointerdown',e=>{if(e.target.closest('.pop,.ctl,.zoom,.rdd'))return;PTR.set(e.pointerId,[e.clientX,e.clientY]);try{box.setPointerCapture(e.pointerId)}catch(x){}
 if(PTR.size==2){const[a,b]=[...PTR.values()],r=box.getBoundingClientRect();pinch={d0:Math.hypot(a[0]-b[0],a[1]-b[1]),vb:S.vb.slice(),mx:(a[0]+b[0])/2-r.left,my:(a[1]+b[1])/2-r.top};if(dr)dr.moved=true;return}
 dr={x:e.clientX,y:e.clientY,vb:S.vb.slice(),moved:false,t:e.target}});
box.addEventListener('pointermove',e=>{if(!PTR.has(e.pointerId))return;PTR.set(e.pointerId,[e.clientX,e.clientY]);if(pinch&&PTR.size>=2){const[a,b]=[...PTR.values()],d=Math.hypot(a[0]-b[0],a[1]-b[1]);if(d<10)return;const f=pinch.d0/d,v=pinch.vb,[w,h]=size(),kx=v[2]/w,ky=v[3]/h,px=v[0]+pinch.mx*kx,py=v[1]+pinch.my*ky,nw=v[2]*f,nh=v[3]*f;S.vb=clampVb([px-(px-v[0])*f,py-(py-v[1])*f,nw,nh]);render(true);S.userMoved=1}});
const ptrEnd=e=>{PTR.delete(e.pointerId);if(PTR.size<2&&pinch){pinch=null;if(dr){const p0=[...PTR.values()][0];if(p0){dr.x=p0[0];dr.y=p0[1];dr.vb=S.vb.slice()}}render()}};
box.addEventListener('pointerup',ptrEnd);box.addEventListener('pointercancel',ptrEnd);
box.addEventListener('pointercancel',()=>{dr=null;box.classList.remove('drag')});box.addEventListener('pointermove',e=>{if(!dr||pinch)return;const dx=e.clientX-dr.x,dy=e.clientY-dr.y;if(Math.abs(dx)+Math.abs(dy)>6){dr.moved=true;box.classList.add('drag')}if(!dr.moved)return;const[w]=size(),k=dr.vb[2]/w;S.vb=clampVb([dr.vb[0]-dx*k,dr.vb[1]-dy*k,dr.vb[2],dr.vb[3]]);S.userMoved=1;render(true)});
box.addEventListener('pointerup',e=>{if(!dr||PTR.size)return;box.classList.remove('drag');if(dr.moved){if(S.region){S.region='';tags()}list()}else{const el=document.elementFromPoint(e.clientX,e.clientY);const rg=el&&el.closest&&el.closest('.rgn');if(rg){pickStyle('r:'+rg.dataset.r);dr=null;return}const nl=el&&el.closest('.clul');if(nl){const t=T.find(x=>x.id==nl.dataset.id);t&&flyTo(t)}else{let c=el&&el.closest('circle.dot');if(!c&&PH()&&!(el&&el.closest('.pop,#res,button,a'))){let bd=22;document.querySelectorAll('#mapbox circle.dot').forEach(d=>{const q=d.getBoundingClientRect();if(!q.width)return;const dd=Math.hypot(q.left+q.width/2-e.clientX,q.top+q.height/2-e.clientY);if(dd<bd){bd=dd;c=d}})}if(c){openPop(T.find(t=>t.id==c.dataset.id))}}}dr=null});
$('grid').addEventListener('mouseover',e=>{const c=e.target.closest('.card');const id=c?c.dataset.id:null;if(id!==S.hover){S.hover=id;render()}});
$('grid').addEventListener('mouseleave',()=>{S.hover=null;render()});
$('q').addEventListener('keydown',e=>{if(e.key!='Enter')return;const q=e.target.value.trim().toLowerCase();if(!q)return;
 const r=REG.find(r=>r[0].toLowerCase().includes(q));const t=T.find(t=>t.n.toLowerCase().startsWith(q))||T.find(t=>((window.FCAKA||{})[t.id]||'').toLowerCase().includes(q));const st=Object.keys(VIBES).find(k=>VIBES[k].toLowerCase().includes(q));
 if(t){go([t.x-MINW/2,t.y-MINW/2*S.vb[3]/S.vb[2],MINW,MINW*S.vb[3]/S.vb[2]]);setTimeout(()=>openPop(t),460)}else if(r){S.region=r[0];tags();go(fit(r.slice(1)))}else if(st){$('sty').value=st;$('sty').dispatchEvent(new Event('change'))}e.target.value=''});
