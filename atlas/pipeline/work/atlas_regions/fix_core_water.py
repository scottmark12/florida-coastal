import sys,pickle,json,math,struct,gzip
from pathlib import Path
import numpy as np
sys.path.insert(0,'work/florida_atlas/python_pkgs')
from shapely.geometry import shape,Point,box
O=Path('outputs/florida_coastal_regions');s=pickle.load(open('work/atlas_regions/scene.pkl','rb'));assets=s['assets'];colors=s['colors'];instances=s['instances'];geo=json.load(open('work/coast_geography/geography.json'));land=shape(geo['land']);moves={}
for o in instances:
 if o['city'] not in ['miami','tampa'] or not o['asset'].startswith(('Composed / Urban','Composed / Miami')):continue
 x,y=o['p'][:2]
 if land.covers(Point(x,y)):continue
 key=(x,y)
 if key not in moves:
  options=sorted([(dx,dy) for dx in np.arange(-3,1,.35) for dy in np.arange(-2,2,.35)],key=lambda p:p[0]**2+p[1]**2)
  for dx,dy in options:
   if land.covers(box(x+dx-.43,y+dy-.43,x+dx+.43,y+dy+.43)):moves[key]=(x+dx,y+dy);break
 if key in moves:o['p'][:2]=list(moves[key])
pickle.dump(s,open('work/atlas_regions/scene.pkl','wb'))
def rgb(c):return [int(c[i:i+2],16)/255 for i in [1,3,5]]
src=Path('work/florida_atlas/build_atlas.py').read_text();exec('def export('+src.split('def export(')[1].split("geokeys=['Geography")[0])
cat=json.loads((O/'catalog.json').read_text());byid={t['id']:t for t in cat['towns']}
for r in cat['regions']:
 if not any(t in r['towns'] for t in ['miami','tampa','st-petersburg']):continue
 centers=np.array([[byid[t]['x'],byid[t]['y']] for t in r['towns']]);objs=[o for o in instances if np.min(np.linalg.norm(centers-np.array(o['p'][:2]),axis=1))<45];p=O/'assets'/(r['id']+'.glb');export(p,objs,[]);p.with_suffix('.glb.gz').write_bytes(gzip.compress(p.read_bytes(),6))
print('Shoreline corrections',len(moves))
