import sys,json,struct,math,random,hashlib,zipfile,base64
from pathlib import Path
import numpy as np
sys.path.insert(0,str(Path('work/florida_atlas/python_pkgs').resolve()))
import shapely
from shapely.geometry import shape,Point,box as geo_box,mapping
from shapely.ops import transform,nearest_points
# Reuse geometry helpers, not old exports.
src=Path('work/build_model.py').read_text();exec(src.split('# low display plinth')[0])
exec('def box'+Path('work/build_boats.py').read_text().split('def box')[1].split('def boat')[0])
ROOT=Path('work/florida_atlas');OUT=Path('outputs/florida_coastal_atlas');OUT.mkdir(exist_ok=True)
(OUT/'towns').mkdir(exist_ok=True);(OUT/'regions').mkdir(exist_ok=True)
towns=json.loads((ROOT/'towns_geo.json').read_text());regions=json.loads((ROOT/'regions.json').read_text());geo=json.loads((ROOT/'geography.json').read_text());land=shape(geo['land']);lakes=shape(geo['lakes']);roads=json.loads((ROOT/'roads_geo.json').read_text())
colors=[('Limestone','#d5c5a8'),('Chalk ivory','#eee7d8'),('Champagne roof','#baa98b'),('Bronze details','#8f826c'),('Sage glazing','#afc4bc'),('Sage water','#a7bcb0'),('Clay stucco','#c59e8a'),('Honed paving','#e2d6be'),('Tropical green','#6d8a60'),('Pearl concrete','#deded0'),('Warm stucco','#ddc8ac'),('Cool stone','#cbd0c3'),('Park lawn','#9db384'),('Deco mint','#9abeb1'),('Butter limestone','#dcc899')]
assets={};instances=[];registries=[]
def merge(parts):
 out=[]
 for m in sorted(set(p[3] for p in parts)):
  vs=[];fs=[];off=0
  for n,v,f,mm in parts:
   if mm!=m:continue
   vs.append(np.asarray(v,np.float32));fs.append(np.asarray(f,np.uint32)+off);off+=len(v)
  v=np.concatenate(vs);f=np.concatenate(fs);assert np.isfinite(v).all();out.append((str(m),v,f,m))
 return out
def register(name,fn):
 global meshes
 meshes=[];fn();assets[name]=merge(meshes);meshes=[];return name
def cube(n,c,s,m=0):box(n,c,s,m)
def rod(n,a,b,r=.03,m=2):tube(n,[a,b],[r,r],m,8)
def roof(n,c,w,d,h=.5,m=2):
 x,y,z=c;v=[[x-w/2,y-d/2,z],[x+w/2,y-d/2,z],[x,y-d/2,z+h],[x-w/2,y+d/2,z],[x+w/2,y+d/2,z],[x,y+d/2,z+h]];mesh(n,v,[(0,3,5),(0,5,2),(1,2,5),(1,5,4),(0,2,1),(3,4,5)],m)
def read_glb(path):
 b=Path(path).read_bytes();jl=struct.unpack_from('<I',b,12)[0];g=json.loads(b[20:20+jl]);binary=b[28+jl:]
 def rd(ai):
  a=g['accessors'][ai];bv=g['bufferViews'][a['bufferView']];num={'VEC3':3,'SCALAR':1,'VEC4':4}[a['type']];dt={5126:np.float32,5125:np.uint32,5123:np.uint16}[a['componentType']];return np.frombuffer(binary,dtype=dt,count=a['count']*num,offset=bv.get('byteOffset',0)+a.get('byteOffset',0)).copy()
 parts=[]
 for gm in g['meshes']:
  pp=[]
  for pr in gm['primitives']:
   v=rd(pr['attributes']['POSITION']).reshape(-1,3);v=v[:,[0,2,1]]*np.array([1,-1,1],np.float32);f=rd(pr['indices']).reshape(-1,3).astype(np.uint32);origmat=g['materials'][pr['material']]['name'].lower();name=gm.get('name','');low=name.lower();m=1
   if any(t in origmat for t in ['roof','bark','champagne','seat']):m=2
   if any(t in origmat for t in ['glass','glaz','lagoon']):m=4
   if any(t in origmat for t in ['water']):m=5
   if any(t in origmat for t in ['sand','limestone']):m=0
   if 'paving' in origmat:m=7
   if any(t in origmat for t in ['green','foliage','plant']):m=8
   if 'clay' in origmat:m=6
   if 'mint' in origmat:m=13
   if 'butter' in origmat:m=14
   if 'bronze' in origmat:m=3
   pp.append((name,v,f,m))
  parts.append(pp)
 groups=[]
 for node in g['nodes']:
  if 'children' in node:
   selected=[]
   for child in node['children']:
    if 'mesh' in g['nodes'][child]:selected.extend(parts[g['nodes'][child]['mesh']])
   if selected:groups.append((node.get('name','Group'),selected))
 if not groups:groups=[('Whole model',[p for pp in parts for p in pp])]
 return groups
# The 19 city-building families from the previous model, shared throughout the coast.
basegroups=read_glb('outputs/miami_marina_midrise_maquette.glb');buildingkeys=[]
for n,parts in basegroups:
 if ('City cluster' in n or 'Downtown block' in n or 'Urban infill' in n or 'Beach skyline' in n) and ' / ' in n:
  style=n.split(' / ')[-1];key='Urban / '+style
  if key in assets:continue
  allv=np.concatenate([v for _,v,_,_ in parts]);center=(allv.min(0)+allv.max(0))/2;center[2]=allv[:,2].min();height=allv[:,2].ptp() if hasattr(allv[:,2],'ptp') else np.ptp(allv[:,2]);wid=max(np.ptp(allv[:,0]),np.ptp(allv[:,1]));factors=np.array([3/wid,3/wid,10/max(height,.1)])
  assets[key]=merge([(pn,((v-center)*factors).astype(np.float32),f,m) for pn,v,f,m in parts]);buildingkeys.append(key)
# Houses, civic and waterfront pieces.
for filename in ['florida_cracker_cottage','key_west_conch_house','mediterranean_courtyard_villa','mid_century_florida_ranch','canal_front_pool_home','modern_elevated_coastal_home','raised_beach_duplex','art_deco_coastal_bungalow']:
 pp=read_glb('outputs/florida_homes/'+filename+'.glb')[0][1];vv=np.concatenate([v for _,v,_,_ in pp]);center=(vv.min(0)+vv.max(0))/2;center[2]=0;sc=3/max(np.ptp(vv[:,0]),np.ptp(vv[:,1]));assets['Home / '+filename]=merge([(n,((v-center)*sc).astype(np.float32),f,m) for n,v,f,m in pp])
housekeys=[k for k in assets if k.startswith('Home /')]
for file in ['straight_dock','t_dock','open_boathouse','picnic_pavilion','beach_walkover','beach_umbrella','cafe_table_and_chairs','marina_office','bait_shack','coastal_bicycle']:
 pp=read_glb('outputs/coastal_kit/'+file+'.glb')[0][1];assets['Coast / '+file]=merge(pp)
# Prototype palms and shade trees are merged for efficient rendering.
def palm_asset():
 tube('curved palm trunk',[[.18*t*t,0,4.6*t] for t in np.linspace(0,1,15)],[.105-.035*t for t in np.linspace(0,1,15)],2,12)
 vv=[];ff=[]
 for k in range(12):
  a=k*2.39996;dr=np.array([math.cos(a),math.sin(a),0]);side=np.array([-dr[1],dr[0],0]);L=1.6+(k%3)*.22
  def ctr(t):return np.array([.18,0,4.6])+dr*L*t+np.array([0,0,.35*math.sin(math.pi*t)-.36*t*t])
  tube('arching spine',[ctr(t) for t in np.linspace(0,1,13)],[.014]*13,8,5)
  for t in np.linspace(.15,.95,11):
   c=ctr(t);length=.48*math.sin(math.pi*t)**.6
   for sign in [-1,1]:
    start=len(vv)
    for j,u in enumerate(np.linspace(0,1,5)):
     p=c+(side*sign*.88+dr*.42)*length*u+np.array([0,0,-.1*u*u]);width=.045*math.sin(math.pi*u);vv.extend([p-dr*width,p+dr*width])
     if j:aa=start+(j-1)*2;ff.extend([(aa,aa+2,aa+3),(aa,aa+3,aa+1)])
 mesh('feathered crown',vv,ff,8)
register('Landscape / palm',palm_asset)
register('Landscape / shade tree',lambda:(rod('trunk',[0,0,0],[0,0,1.2],.085,2),ellipsoid('canopy',[0,0,1.65],[.85,.8,.7],8)))
register('Landscape / park',lambda:cube('lawn',[0,0,.01],[6,4,.02],12))
register('Landscape / hedge',lambda:ellipsoid('clipped hedge',[0,0,.3],[1,.25,.3],8))
# Common landmark forms; each town's locally sourced landmark receives its own named asset.
def lighthouse(red=False):
 tube('tapered light tower',[[0,0,0],[0,0,5]],[.58,.32],6 if red else 1,24);tube('gallery',[[0,0,4.9],[0,0,5.05]],[.65,.65],3,24);tube('lantern',[[0,0,5.05],[0,0,5.65]],[.27,.27],4,16);tube('cap',[[0,0,5.65],[0,0,6.05]],[.43,0.01],3,16);cube('keeper cottage',[1.2,.3,.5],[1.5,1.2,1],1);roof('keeper roof',[1.2,.3,1],1.7,1.4,.45)
def pier():
 for i in range(26):cube('pier board',[0,(i-13)*.23,.55],[1.25,.21,.09],2)
 for y in [-2.5,-.5,1.5,2.8]:
  for x in [-.48,.48]:rod('pile',[x,y,-.7],[x,y,.58],.055,2)
 for x in [-.6,.6]:rod('pier rail',[x,-3,.95],[x,3,.95],.025,1)
 roof('pier pavilion roof',[0,2.2,1.8],1.8,1.6,.45)
 for x in [-.65,.65]:rod('pavilion post',[x,2.2,.6],[x,2.2,1.8],.035,1)
def historic_main():
 for i in range(5):
  x=(i-2)*1.1;cube('historic shop',[x,0,.8],[1,1.2,1.6],1 if i%2 else 6);roof('historic pitched roof',[x,0,1.6],1.1,1.3,.4);cube('shopfront',[x,-.62,.65],[.7,.03,.8],4);cube('awning',[x,-.85,1.2],[.9,.5,.05],13)
def museum_form():
 cube('cultural gallery',[0,0,1],[3.4,2.1,2],1);ellipsoid('sculptural glass annex',[1.6,-.6,1.15],[1.3,1,1.2],4);cube('cantilever canopy',[0,0,2.2],[4.6,3,.15],2)
def mansion():
 cube('Mediterranean estate',[0,0,1.2],[4,2.6,2.4],6);roof('tile roof',[0,0,2.4],4.3,2.9,.7,6)
 for x in [-1.6,1.6]:tube('estate turret',[[x,0,0],[x,0,3.2]],[.45,.45],14,12);tube('turret cap',[[x,0,3.2],[x,0,3.8]],[.6,.01],6,12)
 for x in np.linspace(-1.4,1.4,5):cube('estate glazing',[x,-1.32,1.2],[.3,.03,.65],4)
def fort():
 pts=np.array([[-2,-1.4],[-2.6,-1.9],[-1.8,-2.4],[-1,-1.5],[1,-1.5],[1.8,-2.4],[2.6,-1.9],[2,-1.4],[2,1.4],[2.6,1.9],[1.8,2.4],[1,1.5],[-1,1.5],[-1.8,2.4],[-2.6,1.9],[-2,1.4]])
 poly=shapely.geometry.Polygon(pts);inner=poly.buffer(-.35,join_style=2);walls=poly.difference(inner);vv=[];ff=[]
 for tri in shapely.constrained_delaunay_triangles(walls).geoms:
  start=len(vv);vv.extend([[x,y,1.1] for x,y in list(tri.exterior.coords)[:3]]);ff.append((start,start+1,start+2))
 for ring in [poly.exterior,inner.exterior]:
  rr=list(ring.coords)
  for a,b in zip(rr,rr[1:]):
   start=len(vv);vv.extend([[*a,0],[*b,0],[*b,1.1],[*a,1.1]]);ff.extend([(start,start+1,start+2),(start,start+2,start+3)])
 mesh('solid coquina bastion walls',vv,ff,0);cube('fort courtyard',[0,0,.05],[3.3,2.3,.1],7)
 for x in [-1,1]:cube('cannon emplacement',[x,-1.4,1.15],[.28,.4,.12],3)
def flagler_hotel():
 cube('historic hotel main hall',[0,.6,1.2],[4.8,1.8,2.4],14);roof('Spanish tile main roof',[0,.6,2.4],5,2,.65,6)
 for x in [-1.9,1.9]:
  cube('courtyard hotel wing',[x,-.7,1.15],[1,2.5,2.3],14);roof('wing tile roof',[x,-.7,2.3],1.15,2.6,.5,6)
  cube('twin historic tower',[x,-1.2,2.2],[.72,.72,4.4],14)
  for z in [1.4,2.2,3,3.8]:cube('tower opening',[x,-1.57,z],[.2,.03,.4],3)
  tube('tower lookout gallery',[[x,-1.2,4.4],[x,-1.2,4.7]],[.55,.55],1,8);tube('red spire',[[x,-1.2,4.7],[x,-1.2,5.35]],[.65,.01],6,8)
 cube('courtyard lawn',[0,-.6,.06],[2.7,2.3,.08],12)
 for x in np.linspace(-1.4,1.4,6):cube('arched gallery opening',[x,-.32,1],[.28,.035,.6],4)
def rocket():
 tube('rocket',[[0,0,0],[0,0,4.6]],[.27,.27],1,20);tube('nose',[[0,0,4.6],[0,0,5.3]],[.27,.01],1,20)
 for z in [1,2.9]:tube('rocket stage ring',[[0,0,z],[0,0,z+.25]],[.28,.28],3,20)
 cube('launch gantry',[.9,0,2.6],[.22,.4,5.2],2)
def stadium():
 pts=[[3*math.cos(a),1.8*math.sin(a),.3] for a in np.linspace(0,math.tau,81)];tube('speedway oval',pts,[.22]*81,3,8)
 for x in [-2.3,2.3]:cube('grandstand',[x,0,.8],[.65,2.9,1.3],1)
 cube('infield',[0,0,.1],[3.5,1.9,.1],12)
def minarets():
 cube('historic Tampa hotel',[0,0,1.15],[4.6,2.6,2.3],6);roof('historic roof',[0,0,2.3],4.8,2.8,.6)
 for x in [-1.9,0,1.9]:
  tube('minaret',[[x,0,2.3],[x,0,4.5]],[.24,.24],1,16);ellipsoid('silver onion dome',[x,0,4.7],[.42,.42,.5],11);rod('finial',[x,0,5],[x,0,5.6],.015,2)
def spring():
 ellipsoid('spring lagoon',[0,0,.08],[3,2,.08],4)
 for a in np.linspace(0,math.tau,12,endpoint=False):ellipsoid('spring vegetation',[3*math.cos(a),2*math.sin(a),.35],[.65,.55,.4],8)
 cube('spring boardwalk',[0,-2,.3],[4.5,.5,.08],2)
def marina_landmark():
 cube('marina pier',[0,0,.3],[5,.65,.12],7)
 for x in [-1.8,0,1.8]:cube('finger dock',[x,-1.6,.3],[.35,3,.12],7)
 cube('marina office',[-2,1,.7],[1.5,1.3,1.4],1);roof('marina roof',[-2,1,1.4],1.7,1.5,.4)
def pavilionpark():
 cube('green reserve',[0,0,.01],[7,5,.02],12)
 for x,y in [(-2,-1),(2,1),(-1,1.5),(1,-1.5)]:rod('tree trunk',[x,y,0],[x,y,1.1],.05,2);ellipsoid('park tree',[x,y,1.4],[.7,.65,.5],8)
 cube('walking trail',[0,0,.04],[6,.35,.04],7)
def seaside():
 # Octagonal post office and stepped town green, simplified from Seaside's signature forms.
 tube('octagonal white post office',[[0,0,.15],[0,0,1.6]],[.9,.9],1,8)
 tube('octagonal roof',[[0,0,1.6],[0,0,2.3]],[1.2,.28],1,8)
 cube('post office doorway',[0,-.91,.8],[.4,.025,.95],4)
 for z in np.arange(.3,1.6,.16):
  pts=[[.91*math.cos(a),.91*math.sin(a),z] for a in np.linspace(0,math.tau,9)];tube('clapboard line',pts,[.009]*9,0,4)
 rod('flagpole',[0,0,2.3],[0,0,3],.02,2);cube('small flag',[.16,0,2.85],[.3,.015,.16],13)
 for r in [1.5,2,2.5]:
  pts=[[x,2.4+y,.1] for x,y in [(r*math.cos(a),r*.6*math.sin(a)) for a in np.linspace(0,math.pi,25)]];tube('amphitheater terrace',pts,[.1]*25,7,6)
 cube('town lawn',[0,2.5,.02],[4.7,2.8,.035],12)
 for x in [-3,3]:
  cube('town square cottage',[x,.5,.8],[1.5,1.2,1.6],1);roof('cottage gable',[x,.5,1.6],1.7,1.4,.55)
def pinkpalace():
 cube('pink resort',[0,0,1.25],[4.8,2.4,2.5],6)
 for x in [-2,2]:
  for y in [-.9,.9]:
   tube('pink turret',[[x,y,0],[x,y,3.3]],[.35,.35],6,16);tube('turret cap',[[x,y,3.3],[x,y,3.9]],[.47,.01],6,16)
 cube('central hotel tower',[0,0,2.2],[1,1,4.4],6);tube('center cap',[[0,0,4.4],[0,0,4.9]],[.7,.01],6,16)
 for z in [.8,1.6,2.2]:
  for x in np.linspace(-2,2,9):cube('resort window',[x,-1.22,z],[.2,.025,.35],4)
# Additional precise landmark identities from the website and verified regional references.
SPECIAL={'staug':[('Castillo de San Marcos',fort),('Flagler historic hotel silhouette',flagler_hotel)],'tampa':[('Tampa Riverwalk',pier),('Plant Hall minarets',minarets)],'sarasota':[('The Ringling',mansion)],'st-petersburg':[('Dalí Museum interpretation',museum_form),('St. Pete Pier',pier)],'jupiter':[('Jupiter Inlet Lighthouse',lambda:lighthouse(True))],'daytona':[('Daytona Speedway interpretation',stadium),('Beach pier',pier)],'daytona-beach-shores':[('Ponce Inlet area lighthouse',lambda:lighthouse(True))],'titusville':[('Space Coast launch silhouette',rocket),('Merritt Island reserve',pavilionpark)],'keywest':[('Key West lighthouse',lighthouse),('Mallory Square',historic_main)],'st-pete-beach':[('Don CeSar inspired pink hotel',pinkpalace),('Pass-a-Grille historic streets',historic_main)],'30a':[('Seaside town square',seaside),('Coastal dune lakes',spring)],'st-george-island':[('Cape St. George Light',lighthouse)],'pensacola':[('Palafox historic streets',historic_main),('Pensacola area lighthouse',lighthouse)],'naples':[('Naples Pier',pier),('Fifth Avenue South',historic_main)],'boca-raton':[('Mizner Park',mansion)],'sanibel-island':[('Ding Darling refuge',pavilionpark)],'tarpon-springs':[('Sponge Docks',marina_landmark)],'cedarkey':[('Dock Street',marina_landmark)],'ftl':[('Las Olas Boulevard',historic_main),('Canal marina district',marina_landmark)]}
def classify(title):
 low=title.lower()
 if any(w in low for w in ['lighthouse',' light']):return lighthouse
 if any(w in low for w in ['pier','boardwalk','broadwalk','harborwalk','riverwalk','lake trail','beach trail']):return pier
 if any(w in low for w in ['harbor','harbour','dock','pass','inlet']):return marina_landmark
 if any(w in low for w in ['spring','dune lake']):return spring
 if any(w in low for w in ['museum','theatre','arts','laboratory']):return museum_form
 if any(w in low for w in ['historic','avenue','street','downtown','square','boulevard','circle','shops','tradition']):return historic_main
 return pavilionpark
# Boats from previous authored meshes.
boatparts=read_glb('outputs/florida_coastal_small_boats.glb')[0][1]
for num,(ox,oy) in enumerate([(-2.5,.2),(0,.4),(2.8,.65)],1):
 pp=[(n,(v-np.array([ox,oy,0])).astype(np.float32),f,m) for n,v,f,m in boatparts if n.startswith(f'Boat {num} ')];assets['Boat / '+str(num)]=merge(pp)
# Miami retains its individually modeled landmark and hotel groups from the approved scene.
miamigroups=read_glb('outputs/miami_landmark_edit_maquette.glb');miami_components=[]
for name,pp in miamigroups:
 if any(w in name.lower() for w in ['plinth','island','beach and ocean','street network','baywalk','lush miami landscape']):continue
 vv=np.concatenate([v for _,v,_,_ in pp]);center=(vv.min(0)+vv.max(0))/2;center[2]=0;key='Miami / '+name;assets[key]=merge([(n,(v-center).astype(np.float32),f,m) for n,v,f,m in pp]);miami_components.append((key,center))
# Per-town districts: irregular centers, distinctive landmark ensembles, suburban rings and gardens.
major={'southbeach','tampa','ftl','st-petersburg','sarasota','west-palm-beach','daytona','pensacola','panama-city'}
resort={'pcb','destin','clearwaterbeach','sunny-isles-beach','st-pete-beach','marco-island','hollywood','cocoa','jaxbeach','longboat','daytona-beach-shores'}
local_by_city={};landmarks_by_city={}
def local_place(lst,asset,x,y,z=0,scale=1,angle=0,layer='center'):
 if isinstance(scale,(int,float)):scale=[scale]*3
 lst.append({'asset':asset,'p':[float(x),float(y),float(z)],'s':list(map(float,scale)),'r':float(angle),'layer':layer})
for ti,t in enumerate(towns):
 rng=random.Random(int(hashlib.sha256(t['id'].encode()).hexdigest()[:8],16));items=[];id=t['id'];old='oldfl' in t['vibes'] or id in {'staug','keywest','apalachicola','fernandina','30a','cedarkey','st-marks','tarpon-springs'};island='island' in t['vibes'];dock='dock' in t['vibes'];coast=t['coast'];urban=id in major;high=id in resort or urban
 corecount=40 if urban else 30 if high else 20
 if id=='southbeach':
  for key,c in miami_components:local_place(items,key,*c,scale=.7,layer='landmarks' if any(v in key for v in ['interpretation','inspired hotel']) else 'center')
 else:
  occupied=[]
  for i in range(corecount):
   for attempt in range(100):
    x=rng.uniform(-16 if high else -12,16 if high else 12);y=rng.uniform(-5,18 if high else 15)
    if y<0 and abs(x)<7:continue # framed landmark court
    if all(np.hypot(x-xx,y-yy)>3.3 for xx,yy in occupied):break
   occupied.append((x,y))
   if high and (rng.random()<(.7 if urban else .5)):
    key=rng.choice(buildingkeys);sz=[rng.uniform(.75,1.1)]*2+[rng.uniform(.7,1.9) if urban else rng.uniform(.4,1.1)]
   else:key=rng.choice(housekeys[:3] if old else housekeys);sz=rng.uniform(.8,1.2)
   local_place(items,key,x,y,scale=sz,angle=rng.uniform(-12,12))
  localmarks=SPECIAL.get(id,[(x[0],classify(x[0])) for x in t.get('todo',[])][:4])
  if not localmarks:localmarks=[('Local coastal landscape',pavilionpark)]
  landmarks_by_city[id]=[n for n,_ in localmarks]
  for j,(name,fn) in enumerate(localmarks):
   key=register('Landmark / '+id+' / '+name,fn);x=(j-(len(localmarks)-1)/2)*8;local_place(items,key,x,-5,scale=1.2,layer='landmarks')
 # Extend inland with smaller homes, pool houses, cul-de-sacs and planted yards.
 suburbspots=[]
 for i in range(95 if urban else 72):
  for attempt in range(100):
   theta=rng.uniform(.1,math.pi-.1);radius=rng.uniform(25,48);x=math.cos(theta)*radius;y=math.sin(theta)*radius+4
   if all(np.hypot(x-xx,y-yy)>2.75 for xx,yy in suburbspots):break
  suburbspots.append((x,y))
  key=rng.choice(housekeys if not old else housekeys[:4]);local_place(items,key,x,y,scale=rng.uniform(.55,.85),angle=rng.uniform(-24,24),layer='suburbs')
  if i%3==0:local_place(items,'Landscape / hedge',x+1.8,y,scale=.8,angle=theta*180/math.pi,layer='gardens')
 # Green pockets, shade trees, palms and a quieter edge.
 for i in range(45):
  x=rng.uniform(-45,45);y=rng.uniform(-14,49);key='Landscape / palm' if rng.random()<.62 else 'Landscape / shade tree';local_place(items,key,x,y,scale=rng.uniform(.6,1.1),angle=rng.uniform(0,360),layer='planting')
 for x,y in [(-16,-1),(15,6),(-8,25),(16,29)]:local_place(items,'Landscape / park',x,y,scale=rng.uniform(.7,1.3),layer='parks')
 if id!='southbeach':
  local_place(items,'Coast / straight_dock',0,-16,scale=1.8,angle=90,layer='waterfront');local_place(items,'Coast / open_boathouse',-8,-14,scale=1.3,layer='waterfront')
  for j in range(5):local_place(items,'Boat / '+str(j%3+1),-5+j*2.5,-20,scale=.7,layer='waterfront')
  if not old:local_place(items,'Coast / beach_walkover',14,-15,scale=1.3,layer='waterfront')
 # Irregular local lanes and suburban branches are explicitly illustrative, not GIS streets.
 def localroads():
  for pts in [[[-22,0],[-10,1],[1,0],[12,2],[22,0]],[[-19,10],[-7,12],[6,10],[20,13]],[[-16,18],[-20,27],[-27,36]],[[-2,17],[0,28],[-3,43]],[[15,17],[21,29],[30,39]]]:
   tube('symbolic neighborhood lane',[[x,y,-.04] for x,y in pts],[.35]*len(pts),7,6)
  for x,y in [(-27,36),(-3,43),(30,39)]:
   pts=[[x+2.1*math.cos(a),y+2.1*math.sin(a),-.035] for a in np.linspace(0,math.tau,33)];tube('suburban turning circle',pts,[.3]*33,7,6)
 key=register('Neighborhood lanes / '+id,localroads);local_place(items,key,0,0,layer='illustrative lanes')
 if id=='southbeach':landmarks_by_city[id]=['Colony inspired hotel','Breakwater inspired hotel','Carlyle inspired hotel','Beacon inspired hotel','Freedom Tower','One Thousand Museum','PAMM','Frost Science','Skyviews wheel']
 local_by_city[id]=items
 # Keep each town's geographic anchor fixed; adjust only display scale for nearby towns.
 display=min(.18,max(.007,t['nearest_town_km']*.31/75));t['display_scale']=display;t['objects']=len(items);t['landmarks']=landmarks_by_city[id];t['profile']='urban skyline' if urban else 'resort coast' if high else 'fishing village' if old else 'coastal town'
 # Orient each neighborhood to the actual coast and keep residential centers on land.
 candidates=[]
 testitems=[o for o in items if o['layer'] in ['suburbs','center','parks']]
 coords=np.array([o['p'][:2] for o in testitems])
 for angle in range(0,360,30):
  aa=math.radians(angle);rr=np.array([[math.cos(aa),-math.sin(aa)],[math.sin(aa),math.cos(aa)]]);cc=coords@rr.T*display+np.array([t['x'],t['y']]);candidates.append((int(shapely.contains_xy(land,cc[:,0],cc[:,1]).sum()),angle))
 bestangle=max(candidates,key=lambda q:q[0])[1];aa=math.radians(bestangle);rr=np.array([[math.cos(aa),-math.sin(aa)],[math.sin(aa),math.cos(aa)]])
 anchor=np.array([t['x'],t['y']]);safeanchor=anchor.copy()
 if not land.contains(Point(*safeanchor)):
  near=nearest_points(land,Point(*anchor))[0];safeanchor=np.array([near.x,near.y])
  for aa in np.linspace(0,math.tau,25):
   trial=safeanchor+.06*np.array([math.cos(aa),math.sin(aa)])
   if land.contains(Point(*trial)):safeanchor=trial;break
 for obj in items:
  xy=rr@np.array(obj['p'][:2]);world=xy*display+anchor
  if obj['layer'] in ['suburbs','center','parks','gardens','planting'] and not land.contains(Point(*world)):
   for fraction in np.linspace(.025,1,41):
    trial=world*(1-fraction)+safeanchor*fraction
    if land.contains(Point(*trial)):world=trial;break
  if obj['asset'].startswith('Boat /') and land.contains(Point(*world)):
   near=nearest_points(land.boundary,Point(*world))[0];boundary=np.array([near.x,near.y])
   for aa in np.linspace(0,math.tau,25):
    trial=boundary+.08*np.array([math.cos(aa),math.sin(aa)])
    if not land.contains(Point(*trial)):world=trial;break
  obj['p'][0],obj['p'][1]=((world-anchor)/display).tolist();obj['r']+=bestangle
 t['district_rotation_degrees']=bestangle
 for obj in items:
  p=np.array(obj['p'])*display+np.array([t['x'],t['y'],.08]);instances.append({**obj,'p':p.tolist(),'s':(np.array(obj['s'])*display).tolist(),'city':id})
 if ti%20==0:print('Districts built',ti+1,'/',len(towns),flush=True)
# Accurate geographic geometry, including holes and offshore islands.
def flatgeom(name,g,z,m,side=False):
 global meshes
 meshes=[]
 for poly in (list(g.geoms) if hasattr(g,'geoms') else [g]):
  if poly.geom_type!='Polygon' or poly.area<.0001:continue
  triangles=shapely.constrained_delaunay_triangles(poly)
  vv=[];ff=[]
  for tri in triangles.geoms:
   pts=list(tri.exterior.coords)[:3];a=len(vv);vv.extend([[x,y,z] for x,y in pts]);ff.append((a,a+1,a+2))
  if side:
   for ring in [poly.exterior,*poly.interiors]:
    coords=list(ring.coords)
    for a,b in zip(coords,coords[1:]):
     k=len(vv);vv.extend([[a[0],a[1],z],[b[0],b[1],z],[b[0],b[1],z-.6],[a[0],a[1],z-.6]]);ff.extend([(k,k+1,k+2),(k,k+2,k+3)])
  if vv:mesh(name,vv,ff,m)
 assets[name]=merge(meshes) if meshes else [];meshes=[]
flatgeom('Geography / Florida coastline',land,0,0,True)
flatgeom('Geography / major lakes',lakes,-.025,5)
# Actual Census primary and secondary roads, clipped to land. All segments retain published geometry.
def georoads():
 for rr in roads:
  g=shape(rr['geometry'])
  for line in list(g.geoms) if hasattr(g,'geoms') else [g]:
   if line.geom_type!='LineString' or line.length<.2:continue
   pts=[[x,y,.026] for x,y in line.coords];tube(rr['name'] or 'Primary road',pts,[.045]*len(pts),7,4)
register('Geography / primary and secondary roads',georoads)
bb=land.bounds
register('Geography / sage sea',lambda:cube('Sea plinth',[(bb[0]+bb[2])/2,(bb[1]+bb[3])/2,-.7],[bb[2]-bb[0]+70,bb[3]-bb[1]+70,.18],5))
# Native GLB exporter with GPU instancing, shared geometry and full source registry.
def export(target,objs,geoassets=None,citymeta=None):
 blob=bytearray();views=[];access=[];gm=[];nodes=[];keymesh={}
 def add(arr,typ,ctype,target=None):
  while len(blob)%4:blob.append(0)
  arr=np.ascontiguousarray(arr);off=len(blob);blob.extend(arr.tobytes());view={'buffer':0,'byteOffset':off,'byteLength':arr.nbytes}
  if target:view['target']=target
  views.append(view);a={'bufferView':len(views)-1,'componentType':ctype,'count':len(arr),'type':typ}
  if typ=='VEC3':a.update(min=arr.min(0).tolist(),max=arr.max(0).tolist())
  access.append(a);return len(access)-1
 used=sorted({o['asset'] for o in objs}|set(geoassets or []))
 for key in used:
  primitives=[]
  for n,v,f,m in assets[key]:
   norm=np.zeros_like(v);face=np.cross(v[f[:,1]]-v[f[:,0]],v[f[:,2]]-v[f[:,0]])
   for k in range(3):np.add.at(norm,f[:,k],face)
   lengths=np.linalg.norm(norm,axis=1);norm[lengths<1e-12]=[0,0,1];norm/=np.where(lengths>1e-12,lengths,1)[:,None]
   v=(v[:,[0,2,1]]*np.array([1,1,-1],np.float32)).astype(np.float32);norm=(norm[:,[0,2,1]]*np.array([1,1,-1],np.float32)).astype(np.float32)
   pa=add(v,'VEC3',5126,34962);na=add(norm,'VEC3',5126,34962);ia=add(f.reshape(-1).astype(np.uint32),'SCALAR',5125,34963);primitives.append({'attributes':{'POSITION':pa,'NORMAL':na},'indices':ia,'material':m})
  if primitives:keymesh[key]=len(gm);gm.append({'name':key,'primitives':primitives})
 for key in geoassets or []:
  if key in keymesh:nodes.append({'name':key,'mesh':keymesh[key]})
 for key in sorted(set(o['asset'] for o in objs)):
  if key not in keymesh:continue
  oo=[o for o in objs if o['asset']==key];positions=np.array([[o['p'][0],o['p'][2],-o['p'][1]] for o in oo],np.float32);scales=np.array([[o['s'][0],o['s'][2],o['s'][1]] for o in oo],np.float32);rotations=np.array([[0,math.sin(math.radians(o['r'])/2),0,math.cos(math.radians(o['r'])/2)] for o in oo],np.float32)
  if len(oo)==1:nodes.append({'name':key,'mesh':keymesh[key],'translation':positions[0].tolist(),'scale':scales[0].tolist(),'rotation':rotations[0].tolist(),'extras':{'layer':oo[0].get('layer')}})
  else:nodes.append({'name':key,'mesh':keymesh[key],'extensions':{'EXT_mesh_gpu_instancing':{'attributes':{'TRANSLATION':add(positions,'VEC3',5126),'SCALE':add(scales,'VEC3',5126),'ROTATION':add(rotations,'VEC4',5126)}}}})
 for t in citymeta or []:nodes.append({'name':t['name'],'translation':[t['x'],.08,-t['y']],'extras':{'town_id':t['id'],'latitude':t['lat'],'longitude':t['lon'],'source_url':t['source_url'],'display_scale':t['display_scale'],'landmarks':t['landmarks']}})
 g={'asset':{'version':'2.0','generator':'Florida Coastal Atlas — sourced geographic base, artistic districts'},'extensionsUsed':['EXT_mesh_gpu_instancing'],'extensionsRequired':['EXT_mesh_gpu_instancing'],'scene':0,'scenes':[{'name':target.stem,'nodes':list(range(len(nodes)))}],'nodes':nodes,'meshes':gm,'materials':[{'name':n,'pbrMetallicRoughness':{'baseColorFactor':[(q/12.92 if q<=.04045 else ((q+.055)/1.055)**2.4) for q in rgb(c)]+[1],'metallicFactor':.05 if 'bronze' in n.lower() else 0,'roughnessFactor':.9},'doubleSided':True} for n,c in colors],'buffers':[{'byteLength':len(blob)}],'bufferViews':views,'accessors':access,'extras':{'units':'1 model unit = 1 km on geographic layers; artistic building scale is exaggerated','projection':geo['projection'],'town_count':len(citymeta or []),'geography_source':'US Census 2025 cartographic boundaries 1:500,000; TIGER primary and secondary roads; Natural Earth major lakes','town_source':'https://www.floridacoastal.co/towns/index.html','accuracy':'Coastline and anchor positions are sourced. District streets, buildings, suburban arrangement and local landmark placements are artistic interpretations.'}}
 j=json.dumps(g,separators=(',',':')).encode();j+=b' '*((-len(j))%4);blob+=b'\0'*((-len(blob))%4);data=struct.pack('<III',0x46546c67,2,28+len(j)+len(blob))+struct.pack('<II',len(j),0x4e4f534a)+j+struct.pack('<II',len(blob),0x004e4942)+blob;target.write_bytes(data)
 assert struct.unpack_from('<III',data)[2]==len(data)
 return len(data)
geokeys=['Geography / sage sea','Geography / Florida coastline','Geography / major lakes','Geography / primary and secondary roads']
size=export(OUT/'florida_coastal_complete_atlas.glb',instances,geokeys,towns);print('Combined atlas exported',size,flush=True)
# District files include an accurate clipped coastal patch at the same geographic scale.
for ti,t in enumerate(towns):
 d=t['display_scale'];radius=75*d;patch=land.intersection(geo_box(t['x']-radius,t['y']-radius,t['x']+radius,t['y']+radius));patch=transform(lambda x,y,z=None:(np.asarray(x)-t['x'],np.asarray(y)-t['y']),patch)
 patchkey='Patch / '+t['id'];flatgeom(patchkey,patch,0,0,True)
 sea=register('Sea patch / '+t['id'],lambda:cube('Sea',[0,0,-.7],[radius*2,radius*2,.18],5))
 cityobjs=[{**obj,'p':(np.array(obj['p'])*d+np.array([0,0,.08])).tolist(),'s':(np.array(obj['s'])*d).tolist()} for obj in local_by_city[t['id']]]
 export(OUT/'towns'/(t['id']+'.glb'),cityobjs,[sea,patchkey])
 del assets[patchkey];del assets[sea]
 if ti%25==0:print('Town GLBs exported',ti+1,flush=True)
for region in regions:
 ts=[t for t in towns if t['area_id']==region['id']];ids={t['id'] for t in ts};objs=[o for o in instances if o['city'] in ids];minx=min(t['x'] for t in ts)-20;maxx=max(t['x'] for t in ts)+20;miny=min(t['y'] for t in ts)-20;maxy=max(t['y'] for t in ts)+20
 clip=geo_box(minx,miny,maxx,maxy);keys=[]
 for name,g,z,m,side in [('Regional coastline',land.intersection(clip),0,0,True),('Regional lakes',lakes.intersection(clip),-.025,5,False)]:
  key=region['id']+' / '+name;flatgeom(key,g,z,m,side);keys.append(key)
 key=register(region['id']+' / Sea',lambda:cube('Regional sea',[(minx+maxx)/2,(miny+maxy)/2,-.7],[maxx-minx,maxy-miny,.18],5));keys.insert(0,key)
 def regional_roads():
  for road in roads:
   gg=shape(road['geometry']).intersection(clip)
   for line in list(gg.geoms) if hasattr(gg,'geoms') else [gg]:
    if line.geom_type=='LineString' and line.length>.1:
     pts=[[x,y,.026] for x,y in line.coords];tube(road['name'] or 'Regional road',pts,[.045]*len(pts),7,4)
 key=register(region['id']+' / Geographic roads',regional_roads);keys.append(key)
 export(OUT/'regions'/(region['id']+'.glb'),objs,keys,ts)
 for key in keys:del assets[key]
# Export reproducible registries and presentation data.
registry=[{k:t[k] for k in ['id','name','coast','area_id','area_name','lat','lon','x','y','display_scale','objects','landmarks','profile','source_url']} for t in towns]
(OUT/'town_registry.json').write_text(json.dumps(registry,indent=2));from pyproj import Transformer
inverse=Transformer.from_crs(geo['projection'],'EPSG:4326',always_xy=True)
def geographic(x,y,z=None):return inverse.transform(np.asarray(x)*1000,np.asarray(y)*1000)
(OUT/'geographic_base.geojson').write_text(json.dumps({'type':'FeatureCollection','features':[{'type':'Feature','properties':{'layer':'Florida coastline','source':'US Census 2025 1:500,000'},'geometry':mapping(transform(geographic,land))},{'type':'Feature','properties':{'layer':'Major lakes','source':'Natural Earth 1:10m'},'geometry':mapping(transform(geographic,lakes))}]},separators=(',',':')))
# Compact renderer inputs cached for previews and viewer verification.
import pickle
with open(ROOT/'atlas_scene.pkl','wb') as f:pickle.dump({'assets':assets,'instances':instances,'towns':registry,'local':local_by_city,'colors':colors,'geokeys':geokeys,'land':land,'lakes':lakes,'roads':roads},f,protocol=5)
(OUT/'README.txt').write_text('''FLORIDA COASTAL — COMPLETE COAST ATLAS
106 website-listed towns, 15 regional GLBs, and 106 individual town GLBs.
The full website list replaces the earlier population cutoff. Website coordinates are used as published (generally two or three decimals).
Accurate geographic base: Census 2025 state cartographic boundaries at 1:500,000, projected in Florida-centered Albers; major lakes from Natural Earth 1:10m; Census TIGER 2025 primary and secondary road geometry. 1 model unit equals 1 km for geographic layers. This is a flat cartographic model, not a terrain/elevation survey.
Landmarks and neighborhoods are deliberately enlarged artistic interpretations. Their positions within each town are illustrative, not surveyed building or street locations. Town anchors are fixed; visual scale adjusts to nearby towns. Roads in the base are geographic; neighborhood lanes in the artwork are symbolic.
Small fishing towns remain small and low-rise; urban and resort districts have appropriate larger centers. Suburban rings add detached homes, pools, villas, gardens and local streets. Existing Miami landmark components are retained.
GLBs use EXT_mesh_gpu_instancing to keep repeated buildings and vegetation efficient. Use a viewer/importer with this extension, including the supplied viewer. The individual town files let you inspect the detailed scenes without navigating the entire coast.
All geometry and materials are embedded; no raster image textures are required. Sources and each town's featured landmarks are recorded in town_registry.json and SOURCES.txt.
''')
(OUT/'SOURCES.txt').write_text('''Town scope, names, coordinates, local highlights and regional grouping:
https://www.floridacoastal.co/towns/index.html
https://www.floridacoastal.co/assets/app.38a4e325aa.js
Geographic coast and state boundary:
https://www.census.gov/geographies/mapping-files/2025/geo/carto-boundary-file.html
https://www2.census.gov/geo/tiger/GENZ2025/shp/cb_2025_us_state_500k.zip
Primary roads:
https://www2.census.gov/geo/tiger/TIGER2025/PRISECROADS/tl_2025_12_prisecroads.zip
Major lakes:
https://www.naturalearthdata.com/downloads/10m-physical-vectors/
https://naciscdn.org/naturalearth/10m/physical/ne_10m_lakes.zip
Additional regional architectural cues:
https://www.visittampabay.com/arts-and-culture.html
https://www.flagler.edu/where-your-history-begins
https://www.daytonabeach.com/things-to-do/districts/ponce-inlet/
https://visitfloridakeys.com/sites/default/files/2025-10/Florida-Keys-Key-West-Historic-Guide.pdf
Miami cues: see existing Miami landmark references in the project.
''')
print(json.dumps({'towns':len(towns),'regions':len(regions),'objects':len(instances),'assets':len(assets),'combined_bytes':size}),flush=True)
