"""Fill only missing new-town footprints; OSM geometry is always preferred."""
from pathlib import Path
import json,gzip,hashlib,math,sys
from shapely.geometry import Polygon,shape,box
from shapely.strtree import STRtree
P=Path(__file__).resolve().parent;links=json.load(open(P/'addition-building-downloads.json'));spec=json.load(open(P/'coast-additions.json'))
def quad(lon,lat):
 x=int((lon+180)/360*512);y=int((1-math.asinh(math.tan(math.radians(lat)))/math.pi)/2*512);return ''.join(str(((x>>i)&1)+2*((y>>i)&1)) for i in range(8,-1,-1))
for row in spec:
 tid=row[0]
 if len(sys.argv)>1 and tid not in sys.argv[1:]:continue
 d=P/'work/coastal_pipeline/v4'/tid;m=json.load(open(d/'manifest.json'));catalog=json.load(open(d/'catalog-input.json'));b=catalog['towns'][0]['source_bounds'];keys={quad(x,y) for x in [b[0],b[2]] for y in [b[1],b[3]]};existing=[]
 for path in m['inputs']['osm']:
  if 'supplemental' in path:continue
  p=P/path;data=json.load(gzip.open(p,'rt') if p.suffix=='.gz' else p.open())
  for e in data.get('elements',[]):
   if e.get('tags',{}).get('building') and e.get('geometry'):
    poly=Polygon([(p['lon'],p['lat']) for p in e['geometry']])
    if poly.is_valid and not poly.is_empty:existing.append(poly.buffer(.000015))
 tree=STRtree(existing);elements=[];sources=[]
 for r in links:
  if r['QuadKey'] not in keys:continue
  raw=P/'work/coastal_pipeline/raw'/('nature-ms-'+r['QuadKey']+'.gz');sources.append({'download':r['Url'],'sha256':hashlib.sha256(raw.read_bytes()).hexdigest()})
  for line in gzip.open(raw,'rt'):
   f=json.loads(line);pts=f['geometry']['coordinates'][0];x=sum(p[0] for p in pts)/len(pts);y=sum(p[1] for p in pts)/len(pts)
   if not(b[0]<x<b[2] and b[1]<y<b[3]):continue
   poly=shape(f['geometry'])
   if len(tree.query(poly,predicate='intersects')):continue
   i=-1200000000-len(elements);elements.append({'type':'way','id':i,'geometry':[{'lon':p[0],'lat':p[1]} for p in pts],'tags':{'building':'house','source':'Microsoft Global ML Building Footprints; imagery-derived; not OSM'},'source_url':r['Url'],'id_namespace':'local-supplemental'})
 meta={'source':'https://github.com/microsoft/GlobalMLBuildingFootprints','download':'https://github.com/microsoft/GlobalMLBuildingFootprints','downloads':sources,'release':'2026-02-03','license':'CDLA Permissive 2.0','license_url':'https://github.com/microsoft/GlobalMLBuildingFootprints/blob/main/LICENSE','footprints':len(elements),'notes':['Imagery-derived footprint estimates, not a current field survey. OSM overlaps excluded.','Negative local IDs are never OSM IDs; heights follow the unchanged house defaults.']};(d/'supplemental-buildings.json').write_text(json.dumps({'metadata':meta,'elements':elements},separators=(',',':')));(d/'building-sources.json').write_text(json.dumps(meta,indent=2)+'\n');path=str((d/'supplemental-buildings.json').relative_to(P))
 if path not in m['inputs']['osm']:m['inputs']['osm'].append(path)
 m['inputs']['supplementalBuildingSources']=[meta];note='Incomplete OSM footprints filled by non-overlapping Microsoft imagery footprints with separate source IDs.'
 if note not in m['manual_fixes']:m['manual_fixes'].append(note)
 (d/'manifest.json').write_text(json.dumps(m,indent=2)+'\n');print(tid,len(elements),flush=True)
