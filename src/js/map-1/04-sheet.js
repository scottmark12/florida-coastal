/* Phone bottom panel (peek, half, full) and the Slider Map panel */
// Phone Slider Map: Compass style sheet over a fixed map (peek, half, full)
const SHEET={st:'peek',y:0};
const SHON=()=>document.body.classList.contains('sheet');
const IOSB=()=>(/iPhone|iPod/.test(navigator.userAgent)&&!navigator.standalone&&matchMedia('(max-width:760px)').matches)?72:0;
function PK(){return PK0()+(IOSB()?8:0)}/* Nov 12: iOS Safari's floating bar no longer eats the layout viewport, so the old 72px pad left a blank band */
/* closed panel height: sized to what it holds, so nothing clips on any phone */
function PK0(){const r=$('res'),m=r&&r.querySelector('.mode');if(!r||!m||!SHON())return 200;const t=m.getBoundingClientRect().top-r.getBoundingClientRect().top;return Math.max(196,Math.round(t+m.offsetHeight+14+92+18))}
function shStops(){const vh=innerHeight;return {peek:vh-PK(),half:Math.round(vh*.44),full:60+SAT()}}
function SHRES(){const vh=innerHeight,pe=$('pop');if(SHEET.st=='peek'||SHEET.st=='low')return SHB()+(pe&&pe.classList.contains('on')?pe.offsetHeight+12:0)+14;return vh-shStops()[SHEET.st]+14}
function shApply(y,anim){const r=$('res');SHEET.y=y;r.style.transition=anim?'transform .32s cubic-bezier(.2,.8,.2,1)':'none';r.style.transform=`translate3d(0,${y}px,0)`;
 const st=shStops(),pe=$('pop');if(pe){const o=Math.max(0,Math.min(1,(Math.min(y,st.peek)-st.half)/(st.peek-st.half-40)));pe.style.opacity=o;pe.style.pointerEvents=o<.5?'none':''}}
function shSet(name,noFit){document.body.style.setProperty('--pk',PK()+'px');const st=shStops();SHEET.st=name;shApply(st[name],true);const r=$('res');r.classList.toggle('sh-full',name=='full');r.classList.toggle('sh-up',name!='peek');if(name!='full')r.scrollTop=0;
 if(!noFit&&name!='full')setTimeout(shRefit,40)}
/* refit the map to what is picked; with the phone panel up, pan so the towns sit above it instead of zooming out */
function shTarget(){if(S.mode=='sliders')return S.top&&S.top.length?slFit(S.top.slice(0,5).map(id=>T.find(t=>t.id==id))):fit(ALL,.02);if(S.mode=='vibes'&&!S.pop)return S.style?fitStyle(S.style):fit(ALL,.02);return null}
function shRefit(){if(!SHON()){if(S.mode=='sliders'){if(S.top&&S.top.length)go(slFit(S.top.slice(0,5).map(id=>T.find(t=>t.id==id))),450);else go(fit(ALL,.02),450)}else if(S.mode=='vibes'){if(S.pop)return;if(S.style&&isR(S.style))go(fitStyle(S.style),450);else go(fit(ALL,.02),450)};return}if(S.mode=='vibes'&&S.pop)return;const v=shTarget();if(!v)return;
 if(SHEET.st=='half'&&S.vb){const[w,h]=size(),top=HDR(),bot=h-SHRES(),mid=(top+Math.max(top+60,bot))/2,kt=v[2]/w,kc=S.vb[2]/w,px=v[0]+w/2*kt,py=v[1]+mid*kt;go([px-w/2*kc,py-mid*kc,S.vb[2],S.vb[3]],400);return}
 go(v,450)}
function shSync(){const on=(S.mode=='sliders'||S.mode=='vibes')&&PH();const r=$('res');if(!r)return;if(on){const was=SHON();document.body.classList.add('sheet');setTimeout(()=>{shSet('peek',true);render();shRefit()},was?60:30)}
 else if(!on&&SHON()){document.body.classList.remove('sheet');r.style.transform='';r.style.transition='';const pe=$('pop');if(pe){pe.style.opacity='';pe.style.pointerEvents=''}}}
(function(){const r=$('res');let d=null;
 $('vp')&&$('vp').addEventListener('click',e=>{const a=e.target.closest('.vm-all');if(!a||!SHON())return;setTimeout(()=>shSet($('vp').classList.contains('vt-open')?'full':'peek'),0)});
 const skip=t=>t.closest('select,textarea,input:not([type=range])');
 r.addEventListener('touchstart',e=>{if(!SHON()||skip(e.target))return;const t=e.touches[0];d={st0:SHEET.st,x0:t.clientX,y0:t.clientY,s0:SHEET.y,t0:performance.now(),own:false,last:t.clientY,lt:performance.now(),v:0}},{passive:true});
 r.addEventListener('touchmove',e=>{if(!d)return;const t=e.touches[0],dy=t.clientY-d.y0;
  if(!d.own){const dx=t.clientX-d.x0;if(Math.abs(dy)<6&&Math.abs(dx)<6)return;if(Math.abs(dx)>Math.abs(dy)){d=null;return}if(SHEET.st=='full'&&(r.scrollTop>0||dy<0)){d=null;return}d.own=true}
  e.preventDefault();const st=shStops();let y=d.s0+dy;if(y<st.full)y=st.full-(st.full-y)*.3;const yl=st.low||st.peek;if(y>yl)y=yl+(y-yl)*.3;shApply(y,false);
  const now=performance.now();d.v=(t.clientY-d.last)/Math.max(1,now-d.lt);d.last=t.clientY;d.lt=now},{passive:false});
 r.addEventListener('touchend',()=>{if(!d)return;const own=d.own,v=d.v,st0=d.st0,dy=SHEET.y-d.s0;d=null;if(!own)return;const st=shStops(),y=SHEET.y;let n;
  /* Nov 12: land where the swipe was headed (how far plus how fast), so a long drag or a hard flick goes straight to full; a short swipe still moves one stop */
  const O=['low','peek','half','full'].filter(k=>st[k]!=null),i=O.indexOf(st0),tg=y+Math.max(-2,Math.min(2,v))*300;n=O.slice().sort((a,b)=>Math.abs(st[a]-tg)-Math.abs(st[b]-tg))[0];
  if(i>=0&&Math.abs(dy)>36){const j=O.indexOf(n);if(dy<0&&j<=i)n=O[Math.min(O.length-1,i+1)];if(dy>0&&j>=i)n=O[Math.max(0,i-1)]}
  shSet(n)});
 const g=document.createElement('button');g.className='sh-grab';g.type='button';g.setAttribute('aria-label','Show more');r.prepend(g);
 g.addEventListener('click',()=>{if(!SHON())return;shSet(SHEET.st=='low'?'peek':SHEET.st=='peek'?'half':SHEET.st=='half'?'full':'peek')});
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
 $('sl').innerHTML=`<div class="slh"><div class="slh-eb"><span>${T.length} beach towns · ${SLC.length} priorities</span><button class="sl-reset" id="slreset"${slAnySet()||S.slPc?'':' disabled'}>↺ Reset</button></div><h2>What matters to you?</h2></div>
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
