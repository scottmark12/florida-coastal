"""Include the actual Gulf edge west of inland Weeki Wachee; no inferred coastline."""
from pathlib import Path
import json,gzip
P=Path(__file__).resolve().parent/'work/coastal_pipeline/v4';d=P/'weeki-wachee'
c=json.load(open(d/'catalog-input.json'));c['bounds'][0]=-82.70;c['towns'][0]['source_bounds'][0]=-82.64;(d/'catalog-input.json').write_text(json.dumps(c,indent=2)+'\n')
for name in ['geography','cover']:
 es={}
 for town in ['weeki-wachee','hernando-beach']:
  for e in json.load(gzip.open(P/town/(name+'.json.gz'),'rt'))['elements']:es[e['type'],e['id']]=e
 (d/(name+'.json.gz')).write_bytes(gzip.compress(json.dumps({'elements':list(es.values()),'source':'OSM snapshot; adjacent source windows combined to include the actual Gulf coastline'},separators=(',',':')).encode(),mtime=0))
print('Weeki Wachee west boundary expanded to include mapped Gulf shoreline')
