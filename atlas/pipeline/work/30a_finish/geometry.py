import sys,json,math,xml.etree.ElementTree as ET
from pathlib import Path
sys.path.insert(0,'work/florida_atlas/python_pkgs')
import numpy as np
from shapely.geometry import Polygon,LineString,Point,box,mapping,shape
from shapely.ops import unary_union,linemerge,polygonize,transform
from shapely import make_valid
from pyproj import Transformer
D=Path('work/30a_finish/source');proj='+proj=aea +lat_1=24 +lat_2=31.5 +lat_0=24 +lon_0=-84 +datum=NAD83 +units=m +no_defs';T=Transformer.from_crs('EPSG:4326',proj,always_xy=True);I=Transformer.from_crs(proj,'EPSG:4326',always_xy=True)
def project(g):return transform(lambda x,y,z=None:tuple(np.array(v)/1000 for v in T.transform(x,y)),g)
def parts(g):return [g] if g.geom_type=='Polygon' else [p for p in getattr(g,'geoms',[]) if p.geom_type=='Polygon']
def polygons(e):
 if e['type']=='way':
  pts=[(p['lon'],p['lat']) for p in e.get('geometry',[])];return make_valid(Polygon(pts)) if len(pts)>3 and pts[0]==pts[-1] else Polygon()
 if e['type']!='relation':return Polygon()
 groups={}
 for role in ['outer','inner']:
  ls=[LineString([(p['lon'],p['lat']) for p in m['geometry']]) for m in e.get('members',[]) if m.get('role','outer')==role and len(m.get('geometry',[]))>1]
  groups[role]=unary_union(list(polygonize(unary_union(ls)))) if ls else Polygon()
 return make_valid(groups['outer'].difference(groups['inner']))
def forest_source():
 root=ET.parse(D/'forest-full.xml').getroot();nodes={n.get('id'):{'lon':float(n.get('lon')),'lat':float(n.get('lat'))} for n in root.findall('node')};ways={w.get('id'):[nodes[n.get('ref')] for n in w.findall('nd')] for w in root.findall('way')};r=root.find("relation[@id='11982445']")
 return {'type':'relation','id':11982445,'tags':{'name':'Point Washington State Forest'},'members':[{'role':m.get('role'),'geometry':ways[m.get('ref')]} for m in r.findall('member') if m.get('ref') in ways]}
def build():
 coast=json.loads((D/'coast-test-coffee.json').read_text())['elements'];lines=linemerge(unary_union([LineString([(p['lon'],p['lat']) for p in e['geometry']]) for e in coast]));gulf=max(lines.geoms,key=lambda g:g.length);coords=list(gulf.coords)
 # OSM Gulf coastline runs west to east. Close only outside the view to the north.
 if coords[0][0]>coords[-1][0]:coords.reverse()
 land=Polygon(coords+[(coords[-1][0],30.70),(coords[0][0],30.70)])
 water=[]
 for e in json.loads((D/'water-small.json').read_text())['elements']:
  p=polygons(e)
  if not p.is_empty:water.append((e,p))
 waterunion=unary_union([g for e,g in water]);land=make_valid(land.difference(waterunion));clip=box(-86.40,30.20,-85.76,30.59);land=land.intersection(clip)
 forest=polygons(forest_source()).intersection(land);print('land',land.area,'forest',forest.area,'water',len(water))
 out={'projection':proj,'land':mapping(project(land)),'forest':mapping(project(forest)),'coast':mapping(project(gulf)),'waters':[{'osmType':e['type'],'osmId':e['id'],'name':e.get('tags',{}).get('name',''),'geometry':mapping(project(g.intersection(clip)))} for e,g in water if g.intersects(clip)]}
 (D/'geometry.json').write_text(json.dumps(out,separators=(',',':')))
 # Map unlabelled OSM water polygons for lake identification against official named-lake guide.
 from PIL import Image,ImageDraw
 im=Image.new('RGB',(2200,850),'#faf7ed');draw=ImageDraw.Draw(im)
 def xy(lon,lat):return ((lon+86.38)/.43*2150+25,800-(lat-30.25)/.15*750)
 for e,g in water:
  if g.area<.000008 or g.area>.009:continue
  for p in parts(g):draw.polygon([xy(*pt) for pt in p.exterior.coords],fill='#77b6b2',outline='#315c66')
  c=g.representative_point();draw.text(xy(c.x,c.y),str(e['id'])+' '+e.get('tags',{}).get('name',''),fill='#222222')
 for e in json.loads((D/'map-data.json').read_text())['elements']:
  if e['type']=='node' and 'place' in e['tags']:draw.text(xy(e['lon'],e['lat']),e['tags'].get('name',''),fill='#b43e25')
 im.save('outputs/30a_finish/water-identification.png')
if __name__=='__main__':build()
