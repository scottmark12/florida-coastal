import pickle,json,math,struct,gzip
from pathlib import Path
import numpy as np
O=Path('outputs/florida_coastal_regions');s=pickle.load(open('work/atlas_regions/scene.pkl','rb'));assets=s['assets'];colors=s['colors'];instances=s['instances'];geo={'projection':'+proj=aea +lat_1=24 +lat_2=31.5 +lat_0=24 +lon_0=-84 +datum=NAD83 +units=m +no_defs'}
for city,center in [('miami',[381.3,202.0]),('tampa',[151.4,439.2])]:
 core=[o for o in instances if o['city']==city and (o['asset'].startswith('Composed / Urban') or o['asset'].startswith('Composed / Miami'))]
 if not core:continue
 origin=np.mean([o['p'][:2] for o in core],axis=0)
 for o in core:o['p'][:2]=(np.array(center)+(np.array(o['p'][:2])-origin)*.55).tolist()
pickle.dump(s,open('work/atlas_regions/scene.pkl','wb'))
def rgb(c):return [int(c[i:i+2],16)/255 for i in [1,3,5]]
src=Path('work/florida_atlas/build_atlas.py').read_text();exec('def export('+src.split('def export(')[1].split("geokeys=['Geography")[0])
cat=json.loads((O/'catalog.json').read_text());byid={t['id']:t for t in cat['towns']}
for r in cat['regions']:
 if not any(t in r['towns'] for t in ['miami','tampa','st-petersburg']):continue
 centers=np.array([[byid[t]['x'],byid[t]['y']] for t in r['towns']]);objs=[o for o in instances if np.min(np.linalg.norm(centers-np.array(o['p'][:2]),axis=1))<45];p=O/'assets'/(r['id']+'.glb');export(p,objs,[]);p.with_suffix('.glb.gz').write_bytes(gzip.compress(p.read_bytes(),6))
