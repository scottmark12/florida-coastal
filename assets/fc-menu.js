/* Florida Coastal mobile menu. One menu for every preview page.
   Reads the header's own links (a[data-nav]) so paths stay right on every page. */
(function(){
  if(window.__fcMenu)return;window.__fcMenu=1;
  var MQ='(max-width:760px)';
  function ready(f){document.readyState!='loading'?f():document.addEventListener('DOMContentLoaded',f)}
  ready(function(){
    var hdr=document.querySelector('header');if(!hdr)return;
    var links=[].slice.call(hdr.querySelectorAll('a[data-nav]'));if(!links.length)return;
    var quiz=hdr.querySelector('a[href*="quiz-photo"]');
    var quizHref=quiz?quiz.href:new URL('/quiz-photo.html',location.href).href;
    var townsHref=links[0].href.split('?')[0];
    var logo=hdr.querySelector('img');
    var logoSrc=new URL('/img/fc-logo-arch-line2.png',location.href).href;

    var css=document.createElement('style');
    css.textContent=
    '.fcm-btn{display:none}'+
    '@media '+MQ+'{'+
      'header #navtoggle{display:none!important}'+
      '.fcm-btn{display:flex;position:absolute;right:14px;top:50%;transform:translateY(-50%);z-index:60;width:42px;height:42px;border-radius:50%;border:0;align-items:center;justify-content:center;background:rgba(255,255,255,.92);color:#16282c;box-shadow:0 2px 10px rgba(0,0,0,.12);cursor:pointer;-webkit-tap-highlight-color:transparent}'+
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
    hdr.classList.add('fcm-hasbtn');

    var ICON_MENU='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 7h16M4 12h16M4 17h16"/></svg>';
    var ICON_X='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>';
    var btn=document.createElement('button');
    btn.className='fcm-btn';btn.type='button';btn.setAttribute('aria-label','Open menu');btn.setAttribute('aria-expanded','false');btn.innerHTML=ICON_MENU;
    hdr.appendChild(btn);

    var here=location.pathname+location.search;
    var items=links.map(function(a){
      var u=new URL(a.href),cur=a.classList.contains('on')||a.getAttribute('aria-current')=='page'||(u.pathname+u.search)==here;
      return '<a href="'+a.href+'"'+(cur?' class="cur" aria-current="page"':'')+'>'+a.textContent.trim()+'<span>→</span></a>';
    }).join('');

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
    window.matchMedia(MQ).addEventListener&&window.matchMedia(MQ).addEventListener('change',function(e){if(!e.matches)close()});
  });
})();
