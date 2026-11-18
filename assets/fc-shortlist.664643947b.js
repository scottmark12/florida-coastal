/* Florida Coastal: Save to Shortlist (town pages). Preview Nov 18 2026.
   Visitors save towns as they browse. Saved towns live in localStorage (fc-shortlist) and show in a
   tray at the bottom of every town page. "Email me my Shortlist" sends one lead of kind "matches"
   with the saved towns, so it rides the same top 5 email sequence as the quiz.
   On the Vercel preview, fc-connect.js saves the lead with status "preview": no email goes out. */
(function () {
  var KEY = 'fc-shortlist', MAX = 10;
  var h1 = document.querySelector('.cols main h1');
  if (!h1) return;
  var id = (location.pathname.split('/').pop() || '').replace(/\.html$/, '') || 'town';
  var name = h1.textContent.trim();
  var g = document.querySelector('.gal .b, .gal div');
  var img = g ? ((g.getAttribute('style') || '').match(/url\(['"]?([^'")]+)/) || [])[1] || '' : '';
  if (img) img = img.replace(/^(\.\.\/)+/, '').replace(/^\/?img\/c\/(?:[tsm]\/)?/, 'img/c/s/');

  function load() { try { return JSON.parse(localStorage.getItem(KEY) || '[]').filter(function (t) { return t && t.id; }); } catch (e) { return []; } }
  function store(l) { try { localStorage.setItem(KEY, JSON.stringify(l.slice(0, MAX))); } catch (e) {} }
  function sentKey() { try { return localStorage.getItem(KEY + '-sent') || ''; } catch (e) { return ''; } }
  function markSent(l) { try { localStorage.setItem(KEY + '-sent', l.map(function (t) { return t.id; }).join(',')); } catch (e) {} }
  function has(l) { return l.some(function (t) { return t.id === id; }); }
  function track(e, d) { if (window.FC) FC.track(e, d); }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }

  var css = document.createElement('style');
  css.textContent =
    '.sl-save{display:inline-flex;align-items:center;gap:8px;margin:16px 0 4px;padding:11px 18px 11px 14px;border:1.5px solid #152A2E;border-radius:999px;background:#fff;color:#152A2E;font:600 16px/1 "DM Sans",system-ui,sans-serif;cursor:pointer;transition:background .15s,color .15s}' +
    '.sl-save svg{width:18px;height:18px;flex:none}.sl-save path{fill:none;stroke:currentColor;stroke-width:2;transition:fill .15s}' +
    '.sl-save:hover{background:#F3F1EC}.sl-save.on{background:#152A2E;color:#fff}.sl-save.on path{fill:#C2873A;stroke:#C2873A}' +
    '.sl-save.pop svg{animation:slpop .35s ease}@keyframes slpop{40%{transform:scale(1.35)}}' +
    '.sl-tray{position:fixed;left:50%;bottom:16px;z-index:60;width:min(560px,calc(100% - 24px));transform:translate(-50%,140%);transition:transform .35s cubic-bezier(.2,.8,.2,1);background:#152A2E;color:#fff;border-radius:18px;box-shadow:0 14px 40px rgba(21,42,46,.32);font-family:"DM Sans",system-ui,sans-serif}' +
    '.sl-tray.show{transform:translate(-50%,0)}' +
    '.sl-row{display:flex;align-items:center;gap:12px;padding:12px 12px 12px 14px}' +
    '.sl-th{display:flex;flex:none}.sl-th a{width:38px;height:38px;border-radius:50%;border:2px solid #152A2E;margin-left:-10px;background:#C2873A center/cover;display:block}.sl-th a:first-child{margin-left:0}' +
    '.sl-tx{flex:1;min-width:0;line-height:1.25}.sl-tx b{display:block;font-size:16px}.sl-tx span{display:block;font-size:13.5px;color:#C9D3D4;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}' +
    '.sl-go{flex:none;border:0;border-radius:999px;background:#C2873A;color:#fff;font:700 15px/1 "DM Sans",system-ui,sans-serif;padding:12px 16px;cursor:pointer}' +
    '.sl-x{flex:none;border:0;background:none;color:#C9D3D4;font-size:22px;line-height:1;padding:4px 6px;cursor:pointer}' +
    '.sl-f{display:none;padding:0 14px 14px}.sl-tray.open .sl-f{display:block}.sl-tray.open .sl-go{display:none}' +
    '.sl-f p{margin:0 0 10px;font-size:14.5px;line-height:1.4;color:#E4E9E9}' +
    '.sl-f form{display:flex;gap:8px}.sl-f input[type=email]{flex:1;min-width:0;border:0;border-radius:10px;padding:13px 14px;font:16px "DM Sans",system-ui,sans-serif;color:#152A2E}' +
    '.sl-f button{border:0;border-radius:10px;background:#C2873A;color:#fff;font:700 15px/1 "DM Sans",system-ui,sans-serif;padding:0 16px;cursor:pointer;white-space:nowrap}' +
    '.sl-f .fine{margin:8px 0 0;font-size:12.5px;color:#A9B6B8}.sl-f .fc-done{color:#fff}.sl-f .hp{position:absolute;left:-9999px}' +
    '@media(max-width:700px){.sl-tray{bottom:10px}.sl-th a{width:32px;height:32px}.sl-go{padding:11px 13px;font-size:14px}.sl-f form{flex-direction:column}.sl-f button{padding:14px}}' +
    'body.sl-pad{padding-bottom:96px}';
  document.head.appendChild(css);

  /* The save button, under the town name */
  var heart = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 20.5s-7.5-4.6-7.5-10.2A4.3 4.3 0 0 1 12 7.6a4.3 4.3 0 0 1 7.5 2.7c0 5.6-7.5 10.2-7.5 10.2z"/></svg>';
  var btn = document.createElement('button');
  btn.type = 'button'; btn.className = 'sl-save';
  var anchor = document.querySelector('.cols main .incl') || document.querySelector('.cols main .tag') || h1;
  anchor.insertAdjacentElement('afterend', btn);

  /* The tray */
  var tray = document.createElement('div');
  tray.className = 'sl-tray'; tray.setAttribute('role', 'region'); tray.setAttribute('aria-label', 'Your Shortlist');
  tray.innerHTML =
    '<div class="sl-row"><div class="sl-th"></div><div class="sl-tx"><b></b><span></span></div>' +
    '<button type="button" class="sl-go">Email it to me</button><button type="button" class="sl-x" aria-label="Hide">&times;</button></div>' +
    '<div class="sl-f"><p>We\'ll send your Shortlist with prices, flood risk and what each town is like, free.</p>' +
    '<form novalidate><label class="hp" aria-hidden="true">Leave this empty<input name="website" tabindex="-1" autocomplete="off"></label>' +
    '<input type="email" autocomplete="email" placeholder="you@example.com" aria-label="Email"><button type="submit">Send my Shortlist</button></form>' +
    '<p class="fine">No spam. Unsubscribe anytime.</p></div>';
  document.body.appendChild(tray);
  var hidden = false;

  function draw(pop) {
    var l = load(), on = has(l);
    btn.classList.toggle('on', on);
    btn.setAttribute('aria-pressed', on ? 'true' : 'false');
    btn.innerHTML = heart + '<span>' + (on ? 'Saved to your Shortlist' : 'Save to my Shortlist') + '</span>';
    if (pop) { btn.classList.remove('pop'); void btn.offsetWidth; btn.classList.add('pop'); }
    tray.querySelector('.sl-th').innerHTML = l.slice(0, 5).map(function (t) {
      return '<a href="/towns/' + esc(t.id) + '" title="' + esc(t.name) + '" style="background-image:url(\'/' + esc(t.img || '') + '\')"></a>';
    }).join('');
    var n = l.length;
    tray.querySelector('.sl-tx b').textContent = n === 1 ? '1 town on your Shortlist' : n + ' towns on your Shortlist';
    tray.querySelector('.sl-tx span').textContent = l.map(function (t) { return t.name; }).join(', ');
    var sent = sentKey(), same = sent && sent === l.map(function (t) { return t.id; }).join(',');
    tray.querySelector('.sl-go').textContent = sent ? (same ? 'Sent ✓' : 'Send the update') : 'Email it to me';
    tray.querySelector('.sl-go').disabled = !!same;
    var show = n > 0 && !hidden;
    tray.classList.toggle('show', show);
    document.body.classList.toggle('sl-pad', show);
  }

  btn.onclick = function () {
    var l = load();
    if (has(l)) { l = l.filter(function (t) { return t.id !== id; }); track('shortlist_remove', id); }
    else { l.unshift({ id: id, name: name, img: img }); track('shortlist_save', id + ' #' + l.length); hidden = false; }
    store(l); draw(!has(load()) ? false : true);
  };
  tray.querySelector('.sl-x').onclick = function () { hidden = true; tray.classList.remove('open'); draw(); track('shortlist_hide', String(load().length)); };
  tray.querySelector('.sl-go').onclick = function () {
    tray.classList.add('open'); track('shortlist_open', String(load().length));
    var e = tray.querySelector('input[type=email]'); setTimeout(function () { e.focus(); }, 50);
  };

  /* Send: one "matches" lead with the saved towns, same pipeline as the quiz */
  var form = tray.querySelector('form');
  function wire() {
    if (!window.FC || !FC.bind) { setTimeout(wire, 300); return; }
    FC.bind(form, {
      kind: 'matches',
      thanks: 'Sent. Your Shortlist is on its way, check your inbox.',
      extra: function () {
        var l = load();
        return { town: name, message: 'Saved on town pages (Shortlist)', matches: l.map(function (t, i) { return { id: t.id, name: t.name, rank: i + 1, saved: true }; }) };
      },
      after: function () {
        markSent(load());
        setTimeout(function () {
          tray.classList.remove('open');
          var d = tray.querySelector('.fc-done'); if (d) d.remove(); form.style.display = '';
          var b = form.querySelector('button'); b.disabled = false; b.textContent = 'Send my Shortlist';
          form.__fc = 0; wire(); draw();
        }, 2600);
      }
    });
  }
  wire();

  /* The old "Save this town" link in the Ask a local card now saves for real */
  document.querySelectorAll('aside .alt a').forEach(function (a) {
    if (/save/i.test(a.textContent)) a.onclick = function (ev) { ev.preventDefault(); ev.stopImmediatePropagation(); if (!has(load())) btn.click(); btn.scrollIntoView({ behavior: 'smooth', block: 'center' }); };
  });

  addEventListener('storage', function (e) { if (e.key === KEY) draw(); });
  draw();
})();
