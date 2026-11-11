/* Florida Coastal site search. One panel on every page: towns, regions and guides as you type. */
(function(){
  if(window.FCS)return;
  var me=document.currentScript&&document.currentScript.src||'';
  var ROOT=me?me.replace(/assets\/fc-search\.js.*$/,''):new URL('/',location.href).href;
  var U=function(p){return new URL(p,ROOT).href};
  var IDX=null,loading=null;
  function load(){if(IDX)return Promise.resolve(IDX);if(loading)return loading;loading=fetch(U('assets/search-index.json')).then(function(r){return r.json()}).then(function(d){IDX=d;return d});return loading}
  var esc=function(s){return String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/"/g,'&quot;')};
  var norm=function(s){return String(s||'').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g,'').replace(/[^a-z0-9 ]/g,' ').replace(/\s+/g,' ').trim()};
  var SVG='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" aria-hidden="true"><circle cx="11" cy="11" r="6.5"/><path d="M16 16l4.5 4.5"/></svg>';

  var css=document.createElement('style');
  css.textContent=
  '.fcs-ic{display:inline-flex;align-items:center;justify-content:center;width:40px;height:40px;border-radius:50%;border:0;background:transparent;color:inherit;cursor:pointer;padding:0;flex:none}'+
  '.fcs-ic svg{width:20px;height:20px}.fcs-ic:hover{background:rgba(127,127,127,.12)}'+
  '@media (max-width:760px){.fcs-ic{display:none!important}}'+
  '.fcs{position:fixed;inset:0;z-index:10000;display:none;font-family:"DM Sans",system-ui,sans-serif;color:#152A2E}.fcs.on{display:block}'+
  '.fcs-bg{position:absolute;inset:0;background:rgba(15,22,24,.45)}'+
  '.fcs-box{position:relative;max-width:680px;margin:72px auto 0;background:#fff;border-radius:20px;box-shadow:0 24px 70px rgba(0,0,0,.25);overflow:hidden;max-height:calc(100vh - 110px);display:flex;flex-direction:column}'+
  '.fcs-top{display:flex;align-items:center;gap:12px;padding:16px 18px;border-bottom:1px solid #EEEBE6}'+
  '.fcs-top svg{width:22px;height:22px;flex:none;opacity:.6}'+
  '.fcs-top input::-webkit-search-cancel-button{display:none}.fcs-top input{flex:1;min-width:0;border:0;outline:0;font:inherit;font-size:19px;background:transparent;color:#152A2E}'+
  '.fcs-x{border:0;background:#F2EFEA;border-radius:999px;padding:7px 12px;font:inherit;font-size:14px;font-weight:600;color:#152A2E;cursor:pointer}'+
  '.fcs-res{overflow:auto;padding:8px 8px 14px}'+
  '.fcs-h{font-size:12.5px;font-weight:500;letter-spacing:.1em;text-transform:uppercase;color:#5A6B6E;margin:14px 12px 6px}'+
  '.fcs-it{display:flex;align-items:center;gap:14px;padding:9px 12px;border-radius:12px;color:#152A2E;text-decoration:none}'+
  '.fcs-it:hover,.fcs-it.on{background:#F2EFEA}'+
  '.fcs-it i{width:52px;height:40px;border-radius:8px;background:#E9E6E0 center/cover;flex:none}'+
  '.fcs-it i.dot{width:40px;height:40px;border-radius:50%;display:grid;place-items:center;font-style:normal;background:#EEF4F2;color:#1F7A6A}.fcs-it i.dot svg{width:18px;height:18px}'+
  '.fcs-it span{flex:1;min-width:0}.fcs-it b{display:block;font-size:16px;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}'+
  '.fcs-it small{display:block;font-size:13.5px;color:#5A6B6E;margin-top:1px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}'+
  '.fcs-it em{font-style:normal;font-size:14px;font-weight:600;color:#3E4F52;flex:none}'+
  '.fcs-it mark{background:none;color:inherit;text-decoration:underline;text-decoration-color:#1F7A6A;text-underline-offset:3px}'+
  '.fcs-none{padding:18px 12px 4px;font-size:15.5px;color:#3E4F52}'+
  '.fcs-foot{border-top:1px solid #EEEBE6;padding:12px 20px;font-size:13px;color:#5A6B6E;display:flex;justify-content:space-between}'+
  '@media (max-width:760px){.fcs-box{margin:0;border-radius:0;max-height:none;height:100%}.fcs-foot{display:none}.fcs-top input{font-size:17px}}'+
  'html.fcs-lock,html.fcs-lock body{overflow:hidden!important}';
  document.head.appendChild(css);

  var el=document.createElement('div');el.className='fcs';el.setAttribute('role','dialog');el.setAttribute('aria-modal','true');el.setAttribute('aria-label','Search');
  el.innerHTML='<div class="fcs-bg"></div><div class="fcs-box"><div class="fcs-top">'+SVG+'<input type="search" placeholder="Search a town, region or guide" aria-label="Search towns, regions and guides" autocomplete="off" spellcheck="false"><button class="fcs-x" type="button">Close</button></div><div class="fcs-res" role="listbox"></div><div class="fcs-foot"><span>↑ ↓ to move · Enter to open</span><span>Esc to close</span></div></div>';
  var inp=el.querySelector('input'),res=el.querySelector('.fcs-res'),sel=0,items=[];
  function ready(f){document.body?f():document.addEventListener('DOMContentLoaded',f)}
  ready(function(){document.body.appendChild(el)});

  function hi(text,q){if(!q)return esc(text);var t=String(text),i=norm(t).indexOf(q);if(i<0)return esc(t);return esc(t.slice(0,i))+'<mark>'+esc(t.slice(i,i+q.length))+'</mark>'+esc(t.slice(i+q.length))}
  var PIN='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 21s7-6.2 7-11.5A7 7 0 0 0 5 9.5C5 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/></svg>';
  var BOOK='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 5h6a2 2 0 0 1 2 2v12a2 2 0 0 0-2-2H4zM20 5h-6a2 2 0 0 0-2 2v12a2 2 0 0 1 2-2h6z"/></svg>';
  function town(t,q){return '<a class="fcs-it" href="'+U('towns/'+t.i+'-v3.html')+'"><i style="background-image:url(\''+U(t.img)+'\')"></i><span><b>'+hi(t.n,q)+'</b><small>'+esc(t.r)+'</small></span>'+(t.p?'<em>'+esc(t.p)+'</em>':'')+'</a>'}
  function region(r,q){return '<a class="fcs-it" href="'+U('towns/index-v2.html#'+r.c+'/'+r.i)+'"><i class="dot">'+PIN+'</i><span><b>'+hi(r.n,q)+'</b><small>'+r.k+' beach towns</small></span></a>'}
  function art(a,q){return '<a class="fcs-it" href="'+U(a.u)+'"><i class="dot">'+BOOK+'</i><span><b>'+hi(a.n,q)+'</b><small>Guide</small></span></a>'}
  function score(name,q){var n=norm(name);if(n===q)return 0;if(n.indexOf(q)===0)return 1;if((' '+n).indexOf(' '+q)>=0)return 2;if(n.indexOf(q)>=0)return 3;return 9}
  function render(){
    var q=norm(inp.value),h='';
    if(!IDX){res.innerHTML='<p class="fcs-none">Loading…</p>';return}
    if(q.length<2){
      var P=IDX.pop.map(function(i){return IDX.t.find(function(t){return t.i===i})}).filter(Boolean);
      h='<div class="fcs-h">Most explored this month</div>'+P.map(function(t){return town(t,'')}).join('')+
        '<div class="fcs-h">Not sure where to start?</div><a class="fcs-it" href="'+U('quiz-photo.html')+'"><i class="dot">'+PIN+'</i><span><b>Take the quiz</b><small>8 quick questions, your top 5 towns</small></span></a>';
    }else{
      var T=IDX.t.map(function(t){return [score(t.n,q),t]}).filter(function(x){return x[0]<9}).sort(function(a,b){return a[0]-b[0]||a[1].n.localeCompare(b[1].n)}).slice(0,6).map(function(x){return x[1]});
      var R=IDX.r.map(function(r){return [Math.min(score(r.n,q),score(r.n.replace(/^The /,''),q)),r]}).filter(function(x){return x[0]<9}).sort(function(a,b){return a[0]-b[0]}).slice(0,3).map(function(x){return x[1]});
      if(!T.length)T=IDX.t.filter(function(t){return norm(t.r).indexOf(q)>=0}).slice(0,4);
      var A=IDX.a.map(function(a){return [score(a.n,q),a]}).filter(function(x){return x[0]<9}).sort(function(a,b){return a[0]-b[0]}).slice(0,3).map(function(x){return x[1]});
      if(T.length)h+='<div class="fcs-h">Towns</div>'+T.map(function(t){return town(t,q)}).join('');
      if(R.length)h+='<div class="fcs-h">Regions</div>'+R.map(function(r){return region(r,q)}).join('');
      if(A.length)h+='<div class="fcs-h">Guides</div>'+A.map(function(a){return art(a,q)}).join('');
      if(!h)h='<p class="fcs-none">No town, region or guide matches “'+esc(inp.value.trim())+'”.</p><a class="fcs-it" href="'+U('towns/index-v2.html')+'"><i class="dot">'+PIN+'</i><span><b>See all 167 beach towns</b><small>Browse by region or A to Z</small></span></a>';
    }
    res.innerHTML=h;items=[].slice.call(res.querySelectorAll('.fcs-it'));sel=0;mark();
  }
  function mark(){items.forEach(function(a,i){a.classList.toggle('on',i===sel)});var a=items[sel];a&&a.scrollIntoView({block:'nearest'})}
  inp.addEventListener('input',render);
  inp.addEventListener('keydown',function(e){
    if(e.key==='ArrowDown'){e.preventDefault();sel=Math.min(items.length-1,sel+1);mark()}
    else if(e.key==='ArrowUp'){e.preventDefault();sel=Math.max(0,sel-1);mark()}
    else if(e.key==='Enter'){e.preventDefault();var a=items[sel];if(a){try{window.FC&&FC.track&&FC.track('search',inp.value.trim().slice(0,80))}catch(x){}location.href=a.href}}
  });
  function open(q){el.classList.add('on');document.documentElement.classList.add('fcs-lock');inp.value=q||'';load().then(render);render();setTimeout(function(){inp.focus()},30)}
  function close(){el.classList.remove('on');document.documentElement.classList.remove('fcs-lock')}
  el.querySelector('.fcs-bg').onclick=close;el.querySelector('.fcs-x').onclick=close;
  document.addEventListener('keydown',function(e){
    if(e.key==='Escape'&&el.classList.contains('on'))close();
    else if((e.key==='/'&&!/INPUT|TEXTAREA|SELECT/.test((document.activeElement||{}).tagName))||((e.metaKey||e.ctrlKey)&&e.key.toLowerCase()==='k')){e.preventDefault();open('')}
  });
  window.FCS={open:open,close:close};

  /* header: turn old search forms into the icon, and add the icon where a header has none */
  ready(function(){
    var hdr=document.querySelector('header');if(!hdr)return;
    var mk=function(){var b=document.createElement('button');b.type='button';b.className='fcs-ic';b.setAttribute('aria-label','Search towns, regions and guides');b.innerHTML=SVG;b.onclick=function(){open('')};return b};
    var f=hdr.querySelector('#navSearch,form.navsearch');
    if(f)f.remove();
    var q=hdr.querySelector('a[href*="quiz-photo"]'),b=mk();if(q&&q.parentNode)q.parentNode.insertBefore(b,q);else hdr.appendChild(b);
    var ref=hdr.querySelector('nav a:not([href*="quiz-photo"])'),tint=function(){if(ref)b.style.color=getComputedStyle(ref).color};tint();addEventListener('scroll',tint,{passive:true});setTimeout(tint,500);
    load();
  });
})();
