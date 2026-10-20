import sys,json,math,pickle,struct,gzip
from pathlib import Path
import numpy as np
sys.path.insert(0,'work/florida_atlas/python_pkgs')
import shapely
from shapely.geometry import shape,Point,box,LineString,Polygon
from shapely.ops import unary_union
O=Path('outputs/florida_coastal_regions');s=pickle.load(open('work/atlas_regions/scene.pkl','rb'));assets=s['assets'];instances=s['instances'];colors=s['colors'];geokeys=s['geokeys'];geo=json.loads(Path('work/coast_geography/geography.json').read_text());land=shape(geo['land']);shapely.prepare(land)
source=Path('work/atlas_regions/build.py').read_text();exec('def flat('+source.split('def flat(')[1].split("flat('Geography / Mainland'")[0])
original=pickle.load(open('work/coast_curated/scene.pkl','rb'))
original_courts={(o['asset'],round(o['p'][0],3),round(o['p'][1],3)):o for o in original['instances'] if 'Alys court' in o['asset']}
for o in instances:
 key=(o['asset'],round(o['p'][0],3),round(o['p'][1],3))
 if key in original_courts:o['s']=original_courts[key]['s']
D=json.loads(Path('work/atlas_regions/districts.json').read_text());styles={'gables':'mediterranean','grove':'porch','hydepark':'porch','ybor':'brick','davis':'ranch','westchase':'ranch','seminole':'porch','old-ne':'porch'};lots=[];streets=[];added=0
for d in D:
 if d['id'] not in styles:continue
 style=styles[d['id']]
 for row in [-1,1]:
  path=[]
  for col in range(-3,4):
   x=d['x']+col*.56;y=d['y']+row*.36
   if not land.covers(Point(x,y)):continue
   if any(math.hypot(x-o['p'][0],y-o['p'][1])<.42 and not any(t in o['asset'].lower() for t in ['tree','palm','grass','car']) for o in instances):continue
   key='Curated / '+style+' '+str((col+row+7)%6)
   if key not in assets:continue
   e=np.ptp(np.concatenate([p[1] for p in assets[key]]),axis=0);scale=np.array([.29,.35,.38])/np.maximum(e,.01)
   instances.append(dict(asset=key,p=[x,y,.25],s=scale.tolist(),r=0 if row==1 else 180,city=d['town'],layer='spaced district home'));lots.append(box(x-.2,y-.23,x+.2,y+.23).intersection(land));added+=1
  streets.append(LineString([(d['x']-1.9,d['y']),(d['x']+1.9,d['y'])]).buffer(.055).intersection(land))
flat('Geography / New neighborhood garden lots',unary_union(lots),.14,next(i for i,(n,c) in enumerate(colors) if n=='Atlas garden lots'))
flat('Geography / New neighborhood streets',unary_union(streets),.16,next(i for i,(n,c) in enumerate(colors) if n=='Atlas main roads'))
def rgb(c):return [int(c[i:i+2],16)/255 for i in [1,3,5]]
src=Path('work/florida_atlas/build_atlas.py').read_text();exec('def export('+src.split('def export(')[1].split("geokeys=['Geography")[0])
def save(name,objs,keys):
 p=O/'assets'/(name+'.glb');export(p,objs,keys);b=p.read_bytes();(O/'assets'/(name+'.glb.gz')).write_bytes(gzip.compress(b,6));return {'raw':len(b),'gzip':(O/'assets'/(name+'.glb.gz')).stat().st_size}
report=json.loads((O/'build_report.json').read_text());report['packages']['terrain']=save('terrain',[],geokeys);cat=json.loads((O/'catalog.json').read_text());byid={t['id']:t for t in cat['towns']}
for r in cat['regions']:
 if not any(t in r['towns'] for t in ['miami','tampa','st-petersburg','30a']):continue
 centers=np.array([[byid[t]['x'],byid[t]['y']] for t in r['towns'] if t in byid]);objs=[o for o in instances if np.min(np.linalg.norm(centers-np.array(o['p'][:2]),axis=1))<45];report['packages'][r['id']]=save(r['id'],objs,[])
report['district_homes_added']=added;(O/'build_report.json').write_text(json.dumps(report,indent=2));pickle.dump(s,open('work/atlas_regions/scene.pkl','wb'));print('Added',added,'district homes')
