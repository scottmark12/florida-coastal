"""Nov 18 2026: add Yankeetown to Old Florida as a hand pick (Mark).

Yankeetown scores 1 of 2 on working waterfront in the Nov 8 charm rubric, so the written
rule leaves it out; Mark wants it on the list anyway. It carried only Affordable, so the
four vibe cap is not hit. In the guide it slots by the usual order (charm 8, quiet #9):
after Suwannee, before Steinhatchee, outside the top nine cards.

Writes src/data/*.json, src/pages/index.html (hero dots), src/towns/yankeetown.html,
the Old Florida guide and scoring.html. Run once, then build.
"""
import json, re

ID = 'yankeetown'


def data(path, indent):
    s = open(path).read()
    d = json.loads(s)
    rows = [r for r in d if r['id'] == ID] if isinstance(d, list) else [d[ID]]
    assert len(rows) == 1 and rows[0]['v'] == ['afford'], (path, rows)
    rows[0]['v'] = ['afford', 'oldfl']
    out = json.dumps(d, indent=indent, ensure_ascii=False) + ('\n' if s.endswith('\n') else '')
    open(path, 'w').write(out)


data('src/data/towns.json', 1)
data('src/data/map-ld.json', 1)
data('src/data/beach-towns-t.json', 2)


def sub1(path, old, new):
    s = open(path).read()
    assert s.count(old) == 1, (path, old[:60], s.count(old))
    open(path, 'w').write(s.replace(old, new))


# Homepage hero dots: V is in towns.json order.
towns = json.load(open('src/data/towns.json'))
i = [t['id'] for t in towns].index(ID)
s = open('src/pages/index.html').read()
st = s.find('var V = ') + 8
V, end = json.JSONDecoder().raw_decode(s[st:])
assert V[i] == 'afford'
V[i] = 'afford oldfl'
old = s[st:st + end]
# replace only the i-th string, keeping the original layout
pos = [m for m in re.finditer(r'"[^"]*"', old)]
assert len(pos) == len(V)
m = pos[i]
assert m.group(0) == '"afford"'
old2 = old[:m.start()] + '"afford oldfl"' + old[m.end():]
open('src/pages/index.html', 'w').write(s[:st] + old2 + s[st + end:])

# Town page chip
sub1('src/towns/yankeetown.html',
     '<div class="chips"><a href="map.html?mode=vibes&style=afford">Affordable</a></div>',
     '<div class="chips"><a href="map.html?mode=vibes&style=afford">Affordable</a>'
     '<a href="map.html?mode=vibes&style=oldfl">Old Florida</a></div>')

# Guide
G = 'articles/best-florida-beach-towns-for-old-florida-charm.html'
sub1(G, '<p>Eighteen towns carry our Old Florida style.', '<p>Nineteen towns carry our Old Florida style.')
sub1(G, 'We ranked them on coastal charm, then peace and quiet.',
     'We ranked them on coastal charm, then peace and quiet. One is our own pick: Yankeetown, '
     'an old river town of fish camps and live oaks that falls just short on working waterfront '
     'but still feels like Old Florida to us.')
sub1(G, '<a href="towns/suwannee.html">Suwannee</a>, <a href="towns/steinhatchee.html">Steinhatchee</a>',
     '<a href="towns/suwannee.html">Suwannee</a>, <a href="towns/yankeetown.html">Yankeetown</a>, '
     '<a href="towns/steinhatchee.html">Steinhatchee</a>')

# Scoring page: name the hand pick
s = open('scoring.html').read()
k = s.find('<li><b>Old Florida:</b>')
e = s.find('</li>', k)
seg = s[k:e]
assert 'Ranked on coastal charm, then peace and quiet.' in seg
seg2 = seg.replace('Ranked on coastal charm, then peace and quiet.',
                   'Ranked on coastal charm, then peace and quiet. Yankeetown is our own pick: '
                   'it falls just short on working waterfront.')
open('scoring.html', 'w').write(s[:k] + seg2 + s[e:])
print('done')
