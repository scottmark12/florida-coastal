/* Window resizing between phone and desktop layouts */
// Nov 12: resizing a window (or turning a tablet) moves cleanly between the phone sheet and the desktop layout,
// and the map refits to the new space instead of keeping a view sized for the old one
;(function(){let t,lastPh=PH(),lastD=DFL(),lastW=innerWidth;
 const refit=()=>{if(S.mode=='sliders'){if(S.top&&S.top.length){go(slFit(S.top.slice(0,5).map(id=>T.find(t=>t.id==id))),0);return}}
  else if(S.mode=='vibes'&&S.pop){const t=S.pop;go(fitStyle(S.style||'')&&S.style?fitStyle(S.style):fit(ALL,.02),0);return}
  else if(S.mode=='vibes'&&S.style){go(fitStyle(S.style),0);return}
  go(fit(ALL,.02),0)};
 addEventListener('resize',()=>{clearTimeout(t);t=setTimeout(()=>{const ph=PH(),d=DFL(),bw=Math.abs(innerWidth-lastW)>40;
  if(ph!==lastPh||d!==lastD){try{shSync()}catch(e){}}
  if(ph!==lastPh||d!==lastD||bw){setTimeout(()=>{refit();const p=$('pop');p&&p.classList.contains('on')&&placePop();render()},ph!==lastPh?120:0)}
  lastPh=ph;lastD=d;lastW=innerWidth},160)})})();
/* Nov 13: town dots grow as you zoom in (up to 1.6x at the closest zoom) so they're easier to tap; labels stay the same */
(function(){if(typeof render!='function')return;let base=0;const o=render;
 const grow=()=>{if(!S.vb)return;base=Math.max(base,S.vb[2]);const z=base/S.vb[2],f=1+Math.max(0,Math.min(.6,(z-2)/6));if(f<=1.01)return;document.querySelectorAll('#mapbox circle.dot,#mapbox circle.ddh').forEach(c=>{if(c.dataset.g)return;c.dataset.g=1;const r=+c.getAttribute('r');if(r)c.setAttribute('r',r*f)})};
 window.render=render=function(){const out=o.apply(this,arguments);try{grow()}catch(e){}return out}})();
