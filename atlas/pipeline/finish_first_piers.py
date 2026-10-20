"""Append sourced public fishing/sightseeing pier decks without moored boats."""
from pathlib import Path
import json,gzip,sys,shutil,xml.etree.ElementTree as E
P=Path(__file__).resolve().parent;A=P.parent;r=P/'work/coastal_pipeline/v4/first-coast';sys.path.insert(0,str(P/'work/30a_finish'));from geometry import T
for tid,ids in [('jaxbeach',[444563951]),('vilano-beach',[351712855]),('st-augustine-beach',[925211556])]:
 path=r/tid/'boats.json';data=json.load(open(path)) if path.exists() else {'version':1,'description':'Mapped public pier decks; no inferred boat occupancy at these piers.','boats':[],'docks':[],'dock_sources':[],'placement_sources':[],'towns':[tid],'source':'© OpenStreetMap contributors · ODbL 1.0'}
 xml=E.parse(P/'work/coastal_pipeline/downloads/marinas'/f'{tid}.osm').getroot();nodes={n.attrib['id']:(float(n.attrib['lon']),float(n.attrib['lat'])) for n in xml.findall('node')}
 for wid in ids:
  way=xml.find(f"way[@id='{wid}']");url='https://www.openstreetmap.org/way/'+str(wid)
  if way is None or url in data['dock_sources']:continue
  pts=[[v/1000 for v in T.transform(*nodes[n.attrib['ref']])] for n in way.findall('nd')];data['docks'].append({'closed':pts[0]==pts[-1],'points':pts,'source':url,'name':next((t.attrib['v'] for t in way.findall('tag') if t.attrib['k']=='name'),'Mapped public pier')});data['dock_sources'].append(url)
 path.write_text(json.dumps(data,separators=(',',':')))
 for dest in [A/'regions/packages/first-coast'/tid,P/'outputs/coastal_pipeline_v4/first-coast'/tid]:
  shutil.copy2(path,dest/'boats.json');(dest/'boats.json.gz').write_bytes(gzip.compress(path.read_bytes(),mtime=0));s=json.load(open(dest/'scene.json'));s['boats']='boats.json.gz';(dest/'scene.json').write_text(json.dumps(s,separators=(',',':')))
 print(tid,'public pier decks included',ids)
