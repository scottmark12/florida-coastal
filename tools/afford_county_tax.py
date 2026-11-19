"""Affordable with each county's own property tax rate and measured beach drives (Nov 18 2026).

Inputs
- tools/affordability_tax_beach_nov18.json: trimmed Codex file. 2025 county aggregate millage from
  Florida DOR (population weighted where a town spans two counties) and a measured drive to the
  nearest DEP public beach access with parking (OSRM, no traffic).
- data/county-house-sale-medians.json: recorded median house sale and sale count.
- Flood share in FEMA high risk zones: read from the live Affordable table (the Nov 17 flood file is
  not in the repo). Weeki Wachee is 100% (Nov 17 notes). Panama City Beach is not in that table;
  pass --pcb-flood 0.NN once we have it. From the old ranking it is between 4% and 32%, and at
  either end it lands at #32, so the list does not depend on it.

Rule: yearly cost to own = mortgage (5.91% of the median) + county millage on (median - $50K)
+ county homeowners insurance (OIR) + flood share x $1,402. At least 20 sales. Top 34, plus
Ormond by the Sea kept at #35 (Mark, Nov 18) so it keeps a vibe.

Writes src/data (towns, map-ld, beach-towns-t, compare-d, quiz-qd), the homepage hero dots, town
pages (affordability bar, Top %, #N tile, PCB chip and paragraph), affordability chips on guide cards,
the Affordable guide table and copy, and scoring.html. Run on a clean tree, then build.
"""
import json, re, sys, glob, html as H

PCB_FLOOD = None
if '--pcb-flood' in sys.argv:
    PCB_FLOOD = float(sys.argv[sys.argv.index('--pcb-flood') + 1])

INS = {'Bay': 3465, 'Brevard': 3532, 'Broward': 6136, 'Charlotte': 3160, 'Citrus': 2456, 'Collier': 5534,
       'Dixie': 2748, 'Duval': 2786, 'Escambia': 3702, 'Flagler': 2488, 'Franklin': 5221, 'Gulf': 3752,
       'Hernando': 2360, 'Hillsborough': 3525, 'Indian River': 4334, 'Lee': 3576, 'Levy': 2698,
       'Manatee': 3181, 'Martin': 5899, 'Miami-Dade': 5975, 'Monroe': 7863, 'Nassau': 3051,
       'Okaloosa': 3889, 'Palm Beach': 6323, 'Pasco': 2756, 'Pinellas': 4063, 'Santa Rosa': 3512,
       'Sarasota': 3457, 'St. Johns': 2883, 'St. Lucie': 3491, 'Taylor': 2698, 'Volusia': 2808,
       'Wakulla': 2292, 'Walton': 5409}
CNAME = {'Saint Lucie': 'St. Lucie', 'Saint Johns': 'St. Johns', 'Dade': 'Miami-Dade'}
FLOOD_POLICY = 1402
GUIDE = 'articles/best-florida-beach-towns-for-affordable-homes.html'

# Beach place names for the 35 (DEP names are inconsistent); bay beaches say so.
PLACE = {
    'holiday': 'Robert K. Rees Park', 'new-port-richey': 'Robert K. Rees Park', 'hudson': 'Robert K. Rees Park',
    'port-richey': 'Robert K. Rees Park', 'carrabelle': 'Carrabelle Beach', 'titusville': 'Playalinda Beach',
    'panama-city': 'Gulf Lagoon Beach', 'port-charlotte': 'Englewood Beach', 'englewood': 'Englewood Beach',
    'inglis': 'Fort Island Beach', 'yankeetown': 'Fort Island Beach', 'fortpierce': 'Hutchinson Island',
    'jacksonville': 'Atlantic Beach', 'edgewater': 'New Smyrna Beach', 'palm-bay': 'Melbourne Beach',
    'melbourne': 'Canova Beach Park', 'gibsonton': 'Apollo Beach Nature Park, on Tampa Bay',
    'cedarkey': 'Sand Spit Park', 'sun-city-center': 'E.G. Simmons Park, on Tampa Bay',
    'ruskin': 'E.G. Simmons Park, on Tampa Bay', 'pensacola': 'Pensacola Beach, sound side',
    'fort-walton-beach': 'Okaloosa Island', 'mary-esther': 'Okaloosa Island', 'bradenton': 'Holmes Beach',
    'palm-coast': 'Jungle Hut Park', 'port-orange': 'Daytona Beach Shores', 'daytona': 'Daytona Beach',
    'steinhatchee': 'Hagin Cove', 'rockledge': 'Cocoa Beach', 'freeport': 'Blue Mountain Beach',
    'apalachicola': 'St. George Island', 'sebastian': 'Wabasso Beach', 'pcb': 'Dan Russell City Pier',
    'cape-coral': 'Bunche Beach, on San Carlos Bay', 'ormond-by-the-sea': 'Ormond Beach',
}
NOTE = {'sun-city-center': ' Most of Sun City Center is a 55 and over community.',
        'inglis': ' Built more for the river and the Gulf by boat.',
        'yankeetown': ' Built more for the river and the Gulf by boat.',
        'steinhatchee': ' Built more for the river and the flats.'}


def load(p):
    return json.load(open(p))


def dump(p, d, indent):
    s = open(p).read()
    open(p, 'w').write(json.dumps(d, indent=indent, ensure_ascii=False) + ('\n' if s.endswith('\n') else ''))


def sub1(s, old, new, label=''):
    assert s.count(old) == 1, (label, old[:80], s.count(old))
    return s.replace(old, new)


N = {x['id']: x for x in load('tools/affordability_tax_beach_nov18.json')['towns']}
HM = {x['id']: x for x in load('data/county-house-sale-medians.json')['towns']}
T = load('src/data/towns.json')
TI = {t['id']: t for t in T}
LD = load('src/data/map-ld.json')

# Flood shares from the live table
g = open(GUIDE).read()
tb0 = g.find('<table'); tb1 = g.find('</table>', tb0) + 8
OLD34, FL = [], {}
for r in re.findall(r'<tr>.*?</tr>', g[tb0:tb1], re.S)[1:]:
    i = re.search(r'towns/([\w-]+)\.html', r)[1]
    FL[i] = int(re.findall(r'<td>(\d+)%</td>', r)[0]) / 100
    OLD34.append(i)
assert len(OLD34) == 34 and 'pcb' not in OLD34
FL['weeki-wachee'] = 1.0
if PCB_FLOOD is not None:
    FL['pcb'] = PCB_FLOOD


def mills(i):
    c = N[i]['county_tax_rates']
    return c[0]['total_aggregate_millage'] if len(c) == 1 else sum(x['population_share'] * x['total_aggregate_millage'] for x in c)


def parts(i, fl):
    p = HM[i]['median']
    cty = CNAME.get(N[i]['county'], N[i]['county'])
    tax = mills(i) / 1000 * max(0, p - 50000)
    return dict(p=p, mort=.0591 * p, tax=tax, ins=INS[cty], flood=fl * FLOOD_POLICY,
                cost=.0591 * p + tax + INS[cty] + fl * FLOOD_POLICY)


LIST = OLD34 + ['pcb']
C = {}
for i in LIST:
    C[i] = parts(i, FL.get(i, 0))
# PCB position must not depend on its unknown flood share (4% to 32%)
lo, hi = parts('pcb', .04)['cost'], parts('pcb', .32)['cost']
others = sorted(C[i]['cost'] for i in OLD34)
assert sum(c < lo for c in others) == sum(c < hi for c in others) == 31, 'PCB rank depends on flood'
# Nobody outside the list (flood unknown, so flood = 0 is their lowest cost) beats #34
order = sorted(LIST, key=lambda i: (i == 'ormond-by-the-sea', C[i]['cost'] if i != 'pcb' else (lo + hi) / 2))
cut = C[order[33]]['cost']
for i in HM:
    if i in LIST or HM[i]['sales'] < 20 or not HM[i]['median'] or i not in N:
        continue
    c = parts(i, FL.get(i, 0))['cost']
    assert c > cut, ('outsider below the cutoff', i, c, cut)
assert order[-1] == 'ormond-by-the-sea' and order[31] == 'pcb', order
print('new order', order)

# ---------- ranks and scores ----------
old_rank = {i: LD[i]['rk']['afford'] for i in LD}
old_order = sorted(LD, key=lambda i: old_rank[i])
rest = [i for i in old_order if i not in LIST]
new_order = order + rest
assert len(new_order) == len(LD) == 167
new_rank = {i: k + 1 for k, i in enumerate(new_order)}


def reassign(get, put):
    """Give the category's existing values out again by the new rank (towns without one are skipped)."""
    def has(i):
        try:
            get(i); return True
        except KeyError:
            return False
    olds = [i for i in old_order if has(i)]
    news = [i for i in new_order if has(i)]
    assert len(olds) >= 165, len(olds)
    vals = [get(i) for i in olds]
    for k, i in enumerate(news):
        put(i, vals[k])


reassign(lambda i: LD[i]['sv']['afford'], lambda i, v: LD[i]['sv'].__setitem__('afford', v))
for i in LD:
    LD[i]['rk']['afford'] = new_rank[i]
LD['pcb']['v'] = LD['pcb']['v'] + ['afford']
dump('src/data/map-ld.json', LD, 1)

reassign(lambda i: TI[i]['f']['afford'], lambda i, v: TI[i]['f'].__setitem__('afford', v))
TI['pcb']['v'] = TI['pcb']['v'] + ['afford']
dump('src/data/towns.json', T, 1)

BT = load('src/data/beach-towns-t.json')
for r in BT:
    if r['id'] == 'pcb':
        assert 'afford' not in r['v']; r['v'] = r['v'] + ['afford']
dump('src/data/beach-towns-t.json', BT, 2)

CD = load('src/data/compare-d.json')
CT = CD['towns']
reassign(lambda i: CT[i]['sc']['afford'], lambda i, v: CT[i]['sc'].__setitem__('afford', v))
dump('src/data/compare-d.json', CD, 2)

QD = load('src/data/quiz-qd.json')
reassign(lambda i: QD[i]['s']['afford'], lambda i, v: QD[i]['s'].__setitem__('afford', v))
reassign(lambda i: QD[i]['f']['afford'], lambda i, v: QD[i]['f'].__setitem__('afford', v))
dump('src/data/quiz-qd.json', QD, 1 if open('src/data/quiz-qd.json').read().startswith('{\n "') else 2)

# ---------- homepage hero dots (towns.json order) ----------
s = open('src/pages/index.html').read()
st = s.find('var V = ') + 8
V, end = json.JSONDecoder().raw_decode(s[st:])
k = [t['id'] for t in T].index('pcb')
seg = s[st:st + end]
pos = list(re.finditer(r'"[^"]*"', seg))
assert len(pos) == len(V) and 'afford' not in V[k]
m = pos[k]
seg = seg[:m.start()] + json.dumps((V[k] + ' afford').strip()) + seg[m.end():]
open('src/pages/index.html', 'w').write(s[:st] + seg + s[st + end:])

# ---------- town pages ----------
changed = [i for i in LD if new_rank[i] != old_rank[i]]
for i in changed:
    p = f'src/towns/{i}.html'
    s = open(p).read()
    r = new_rank[i]
    w = round((168 - r) / 167 * 100)
    top = -(-r * 100 // 167)
    s2 = re.sub(r'(<span class="l">Affordability</span><span class="bar"><i style="width:)\d+(%"></i></span><span class="r">)Top \d+%',
                lambda m: f'{m[1]}{w}{m[2]}Top {top}%', s)
    s2 = re.sub(r'<div><b>#\d+</b><span>For affordability, of 167</span></div>',
                f'<div><b>#{r}</b><span>For affordability, of 167</span></div>', s2)
    open(p, 'w').write(s2)

p = 'src/towns/pcb.html'
s = open(p).read()
s = sub1(s, '<a href="map.html?mode=vibes&style=active">Active Lifestyle</a></div>',
         '<a href="map.html?mode=vibes&style=active">Active Lifestyle</a>'
         '<a href="map.html?mode=vibes&style=afford">Affordable</a></div>', 'pcb chip')
m = re.search(r'(<span class="l">Affordability</span>.*?</summary><p>)(.*?)(</p>)', s, re.S)
print('PCB afford text was:', m[2])
s = s[:m.start(2)] + ('Cheaper to own than you would guess for a beach town. Bay County has one of the lower '
                      'property tax rates on the coast, which puts it on our Affordable list, though condo '
                      'dues and flood insurance near the water can change the math.') + s[m.end(2):]
open(p, 'w').write(s)

# ---------- affordability chips on guide cards ----------
for f in glob.glob('articles/*.html'):
    s = open(f).read()
    if 'Affordability <b>' not in s:
        continue

    def fix(sec):
        t = re.search(r'towns/([\w-]+)\.html', sec[0])
        if not t or t[1] not in LD:
            return sec[0]
        i = t[1]
        return re.sub(r'(Affordability <b>)\d(/5</b> <em>#)\d+( of 167</em>)',
                      lambda m: f'{m[1]}{CT[i]["sc"]["afford"]}{m[2]}{new_rank[i]}{m[3]}', sec[0])
    s2 = re.sub(r'<section class="fcr-item".*?</section>', fix, s, flags=re.S)
    if s2 != s:
        open(f, 'w').write(s2)

# ---------- Affordable guide ----------
g = open(GUIDE).read()


def k1(x):
    return f'${x / 1000:.1f}K'


rows = []
for n, i in enumerate(order, 1):
    c = C[i]
    fl = FL.get(i)
    fl_s = f'{round(fl * 100)}%' if fl is not None else 'TBD'
    cost_s = k1(c['cost']) if fl is not None else 'TBD'
    mins = N[i]['beach']['display_minutes']
    beach = f'{mins} min, {PLACE[i][0].upper() + PLACE[i][1:]}'
    rows.append(f'<tr><td>{n}</td><td><a href="towns/{i}.html">{H.escape(TI[i]["n"])}</a></td>'
                f'<td>${round(c["p"] / 1000)}K</td><td>${round(c["tax"]):,}</td><td>${c["ins"]:,}</td>'
                f'<td>{fl_s}</td><td>{cost_s}</td><td>{beach}</td></tr>')
table = ('<div style="overflow-x:auto"><table style="width:100%;min-width:560px;text-align:left;font-size:14px"><thead><tr><th>#</th><th>Town</th><th>Median house</th>'
         '<th>Tax a year</th><th>Insurance a year</th><th>Flood zone share</th>'
         '<th>Cost to own a year</th><th>Nearest beach</th></tr></thead><tbody>' + ''.join(rows) + '</tbody></table></div>')
g = g[:tb0] + table + g[tb1:]
g = sub1(g, '<p>Beach times are approximate drives to the nearest sandy beach.</p>',
         '<p>Property tax is each county&#x27;s 2025 average rate from the Florida Department of Revenue, '
         'applied to the median house after the homestead exemption. Your bill depends on the exact address, '
         'since city and special district rates vary inside a county. Beach times are measured drives, without '
         'traffic, from the middle of town to the nearest public beach access with parking. A few are on the bay, '
         'and we say so. Flood zone share is the share of recorded house sales in a FEMA high risk zone. '
         'Inglis, Yankeetown and Steinhatchee are built more for the river and the Gulf by boat than for a day on the sand, '
         'and most of Sun City Center is a 55 and over community.</p>', 'beach note')
g = sub1(g, 'property tax at Florida&#x27;s statewide average rate after the homestead exemption,',
         'property tax at the county&#x27;s own rate after the homestead exemption,', 'guide rule')
g = sub1(g, 'Towns need at least 20 recorded house sales to be ranked. These 34 make the list.',
         'Towns need at least 20 recorded house sales to be ranked. These 35 make the list. '
         'Ormond by the Sea is a hair past the top 34, and we kept it.', 'guide count')
g = g.replace('"dateModified": "2026-11-17"', '"dateModified": "2026-11-18"').replace('"dateModified": "2026-11-03"', '"dateModified": "2026-11-18"')
open(GUIDE, 'w').write(g)

s = open('scoring.html').read()
s = sub1(s, 'property tax at Florida&#x27;s statewide average rate after the homestead exemption,',
         'property tax at the county&#x27;s own 2025 rate (Florida Department of Revenue) after the homestead exemption,', 'scoring')
open('scoring.html', 'w').write(s)

print('ranks changed:', len(changed))
for i in order:
    print(new_rank[i], i, old_rank[i], round(C[i]['cost']), round(C[i]['tax']), FL.get(i))
