from geometry import *
from PIL import Image,ImageDraw,ImageFilter
G=json.loads((D/'geometry.json').read_text());forest=shape(G['forest']);land=shape(G['land']);woods=[]
for e in json.loads((D/'map-data.json').read_text())['elements']:
 if e['type']=='way' and (e['tags'].get('natural')=='wood' or e['tags'].get('landuse')=='forest'):
  p=polygons(e)
  if not p.is_empty:woods.append(project(p))
canopy=unary_union([forest]+woods).intersection(land);bounds=canopy.bounds;N=1024;im=Image.new('L',(N,N),0);draw=ImageDraw.Draw(im)
def xy(p):return ((p[0]-bounds[0])/(bounds[2]-bounds[0])*(N-1),(bounds[3]-p[1])/(bounds[3]-bounds[1])*(N-1))
for p in parts(canopy):
 draw.polygon([xy(pt) for pt in p.exterior.coords],fill=255)
 for r in p.interiors:draw.polygon([xy(pt) for pt in r.coords],fill=0)
im=im.filter(ImageFilter.GaussianBlur(2));im.save('outputs/30a_finish/canopy-mask.png')
(D/'canopy.json').write_text(json.dumps({'bounds':bounds,'geometry':mapping(canopy),'note':'OSM protected forest plus mapped woodland; blurred canopy cover is an illustration, not a measured tree-density census.'},separators=(',',':')))
print(bounds)
