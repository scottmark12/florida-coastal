"""Regional forest/wooded wetland inputs from Florida FWC Cooperative Land Cover."""
import sys,json,urllib.request,urllib.parse,time
from pathlib import Path
P=Path('work/coastal_pipeline/v4')/sys.argv[1];m=json.load(open(P/'manifest.json'));url='https://gis.myfwc.com/hosting/rest/services/Open_Data/Cooperative_Land_Cover/MapServer/1/query';fs=[]
for offset in range(0,30000,1000):
 params={'where':"NAME_STATE IN ('Mesic Flatwoods','Mesic Hammock','Hydric Hammock','Xeric Hammock','Mixed Hardwood-Coniferous','Upland Pine','Sand Pine Scrub','Tree Plantations','Mangrove Swamp','Cypress','Basin Swamp','Floodplain Swamp','Freshwater Forested Wetlands','Wet Flatwoods','Slope Forest','Orchards/Groves')",'geometry':','.join(map(str,m['bounds'])),'geometryType':'esriGeometryEnvelope','inSR':4326,'spatialRel':'esriSpatialRelIntersects','outFields':'NAME_STATE,STATE','f':'geojson','outSR':4326,'resultRecordCount':1000,'resultOffset':offset,'orderByFields':'OBJECTID'}
 for attempt in range(4):
  try:
   data=json.load(urllib.request.urlopen(url+'?'+urllib.parse.urlencode(params),timeout=90))
   if 'error' in data:raise RuntimeError(data['error'])
   break
  except Exception:
   if attempt==3:raise
   time.sleep(2)
 fs+=data['features'];print(offset,len(data['features']),flush=True)
 if len(data['features'])<1000:break
out=P/'forest-cover.json';out.write_text(json.dumps({'type':'FeatureCollection','features':fs},separators=(',',':')));m['inputs']['canopy']={'path':str(out),'source':url.rsplit('/',1)[0],'description':'Florida FWC Cooperative Land Cover: mapped forest and forested wetland classes only.'};(P/'manifest.json').write_text(json.dumps(m,indent=2))
