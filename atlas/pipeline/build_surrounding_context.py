"""Quiet regional context from real OSM footprints, roads and land-use areas.
Read-only to Town packages. Run with a Geofabrik Florida .osm.pbf snapshot.
Raw downloads are excluded; outputs are a small illustrated PNG and provenance.
"""
from pathlib import Path
import sys,json,hashlib,math
import osmium
from PIL import Image,ImageDraw,ImageFilter,ImageChops
from pyproj import Transformer
P=Path(__file__).resolve().parent;A=P.parent
BOUNDS=[-83.15,27.38,-81.95,28.55];W=2048
T=Transformer.from_crs('EPSG:4326','+proj=aea +lat_1=24 +lat_2=31.5 +lat_0=24 +lon_0=-84 +datum=NAD83 +units=m +no_defs',always_xy=True)
x0,y0=T.transform(*BOUNDS[:2]);x1,y1=T.transform(*BOUNDS[2:]);H=round(W*(y1-y0)/(x1-x0));bounds=[x0/1000,y0/1000,x1/1000,y1/1000]
def xy(lon,lat):
 x,y=T.transform(lon,lat);return ((x-x0)/(x1-x0)*W,(y1-y)/(y1-y0)*H)
def inside(lon,lat):return BOUNDS[0]<=lon<=BOUNDS[2] and BOUNDS[1]<=lat<=BOUNDS[3]
cover=Image.new('RGBA',(W,H));built=Image.new('RGBA',(W,H));roads=Image.new('RGBA',(W,H));cd=ImageDraw.Draw(cover);bd=ImageDraw.Draw(built);rd=ImageDraw.Draw(roads);counts={'buildings':0,'roads':0,'landcover_areas':0};factory=osmium.geom.GeoJSONFactory()
class Draw(osmium.SimpleHandler):
 def way(self,w):
  tags=w.tags
  if not tags.get('building') and tags.get('highway') not in ['motorway','motorway_link','trunk','primary','secondary','tertiary','residential','unclassified']:return
  if not w.nodes or not w.nodes[0].location.valid():return
  n=w.nodes[0].location
  if not inside(n.lon,n.lat):return
  points=[xy(n.location.lon,n.location.lat) for n in w.nodes if n.location.valid()]
  if tags.get('building') and len(points)>3:
   bd.polygon(points,fill=[(209,192,163,145),(222,203,174,150),(195,196,175,140)][w.id%3]);counts['buildings']+=1
  elif len(points)>1:
   major=tags['highway'] in ['motorway','trunk','primary'];rd.line(points,fill=(247,239,218,210) if major else (188,178,154,115),width=2 if major else 1);counts['roads']+=1
 def area(self,a):
  tags=a.tags;land=tags.get('landuse');nature=tags.get('natural');leisure=tags.get('leisure')
  if nature in ['wood','scrub','wetland'] or land in ['forest','grass','meadow','recreation_ground','orchard','farmland'] or leisure in ['park','golf_course','nature_reserve']:
   color=(160,184,134,135) if nature in ['wood','scrub'] or land=='forest' else (166,190,147,120) if nature=='wetland' else (189,201,158,125)
  elif land in ['residential','commercial','retail','industrial']:color=(222,206,179,95)
  elif nature=='water' or tags.get('water'):color=(123,193,189,170)
  else:return
  if not any(inside(n.location.lon,n.location.lat) for ring in a.outer_rings() for n in ring if n.location.valid()):return
  try:geometry=json.loads(factory.create_multipolygon(a))
  except RuntimeError:return
  polygons=[[[xy(*p[:2]) for p in ring] for ring in poly] for poly in geometry['coordinates']]
  points=[p for poly in polygons for ring in poly for p in ring]
  if not points:return
  left=max(0,math.floor(min(p[0] for p in points)));top=max(0,math.floor(min(p[1] for p in points)));right=min(W,math.ceil(max(p[0] for p in points))+1);bottom=min(H,math.ceil(max(p[1] for p in points))+1)
  if right<=left or bottom<=top:return
  mask=Image.new('L',(right-left,bottom-top));d=ImageDraw.Draw(mask)
  for poly in polygons:
   for i,ring in enumerate(poly):d.polygon([(x-left,y-top) for x,y in ring],fill=color[3] if i==0 else 0)
  layer=Image.new('RGBA',mask.size,color);layer.putalpha(mask);cover.alpha_composite(layer,(left,top));counts['landcover_areas']+=1
source=Path(sys.argv[1]);Draw().apply_file(str(source),locations=True,idx='flex_mem')
cover=cover.filter(ImageFilter.GaussianBlur(.65));cover.alpha_composite(built);cover.alpha_composite(roads)
out=A/'regions/context/tampa-bay';out.mkdir(parents=True,exist_ok=True);cover.thumbnail((1024,1200));edge=Image.new('L',cover.size);ed=ImageDraw.Draw(edge)
for i in range(33):ed.rectangle((i,i,cover.width-1-i,cover.height-1-i),fill=round(255*i/32))
cover.putalpha(ImageChops.multiply(cover.getchannel('A'),edge));cover.quantize(colors=48,method=Image.Quantize.FASTOCTREE).save(out/'context.png',optimize=True)
meta={'bounds':bounds,'file':'context.png','resolution':list(cover.size),'edge_fade_pixels':32,'bytes':(out/'context.png').stat().st_size,'source':'https://download.geofabrik.de/north-america/us/florida.html','snapshot':source.name,'license':'OpenStreetMap contributors, ODbL 1.0','counts':counts,'purpose':'Subdued geographic context only; no new tracked destinations or Town geometry.'};(out/'report.json').write_text(json.dumps(meta,indent=2)+'\n')
for rid in ['tampa-south-shore','st-pete-clearwater']:
 p=A/'regions/overviews'/rid/'manifest.json';m=json.loads(p.read_text());m['surroundingContext']={'file':'../../context/tampa-bay/context.png','bounds':bounds,'bytes':(out/'context.png').stat().st_size};m['revision']=hashlib.sha256((m['revision']+hashlib.sha256((out/'context.png').read_bytes()).hexdigest()).encode()).hexdigest()[:16];p.write_text(json.dumps(m,indent=2)+'\n')
print(json.dumps({**meta,'bytes':(out/'context.png').stat().st_size}),flush=True)
