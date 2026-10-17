import sys,pickle,json,math,struct,gzip
from pathlib import Path
import numpy as np
sys.path.insert(0,'work/florida_atlas/python_pkgs')
import shapely
from shapely.geometry import shape,Point,box,LineString,Polygon
from shapely.ops import unary_union,transform
from pyproj import Transformer
s=pickle.load(open('work/atlas_regions/scene.pkl','rb'));assets=s['assets'];colors=s['colors'];geokeys=s['geokeys'];geo=json.loads(Path('work/coast_geography/geography.json').read_text());land=shape(geo['land']).simplify(.2,preserve_topology=True)
tr=Transformer.from_crs(4326,geo['projection'],always_xy=True)
def pr(x,y,z=None):
 a,b=tr.transform(x,y);return np.asarray(a)/1000,np.asarray(b)/1000
source=Path('work/atlas_regions/build.py').read_text();exec('def flat('+source.split('def flat(')[1].split("flat('Geography / Mainland'")[0])
cover={};count=0
for ft in json.loads(Path('work/atlas_regions/statecover.json').read_text())['features']:
 desc=ft['properties']['NAME_STATE'].lower();kind='marsh' if any(w in desc for w in ['marsh','swamp','mangrove','wetland','cypress','hydric']) else 'fields' if any(w in desc for w in ['crop','agricultur','pasture','plantation','grove']) else 'woodland' if any(w in desc for w in ['forest','pine','scrub','hammock','sandhill','flatwood','prairie','shrub']) else None
 if not kind:continue
 g=transform(pr,shape(ft['geometry'])).buffer(0).simplify(.22,preserve_topology=True)
 if not g.is_empty:cover.setdefault(kind,[]).append(g);count+=1
for k,ps in cover.items():
 m=next(i for i,(n,c) in enumerate(colors) if n=='Atlas '+k);g=unary_union(ps);flat('Geography / Statewide '+k,g,.035,m);print(k,len(ps),flush=True)
pickle.dump(s,open('work/atlas_regions/scene.pkl','wb'));print('Statewide polygons',count)
