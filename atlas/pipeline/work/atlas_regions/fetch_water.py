from pathlib import Path
from concurrent.futures import ThreadPoolExecutor
import urllib.request,zipfile
O=Path('work/coast_geography')
def fetch(fips):
 name='tl_2025_'+fips+'_areawater';p=O/(name+'.zip')
 if not p.exists():urllib.request.urlretrieve('https://www2.census.gov/geo/tiger/TIGER2025/AREAWATER/'+name+'.zip',p)
 with zipfile.ZipFile(p) as z:z.extractall(O/name)
 print(fips,p.stat().st_size,flush=True)
with ThreadPoolExecutor(max_workers=5) as pool:list(pool.map(fetch,['12086','12057','12103','12011','12081']))
