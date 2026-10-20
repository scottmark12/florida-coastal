"""Complete actual OSM coastline chains cut at the Florida/Georgia extract border."""
from pathlib import Path
import urllib.request,json,gzip,xml.etree.ElementTree as E
from concurrent.futures import ThreadPoolExecutor
P=Path(__file__).resolve().parent;r=P/'work/coastal_pipeline/v4/first-coast';raw=P/'work/coastal_pipeline/downloads/first-coast-border';raw.mkdir(parents=True,exist_ok=True)
boxes=[(0,[-81.72,30.715,-81.62,30.825]),(2,[-81.52,30.715,-81.42,30.825])]+[(str(i)+'-'+str(j),[w,s,w+.05,s+.055]) for i,w0 in [(1,-81.62),(3,-81.42)] for j,(w,s) in enumerate([(w0,30.715),(w0+.05,30.715),(w0,30.77),(w0+.05,30.77)])]
def fetch(pair):
 i,b=pair;url='https://api.openstreetmap.org/api/0.6/map?bbox='+','.join(map(str,b));f=raw/(str(i)+'.osm')
 if not f.exists():f.write_bytes(urllib.request.urlopen(urllib.request.Request(url,headers={'User-Agent':'FloridaCoastalAtlas/1.0 source review'}),timeout=90).read())
 x=E.fromstring(f.read_bytes());nodes={n.attrib['id']:{'lon':float(n.attrib['lon']),'lat':float(n.attrib['lat'])} for n in x.findall('node')};out=[]
 for w in x.findall('way'):
  tags={t.attrib['k']:t.attrib['v'] for t in w.findall('tag')}
  if tags.get('natural')=='coastline':out.append({'type':'way','id':int(w.attrib['id']),'tags':tags,'geometry':[nodes[q.attrib['ref']] for q in w.findall('nd')]})
 print(i,len(out),flush=True);return url,out
ways={};urls=[]
with ThreadPoolExecutor(max_workers=2) as pool:
 for url,es in pool.map(fetch,boxes):
  urls.append(url)
  for e in es:ways[e['id']]=e
assert ways
(r/'landmarks-north-coast.json.gz').write_bytes(gzip.compress(json.dumps({'elements':list(ways.values()),'source':'OSM API map 2026-10-20'},separators=(',',':')).encode()))
(r/'northern-coast-source.json').write_text(json.dumps({'sources':urls,'checked':'2026-10-20','license':'ODbL 1.0','attribution':'© OpenStreetMap contributors','ways':len(ways),'reason':'The Florida Geofabrik extract cuts adjoining Georgia coastline chains at the state boundary. Complete them with actual OSM ways before polygonizing; no invented shoreline or relaxed gate.'},indent=2)+'\n');print('Coast patch ways',len(ways))
