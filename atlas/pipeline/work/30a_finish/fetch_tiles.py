import json,subprocess,xml.etree.ElementTree as ET,time
from pathlib import Path
D=Path('work/30a_finish/source');allitems={}
def parse(path):
 root=ET.parse(path).getroot();nodes={n.get('id'):{'lon':float(n.get('lon')),'lat':float(n.get('lat'))} for n in root.findall('node')}
 for el in root:
  tags={t.get('k'):t.get('v') for t in el.findall('tag')};typ=el.tag
  if not tags:continue
  item={'type':typ,'id':int(el.get('id')),'tags':tags}
  if typ=='way':item['geometry']=[nodes[n.get('ref')] for n in el.findall('nd') if n.get('ref') in nodes]
  elif typ=='node':item.update(nodes[el.get('id')])
  else:continue
  allitems[typ+str(item['id'])]=item
for existing in ['osm-test.xml','osm-seaside.xml']:
 if (D/existing).exists():parse(D/existing)
for i in range(8):
 lon=round(-86.35+i*.05,5)
 # coastal strip shifts south eastwards
 lat=30.30 if i<6 else 30.25
 for j in range(2 if i>=5 else 1):
  south=round(lat+j*.05,5);key=f'tile-{i}-{j}';out=D/(key+'.json')
  if out.exists():
   for e in json.loads(out.read_text())['elements']:allitems[e['type']+str(e['id'])]=e
   continue
  bbox=f'{lon},{south},{lon+.05:.5f},{south+.05:.5f}';p=D/'tile.xml'
  subprocess.run(['curl','-sS','--max-time','90','https://api.openstreetmap.org/api/0.6/map?bbox='+bbox,'-o',str(p)])
  try:parse(p);out.write_text(json.dumps({'elements':list(allitems.values())},separators=(',',':')));print(key,len(allitems),flush=True)
  except Exception as e:print(key,str(e),flush=True)
  p.unlink(missing_ok=True)
  time.sleep(1)
(D/'map-data.json').write_text(json.dumps({'elements':list(allitems.values())},separators=(',',':')))
print('DONE',len(allitems),flush=True)
