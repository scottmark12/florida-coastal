import sys,json,urllib.request,time
from pathlib import Path
sys.path.insert(0,'work/florida_atlas/python_pkgs')
from pyproj import Transformer
tr=Transformer.from_crs(4326,'+proj=aea +lat_1=24 +lat_2=31.5 +lat_0=24 +lon_0=-84 +datum=NAD83 +units=m +no_defs',always_xy=True)
D=json.loads(Path('work/atlas_regions/districts.json').read_text());dest={'miami':(-80.278,25.795),'southbeach':(-80.278,25.795),'tampa':(-82.533,27.980),'st-petersburg':(-82.533,27.980),'30a':(-85.798,30.357)}
rows=[dict(town=k,id=None,lon=p[0],lat=p[1]) for k,p in {'miami':(-80.193,25.765),'southbeach':(-80.134,25.78),'tampa':(-82.458,27.95),'st-petersburg':(-82.638,27.773),'30a':(-86.137,30.320)}.items()]+D
out=[]
for d in rows:
 if d['town'] not in dest:continue
 lon,lat=dest[d['town']];url=f"https://router.project-osrm.org/route/v1/driving/{d['lon']},{d['lat']};{lon},{lat}?overview=simplified&geometries=geojson"
 try:
  data=json.load(urllib.request.urlopen(url,timeout=20));r=data['routes'][0];points=[list(tr.transform(*p)) for p in r['geometry']['coordinates']];out.append(dict(town=d['town'],district=d['id'],points=[[x/1000,y/1000] for x,y in points],minutes=round(r['duration']/60),asOf='OSRM road estimate · no live traffic · Oct 16, 2026',source='https://project-osrm.org/',distanceKm=round(r['distance']/1000,1)))
  print(d['id'] or d['town'],out[-1]['minutes'],flush=True)
 except Exception as e:print('Unavailable',d['id'],str(e),flush=True)
 time.sleep(.3)
 Path('work/atlas_regions/routes.json').write_text(json.dumps(out))
