"""Builds articles/quality-of-life-rankings.html (Nov 16 2026).

Uses articles/flood-risk-rankings.html as the page template (head, header, news layout,
More guides band, newsletter, footer) and fills it with the Best all around ranking: the
same order as BEST in src/js/beach-towns-2.js (the Slider Map's Best all around scoring).
Scores are the Slider Map's: every priority except Quiet or lively counts the same,
affordability counts 1.5x, 0 to 100. Rerun after town data changes:
    python3 tools/qol_article.py
"""
import json, re, html, os

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
os.chdir(ROOT)
ld = json.load(open('src/data/map-ld.json'))
T = {t['id']: t for t in json.load(open('src/data/beach-towns-t.json'))}
BEST = json.loads('[' + re.search(r'BEST=\[([^\]]*)\]', open('src/js/beach-towns-2.js').read()).group(1) + ']')
K = [('walk', 'Walkability'), ('beach', 'Beaches'), ('water', 'On the water'), ('outdoors', 'Active outdoors'),
     ('meet', 'Social scene'), ('charm', 'Coastal charm'), ('edu', 'Public schools'), ('airport', 'Airport access'),
     ('afford', 'Affordability')]
W = {k: (1.5 if k == 'afford' else 1) for k, _ in K}
SC = {t: round(100 * sum(W[k] * ld[t]['sv'].get(k, 0) for k, _ in K) / sum(W.values())) for t in ld}
assert all(SC[BEST[i]] >= SC[BEST[i + 1]] for i in range(len(BEST) - 1)), 'scores out of BEST order'
N = len(BEST)
RK = {t: i + 1 for i, t in enumerate(BEST)}
COAST = {'gulf': 'Gulf Coast', 'atlantic': 'Atlantic', 'panhandle': 'Panhandle', 'keys': 'Florida Keys'}
e = html.escape


def nm(t):
    n = T[t]['n']
    return 'Miami Beach' if t == 'southbeach' else n.split(' (')[0]


def a(t, label=None):
    return '<a href="towns/%s.html">%s</a>' % (t, e(label or nm(t)))


def kprice(t):
    m = re.match(r'\$(\d+(?:\.\d+)?)(K|M)', T[t]['p'])
    if not m:
        return None
    v = float(m.group(1))
    return v * (1000 if m.group(2) == 'M' else 1)


# facts used in the copy, checked here so the words always match the data
top = BEST[:5]
under400 = [t for t in BEST[:25] if (kprice(t) or 9999) < 400 and ' to ' not in T[t]['p']][:5]
assert RK['dunedin'] == 1 and ld['dunedin']['rk']['walk'] == 3 and ld['dunedin']['rk']['charm'] == 5 and ld['dunedin']['rk']['beach'] == 15
assert SC['naples'] == SC['venice']
assert ld['30a']['rk']['beach'] == 2 and ld['30a']['rk']['edu'] == 3 and ld['30a']['rk']['afford'] == 154 and RK['30a'] == 12
c10 = [T[t]['c'] for t in BEST[:10]]
assert c10.count('gulf') == 5 and c10.count('atlantic') == 5
c25 = [T[t]['c'] for t in BEST[:25]]
assert (c25.count('atlantic'), c25.count('gulf'), c25.count('panhandle')) == (13, 10, 2)
assert RK['keywest'] == 36 and RK['destin'] == 47 and RK['siesta-key'] == 50 and RK['pcb'] == 80
assert ld['siesta-key']['rk']['beach'] == 1 and ld['pcb']['rk']['beach'] == 3 and ld['destin']['rk']['beach'] == 7
assert ld['keywest']['rk']['walk'] == 4 and ld['keywest']['rk']['afford'] == 156
assert ld['pcb']['rk']['charm'] == 167 and ld['destin']['rk']['charm'] == 158 and ld['siesta-key']['rk']['afford'] == 150

TITLE = 'The Best Florida Beach Towns to Live In: All 167 Ranked'
DEK = ('We scored every beach town we cover on nine things that shape daily life, from walkability and beaches to '
       'schools and the drive to the airport. Dunedin comes out on top, and the famous names land lower than you\'d think.')
DATE, DATE_H = '2026-11-16', 'Nov 16, 2026'
URL = 'https://www.floridacoastal.co/articles/quality-of-life-rankings'


def quick():
    lis = ''.join('<li><span>%s</span><b>%d</b></li>' % (e(nm(t)), SC[t]) for t in top)
    lo = ''.join('<li><span>%s <small>No. %d</small></span><b>%s</b></li>' % (e(nm(t)), RK[t], e(T[t]['p'])) for t in under400)
    return ('<div class="fc-quick"><div class="fc-q lo"><h2>Top 5 overall</h2><ol>%s</ol></div>'
            '<div class="fc-q"><h2>Top 25 under $400K</h2><ol>%s</ol></div></div>') % (lis, lo)


def quizbox(where):
    return ('<aside class="fq-box" aria-label="Find your town"><span class="fq-eb">Free, 2 minutes</span>'
            '<p class="fq-h">Rank them on what matters to you</p>'
            '<p class="fq-s">This list weighs everything the same. Answer 8 quick questions and we\'ll rank all 167 on your priorities and show you your top 5.</p>'
            '<a class="btn btn-accent fq-btn" href="find-your-mile.html" data-fq="%s">See my top 5 towns →</a></aside>') % where


def rows():
    out = []
    top_sc = SC[BEST[0]]
    for t in BEST:
        x = T[t]
        dl = ''.join('<div><dt>%s</dt><dd>No. %d <small>of %d</small></dd></div>' % (lab, ld[t]['rk'].get(k, N), N) for k, lab in K)
        search = re.sub(r'[^a-z0-9 ]', '', (nm(t) + ' ' + x['n'] + ' ' + x['r']).lower())
        out.append(
            '<details class="fc-trow" data-t="%s"><summary><span class="fc-rk">%d</span><span class="fc-lab">%s</span>'
            '<span class="fc-track"><span class="fc-seg c1" style="width:%.1f%%"></span></span><span class="fc-val">%d</span></summary>'
            '<div class="fc-tdet"><dl><div><dt>Region</dt><dd>%s</dd></div><div><dt>Typical home</dt><dd>%s</dd></div>%s</dl>'
            '<p class="fc-hist">%s %s</p></div></details>' % (
                e(search), RK[t], e(nm(t)), 100 * SC[t] / top_sc, SC[t], e(x['r']), e(x['p']), dl,
                e(x.get('b', '')), '<a href="towns/%s.html">See %s →</a>' % (t, e(nm(t)))))
    return ''.join(out)


SEARCH_JS = ("var v=this.value.toLowerCase().replace(/[^a-z0-9 ]/g,'').trim(),n=0;"
             "document.querySelectorAll('.fc-rank [data-t]').forEach(function(r){var h=!!v&&r.getAttribute('data-t').indexOf(v)<0;r.hidden=h;});"
             "document.querySelectorAll('.fc-rank details[data-t]').forEach(function(d){if(!d.hidden&&v)n++;d.open=!!v&&!d.hidden&&n<=3;});"
             "document.querySelector('.fc-rank').classList.toggle('qol-all',!!v);")


def body():
    p = []
    p.append('<p>Ask ten people what makes a beach town a good place to live and you\'ll get ten answers. So we didn\'t pick one. '
             'We scored all %d towns we cover on the same nine things, weighed them the same, and ranked them.</p>' % N)
    p.append('<p>%s comes out on top. It\'s the 3rd most walkable town on our list and has the 5th most coastal charm, and with Honeymoon and '
             'Caladesi islands just offshore its beaches rank 15th. %s and %s tie for second on score, then %s and %s.</p>' % (
                 a('dunedin'), a('naples'), a('venice'), a('fernandina'), a('stuart')))
    p.append(quick())
    p.append(quizbox('top'))
    p.append('<h2>No town wins everything</h2>')
    p.append('<p>Even Dunedin has soft spots. It ranks 84th for boating and waterfront access and 86th for affordability. '
             'The towns at the top aren\'t the best at any one thing. They\'re good at almost everything and bad at almost nothing.</p>')
    p.append('<p>%s shows the flip side. It has the 2nd best beaches and the 3rd best public schools on our list, but it ranks 154th of 167 for '
             'affordability, and that one score holds it at No. 12.</p>' % a('30a'))
    p.append('<h2>The Gulf and the Atlantic split the top 10</h2>')
    p.append('<p>Five of the top 10 are on the Gulf and five are on the Atlantic. Go to the top 25 and the Atlantic pulls ahead, 13 to 10, '
             'with two from the Panhandle: 30A at No. 12 and %s at No. 24. The Keys\' best is %s at No. 36.</p>' % (a('pensacola'), a('keywest')))
    p.append('<h2>The famous names land in the middle</h2>')
    p.append('<p>%s has the No. 1 beach on our list and ranks 50th overall. %s is 7th for beaches and 47th overall. %s has the 3rd best beach '
             'and comes in at No. 80. %s is the 4th most walkable town we cover and 36th overall.</p>' % (
                 a('siesta-key'), a('destin'), a('pcb', 'Panama City Beach'), a('keywest')))
    p.append('<p>The pattern is the same each time. These towns are known for one or two things, and they give up points elsewhere: Siesta Key ranks 150th for affordability, '
             'Key West 156th, and Destin and Panama City Beach sit near the bottom for coastal charm. Great places to visit can be harder places to live.</p>')
    p.append('<blockquote class="nyt-pull">The towns at the top aren\'t the best at any one thing. They\'re good at almost everything.</blockquote>')
    p.append('<h2>What we score</h2>')
    p.append('<p>Nine categories, each ranked from 1 to %d. The overall score is a blend of all nine, and affordability counts one and a half times '
             'because it touches everything else. We left out quiet versus lively on purpose: that\'s a preference, not a measure of quality.</p>' % N)
    p.append('<div class="fc-box"><h3>The nine categories</h3><ul>'
             '<li><b>Walkability:</b> how many daily needs are within a short walk of the center of town.</li>'
             '<li><b>Beaches:</b> public beach access, sand and water quality, and national beach rankings.</li>'
             '<li><b>On the water:</b> marinas, boat ramps, fishing piers and waterfront access.</li>'
             '<li><b>Active outdoors:</b> paddling, a real surf break, trails and bike paths, and nature preserves close by.</li>'
             '<li><b>Social scene:</b> restaurants, cafes, gyms, clubs and community spots near downtown, in a town the size where you keep running into people.</li>'
             '<li><b>Coastal charm:</b> a real historic downtown, local spots over chains, no wall of condo towers, and cared for streets.</li>'
             '<li><b>Public schools:</b> the Florida Department of Education grade for the county district that serves the town (2025-26).</li>'
             '<li><b>Airport access:</b> drive time to the nearest major airport.</li>'
             '<li><b>Affordability:</b> home prices against the Florida median, plus typical insurance costs.</li>'
             '</ul><p>The full method is on <a href="scoring.html">How we score</a>.</p></div>')
    p.append('<h2>All %d towns, ranked</h2>' % N)
    p.append('<p class="fc-how"><b>How to read it:</b> the score runs from 0 to 100, and the bars are scaled to Dunedin\'s %d. '
             '<b>Tap a town</b> to see where it ranks in all nine categories.</p>' % SC[BEST[0]])
    p.append('<div class="fc-rank qol-rank"><label class="fc-search"><span>Find your town</span><input type="search" placeholder="Type a town, like Destin" autocomplete="off" oninput="%s"></label>'
             '<input type="radio" name="fcv" id="fcv1" checked><div class="fc-panels"><div class="fc-panel p1"><div class="fc-chart-h"><b>Quality of life score</b>'
             '<span>All nine categories, affordability counted 1.5 times. Tap a town for every rank.</span></div><div class="fc-rows">%s</div>'
             '<button type="button" class="qol-more" onclick="this.closest(\'.fc-rank\').classList.add(\'qol-all\');this.remove()">Show all %d towns</button>'
             '</div></div></div>' % (e(SEARCH_JS), rows(), N))
    p.append('<div class="fc-box"><h3>Make the list your own</h3><ul>'
             '<li><b>Weigh what matters to you.</b> Care more about beaches than schools? The <a href="map.html?mode=sliders">Slider Map</a> reranks all %d towns as you move each priority.</li>'
             '<li><b>Get your top 5.</b> <a href="find-your-mile.html">The quiz</a> asks 8 quick questions and does the weighing for you.</li>'
             '<li><b>Check the costs that don\'t show up here.</b> Our <a href="articles/flood-risk-rankings.html">flood risk rankings</a> and '
             '<a href="articles/bills-not-on-the-listing.html">bills not on the listing</a> cover what a score can\'t.</li>'
             '<li><b>Visit in August, not just February.</b> A town that ranks well on paper still has to feel right in the heat.</li>'
             '</ul></div>' % N)
    p.append('<p>A list like this is a place to start, not a verdict. The best town on it is the one that fits the life you want to live there.</p>')
    story = ['dunedin', 'naples', 'venice', 'fernandina', 'stuart', '30a', 'pensacola', 'keywest', 'siesta-key', 'destin', 'pcb']
    p.append('<div class="nyt-towns"><h3>Towns in this story</h3><div class="nt-grid">%s</div></div>' % ''.join(
        '<a href="towns/%s.html"><b>%s</b><span>%s · No. %d</span></a>' % (t, e(nm(t)), COAST[T[t]['c']], RK[t]) for t in story))
    p.append(quizbox('end'))
    return ''.join(p)


QOL_CSS = ('<style id="qol-css">'
           '.qol-rank .fc-trow:nth-child(n+26){display:none}.qol-rank.qol-all .fc-trow:nth-child(n+26){display:block}'
           '.qol-rank .fc-trow[hidden]{display:none!important}'
           '.qol-rank .fc-tdet dl{grid-template-columns:repeat(auto-fill,minmax(150px,1fr))}'
           '.qol-rank .fc-hist a{font-weight:600;white-space:nowrap}'
           '.qol-more{display:block;margin:18px auto 4px;padding:0 22px;height:46px;border-radius:999px;border:1px solid #152A2E;background:#fff;color:#152A2E;font:600 15px "DM Sans",sans-serif;cursor:pointer}'
           '.qol-all .qol-more{display:none}'
           '.fc-quick small{font-size:12px;color:#5b6b6e;margin-left:6px;font-weight:500}'
           '</style>')

src = open('articles/flood-risk-rankings.html').read()
out = src
# head
out = re.sub(r'<title>.*?</title>', '<title>%s</title>' % e(TITLE), out, count=1)
out = re.sub(r'<meta name="description" content="[^"]*">', '<meta name="description" content="%s">' % e(DEK), out, count=1)
out = out.replace('https://www.floridacoastal.co/articles/flood-risk-rankings', URL)
out = re.sub(r'<meta property="og:title" content="[^"]*">', '<meta property="og:title" content="%s">' % e(TITLE), out, count=1)
out = re.sub(r'<meta property="og:description" content="[^"]*">', '<meta property="og:description" content="%s">' % e(DEK), out, count=1)
out = out.replace('https://www.floridacoastal.co/img/c/flood-siesta-key-lead.jpg', 'https://www.floridacoastal.co/img/c/dunedin-honeymoon.jpg')
out = out.replace('imagesrcset="img/w/m/flood-siesta-key-lead.webp 800w, img/w/flood-siesta-key-lead.webp 1600w"',
                  'imagesrcset="img/w/m/dunedin-honeymoon.webp 800w, img/w/dunedin-honeymoon.webp 1400w"')
graph = {"@context": "https://schema.org", "@graph": [
    {"@type": "Article", "headline": TITLE, "description": DEK, "image": "https://www.floridacoastal.co/img/c/dunedin-honeymoon.jpg",
     "datePublished": DATE, "dateModified": DATE, "author": {"@type": "Person", "name": "Mark and Betsy Scott"},
     "publisher": {"@id": "https://www.floridacoastal.co/#org"}, "mainEntityOfPage": URL},
    {"@type": "ItemList", "name": "Best Florida beach towns to live in", "numberOfItems": N,
     "itemListElement": [{"@type": "ListItem", "position": i + 1, "name": nm(t) + ', Florida',
                          "url": "https://www.floridacoastal.co/towns/" + t} for i, t in enumerate(BEST[:25])]},
    {"@type": "BreadcrumbList", "itemListElement": [
        {"@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.floridacoastal.co/"},
        {"@type": "ListItem", "position": 2, "name": "Articles", "item": "https://www.floridacoastal.co/articles/"},
        {"@type": "ListItem", "position": 3, "name": TITLE, "item": URL}]}]}
out = re.sub(r'<script type="application/ld\+json">.*?</script>',
             lambda m: '<script type="application/ld+json">%s</script>' % json.dumps(graph, ensure_ascii=False).replace('</', '<\\/'), out, count=1, flags=re.S)
out = out.replace('</head>', QOL_CSS + '</head>', 1)
# article
hd = ('<div class="news-art"><div class="nyt"><header class="nyt-head"><div class="crumbs"><a href="index.html">Home</a> / '
      '<a href="articles/index.html">Articles</a> / Rankings</div><p class="nyt-kick">Rankings · Quality of Life</p><h1>%s</h1>'
      '<p class="nyt-dek">%s</p><div class="nyt-by"><span>By <b>Mark and Betsy Scott</b></span><time datetime="%s">%s</time><span>6 min read</span></div></header></div>'
      '<figure class="nyt-lead"><picture><source type="image/webp" srcset="img/w/m/dunedin-honeymoon.webp 800w, img/w/dunedin-honeymoon.webp 1400w" sizes="100vw">'
      '<img src="img/c/dunedin-honeymoon.jpg" alt="Green and blue shallows off Dunedin, with a boat crossing toward the islands and the Gulf beyond" fetchpriority="high" decoding="async"></picture>'
      '<figcaption>The water off Dunedin, No. 1 on our list.</figcaption></figure><div class="nyt"><article class="prose">%s') % (e(TITLE), e(DEK), DATE, DATE_H, body())
i = out.index('<div class="news-art">')
j = out.index('</article><div class="nyt-cta">')
out = out[:i] + hd + out[j:]
# more guides: swap the flood story's own card set for one that includes the flood rankings
out = out.replace('{"page":"articles/flood-risk-rankings.html","route":"article-flood-risk-rankings"}',
                  '{"page":"articles/quality-of-life-rankings.html","route":"article-quality-of-life-rankings"}')
m = re.search(r'<a class="card" data-aid="florida-newcomers-2026-election".*?</a>', out, re.S)
card = ('<a class="card" data-aid="flood-risk-rankings" href="articles/flood-risk-rankings.html"><div class="ph"><picture>'
        '<source type="image/webp" srcset="img/w/m/flood-siesta-key-lead.webp 800w, img/w/flood-siesta-key-lead.webp 1600w" sizes="(max-width:700px) 92vw, 400px">'
        '<img src="img/flood-siesta-key-lead.jpg" alt="" loading="lazy" decoding="async"></picture></div><div class="bd"><span class="cat">Rankings · 8 min read</span>'
        '<h3>Florida Beach Towns Ranked by Flood Risk: The 15 Riskiest Are All Islands</h3><div class="foot"><span class="more">Read</span><span class="rt">8 min</span></div></div></a>')
out = out.replace(m.group(0), card, 1)
assert 'flood-risk-rankings.html"><div class="ph">' in out
os.makedirs('articles', exist_ok=True)
open('articles/quality-of-life-rankings.html', 'w').write(out)
print('ok', len(out), 'rows', out.count('class="fc-trow"'))
