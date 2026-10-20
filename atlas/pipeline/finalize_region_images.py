"""Package CUA captures of the shared regional viewer as lightweight flat images.
Capture each catalog region at 2048 square with level=region&landing=1&regionalExport=1.
Save its PNG and body data-camera metadata to outputs/region-images/<region-id>.*.
Regenerate after geography/style changes; runtime Region view never loads model assets.
"""
from pathlib import Path
import json,hashlib
from PIL import Image
P=Path(__file__).resolve().parent;A=P.parent;out=A/'regions/images';out.mkdir(exist_ok=True);registry={}
for r in json.load(open(A/'regions/catalog.json'))['regions']:
 rid=r['id'];capture=P/'outputs/region-images'/rid;meta=json.load(open(capture.with_suffix('.json')))
 assert meta['ready']=='true' and meta['camera']['tiltDegrees']==45
 with Image.open(capture.with_suffix('.png')) as im:
  assert im.size==(2048,2048);im.convert('RGB').save(out/(rid+'.webp'),quality=94,method=6)
 file=out/(rid+'.webp');registry[rid]={'file':'images/'+file.name,'width':2048,'height':2048,'camera':meta['camera'],'bytes':file.stat().st_size,'revision':hashlib.sha256(file.read_bytes()).hexdigest()[:16],'attribution':'© OpenStreetMap contributors, ODbL · ESA WorldCover 2021 CC BY 4.0 · Microsoft footprints, CDLA Permissive 2.0'}
(A/'regions/region-images.json').write_text(json.dumps(registry,indent=2)+'\n');print(len(registry),'regions',sum(r['bytes'] for r in registry.values()),'bytes total')
