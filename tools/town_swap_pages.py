#!/usr/bin/env python3
"""Town pages for the Nov 12 town list change. Run after tools/town_swap.py.

- Rewrites the baked ranks (stat tiles and scorecard bars) on every town page from src/data/map-ld.json
- Folds the 6 merged towns into their hosts (an "Also covers" line, links pointed at the host)
- Refreshes nearby lists where a merged town dropped out or a new town is closer
- Writes compact pages for the 6 new towns from verified research only
"""
import json, re, math, glob, os, html, subprocess

MERGE = {'north-redington-beach': 'redington-shores', 'redington-beach': 'redington-shores',
         'valparaiso': 'niceville', 'okaloosa-island': 'fort-walton-beach',
         'holly-hill': 'daytona', 'south-daytona': 'daytona'}
COVERS = {'redington-shores': 'North Redington Beach and Redington Beach', 'niceville': 'Valparaiso',
          'fort-walton-beach': 'Okaloosa Island', 'daytona': 'Holly Hill and South Daytona'}
NEW = ['marathon', 'big-pine-key', 'key-biscayne', 'boca-grande', 'pompano-beach', 'deerfield-beach']
N = 167
LAB = {'Active outdoors': 'outdoors', 'Affordability': 'afford', 'Airport access': 'airport', 'Beaches': 'beach',
       'Coastal charm': 'charm', 'Dining and arts': 'dining', 'Meet people': 'meet', 'Nightlife': 'nightlife',
       'On the water': 'water', 'Peace and quiet': 'quiet', 'Walkability': 'walk'}
KL = {v: k for k, v in LAB.items()}
VIBE = {'active': 'Active Outdoors', 'afford': 'Affordable', 'beaches': 'Best Beaches', 'bluezone': 'Healthy Living',
        'dock': 'Dock of the Bay', 'island': 'Island Life', 'oldfl': 'Old Florida', 'remote': 'Remote Work',
        'social': 'Social Scene', 'sophcalm': 'Sophisticated Laid Back', 'sophhigh': 'High Energy', 'walk': 'Walkable'}
ANCH = {'South Florida and the Keys': 'south-keys', 'Southwest Florida': 'southwest'}
INS = {
 'monroe': 'About $14,850 a year for $300K of coverage in Monroe County (Broker One, 2026). Flood insurance matters here.',
 'miamidade': 'Condo policies cost much less than houses. Miami-Dade house policies average about $12,200 a year for $300K of coverage (Broker One, 2026).',
 'broward': 'About $9,750 a year for $300K of coverage in Broward County (Broker One, 2026). Flood insurance matters here.',
 'lee': 'About $6,180 a year for $300K of coverage in Lee County (Broker One, 2026). Flood insurance and elevation matter a lot here.',
}
STATE = ' Statewide about $10,384 a year for $250K (MoneyGeek, 2026). Get a quote and check the flood zone for any address.'

T = json.load(open('src/data/towns.json')); TD = {t['id']: t for t in T}
LD = json.load(open('src/data/map-ld.json')); C = json.load(open('src/data/compare-d.json'))['towns']
OLDT = {t['id']: t for t in json.loads(subprocess.check_output(['git', 'show', 'HEAD:src/data/towns.json']))}
B = {**json.load(open('/home/claude/fig/newtowns_batch1.json')), **json.load(open('/home/claude/fig/newtowns_batch2.json'))}
PG = json.load(open('/home/claude/fig/newtowns_pages.json'))
e = lambda s: html.escape(s, quote=False)

def mi(a, b):
    R = 3958.8; p1, p2 = math.radians(a['la']), math.radians(b['la']); dl = math.radians(b['lo'] - a['lo'])
    h = math.sin((p2 - p1) / 2) ** 2 + math.cos(p1) * math.cos(p2) * math.sin(dl / 2) ** 2
    return 2 * R * math.asin(math.sqrt(h))

def bar(rk):
    w = round((N - rk + 1) / N * 100)
    t = 'Top %d%%' % math.ceil(rk / N * 100) if rk <= N / 2 else 'Bottom %d%%' % math.ceil((N - rk + 1) / N * 100)
    return w, t

def trunc(b, n=92):
    if len(b) <= n: return b
    c = b[:n]; return c[:c.rfind(' ')].rstrip(',;:.') + '…'

def card(me, t):
    img = t['img'] if t['img'].startswith('img/c/') else 'img/c/generic/harbor-boats.webp'
    return ('<a href="towns/%s-v3.html"><div class="ph" style="background-image:url(\'%s\')"></div><div><b>%s</b>'
            '<small>%d miles away</small><span>%s</span></div></a>') % (t['id'], img, e(t['n']), round(mi(me, t)), e(trunc(t['b'])))

def head(s):
    m = re.match(r'<!-- town (.*?) -->', s); return json.loads(m.group(1)), m

def set_head(s, j):
    return re.sub(r'^<!-- town .*? -->', lambda _: '<!-- town ' + json.dumps(j, ensure_ascii=False, separators=(',', ':')) + ' -->', s, count=1)

def mt(t): return {'n': t['n'], 'la': t['la'], 'lo': t['lo'], 'id': t['id']}

# ---------------------------------------------------------------- existing pages
log = []
for f in sorted(glob.glob('src/towns/*-v3.html')):
    s0 = s = open(f).read(); j, _ = head(s); i = j['id']
    if i in MERGE: continue
    rk = LD[i]['rk']
    # ranks
    s = re.sub(r'<b>#\d+</b><span>For ([^,]*), of 167</span>',
               lambda m: '<b>#%d</b><span>For %s, of 167</span>' % (rk[LAB[m.group(1)[0].upper() + m.group(1)[1:]]], m.group(1)), s)
    def rowfix(m):
        w, t = bar(rk[LAB[m.group(1)]])
        return '<span class="l">%s</span><span class="bar"><i style="width:%d%%"></i></span><span class="r">%s</span>' % (m.group(1), w, t)
    s = re.sub(r'<span class="l">([^<]*)</span><span class="bar"><i style="width:\d+%"></i></span><span class="r">[^<]*</span>', rowfix, s)
    # links to merged pages go to the host
    for k, h in MERGE.items():
        s = s.replace('href="towns/%s-v3.html"' % k, 'href="towns/%s-v3.html"' % h)
    # nearby list
    me = TD[i]
    near = [MERGE.get(x, x) for x in j['near']]
    near = [x for n_, x in enumerate(near) if x != i and x not in near[:n_]]
    pool = sorted([t for t in T if t['id'] != i], key=lambda t: mi(me, t))
    for t in pool:
        if len(near) >= 3: break
        if t['id'] not in near: near.append(t['id'])
    for nid in NEW:
        if nid == i or nid in near: continue
        far = max(near, key=lambda x: mi(me, TD[x]))
        if mi(me, TD[nid]) < mi(me, TD[far]):
            near.remove(far); near.append(nid)
    near = sorted(near, key=lambda x: mi(me, TD[x])) if near != j['near'] else near
    # mini map towns: drop merged, add new towns inside the current map's box
    mts = [x for x in j['mapTowns'] if x['id'] not in MERGE]
    if mts:
        la0 = min(x['la'] for x in mts); la1 = max(x['la'] for x in mts); lo0 = min(x['lo'] for x in mts); lo1 = max(x['lo'] for x in mts)
        for nid in NEW:
            t = TD[nid]
            if nid != i and la0 <= t['la'] <= la1 and lo0 <= t['lo'] <= lo1 and nid not in [x['id'] for x in mts]: mts.append(mt(t))
    for x in near:
        if x not in [m_['id'] for m_ in mts]: mts.append(mt(TD[x]))
    if near != j['near']:
        cards = ''.join(card(me, TD[x]) for x in near)
        s = re.sub(r'(<div class="nt">).*?(</div></div></section>)', lambda m: m.group(1) + cards + m.group(2), s, count=1, flags=re.S)
    j['near'] = near; j['mapTowns'] = mts
    s = set_head(s, j)
    # host pages say what they cover
    if i in COVERS and 'class="incl"' not in s:
        s = re.sub(r'(<p class="tag">.*?</p>)', lambda m: m.group(1) + '<p class="incl">Also covers %s</p>' % COVERS[i], s, count=1)
    if s != s0:
        open(f, 'w').write(s); log.append(i)

# ---------------------------------------------------------------- new pages
TPL = open('src/towns/islamorada-v3.html').read()
ASK = re.search(r'<aside id="ask">.*</aside></div>', TPL, re.S).group(0)
GENERIC = 'About in the middle of our 167 towns.'

def page(i):
    t = TD[i]; d = LD[i]; P = PG[i]; R = B[i]; rk = d['rk']; nm = t['n']
    near = [x['id'] for x in sorted([x for x in T if x['id'] != i], key=lambda x: mi(t, x))[:3]]
    mts = [mt(x) for x in T if x['id'] in [y['id'] for y in sorted(T, key=lambda y: mi(t, y))[:6]]]
    j = {'page': f'towns/{i}-v3.html', 'id': i, 'name': nm, 'near': near, 'center': {'la': t['la'], 'lo': t['lo']}, 'mapTowns': mts}
    url = f'https://www.floridacoastal.co/towns/{i}.html'; img = f'https://www.floridacoastal.co/img/c/{i}.jpg'
    desc = P['tag'] + f' See how {nm} scores on beaches, boating, walkability, nightlife and cost.'
    rows = sorted(LAB.values(), key=lambda k: rk[k])
    hi = [k for k in rows if rk[k] <= 40] or rows[:1]
    lo = [k for k in rows if rk[k] >= 111 and k not in hi]
    mid = [k for k in rows if k not in hi and k not in lo]
    note = lambda k: P['notes'].get(k, GENERIC)
    def det(cls, k):
        w, tx = bar(rk[k])
        return f'\n<details class="{cls}"><summary><span class="l">{KL[k]}</span><span class="bar"><i style="width:{w}%"></i></span><span class="r">{tx}</span></summary><p>{e(note(k))}</p></details>'
    def lst(ks):
        ws = [KL[k].lower() for k in ks]
        return ws[0] if len(ws) == 1 else ', '.join(ws[:-1]) + ' and ' + ws[-1]
    verdict = f'Strongest on <b>{lst(hi[:3])}</b>.' + (f' Weakest on <b>{lst(lo[-3:])}</b>.' if lo else '')
    sc = '<div class="sc3"><h4>Where it shines</h4>' + ''.join(det('hi', k) for k in hi)
    if lo: sc += '<h4>Where it falls short</h4>' + ''.join(det('lo', k) for k in lo)
    if mid: sc += f'\n<details class="avg"><summary>About average for {len(mid)} more: {lst(mid)}</summary>' + ''.join(det('mid', k) for k in mid) + '</details>'
    sc += '</div>'
    best2 = sorted(LAB.values(), key=lambda k: rk[k])[:2]
    stats = (f'<div class="stats"><div><b>{t["p"]}</b><span>Typical home</span></div>'
             f'<div><b>#{rk[best2[0]]}</b><span>For {KL[best2[0]].lower()}, of 167</span></div>'
             f'<div><b>{P["air_short"][0]}</b><span>{P["air_short"][1]}</span></div>'
             f'<div><b>#{rk[best2[1]]}</b><span>For {KL[best2[1]].lower()}, of 167</span></div></div>')
    chips = '<div class="chips">' + ''.join(f'<a href="vibe-v3.html?mode=vibes&style={v}">{VIBE[v]}</a>' for v in t['v']) + '</div>'
    about = ''.join(f'<p>{e(x)}</p>' for x in P['about'])
    cm = ''.join(f'<span>{e(x)}</span>' for x in P['cm'])
    todo = ''.join(f'<div><b>{e(a)}</b><span>{e(b)}</span></div>' for a, b in P['todo'])
    cmp = C[i]
    detrows = [('Home prices', P['price']), ('Insurance', INS[P['ins']] + STATE), ('Heads up', cmp['w']),
               ('Getting around', P['around']), ('Season', cmp['se']), ('Airport', d['ap']), ('Hospital', P['hosp']),
               ('Why people love it', P['love']), ('Know before you go', P['know']), ('Think twice if', P['twice']),
               ('Schools', P.get('schools', 'See official grades and district info on the Florida Department of Education site.'))]
    table = '<table class="det">' + ''.join(f'<tr><th>{a}</th><td>{e(b)}</td></tr>' for a, b in detrows) + '</table>'
    cards = ''.join(card(t, TD[x]) for x in near)
    faq = [(f'Is {nm} walkable?', note('walk')), (f'Does {nm} have a good beach?', note('beach')),
           (f'Is {nm} affordable?', 'Home prices: ' + P['price'] + '. ' + note('afford') if 'afford' in P['notes'] else 'Home prices: ' + P['price'] + '.'),
           (f'Which airport is closest to {nm}?', note('airport')),
           (f'What should I know before moving to {nm}?', 'The main things to plan for: ' + cmp['w'] + '. ' + STATE.strip())]
    faq = [(q, a) for q, a in faq if a != GENERIC]
    faqh = '<section class="faq"><h2>Common questions</h2>' + ''.join(f'\n<details><summary>{e(q)}</summary><p>{e(a)}</p></details>' for q, a in faq) + '</section>'
    ld = {'@context': 'https://schema.org', '@graph': [
        {'@type': 'Place', 'name': f'{nm}, Florida', 'description': P['tag'], 'url': url, 'image': img,
         'geo': {'@type': 'GeoCoordinates', 'latitude': t['la'], 'longitude': t['lo']},
         'address': {'@type': 'PostalAddress', 'addressRegion': 'FL', 'addressCountry': 'US'},
         'containedInPlace': {'@type': 'Place', 'name': d['rn'] + ', Florida', 'url': f'https://www.floridacoastal.co/areas/{d["reg"]}.html'},
         'alternateName': [x.strip() for x in R['aka'].split(',')]},
        {'@type': 'BreadcrumbList', 'itemListElement': [
            {'@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': 'https://www.floridacoastal.co/'},
            {'@type': 'ListItem', 'position': 2, 'name': 'Beach Towns', 'item': 'https://www.floridacoastal.co/towns/index.html'},
            {'@type': 'ListItem', 'position': 3, 'name': d['rn'], 'item': f'https://www.floridacoastal.co/areas/{d["reg"]}.html'},
            {'@type': 'ListItem', 'position': 4, 'name': nm, 'item': url}]},
        {'@type': 'FAQPage', 'mainEntity': [{'@type': 'Question', 'name': q, 'acceptedAnswer': {'@type': 'Answer', 'text': a}} for q, a in faq]}]}
    ti = f'Living in {nm}, Florida | Florida Coastal'
    seo = (f'<title>{ti}</title><meta name="description" content="{html.escape(desc)}"><link rel="canonical" href="{url}">'
           f'<meta property="og:type" content="website"><meta property="og:site_name" content="Florida Coastal"><meta property="og:title" content="{ti}">'
           f'<meta property="og:description" content="{html.escape(desc)}"><meta property="og:url" content="{url}"><meta property="og:image" content="{img}">'
           f'<meta name="twitter:card" content="summary_large_image"><script type="application/ld+json">{json.dumps(ld, ensure_ascii=False)}</script>'
           '<!--/seo--><link rel="stylesheet" href="{{asset:/assets/town-m.css?v=1}}">')
    g = f"img/c/{i}.webp"
    content = (f'<div class="wrap"><div class="crumbs"><a href="towns/index-v2.html">Beach Towns</a> / <a href="towns/index-v2.html#{ANCH[t["r"]]}">{t["r"]}</a> / {e(nm)}</div>\n'
               f'<div class="gal n1"><div class="b" style="background-image:url(\'{g}\')"></div><div style="background-image:url(\'{g}\')"></div><div style="background-image:url(\'{g}\')"></div></div>\n'
               f'<div class="cols"><main>\n<h1>{e(nm)}</h1><p class="tag">{e(P["tag"])}</p><p class="incl">{e(P["incl"])}</p>\n'
               f'{chips}{stats}\n'
               f'<section><h2>About {e(nm)}</h2>{about}<div class="by">Florida Coastal research, November 2026</div></section>\n'
               f'<section><h2>The scorecard</h2><p class="scsub">Compared with 167 Florida beach towns. Tap any row for the local take.</p><p class="verdict">{verdict}</p>{sc}<div class="src">Scores rate what the town offers, never who lives there. <a href="scoring.html">How we score</a></div></section>\n'
               f'<section><h2>Things to do and people to meet</h2><p>{e(P["nightout"])}</p><div class="cm">{cm}</div><div class="todo">{todo}</div></section>\n'
               f'<section><h2>The details</h2>{table}</section>\n'
               f'<section><h2>Nearby and similar</h2><div class="mapw"><svg id="mm" viewBox="0 0 10 10"></svg><div class="nt">{cards}</div></div></section>\n'
               f'{faqh}\n\n</main>\n' + ASK.replace('Islamorada', nm).replace('t=islamorada', f't={i}'))
    return ('<!-- town ' + json.dumps(j, ensure_ascii=False, separators=(',', ':')) + ' -->\n<!-- seo -->\n' + seo + '\n\n<!-- content -->\n' + content + '\n')

for i in NEW:
    open(f'src/towns/{i}-v3.html', 'w').write(page(i))

# ---------------------------------------------------------------- remove merged pages, forward them
for k in MERGE:
    for p in (f'src/towns/{k}-v3.html', f'towns/{k}-v3.html'):
        if os.path.exists(p): os.remove(p)
V = json.load(open('vercel.json'))
have = {r['source'] for r in V['redirects']}
for k, h in MERGE.items():
    src = f'/towns/{k}-v3.html'
    if src not in have:
        V['redirects'].append({'source': src, 'destination': f'/towns/{h}-v3.html', 'permanent': False})
json.dump(V, open('vercel.json', 'w'), indent=2, ensure_ascii=False); open('vercel.json', 'a').write('\n')
print('updated', len(log), 'pages; new', NEW)
