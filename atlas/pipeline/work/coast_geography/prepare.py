import sys,json
from pathlib import Path
sys.path.insert(0,'work/florida_atlas/python_pkgs')
import shapefile,numpy as np
from shapely.geometry import shape,mapping
from shapely.ops import transform,unary_union
from pyproj import Transformer
R=Path('work/florida_atlas'); O=Path('work/coast_geography'); old=json.loads((R/'geography.json').read_text())
tr=Transformer.from_crs(4269,old['projection'],always_xy=True)
def pr(x,y,z=None):
 a,b=tr.transform(x,y);return np.asarray(a)/1000,np.asarray(b)/1000
waters=[];named={}
for f in O.glob('*/*.shp'):
 for r in shapefile.Reader(str(f)).iterShapeRecords():
  g=transform(pr,shape(r.shape.__geo_interface__)).buffer(0)
  waters.append(g)
  n=r.record.as_dict().get('FULLNAME')
  if n:named.setdefault(n,[]).append(g)
water=unary_union(waters)
land=shape(old['land']).difference(water).buffer(0)
context=[]
for r in shapefile.Reader(str(next((R/'states').glob('*.shp')))).iterShapeRecords():
 if r.record.as_dict()['STUSPS'] in ['AL','GA','MS']:context.append(transform(pr,shape(r.shape.__geo_interface__)).buffer(0))
context=unary_union(context)
old.update(land=mapping(land),context=mapping(context),hydrography=mapping(water))
(O/'geography.json').write_text(json.dumps(old,separators=(',',':')))
report={n:{'area_km2':unary_union(gs).area,'land_overlap_km2':land.intersection(unary_union(gs)).area} for n,gs in named.items() if any(s in n.lower() for s in ['choctaw','andrew','apalach','western lk','deer lk','campbell lk','redfish lk','eastern lk','draper lk','powell'])}
Path('outputs/florida_coastal_curated/geography_verification.json').write_text(json.dumps(report,indent=2))
print(json.dumps(report,indent=2));print('land',land.area,'water',water.area)
