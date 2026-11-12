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
$('cg').innerHTML=CO.map(([k,n,,im])=>{const L=T.filter(t=>inC(t,k));return `<button class="ct" data-c="${k}"><i style="background-image:url('${im}')"></i><span><small>${fmt(avg(L,'la'),avg(L,'lo'))}</small><b>${n}</b><em>${L.length} towns</em></span></button>`}).join('');
$('cg').onclick=e=>{const b=e.target.closest('.ct');if(b)pickC(b.dataset.c,'')};
function pickC(c,a){R.c=c;R.a=a;const co=CO.find(x=>x[0]==c);const L=T.filter(t=>inC(t,c)).sort((x,y)=>cOrd(x)-cOrd(y));
 const areas=[];L.forEach(t=>{const a=area(t);if(!areas.includes(a))areas.push(a)});
 $('cg').classList.add('any');document.querySelectorAll('.ct').forEach(b=>b.classList.toggle('on',b.dataset.c==c));
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
