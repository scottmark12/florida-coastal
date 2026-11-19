/* /shortlist: the saved towns (Nov 19 2026, preview, calm pass).
   Phones: swipeable town cards. Desktop: a side by side table.
   One price per town (typical home), a heart for "love", remove behind a small menu.
   Reads this browser's Shortlist (FCS) and, when the link has ?t=id:l,id, the towns someone shared.
   Uses T (towns.json) and D (compare-d.json). */
(function () {
  var esc = FCS.esc, HEART = FCS.HEART, SHARE = FCS.SHARE;
  var TB = {}; (typeof T !== 'undefined' ? T : []).forEach(function (t) { TB[t.id] = t; });
  var DD = typeof D !== 'undefined' ? D : {}; var DT = DD.towns || {}; var N = DD.N || 167;
  var ROWS = [['beach', 'Beaches'], ['dining', 'Dining and arts'], ['walk', 'Walkability'], ['water', 'On the water'], ['quiet', 'Peace and quiet'], ['meet', 'Meet people'], ['outdoors', 'Outdoors'], ['airport', 'Airport access'], ['afford', 'Affordability'], ['nightlife', 'Nightlife']];
  var BUD = { 'Under $400K': [0, 400], '$400K to $750K': [400, 750], '$750K to $1.5M': [750, 1500], '$1.5M and up': [1500, 1e9] };
  var DOTS = '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="5" cy="12" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="19" cy="12" r="2"/></svg>';
  function k(pr) { var m = String(pr || '').replace(/,/g, '').match(/\$([\d.]+)\s*([KM])/i); return m ? +m[1] * (m[2].toUpperCase() === 'M' ? 1000 : 1) : null; }
  function town(id) { var t = TB[id], d = DT[id]; if (!t && !d) return null; return { id: id, name: (t && t.n) || (d && d.s) || id, img: (t && t.img) || (d && d.img) || '', region: (t && t.r) || (d && d.rg) || '', d: d || {} }; }
  function short(n) { return String(n).replace(/ \(.*\)$/, ''); }
  function small(img) { return String(img).replace(/^img\/c\/(?:[tsmf]\/)?/, 'img/c/s/'); }
  function phone() { return matchMedia('(max-width:700px)').matches; }

  var shared = null, q = new URLSearchParams(location.search).get('t');
  if (q) {
    shared = q.split(',').map(function (x) { var p = x.split(':'); return { id: p[0], react: p[1] === 'l' ? 'love' : null }; }).filter(function (x) { return town(x.id); }).slice(0, 10);
    if (!shared.length || shared.map(function (x) { return x.id; }).join(',') === FCS.list().map(function (t) { return t.id; }).join(',')) shared = null;
  }
  if (window.FC) FC.track('shortlist_view', (shared ? 'shared ' + shared.length : 'mine ' + FCS.list().length));

  var grid = document.getElementById('sl-grid'), sh = document.getElementById('sl-shared'), sb = document.getElementById('sl-share'), sub = document.getElementById('sl-sub');
  sb.innerHTML = SHARE; sb.onclick = function () { FCS.share(); };

  function best3(t) {
    var r = t.d.rk || {};
    return ROWS.filter(function (x) { return r[x[0]] != null; }).sort(function (a, b) { return r[a[0]] - r[b[0]]; }).slice(0, 3).map(function (x) { return { k: x[0], l: x[1], v: r[x[0]] }; });
  }
  function draw() {
    var l = FCS.list(), viewShared = !!shared;
    var items = (viewShared ? shared : l).map(function (x) { var t = town(x.id); return t && Object.assign(t, { react: x.react === 'love' ? 'love' : null }); }).filter(Boolean);
    items.sort(function (a, b) { return (b.react === 'love') - (a.react === 'love'); });
    var n = items.length;
    document.getElementById('sl-h').textContent = viewShared ? 'A Shortlist for you' : 'Your Shortlist';
    document.getElementById('sl-n').textContent = n ? FCS.plural(n) : '';
    sb.hidden = !n || viewShared;
    sub.innerHTML = !n || viewShared || FCS.followed() ? '' : '<button type="button" class="sl-follow">Get updates on these towns by email</button>';
    var fb = sub.querySelector('.sl-follow'); if (fb) fb.onclick = function () { FCS.ask('shortlist page'); };
    sh.innerHTML = viewShared ? '<div class="sl-banner"><span>Someone shared their Shortlist with you.</span><button type="button" id="sl-addall">Save these to mine</button></div>' : '';
    if (viewShared) document.getElementById('sl-addall').onclick = function () {
      shared.forEach(function (x) { var t = town(x.id); if (t && !FCS.has(t.id)) FCS.add({ id: t.id, name: t.name, img: small(t.img) }, 'shared link'); });
      shared = null; history.replaceState(null, '', '/shortlist'); draw();
    };
    if (!n) {
      grid.innerHTML = '<div class="sl-empty">' + HEART + '<h2>Nothing saved yet</h2><p>Tap the heart on any town to save it here, or let the quiz pick five for you.</p><div><a class="sl-b sl-dark" href="find-your-mile.html">Take the quiz</a><a class="sl-b" href="towns/index.html">Browse towns</a></div></div>';
      document.getElementById('sl-more').innerHTML = ''; return;
    }
    var budget = null; try { budget = BUD[localStorage.getItem('fc-sl-budget')] || null; } catch (e) {}
    function fits(t) { var v = k(t.d.pr); return budget && v != null && v >= budget[0] && v < budget[1]; }
    function heart(t) {
      if (viewShared) return '<button type="button" class="sl-hb' + (FCS.has(t.id) ? ' on' : '') + '" data-save="' + esc(t.id) + '" aria-label="Save ' + esc(short(t.name)) + '">' + HEART + '</button>';
      return '<button type="button" class="sl-hb' + (t.react === 'love' ? ' on' : '') + '" data-love="' + esc(t.id) + '" aria-pressed="' + (t.react === 'love') + '" aria-label="Love ' + esc(short(t.name)) + '">' + HEART + '</button>';
    }
    function photo(t) {
      return '<a class="sl-ph" href="towns/' + esc(t.id) + '.html" style="background-image:url(\'' + esc(t.img) + '\')">' + (fits(t) ? '<span class="sl-fit">Fits your budget</span>' : '') + (viewShared && t.react === 'love' ? '<span class="sl-tag">They love it</span>' : '') + '</a>' + heart(t);
    }
    function menu(t) { return viewShared ? '' : '<button type="button" class="sl-mn" data-menu="' + esc(t.id) + '" aria-label="More for ' + esc(short(t.name)) + '">' + DOTS + '</button>'; }
    var h;
    if (phone()) {
      h = '<div class="sl-cards">' + items.map(function (t) {
        return '<article class="sl-card"><div class="sl-pw">' + photo(t) + '</div><div class="sl-cb"><div class="sl-nr"><a class="sl-n" href="towns/' + esc(t.id) + '.html">' + esc(short(t.name)) + '</a>' + menu(t) + '</div>' +
          '<div class="sl-meta">' + esc(t.region) + (t.d.pr ? ' · <b>' + esc(t.d.pr) + '</b>' : '') + '</div>' +
          '<ul class="sl-best">' + best3(t).map(function (b) { return '<li><b>#' + b.v + '</b> ' + b.l + '</li>'; }).join('') + '</ul></div></article>';
      }).join('') + '</div>' + (n > 1 ? '<div class="sl-dots">' + items.map(function () { return '<i></i>'; }).join('') + '</div>' : '');
    } else {
      var bestRow = {};
      ROWS.forEach(function (r) { var m = Infinity; items.forEach(function (t) { var v = t.d.rk && t.d.rk[r[0]]; if (v != null && v < m) m = v; }); bestRow[r[0]] = m; });
      h = '<div class="sl-scroll"><div class="sl-t" style="--n:' + n + '"><div class="sl-lab sl-corner"></div>';
      items.forEach(function (t) { h += '<div class="sl-c sl-head"><div class="sl-pw">' + photo(t) + '</div><div class="sl-nr"><a class="sl-n" href="towns/' + esc(t.id) + '.html">' + esc(short(t.name)) + '</a>' + menu(t) + '</div><span class="sl-rg">' + esc(t.region) + '</span></div>'; });
      h += '<div class="sl-lab">Typical home</div>';
      items.forEach(function (t) { h += '<div class="sl-c sl-pr"><b>' + esc(t.d.pr || '·') + '</b></div>'; });
      ROWS.forEach(function (r) {
        h += '<div class="sl-lab">' + r[1] + '</div>';
        items.forEach(function (t) { var v = t.d.rk && t.d.rk[r[0]], top = v != null && v === bestRow[r[0]] && n > 1; h += '<div class="sl-c' + (top ? ' sl-top' : '') + '">' + (v != null ? '#' + v + (top ? '<em>Best</em>' : '') : '·') + '</div>'; });
      });
      h += '</div></div>';
    }
    grid.innerHTML = h;
    grid.querySelectorAll('[data-love]').forEach(function (b) { b.onclick = function () { FCS.react(b.dataset.love, 'love'); }; });
    grid.querySelectorAll('[data-save]').forEach(function (b) { b.onclick = function () { var t = town(b.dataset.save); FCS.toggle({ id: t.id, name: t.name, img: small(t.img) }, 'shared link'); draw(); }; });
    grid.querySelectorAll('[data-menu]').forEach(function (b) { b.onclick = function () { var t = town(b.dataset.menu); FCS.confirmRemove(t); }; });
    var cards = grid.querySelector('.sl-cards'), dots = grid.querySelectorAll('.sl-dots i');
    if (cards && dots.length) { var sync = function () { var w = cards.firstElementChild.offsetWidth + 12, i = Math.round(cards.scrollLeft / w); dots.forEach(function (d, j) { d.classList.toggle('on', j === i); }); }; cards.addEventListener('scroll', function () { requestAnimationFrame(sync); }, { passive: true }); sync(); }
    var ids = items.slice(0, 4).map(function (t) { return t.id; });
    document.getElementById('sl-more').innerHTML = viewShared ? '' : '<div class="sl-next">' + (ids.length > 1 ? '<a href="compare.html?t=' + ids.join(',') + '">Compare side by side →</a>' : '') + '<a href="map.html?mode=vibes">Find more towns →</a></div>';
  }
  var vb = document.getElementById('sl-vibe'); if (vb && !shared) FCS.vibeLine(vb); else if (vb) vb.hidden = true;
  FCS.onChange(draw); draw();
  var w0 = phone(); addEventListener('resize', function () { if (phone() !== w0) { w0 = phone(); draw(); } });
})();
