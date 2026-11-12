#!/usr/bin/env python3
"""Nov 12 2026 town list change (approved by Mark Nov 11): add 6 towns, fold 6 into hosts.

Updates every redesign data file in src/data, the home map list, search index and aliases.
Scores for the new towns come from fig/newtowns_*.json (approved). Their percentile values (sv)
are placed against existing towns with the same base score, then every rank is recomputed.
Run once from the repo root: python3 tools/town_swap.py
"""
import json, math, re, statistics as st

D = 'src/data/'
def rd(f): return json.load(open(D + f))
def wr(f, o):
    with open(D + f, 'w') as h: json.dump(o, h, ensure_ascii=False, indent=1); h.write('\n')

FIG = '/home/claude/fig/'
B1 = json.load(open(FIG + 'newtowns_batch1.json')); B2 = json.load(open(FIG + 'newtowns_batch2.json'))
J = json.load(open(FIG + 'newtowns_judgment_draft.json'))
R = {**{k: v for k, v in B1.items() if k != 'status'}, **{k: v for k, v in B2.items() if k != 'status'}}

MERGE = {'north-redington-beach': 'redington-shores', 'redington-beach': 'redington-shores',
         'valparaiso': 'niceville', 'okaloosa-island': 'fort-walton-beach',
         'holly-hill': 'daytona', 'south-daytona': 'daytona'}

NEW = {
 'marathon': dict(n='Marathon', r='South Florida and the Keys', c='keys', reg='florida-keys', bt='Florida Keys',
   v=['dock', 'island', 'active'], county='keywest', ref='islamorada', air=False,
   p='$715K', ap='Key West (EYW), about 1 hour',
   b='The Middle Keys hub at the start of the Seven Mile Bridge, with Sombrero Beach, busy marinas and a hospital in town.',
   bs='The Middle Keys hub, with marinas, Sombrero Beach and the Seven Mile Bridge.'),
 'big-pine-key': dict(n='Big Pine Key', r='South Florida and the Keys', c='keys', reg='florida-keys', bt='Florida Keys',
   v=['island', 'active', 'oldfl'], county='keywest', ref='islamorada', air=True,
   p='$740K', ap='Key West (EYW), about 30 to 40 minutes',
   b='The quiet center of the Lower Keys, home to the National Key Deer Refuge and about five minutes from Bahia Honda State Park.',
   bs='Quiet Lower Keys living by the Key Deer Refuge and Bahia Honda.'),
 'key-biscayne': dict(n='Key Biscayne', r='South Florida and the Keys', c='atlantic', reg='miami-fort-lauderdale', bt='Southeast Atlantic',
   v=['sophcalm', 'beaches'], county='southbeach', ref='bal-harbour', air=True,
   p='$1.49M', ap='Miami (MIA), about 25 minutes',
   b='An island village across the Rickenbacker Causeway from Miami, with Crandon Park and the Cape Florida Lighthouse at Bill Baggs State Park.',
   bs='An island village near Miami, with Crandon Park and Cape Florida.'),
 'boca-grande': dict(n='Boca Grande', r='Southwest Florida', c='gulf', reg='fort-myers-sanibel', bt='Southwest Gulf',
   v=['oldfl', 'sophcalm', 'dock', 'island'], county='sanibel-island', ref='captiva', air=False,
   p='$2.4M', ap='Punta Gorda (PGD), about 1 hour',
   b='An old Florida village on Gasparilla Island, reached by a toll causeway, where golf carts get you around and tarpon fishing is the big draw.',
   bs='A golf cart village on Gasparilla Island, known for tarpon fishing.'),
 'pompano-beach': dict(n='Pompano Beach', r='South Florida and the Keys', c='atlantic', reg='miami-fort-lauderdale', bt='Southeast Atlantic',
   v=['beaches', 'afford'], county='lighthouse-point', ref='lauderdale-by-the-sea', air=True,
   p='$395K', ap='Fort Lauderdale (FLL), about 20 minutes',
   b='A Broward beach city with wide sand, a rebuilt pier and the Fishing Village on the beachfront, just south of the Hillsboro Inlet.',
   bs='Wide sand, a rebuilt pier and the beachfront Fishing Village.'),
 'deerfield-beach': dict(n='Deerfield Beach', r='South Florida and the Keys', c='atlantic', reg='miami-fort-lauderdale', bt='Southeast Atlantic',
   v=['beaches', 'afford'], county='lighthouse-point', ref='hollywood', air=True,
   p='$330K', ap='Fort Lauderdale (FLL), about 30 minutes',
   b='The north end of Broward, with a fishing pier, a beachfront broadwalk and lifeguarded sand.',
   bs='A fishing pier, a beachfront broadwalk and lifeguarded sand.'),
}
CAPS = [350, 500, 750]
QK = ['nightlife', 'meet', 'quiet', 'walk', 'water', 'beach', 'dining', 'outdoors', 'afford', 'airport', 'sand', 'condo', 'house', 'dock']
SVK = ['meet', 'walk', 'water', 'beach', 'outdoors', 'afford', 'airport', 'charm', 'edu', 'quiet', 'lively']
CMPK = ['nightlife', 'meet', 'quiet', 'walk', 'water', 'beach', 'dining', 'outdoors', 'afford', 'airport', 'edu']

T = rd('towns.json'); LD = rd('map-ld.json'); Q = rd('quiz-qd.json'); RT = rd('results-td.json')
C = rd('compare-d.json'); BT = rd('beach-towns-t.json'); TA = rd('beach-towns-ta.json')
assert len(T) == 167 and not any(k in LD for k in NEW)
old_rk = {i: dict(LD[i]['rk']) for i in LD}

# ---- remove merged towns
T = [t for t in T if t['id'] not in MERGE]
for o in (LD, Q, RT, C['towns'], TA): [o.pop(k) for k in MERGE]
BT = [t for t in BT if t['id'] not in MERGE]
for i, d in C['towns'].items():
    s = []
    for x in d['sim']:
        x = MERGE.get(x, x)
        if x != i and x not in s: s.append(x)
    d['sim'] = s

def r1(x): return int(math.floor(x + 0.5))

# ---- quiz base values for the new towns
for i, a in NEW.items():
    sc, j = R[i]['scores'], J[i]
    med = R[i]['med']
    # quiz outdoors is on its own scale: average of existing towns with the same map outdoors score on the same coast
    same = [Q[t['id']]['f']['outdoors'] for t in T if t['f']['outdoors'] == sc['outdoors'] and t['c'] == a['c']] or \
           [Q[t['id']]['f']['outdoors'] for t in T if abs(t['f']['outdoors'] - sc['outdoors']) < .3]
    qo = round(st.mean(same), 2)
    ref = Q[a['ref']]['f']
    f = dict(nightlife=sc['nightlife'], meet=j['meet'], quiet=j['quiet'], walk=sc['walk'], water=sc['water'],
             beach=sc['beach'], dining=j['dining'], outdoors=qo, afford=sc['afford'], airport=sc['airport'],
             sand=ref['sand'], condo=ref['condo'], house=ref['house'], dock=ref['dock'])
    a['qf'] = f; a['med'] = med
    tier = sum(1 for c in CAPS if med > c)
    a['bg'] = [max(0, tier - k) for k in range(4)]; a['t'] = tier + 1

# ---- sv for new towns: place against existing towns with the same quiz base value
ex = list(LD)
def interp(k, val):
    pts = sorted((Q[i]['f'][k], LD[i]['sv'][k]) for i in ex)
    eq = [s for f, s in pts if abs(f - val) < 1e-9]
    if eq: return round(st.mean(eq), 5)
    lo = [(f, s) for f, s in pts if f < val]; hi = [(f, s) for f, s in pts if f > val]
    if not lo: return hi[0][1]
    if not hi: return lo[-1][1]
    (f0, s0), (f1, s1) = lo[-1], hi[0]
    return round(s0 + (s1 - s0) * (val - f0) / (f1 - f0), 5)

# No school pipeline survives, so schools are placed at the average of towns in the same county.
COUNTY = {'keywest': ['keywest', 'islamorada', 'key-largo'],
          'southbeach': ['southbeach', 'miami', 'bal-harbour', 'sunny-isles-beach', 'north-miami-beach'],
          'lighthouse-point': ['lighthouse-point', 'hollywood', 'lauderdale-by-the-sea', 'ftl', 'dania-beach', 'hallandale', 'wilton-manors'],
          'sanibel-island': ['sanibel-island', 'captiva', 'fort-myers-beach', 'cape-coral', 'fort-myers', 'bonita-springs', 'matlacha']}
CHARM_RK = {'marathon': 101, 'big-pine-key': 71, 'key-biscayne': 156, 'boca-grande': 4, 'pompano-beach': 144, 'deerfield-beach': 117}
by_charm = sorted(ex, key=lambda i: -LD[i]['sv']['charm'])
for i, a in NEW.items():
    f = a['qf']; sv = {}
    for k in ['meet', 'walk', 'water', 'beach', 'outdoors', 'afford', 'airport', 'quiet']:
        sv[k] = interp(k, f[k])
    r = CHARM_RK[i]
    sv['charm'] = round((LD[by_charm[r - 2]]['sv']['charm'] + LD[by_charm[r - 1]]['sv']['charm']) / 2, 5)
    sv['edu'] = round(st.mean(LD[x]['sv']['edu'] for x in COUNTY[a['county']]), 5)
    feat = lambda q: (q['nightlife'], q['meet'], q['walk'], q['dining'])
    nn = sorted(ex, key=lambda x: sum((p - q) ** 2 for p, q in zip(feat(Q[x]['f']), feat(f))))[:5]
    sv['lively'] = round(st.mean(LD[x]['sv']['lively'] for x in nn), 5)
    a['sv'] = sv

# ---- write new town records
for i, a in NEW.items():
    R_ = R[i]; sc = R_['scores']; ld_ref = LD[a['county']]
    T.append(dict(id=i, n=a['n'], r=a['r'], c=a['c'], la=R_['lat'], lo=R_['lon'], t=a['t'], v=a['v'], b=a['b'],
                  img=f'img/c/{i}.webp', real=True, p=a['p'], pg=True,
                  f=dict(airport=sc['airport'], afford=sc['afford'], beach=sc['beach'], walk=sc['walk'], water=sc['water'],
                         outdoors=sc['outdoors'], nightlife=sc['nightlife'])))
    LD[i] = dict(sv=a['sv'], rk={}, bg=a['bg'], med=a['med'], reg=a['reg'], rn=ld_ref['rn'] if a['county'] != 'sanibel-island' else LD['captiva']['rn'],
                 te=LD[a['ref']]['te'], sc=ld_ref['es'] >= 4, air=a['air'], ap=a['ap'], es=ld_ref['es'], v=a['v'], b=a['bs'])
    LD[i]['rn'] = [LD[x]['rn'] for x in LD if LD[x]['reg'] == a['reg']][0]
    Q[i] = dict(s={k: r1(v) for k, v in a['qf'].items()}, f=a['qf'], m=a['med'], g=a['reg'])
    RT[i] = dict(n=a['n'], r=a['r'], p=a['p'], b=a['b'], img=f'img/c/{i}.webp')
    BT.append(dict(id=i, n=a['n'], r=a['bt'], c=a['c'], la=R_['lat'], lo=R_['lon'], v=a['v'], b=a['b'],
                   img=f'../img/c/{i}.webp', p=a['p'], m=a['med']))
    TA[i] = a['reg']
assert len(T) == len(LD) == len(Q) == 167

# ---- ranks for all 167
ids = list(LD)
for k in SVK:
    o = sorted(ids, key=lambda i: (-LD[i]['sv'][k], old_rk.get(i, {}).get(k, 999)))
    for n, i in enumerate(o): LD[i]['rk'][k] = n + 1
# Nightlife and dining ranks don't follow the quiz value alone (their inputs weren't saved), so keep
# every existing town's order and slot each new town at the average rank of towns with its value.
for k in ['nightlife', 'dining']:
    def key(i):
        if i in old_rk: return old_rk[i][k]
        v = Q[i]['f'][k]
        eq = [old_rk[x][k] for x in ex if abs(Q[x]['f'][k] - v) < 1e-9] or \
             [old_rk[x][k] for x in sorted(ex, key=lambda x: abs(Q[x]['f'][k] - v))[:5]]
        return st.mean(eq) + .5
    o = sorted(ids, key=key)
    for n, i in enumerate(o): LD[i]['rk'][k] = n + 1
order = ['meet', 'walk', 'water', 'beach', 'outdoors', 'afford', 'airport', 'charm', 'edu', 'quiet', 'lively', 'nightlife', 'dining']
for i in ids: LD[i]['rk'] = {k: LD[i]['rk'][k] for k in order}

# ---- compare page
CMP = json.load(open(FIG + 'newtowns_compare.json'))
def qdist(a, b): return sum((Q[a]['f'][k] - Q[b]['f'][k]) ** 2 for k in QK[:10])
for i, a in NEW.items():
    c = CMP[i]
    s = {k: Q[i]['s'][k] for k in CMPK if k != 'edu'}; s['edu'] = LD[i]['es']
    sim = sorted([x for x in ids if x != i], key=lambda x: qdist(i, x))[:8]
    C['towns'][i] = dict(s=a['n'], rg=LD[i]['rn'], pr=a['p'] + ' median', h=c['h'], a=a['ap'], se=c['se'], w=c['w'],
                         sc=s, d=c['d'], pros=c['pros'], cons=c['cons'], sim=sim, img=f'img/c/{i}.webp', rk={})
for i, d in C['towns'].items():
    d['rk'] = {k: LD[i]['rk'][k] for k in CMPK}
assert len(C['towns']) == 167

# ---- beach towns area meta (count and price range)
AR = rd('beach-towns-ar.json')
from decimal import Decimal, ROUND_HALF_UP
def money(v):
    if v < 1000: return f'${v}K'
    x = str(Decimal(v / 1000).quantize(Decimal('0.01'), ROUND_HALF_UP)).rstrip('0').rstrip('.')
    return f'${x}M'
for k, a in AR.items():
    ts = [t for t in BT if TA[t['id']] == k]
    m = a['meta']
    ms = [t['m'] for t in ts if t.get('m')]
    a['meta'] = f'{len(ts)} towns · {money(min(ms))} to {money(max(ms))}'

# write
wr('towns.json', T); wr('map-ld.json', LD); wr('quiz-qd.json', Q); wr('results-td.json', RT)
wr('compare-d.json', C); wr('beach-towns-t.json', BT); wr('beach-towns-ta.json', TA); wr('beach-towns-ar.json', AR)
json.dump({'old_rk': old_rk, 'new': {i: {'sv': LD[i]['sv'], 'rk': LD[i]['rk']} for i in NEW}}, open('/tmp/swap_ranks.json', 'w'))
print('ok', len(T))
for i in NEW: print(i, LD[i]['rk'])
