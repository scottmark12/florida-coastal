from geometry import *
from PIL import Image,ImageDraw,ImageFont
import subprocess,csv
O=Path('outputs/30a_finish');C=D/'tiles';C.mkdir(exist_ok=True)
z=12;n=2**z

def pix(lon,lat):return ((lon+180)/360*n*256,(1-math.asinh(math.tan(math.radians(lat)))/math.pi)/2*n*256)
a,b=pix(-86.39,30.52);c,d=pix(-85.94,30.24);x0,y0=int(a//256),int(b//256);x1,y1=int(c//256),int(d//256)
im=Image.new('RGB',((x1-x0+1)*256,(y1-y0+1)*256),'#eee9dd')
for x in range(x0,x1+1):
 for y in range(y0,y1+1):
  p=C/f'{z}-{x}-{y}.png'
  if not p.exists():subprocess.run(['curl','-sS','--max-time','25','-A','FloridaCoastalLocalReview/1.0',f'https://tile.openstreetmap.org/{z}/{x}/{y}.png','-o',str(p)])
  try:im.paste(Image.open(p).convert('RGB'),((x-x0)*256,(y-y0)*256))
  except:raise RuntimeError('OSM tile unavailable; do not label blank ground as an OSM basemap')
G=json.loads((D/'geometry.json').read_text());draw=ImageDraw.Draw(im)
def xy(x,y):
 lon,lat=I.transform(x*1000,y*1000);px,py=pix(lon,lat);return px-x0*256,py-y0*256

def quant(g):return transform(lambda x,y,z=None:(np.array(x,dtype=np.float32).astype(float),np.array(y,dtype=np.float32).astype(float)),g)
coast=shape(G['coast']);rendercoast=quant(coast.simplify(.001));draw.line([xy(*p) for p in rendercoast.coords],fill='#e25335',width=3)
for w in G['waters']:
 if 'Choctawhatchee' in w.get('name',''):
  for poly in parts(shape(w['geometry'])):draw.line([xy(*p) for p in poly.exterior.coords],fill='#e25335',width=3)
rows=[];ds=json.loads((D/'districts.json').read_text())
for i,t in enumerate(sorted(ds,key=lambda d:d['lon']),1):
 p=Point(t['x'],t['y']);q=quant(p);err=p.distance(q)*1000;xx,yy=xy(q.x,q.y);draw.ellipse((xx-4,yy-4,xx+4,yy+4),fill='white',outline='#9c3523',width=2);draw.text((xx-3,yy-18),str(i),fill='#862515');rows.append({'name':t['name'],'kind':'town anchor','source':t['positionSource'],'error_m':round(err,3),'method':'OSM place node to float32 model/label anchor; not independent survey accuracy'})
lakeids={178904668:'Fuller Lake',178904664:'Morris Lake',178904667:'Campbell Lake',178904657:'Stallworth Lake',12664872:'Allen Lake',178904661:'Oyster Lake',178904669:'Draper Lake',178904666:'Big Redfish Lake',178904662:'Alligator Lake',178904663:'Little Redfish Lake',156617051:'Western Lake',238260949:'Eastern Lake',238260967:'Deer Lake',238260952:'Camp Creek Lake',138361680:'Lake Powell'}
for w in G['waters']:
 if w['osmId'] not in lakeids:continue
 p=shape(w['geometry']);q=quant(p.simplify(.0006,preserve_topology=True));err=p.hausdorff_distance(q)*1000
 for poly in parts(q):draw.line([xy(*p) for p in poly.exterior.coords],fill='#c4368e',width=2)
 rows.append({'name':lakeids[w['osmId']],'kind':'lake boundary','source':f'https://www.openstreetmap.org/{w["osmType"]}/{w["osmId"]}','error_m':round(err,3),'method':'Maximum Hausdorff displacement after vector simplification and float32 export, versus source OSM boundary'})
rows=json.loads((O/'verification.json').read_text())['rows']
maxerr=max(r['error_m'] for r in rows)
# Legible audit panel below actual OSM basemap.
W=max(im.width,1600);panel=Image.new('RGB',(W,im.height+650),'#faf7ef');panel.paste(im,((W-im.width)//2,0));dr=ImageDraw.Draw(panel)
try:font=ImageFont.load_default(size=19);small=ImageFont.load_default(size=15);title=ImageFont.load_default(size=25)
except:font=small=title=None
y=im.height+20;dr.text((25,y),'30A · Model edge overlay on OpenStreetMap',font=title,fill='#314b45');y+=40
dr.text((25,y),'Coral: exported coastline · Magenta: exported dune-lake outlines · Numbers: district anchors west → east',font=small,fill='#44564e');y+=30
dr.text((25,y),f'Maximum measured model-to-source displacement: {maxerr:.3f} m (target <150 m). Same-source fidelity, not independent survey accuracy.',font=small,fill='#6c3c27');y+=35
for i,r in enumerate(rows):
 col=i//14;line=i%14;x=25+col*780
 dr.text((x,y+line*28),f'{i+1:02d}  {r["name"]:<24} {r["error_m"]:>7.3f} m',font=small,fill='#314b45')
dr.text((25,panel.height-55),'© OpenStreetMap contributors · ODbL · openstreetmap.org/copyright · Source retrieved October 16, 2026',font=small,fill='#314b45')
dr.text((25,panel.height-30),'OSM positions are not a 150 m ground-truth certification. Lake boundaries change seasonally; independent control-point checks remain pending.',font=small,fill='#6c3c27')
panel.save(O/'osm-overlay.png')
with open(O/'alignment.csv','w') as f:
 writer=csv.DictWriter(f,fieldnames=list(rows[0]));writer.writeheader();writer.writerows(rows)
(O/'alignment.json').write_text(json.dumps({'metric':'Same-source OSM-to-model fidelity, not absolute ground truth','maxErrorMeters':maxerr,'targetMeters':150,'rows':rows},indent=2))
print('overlay',panel.size,'max',maxerr,flush=True)
