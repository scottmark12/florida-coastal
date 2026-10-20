import json,gzip,struct,math
from pathlib import Path
O=Path('outputs/florida_coastal_regions');report=json.loads((O/'build_report.json').read_text());catalog=json.loads((O/'catalog.json').read_text());ids={t['id'] for t in catalog['towns']}
for p in (O/'assets').glob('*.gz'):
 b=gzip.decompress(p.read_bytes());assert struct.unpack_from('<III',b)==(0x46546c67,2,len(b));n,typ=struct.unpack_from('<II',b,12);assert typ==0x4e4f534a;g=json.loads(b[20:20+n]);assert g['buffers'][0]['byteLength']==len(b)-28-n
for r in catalog['regions']:
 assert r['towns'] and all(t in ids for t in r['towns']);assert (O/'assets'/(r['id']+'.glb.gz')).exists()
D=json.loads((O/'districts.json').read_text());assert all(d['town'] in ids for d in D);assert len(set(d['id'] for d in D))==len(D)
report['validation']={'valid_gzip_glb_packages':len(list((O/'assets').glob('*.gz'))),'towns':len(ids),'regions':len(catalog['regions']),'curated_districts':len(D),'district_price_ranges_verified':sum(bool(d['priceRange']) for d in D),'public_site_deployed':False}
(O/'build_report.json').write_text(json.dumps(report,indent=2));print(json.dumps(report['validation']));print('Terrain gzip MB',report['packages']['terrain']['gzip']/1e6)
