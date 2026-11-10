/* Florida Coastal redesign: tracking and lead capture for the new pages.
   On floridacoastal.co it behaves like the live site (pageviews, events, leads with status "new",
   which fire the Zapier alert and the email sequence).
   Anywhere else (the Vercel preview) it only records quiz top 5s, tagged utm=preview,
   and saves leads with status "preview" so no alert or email ever goes out. */
(function () {
  var API = 'https://npryrsprxlulqialxbap.supabase.co/rest/v1/',
    KEY = 'sb_publishable_2E5Ec9fdnr_aoTZkeMyG4Q_GwTxtrK0',
    BOT = /bot\b|bot\/|crawl|spider|slurp|headless|lighthouse|pagespeed|facebookexternalhit/i,
    LIVE = /(^|\.)floridacoastal\.co$/.test(location.hostname) && !navigator.webdriver && !BOT.test(navigator.userAgent || ''),
    PREVIEW_EVENTS = ['quiz_top5'];
  function ss(k) { try { return sessionStorage.getItem(k); } catch (e) { return null; } }
  var SID = (function () {
    try { var s = sessionStorage.getItem('fc-sid'); if (!s) { s = Math.random().toString(36).slice(2, 10) + Date.now().toString(36); sessionStorage.setItem('fc-sid', s); } return s; }
    catch (e) { return 'nostore' + Math.random().toString(36).slice(2, 8); }
  })();
  try {
    if (ss('fc-ref') === null) sessionStorage.setItem('fc-ref', document.referrer || '');
    var q = new URLSearchParams(location.search), u = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content'].map(function (k) { return q.get(k) ? k.slice(4) + '=' + q.get(k) : ''; }).filter(Boolean).join('&');
    if (u && !ss('fc-utm')) sessionStorage.setItem('fc-utm', u);
  } catch (e) {}
  var PATH = function () { return ((LIVE ? '' : '/preview') + location.pathname + location.hash).slice(0, 300); };
  var UTM = function () { return LIVE ? (ss('fc-utm') || null) : 'preview'; };
  function post(t, b) {
    return fetch(API + t, { method: 'POST', keepalive: true, headers: { apikey: KEY, 'Content-Type': 'application/json', Prefer: 'return=minimal' }, body: JSON.stringify(b) });
  }
  function track(e, d) {
    if (!LIVE && PREVIEW_EVENTS.indexOf(e) < 0) return;
    try {
      post('fc_events', { sid: SID, event: e, detail: d == null ? null : String(d).slice(0, 500), path: PATH(), referrer: (ss('fc-ref') || '').slice(0, 300) || null, utm: UTM(), device: innerWidth < 700 ? 'phone' : 'desktop', ua: (navigator.userAgent || '').slice(0, 300), screen: (screen.width + 'x' + screen.height).slice(0, 20), lang: (navigator.language || '').slice(0, 20) }).catch(function () {});
    } catch (x) {}
  }
  function lead(o) {
    var b = Object.assign({ status: LIVE ? 'new' : 'preview', page: PATH(), referrer: (ss('fc-ref') || '').slice(0, 500) || null, utm: UTM() }, o);
    return post('fc_leads', b).then(function (r) {
      if (!r.ok) throw new Error(r.status);
      track('lead', o.kind);
      return { ok: true, preview: !LIVE };
    });
  }
  var EMAIL = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
  /* Wire a form (or any box) that holds an email input and a button. */
  function bind(box, opts) {
    if (!box || box.__fc) return; box.__fc = 1;
    var btn = opts.button ? box.querySelector(opts.button) : box.querySelector('button[type=submit],button'),
      em = box.querySelector('input[type=email]') || box.querySelector('input:not([type=hidden]):not([name=website])');
    var go = function (ev) {
      if (ev) ev.preventDefault();
      var hp = box.querySelector('input[name=website]'); if (hp && hp.value) return;
      var email = (em && em.value || '').trim();
      if (!EMAIL.test(email)) { if (em) { em.style.borderColor = '#B3261E'; em.focus(); } return; }
      if (em) em.style.borderColor = '';
      var extra = opts.extra ? opts.extra(box) : {}, label = btn ? btn.textContent : '';
      if (btn) { btn.disabled = true; btn.textContent = 'Sending...'; }
      lead(Object.assign({ kind: opts.kind, email: email }, extra)).then(function (r) {
        done(r.preview ? (opts.thanks || 'Got it.') + ' (Preview: saved as a test, no email sent.)' : (opts.thanks || 'Got it. Check your inbox.'));
      }).catch(function () {
        if (!LIVE) { done('Preview only: this form works once the new site is live. Nothing was sent.'); return; }
        if (btn) { btn.disabled = false; btn.textContent = label; }
        var p = box.querySelector('.fc-err') || document.createElement('p'); p.className = 'fc-err'; p.style.cssText = 'color:#B3261E;font-size:14px;margin:8px 0 0';
        p.textContent = "That didn't send. Check your connection and try again."; box.appendChild(p);
      });
    };
    function done(msg) {
      var p = document.createElement('p'); p.className = 'fc-done'; p.setAttribute('role', 'status');
      p.style.cssText = 'margin:10px 0 0;font-size:15px;line-height:1.45;font-weight:500';
      p.textContent = msg;
      if (box.tagName === 'FORM') { box.style.display = 'none'; box.insertAdjacentElement('afterend', p); }
      else { if (btn) btn.style.display = 'none'; box.appendChild(p); }
      if (opts.after) opts.after();
    }
    if (box.tagName === 'FORM') { box.removeAttribute('onsubmit'); box.onsubmit = go; } else if (btn) btn.onclick = go;
  }
  window.FC = { track: track, lead: lead, bind: bind, LIVE: LIVE, SID: SID };
  if (LIVE) track('pageview');
  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('form.fx-sign').forEach(function (f) { bind(f, { kind: 'newsletter', thanks: "You're on the list. New guides land in your inbox." }); });
  });
})();
