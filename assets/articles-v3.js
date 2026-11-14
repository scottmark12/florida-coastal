/* Nov 13: the page ships with this layout already in the HTML (no jump while the app loads); if the article count changed since, it rebuilds once. */
/* Articles page, Nov 12 2026: magazine layout (feature block, style guide shelf, sections by topic).
   Built from the same ARTICLES list the app uses, so new articles show up here on their own. */
(function(){
 var SEC=[['towns','Picking a town'],['costs','Costs and risks'],['moving','Moving tips'],['news','Florida news']];
 function esc(t){return String(t||'').replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}
 function img(a){var f=(a.img||'').split('/').pop().replace(/\.(jpe?g|png)$/,'');return 'img/c/'+f+'.webp'}
 function dt(a){var d=new Date((a.date||'')+'T12:00:00');if(isNaN(d))return '';return d.toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric'})}
 function url(a){return 'articles/'+a.id+'.html'}
 function isStyle(a){return /^best-florida-beach-towns-for-/.test(a.id)}
 function kick(a){return a.kick||a.kicker||a.cat||''}
 function feat(a,big){return '<a class="ax-f'+(big?' big':'')+'" href="'+url(a)+'"><div class="ax-ph"><img src="'+img(a)+'" alt="" '+(big?'fetchpriority="high"':'loading="lazy"')+' decoding="async"></div><time class="ax-dt">'+esc(dt(a))+'</time><h3>'+esc(a.title)+'</h3>'+(big&&a.dek?'<p>'+esc(a.dek)+'</p>':'')+'</a>'}
 function row(a){return '<a class="ax-r" href="'+url(a)+'"><div class="ax-ph"><img src="'+img(a)+'" alt="" loading="lazy" decoding="async"></div><div class="ax-rb"><h3>'+esc(a.title)+'</h3><time class="ax-dt">'+esc(dt(a))+'</time><span class="ax-more">Read more</span></div></a>'}
 function tile(a){return '<a class="ax-t" href="'+url(a)+'"><div class="ax-tp" style="background-image:url(\''+img(a)+'\')"></div><b>'+esc(kick(a))+'</b></a>'}
 function build(){
  var A=(typeof ARTICLES!='undefined'?ARTICLES:[]).slice().sort(function(x,y){return (y.date||'').localeCompare(x.date||'')});if(!A.length)return '';
  var styles=A.filter(isStyle),rest=A.filter(function(a){return !isStyle(a)}),F=rest.slice(0,3),used={};F.forEach(function(a){used[a.id]=1});
  var h='<section class="ax"><div class="ax-mast"><p class="ax-ey">Read up before you move</p><h1>Articles</h1><p class="ax-sub">Guides, honest advice and hidden spots from up and down the Florida coast.</p></div>';
  h+='<nav class="ax-nav" aria-label="Article sections">'+SEC.map(function(s){return '<a href="#ax-'+s[0]+'" data-j="ax-'+s[0]+'">'+s[1]+'</a>'}).join('')+'<a href="#ax-styles" data-j="ax-styles">Style guides</a><label class="ax-q"><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/></svg><input id="axq" type="search" placeholder="Search articles" aria-label="Search articles" autocomplete="off"></label></nav>';
  h+='<div class="ax-res" hidden></div><div class="ax-main">';
  if(F.length)h+='<div class="ax-feat"><div class="ax-side">'+F.slice(1).map(function(a){return feat(a,false)}).join('')+'</div>'+feat(F[0],true)+'</div>';
  if(styles.length)h+='<section class="ax-sec" id="ax-styles"><div class="ax-sh"><h2>Style guides</h2><span class="ax-note">The best towns for each way of living</span></div><div class="ax-shelf">'+styles.map(tile).join('')+'</div></section>';
  SEC.forEach(function(s){var L=rest.filter(function(a){return a.cat===s[1]&&!used[a.id]});if(!L.length)return;
   h+='<section class="ax-sec" id="ax-'+s[0]+'"><div class="ax-sh"><h2>'+s[1]+'</h2>'+(L.length>3?'<button type="button" class="ax-all" data-n="'+L.length+'">View all '+L.length+'</button>':'')+'</div><div class="ax-rows">'+L.map(function(a,i){return row(a).replace('class="ax-r"','class="ax-r'+(i>2?' ax-x':'')+'"')}).join('')+'</div></section>'});
  return h+'</div></section>'}
 function norm(t){return String(t||'').toLowerCase().replace(/<[^>]+>/g,' ')}
 function wire(root){
  root.querySelectorAll('.ax-all').forEach(function(b){b.onclick=function(){var s=b.closest('.ax-sec');var open=s.classList.toggle('open');b.textContent=open?'Show less':'View all '+b.dataset.n}});
  root.querySelectorAll('.ax-nav a[data-j]').forEach(function(a){a.onclick=function(e){e.preventDefault();var t=document.getElementById(a.dataset.j);if(t)scrollTo({top:t.getBoundingClientRect().top+scrollY-90,behavior:'smooth'})}});
  var q=root.querySelector('#axq'),res=root.querySelector('.ax-res'),main=root.querySelector('.ax-main');
  q.oninput=function(){var w=norm(q.value).trim().split(/\s+/).filter(Boolean);if(!w.length){res.hidden=true;main.hidden=false;return}
   var L=(typeof ARTICLES!='undefined'?ARTICLES:[]).filter(function(a){var t=norm([a.title,a.dek,a.kick,a.kicker,a.cat,a.body].join(' '));return w.every(function(x){return t.indexOf(x)>-1})});
   res.innerHTML='<p class="ax-cnt">'+L.length+(L.length==1?' article':' articles')+' for “'+esc(q.value.trim())+'”</p>'+(L.length?'<div class="ax-rows">'+L.map(row).join('')+'</div>':'<p class="ax-none">Nothing matches that yet. Try a town name or a word like insurance.</p>');res.hidden=false;main.hidden=true}}
 function swap(){var app=document.getElementById('app');if(!app)return;var pre=app.querySelector('.ax');if(pre){var N=typeof ARTICLES!='undefined'?String(ARTICLES.length):'';if(N&&pre.dataset.n&&N!==pre.dataset.n){var fh=build();if(fh){var dd=document.createElement('div');dd.innerHTML=fh;var nn=dd.firstChild;nn.dataset.n=N;nn.dataset.w=1;pre.replaceWith(nn);wire(nn)}return}if(!pre.dataset.w){pre.dataset.w=1;wire(pre)}return}var old=app.querySelector('#aq');if(!old)return;var html=build();if(!html)return;
  var ph=app.querySelector('.phero');ph&&ph.remove();var sec=old.closest('section');var d=document.createElement('div');d.innerHTML=html;var n=d.firstChild;sec.replaceWith(n);n.dataset.w=1;wire(n);document.body.classList.add('axon')}
 new MutationObserver(swap).observe(document.documentElement,{childList:true,subtree:true});
 if(document.readyState!='loading')swap();else document.addEventListener('DOMContentLoaded',swap);addEventListener('load',swap);
})();
