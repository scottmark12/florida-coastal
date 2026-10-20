"""Repair land-side classification at a clipped OSM coastline fragment.
Only Gibsonton's new normalized input changes. No source vertex is moved and the
locked renderer/exporter is untouched. Probe the retained source segments rather
than their original (sometimes outside-window) midpoints.
"""
from pathlib import Path
import sys,json,gzip,math
P=Path(__file__).resolve().parent;sys.path.insert(0,str(P/'work/30a_finish'))
from geometry import *
from shapely.strtree import STRtree
root=P/'work/coastal_pipeline/v4/gibsonton';m=json.load(open(root/'manifest.json'));clip=box(*m['bounds']);coast=shape(json.load(open(root/'shoreline.json')));probes=[]
for line in getattr(coast,'geoms',[coast]):
 for a,b in zip(line.coords,line.coords[1:]):
  dx,dy=b[0]-a[0],b[1]-a[1];length=math.hypot(dx,dy)
  if length:probes.append(Point((a[0]+b[0])/2-dy/length*1e-7,(a[1]+b[1])/2+dx/length*1e-7))
faces=list(polygonize(unary_union([coast,clip.boundary])));tree=STRtree(probes);land=unary_union([f for f in faces if len(tree.query(f,predicate='contains'))]);water=[]
for e in json.load(gzip.open(root/'geography.json.gz','rt'))['elements']:
 if e.get('tags',{}).get('natural')=='water':
  poly=polygons(e)
  if not poly.is_empty:water.append(poly.intersection(clip))
land=make_valid(land.difference(unary_union(water)));old=shape(json.load(open(root/'land.json')));area=project(land.symmetric_difference(old)).area*1e6
(root/'land.json').write_text(json.dumps(mapping(land)))
note='Gibsonton source crop intersected a tiny coast fragment whose original midpoint lay outside the window. Land-side probes on clipped OSM segments restore the small land face; no coastline vertex was moved.'
if note not in m['manual_fixes']:m['manual_fixes'].append(note)
m['inputs']['land']['normalizationNote']=note;(root/'manifest.json').write_text(json.dumps(m,indent=2)+'\n')
(root/'source-repair.json').write_text(json.dumps({'method':note,'changed_area_m2':area,'coastline_vertices_moved':0,'source':'https://www.openstreetmap.org/copyright','license':'ODbL 1.0'},indent=2)+'\n');print('Clipped source land-face repair:',round(area,3),'m²')
