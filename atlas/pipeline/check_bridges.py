"""Check every exported bridge way against serialized GLB deck surfaces."""
from pathlib import Path
import json,gzip,sys,math
P=Path(__file__).resolve().parent;sys.path[:0]=[str(P/'work/30a_finish'),str(P/'work/coastal_pipeline/v4')]
from geometry import *
from mesh_export import read_triangles
from shapely.strtree import STRtree
A=P.parent;source=json.load(gzip.open(A/'regions/bridges.json.gz','rt'));triangles=read_triangles(P/'outputs/bridge-source-mesh/bridges.glb.gz' if (P/'outputs/bridge-source-mesh/bridges.glb.gz').exists() else A/'regions/assets/bridges.glb.gz')['#e4d8bf'];polys=[]
for i in range(0,len(triangles),3):
 q=triangles[i:i+3]
 if max(q[:,1])-min(q[:,1])>1e-7:continue
 p=Polygon([(float(v[0]),float(-v[2])) for v in q])
 if p.area>1e-12:polys.append(p)
tree=STRtree(polys);worst=0;bad=[]
for b in source['bridges']:
 line=project(LineString(b['coordinates']));points=[line.interpolate(float(t)) for t in np.linspace(0,line.length,max(3,math.ceil(line.length/.05)))];err=max(p.distance(polys[int(tree.nearest(p))])*1000 for p in points);worst=max(worst,err)
 if err>.15:bad.append({'osm_way':b['osm_way'],'name':b['name'],'error_m':err})
report={'checked_bridge_ways':len(source['bridges']),'max_serialized_centerline_to_deck_error_m':round(worst,6),'missing_or_misaligned':bad,'attribution':source['attribution'],'notes':['Every mapped centerline sampled at <=50m spacing and both endpoints checked against serialized deck triangles.','Pier location, spacing and clearance are illustrative. This checks alignment to the supplied OSM snapshot, not survey accuracy.']}
(A/'regions/bridges-validation.json').write_text(json.dumps(report,indent=2)+'\n');print(json.dumps(report,indent=2));assert not bad
