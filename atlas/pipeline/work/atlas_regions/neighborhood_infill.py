import sys,pickle,json,math,struct,gzip,random
from pathlib import Path
import numpy as np
sys.path.insert(0,'work/florida_atlas/python_pkgs')
import shapely
from shapely.geometry import shape,Point,box,LineString
from shapely.ops import unary_union
O=Path('outputs/florida_coastal_regions');s=pickle.load(open('work/atlas_regions/scene.pkl','rb'));assets=s['assets'];colors=s['colors'];instances=s['instances'];geokeys=s['geokeys'];geo=json.loads(Path('work/coast_geography/geography.json').read_text());land=shape(geo['land']);shapely.prepare(land)
source=Path('work/atlas_regions/build.py').read_text();exec('def flat('+source.split('def flat(')[1].split("flat('Geography / Mainland'")[0])
D=json.loads(Path('work/atlas_regions/districts.json').read_text());rng=random.Random(182);ext={k:np.ptp(np.concatenate([p[1] for p in a]),axis=0) for k,a in assets.items()};occupied={}
non=['tree','palm','grass','bridge','boat','pier','dock','car']
for o in instances:
 if any(t in o['asset'].lower() for t in non):continue
 x,y=o['p'][:2];w,d,h=ext[o['asset']]*o['s'];occupied.setdefault((int(x),int(y)),[]).append((x,y,max(w,d)*.55))
styles={'brickell':'modern','grove':'porch','gables':'mediterranean','southbeach-district':'deco','edgewater':'balcony','downtown-tampa':'modern','hydepark':'porch','ybor':'brick','davis':'ranch','westchase':'ranch','seminole':'porch','dtsp':'modern','old-ne':'porch'}
trees=[k for k in assets if 'tree' in k.lower() and 'geography' not in k.lower()];roads=[];added=0
for d in D:
 if d['id'] not in styles:continue
 style=styles[d['id']];urban=style in ['modern','balcony','deco'];step=.46 if urban else .5
 for row in range(-4,5):
  for col in range(-5,6):
   if rng.random()<.22 or (abs(row)+abs(col)>7 and rng.random()<.5):continue
   x=d['x']+col*step+(row%2)*.07;y=d['y']+row*step
   width=.26 if urban else .22;depth=.29 if urban else .25;radius=.21
   if not land.covers(box(x-.2,y-.2,x+.2,y+.2)):continue
   c=(int(x),int(y));near=[q for dx in [-1,0,1] for dy in [-1,0,1] for q in occupied.get((c[0]+dx,c[1]+dy),[])]
   if any(math.hypot(x-q[0],y-q[1])<radius+q[2] for q in near):continue
   key='Curated / '+style+' '+str(rng.randrange(6));h=rng.uniform(.45,.75) if urban else rng.uniform(.18,.3);scale=np.array([width,depth,h])/np.maximum(ext[key],.01)
   instances.append(dict(asset=key,p=[x,y,.22],s=scale.tolist(),r=0,city=d['town'],layer='spaced neighborhood infill'));occupied.setdefault(c,[]).append((x,y,radius));added+=1
   if trees and rng.random()<.65:
    tk=trees[rng.randrange(len(trees))];e=ext[tk];sc=.17/max(e);instances.append(dict(asset=tk,p=[x+.18,y+.13,.22],s=[sc]*3,r=0,city=d['town'],layer='neighborhood street canopy'))
  roads.append(LineString([(d['x']-2.6,d['y']+row*step-.21),(d['x']+2.6,d['y']+row*step-.21)]).buffer(.025).intersection(land))
flat('Geography / District street connections',unary_union(roads),.13,next(i for i,(n,c) in enumerate(colors) if n=='Atlas main roads'))
pickle.dump(s,open('work/atlas_regions/scene.pkl','wb'))
def rgb(c):return [int(c[i:i+2],16)/255 for i in [1,3,5]]
src=Path('work/florida_atlas/build_atlas.py').read_text();exec('def export('+src.split('def export(')[1].split("geokeys=['Geography")[0])
cat=json.loads((O/'catalog.json').read_text());byid={t['id']:t for t in cat['towns']}
for r in cat['regions']:
 if not any(t in r['towns'] for t in ['miami','tampa','st-petersburg']):continue
 centers=np.array([[byid[t]['x'],byid[t]['y']] for t in r['towns']]);objs=[o for o in instances if np.min(np.linalg.norm(centers-np.array(o['p'][:2]),axis=1))<45];p=O/'assets'/(r['id']+'.glb');export(p,objs,[]);p.with_suffix('.glb.gz').write_bytes(gzip.compress(p.read_bytes(),6))
print('Neighborhood buildings added',added)
