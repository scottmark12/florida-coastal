from geometry import *
import subprocess
A=Path('work/atlas_regions');r=json.loads((A/'routes.json').read_text());r=[e for e in r if e['town']!='30a'];ds=json.loads((D/'districts.json').read_text());dest='-85.798,30.357'
for d in ds:
 url=f'https://router.project-osrm.org/route/v1/driving/{d["lon"]},{d["lat"]};{dest}?overview=simplified&geometries=geojson';p=D/('route-'+d['id']+'.json');subprocess.run(['curl','-sS','--max-time','30',url,'-o',str(p)])
 try:
  q=json.loads(p.read_text())['routes'][0];pts=[[x/1000,y/1000] for x,y in [T.transform(*ll) for ll in q['geometry']['coordinates']]];entry={'town':'30a','district':d['id'],'minutes':round(q['duration']/60),'points':pts,'asOf':'OSRM road route · no live traffic · checked Oct 16, 2026','source':url};r.append(entry)
  if d['id']=='seaside':r.append({k:v for k,v in entry.items() if k!='district'})
  print(d['id'],entry['minutes'],flush=True)
 except Exception as e:print('FAILED',d['id'],str(e),flush=True)
(A/'routes.json').write_text(json.dumps(r,separators=(',',':')))
