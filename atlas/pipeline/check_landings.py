"""Validate both hero cameras, all four files, and frame-specific callout visibility."""
from pathlib import Path
import json,math
from PIL import Image
from pyproj import Transformer
A=Path(__file__).resolve().parents[1];index=json.load(open(A/'landing/index.json'));rows=[]
T=Transformer.from_crs('EPSG:4326','+proj=aea +lat_1=24 +lat_2=31.5 +lat_0=24 +lon_0=-84 +datum=NAD83 +units=m +no_defs',always_xy=True)
for t in index['towns']:
 x,y=[v/1000 for v in T.transform(t['hero']['lon'],t['hero']['lat'])]
 assert math.hypot(x-t['center']['x'],y-t['center']['y'])<.001
 for level,v in t['views'].items():
  c=v['camera'];m=v['mobile_camera'];assert c['tiltDegrees']==m['tiltDegrees']==45
  assert abs(c['right']-c['left']-v['span'])<1e-7
  assert abs(m['right']-m['left']-v['span']/2)<1e-7
  assert c['position']==m['position'] and c['target']==m['target']
  assert abs(c['target'][0]-x)<1e-6 and abs(c['target'][2]+y)<1e-6
  for frame,cam,size in [('desktop',c,(1600,1000)),('mobile',m,(800,1000))]:
   with Image.open(A/'landing'/v[frame]) as im:assert im.size==size and im.format=='WEBP'
   for q in v['callouts'] if frame=='desktop' else v['mobile_callouts']:
    assert q['type'] in ['beach','boating','walkable','park','landmark']
    px,py=[v/1000 for v in T.transform(q['lon'],q['lat'])];u=.5+(px-x)/(cam['right']-cam['left']);vv=.5-(py-y)/math.sqrt(2)/(cam['top']-cam['bottom'])
    assert .03<=u<=.97 and .03<=vv<=.97,(t['town_id'],level,frame,q['name'],u,vv)
  rows.append({'town_id':t['town_id'],'view':level,'span_km':v['span'],'callouts':len(v['callouts']),'checks':'passed'})
result={'town_count':len(index['towns']),'view_count':len(rows),'image_count':len(rows)*2,'towns':rows};(A/'landing/validation.json').write_text(json.dumps(result,indent=2)+'\n');print(json.dumps({k:v for k,v in result.items() if k!='towns'}))
