import pickle,json,math,struct,gzip
from pathlib import Path
import numpy as np
O=Path('outputs/florida_coastal_regions');s=pickle.load(open('work/atlas_regions/scene.pkl','rb'));assets=s['assets'];colors=s['colors'];geo={'projection':'+proj=aea +lat_1=24 +lat_2=31.5 +lat_0=24 +lon_0=-84 +datum=NAD83 +units=m +no_defs'};original={k:assets[k] for k in s['geokeys']};cat=json.loads((O/'catalog.json').read_text());byid={t['id']:t for t in cat['towns']}
def rgb(c):return [int(c[i:i+2],16)/255 for i in [1,3,5]]
src=Path('work/florida_atlas/build_atlas.py').read_text();exec('def export('+src.split('def export(')[1].split("geokeys=['Geography")[0])
def save(name,box=None):
 keys=[]
 for k,parts in original.items():
  out=[]
  for n,v,f,m in parts:
   if box:
    a,b,c,d=box;tri=v[f];mask=(tri[:,:,0].max(1)>=a)&(tri[:,:,0].min(1)<=c)&(tri[:,:,1].max(1)>=b)&(tri[:,:,1].min(1)<=d);ff=f[mask]
    if not len(ff):continue
    ids,rev=np.unique(ff,return_inverse=True);vv=v[ids];ff=rev.reshape(-1,3)
   else:
    vv=v.copy();vv[:,:2]=np.round(vv[:,:2]/.65)*.65;vv,rev=np.unique(vv,axis=0,return_inverse=True);ff=rev[f];tri=vv[ff];area=np.abs(np.cross(tri[:,1,:2]-tri[:,0,:2],tri[:,2,:2]-tri[:,0,:2]));ff=ff[area>.05]
   if len(ff):out.append((n,vv.astype(np.float32),ff.astype(np.uint32),m))
  if out:assets[k+' lod']=out;keys.append(k+' lod')
 p=O/'assets'/(name+'.glb');export(p,[],keys);data=p.read_bytes();(O/'assets'/(name+'.glb.gz')).write_bytes(gzip.compress(data,6));print(name,len(data),flush=True)
save('terrain-state')
for r in cat['regions']:
 pts=np.array([[byid[t]['x'],byid[t]['y']] for t in r['towns']]);low=pts.min(0)-65;high=pts.max(0)+65;save('terrain-'+r['id'],[*low,*high])
