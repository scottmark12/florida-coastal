/* See your top 5 button, low resting spot, Slider Map auto open */
// Nov 12: phone Slider Map, Apple filter style. Once a slider moves, "See your top 5 →" pins to the bottom; it drops the panel and shows the map
(function(){const b=document.createElement('button');b.type='button';b.className='sl-see';b.innerHTML='See your top 5 <span>→</span>';document.body.appendChild(b);
 b.onclick=()=>{shSet('low');window.dispatchEvent(new CustomEvent('fc-sl-see'))};
 const up=()=>{const on=SHON()&&S.mode=='sliders'&&SHEET.st!='peek'&&slAnySet();b.classList.toggle('on',on)};setInterval(up,300);up()})();

// Nov 12 v9: a lower resting spot. Vibe and Regions keep only the photo tiles; the Slider Map keeps only its title and Reset
function LH(){const r=$('res');if(!r)return PK();const had=r.classList.contains('sh-low');r.classList.add('sh-low');const rt=r.getBoundingClientRect().top;let b;
 if(S.mode=='sliders'){const h=r.querySelector('.slh');b=h?h.getBoundingClientRect().bottom-rt+12:90}else{const tl=r.querySelector('.vp .tiles.vt');b=tl?tl.getBoundingClientRect().bottom-rt+14:PK()}
 if(!had)r.classList.remove('sh-low');return Math.round(Math.min(PK()-20,b)+(IOSB()?8:0))}
function SHB(){return typeof SHEET!='undefined'&&SHEET.st=='low'?LH():PK()}
(function(){const st0=shStops;shStops=function(){const o=st0();o.low=innerHeight-(SHON()?LH():PK());return o};
 const ss=shSet;shSet=function(name,noFit){const r=$('res');if(r)r.classList.toggle('sh-low',name=='low');const out=ss.apply(this,arguments);if(r){r.classList.toggle('sh-up',name=='half'||name=='full')}document.body.style.setProperty('--pk',(name=='low'?LH():PK())+'px');return out};
 // auto open the sliders once per visit so they are easy to find; any tap on the map drops them back down
 let auto=false;const tryOpen=()=>{const pe=$('pop');if(!SHON()||S.mode!='sliders'||slAnySet()||SHEET.st!='peek'||(pe&&pe.classList.contains('on')&&pe.dataset.intro))return;/* the guide card already points at the sliders */try{if(sessionStorage.getItem('fc-slopen'))return;sessionStorage.setItem('fc-slopen','1')}catch(e){}auto=true;shSet('half')};
 const sm=window.setMode;window.setMode=setMode=function(m){const o=sm.apply(this,arguments);if(m=='sliders')setTimeout(tryOpen,1400);return o};
 setTimeout(()=>{if(S.mode=='sliders')tryOpen()},1800);
 $('mapbox')&&$('mapbox').addEventListener('pointerdown',()=>{if(auto&&SHON()&&SHEET.st=='half'){auto=false;shSet('peek')}},true);
 document.addEventListener('pointerdown',e=>{if(e.target.closest&&e.target.closest('#res'))auto=false},true)})();
