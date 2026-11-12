const VIBES={"beaches": "Best Beaches", "oldfl": "Old Florida", "bluezone": "Healthy Living", "island": "Island Life", "dock": "Dock of the Bay", "sophhigh": "High Energy", "social": "Social Scene", "sophcalm": "Sophisticated Laid Back", "active": "Active Outdoors", "walk": "Walkable", "remote": "Remote Work", "afford": "Affordable"},EXP=[["naples", 22], ["stuart", 20], ["cocoa", 16], ["dunedin", 13], ["30a", 12], ["titusville", 11], ["sarasota", 10], ["vero-beach", 10]];
const CO=[['panhandle','The Panhandle','From Pensacola east to St. Marks','../img/c/destin.webp',['emerald-coast','forgotten-coast']],['nature-coast-r','The Nature Coast','The Big Bend, from Keaton Beach south to Hudson','../img/c/crystal-river.webp',['nature-coast']],['tampa-bay','Tampa Bay','From Port Richey down past St. Pete to Tierra Verde and the South Shore','../img/c/clearwater-beach.webp',['st-pete-clearwater','tampa-south-shore']],['southwest','Southwest Florida','From Anna Maria Island down to Chokoloskee','../img/c/sanibel-island.webp',['sarasota-bradenton','fort-myers-sanibel','naples-marco']],['south-keys','South Florida and the Keys','From Tequesta down through Miami to Key West','../img/c/keys-bridge.webp',['miami-fort-lauderdale','palm-beaches','florida-keys']],['treasure-space','Treasure and Space Coast','From Hobe Sound north to Titusville','../img/c/cocoa-beach.webp',['treasure-coast','space-coast']],['northeast','Northeast Florida','From Edgewater north to Fernandina Beach','../img/c/st-augustine-aerial.webp',['daytona-flagler','first-coast']]];
const inC=(t,k)=>{const c=CO.find(x=>x[0]==k);return !!c&&c[4].includes(TA[t.id])};
const AOF={};CO.forEach(c=>c[4].forEach(a=>AOF[a]=c[0]));const OLDC={gulf:'tampa-bay',keys:'south-keys',atlantic:'south-keys'};
const $=id=>document.getElementById(id),byId=Object.fromEntries(T.map(t=>[t.id,t]));
const real=t=>!/atlas\//.test(t.img);
const norm=s=>s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g,'').replace(/[^a-z0-9 ]/g,' ');
const area=t=>TA[t.id]||'';
const areaName=(c,a)=>AR[a]?AR[a].h:a;
const cOrd=t=>t.c=='panhandle'?t.lo:t.c=='gulf'?-t.la:t.c=='keys'?t.lo:t.la;
const fmt=(la,lo)=>`${Math.abs(la).toFixed(2)}° N &nbsp;${Math.abs(lo).toFixed(2)}° W`;
const avg=(L,k)=>L.reduce((a,t)=>a+t[k],0)/L.length;
const pr=t=>t.p||'';
/* search */
function sres(q){q=norm(q.trim());if(!q)return'';const out=[];
 const co=CO.filter(c=>norm(c[1]).includes(q));const ar=[...new Set(T.map(t=>t.c+'|'+area(t)))].filter(x=>norm(areaName(...x.split('|'))).includes(q)).slice(0,3);
 const tw=T.filter(t=>norm(t.n+' '+((window.FCAKA||{})[t.id]||'')).includes(q)).sort((a,b)=>norm(a.n).indexOf(q)-norm(b.n).indexOf(q)||a.n.localeCompare(b.n)).concat(T.filter(t=>!norm(t.n+' '+((window.FCAKA||{})[t.id]||'')).includes(q)&&norm(t.r).includes(q))).slice(0,7);
 if(tw.length)out.push('<div class="hd">Towns</div>'+tw.map(t=>`<a href="${t.id}-v3.html"><i style="background-image:url('${t.img}')"></i><span><b>${t.n}</b><small>${t.r.replace(/ · /g,', ')}</small></span><span class="pr">${pr(t)}</span></a>`).join(''));
 if(co.length||ar.length)out.push('<div class="hd">Regions</div>'+co.map(c=>`<a href="#regions" data-c="${c[0]}"><i style="background-image:url('${c[3]}')"></i><span><b>${c[1]}</b><small>${T.filter(t=>inC(t,c[0])).length} towns</small></span></a>`).join('')+ar.map(x=>{const[c,a]=x.split('|'),L=T.filter(t=>t.c==c&&area(t)==a);const im=(L.find(real)||L[0]).img;return `<a href="#regions" data-c="${AOF[a]||c}" data-a="${a}"><i style="background-image:url('${im}')"></i><span><b>${areaName(c,a)}</b><small>${L.length} ${L.length==1?'town':'towns'}</small></span></a>`}).join(''));
 return out.join('')||'<div class="no">No towns match that. Try a nearby town or a region like Tampa Bay.</div>'}
let kI=-1;
$('q').oninput=()=>{const h=sres($('q').value);$('dd').innerHTML=h;$('sb').classList.toggle('open',!!h);kI=-1};
$('q').onkeydown=e=>{const L=[...$('dd').querySelectorAll('a')];if(!L.length)return;if(e.key=='ArrowDown'||e.key=='ArrowUp'){e.preventDefault();kI=(kI+(e.key=='ArrowDown'?1:-1)+L.length)%L.length;L.forEach((a,i)=>a.classList.toggle('k',i==kI))}if(e.key=='Enter'){e.preventDefault();(L[kI]||L[0]).click()}if(e.key=='Escape')$('sb').classList.remove('open')};
$('sb').onsubmit=()=>{const a=$('dd').querySelector('a');if(a)a.click();return false};
document.addEventListener('click',e=>{if(!e.target.closest('#sb'))$('sb').classList.remove('open')});
$('dd').addEventListener('click',e=>{const a=e.target.closest('a[data-c]');if(!a)return;e.preventDefault();$('sb').classList.remove('open');pickC(a.dataset.c,a.dataset.a||'');$('regions').scrollIntoView({behavior:'smooth'})});
/* explored */
$('row').innerHTML=EXP.filter(([id])=>byId[id]).map(([id],i)=>{const t=byId[id];return `<a class="ex" href="${t.id}-v3.html"><i style="background-image:url('${t.img}')"></i><span class="n">No. ${i+1}</span><span class="t"><b>${t.n}</b><small><span>${area(t)=='Panhandle'?'Panhandle':t.r.split(' · ').pop()}</span><span>${pr(t)}</span></small></span></a>`}).join('');
const sc=d=>{const r=$('row');r.scrollBy({left:d*(r.firstElementChild.offsetWidth+20),behavior:'smooth'})};$('rp').onclick=()=>sc(-1);$('rn').onclick=()=>sc(1);
/* regions */
const R={c:'',a:''};
/* Nov 12: region map labels. VIEWS = different visitors who opened each town on Florida Coastal, Oct 13 to Nov 12 2026 (read only pull from fc_events). BEST = Slider Map Best all around order */
const VIEWS={"naples":22,"stuart":21,"cocoa":16,"dunedin":13,"30a":12,"titusville":11,"vero-beach":11,"palm-bay":11,"sarasota":10,"palm-coast":9,"melbourne":9,"ftl":9,"venice":9,"satellite-beach":9,"apalachicola":8,"lake-worth-beach":8,"st-petersburg":8,"staug":8,"treasure-island":7,"homosassa":7,"cape-coral":7,"southbeach":7,"cocoa-village":7,"west-palm-beach":7,"destin":7,"edgewater":7,"englewood":7,"flagler":7,"daytona":6,"indian-river-shores":6,"ozello":6,"hutchinson-island":6,"islamorada":6,"ami":6,"siesta-key":6,"fernandina":6,"jensen-beach":6,"fort-myers":6,"weeki-wachee":6,"vilano-beach":6,"tierra-verde":6,"port-st-lucie":6,"marco-island":6,"cape-canaveral":6,"nsb":6,"rockledge":5,"punta-gorda":5,"port-charlotte":5,"cedarkey":5,"wilton-manors":5,"crystal-river":5,"everglades-city":5,"steinhatchee":5,"west-melbourne":5,"hobe-sound":5,"beverly-beach":5,"boca-raton":5,"hudson":5,"bonita-springs":5,"jupiter":5,"st-augustine-beach":5,"matlacha":5,"miramar-beach":5,"sebastian":5},BEST=["dunedin","naples","venice","fernandina","stuart","staug","southbeach","nsb","st-petersburg","tarpon-springs","vero-beach","30a","cocoa","jupiter","sarasota","sebastian","hollywood","delray","gulfport","lake-worth-beach","cedarkey","punta-gorda","ftl","pensacola","clearwaterbeach","fortpierce","atlantic-beach","st-pete-beach","jaxbeach","lauderdale-by-the-sea","safety-harbor","apalachicola","indian-harbour-beach","flagler","cape-canaveral","keywest","neptune-beach","palm-harbor","key-biscayne","port-st-joe","ormond-beach","miami","boca-raton","treasure-island","fort-myers-beach","jensen-beach","destin","titusville","englewood","siesta-key","ami","madeira-beach","bradenton-beach","cocoa-village","fort-walton-beach","satellite-beach","boca-grande","bonita-springs","ponce-inlet","palm-beach","new-port-richey","st-augustine-beach","boynton-beach","sanibel-island","pompano-beach","deerfield-beach","captiva","palm-beach-shores","gulf-breeze","jacksonville","niceville","daytona","clearwater","vilano-beach","north-palm-beach","riviera-beach","west-palm-beach","fort-myers","melbourne","pcb","lake-park","bal-harbour","marco-island","port-salerno","bradenton","cape-coral","matlacha","melbourne-beach","juno-beach","carrabelle","wilton-manors","lantana","indialantic","tequesta","pensacola-beach","crystal-river","ormond-by-the-sea","hobe-sound","redington-shores","cortez","dania-beach","tierra-verde","palm-coast","st-marks","hallandale","miramar-beach","panama-city","everglades-city","merritt-island","sunny-isles-beach","tampa","indian-rocks-beach","port-richey","edgewater","ponte-vedra-beach","crescent-beach","steinhatchee","hudson","oldsmar","daytona-beach-shores","hutchinson-island","navarre","port-orange","big-pine-key","north-miami-beach","marathon","holiday","navarre-beach","chokoloskee","st-george-island","rockledge","mexico-beach","yankeetown","islamorada","mary-esther","horseshoe-beach","weeki-wachee","key-largo","belleair-beach","ruskin","homosassa","perdido-key","freeport","sewalls-point","port-charlotte","indian-shores","beverly-beach","suwannee","lighthouse-point","sun-city-center","longboat","palm-city","palm-bay","ozello","palm-beach-gardens","apollo-beach","indian-river-shores","west-melbourne","hernando-beach","keaton-beach","shalimar","highland-beach","inglis","gibsonton","aripeka","port-st-lucie","st-teresa"];
/* Nov 12: Browse by region, modeled on the home Vibe Map card. A real basemap zoomed into one region at a time, with a swipe row of region cards that glides the map */
$('cg').innerHTML=(()=>{
 const cards=CO.map(([k,n,d,im],i)=>{const L=T.filter(t=>inC(t,k));return `<button type="button" class="ct rx${i?'':' on'}" data-c="${k}" aria-label="${n}, ${L.length} towns"><i style="background-image:url('${im}')"></i><span><small>${L.length} towns</small><b>${n}</b><em>${d}</em></span></button>`}).join('');
 return `<div class="rgx"><div class="rgx-frame"><svg id="rgsvg" preserveAspectRatio="xMidYMid meet" role="img" aria-label="Map of the selected Florida region"></svg><div class="rgx-pill" id="rgpill"></div></div><div class="rgx-row" id="rgrow">${cards}</div><div class="rgx-dots" id="rgdots">${CO.map((c,i)=>`<i class="${i?'':'on'}"></i>`).join('')}</div></div>`})();
(function(){const svg=$('rgsvg'),row=$('rgrow');if(!svg||!window.FLMAP)return;
 const PX=lo=>(lo+89)*88.3,PY=la=>(36.8-la)*100;
 const dots=CO.map(([k])=>T.filter(t=>inC(t,k)).map(t=>`<a href="${t.id}-v3.html" data-c="${k}"><title>${t.n}</title><circle cx="${PX(t.lo).toFixed(1)}" cy="${PY(t.la).toFixed(1)}" r="5"/></a>`).join('')).join('');
 svg.innerHTML=`<g class="terr" id="rgterr">${FLMAP}</g><g class="rgx-d" id="rgd">${dots}</g><g class="rgx-l" id="rglb"></g>`;
 // the 2 most viewed towns (at least 5 visitors, else our best ranked fill in) plus our best ranked town beyond those
 const pick=k=>{const L=T.filter(t=>inC(t,k)),bi=t=>{const i=BEST.indexOf(t.id);return i<0?999:i};const pop=L.filter(t=>(VIEWS[t.id]||0)>=5).sort((a,b)=>VIEWS[b.id]-VIEWS[a.id]||bi(a)-bi(b)).slice(0,2);
  L.slice().sort((a,b)=>bi(a)-bi(b)).forEach(t=>{if(pop.length<2&&!pop.includes(t))pop.push(t)});const top=L.slice().sort((a,b)=>bi(a)-bi(b)).find(t=>!pop.includes(t));return {pop,top,rank:top?bi(top)+1:0}};
 const labels=()=>{const g=$('rglb');if(!g||!act||!cur)return;const r=svg.getBoundingClientRect(),k=cur[2]/(r.width||360),{pop,top,rank}=pick(act),used=[];let h='';
  const nm=t=>t.n.replace(/ \(.*\)$/,'');{const fr=svg.getBoundingClientRect(),pq=$('rgpill').getBoundingClientRect();if(pq.width)used.push([pq.left-fr.left,pq.top-fr.top,pq.width,pq.height])}[top,...pop].filter(Boolean).forEach(t=>{const sx=(PX(t.lo)-cur[0])/k,sy=(PY(t.la)-cur[1])/k;used.push([sx-4,sy-4,8,8])});
  const place=(t,w,ht)=>{const sx=(PX(t.lo)-cur[0])/k,sy=(PY(t.la)-cur[1])/k,east=t.c=='atlantic'||t.c=='keys'&&t.lo>-80.6;const tries=t.c=='panhandle'?[[-w/2,-ht-12],[-w/2,12],[10,-ht/2],[-w-10,-ht/2]]:east?[[10,-ht/2],[-w-10,-ht/2],[-w/2,-ht-12],[-w/2,12]]:[[-w-10,-ht/2],[10,-ht/2],[-w/2,-ht-12],[-w/2,12]];
   {const W=r.width||360,cl=dx=>Math.max(6-sx,Math.min(W-6-w-sx,dx));tries.push([10,-ht-6],[-w-10,-ht-6],[10,6],[-w-10,6],[cl(-w/2),-ht-12],[cl(-w/2),12],[cl(-w/2),-ht-34],[cl(-w/2),34])}for(const[dx,dy]of tries){const b=[sx+dx,sy+dy,w,ht];if(b[0]<6||b[1]<6||b[0]+w>(r.width||360)-6||b[1]+ht>(r.height||300)-6)continue;if(used.some(q=>b[0]<q[0]+q[2]+4&&b[0]+w+4>q[0]&&b[1]<q[1]+q[3]+4&&b[1]+ht+4>q[1]))continue;used.push(b);return b}return null};
  /* Nov 12: one label style for all three (Mark: no pills, no overall rank text) */[...pop,top].filter(Boolean).forEach(t=>{const txt=nm(t),w=txt.length*7.6+4,b=place(t,w,18);if(b)h+=`<text x="${cur[0]+b[0]*k}" y="${cur[1]+(b[1]+14)*k}" font-size="${13.5*k}" stroke-width="${3.4*k}" class="rgx-tl">${txt}</text>`});
  svg.querySelectorAll('#rgd a').forEach(a=>{const id=a.getAttribute('href').replace('-v3.html','');a.classList.toggle('lb',(top&&top.id==id)||pop.some(t=>t.id==id))});
  g.innerHTML=h;g.classList.remove('in');requestAnimationFrame(()=>g.classList.add('in'))};
 const box=k=>{const L=T.filter(t=>inC(t,k));let x0=1e9,y0=1e9,x1=-1e9,y1=-1e9;L.forEach(t=>{const x=PX(t.lo),y=PY(t.la);x0=Math.min(x0,x);x1=Math.max(x1,x);y0=Math.min(y0,y);y1=Math.max(y1,y)});
  const r=svg.getBoundingClientRect(),asp=(r.width||360)/(r.height||300);let w=Math.max(x1-x0,60)*1.3,h=Math.max(y1-y0,60)*1.3;if(w/h<asp)w=h*asp;else h=w/asp;const cx=(x0+x1)/2,cy=(y0+y1)/2;return [cx-w/2,cy-h/2,w,h]};
 let cur=null,anim=0,act='';
 const set=v=>{svg.setAttribute('viewBox',v.map(n=>n.toFixed(1)).join(' '));const r=svg.getBoundingClientRect(),k=v[2]/(r.width||360);svg.style.setProperty('--k',k);$('rgterr').style.setProperty('--k',k)};
 const glide=to=>{cancelAnimationFrame(anim);$('rglb')&&($('rglb').innerHTML='');if(!cur||matchMedia('(prefers-reduced-motion: reduce)').matches){cur=to;set(to);labels();return}const fr=cur.slice(),t0=performance.now(),D=650;
  const st=n=>{const p=Math.min(1,(n-t0)/D),e=p<.5?4*p*p*p:1-Math.pow(-2*p+2,3)/2;cur=fr.map((a,i)=>a+(to[i]-a)*e);set(cur);if(p<1)anim=requestAnimationFrame(st);else labels()};anim=requestAnimationFrame(st)};
 const show=k=>{if(!k||k==act)return;act=k;const c=CO.find(x=>x[0]==k),n=T.filter(t=>inC(t,k)).length;$('rgpill').innerHTML=`<b>${c[1]}</b><span>${n} towns</span>`;
  svg.querySelectorAll('#rgd a').forEach(a=>a.classList.toggle('on',a.dataset.c==k));row.querySelectorAll('.rx').forEach(b=>b.classList.toggle('on',b.dataset.c==k));
  $('rgdots').querySelectorAll('i').forEach((d,i)=>d.classList.toggle('on',CO[i][0]==k));glide(box(k))};
 // swipe the row and the map follows the card in the middle
 let sT=0,lock=0;row.addEventListener('scroll',()=>{if(lock)return;clearTimeout(sT);sT=setTimeout(()=>{const r=row.getBoundingClientRect(),mid=r.left+Math.min(r.width/2,190);let best=null,bd=1e9;row.querySelectorAll('.rx').forEach(b=>{const q=b.getBoundingClientRect(),d=Math.abs(q.left+q.width/2-mid);if(q.left<=mid&&q.right>=mid){best=b;bd=0}else if(d<bd&&bd){bd=d;best=b}});best&&show(best.dataset.c)},90)},{passive:true});
 const into=k=>{const b=row.querySelector(`.rx[data-c="${k}"]`);if(!b)return;lock=1;row.scrollTo({left:b.offsetLeft-row.offsetLeft-(innerWidth>760?0:20),behavior:'smooth'});setTimeout(()=>{lock=0},600)};
 window.rgHL=k=>{if(k){show(k);into(k)}};
 $('rgdots').onclick=e=>{const d=e.target.closest('i');if(!d)return;const i=[...$('rgdots').children].indexOf(d);show(CO[i][0]);into(CO[i][0])};
 addEventListener('resize',()=>{if(act){const k=act;act='';show(k)}});
 const go0=()=>{act='';show(R.c||CO[0][0])};if(svg.getBoundingClientRect().width)go0();else requestAnimationFrame(go0)})();
$('cg').onclick=e=>{const b=e.target.closest('.ct');if(b)pickC(b.dataset.c,'')};
function pickC(c,a){R.c=c;R.a=a;const co=CO.find(x=>x[0]==c);const L=T.filter(t=>inC(t,c)).sort((x,y)=>cOrd(x)-cOrd(y));
 const areas=[];L.forEach(t=>{const a=area(t);if(!areas.includes(a))areas.push(a)});
 $('cg').classList.add('any');document.querySelectorAll('.ct').forEach(b=>b.classList.toggle('on',b.dataset.c==c));window.rgHL&&rgHL(c);
 $('arh').textContent=co[1];$('ars').textContent=co[2];
 $('ach').innerHTML=(areas.length>1?`<button data-a="" class="${a?'':'on'}">All <small>${L.length}</small></button>`:'')+(areas.length>1?areas.map(x=>`<button data-a="${x}" class="${x==a?'on':''}">${areaName(c,x)} <small>${L.filter(t=>area(t)==x).length}</small></button>`).join(''):'');
 const G=a?L.filter(t=>area(t)==a):L;
 const rng=X=>{const m=X.map(t=>t.m).filter(Boolean).sort((p,q)=>p-q);if(!m.length)return'';const f=v=>v>=1000?'$'+(v/1000).toFixed(v%1000?2:1).replace(/0$/,'')+'M':'$'+v+'K';return m.length>1?f(m[0])+' to '+f(m[m.length-1]):f(m[0])};
 if(a&&AR[a]){const A=AR[a];$('ax').innerHTML=`<div class="axi"><p class="axm">${G.length} ${G.length==1?'town':'towns'}${rng(G)?' &middot; '+rng(G):''} &middot; ${fmt(avg(G,'la'),avg(G,'lo'))}</p><h4>${A.h}</h4><p class="axt">${A.tag}</p><p>${A.intro}</p></div>`}
 else{$('ax').innerHTML=`<div class="axl">${areas.map(x=>{const A=AR[x]||{},X=L.filter(t=>area(t)==x);return `<button data-a="${x}"><b>${A.h||x}</b><span>${A.tag||''}</span><small>${X.length} ${X.length==1?'town':'towns'}${rng(X)?' &middot; '+rng(X):''}</small><p>${A.intro||''}</p></button>`}).join('')}</div>`}
 $('grid').innerHTML=G.map(t=>`<a class="card" href="${t.id}-v3.html"><div class="ph" style="background-image:url('${t.img}')"></div><h4>${t.n}</h4><div class="mt"><span>${areaName(c,area(t))}</span><b>${pr(t)}</b></div></a>`).join('');
 $('ar').classList.add('show')}
$('ach').onclick=e=>{const b=e.target.closest('button');if(b)pickC(R.c,b.dataset.a)};
$('ax').onclick=e=>{const b=e.target.closest('button[data-a]');if(b){pickC(R.c,b.dataset.a);$('ach').scrollIntoView({behavior:'smooth',block:'start'})}};
/* A to Z */
$('fs').innerHTML='<option value="">Any style</option>'+Object.entries(VIBES).map(([k,v])=>`<option value="${k}">${v}</option>`).join('');
function az(){const q=norm($('fq').value.trim()),s=$('fs').value,p=$('fp').value;let L=T.filter(t=>(!q||norm(t.n+' '+((window.FCAKA||{})[t.id]||'')).includes(q))&&(!s||t.v.includes(s)));
 if(p){const[a,b]=p.split('-').map(Number);L=L.filter(t=>t.m&&t.m>=a&&t.m<b)}
 $('fc').innerHTML=`<b>${L.length}</b> of 167 towns`;
 const blk=([k,n])=>{const G=L.filter(t=>inC(t,k)).sort((a,b)=>a.n.localeCompare(b.n));return `<h5>${n}<span>${G.length}</span></h5>${G.length?G.map(t=>`<a href="${t.id}-v3.html"><b>${t.n}</b><span>${pr(t)}</span></a>`).join(''):'<div class="none">None match</div>'}`};const C=k=>CO.find(c=>c[0]==k);
 $('cols').innerHTML=`<div>${blk(C('panhandle'))}<div style="height:36px"></div>${blk(C('nature-coast-r'))}<div style="height:36px"></div>${blk(C('tampa-bay'))}</div><div>${blk(C('southwest'))}<div style="height:36px"></div>${blk(C('south-keys'))}</div><div>${blk(C('treasure-space'))}<div style="height:36px"></div>${blk(C('northeast'))}</div>`}
['fq','fs','fp'].forEach(i=>$(i).addEventListener(i=='fq'?'input':'change',az));az();
{const q0=new URLSearchParams(location.search).get('q');if(q0){$('q').value=q0;$('q').dispatchEvent(new Event('input'));setTimeout(()=>$('q').focus(),50)}}
{let[h,ar]=location.hash.slice(1).split('/');h=OLDC[h]||h;if(CO.some(c=>c[0]==h)){pickC(h,ar&&AR[ar]?ar:'');setTimeout(()=>$('regions').scrollIntoView(),50)}}

// Nov 12: phone search opens as its own full screen view (the Compass and Zillow pattern). The page used to fight
// the keyboard: iOS scrolled to the box, then the page's snap scrolling yanked it back, so the box jumped around.
(function(){const sb=$('sb'),q=$('q');if(!sb||!q)return;const PHN=()=>matchMedia('(max-width:760px)').matches,H=document.documentElement;
 const x=document.createElement('button');x.type='button';x.className='sb-x';x.textContent='Cancel';sb.querySelector('.sbx').appendChild(x);
 let ph=null;const open=()=>{if(!PHN()||sb.classList.contains('full'))return;ph=document.createElement('div');ph.style.height=sb.offsetHeight+'px';sb.parentNode.insertBefore(ph,sb);H.classList.remove('tsnap');H.classList.add('sb-lock');sb.classList.add('full');if(q.value)q.oninput()};
 const close=()=>{if(!sb.classList.contains('full'))return;sb.classList.remove('full','open');H.classList.remove('sb-lock');if(PHN())H.classList.add('tsnap');ph&&ph.remove();ph=null;q.blur()};
 q.addEventListener('focus',open);x.addEventListener('click',e=>{e.preventDefault();q.value='';$('dd').innerHTML='';close()});
 $('dd').addEventListener('click',e=>{if(e.target.closest('a[data-c]'))close()},true);
 q.addEventListener('keydown',e=>{if(e.key=='Escape')close()});
 document.addEventListener('click',e=>{if(sb.classList.contains('full')&&!e.target.closest('#sb'))close()})})();
