"""Builds articles/towns-we-recommend.html (Nov 16 2026, reworked Nov 18 2026).

Nov 18: the picks are now the top 30 by our most recommended score (tools/qol_score.py): what
people want (style taps on the site) times what each town is best at. Ranked 1 to 30, score and
"best for" on each card, method box. Mark: "most recommended, a mix of what it's good for while
weighting what people want." (Nov 16 version: the 31 towns we built the site around, by coast.)
Uses articles/flood-risk-rankings.html as the page template (head, header, news layout,
More guides band, newsletter, footer). Town facts (name, region, price, blurb, photo) come from
src/data/beach-towns-t.json and category ranks from src/data/map-ld.json, so rerun after
town data changes:
    python3 tools/picks_article.py
"""
import json, re, html, os, sys
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from qol_score import scores, WEIGHTS, TOP, LABEL, WORD, PEOPLE, PICKS_MADE, BEST_N

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
os.chdir(ROOT)
ld = json.load(open('src/data/map-ld.json'))
T = {t['id']: t for t in json.load(open('src/data/beach-towns-t.json'))}
QOL, ORDER, BEST = scores(ld)
PICKS = ORDER[:TOP]
RANK = {t: i + 1 for i, t in enumerate(ORDER)}
assert len(PICKS) == TOP and all(t in T and t in ld for t in PICKS)
N = len(ld)
K = {'walk': 'walkability', 'beach': 'beaches', 'water': 'boating and the water', 'outdoors': 'the outdoors',
     'meet': 'social scene', 'charm': 'coastal charm', 'edu': 'public schools', 'airport': 'airport access',
     'afford': 'affordability'}
e = html.escape

# Coast order, the way the rest of the site lists towns: Panhandle west to east, Gulf north to south,
# Keys from the top down, Atlantic south to north.
GROUPS = [('panhandle', 'The Panhandle', lambda t: T[t]['lo']),
          ('gulf', 'The Gulf Coast', lambda t: -T[t]['la']),
          ('keys', 'The Florida Keys', lambda t: -T[t]['lo']),
          ('atlantic', 'The Atlantic Coast', lambda t: T[t]['la'])]



def nm(t):
    n = T[t]['n']
    return 'Miami Beach' if t == 'southbeach' else n.split(' (')[0]


def img(t):
    return re.sub(r'^\.\./img/c/|\.webp$', '', T[t]['img'])


def kprice(t):
    m = re.match(r'\$(\d+(?:\.\d+)?)(K|M)', T[t]['p'])
    v = float(m.group(1))
    return v * (1000 if m.group(2) == 'M' else 1)


def best_at(t):  # its two strongest categories, shown only if they rank in the top 25 of all towns
    r = [k for k in sorted(K, key=lambda k: ld[t]['rk'].get(k, N))[:2] if ld[t]['rk'][k] <= 25]
    return ' · '.join('No. %d of %d for %s' % (ld[t]['rk'][k], N, K[k]) if i == 0 else 'No. %d for %s' % (ld[t]['rk'][k], K[k]) for i, k in enumerate(r))


# Cedar Key tops our school score but has one small K-12 school, so it isn't our raising kids pick.
SKIP = {'edu': {'cedarkey'}}


# "Where to start": the pick that ranks best in each category, plus the lowest priced pick.
START = [('walk', 'Walk everywhere'), ('beach', 'The best beach'),
         ('water', 'Life on a boat'), ('edu', 'Top public schools'), ('meet', 'Making friends fast'),
         ('charm', 'History and charm'), ('airport', 'Flying out often')]
cheap = min(PICKS, key=kprice)
LEADS, used = {}, {cheap}
for k, _ in START:  # best ranked pick in each category, each town used once
    LEADS[k] = min((t for t in PICKS if t not in used and t not in SKIP.get(k, ())), key=lambda t: (ld[t]['rk'].get(k, N), t))
    used.add(LEADS[k])
assert all(ld[LEADS[k]]['rk'][k] <= 40 for k in LEADS), {k: ld[LEADS[k]]['rk'][k] for k in LEADS}

TITLE = 'The Florida Beach Towns We Recommend Most'
DEK = ('The 30 towns we recommend most out of the 167 on the Florida coast: the places that are best at '
       'what people moving here want most, starting with beaches, peace and quiet and a walkable town.')
DATE, DATE_H = '2026-11-16', 'Nov 16, 2026'
MOD, MOD_H = '2026-11-18', 'Updated Nov 18, 2026'
URL = 'https://www.floridacoastal.co/articles/towns-we-recommend'
LEAD = 'grayton-beach'


def quizbox(where):
    return ('<aside class="fq-box" aria-label="Find your town"><span class="fq-eb">Free, 2 minutes</span>'
            '<p class="fq-h">Not sure which one fits you?</p>'
            '<p class="fq-s">Answer 8 quick questions and we\'ll match you against all 167 towns and show you your top 5.</p>'
            '<a class="btn btn-accent fq-btn" href="find-your-mile.html" data-fq="%s">See my top 5 towns →</a></aside>') % where


def card(t):
    x = T[t]
    d, f = ('img/c/' + img(t)).rsplit('/', 1)
    ph = ('<img src="%s/s/%s.webp" srcset="%s/s/%s.webp 480w, %s/m/%s.webp 960w" sizes="(max-width:700px) 34vw, 200px" '
          'alt="" loading="lazy" decoding="async">') % (d, f, d, f, d, f)
    return ('<a class="pk-c" href="towns/%s.html"><span class="pk-ph">%s</span>'
            '<span class="pk-b"><span class="pk-q"><b>%d</b> out of 100 · No. %d of %d</span>'
            '<b class="pk-n">%s</b><span class="pk-r">%s · Typical home %s</span><span class="pk-t">%s</span>'
            '<span class="pk-k">Best for %s</span></span></a>') % (t, ph, QOL[t], RANK[t], N, e(nm(t)), e(x['r']), e(x['p']),
                                                                    e(x.get('b', '')), e(andjoin([WORD[k] for k in BEST[t][:3]])))


def andjoin(xs):
    return xs[0] if len(xs) == 1 else ', '.join(xs[:-1]) + ' and ' + xs[-1]


def method_box():
    rows = ''.join('<li><span>%s</span><b>%d%%</b></li>' % (e(LABEL[k]), round(w * 100)) for k, w in WEIGHTS.items())
    return ('<div class="fc-box pk-how"><h3>How we pick the towns we recommend most</h3>'
            '<p><b>What people want.</b> %d people exploring Florida Coastal made %d picks between them on our '
            '<a href="map.html?mode=vibes">Vibe Map</a> and homepage, choosing styles like Old Florida, Island Vibes and Dock Life. '
            'We turned those picks into how much each thing matters:</p><ul>%s</ul>'
            '<p><b>What each town is good for.</b> Every one of the 167 towns is ranked in each of these categories. '
            'A town is scored on its %d best, weighed by how much people want them, so it gets credit for what it does best '
            'and isn\'t marked down for what it isn\'t. 100 would mean the very top in the four things people want most.</p>'
            '<p>As more people use the site, these weights will move with them. Every category is explained on '
            '<a href="scoring.html">how we score</a>.</p></div>') % (PEOPLE, PICKS_MADE, rows, BEST_N)


def body():
    p = []
    p.append('<p>We could have ranked towns on what we like. Instead we started with what the people using Florida Coastal keep asking for: '
             'a real beach, peace and quiet, a town you can walk, time outside and a place with some charm. Then we looked for the towns that '
             'are best at those things. That mix is what we mean by most recommended.</p>')
    p.append('<p>These are the top %d. None of them is perfect. Some cost more than they should, some are far from an airport, and a few are '
             'quiet enough that you\'ll drive for a good dinner. We\'ve noted what each one does best, and the town pages cover the rest.</p>' % len(PICKS))
    p.append(method_box())
    p.append(quizbox('top'))
    p.append('<h2>Where to start</h2>')
    lis = ''.join('<li><span>%s</span><a href="towns/%s.html">%s</a></li>' % (e(lab), LEADS[k], e(nm(LEADS[k]))) for k, lab in START)
    lis += '<li><span>More house for less</span><a href="towns/%s.html">%s</a></li>' % (cheap, e(nm(cheap)))
    p.append('<div class="fc-box pk-start"><h3>If you want…</h3><ul>%s</ul>'
             '<p>Each one ranks near the top of all %d towns we cover for it.</p></div>' % (lis, N))
    p.append('<h2>The top %d, ranked</h2>' % len(PICKS))
    p.append('<div class="pk-list">%s</div>' % ''.join(card(t) for t in PICKS))
    p.append('<blockquote class="nyt-pull">Great places to visit aren\'t always great places to live. These are both.</blockquote>')
    p.append('<div class="fc-box"><h3>Before you pick one</h3><ul>'
             '<li><b>Go in August, not just February.</b> A town has to feel right in the heat, not only in season.</li>'
             '<li><b>Check the costs a listing leaves out.</b> Our <a href="articles/flood-risk-rankings.html">flood risk rankings</a> and '
             '<a href="articles/bills-not-on-the-listing.html">bills not on the listing</a> cover insurance, flood zones and the rest.</li>'
             '<li><b>Want to see beyond our picks?</b> The <a href="map.html">Vibe Map</a> has all 167 towns, and the '
             '<a href="map.html?mode=sliders">Slider Map</a> ranks them on what you care about most.</li>'
             '</ul></div>')
    p.append('<p>The right town is the one that fits the life you want to live there. These are the ones we\'d start with.</p>')
    p.append(quizbox('end'))
    return ''.join(p)


PK_CSS = ('<style id="pk-css">'
          '.pk-list{display:grid;gap:14px;margin:18px 0 34px}'
          '.pk-c{display:grid;grid-template-columns:200px 1fr;gap:18px;align-items:start;text-decoration:none;color:inherit;padding:14px;border:1px solid #DFE6E5;border-radius:10px;background:#fff;transition:border-color .15s}'
          '.pk-c:hover{border-color:#152A2E}'
          '.pk-ph{display:block;aspect-ratio:4/3;border-radius:6px;overflow:hidden;background:#e7ecea}'
          '.pk-ph img{width:100%;height:100%;object-fit:cover;display:block}'
          '.pk-b{display:flex;flex-direction:column;gap:4px;min-width:0}'
          '.pk-n{font:500 21px/1.25 "DM Sans",system-ui,sans-serif;color:#152A2E;letter-spacing:-.01em}'
          '.pk-r{font:600 12.5px/1.4 "DM Sans",sans-serif;color:#5b6b6e;letter-spacing:.02em}'
          '.pk-t{font-size:15.5px;line-height:1.5;color:#2b3a3d;margin-top:2px}'
          '.pk-k{font:600 12.5px/1.4 "DM Sans",sans-serif;color:#0F6E72;margin-top:4px}'
          '.pk-q{font:600 12.5px/1.4 "DM Sans",sans-serif;color:#5b6b6e;letter-spacing:.02em}'
          '.pk-q b{display:inline-block;min-width:34px;padding:2px 7px;margin-right:6px;border-radius:999px;background:#152A2E;color:#fff;text-align:center;font-size:13px}'
          '.pk-how ul{list-style:none;padding:0;margin:10px 0}'
          '.pk-how li{display:flex;justify-content:space-between;gap:16px;padding:7px 0;border-bottom:1px solid #DFE6E5;font-size:15px}'
          '.pk-how li:last-child{border-bottom:0}'
          '.fc-box.pk-how{background:#fff!important}.fc-box.pk-how p{font-size:15px;line-height:1.55}'
          '.pk-cnt{font:600 13px "DM Sans",sans-serif;color:#5b6b6e;margin-left:8px;letter-spacing:.02em}'
          '.fc-box.pk-start{background:#fff!important}.pk-start ul{list-style:none;padding:0;margin:0}'
          '.pk-start li{display:flex;justify-content:space-between;align-items:center;gap:16px;padding:9px 0;border-bottom:1px solid #DFE6E5}'
          '.pk-start li:last-child{border-bottom:0}.pk-start li a{font-weight:600;white-space:nowrap}'
          '.fc-box.pk-start p{font-size:13.5px;line-height:1.5;color:#5b6b6e;margin:12px 0 0}'
          '@media(max-width:700px){.pk-c{grid-template-columns:34% 1fr;gap:12px;padding:10px}.pk-n{font-size:19px}.pk-t{font-size:14.5px}'
          '.pk-start li{flex-wrap:nowrap;align-items:center;gap:12px;padding:7px 0;font-size:15px}.pk-start li span{flex:1;min-width:0}.pk-n{font-size:18px}}'
          '</style>')

src = open('articles/flood-risk-rankings.html').read()
out = src
out = re.sub(r'<title>.*?</title>', '<title>%s</title>' % e(TITLE), out, count=1)
out = re.sub(r'<meta name="description" content="[^"]*">', '<meta name="description" content="%s">' % e(DEK), out, count=1)
out = out.replace('https://www.floridacoastal.co/articles/flood-risk-rankings', URL)
out = re.sub(r'<meta property="og:title" content="[^"]*">', '<meta property="og:title" content="%s">' % e(TITLE), out, count=1)
out = re.sub(r'<meta property="og:description" content="[^"]*">', '<meta property="og:description" content="%s">' % e(DEK), out, count=1)
out = out.replace('https://www.floridacoastal.co/img/c/flood-siesta-key-lead.jpg', 'https://www.floridacoastal.co/img/c/%s.jpg' % LEAD)
out = out.replace('imagesrcset="img/w/m/flood-siesta-key-lead.webp 800w, img/w/flood-siesta-key-lead.webp 1600w"',
                  'imagesrcset="img/w/m/%s.webp 800w, img/w/%s.webp 1400w"' % (LEAD, LEAD))
graph = {"@context": "https://schema.org", "@graph": [
    {"@type": "Article", "headline": TITLE, "description": DEK, "image": "https://www.floridacoastal.co/img/c/%s.jpg" % LEAD,
     "datePublished": DATE, "dateModified": MOD, "author": {"@type": "Person", "name": "Mark and Betsy Scott"},
     "publisher": {"@id": "https://www.floridacoastal.co/#org"}, "mainEntityOfPage": URL},
    {"@type": "ItemList", "name": "The Florida beach towns we recommend most", "numberOfItems": len(PICKS),
     "itemListElement": [{"@type": "ListItem", "position": i + 1, "name": nm(t) + ', Florida',
                          "url": "https://www.floridacoastal.co/towns/" + t}
                         for i, t in enumerate(PICKS)]},
    {"@type": "BreadcrumbList", "itemListElement": [
        {"@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.floridacoastal.co/"},
        {"@type": "ListItem", "position": 2, "name": "Articles", "item": "https://www.floridacoastal.co/articles/"},
        {"@type": "ListItem", "position": 3, "name": TITLE, "item": URL}]}]}
out = re.sub(r'<script type="application/ld\+json">.*?</script>',
             lambda m: '<script type="application/ld+json">%s</script>' % json.dumps(graph, ensure_ascii=False).replace('</', '<\\/'), out, count=1, flags=re.S)
out = out.replace('</head>', PK_CSS + '</head>', 1)
hd = ('<div class="news-art"><div class="nyt"><header class="nyt-head"><div class="crumbs"><a href="index.html">Home</a> / '
      '<a href="articles/index.html">Articles</a> / Our Picks</div><p class="nyt-kick">Our Picks · Quality of Life</p><h1>%s</h1>'
      '<p class="nyt-dek">%s</p><div class="nyt-by"><span>By <b>Mark and Betsy Scott</b></span><time datetime="%s">%s</time><span>7 min read</span></div></header></div>'
      '<figure class="nyt-lead"><picture><source type="image/webp" srcset="img/w/m/%s.webp 800w, img/w/%s.webp 1400w" sizes="100vw">'
      '<img src="img/c/%s.jpg" alt="Grayton Beach on 30A, where the dune lake meets the Gulf" fetchpriority="high" decoding="async"></picture>'
      '<figcaption>Grayton Beach, on 30A.</figcaption></figure><div class="nyt"><article class="prose">%s') % (
          e(TITLE), e(DEK), MOD, MOD_H, LEAD, LEAD, LEAD, body())
i = out.index('<div class="news-art">')
j = out.index('</article><div class="nyt-cta">')
out = out[:i] + hd + out[j:]
out = out.replace('{"page":"articles/flood-risk-rankings.html","route":"article-flood-risk-rankings"}',
                  '{"page":"articles/towns-we-recommend.html","route":"article-towns-we-recommend"}')
m = re.search(r'<a class="card" data-aid="florida-newcomers-2026-election".*?</a>', out, re.S)
fcard = ('<a class="card" data-aid="flood-risk-rankings" href="articles/flood-risk-rankings.html"><div class="ph"><picture>'
         '<source type="image/webp" srcset="img/w/m/flood-siesta-key-lead.webp 800w, img/w/flood-siesta-key-lead.webp 1600w" sizes="(max-width:700px) 92vw, 400px">'
         '<img src="img/flood-siesta-key-lead.jpg" alt="" loading="lazy" decoding="async"></picture></div><div class="bd"><span class="cat">Rankings · 8 min read</span>'
         '<h3>Florida Beach Towns Ranked by Flood Risk: The 15 Riskiest Are All Islands</h3><div class="foot"><span class="more">Read</span><span class="rt">8 min</span></div></div></a>')
out = out.replace(m.group(0), fcard, 1)
assert 'flood-risk-rankings.html"><div class="ph">' in out
open('articles/towns-we-recommend.html', 'w').write(out)
print('ok', len(out), 'cards', out.count('class="pk-c"'))
for k, lab in START:
    print(lab, '->', nm(LEADS[k]), ld[LEADS[k]]['rk'][k])
