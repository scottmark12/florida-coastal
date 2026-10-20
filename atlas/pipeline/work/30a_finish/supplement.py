import json,xml.etree.ElementTree as E
from pathlib import Path
D=Path('work/30a_finish/source');m=json.loads((D/'map-data.json').read_text());items={e['type']+str(e['id']):e for e in m['elements']};w=json.loads((D/'water-small.json').read_text());waters={e['type']+str(e['id']):e for e in w['elements']}
for f in ['fuller.xml','dune-allen.xml']:
 root=E.parse(D/f).getroot();nodes={n.get('id'):{'lon':float(n.get('lon')),'lat':float(n.get('lat'))} for n in root.findall('node')}
 for el in root:
  tags={t.get('k'):t.get('v') for t in el.findall('tag')};typ=el.tag
  if not tags or typ not in ['node','way']:continue
  e={'type':typ,'id':int(el.get('id')),'tags':tags}
  if typ=='node':e.update(nodes[el.get('id')])
  else:e['geometry']=[nodes[n.get('ref')] for n in el.findall('nd') if n.get('ref') in nodes]
  items[typ+str(e['id'])]=e
  if tags.get('natural')=='water':waters[typ+str(e['id'])]=e
(D/'map-data.json').write_text(json.dumps({'elements':list(items.values())},separators=(',',':')))
(D/'water-small.json').write_text(json.dumps({'elements':list(waters.values())},separators=(',',':')))
