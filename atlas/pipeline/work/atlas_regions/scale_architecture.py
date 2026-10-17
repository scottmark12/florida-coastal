import pickle,json,math,struct,gzip
from pathlib import Path
import numpy as np
O=Path('outputs/florida_coastal_regions');s=pickle.load(open('work/atlas_regions/scene.pkl','rb'));assets=s['assets'];colors=s['colors'];instances=s['instances'];geo={'projection':'+proj=aea +lat_1=24 +lat_2=31.5 +lat_0=24 +lon_0=-84 +datum=NAD83 +units=m +no_defs'}
nonbuilding=['bridge','pier','dock','boat','sail','trawler','grass','car','umbrella','kayak','ferris','wheel','bandstand'];changed=0
for o in instances:
 k=o['asset'].lower();e=np.ptp(np.concatenate([p[1] for p in assets[o['asset']]]),axis=0);w,d,h=e*np.array(o['s'])
 if any(t in k for t in ['tree','palm','pine','mangrove']):factor=min(1,.28/max(w,d,h,.01));o['s']=[a*factor for a in o['s']];continue
 if any(t in k for t in nonbuilding) or o['city']=='landscape':continue
 if 'stadium' in k:factor=min(1,2.1/max(w,d,.01));o['s']=[a*factor for a in o['s']];continue
 factor=min(1,.85/max(w,d,.01));o['s'][0]*=factor;o['s'][1]*=factor;o['s'][2]*=min(1,1.8/max(h,.01),3*min(w*factor,d*factor)/max(h,.01));changed+=factor<1
pickle.dump(s,open('work/atlas_regions/scene.pkl','wb'))
def rgb(c):return [int(c[i:i+2],16)/255 for i in [1,3,5]]
src=Path('work/florida_atlas/build_atlas.py').read_text();exec('def export('+src.split('def export(')[1].split("geokeys=['Geography")[0])
cat=json.loads((O/'catalog.json').read_text());byid={t['id']:t for t in cat['towns']};report=json.loads((O/'build_report.json').read_text())
for r in cat['regions']:
 centers=np.array([[byid[t]['x'],byid[t]['y']] for t in r['towns']]);objs=[o for o in instances if np.min(np.linalg.norm(centers-np.array(o['p'][:2]),axis=1))<45];p=O/'assets'/(r['id']+'.glb');export(p,objs,[]);b=p.read_bytes();gz=gzip.compress(b,6);p.with_suffix('.glb.gz').write_bytes(gz);report['packages'][r['id']]={'raw':len(b),'gzip':len(gz)}
report['absolute_building_caps_applied']=int(changed);(O/'build_report.json').write_text(json.dumps(report,indent=2));print('Scaled',changed,'oversized buildings')
