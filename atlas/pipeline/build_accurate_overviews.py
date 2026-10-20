"""Regional presentation from approved town geometry, never legacy icon scenes.
Town assets are read-only. Initial terrain/cover assets <4 MB; architecture is
streamed in 8 km chunks, with complete source roofs/walls instead of 1-in-11 homes.
Tampa/Pinellas gaps use separately attributed OSM/Microsoft building footprints.
"""
from pathlib import Path
import os,sys,json,gzip,math,collections,csv,urllib.request,hashlib
P=Path(__file__).resolve().parent;A=P.parent;os.chdir(P);sys.path[:0]=[str(P/'work/30a_finish'),str(P/'work/coastal_pipeline/v4')]
from geometry import *
from mesh_export import read_triangles,write_mesh
from overview_geometry import continuous_land,write_base,write_water,beach_index,asset_revision,coverage_bounds,COVERAGE
from shapely.strtree import STRtree
from shapely import constrained_delaunay_triangles,clip_by_rect
from shapely.prepared import prep
from PIL import Image,ImageDraw,ImageFilter,ImageChops
registry_output=Path(os.environ.get('ATLAS_OVERVIEW_REGISTRY',str(A/'regions/accurate-overviews.json')))
catalog=json.load(open(A/'regions/catalog.json'));registry=json.load(open(A/'regions/package-registry.json'));rules=json.load(open(P/'work/coastal_pipeline/v4/rules.json'));result=json.load(open(registry_output)) if registry_output.exists() else {}
geo=json.load(open(P/'work/coastal_pipeline/overview-context.json'));fallback=unary_union([shape(geo['land']),shape(geo['context'])]);selected=set(sys.argv[1:]);targets=set(COVERAGE)
def read(p):return json.load(gzip.open(p,'rt') if str(p).endswith('.gz') else open(p))
def iter_elements(path):
 # Download JSON is consumed incrementally; a full Florida suburb extract is large.
 decoder=json.JSONDecoder()
 with gzip.open(path,'rt') as f:
  buffer=''
  while '"elements"' not in buffer:buffer+=f.read(65536)
  buffer=buffer[buffer.index('[',buffer.index('"elements"'))+1:];finished=False
  while not finished:
   buffer=buffer.lstrip(' \r\n,')
   if buffer.startswith(']'):break
   try:
    value,end=decoder.raw_decode(buffer);buffer=buffer[end:];yield value
   except json.JSONDecodeError:
    part=f.read(65536)
    if not part:raise
    buffer+=part
def paint(g,draw,xy,fill):
 for poly in parts(g):
  if poly.is_empty:continue
  draw.polygon([xy(x,y) for x,y in poly.exterior.coords],fill=fill)
  for ring in poly.interiors:draw.polygon([xy(x,y) for x,y in ring.coords],fill=0 if isinstance(fill,int) else (0,0,0,0))
def extrude(groups,p,h,wc,rc,roof='gable'):
 z=.004+h*.84 if roof=='gable' else .004+h
 for poly in parts(p):
  ring=list(poly.exterior.coords)
  for a,b in zip(ring,ring[1:]):groups.setdefault(wc,[]).extend([(a[0],.004,-a[1]),(b[0],.004,-b[1]),(b[0],z,-b[1]),(a[0],.004,-a[1]),(b[0],z,-b[1]),(a[0],z,-a[1])])
  rect=list(poly.minimum_rotated_rectangle.exterior.coords);a=np.array(rect[1])-rect[0];b=np.array(rect[2])-rect[1];axis=a/np.linalg.norm(a) if np.linalg.norm(a)>np.linalg.norm(b) else b/np.linalg.norm(b);normal=np.array([-axis[1],axis[0]]);c=poly.centroid;w=min(np.linalg.norm(a),np.linalg.norm(b));center=np.array([c.x,c.y]);roofparts=split(poly,LineString([center-axis,center+axis])) if roof=='gable' else poly
  for q in parts(roofparts):
   for t in constrained_delaunay_triangles(q).geoms:
    groups.setdefault(rc,[]).extend([(x,z+(h*.16*max(0,1-abs(np.dot(np.array([x,y])-center,normal))/(w/2))) if roof=='gable' else z,-y) for x,y in list(t.exterior.coords)[:3]])
from shapely.ops import split
for region in catalog['regions']:
 rid=region['id']
 if selected and rid not in selected:continue
 paths=sorted({registry[t] for t in region['towns'] if t in registry})
 if not paths:continue
 print('START',rid,flush=True);out=A/'regions/overviews'/rid;out.mkdir(parents=True,exist_ok=True);packs=[]
 for path in paths:
  pkg=A/'regions'/path;name=pkg.name;src=P/'work/coastal_pipeline/v4'/name;m=read(src/'manifest.json');meta=read(pkg/'scene.json');inventory=read(pkg/'inventory.json');counts=collections.Counter(b['tile'] for b in inventory);by_tile=collections.defaultdict(list)
  for building in inventory:by_tile[building['tile']].append(building)
  packs.append({'path':pkg,'name':name,'m':m,'meta':meta,'inventory':inventory,'counts':counts,'byTile':by_tile,'clip':project(box(*m['bounds'])),'land':project(shape(read(P/m['inputs']['land']['path'])))})
 # Mainland context is continuous beyond the viewport; never crop it into an island.
 land=continuous_land(fallback,packs,rid,P/'work/30a_finish/source/geometry.json')
 base_bytes=write_base(out,land,packs);print('BASE',rid,base_bytes,flush=True)
 # At each 1 km source tile choose one complete town model, avoiding duplicate layers.
 owners={}
 for pack in packs:
  for key,count in pack['counts'].items():
   if key not in owners or count>owners[key]['counts'][key]:owners[key]=pack
 chunks={};owned=[];native_triangles=0
 for key,pack in owners.items():
  tilepath=pack['path']/(key+'.glb.gz')
  if not tilepath.exists():raise RuntimeError('Missing approved tile '+str(tilepath))
  _,ix,iy=key.rsplit('-',2) if '--' not in key else (None,None,None)
  # Gulf Coast projected coordinates include negative x, so parse signed tile IDs.
  import re
  ix,iy=map(int,re.match(r'tile-(-?\d+)-(-?\d+)$',key).groups());chunk=f'buildings-{math.floor(ix/8)}-{math.floor(iy/8)}';dest=chunks.setdefault(chunk,{})
  roofcolors={c for r in pack['meta']['recipes'].values() for c in r['roofs']}
  for color,vs in read_triangles(tilepath).items():
   tri=vs.reshape(-1,3,3);heights=tri[:,:,1];keep=(heights.max(1)>.0045)&((np.ptp(heights,axis=1)>.002)|(color in roofcolors));a=tri[keep].reshape(-1,3)
   if len(a):dest.setdefault(color,[]).append(a);native_triangles+=len(a)//3
  owned += pack['byTile'][key]
 # Native meshes are written before source-gap extraction to bound build memory.
 tile_records=[]
 def save_chunk(name,colors):
  size=write_mesh(out,'region',colors);(out/(name+'.glb.gz')).write_bytes((out/'region.glb.gz').read_bytes());import re
  ix,iy=map(int,re.match(r'(?:native-)?buildings-(-?\d+)-(-?\d+)$',name).groups());tile_records.append({'file':name+'.glb.gz','bounds':[ix*8,iy*8,(ix+1)*8,(iy+1)*8],'bytes':size})
 for key,colors in chunks.items():save_chunk('native-'+key,{c:np.concatenate(arrays) for c,arrays in colors.items()})
 chunks={};land_check=prep(land)
 print('NATIVE',rid,len(owned),native_triangles,flush=True)
 fills=collections.Counter();streets=[];source_notes=[]
 if rid in targets:
  raw=P/'work/coastal_pipeline/raw/regional-coverage'/(rid+'.json.gz')
  if not raw.exists():raise RuntimeError('Acquire regional coverage first: '+str(raw))
  beaches=beach_index(packs)
  bounds=COVERAGE[rid]['bounds'];occupied=STRtree([Point(b['x'],b['y']) for b in owned]);widths=np.array([b['width_m']/1000 for b in owned]);ids={b['id'] for b in owned if b['id']>0};all_osm=[]
  def add_building(poly,seed,tags,kind):
   if poly.is_empty or not poly.is_valid or (kind=='osm' and seed in ids):return
   p=project(poly);c=p.centroid
   if not land_check.covers(c):return
   index=occupied.nearest(c);distance=occupied.geometries[index].distance(c);threshold=max(.001,min(.018,widths[index]*.4))
   if distance<threshold or (kind=='osm' and seed in ids):return
   rect=list(p.minimum_rotated_rectangle.exterior.coords)
   if len(rect)<4:return
   width=min(math.dist(rect[0],rect[1]),math.dist(rect[1],rect[2]))
   if width<.003:return
   area=p.area*1e6;house=tags.get('building') in ['house','detached','bungalow','semidetached_house','terrace'] or (tags.get('building') in ['yes','residential'] and area<650 and not any(tags.get(k) for k in ['shop','amenity','office','tourism']))
   tower=rules['scale']['coastalBuildings'];tower_type=tags.get('building') in tower['types'] or tags.get('tourism') in ['hotel','resort']
   if area>=tower['minFootprintM2'] and len(beaches.geometries) and beaches.geometries[beaches.nearest(p)].distance(p)*1000<=tower['beachDistanceMeters']:tower_type=True
   if tower_type:house=False
   try:real=float(tags['height'].replace(' m','').replace('ft',''))*(.3048 if 'ft' in tags['height'] else 1)
   except (KeyError,ValueError,TypeError):
    try:real=float(tags['building:levels'])*rules['scale']['metersPerStorey']
    except (KeyError,ValueError,TypeError):
     storeys=rules['scale']['residentialStoreys'][seed%2] if house else min(tower['estimateMaxStoreys'],max(tower['estimateMinStoreys'],round(tower['estimateBaseStoreys']+math.sqrt(area)/tower['estimateSqrtAreaDivisor']))) if tower_type else 2 if area<1500 else 3
     real=storeys*rules['scale']['metersPerStorey']
   h=min(real*rules['scale']['buildings']/1000,width*(rules['scale']['houseMaxHeightToFootprint'] if house else rules['scale']['maxHeightToFootprint']))
   wc=['#e6d4b7','#d2dcca','#d9c6ad','#cfdbdd','#eee3cb'][seed%5];rc=['#b7c5c0','#9eafa8','#b7a08b'][seed%3];roof='gable' if house else 'flat';dest=chunks.setdefault(f'buildings-{math.floor(c.x/8)}-{math.floor(c.y/8)}',{});extrude(dest,p,h,wc,rc,roof);fills[kind]+=1
  for e in iter_elements(raw):
   tags=e['tags'];points=e.get('geometry',[])
   if tags.get('building') and len(points)>3:
    poly=Polygon([(p['lon'],p['lat']) for p in points]);
    if poly.is_valid:all_osm.append(project(poly));add_building(poly,e['id'],tags,'osm')
   elif tags.get('highway') and len(points)>1:
    if tags['highway'] in ['motorway','motorway_link','trunk','primary','secondary','tertiary','residential','living_street','unclassified','service']:
     line=project(LineString([(p['lon'],p['lat']) for p in points])).simplify(.005);width=.006 if tags['highway'] in ['motorway','trunk','primary'] else .003;streets.append(line.buffer(width/2,cap_style=2,join_style=2))
  print('OSM',rid,dict(fills),flush=True);osm_tree=STRtree(all_osm)
  def quad(lon,lat):
   x=int((lon+180)/360*512);y=int((1-math.asinh(math.tan(math.radians(lat)))/math.pi)/2*512);return ''.join(str(((x>>i)&1)+2*((y>>i)&1)) for i in range(8,-1,-1))
  keys={quad(x,y) for x in [bounds[0],bounds[2]] for y in [bounds[1],bounds[3]]};links=[r for r in csv.DictReader(open(P/'work/coastal_pipeline/downloads/ms-dataset-links.csv')) if r['Location']=='UnitedStates' and r['QuadKey'] in keys]
  for entry in links:
   path=P/'work/coastal_pipeline/raw'/('nature-ms-'+entry['QuadKey']+'.gz')
   if not path.exists():path.write_bytes(urllib.request.urlopen(entry['Url'],timeout=180).read())
   source_notes.append({'url':entry['Url'],'license':'CDLA Permissive 2.0','sha256':hashlib.sha256(path.read_bytes()).hexdigest()})
   for i,line in enumerate(gzip.open(path,'rt')):
    f=json.loads(line);ps=f['geometry']['coordinates'][0];x=sum(p[0] for p in ps)/len(ps);y=sum(p[1] for p in ps)/len(ps)
    if not(bounds[0]<x<bounds[2] and bounds[1]<y<bounds[3]):continue
    poly=shape(f['geometry']);projected=project(poly)
    if len(osm_tree.query(projected,predicate='intersects')):continue
    add_building(poly,i,{'building':'house' if projected.area<.00065 else 'yes'},'microsoft')
  for road in streets:
   for poly in parts(road if land_check.covers(road) else road.intersection(land)):
    if poly.is_empty:continue
    c=poly.centroid;dest=chunks.setdefault(f'buildings-{math.floor(c.x/8)}-{math.floor(c.y/8)}',{})
    for tri in constrained_delaunay_triangles(poly).geoms:dest.setdefault('#b6aa8e',[]).extend([(x,.004,-y) for x,y in list(tri.exterior.coords)[:3]])
  print('COVERAGE',rid,dict(fills),flush=True)
 for name,colors in chunks.items():
  if any(colors.values()):save_chunk(name,colors)
 chunks={}
 # Source-backed, softened land cover; never a default sparse tree scatter.
 towns=[t for t in catalog['towns'] if t['id'] in region['towns']];xs=[t['x'] for t in towns];ys=[t['y'] for t in towns];b=[min(xs)-15,min(ys)-15,max(xs)+15,max(ys)+15];W=1536;H=min(4096,max(512,round(W*(b[3]-b[1])/(b[2]-b[0]))));xy=lambda x,y:((x-b[0])/(b[2]-b[0])*W,(b[3]-y)/(b[3]-b[1])*H)
 canopy=Image.new('L',(W,H));draw=ImageDraw.Draw(canopy);tree_points={}
 for pack in packs:
  for f in read(P/pack['m']['inputs']['landcover']['path'])['features']:
   paint(project(shape(f['geometry'])),draw,xy,140)
  for name in pack['meta'].get('treeTiles',{}):
   for index,(x,y,*kind) in enumerate(read(pack['path']/(name+'.trees.json.gz'))):
    if index%41==0:tree_points[(round(x,3),round(y,3))]=[x,y,kind[0] if kind else 0]
    px,py=xy(x,y);r=max(.7,9/1000*W/(b[2]-b[0]));draw.ellipse((px-r,py-r,px+r,py+r),fill=220)
 (out/'trees.json.gz').write_bytes(gzip.compress(json.dumps(list(tree_points.values()),separators=(',',':')).encode(),mtime=0))
 canopy=canopy.filter(ImageFilter.GaussianBlur(.8));landmask=Image.new('L',(W,H));paint(clip_by_rect(land,*b),ImageDraw.Draw(landmask),xy,255);canopy=ImageChops.multiply(canopy,landmask);cover=Image.new('RGBA',(W,H),'#b4c998');cover.putalpha(canopy);cover.quantize(colors=128,method=Image.Quantize.FASTOCTREE).save(out/'canopy.png',optimize=True)
 # Approved shoreline color recipes, on the continuous vector base.
 write_water(land,b,out,rid)
 for name,colors in chunks.items():
  if any(colors.values()):save_chunk(name,colors)
 (out/'region.glb.gz').unlink(missing_ok=True)
 initial=base_bytes+sum((out/f).stat().st_size for f in ['canopy.png','water.png','trees.json.gz'])
 manifest={'id':rid,'base':'base.glb.gz','bounds':b,'canopy':'canopy.png','water':'water.png','trees':'trees.json.gz','scale':rules['scale'],'buildings':tile_records,'sourcePackages':[p['name'] for p in packs],'native_buildings':len(owned),'native_triangles':native_triangles,'coverage_buildings':dict(fills),'initial_bytes':initial,'total_building_bytes':sum(t['bytes'] for t in tile_records),'attribution':'© OpenStreetMap contributors, ODbL · ESA WorldCover 2021 CC BY 4.0 · Microsoft footprints, CDLA Permissive 2.0','supplemental_sources':source_notes,'notes':['Approved town geometry is read-only; region meshes retain the source wall and roof vertices.','OSM/Microsoft coverage fills use the existing 3× height and footprint caps; untagged houses are 1–2 stories.','Phone Region view retains terrain, cover and labels, without building clusters.','Source land cover/canopy positions are composited into a softened regional canopy layer.']}
 manifest['coverageBounds']=coverage_bounds(packs,rid);manifest['continuousCoverage']=rid in COVERAGE
 manifest['revision']=asset_revision(out,manifest)
 assert initial<4000000,(rid,initial)
 (out/'manifest.json').write_text(json.dumps(manifest,indent=2)+'\n');result[rid]='overviews/'+rid+'/';registry_output.write_text(json.dumps(result,indent=2)+'\n');print('DONE',rid,len(owned),dict(fills),initial,len(tile_records),flush=True)
