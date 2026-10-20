"""Constrain marina acquisition windows to each new package's validated land extent.
Complete ways are retained only when all source vertices are inside that extent.
This avoids testing vessels against unknown land outside a package's source window.
"""
from pathlib import Path
import json,xml.etree.ElementTree as E,copy
P=Path(__file__).resolve().parent;root=P/'work/coastal_pipeline/downloads/marinas';index=json.load(open(root/'index.json'));spec={r[0] for r in json.load(open(P/'coast-additions.json'))};out=[]
for entry in index:
 tid=entry['town']
 if tid not in spec:continue
 m=json.load(open(P/'work/coastal_pipeline/v4'/tid/'manifest.json'));b=m['bounds'];src=E.parse(entry['path']).getroot();nodes={n.get('id'):n for n in src.findall('node')};dst=E.Element('osm',version='0.6');used=set();ways=[]
 for w in src.findall('way'):
  refs=[n.get('ref') for n in w.findall('nd')]
  if not refs or not all(b[0]<=float(nodes[n].get('lon'))<=b[2] and b[1]<=float(nodes[n].get('lat'))<=b[3] for n in refs):continue
  used.update(refs);ways.append(w)
 for n in sorted(used):dst.append(copy.deepcopy(nodes[n]))
 for w in ways:dst.append(copy.deepcopy(w))
 p=root/(tid+'-framed.osm');E.ElementTree(dst).write(p,encoding='utf-8',xml_declaration=True);out.append({**entry,'path':str(p),'bounds':b,'sourceWindowNote':'Complete OSM pier/marina ways inside the validated package land window.'})
(root/'coast-additions-index.json').write_text(json.dumps(out,indent=2)+'\n');print('Filtered',len(out),'marina source windows')
