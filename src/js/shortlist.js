/* Florida Coastal Shortlist (Nov 19 2026, preview).
   One list of saved towns for the whole site, kept in this browser (localStorage fc-shortlist).
   - FCS API: add, remove, toggle, has, list, react, onChange, share, ask
   - Header heart with a count, linking to /shortlist
   - A short toast on save
   - The "Follow these towns" ask on the second save, then 3 one tap questions (fc_lead_profile)
   - On town pages: Share and Save in the line above the photos, and a heart on the main photo
   Leads go in as kind "matches" with the saved towns, so they ride the existing email sequence.
   On the Vercel preview fc-connect saves them with status "preview": nothing is sent. */
(function () {
  if (window.FCS) return;
  var KEY = 'fc-shortlist', MAX = 10;
  var API = 'https://npryrsprxlulqialxbap.supabase.co/rest/v1/', AKEY = 'sb_publishable_2E5Ec9fdnr_aoTZkeMyG4Q_GwTxtrK0';
  var subs = [];
  function ls(k, v) { try { if (v === undefined) return localStorage.getItem(k); if (v === null) localStorage.removeItem(k); else localStorage.setItem(k, v); } catch (e) { return null; } }
  function ss(k, v) { try { if (v === undefined) return sessionStorage.getItem(k); sessionStorage.setItem(k, v); } catch (e) { return null; } }
  function list() { try { return (JSON.parse(ls(KEY) || '[]') || []).filter(function (t) { return t && t.id; }); } catch (e) { return []; } }
  function store(l) { ls(KEY, JSON.stringify(l.slice(0, MAX))); fire(); }
  function fire() { var l = list(); subs.forEach(function (f) { try { f(l); } catch (e) {} }); }
  function has(id) { return list().some(function (t) { return t.id === id; }); }
  function track(e, d) { if (window.FC) FC.track(e, d); }
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function plural(n) { return n === 1 ? '1 town' : n + ' towns'; }
  function followed() { return !!(ls('fc-mail') || ls('fc-sl-followed')); }

  function add(t, from) {
    var l = list();
    if (l.some(function (x) { return x.id === t.id; })) return false;
    if (l.length >= MAX) { toast('Your Shortlist holds ' + MAX + ' towns. Remove one to add ' + t.name + '.', 'View', '/shortlist'); return false; }
    l.push({ id: t.id, name: t.name, img: t.img || '', from: from || 'town page', react: null });
    store(l); track('shortlist_save', t.id + ' · ' + (from || 'town page') + ' · #' + l.length);
    afterSave(l, t);
    return true;
  }
  function remove(id) { var l = list().filter(function (t) { return t.id !== id; }); store(l); track('shortlist_remove', id); }
  function toggle(t, from) { if (has(t.id)) { remove(t.id); return false; } return add(t, from); }
  function react(id, r) { var l = list(); l.forEach(function (t) { if (t.id === id) t.react = t.react === r ? null : r; }); store(l); track('shortlist_react', id + ' ' + r); }
  function onChange(f) { subs.push(f); }
  addEventListener('storage', function (e) { if (e.key === KEY) fire(); });

  function shareUrl(l) {
    l = l || list();
    return location.origin + '/shortlist?t=' + l.map(function (t) { return t.id + (t.react ? ':' + t.react.charAt(0) : ''); }).join(',');
  }
  function share(l, label) {
    var url = shareUrl(l), n = (l || list()).length;
    track('shortlist_share', String(n));
    var data = { title: 'Our Florida Shortlist', text: label || ('The ' + plural(n) + ' on our Florida Shortlist'), url: url };
    if (navigator.share && matchMedia('(pointer:coarse)').matches) { navigator.share(data).catch(function () {}); return; }
    (navigator.clipboard ? navigator.clipboard.writeText(url) : Promise.reject()).then(function () { toast('Link copied. Send it to whoever you\'re moving with.'); }, function () { prompt('Copy this link', url); });
  }

  /* ---------- styles ---------- */
  function css() {
    if (document.getElementById('fcs-css')) return;
    var s = document.createElement('style'); s.id = 'fcs-css';
    s.textContent =
      '.fcs-hd{position:relative;display:inline-flex;align-items:center;justify-content:center;width:40px;height:40px;border-radius:50%;color:#152A2E;text-decoration:none;flex:none;margin-right:2px}' +
      '.fcs-hd:hover{background:#F3F1EC}.fcs-hd svg{width:22px;height:22px}.fcs-hd path{fill:none;stroke:currentColor;stroke-width:1.9}' +
      '.fcs-hd.on path{fill:#C2873A;stroke:#C2873A}' +
      '.fcs-hd b{position:absolute;top:2px;right:0;min-width:17px;height:17px;padding:0 4px;border-radius:9px;background:#152A2E;color:#fff;font:700 11px/17px "DM Sans",system-ui,sans-serif;text-align:center;box-sizing:border-box}' +
      '.fcs-hd.bump svg{animation:fcsb .4s ease}@keyframes fcsb{40%{transform:scale(1.3)}}' +
      '.fcs-toast{position:fixed;left:50%;bottom:calc(18px + env(safe-area-inset-bottom));z-index:80;transform:translate(-50%,20px);opacity:0;pointer-events:none;transition:.25s;background:#152A2E;color:#fff;border-radius:999px;padding:11px 12px 11px 18px;display:flex;align-items:center;gap:14px;font:500 15px/1.3 "DM Sans",system-ui,sans-serif;box-shadow:0 10px 30px rgba(21,42,46,.28);max-width:calc(100% - 28px)}' +
      '.fcs-toast span{white-space:nowrap}.fcs-toast.in{opacity:1;transform:translate(-50%,0);pointer-events:auto}.fcs-toast a{color:#E9B877;font-weight:700;text-decoration:none;white-space:nowrap;padding:2px 6px}' +
      '.fcs-scrim{position:fixed;inset:0;z-index:90;background:rgba(21,42,46,.45);opacity:0;transition:opacity .25s}.fcs-scrim.in{opacity:1}' +
      '.fcs-sheet{position:fixed;z-index:91;left:50%;bottom:0;width:min(460px,100%);transform:translate(-50%,105%);transition:transform .32s cubic-bezier(.2,.8,.2,1);background:#fff;border-radius:22px 22px 0 0;padding:22px 22px calc(22px + env(safe-area-inset-bottom));box-shadow:0 -10px 40px rgba(21,42,46,.25);font-family:"DM Sans",system-ui,sans-serif;color:#152A2E;box-sizing:border-box}' +
      '@media(min-width:701px){.fcs-sheet{bottom:50%;border-radius:22px;transform:translate(-50%,calc(50% + 40px));opacity:0;transition:.28s}.fcs-sheet.in{transform:translate(-50%,50%)!important;opacity:1}}' +
      '.fcs-sheet.in{transform:translate(-50%,0)}' +
      '.fcs-x{position:absolute;top:12px;right:12px;border:0;background:#F3F1EC;width:34px;height:34px;border-radius:50%;font-size:20px;line-height:1;color:#152A2E;cursor:pointer}' +
      '.fcs-th{display:flex;margin:0 0 14px}.fcs-th i{width:44px;height:44px;border-radius:50%;border:3px solid #fff;margin-left:-12px;background:#D9D2C5 center/cover;box-shadow:0 1px 4px rgba(0,0,0,.12)}.fcs-th i:first-child{margin-left:0}' +
      '.fcs-sheet h3{font:400 30px/1.08 "Libre Caslon Display",Georgia,serif;margin:0 0 8px;padding-right:30px}' +
      '.fcs-sheet p{margin:0 0 14px;font-size:16px;line-height:1.45;color:#3E5357}' +
      '.fcs-sheet form{display:flex;flex-direction:column;gap:10px}' +
      '.fcs-sheet input[type=email],.fcs-sheet input[type=tel]{border:1.5px solid #CFC8BC;border-radius:12px;padding:15px 14px;font:17px "DM Sans",system-ui,sans-serif;color:#152A2E;background:#FBFAF7}' +
      '.fcs-sheet input:focus{outline:2px solid #C2873A;outline-offset:1px;border-color:#C2873A}' +
      '.fcs-go{display:block;width:100%;box-sizing:border-box;border:0;border-radius:999px;background:#152A2E;color:#fff;font:700 17px/1 "DM Sans",system-ui,sans-serif;padding:16px;cursor:pointer}' +
      '.fcs-no{display:block;margin:12px auto 0;border:0;background:none;color:#5B6E72;font:500 15px "DM Sans",system-ui,sans-serif;text-decoration:underline;cursor:pointer}' +
      '.fcs-who{display:flex;align-items:center;gap:10px;margin-top:16px;padding-top:14px;border-top:1px solid #ECE7DE;font-size:14px;color:#3E5357}.fcs-who img{width:40px;height:40px;border-radius:50%;object-fit:cover;object-position:50% 25%}' +
      '.fcs-q{margin:0 0 14px}.fcs-q b{display:block;font-size:15px;margin:0 0 8px}.fcs-q div{display:flex;flex-wrap:wrap;gap:8px}' +
      '.fcs-q button{border:1.5px solid #CFC8BC;background:#fff;border-radius:999px;padding:10px 14px;font:500 15px "DM Sans",system-ui,sans-serif;color:#152A2E;cursor:pointer}' +
      '.fcs-q button.on{background:#152A2E;border-color:#152A2E;color:#fff}' +
      '.fcs-err{color:#B3261E;font-size:14px;margin:4px 0 0}.fcs-hp{position:absolute;left:-9999px}' +
      /* town page */
      '.crumbs.fcs-row{display:flex;align-items:center;justify-content:space-between;gap:12px}' +
      '.fcs-acts{display:flex;gap:4px;flex:none}.fcs-acts button{display:inline-flex;align-items:center;gap:6px;border:0;background:none;color:#152A2E;font:600 15px "DM Sans",system-ui,sans-serif;padding:6px 10px;border-radius:8px;cursor:pointer}' +
      '.fcs-acts button:hover{background:#F3F1EC}.fcs-acts svg{width:18px;height:18px}.fcs-acts path{fill:none;stroke:currentColor;stroke-width:1.9}' +
      '.fcs-acts .on path{fill:#C2873A;stroke:#C2873A}' +
      '.fcs-ph{position:absolute;top:14px;right:14px;z-index:3;width:46px;height:46px;border-radius:50%;border:0;background:rgba(255,255,255,.94);box-shadow:0 2px 10px rgba(0,0,0,.18);display:flex;align-items:center;justify-content:center;cursor:pointer;color:#152A2E}' +
      '.fcs-ph svg{width:24px;height:24px}.fcs-ph path{fill:none;stroke:currentColor;stroke-width:2}.fcs-ph.on path{fill:#C2873A;stroke:#C2873A}.fcs-ph.pop svg{animation:fcsb .4s ease}' +
      '@media(max-width:700px){.fcs-acts span{display:none}.fcs-acts button{padding:6px 8px}.crumbs.fcs-row>span{min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.fcs-hd{margin-left:auto;margin-right:46px}}';
    document.head.appendChild(s);
  }
  var HEART = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 20.3s-7.6-4.7-7.6-10.4A4.4 4.4 0 0 1 12 7.4a4.4 4.4 0 0 1 7.6 2.5c0 5.7-7.6 10.4-7.6 10.4z"/></svg>';
  var SHARE = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 15V4m0 0L8 8m4-4 4 4M5 13v6h14v-6"/></svg>';

  /* ---------- header heart ---------- */
  var hd;
  function header() {
    var h = document.querySelector('header'); if (!h || h.querySelector('.fcs-hd')) return;
    hd = document.createElement('a'); hd.className = 'fcs-hd'; hd.href = '/shortlist';
    var before = h.querySelector('.fcm-btn') && innerWidth < 901 ? h.querySelector('.fcm-btn') : (h.querySelector('.fcq') || h.querySelector('.fcm-btn'));
    if (before) before.parentNode.insertBefore(hd, before); else h.appendChild(hd);
    drawHeader();
  }
  function drawHeader(bump) {
    if (!hd) return; var n = list().length;
    hd.classList.toggle('on', n > 0);
    hd.setAttribute('aria-label', n ? 'Your Shortlist, ' + plural(n) : 'Your Shortlist');
    hd.innerHTML = HEART + (n ? '<b>' + n + '</b>' : '');
    if (bump) { hd.classList.remove('bump'); void hd.offsetWidth; hd.classList.add('bump'); }
  }

  /* ---------- toast ---------- */
  var tEl, tTimer;
  function toast(msg, link, href) {
    if (!tEl) { tEl = document.createElement('div'); tEl.className = 'fcs-toast'; tEl.setAttribute('role', 'status'); document.body.appendChild(tEl); }
    tEl.innerHTML = '<span>' + esc(msg) + '</span>' + (link ? '<a href="' + esc(href) + '">' + esc(link) + '</a>' : '');
    tEl.classList.add('in'); clearTimeout(tTimer); tTimer = setTimeout(function () { tEl.classList.remove('in'); }, 3800);
  }

  function afterSave(l, t) {
    drawHeader(true);
    var n = l.length;
    if (n >= 2 && !followed() && !ss('fc-sl-asked')) { ss('fc-sl-asked', '1'); setTimeout(function () { ask('second save'); }, 450); }
    else toast('Saved · ' + plural(n), 'View Shortlist', '/shortlist');
  }

  /* ---------- the ask: follow these towns, then 3 questions ---------- */
  var sheet, scrim, lastFocus;
  function close() {
    if (!sheet) return; sheet.classList.remove('in'); scrim.classList.remove('in');
    var s = sheet, c = scrim; sheet = scrim = null; setTimeout(function () { s.remove(); c.remove(); }, 320);
    document.removeEventListener('keydown', keys); if (lastFocus) try { lastFocus.focus(); } catch (e) {}
  }
  function keys(e) { if (e.key === 'Escape') close(); }
  function open(html) {
    if (sheet) close();
    lastFocus = document.activeElement;
    scrim = document.createElement('div'); scrim.className = 'fcs-scrim'; scrim.onclick = close;
    sheet = document.createElement('div'); sheet.className = 'fcs-sheet'; sheet.setAttribute('role', 'dialog'); sheet.setAttribute('aria-modal', 'true');
    sheet.innerHTML = '<button type="button" class="fcs-x" aria-label="Close">&times;</button><div class="fcs-in">' + html + '</div>';
    document.body.appendChild(scrim); document.body.appendChild(sheet);
    sheet.querySelector('.fcs-x').onclick = close;
    document.addEventListener('keydown', keys);
    requestAnimationFrame(function () { scrim.classList.add('in'); sheet.classList.add('in'); });
    return sheet;
  }
  function body(html) { if (sheet) sheet.querySelector('.fcs-in').innerHTML = html; return sheet; }
  var WHO = '<div class="fcs-who"><img src="/img/g/m/mark-betsy.webp" alt=""><span>Mark and Betsy Scott send every Shortlist. 20 years on this coast.</span></div>';

  function ask(from) {
    var l = list(), n = l.length; if (!n) return;
    track('shortlist_ask_shown', from + ' · ' + n);
    var thumbs = '<div class="fcs-th">' + l.slice(0, 5).map(function (t) { return '<i style="background-image:url(\'/' + esc(t.img) + '\')"></i>'; }).join('') + '</div>';
    var names = l.slice(0, 3).map(function (t) { return t.name.replace(/ \(.*\)$/, ''); }).join(', ') + (n > 3 ? ' and ' + (n - 3) + ' more' : '');
    open(thumbs +
      '<h3>Follow your ' + (n === 1 ? 'town' : n + ' towns') + '</h3>' +
      '<p>We\'ll send your Shortlist now (' + esc(names) + ') with prices, flood risk and a first weekend in each. Then a short note when prices move or something new happens there.</p>' +
      '<form novalidate><label class="fcs-hp" aria-hidden="true">Leave this empty<input name="website" tabindex="-1" autocomplete="off"></label>' +
      '<input type="email" autocomplete="email" placeholder="you@example.com" aria-label="Email"><button class="fcs-go" type="submit">Follow these towns</button></form>' +
      '<button type="button" class="fcs-no">Not now</button>' + WHO);
    var f = sheet.querySelector('form'), em = f.querySelector('input[type=email]');
    sheet.querySelector('.fcs-no').onclick = function () { track('shortlist_ask_skip', from); close(); };
    setTimeout(function () { em.focus({ preventScroll: true }); }, 360);
    f.onsubmit = function (e) {
      e.preventDefault();
      if (f.querySelector('input[name=website]').value) return;
      var v = em.value.trim();
      if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v)) { em.style.borderColor = '#B3261E'; em.focus(); return; }
      var b = f.querySelector('button'); b.disabled = true; b.textContent = 'Sending...';
      var l2 = list(), order = { love: 0, maybe: 1 }, srt = l2.slice().sort(function (a, c) { return (order[a.react] != null ? order[a.react] : 2) - (order[c.react] != null ? order[c.react] : 2); }).filter(function (t) { return t.react !== 'no'; });
      var fromQuiz = l2.every(function (t) { return t.from === 'quiz'; });
      var ref = (window.crypto && crypto.randomUUID) ? crypto.randomUUID() : null;
      var p = window.FC ? FC.lead({ kind: 'matches', email: v, ref: ref,
        matches: srt.map(function (t, i) { return { id: t.id, name: t.name, rank: i + 1, saved: !fromQuiz, react: t.react || null }; }),
        answers: { source: fromQuiz ? 'quiz' : 'town_page', from: from, reactions: l2.filter(function (t) { return t.react; }).map(function (t) { return t.id + ':' + t.react; }) },
        town: srt[0] ? srt[0].name.slice(0, 80) : null,
        message: ('Shortlist: ' + srt.map(function (t) { return t.name; }).join(', ')).slice(0, 2000) }) : Promise.reject();
      p.then(function (r) {
        ls('fc-sl-followed', '1'); if (ref) ls('fc-sl-ref', ref);
        questions(ref, !!(r && r.preview));
      }, function () { b.disabled = false; b.textContent = 'Follow these towns'; var er = f.querySelector('.fcs-err') || document.createElement('p'); er.className = 'fcs-err'; er.textContent = "That didn't send. Check your connection and try again."; f.appendChild(er); });
    };
  }

  var BUD = ['Under $400K', '$400K to $750K', '$750K to $1.5M', '$1.5M and up', 'Not sure yet'];
  function questions(ref, preview) {
    var ans = {};
    function q(key, label, opts) { return '<div class="fcs-q" data-k="' + key + '"><b>' + label + '</b><div>' + opts.map(function (o) { return '<button type="button" data-v="' + esc(o[0]) + '">' + esc(o[1]) + '</button>'; }).join('') + '</div></div>'; }
    body('<h3>You\'re following these towns</h3><p>' + (preview ? 'Preview: saved as a test, no email sent. ' : 'Check your inbox. ') + 'Three quick taps help us tune your Shortlist.</p>' +
      q('timeline', 'When are you thinking?', [['This year', 'This year'], ['In 1 to 2 years', 'In 1 to 2 years'], ['Still exploring', 'Still exploring']]) +
      q('plan', 'Buy or rent first?', [['Buy', 'Buy'], ['Rent first', 'Rent first'], ['Not sure yet', 'Not sure']]) +
      q('budget', 'Budget for a home?', BUD.map(function (b) { return [b, b]; })) +
      '<button type="button" class="fcs-go">Done</button><button type="button" class="fcs-no">Skip</button>');
    sheet.querySelectorAll('.fcs-q').forEach(function (g) {
      g.querySelectorAll('button').forEach(function (b) {
        b.onclick = function () {
          g.querySelectorAll('button').forEach(function (x) { x.classList.toggle('on', x === b); x.setAttribute('aria-pressed', x === b); });
          ans[g.dataset.k] = b.dataset.v; track('profile_answer', g.dataset.k + ' ' + b.dataset.v);
          if (g.dataset.k === 'budget') ls('fc-sl-budget', b.dataset.v);
          save(ref, ans, false);
        };
      });
    });
    sheet.querySelector('.fcs-go').onclick = function () { save(ref, ans, true); phone(ref, preview); };
    sheet.querySelector('.fcs-no').onclick = function () { close(); toast('You\'re following ' + plural(list().length), 'View Shortlist', '/shortlist'); };
  }
  function save(ref, ans, done) {
    if (!ref) return;
    try {
      fetch(API + 'rpc/fc_lead_profile', { method: 'POST', keepalive: true, headers: { apikey: AKEY, 'Content-Type': 'application/json' },
        body: JSON.stringify({ p_ref: ref, p_timeline: ans.timeline || null, p_plan: ans.plan || null, p_budget: ans.budget || null, p_phone: ans.phone || null, p_done: !!done }) }).catch(function () {});
    } catch (e) {}
  }
  function phone(ref, preview) {
    body('<h3>Want to talk it through?</h3><p>Add your number and Mark or Betsy will call or text you about your towns. Totally optional.</p>' +
      '<form novalidate><input type="tel" autocomplete="tel" placeholder="Phone number" aria-label="Phone number, optional"><button class="fcs-go" type="submit">Call me</button></form>' +
      '<button type="button" class="fcs-no">No thanks, show my Shortlist</button>' + WHO);
    var f = sheet.querySelector('form'), ph = f.querySelector('input');
    setTimeout(function () { ph.focus({ preventScroll: true }); }, 50);
    f.onsubmit = function (e) {
      e.preventDefault(); var v = ph.value.replace(/[^0-9+]/g, '');
      if (v.length < 10) { ph.style.borderColor = '#B3261E'; ph.focus(); return; }
      save(ref, { phone: ph.value.trim().slice(0, 40) }, true); track('profile_answer', 'phone');
      body('<h3>Talk soon.</h3><p>' + (preview ? 'Preview: nothing was sent. ' : '') + 'Mark or Betsy will reach out, usually within a day.</p><a class="fcs-go" style="display:block;text-align:center;text-decoration:none" href="/shortlist">See my Shortlist</a>' + WHO);
    };
    sheet.querySelector('.fcs-no').onclick = function () { close(); if (!/\/shortlist/.test(location.pathname)) location.href = '/shortlist'; };
  }

  /* ---------- town pages ---------- */
  function townPage() {
    var h1 = document.querySelector('.cols main h1'), gal = document.querySelector('.gal');
    if (!h1 || !gal) return;
    var id = (location.pathname.split('/').pop() || '').replace(/\.html$/, '');
    var name = h1.textContent.trim();
    var b = gal.querySelector('.b') || gal.querySelector('div,img');
    var img = b ? (b.getAttribute('src') || ((b.getAttribute('style') || '').match(/url\(['"]?([^'")]+)/) || [])[1] || '') : '';
    img = img.replace(/^\/|^(\.\.\/)+/g, '').replace(/^img\/c\/(?:[tsmf]\/)?/, 'img/c/s/');
    var t = { id: id, name: name, img: img };

    var cr = document.querySelector('.crumbs');
    var acts = document.createElement('div'); acts.className = 'fcs-acts';
    acts.innerHTML = '<button type="button" class="fcs-sh">' + SHARE + '<span class="fcs-tl">Share</span></button><button type="button" class="fcs-sv"></button>';
    if (cr) { cr.classList.add('fcs-row'); var w = document.createElement('span'); while (cr.firstChild) w.appendChild(cr.firstChild); cr.appendChild(w); cr.appendChild(acts); }
    var ph = document.createElement('button'); ph.type = 'button'; ph.className = 'fcs-ph'; ph.innerHTML = HEART; gal.appendChild(ph);
    gal.addEventListener('scroll', function () { ph.style.transform = 'translateX(' + gal.scrollLeft + 'px)'; }, { passive: true });
    var sv = acts.querySelector('.fcs-sv');
    function draw() {
      var on = has(id);
      sv.classList.toggle('on', on); ph.classList.toggle('on', on);
      sv.innerHTML = HEART + '<span>' + (on ? 'Saved' : 'Save') + '</span>';
      sv.setAttribute('aria-pressed', on); ph.setAttribute('aria-pressed', on);
      ph.setAttribute('aria-label', on ? 'Saved to your Shortlist. Tap to remove' : 'Save ' + name + ' to your Shortlist');
    }
    function tap(from) { var added = toggle(t, from); if (added) { ph.classList.remove('pop'); void ph.offsetWidth; ph.classList.add('pop'); } else if (!has(id)) toast('Removed from your Shortlist'); }
    sv.onclick = function () { tap('town page'); };
    ph.onclick = function (e) { e.stopPropagation(); tap('town photo'); };
    acts.querySelector('.fcs-sh').onclick = function () {
      track('town_share', id);
      var url = location.origin + location.pathname;
      if (navigator.share && matchMedia('(pointer:coarse)').matches) navigator.share({ title: name + ' · Florida Coastal', url: url }).catch(function () {});
      else (navigator.clipboard ? navigator.clipboard.writeText(url) : Promise.reject()).then(function () { toast('Link to ' + name + ' copied'); }, function () { prompt('Copy this link', url); });
    };
    /* The old "Save this town" link in the Ask a local card now saves for real */
    document.querySelectorAll('aside .alt a').forEach(function (a) {
      if (/save/i.test(a.textContent)) a.addEventListener('click', function (ev) { ev.preventDefault(); ev.stopImmediatePropagation(); if (!has(id)) tap('ask card'); else toast('Already on your Shortlist', 'View', '/shortlist'); }, true);
    });
    onChange(draw); draw();
  }

  window.FCS = { list: list, add: add, remove: remove, toggle: toggle, has: has, react: react, onChange: onChange, share: share, shareUrl: shareUrl, ask: ask, toast: toast, followed: followed, esc: esc, plural: plural, HEART: HEART, SHARE: SHARE };
  function init() { css(); header(); townPage(); onChange(function () { drawHeader(); }); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
