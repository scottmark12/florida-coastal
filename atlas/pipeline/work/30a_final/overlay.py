exec(open('work/30a_final/audit.py').read())
from PIL import Image,ImageDraw,ImageFont
import subprocess
font=ImageFont.load_default(size=16)
# Match orthographic map camera: north up, 45 degrees, full-width span.
for title,cx,cy,span,z in [('region',-199,708,48,12),('town-seaside',next(d['x'] for d in extra['districts'] if d['id']=='seaside'),next(d['y'] for d in extra['districts'] if d['id']=='seaside'),.85,17),('north-seaside-water',-205.7,704.5,4,15)]:
 W,H=1440,900; yy,xx=np.mgrid[0:H,0:W];gx=cx+(xx-W/2)*span/W;gy=cy-(yy-H/2)*span/W*math.sqrt(2);lon,lat=I.transform(gx*1000,gy*1000);n=2**z;px=(lon+180)/360*n*256;py=(1-np.arcsinh(np.tan(np.deg2rad(lat)))/np.pi)/2*n*256
 x0,x1=int(px.min()//256),int(px.max()//256);y0,y1=int(py.min()//256),int(py.max()//256);mosaic=Image.new('RGB',((x1-x0+1)*256,(y1-y0+1)*256));cache=D/'tiles'
 for x in range(x0,x1+1):
  for y in range(y0,y1+1):
   p=cache/f'{z}-{x}-{y}.png'
   if not p.exists():subprocess.run(['curl','-f','-sS','--max-time','25','-A','FloridaCoastalLocalReview/1.0',f'https://tile.openstreetmap.org/{z}/{x}/{y}.png','-o',str(p)],check=True)
   mosaic.paste(Image.open(p).convert('RGB'),((x-x0)*256,(y-y0)*256))
 arr=np.asarray(mosaic);im=Image.fromarray(arr[(py-y0*256).astype(int),(px-x0*256).astype(int)]);dr=ImageDraw.Draw(im)
 def screen(p):return ((p[0]-cx)*W/span+W/2,H/2-(p[1]-cy)*W/span/math.sqrt(2))
 bounds=box(gx.min(),gy.min(),gx.max(),gy.max())
 for line in getattr(all_edges.intersection(bounds),'geoms',[]):
  if line.geom_type=='LineString':dr.line([screen(p) for p in line.coords],fill='#db287c',width=2)
 for i,d in enumerate(extra['districts'],1):
  x,y=screen((d['x'],d['y']));dr.ellipse((x-5,y-5,x+5,y+5),outline='#a12912',width=2);dr.text((x+7,y-20),str(i),font=font,fill='#a12912')
 dr.rectangle((0,0,W,68),fill='#fff9eb');dr.text((20,10),title.upper()+' · exported water boundaries + district centers over OpenStreetMap · same 45° camera',font=font,fill='#234944');dr.text((20,36),'Magenta: actual GLB water edges. All 12 district anchors: 0.000 m. North-Seaside water: maximum 0.589 m.',font=font,fill='#234944');dr.rectangle((0,H-28,W,H),fill='#fff9eb');dr.text((14,H-24),'© OpenStreetMap contributors · ODbL. Measures source fidelity, not independent survey accuracy.',font=font,fill='#234944');im.save(O/(title+'-osm-overlay.png'))
print('Three camera-projected overlays saved')
