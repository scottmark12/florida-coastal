"""Shared flat regional illustrations, based on the approved Sarasota artwork.
Inputs: approved calibrated artwork, OSM PBF, ESA WorldCover classes, approved
local land polygons and normalized Census context. Town geometry is read-only.
Run --extract <florida.osm.pbf>, then --render. Raw/derived source caches are ignored.
"""
from pathlib import Path
import sys,json,math,hashlib,shutil
import numpy as np
from PIL import Image,ImageDraw,ImageFilter,ImageChops
from pyproj import Transformer
P=Path(__file__).resolve().parent;A=P.parent;os_args=sys.argv[1:];D=P/'work/coastal_pipeline/raw/regional-illustration';D.mkdir(parents=True,exist_ok=True)
S=json.load(open(P/'regional-style.json'));catalog=json.load(open(A/'regions/catalog.json'));regions=catalog['regions'];towns={t['id']:t for t in catalog['towns']};CRS='+proj=aea +lat_1=24 +lat_2=31.5 +lat_0=24 +lon_0=-84 +datum=NAD83 +units=m +no_defs';T=Transformer.from_crs('EPSG:4326',CRS,always_xy=True);I=Transformer.from_crs(CRS,'EPSG:4326',always_xy=True)
def frame(r,w,h):
 ts=[towns[t] for t in r.get('regionalTowns',r['towns'])];xs=[t['x'] for t in ts];vs=[t['y']/math.sqrt(2) for t in ts];l=24 if w<700 else 48;right=w-24 if w<700 else w-330;top=125 if w<700 else 145;bottom=h-min(h*.34,300)-40 if w<700 else h-65
 scale=max((max(xs)-min(xs)+6)/max(100,right-l),(max(vs)-min(vs)+6)/max(120,bottom-top));ax=(l+right)/2;ay=(top+bottom)/2
 if (max(vs)-min(vs))/(max(xs)-min(xs)+.001)<.35 and w>=700:ay=h*S['framing']['horizontalCoastAnchor']
 x=(min(xs)+max(xs))/2+(w/2-ax)*scale;v=(min(vs)+max(vs))/2+(ay-h/2)*scale;return [x-w*scale/2,v-h*scale/2,x+w*scale/2,v+h*scale/2]
def union(bs):return [min(b[0] for b in bs),min(b[1] for b in bs),max(b[2] for b in bs),max(b[3] for b in bs)]
def pad(b,f):dx=(b[2]-b[0])*f;dy=(b[3]-b[1])*f;return [b[0]-dx,b[1]-dy,b[2]+dx,b[3]+dy]
def boxes():
 bs={r['id']:pad(union([frame(r,*size) for size in [(768,1024),(1440,1000),(1920,1080)]]),.12) for r in regions};bs['_backdrop']=pad(union([frame(r,*size) for r in regions for size in [(390,844),(1440,1000),(2560,1440),(3200,1200)]]),.10);return bs
class Canvas:
 def __init__(self,rid,b):
  self.id=rid;self.b=b;w=4096 if rid=='_backdrop' else S['exports']['regionalWidth'];h=round(w*(b[3]-b[1])/(b[2]-b[0]));f=min(1,4096/max(w,h));self.w=round(w*f);self.h=round(h*f);self.cover=Image.new('RGBA',(self.w,self.h));self.built=Image.new('RGBA',(self.w,self.h));self.roads=Image.new('RGBA',(self.w,self.h));self.cd=ImageDraw.Draw(self.cover);self.bd=ImageDraw.Draw(self.built);self.rd=ImageDraw.Draw(self.roads);self.counts={'buildings':0,'roads':0,'preserve_landcover_areas':0}
 def intersects(self,b):return self.b[0]<b[2] and self.b[2]>b[0] and self.b[1]<b[3] and self.b[3]>b[1]
 def xy(self,x,v):return ((x-self.b[0])/(self.b[2]-self.b[0])*self.w,(self.b[3]-v)/(self.b[3]-self.b[1])*self.h)
 def save(self):
  for k in ['cover','built','roads']:getattr(self,k).save(D/(self.id+'-'+k+'.png'),optimize=True)
  (D/(self.id+'.json')).write_text(json.dumps({'bounds':self.b,'width':self.w,'height':self.h,'counts':self.counts})+'\n')
def extract(source):
 import osmium
 cs=[Canvas(r,b) for r,b in boxes().items()];factory=osmium.geom.GeoJSONFactory();wanted={'motorway','motorway_link','trunk','primary','secondary','tertiary','residential','unclassified','living_street'}
 def projected(points):
  xs,ys=T.transform([p[0] for p in points],[p[1] for p in points]);return [(x/1000,y/1000/math.sqrt(2)) for x,y in zip(xs,ys)]
 class Draw(osmium.SimpleHandler):
  def way(self,w):
   building=w.tags.get('building');highway=w.tags.get('highway')
   if not building and highway not in wanted:return
   ps=[(n.location.lon,n.location.lat) for n in w.nodes if n.location.valid()]
   if len(ps)<2:return
   x,v=projected([ps[0]])[0];near=[c for c in cs if c.b[0]-1<x<c.b[2]+1 and c.b[1]-1<v<c.b[3]+1 and (not building or c.id!='_backdrop')]
   if not near:return
   points=projected(ps)
   for c in near:
    xy=[c.xy(*p) for p in points]
    if building and len(points)>3:c.bd.polygon(xy,fill=[(194,177,149,150),(185,180,156,135),(213,193,162,155)][w.id%3]);c.counts['buildings']+=1
    elif highway in wanted:
     major=highway in ['motorway','trunk','primary'];c.rd.line(xy,fill=(251,244,223,220) if major else (184,172,145,105),width=2 if major else 1);c.counts['roads']+=1
  def area(self,a):
   land=a.tags.get('landuse');nature=a.tags.get('natural');leisure=a.tags.get('leisure')
   if leisure in ['park','nature_reserve','golf_course']:color=(166,190,139,115)
   elif land in ['forest','orchard'] or nature in ['wood','scrub']:color=(163,185,137,85)
   elif nature=='wetland':color=(172,194,153,95)
   elif land in ['farmland','meadow','grass']:color=(207,209,160,75)
   else:return
   try:g=json.loads(factory.create_multipolygon(a))
   except RuntimeError:return
   polygons=[[projected(ring) for ring in poly] for poly in g['coordinates']];points=[p for poly in polygons for ring in poly for p in ring]
   if not points:return
   b=[min(p[0] for p in points),min(p[1] for p in points),max(p[0] for p in points),max(p[1] for p in points)]
   for c in cs:
    if not c.intersects(b):continue
    for poly in polygons:
     for i,ring in enumerate(poly):c.cd.polygon([c.xy(*p) for p in ring],fill=color if i==0 else (0,0,0,0))
    c.counts['preserve_landcover_areas']+=1
 Draw().apply_file(str(source),locations=True,idx='flex_mem')
 for c in cs:c.save();print('EXTRACTED',c.id,c.counts,flush=True)
 (D/'osm-source.json').write_text(json.dumps({'source':'https://download.geofabrik.de/north-america/us/florida.html','snapshot':Path(source).name,'license':'OpenStreetMap contributors, ODbL 1.0'})+'\n')
def render(selected=None):
 import rasterio
 from rasterio.features import rasterize
 from rasterio.warp import reproject,Resampling
 from rasterio.transform import from_bounds
 from shapely.geometry import shape,box,mapping
 from shapely.ops import transform as geom_transform
 from scipy.ndimage import distance_transform_edt,gaussian_filter,binary_dilation
 from affine import Affine
 out=P/'outputs/regional-style-staging';out.mkdir(parents=True,exist_ok=True);archive=P/'work/regional-art';archive.mkdir(parents=True,exist_ok=True);srcmeta=P/'regional-art-sources.json'
 if not srcmeta.exists():
  sources=json.load(open(A/'regions/region-images.json'));sources['tampa-bay']={**sources['tampa-bay'],'file':'images/sarasota-bradenton.webp','camera':json.load(open(P/'outputs/region-images/sarasota-bradenton.json'))['camera'],'reference':'Approved Sarasota and Bradenton regional capture'}
  for rid,m in sources.items():shutil.copy2(A/'regions'/m['file'],archive/(rid+'.webp'));m['file']='work/regional-art/'+rid+'.webp'
  srcmeta.write_text(json.dumps(sources,indent=2)+'\n')
 sources=json.load(open(srcmeta));geo=json.load(open(P/'work/coastal_pipeline/overview-context.json'));land_shapes=[(geo['land'],255),(geo['context'],255)]
 def project(g):return geom_transform(lambda x,y,z=None:tuple(np.array(v)/1000 for v in T.transform(x,y)),g)
 registry=json.load(open(A/'regions/package-registry.json'));seen=set()
 for pkg in set(registry.values()):
  path=P/'work/coastal_pipeline/v4'/Path(pkg).name/'manifest.json'
  if not path.exists():continue
  m=json.load(open(path));ip=m['inputs']['land']['path'];key=(ip,tuple(m['bounds']))
  if key in seen:continue
  seen.add(key);clip=project(box(*m['bounds']));p=P/ip
  if not p.exists():continue
  local=project(shape(json.load(open(p)))).intersection(clip).simplify(.02,preserve_topology=True);land_shapes.extend([(mapping(clip),0),(mapping(local),255)])
 # Complete source masks have priority over legacy rectangular coverage gaps.
 for override in json.load(open(P/'regional-land-overrides.json')):
  m=json.load(open(P/override['manifest']));clip=project(box(*m['bounds']));local=project(shape(json.load(open(P/m['inputs']['land']['path'])))).intersection(clip).simplify(.02,preserve_topology=True);land_shapes.extend([(mapping(clip),0),(mapping(local),255)])
 coverdir=P/'work/coastal_pipeline/raw/regional-landcover';covermeta=json.load(open(coverdir/'index.json'));tiles=[]
 for t in covermeta['tiles']:
  if t.get('absent'):continue
  with Image.open(coverdir/t['file']) as im:tiles.append((t,np.array(im)))
 sys.path.insert(0,str(P/'work/coastal_pipeline/v4'));from mesh_export import read_triangles
 beach_shapes=[]
 for path in set(json.load(open(A/'regions/accurate-overviews.json')).values()):
  for color,vertices in read_triangles(A/'regions'/path/'base.glb.gz').items():
   if color not in ['#fffdf1','#fffef4','#fff7e7']:continue
   for tri in vertices.reshape(-1,3,3):beach_shapes.append(({'type':'Polygon','coordinates':[[[float(x),float(-z)] for x,y,z in [*tri,tri[0]]]]},255))
 print('BEACH_TRIANGLES',len(beach_shapes),flush=True)
 results=json.load(open(A/'regions/region-images.json')) if selected else {};reports=[]
 if selected:reports=[r for r in json.load(open(A/'regions/images/regional-style-report.json'))['regions'] if r['region'] not in selected]
 overrides=json.load(open(P/'regional-image-overrides.json'))
 for rid in ['_backdrop',*[r['id'] for r in regions]]:
  if selected and rid not in selected:continue
  if rid in overrides:
   results[rid]=overrides[rid];reports.append({'region':rid,'presentation':'approved-source','output_bytes':overrides[rid]['bytes'],'town_geometry_changed':False});continue
  m=json.load(open(D/(rid+'.json')));b=m['bounds'];W=m['width'];H=m['height'];y0=b[1]*math.sqrt(2);y1=b[3]*math.sqrt(2);transform_km=from_bounds(b[0],y0,b[2],y1,W,H);dst_transform=from_bounds(b[0]*1000,y0*1000,b[2]*1000,y1*1000,W,H);mask=rasterize(land_shapes,out_shape=(H,W),transform=transform_km,fill=0,dtype='uint8');classes=np.zeros((H,W),dtype='uint8');lons,lats=I.transform([b[0]*1000,b[2]*1000,b[0]*1000,b[2]*1000],[y0*1000,y0*1000,y1*1000,y1*1000]);gb=[min(lons),min(lats),max(lons),max(lats)]
  for t,a in tiles:
   west,south,east,north=t['bounds']
   if east<gb[0] or west>gb[2] or north<gb[1] or south>gb[3]:continue
   reproject(a,classes,src_transform=from_bounds(west,south,east,north,a.shape[1],a.shape[0]),src_crs='EPSG:4326',dst_transform=dst_transform,dst_crs=CRS,src_nodata=0,dst_nodata=0,init_dest_nodata=False,resampling=Resampling.nearest)
  land=mask>0;landcolor=np.zeros((H,W,3),dtype=np.float32);landcolor[:]=[238,227,204]
  for k,col in S['landcover'].items():
   rgb=[int(col[i:i+2],16) for i in [1,3,5]];landcolor[classes==int(k)]=rgb
  # Canopy grain is illustrative, confined to mapped forest/scrub/mangrove classes.
  rng=np.random.default_rng(20261019);noise=gaussian_filter(rng.normal(0,1,(H,W)).astype('float32'),.7)*4;wood=np.isin(classes,[10,20,90,95]);landcolor+=noise[:,:,None]*wood[:,:,None];landcolor=np.clip(gaussian_filter(landcolor,sigma=(.55,.55,0)),0,255).astype('uint8')
  dist=distance_transform_edt(~land,sampling=((y1-y0)/H,(b[2]-b[0])/W));emerald=rid in ['emerald-coast','forgotten-coast'];deep=S['water']['emeraldDeep'] if emerald else S['water']['deep'];sea=np.zeros_like(landcolor);sea[:]=[int(deep[i:i+2],16) for i in [1,3,5]]
  bands=S['water']['bandsKm'] if emerald else [d*.55 for d in S['water']['bandsKm']]
  for d,col in reversed(list(zip(bands,S['water']['shallows']))):sea[dist<d]=[int(col[i:i+2],16) for i in [1,3,5]]
  # Soft transitions retain readable depth steps without hard contour rings.
  sea=np.clip(gaussian_filter(sea.astype('float32'),sigma=(.7,.7,0)),0,255).astype('uint8');rgb=np.where(land[:,:,None],landcolor,sea);image=Image.fromarray(rgb).convert('RGBA');land_alpha=Image.fromarray(mask)
  florida=rasterize([(geo['land'],255)],out_shape=(H,W),transform=transform_km,fill=0,dtype='uint8')>0;row_north=np.linspace(y1,y0,H)[:,None]>735;admin=florida&binary_dilation((~florida)&land)&row_north
  fade=np.ones((H,W),dtype='float32')
  if admin.any():fade=np.clip(distance_transform_edt(~admin,sampling=((y1-y0)/H,(b[2]-b[0])/W))/5,0,1);fade[(~florida)&np.broadcast_to(row_north,(H,W))]=0
  osm_fade=Image.fromarray((fade*255).astype('uint8'))
  for suffix in ['cover','built','roads']:
   layer=Image.open(D/(rid+'-'+suffix+'.png')).convert('RGBA')
   if suffix=='cover':
    layer=layer.filter(ImageFilter.GaussianBlur(max(1.2,W/(b[2]-b[0])*1.2)));layer.putalpha(layer.getchannel('A').point(lambda a:round(a*.7)))
   layer.putalpha(ImageChops.multiply(ImageChops.multiply(layer.getchannel('A'),land_alpha),osm_fade));image.alpha_composite(layer)
  if beach_shapes:
   sand=rasterize(beach_shapes,out_shape=(H,W),transform=transform_km,fill=0,dtype='uint8');sand=ImageChops.multiply(Image.fromarray(sand),land_alpha);beach=Image.new('RGBA',(W,H),'#fffaf0');beach.putalpha(sand);image.alpha_composite(beach)
  if rid in sources:
   source=sources[rid];art=Image.open(P/source['file']).convert('RGB');a=np.array(art);blur=np.array(art.filter(ImageFilter.GaussianBlur(2)));edge=np.max(np.abs(a.astype('int16')-blur.astype('int16')),axis=2);blue=(a[:,:,2]>a[:,:,0]*.96)&(a[:,:,1]>a[:,:,0]*1.04);beige=np.max(np.abs(a.astype('int16')-np.array([228,215,185])),axis=2)<16;keep=np.where((edge>3)&~beige,190,0).astype('uint8');keep[(a.min(2)>235)&~blue]=220
   if rid=='tampa-bay':
    # Preserve the approved Sarasota/Bradenton illustration as the foreground.
    keep=np.where(blue|~beige,255,0).astype('uint8');alpha=Image.fromarray(keep).filter(ImageFilter.GaussianBlur(art.width/(source['camera']['right']-source['camera']['left'])*.8));border=Image.new('L',art.size);bd=ImageDraw.Draw(border)
    for i in range(65):bd.rectangle((i,i,art.width-1-i,art.height-1-i),fill=round(255*i/64))
    keep=np.array(ImageChops.multiply(alpha,border))
   art.putalpha(Image.fromarray(keep));c=source['camera'];ax0=c['target'][0]+c['left'];ax1=c['target'][0]+c['right'];av0=-c['target'][2]/math.sqrt(2)+c['bottom'];av1=-c['target'][2]/math.sqrt(2)+c['top'];sx=(ax1-ax0)/art.width;sv=(av1-av0)/art.height
   warped=art.transform((W,H),Image.Transform.AFFINE,((b[2]-b[0])/W/sx,0,(b[0]-ax0)/sx,0,(b[3]-b[1])/H/sv,(av1-b[3])/sv),Image.Resampling.BICUBIC)
   # Full-opacity signature detail remains local to real town positions; soft edges.
   towns_mask=Image.new('L',(W,H));td=ImageDraw.Draw(towns_mask);own=next(r for r in regions if r['id']==rid)['towns']
   for tid in own:
    t=towns[tid];x=(t['x']-b[0])/(b[2]-b[0])*W;v=(b[3]-t['y']/math.sqrt(2))/(b[3]-b[1])*H;rx=4.5/(b[2]-b[0])*W;ry=4.5/math.sqrt(2)/(b[3]-b[1])*H;td.ellipse((x-rx,v-ry,x+rx,v+ry),fill=255)
   towns_mask=towns_mask.filter(ImageFilter.GaussianBlur(max(2,W/(b[2]-b[0])*.8)));
   if rid!='tampa-bay':warped.putalpha(ImageChops.multiply(ImageChops.multiply(warped.getchannel('A'),towns_mask),land_alpha))
   image.alpha_composite(warped)
  file='context-world.webp' if rid=='_backdrop' else rid+'.webp'
  if rid!='_backdrop':
   fade=Image.new('L',(W,H));fd=ImageDraw.Draw(fade);n=S['exports']['edgeFadePixels']
   for i in range(n+1):fd.rectangle((i,i,W-1-i,H-1-i),fill=round(255*i/n))
   image.putalpha(fade)
  else:image=image.convert('RGB')
  image.save(out/file,quality=S['exports']['quality'],method=6);camera={'target':[(b[0]+b[2])/2,0,-(b[1]+b[3])/2*math.sqrt(2)],'left':-(b[2]-b[0])/2,'right':(b[2]-b[0])/2,'top':(b[3]-b[1])/2,'bottom':-(b[3]-b[1])/2,'tiltDegrees':45,'projection':'orthographic','mapUnits':'kilometers'};entry={'file':'images/'+file,'width':W,'height':H,'camera':camera,'bytes':(out/file).stat().st_size,'revision':hashlib.sha256((out/file).read_bytes()).hexdigest()[:16],'attribution':'© OpenStreetMap contributors, ODbL · ESA WorldCover 2021, CC BY 4.0 · normalized Census/TIGER context','styleReference':S['reference'],'waterColor':deep};report={**m,'region':rid,'output_bytes':entry['bytes'],'landcover_fraction':round(float(np.mean((classes>0)[land])),4),'sourceOnly':True};reports.append(report)
  if rid=='_backdrop':backdrop_entry=entry
  else:results[rid]=entry
  print('RENDERED',rid,W,H,entry['bytes'],flush=True)
 for file in out.glob('*.webp'):shutil.copy2(file,A/'regions/images'/file.name)
 if not selected or '_backdrop' in selected:(A/'regions/region-backdrop.json').write_text(json.dumps(backdrop_entry,indent=2)+'\n')
 (A/'regions/region-images.json').write_text(json.dumps(results,indent=2)+'\n');(A/'regions/images/regional-style-report.json').write_text(json.dumps({'reference':S['reference'],'osm':json.load(open(D/'osm-source.json')),'landcover':{k:v for k,v in covermeta.items() if k!='tiles'},'regions':reports,'town_geometry_changed':False},indent=2)+'\n')
if os_args[0]=='--extract':extract(Path(os_args[1]))
elif os_args[0]=='--render':render(set(os_args[1:]) or None)
else:raise SystemExit('Use --extract <osm.pbf> or --render')
