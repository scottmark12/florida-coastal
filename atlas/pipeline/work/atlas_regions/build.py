import sys,json,math,pickle,struct,gzip,random,hashlib
from pathlib import Path
import numpy as np
sys.path.insert(0,'work/florida_atlas/python_pkgs')
import shapely
from shapely.geometry import shape,Point,Polygon,box,LineString
from shapely.ops import unary_union,transform,nearest_points
from pyproj import Transformer
O=Path('outputs/florida_coastal_regions');O.mkdir(exist_ok=True);(O/'assets').mkdir(exist_ok=True)
s=pickle.load(open('work/coast_curated/scene.pkl','rb'));assets=s['assets'];colors=s['colors'];instances=s['instances'];geo=json.loads(Path('work/coast_geography/geography.json').read_text());land=shape(geo['land']).simplify(.05,preserve_topology=True);context=shape(geo['context']);mainland=unary_union([land,context]).simplify(.10,preserve_topology=True);shapely.prepare(land)
# Drop sub-display-scale interior ponds from the rendering mesh, not the source geometry.
def display_land(g):
 ps=[]
 for p in g.geoms if hasattr(g,'geoms') else [g]:
  if p.geom_type=='Polygon' and p.area>.015:ps.append(Polygon(p.exterior,[r for r in p.interiors if Polygon(r).area>.025]))
 return unary_union(ps)
mainland=display_land(mainland)
print('Preparing simplified terrain',flush=True)
tr=Transformer.from_crs(4326,geo['projection'],always_xy=True)
def pr(x,y,z=None):
 a,b=tr.transform(x,y);return np.asarray(a)/1000,np.asarray(b)/1000
T=json.loads(Path('work/florida_atlas/towns_geo.json').read_text());R=json.loads(Path('work/florida_atlas/regions.json').read_text());sources={t['id']:t for t in json.loads(Path('work/florida_atlas/towns.json').read_text())}
for t in T:t.update(sources.get(t['id'],{}))
byid={t['id']:t for t in T}
def material(n,h):colors.append((n,h));return len(colors)-1
cream=material('Atlas cream','#eee6d2');sand=material('Atlas beach','#fff7e7');forest=material('Atlas woodland','#bec9a8');wetland=material('Atlas marsh','#a5bda6');farmland=material('Atlas fields','#d1cba5');golf=material('Atlas golf','#bad0a2');roadmat=material('Atlas main roads','#b5ab91');lotmat=material('Atlas garden lots','#c8d1b3')
geokeys=[]
def flat(name,g,z,m):
 vv=[];ff=[]
 if g.area>1000:
  a,b,c,d=g.bounds
  pieces=[g.intersection(box(x,y,x+40,y+40)) for x in np.arange(math.floor(a/40)*40,c,40) for y in np.arange(math.floor(b/40)*40,d,40)]
  polys=[q for t in pieces for q in (t.geoms if hasattr(t,'geoms') else [t])]
 else:polys=list(g.geoms) if hasattr(g,'geoms') else [g]
 for p in polys:
  if p.geom_type!='Polygon' or p.area<.004:continue
  for tri in shapely.constrained_delaunay_triangles(p).geoms:
   n=len(vv);vv.extend([[xx,yy,z] for xx,yy in list(tri.exterior.coords)[:3]]);ff.append([n,n+1,n+2])
 if vv:assets[name]=[(name,np.asarray(vv,np.float32),np.asarray(ff,np.uint32),m)];geokeys.append(name)
flat('Geography / Mainland',mainland,0,cream)
for j,(dist,col) in enumerate([(14,'#579ba8'),(9,'#5ea9b3'),(5,'#65b9bd'),(2.5,'#79c8c5'),(.9,'#a2d9cf')]):
 flat('Geography / Depth band '+str(j),mainland.buffer(dist,quad_segs=2).difference(mainland).simplify(.1,preserve_topology=True),-.15+j*.02,material('Depth band '+str(j),col))
flat('Geography / Shore sand',mainland.difference(mainland.buffer(-.13)).simplify(.04,preserve_topology=True),.015,sand)
print('Terrain complete',flush=True)
# Published land-use polygons; quiet tones underneath the town illustrations.
cover={forest:[],wetland:[],farmland:[],golf:[]};covercount=0
for filename in ['landcover.json','golf.json']:
 p=Path('work/atlas_regions')/filename
 if not p.exists():continue
 for ft in json.loads(p.read_text()).get('features',[]):
  props=ft['properties'];desc=str(props.get('LANDUSE_DESCRIPTION','')).lower();code=str(props.get('LEVEL1_LANDUSE_CODE',''))
  m=golf if 'golf' in desc else wetland if any(w in desc for w in ['wetland','marsh','mangrove','swamp']) or code.startswith('6') else farmland if code.startswith('2') else forest if code.startswith(('3','4')) else None
  if m is None:continue
  g=transform(pr,shape(ft['geometry'])).buffer(0).simplify(.16,preserve_topology=True).intersection(land)
  if not g.is_empty:cover[m].append(g);covercount+=1
for m,polys in cover.items():
 if polys:flat('Geography / '+colors[m][0],unary_union(polys),.025,m)
# Main corridors use published Census road alignments.
roads=[]
for r in json.loads(Path('work/florida_atlas/roads_geo.json').read_text()):
 name=(r.get('name') or '').lower()
 if any(w in name for w in ['i-95','i-75','i 95','i 75','us hwy 1','u.s. hwy 1','us hwy 98','a1a','i-10','i-4']):roads.append(shape(r['geometry']).simplify(.12).buffer(.075))
if roads:flat('Geography / Main routes',unary_union(roads).intersection(land),.055,roadmat)
# Retain district streets and gardens only where they lie on corrected land.
for k in s['geokeys']:
 if not k.startswith('Geography / Curated'):continue
 if any(w in k.lower() for w in ['pools','tidal channels','spring pools']):continue
 for n,v,f,m in assets[k]:
  polys=[Polygon(v[tri,:2]) for tri in f];g=unary_union(polys).intersection(land)
  flat(k+' corrected',g,float(v[0,2]),m)
print('Land cover',covercount,'road segments',len(roads),flush=True)
# True mesh bounds, capped silhouette ratios, and non-overlapping residential lots.
extents={k:np.ptp(np.concatenate([a[1] for a in parts]),axis=0) for k,parts in assets.items() if parts}
residential_words=['porch','ranch','conch','stilt','seaside pastel','cottage','residential','suburb','house']
nonbuilding=['tree','palm','pine','mangrove','grass','boat','sail','trawler','bridge','pier','dock','bench','car','umbrella','kayak','stadium','ferris','wheel','bandstand']
fixed=[];occupied={};lots=[];removed=0;capped=0
for o in sorted(instances,key=lambda o:0 if 'landmark' in o['layer'] or 'signature' in o['layer'] else 1):
 k=o['asset'].lower();e=extents.get(o['asset']);o={**o,'p':list(o['p']),'s':list(o['s'])}
 building=e is not None and not any(w in k for w in nonbuilding) and o['city']!='landscape'
 residential=building and (any(w in k for w in residential_words) or any(w in o['layer'] for w in ['home','residential','housing']))
 if building:
  w,d,h=e*np.array(o['s']);limit=(1.45 if residential else 3)*min(w,d)
  if h>limit:o['s'][2]*=limit/h;capped+=1
  if residential:
   # Small detached home lots, with air between neighboring roofs.
   target=min(.55,max(.24,w));o['s'][0]*=target/max(w,.01);o['s'][1]*=min(.55,max(.25,d))/max(d,.01)
   w,d,h=e*np.array(o['s']);o['s'][2]*=min(1,.65/max(h,.01));rad=max(w,d)*.7
   px,py=o['p'][:2];cell=(int(px),int(py));near=[q for dx in [-1,0,1] for dy in [-1,0,1] for q in occupied.get((cell[0]+dx,cell[1]+dy),[])]
   if any(math.hypot(px-q[0],py-q[1])<rad+q[2] for q in near):removed+=1;continue
   if not land.covers(Point(px,py)):removed+=1;continue
   occupied.setdefault(cell,[]).append((px,py,rad));lots.append(box(px-w*.65,py-d*.65,px+w*.65,py+d*.65).intersection(land))
  elif not land.covers(Point(o['p'][:2])):
   p=Point(o['p'][:2]);q=nearest_points(land,p)[0]
   if p.distance(q)>3:removed+=1;continue
   o['p'][0]=q.x;o['p'][1]=q.y
 fixed.append(o)
instances=fixed
if lots:flat('Geography / Spaced garden lots',unary_union(lots),.12,lotmat)
# Regional packages share the terrain and load only their building vocabulary.
def rgb(c):return [int(c[i:i+2],16)/255 for i in [1,3,5]]
src=Path('work/florida_atlas/build_atlas.py').read_text();exec('def export('+src.split('def export(')[1].split("geokeys=['Geography")[0])
def save(name,objs,keys):
 p=O/'assets'/(name+'.glb');export(p,objs,keys);data=p.read_bytes();(O/'assets'/(name+'.glb.gz')).write_bytes(gzip.compress(data,6));return {'raw':len(data),'gzip':(O/'assets'/(name+'.glb.gz')).stat().st_size}
sizes={'terrain':save('terrain',[],geokeys)}
icons=[o for o in instances if (o['layer'] in ['named signature','composed landmark','Miami landmark']) and any(w in o['asset'] for w in ['Coleman','Skyway','Rivergate','Bank of America','Guitar','Breakers','Freedom'])]
sizes['state']=save('state',icons,[])
for r in R:
 ts=[byid[x] for x in r['towns'] if x in byid]
 if not ts:continue
 centers=np.array([[t['x'],t['y']] for t in ts]);selected=[o for o in instances if np.min(np.linalg.norm(centers-np.array(o['p'][:2]),axis=1))<45]
 sizes[r['id']]=save(r['id'],selected,[]);r['center']=[float(np.mean(centers[:,0])),float(np.mean(centers[:,1]))]
 print(r['id'],len(selected),sizes[r['id']]['gzip'],flush=True)
# Match unsupported Miami mainland to the existing south Florida region.
for r in R:
 if 'southbeach' in r['towns']:r['towns']+=['miami']
 if 'jaxbeach' in r['towns']:r['towns']+=['jacksonville']
for extra in s['towns']:
 if extra['id'] not in byid and extra['id'] in ['miami','jacksonville']:T.append(extra);byid[extra['id']]=extra
(O/'catalog.json').write_text(json.dumps({'towns':T,'regions':R},separators=(',',':')))
(O/'build_report.json').write_text(json.dumps({'height_caps_applied':capped,'overlapping_or_water_homes_removed':removed,'spaced_lots':len(lots),'landcover_polygons':covercount,'main_road_segments':len(roads),'packages':sizes},indent=2))
pickle.dump(dict(s,assets=assets,colors=colors,instances=instances,geokeys=geokeys),open('work/atlas_regions/scene.pkl','wb'))
print('PACKAGED',flush=True)
