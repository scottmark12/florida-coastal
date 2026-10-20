"""Continuous regional ground; approved local OSM sources override mainland context."""
import json
from geometry import *
from shapely import constrained_delaunay_triangles,clip_by_rect
import math
from pathlib import Path
P=Path(__file__).resolve().parent
COVERAGE=json.load(open(P/'regional-coverage.json'))
from mesh_export import read_triangles,write_mesh

def continuous_land(fallback,packs,rid,source30):
 land=fallback.simplify(.05,preserve_topology=True)
 # Nearby continuous coverage also supplies real coast beneath contextual buildings.
 if rid in COVERAGE:
  registry=json.load(open(P.parent/'regions/package-registry.json'));catalog=json.load(open(P.parent/'regions/catalog.json'))
  for neighbor in COVERAGE:
   if neighbor==rid:continue
   region=next(r for r in catalog.get('sourceRegions',catalog['regions']) if r['id']==neighbor)
   paths={registry[t] for t in region['towns'] if t in registry}
   for path in paths:
    manifest=json.load(open(P/'work/coastal_pipeline/v4'/Path(path).name/'manifest.json'));clip=project(box(*manifest['bounds']));patch=project(shape(json.load(open(P/manifest['inputs']['land']['path'])))).simplify(.025,preserve_topology=True);land=land.difference(clip).union(patch)

 for pack in sorted(packs,key=lambda p:p['clip'].area,reverse=True):land=land.difference(pack['clip']).union(pack['land'])
 if rid=='emerald-coast':
  data=json.load(open(source30));patch=shape(data['land']);clip=shape(data['coast']).buffer(1.2,cap_style=2).intersection(project(box(-86.40,30.20,-85.76,30.59)));land=land.difference(clip).union(patch.intersection(clip))
 return make_valid(land)

def write_base(out,land,packs):
 base={'#f1e3c8':[]}
 # Vector subdivision bounds triangulation cost; internal edges share the same surface.
 ground=land.simplify(.005,preserve_topology=True);x0,y0,x1,y1=ground.bounds
 for x in range(math.floor(x0/50)*50,math.ceil(x1/50)*50,50):
  for y in range(math.floor(y0/50)*50,math.ceil(y1/50)*50,50):
   for poly in parts(make_valid(clip_by_rect(ground,x,y,x+50,y+50))):
    if poly.is_empty:continue
    for tri in constrained_delaunay_triangles(poly).geoms:base['#f1e3c8'].extend([(px,.002,-py) for px,py in list(tri.exterior.coords)[:3]])
 for pack in packs:
  for color,vertices in read_triangles(pack['path']/'base.glb.gz').items():
   if color in ['#fffdf1','#fffef4','#fff7e7','#b6aa8e','#b6aa91']:base.setdefault(color,[]).extend(vertices.tolist())
 return write_mesh(out,'base',base)

def write_water(land,b,out,rid,width=1536):
 # Reuse the approved Emerald recipe and the existing non-target wash parameters.
 from PIL import Image,ImageDraw,ImageFilter
 from water_wash import emerald_wash
 coast=clip_by_rect(land.boundary,*b)
 if rid in ['emerald-coast','forgotten-coast']:
  emerald_wash(coast,b,out,width=width);(out/'shore-wash.png').replace(out/'water.png');(out/'shore-wash.json').replace(out/'water-recipe.json');return
 W=width;H=min(4096,max(512,round(W*(b[3]-b[1])/(b[2]-b[0]))));mask=Image.new('L',(W,H));draw=ImageDraw.Draw(mask);xy=lambda x,y:((x-b[0])/(b[2]-b[0])*W,(b[3]-y)/(b[3]-b[1])*H)
 for line in getattr(coast,'geoms',[coast]):
  if line.geom_type=='LineString':draw.line([xy(x,y) for x,y in line.coords],fill=255,width=max(2,round(.22*W/(b[2]-b[0]))))
 mask=mask.filter(ImageFilter.GaussianBlur(.18*W/(b[2]-b[0])));alpha=np.clip(np.array(mask).astype(float)*1.3,0,205).astype('uint8');wash=Image.new('RGBA',(W,H),'#83e0cf');wash.putalpha(Image.fromarray(alpha));wash.quantize(colors=128,method=Image.Quantize.FASTOCTREE).save(out/'water.png',optimize=True)

def beach_index(packs):
 # Measured mapped sand surfaces drive the existing 300m Gulf-building exception.
 from shapely.strtree import STRtree
 polygons=[]
 for pack in packs:
  for color,vertices in read_triangles(pack['path']/'base.glb.gz').items():
   if color not in ['#fffdf1','#fffef4','#fff7e7']:continue
   for tri in vertices.reshape(-1,3,3):
    poly=Polygon([(float(x),float(-z)) for x,y,z in tri])
    if poly.is_valid and poly.area>0:polygons.append(poly)
 return STRtree(polygons)

def asset_revision(out,meta):
 import hashlib
 digest=hashlib.sha256()
 for name in [meta['base'],meta['canopy'],meta['water'],meta['trees'],*[t['file'] for t in meta['buildings']],*([meta['surroundingContext']['file']] if meta.get('surroundingContext') else [])]:
  digest.update(name.encode()+b'\0'+hashlib.sha256((out/name).read_bytes()).digest())
 return digest.hexdigest()[:16]

def coverage_bounds(packs,rid):
 geometries=[p['clip'] for p in packs]
 if rid in COVERAGE:
  a,b,c,d=COVERAGE[rid]['bounds'];geometries.append(project(box(a-.02,b-.02,c+.02,d+.02)))
 return list(unary_union(geometries).bounds)
