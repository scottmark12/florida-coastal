import sys,pickle,json,math,struct,gzip
from pathlib import Path
import numpy as np
sys.path.insert(0,'work/florida_atlas/python_pkgs')
from shapely.geometry import shape,box
O=Path('outputs/florida_coastal_regions');s=pickle.load(open('work/atlas_regions/scene.pkl','rb'));assets=s['assets'];colors=s['colors'];instances=s['instances'];geo=json.load(open('work/coast_geography/geography.json'));land=shape(geo['land']);rng=np.random.default_rng(19)
def cube(c,d):
 x,y,z=c;w,h,t=np.array(d)/2;v=np.array([[x-w,y-h,z-t],[x+w,y-h,z-t],[x+w,y+h,z-t],[x-w,y+h,z-t],[x-w,y-h,z+t],[x+w,y-h,z+t],[x+w,y+h,z+t],[x-w,y+h,z+t]],np.float32);f=np.array([[0,2,1],[0,3,2],[4,5,6],[4,6,7],[0,1,5],[0,5,4],[1,2,6],[1,6,5],[2,3,7],[2,7,6],[3,0,4],[3,4,7]],np.uint32);return v,f
for j in range(3):
 parts=[]
 for name,c,d,m in [('stucco',[0,0,.14],[.29,.32,.28],1 if j!=2 else 10),('roof',[0,0,.29],[.32,.35,.035],2 if j else 6),('porch',[0,-.19,.10],[.22,.08,.035],1),('front glazing',[0,-.162,.15],[.16,.006,.10],4)]:
  v,f=cube(c,d);parts.append((name,v,f,m))
 assets['Neighborhood / Miami lowrise '+str(j)]=parts
occupied=[o['p'][:2] for o in instances if o['city']=='miami' and not any(t in o['asset'].lower() for t in ['tree','palm','grass','car','bench','umbrella'])];added=0
for ix,x in enumerate(np.arange(372,382,.55)):
 for iy,y in enumerate(np.arange(201,214,.55)):
  if rng.random()<.20 or not land.covers(box(x-.22,y-.23,x+.22,y+.23)):continue
  if any(math.hypot(x-a,y-b)<.62 for a,b in occupied):continue
  # Taper the inland edge and leave space around larger district landmarks.
  if x<373 and rng.random()<.6:continue
  key='Neighborhood / Miami lowrise '+str((ix+iy)%3);instances.append(dict(asset=key,p=[float(x),float(y),.2],s=[1,1,1],r=0,city='miami',layer='spaced urban background'));added+=1
pickle.dump(s,open('work/atlas_regions/scene.pkl','wb'))
def rgb(c):return [int(c[i:i+2],16)/255 for i in [1,3,5]]
src=Path('work/florida_atlas/build_atlas.py').read_text();exec('def export('+src.split('def export(')[1].split("geokeys=['Geography")[0])
cat=json.loads((O/'catalog.json').read_text());byid={t['id']:t for t in cat['towns']};r=next(r for r in cat['regions'] if 'miami' in r['towns']);centers=np.array([[byid[t]['x'],byid[t]['y']] for t in r['towns']]);objs=[o for o in instances if np.min(np.linalg.norm(centers-np.array(o['p'][:2]),axis=1))<45];p=O/'assets'/(r['id']+'.glb');export(p,objs,[]);p.with_suffix('.glb.gz').write_bytes(gzip.compress(p.read_bytes(),6));print('Urban background lots',added)
