"""Non-overlapping open imagery footprints supplement incomplete OSM; no renderer changes."""
from pathlib import Path
import json,gzip,hashlib,math,urllib.request
from shapely.geometry import Polygon,shape
from shapely.strtree import STRtree
P=Path(__file__).resolve().parent;rows=json.load(open(P/'nature-building-downloads.json'))
for town in ['cedarkey','crystal-river','homosassa','ozello','steinhatchee']:
 d=P/'work/coastal_pipeline/v4'/town;m=json.load(open(d/'manifest.json'));district=json.load(open(d/'districts.json'))[0];lon,lat=district['lon'],district['lat'];x=int((lon+180)/360*512);y=int((1-math.asinh(math.tan(math.radians(lat)))/math.pi)/2*512);q=''.join(str(((x>>i)&1)+2*((y>>i)&1)) for i in range(8,-1,-1));r=next(r for r in rows if r['QuadKey']==q);raw=P/'work/coastal_pipeline/raw'/('nature-ms-'+q+'.gz')
 raw.parent.mkdir(parents=True,exist_ok=True)
 if not raw.exists():raw.write_bytes(urllib.request.urlopen(r['Url'],timeout=120).read())
 existing=[]
 for path in m['inputs']['osm']:
  if 'supplemental' in path:continue
  p=P/path;data=json.load(gzip.open(p,'rt') if p.suffix=='.gz' else p.open())
  for e in data.get('elements',[]):
   if e.get('tags',{}).get('building') and e.get('geometry'):
    poly=Polygon([(p['lon'],p['lat']) for p in e['geometry']]);
    if poly.is_valid and not poly.is_empty:existing.append(poly.buffer(.000015))
 tree=STRtree(existing);elements=[];features=[];bounds=m['bounds']
 for line in gzip.open(raw,'rt'):
  f=json.loads(line);poly=shape(f['geometry']);c=poly.centroid
  if not(bounds[0]<c.x<bounds[2] and bounds[1]<c.y<bounds[3]):continue
  if len(tree.query(poly,predicate='intersects')):continue
  i=-1100000000-len(elements);pts=f['geometry']['coordinates'][0]
  elements.append({'type':'way','id':i,'geometry':[{'lon':p[0],'lat':p[1]} for p in pts],'tags':{'building':'house','source':'Microsoft Global ML Building Footprints; imagery-derived; not OSM'},'source_url':r['Url'],'id_namespace':'local-supplemental'})
  features.append(dict(f,properties={**f.get('properties',{}),'local_id':i,'source_url':r['Url']}))
 meta={'source':'https://github.com/microsoft/GlobalMLBuildingFootprints','download':r['Url'],'release':'2026-02-03','license':'CDLA Permissive 2.0','license_url':'https://github.com/microsoft/GlobalMLBuildingFootprints/blob/main/LICENSE','download_sha256':hashlib.sha256(raw.read_bytes()).hexdigest(),'footprints':len(elements),'notes':['Imagery-derived footprints, not current field survey. OSM overlaps excluded.','Negative IDs are local, never OSM IDs. Heights use unchanged house defaults, not surveyed heights.']}
 (d/'supplemental-buildings.json').write_text(json.dumps({'metadata':meta,'elements':elements},separators=(',',':')));(d/'building-source-subset.geojson').write_text(json.dumps({'type':'FeatureCollection','features':features},separators=(',',':')));(d/'building-sources.json').write_text(json.dumps(meta,indent=2)+'\n');path=str((d/'supplemental-buildings.json').relative_to(P))
 if path not in m['inputs']['osm']:m['inputs']['osm'].append(path)
 m['inputs']['supplementalBuildingSources']=[meta];note='Incomplete OSM residential footprints supplemented with non-overlapping Microsoft imagery footprints; source and local IDs retained.'
 if note not in m['manual_fixes']:m['manual_fixes'].append(note)
 (d/'manifest.json').write_text(json.dumps(m,indent=2)+'\n');print(town,len(elements),flush=True)
