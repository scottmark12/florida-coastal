const TW=D.towns,MAX=3;
const $=id=>document.getElementById(id),esc=s=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;');
let ids=(()=>{const p=new URLSearchParams(location.search).get('t');let t=p?p.split(',').filter(i=>TW[i]):null;if(t&&t.length===1)t=t.concat(TW[t[0]].sim.filter(x=>TW[x]).slice(0,2));
 if(!t||!t.length){try{t=JSON.parse(localStorage.getItem('fc-cmp')||'null')}catch(e){}t=Array.isArray(t)?t.filter(i=>TW[i]):null}
 return (t&&t.length?t:['destin','sarasota','naples']).slice(0,MAX)})();
function save(){try{localStorage.setItem('fc-cmp',JSON.stringify(ids))}catch(e){}const u=new URL(location.href);u.searchParams.set('t',ids.join(','));history.replaceState(null,'',u)}
const bar=n=>'<span class="bar" aria-hidden="true">'+[1,2,3,4,5].map(i=>'<i class="'+(i<=n?'on':'')+'"></i>').join('')+'</span>';
function similar(k){const have=new Set(ids),out=[];ids.forEach(id=>TW[id].sim.forEach(x=>{if(TW[x]&&!have.has(x)&&!out.includes(x))out.push(x)}));return out.slice(0,k)}
function verdict(ts){if(ts.length<2)return'';const ks=D.CATS.map(c=>c[0]).concat(['edu']),lead={};ts.forEach(id=>lead[id]=[]);
 ks.forEach(k=>{const o=ts.slice().sort((x,y)=>TW[x].rk[k]-TW[y].rk[k]),w=o[0];if(TW[w].sc[k]<3)return;const word=k==='edu'?'schools':k==='dining'?'dining':k==='quiet'?'quiet':(D.SW[k]||k);lead[w].push([word,TW[o[1]].rk[k]-TW[w].rk[k]])});
 const list=a=>{a=a.map(x=>x[0]);return a.length<2?a.join(''):a.slice(0,-1).join(', ')+' and '+a[a.length-1]};
 return '<div class="verdict"><h2>The short version</h2><div class="vg" style="--n:'+ts.length+'">'+ts.map(id=>{const t=TW[id],l=lead[id].sort((x,y)=>y[1]-x[1]).slice(0,3);
  return '<div><b>'+esc(t.s)+'</b><p>'+(l.length?'Best of these for '+list(l)+'.':'Doesn’t come out on top here in any score, but see where it ranks below.')+'</p><a href="towns/'+id+'-v3.html#ask" data-ask="'+id+'">Ask a local in '+esc(t.s)+'&nbsp;→</a></div>'}).join('')+'</div></div>'}
const pairs=(lg,sm)=>'<span class="lg">'+lg+'</span><span class="sm">'+sm+'</span>';
const apC=a=>{const c=(a.match(/\(([A-Z]{3})\)/)||[])[1],t=(a.match(/about ([^,;.]+?(?:minutes?|hours?(?: \d+ minutes)?|an hour))/)||[])[1];return c?('<b>'+c+'</b>'+(t?'<small>'+esc(t.replace(' minutes',' min').replace(' hours',' hr').replace(' hour',' hr'))+'</small>':'')):esc(a)};
const hC=h=>{const m=h.match(/^(.*?), about ([\d.]+) mi/);return m?'<b>'+m[2]+' mi</b><small>'+esc(m[1])+'</small>':h};
const prC=p=>esc(p.replace(' median',''));
function render(){const ts=ids.slice(),n=ts.length,open=n<MAX,cols=n+(open?1:0);
 const sp='<div class="sp"></div>',pad=open?'<div></div>':'';
 const row=(lab,fn,cls)=>'<div class="grid row '+(cls||'')+'" style="--n:'+cols+'"><div class="lab">'+lab+'</div>'+ts.map(id=>'<div class="c">'+fn(TW[id],id)+'</div>').join('')+pad+(cls==='txt'?'<button class="more" type="button">Read more</button>':'')+'</div>';
 const heads='<div class="grid heads" style="--n:'+cols+'">'+sp+ts.map(id=>{const t=TW[id];return '<div class="th"><a class="ph" href="towns/'+id+'-v3.html" style="background-image:url(\''+t.img+'\')"></a><button class="x" data-rm="'+id+'" aria-label="Remove '+esc(t.s)+'">&times;</button><b><a href="towns/'+id+'-v3.html">'+esc(t.s)+'</a></b><span>'+esc(t.rg)+'</span><button class="swap" data-swap="'+id+'">Swap town</button></div>'}).join('')+
  (open?'<div class="add"><b>'+(n<2?'Add a town':'Add a third town')+'</b><div class="srch"><input id="q" type="search" placeholder="Search any beach town" autocomplete="off" aria-label="Search for a town to add"><div class="res" id="res"></div></div><div class="sim"><div class="l">Or a similar town</div>'+similar(3).map(x=>'<button data-add="'+x+'"><i style="background-image:url(\''+TW[x].img+'\')"></i><span>'+esc(TW[x].s)+'<small>'+esc(TW[x].rg)+'</small></span><em>+ Add</em></button>').join('')+'</div></div>':'')+'</div>';
 const all=D.CATS.concat([['edu','Public school district']]),sr=[];
 all.forEach(([k,l])=>{const best=ts.slice().sort((x,y)=>TW[x].rk[k]-TW[y].rk[k])[0];
  sr.push('<div class="grid row" style="--n:'+cols+'"><div class="lab">'+l+'<button class="inf" data-k="'+k+'" aria-label="How we rank '+esc(l)+'">i</button></div>'+ts.map(id=>{const t=TW[id],win=n>1&&id===best;return '<div class="c"><div class="sc'+(win?' win':'')+'">'+bar(t.sc[k])+'<span class="n">'+t.sc[k]+'</span>'+(win?'<span class="cxbest">Best</span>':'')+'</div></div>'}).join('')+pad+'</div>')});
 $('cmp').innerHTML=heads+verdict(ts)+
  '<div class="sec"><h2>The basics</h2>'+row('Home prices',t=>pairs(esc(t.pr),prC(t.pr)))+row('Nearest hospital with an ER<small>Straight line miles, so the drive is longer</small>',t=>pairs(t.h,hC(t.h)))+row('Airport',t=>pairs(esc(t.a),apC(t.a)))+row('Season',t=>esc(t.se),'txt')+row('Heads up',t=>esc(t.w),'txt')+'</div>'+
  '<div class="sec"><h2>The scorecard</h2><p class="note">Scores run 1 to 5. The best in each row is in teal. Tap <b class="ii">i</b> to see how we rank it and where each town sits out of '+D.N+'.</p>'+sr.join('')+'</div>'+
  '<div class="sec"><h2>In their words</h2>'+row('A day in town',t=>esc(t.d),'txt')+row('Why people love it',t=>esc(t.pros.join('. ')+'.'),'txt')+row('Know before you go',t=>esc(t.cons.join('. ')+'.'),'txt')+row('Next step',(t,id)=>'<a class="ask'+(id===ts[0]?'':' ol')+'" href="towns/'+id+'-v3.html#ask" data-ask="'+id+'">Ask a local in '+esc(t.s)+'&nbsp;→</a>')+'</div>';
 $('stick').innerHTML='<div class="grid" style="--n:'+cols+'"><em>Comparing</em>'+ts.map(id=>'<span><i style="background-image:url(\''+TW[id].img+'\')"></i>'+esc(TW[id].s)+'</span>').join('')+(open?'<span></span>':'')+'</div>';
 document.querySelectorAll('.txt').forEach(r=>{const m=r.querySelector('.more');if(m&&![...r.querySelectorAll('.c')].some(c=>c.scrollHeight>c.clientHeight+2))m.remove()});
 document.querySelectorAll('.more').forEach(b=>b.onclick=()=>{const r=b.closest('.row');r.classList.toggle('open');b.textContent=r.classList.contains('open')?'Show less':'Read more'});
 document.querySelectorAll('[data-rm]').forEach(b=>b.onclick=()=>{ids=ids.filter(x=>x!==b.dataset.rm);save();render()});
 document.querySelectorAll('[data-add]').forEach(b=>b.onclick=()=>add(b.dataset.add));
 const q=$('q');if(q){q.oninput=()=>{const s=q.value.trim().toLowerCase(),r=$('res');if(!s){r.classList.remove('on');return}const m=Object.entries(TW).filter(([id,t])=>!ids.includes(id)&&(t.s.toLowerCase().includes(s)||((window.FCAKA||{})[id]||'').toLowerCase().includes(s)||t.rg.toLowerCase().includes(s))).slice(0,6);
  r.innerHTML=m.length?m.map(([id,t])=>'<button data-add="'+id+'"><i style="background-image:url(\''+t.img+'\')"></i><span>'+esc(t.s)+'<small>'+esc(t.rg)+'</small></span></button>').join(''):'<div style="padding:12px 14px;font-size:14.5px;color:#5A6B6E">No town by that name</div>';r.classList.add('on');r.querySelectorAll('[data-add]').forEach(b=>b.onclick=()=>add(b.dataset.add))};
  q.onkeydown=e=>{if(e.key==='Enter'){const f=$('res').querySelector('[data-add]');f&&add(f.dataset.add)}}}
 stick()}
function pop(btn){let p=$('pop');if(!p){p=document.createElement('div');p.id='pop';p.className='pop';document.body.appendChild(p)}
 if(p.dataset.for===btn.dataset.k&&p.classList.contains('on')){p.classList.remove('on');return}
 const k=btn.dataset.k,lab=(D.CATS.find(c=>c[0]===k)||[k,'Public school district'])[1],o=ids.slice().sort((x,y)=>TW[x].rk[k]-TW[y].rk[k]);
 p.dataset.for=k;p.innerHTML='<b>'+esc(lab)+'</b><p>'+esc(D.DESC[k]||'')+'</p>'+o.map(id=>'<div class="pr"><span>'+esc(TW[id].s)+'</span><strong>#'+TW[id].rk[k]+' of '+D.N+'</strong></div>').join('')+'<p class="sm">Scores run 1 to 5. Ranks use our finer data, so two towns with the same score still rank in order. <a href="scoring.html">How we score</a></p>';
 const r=btn.getBoundingClientRect();p.classList.add('on');const w=Math.min(320,innerWidth-24);p.style.width=w+'px';p.style.left=Math.max(12,Math.min(innerWidth-w-12,r.left-12))+'px';p.style.top=(r.bottom+scrollY+10)+'px'}
document.addEventListener('click',e=>{const b=e.target.closest('.inf');if(b){e.preventDefault();pop(b);return}if(!e.target.closest('.pop')){const p=$('pop');p&&p.classList.remove('on')}});
function modal(html){let m=$('mdl');if(!m){m=document.createElement('div');m.id='mdl';m.className='mdl';document.body.appendChild(m);m.addEventListener('click',e=>{if(e.target===m||e.target.closest('.mx'))closeM()})}
 m.innerHTML='<div class="mbox" role="dialog" aria-modal="true"><button class="mx" aria-label="Close">&times;</button>'+html+'</div>';m.classList.add('on');document.documentElement.style.overflow='hidden';return m.querySelector('.mbox')}
function closeM(){const m=$('mdl');if(m){m.classList.remove('on');document.documentElement.style.overflow=''}}
addEventListener('keydown',e=>{if(e.key==='Escape')closeM()});
function ask(id){const t=TW[id],others=ids.filter(x=>x!==id).map(x=>TW[x].s);
 const b=modal('<div class="mph" style="background-image:url(\''+t.img+'\')"></div><h3>Ask a local about '+esc(t.s)+'</h3><p class="msub">A local who lives there writes back within a day.</p><div class="mf"><label>Name</label><input name="name" autocomplete="given-name" placeholder="First name"><label>Email</label><input type="email" placeholder="you@example.com" autocomplete="email"><label>Phone <span class="opt">(optional)</span></label><input type="tel" autocomplete="tel" placeholder="For a quick call or text"><label>When are you thinking?</label><div class="tlc"><button type="button" data-v="Within 3 months">Within 3 months</button><button type="button" data-v="This year">This year</button><button type="button" class="on" data-v="Just looking">Just looking</button></div><button class="go">Ask a local</button><p class="fine">No spam. We only use this to answer you. Adding a number means a local may call or text you about your move.</p></div><div class="who"><img src="img/g/mark-betsy.webp" alt=""><span>Mark and Betsy Scott read every message.</span></div>');
 const f=b.querySelector('.mf');let tl='Just looking';const ch=[...f.querySelectorAll('.tlc button')];ch.forEach(x=>x.onclick=()=>{ch.forEach(y=>y.classList.toggle('on',y===x));tl=x.dataset.v});setTimeout(()=>f.querySelector('input').focus(),60);
 window.FC&&FC.bind(f,{kind:'local',button:'button.go',thanks:'Thanks. A local will write back within a day.',after:()=>setTimeout(closeM,2200),extra:x=>({town:t.s,name:(x.querySelector('input[name=name]').value||'').trim().slice(0,120)||null,phone:(x.querySelector('input[type=tel]').value||'').trim().slice(0,40)||null,timeline:tl,message:others.length?'Comparing with: '+others.join(', '):null})})}
 let swapId=null;
function swap(id){swapId=id;const t=TW[id],keep=ids.filter(x=>x!==id),have=new Set(ids),sim=[];TW[id].sim.forEach(x=>{if(TW[x]&&!have.has(x)&&!sim.includes(x))sim.push(x)});
 const b=modal('<h3>Swap '+esc(t.s)+' for</h3><div class="srch"><input id="sq" type="search" placeholder="Search any beach town" autocomplete="off" aria-label="Search for a town"></div><div class="sim" id="sr"><div class="l">Towns like '+esc(t.s)+'</div>'+sim.slice(0,5).map(x=>'<button data-to="'+x+'"><i style="background-image:url(\''+TW[x].img+'\')"></i><span>'+esc(TW[x].s)+'<small>'+esc(TW[x].rg)+'</small></span><em>Swap in</em></button>').join('')+'</div>');
 const q=b.querySelector('#sq'),r=b.querySelector('#sr'),base=r.innerHTML;setTimeout(()=>q.focus(),60);
 const wire=()=>r.querySelectorAll('[data-to]').forEach(x=>x.onclick=()=>doSwap(x.dataset.to));wire();
 q.oninput=()=>{const v=q.value.trim().toLowerCase();if(!v){r.innerHTML=base;wire();return}const m=Object.entries(TW).filter(([k,t])=>!have.has(k)&&(t.s.toLowerCase().includes(v)||((window.FCAKA||{})[k]||'').toLowerCase().includes(v)||t.rg.toLowerCase().includes(v))).slice(0,6);
  r.innerHTML=m.length?m.map(([k,t])=>'<button data-to="'+k+'"><i style="background-image:url(\''+t.img+'\')"></i><span>'+esc(t.s)+'<small>'+esc(t.rg)+'</small></span><em>Swap in</em></button>').join(''):'<p class="msub">No town by that name</p>';wire()};
 q.onkeydown=e=>{if(e.key==='Enter'){const f=r.querySelector('[data-to]');f&&doSwap(f.dataset.to)}}}
function flash(i){const n=ids.length;document.querySelectorAll('#cmp .grid').forEach(g=>{const cells=[...g.children].filter(c=>!c.classList.contains('lab')&&!c.classList.contains('sp')&&!c.classList.contains('more')&&g.style.getPropertyValue('--n'));const c=cells[i];if(c){c.classList.remove('flash');void c.offsetWidth;c.classList.add('flash')}})}
function doSwap(to){const i=ids.indexOf(swapId);if(i<0||!TW[to])return;ids[i]=to;closeM();save();render();flash(i);window.FC&&FC.track&&FC.track('compare_swap',to)}
document.addEventListener('click',e=>{const a=e.target.closest('[data-ask]');if(a){e.preventDefault();ask(a.dataset.ask);return}const w=e.target.closest('[data-swap]');if(w){e.preventDefault();swap(w.dataset.swap)}});
function add(id){if(!TW[id]||ids.includes(id)||ids.length>=MAX)return;ids.push(id);save();render();window.FC&&FC.track&&FC.track('compare_add',id)}
function stick(){const h=document.querySelector('.heads');if(!h)return;const hd=document.querySelector('header'),hb=hd?Math.max(0,hd.getBoundingClientRect().bottom):0;$('stick').style.top=hb+'px';$('stick').classList.toggle('on',h.getBoundingClientRect().bottom<hb+4)}
addEventListener('scroll',stick,{passive:true});document.addEventListener('click',e=>{if(!e.target.closest('.srch'))$('res')&&$('res').classList.remove('on')});
save();render();
