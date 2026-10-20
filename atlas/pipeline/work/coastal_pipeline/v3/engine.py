"""Reusable tiled illustration export. No region-specific branches."""
import sys,json,struct,gzip,hashlib,csv,math
from pathlib import Path
sys.path.insert(0,'work/coastal_pipeline/v2');from pipeline import preflight
from geometry import *
from shapely import constrained_delaunay_triangles
from shapely.ops import split
from shapely.strtree import STRtree
HERE=Path(__file__).parent
m=json.loads(Path(sys.argv[1]).read_text());rules=json.loads((HERE/'rules.json').read_text());bs,ds,anchors,issues=preflight(m,rules)
O=Path('outputs/coastal_pipeline_v3')/m['id'];O.mkdir(parents=True,exist_ok=True)
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
# Geographic geometry is shared by all LODs; no islands or relocated clusters.
# Continuous shoreline wash exported separately; geographic land remains exact.
surf(land,.002,rules['palette']['land'])
if m['inputs'].get('context'):
 context=shape(json.load(open(m['inputs']['context']['path'])));surf(context.simplify(.025,preserve_topology=True),.0015,rules['palette']['land'])
# Sand belongs on the ocean face, not around every bay: mapped beach polygons are used when available.
es=[e for path in m['inputs']['osm'] for e in json.load(open(path))['elements']];beaches=[]
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
 cover.append(p);surf(p.simplify(.001),.003,'#c3cfac')
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
 real=props.get('height_m');source='height'
 if real is None:
  try:real=float(props.get('levels'))*rules['scale']['metersPerStorey'];source='levels'
  except (ValueError,TypeError):real=rules['scale']['defaultResidentialStoreys']*rules['scale']['metersPerStorey'];source='assumed'
 landmark=rules.get('landmarks',{}).get(props['osm_type']+'/'+str(seed),{})
 h=min(real*rules['scale']['buildings']/1000,w*rules['scale']['maxHeightToFootprint']);tile=f'tile-{math.floor(c.x)}-{math.floor(c.y)}';current=tile
 z0=.004;z=z0+h*(.76 if recipe['roof']=='bermuda' else .84 if recipe['roof']=='gable' and h<.035 else 1);wc=recipe['walls'][seed%len(recipe['walls'])];rc=recipe['roofs'][seed%len(recipe['roofs'])]
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
 elif recipe['roof']=='gable' and h<.035:
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
 # Crisp horizontal facade bands on larger buildings; low-rise Deco parapets.
 if h>.035 and not profile:
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
 building_polys.append(p);centers.append(c);inventory.append({'id':seed,'district':d['id'],'x':c.x,'y':c.y,'height_m':h*1000,'real_height_m':real,'height_source':source,'width_m':w*1000,'tile':tile,'osm_type':props['osm_type']})
# Gap-aware planting, never buildings or streets; illustrative, not surveyed trees.
occupied=STRtree(building_polys);roadtree=STRtree(roads);rng=np.random.default_rng(1701);trees=[]
for park in cover:
 minx,miny,maxx,maxy=park.bounds
 for x in np.arange(minx,maxx,.024):
  for y in np.arange(miny,maxy,.024):
   p=Point(x+rng.uniform(-.007,.007),y+rng.uniform(-.007,.007))
   if not park.contains(p) or len(occupied.query(p.buffer(.008),predicate='intersects')) or len(roadtree.query(p.buffer(.005),predicate='intersects')):continue
   trees.append([round(p.x,5),round(p.y,5),int(rng.random()<.45)])
# Street-side trees add domestic scale without a forest blanket.
for road in roads:
 if road.length>.4:continue
 for t in np.arange(.02,road.length,.045):
  p=road.interpolate(t);p=Point(p.x+.008,p.y+.008)
  if not land.contains(p) or len(occupied.query(p.buffer(.006),predicate='intersects')) or len(roadtree.query(p.buffer(.003),predicate='intersects')):continue
  trees.append([round(p.x,5),round(p.y,5),int(rng.random()<.65)])
# Float32 export is measured after serialization, not from copied guide coordinates.
def export(name,colors):
 binary=bytearray();views=[];acc=[];mats=[];prims=[]
 for color,vs in colors.items():
  a=np.asarray(vs,dtype='<f4');offset=len(binary);binary.extend(a.tobytes());views.append({'buffer':0,'byteOffset':offset,'byteLength':a.nbytes,'target':34962});acc.append({'bufferView':len(views)-1,'componentType':5126,'count':len(a),'type':'VEC3','min':a.min(0).tolist(),'max':a.max(0).tolist()});rgb=[int(color[i:i+2],16)/255 for i in [1,3,5]];rgb=[v/12.92 if v<=.04045 else ((v+.055)/1.055)**2.4 for v in rgb];mats.append({'name':color,'pbrMetallicRoughness':{'baseColorFactor':rgb+[1],'metallicFactor':0,'roughnessFactor':1},'doubleSided':True});prims.append({'attributes':{'POSITION':len(acc)-1},'material':len(mats)-1})
 g={'asset':{'version':'2.0','generator':'Florida Coastal reusable tiled pipeline'},'scene':0,'scenes':[{'nodes':[0]}],'nodes':[{'mesh':0}],'meshes':[{'primitives':prims}],'materials':mats,'buffers':[{'byteLength':len(binary)}],'bufferViews':views,'accessors':acc};j=json.dumps(g,separators=(',',':')).encode();j+=b' '*((-len(j))%4);binary+=b'\0'*((-len(binary))%4);glb=struct.pack('<4sII',b'glTF',2,28+len(j)+len(binary))+struct.pack('<I4s',len(j),b'JSON')+j+struct.pack('<I4s',len(binary),b'BIN\0')+binary
 data=gzip.compress(glb,9);(O/(name+'.glb.gz')).write_bytes(data);return len(data)
sizes={name:export(name,colors) for name,colors in groups.items()}
for row in anchors:
 row['model_x_km']=float(np.float32(row['model_x_km']));row['model_y_km']=float(np.float32(row['model_y_km']));ox,oy=T.transform(row['osm_lon'],row['osm_lat']);row['distance_m']=round(math.hypot(row['model_x_km']*1000-ox,row['model_y_km']*1000-oy),4)
with (O/'accuracy.csv').open('w',newline='') as f:w=csv.DictWriter(f,fieldnames=anchors[0]);w.writeheader();w.writerows(anchors)
# Boundary serialization audit, including float32 rounding on every mapped coastline vertex.
errs=[]
for line in getattr(coast,'geoms',[coast]):
 for x,y in line.coords:errs.append(math.hypot(float(np.float32(x))-x,float(np.float32(y))-y)*1000)
center=project(clip).centroid
meta={'recipes':rules['recipes'],'id':m['id'],'districts':ds,'center':[center.x,center.y],'regionSpan':max(project(clip).bounds[2]-project(clip).bounds[0],20),'tiles':{k:v for k,v in sizes.items() if k.startswith('tile')},'trees':trees,'palette':rules['palette'],'scale':rules['scale'],'bounds':project(clip).bounds,'attribution':'© OpenStreetMap contributors · ODbL'}
(O/'scene.json').write_text(json.dumps(meta,separators=(',',':')));(O/'inventory.json').write_text(json.dumps(inventory,separators=(',',':')))
report={'region':m['id'],'building_count':len(inventory),'tree_count':len(trees),'region_bytes':sizes['base']+sizes['region'],'max_tile_bytes':max(v for k,v in sizes.items() if k.startswith('tile')),'max_anchor_error_m':max(r['distance_m'] for r in anchors),'max_coast_float32_error_m':max(errs),'height_sources':{k:sum(i['height_source']==k for i in inventory) for k in ['height','levels','assumed']},'max_height_width_ratio':max(i['height_m']/i['width_m'] for i in inventory),'engine_sha256':hashlib.sha256(Path(__file__).read_bytes()).hexdigest(),'phone_hardware_verified':False,'notes':['Source-alignment checks are not independent survey accuracy.','Trees are illustrative gap-aware placement.','Unmapped heights remain explicitly flagged estimates.'],'status':'candidate; visual QA required'}
(O/'report.json').write_text(json.dumps(report,indent=2));print(json.dumps(report,indent=2))
