"""Publish truthful provenance for supplemental footprint inputs, after locked export."""
import json,shutil
from pathlib import Path

def annotate(manifest,targets):
 sources=manifest.get('inputs',{}).get('supplementalBuildingSources',[])
 if not sources:return
 P=Path(__file__).resolve().parent;source_dir=P/'work/coastal_pipeline/v4'/manifest['id']
 for target in targets:
  if not target.exists():continue
  shutil.copy2(source_dir/'building-sources.json',target/'building-sources.json')
  f=target/'inventory.json';j=json.load(open(f));rows=j if isinstance(j,list) else j.get('buildings',[])
  for row in rows:
   if row['id']<0:row.update(source_type='imagery-derived footprint',source='Microsoft Global ML Building Footprints',source_url=sources[0]['download'],id_namespace='local-supplemental',osm_type=None)
  f.write_text(json.dumps(j,separators=(',',':')))
  f=target/'scene.json';j=json.load(open(f));j['attribution']='© OpenStreetMap contributors · ODbL; supplemental buildings: Microsoft Global ML Building Footprints · CDLA Permissive 2.0';j['buildingSources']=sources;j['canopyAttribution']=j.get('canopyAttribution','').split(' · Buildings: Microsoft')[0]+' · Buildings: Microsoft (CDLA Permissive 2.0)';f.write_text(json.dumps(j,separators=(',',':')))
  f=target/'report.json';j=json.load(open(f));j['building_sources']=sources;j['notes'].append('Supplemental negative IDs denote imagery-derived Microsoft footprints, not OpenStreetMap objects.');j['notes']=list(dict.fromkeys(j['notes']));f.write_text(json.dumps(j,indent=2)+'\n')
  f=target/'atlas-review.html';s=f.read_text().split('<p>Buildings include imagery-derived Microsoft')[0];s+='<p>Buildings include imagery-derived Microsoft Global ML Building Footprints (CDLA Permissive 2.0). Negative local IDs are not OSM IDs. <a href="building-sources.json">Footprint provenance</a>. The OSM overlay validates coast and district anchors, not the supplemental roofs.</p>';f.write_text(s)
if __name__=='__main__':
 import sys
 P=Path(__file__).resolve().parent;m=json.load(open(P/'work/coastal_pipeline/v4'/sys.argv[1]/'manifest.json'));annotate(m,[P/'outputs/coastal_pipeline_v4'/m['id'],P.parent/'regions/packages'/m['id']])
