"""Check regional delivery assets without rebuilding approved town packages."""
import json,gzip,struct,hashlib
from pathlib import Path
A=Path(__file__).resolve().parents[1];R=A/'regions';registry=json.load(open(R/'accurate-overviews.json'));packages=json.load(open(R/'package-registry.json'));catalog=json.load(open(R/'catalog.json'));rows=[]
seen=set()
for rid,path in registry.items():
 if path in seen:continue
 seen.add(path)
 root=R/path;m=json.load(open(root/'manifest.json'));region=next(r for r in catalog.get('sourceRegions',catalog['regions']) if r['id']==rid);expected={Path(packages[t]).name for t in region['towns'] if t in packages};assert set(m['sourcePackages'])==expected,(rid,'missing approved town source')
 if m.get('surroundingContext'):
  c=m['surroundingContext'];context=root/c['file'];assert context.stat().st_size==c['bytes'];assert context.read_bytes()[:8]==b'\x89PNG\r\n\x1a\n';assert len(c['bounds'])==4
 initial=sum((root/f).stat().st_size for f in [m['base'],m['canopy'],m['water'],m['trees'],'manifest.json']);initial+=m.get('surroundingContext',{}).get('bytes',0);assert initial<4_000_000,(rid,initial)
 for tile in [{'file':m['base']},*m['buildings']]:
  data=gzip.decompress((root/tile['file']).read_bytes());assert data[:4]==b'glTF';assert struct.unpack_from('<I',data,8)[0]==len(data)
  if 'bytes' in tile:assert (root/tile['file']).stat().st_size==tile['bytes']
 assert max(f.stat().st_size for f in root.iterdir() if f.is_file())<50_000_000
 rows.append({'region':rid,'source_packages':len(expected),'native_buildings':m['native_buildings'],'coverage_buildings':m['coverage_buildings'],'initial_bytes_including_manifest':initial,'architecture_chunks':len(m['buildings']),'total_bytes':sum(f.stat().st_size for f in root.iterdir() if f.is_file())})
for name,expected in json.load(open(A/'pipeline/tampa-approved-package-hashes.json')).items():
 root=R/'packages'/name;digest=hashlib.sha256();files=sorted(f for f in root.rglob('*') if f.is_file())
 for f in files:digest.update(str(f.relative_to(root)).encode()+b'\0'+hashlib.sha256(f.read_bytes()).digest())
 assert len(files)==expected['files'] and digest.hexdigest()==expected['sha256'],(name,'approved Town package changed')
print(json.dumps({'regions':rows,'approved_tampa_pinellas_town_packages_unchanged':True,'phone_hardware_timing_verified':False},indent=2))
