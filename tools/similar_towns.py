"""Nov 18 2026: "Most like this town" on every town page, plus a compare button.

Similarity: each town's rank in 11 categories (nightlife, meeting people, peace and quiet,
walkability, on the water, beaches, dining and arts, outdoors, affordability, airport access,
coastal charm) turned into a 0 to 1 percentile; distance is the average gap. Shared vibes
pull towns a little closer (0.03 per shared vibe). The three Nearby towns and the town itself
are left out, so the section always adds new towns from anywhere on the coast.

Writes src/towns/<id>.html (a marked section after Nearby, Nearby heading renamed) and the
`sim` list in src/data/compare-d.json (the compare page fills a lone town from it), so the
button, the sidebar compare link and the compare page agree. Safe to rerun: the marked
section is replaced, not added twice. Then build.
"""
import json, re, html, os

CATS = ['nightlife', 'meet', 'quiet', 'walk', 'water', 'beach', 'dining', 'outdoors', 'afford',
        'airport', 'charm']
WORD = {'nightlife': 'nightlife', 'meet': 'meeting people', 'quiet': 'peace and quiet',
        'walk': 'walkability', 'water': 'life on the water', 'beach': 'beaches',
        'dining': 'dining and arts', 'outdoors': 'the outdoors', 'afford': 'affordability',
        'airport': 'airport access', 'charm': 'coastal charm'}
N = 167
ld = json.load(open('src/data/map-ld.json'))
towns = {t['id']: t for t in json.load(open('src/data/towns.json'))}
VS = json.load(open('src/data/map-lk.json'))['VSHORT']
cmp_path = 'src/data/compare-d.json'
cmp_raw = open(cmp_path).read()
cmp = json.loads(cmp_raw)
assert len(ld) == N == len(towns)

P = {i: {c: 1 - (ld[i]['rk'][c] - 1) / (N - 1) for c in CATS} for i in ld}


def dist(a, b):
    d = sum(abs(P[a][c] - P[b][c]) for c in CATS) / len(CATS)
    shared = len(set(towns[a]['v']) & set(towns[b]['v']))
    return d - 0.03 * shared


def why(a, b):
    shared = [v for v in towns[a]['v'] if v in towns[b]['v']]
    if shared:
        names = [VS[v] for v in shared[:2]]
        return 'Both ' + ' and '.join(names)
    both = sorted([c for c in CATS if ld[a]['rk'][c] <= 50 and ld[b]['rk'][c] <= 50],
                  key=lambda c: ld[a]['rk'][c] + ld[b]['rk'][c])
    if both:
        return 'Both strong on ' + ' and '.join(WORD[c] for c in both[:2])
    close = sorted(CATS, key=lambda c: abs(P[a][c] - P[b][c]))
    return 'Similar on ' + ' and '.join(WORD[c] for c in close[:2])


def small_img(p):
    d, f = p.rsplit('/', 1)
    s = d + '/s/' + f
    return s if os.path.exists(s) else p


def short(b, n=118):
    """A full thought, never cut mid phrase: the first sentence if it fits, else up to the last
    comma that fits, ended with a period."""
    first = re.split(r'(?<!\bSt)(?<!\bFt)(?<!\bMt)(?<!\bDr)\.\s+(?=[A-Z])', b)[0].rstrip('.')
    if len(first) <= n:
        return first + '.'
    cut = first[:n]
    k = max(cut.rfind(', '), cut.rfind(' with '), cut.rfind(' where '))
    if k > 25:
        return cut[:k].rstrip(',') + '.'
    return cut.rsplit(' ', 1)[0].rstrip(',;:') + '…'


START, END = '<!-- similar -->', '<!-- /similar -->'
changed = 0
for tid in ld:
    path = f'src/towns/{tid}.html'
    s = open(path).read()
    meta = json.loads(re.match(r'<!-- town (\{.*?\}) -->', s).group(1))
    near = set(meta.get('near', []))
    ranked = sorted((o for o in ld if o != tid and o not in near), key=lambda o: dist(tid, o))
    top3 = ranked[:3]
    name = towns[tid]['n']
    cards = ''.join(
        f'<div class="lkc"><a class="lkc-a" href="towns/{o}.html"><div class="ph" style="background-image:url(\'{small_img(towns[o]["img"])}\')"></div>'
        f'<div><b>{html.escape(towns[o]["n"])}</b><small>{html.escape(why(tid, o))}</small>'
        f'<span>{html.escape(short(towns[o]["b"]))}</span></div></a>'
        f'<a class="lkx" href="compare.html?t={tid},{o}">Compare with {html.escape(cmp["towns"][tid]["s"])}</a></div>' for o in top3)
    block = (f'{START}<section class="lk"><h2>More like {html.escape(name)}</h2>'
             f'<p class="lkp">The towns that score closest to {html.escape(name)} across our categories, '
             f'anywhere on the coast.</p><div class="lkl">{cards}</div>'
             f'<a class="cmpr" href="compare.html?t={",".join([tid] + top3)}">Compare {html.escape(cmp["towns"][tid]["s"])} with all three</a>'
             f'</section>{END}')
    if START in s:
        s = re.sub(re.escape(START) + '.*?' + re.escape(END), lambda m: block, s, count=1, flags=re.S)
    else:
        old = '<section><h2>Nearby and similar</h2>'
        assert s.count(old) == 1, tid
        s = s.replace(old, '<section><h2>Nearby</h2>')
        i = s.find('<section><h2>Nearby</h2>')
        j = s.find('</section>', i) + len('</section>')
        s = s[:j] + block + s[j:]
    open(path, 'w').write(s)
    cmp['towns'][tid]['sim'] = ranked[:8]
    changed += 1

open(cmp_path, 'w').write(json.dumps(cmp, indent=2, ensure_ascii=False) + '\n')
print('town pages', changed)
