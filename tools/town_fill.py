#!/usr/bin/env python3
"""Fill out the 6 new town pages (Nov 12 2026) so they match the other 161.

Reads /home/claude/fig/newtowns_fill.json (research, with sources) on top of newtowns_pages.json and
patches src/towns/<id>.html in place:
- adds "Where to live and what it costs" and "A week here" after About (skipped if already there)
- swaps the generic "About in the middle of our 167 towns." scorecard lines for local takes
- rebuilds the 8 standard questions (page and FAQPage data) in the same order as the other towns
Safe to run again.
"""
import json, re, html

NEW = ['marathon', 'big-pine-key', 'key-biscayne', 'boca-grande', 'pompano-beach', 'deerfield-beach']
LAB = {'Active outdoors': 'outdoors', 'Affordability': 'afford', 'Airport access': 'airport', 'Beaches': 'beach',
       'Coastal charm': 'charm', 'Dining and arts': 'dining', 'Meet people': 'meet', 'Nightlife': 'nightlife',
       'On the water': 'water', 'Peace and quiet': 'quiet', 'Walkability': 'walk'}
PG = json.load(open('/home/claude/fig/newtowns_pages.json'))
FL = json.load(open('/home/claude/fig/newtowns_fill.json'))
T = {t['id']: t for t in json.load(open('src/data/towns.json'))}
e = lambda s: html.escape(s)
un = lambda s: html.unescape(re.sub(r'<[^>]+>', '', s))


def where(F):
    a = ''.join(f'<div class="area"><div><b>{e(n)}</b><small>{e(sm)}</small><p>{e(p)}</p><span class=ap>{e(ap)}</span></div><div class="pr"></div></div>'
                for n, sm, p, ap in F['areas'])
    b = '<div class="bud">' + ''.join(f'<div><b>{e(x)}</b><span>{e(y)}</span><small>{e(z)}</small></div>' for x, y, z in F['bud']) + '</div>'
    return f'<section><h2>Where to live and what it costs</h2>{a}{b}<div class="src">{e(F["src"])}</div></section>'


def week(F):
    return '<section><h2>A week here</h2><div class="week">' + ''.join(f'<div><b>{e(a)}</b><span>{e(b)}</span></div>' for a, b in F['week']) + '</div></section>'


for i in NEW:
    p = f'src/towns/{i}.html'; s = open(p).read()
    P, F, nm = PG[i], FL[i], T[i]['n']
    N = {**P['notes'], **F['notes']}

    # scorecard local takes
    def row(m):
        k = LAB[m.group(2)]
        return m.group(1) + (e(N[k]) if k in N else m.group(3)) + '</p></details>'
    s = re.sub(r'(<details class="(?:hi|lo|mid)"><summary><span class="l">([^<]+)</span>.*?</summary><p>)(.*?)</p></details>', row, s, flags=re.S)

    # where to live + a week here, right after About
    if 'Where to live and what it costs' not in s:
        a = s.index(f'<h2>About {e(nm)}</h2>') if f'<h2>About {e(nm)}</h2>' in s else s.index('<h2>About ')
        end = s.index('</section>', a) + len('</section>')
        s = s[:end] + '\n' + where(F) + '\n' + week(F) + s[end:]

    # the 8 standard questions
    f0 = s.index('<section class="faq">'); f1 = s.index('</section>', f0) + len('</section>')
    old = {un(q): un(a) for q, a in re.findall(r'<summary>(.*?)</summary><p>(.*?)</p>', s[f0:f1], re.S)}
    before = old[f'What should I know before moving to {nm}?']
    L = F['faq']
    faq = [(f'Is {nm} walkable?', f"{L['walk']} {N['walk']}"),
           (f'Does {nm} have a good beach?', f"{L['beach']} {N['beach']}"),
           (f'Is {nm} affordable?', f"{L['afford']} Home prices: {P['price']}. {N['afford']}"),
           (f'What is the nightlife like in {nm}?', f"{L['nightlife']} {N['nightlife']}"),
           (f'How busy does {nm} get?', f"{L['busy']} {N['quiet']}"),
           (f'Is {nm} good for boating and fishing?', f"{L['boat']} {N['water']}"),
           (f'Which airport is closest to {nm}?', N['airport']),
           (f'What should I know before moving to {nm}?', before)]
    s = s[:f0] + '<section class="faq"><h2>Common questions</h2>' + ''.join(
        f'\n<details><summary>{e(q)}</summary><p>{e(a)}</p></details>' for q, a in faq) + '</section>' + s[f1:]

    m = re.search(r'(<script type="application/ld\+json">)(.*?)(</script>)', s, re.S)
    ld = json.loads(m.group(2))
    for g in ld['@graph']:
        if g['@type'] == 'FAQPage':
            g['mainEntity'] = [{'@type': 'Question', 'name': q, 'acceptedAnswer': {'@type': 'Answer', 'text': a}} for q, a in faq]
    s = s[:m.start(2)] + json.dumps(ld, ensure_ascii=False) + s[m.end(2):]

    open(p, 'w').write(s)
    left = s.count('About in the middle of our 167 towns.')
    print(i, 'faq', len(faq), 'generic rows left', left)
