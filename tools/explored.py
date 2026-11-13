#!/usr/bin/env python3
"""Write src/data/beach-towns-views.json from a pull made with tools/explored.sql.

  python3 tools/explored.py pull.json      (pull.json holds the {"from","to","views"} value)

The SQL already counts merged towns with the town that now covers them. Ids the site no longer has
are dropped. Then rebuild: cd tools/site && npm run site
"""
import json, sys

raw = json.load(open(sys.argv[1]))
raw = raw.get('j', raw)
ids = {t['id'] for t in json.load(open('src/data/beach-towns-t.json'))}
views = {}
for k, v in raw['views'].items():
    if k in ids:
        views[k] = views.get(k, 0) + v
views = dict(sorted(views.items(), key=lambda x: -x[1]))
out = {'from': raw['from'], 'to': raw['to'], 'views': views}
json.dump(out, open('src/data/beach-towns-views.json', 'w'), indent=1)
print(f"{len(views)} towns, {out['from']} to {out['to']}; top:", list(views.items())[:5])
