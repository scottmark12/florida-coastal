from geometry import *
import struct,gzip,random,collections
from shapely import constrained_delaunay_triangles, prepare
R=json.loads(Path('work/30a_finish/scale-rule.json').read_text());G=json.loads((D/'geometry.json').read_text());land=shape(G['land']);forest=shape(G['forest']);coast=shape(G['coast']);districts=json.loads((D/'districts.json').read_text());mapdata=json.loads((D/'map-data.json').read_text())['elements']
prepare(land);prepare(forest)
O=Path('outputs/30a_finish');(O/'assets').mkdir(exist_ok=True)
assets={};colors=[];objs=[];checks=[]
def mat(name,color):
 colors.append((name,color));return len(colors)-1
sand=mat('Warm coastal ground','#e8dfc8');white=mat('Sugar sand','#fff7e3');bay=mat('Bay water','#65968f');lakecol=mat('Dune lake water','#6e9891');forestmat=mat('Continuous forest canopy','#648163');roadmat=mat('Neighborhood streets','#a6a294');pathmat=mat('Timpoochee pale trail','#d9bd93');roof=mat('Standing seam zinc','#9da8a2');darkroof=mat('Rosemary dark roof','#72756d');trim=mat('Porch and trim','#faf2dc');glass=mat('Shaded windows','#72938e');trunk=mat('Tree trunk','#978268');green=mat('Tree canopy','#678568')
wallmats={n:mat(n,c) for n,c in [('cream','#e9d9b8'),('pink','#ddbeb1'),('blue','#a7c2c2'),('sage','#bdc9ad'),('white','#fffdf3'),('taupe','#c4b59b'),('shingle','#b5b3a5')]}
def addmesh(key,v,f,m):
 if len(f):assets.setdefault(key,[]).append((key,np.array(v,np.float32),np.array(f,np.int32),m))
def surface(key,g,z,m,tol=.001):
 v=[];f=[]
 for p in parts(make_valid(g.simplify(tol,preserve_topology=True))):
  for tr in constrained_delaunay_triangles(p).geoms:
   pts=list(tr.exterior.coords)[:3];i=len(v);v.extend([[x,y,z] for x,y in pts]);f.append([i,i+1,i+2])
 addmesh(key,v,f,m)
def cube(key,x,y,z,w,d,h,m):
 v=[[x+dx*w/2,y+dy*d/2,z+dz*h] for dz in [0,1] for dx,dy in [(-1,-1),(1,-1),(1,1),(-1,1)]]
 f=[[0,2,1],[0,3,2],[4,5,6],[4,6,7],[0,1,5],[0,5,4],[1,2,6],[1,6,5],[2,3,7],[2,7,6],[3,0,4],[3,4,7]];addmesh(key,v,f,m)
def gable(key,x,y,z,w,d,h,m):
 v=[[x-w/2,y-d/2,z],[x+w/2,y-d/2,z],[x+w/2,y+d/2,z],[x-w/2,y+d/2,z],[x,y-d/2,z+h],[x,y+d/2,z+h]]
 addmesh(key,v,[[0,1,4],[2,3,5],[0,4,5],[0,5,3],[1,2,5],[1,5,4]],m)
def mergeasset(key):
 merged=[]
 for mi in sorted({e[3] for e in assets[key]}):
  vv=[];ff=[];offset=0
  for _,v,f,m in assets[key]:
   if m!=mi:continue
   vv.append(v);ff.append(f+offset);offset+=len(v)
  verts=np.concatenate(vv);faces=np.concatenate(ff);unique,inv=np.unique(verts,axis=0,return_inverse=True);merged.append((key,unique,inv[faces],mi))
 assets[key]=merged
# Single source shoreline, no gridded simplification or hand-drawn coast.
surface('Geography / OSM land',land,.002,sand)
# Existing 100 m atlas geography outside the rebuilt OSM extent; prevents artificial tile edges.
base=json.loads(Path('work/coast_geography/geography.json').read_text())
context=unary_union([shape(base['land']),shape(base['context'])]).intersection(project(box(-86.70,30.0,-85.40,30.80))).difference(project(box(-86.40,30.20,-85.76,30.59)))
surface('Geography / existing atlas context',context,.0018,sand,.025)

for width,c in [(1.2,'#6aabb0'),(.65,'#69bdb9'),(.25,'#81d0bf')]:
 surface('Depth band '+str(width),coast.buffer(width).difference(land),-.003-width*.004,mat('Shallows '+str(width),c),.003)
surface('Geography / sand edge',coast.buffer(.045).intersection(land),.0025,white,.001)
canopydata=json.loads((D/'canopy.json').read_text());canopy=shape(canopydata['geometry']);surface('Geography / Continuous forest canopy',canopy.buffer(.15,quad_segs=2).intersection(land),.004,forestmat,.004)
gardenmat=mat('Neighborhood greens','#a9bf96')
for e in mapdata:
 if e['type']!='way' or not(e['tags'].get('landuse') in ['grass','recreation_ground'] or e['tags'].get('leisure') in ['park','garden']):continue
 p=polygons(e)
 if not p.is_empty:surface('Geography / mapped neighborhood greens',project(p).intersection(land),.0031,gardenmat,.0007)

watergeo=[]
lakeids={178904668:'Fuller Lake',178904664:'Morris Lake',178904667:'Campbell Lake',178904657:'Stallworth Lake',12664872:'Allen Lake',178904661:'Oyster Lake',178904669:'Draper Lake',178904666:'Big Redfish Lake',178904662:'Alligator Lake',178904663:'Little Redfish Lake',156617051:'Western Lake',238260949:'Eastern Lake',238260967:'Deer Lake',238260952:'Camp Creek Lake',138361680:'Lake Powell'}
for w in G['waters']:
 p=shape(w['geometry'])
 if p.is_empty:continue
 name=lakeids.get(w['osmId']);key='Lake / '+name if name else 'Geography / OSM water'
 surface(key,p,.001,bay if w['osmId']==2189656 else lakecol,.0006)
 if name:
  c=p.representative_point();watergeo.append({'id':'lake-'+str(w['osmId']),'name':name,'x':c.x,'y':c.y,'shape':mapping(p.simplify(.0006)),'osmType':w['osmType'],'osmId':w['osmId'],'source':f'https://www.openstreetmap.org/{w["osmType"]}/{w["osmId"]}','guide':'https://www.visitsouthwalton.com/blog/coastal-dune-lakes/','key':key})
paths=[];streets=[];landroad=land.buffer(.008)
for e in mapdata:
 if e['type']!='way' or not e['tags'].get('highway') or len(e.get('geometry',[]))<2:continue
 t=e['tags'];g=project(LineString([(p['lon'],p['lat']) for p in e['geometry']])).intersection(landroad);name=t.get('name','');trail='Timpoochee' in name;main='30A' in name
 if t['highway'] in ['motorway','trunk','primary','secondary','tertiary','residential','living_street','unclassified','service']:
  surface('Geography / street network',g.buffer(.003 if not main else .0045,cap_style=2),.005,roadmat,.0008);streets.append(g)
 elif trail or t['highway']=='pedestrian':surface('Geography / Timpoochee and paths',g.buffer(.0018),.0055,pathmat,.0005)
 if trail:
  for line in ([g] if g.geom_type=='LineString' else getattr(g,'geoms',[])):
   if line.geom_type=='LineString':paths.append(list(line.coords))
# Facade, roof, porch and courtyard prototypes use normalized footprints; all heights incl. roof are capped.
for style in ['seaside','watercolor','alys','rosemary','grayton','watersound','seagrove','seacrest','cottage','inlet']:
 for variant in range(3):
  key='Homes / '+style+'/'+str(variant);wm=wallmats['white' if style=='alys' else 'taupe' if style=='rosemary' else 'shingle' if style=='watersound' else ['cream','pink','blue'][variant] if style in ['seaside','seacrest'] else ['sage','cream','blue'][variant]];rm=trim if style=='alys' else darkroof if style=='rosemary' else roof
  if style=='alys':
   # Open U-shaped court, not a solid white tower.
   for x,y,w,d in [(-.34,0,.30,1),(.34,0,.30,1),(0,.34,.4,.30)]:
    cube(key,x,y,0,w,d,.78,wm);gable(key,x,y,.78,w,d,.20,rm)
   cube(key,0,-.47,0,.4,.06,.28,wm)
  else:
   cube(key,0,.06,0,.86,.84,.77,wm);gable(key,0,.06,.77,.94,.91,.23,rm)
   porchdepth=.24 if style in ['seaside','watercolor','grayton'] else .13
   cube(key,0,-.42,.03,.99,porchdepth,.035,trim);cube(key,0,-.42,.58,.99,porchdepth,.035,rm)
   for x in [-.45,-.15,.15,.45]:cube(key,x,-.47,.065,.026,.026,.51,trim)
   if style in ['watercolor','rosemary']:cube(key,0,-.42,.35,.96,.17,.025,trim)
  for z in [.18,.48]:
   for x in [-.27,0,.27]:cube(key,x,-.368 if style!='alys' else -.502,z,.10,.008,.14,glass)
  mergeasset(key)
print('terrain complete',flush=True)
ns={'colors':colors,'assets':assets,'np':np,'math':math};exec(Path('work/seaside_tower/geometry.py').read_text(),ns);mergeasset('Composed / Signature / Seaside Coleman Pavilion')
# Buildings use actual OSM positions, oriented footprint sizes, and observed height tags where present.
counts=collections.Counter();heights=collections.Counter();footprints=[]
for e in mapdata:
 if e['type']!='way' or not e['tags'].get('building'):continue
 p=polygons(e)
 if p.is_empty:continue
 p=project(p);c=p.centroid
 if not land.covers(c) or not (-86.30<I.transform(c.x*1000,c.y*1000)[0]<-85.98):continue
 rect=p.minimum_rotated_rectangle;cs=list(rect.exterior.coords);a=np.array(cs[1])-cs[0];b=np.array(cs[2])-cs[1];w=np.linalg.norm(a);d=np.linalg.norm(b)
 if min(w,d)<.003 or max(w,d)>.12:continue
 nearest=min(districts,key=lambda q:(q['x']-c.x)**2+(q['y']-c.y)**2);style=nearest['style'];lon,lat=I.transform(c.x*1000,c.y*1000)
 # Watersound Beach's dune-side shingle district lies west of the OSM locality label.
 if -86.078<lon<-86.061 and lat<30.309:style='watersound'
 t=e['tags'];assumption='assumed two stories';real=R['metersPerStorey']*R['defaultResidentialStoreys']
 try:
  if 'height' in t:real=float(t['height'].split()[0]);assumption='OSM height'
  elif 'building:levels' in t:real=float(t['building:levels'])*R['metersPerStorey'];assumption='OSM levels × 3 m'
 except:pass
 if style=='alys':real=min(9,max(6,real));assumption+='; Alys 2–3-story envelope'
 if e['id']==178904625:real=12;assumption='Coleman height assumed 12 m; measured height pending'
 height=min(real*R['buildings']/1000,min(w,d)*.92*R['maxHeightToFootprint']);key='Composed / Signature / Seaside Coleman Pavilion' if e['id']==178904625 else 'Homes / '+style+'/'+str(e['id']%3)
 objs.append({'asset':key,'p':[c.x,c.y,.003],'s':[w*.92,d*.92,height],'r':math.degrees(math.atan2(a[1],a[0])),'city':'30a','layer':'buildings'})
 checks.append({'osm':e['id'],'district':nearest['id'],'heightSource':assumption,'realHeightMeters':real,'displayHeightMeters':height*1000,'widthMeters':min(w,d)*920,'x':c.x,'y':c.y});counts[style]+=1;heights[assumption]+=1;footprints.append(p)
print('buildings complete',len(checks),flush=True)
# Tree geometry obeys exactly the same rule, with canopy size as footprint.
key='Trees / modeled canopy';height=min(R['treeRealHeightMeters']*R['trees'],R['treeCrownWidthMeters']*R['maxHeightToFootprint'])/1000;cw=R['treeCrownWidthMeters']/1000
cube(key,0,0,0,.0008,.0008,height*.65,trunk)
v=[];f=[]
for ringz,rad in [(height*.58,cw*.10),(height*.65,cw*.40),(height*.8,cw*.5),(height*.94,cw*.32),(height,cw*.04)]:
 for i in range(7):v.append([rad*math.cos(i*math.tau/7),rad*math.sin(i*math.tau/7),ringz])
for j in range(4):
 for i in range(7):a=j*7+i;b=j*7+(i+1)%7;f.extend([[a,b,a+7],[b,b+7,a+7]])
addmesh(key,v,f,green);mergeasset(key)
# Individual crowns near district cores supplement the continuous forest surface.
from shapely.strtree import STRtree
fp=unary_union(footprints).buffer(.002);roads=unary_union(streets).buffer(.004);rng=random.Random(30);prepare(fp);prepare(roads)
for district in districts:
 for i in range(1000):
  x=district['x']+rng.uniform(-.7,.7);y=district['y']+rng.uniform(-.65,.65);p=Point(x,y)
  if land.covers(p) and not fp.covers(p) and not roads.covers(p):
   objs.append({'asset':key,'p':[x,y,.003],'s':[1,1,1],'r':0,'city':'30a','layer':'trees'})
# Merge geographic batches by material for a compact package.
for key in list(assets):
 if key.startswith(('Geography','Depth','Lake')):mergeasset(key)
geo={'projection':proj};rgb=lambda c:[int(c[i:i+2],16)/255 for i in (1,3,5)]
src=Path('work/florida_atlas/build_atlas.py').read_text();exportsrc='def export('+src.split('def export(')[1].split("geokeys=['Geography")[0];exportsrc=exportsrc.replace("US Census 2025 cartographic boundaries 1:500,000; TIGER primary and secondary roads; Natural Earth major lakes","OpenStreetMap contributors, retrieved 2026-10-16; ODbL; https://www.openstreetmap.org/copyright").replace('Coastline and anchor positions are sourced. District streets, buildings, suburban arrangement and local landmark placements are artistic interpretations.','OSM footprint and edge positions; stylized facades; height defaults and forest density are assumptions documented in scale-rule.json.').replace('1 model unit = 1 km on geographic layers; artistic building scale is exaggerated','1 unit = 1 km; scale-rule.json: buildings 3x real-height estimate, trees 5x, capped at 3x footprint width.')
exportsrc=exportsrc.replace("f.reshape(-1).astype(np.uint32),'SCALAR',5125,34963", "f.reshape(-1).astype(np.uint16 if len(v)<65536 else np.uint32),'SCALAR',5123 if len(v)<65536 else 5125,34963")
exportsrc=exportsrc.replace("na=add(norm,'VEC3',5126,34962);", "na=None if key.startswith(('Geography','Depth','Lake')) else add(norm,'VEC3',5126,34962);").replace("'attributes':{'POSITION':pa,'NORMAL':na}","'attributes':({'POSITION':pa} if na is None else {'POSITION':pa,'NORMAL':na})")
exec(exportsrc)
geoassets=[k for k in assets if k.startswith(('Geography','Depth','Lake'))]
size=export(O/'assets/30a-finished.glb',objs,geoassets)
with gzip.open(O/'assets/30a-finished.glb.gz','wb',compresslevel=9) as f:f.write((O/'assets/30a-finished.glb').read_bytes())
extra={'source':'© OpenStreetMap contributors · ODbL','sourceUrl':'https://www.openstreetmap.org/copyright','canopyBounds':canopydata['bounds'],'scaleRule':R,'districts':districts,'lakes':watergeo,'trail':paths,'forest':mapping(forest.simplify(.005))}
(O/'30a.json').write_text(json.dumps(extra,separators=(',',':')))
(O/'scale-checks.json').write_text(json.dumps({'rule':R,'buildings':len(checks),'sources':dict(heights),'maxRatio':max(c['displayHeightMeters']/c['widthMeters'] for c in checks),'treeHeightMeters':height*1000,'treeCrownWidthMeters':cw*1000,'rawGlbBytes':size,'gzipBytes':(O/'assets/30a-finished.glb.gz').stat().st_size,'districtBuildingCounts':dict(counts),'checks':checks},separators=(',',':')))
print('built',size,'gzip',(O/'assets/30a-finished.glb.gz').stat().st_size,'buildings',len(checks),'trees',sum(o['layer']=='trees' for o in objs),'lakes',len(watergeo),dict(counts),flush=True)
