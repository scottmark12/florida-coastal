import urllib.request,urllib.parse,json
from pathlib import Path
u='https://services1.arcgis.com/lDFzr3JyGEn5Eymu/ArcGIS/rest/services/Land_Use_Land_Cover/FeatureServer/0/query'
params={'where':'Shape__Area > 2000000','outFields':'LANDUSE_CODE,LANDUSE_DESCRIPTION,LEVEL1_LANDUSE_CODE,LANDUSE_YEAR','f':'geojson','outSR':'4326','maxAllowableOffset':'.001','resultRecordCount':2000,'orderByFields':'OBJECTID'}
features=json.loads(Path('work/atlas_regions/landcover.json').read_text())['features']
for page in range(8,40):
 params['resultOffset']=page*2000
 req=urllib.request.Request(u,data=urllib.parse.urlencode(params).encode())
 d=json.load(urllib.request.urlopen(req,timeout=120));fs=d.get('features',[]);features+=fs;print(page,len(fs),flush=True)
 if len(fs)<2000:break
Path('work/atlas_regions/landcover.json').write_text(json.dumps({'type':'FeatureCollection','features':features}))
print('Land cover',len(features),flush=True)
