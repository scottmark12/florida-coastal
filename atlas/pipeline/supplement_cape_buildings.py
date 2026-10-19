"""Fill missing Cape San Blas footprints only; preserve mapped OSM buildings."""
from pathlib import Path
import urllib.request,gzip,json,hashlib,sys
P=Path(__file__).resolve().parent;sys.path.insert(0,str(P/'work/30a_finish'));from geometry import polygons
from shapely.geometry import shape,box,mapping
from shapely.ops import unary_union
from shapely.strtree import STRtree
p=P/'work/coastal_pipeline/v4/port-st-joe';url='https://bfppub.z5.web.core.windows.net/2026-08-13/global-buildings.geojsonl/RegionName=UnitedStates/quadkey=032020132/part-00002-110f5303-ff85-4c71-a2bf-c6070024fec8.c000.csv.gz';raw=P/'work/coastal_pipeline/raw/cape-ms.geojsonl.gz';raw.parent.mkdir(parents=True,exist_ok=True)
if not raw.exists():raw.write_bytes(urllib.request.urlopen(url,timeout=90).read())
osm=[]
for name in ['district-port-st-joe','district-cape-san-blas']:
 for e in json.load(gzip.open(p/(name+'.json.gz'),'rt'))['elements']:
  if e.get('tags',{}).get('building'):
   g=polygons(e)
   if not g.is_empty:osm.append(g.buffer(.00004))
tree=STRtree(osm);land=shape(json.load(open(p/'land.json')));window=box(-85.425,29.66,-85.365,29.81);elements=[];features=[]
for line in gzip.open(raw,'rt'):
 f=json.loads(line);g=shape(f['geometry'])
 if not window.contains(g.centroid) or not land.contains(g.centroid) or len(tree.query(g,predicate='intersects')):continue
 i=-2000000000-len(elements);features.append(dict(f,properties={**f['properties'],'local_id':i,'source':'Microsoft Global ML Building Footprints','source_url':url}));elements.append({'type':'way','id':i,'geometry':[{'lon':x,'lat':y} for x,y in g.exterior.coords],'tags':{'building':'house','source':'Microsoft Global ML Building Footprints; imagery-derived; not OpenStreetMap'},'source_url':url,'id_namespace':'local-supplemental'})
meta={'source':'https://github.com/microsoft/GlobalMLBuildingFootprints','download':url,'release':'2026-08-13','license':'CDLA Permissive 2.0','license_url':'https://github.com/microsoft/GlobalMLBuildingFootprints/blob/main/LICENSE','download_sha256':hashlib.sha256(raw.read_bytes()).hexdigest(),'footprints':len(elements),'notes':['Only adds Cape footprints that do not intersect an existing OSM building with approximately 4 m tolerance.','Imagery-derived estimates, not a current field survey. Imagery dates vary; no claim all footprints are current.','Negative IDs are local supplemental IDs, never OSM IDs. Default one-to-two-storey house heights, unchanged 3x scale rule.']}
(p/'supplemental-buildings.json').write_text(json.dumps({'metadata':meta,'elements':elements},separators=(',',':')));(p/'building-source-subset.geojson').write_text(json.dumps({'type':'FeatureCollection','features':features},separators=(',',':')));(p/'building-sources.json').write_text(json.dumps(meta,indent=2)+'\n');m=json.load(open(p/'manifest.json'));name='work/coastal_pipeline/v4/port-st-joe/supplemental-buildings.json'
if name not in m['inputs']['osm']:m['inputs']['osm'].append(name)
m['inputs']['supplementalBuildingSources']=[meta];m['manual_fixes'].append('Filled missing Cape housing footprints from Microsoft open imagery-derived data, excluding overlaps with existing OSM buildings; no Port St. Joe buildings replaced.');(p/'manifest.json').write_text(json.dumps(m,indent=2));print('Cape supplemental footprints',len(elements))
