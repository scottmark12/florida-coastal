(function(){const P=new URLSearchParams(location.search),a=P.get('a')||'';let top=null;
try{const s=JSON.parse(sessionStorage.getItem('fc-top5')||'null');if(s&&s.a===a&&s.top&&s.top.length)top=s.top}catch(e){}
if(!top&&P.get('t'))top=P.get('t').split(',').map(x=>{const i=x.lastIndexOf('.');return{id:x.slice(0,i),fit:+x.slice(i+1),why:[]}}).filter(x=>TD[x.id]);
/* no quiz answers: show the sample five that ship in the page (their photos wait in data-bg so they don't download when real results replace them) */
if(!top||!top.length){document.querySelectorAll('#tr .im[data-bg]').forEach(e=>{e.style.backgroundImage=`url('${e.dataset.bg}')`;delete e.dataset.bg});return}top=top.filter(x=>TD[x.id]).slice(0,5);try{document.getElementById('cmp3').href='compare.html?t='+top.slice(0,3).map(x=>x.id).join(',')}catch(e){};
/* the #1 photo fills the screen, so it skips the size picker and loads the full photo straight away */
const FULL=u=>u.replace(/\/[tms]\/([^/]+)$/,'/$1');
const E=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
document.getElementById('tr').innerHTML=top.map((x,i)=>{const t=TD[x.id];return `<section class="sl"><div class="im" ${i?`data-bg="${t.img}"`:`style="background-image:url('${FULL(t.img)}')"`}></div><div class="ov"></div>
<div class="tx"><div class="k">${i?`#${i+1} of ${top.length}`:'Your #1 match'} &middot; ${x.fit}% match</div><h2 class="rt">${E(t.n)}</h2>
<div class="rg">${E(t.r.replace(/ · /g,', '))}${t.p?` &middot; <b>${E(t.p)}</b> typical home`:''}</div><p>${E(t.b)}</p>
${x.why&&x.why.length?`<div class="why"><span>Fits what you asked for</span>${x.why.map(E).join(' · ')}</div>`:''}
<div class="bt"><a class="go" href="towns/${x.id}.html">Explore ${E(t.n.replace(/ \(.*\)$/,''))}</a><a class="gh" href="#short">Email me all ${top.length}</a></div></div></section>`}).join('');
document.getElementById('dt').innerHTML=top.map(()=>'<i></i>').join('');
/* Nov 13: only the #1 photo loads with the page; the other four follow once it's in (or as soon as you swipe), so the first photo shows up seconds sooner on phones */
(()=>{const L=[...document.querySelectorAll('#tr .im[data-bg]')];if(!L.length)return;const go=()=>L.forEach(e=>{if(e.dataset.bg){e.style.backgroundImage=`url('${e.dataset.bg}')`;delete e.dataset.bg}});const f=new Image();f.onload=f.onerror=()=>setTimeout(go,150);f.src=FULL(TD[top[0].id].img);document.getElementById('tr').addEventListener('scroll',go,{once:true,passive:true});setTimeout(go,5000)})();
document.querySelectorAll('a[href^="find-your-mile.html?a="]').forEach(l=>l.href='map.html?mode=sliders');
window.TOP5=top;window.ANS=a;
try{if(localStorage.getItem('fc-mail')){const sh=document.getElementById('short');if(sh)sh.style.display='none';const cmp='compare.html?t='+top.slice(0,3).map(x=>x.id).join(',');document.querySelectorAll('.bt a.gh[href="#short"]').forEach(l=>{l.href=cmp;l.textContent='Compare my top 3'})}}catch(e){}
})();
/* Nov 13: phone results, Compass style. Splits the match % into a chip and the "fits" reasons into pills (desktop keeps the same look via CSS), and adds Your 5 photo tiles that sit above the frosted sheet */
(function(){const tr=document.getElementById('tr');if(!tr)return;
/* phone results: match chip, short buttons, dots, and each photo continued under the card. Reapplied whenever the slides get redrawn */
const EX=[];const fit=()=>{EX.forEach(([sl,im,ex,g])=>{if(!im.isConnected)return;const W=im.offsetWidth,H=im.offsetHeight,E=sl.offsetHeight-H+44;if(!W||!H||E<=0)return;const sc=Math.max(W/g.width,H/g.height),dw=g.width*sc,dh=g.height*sc,vb=(dh+H)/2,st=Math.min(.1*dh,vb*.2),k=E/st;ex.style.backgroundSize=`${dw}px ${dh*k}px`;ex.style.backgroundPosition=`${(W-dw)/2}px ${-(vb-st)*k}px`})};
const wrap=tr.parentElement,f=document.createElement('div');f.className='pd';wrap.appendChild(f);f.addEventListener('click',e=>{const d=e.target.closest('i');if(!d)return;const j=[...f.querySelectorAll('i')].indexOf(d);tr.scrollTo({left:j*tr.clientWidth,behavior:'smooth'})});
let seen=0;try{seen=sessionStorage.getItem('fc-swiped')}catch(x){}
const sync=()=>{const i=Math.round(tr.scrollLeft/(tr.clientWidth||1)),tx=tr.children[i]&&tr.children[i].querySelector('.tx');if(tx)wrap.style.setProperty('--sh',tx.offsetHeight+'px');f.querySelectorAll('i').forEach((b,j)=>b.classList.toggle('on',j==i));if(i>0){const h=f.querySelector('span');if(h){h.remove();seen=1;try{sessionStorage.setItem('fc-swiped','1')}catch(x){}}}fit()};
const enhance=()=>{
tr.querySelectorAll('.k').forEach(k=>{if(!k.querySelector('.mc'))k.innerHTML=k.innerHTML.replace(/\s*(?:&middot;|·)\s*(\d+% match)/,' <em class="mc">$1</em>')});
tr.querySelectorAll('.why').forEach(w=>{if(w.querySelector('.wp'))return;const s=w.querySelector('span');const items=[...w.childNodes].filter(n=>n.nodeType==3).map(n=>n.textContent).join('').split(' · ').map(x=>x.trim()).filter(Boolean);w.innerHTML='';if(s)w.appendChild(s);items.forEach(x=>{const e=document.createElement('em');e.className='wp';e.textContent=x;w.appendChild(e)})});
tr.querySelectorAll('.bt a.go').forEach(a=>{if(a.querySelector('.gn'))return;const m=a.textContent.match(/^Explore (.+)$/);if(m){a.textContent='Explore';const g=document.createElement('span');g.className='gn';g.textContent=' '+m[1];a.appendChild(g)}});
tr.querySelectorAll('.bt a.gh').forEach(a=>{if(!a.querySelector('.gn')&&/^Email me all 5$/.test(a.textContent.trim()))a.innerHTML='Email<span class="gn"> me</span> all 5'});
const n=tr.querySelectorAll('.sl').length;if(f.querySelectorAll('i').length!=n)f.innerHTML=Array.from({length:n},(_,j)=>`<i role="button" tabindex="0" aria-label="Go to town ${j+1}"></i>`).join('')+(seen?'':'<span>Swipe for all '+n+' &rarr;</span>');
tr.querySelectorAll('.sl').forEach(sl=>{const im=sl.querySelector('.im'),m=im&&/url\(["']?([^"')]+)/.exec(im.style.backgroundImage);if(!m||im.dataset.fx==m[1])return;im.dataset.fx=m[1];sl.querySelectorAll('.ex,.exf').forEach(e=>e.remove());const g=new Image();g.onload=()=>{if(im.dataset.fx!=m[1]||!im.isConnected)return;try{const c=document.createElement('canvas');c.width=32;c.height=32;const x=c.getContext('2d');x.drawImage(g,0,0,32,32);const d=x.getImageData(0,28,32,4).data;let r=0,gg=0,b=0,q=d.length/4;for(let j=0;j<d.length;j+=4){r+=d[j];gg+=d[j+1];b+=d[j+2]}r/=q;gg/=q;b/=q;const L=.299*r+.587*gg+.114*b,kk=L>95?95/L:1;sl.style.setProperty('--bc',`rgb(${r*kk|0},${gg*kk|0},${b*kk|0})`)}catch(e){}
const ex=document.createElement('div');ex.className='ex';ex.style.backgroundImage=`url("${m[1]}")`;const fd=document.createElement('div');fd.className='exf';im.after(ex);ex.after(fd);EX.push([sl,im,ex,g]);fit()};g.src=m[1]});
sync()};
enhance();let busy=0;new MutationObserver(()=>{if(busy)return;busy=1;requestAnimationFrame(()=>{enhance();busy=0})}).observe(tr,{childList:true,subtree:true,attributes:true,attributeFilter:['style']});
tr.addEventListener('scroll',()=>requestAnimationFrame(sync),{passive:true});addEventListener('resize',sync);setTimeout(sync,60);new ResizeObserver(sync).observe(tr)})();
