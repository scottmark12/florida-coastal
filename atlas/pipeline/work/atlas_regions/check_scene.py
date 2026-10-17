import sys,pickle,json,math
from pathlib import Path
import numpy as np
sys.path.insert(0,'work/florida_atlas/python_pkgs')
from shapely.geometry import shape,Point
s=pickle.load(open('work/atlas_regions/scene.pkl','rb'));land=shape(json.load(open('work/coast_geography/geography.json'))['land']);bad=[];ratios=[]
excluded=['tree','palm','pine','mangrove','grass','boat','sail','trawler','bridge','pier','dock','bench','car','umbrella','kayak','stadium','ferris','wheel','bandstand']
for o in s['instances']:
 if any(w in o['asset'].lower() for w in excluded) or o['city']=='landscape':continue
 e=np.ptp(np.concatenate([a[1] for a in s['assets'][o['asset']]]),axis=0)*o['s'];ratios.append(e[2]/max(.0001,min(e[:2])))
 if o['city'] in ['miami','tampa'] and o['asset'].startswith(('Composed / Urban','Composed / Miami')) and not land.covers(Point(o['p'][:2])):bad.append((o['city'],o['asset'],o['p']))
print('max building height-width',max(ratios));print('core buildings on water',len(bad));print(bad[:6]);assert max(ratios)<=3.0001
Path('outputs/florida_coastal_regions/scale_checks.json').write_text(json.dumps({'maximum_building_height_width_ratio':max(ratios),'core_buildings_on_water':len(bad)},indent=2))
