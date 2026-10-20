"""Small attributed OSM source patch for the real Kennedy Space Center VAB.
Run before normalizing Space Coast. Raw response is excluded from Git.
"""
from pathlib import Path
import urllib.request,json,gzip,xml.etree.ElementTree as E
P=Path(__file__).resolve().parent;r=P/'work/coastal_pipeline/v4/space-coast';path=r/'landmarks-titusville.json.gz';bounds=[-80.660,28.579,-80.642,28.594];url='https://api.openstreetmap.org/api/0.6/map?bbox='+','.join(map(str,bounds))
if not path.exists():
 xml=E.fromstring(urllib.request.urlopen(urllib.request.Request(url,headers={'User-Agent':'FloridaCoastalAtlas/1.0'}),timeout=60).read());nodes={n.attrib['id']:{'lon':float(n.attrib['lon']),'lat':float(n.attrib['lat'])} for n in xml.findall('node')};ways={w.attrib['id']:w for w in xml.findall('way')};elements=[]
 for w in ways.values():
  tags={q.attrib['k']:q.attrib['v'] for q in w.findall('tag')}
  if tags.get('building') or tags.get('highway'):elements.append({'type':'way','id':int(w.attrib['id']),'tags':tags,'geometry':[nodes[q.attrib['ref']] for q in w.findall('nd') if q.attrib['ref'] in nodes]})
 for rel in xml.findall('relation'):
  tags={q.attrib['k']:q.attrib['v'] for q in rel.findall('tag')}
  if tags.get('building'):
   elements.append({'type':'relation','id':int(rel.attrib['id']),'tags':tags,'members':[{'type':q.attrib['type'],'ref':int(q.attrib['ref']),'role':q.attrib.get('role',''),'geometry':[nodes[z.attrib['ref']] for z in ways[q.attrib['ref']].findall('nd') if z.attrib['ref'] in nodes]} for q in rel.findall('member') if q.attrib['type']=='way' and q.attrib['ref'] in ways]})
 path.write_bytes(gzip.compress(json.dumps({'elements':elements,'source':url,'copyright':'© OpenStreetMap contributors · ODbL 1.0','retrieved':'2026-10-20'},separators=(',',':')).encode()))
(r/'landmark-sources.json').write_text(json.dumps({'source':url,'bounds':bounds,'retrieved':'2026-10-20','license':'ODbL 1.0','scope':'VAB building footprints and local access roads; no satellite imagery.'},indent=2)+'\n')
print([(e['type'],e['id'],e.get('tags',{}).get('name'),e.get('tags',{}).get('height')) for e in json.load(gzip.open(path,'rt'))['elements'] if 'assembly' in e.get('tags',{}).get('name','').lower()])
