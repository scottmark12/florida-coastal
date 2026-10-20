"""Render mapped fishing/observation piers without putting boats on them.
Uses the existing dock data schema and renderer; no shared implementation changes.
"""
from pathlib import Path
import json,gzip,xml.etree.ElementTree as E,sys
sys.path.insert(0,str(Path(__file__).resolve().parent/'work/30a_finish'))
from geometry import T
P=Path(__file__).resolve().parent;A=P.parent;registry=json.load(open(A/'regions/package-registry.json'))
for row in json.load(open(P/'coast-additions.json')):
 tid=row[0]
 if tid not in registry:continue
 d=P/'work/coastal_pipeline/v4'/tid;m=json.load(open(d/'manifest.json'));b=m['bounds'];source=P/'work/coastal_pipeline/downloads/marinas'/(tid+'.osm');root=E.parse(source).getroot();nodes={e.get('id'):(float(e.get('lon')),float(e.get('lat'))) for e in root.findall('node')};data=json.load(open(d/'boats.json')) if (d/'boats.json').exists() else {'version':1,'description':'Source-positioned piers; no invented boat occupancy.','boats':[],'docks':[],'dock_sources':[],'placement_sources':[],'towns':[tid],'source':'© OpenStreetMap contributors · ODbL 1.0'};added=0
 for w in root.findall('way'):
  tags={e.get('k'):e.get('v') for e in w.findall('tag')};url='https://www.openstreetmap.org/way/'+w.get('id');pts=[nodes[e.get('ref')] for e in w.findall('nd')]
  if tags.get('man_made')!='pier' or url in data.get('dock_sources',[]) or len(pts)<2 or not any(b[0]<=x<=b[2] and b[1]<=y<=b[3] for x,y in pts):continue
  coords=[[v/1000 for v in T.transform(x,y)] for x,y in pts];data['docks'].append({'closed':pts[0]==pts[-1],'points':coords,'source':url,'name':tags.get('name','Mapped pier')});data.setdefault('dock_sources',[]).append(url);added+=1
 data['pier_notes']='Fishing and observation piers use actual OSM outlines/centerlines and the existing tan dock renderer; open-line width is illustrative. No vessel occupancy inferred on fishing piers.'
 (d/'boats.json').write_text(json.dumps(data,separators=(',',':')))
 for dest in [A/'regions/packages'/tid,P/'outputs/coastal_pipeline_v4'/tid]:
  if not dest.exists():continue
  (dest/'boats.json').write_bytes((d/'boats.json').read_bytes());(dest/'boats.json.gz').write_bytes(gzip.compress((d/'boats.json').read_bytes(),mtime=0));s=json.load(open(dest/'scene.json'));s['boats']='boats.json.gz';(dest/'scene.json').write_text(json.dumps(s,separators=(',',':')))
 print(tid,'added piers',added,flush=True)
