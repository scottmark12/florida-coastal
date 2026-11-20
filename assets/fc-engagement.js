/* First-party engagement. Only foreground time within 60s of activity counts.
   Snapshots are cumulative per document, so retries and pagehide cannot double-count. */
(function () {
  if (window.__fcEngagement) return;
  window.__fcEngagement = true;
  var bots = /bot\b|bot\/|crawl|spider|slurp|preview|headless|lighthouse|pagespeed|facebookexternalhit|facebookcatalog|meta-externalagent|embedly|whatsapp|telegram|discord|skypeuripreview|pinterest|google-inspectiontool|googleother|mediapartners|yandex|baidu|semrush|ahrefs|petal|bytespider|chatgpt-user|oai-searchbot|claude|anthropic|perplexity|uptime|pingdom|monitor|python|curl|wget|go-http|java\/|node-fetch|axios|okhttp|phantom|puppeteer|playwright|electron/i;
  if (!/(^|\.)floridacoastal\.co$/.test(location.hostname) || location.hostname === 'admin.floridacoastal.co' || navigator.webdriver || bots.test(navigator.userAgent || '')) return;
  var q = new URLSearchParams(location.search).get('team');
  try {
    if (q === '1') localStorage.setItem('fc-team','1');
    if (q === '0') localStorage.removeItem('fc-team');
  } catch(e) {}
  if (q === '1' || q === '0') document.cookie = 'fc_team='+(q === '1'?'1':'0')+'; domain=.floridacoastal.co; path=/; SameSite=Lax; max-age='+(q === '1'?'31536000':'0')+'; Secure';
  function excluded() {
    try { return q === '1' || /(^|; )fc_team=1/.test(document.cookie) || localStorage.getItem('fc-team') === '1'; }
    catch(e) { return q === '1' || /(^|; )fc_team=1/.test(document.cookie); }
  }
  if (excluded()) return;
  function ss(k) { try { return sessionStorage.getItem(k); } catch(e) { return null; } }
  var sid = ss('fc-sid') || Math.random().toString(36).slice(2,10)+Date.now().toString(36);
  try { sessionStorage.setItem('fc-sid',sid); } catch(e) {}
  var page = Math.random().toString(36).slice(2,10)+Date.now().toString(36),
      last = performance.now(), activity = last, active = 0, sent = -1,
      visible = document.visibilityState === 'visible';
  function emit(event, detail) {
    if(excluded()) return;
    fetch('https://npryrsprxlulqialxbap.supabase.co/rest/v1/fc_events', {
      method:'POST', keepalive:true,
      headers:{apikey:'sb_publishable_2E5Ec9fdnr_aoTZkeMyG4Q_GwTxtrK0','Content-Type':'application/json',Prefer:'return=minimal'},
      body:JSON.stringify({sid:sid,event:event,detail:JSON.stringify(detail).slice(0,500),path:(location.pathname+location.hash).slice(0,300),referrer:(ss('fc-ref')||'').slice(0,300)||null,utm:(ss('fc-utm')||'').slice(0,300)||null,device:innerWidth<700?'phone':'desktop',ua:(navigator.userAgent||'').slice(0,300),screen:(screen.width+'x'+screen.height).slice(0,20),lang:(navigator.language||'').slice(0,40)})
    }).then(function(r){if(!r.ok)console.warn('Florida Coastal analytics event rejected:',event,r.status);}).catch(function(){});
  }
  function tick() {
    var now = performance.now();
    if(visible) active += Math.max(0,Math.min(now,activity+60000)-last);
    last = now;
  }
  /* Scroll depth. depth = how far down the page the bottom of the screen has reached (0 to 100).
     One scroll_depth event per milestone per page view: 25, 50, 75, 90, 100, plus "end" when the
     bottom of the main content (article, else main) comes on screen, so footers don't hide readers
     who finished. Checked on scroll, every 10s and on leave, never at load, so a visitor who
     doesn't move logs nothing new. h = page height in screens, s = engaged seconds so far. */
  var depth = 0, marks = [25,50,75,90,100], hit = {}, pending = 0;
  function measure() {
    pending = 0;
    var de = document.documentElement, b = document.body;
    var full = Math.max(de.scrollHeight, b ? b.scrollHeight : 0), vh = innerHeight || de.clientHeight;
    if (!full || !vh) return;
    var bottom = (scrollY || de.scrollTop || 0) + vh;
    var d = Math.min(100, Math.round(100*bottom/full));
    if (d > depth) depth = d;
    var info = function (m) { tick(); return {v:1,p:page,d:m,s:Math.floor(active/1000),h:Math.round(10*full/vh)/10}; };
    marks.forEach(function (m) { if (depth >= m && !hit[m]) { hit[m] = 1; emit('scroll_depth', info(m)); } });
    if (!hit.end) {
      var main = document.querySelector('article') || document.querySelector('main');
      if (main && main.getBoundingClientRect().bottom <= vh + 40) { hit.end = 1; emit('scroll_depth', info('end')); }
    }
  }
  /* Sections. Pages that label their sections (data-fc-section="name": home, Beach Towns) log one
     section_view per section per page view when it reaches the upper 70% of the screen, so the
     last section logged is where the visitor trailed off. n = section's place on the page (1 = top),
     of = how many labeled sections the page has. Sections already on screen at load are held until
     the first scroll, so visitors who never scroll add nothing beyond their pageview. */
  var secSeen = {}, secQueue = [], scrolled = false, secs = [].slice.call(document.querySelectorAll('[data-fc-section]'));
  function secSend(el) {
    var name = el.getAttribute('data-fc-section');
    if (secSeen[name]) return;
    secSeen[name] = 1; tick();
    emit('section_view', {v:1,p:page,sec:name,n:secs.indexOf(el)+1,of:secs.length,s:Math.floor(active/1000)});
  }
  if (secs.length && 'IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (list) {
      list.forEach(function (en) {
        if (!en.isIntersecting) return;
        io.unobserve(en.target);
        if (scrolled) secSend(en.target); else secQueue.push(en.target);
      });
    }, {rootMargin:'0px 0px -30% 0px', threshold:0});
    secs.forEach(function (el) { io.observe(el); });
  }
  addEventListener('scroll', function () {
    if (!scrolled) { scrolled = true; secQueue.sort(function (a, b) { return secs.indexOf(a) - secs.indexOf(b); }).forEach(secSend); secQueue = []; }
    if (!pending) { pending = 1; requestAnimationFrame(measure); }
  }, {passive:true});
  function flush() {
    tick();
    if (depth || hit.end) measure();
    var seconds = Math.floor(active/1000);
    if(seconds === sent || seconds < 1) return;
    sent = seconds;
    emit('engagement',{v:2,p:page,s:seconds,d:depth});
  }
  function touch() { tick(); activity=performance.now(); }
  ['pointerdown','keydown','scroll','touchstart'].forEach(function(e){addEventListener(e,touch,{passive:true,capture:true});});
  document.addEventListener('visibilitychange',function(){
    flush(); visible=document.visibilityState === 'visible'; last=performance.now();
    if(visible) activity=last;
  });
  addEventListener('pagehide',function(){flush();visible=false;});
  addEventListener('pageshow',function(){visible=document.visibilityState==='visible';last=performance.now();activity=last;});
  setInterval(function(){tick();if(visible)flush();},10000);
  document.addEventListener('click',function(e){
    var a=e.target.closest&&e.target.closest('a[href]');
    if(!a)return;
    var u;try{u=new URL(a.href,location.href);}catch(x){return;}
    if(!/^https?:$/.test(u.protocol))return;
    // Paths only: never capture form values, email addresses, search terms or URL queries.
    emit('link_click',{to:(u.origin===location.origin?'':u.origin)+u.pathname.slice(0,220)});
  },{capture:true});
})();
