import sys
from pathlib import Path
sys.path.insert(0,str(Path('work/florida_atlas/python_pkgs').resolve()))
import zipfile,shapefile,json,numpy as np
from shapely.geometry import shape,mapping,box
from shapely.ops import transform
from pyproj import Transformer
root=Path('work/florida_atlas')
for name in ['states','roads','lakes']:
 d=root/name;d.mkdir(exist_ok=True)
 with zipfile.ZipFile(root/(name+'.zip')) as z:z.extractall(d)
proj=Transformer.from_crs('EPSG:4269','+proj=aea +lat_1=24 +lat_2=31.5 +lat_0=24 +lon_0=-84 +datum=NAD83 +units=m +no_defs',always_xy=True)
def pr(x,y,z=None):
 a,b=proj.transform(x,y);return np.array(a)/1000,np.array(b)/1000
r=shapefile.Reader(str(next((root/'states').glob('*.shp'))))
record=next(rec for rec in r.iterShapeRecords() if rec.record.as_dict()['STUSPS']=='FL')
geo=shape(record.shape.__geo_interface__);land=transform(pr,geo).buffer(0)
# Published major lakes, clipped to state.
laker=shapefile.Reader(str(next((root/'lakes').glob('*.shp'))));lakes=[]
for rec in laker.iterShapeRecords():
 if not box(*rec.shape.bbox).intersects(geo.envelope):continue
 g=shape(rec.shape.__geo_interface__).intersection(geo)
 if not g.is_empty:lakes.append(transform(pr,g))
from shapely import union_all
lakegeom=union_all(lakes);land=land.difference(lakegeom)
(root/'geography.json').write_text(json.dumps({'land':mapping(land),'lakes':mapping(lakegeom),'projection':proj.target_crs.to_string(),'units':'kilometres','bbox':land.bounds},separators=(',',':')))
towns=json.loads((root/'towns.json').read_text());regions=json.loads((root/'regions.json').read_text());rmap={tid:region for region in regions for tid in region['towns']}
for t in towns:
 t['x'],t['y']=map(float,pr(t['lon'],t['lat']));t['area_id']=rmap[t['id']]['id'];t['area_name']=rmap[t['id']]['name'];t['source_url']='https://www.floridacoastal.co/towns/'+t['id']+'.html'
 # Nearest-neighbor spacing guides display-only landmark enlargement, never geographic displacement.
for t in towns:
 near=min(np.hypot(t['x']-u['x'],t['y']-u['y']) for u in towns if u['id']!=t['id']);t['nearest_town_km']=float(near)
(root/'towns_geo.json').write_text(json.dumps(towns,indent=2))
rr=shapefile.Reader(str(next((root/'roads').glob('*.shp'))));roads=[]
for rec in rr.iterShapeRecords():
 props=rec.record.as_dict()
 if props.get('MTFCC') not in ['S1100','S1200']:continue
 g=transform(pr,shape(rec.shape.__geo_interface__)).simplify(.08)
 if not g.is_empty:roads.append({'name':props.get('FULLNAME'),'geometry':mapping(g)})
(root/'roads_geo.json').write_text(json.dumps(roads,separators=(',',':')))
print(json.dumps({'towns':len(towns),'regions':len(regions),'primary_road_segments':len(roads),'land_polygons':len(land.geoms),'lake_area_km2':lakegeom.area,'bounds':land.bounds}))
