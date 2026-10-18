"""Check landing metadata, crop geometry and dimensions without modifying the locked builder."""
from pathlib import Path
import json,math
from PIL import Image
from pyproj import Transformer
root=Path(__file__).resolve().parents[1]
index=json.load(open(root/'landing/index.json'))
T=Transformer.from_crs('EPSG:4326','+proj=aea +lat_1=24 +lat_2=31.5 +lat_0=24 +lon_0=-84 +datum=NAD83 +units=m +no_defs',always_xy=True)
rows=[]
for town in index['towns']:
 hero=town['hero'];x,y=[v/1000 for v in T.transform(hero['lon'],hero['lat'])]
 assert math.hypot(x-town['center']['x'],y-town['center']['y'])<.001
 assert town['camera']['tiltDegrees']==town['mobile_camera']['tiltDegrees']==45
 assert town['camera']['position']==town['mobile_camera']['position']
 assert town['camera']['target']==town['mobile_camera']['target']
 assert abs(town['camera']['target'][0]-x)<1e-6 and abs(town['camera']['target'][2]+y)<1e-6
 assert len(town['callouts'])<=6
 for key,dimensions in [('desktop',(1600,1000)),('mobile',(800,1000))]:
  with Image.open(root/'landing'/town[key]) as im:assert im.size==dimensions and im.format=='WEBP'
 for point in town['callouts']:
  assert point['type'] in ['beach','boating','walkable','park','landmark']
  px,py=[v/1000 for v in T.transform(point['lon'],point['lat'])]
  # Orthographic, north-up, 45-degree ground projection; phone is central half-width.
  u=.5+(px-x)/(town['span']/2);v=.5-(py-y)/math.sqrt(2)/(town['span']/1.6)
  assert .03<=u<=.97 and .03<=v<=.97,(town['town_id'],point['name'],u,v)
 rows.append({'town_id':town['town_id'],'callouts':len(town['callouts']),'desktop_size':[1600,1000],'phone_size':[800,1000],'tilt_degrees':45,'span_km':town['span'],'checks':'passed'})
print(json.dumps({'town_count':len(rows),'callout_count':sum(r['callouts'] for r in rows),'towns':rows},indent=2))
