import sys
sys.path.insert(0,'work/30a_finish')
from geometry import *
from PIL import Image,ImageDraw,ImageFilter
from shapely import contains_xy
O=Path('outputs/30a_finish');G=json.loads((D/'geometry.json').read_text());land=shape(G['land']);cover=shape(json.loads((D/'canopy.json').read_text())['geometry']);ds=json.loads((D/'districts.json').read_text());records={}
roads=[]
for obj in json.loads((D/'map-data.json').read_text())['elements']:
 if obj.get('tags',{}).get('highway') and len(obj.get('geometry',[]))>1:
  roads.append(project(LineString([(p['lon'],p['lat']) for p in obj['geometry']])))
for d in ds:
 N=384;b=[d['x']-1.2,d['y']-1.2,d['x']+1.2,d['y']+1.2];X,Y=np.meshgrid(np.linspace(b[0],b[2],N),np.linspace(b[3],b[1],N));onland=contains_xy(land,X,Y);wood=contains_xy(cover,X,Y);onland=onland & ~contains_xy(shape(G['coast']).buffer(.095),X,Y)
 # Authored loose garden groves, based only on geographic land constraints and deterministic waves.
 clumps=np.sin(X*51+np.sin(Y*27)*2)+np.sin(Y*59+np.cos(X*23)*2)
 mask=np.where(wood,230,np.where(clumps>-.15,180,0))*onland
 im=Image.fromarray(mask.astype('uint8')).filter(ImageFilter.GaussianBlur(1.3));draw=ImageDraw.Draw(im)
 for road in roads:
  if road.intersects(box(*b)):
   draw.line([((x-b[0])/(b[2]-b[0])*(N-1),(b[3]-y)/(b[3]-b[1])*(N-1)) for x,y in road.coords],fill=0,width=2)
 im.save(O/'canopies'/(d['id']+'.png'))
 records[d['id']]={'bounds':b,'file':'canopies/'+d['id']+'.png','reference':'https://www.openstreetmap.org/copyright','method':'OSM land and mapped woodland; additional garden groves are authored illustration, not imagery-derived or a tree survey.'}
p=O/'30a.json';j=json.loads(p.read_text());j['neighborhoodCanopies']=records;j['presentationSource']='OSM / ODbL + original procedural illustration; no satellite imagery dependency';p.write_text(json.dumps(j,separators=(',',':')))
# Decorative sand surface follows the exact same coast, on land only. Not a changed shoreline.
from shapely import constrained_delaunay_triangles
beach=shape(G['coast']).buffer(.10).intersection(land);v=[]
for poly in parts(beach):
 for t in constrained_delaunay_triangles(poly).geoms:
  for x,y in list(t.exterior.coords)[:3]:v.extend([round(x,6),.006,-round(y,6)])
Path('outputs/30a_art/sand.json').write_text(json.dumps(v,separators=(',',':')))
print('OSM-only masks; sand vertices',len(v)//3)
