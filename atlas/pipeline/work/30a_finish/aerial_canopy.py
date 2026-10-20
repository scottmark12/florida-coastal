from geometry import *
from PIL import Image,ImageFilter
from shapely import contains_xy,prepare
import subprocess,urllib.parse
O=Path('outputs/30a_finish');P=O/'canopies';P.mkdir(exist_ok=True);land=shape(json.loads((D/'geometry.json').read_text())['land']);prepare(land);records={}
for d in json.loads((D/'districts.json').read_text()):
 x,y=d['lon'],d['lat'];q=urllib.parse.urlencode({'bbox':f'{x-.009},{y-.007},{x+.009},{y+.007}','bboxSR':4326,'imageSR':4326,'size':'512,512','format':'jpg','f':'json'});url='https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/export?'+q;meta=D/(d['id']+'-aerial.json');jpg=D/(d['id']+'-aerial.jpg')
 if not meta.exists():subprocess.run(['curl','-sS','--max-time','40',url,'-o',str(meta)])
 try:
  info=json.loads(meta.read_text());href=info['href']
  if not jpg.exists():subprocess.run(['curl','-sS','--max-time','40',href,'-o',str(jpg)])
  rgb=np.asarray(Image.open(jpg).convert('RGB'),dtype=float);e=info['extent'];bl=project(Point(e['xmin'],e['ymin']));tr=project(Point(e['xmax'],e['ymax']));bounds=[bl.x,bl.y,tr.x,tr.y]
  X,Y=np.meshgrid(np.linspace(bounds[0],bounds[2],512),np.linspace(bounds[3],bounds[1],512));lon,lat=I.transform(X*1000,Y*1000);u=np.clip(((lon-e['xmin'])/(e['xmax']-e['xmin'])*511).astype(int),0,511);v=np.clip(((e['ymax']-lat)/(e['ymax']-e['ymin'])*511).astype(int),0,511);a=rgb[v,u];r,g,b=a[:,:,0],a[:,:,1],a[:,:,2];mask=(g>r*1.035)&(g>b*1.035)&(a.mean(2)<151)&contains_xy(land,X,Y)
  image=Image.fromarray((mask*255).astype('uint8')).filter(ImageFilter.MaxFilter(3)).filter(ImageFilter.GaussianBlur(1));image.save(P/(d['id']+'.png'))
  records[d['id']]={'bounds':bounds,'file':'canopies/'+d['id']+'.png','reference':url,'method':'RGB vegetation mask from Esri World Imagery, constrained to OSM land. Estimated cover, not classified tree species or a stem-count survey.'};print(d['id'],round(mask.mean(),3),flush=True)
 except Exception as ex:print('FAILED',d['id'],str(ex),flush=True)
(D/'aerial-canopies.json').write_text(json.dumps(records,indent=2));p=O/'30a.json';e=json.loads(p.read_text());e['neighborhoodCanopies']=records;p.write_text(json.dumps(e,separators=(',',':')))
