"""Reusable tiled illustration export. No region-specific branches."""
import sys,json,struct,gzip,hashlib,csv,math
from pathlib import Path
sys.path.insert(0,'work/coastal_pipeline/v4');from preflight import preflight
from geometry import *
from shapely import constrained_delaunay_triangles
from shapely.ops import split
from shapely.strtree import STRtree
HERE=Path(__file__).parent
m=json.loads(Path(sys.argv[1]).read_text());rules=json.loads((HERE/'rules.json').read_text());regional=json.load(open(m['recipes']));rules['recipes']=regional['recipes'];rules['styleZones']=regional.get('styleZones',[]);rules['oceanBeachZones']=regional.get('oceanBeachZones',[]);rules['landmarks']=regional.get('landmarks',{});bs,ds,anchors,issues=preflight(m,rules)
O=Path('outputs/coastal_pipeline_v4')/m['id'];O.mkdir(parents=True,exist_ok=True)
if issues: (O/'report.json').write_text(json.dumps({'issues':issues},indent=2));raise SystemExit(str(issues))
clip=box(*m['bounds']);land=project(shape(json.loads(Path(m['inputs']['land']['path']).read_text())));coast=project(shape(json.loads(Path(m['inputs']['shoreline']['path']).read_text())))
groups={};current='base';inventory=[];building_polys=[];centers=[];details=[]
def add(color,pts):groups.setdefault(current,{}).setdefault(color,[]).extend([(float(x),float(z),float(-y)) for x,y,z in pts])
def surf(p,z,color):
 for poly in parts(p):
  if poly.area<1e-10:continue
  for t in constrained_delaunay_triangles(poly).geoms:add(color,[(x,y,z) for x,y in list(t.exterior.coords)[:3]])
def walls(p,z0,z1,color):
 for poly in parts(p):
  for ring in [poly.exterior,*poly.interiors]:
   for a,b in zip(ring.coords,list(ring.coords)[1:]):add(color,[(*a,z0),(*b,z0),(*b,z1),(*a,z0),(*b,z1),(*a,z1)])
def tiled_ground(p,z,color):
 global current
 minx,miny,maxx,maxy=p.bounds
 for ix in range(math.floor(minx),math.floor(maxx)+1):
  for iy in range(math.floor(miny),math.floor(maxy)+1):
   current=f'tile-{ix}-{iy}';surf(p.intersection(box(ix,iy,ix+1,iy+1)),z,color)
 current='base'
# Cache only geometry, keyed by every geometry input and the construction code.
import pickle,os
cache_inputs=[m['recipes'],m['inputs']['land']['path'],m['inputs']['shoreline']['path'],m['inputs']['landcover']['path'],m['inputs']['roads']['path'],m['inputs']['districts'],*m['inputs']['osm']]
if m['inputs'].get('context'):cache_inputs.append(m['inputs']['context']['path'])
geometry_source=Path(__file__).read_text();geometry_start=geometry_source.index('\n # Geographic geometry')+1;geometry_end=geometry_source.index('\n with cache_path.open',geometry_start);geometry_code='\n'.join(line[1:] for line in geometry_source[geometry_start:geometry_end].splitlines())+'\n'
cache_key=hashlib.sha256((geometry_code+json.dumps(rules['scale'])+json.dumps(m['bounds'])+''.join(hashlib.sha256(Path(p).read_bytes()).hexdigest() for p in cache_inputs)).encode()).hexdigest()
cache_path=HERE/m['id']/'geometry-cache.pkl'
if cache_path.exists() and (HERE/m['id']/'geometry-cache.sha256').read_text()==cache_key:
 with cache_path.open('rb') as handle:groups,inventory,building_polys,roads,es=pickle.load(handle)
 print('Reused unchanged geometry cache',flush=True)
else:
 # Geographic geometry is shared by all LODs; no islands or relocated clusters.
 # Continuous shoreline wash exported separately; geographic land remains exact.
 surf(land.simplify(.005,preserve_topology=True),.002,rules['palette']['land'])
 tiled_ground(land,.0021,rules['palette']['land'])
 if m['inputs'].get('context'):
  context=shape(json.load(open(m['inputs']['context']['path'])));surf(context.simplify(.025,preserve_topology=True),.0015,rules['palette']['land'])
 # Sand belongs on the ocean face, not around every bay: mapped beach polygons are used when available.
 es=[e for path in m['inputs']['osm'] for e in json.load(gzip.open(path,'rt') if path.endswith('.gz') else open(path))['elements']];beaches=[]
 for e in es:
  if e.get('tags',{}).get('natural')=='beach':
   p=polygons(e)
   if not p.is_empty:beaches.append(project(p).intersection(land))
 for p in beaches:surf(p,.003,'#fffdf1')
 # Ocean-facing sand ribbon, sourced from oriented OSM shoreline segments.
 # Styling width is 60 m inland; it does not move the actual land/water boundary.
 for zone in rules.get('oceanBeachZones',[]):
  segments=[]
  for e in es:
   if e.get('tags',{}).get('natural')!='coastline':continue
   pts=e.get('geometry',[])
   for a,b in zip(pts,pts[1:]):
    line=LineString([(a['lon'],a['lat']),(b['lon'],b['lat'])])
    if b['lat']>a['lat'] and box(*zone).covers(line.centroid):segments.append(project(line))
  if segments:surf(unary_union(segments).buffer(.06,quad_segs=6).intersection(land),.0031,'#fffdf1')
 cover=[]
 for f in json.load(open(m['inputs']['landcover']['path']))['features']:
  p=project(make_valid(shape(f['geometry']))).intersection(land)
  if p.is_empty:continue
  cover.append(p);surf(p.simplify(.025,preserve_topology=True),.003,'#c3cfac');tiled_ground(p,.0031,'#c3cfac')
 roads=[]
 for f in json.load(open(m['inputs']['roads']['path']))['features']:
  p=project(shape(f['geometry']));cl=f['properties'].get('class');bridge=f['properties'].get('bridge') in ['yes','viaduct']
  if cl in ['service','steps','track','construction','proposed']:continue
  width=.0014 if cl in ['path','footway','cycleway'] else .004 if cl in ['motorway','trunk','primary'] else .0026
  g=p.simplify(.001).buffer(width,cap_style=2,join_style=2,quad_segs=1);g=g if bridge else g.intersection(land)
  color='#e1d7bd' if cl in ['path','footway','cycleway'] else '#b4b7ab'
  if cl in ['motorway','trunk','primary','secondary'] or bridge:
   current='base';surf(g,.004 if not bridge else .008,color)
  else:
   minx,miny,maxx,maxy=g.bounds if not g.is_empty else (0,0,-1,-1)
   for ix in range(math.floor(minx),math.floor(maxx)+1):
    for iy in range(math.floor(miny),math.floor(maxy)+1):
     current=f'tile-{ix}-{iy}';surf(g.intersection(box(ix,iy,ix+1,iy+1)),.004,color)
  roads.append(p)
 # Source paths select promenade geometry; only its display width is exaggerated.
 for feature in regional.get('linearLandmarks',[]):
  zone=project(box(*feature['bounds']));seen_paths=set()
  for e in es:
   tags=e.get('tags',{});coords=e.get('geometry',[])
   if e['id'] in seen_paths or tags.get('highway') not in feature['highways'] or len(coords)<2:continue
   seen_paths.add(e['id']);line=project(LineString([(q['lon'],q['lat']) for q in coords])).intersection(zone)
   if line.is_empty or line.distance(coast)>feature['coastDistanceMeters']/1000:continue
   for segment in getattr(line,'geoms',[line]):
    if segment.geom_type!='LineString' or segment.length<.015:continue
    current=f'tile-{math.floor(segment.centroid.x)}-{math.floor(segment.centroid.y)}'
    surf(segment.buffer(feature['widthMeters']/2000).intersection(land),.0048,'#fff2d8')
    # Waterside rail is chosen by proximity to the sourced coast.
    edges=[segment.offset_curve(sign*feature['widthMeters']/2000) for sign in [-1,1]]
    edge=min(edges,key=lambda q:q.distance(coast))
    rail=edge.buffer(.00045);walls(rail,.0075,.008,'#fff8e8');surf(rail,.008,'#fff8e8')
    for t in np.arange(0,edge.length,.004):
     q=edge.interpolate(t).buffer(.00065,quad_segs=2);walls(q,.0048,.008,'#f7ecd8');surf(q,.008,'#fff9eb')
 for i,f in enumerate(bs):
  raw=make_valid(shape(f['geometry']));c=raw.centroid
  if not clip.covers(c):continue
  p=project(raw);c=p.centroid
  if not land.covers(c):continue
  rect=list(p.minimum_rotated_rectangle.exterior.coords)
  if len(rect)<4:continue
  w=min(math.dist(rect[0],rect[1]),math.dist(rect[1],rect[2]))
  if w<.003:continue
  props=f['properties'];seed=props['id'];d=min(ds,key=lambda d:(d['x']-c.x)**2+(d['y']-c.y)**2);recipe=rules['recipes'][d['style']]
  for zone in rules.get('styleZones',[]):
   if box(*zone['bounds']).covers(raw.centroid):recipe=rules['recipes'][zone['recipe']];break
  house=props.get('building_type') in ['house','detached','semidetached_house','bungalow','terrace'] or (recipe.get('detail')=='painted-wood-porches' and props.get('building_type') in ['yes','residential'] and not props.get('use') and p.area<.00065 and w<.025 and (props.get('height_m') or 0)<20)
  real=props.get('height_m');source='height'
  if real is None:
   try:real=float(props.get('levels'))*rules['scale']['metersPerStorey'];source='levels'
   except (ValueError,TypeError):real=rules['scale']['residentialStoreys'][seed%2]*rules['scale']['metersPerStorey'];source='assumed'
   if house:real=max(3,min(real,2*rules['scale']['metersPerStorey']))
  landmark=rules.get('landmarks',{}).get(props['osm_type']+'/'+str(seed),{})
  if landmark.get('illustratedRealHeightMeters') is not None:real=landmark['illustratedRealHeightMeters'];source='landmark-recipe'
  if landmark.get('recipe'):recipe=rules['recipes'][landmark['recipe']]
  h=min(real*rules['scale']['buildings']/1000,w*(rules['scale']['houseMaxHeightToFootprint'] if house else rules['scale']['maxHeightToFootprint']));tile=f'tile-{math.floor(c.x)}-{math.floor(c.y)}';current=tile
  z0=.004;z=z0+h*(.76 if recipe['roof']=='bermuda' else .84 if recipe['roof']=='gable' and (house or h<.035) else 1);wc=recipe['walls'][seed%len(recipe['walls'])];rc=recipe['roofs'][seed%len(recipe['roofs'])]
  if landmark.get('walls'):wc=landmark['walls'][0]
  profile=landmark.get('profile')
  if profile:
   for level,(fraction,inset) in enumerate(profile):
    q=p.buffer(-w*inset,join_style=2);top=z0+h*(profile[level+1][0] if level+1<len(profile) else 1)
    if not q.is_empty:walls(q,z0+h*fraction,top,wc);surf(q,top,rc)
  else:walls(p,z0,z,wc)
  if landmark.get('diagonalFrame'):
   for a,b in zip(rect,rect[1:]):
    a=np.array(a);b=np.array(b);along=(b-a);unit=along/np.linalg.norm(along)*.001
    for reverse in [False,True]:
     aa,bb=(a,b) if not reverse else (b,a)
     add('#f5f0df',[(*(aa-unit),z0),(*(aa+unit),z0),(*(bb+unit),z),(*(aa-unit),z0),(*(bb+unit),z),(*(bb-unit),z)])
  if profile:pass
  elif recipe['roof']=='gable' and (house or h<.035):
   a=np.array(rect[1])-rect[0];b=np.array(rect[2])-rect[1];axis=a/np.linalg.norm(a) if np.linalg.norm(a)>=np.linalg.norm(b) else b/np.linalg.norm(b);normal=np.array([-axis[1],axis[0]]);center=np.array([c.x,c.y]);pieces=split(p,LineString([center-axis,center+axis]))
   for part in parts(pieces):
    for t in constrained_delaunay_triangles(part).geoms:add(rc,[(x,y,z+h*.16*max(0,1-abs(np.dot(np.array([x,y])-center,normal))/(w/2))) for x,y in list(t.exterior.coords)[:3]])
  elif recipe['roof']=='bermuda':
   current_roof=p;bottom=z0+h*.76
   for level in range(7):
    q=p.buffer(-w*.045*(level+1),join_style=2)
    if q.is_empty:surf(current_roof,bottom,rc);break
    surf(current_roof.difference(q),bottom,rc);top=z0+h*.76+h*.24*(level+1)/7;walls(q,bottom,top,wc);current_roof=q;bottom=top
   else:surf(current_roof,bottom,rc)
  else:surf(p,z,rc)
  # Painted timber siding follows source wall planes without changing footprints.
  if recipe.get('detail')=='painted-wood-porches' and house:
   ring=p.buffer(.00012,join_style=2).difference(p)
   for lev in np.arange(z0+.001,z,.001):surf(ring,lev,wc)
  # Crisp horizontal facade bands on larger buildings; low-rise Deco parapets.
  if h>.035 and not profile and not house:
   ring=p.buffer(.00028,join_style=2).difference(p.buffer(-.0004,join_style=2))
   for lev in np.arange(z0+.009,z,.009):surf(ring,lev,recipe.get('trim',['#eee9d8'])[seed%len(recipe.get('trim',['#eee9d8']))])
  elif recipe.get('detail')=='deco':
   parapet=p.difference(p.buffer(-.0007,join_style=2));trim=recipe.get('trim',['#82b7ae'])[seed%len(recipe.get('trim',['#82b7ae']))];walls(parapet,z-.002,z,trim);surf(parapet,z,'#fff7e5')
   # Projecting eyebrows and colored trim follow the actual footprint.
   ring=p.buffer(.0008,join_style=2).difference(p)
   for lev in np.arange(z0+.008,z,.009):surf(ring,lev,trim)
   # Facade window strips retain the underlying OSM wall planes.
   for a,b in zip(rect,rect[1:]):
    a=np.array(a);b=np.array(b)
    for t in np.arange(.15,.85,.2):
     aa=a+(b-a)*t;bb=a+(b-a)*(t+.09)
     for lev in np.arange(z0+.003,z-.003,.009):add('#7ba4a7',[(*aa,lev),(*bb,lev),(*bb,lev+.003),(*aa,lev),(*bb,lev+.003),(*aa,lev+.003)])
  # Region LOD uses all significant buildings and deterministic small-building sampling.
  if h>.065 or seed%11==0:
   current='region';q=p.simplify(.001,preserve_topology=True);walls(q,z0,z,wc);surf(q,z,rc)
  building_polys.append(p);centers.append(c);inventory.append({'id':seed,'district':d['id'],'x':c.x,'y':c.y,'height_m':h*1000,'real_height_m':real,'height_source':source,'house':house,'osm_height_m':props.get('height_m'),'width_m':w*1000,'tile':tile,'osm_type':props['osm_type']})
 with cache_path.open('wb') as handle:pickle.dump((groups,inventory,building_polys,roads,es),handle,protocol=5)
 (HERE/m['id']/'geometry-cache.sha256').write_text(cache_key)
 print('Geometry built and cached',flush=True)
# Source-only canopy, with a release failure for districts lacking source evidence.
from source_canopy import source_canopy
trees,canopy_audit=source_canopy(m,es,ds,rules['recipes'],land,building_polys,roads,rules)
(O/'canopy-sources.json').write_text(json.dumps(canopy_audit,indent=2))
# Float32 export is measured after serialization, not from copied guide coordinates.
from mesh_export import write_mesh
def export(name,colors):
 return write_mesh(O,name,colors)
sizes={name:export(name,colors) for name,colors in groups.items()}
for row in anchors:
 row['model_x_km']=float(np.float32(row['model_x_km']));row['model_y_km']=float(np.float32(row['model_y_km']));ox,oy=T.transform(row['osm_lon'],row['osm_lat']);row['distance_m']=round(math.hypot(row['model_x_km']*1000-ox,row['model_y_km']*1000-oy),4)
with (O/'accuracy.csv').open('w',newline='') as f:w=csv.DictWriter(f,fieldnames=anchors[0]);w.writeheader();w.writerows(anchors)
# Boundary serialization audit, including float32 rounding on every mapped coastline vertex.
errs=[]
for line in getattr(coast,'geoms',[coast]):
 for x,y in line.coords:errs.append(math.hypot(float(np.float32(x))-x,float(np.float32(y))-y)*1000)
center=project(clip).centroid
tree_tiles={}
for point in trees:
 key=f'tile-{math.floor(point[0])}-{math.floor(point[1])}'
 tree_tiles.setdefault(key,[]).append(point)
for key,points in tree_tiles.items():(O/(key+'.trees.json.gz')).write_bytes(gzip.compress(json.dumps(points,separators=(',',':')).encode()))
meta={'crownProfiles':canopy_audit.get('crown_profiles',{}),'canopyAttribution': 'Canopy: '+('ESA WorldCover 2021 v200 (CC BY 4.0) · ' if any('worldcover' in r['path'] for r in m['inputs'].get('canopyRasters',[])) else '')+('Tampa / USF 2021 · ' if any('usf.edu' in r['source'] for r in m['inputs'].get('canopyRasters',[])) else '')+'OSM · illustrated crowns','treeTiles':{key:len(points) for key,points in tree_tiles.items()},'camera':m['camera'],'recipes':rules['recipes'],'id':m['id'],'districts':ds,'center':[center.x,center.y],'regionSpan':max(project(clip).bounds[2]-project(clip).bounds[0],20),'tiles':{k:v for k,v in sizes.items() if k.startswith('tile')},'trees':[],'palette':rules['palette'],'scale':rules['scale'],'bounds':project(clip).bounds,'attribution':'© OpenStreetMap contributors · ODbL'}
(O/'scene.json').write_text(json.dumps(meta,separators=(',',':')));(O/'inventory.json').write_text(json.dumps(inventory,separators=(',',':')))
report={'region':m['id'],'building_count':len(inventory),'tree_count':len(trees),'region_bytes':sizes['base']+sizes['region'],'max_tile_bytes':max(v for k,v in sizes.items() if k.startswith('tile')),'max_anchor_error_m':max(r['distance_m'] for r in anchors),'max_coast_float32_error_m':max(errs),'height_sources':{k:sum(i['height_source']==k for i in inventory) for k in ['height','levels','assumed']},'max_height_width_ratio':max(i['height_m']/i['width_m'] for i in inventory),'engine_sha256':hashlib.sha256(Path(__file__).read_bytes()).hexdigest(),'phone_hardware_verified':False,'notes':['Source-alignment checks are not independent survey accuracy.','Canopy extent is sourced; crowns within canopy polygons are illustrative. See canopy-sources.json.','Unmapped heights remain explicitly flagged estimates.'],'status':'candidate; visual QA required'}
(O/'report.json').write_text(json.dumps(report,indent=2));print(json.dumps(report,indent=2))
