"""Nov 18 2026: rewrite the Best Schools guide and scoring line for the school by school rule.
Run after tools/schools_rerank.py. Edits articles/best-florida-beach-towns-for-top-rated-schools.html
and scoring.html in place (static pages, not part of the build)."""
import collections, html, json, re

e = html.escape
S = {t['id']: t for t in json.load(open('tools/schools_by_town_nov18.json'))}
LV = ['elementary', 'middle', 'high']
T = {t['id']: t for t in json.load(open('src/data/towns.json'))}
BT = {t['id']: t for t in json.load(open('src/data/beach-towns-t.json'))}
PICK = sorted(i for i in T if 'schools' in T[i]['v'])
assert len(PICK) == 41
NW = {41: 'Forty one'}[len(PICK)]


def nice(name):
    w = name.title()
    for a, b in ((' Of ', ' of '), (' And ', ' and '), (' The ', ' the '), (' At ', ' at '), ("'S ", "'s "), (' Ii', ' II'), ('K-8', 'K-8')):
        w = w.replace(a, b)
    return re.sub(r'\s+(School|Sch)$', '', w)


def county(i):
    return S[i]['district'].title() + ' County'


by = collections.defaultdict(list)
for i in PICK:
    by[county(i)].append(i)
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
OLD_DEK = 'Twenty four beach towns in the seven Florida school districts where nearly every public school earns an A or B from the state.'
NEW_DEK = f'{NW} beach towns where the elementary, middle and high school near home all earn an A from the state.'
assert s.count(OLD_DEK) == 4
s = s.replace(OLD_DEK, NEW_DEK)

i = s.index('<p>If schools are part of the move')
j = s.index('<h2>Check the schools for the address</h2>')
top = c1 = order[0]
intro = ('<p>If schools are part of the move, look at the schools a family would actually use. Florida grades every public '
         'school A through F each summer, mostly on test scores, learning gains and graduation rates. Most coastal districts '
         'earn an A overall, but the schools near home can still be a mix.</p>'
         '<p>Our Best Schools style goes to towns where the elementary, middle and high school a child would attend all earned '
         'an A for 2025 to 2026. Where the county publishes attendance zones, we use the schools zoned for most of town. '
         'Elsewhere we use the nearest public school of each level, and a town doesn\'t qualify on a charter or a school that '
         'takes students by application. '
         f'{NW} of the 167 towns we score clear it (<a href="scoring.html">here&#x27;s how we score</a>).</p>')
s = s[:i] + intro + sections + s[j:]

a = s.index('<h2>Check the schools for the address</h2>')
b = s.index('<h2>Questions</h2>')
s = s[:a] + ('<h2>Check the schools for the address</h2><p>Schools are assigned by address, and zones change. Where we list '
             'the nearest school, a home can be zoned for a different one, sometimes across a bridge. Look up the exact address '
             'with the <a href="https://www.fldoe.org/accountability/accountability-reporting/school-grades/" target="_blank" '
             'rel="noopener">Florida Department of Education</a> and the county district before you buy.</p>') + s[b:]

lead = ', '.join(f'{c} ({len(by[c])})' for c in order[:3])
q1 = re.compile(r'<h3>Which Florida coastal county has the best public schools\?</h3><p>.*?</p>', re.S)
assert len(q1.findall(s)) == 1
s = q1.sub(lambda _: ('<h3>Which Florida coastal county has the most towns with top rated schools?</h3>'
                      f'<p>Counting beach towns where all three schools earned an A for 2025 to 2026: {e(lead)}.</p>'), s)
q2 = re.compile(r'<h3>Do all these towns have the same schools\?</h3><p>.*?</p>', re.S)
assert len(q2.findall(s)) == 1
s = q2.sub(lambda _: ('<h3>Do towns in the same county share the same schools?</h3><p>No. Each town is judged on its own '
                      'elementary, middle and high school, so two towns in the same county can land on different sides of '
                      'the line.</p>'), s)
s = re.sub(r'<style id="sg-css">.*?</style>', '', s)
if True:
    s = s.replace('</head>', '<style id="sg-css">.nt-grid a:has(.sg-s){display:block!important}'
                  '.nt-grid a:has(.sg-s) b,.nt-grid a:has(.sg-s)>span{display:block}'
                  '.nt-grid a:has(.sg-s)>span{margin-top:2px}'
                  '.nt-grid a .sg-s{display:block;margin-top:6px;font-size:13px;line-height:1.45;color:#4E5D60}</style></head>', 1)
open(p, 'w').write(s)

p = 'scoring.html'
s = open(p).read()
li = re.compile(r'<li><b>Best Schools:</b>.*?</li>', re.S)
assert len(li.findall(s)) == 1
s = li.sub(lambda _: ('<li><b>Best Schools:</b> towns where the elementary, middle and high school all earned an A from the '
                      'Florida Department of Education for 2025 to 2026. We use the schools zoned for most of town where the '
                      'county publishes zones, and the nearest traditional public school of each level elsewhere, so check the '
                      f'schools for any address you&#x27;re considering. {len(PICK)} towns carry the style.</li>'), s)
old = 'Key West is the one exception, with five.'
assert s.count(old) == 1
s = s.replace(old, 'Two exceptions: Key West carries five, and Best Schools doesn&#x27;t count toward the limit, so every '
                   'town whose three schools all earn an A shows it.')
open(p, 'w').write(s)
print('counties', [(c, len(by[c])) for c in order])
