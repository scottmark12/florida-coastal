import pickle,json,math,struct,gzip
from pathlib import Path
import numpy as np
O=Path('outputs/florida_coastal_regions');s=pickle.load(open('work/atlas_regions/scene.pkl','rb'));assets=s['assets'];colors=s['colors'];instances=s['instances'];geo={'projection':'+proj=aea +lat_1=24 +lat_2=31.5 +lat_0=24 +lon_0=-84 +datum=NAD83 +units=m +no_defs'}
before=after=0
for k,parts in list(assets.items()):
 if k.startswith('Geography'):continue
 allv=np.concatenate([p[1] for p in parts]);step=max(np.ptp(allv,axis=0))/28
 if step<=0:continue
 out=[]
 for n,v,f,m in parts:
  v=np.round(v/step)*step;v,rev=np.unique(v,axis=0,return_inverse=True);f=rev[f];tri=v[f];area=np.linalg.norm(np.cross(tri[:,1]-tri[:,0],tri[:,2]-tri[:,0]),axis=1);f=f[area>1e-8];before+=len(area);after+=len(f)
  if len(f):out.append((n,v.astype(np.float32),f.astype(np.uint32),m))
 if out:assets[k]=out
print('Geometry triangles',before,after,flush=True)
def rgb(c):return [int(c[i:i+2],16)/255 for i in [1,3,5]]
src=Path('work/florida_atlas/build_atlas.py').read_text();exec('def export('+src.split('def export(')[1].split("geokeys=['Geography")[0])
cat=json.loads((O/'catalog.json').read_text());byid={t['id']:t for t in cat['towns']}
for r in cat['regions']:
 centers=np.array([[byid[t]['x'],byid[t]['y']] for t in r['towns']]);objs=[o for o in instances if np.min(np.linalg.norm(centers-np.array(o['p'][:2]),axis=1))<45];p=O/'assets'/('mobile-'+r['id']+'.glb');export(p,objs,[]);p.with_suffix('.glb.gz').write_bytes(gzip.compress(p.read_bytes(),6))
