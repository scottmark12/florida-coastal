// photos as written: the Ask a local photo use the full photo
const TW=D.towns,MAX=4,CATK=D.CATS.map(c=>c[0]).concat(['edu']);
/* Nov 18 clean up: the 1 to 5 dots follow each town's #rank (the newer, finer data the town pages use).
   Each category keeps its own spread of 1s to 5s; only the order changes, so a 3 never outranks a 5. */
CATK.forEach(k=>{const all=Object.keys(TW),v=all.map(i=>TW[i].sc[k]).sort((a,b)=>b-a);all.sort((a,b)=>TW[a].rk[k]-TW[b].rk[k]).forEach((i,n)=>TW[i].sc[k]=v[n])});
/* right size photos (m = 960px for the column heads and the Ask a local photo, t = 320px for the little icons) */
const PSZ=(u,k)=>String(u).replace(/^(\/?img\/c)\/(?![tsm]\/)/,'$1/'+k+'/');
const $=id=>document.getElementById(id),esc=s=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;');
const START=['destin','sarasota','naples'];
let ids=(()=>{const p=new URLSearchParams(location.search).get('t');let t=p?p.split(',').filter(i=>TW[i]):null;if(t&&t.length===1)t=t.concat(TW[t[0]].sim.filter(x=>TW[x]).slice(0,3));
 if(!t||!t.length){try{t=JSON.parse(localStorage.getItem('fc-cmp')||'null')}catch(e){}t=Array.isArray(t)?t.filter(i=>TW[i]):null}
 return (t&&t.length?t:START).slice(0,MAX)})();
function save(){try{localStorage.setItem('fc-cmp',JSON.stringify(ids))}catch(e){}const u=new URL(location.href);if(ids.length)u.searchParams.set('t',ids.join(','));else u.searchParams.delete('t');history.replaceState(null,'',u)}
const bar=n=>'<span class="bar" aria-hidden="true">'+[1,2,3,4,5].map(i=>'<i class="'+(i<=n?'on':'')+'"></i>').join('')+'</span>';
function similar(k,from){const have=new Set(ids),out=[];(from||ids).forEach(id=>TW[id].sim.forEach(x=>{if(TW[x]&&!have.has(x)&&!out.includes(x))out.push(x)}));
 if(!out.length)START.concat(['st-augustine','dunedin','vero-beach']).forEach(x=>{if(TW[x]&&!have.has(x)&&!out.includes(x))out.push(x)});return out.slice(0,k)}
function verdict(ts){if(ts.length<2)return'';const lead={};ts.forEach(id=>lead[id]=[]);
 CATK.forEach(k=>{const o=ts.slice().sort((x,y)=>TW[x].rk[k]-TW[y].rk[k]),w=o[0];if(TW[w].sc[k]<3)return;lead[w].push([k==='edu'?'schools':(D.SW[k]||k),TW[o[1]].rk[k]-TW[w].rk[k]])});
 const list=a=>{a=a.map(x=>x[0]);return a.length<2?a.join(''):a.slice(0,-1).join(', ')+(a.slice(-2).some(w=>w.includes(' and '))?', plus ':' and ')+a[a.length-1]};
 return '<div class="verdict"><h2>The short version</h2><div class="vg" style="--n:'+ts.length+'">'+ts.map(id=>{const t=TW[id],l=lead[id].sort((x,y)=>y[1]-x[1]).slice(0,3);
  return '<div><b>'+esc(t.s)+'</b><p>'+(l.length?'Best of these for '+list(l)+'.':'Doesn’t come out on top here in any score, but see where it ranks below.')+'</p><a href="towns/'+id+'.html#ask" data-ask="'+id+'">Ask a local in '+esc(t.s)+'&nbsp;→</a></div>'}).join('')+'</div></div>'}
const pairs=(lg,sm)=>'<span class="lg">'+lg+'</span><span class="sm">'+sm+'</span>';
const apC=a=>{const c=(a.match(/\(([A-Z]{3})\)/)||[])[1],t=(a.match(/about ([^,;.]+?(?:minutes?|hours?(?: \d+ minutes)?|an hour))/)||[])[1];return c?('<b>'+c+'</b>'+(t?'<small>'+esc(t.replace(' minutes',' min').replace(' hours',' hr').replace(' hour',' hr'))+'</small>':'')):esc(a)};
const hC=h=>{const m=h.match(/^(.*?), about ([\d.]+) mi/);return m?'<b>'+m[2]+' mi</b><small>'+esc(m[1])+'</small>':h};
const prC=p=>esc(p.replace(' median',''));
const addLabel=n=>n<1?'Add a town':n<2?'Add a second town':n<3?'Add a third town':'Add a fourth town';
function empty(){$('cmp').innerHTML='<div class="cmp-start"><h2>Pick a town to start</h2><p>Compare up to four towns side by side.</p><div class="ce-acts"><button type="button" class="ask" data-addsheet>Add a town</button><button type="button" class="ask ol" data-start>Start with Destin, Sarasota and Naples</button></div></div>';
 $('stick').innerHTML='';$('stick').classList.remove('on')}
function render(){const ts=ids.slice(),n=ts.length,open=n<MAX,cols=n+(open?1:0);
 if(!n)return empty();
 const pad=open?'<div></div>':'';
 const row=(lab,fn,cls)=>'<div class="grid row '+(cls||'')+'" style="--n:'+cols+'"><div class="lab">'+lab+'</div>'+ts.map(id=>'<div class="c">'+fn(TW[id],id)+'</div>').join('')+pad+(cls==='txt'?'<button class="more" type="button">Read more</button>':'')+'</div>';
 const heads='<div class="grid heads" style="--n:'+cols+'">'+ts.map(id=>{const t=TW[id];return '<div class="th"><a class="ph" href="towns/'+id+'.html" aria-label="'+esc(t.s)+' town page" style="background-image:url(\''+PSZ(t.img,'m')+'\')"></a><button class="x" type="button" data-rm="'+id+'" aria-label="Remove '+esc(t.s)+'">&times;</button><b><a href="towns/'+id+'.html">'+esc(t.s)+'</a></b><span>'+esc(t.rg)+'</span><button class="swap" type="button" data-swap="'+id+'">Swap town</button></div>'}).join('')+
  (open?'<div class="addt"><button type="button" class="addb" data-addsheet><span class="pl" aria-hidden="true">+</span><span class="al">'+addLabel(n)+'</span></button></div>':'')+'</div>';
 const sr=D.CATS.concat([['edu','Public schools']]).map(([k,l])=>{const best=ts.slice().sort((x,y)=>TW[x].rk[k]-TW[y].rk[k])[0],cnt={};ts.forEach(id=>cnt[TW[id].sc[k]]=(cnt[TW[id].sc[k]]||0)+1);
  return '<div class="grid row" style="--n:'+cols+'"><div class="lab">'+l+'<button class="inf" type="button" data-k="'+k+'" aria-label="How we rank '+esc(l)+'">i</button></div>'+ts.map(id=>{const t=TW[id],win=n>1&&id===best,tie=n>1&&cnt[t.sc[k]]>1;
   return '<div class="c"><div class="sc'+(win?' win':'')+'">'+bar(t.sc[k])+'<span class="n">'+t.sc[k]+'</span>'+(win?'<span class="cxbest">Best</span>':'')+'</div>'+(tie?'<div class="rkl">#'+t.rk[k]+'<span class="of"> of '+D.N+'</span></div>':'')+'</div>'}).join('')+pad+'</div>'}).join('');
 $('cmp').innerHTML=heads+verdict(ts)+
  '<div class="sec"><h2>The basics</h2>'+row('Home prices',(t,id)=>pairs(esc(t.recordedSaleLabel||t.pr)+'<small class="cmp-sub">'+esc(t.priceContext||'See the town page for price sources and dates.')+'</small>',prC(t.recordedSaleLabel||t.pr)+'<small><a href="towns/'+id+'.html">Source &amp; period</a></small>'))+row('Nearest hospital with an ER<small>Straight line miles, so the drive is longer</small>',t=>pairs(t.h,hC(t.h)))+row('Airport',t=>pairs(esc(t.a),apC(t.a)))+row('Season',t=>esc(t.se),'txt')+row('Heads up',t=>esc(t.w),'txt')+'</div>'+
  '<div class="sec"><h2>The scorecard</h2><p class="note">Scores run 1 to 5. The best in each row is in teal. When scores tie, the rank out of '+D.N+' breaks it. Tap <b class="ii">i</b> to see how we rank each one.</p>'+sr+'</div>'+
  '<div class="sec"><h2>In their words</h2>'+row('A day in town',t=>esc(t.d),'txt')+row('Why people love it',t=>esc(t.pros.join('. ')+'.'),'txt')+row('Know before you go',t=>esc(t.cons.join('. ')+'.'),'txt')+row('Next step',(t,id)=>'<a class="ask'+(id===ts[0]?'':' ol')+'" href="towns/'+id+'.html#ask" data-ask="'+id+'">Ask a local in '+esc(t.s)+'&nbsp;→</a>')+'</div>';
 $('stick').innerHTML='<div class="grid" style="--n:'+cols+'"><em>Comparing</em>'+ts.map(id=>'<span><i style="background-image:url(\''+PSZ(TW[id].img,'t')+'\')"></i>'+esc(TW[id].s)+'</span>').join('')+(open?'<span></span>':'')+'</div>';
 document.querySelectorAll('.txt').forEach(r=>{const m=r.querySelector('.more');if(m&&![...r.querySelectorAll('.c')].some(c=>c.scrollHeight>c.clientHeight+2))m.remove()});
 document.querySelectorAll('.more').forEach(b=>b.onclick=()=>{const r=b.closest('.row');r.classList.toggle('open');b.textContent=r.classList.contains('open')?'Show less':'Read more'});
 stick()}
function pop(btn){let p=$('pop');if(!p){p=document.createElement('div');p.id='pop';p.className='pop';p.setAttribute('role','dialog');document.body.appendChild(p)}
 if(p.dataset.for===btn.dataset.k&&p.classList.contains('on')){p.classList.remove('on');return}
 const k=btn.dataset.k,lab=(D.CATS.find(c=>c[0]===k)||[k,'Public schools'])[1],o=ids.slice().sort((x,y)=>TW[x].rk[k]-TW[y].rk[k]);
 p.dataset.for=k;p.setAttribute('aria-label',lab);p.innerHTML='<b>'+esc(lab)+'</b><p>'+esc(D.DESC[k]||'')+'</p>'+o.map(id=>'<div class="pr"><span>'+esc(TW[id].s)+'</span><strong>#'+TW[id].rk[k]+' of '+D.N+'</strong></div>').join('')+'<p class="sm">Scores run 1 to 5. Ranks use our finer data, so two towns with the same score still rank in order. <a href="scoring.html">How we score</a></p>';
 const r=btn.getBoundingClientRect();p.classList.add('on');const w=Math.min(320,innerWidth-24);p.style.width=w+'px';p.style.left=Math.max(12,Math.min(innerWidth-w-12,r.left-12))+'px';p.style.top=(r.bottom+scrollY+10)+'px'}
const closePop=()=>{const p=$('pop');p&&p.classList.remove('on')};
let lastFocus=null;
function modal(html){let m=$('mdl');if(!m){m=document.createElement('div');m.id='mdl';m.className='mdl';document.body.appendChild(m);m.addEventListener('click',e=>{if(e.target===m||e.target.closest('.mx'))closeM()})}
 lastFocus=document.activeElement;m.innerHTML='<div class="mbox" role="dialog" aria-modal="true"><button class="mx" type="button" aria-label="Close">&times;</button>'+html+'</div>';m.classList.add('on');document.documentElement.style.overflow='hidden';return m.querySelector('.mbox')}
function closeM(){const m=$('mdl');if(m&&m.classList.contains('on')){m.classList.remove('on');document.documentElement.style.overflow='';if(lastFocus&&document.contains(lastFocus))lastFocus.focus()}}
function ask(id){const t=TW[id],others=ids.filter(x=>x!==id).map(x=>TW[x].s);
 const b=modal('<div class="mph" style="background-image:url(\''+PSZ(t.img,'m')+'\')"></div><h3>Ask a local about '+esc(t.s)+'</h3><p class="msub">We\'ll send your question to a local who knows the town.</p><div class="mf"><label>Name</label><input name="name" autocomplete="given-name" placeholder="First name"><label>Email</label><input type="email" placeholder="you@example.com" autocomplete="email"><label>Phone <span class="opt">(optional)</span></label><input type="tel" autocomplete="tel" placeholder="For a quick call or text"><label>When are you thinking?</label><div class="tlc"><button type="button" data-v="Within 3 months">Within 3 months</button><button type="button" data-v="This year">This year</button><button type="button" class="on" data-v="Just looking">Just looking</button></div><button type="button" class="bdg-t" aria-expanded="false">Add budget <span class="opt">optional</span></button><div class="bdc" role="group" aria-label="Budget for a home" hidden><button type="button" data-v="Under $400K">Under $400K</button><button type="button" data-v="$400K to $750K">$400K to $750K</button><button type="button" data-v="$750K to $1.5M">$750K to $1.5M</button><button type="button" data-v="$1.5M and up">$1.5M and up</button><button type="button" data-v="Not sure yet">Not sure yet</button></div><button class="go">Ask a local</button><p class="fine">By tapping Ask a local, you agree Florida Coastal, and the local agent for this town if it has one, may call or text you, including automated texts. Not required to buy. Msg rates may apply. <a href="disclosures.html#reach">Details</a></p></div><div class="who"><img src="img/g/mark-betsy.webp" alt="" loading="lazy"><span>Mark and Betsy Scott read every message.</span></div>');
 const f=b.querySelector('.mf');let tl='Just looking';const ch=[...f.querySelectorAll('.tlc button')];ch.forEach(x=>x.onclick=()=>{ch.forEach(y=>y.classList.toggle('on',y===x));tl=x.dataset.v});setTimeout(()=>f.querySelector('input').focus(),60);
 window.FC&&FC.bind(f,{kind:'local',button:'button.go',thanks:'Thanks. We\'ll send your question to a local who knows the town.',after:()=>setTimeout(closeM,2200),extra:x=>({budget:((x.querySelector('.bdc button.on')||{}).dataset||{}).v||null,town:t.s,name:(x.querySelector('input[name=name]').value||'').trim().slice(0,120)||null,phone:(x.querySelector('input[type=tel]').value||'').trim().slice(0,40)||null,timeline:tl,message:others.length?'Comparing with: '+others.join(', '):null})})}
/* one town picker for both Add and Swap: search any town, or pick from towns like the ones on the page */
function picker(title,simTitle,sim,verb,onPick){
 const item=(k,t)=>'<button type="button" data-to="'+k+'"><i style="background-image:url(\''+PSZ(t.img,'t')+'\')"></i><span>'+esc(t.s)+'<small>'+esc(t.rg)+'</small></span><em>'+verb+'</em></button>';
 const b=modal('<h3>'+title+'</h3><div class="srch"><input id="sq" type="search" placeholder="Search any coastal town" autocomplete="off" aria-label="Search for a town"></div><div class="sim" id="sr"><div class="l">'+simTitle+'</div>'+sim.map(x=>item(x,TW[x])).join('')+'</div>');
 const q=b.querySelector('#sq'),r=b.querySelector('#sr'),base=r.innerHTML,have=new Set(ids);setTimeout(()=>q.focus(),60);
 const wire=()=>r.querySelectorAll('[data-to]').forEach(x=>x.onclick=()=>onPick(x.dataset.to));wire();
 q.oninput=()=>{const v=q.value.trim().toLowerCase();if(!v){r.innerHTML=base;wire();return}const m=Object.entries(TW).filter(([k,t])=>!have.has(k)&&(t.s.toLowerCase().includes(v)||((window.FCAKA||{})[k]||'').toLowerCase().includes(v)||t.rg.toLowerCase().includes(v))).slice(0,6);
  r.innerHTML=m.length?m.map(([k,t])=>item(k,t)).join(''):'<p class="msub">No town by that name</p>';wire()};
 q.onkeydown=e=>{if(e.key==='Enter'){const f=r.querySelector('[data-to]');f&&onPick(f.dataset.to)}}}
let swapId=null;
function swap(id){swapId=id;const t=TW[id];picker('Swap '+esc(t.s)+' for','Towns like '+esc(t.s),similar(5,[id]),'Swap in',doSwap)}
function addSheet(){const n=ids.length;picker(addLabel(n),n?'Or a similar town':'Popular places to start',similar(6),'+ Add',to=>{closeM();add(to)})}
function flash(i){document.querySelectorAll('#cmp .grid').forEach(g=>{const cells=[...g.children].filter(c=>!c.classList.contains('lab')&&!c.classList.contains('more'));const c=cells[i];if(c){c.classList.remove('flash');void c.offsetWidth;c.classList.add('flash')}})}
function doSwap(to){const i=ids.indexOf(swapId);if(i<0||!TW[to])return;ids[i]=to;closeM();save();render();flash(i);window.FC&&FC.track&&FC.track('compare_swap',to)}
function add(id){if(!TW[id]||ids.includes(id)||ids.length>=MAX)return;ids.push(id);save();render();flash(ids.length-1);window.FC&&FC.track&&FC.track('compare_add',id)}
function stick(){const h=document.querySelector('.heads'),s=$('stick');if(!h){s.classList.remove('on');return}const hd=document.querySelector('header'),hb=hd?Math.max(0,hd.getBoundingClientRect().bottom):0;s.style.top=hb+'px';s.classList.toggle('on',h.getBoundingClientRect().bottom<hb+4)}
/* one click handler for the whole page */
document.addEventListener('click',e=>{const g=e.target.closest('button,a');
 const inf=e.target.closest('.inf');if(inf){e.preventDefault();pop(inf);return}
 if(!e.target.closest('.pop'))closePop();if(!g)return;
 if(g.dataset.ask){e.preventDefault();ask(g.dataset.ask)}
 else if(g.dataset.swap){e.preventDefault();swap(g.dataset.swap)}
 else if(g.dataset.rm){ids=ids.filter(x=>x!==g.dataset.rm);save();render()}
 else if(g.hasAttribute('data-addsheet'))addSheet();
 else if(g.hasAttribute('data-start')){ids=START.slice();save();render()}});
addEventListener('keydown',e=>{if(e.key==='Escape'){closeM();closePop()}});
addEventListener('scroll',stick,{passive:true});
save();render();
