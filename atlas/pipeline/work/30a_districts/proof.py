import sys,csv
sys.path.insert(0,'work/30a_finish')
from geometry import *
O=Path('outputs/30a_districts');ds=json.loads(Path('outputs/florida_coastal_atlas/30a-review/30a.json').read_text())['districts'];es=json.loads((D/'map-data.json').read_text())['elements'];nodes={e['id']:e for e in es if e['type']=='node'}
rows=[]
for d in ds:
 nid=int(d['positionSource'].split('/')[-1]);e=nodes[nid];lon,lat=I.transform(d['x']*1000,d['y']*1000);ox,oy=T.transform(e['lon'],e['lat']);err=math.hypot(d['x']*1000-ox,d['y']*1000-oy)
 rows.append(dict(district=d['name'],model_x_km=d['x'],model_ground_y_km=d['y'],threejs_z_km=-d['y'],model_longitude=lon,model_latitude=lat,osm_longitude=e['lon'],osm_latitude=e['lat'],distance_m=round(err,6),osm_source=d['positionSource'],projection=proj))
with (O/'district-center-accuracy.csv').open('w',newline='') as f:
 w=csv.DictWriter(f,fieldnames=rows[0].keys());w.writeheader();w.writerows(rows)
# Existing measured vector overlay uses the same unmodified Region camera and geometry.
import shutil
shutil.copy2('outputs/30a_final/region-osm-overlay.png',O/'region-osm-overlay.png')
(O/'accuracy-method.txt').write_text('Coordinates are extracted from the shipped 30a.json and compared with separate OSM place-node records in the source extract. Distance is measured in meters in the same NAD83 Albers projection. This tests source fidelity, not independent surveyed ground-truth accuracy. Region overlay uses the unchanged 48 km, north-up, 45-degree camera; magenta lines are actual exported GLB water boundaries. Beach presentation uses the same 100 m inland buffer from the OSM coastline across 30A, clipped to land and inland water, including Seaside. No shore coordinates moved.\n')
print('CSV rows',len(rows),'max error',max(r['distance_m'] for r in rows))
