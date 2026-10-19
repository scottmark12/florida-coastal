import json,gzip,urllib.request,xml.etree.ElementTree as E
from pathlib import Path
p=Path('work/coastal_pipeline/v4/destin');target=p/'district-destin-east.json.gz';out={}
for i in range(4):
 west=-86.475+i*.025;b=[west,30.375,west+.025,30.42];cache=p/('east-'+str(i)+'.osm')
 if not cache.exists():cache.write_bytes(urllib.request.urlopen('https://api.openstreetmap.org/api/0.6/map?bbox='+','.join(map(str,b)),timeout=90).read())
 root=E.parse(cache).getroot();ns={n.attrib['id']:{'lon':float(n.attrib['lon']),'lat':float(n.attrib['lat'])} for n in root.findall('node')};ways={}
 for w in root.findall('way'):
  tags={t.attrib['k']:t.attrib['v'] for t in w.findall('tag')};pts=[ns[n.attrib['ref']] for n in w.findall('nd')];e={'type':'way','id':int(w.attrib['id']),'tags':tags,'geometry':pts};ways[w.attrib['id']]=e
  if tags.get('building') or tags.get('highway') or tags.get('natural') or tags.get('landuse')=='forest':out['way/'+w.attrib['id']]=e
 for rel in root.findall('relation'):
  tags={t.attrib['k']:t.attrib['v'] for t in rel.findall('tag')}
  if not tags.get('building'):continue
  members=[]
  for m in rel.findall('member'):
   if m.attrib['type']=='way' and m.attrib['ref'] in ways:members.append({'type':'way','ref':int(m.attrib['ref']),'role':m.attrib.get('role',''),'geometry':ways[m.attrib['ref']]['geometry']})
  if members:out['relation/'+rel.attrib['id']]={'type':'relation','id':int(rel.attrib['id']),'tags':tags,'members':members}
 for n in root.findall('node'):
  tags={t.attrib['k']:t.attrib['v'] for t in n.findall('tag')}
  if tags.get('natural')=='tree':out['node/'+n.attrib['id']]={'type':'node','id':int(n.attrib['id']),'tags':tags,**ns[n.attrib['id']]}
 print(i,len(out),flush=True)
target.write_bytes(gzip.compress(json.dumps({'source':'https://api.openstreetmap.org/api/0.6/map','retrieved':'2026-10-19','copyright':'© OpenStreetMap contributors, ODbL 1.0','elements':list(out.values())}).encode()))
