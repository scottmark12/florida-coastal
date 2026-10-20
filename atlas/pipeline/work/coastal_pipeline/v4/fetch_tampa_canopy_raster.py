import json,urllib.request,urllib.parse
from pathlib import Path
from PIL import Image
P=Path('work/coastal_pipeline/v4/tampa-south-shore');ds=json.load(open(P/'districts.json'));url='https://gis.waterinstitute.usf.edu/arcgis/rest/services/Maps/Tampa_2021_TreeCanopy/MapServer';rasters=[]
for d in ds:
 if d['id'] not in ['hydepark','seminole']:continue
 b=[d['lon']-.024,d['lat']-.024,d['lon']+.024,d['lat']+.024];p=P/(d['id']+'-canopy-2021.png')
 params=dict(f='image',bbox=','.join(map(str,b)),bboxSR=4326,imageSR=4326,size='2048,2048',format='png32',transparent='true',layers='show:11')
 urllib.request.urlretrieve(url+'/export?'+urllib.parse.urlencode(params),p)
 im=Image.open(p);assert im.size==(2048,2048)
 rasters.append({'path':str(p),'bounds':b,'canopyRGB':[38,115,0],'source':url+'/11','surveyYear':2021,'district':d['id']});print(d['id'],p.stat().st_size,flush=True)
m=json.load(open(P/'manifest.json'));m['inputs']['canopyRasters']=[r for r in m['inputs'].get('canopyRasters',[]) if 'worldcover' in r['path']]+rasters;(P/'manifest.json').write_text(json.dumps(m,indent=2))
