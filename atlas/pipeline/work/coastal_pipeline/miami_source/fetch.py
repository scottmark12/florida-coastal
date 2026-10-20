import json, urllib.request, urllib.parse, time
from pathlib import Path
from concurrent.futures import ThreadPoolExecutor
P=Path(__file__).parent
queries={
 'coast':'way[natural=coastline](25.67,-80.33,25.86,-80.08);',
 'water':'(way[natural=water](25.70,-80.30,25.84,-80.10);relation[natural=water](25.70,-80.30,25.84,-80.10););',
 'cover':'(way[leisure=park](25.70,-80.30,25.84,-80.10);way[natural=wood](25.70,-80.30,25.84,-80.10);way[landuse=forest](25.70,-80.30,25.84,-80.10););',
 'places':'node[place](25.70,-80.30,25.84,-80.10);',
 'roads':'way[highway][highway!~"service|track|steps"](25.71,-80.285,25.82,-80.115);',
}
for i in range(4):
 for k in range(3):
  s=25.71+k*.037;n=min(25.82,s+.037);w=-80.285+i*.043;e=min(-80.115,w+.043)
  queries[f'buildings-{i}-{k}']=f'(way[building]({s},{w},{n},{e});relation[building]({s},{w},{n},{e}););'
def fetch(item):
 name,q=item;p=P/(name+'.json')
 if p.exists():return
 for endpoint in ['https://overpass.private.coffee/api/interpreter','https://overpass-api.de/api/interpreter']:
  try:
   req=urllib.request.Request(endpoint,data=urllib.parse.urlencode({'data':'[out:json][timeout:60];'+q+'out geom;'}).encode(),headers={'User-Agent':'FloridaCoastalAtlas/1.0 research'})
   data=urllib.request.urlopen(req,timeout=80).read();j=json.loads(data)
   if j.get('remark'):raise ValueError(j['remark'])
   p.write_bytes(data);print(name,len(j['elements']),flush=True);return
  except Exception as e:print(name,str(e),flush=True)
with ThreadPoolExecutor(max_workers=2) as pool:list(pool.map(fetch,queries.items()))
