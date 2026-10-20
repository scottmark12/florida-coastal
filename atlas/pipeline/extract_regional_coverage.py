"""Source-only OSM building/street coverage for continuous Tampa/Pinellas overviews.
The PBF and extracted download stay excluded; no approved town files are changed.
"""
from pathlib import Path
import osmium,json,gzip,sys
P=Path(__file__).resolve().parent;out=P/'work/coastal_pipeline/raw/regional-coverage';out.mkdir(parents=True,exist_ok=True)
regions={k:v['bounds'] for k,v in json.load(open(P/'regional-coverage.json')).items()};data={r:{} for r in regions}
class Extract(osmium.SimpleHandler):
 def way(self,w):
  if not w.tags.get('building') and not w.tags.get('highway'):return
  if not w.nodes or not w.nodes[0].location.valid():return
  q=w.nodes[0].location
  targets=[r for r,(a,b,c,d) in regions.items() if a-.02<q.lon<c+.02 and b-.02<q.lat<d+.02]
  if not targets:return
  ps=[{'lon':n.location.lon,'lat':n.location.lat} for n in w.nodes if n.location.valid()]
  if len(ps)!=len(w.nodes):return
  e={'type':'way','id':w.id,'tags':dict(w.tags),'geometry':ps}
  for r in targets:data[r][w.id]=e
Extract().apply_file(sys.argv[1],locations=True,idx='flex_mem')
for r,es in data.items():
 payload={'source':'https://download.geofabrik.de/north-america/us/florida.html','snapshot':Path(sys.argv[1]).name,'copyright':'© OpenStreetMap contributors, ODbL 1.0','bounds':regions[r],'elements':list(es.values())};(out/(r+'.json.gz')).write_bytes(gzip.compress(json.dumps(payload,separators=(',',':')).encode()));print(r,len(es),flush=True)
