import sys
sys.path.insert(0,'work/30a_finish')
from verify import *
from shapely.strtree import STRtree
O=Path('outputs/30a_final')
# Audit all mapped water within the north-Seaside/WaterColor neighborhood, not only named lakes.
roi=project(box(-86.155,30.319,-86.125,30.35))
all_edges=unary_union([edges(m) for k,m in meshes.items() if k.startswith('Lake /') or k=='Geography / OSM water'])
north=[]
for w in G['waters']:
 p=shape(w['geometry'])
 if p.is_empty or not p.intersects(roi):continue
 # Restrict candidate exported edge segments to the source boundary corridor.
 near=all_edges.intersection(p.boundary.buffer(.01))
 err=p.boundary.hausdorff_distance(near)*1000
 north.append({'name':('Western Lake' if w['osmId']==156617051 else w['name'] or 'Unnamed water '+str(w['osmId'])),'osmId':w['osmId'],'error_m':round(err,3),'source':f'https://www.openstreetmap.org/{w["osmType"]}/{w["osmId"]}'})
report={'meaning':'Exported model to source OSM fidelity, not independently surveyed ground-truth accuracy','districts':[r for r in rows if r['kind']=='town anchor'],'northSeasideWater':north,'over150m':[r for r in north+rows if r['error_m']>150]}
(O/'audit.json').write_text(json.dumps(report,indent=2));print(json.dumps(report,indent=2))
