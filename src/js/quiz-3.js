// photos as written: full screen quiz backgrounds use the full photo
(function(){
/* Nov 12: quiz photos picked for the Adirondack layout (sharp landscape photo on top, blurred copy below); third value = horizontal focus */
const PH=[['img/c/st-augustine-aerial.webp','St. Augustine','50%'],['img/c/quiz-evening.webp','','50%'],['img/c/quiz-boat.webp','Ponce Inlet','50%'],['img/c/sanibel-island.webp','Sanibel Island','50%'],['img/c/quiz-community.webp','St. Petersburg','50%'],['img/c/quiz-fly.webp','','50%'],['img/c/naples-home.webp','Naples','55%'],['img/c/30a-home.webp','30A','50%'],['img/c/stuart.webp','']];
/* Nov 18: phones get the 960px copies */if(matchMedia('(max-width:760px)').matches)PH.forEach(p=>{p[0]=p[0].replace('img/c/','img/c/m/')});
/* Nov 13: the first photos right away, the rest once the page has loaded, so they don't compete with the first paint */
PH.forEach((p,k)=>{const go=()=>{const i=new Image();i.src=p[0]};k<6?go():document.readyState=="complete"?setTimeout(go,300+120*k):addEventListener("load",()=>setTimeout(go,300+120*k))});
document.body.classList.add('qphoto');if(new URLSearchParams(location.search).get('bar')==='blue')document.body.classList.add('bar-blue');
const mw=document.querySelector('.mapw'),box=document.createElement('div');box.id='qph';
box.innerHTML=PH.map(p=>`<div class="ph" style="background-image:url('${p[0]}');--fx:${p[2]||'50%'}"></div>`).join('');
mw.parentElement.insertBefore(box,mw.nextSibling);
const cap=document.createElement('div');cap.id='qcap';mw.parentElement.insertBefore(cap,box.nextSibling);
let cur=-1;function show(n){if(n===cur)return;cur=n;box.querySelectorAll('.ph').forEach((e,i)=>e.classList.toggle('on',i===n));cap.textContent=PH[n]?PH[n][1]:''}

const mini=document.createElement('div');mini.id='qmini';box.parentElement.insertBefore(mini,cap);
const B=[-87.62,-79.97,24.48,31.02],mx0=X(B[0]),mx1=X(B[1]),my0=Y(B[3]),my1=Y(B[2]);
const land=document.querySelector('#base path.mc').getAttribute('d');
mini.innerHTML=`<svg viewBox="${mx0} ${my0} ${mx1-mx0} ${my1-my0}"><defs><clipPath id="mclip"><polygon points="${[[-87.6,31.0],[-85.0,31.0],[-84.86,30.7],[-82.2,30.57],[-82.02,30.4],[-81.9,30.55],[-81.4,30.72],[-79.0,30.72],[-79.0,24.0],[-87.6,24.0]].map(p=>X(p[0])+','+Y(p[1])).join(' ')}"/></clipPath></defs><path d="${land}" fill="#fff" fill-opacity=".95" clip-path="url(#mclip)"/><g id="mdots"></g></svg>`;
const ku=(mx1-mx0)/150;
function miniDots(){const g=document.getElementById('mdots');if(!g)return;if(!qAny()){g.innerHTML='';return}
 const top=qRank().slice(0,5).map(t=>t.id),ts=new Set(top);let h='';
 T.forEach(t=>{if(ts.has(t.id)||qp(t)<70)return;h+=`<circle class="mo" cx="${X(t.lo)}" cy="${Y(t.la)}" r="${2.4*ku}" fill="#E07A3F"/>`});
 top.forEach((id,i)=>{const t=T.find(x=>x.id==id);h+=`<circle class="mt" style="animation-delay:${i*.15}s" cx="${X(t.lo)}" cy="${Y(t.la)}" r="${(i?4:5)*ku}" fill="#E07A3F" stroke="#fff" stroke-width="${1.3*ku}"/>`});
 g.innerHTML=h}
const mob=()=>innerWidth<901;
const SUBS={3:['Sand and water right out front','Close enough to ride over with a towel','Easy to get to whenever I want'],4:{2:'People I know by name, and that is plenty'},5:['I want an airport close by','A decent drive to the airport is fine','I can make a day of getting there'],7:['Keeping costs low','A comfortable middle','Room to stretch','Open to the top end']};
Object.entries(SUBS).forEach(([qi,m])=>Object.entries(m).forEach(([oi,t])=>{const o=SQ[qi]&&SQ[qi].o[oi];if(o&&!o[1])o[1]=t}));
const d0=qDraw;qDraw=function(){d0();if(window.FCQuiz&&!Q.done)window.FCQuiz.view(Q.step,SQ.length);show(Math.min(Q.step,PH.length-1));miniDots();if(qAny()&&!window.__qs){window.__qs=1;window.FC&&FC.track('quiz_start')}};if(mob()){const r=$('res');r.parentElement.insertBefore(mini,r.nextSibling);const cen=()=>{mini.style.transform='none';const b=mini.getBoundingClientRect();mini.style.transform=`translateX(${innerWidth/2-(b.left+b.width/2)}px)`};requestAnimationFrame(cen);setTimeout(cen,400);addEventListener('resize',cen)}show(Q.step);miniDots();qDraw();
qDone=function(){window.QLOCK=false;qRank();miniDots();
 const a=Q.ans.map(x=>x==null?'x':x).join(''),TOP=qRank().slice(0,5).map(t=>({id:t.id,fit:qp(t),name:t.n,why:qWhy(t,3)})),VB=qVibe(TOP),go2=()=>{location.href=go2.url()};SLQ=qSliders(),go2.url=()=>'quiz-results.html?a='+a+'&t='+TOP.map(x=>x.id+'.'+x.fit).join(',')+(VB.length?'&v='+VB.join(','):'')+SLQ;
 try{sessionStorage.setItem('fc-top5',JSON.stringify({a:a,top:TOP,vibes:VB}))}catch(e){}
 try{localStorage.setItem('fc-vibe',JSON.stringify({all:VB,off:[],from:'quiz'}))}catch(e){}
 window.FC&&FC.track('quiz_vibe',VB.join(','));
 if(window.FCQuiz)window.FCQuiz.complete(TOP,SQ.map((_,st)=>qAnsInfo(st,Q.ans[st])))
 document.getElementById('qrvn').textContent=T.length;
 const lab=Q.ans.map((x,i)=>x==null?null:SQ[i].o[x][0]).filter(t=>t&&!/^Not sure/.test(t));
 const c=document.getElementById('qrvc');c.innerHTML=lab.slice(0,4).map(t=>`<span class="chip">${t}</span>`).join('')+(lab.length>4?`<span class="chip">+${lab.length-4} more</span>`:'');
 document.getElementById('qrvs').onclick=e=>{e.preventDefault();go2()};
 const r=mini.getBoundingClientRect(),ar=r.height/r.width;document.body.appendChild(mini);
 Object.assign(mini.style,{position:'fixed',left:r.left+'px',top:r.top+'px',width:r.width+'px',right:'auto',bottom:'auto',margin:'0',transform:'none',zIndex:40,transition:'none',padding:'0'});
 mini.classList.add('fly');show(PH.length-1);document.body.classList.add('reveal');
 const ease='cubic-bezier(.22,.9,.24,1)';
 requestAnimationFrame(()=>requestAnimationFrame(()=>{
  const W=Math.min(innerWidth*.7,innerHeight*.58/ar,520);
  mini.style.transition=`left 1.1s ${ease},top 1.1s ${ease},width 1.1s ${ease}`;
  Object.assign(mini.style,{left:(innerWidth-W)/2+'px',top:(innerHeight-W*ar)/2+'px',width:W+'px'});
  setTimeout(()=>mini.classList.add('pulse'),700);
 }));
 setTimeout(()=>{
  const sp=document.getElementById('qrvmap');sp.style.height=(96*ar)+'px';const t=sp.getBoundingClientRect();
  mini.classList.remove('pulse');mini.classList.add('rest');mini.style.transition=`left .9s ${ease},top .9s ${ease},width .9s ${ease}`;
  Object.assign(mini.style,{left:t.left+'px',top:t.top+'px',width:t.width+'px'});
  document.body.classList.add('reveal2');
  [...c.children].forEach((e,i)=>setTimeout(()=>e.classList.add('in'),500+i*280));
  setTimeout(()=>qAsk(go2,TOP,a),3000);
 },2100)};
})();

/* Nov 12: while the top 5 builds, offer to send it. Email gets the 5 towns side by side; an optional phone adds the personal town guide. Never blocks the results, and stops asking once we have an email. */
/* Nov 19: "your town vibe": the vibes your five towns share, weighted by rank. Lifestyle vibes come first;
   Best Beaches, Best Schools and Affordable only when nothing else fits. People can drop any vibe that isn't them. */
function qVibe(TOP){const LIFE=['island','oldfl','dock','sophcalm','sophhigh','social','active','bluezone','walk','remote'],sc={},hi={};
 /* what the five towns share, weighted by rank */
 TOP.forEach((x,i)=>{const t=T.find(y=>y.id==x.id);if(!t||!t.v)return;t.v.forEach((v,j)=>{sc[v]=(sc[v]||0)+(5-i)*(1-.12*j)})});
 /* what the answers point to (question, answer) -> vibe hints */
 const H=[[{sophhigh:1,social:.5},{walk:1,social:1},{sophcalm:1,oldfl:.5},{oldfl:1,island:1}],[{social:1,sophhigh:1},{social:.5},{sophcalm:1},{oldfl:1,island:1}],[{dock:1},{active:1},{island:.5},{sophcalm:.5,oldfl:.5}],[{island:.5},{walk:.5,active:.5}],[{social:1,bluezone:.5},{walk:1,bluezone:1},{sophcalm:.5},{oldfl:.5}],[{remote:1},{remote:.5}],[{},{},{dock:1}]];
 (Q.ans||[]).forEach((a,q)=>{const h=H[q]&&H[q][a];if(h)for(const k in h)hi[k]=(hi[k]||0)+h[k]});
 const pick=ks=>{ks=ks.filter(k=>sc[k]);if(!ks.length)return[];const ms=Math.max(...ks.map(k=>sc[k])),mh=Math.max(1,...ks.map(k=>hi[k]||0)),f={};ks.forEach(k=>f[k]=.5*sc[k]/ms+.5*(hi[k]||0)/mh);ks.sort((a,b)=>f[b]-f[a]);return ks.filter((k,i)=>i==0||f[k]>=f[ks[0]]*.55).slice(0,3)};
 const L=pick(LIFE);return L.length?L:pick(Object.keys(sc)).slice(0,2)}
/* Nov 19: the quiz answers as Slider Map settings, so "View on map" opens the sliders already set the way you answered.
   Quiz weights 1 to 3 land on the slider stops (33, 67, 100) and pace on its stops, so sliding back lands on exactly the same settings; evenings and dining count toward Social scene; boat and dock toward On the water;
   budget carries over except "$750K and up", which the quiz doesn't filter on either. */
function qSliders(){const W=qW(),pace=qA('pace'),bud=qA('budget'),L=[0,33,67,100],v={};
 const mx=(k,...f)=>{const r=Math.max(0,...f.map(x=>W[x]||0));if(r)v[k]=L[r]};
 mx('beach','beach','sand');mx('water','water','dock');mx('meet','meet','nightlife','dining');mx('walk','walk');mx('outdoors','outdoors');mx('airport','airport');
 if(Number.isInteger(pace))v.pace=[100,75,25,0][pace];
 const sv=Object.entries(v).map(([k,x])=>k+':'+x).join(',');
 return (sv?'&sv='+sv:'')+(Number.isInteger(bud)&&bud<3?'&bud='+bud:'')}
function qVibeOn(){try{const v=JSON.parse(localStorage.getItem('fc-vibe')||'null');return v?v.all.filter(k=>!v.off.includes(k)):[]}catch(e){return[]}}
function qVibeBlock(box){
 let v=null;try{v=JSON.parse(localStorage.getItem('fc-vibe')||'null')}catch(e){}if(!v||!v.all.length)return;
 let el=box.querySelector('.qv');if(!el){el=document.createElement('div');el.className='qv';const c=box.querySelector('#qrvc');c.parentNode.insertBefore(el,c);
  /* keep a few of their own answers under the vibe ("we heard you"), the rest folded into +N more */
  const ch=[...c.children],more=ch.find(x=>/\+\s*\d+\s*more/.test(x.textContent)),real=ch.filter(x=>x!==more);
  if(real.length>3){const n=real.length-3+(more?+(more.textContent.match(/\d+/)||[0])[0]:0);real.slice(3).forEach(x=>x.remove());
   if(more){const w=document.createTreeWalker(more,NodeFilter.SHOW_TEXT);let t;while(t=w.nextNode())if(/\d+/.test(t.nodeValue))t.nodeValue=t.nodeValue.replace(/\d+/,n)}
   else{const m=real[0].cloneNode(true);const w=document.createTreeWalker(m,NodeFilter.SHOW_TEXT);let t,f=0;while(t=w.nextNode())if(t.nodeValue.trim()){t.nodeValue=f?'':'+'+n+' more';f=1}c.appendChild(m)}}
  c.classList.add('qv-ch')}
 const draw=()=>{el.innerHTML=`<p class="qv-l">Your town vibe: ${v.all.map(k=>`<span><i style="background:${VCOL[k]||'#C2873A'}"></i>${VIBES[k]||k}</span>`).join(', ')}</p>`};
 const save=()=>{try{localStorage.setItem('fc-vibe',JSON.stringify(v))}catch(e){}};
 draw();requestAnimationFrame(()=>el.classList.add('in'))}
function qAsk(go2,TOP,a){
 let had=null;try{had=localStorage.getItem('fc-mail')}catch(e){}
 const box0=document.getElementById('qrv');if(box0)qVibeBlock(box0);
 if(had){const b=box0;if(!b){go2();return}b.classList.add('ask');document.body.classList.add('qask');const h=b.querySelector('h2');if(h)h.textContent='Your top 5 is ready.';const g=document.createElement('a');g.href='#';g.className='qv-go';g.textContent='See my 5 towns \u2192';g.onclick=e=>{e.preventDefault();go2()};b.appendChild(g);return}
 const box=document.getElementById('qrv');if(!box){go2();return}
 /* Nov 12: the reveal can fire twice, so only ever show one ask */
 if(box.querySelector('.qa-card')||window.__qAsked)return;window.__qAsked=1;
 const one=TOP[0]&&TOP[0].name?TOP[0].name.replace(/ \(.*\)$/,''):'your #1 town';
 const card=document.createElement('div');card.className='qa-card';
 const step1=()=>{card.innerHTML=`<b>Want it sent to you?</b><p>We'll email your five towns with a side by side comparison you can come back to.</p><form class="qa-f" novalidate><input type="email" autocomplete="email" placeholder="you@example.com" aria-label="Email"><button type="submit">Send them</button></form><a href="#" class="qa-skip">Just show me</a>`;
  const f=card.querySelector('form'),em=f.querySelector('input');setTimeout(()=>em.focus({preventScroll:true}),350);
  card.querySelector('.qa-skip').onclick=e=>{e.preventDefault();go2()};
  f.onsubmit=e=>{e.preventDefault();const v=em.value.trim();if(!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v)){em.style.borderColor='#B3261E';em.focus();return}
   const btn=f.querySelector('button');btn.disabled=true;btn.textContent='Sending...';
   const ref=(window.crypto&&crypto.randomUUID)?crypto.randomUUID():null;
   try{localStorage.setItem('fc-mail','1');localStorage.setItem('fc-sl-saved','1');localStorage.setItem('fc-em',v)}catch(x){}
   const send=window.FC?FC.lead({kind:'matches',email:v,ref:ref,matches:TOP.map((t,i)=>({id:t.id,name:t.name,rank:i+1,fit:t.fit})),answers:a.split(''),message:('Quiz top 5: '+TOP.map(t=>t.name).join(', ')+(qVibeOn().length?' · Vibe: '+qVibeOn().map(k=>VIBES[k]||k).join(', '):'')).slice(0,2000)}).catch(()=>null):Promise.resolve(null);
   /* Nov 19: no phone step; the results page offers Ask a local, on a tap, never a popup */
   send.then(()=>{location.href=go2.url()})}};
 box.classList.add('ask');document.body.classList.add('qask');const h2=box.querySelector('h2');if(h2)h2.textContent='Your top 5 is ready.';step1();box.appendChild(card);requestAnimationFrame(()=>card.classList.add('in'));
}

/* Nov 23 2026: start from an article card. /quiz?q1=N answers question 1 and moves on to question 2. */
;(function(){var m=/[?&]q1=(\d)/.exec(location.search);if(!m)return;var n=+m[1],done=0;function go(){if(done)return;try{if(typeof qPick==='function'&&typeof Q!=='undefined'&&typeof SQ!=='undefined'&&SQ[0]&&SQ[0].o[n]&&Q.step===0&&Q.ans[0]==null){done=1;qPick(n)}}catch(e){}}if(document.readyState==='complete')setTimeout(go,200);else addEventListener('load',function(){setTimeout(go,200)})})();
