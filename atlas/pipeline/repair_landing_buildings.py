"""Fill NPR's missing residential footprints with licensed imagery footprints.
OSM geometry wins every overlap. Heights still use the locked house defaults.
"""
from pathlib import Path
import json,gzip,hashlib,math,csv
from shapely.geometry import Polygon,shape
from shapely.strtree import STRtree
P=Path(__file__).resolve().parent;d=P/'work/coastal_pipeline/v4/landing-repair/new-port-richey';m=json.load(open(d/'manifest.json'));b=m['bounds'];existing=[]
for name in m['inputs']['osm']:
 p=P/name
 for e in json.load(gzip.open(p,'rt') if p.suffix=='.gz' else p.open()).get('elements',[]):
  if e.get('tags',{}).get('building') and e.get('geometry'):
   poly=Polygon([(q['lon'],q['lat']) for q in e['geometry']])
   if poly.is_valid and not poly.is_empty and poly.bounds[0]<b[2] and poly.bounds[2]>b[0] and poly.bounds[1]<b[3] and poly.bounds[3]>b[1]:existing.append(poly.buffer(.000015))
tree=STRtree(existing);rows=[r for r in csv.DictReader(open(P/'work/coastal_pipeline/downloads/ms-dataset-links.csv')) if r['Location']=='UnitedStates'];elements=[];sources=[]
def quad(lon,lat):
 x=int((lon+180)/360*512);y=int((1-math.asinh(math.tan(math.radians(lat)))/math.pi)/2*512);return ''.join(str(((x>>i)&1)+2*((y>>i)&1)) for i in range(8,-1,-1))
keys={quad(x,y) for x in [b[0],b[2]] for y in [b[1],b[3]]}
for r in rows:
 if r['QuadKey'] not in keys:continue
 raw=P/'work/coastal_pipeline/raw'/('nature-ms-'+r['QuadKey']+'.gz');sources.append({'download':r['Url'],'sha256':hashlib.sha256(raw.read_bytes()).hexdigest()})
 for line in gzip.open(raw,'rt'):
  f=json.loads(line);pts=f['geometry']['coordinates'][0];x=sum(p[0] for p in pts)/len(pts);y=sum(p[1] for p in pts)/len(pts)
  if not(b[0]<x<b[2] and b[1]<y<b[3]):continue
  poly=shape(f['geometry'])
  if len(tree.query(poly,predicate='intersects')):continue
  elements.append({'type':'way','id':-1400000000-len(elements),'geometry':[{'lon':p[0],'lat':p[1]} for p in pts],'tags':{'building':'house','source':'Microsoft Global ML Building Footprints; imagery-derived; not OSM'},'source_url':r['Url'],'id_namespace':'local-supplemental'})
meta={'download':'https://github.com/microsoft/GlobalMLBuildingFootprints','source':'https://github.com/microsoft/GlobalMLBuildingFootprints','license':'CDLA Permissive 2.0','license_url':'https://github.com/microsoft/GlobalMLBuildingFootprints/blob/main/LICENSE','downloads':sources,'footprints':len(elements),'notes':['Non-overlapping imagery-derived footprints, not OSM records or a surveyed height inventory. Negative IDs are local supplemental IDs.']};f=d/'supplemental-buildings.json';f.write_text(json.dumps({'metadata':meta,'elements':elements},separators=(',',':')));(d/'building-sources.json').write_text(json.dumps(meta,indent=2)+'\n');path=str(f.relative_to(P))
if path not in m['inputs']['osm']:m['inputs']['osm'].append(path)
m['inputs']['supplementalBuildingSources']=[meta];(d/'manifest.json').write_text(json.dumps(m,indent=2)+'\n');print('Added',len(elements),'sourced house footprints')
