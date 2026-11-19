/* /shortlist: the saved towns side by side (Nov 19 2026, preview).
   Reads this browser's Shortlist (FCS) and, when the link has ?t=id:r,id:r, the towns someone shared.
   Uses T (towns.json: name, region, photo) and D (compare-d.json: price, ranks, season, watch outs). */
(function () {
  var esc = FCS.esc, HEART = FCS.HEART, SHARE = FCS.SHARE;
  var TB = {}; (typeof T !== 'undefined' ? T : []).forEach(function (t) { TB[t.id] = t; });
  var DD = typeof D !== 'undefined' ? D : {}; var DT = DD.towns || {};
  var N = DD.N || 167;
  var ROWS = [['beach', 'Beaches'], ['dining', 'Dining and arts'], ['walk', 'Walkability'], ['water', 'On the water'], ['quiet', 'Peace and quiet'], ['meet', 'Meet people'], ['outdoors', 'Outdoors and wellness'], ['airport', 'Airport access'], ['afford', 'Affordability'], ['nightlife', 'Nightlife']];
  var R = { love: 'Love', maybe: 'Maybe', no: 'No' }, RK = { l: 'love', m: 'maybe', n: 'no' };
  var BUD = { 'Under $400K': [0, 400], '$400K to $750K': [400, 750], '$750K to $1.5M': [750, 1500], '$1.5M and up': [1500, 1e9] };
  function k(pr) { var m = String(pr || '').replace(/,/g, '').match(/\$([\d.]+)\s*([KM])/i); return m ? +m[1] * (m[2].toUpperCase() === 'M' ? 1000 : 1) : null; }
  function town(id) { var t = TB[id], d = DT[id]; if (!t && !d) return null; return { id: id, name: (t && t.n) || (d && d.s) || id, img: (t && t.img) || (d && d.img) || '', region: (t && t.r) || (d && d.rg) || '', blurb: t && t.b, d: d || {} }; }
  function short(n) { return String(n).replace(/ \(.*\)$/, ''); }

  /* A shared link: ?t=naples:l,30a,cedarkey:m */
  var shared = null;
  var q = new URLSearchParams(location.search).get('t');
  if (q) {
    shared = q.split(',').map(function (x) { var p = x.split(':'); return { id: p[0], react: RK[p[1]] || null }; }).filter(function (x) { return town(x.id); }).slice(0, 10);
    var mine = FCS.list().map(function (t) { return t.id; }).join(',');
    if (!shared.length || shared.map(function (x) { return x.id; }).join(',') === mine) shared = null;
  }
  if (window.FC) FC.track('shortlist_view', (shared ? 'shared ' + shared.length : 'mine ' + FCS.list().length));

  var grid = document.getElementById('sl-grid'), ac = document.getElementById('sl-ac'), sh = document.getElementById('sl-shared');
  function draw() {
    var l = FCS.list(), viewShared = !!shared;
    var rows = viewShared ? shared : l;
    var items = rows.map(function (x) { var t = town(x.id); return t && Object.assign(t, { react: x.react }); }).filter(Boolean);
    var order = { love: 0, maybe: 1, no: 3 };
    items.sort(function (a, b) { return (order[a.react] != null ? order[a.react] : 2) - (order[b.react] != null ? order[b.react] : 2); });
    var n = items.length;

    document.getElementById('sl-h').textContent = viewShared ? 'A Shortlist shared with you' : 'Your Shortlist';
    document.getElementById('sl-l').textContent = n ? (viewShared ? plural(n) + ' someone is weighing for a move to the Florida coast. Save the ones you like.' : plural(n) + ', side by side. Tap Love, Maybe or No as you go, then share it with whoever you\'re moving with.') : '';

    sh.innerHTML = viewShared ? '<div class="sl-banner"><span>Viewing a shared Shortlist.' + (l.length ? ' Yours has ' + plural(l.length) + '.' : '') + '</span><button type="button" id="sl-addall">Save all to my Shortlist</button>' + (l.length ? '<a href="/shortlist">See mine</a>' : '') + '</div>' : '';
    if (viewShared) document.getElementById('sl-addall').onclick = function () {
      shared.forEach(function (x) { var t = town(x.id); if (t && !FCS.has(t.id)) FCS.add({ id: t.id, name: t.name, img: t.img.replace(/^img\/c\/(?:[tsmf]\/)?/, 'img/c/s/') }, 'shared link'); if (x.react) { var cur = FCS.list().filter(function (y) { return y.id === x.id; })[0]; if (cur && !cur.react) FCS.react(x.id, x.react); } });
      shared = null; history.replaceState(null, '', '/shortlist'); draw();
    };

    ac.innerHTML = n && !viewShared ? '<button type="button" class="sl-b sl-dark" id="sl-share">' + SHARE + 'Share with my partner</button>' +
      (FCS.followed() ? '<span class="sl-fol">' + HEART + 'Following these towns</span>' : '<button type="button" class="sl-b" id="sl-follow">Follow these towns</button>') : '';
    if (n && !viewShared) {
      document.getElementById('sl-share').onclick = function () { FCS.share(); };
      var fb = document.getElementById('sl-follow'); if (fb) fb.onclick = function () { FCS.ask('shortlist page'); };
    }

    if (!n) {
      grid.innerHTML = '<div class="sl-empty">' + HEART + '<h2>Nothing saved yet</h2><p>Tap the heart on any town to save it here. Or let us pick for you: eight questions, about two minutes.</p><div><a class="sl-b sl-dark" href="find-your-mile.html">Take the quiz</a><a class="sl-b" href="towns/index.html">Browse the coastal towns</a></div></div>';
      document.getElementById('sl-more').innerHTML = ''; return;
    }

    var budget = null; try { budget = BUD[localStorage.getItem('fc-sl-budget')] || null; } catch (e) {}
    var best = {};
    ROWS.forEach(function (r) { var m = Infinity; items.forEach(function (t) { if (t.react === 'no') return; var v = t.d.rk && t.d.rk[r[0]]; if (v != null && v < m) m = v; }); best[r[0]] = m; });
    var cols = items.length;
    var h = '<div class="sl-scroll"><div class="sl-t" style="--n:' + cols + '">';
    /* heads */
    h += '<div class="sl-lab sl-corner"></div>';
    items.forEach(function (t) {
      var fit = budget && k(t.d.pr) != null ? (k(t.d.pr) >= budget[0] && k(t.d.pr) < budget[1]) : null;
      h += '<div class="sl-c sl-head' + (t.react === 'no' ? ' sl-dim' : '') + '">' +
        '<a class="sl-ph" href="towns/' + esc(t.id) + '.html" style="background-image:url(\'' + esc(t.img) + '\')">' + (t.react === 'love' ? '<em class="sl-tag">Loved</em>' : '') + (fit === true ? '<span class="sl-fit">Fits your budget</span>' : '') + '</a>' +
        (viewShared ? '' : '<button type="button" class="sl-rm" data-id="' + esc(t.id) + '" aria-label="Remove ' + esc(short(t.name)) + '">&times;</button>') +
        '<a class="sl-n" href="towns/' + esc(t.id) + '.html">' + esc(short(t.name)) + '</a><span class="sl-rg">' + esc(t.region) + '</span>' +
        (viewShared ? '<div class="sl-sr">' + (t.react ? '<span class="sl-said sl-' + t.react + '">They said: ' + R[t.react] + '</span>' : '') + '<button type="button" class="sl-save' + (FCS.has(t.id) ? ' on' : '') + '" data-id="' + esc(t.id) + '">' + HEART + (FCS.has(t.id) ? 'Saved' : 'Save') + '</button></div>'
          : '<div class="sl-rx" role="group" aria-label="How do you feel about ' + esc(short(t.name)) + '?">' + ['love', 'maybe', 'no'].map(function (r) { return '<button type="button" data-id="' + esc(t.id) + '" data-r="' + r + '" class="' + (t.react === r ? 'on sl-' + r : '') + '" aria-pressed="' + (t.react === r) + '">' + R[r] + '</button>'; }).join('') + '</div>') +
        '</div>';
    });
    /* price */
    h += '<div class="sl-lab">Typical home</div>';
    items.forEach(function (t) { h += '<div class="sl-c sl-pr' + (t.react === 'no' ? ' sl-dim' : '') + '"><b>' + esc(t.d.pr || '·') + '</b>' + (t.d.recordedSaleLabel ? '<small>Recorded sales: ' + esc(t.d.recordedSaleLabel) + '</small>' : '') + '</div>'; });
    ROWS.forEach(function (r) {
      h += '<div class="sl-lab">' + r[1] + '</div>';
      items.forEach(function (t) {
        var v = t.d.rk && t.d.rk[r[0]], top = v != null && v === best[r[0]] && cols > 1 && t.react !== 'no';
        var pct = v != null ? Math.max(4, Math.round(100 * (1 - (v - 1) / N))) : 0;
        h += '<div class="sl-c sl-sc' + (top ? ' sl-best' : '') + (t.react === 'no' ? ' sl-dim' : '') + '">' + (v != null ? '<span class="sl-bar"><i style="width:' + pct + '%"></i></span><span class="sl-v">#' + v + '<small> of ' + N + '</small></span>' + (top ? '<em>Best</em>' : '') : '·') + '</div>';
      });
    });
    h += '<div class="sl-lab">The season</div>';
    items.forEach(function (t) { h += '<div class="sl-c sl-tx' + (t.react === 'no' ? ' sl-dim' : '') + '">' + esc(t.d.se || '') + '</div>'; });
    h += '<div class="sl-lab">Watch for</div>';
    items.forEach(function (t) { h += '<div class="sl-c sl-tx' + (t.react === 'no' ? ' sl-dim' : '') + '">' + esc(t.d.w || '') + '</div>'; });
    h += '</div></div>';
    grid.innerHTML = h;

    grid.querySelectorAll('.sl-rx button').forEach(function (b) { b.onclick = function () { FCS.react(b.dataset.id, b.dataset.r); }; });
    grid.querySelectorAll('.sl-rm').forEach(function (b) { b.onclick = function () { FCS.remove(b.dataset.id); FCS.toast('Removed from your Shortlist'); }; });
    grid.querySelectorAll('.sl-save').forEach(function (b) { b.onclick = function () { var t = town(b.dataset.id); FCS.toggle({ id: t.id, name: t.name, img: t.img.replace(/^img\/c\/(?:[tsmf]\/)?/, 'img/c/s/') }, 'shared link'); draw(); }; });

    var ids = items.filter(function (t) { return t.react !== 'no'; }).slice(0, 4).map(function (t) { return t.id; });
    document.getElementById('sl-more').innerHTML = viewShared ? '' : '<div class="sl-next">' +
      (ids.length > 1 ? '<a href="compare.html?t=' + ids.join(',') + '">Full comparison with hospitals and airports →</a>' : '') +
      '<a href="map.html?mode=vibes">Find more towns on the Vibe Map →</a><a href="find-your-mile.html">Retake the quiz →</a></div>';
  }
  function plural(n) { return FCS.plural(n); }
  FCS.onChange(draw); draw();
})();
