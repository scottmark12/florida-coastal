"""Export every mapped highway/rail bridge from a coherent Florida OSM PBF.
Usage: python export_bridges.py /path/to/florida.osm.pbf
Decks follow OSM centerlines; pier spacing and elevations are illustrative.
"""
import sys,json,math,gzip,hashlib
from pathlib import Path
P=Path(__file__).resolve().parent
sys.path[:0]=[str(P/'work/30a_finish'),str(P/'work/coastal_pipeline/v4')]
import osmium
from geometry import *
from mesh_export import write_mesh
from shapely import constrained_delaunay_triangles
source=Path(sys.argv[1]);O=P.parent/'regions/assets';O.mkdir(exist_ok=True);colors={};rows=[]
def add(color,pts):colors.setdefault(color,[]).extend([(float(x),float(z),float(-y)) for x,y,z in pts])
def face(poly,z,color):
 for p in parts(poly):
  for t in constrained_delaunay_triangles(p).geoms:add(color,[(x,y,z) for x,y in list(t.exterior.coords)[:3]])
def solid(poly,bottom,top,color):
 face(poly,top,color)
 for p in parts(poly):
  for a,b in zip(p.exterior.coords,list(p.exterior.coords)[1:]):add(color,[(*a,bottom),(*b,bottom),(*b,top),(*a,bottom),(*b,top),(*a,top)])
class Bridges(osmium.SimpleHandler):
 def way(self,w):
  tags=dict(w.tags)
  if tags.get('bridge') in [None,'no','proposed','construction'] or not (tags.get('highway') or tags.get('railway')):return
  pts=[(n.location.lon,n.location.lat) for n in w.nodes if n.location.valid()]
  if len(pts)!=len(w.nodes) or len(pts)<2:raise ValueError('Incomplete bridge '+str(w.id))
  line=project(LineString(pts));length=line.length
  if length<.003:return
  try:width=float(tags.get('width','').split(' ')[0])
  except ValueError:
   try:width=max(5,float(tags.get('lanes',2))*3.5+2)
   except ValueError:width=9
   if tags.get('highway') in ['path','footway','cycleway','steps']:width=3
  width=min(40,max(2,width))/1000
  # Mild crowned clearance lets bridges read over water without skyline exaggeration.
  deck=.012 if length<.3 else .020
  solid(line.buffer(width/2,cap_style=2,join_style=2),deck-.002,deck,'#e4d8bf')
  for side in [-1,1]:solid(line.offset_curve(side*(width/2-.0004)).buffer(.00035,cap_style=2),deck,deck+.0012,'#fff3db')
  count=max(1,math.ceil(length/.06));piers=0
  for k in range(1,count):
   q=line.interpolate(length*k/count);solid(q.buffer(.0018,quad_segs=2),-.002,deck-.002,'#bfb89d');piers+=1
  rows.append({'osm_way':w.id,'name':tags.get('name',tags.get('ref','Unnamed bridge')),'source':'https://www.openstreetmap.org/way/'+str(w.id),'length_m':round(length*1000,2),'width_m':width*1000,'piers':piers,'coordinates':pts,'projected_bounds':line.bounds})
Bridges().apply_file(str(source),locations=True,idx='flex_mem')
size=write_mesh(O,'bridges',colors)
report={'source':'Geofabrik Florida OSM snapshot '+source.name,'attribution':'© OpenStreetMap contributors, ODbL 1.0','source_sha256':hashlib.sha256(source.read_bytes()).hexdigest(),'bridge_ways':len(rows),'deck_bytes':size,'notes':['All highway/rail bridge ways in this snapshot are exported, including island connections.','Deck width uses OSM width/lanes when available; missing width, clearance and pier spacing are illustrative, not surveyed.'],'bridges':rows}
(P.parent/'regions/bridges.json.gz').write_bytes(gzip.compress(json.dumps(report,separators=(',',':')).encode(),mtime=0))
(P.parent/'regions/bridges-report.json').write_text(json.dumps({k:v for k,v in report.items() if k!='bridges'},indent=2))
print(json.dumps({k:v for k,v in report.items() if k!='bridges'},indent=2))
