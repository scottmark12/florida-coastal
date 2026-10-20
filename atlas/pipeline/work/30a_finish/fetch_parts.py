import json,subprocess,time
from pathlib import Path
D=Path('work/30a_finish/source')
queries={
'coast':'way["natural"="coastline"](30.15,-86.65,30.65,-85.7);',
'water':'nwr["natural"="water"](30.15,-86.65,30.65,-85.7);',
'ground':'(nwr["name"~"Point Washington|Timpoochee|30A",i](30.25,-86.35,30.5,-85.9);nwr["place"](30.25,-86.35,30.5,-85.9);nwr["leisure"="marina"](30.25,-86.4,30.6,-85.9);nwr["leisure"="slipway"](30.25,-86.4,30.6,-85.9););',
'roads':'way["highway"](30.25,-86.3,30.4,-85.95);',
'buildings':'way["building"](30.25,-86.3,30.4,-85.95);',
'forest':'(way["natural"="wood"](30.25,-86.3,30.45,-85.95);relation["landuse"="forest"](30.25,-86.3,30.45,-85.95);way["landuse"="forest"](30.25,-86.3,30.45,-85.95););'}
for name,q in queries.items():
 p=D/(name+'.json')
 if p.exists():
  try:assert 'elements' in json.loads(p.read_text());continue
  except:pass
 q='[out:json][timeout:25];'+q+'out geom;'
 r=subprocess.run(['curl','-sS','--max-time','150','https://overpass.private.coffee/api/interpreter','--data-urlencode','data='+q,'-o',str(p)],capture_output=True)
 try:
  d=json.loads(p.read_text());print(name,len(d['elements']),d.get('remark',''),flush=True)
 except: print(name,'FAILED',p.read_text()[:80],flush=True)
 time.sleep(2)
