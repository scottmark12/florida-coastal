"""Extract complete mapped marina/dock outlines near selected towns from local OSM PBF."""
import sys,json,xml.etree.ElementTree as E
from pathlib import Path
import osmium
P=Path(__file__).resolve().parent;A=P.parent;catalog=json.load(open(A/'regions/catalog.json'))['towns'];ids=sys.argv[2].split(',');towns=[t for t in catalog if t['id'] in ids];root=P/'work/coastal_pipeline/downloads/marinas';root.mkdir(parents=True,exist_ok=True);out={t['id']:E.Element('osm',version='0.6') for t in towns};seen={t['id']:set() for t in towns}
class Extract(osmium.SimpleHandler):
 def way(self,w):
  tags=dict(w.tags)
  if tags.get('man_made')!='pier' and tags.get('leisure')!='marina':return
  pts=[(n.ref,n.location.lon,n.location.lat) for n in w.nodes if n.location.valid()]
  if len(pts)<2:return
  for t in towns:
   if not any(abs(x-t['lon'])<.13 and abs(y-t['lat'])<.08 for _,x,y in pts):continue
   r=out[t['id']]
   for n,x,y in pts:
    if n not in seen[t['id']]:E.SubElement(r,'node',id=str(n),lon=str(x),lat=str(y));seen[t['id']].add(n)
   way=E.SubElement(r,'way',id=str(w.id))
   for n,x,y in pts:E.SubElement(way,'nd',ref=str(n))
   for k,v in tags.items():E.SubElement(way,'tag',k=k,v=v)
Extract().apply_file(sys.argv[1],locations=True,idx='flex_mem')
index=[]
for t in towns:
 p=root/(t['id']+'.osm');E.ElementTree(out[t['id']]).write(p,encoding='utf-8',xml_declaration=True);index.append({'town':t['id'],'path':str(p),'source':'Geofabrik Florida 2026-10-17 OSM snapshot','bounds':[t['lon']-.13,t['lat']-.08,t['lon']+.13,t['lat']+.08]})
(root/'index.json').write_text(json.dumps(index,indent=2));print(root/'index.json')
