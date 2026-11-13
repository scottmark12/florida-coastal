// ===== Quiz v2 (draft): same scoring as the live quiz, results on the new map =====

const WV=[0,1,3,9],MISS={1:.55,2:.75},MISS2={1:.8,2:.92},CATMULT={afford:1.5},
 PACE=[[1,2],[2,3],[3,4],[5,5]],PACE_MISS={2:.75,3:.55,4:.55},
 BUDGET=[["Under $350K",4],["$350K to $500K",3],["$500K to $750K",2],["$750K and up",1]],BUDGET_W=9,BUDGET_MISS={1:.7,2:.45,3:.3},BUDGET_TOP=[350,500,750,1100];
const Q={step:0,ans:new Array(SQ.length).fill(undefined),done:false};
const qA=k=>{const i=SQ.findIndex(q=>q.k===k),a=Q.ans[i];return a!=null&&SQ[i].o[a]?SQ[i].o[a][3]:null};
function qW(){const e={};let boat=false;Q.ans.forEach((a,i)=>{const q=SQ[i];if(a!=null&&!q.k&&q.o[a])Object.entries(q.o[a][3]).forEach(([k,v])=>{k==='boat'?boat=true:e[k]=Math.min(3,(e[k]||0)+v)})});const b=qA('budget');if(boat&&b!=null&&BUDGET[b][1]>1)e.afford=Math.max(e.afford||0,1);return e}
function qFit(t,W,pace,bud){const d=QD[t.id];let a=0,s=0,o=1;
 Object.entries(W).forEach(([k,r])=>{if(!r||d.s[k]==null)return;const sc=d.s[k],i=WV[r]*(CATMULT[k]||1);a+=i*Math.pow(d.f[k]/5,1.5);s+=i;if(r===3&&MISS[sc])o*=MISS[sc];if(r===2&&MISS2[sc])o*=MISS2[sc]});
 if(Number.isInteger(pace)){const q=d.s.quiet,p=PACE[pace],g=q<p[0]?p[0]-q:q>p[1]?q-p[1]:0,r=Math.max(1,5-1.5*g);a+=9*Math.pow(r/5,1.5);s+=9;if(PACE_MISS[g])o*=PACE_MISS[g]}
 if(Number.isInteger(bud)&&BUDGET[bud][1]>1){let g=0;if(d.m){for(let x=bud;x<3;x++)if(d.m>1.05*BUDGET_TOP[x])g++;g=Math.min(3,g)}else g=Math.max(0,BUDGET[bud][1]-d.s.afford);const r=Math.max(1,5-1.5*g);a+=BUDGET_W*Math.pow(r/5,1.5);s+=BUDGET_W;if(g)o*=BUDGET_MISS[Math.min(3,g)]}
 return s?o*a/s:null}
function qRank(){const W=qW(),pace=qA('pace'),bud=qA('budget');T.forEach(t=>t.qf=qFit(t,W,pace,bud)||0);
 const L=T.slice().sort((a,b)=>b.qf-a.qf),top=[],per={},rest=[];
 for(const t of L){const g=QD[t.id].g;top.length<5&&(per[g]||0)<2?(top.push(t),per[g]=(per[g]||0)+1):rest.push(t)}
 while(top.length<5&&rest.length)top.push(rest.shift());return[...top,...rest]}
function qAny(){return Q.ans.some(a=>a!=null)}
// hook the map's ranking (score) into the quiz ranking
window.QF=t=>t.qf||0;window.QR=()=>qRank();
// slider values that match the answers, for the pop card and "Fine tune"
function qSv(){const W=qW(),sv={};SLK.forEach(([k])=>sv[k]=50);const m={1:70,2:85,3:95};['beach','water','walk','outdoors','airport','nightlife'].forEach(k=>{if(W[k])sv[k]=m[W[k]]});if(W.sand)sv.beach=Math.max(sv.beach,m[W.sand]);if(W.dock)sv.water=Math.max(sv.water,m[W.dock]);if(W.condo)sv.walk=Math.max(sv.walk,70);
 const p=qA('pace');if(p===0){sv.nightlife=Math.max(sv.nightlife,85);sv.walk=Math.max(sv.walk,85)}if(p===1)sv.walk=Math.max(sv.walk,85);
 const b=qA('budget');if(b!=null)sv.afford=[95,80,65,50][b];return sv}
function qMap(){if(!qAny())return;S.sv=qSv();if(S.mode!=='sliders')setMode('sliders');else score()}
const qp=(t)=>Math.round(100*(t.qf||0));
function qStrong(){return T.filter(t=>qp(t)>=70).length}
function qHTML(){
 if(Q.done)return qRes();
 const q=SQ[Q.step],a=Q.ans[Q.step],n=qStrong(),first=Q.step===0&&!qAny();
 const bars=SQ.map((_,i)=>`<i class="${i<Q.step?'done':i===Q.step?'cur':''}"></i>`).join('');
 const opts=q.o.map((o,i)=>`<button class="qo${a===i?' on':''}" aria-pressed="${a===i}" onclick="qPick(${i})"><span class="rd"></span><span class="tx"><b>${o[0]}</b>${o[1]?`<small>${o[1]}</small>`:''}</span></button>`).join('');
 return `<div class="qbrand"><a class="qclose" href="index.html" aria-label="Exit quiz">&times;</a></div>${first?`<div class="qhd"><h1>Your top 5 Florida beach towns in 2 minutes</h1><p>8 quick taps. Free.</p></div>`:''}
 <div class="qtop">${Q.step>0?`<button class="qb" onclick="qGo(${Q.step-1})" aria-label="Back">&larr;</button>`:''}<div class="qbar">${bars}</div><span class="qn">${qAny()?`<b>${n}</b> towns fit`:`${Q.step+1} of ${SQ.length}`}</span></div>
 <h2 class="qq">${q.q}</h2>
 <div class="qopts">${opts}</div>
 <a class="qalt" href="map.html">Or browse the map instead</a>`}
function qStyle(L5,L15){const c={};L15.forEach((t,i)=>t.v.forEach(v=>c[v]=(c[v]||0)+(i<5?2:1)));return Object.keys(c).sort((a,b)=>c[b]-c[a])[0]}
const WHYP={walk:"Walk to coffee and dinner",beach:"A sandy beach close by",sand:"Clear, calm water to wade into",water:"Life on the water",dock:"Homes with their own dock",nightlife:"Plenty open late",dining:"Good restaurants",meet:"A full calendar of clubs and events",outdoors:"Paddling, trails and springs nearby",airport:"An easy drive to a big airport",condo:"Lots of condos and townhomes",house:"Neighborhoods of houses with yards"};
function qWhy(t,n){const d=QD[t.id],W=qW(),out=[];
 const p=qA('pace');if(p===0&&d.s.quiet<=2)out.push([3.5,"Busy streets and late hours"]);if(p===1&&d.s.quiet>=2&&d.s.quiet<=3)out.push([3.5,"A real downtown, calm at home"]);if(p>=2&&d.s.quiet>=4)out.push([3.5,p==3?"About as quiet as it gets":"A quiet town with a little going on"]);
 Object.entries(W).forEach(([k,w])=>{if(d.s[k]>=4&&WHYP[k])out.push([w+d.f[k]/5,WHYP[k]])});
 const b=qA('budget');if(b!=null&&d.m&&d.m<=BUDGET_TOP[b])out.push([3.2,`Typical home ${t.p||''} fits your budget`.replace('  ',' ')]);
 const seen=new Set();return out.sort((x,y)=>y[0]-x[0]).map(x=>x[1]).filter(x=>!seen.has(x)&&seen.add(x)).slice(0,n)}
function qRes(){const L=qRank(),L5=L.slice(0,5),k=qStyle(L5,L.slice(0,15)),t=L5[0];const sv=Object.entries(S.sv).filter(([,v])=>v!=50).map(([a,b])=>a+':'+b).join(',');
 const n=k?L5.filter(t=>t.v.includes(k)).length:0,tot=k?T.filter(x=>x.v.includes(k)).length:0,w=qWhy(t,3);
 return `<div class="qr"><div class="ey">Your results</div><h1>Your top 5</h1><p class="sub" style="margin:0">Ranked from all 167 beach towns on your 8 answers.</p>
 <div class="qhero t5r0" data-id="${t.id}"><div class="ph" style="background-image:url('${t.img}')"><i>#1 &middot; ${qp(t)}% match</i></div><h2>${t.n}</h2><div class="meta">${t.r.replace(/ · /g,', ')}${t.p?` &middot; <b>${t.p}</b> typical home`:''}</div>
 ${w.length?`<ul class="qwhy">${w.map(x=>`<li>${x}</li>`).join('')}</ul>`:'<div style="height:14px"></div>'}<a class="go" href="towns/${t.id}.html">Explore ${t.n.replace(/ \(.*\)/,'')}</a></div>
 <h4>Also on your list</h4>
 ${L5.slice(1).map((t,i)=>`<a class="t5r" data-id="${t.id}" href="towns/${t.id}.html"><i>${i+2}</i><span class="ph" style="background-image:url('${t.img}')"></span><span><b>${t.n}</b><small>${t.r.replace(/ · /g,', ')}${t.p?' &middot; '+t.p:''}</small>${(qWhy(t,1)[0]?`<small class="y">${qWhy(t,1)[0]}</small>`:'')}</span></a>`).join('')}
 ${k?`<div class="qsty"><span class="ph" style="background-image:url('img/vibes/${k}.webp')"></span><span><small style="margin:0 0 2px">Your style</small><b>${VIBES[k]}</b><small>${n==5?'All 5 of your towns fit it.':n+' of your 5 towns fit it.'}</small><a href="map.html?mode=vibes&style=${k}">See all ${tot} ${VIBES[k]} towns &rarr;</a></span></div>`:''}
 <div class="qsl" id="qsl"><div style="display:flex;gap:18px;align-items:flex-start"><img src="img/shortlist-p8.webp" alt="" style="width:96px;border-radius:3px;box-shadow:0 3px 12px rgba(0,0,0,.18);flex:0 0 96px"><div><h3>Get your Florida Shortlist</h3><p>A free 8 page PDF of these 5 towns: home prices, flood heads ups, the drive to the airport and a first weekend in each.</p></div></div>
 <input id="qse" type="email" placeholder="you@example.com" autocomplete="email" aria-label="Your email"><button class="go" onclick="qSend()">Email me my Shortlist</button></div>
 <div class="qmore"><button onclick="qRestart()">Retake the quiz</button><a href="map.html?mode=sliders&sv=${sv}">Fine tune with sliders</a></div></div>`}
function qDraw(){$('qz').innerHTML=qHTML();document.body.classList.toggle('qhas',qAny());qBind();document.body.classList.toggle('qres',Q.done);$('res').scrollTop=0}
function qGo(i){if(i<-1)return;Q.step=i;qDraw()}
function qPick(i){Q.ans[Q.step]=i;qRank();qMap();qDraw();setTimeout(()=>{if(Q.step<SQ.length-1)qGo(Q.step+1);else qDone()},260)}
function qDone(){window.QLOCK=false;qRank();qMap();const a=Q.ans.map(x=>x==null?'x':x).join('');setTimeout(()=>{location.href='quiz-results.html?a='+a},700)}
function qOpen(id){const t=T.find(t=>t.id==id);S.pinned=id;openPop(t,true);document.querySelectorAll('.t5r').forEach(r=>r.classList.toggle('on',r.dataset.id==id))}
function qRestart(){Q.ans.fill(undefined);Q.done=false;Q.step=0;closePop();S.sv={};SLK.forEach(([k])=>S.sv[k]=50);qDraw()}
function qSend(){const e=$('qse').value.trim();if(!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(e)){$('qse').style.borderColor='#B3261E';$('qse').focus();return}
 /* TODO dev build: POST {email, answers:Q.ans, top5} to the same lead pipeline the live quiz uses (data-lead="matches") */
 $('qsl').innerHTML=`<h3>Your Shortlist is on its way</h3><p style="margin:0">Check ${e} in a few minutes, and your spam folder just in case. Questions? Just reply to that email.</p>`}
function qBind(){$('qz').querySelectorAll('[data-id]').forEach(el=>{el.onmouseenter=()=>{S.hover=el.dataset.id;render()};el.onmouseleave=()=>{S.hover=null;render()}})}
// in the quiz, a pin tap points to the town in the card instead of opening a second card
const _op=openPop;openPop=function(t,nopan){if(!document.body.classList.contains('quiz'))return _op(t,nopan);if(nopan||!t)return;S.hover=t.id;render();const el=$('qz').querySelector(`[data-id="${t.id}"]`);if(el){el.scrollIntoView({behavior:'smooth',block:'center'});el.classList.add('on');setTimeout(()=>el.classList.remove('on'),1600)}};
window.QLEFT=()=>{return 0;const r=$('res').getBoundingClientRect(),m=document.querySelector('.mapw').getBoundingClientRect();return Math.max(0,r.right-m.left)};
function qStart(){const[w,h]=size();if(w<901){const v=fit([-87.6,-79.9,24.45,30.75],.03);const k=v[2]/w;v[1]-=40*k;v.__q=1;go(v,0);return}
 // Pensacola top left, Miami bottom right, centered with a little padding
 const v=fit([-87.22,-80.19,25.77,30.42],.1);v.__q=1;go(v,0)}
// while answering, the map holds the whole state and only the pins change
window.QLOCK=true;const _go=go;go=function(vb,ms){if(window.QLOCK&&!(vb&&vb.__q))return;return _go(vb,ms)};
{const sea=new URLSearchParams(location.search).get('sea')||'ink';if(sea!=='light')document.body.classList.add('sea-'+sea)}
// live quiz dots: every town a soft orange dot, your top 5 pop up big with a white ring
let qPrev=new Set();
function qDots(){const ov=$('ov');if(!ov||Q.done)return;const[w]=size(),k=S.vb[2]/w;const any=qAny();
 const top=any?qRank().slice(0,5).map(t=>t.id):[];const ts=new Set(top);
 let g='<g id="qdots">';
 if(any)T.forEach(t=>{if(ts.has(t.id)||qp(t)<70)return;
  g+=`<circle cx="${t.x}" cy="${t.y}" r="${4.6*k}" fill="var(--qdot)" fill-opacity=".9" stroke="#fff" stroke-width="${1.6*k}"/>`});
 top.forEach((id,i)=>{const t=T.find(x=>x.id==id),nw=!qPrev.has(id),one=i===0;
  g+=`<g class="qbig${nw?' qpopin':''}" style="transform-origin:${t.x}px ${t.y}px">${one?`<circle cx="${t.x}" cy="${t.y}" r="${24*k}" fill="none" stroke="#fff" stroke-opacity=".75" stroke-width="${1.6*k}"/>`:''}<circle cx="${t.x}" cy="${t.y}" r="${(one?18:15)*k}" fill="#fff" style="filter:drop-shadow(0 2px 6px rgba(0,0,0,.4))"/><circle cx="${t.x}" cy="${t.y}" r="${(one?13:10.5)*k}" fill="var(--qtop)"/></g>`});
 g+='</g>';const old=document.getElementById('qdots');if(old)old.remove();ov.insertAdjacentHTML('beforeend',g);qPrev=ts}
function qEdge(){const f=document.getElementById('qfade');if(f)f.remove();const ov=$('ov');if(!ov)return;const o=document.getElementById('qland');if(o)o.remove();
 // the base map stops at 89W: continue the land west along the Mississippi coast so there is no hard or blurry edge
 ov.insertAdjacentHTML('afterbegin',`<g id="qland"><rect x="${X(-100)}" y="${Y(40)}" width="${X(-87.6)-X(-100)}" height="${Y(20)-Y(40)}" fill="var(--sea,#1A1B1B)"/></g>`)}
// labels that sit over water turn white (dark ocean option)
let _land=null;const _render=render;render=function(){const r=_render.apply(this,arguments);try{if(document.body.classList.contains('quiz')){qEdge();qDots()}}catch(e){}if(!/sea-/.test(document.body.className))return r;
 try{_land=_land||document.querySelector('#base path[fill="#F3F1EC"]');const base=$('base'),ov=$('ov');if(!_land||!ov)return r;
 const M=base.getScreenCTM().inverse();ov.querySelectorAll('text.lbl').forEach(t=>{const b=t.getBoundingClientRect(),cx=b.left+b.width/2,cy=b.top+b.height/2;
  let n=0;[[cx,cy],[b.left+4,cy],[b.right-4,cy]].forEach(([x,y])=>{const p=new DOMPoint(x,y).matrixTransform(M);if(!_land.isPointInFill(p))n++});t.classList.toggle('onsea',n>=2)})}catch(e){}return r};
document.body.classList.add('quiz');if(new URLSearchParams(location.search).get('dot')==='blue')document.body.classList.add('dot-blue');{const l=document.querySelector('.qlogo');if(l)document.body.appendChild(l)}
{const pa=new URLSearchParams(location.search);const a=pa.get('a');if(a){a.split('').forEach((c,i)=>{if(c!=='x'&&i<SQ.length)Q.ans[i]=+c});if(pa.get('step')!=null){Q.step=+pa.get('step');qRank();qMap()}else qDone()}else{S.region='';tags();requestAnimationFrame(qStart);setTimeout(qStart,300);addEventListener('resize',()=>{if(!qAny())qStart()})}}
qDraw();
