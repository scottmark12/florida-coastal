"""Same command/engine for every region. Inputs and district recipes are data only."""
import sys,hashlib,struct,gzip,csv
from pathlib import Path
sys.path.insert(0,'work/30a_finish')
from geometry import *
from shapely import constrained_delaunay_triangles
from shapely.ops import split
P=Path(__file__).parent;manifest=json.loads(Path(sys.argv[1]).read_text());rulefile=Path(manifest.get('rules_path',P/'rules.json'));rules=json.loads(rulefile.read_text());O=Path('outputs/coastal_pipeline')/manifest['id'];O.mkdir(parents=True,exist_ok=True)
clip=box(*manifest['bounds']);land=project(make_valid(shape(json.loads((P/manifest['land']).read_text()))).intersection(clip));groups={};inventory=[];manual=list(manifest['manual_review']);ds=manifest['districts']
def add(color,pts):groups.setdefault(color,[]).extend([[float(x),float(z),float(-y)] for x,y,z in pts])
def surf(p,z,color):
 for poly in parts(p):
  for t in constrained_delaunay_triangles(poly).geoms:add(color,[(x,y,z) for x,y in list(t.exterior.coords)[:3]])
def walls(p,z0,z1,color):
 for poly in parts(p):
  for ring in [poly.exterior,*poly.interiors]:
   for a,b in zip(ring.coords,list(ring.coords)[1:]):add(color,[(*a,z0),(*b,z0),(*b,z1),(*a,z0),(*b,z1),(*a,z1)])
surf(land,.002,'#f1e3c8')
# Optional normalized source layers use the same data contract in every region.
if manifest.get('landcover'):
 for f in json.loads(Path(manifest['landcover']).read_text()).get('features',[]):
  if f.get('geometry'):surf(project(make_valid(shape(f['geometry']))).intersection(land),.0035,'#bdcba5')
if manifest.get('shoreline'):
 coast=project(shape(json.loads(Path(manifest['shoreline']).read_text())))
 surf(coast.buffer(rules['sandWidthMeters']/1000).intersection(land),.006,'#fffdf1')
if manifest.get('roads'):
 for f in json.loads(Path(manifest['roads']).read_text()).get('features',[]):
  if not f.get('geometry'):continue
  g=project(shape(f['geometry']));width=.0012 if f.get('properties',{}).get('class') in ['footway','path','pedestrian','steps'] else .003
  surf(g.buffer(width,cap_style=2).intersection(land),.0065,'#b6aa8e')
features=json.loads((P/manifest['buildings']).read_text())['features'];missing=0
for f in features:
 if not f.get('geometry'):continue
 raw=make_valid(shape(f['geometry']));c=raw.centroid
 if not clip.covers(c):continue
 p=project(raw);c=p.centroid
 if not land.covers(c):continue
 rect=list(p.minimum_rotated_rectangle.exterior.coords)
 if len(rect)<4:continue
 w=min(math.dist(rect[0],rect[1]),math.dist(rect[1],rect[2]))
 if w<.003:continue
 d=min(ds,key=lambda d:(d['x']-c.x)**2+(d['y']-c.y)**2);style=d.get('style','urban');recipe=rules['recipes'].get(style,rules['recipes']['default']);props=f.get('properties',{});real=props.get(manifest['height_field']) if manifest['height_field'] else None
 if not real:
  try:real=float(props.get('levels') or 2)*rules['scale']['metersPerStorey']
  except:real=6
  missing+=1
 h=min(float(real)*rules['scale']['buildings']/1000,w*rules['scale']['maxHeightToFootprint']);seed=int(f.get('id',props.get('id',len(inventory))))
 wall=recipe['walls'][seed%len(recipe['walls'])];roof=recipe['roofs'][seed%len(recipe['roofs'])];z0=.003;z=z0+h*.76;walls(p,z0,z,wall)
 if recipe['roof']=='bermuda':
  current=p
  for i in range(7):
   q=p.buffer(-w*.045*(i+1),join_style=2)
   if q.is_empty:surf(current,z,roof);break
   surf(current.difference(q),z,roof);nz=z0+h*.76+h*.24*(i+1)/7;walls(q,z,nz,wall);current=q;z=nz
  else:surf(current,z,roof)
 elif recipe['roof']=='gable':
  # Split the actual polygon along its oriented ridge; retain courtyard holes.
  a=np.array(rect[1])-rect[0];b=np.array(rect[2])-rect[1];axis=a/np.linalg.norm(a) if np.linalg.norm(a)>=np.linalg.norm(b) else b/np.linalg.norm(b);normal=np.array([-axis[1],axis[0]]);center=np.array([c.x,c.y]);line=LineString([center-axis*10,center+axis*10]);pieces=split(p,line)
  for part in parts(pieces):
   for t in constrained_delaunay_triangles(part).geoms:add(roof,[(x,y,z0+h*.76+h*.24*max(0,1-abs(np.dot(np.array([x,y])-center,normal))/(w/2))) for x,y in list(t.exterior.coords)[:3]])
 else:surf(p,z,roof)
 inventory.append({'id':seed,'district':d['id'],'style':style,'height_m':h*1000,'footprint_width_m':w*1000})
# Portable GLB export, one material batch per color, float32 positions in kilometers.
binary=bytearray();views=[];accessors=[];materials=[];prims=[]
for color,vs in groups.items():
 a=np.asarray(vs,dtype='<f4');offset=len(binary);binary.extend(a.tobytes());views.append({'buffer':0,'byteOffset':offset,'byteLength':a.nbytes,'target':34962});accessors.append({'bufferView':len(views)-1,'componentType':5126,'count':len(a),'type':'VEC3','min':a.min(0).tolist(),'max':a.max(0).tolist()});rgb=[int(color[i:i+2],16)/255 for i in [1,3,5]];materials.append({'name':color,'pbrMetallicRoughness':{'baseColorFactor':rgb+[1],'metallicFactor':0,'roughnessFactor':1},'doubleSided':True});prims.append({'attributes':{'POSITION':len(accessors)-1},'material':len(materials)-1})
g={'asset':{'version':'2.0','generator':'Florida Coastal manifest pipeline'},'scene':0,'scenes':[{'nodes':[0]}],'nodes':[{'mesh':0}],'meshes':[{'primitives':prims}],'materials':materials,'buffers':[{'byteLength':len(binary)}],'bufferViews':views,'accessors':accessors};j=json.dumps(g,separators=(',',':')).encode();j+=b' '*((-len(j))%4);binary+=b'\0'*((-len(binary))%4);glb=struct.pack('<4sII',b'glTF',2,28+len(j)+len(binary))+struct.pack('<I4s',len(j),b'JSON')+j+struct.pack('<I4s',len(binary),b'BIN\0')+binary;(O/'region.glb').write_bytes(glb);(O/'region.glb.gz').write_bytes(gzip.compress(glb,9))
rows=[]
for d in ds:
 lon,lat=I.transform(d['x']*1000,d['y']*1000);source=d.get('positionSource');err=None
 if source:
  ox,oy=T.transform(d['lon'],d['lat']);err=math.hypot(d['x']*1000-ox,d['y']*1000-oy)
 rows.append({'district':d['name'],'model_x_km':d['x'],'model_y_km':d['y'],'model_lon':lon,'model_lat':lat,'source_lon':d.get('lon') if source else '', 'source_lat':d.get('lat') if source else '', 'error_m':err if err is not None else '', 'source':source or 'UNVERIFIED guide coordinate'})
with (O/'accuracy.csv').open('w',newline='') as f:wri=csv.DictWriter(f,fieldnames=rows[0]);wri.writeheader();wri.writerows(rows)
if missing:manual.append(f'{missing} building heights lack verified meter values; replace the marked two-story/levels estimates before approval.')
size=(O/'region.glb.gz').stat().st_size
if size>rules['maxRegionBytes']:manual.append(f'Region export is {size:,} compressed bytes; split Town detail into lazy-loaded tiles to meet the 4 MB limit.')
manual.append('Visual district recognition, landmark silhouettes and physical-phone load time require human review; generated massing is not approval.')
report={'region':manifest['id'],'engine_sha256':hashlib.sha256(Path(__file__).read_bytes()).hexdigest(),'rules_sha256':hashlib.sha256(rulefile.read_bytes()).hexdigest(),'buildings':len(inventory),'raw_bytes':len(glb),'gzip_bytes':size,'max_height_width_ratio':max(i['height_m']/i['footprint_width_m'] for i in inventory),'manual_fixes':manual,'status':'test export; not production approved'}
(O/'report.json').write_text(json.dumps(report,indent=2));(O/'districts.json').write_text(json.dumps(ds));(O/'inventory.json').write_text(json.dumps(inventory,separators=(',',':')));print(json.dumps(report,indent=2),flush=True)
