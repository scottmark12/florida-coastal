"""Download excluded Microsoft footprint tiles for the new town windows."""
import json,csv,math,urllib.request,concurrent.futures
from pathlib import Path
P=Path(__file__).resolve().parent
spec=json.load(open(P/'coast-additions.json'));keys=set()
def quad(lon,lat):
 x=int((lon+180)/360*512);y=int((1-math.asinh(math.tan(math.radians(lat)))/math.pi)/2*512);return ''.join(str(((x>>i)&1)+2*((y>>i)&1)) for i in range(8,-1,-1))
for row in spec:
 for dx in [-.045,.045]:
  for dy in [-.035,.035]:keys.add(quad(row[3]+dx,row[4]+dy))
index=P/'work/coastal_pipeline/downloads/ms-dataset-links.csv'
if not index.exists():index.parent.mkdir(parents=True,exist_ok=True);index.write_bytes(urllib.request.urlopen('https://minedbuildings.z5.web.core.windows.net/global-buildings/dataset-links.csv').read())
rows=[r for r in csv.DictReader(index.open()) if r['QuadKey'] in keys and r['Location']=='UnitedStates'];(P/'addition-building-downloads.json').write_text(json.dumps(rows,indent=2)+'\n')
def get(r):
 p=P/'work/coastal_pipeline/raw'/('nature-ms-'+r['QuadKey']+'.gz');p.parent.mkdir(exist_ok=True)
 if not p.exists():p.write_bytes(urllib.request.urlopen(r['Url'],timeout=180).read())
 print(r['QuadKey'],p.stat().st_size,flush=True)
with concurrent.futures.ThreadPoolExecutor(max_workers=4) as ex:list(ex.map(get,rows))
