"""Validate fixed spans, shared target, all four frames and sourced callouts.
Named unincorporated localities use the reviewed OSM place/public-feature evidence
in hero_verification, not an invented municipal polygon. Water shortfalls remain
explicit island QA flags under the user's fixed-zoom-first exception.
"""
from pathlib import Path
import json,math
from PIL import Image
from pyproj import Transformer
A=Path(__file__).resolve().parents[1];index=json.load(open(A/'landing/index.json'));rows=[]
BIG={'miami','tampa','jacksonville','st-petersburg','ftl','west-palm-beach','fort-myers','orlando'}
T=Transformer.from_crs('EPSG:4326','+proj=aea +lat_1=24 +lat_2=31.5 +lat_0=24 +lon_0=-84 +datum=NAD83 +units=m +no_defs',always_xy=True)
assert len(index['towns'])==167
for t in index['towns']:
 tid=t['town_id'];hx,hy=[v/1000 for v in T.transform(t['hero']['lon'],t['hero']['lat'])]
 x,y=t['center']['x'],t['center']['y'];qa=t['qa'];expected=7. if tid in BIG else 5.
 assert qa['town_span_km']==t['span']==expected
 assert qa['close_span_km']==t['close_span']==2.
 assert qa['zoom_ratio']==expected/2
 assert qa['hero_in_limits'] is True and t['hero_verification']['public_source'],tid
 assert not [f for f in qa['flags'] if 'land_shortfall' not in f],(tid,qa['flags'])
 if qa['flags']:assert t['frame_class']=='narrow_island',tid
 assert t['views']['town']['camera']['target']==t['views']['street']['camera']['target'],tid
 for level,v in t['views'].items():
  c=v['camera'];m=v['mobile_camera'];assert v['capture_verified']
  assert c['tiltDegrees']==m['tiltDegrees']==45
  assert abs(c['right']-c['left']-v['span'])<1e-7
  assert abs(m['right']-m['left']-v['span']/2)<1e-7
  assert c['position']==m['position'] and c['target']==m['target']
  assert abs(c['target'][0]-x)<1e-6 and abs(c['target'][2]+y)<1e-6
  assert abs((c['position'][1])-(c['position'][2]-c['target'][2]))<1e-7
  for frame,cam,size in [('desktop',c,(1600,1000)),('mobile',m,(800,1000))]:
   with Image.open(A/'landing'/v[frame]) as im:assert im.size==size and im.format=='WEBP'
   width=cam['right']-cam['left'];ground_height=(cam['top']-cam['bottom'])*math.sqrt(2)
   u=.5+(hx-x)/width;vv=.5-(hy-y)/ground_height
   allowance=.3 if t['frame_class']=='narrow_island' else .2
   assert .5-allowance-1e-7<=u<=.5+allowance+1e-7 and .5-allowance-1e-7<=vv<=.5+allowance+1e-7,(tid,level,frame,'hero',u,vv)
   calls=v['callouts'] if frame=='desktop' else v['mobile_callouts']
   assert (2<=len(calls)<=4 if level=='town' else 1<=len(calls)<=3),(tid,level,frame,'count')
   for q in calls:
    assert q['type'] in ['beach','boating','walkable','park','landmark']
    assert q['source'].startswith('https://www.openstreetmap.org/'),(tid,q)
    px,py=[v/1000 for v in T.transform(q['lon'],q['lat'])];u=.5+(px-x)/width;vv=.5-(py-y)/ground_height
    vertical_margin=.08*size[0]/size[1]
    assert .08-1e-7<=u<=.92+1e-7 and vertical_margin-1e-7<=vv<=1-vertical_margin+1e-7,(tid,level,frame,q['name'],u,vv)
  rows.append({'town_id':tid,'view':level,'span_km':v['span'],'callouts':len(v['callouts']),'checks':'passed','flags':qa['flags']})
result={'town_count':len(index['towns']),'view_count':len(rows),'image_count':len(rows)*2,'width_exceptions':[],'flagged_towns':[t['town_id'] for t in index['towns'] if t['qa']['flags']],'towns':rows};(A/'landing/validation.json').write_text(json.dumps(result,indent=2)+'\n');print(json.dumps({k:v for k,v in result.items() if k!='towns'}))
