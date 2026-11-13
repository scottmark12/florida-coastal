(function(){const P=new URLSearchParams(location.search),a=P.get('a')||'';let top=null;
try{const s=JSON.parse(sessionStorage.getItem('fc-top5')||'null');if(s&&s.a===a&&s.top&&s.top.length)top=s.top}catch(e){}
if(!top&&P.get('t'))top=P.get('t').split(',').map(x=>{const i=x.lastIndexOf('.');return{id:x.slice(0,i),fit:+x.slice(i+1),why:[]}}).filter(x=>TD[x.id]);
if(!top||!top.length)return;top=top.filter(x=>TD[x.id]).slice(0,5);try{document.getElementById('cmp3').href='compare-v3.html?t='+top.slice(0,3).map(x=>x.id).join(',')}catch(e){};
const E=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
document.getElementById('tr').innerHTML=top.map((x,i)=>{const t=TD[x.id];return `<section class="sl"><div class="im" style="background-image:url('${t.img}')"></div><div class="ov"></div>
<div class="tx"><div class="k">${i?`#${i+1} of ${top.length}`:'Your #1 match'} &middot; ${x.fit}% match</div><h2 class="rt">${E(t.n)}</h2>
<div class="rg">${E(t.r.replace(/ · /g,', '))}${t.p?` &middot; <b>${E(t.p)}</b> typical home`:''}</div><p>${E(t.b)}</p>
${x.why&&x.why.length?`<div class="why"><span>Fits what you asked for</span>${x.why.map(E).join(' · ')}</div>`:''}
<div class="bt"><a class="go" href="towns/${x.id}-v3.html">Explore ${E(t.n.replace(/ \(.*\)$/,''))}</a><a class="gh" href="#short">Email me all ${top.length}</a></div></div></section>`}).join('');
document.getElementById('dt').innerHTML=top.map(()=>'<i></i>').join('');
document.querySelectorAll('a[href^="quiz-photo.html?a="]').forEach(l=>l.href='vibe-v3.html?mode=sliders');
window.TOP5=top;window.ANS=a;
try{if(localStorage.getItem('fc-mail')){const sh=document.getElementById('short');if(sh)sh.style.display='none';const cmp='compare-v3.html?t='+top.slice(0,3).map(x=>x.id).join(',');document.querySelectorAll('.bt a.gh[href="#short"]').forEach(l=>{l.href=cmp;l.textContent='Compare my top 3'})}}catch(e){}
})();
/* Nov 13: phone results, Compass style. Splits the match % into a chip and the "fits" reasons into pills (desktop keeps the same look via CSS), and adds Your 5 photo tiles that sit above the frosted sheet */
(function(){const tr=document.getElementById('tr'),T=window.TOP5;if(!tr||!T)return;
tr.querySelectorAll('.k').forEach(k=>{k.innerHTML=k.innerHTML.replace(/\s*(?:&middot;|·)\s*(\d+% match)/,' <em class="mc">$1</em>')});
tr.querySelectorAll('.why').forEach(w=>{const s=w.querySelector('span');const items=[...w.childNodes].filter(n=>n.nodeType==3).map(n=>n.textContent).join('').split(' · ').map(x=>x.trim()).filter(Boolean);w.innerHTML='';w.appendChild(s);items.forEach(x=>{const e=document.createElement('em');e.className='wp';e.textContent=x;w.appendChild(e)})});
tr.querySelectorAll('.bt a.go').forEach(a=>{const m=a.textContent.match(/^Explore (.+)$/);if(m){a.textContent='Explore';const g=document.createElement('span');g.className='gn';g.textContent=' '+m[1];a.appendChild(g)}});
tr.querySelectorAll('.bt a.gh').forEach(a=>{if(/^Email me all 5$/.test(a.textContent.trim()))a.innerHTML='Email<span class="gn"> me</span> all 5'});
const wrap=tr.parentElement,f=document.createElement('div');f.className='pd';f.setAttribute('aria-hidden','true');
let seen=0;try{seen=sessionStorage.getItem('fc-swiped')}catch(x){}
f.innerHTML=T.map(()=>'<i></i>').join('')+(seen?'':'<span>Swipe for all '+T.length+' &rarr;</span>');wrap.appendChild(f);
const sync=()=>{const i=Math.round(tr.scrollLeft/(tr.clientWidth||1)),tx=tr.children[i]&&tr.children[i].querySelector('.tx');if(tx)wrap.style.setProperty('--sh',tx.offsetHeight+'px');f.querySelectorAll('i').forEach((b,j)=>b.classList.toggle('on',j==i));if(i>0){const h=f.querySelector('span');if(h){h.remove();try{sessionStorage.setItem('fc-swiped','1')}catch(x){}}}};
tr.addEventListener('scroll',()=>requestAnimationFrame(sync),{passive:true});addEventListener('resize',sync);setTimeout(sync,60);sync()})();
