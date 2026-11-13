/* Best overall (Well rounded), town card swipe, first pick, swipe up hint */
// ---- Nov 12: the maps never sit empty. They always show a real pick; on a first visit they step through real picks until the first touch, then stop for good ----
/* Nov 12: Best overall. Our top 15 on the Slider Map's Best all around scoring becomes the first Vibe Map style, and the page opens on it */
(function(){const R=T.slice().sort((a,b)=>fitSl(b)-fitSl(a)).slice(0,15);R.forEach((t,i)=>{if(!t.v.includes('best'))t.v.push('best');t.bestRk=i+1});
 VIBES.best='Best quality of life';VCOL.best='#1F3A6E';VSUB.best='Strong on everything';if(LK.VSUBL)LK.VSUBL.best='Our top 15, strong on all 10 priorities';if(LK.VSHORT)LK.VSHORT.best='Quality of life';if(!LK.VFEEL.includes('best'))LK.VFEEL.push('best')})();
function mapIntro(){}/* replaced by the guide card below */
function bestIntro(){if(S.mode=='vibes'&&S.style=='best')mapIntro('vibes')}
// swipe a town card left or right to step through the list (the intro card swipes to #1)
(function(){const p=$('pop');if(!p)return;let x0=null,y0=0;p.addEventListener('touchstart',e=>{const t=e.touches[0];x0=t.clientX;y0=t.clientY},{passive:true});
 p.addEventListener('touchend',e=>{if(x0==null)return;const t=e.changedTouches[0],dx=t.clientX-x0,dy=t.clientY-y0;x0=null;if(Math.abs(dx)<44||Math.abs(dx)<Math.abs(dy)*1.3)return;const b=p.querySelector(`[data-st="${dx<0?1:-1}"]`)||(dx<0&&p.querySelector('[data-st="1"]'));b&&b.click()},{passive:true})})();
const VDEF={regions:'r:panhandle',styles:'best'};
function ensurePick(){if(S.mode!='vibes'||S.style||S.restoring)return;let k;if(S.sub=='regions'){render();rSweep();return}else{const m=S.mem&&S.mem.styles&&S.mem.styles.st;k=m&&VIBES[m]?m:VDEF.styles}S.auto=1;pickStyle(k);setTimeout(()=>{S.auto=0},400);if(k=='best')setTimeout(bestIntro,650);else if(S.sub=='regions'&&!S.introR){S.introR=1;setTimeout(()=>{if(S.mode=='vibes'&&S.sub=='regions')mapIntro('regions')},650)}}
setTimeout(ensurePick,700);


// ---- Nov 12: phone hint that the sheet pulls up. Shows on the closed sheet until the first pull, then never again ----
(function(){if(!$('res'))return;{const x=document.createElement('button');x.type='button';x.className='shx';x.setAttribute('aria-label','Back to the map');x.innerHTML='&times;';x.onclick=e=>{e.stopPropagation();shSet('peek')};$('res').prepend(x)}const el=document.createElement('button');el.type='button';el.className='shint';el.setAttribute('aria-label','Swipe up for all towns');el.innerHTML='<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M6 15l6-6 6 6"/></svg><span>Swipe up for all towns</span>';$('res').appendChild(el);
 const seen=()=>{try{return !!localStorage.getItem('fc-shint')}catch(e){return false}};
 el.onclick=()=>{try{localStorage.setItem('fc-shint','1')}catch(e){}shSet('half')};
 const up=()=>{if(SHON()&&SHEET.st!='peek'){try{localStorage.setItem('fc-shint','1')}catch(e){}}const on=SHON()&&SHEET.st=='peek'&&(S.mode=='vibes'||S.mode=='sliders');el.classList.toggle('on',on);if(on){const tx=S.mode=='sliders'?'Swipe up for the sliders':S.sub=='regions'?'Swipe up for all 7 regions':'Swipe up for all styles',sp=el.querySelector('span');if(sp.textContent!=tx){sp.textContent=tx;el.setAttribute('aria-label',tx)}}};
 setInterval(up,400);up()})();
