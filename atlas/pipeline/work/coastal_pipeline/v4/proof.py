"""Audit serialized coastline and project export edges onto attributed OSM tiles."""
import sys,json,gzip,struct,csv,urllib.request
from pathlib import Path
sys.path.insert(0,'work/30a_finish');from geometry import *
from PIL import Image,ImageDraw,ImageFont
from collections import Counter
from shapely.strtree import STRtree
m=json.load(open(sys.argv[1]));O=Path('outputs/coastal_pipeline_v4')/m['id'];from mesh_export import read_triangles;coords=read_triangles(O/'base.glb.gz')['#f1e3c8'];edges=Counter()
for tri in coords.reshape(-1,3,3):
 pts=[(float(p[0]),float(-p[2])) for p in tri]
 for i in range(3):edges[tuple(sorted([pts[i],pts[(i+1)%3]]))]+=1
boundary=unary_union([LineString(e) for e,n in edges.items() if n==1]);source=project(shape(json.load(open(m['inputs']['shoreline']['path']))));samples=[]
edge_tree=STRtree(list(getattr(boundary,'geoms',[boundary])))
for line in getattr(source,'geoms',[source]):
 for x,y in line.coords:samples.append(edge_tree.geometries[edge_tree.nearest(Point(x,y))].distance(Point(x,y))*1000)
report=json.load(open(O/'report.json'));report['exported_boundary_source_error_m']=max(samples);report['boundary_check']='Every input coast vertex distance to actual serialized land boundary; not a survey';(O/'report.json').write_text(json.dumps(report,indent=2))
meta=json.load(open(O/'scene.json'));W,H=1440,900;cx,cy=meta['camera']['center'];span=meta['camera']['desktopSpan'];yy,xx=np.mgrid[0:H,0:W];gx=cx+(xx-W/2)*span/W;gy=cy-(yy-H/2)*span/W*math.sqrt(2);lon,lat=I.transform(gx*1000,gy*1000);z=12;n=2**z;px=(lon+180)/360*n*256;py=(1-np.arcsinh(np.tan(np.deg2rad(lat)))/np.pi)/2*n*256;x0,x1=int(px.min()//256),int(px.max()//256);y0,y1=int(py.min()//256),int(py.max()//256);mosaic=Image.new('RGB',((x1-x0+1)*256,(y1-y0+1)*256));cache=HERE if False else Path('work/coastal_pipeline/v3/tiles');cache.mkdir(exist_ok=True)
for x in range(x0,x1+1):
 for y in range(y0,y1+1):
  p=cache/f'{z}-{x}-{y}.png'
  if not p.exists():p.write_bytes(urllib.request.urlopen(urllib.request.Request(f'https://tile.openstreetmap.org/{z}/{x}/{y}.png',headers={'User-Agent':'FloridaCoastalLocalReview/1.0'}),timeout=25).read())
  mosaic.paste(Image.open(p).convert('RGB'),((x-x0)*256,(y-y0)*256))
a=np.asarray(mosaic);im=Image.fromarray(a[(py-y0*256).astype(int),(px-x0*256).astype(int)]);dr=ImageDraw.Draw(im);font=ImageFont.load_default(size=16)
def screen(x,y):return ((x-cx)*W/span+W/2,H/2-(y-cy)*W/span/math.sqrt(2))
for line in getattr(boundary,'geoms',[boundary]):dr.line([screen(*pt) for pt in line.coords],fill='#ce3876',width=2)
rows=list(csv.DictReader(open(O/'accuracy.csv')))
for row in rows:
 row['anchor_definition']=next(d.get('centerMeaning','OSM place-label anchor') for d in meta['districts'] if d['name']==row['district'])
 row['model_lon'],row['model_lat']=I.transform(float(row['model_x_km'])*1000,float(row['model_y_km'])*1000)
with (O/'accuracy.csv').open('w',newline='') as f:
 writer=csv.DictWriter(f,fieldnames=rows[0]);writer.writeheader();writer.writerows(rows)
for row in rows:
 x,y=screen(float(row['model_x_km']),float(row['model_y_km']));dr.ellipse((x-5,y-5,x+5,y+5),fill='#a84d20');dr.text((x+8,y-20),row['district']+' '+row['distance_m']+' m',font=font,fill='#8e2f13')
dr.rectangle((0,0,W,80),fill='#fff9ed');dr.text((20,12),m['id'].upper()+' / exported land edges over OpenStreetMap · same 45° region camera',font=font,fill='#36554b');dr.text((20,40),f'Magenta: GLB edges. Maximum source-coast deviation: {max(samples):.3f} m. Source fidelity, not surveyed ground truth.',font=font,fill='#36554b');dr.rectangle((0,H-30,W,H),fill='#fff9ed');dr.text((20,H-25),'© OpenStreetMap contributors · ODbL · Map tiles © OpenStreetMap',font=font,fill='#36554b');im.save(O/'region-osm-overlay.png');print('export boundary error',max(samples))
