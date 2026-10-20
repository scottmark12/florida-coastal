import subprocess,json,xml.etree.ElementTree as E
from pathlib import Path
D=Path('work/30a_finish/source');data=json.loads((D/'map-data.json').read_text());items={e['type']+str(e['id']):e for e in data['elements']}
for lon,lat in [(-86.15,30.30),(-86.125,30.30),(-86.15,30.325),(-86.125,30.325),(-86,30.25),(-85.975,30.25),(-86,30.275),(-85.975,30.275)]:
 p=D/'part.xml';url=f'https://api.openstreetmap.org/api/0.6/map?bbox={lon},{lat},{lon+.025:.5f},{lat+.025:.5f}'
 subprocess.run(['curl','-sS','--max-time','50',url,'-o',str(p)])
 try:
  root=E.parse(p).getroot();nodes={n.get('id'):{'lon':float(n.get('lon')),'lat':float(n.get('lat'))} for n in root.findall('node')}
  for el in root:
   tags={t.get('k'):t.get('v') for t in el.findall('tag')};typ=el.tag
   if not tags or typ not in ['node','way']:continue
   item={'type':typ,'id':int(el.get('id')),'tags':tags}
   if typ=='node':item.update(nodes[el.get('id')])
   else:item['geometry']=[nodes[n.get('ref')] for n in el.findall('nd') if n.get('ref') in nodes]
   items[typ+str(item['id'])]=item
  print(lon,lat,len(items),flush=True)
 except Exception as e:print(e,flush=True)
 p.unlink(missing_ok=True)
(D/'map-data.json').write_text(json.dumps({'elements':list(items.values())},separators=(',',':')))
