"""Restore the complete northern Gulf edge for Weeki Wachee from OSM API.
The extra window and retrieval date are recorded; no inferred coast is substituted.
"""
from pathlib import Path
import urllib.request,json,gzip,xml.etree.ElementTree as E
P=Path(__file__).resolve().parent;d=P/'work/coastal_pipeline/v4/weeki-wachee';raw=P/'work/coastal_pipeline/raw/weeki-coast-extension-wide.osm';url='https://api.openstreetmap.org/api/0.6/map?bbox=-82.72,28.50,-82.62,28.58'
if not raw.exists():raw.write_bytes(urllib.request.urlopen(urllib.request.Request(url,headers={'User-Agent':'FloridaCoastalAtlasSourceAudit/1.0'}),timeout=90).read())
r=E.parse(raw).getroot();nodes={n.get('id'):{'lon':float(n.get('lon')),'lat':float(n.get('lat'))} for n in r.findall('node')};es=[]
for w in r.findall('way'):
 tags={t.get('k'):t.get('v') for t in w.findall('tag')}
 if tags.get('natural')=='coastline':es.append({'type':'way','id':int(w.get('id')),'tags':tags,'geometry':[nodes[n.get('ref')] for n in w.findall('nd')]})
assert es,'No mapped coast in extension'
(d/'coast-extension.json.gz').write_bytes(gzip.compress(json.dumps({'elements':es,'source':url,'retrieved':'2026-10-19','license':'ODbL 1.0'},separators=(',',':')).encode(),mtime=0));(d/'coast-extension-source.json').write_text(json.dumps({'source':url,'retrieved':'2026-10-19','license':'ODbL 1.0','reason':'Original district window stopped inland; restore full Gulf edge including north of neighboring Hernando window.','ways':[e['id'] for e in es]},indent=2)+'\n');print('Coast extension ways',len(es))
