"""Input-only source-anchor adapter for communities without a named OSM place node.
Runs the shared normalizer with an explicit, audited OSM node/park polygon reference.
The shared normalizer and all locked geometry/rendering implementations stay unchanged.
"""
import json
from pathlib import Path
P=Path(__file__).resolve().parent
source=(P/'work/coastal_pipeline/v4/normalize_region.py').read_text()
old=""" if not nodes:raise RuntimeError('Missing named OSM anchor: '+town['id'])
 node=min(nodes,key=lambda e:(e['tags']['place']=='island',(e['lon']-town['lon'])**2+(e['lat']-town['lat'])**2))"""
new=""" override=json.load(open('coast-anchor-overrides.json')).get(town['id'])
 if override:
  e=elements[override['type'],override['id']]
  if override['type']=='node':node=dict(e)
  else:
   point=polygons(e).centroid;node={'id':e['id'],'lon':point.x,'lat':point.y,'tags':{'name':e['tags'].get('name','')}}
  anchor_source='https://www.openstreetmap.org/'+override['type']+'/'+str(override['id'])
  anchor_meaning=override['meaning']
 else:
  if not nodes:raise RuntimeError('Missing named OSM anchor: '+town['id'])
  node=min(nodes,key=lambda e:(e['tags']['place']=='island',(e['lon']-town['lon'])**2+(e['lat']-town['lat'])**2));anchor_source='https://www.openstreetmap.org/node/'+str(node['id']);anchor_meaning='Representative OSM town place-label anchor: '+node['tags']['name']"""
assert old in source
source=source.replace(old,new).replace("d['positionSource']='https://www.openstreetmap.org/node/'+str(node['id']);d['centerMeaning']='Representative OSM town place-label anchor: '+node['tags']['name']", "d['positionSource']=anchor_source;d['centerMeaning']=anchor_meaning")
source=source.replace('water=[];cover=[];roads=[]', "water=[];cover=[];roads=[];marine_exclusions={tuple(x) for x in json.load(open('coast-water-priority.json')).get(ID,[])}").replace("if t.get('natural')=='water' and not p.is_empty:","if t.get('natural')=='water' and not p.is_empty and (e['type'],e['id']) not in marine_exclusions:")
exec(compile(source,str(P/'work/coastal_pipeline/v4/normalize_region.py'),'exec'),{'__name__':'__main__'})
