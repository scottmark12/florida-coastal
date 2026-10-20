import sys,json
from pathlib import Path
sys.path.insert(0,'work/florida_atlas/python_pkgs')
from shapely.geometry import shape,Point
from pyproj import Transformer
p=Path('outputs/florida_coastal_curated/geography_verification.json');r=json.loads(p.read_text());geo=json.loads(Path('work/coast_geography/geography.json').read_text());land=shape(geo['land']);context=shape(geo['context']);tr=Transformer.from_crs(4326,geo['projection'],always_xy=True)
checks={}
for name,lon,lat in [('Alabama mainland',-86.5,31.1),('Georgia mainland',-84.0,31.1),('Cape San Blas',-85.356,29.669),('Santa Rosa Island',-86.8563485,30.3824216),('St George Island',-84.88,29.666),('Shell Island',-85.6861,30.0928)]:
 x,y=tr.transform(lon,lat);checks[name]=land.union(context).distance(Point(x/1000,y/1000))
r['land_sample_distance_km']=checks
r['source']='US Census TIGER/Line 2025 AREAWATER: Escambia, Santa Rosa, Okaloosa, Walton, Bay, Gulf, Franklin counties; Census state polygons for mainland context.'
assert all(v['land_overlap_km2']<.0001 for k,v in r.items() if isinstance(v,dict) and 'land_overlap_km2' in v)
p.write_text(json.dumps(r,indent=2));print(checks)
