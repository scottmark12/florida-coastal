import sys
sys.path.insert(0,'work/30a_finish')
from geometry import *
es=json.loads((D/'map-data.json').read_text())['elements'];by={e['id']:e for e in es}
for wid in [103387124,103387122,103387107,103387092,103386960,103386996,103386912]:
 e=by[wid];end=e['geometry'][-1];q=project(Point(end['lon'],end['lat']));near=[]
 for b in es:
  if 'building' not in b.get('tags',{}):continue
  p=polygons(b)
  if not p.is_empty:
   d=project(p).distance(q)*1000
   if d<22:near.append((b['id'],round(d,1),b['tags'],list(p.centroid.coords)))
 print(wid,near)
