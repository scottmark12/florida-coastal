import urllib.request,urllib.parse,json
from pathlib import Path
q='''[out:json][timeout:180];(way["natural"="coastline"](30.15,-86.65,30.65,-85.7);nwr["natural"="water"](30.15,-86.65,30.65,-85.7);nwr["waterway"="riverbank"](30.15,-86.65,30.65,-85.7);nwr["name"~"Point Washington|Timpoochee|Choctawhatchee|30A",i](30.15,-86.65,30.65,-85.7);nwr["place"](30.15,-86.65,30.65,-85.7);nwr["leisure"="marina"](30.15,-86.65,30.65,-85.7);nwr["leisure"="slipway"](30.15,-86.65,30.65,-85.7);nwr["highway"="cycleway"](30.25,-86.3,30.4,-85.95););out body geom;'''
for base in ['https://overpass.private.coffee/api/interpreter']:
 try:
  req=urllib.request.Request(base,data=urllib.parse.urlencode({'data':q}).encode(),headers={'User-Agent':'FloridaCoastalAtlasLocalReview/1.0'})
  data=urllib.request.urlopen(req,timeout=210).read();d=json.loads(data);assert 'elements' in d;Path('work/30a_finish/source/osm-geography.json').write_bytes(data);print(len(d['elements']),d.get('remark',''));break
 except Exception as e:print(str(e),flush=True)
