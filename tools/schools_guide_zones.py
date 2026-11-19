"""Nov 18 2026: refresh the Best Schools guide after the zone follow up (39 towns).
Run after tools/schools_rerank.py. Rebuilds the county sections, counts and the county FAQ line of
articles/best-florida-beach-towns-for-top-rated-schools.html, the scoring line and the Vibe Map
subtitle. Works on the current page (tools/schools_guide.py was the one time rewrite)."""
import collections, html, json, re

e = html.escape
S = {t['id']: t for t in json.load(open('tools/schools_by_town_nov18.json'))}
LV = ['elementary', 'middle', 'high']
T = {t['id']: t for t in json.load(open('src/data/towns.json'))}
BT = {t['id']: t for t in json.load(open('src/data/beach-towns-t.json'))}
PICK = sorted(i for i in T if 'schools' in T[i]['v'])
WORDS = {39: 'Thirty nine', 40: 'Forty', 41: 'Forty one'}
NW = WORDS[len(PICK)]


def nice(name):
    w = name.title()
    for a, b in ((' Of ', ' of '), (' And ', ' and '), (' The ', ' the '), (' At ', ' at '), ("'S ", "'s "), (' Ii', ' II'), ('K-8', 'K-8')):
        w = w.replace(a, b)
    return re.sub(r'\s+(School|Sch)$', '', w)


by = collections.defaultdict(list)
for i in PICK:
    by[S[i]['district'].title() + ' County'].append(i)
order = sorted(by, key=lambda c: (-len(by[c]), c))

sections = ''
for c in order:
    cards = ''
    for i in sorted(by[c], key=lambda i: T[i]['n']):
        p = BT[i].get('p')
        zoned = all(S[i][lv]['method'] == 'zone' for lv in LV)
        names = ', '.join(e(n) for n in dict.fromkeys(nice(S[i][lv]['name']) for lv in LV))
        cards += (f'<a href="towns/{i}.html"><b>{e(T[i]["n"])}</b><span>{("About " + e(p)) if p else ""}</span>'
                  f'<small class="sg-s">{"Zoned" if zoned else "Nearest"}: {names}</small></a>')
    n = len(by[c])
    sections += (f'<section class="fcr-item"><h2 class="fcr-h">{e(c)}</h2><div class="fcr-scores">'
                 f'<span class="fcr-chip fcr-rank">{n} town{"s" if n > 1 else ""}</span>'
                 f'<span class="fcr-chip">Elementary, middle and high all <b>A</b></span></div>'
                 f'<div class="nt-grid">{cards}</div></section>')

p = 'articles/best-florida-beach-towns-for-top-rated-schools.html'
s = open(p).read()
old_nw = next(w for w in WORDS.values() if f'{w} beach towns where' in s)
s = s.replace(f'{old_nw} beach towns where', f'{NW} beach towns where')
s = s.replace(f'{old_nw} of the 167 towns we score clear it', f'{NW} of the 167 towns we score clear it')
s = s.replace('Where the county publishes attendance zones, we use the schools zoned for most of town.',
              'Where the county publishes attendance zones, we use the schools zoned for the biggest part of town.')
a = s.index('<section class="fcr-item">')
b = s.index('<h2>Check the schools for the address</h2>')
s = s[:a] + sections + s[b:]
lead = ', '.join(f'{c} ({len(by[c])})' for c in order[:3])
s, n = re.subn(r'Counting beach towns where all three schools earned an A for 2025 to 2026: [^<"]*\.',
               f'Counting beach towns where all three schools earned an A for 2025 to 2026: {e(lead)}.', s)
assert n >= 1
s = s.replace('"dateModified": "2026-11-18"', '"dateModified": "2026-11-18"')
open(p, 'w').write(s)

p = 'scoring.html'
s = open(p).read()
s, n = re.subn(r'(<li><b>Best Schools:</b>[^<]*?)We use the schools zoned for most of town', r'\1We use the schools zoned for the biggest part of town', s)
s, n2 = re.subn(r'(<li><b>Best Schools:</b>[^<]*?)\d+ towns carry the style', rf'\g<1>{len(PICK)} towns carry the style', s)
assert n2 == 1
open(p, 'w').write(s)
print(len(PICK), lead)
