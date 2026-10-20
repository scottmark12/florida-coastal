import sys,pickle,json,math,struct,gzip
from pathlib import Path
import numpy as np
sys.path.insert(0,'work/florida_atlas/python_pkgs')
from pyproj import Transformer
O=Path('outputs/florida_coastal_regions');s=pickle.load(open('work/atlas_regions/scene.pkl','rb'));assets=s['assets'];colors=s['colors'];instances=s['instances'];geo={'projection':'+proj=aea +lat_1=24 +lat_2=31.5 +lat_0=24 +lon_0=-84 +datum=NAD83 +units=m +no_defs'};tr=Transformer.from_crs(4326,geo['projection'],always_xy=True)
core=[o for o in instances if o['city']=='tampa' and o['asset'].startswith('Urban /')];origin=np.mean([o['p'][:2] for o in core],axis=0)
for o in instances:
 k=o['asset'].lower();e=np.ptp(np.concatenate([p[1] for p in assets[o['asset']]]),axis=0)*o['s']
 if any(t in k for t in ['detail / umbrella','detail / car','detail / bench']):o['s']=[v*min(1,.12/max(e)) for v in o['s']]
 if o['city']=='tampa':
  if o['asset'].startswith('Urban /'):o['p'][:2]=(np.array([151.6,439.6])+(np.array(o['p'][:2])-origin)*.45).tolist()
  if o['asset'].startswith(('Curated / brick','Curated / balcony')):o['s'][2]*=min(1,(.55 if 'brick' in k else .8)/max(e[2],.01))
  loc=(-82.4588,27.945) if '100 north tampa' in k else (-82.466,27.947) if 'plant hall' in k else None
  if loc:o['p'][:2]=[v/1000 for v in tr.transform(*loc)]
pickle.dump(s,open('work/atlas_regions/scene.pkl','wb'))
def rgb(c):return [int(c[i:i+2],16)/255 for i in [1,3,5]]
src=Path('work/florida_atlas/build_atlas.py').read_text();exec('def export('+src.split('def export(')[1].split("geokeys=['Geography")[0])
cat=json.loads((O/'catalog.json').read_text());byid={t['id']:t for t in cat['towns']}
for r in cat['regions']:
 centers=np.array([[byid[t]['x'],byid[t]['y']] for t in r['towns']]);objs=[o for o in instances if np.min(np.linalg.norm(centers-np.array(o['p'][:2]),axis=1))<45];p=O/'assets'/(r['id']+'.glb');export(p,objs,[]);p.with_suffix('.glb.gz').write_bytes(gzip.compress(p.read_bytes(),6))
