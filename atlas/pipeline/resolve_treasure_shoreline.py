"""Use actual OSM tidal river banks instead of the open-water sea/river seam.
Run from pipeline after normalize_region.py and before build_town_views.py.
No coordinates are snapped and the 150 m source-fidelity gate is unchanged.
"""
import sys,json,gzip,math
from pathlib import Path
P=Path(__file__).resolve().parent;sys.path.insert(0,str(P/'work/30a_finish'));from geometry import *
from shapely.strtree import STRtree
r=P/'work/coastal_pipeline/v4/treasure-coast';es=json.load(gzip.open(r/'geography.json.gz','rt'))['elements'];clip=box(*json.load(open(r/'manifest.json'))['bounds']);lines=[];probes=[]
for e in es:
 if e.get('tags',{}).get('natural')!='coastline':continue
 pts=e['geometry'];lines.append(LineString([(p['lon'],p['lat']) for p in pts]))
 for a,b in zip(pts,pts[1:]):
  dx=b['lon']-a['lon'];dy=b['lat']-a['lat'];length=math.hypot(dx,dy)
  if length:probes.append(Point((a['lon']+b['lon'])/2-dy/length*1e-7,(a['lat']+b['lat'])/2+dx/length*1e-7))
coast=unary_union(lines).intersection(clip);faces=list(polygonize(unary_union([coast,clip.boundary])));tree=STRtree(probes);land=unary_union([f for f in faces if len(tree.query(f,predicate='contains'))]);water=unary_union([polygons(e).intersection(clip) for e in es if e.get('tags',{}).get('natural')=='water']);land=make_valid(land.difference(water))
way=next(e for e in es if e['type']=='way' and e['id']==82576745);seam=LineString([(p['lon'],p['lat']) for p in way['geometry'][:4]])
river=polygons(next(e for e in es if e['type']=='relation' and e['id']==1240802));banks=river.boundary.intersection(land.boundary.buffer(1e-8));shore=unary_union([coast.difference(seam),banks])
(r/'land.json').write_text(json.dumps(mapping(land)));(r/'shoreline.json').write_text(json.dumps(mapping(shore)))
report={'source':'https://www.openstreetmap.org/relation/1240802','sea_river_seam_source':'https://www.openstreetmap.org/way/82576745','method':'The first three tidal coastline segments span open water at the sea/river transition, rather than a land edge. Preserve the complete land mask; replace that seam with the mapped river-water banks coincident with land. No invented edges, snapping or relaxed accuracy threshold.','sea_river_seam_length_m':project(seam).length*1000}
(r/'shoreline-resolution.json').write_text(json.dumps(report,indent=2)+'\n');print(report)
