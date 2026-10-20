"""Verify every navigable coastal region has a valid calibrated 2D export."""
from pathlib import Path
import json,hashlib,math
from PIL import Image
A=Path(__file__).resolve().parents[1];rows=json.load(open(A/'regions/region-images.json'));regions=json.load(open(A/'regions/catalog.json'))['regions'];assert set(rows)=={r['id'] for r in regions}
backdrop=json.load(open(A/'regions/region-backdrop.json'))
for rid,r in [*rows.items(),('_backdrop',backdrop)]:
 p=A/'regions'/r['file'];assert p.stat().st_size==r['bytes'];assert hashlib.sha256(p.read_bytes()).hexdigest()[:16]==r['revision'];assert p.stat().st_size<1_000_000
 with Image.open(p) as im:assert im.format=='WEBP' and im.size==(r['width'],r['height'])
 assert 512<=r['width']<=4096 and 512<=r['height']<=4096
 if rid!='_backdrop':
  with Image.open(p) as im:assert 'A' in im.mode and im.getpixel((0,0))[3]==0
 c=r['camera'];assert c['tiltDegrees']==45 and c['projection']=='orthographic';assert c['right']>c['left'] and c['top']>c['bottom'];assert all(math.isfinite(x) for x in c['target'])
print(json.dumps({'regions':len(rows),'total_bytes':sum(r['bytes'] for r in rows.values()),'maximum_image_bytes':max(r['bytes'] for r in rows.values())}))
