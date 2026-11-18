"""Nov 18 2026: Nearby gets the same photo cards as "More like" (Mark approved 5 changes).

- Nearby: a wide mini map strip, then 3 photo cards (name, distance and typical price),
  built from the existing Nearby cards so distances stay as they were.
- Drops the sidebar "Compare <town> with similar towns" link (it opened the same four
  towns as "Compare all four").
Run once after tools/similar_towns.py, then build. Safe to rerun.
"""
import glob, html, json, re

towns = {t['id']: t for t in json.load(open('src/data/towns.json'))}
OLD = re.compile(r'<section><h2>Nearby</h2><div class="mapw"><svg id="mm" viewBox="0 0 10 10"></svg><div class="nt">(.*?)</div></div></section>', re.S)
CARD = re.compile(r'<a href="towns/([^"]+)\.html"><div class="ph" style="background-image:url\(\'([^\']+)\'\)"></div><div><b>([^<]+)</b><small>([^<]+)</small>')
CMPL = re.compile(r'<a class="cmpl" href="compare\.html\?t=[^"]+">[^<]*</a>')
n = 0
for f in sorted(glob.glob('src/towns/*.html')):
    s = open(f).read()
    m = OLD.search(s)
    if m:
        cards = ''
        for tid, img, name, dist in CARD.findall(m.group(1)):
            p = towns[tid].get('p')
            meta = html.escape(dist) + (' · ' + html.escape(p) if p else '')
            cards += (f'<a class="lkc" href="towns/{tid}.html"><span class="lkc-ph" style="background-image:url(\'{img}\')"></span>'
                      f'<b>{name}</b><span class="lkc-m">{meta}</span></a>')
        s = s[:m.start()] + ('<section class="nb"><h2>Nearby</h2><svg id="mm" viewBox="0 0 10 10"></svg>'
                             f'<div class="lkl">{cards}</div></section>') + s[m.end():]
    s = CMPL.sub('', s)
    open(f, 'w').write(s)
    n += 1
print('town pages', n)
