"""Use actual OSM pier outlines with the existing dock renderer; no inferred boats."""
from pathlib import Path
import json,gzip,sys,shutil
P=Path(__file__).resolve().parent;A=P.parent;root=P/'work/coastal_pipeline/v4/palm-beaches';sys.path.insert(0,str(P/'work/30a_finish'));from geometry import T
for raw in root.glob('landmarks-*.json.gz'):
 tid=raw.name.removeprefix('landmarks-').removesuffix('.json.gz');data={'version':1,'description':'Mapped fishing and observation piers; no inferred boat occupancy.','boats':[],'docks':[],'dock_sources':[],'placement_sources':[],'towns':[tid],'source':'© OpenStreetMap contributors · ODbL 1.0'}
 for e in json.load(gzip.open(raw,'rt'))['elements']:
  if e['type']!='way' or e.get('tags',{}).get('man_made')!='pier' or len(e.get('geometry',[]))<2:continue
  pts=[[v/1000 for v in T.transform(p['lon'],p['lat'])] for p in e['geometry']];url='https://www.openstreetmap.org/way/'+str(e['id']);data['docks'].append({'closed':pts[0]==pts[-1],'points':pts,'source':url,'name':e.get('tags',{}).get('name','Mapped pier')});data['dock_sources'].append(url)
 source=root/tid/'boats.json';source.parent.mkdir(exist_ok=True);source.write_text(json.dumps(data,separators=(',',':')))
 for dest in [P/'outputs/coastal_pipeline_v4/palm-beaches'/tid,A/'regions/packages/palm-beaches'/tid]:
  if not (dest/'scene.json').exists():continue
  shutil.copy2(source,dest/'boats.json');(dest/'boats.json.gz').write_bytes(gzip.compress(source.read_bytes(),mtime=0));meta=json.load(open(dest/'scene.json'));meta['boats']='boats.json.gz';(dest/'scene.json').write_text(json.dumps(meta,separators=(',',':')));assert sum((dest/f).stat().st_size for f in ['base.glb.gz','region.glb.gz','scene.json','shore-wash.png','shore-wash.json','boats.json.gz'])<4000000
 print(tid,'mapped piers',len(data['docks']))
