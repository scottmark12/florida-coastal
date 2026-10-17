import urllib.request,urllib.parse,json,time
from pathlib import Path
q='''[out:json][timeout:180];(nwr["place"]["name"~"^(Mid-Beach|Mid Beach|Key Biscayne)$"](25.65,-80.19,25.87,-80.10);way["natural"="coastline"](25.66,-80.20,25.88,-80.10);nwr["natural"="beach"](25.66,-80.20,25.88,-80.10);way["building"](25.68,-80.18,25.705,-80.15);way["building"](25.815,-80.15,25.85,-80.115);way["highway"](25.68,-80.18,25.705,-80.15);way["highway"](25.815,-80.15,25.85,-80.115););out geom;'''
p=Path('work/coastal_pipeline/v3/miami/extension.json')
for host in ['https://overpass-api.de/api/interpreter','https://overpass.kumi.systems/api/interpreter']:
 try:
  req=urllib.request.Request(host,data=urllib.parse.urlencode({'data':q}).encode(),headers={'User-Agent':'FloridaCoastalMap/1.0'})
  data=urllib.request.urlopen(req,timeout=220).read();j=json.loads(data);assert j.get('elements');p.write_bytes(data);print('saved',len(j['elements']));break
 except Exception as e:print(e,flush=True)
