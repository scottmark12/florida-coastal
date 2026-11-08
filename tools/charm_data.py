#!/usr/bin/env python3
"""Coastal charm (Nov 8 2026): a real old downtown, local spots, no towers on the beach.
Inputs in tools/charm_raw_nov8.json
  R[id] = OpenStreetMap counts: [food+shops within 1.6 km, of those with a chain brand tag,
          8+ story or 26 m+ buildings within 2 km, historic features within 1.6 km, heritage tags within 2.5 km, (unused)]
  H[id] = National Register of Historic Places (via Wikidata, Nov 8 2026): [listings within 2.5 km, historic districts]
Score = 45% historic core, 35% local not chains, 20% no high rise wall (each as a percentile across the 167 towns)."""
import json, math, sys
D = json.load(open(sys.argv[1] if len(sys.argv) > 1 else "tools/charm_raw_nov8.json"))
R, H = D["R"], D["H"]
ids = sorted(set(R) | set(H))
def pct(v):
    xs = sorted(v.values()); n = len(xs)
    return {k: (sum(1 for x in xs if x < y) + .5 * (sum(1 for x in xs if x == y) - 1)) / (n - 1) for k, y in v.items()}
hist, local, tower = {}, {}, {}
for k in ids:
    r = R.get(k); h = H.get(k, [0, 0])
    if not r: r = None
    hist[k] = math.log1p(h[0] + 3 * h[1] + (r[3] / 5 + r[4] / 3 if r else 0))
    local[k] = (r[0] - r[1] + .7 * 8) / (r[0] + 8) if r else .7
    tower[k] = 1 / (1 + (r[2] if r else 0) / 4)
ph, pl, pt = pct(hist), pct(local), pct(tower)
charm = {k: .45 * ph[k] + .35 * pl[k] + .20 * pt[k] for k in ids}
json.dump({"charm": charm, "hist": ph, "local": pl, "tower": pt}, sys.stdout)
