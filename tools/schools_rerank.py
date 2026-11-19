"""Nov 18 2026: Best Schools on each town's own schools (Mark: "All 43, cap waived").

Data: Codex schools_parks_by_town.json (FLDOE 2025-26 school grades joined to NCES 2024-25
locations; county zone maps where published, else nearest traditional public school), trimmed
into tools/schools_by_town_nov18.json by --import.

Rule: a town carries Best Schools when its elementary, middle and high school are all rated A.
43 towns. Best Schools does not count toward the four vibe limit.

Writes (src only, then build): vibe tags in towns.json, map-ld.json, beach-towns-t.json; homepage
hero dots; Best Schools chip on town pages; the Schools row on every town page; the schools rank
(rk/sv edu in map-ld, rk/sc edu in compare-d: three A towns first, then by grade points, ties by
the old order, values reassigned by rank so the spread stays the same); compare page label.
Usage:  python3 tools/schools_rerank.py --import /path/to/schools_parks_by_town.json   (once)
        python3 tools/schools_rerank.py
"""
import html, json, re, sys

SRC = 'tools/schools_by_town_nov18.json'
LV = ['elementary', 'middle', 'high']
G = {'A': 4, 'B': 3, 'C': 2, 'D': 1, 'F': 0}

if len(sys.argv) > 2 and sys.argv[1] == '--import':
    raw = json.load(open(sys.argv[2]))
    keep = []
    for t in raw:
        k = {'id': t['id'], 'district': t['district_name'], 'population': t.get('population')}
        for lv in LV:
            s = t[lv]
            k[lv] = {x: s.get(x) for x in ('name', 'grade', 'method', 'distance_mi', 'state_school_id')}
        keep.append(k)
    json.dump(keep, open(SRC, 'w'), indent=1)
    print('imported', len(keep))

S = {t['id']: t for t in json.load(open(SRC))}
assert len(S) == 167


# Schools that take students by application (Pinellas fundamental schools, technical high schools,
# magnets). When the nearest school is one of these we don't know the zoned school, so the town
# can't qualify on it, and its town page says so.
APP = re.compile(r'FUNDAMENTAL|TECHNICAL|MAGNET|SCHOOL OF THE ARTS|COLLEGE PREPARATORY|LINCOLN PARK ACADEMY')


def by_app(i, lv):
    return bool(APP.search(S[i][lv]['name'] or ''))


def all_a(i):
    return all(S[i][lv]['grade'] == 'A' and not by_app(i, lv) for lv in LV)


def pts(i):
    g = [G[S[i][lv]['grade']] for lv in LV if S[i][lv]['grade']]
    return sum(g) / len(g)


SCHOOLS = sorted(i for i in S if all_a(i))
assert len(SCHOOLS) == 41, len(SCHOOLS)


def nice(name):
    w = name.title()
    for a, b in ((' Of ', ' of '), (' And ', ' and '), (' The ', ' the '), (' At ', ' at '), (' For ', ' for '),
                 ("'S ", "'s "), (' Ii', ' II'), (' Iii', ' III'), ('K-8', 'K-8'), (' Pk', ' PK'), ('Ese ', 'ESE ')):
        w = w.replace(a, b)
    w = re.sub(r'\bMc([a-z])', lambda m: 'Mc' + m.group(1).upper(), w)
    return w


def short_name(name):
    return re.sub(r'\s+(School|Sch)$', '', nice(name))


# 1. vibe tags
def retag(v, on):
    v = [x for x in v if x != 'schools']
    return v + ['schools'] if on else v


def save(path, d, indent):
    open(path, 'w').write(json.dumps(d, indent=indent, ensure_ascii=False) + '\n')


towns = json.load(open('src/data/towns.json'))
before = {t['id']: list(t['v']) for t in towns}
for t in towns:
    t['v'] = retag(t['v'], t['id'] in SCHOOLS)
save('src/data/towns.json', towns, 1)
ld = json.load(open('src/data/map-ld.json'))
for i in ld:
    ld[i]['v'] = retag(ld[i]['v'], i in SCHOOLS)
bt = json.load(open('src/data/beach-towns-t.json'))
for t in bt:
    t['v'] = retag(t['v'], t['id'] in SCHOOLS)
save('src/data/beach-towns-t.json', bt, 2)
changed = [t['id'] for t in towns if before[t['id']] != t['v']]

# 2. schools rank: three A towns first, then grade points, then the old order
old = sorted(ld, key=lambda i: ld[i]['rk']['edu'])
new = sorted(ld, key=lambda i: (not all_a(i), -pts(i), ld[i]['rk']['edu']))
svs = sorted((ld[i]['sv']['edu'] for i in ld), reverse=True)
for r, i in enumerate(new):
    ld[i]['rk']['edu'] = r + 1
    ld[i]['sv']['edu'] = svs[r]
save('src/data/map-ld.json', ld, 1)
cd = json.load(open('src/data/compare-d.json'))
scs = sorted((cd['towns'][i]['sc']['edu'] for i in cd['towns']), reverse=True)
for r, i in enumerate(new):
    cd['towns'][i]['rk']['edu'] = r + 1
    cd['towns'][i]['sc']['edu'] = scs[r]
save('src/data/compare-d.json', cd, 2)

# 3. homepage hero dots (V follows towns.json order)
p = 'src/pages/index.html'
s = open(p).read()
st = s.find('var V = ') + 8
V, end = json.JSONDecoder().raw_decode(s[st:])
oldv = s[st:st + end]
pos = list(re.finditer(r'"[^"]*"', oldv))
assert len(pos) == len(V) == len(towns)
out, last = '', 0
for n, m in enumerate(pos):
    vals = V[n].split()
    vals = [x for x in vals if x != 'schools'] + (['schools'] if towns[n]['id'] in SCHOOLS else [])
    out += oldv[last:m.start()] + json.dumps(' '.join(vals))
    last = m.end()
out += oldv[last:]
open(p, 'w').write(s[:st] + out + s[st + end:])

# 4. town pages: Best Schools chip and the Schools row
CHIP = '<a href="map.html?mode=vibes&style=schools">Best Schools</a>'
ROW = re.compile(r'<tr><th>Schools</th><td>.*?</td></tr>', re.S)
for i in S:
    path = f'src/towns/{i}.html'
    s = open(path).read()
    m = re.search(r'<div class="chips">(.*?)</div>', s, re.S)
    chips = m.group(1).replace(CHIP, '')
    if i in SCHOOLS:
        chips += CHIP
    s = s[:m.start(1)] + chips + s[m.end(1):]
    zoned = all(S[i][lv]['method'] == 'zone' for lv in LV)
    seen, plist = set(), []
    for lv in LV:
        nm = short_name(S[i][lv]['name'])
        if nm not in seen:
            seen.add(nm)
            plist.append(f'{html.escape(nm)} ({S[i][lv]["grade"] or "not graded"}'
                         + (', by application' if by_app(i, lv) else '') + ')')
    parts = ', '.join(plist)
    lead = 'Zoned for most of town' if zoned else 'Nearest public schools'
    tail = (' A school marked by application doesn\'t take students by address, so confirm the zoned school with the '
            'county district before you buy.' if any(by_app(i, lv) for lv in LV) else
            ' Schools are assigned by address, so confirm with the county district before you buy.')
    td = f'<tr><th>Schools</th><td>{lead}: {parts}. State grades for 2025 to 2026.{tail}</td></tr>'
    assert len(ROW.findall(s)) == 1, path
    s = ROW.sub(lambda _: td, s)
    open(path, 'w').write(s)

# 5. compare page label
p = 'src/js/compare-1.js'
s = open(p).read()
s = s.replace('Public school district', 'Public schools')
open(p, 'w').write(s)

print('Best Schools', len(SCHOOLS), 'vibe changes', len(changed))
print('added', sorted(i for i in changed if i in SCHOOLS))
print('removed', sorted(i for i in changed if i not in SCHOOLS))
