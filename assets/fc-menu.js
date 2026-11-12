/* Florida Coastal mobile menu. One menu for every preview page.
   Reads the header's own links (a[data-nav]) so paths stay right on every page. */
(function(){
  if(window.__fcMenu)return;window.__fcMenu=1;
  (function(){if(document.querySelector('script[src*="fc-search.js"]'))return;var me=document.currentScript&&document.currentScript.src,sc=document.createElement('script');sc.src=me?me.replace('fc-menu.js','fc-search.js'):'/assets/fc-search.js';sc.defer=true;document.head.appendChild(sc)})();
  var MQ='(max-width:760px)';
  function ready(f){document.readyState!='loading'?f():document.addEventListener('DOMContentLoaded',f)}
  ready(function(){
    var hdr=document.querySelector('header');if(!hdr)return;
    var links=[].slice.call(hdr.querySelectorAll('a[data-nav]'));if(!links.length)return;
    var quiz=hdr.querySelector('a[href*="quiz-photo"]');
    var quizHref=quiz?quiz.href:new URL('/quiz-photo.html',location.href).href;
    var townsHref=links[0].href.split('?')[0];
    var logo=hdr.querySelector('img');
    var logoSrc=new URL('/img/fc-logo-black.png',location.href).href;

    var css=document.createElement('style');
    css.textContent=
    '.fcm-btn{display:none}'+
    '@media (min-width:761px){html body header a.fcq.fcq:not(#fcx){display:inline-flex!important;align-items:center;background:#152A2E!important;color:#fff!important;border:0!important;border-radius:999px!important;padding:10px 20px!important;font-weight:600!important;font-size:15px!important;letter-spacing:0!important;line-height:1.2!important;text-decoration:none!important;box-shadow:none!important;transition:background .2s}html body header a.fcq.fcq:not(#fcx):hover{background:#0B1C1F!important}html body header.fcq-dark a.fcq.fcq:not(#fcx){background:#fff!important;color:#152A2E!important}html body header.fcq-dark a.fcq.fcq:not(#fcx):hover{background:rgba(255,255,255,.88)!important}header a.fcq:before,header a.fcq:after{display:none!important}}'+
    '@media '+MQ+'{'+
      'header #navtoggle{display:none!important}'+
      '.fcm-btn{display:flex;position:absolute;right:14px;top:50%;transform:translateY(-50%);z-index:60;width:42px;height:42px;border-radius:50%;border:0;align-items:center;justify-content:center;background:rgba(255,255,255,.55);-webkit-backdrop-filter:blur(18px) saturate(1.2);backdrop-filter:blur(18px) saturate(1.2);border:1px solid rgba(255,255,255,.7);color:#16282c;box-shadow:0 2px 10px rgba(0,0,0,.08);cursor:pointer;-webkit-tap-highlight-color:transparent}'+
      '.fcm-btn svg{width:20px;height:20px}'+
      '.fcm-hasbtn a[href*="quiz-photo"]:not(.fcm a){display:none!important}'+
    '}'+
    '.fcm{position:fixed;inset:0;z-index:9999;background:#fff;color:#16282c;display:flex;flex-direction:column;padding:16px 22px 28px;opacity:0;visibility:hidden;transform:translateY(-8px);transition:opacity .22s,transform .22s,visibility 0s .22s;font-family:inherit;overflow:auto}'+
    '.fcm.on{opacity:1;visibility:visible;transform:none;transition:opacity .22s,transform .22s}'+
    '.fcm-top{display:flex;align-items:center;justify-content:space-between;min-height:44px}'+
    '.fcm-top img{height:30px;width:auto}'+
    '.fcm-x{width:42px;height:42px;border-radius:50%;border:1px solid #e3e0da;background:#fff;display:flex;align-items:center;justify-content:center;color:#16282c;cursor:pointer}'+
    '.fcm-x svg{width:18px;height:18px}'+
    '.fcm form{margin:26px 0 8px;display:flex;align-items:center;gap:10px;border:1px solid #e3e0da;border-radius:999px;padding:0 6px 0 16px;height:50px}'+
    '.fcm form svg{width:18px;height:18px;flex:none;opacity:.6}'+
    '.fcm input{flex:1;border:0;outline:0;font:inherit;font-size:16px;background:transparent;color:inherit;min-width:0}'+
    '.fcm nav{display:flex;flex-direction:column;margin-top:10px}'+
    '.fcm nav a{display:flex;justify-content:space-between;align-items:center;padding:18px 2px;border-bottom:1px solid #eeebe6;color:#16282c;text-decoration:none;font-size:22px;letter-spacing:-.01em}'+
    '.fcm nav a.cur{font-weight:600}'+
    '.fcm nav a span{opacity:.35;font-size:18px}'+
    '.fcm .fcm-cta{margin-top:auto;padding-top:28px}'+
    '.fcm .fcm-cta a{display:block;text-align:center;background:#16282c;color:#fff;text-decoration:none;border-radius:999px;padding:16px;font-size:16px;font-weight:600}'+
    '.fcm .fcm-cta p{text-align:center;font-size:13px;color:#6b7473;margin:10px 0 0}'+
    'html.fcm-lock,html.fcm-lock body{overflow:hidden!important}';
    document.head.appendChild(css);

    if(getComputedStyle(hdr).position=='static')hdr.style.position='relative';
    hdr.querySelectorAll('a[href*="quiz-photo"]').forEach(function(q){q.classList.add('fcq')});
    function tone(){var c=getComputedStyle(hdr).backgroundColor,m=c.match(/[\d.]+/g)||[0,0,0,0],al=m.length>3?+m[3]:1,l=(+m[0]*.3+ +m[1]*.59+ +m[2]*.11);hdr.classList.toggle('fcq-dark',al<.35||l<90)}
    tone();addEventListener('scroll',tone,{passive:true});setTimeout(tone,400);
    hdr.classList.add('fcm-hasbtn');
    if(hdr.querySelector('img[src*="fc-logo-white"]')&&!hdr.classList.contains('top')){hdr.classList.add('fc-onphoto');var g=document.createElement('style');g.textContent=
      'header.fc-onphoto img[src*="fc-logo-white"]{height:42px!important;width:auto!important}'+
      '@media '+MQ+'{header.fc-onphoto img[src*="fc-logo-white"]{height:40px!important}'+
      'html body header.fc-onphoto .fcm-btn{background:rgba(255,255,255,.16)!important;-webkit-backdrop-filter:blur(18px) saturate(1.2);backdrop-filter:blur(18px) saturate(1.2);border:1px solid rgba(255,255,255,.4)!important;color:#fff!important;box-shadow:none!important}}';document.head.appendChild(g)}

    var ICON_MENU='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 7h16M4 12h16M4 17h16"/></svg>';
    var ICON_X='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>';
    var btn=document.createElement('button');
    btn.className='fcm-btn';btn.type='button';btn.setAttribute('aria-label','Open menu');btn.setAttribute('aria-expanded','false');btn.innerHTML=ICON_MENU;
    hdr.appendChild(btn);
    // Nov 12: on phone the menu button follows you down the page (fixed glass circle, dark icon once past the header)
    (function(){var g=document.createElement('style');g.textContent='@media '+MQ+'{html body .fcm-btn.fcm-follow:not(#x){position:fixed!important;top:calc(10px + env(safe-area-inset-top,0px))!important;right:14px!important;transform:none!important;z-index:75!important;background:rgba(255,255,255,.72)!important;-webkit-backdrop-filter:blur(18px) saturate(1.3);backdrop-filter:blur(18px) saturate(1.3);border:1px solid rgba(255,255,255,.8)!important;color:#16282c!important;box-shadow:0 4px 16px rgba(10,20,22,.14)!important;animation:fcmIn .22s ease}@keyframes fcmIn{from{opacity:0;transform:scale(.85)}to{opacity:1;transform:none}}}';document.head.appendChild(g);
     var mq=matchMedia(MQ),pos=getComputedStyle(hdr).position,stuck=pos=='fixed'||pos=='sticky',on=false,raf=0;
     function upd(){raf=0;if(btn.classList.contains('fcm-float'))return;var want=mq.matches&&!stuck&&hdr.getBoundingClientRect().bottom<4;if(want==on)return;on=want;
      if(on){document.body.appendChild(btn);btn.classList.add('fcm-follow')}else{btn.classList.remove('fcm-follow');hdr.appendChild(btn)}}
     addEventListener('scroll',function(){if(!raf)raf=requestAnimationFrame(upd)},{passive:true});addEventListener('resize',upd);upd()})();

    var here=location.pathname+location.search;
    var homeHref=new URL('/home-v2.html',location.href).href,hp=new URL(homeHref).pathname;
    var extra=function(href,label,isCur){return '<a href="'+href+'"'+(isCur?' class="cur" aria-current="page"':'')+'>'+label+'<span>→</span></a>'};
    var items=extra(homeHref,'Home',location.pathname==hp||location.pathname=='/'||/\/index\.html$/.test(location.pathname))+links.map(function(a){
      var u=new URL(a.href),cur=a.classList.contains('on')||a.getAttribute('aria-current')=='page'||(u.pathname+u.search)==here;
      return '<a href="'+a.href+'"'+(cur?' class="cur" aria-current="page"':'')+'>'+a.textContent.trim()+'<span>→</span></a>';
    }).join('')+extra(quizHref,'Quiz',/quiz-photo/.test(location.pathname));

    var m=document.createElement('div');
    m.className='fcm';m.setAttribute('role','dialog');m.setAttribute('aria-modal','true');m.setAttribute('aria-label','Menu');
    m.innerHTML='<div class="fcm-top"><a href="'+new URL('/home-v2.html',location.href).href+'"><img src="'+logoSrc+'" alt="Florida Coastal"></a><button class="fcm-x" type="button" aria-label="Close menu">'+ICON_X+'</button></div>'+
      '<form role="search"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><circle cx="11" cy="11" r="6.5"/><path d="M16 16l4.5 4.5"/></svg><input type="search" placeholder="Search a town or region" aria-label="Search towns" autocomplete="off"></form>'+
      '<nav aria-label="Main">'+items+'</nav>'+
      '<div class="fcm-cta"><a href="'+quizHref+'">Take the quiz</a><p>8 quick questions. Your top 5 towns.</p></div>';
    document.body.appendChild(m);

    function open(){m.classList.add('on');document.documentElement.classList.add('fcm-lock');btn.setAttribute('aria-expanded','true');setTimeout(function(){m.querySelector('.fcm-x').focus()},50)}
    function close(){m.classList.remove('on');document.documentElement.classList.remove('fcm-lock');btn.setAttribute('aria-expanded','false')}
    btn.addEventListener('click',open);
    m.querySelector('.fcm-x').addEventListener('click',close);
    document.addEventListener('keydown',function(e){if(e.key=='Escape')close()});
    m.querySelector('form').addEventListener('submit',function(e){e.preventDefault();var q=m.querySelector('input').value.trim();location.href=townsHref+(q?'?q='+encodeURIComponent(q):'')});
    var mi=m.querySelector('form input');mi.addEventListener('focus',function(){if(window.FCS){mi.blur();close();FCS.open(mi.value)}});
    window.matchMedia(MQ).addEventListener&&window.matchMedia(MQ).addEventListener('change',function(e){if(!e.matches)close()});
  });
})();
