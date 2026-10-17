import json,urllib.request,urllib.parse,gzip,time
from pathlib import Path
P=Path('work/coastal_pipeline/v4/st-pete-clearwater');P.mkdir(exist_ok=True)
b='27.62,-82.85,28.06,-82.52'
queries={
'geography':f'[out:json][timeout:180];(way[natural=coastline]({b});nwr[natural=water]({b});node[place]({b}););out geom;',
'cover':f'[out:json][timeout:180];(nwr[leisure~"^(park|garden|golf_course)$"]({b});nwr[landuse=forest]({b});nwr[natural~"^(wood|wetland)$"]({b}););out geom;'}
ds=[d for d in json.load(open('outputs/florida_coastal_atlas/regions/districts.json')) if d['town']=='st-petersburg']
for d in ds:queries['district-'+d['id']]=f'[out:json][timeout:120];(way[building](around:1600,{d["lat"]},{d["lon"]});relation[building](around:1600,{d["lat"]},{d["lon"]});way[highway](around:1800,{d["lat"]},{d["lon"]}););out geom;'
for name,q in queries.items():
 p=P/(name+'.json.gz')
 if p.exists():continue
 for host in ['https://overpass-api.de/api/interpreter','https://overpass.kumi.systems/api/interpreter','https://overpass.private.coffee/api/interpreter']:
  try:
   req=urllib.request.Request(host,data=urllib.parse.urlencode({'data':q}).encode(),headers={'User-Agent':'FloridaCoastalAtlas/1.0'})
   data=urllib.request.urlopen(req,timeout=200).read();j=json.loads(data)
   if j.get('remark'):raise RuntimeError(j['remark'])
   if not j.get('elements'):raise RuntimeError('Empty OSM response')
   p.write_bytes(gzip.compress(data));print(name,len(j['elements']),flush=True);break
  except Exception as e:print(name,host,str(e),flush=True)
 else:
  (P/'fetch-failure.json').write_text(json.dumps({'query':name,'status':'failed on both OSM endpoints'}));raise SystemExit(1)
