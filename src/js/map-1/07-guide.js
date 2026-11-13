/* Panel sizing, map framing above the panel, guide card, walkthrough, region and style cards */
// ---- Nov 12 (v4): closed sheet sized to what it holds (no clipping on any phone height), maps fit the towns above the sheet,
// half height pans instead of zooming out past the map, and a guide card that teaches each map by doing the first step ----
(function(){
 const KEY=k=>'fc-guide-x-'+k,shut=k=>{try{return !!sessionStorage.getItem(KEY(k))}catch(e){return false}};
 const kindNow=()=>S.mode=='sliders'?'sliders':S.mode=='vibes'?(S.sub=='regions'?'regions':'vibes'):null;
 const G={k:null,ph:0,step:-1};
 const cnt=k=>T.filter(t=>t.v.includes(k)).length;
 const RIMG=r=>(T.find(t=>t.id==RPH[r])||{}).img;
 const STEPS={
  vibes:['Pick a style from the photo tiles.','The towns that fit light up. Tap any dot to meet one.','Swipe a town card to step through the list, or pull the panel up to see every style.'],
  regions:['Pick a region from the photo tiles.','Its towns light up on the map. Tap any dot to meet one.','Swipe a town card to step through every town in the region.'],
  sliders:[()=>PH()?'Pull the panel up to see the 10 sliders.':'The 10 sliders are on the left.','Move the ones that matter most to you.','The top 5 update on the map as you go. Tap a number to meet the town.']};
 const DEMO={vibes:'beaches',regions:'south-keys'};
 function view(){const k=G.k,f0=(S.top&&T.find(t=>t.id==S.top[0]))||{};
  const st=S.style||'',rn=isR(st)?st.slice(2):'';
  const base={vibes:{eb:'Vibe Map',img:`img/vibes/${S.style&&!isR(S.style)?S.style:'beaches'}.webp`},regions:{eb:'Regions',img:RIMG(rn||'south-keys')},sliders:{eb:'Slider Map',img:f0.img}}[k];
  if(G.step>=0){const s=STEPS[k][G.step];return {...base,stp:`How it works · ${G.step+1} of 3`,tx:typeof s=='function'?s():s,btn:G.step<2?'Next':'Got it',act:()=>{G.step=G.step<2?G.step+1:-1;show()},how:false}}
  if(k=='vibes'){if(!G.ph)return {...base,h3:'Explore like a local',tx:'Pick a feel, like Old Florida or Island Life, and see every town that has it.',btn:'Show me how',act:()=>tour('vibes'),how:false};
   const L=LK.VFEEL,nx=L[(Math.max(0,L.indexOf(st))+1)%L.length];return {...base,h3:`${VIBES[st]||'Best Beaches'} is on`,tx:st=='beaches'?`These ${cnt(st)} towns have the best sand. Tap any style below to switch, or a dot to meet a town.`:`${cnt(st)} towns light up. Tap any style below to switch, or a dot to meet a town.`,btn:`Show me ${VIBES[nx]}`,act:()=>pickStyle(nx),how:false}}
  if(k=='regions'){if(!G.ph)return {...base,h3:'Know the coast',tx:"Florida's coast in seven stretches. Pick one to see every town in it.",btn:'Show me how',act:()=>tour('regions'),how:false};
   const L=R7.map(r=>r[0]),nx=L[(Math.max(0,L.indexOf(rn))+1)%L.length];return {...base,h3:VIBES[st]||'South Florida and the Keys',tx:`${cnt(st)} towns. Swipe the tiles for other regions, or tap a dot to meet a town.`,btn:`Show me ${VIBES['r:'+nx].replace(/^The /,'')}`,act:()=>pickStyle('r:'+nx),how:false}}
  if(!G.ph)return {...base,h3:'Rank towns your way',tx:"Tell us what matters most and we'll rank all 167 towns for you.",btn:'Show me how',act:()=>tour('sliders'),how:false};
  return {...base,h3:'Beaches count more',tx:PH()?'The top 5 just reordered. Pull the panel up to move any slider.':'The top 5 just reordered. Move any slider on the left.',btn:PH()?'Open the sliders':'Got it',act:()=>{if(PH()&&SHON())shSet('half');else{G.ph=2;show()}},how:false}}
 function demoSl(){G.ph=1;const i=document.querySelector('#sl input[type=range][data-slk="beach"]');if(i){i.value=i.max;i.dispatchEvent(new Event('input',{bubbles:true}));i.dispatchEvent(new Event('change',{bubbles:true}))}setTimeout(()=>{if(S.pop&&kindNow()=='sliders')closePop();show()},1100)}

 // Walkthrough (Nov 12 v8): two steps, white cards. Step 1 lights what to tap; after a pick the region or style card
 // tells the story and step 2 just points at the map
 const TT={k:null,step:0,dim:null,tip:null,tm:null};
 const RM=matchMedia('(prefers-reduced-motion: reduce)');
 function tEl(){if(!TT.dim){TT.dim=document.createElement('div');TT.dim.className='cm-hole';document.body.appendChild(TT.dim);TT.tip=document.createElement('div');TT.tip.className='cm-tip';TT.tip.setAttribute('role','dialog');document.body.appendChild(TT.tip)}}
 function tHTML(n,h,p,act){return `<div class="cm-top"><span class="cm-pg"><i class="${n==1?'on':''}"></i><i class="${n==2?'on':''}"></i>${n} of 2</span><button type="button" class="cm-skip">Skip</button></div><h4>${h}</h4><p>${p}</p><p class="do">${act}</p><i class="cm-ar"></i>`}
 function tPlace(el,html,under,ring){tEl();const d=TT.dim,b=TT.tip,was=b.classList.contains('on');b.innerHTML=html;b.querySelector('.cm-skip').onclick=e=>{e.stopPropagation();tEnd(true)};
  const W=Math.min(290,innerWidth-32);b.style.width=W+'px';b.classList.toggle('mv',was&&!RM.matches);
  let x,y,ax=null,dn=false;const bh=b.offsetHeight;
  if(el){const r=el.getBoundingClientRect(),pad=ring?7:6;d.classList.toggle('ring',!!ring);Object.assign(d.style,{left:r.left-pad+'px',top:r.top-pad+'px',width:r.width+pad*2+'px',height:r.height+pad*2+'px'});d.classList.add('on');d.classList.remove('pl');void d.offsetWidth;RM.matches||d.classList.add('pl');
   x=Math.max(16,Math.min(innerWidth-W-16,r.left+r.width/2-W/2));const above=r.top-bh-16>70;y=above?r.top-bh-16:Math.min(innerHeight-bh-16,r.bottom+16);dn=!above;ax=Math.max(22,Math.min(W-22,r.left+r.width/2-x))}
  else{d.classList.remove('on','pl','ring');x=(innerWidth-W)/2;const pe=$('pop'),pr=pe&&pe.classList.contains('on')?pe.getBoundingClientRect():null;
   if(under&&pr){y=pr.top-bh-14;x=Math.max(16,Math.min(innerWidth-W-16,pr.left+pr.width/2-W/2));ax=W/2;dn=false}else{y=PH()?84:96}}
  Object.assign(b.style,{left:x+'px',top:Math.max(70,y)+'px'});b.classList.toggle('dn',dn);b.classList.toggle('ar',ax!=null);if(ax!=null)b.querySelector('.cm-ar').style.left=ax+'px';
  b.style.transformOrigin=ax!=null?`${ax}px ${dn?'0':'100%'}`:'50% 0';if(!was){b.classList.remove('on');void b.offsetWidth}b.classList.add('on')}
 function tHide(){if(TT.dim){TT.dim.classList.remove('on','pl','ring');TT.tip.classList.remove('on','mv','st2')}}
 function tEnd(skip){TT.k=null;TT.step=0;tHide();try{sessionStorage.setItem(KEY(G.k||kindNow()),'1')}catch(_){}const q=qBtn();q.classList.toggle('on',!S.pop);later()}
 function tour(k){TT.k=k;TT.step=1;const p=$('pop');p.dataset.intro='';p.classList.remove('on');if(SHON()&&SHEET.st!='peek')shSet('peek',true);
  setTimeout(()=>{if(k=='sliders'){const el=PH()?$('res'):$('sl');tPlace(el,tHTML(1,'What matters most?','Each slider is one priority.',PH()?'Pull up and move one ↑':'Move one →'))}
   else{const el=document.querySelector('#vp .tiles.vt');tPlace(el,k=='regions'?tHTML(1,'Florida has seven coasts.','Each stretch has its own water, towns and pace.','Pick one below ↓'):tHTML(1,'Find your kind of coast.','Every town is tagged with the feel it has.','Pick one below ↓'))}},SHON()?380:60)}
 function tStep2(){if(!TT.k||TT.step!=1)return;TT.step=2;const sl=TT.k=='sliders';
  setTimeout(()=>{if(sl&&S.pop)closePop();const el=tDot(sl);tPlace(el,sl?tHTML(2,'Your #1 for what you picked.','Tap it for a closer look.',''):tHTML(2,'Now pick a town.','Tap this town for a closer look.',''),!el,!!el)},SHON()?620:360)}
 function tDot(sl){const pe=$('pop'),pr=pe&&pe.classList.contains('on')?pe.getBoundingClientRect():null,rs=$('res'),rr=DFL()&&rs?rs.getBoundingClientRect():null,hit=(r,q)=>q&&r.right>q.left-16&&r.left<q.right+16&&r.bottom>q.top-16&&r.top<q.bottom+16,ok=e=>{const r=e.getBoundingClientRect();return r.width&&r.top>120&&r.bottom<innerHeight-20&&r.left>30&&r.right<innerWidth-30&&!hit(r,pr)&&!hit(r,rr)&&!(SHON()&&r.bottom>innerHeight-SHB()-20)};
  if(sl){const id=S.top&&S.top[0];const e=id&&document.querySelector(`#ov .pp[data-id="${id}"] circle`);return e&&ok(e)?e:null}
  const L=vOrder();for(const t of L){const e=document.querySelector(`#ov circle.dot[data-id="${t.id}"]`);if(e&&ok(e))return e}return null}
 window.addEventListener('input',e=>{if(TT.k=='sliders'&&TT.step==1&&e.target.closest&&e.target.closest('#sl')){tHide();if(!SHON()){clearTimeout(TT.tm);TT.tm=setTimeout(tStep2,900)}}},true);
 // step 2 ring follows whoever is #1 now: fade while sliding, re-ring after a short pause
 window.addEventListener('input',e=>{if(TT.k=='sliders'&&TT.step==2&&e.target.closest&&e.target.closest('#sl')){TT.dim&&TT.dim.classList.remove('on','pl');TT.tip&&TT.tip.classList.remove('on');clearTimeout(TT.tm);TT.tm=setTimeout(()=>{if(TT.k!='sliders'||TT.step!=2||(SHON()&&SHEET.st!='peek'&&SHEET.st!='low'))return;const el=tDot(true);if(el)tPlace(el,tHTML(2,'Your #1 for what you picked.','Tap it for a closer look.',''),false,true)},550)}},true);
 addEventListener('fc-sl-see',()=>{if(TT.k=='sliders'&&TT.step==2)setTimeout(()=>{const el=tDot(true);if(el)tPlace(el,tHTML(2,'Your #1 for what you picked.','Tap it for a closer look.',''),false,true)},700)});
 // tap the dimmed area to skip; Esc skips on desktop
 document.addEventListener('pointerdown',e=>{if(!TT.k||TT.step!=1)return;const t=e.target;if(t.closest&&(t.closest('.cm-tip')||t.closest('.sl-see')))return;
  if(TT.k=='sliders'&&PH()&&t.closest&&t.closest('#res')){tHide();return}
  const r=TT.dim&&TT.dim.getBoundingClientRect();if(r&&e.clientX>=r.left&&e.clientX<=r.right&&e.clientY>=r.top&&e.clientY<=r.bottom)return;tEnd(true)},true);
 addEventListener('keydown',e=>{if(e.key=='Escape'&&TT.k)tEnd(true)});
 addEventListener('fc-sl-see',()=>{if(TT.k=='sliders'&&TT.step==1)setTimeout(tStep2,200)});
 addEventListener('resize',()=>{if(TT.k)tHide()});
 // Region and style card: what you picked, in the town card spot
 const RTAG={'panhandle':'Sugar white sand and the quiet Forgotten Coast','nature-coast-r':'Springs, scallops and fishing villages','tampa-bay':'Beaches, a big city and bayside downtowns','southwest':'Sunset beaches, islands and the Everglades','south-keys':'Big city beaches, Palm Beach and the Keys','treasure-space':'Quiet beach towns and rocket launches','northeast':'Old St. Augustine, wide beaches and Daytona'};
 /* Nov 13: region tiles use the short one line tag instead of the long list of sub areas */
 Object.keys(RTAG).forEach(id=>{if(VIBES['r:'+id])VSUB['r:'+id]=RTAG[id]});
 /* Nov 13: on Regions, tapping a town picks its region first (map fits the region), then opens the town card with arrows and the count */
 (function(){const op=window.openPop;window.openPop=openPop=function(t,nopan){if(t&&S.mode=='vibes'&&S.sub=='regions'&&!S.restoring){const rv=(t.v||[]).filter(v=>v.indexOf('r:')===0),rk=rv.find(v=>RTAG[v.slice(2)])||rv[0];if(rk&&S.style!==rk&&VIBES[rk]){G.sx=rk;S.auto=1;pickStyle(rk);S.auto=0;G.sx=rk;setTimeout(()=>op.call(this,t,true),480);return}}return op.apply(this,arguments)}})();
 function styleCard(p,k){const st=S.style,R=isR(st),id=R?st.slice(2):st,L=vOrder(),n=T.filter(t=>t.v.includes(st)).length,f=L[0];if(!f)return false;
  const img=R?RIMG(id):`img/vibes/${id}.webp`,tag=R?(RTAG[id]||VSUB[st]||''):(LK.VSUBL[st]||VSUB[st]||'');
  p.innerHTML=`<div class="ph" style="background-image:url('${img}')"></div><button class="x" aria-label="Close">&times;</button><div class="bd bstyle"><div class="eb">${R?'':`<i class="sdot" style="background:${VCOL[st]}"></i>`}${R?'Region':'Style'} · ${n} towns</div><h3>${VIBES[st]}</h3><p>${tag}.</p><div class="pnav"><a class="go" href="#" data-first="1">Meet the towns →</a><button data-st="1" aria-label="First town">›</button></div></div>`;
  const go=e=>{e&&e.preventDefault();e&&e.stopPropagation();G.sx=st;flyTo(f)};p.querySelector('[data-first]').onclick=go;p.querySelector('[data-st]').onclick=go;
  p.querySelector('.x').onclick=e=>{e.stopPropagation();G.sx=st;p.dataset.intro='';p.classList.remove('on')};
  p.onclick=null;const fresh=p.dataset.intro!='style:'+st;p.dataset.intro='style:'+st;p.classList.remove('full');p.classList.add('on');placePop();
  if(fresh&&SHON())setTimeout(()=>{if(S.style==st&&!S.pop)go0(fitStyle(st))},40);return true}
 function go0(v){go(v,420)}
 function show(){const k=kindNow(),p=$('pop'),q=qBtn();if(!p)return;if(TT.k&&TT.step==1){q.classList.remove('on');return}if(k!==G.k){G.k=k;G.ph=0;G.step=-1}
  if(S.pop){q.classList.remove('on');return}
  if((k=='vibes'||k=='regions')&&S.style&&(G.picked||shut(k))&&G.sx!==S.style){q.classList.remove('on');if(styleCard(p,k))return}
  if(!k||shut(k)||TT.k){if(p.dataset.intro){p.dataset.intro='';p.classList.remove('on')}q.classList.toggle('on',!!k&&!S.pop&&!TT.k);return}
  q.classList.remove('on');if(k=='sliders'&&G.ph==2){p.dataset.intro='';p.classList.remove('on');q.classList.add('on');return}
  const v=view();
  p.innerHTML=`<div class="ph" style="background-image:url('${v.img||''}')"></div><button class="x" aria-label="Close guide">&times;</button><div class="bd bintro">${v.stp?`<div class="stp">${v.stp}</div>`:`<div class="eb">${v.eb}${v.how?' · <button type="button" class="how">How it works</button>':''}</div><h3>${v.h3}</h3>`}<p>${v.tx}</p><div class="pnav"><a class="go" href="#">${v.btn}</a></div></div>`;
  p.querySelector('.go').onclick=e=>{e.preventDefault();e.stopPropagation();v.act()};
  const hw=p.querySelector('.how');hw&&(hw.onclick=e=>{e.stopPropagation();G.step=0;show()});
  p.querySelector('.x').onclick=e=>{e.stopPropagation();try{sessionStorage.setItem(KEY(k),'1')}catch(_){}G.sx=S.style;p.dataset.intro='';p.classList.remove('on');qBtn().classList.add('on');later()};
  p.onclick=null;p.dataset.intro=k;p.classList.remove('full');p.classList.add('on');placePop()}

 function qBtn(){let q=document.querySelector('.fcgq');if(!q){q=document.createElement('button');q.type='button';q.className='fcgq';q.setAttribute('aria-label','How this map works');q.textContent='?';($('mode')||document.body).appendChild(q);q.onclick=e=>{e.stopPropagation();try{sessionStorage.removeItem(KEY(G.k||kindNow()))}catch(_){}G.step=-1;q.classList.remove('on');if(S.pop)closePop();show()}}return q}
 const later=()=>setTimeout(show,60);
 mapIntro=function(){later()};
 ['closePop','pickStyle','setMode'].forEach(n=>{const o=window[n];window[n]=function(){const r=o.apply(this,arguments);later();return r}});
 const op=window.openPop;window.openPop=openPop=function(){const r=op.apply(this,arguments);qBtn().classList.remove('on');if(TT.k&&TT.step==2&&performance.now()-(TT.tap||0)<900)tEnd();return r};
 document.addEventListener('pointerdown',e=>{if(e.target.closest&&(e.target.closest('#mapbox')||e.target.closest('#slcar')))TT.tap=performance.now()},true);
 const ps2=window.pickStyle;window.pickStyle=pickStyle=function(){if(!S.auto){G.picked=1;G.sx=null}const r=ps2.apply(this,arguments);if(TT.k&&TT.k!='sliders'&&!S.auto)tStep2();return r};
 const sm2=window.setMode;window.setMode=setMode=function(){if(TT.k){TT.k=null;TT.step=0;tHide()}return sm2.apply(this,arguments)};
 setTimeout(show,900);
})();

