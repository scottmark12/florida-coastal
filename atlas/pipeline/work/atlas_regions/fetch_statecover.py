import urllib.request,urllib.parse,json
from pathlib import Path
url='https://gis.myfwc.com/hosting/rest/services/Open_Data/Cooperative_Land_Cover/MapServer/1/query'
features=[]
for offset in range(0,30000,1000):
 q={'f':'geojson','where':'Shape_Area > 5000000','outFields':'NAME_STATE,STATE','outSR':4326,'maxAllowableOffset':.003,'resultOffset':offset,'resultRecordCount':1000,'orderByFields':'OBJECTID'}
 d=json.load(urllib.request.urlopen(url+'?'+urllib.parse.urlencode(q),timeout=90));batch=d.get('features',[]);features+=batch;print(offset,len(batch),flush=True)
 if not d.get('exceededTransferLimit') and len(batch)<1000:break
Path('work/atlas_regions/statecover.json').write_text(json.dumps({'type':'FeatureCollection','features':features}));print('DONE',len(features))
