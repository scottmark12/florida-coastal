/* Florida Coastal Shortlist (Nov 19 2026, preview).
   One list of saved towns for the whole site, kept in this browser (localStorage fc-shortlist).
   - FCS API: add, remove, toggle, has, list, react, onChange, share, ask
   - Header heart with a count, linking to /shortlist
   - A short toast on save
   - Save your Shortlist (email) on the second save; Ask a local (the hand raise, kind local) once there are 3+ towns
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
  function saved() { return !!(ls('fc-mail') || ls('fc-sl-saved') || ls('fc-sl-followed')); }
  function askedLocal() { return !!ls('fc-sl-asked-local'); }

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
    shareLink(url, 'Our Florida Shortlist', label || ('The ' + plural(n) + ' on our Florida Shortlist'));
  }
  /* Native share menu when the browser has one; otherwise (desktop, Instagram and Facebook in app browsers) a sheet with the link and a Copy button. */
  function shareLink(url, title, text) {
    if (navigator.share) { navigator.share({ title: title, text: text, url: url }).catch(function (e) { if (e && e.name !== 'AbortError') linkSheet(url); }); return; }
    linkSheet(url);
  }
  function linkSheet(url) {
    open('<h3>Share this link</h3><p>Send it to whoever you\'re moving with. They\'ll see the same towns.</p><div class="fcs-lk"><input type="text" readonly value="' + esc(url) + '" aria-label="Link to share"><button type="button" class="fcs-go fcs-cp">Copy link</button></div>');
    var inp = sheet.querySelector('input'), b = sheet.querySelector('.fcs-cp');
    setTimeout(function () { inp.focus(); inp.select(); }, 60);
    b.onclick = function () {
      inp.select(); inp.setSelectionRange(0, 9999);
      var ok = function () { b.textContent = 'Copied'; track('share_copy', ''); setTimeout(close, 900); };
      if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(url).then(ok, function () { try { document.execCommand('copy') ? ok() : (b.textContent = 'Press and hold the link to copy'); } catch (e) { b.textContent = 'Press and hold the link to copy'; } });
      else { try { document.execCommand('copy') ? ok() : (b.textContent = 'Press and hold the link to copy'); } catch (e) { b.textContent = 'Press and hold the link to copy'; } }
    };
  }

  /* ---------- styles ---------- */
  function css() {
    if (document.getElementById('fcs-css')) return;
    var s = document.createElement('style'); s.id = 'fcs-css';
    s.textContent =
      '.fcs-hd{position:relative;display:inline-flex;align-items:center;justify-content:center;width:40px;height:40px;border-radius:50%;color:#152A2E;text-decoration:none;flex:none;margin-right:2px}' +
      '.fcs-hd:hover{background:#F3F1EC}.fcs-hd svg{width:22px;height:22px}.fcs-hd path{fill:none;stroke:currentColor;stroke-width:1.9}' +
      '.fcs-hd.on path{fill:#152A2E;stroke:#152A2E}' +
      '.fcs-hd b{position:absolute;top:2px;right:0;min-width:17px;height:17px;padding:0 4px;border-radius:9px;background:#152A2E;color:#fff;font:700 11px/17px "DM Sans",system-ui,sans-serif;text-align:center;box-sizing:border-box}' +
      'header.fc-onphoto .fcs-hd,header.fcq-dark .fcs-hd{color:#fff}header.fc-onphoto .fcs-hd b,header.fcq-dark .fcs-hd b{background:#fff;color:#152A2E}' +
      'form.msearch .fcs-hd.fcs-in{flex:none;width:36px;height:36px;margin:0 -6px 0 2px;color:#152A2E}form.msearch .fcs-hd.fcs-in svg{width:20px;height:20px}form.msearch .fcs-hd.fcs-in b{top:-1px;right:-3px;background:#152A2E!important;color:#fff!important}form.msearch .fcs-hd.fcs-in:not(#x){color:#152A2E!important}' +
      'header.fc-onphoto .fcs-hd.on path,header.fcq-dark .fcs-hd.on path{fill:#fff;stroke:#fff}header.solid .fcs-hd.on path{fill:#152A2E;stroke:#152A2E}.fcs-hd b{box-shadow:0 0 0 2px #fff}header.fc-onphoto .fcs-hd b,header.fcq-dark .fcs-hd b{box-shadow:0 0 0 2px #152A2E}' +
      'header.solid .fcs-hd{color:#152A2E}header.solid .fcs-hd b{background:#152A2E;color:#fff}' +
      '.fcs-hd.bump svg{animation:fcsb .4s ease}@keyframes fcsb{40%{transform:scale(1.3)}}' +
      '.fcs-toast{position:fixed;left:50%;bottom:calc(18px + env(safe-area-inset-bottom));z-index:80;transform:translate(-50%,20px);opacity:0;pointer-events:none;transition:.25s;background:#152A2E;color:#fff;border-radius:999px;padding:11px 12px 11px 18px;display:flex;align-items:center;gap:14px;font:500 15px/1.3 "DM Sans",system-ui,sans-serif;box-shadow:0 10px 30px rgba(21,42,46,.28);max-width:calc(100% - 28px)}' +
      '.fcs-tx{border:0;background:rgba(255,255,255,.14);color:#fff;width:28px;height:28px;border-radius:50%;font-size:18px;line-height:1;cursor:pointer;flex:none;margin-left:-6px}.fcs-tx:hover{background:rgba(255,255,255,.26)}' +
      '.fcs-toast span{white-space:nowrap}.fcs-toast.in{opacity:1;transform:translate(-50%,0);pointer-events:auto}.fcs-toast a{color:#E9B877;font-weight:700;text-decoration:none;white-space:nowrap;padding:2px 6px}' +
      '.fcs-hint{position:fixed;z-index:85;background:#152A2E;color:#fff;font:600 14px/1.2 "DM Sans",system-ui,sans-serif;padding:9px 13px;border-radius:10px;box-shadow:0 8px 24px rgba(21,42,46,.25);opacity:0;transform:translateY(-4px);transition:.25s;pointer-events:none;white-space:nowrap}.fcs-hint.in{opacity:1;transform:none}.fcs-hint::before{content:"";position:absolute;top:-6px;left:calc(var(--ax) - 6px);border:6px solid transparent;border-top:0;border-bottom-color:#152A2E}' +
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
      '.fcs-mh::before{content:"";position:absolute;inset:-5px;border-radius:50%}.fcs-mh{position:absolute;top:10px;right:10px;z-index:4;width:40px;height:40px;border-radius:50%;border:0;background:rgba(255,255,255,.94);box-shadow:0 1px 6px rgba(0,0,0,.2);display:flex;align-items:center;justify-content:center;cursor:pointer;color:#152A2E}.fcs-mh svg{width:21px;height:21px}.fcs-mh path{fill:none;stroke:currentColor;stroke-width:2}.fcs-mh.on path{fill:#152A2E;stroke:#152A2E}.fcs-mh.card{width:34px;height:34px;top:8px;right:8px}.fcs-mh.pop{left:14px;top:14px;right:auto;bottom:auto}#pop .ph .rkb{left:62px}.fcs-mh.pop svg{width:18px;height:18px}#pop .ph,#grid .card .ph{position:relative}#pop .fcs-mh:not(#x):not(#y){width:40px!important;height:40px!important;min-width:0!important;max-width:40px!important}#grid .fcs-mh:not(#x):not(#y){width:34px!important;height:34px!important;min-width:0!important;max-width:34px!important}#pop .fcs-mh:not(#x):not(#y),#grid .fcs-mh:not(#x):not(#y){border-radius:50%!important;margin:0!important;padding:0!important;display:flex!important;align-items:center!important;justify-content:center!important}#pop .fcs-mh:not(#x):not(#y) svg,#grid .fcs-mh:not(#x):not(#y) svg{position:static!important;display:block!important;width:19px!important;height:19px!important;margin:0!important;transform:none!important}.fcs-mh.card svg{width:18px;height:18px}' +
      '.fcs-lk{display:flex;flex-direction:column;gap:10px}.fcs-lk input{border:1.5px solid #CFC8BC;border-radius:12px;padding:14px;font:15px "DM Sans",system-ui,sans-serif;color:#152A2E;background:#FBFAF7;width:100%;box-sizing:border-box}' +
      '.fcs-sheet textarea{border:1.5px solid #CFC8BC;border-radius:12px;padding:12px 14px;font:16px/1.4 "DM Sans",system-ui,sans-serif;color:#152A2E;background:#FBFAF7;resize:vertical}.fcs-al-f .fcs-q{margin:4px 0 2px}.fcs-fine{font-size:13px!important;color:#6A7B7E!important;margin:10px 0 0!important}@media(max-height:760px){.fcs-sheet{max-height:92vh;overflow:auto}}' +
      '.bdg-t{display:block;border:0;background:none;padding:2px 0;margin:0 0 10px;font:600 15px "DM Sans",system-ui,sans-serif;color:#152A2E;text-decoration:underline;text-decoration-color:#C2873A;text-underline-offset:4px;cursor:pointer;text-align:left}.bdg-t::before{content:"+ "}.bdg-t[aria-expanded=true]::before{content:"\\2212 "}.bdg-t .opt{font-weight:400;color:#6A7B7E;font-size:13px;margin-left:4px;text-decoration:none;display:inline-block}' +
      '.bdc{display:flex;flex-wrap:wrap;gap:8px;margin:0 0 14px}.bdc[hidden]{display:none}.bdc button{border:1.5px solid #CFC8BC;background:#fff;border-radius:999px;padding:9px 13px;font:500 14.5px "DM Sans",system-ui,sans-serif;color:#152A2E;cursor:pointer;min-height:40px}.bdc button.on{background:#152A2E;border-color:#152A2E;color:#fff}' +
      '.fcs-sheet input[type=text]{border:1.5px solid #CFC8BC;border-radius:12px;padding:15px 14px;font:17px "DM Sans",system-ui,sans-serif;color:#152A2E;background:#FBFAF7}' +
      '.fcs-err{color:#B3261E;font-size:14px;margin:4px 0 0}.fcs-hp{position:absolute;left:-9999px}' +
      /* town page */
      '.crumbs.fcs-row{display:flex;align-items:center;justify-content:space-between;gap:12px}' +
      '.fcs-acts{display:flex;gap:4px;flex:none;margin:-8px 0}.fcs-acts button{display:inline-flex;align-items:center;gap:6px;border:0;background:none;color:#152A2E;font:600 15px "DM Sans",system-ui,sans-serif;padding:6px 10px;border-radius:8px;cursor:pointer}' +
      '.fcs-acts button:hover{background:#F3F1EC}.fcs-acts svg{width:18px;height:18px}.fcs-acts path{fill:none;stroke:currentColor;stroke-width:1.9}' +
      '.fcs-acts .on path{fill:#152A2E;stroke:#152A2E}' +
      '.fcs-ph{position:absolute;top:14px;right:14px;z-index:3;width:46px;height:46px;border-radius:50%;border:0;background:rgba(255,255,255,.94);box-shadow:0 2px 10px rgba(0,0,0,.18);display:flex;align-items:center;justify-content:center;cursor:pointer;color:#152A2E}' +
      '.fcs-ph svg{width:24px;height:24px}.fcs-ph path{fill:none;stroke:currentColor;stroke-width:2}.fcs-ph.on path{fill:#152A2E;stroke:#152A2E}.fcs-ph.pop svg{animation:fcsb .4s ease}' +
      '.fvl{font:15px/1.5 "DM Sans",system-ui,sans-serif;color:#3E5357}.fvl[hidden]{display:none}.fvl-k{font-weight:700;color:#152A2E;margin-right:2px}.fvl-v{white-space:nowrap}.fvl-v i{display:inline-block;width:8px;height:8px;border-radius:50%;margin:0 6px 1px 2px;vertical-align:middle}.fvl-sep{margin-right:2px}' +
      '.fvl-e{border:0;background:none;padding:0 0 0 6px;font:600 15px "DM Sans",system-ui,sans-serif;color:#8A6A3D;text-decoration:underline;text-underline-offset:3px;cursor:pointer}' +
      '.fve{display:flex;flex-direction:column;gap:8px;margin:0 0 16px}.fve-r{display:flex;align-items:center;gap:12px;text-align:left;border:1.5px solid #E4DED3;background:#fff;border-radius:14px;padding:12px 14px;cursor:pointer;font-family:inherit;color:#152A2E}' +
      '.fve-r i{width:12px;height:12px;border-radius:50%;flex:none}.fve-r span{flex:1}.fve-r b{display:block;font-size:16px}.fve-r small{display:block;font-size:13.5px;color:#6A7B7E;margin-top:2px}' +
      '.fve-r em{width:24px;height:24px;border-radius:50%;border:1.5px solid #CFC8BC;flex:none;box-sizing:border-box}.fve-r.on{border-color:#152A2E}.fve-r.on em{background:#152A2E url("data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 24 24%27%3E%3Cpath d=%27M6 12.5l4 4 8-9%27 fill=%27none%27 stroke=%27white%27 stroke-width=%272.6%27 stroke-linecap=%27round%27 stroke-linejoin=%27round%27/%3E%3C/svg%3E") center/16px no-repeat;border-color:#152A2E}.fve-r:not(.on){opacity:.6}' +
      '.fv{display:flex;flex-wrap:wrap;align-items:center;gap:8px;font-family:"DM Sans",system-ui,sans-serif}.fv[hidden]{display:none}' +
      '.fv-k{font-size:12.5px;letter-spacing:.12em;text-transform:uppercase;font-weight:700;color:#8A6A3D;margin-right:4px}' +
      '.fv-v{display:inline-flex;align-items:center;gap:8px;padding:6px 6px 6px 12px;border-radius:999px;background:#F3F1EC;border:1px solid #E4DED3}' +
      '.fv-v i{width:10px;height:10px;border-radius:50%;flex:none}.fv-v a{color:#152A2E;font-weight:600;font-size:15px;text-decoration:none}' +
      '.fv-v button{border:0;background:#fff;width:24px;height:24px;border-radius:50%;font-size:16px;line-height:1;color:#3E5357;cursor:pointer}' +
      '.fv-u{border:0;background:none;color:#3E5357;font:600 14px "DM Sans",system-ui,sans-serif;text-decoration:underline;cursor:pointer;padding:4px}.fv-none{font-size:14.5px;color:#3E5357}' +
      '.fv-light .fv-k{color:#F2B27C}.fv-light .fv-v{background:rgba(255,255,255,.16);border-color:rgba(255,255,255,.3);-webkit-backdrop-filter:blur(10px);backdrop-filter:blur(10px)}.fv-light .fv-v a{color:#fff}.fv-light .fv-v button{background:rgba(255,255,255,.22);color:#fff}.fv-light .fv-u,.fv-light .fv-none{color:#fff}' +
      '.fcs-acts .fcs-sv{display:none}@media(max-width:700px){.fcs-acts span{display:none}.fcs-acts button{padding:6px 8px}.crumbs.fcs-row>span{min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}}';
    document.head.appendChild(s);
  }
  var HEART = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 20.3s-7.6-4.7-7.6-10.4A4.4 4.4 0 0 1 12 7.4a4.4 4.4 0 0 1 7.6 2.5c0 5.7-7.6 10.4-7.6 10.4z"/></svg>';
  var SHARE = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 15V4m0 0L8 8m4-4 4 4M5 13v6h14v-6"/></svg>';

  /* ---------- header heart ---------- */
  var hd;
  function header() {
    var h = document.querySelector('header'); if (!h || h.querySelector('.fcs-hd')) return;
    hd = document.createElement('a'); hd.className = 'fcs-hd'; hd.href = '/shortlist';
    var mob = innerWidth < 901, mb = h.querySelector('.fcm-btn'), ms = h.querySelector('form.msearch');
    if (mob && ms) { hd.classList.add('fcs-in'); ms.appendChild(hd); drawHeader(); return; }   /* map on phones: the search bar fills the header, so the heart sits at its right end */
    if (mob && mb && getComputedStyle(mb).position === 'absolute') {
      /* phone headers whose menu button floats: sit just left of it */
      h.appendChild(hd);
      var place = function () { var hr = h.getBoundingClientRect(), br = mb.getBoundingClientRect(); if (!br.width) return; hd.style.cssText = 'position:absolute;margin:0;z-index:5;top:' + Math.round(br.top - hr.top + (br.height - 40) / 2) + 'px;right:' + Math.round(hr.right - br.left + 6) + 'px'; };
      place(); addEventListener('load', place); addEventListener('resize', place);
    } else {
      var before = h.querySelector('.fcq') || mb;
      if (before) before.parentNode.insertBefore(hd, before); else h.appendChild(hd);
    }
    drawHeader();
  }
  function drawHeader(bump) {
    if (!hd) return; var n = list().length;
    hd.classList.toggle('on', n > 0);
    hd.setAttribute('aria-label', n ? 'Your Shortlist, ' + plural(n) : 'Your Shortlist'); hd.title = n ? 'Your Shortlist (' + plural(n) + ')' : 'Your Shortlist: heart towns to save them here';
    hd.innerHTML = HEART + (n ? '<b>' + n + '</b>' : '');
    if (bump) { hd.classList.remove('bump'); void hd.offsetWidth; hd.classList.add('bump'); }
  }

  /* ---------- toast ---------- */
  var tEl, tTimer;
  function toast(msg, link, href) {
    if (!tEl) { tEl = document.createElement('div'); tEl.className = 'fcs-toast'; tEl.setAttribute('role', 'status'); document.body.appendChild(tEl); }
    /* a toast with a next step (Email it to me, Ask a local) stays until it's tapped or closed */
    var fn = typeof href === 'function';
    tEl.innerHTML = '<span>' + esc(msg) + '</span>' + (link ? '<a href="' + (fn ? '#' : esc(href)) + '">' + esc(link) + '</a>' : '') + (fn ? '<button type="button" class="fcs-tx" aria-label="Dismiss">&times;</button>' : '');
    if (fn) {
      tEl.querySelector('a').onclick = function (e) { e.preventDefault(); tEl.classList.remove('in'); href(); };
      tEl.querySelector('.fcs-tx').onclick = function () { tEl.classList.remove('in'); track('toast_dismiss', link); };
    }
    tEl.classList.add('in'); clearTimeout(tTimer); if (!fn) tTimer = setTimeout(function () { tEl.classList.remove('in'); }, 3800);
  }

  function hint() {
    if (ls('fc-sl-hint') || !hd || !hd.offsetParent) return; ls('fc-sl-hint', '1');
    var r = hd.getBoundingClientRect(); if (r.bottom < 0 || r.top > innerHeight) return;
    var b = document.createElement('div'); b.className = 'fcs-hint'; b.setAttribute('role', 'status'); b.textContent = 'Your Shortlist lives here';
    document.body.appendChild(b);
    var w = b.offsetWidth, x = Math.max(10, Math.min(innerWidth - w - 10, r.left + r.width / 2 - w / 2));
    b.style.left = x + 'px'; b.style.top = (r.bottom + 10) + 'px'; b.style.setProperty('--ax', (r.left + r.width / 2 - x) + 'px');
    requestAnimationFrame(function () { b.classList.add('in'); });
    setTimeout(function () { b.classList.remove('in'); setTimeout(function () { b.remove(); }, 300); }, 4200);
  }
  function afterSave(l, t) {
    drawHeader(true);
    var n = l.length;
    if (n === 1) hint();
    /* no popups: the next step rides in the toast. 3+ towns: Ask a local. 2 and not saved yet: Email it to me */
    if (n >= 3 && !askedLocal()) toast('Saved · ' + plural(n), 'Ask a local about these ' + n, function () { askLocal('heart toast'); });
    else if (n >= 2 && !saved()) toast('Saved · ' + plural(n), 'Email it to me', function () { ask('second save'); });
    else toast('Saved · ' + plural(n), 'View Shortlist', '/shortlist');
  }

  /* ---------- sheets ---------- */
  var sheet, scrim, lastFocus;
  function close() {
    if (!sheet) return; sheet.classList.remove('in'); scrim.classList.remove('in');
    var s = sheet, c = scrim; sheet = scrim = null; setTimeout(function () { s.remove(); c.remove(); }, 320);
    document.removeEventListener('keydown', keys); if (lastFocus) try { lastFocus.focus(); } catch (e) {}
  }
  function keys(e) {
    if (e.key === 'Escape') { close(); return; }
    if (e.key !== 'Tab' || !sheet) return;
    var f = [].filter.call(sheet.querySelectorAll('button,a[href],input:not([tabindex="-1"]),textarea,select'), function (x) { return !x.disabled && x.offsetParent !== null; });
    if (!f.length) return;
    var first = f[0], last = f[f.length - 1];
    if (!sheet.contains(document.activeElement)) { e.preventDefault(); first.focus(); }
    else if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  }
  function open(html) {
    if (sheet) close();
    lastFocus = document.activeElement;
    scrim = document.createElement('div'); scrim.className = 'fcs-scrim'; scrim.onclick = close;
    sheet = document.createElement('div'); sheet.className = 'fcs-sheet'; sheet.setAttribute('role', 'dialog'); sheet.setAttribute('aria-modal', 'true');
    sheet.innerHTML = '<button type="button" class="fcs-x" aria-label="Close">&times;</button><div class="fcs-in">' + html + '</div>';
    sheet.setAttribute('aria-labelledby', 'fcs-t'); var h3 = sheet.querySelector('h3'); if (h3) h3.id = 'fcs-t';
    setTimeout(function () { if (sheet && !sheet.contains(document.activeElement)) { var x = sheet.querySelector('input,button.fcs-go') || sheet.querySelector('.fcs-x'); if (x) x.focus({ preventScroll: true }); } }, 380);
    document.body.appendChild(scrim); document.body.appendChild(sheet);
    sheet.querySelector('.fcs-x').onclick = close;
    document.addEventListener('keydown', keys);
    requestAnimationFrame(function () { scrim.classList.add('in'); sheet.classList.add('in'); });
    return sheet;
  }
  function body(html) { if (sheet) { sheet.querySelector('.fcs-in').innerHTML = html; var h3 = sheet.querySelector('h3'); if (h3) h3.id = 'fcs-t'; } return sheet; }
  var WHO_ASK = '<div class="fcs-who"><img src="/img/g/m/mark-betsy.webp" alt=""><span>Mark and Betsy Scott read every message. 20 years on this coast.</span></div>';
  var WHO = '<div class="fcs-who"><img src="/img/g/m/mark-betsy.webp" alt=""><span>Mark and Betsy Scott send every Shortlist. 20 years on this coast.</span></div>';

  /* Two asks, kept apart (Nov 19, after the Ramsey review):
     1. Save: email only, cheap. "Save your Shortlist" sends it to their inbox and rides the existing emails (kind matches).
     2. Ask a local: the hand raise. Only offered once there is real intent (3+ towns), always on a tap, never a popup.
        Same kind as the town page and home page "Ask a local" forms (kind local), so it is one pipeline. */
  function sorted() {
    var l2 = list(), order = { love: 0, maybe: 1 };
    return l2.slice().sort(function (a, c) { return (order[a.react] != null ? order[a.react] : 2) - (order[c.react] != null ? order[c.react] : 2); }).filter(function (t) { return t.react !== 'no'; });
  }
  function thumbsHtml(l) { return '<div class="fcs-th">' + l.slice(0, 5).map(function (t) { return '<i style="background-image:url(\'/' + esc(t.img) + '\')"></i>'; }).join('') + '</div>'; }
  function emailBox(btn) {
    return '<form novalidate><label class="fcs-hp" aria-hidden="true">Leave this empty<input name="website" tabindex="-1" autocomplete="off"></label>' +
      '<input type="email" autocomplete="email" placeholder="you@example.com" aria-label="Email" value="' + esc(ls('fc-em') || '') + '"><button class="fcs-go" type="submit">' + btn + '</button></form>';
  }
  function failed(f, b, label) { b.disabled = false; b.textContent = label; var er = f.querySelector('.fcs-err') || document.createElement('p'); er.className = 'fcs-err'; er.textContent = "That didn't send. Check your connection and try again."; f.appendChild(er); }
  function okEmail(em) { var v = em.value.trim(); if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v)) { em.style.borderColor = '#B3261E'; em.focus(); return null; } ls('fc-em', v); return v; }

  function ask(from) {
    var l = list(), n = l.length; if (!n) return;
    track('shortlist_ask_shown', from + ' · ' + n);
    open(thumbsHtml(l) +
      '<h3>Save your Shortlist</h3>' +
      '<p>We\'ll email your ' + plural(n) + ' so you can pick up where you left off, on any device.</p>' +
      emailBox('Save my Shortlist') +
      '<button type="button" class="fcs-no">Not now</button>' + WHO);
    var f = sheet.querySelector('form'), em = f.querySelector('input[type=email]');
    sheet.querySelector('.fcs-no').onclick = function () { track('shortlist_ask_skip', from); close(); };
    f.onsubmit = function (e) {
      e.preventDefault();
      if (f.querySelector('input[name=website]').value) return;
      var v = okEmail(em); if (!v) return;
      var b = f.querySelector('button'); b.disabled = true; b.textContent = 'Saving...';
      var l2 = list(), srt = sorted(), fromQuiz = l2.every(function (t) { return t.from === 'quiz'; });
      var p = window.FC ? FC.lead({ kind: 'matches', email: v, ref: (window.crypto && crypto.randomUUID) ? crypto.randomUUID() : null,
        matches: srt.map(function (t, i) { return { id: t.id, name: t.name, rank: i + 1, saved: !fromQuiz, react: t.react || null }; }),
        answers: { source: fromQuiz ? 'quiz' : 'town_page', from: from, vibes: vibes(), reactions: l2.filter(function (t) { return t.react; }).map(function (t) { return t.id + ':' + t.react; }) },
        town: srt[0] ? srt[0].name.slice(0, 80) : null,
        message: ('Shortlist: ' + srt.map(function (t) { return t.name; }).join(', ')).slice(0, 2000) }) : Promise.reject();
      var PV = function () { if (window.FC && !FC.LIVE) return { preview: true }; throw 0; };
      p.catch(PV).then(function (r) {
        ls('fc-sl-saved', '1'); fire();
        var big = list().length >= 3;
        body('<h3>Saved.</h3><p>' + (r && r.preview ? 'Preview: saved as a test, no email sent. ' : 'Check your inbox. ') + 'Keep hearting towns and your Shortlist keeps up.</p>' +
          (big ? '<p style="margin-top:18px"><b>Want a local\'s take on these towns?</b></p><button type="button" class="fcs-go fcs-al">Ask a local</button><button type="button" class="fcs-no">Not now</button>'
               : '<button type="button" class="fcs-go fcs-dn">Done</button>') + WHO);
        var al = sheet.querySelector('.fcs-al'); if (al) al.onclick = function () { askLocal(from + ' after save'); };
        var x = sheet.querySelector('.fcs-no,.fcs-dn'); if (x) x.onclick = close;
      }).catch(function () { failed(f, b, 'Save my Shortlist'); });
    };
  }

  /* ---------- Ask a local: the hand raise ---------- */
  var TL = ['Within 3 months', 'This year', 'Just looking'];
  var BUD = ['Under $400K', '$400K to $750K', '$750K to $1.5M', '$1.5M and up', 'Not sure yet'];
  /* every Ask a local form has the same fields: name, email, optional phone, timeline, and budget behind "Add budget" */
  var BUDGET = '<button type="button" class="bdg-t" aria-expanded="false">Add budget <span class="opt">optional</span></button><div class="bdc" role="group" aria-label="Budget for a home" hidden>' + BUD.map(function (b) { return '<button type="button" data-v="' + esc(b) + '">' + esc(b) + '</button>'; }).join('') + '</div>';
  document.addEventListener('click', function (e) {
    var t = e.target.closest && e.target.closest('.bdg-t,.bdc button'); if (!t) return;
    e.preventDefault();
    if (t.classList.contains('bdg-t')) { var g = t.nextElementSibling; if (g) { g.hidden = !g.hidden; t.setAttribute('aria-expanded', !g.hidden); if (!g.hidden) { var f = g.querySelector('button'); if (f) f.focus({ preventScroll: true }); } } return; }
    var was = t.classList.contains('on');
    [].forEach.call(t.parentNode.children, function (x) { var on = x === t && !was; x.classList.toggle('on', on); x.setAttribute('aria-pressed', on); });
  });
  function askLocal(from, towns) {
    var l = towns || sorted(); if (!l.length) return;
    var names = l.map(function (t) { return t.name.replace(/ \(.*\)$/, ''); });
    var title = l.length === 1 ? 'Ask a local about ' + names[0] : 'Ask a local about your ' + l.length + ' towns';
    track('ask_local_shown', from + ' · ' + l.length);
    var ans = { timeline: 'Just looking' };
    function chips(key, label, opts, on) { return '<div class="fcs-q" data-k="' + key + '"><b>' + label + '</b><div>' + opts.map(function (o) { return '<button type="button" data-v="' + esc(o) + '"' + (o === on ? ' class="on" aria-pressed="true"' : '') + '>' + esc(o) + '</button>'; }).join('') + '</div></div>'; }
    var html = thumbsHtml(l) + '<h3>' + esc(title) + '</h3>' +
      '<p>Mark and Betsy, or a local who knows ' + (l.length === 1 ? 'the town' : 'these towns') + ', will get back to you, usually within a day.</p>' +
      '<form novalidate class="fcs-al-f"><label class="fcs-hp" aria-hidden="true">Leave this empty<input name="website" tabindex="-1" autocomplete="off"></label>' +
      '<textarea rows="2" aria-label="Your question, optional" placeholder="Your question (optional): flood zones, schools, what summer is really like"></textarea>' +
      '<input type="text" name="name" autocomplete="given-name" placeholder="First name" aria-label="First name" value="' + esc(ls('fc-nm') || '') + '">' +
      '<input type="email" autocomplete="email" placeholder="you@example.com" aria-label="Email" value="' + esc(ls('fc-em') || '') + '">' +
      '<input type="tel" autocomplete="tel" placeholder="Phone (optional) for a quick call or text" aria-label="Phone, optional">' +
      chips('timeline', 'When are you thinking?', TL, 'Just looking') + BUDGET +
      '<button class="fcs-go" type="submit">Ask a local</button></form>' +
      '<p class="fcs-fine">By sending, you agree Florida Coastal, and the local agents for these towns if they have one, may call or text you, including automated texts. Not required to buy. Msg rates may apply. <a href="/disclosures.html#reach">Details</a></p>' + WHO_ASK;
    if (sheet) body(html); else open(html);
    sheet.querySelectorAll('.fcs-q').forEach(function (g) {
      g.querySelectorAll('button').forEach(function (b) {
        b.onclick = function () {
          g.querySelectorAll('button').forEach(function (x) { x.classList.toggle('on', x === b); x.setAttribute('aria-pressed', x === b); });
          ans[g.dataset.k] = b.dataset.v;
        };
      });
    });
    var f = sheet.querySelector('form'), em = f.querySelector('input[type=email]'), tel = f.querySelector('input[type=tel]'), qa = f.querySelector('textarea');
    if (innerWidth > 700) setTimeout(function () { (em.value ? qa : em).focus({ preventScroll: true }); }, 380);
    f.onsubmit = function (e) {
      e.preventDefault();
      if (f.querySelector('input[name=website]').value) return;
      var v = okEmail(em); if (!v) return;
      var b = f.querySelector('.fcs-go'); b.disabled = true; b.textContent = 'Sending...';
      var q = qa.value.trim(), nm = f.querySelector('input[name=name]').value.trim().slice(0, 120), bud = ((f.querySelector('.bdc button.on') || {}).dataset || {}).v || null;
      if (nm) ls('fc-nm', nm);
      var fromQuiz = /^quiz/.test(from) || l.every(function (t) { return t.from === 'quiz'; });
      var p = window.FC ? FC.lead({ kind: 'local', email: v, phone: tel.value.trim().slice(0, 40) || null, name: nm || null, timeline: ans.timeline || null, budget: bud,
        town: names[0].slice(0, 80),
        matches: l.map(function (t, i) { return { id: t.id, name: t.name, rank: i + 1, react: t.react || null }; }),
        answers: { source: fromQuiz ? 'quiz' : 'town_page', ask: 'local', from: from, vibes: vibes() },
        message: ((q ? q + '\n\n' : '') + (l.length > 1 ? 'Shortlist: ' + names.join(', ') : '')).slice(0, 2000) || null }) : Promise.reject();
      p.catch(function () { if (window.FC && !FC.LIVE) return { preview: true }; throw 0; }).then(function (r) {
        track('ask_local_sent', from + ' · ' + l.length);
        if (bud) ls('fc-sl-budget', bud);
        ls('fc-sl-saved', '1'); ls('fc-sl-asked-local', '1'); fire();
        body('<h3>Talk soon.</h3><p>' + (r && r.preview ? 'Preview: saved as a test, nothing was sent. ' : '') + 'Mark or Betsy will get back to you, usually within a day.</p>' +
          (/\/shortlist/.test(location.pathname) ? '<button type="button" class="fcs-go fcs-dn">Done</button>' : '<a class="fcs-go" style="display:block;text-align:center;text-decoration:none" href="/shortlist">See my Shortlist</a>') + WHO);
        var d = sheet.querySelector('.fcs-dn'); if (d) d.onclick = close;
      }).catch(function () { failed(f, b, 'Ask a local'); });
    };
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
    /* phones: the town's own name is the page title, so the breadcrumb stops at the region */
    if (cr && innerWidth < 701) { var tn = cr.querySelector('span').lastChild; if (tn && tn.nodeType === 3) tn.textContent = tn.textContent.replace(/\s*\/\s*[^/]*$/, ''); }
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
      shareLink(location.origin + location.pathname, name + ' · Florida Coastal', name + ' on Florida Coastal');
    };
    onChange(draw); draw();
  }

  /* ---------- your town vibe (set by the quiz, editable anywhere) ---------- */
  var VIBES = { beaches: 'Best Beaches', schools: 'Best Schools', oldfl: 'Old Florida', bluezone: 'Healthy Living', island: 'Island Vibes', dock: 'Dock Life', sophhigh: 'High Energy', social: 'Social Scene', sophcalm: 'Sophisticated Laid Back', active: 'Active Lifestyle', walk: 'Walkable', remote: 'Remote Work', afford: 'Affordable' };
  var VCOL = { oldfl: '#2F9460', dock: '#3A62C8', island: '#1FA39A', sophcalm: '#7B62D8', sophhigh: '#C8407F', social: '#E0604F', active: '#6FA53E', bluezone: '#2A93CF', walk: '#B055C0', remote: '#DB8430', beaches: '#D2A52A', schools: '#9A3A52', afford: '#B5643F' };
  var VSUB = { island: 'Barefoot, small and slow', oldfl: 'Fish houses, bait shops and no hurry', dock: 'Life on and around the water', sophcalm: 'Polished and easy', sophhigh: 'Polished with a pulse', afford: 'More house for less', active: 'Trails, paddling and the outdoors', walk: 'Daily life on foot', bluezone: 'Long walks, time outside, friendly faces', remote: 'Pretty, with an easy airport', social: 'Bars, events and people', beaches: 'Nationally ranked sand', schools: 'Top state school grades' };
  function vibeGet() { try { var v = JSON.parse(ls('fc-vibe') || 'null'); if (v && v.all) { v.off = v.off || []; return v; } } catch (e) {} return null; }
  function vibeSet(v) { ls('fc-vibe', JSON.stringify(v)); fire(); }
  function vibes() { var v = vibeGet(); return v ? v.all.filter(function (k) { return v.off.indexOf(k) < 0; }) : []; }
  /* Draws the editable vibe chips into el. light: true for dark photo backgrounds. */
  function vibeChips(el, opts) {
    opts = opts || {};
    function draw() {
      var v = vibeGet();
      if (!v || !v.all.length) { el.innerHTML = ''; el.hidden = true; return; }
      el.hidden = false;
      var on = v.all.filter(function (k) { return v.off.indexOf(k) < 0; }), off = v.all.filter(function (k) { return v.off.indexOf(k) >= 0; });
      el.innerHTML = '<span class="fv-k">' + (opts.label || 'Your town vibe') + '</span>' +
        (on.length ? on.map(function (k) {
          return '<span class="fv-v"><i style="background:' + (VCOL[k] || '#C2873A') + '"></i><a href="map.html?mode=vibes&style=' + k + '" title="' + esc(VSUB[k] || '') + '">' + esc(VIBES[k] || k) + '</a><button type="button" data-k="' + k + '" aria-label="Not me, remove ' + esc(VIBES[k] || k) + '">&times;</button></span>';
        }).join('') : '<span class="fv-none">No label, and that\'s fine</span>') +
        (off.length ? '<button type="button" class="fv-u">Bring back ' + esc(off.map(function (k) { return VIBES[k] || k; }).join(', ')) + '</button>' : '');
      el.querySelectorAll('button[data-k]').forEach(function (b) {
        b.onclick = function () { var v2 = vibeGet(); v2.off.push(b.dataset.k); vibeSet(v2); track('vibe_remove', b.dataset.k); toast((VIBES[b.dataset.k] || 'Vibe') + ' removed'); };
      });
      var u = el.querySelector('.fv-u'); if (u) u.onclick = function () { var v2 = vibeGet(); v2.off = []; vibeSet(v2); track('vibe_restore', ''); };
    }
    el.classList.add('fv'); if (opts.light) el.classList.add('fv-light'); onChange(draw); draw();
  }
  /* One quiet line: "Your vibe: Walkable, Social Scene · Edit". Editing happens in a small sheet. */
  function vibeLine(el) {
    function draw() {
      var v = vibeGet();
      if (!v || !v.all.length) { el.hidden = true; el.innerHTML = ''; return; }
      el.hidden = false;
      var on = vibes();
      el.innerHTML = '<span class="fvl-k">Your vibe</span> ' + (on.length ? on.map(function (k) { return '<span class="fvl-v"><i style="background:' + (VCOL[k] || '#C2873A') + '"></i>' + esc(VIBES[k] || k) + '</span>'; }).join('<span class="fvl-sep">, </span>') : '<span class="fvl-v">None picked</span>') + ' <button type="button" class="fvl-e">Edit</button>';
      el.querySelector('.fvl-e').onclick = vibeEdit;
    }
    el.classList.add('fvl'); onChange(draw); draw();
  }
  function vibeEdit() {
    var v = vibeGet(); if (!v) return;
    track('vibe_edit_open', '');
    function rows() {
      return v.all.map(function (k) {
        var on = v.off.indexOf(k) < 0;
        return '<button type="button" class="fve-r' + (on ? ' on' : '') + '" data-k="' + k + '" aria-pressed="' + on + '"><i style="background:' + (VCOL[k] || '#C2873A') + '"></i><span><b>' + esc(VIBES[k] || k) + '</b><small>' + esc(VSUB[k] || '') + '</small></span><em aria-hidden="true"></em></button>';
      }).join('');
    }
    open('<h3>Your town vibe</h3><p>From your towns and your answers. Keep what sounds like you.</p><div class="fve">' + rows() + '</div><button type="button" class="fcs-go">Done</button>');
    function wire() {
      sheet.querySelectorAll('.fve-r').forEach(function (b) {
        b.onclick = function () { var k = b.dataset.k, i = v.off.indexOf(k); if (i < 0) { v.off.push(k); track('vibe_remove', k); } else { v.off.splice(i, 1); track('vibe_restore', k); } vibeSet(v); sheet.querySelector('.fve').innerHTML = rows(); wire(); };
      });
    }
    wire(); sheet.querySelector('.fcs-go').onclick = close;
  }
  function townMenu(t, isTop) {
    var nm = esc(String(t.name).replace(/ \(.*\)$/, ''));
    open('<h3>' + nm + '</h3><p>' + (isTop ? 'One of your top picks.' : 'Mark your favorites so they stay first, and so whoever you share with sees them.') + '</p><button type="button" class="fcs-go fcs-tp">' + (isTop ? 'Not a top pick' : 'Mark as top pick') + '</button><button type="button" class="fcs-no fcs-rm">Remove from Shortlist</button>');
    sheet.querySelector('.fcs-tp').onclick = function () { react(t.id, 'love'); close(); toast(isTop ? nm.replace(/&amp;/g, '&') + ' is no longer a top pick' : 'Marked as a top pick'); };
    sheet.querySelector('.fcs-rm').onclick = function () { remove(t.id); close(); toast('Removed from your Shortlist'); };
  }
  function confirmRemove(t) {
    open('<h3>' + esc(String(t.name).replace(/ \(.*\)$/, '')) + '</h3><p>Take it off your Shortlist? You can save it again from its page anytime.</p><button type="button" class="fcs-go">Remove from Shortlist</button><button type="button" class="fcs-no">Keep it</button>');
    sheet.querySelector('.fcs-go').onclick = function () { remove(t.id); close(); toast('Removed from your Shortlist'); };
    sheet.querySelector('.fcs-no').onclick = close;
  }
  /* The quiz's five towns go in (from: quiz), replacing older quiz towns; towns saved by hand stay. */
  function setQuiz(towns) {
    var keep = list().filter(function (t) { return t.from !== 'quiz'; }), ids = keep.map(function (t) { return t.id; });
    var q = towns.filter(function (t) { return ids.indexOf(t.id) < 0; }).map(function (t) { return { id: t.id, name: t.name, img: t.img || '', from: 'quiz', react: null }; });
    var next = q.concat(keep).slice(0, MAX), cur = list().map(function (t) { return t.id; }).join(',');
    if (next.map(function (t) { return t.id; }).join(',') !== cur) { store(next); track('shortlist_quiz', String(q.length)); }
  }

  window.FCS = { list: list, add: add, remove: remove, toggle: toggle, has: has, react: react, onChange: onChange, share: share, shareLink: shareLink, shareUrl: shareUrl, ask: ask, toast: toast, saved: saved, askedLocal: askedLocal, askLocal: askLocal, esc: esc, plural: plural, HEART: HEART, SHARE: SHARE, VIBES: VIBES, VCOL: VCOL, VSUB: VSUB, vibes: vibes, vibeChips: vibeChips, setQuiz: setQuiz, vibeLine: vibeLine, vibeEdit: vibeEdit, confirmRemove: confirmRemove, townMenu: townMenu };
  /* Vibe Map and Slider Map: a heart on the town popup's photo and on the list cards. The map redraws them, so watch and re-add. */
  function mapHearts() {
    var pop = document.getElementById('pop'), grid = document.getElementById('grid');
    if (!pop && !grid) return;
    var TT = function (id) { try { return (typeof T !== 'undefined' ? T : []).filter(function (t) { return t.id === id; })[0]; } catch (e) { return null; } };
    function info(id) { var t = TT(id); return t ? { id: t.id, name: t.n, img: String(t.img || '').replace(/^img\/c\/(?:[tsmf]\/)?/, 'img/c/s/') } : null; }
    function btn(id, cls) {
      var b = document.createElement('button'); b.type = 'button'; b.className = 'fcs-mh ' + cls; b.dataset.id = id;
      b.onclick = function (e) { e.preventDefault(); e.stopPropagation(); var t = info(id); if (!t) return; var added = toggle(t, cls === 'pop' ? 'map card' : 'map list'); if (!added && !has(id)) toast('Removed from your Shortlist'); paint(); };
      return b;
    }
    function paint() {
      document.querySelectorAll('.fcs-mh').forEach(function (b) { var on = has(b.dataset.id); b.classList.toggle('on', on); b.innerHTML = HEART; b.setAttribute('aria-pressed', on); b.setAttribute('aria-label', on ? 'Saved to your Shortlist' : 'Save to your Shortlist'); });
    }
    function scan() {
      if (pop) {
        var cur = null; try { cur = typeof S !== 'undefined' && S.pop ? S.pop.id : null; } catch (e) {}
        var ph = pop.querySelector('.ph');
        if (cur && ph) { var b0 = ph.querySelector('.fcs-mh'); if (!b0 || b0.dataset.id !== cur) { if (b0) b0.remove(); ph.appendChild(btn(cur, 'pop')); } }
      }
      if (grid) grid.querySelectorAll('a.card[data-id] .ph').forEach(function (ph) { if (!ph.querySelector('.fcs-mh')) ph.appendChild(btn(ph.parentNode.dataset.id, 'card')); });
      paint();
    }
    var busy = 0, mo = new MutationObserver(function () { if (busy) return; busy = 1; requestAnimationFrame(function () { busy = 0; mo.disconnect(); scan(); watch(); }); });
    function watch() { if (pop) mo.observe(pop, { childList: true, subtree: true }); if (grid) mo.observe(grid, { childList: true }); }
    scan(); watch(); onChange(paint);
  }
  function init() { css(); header(); townPage(); mapHearts(); onChange(function () { drawHeader(); }); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
