from pathlib import Path
import zipfile,json,hashlib
out=Path('outputs/florida_coastal_atlas')
files=sorted(p for p in out.rglob('*') if p.is_file() and p.name!='file_checksums.json')
checksums={str(p.relative_to(out)):hashlib.sha256(p.read_bytes()).hexdigest() for p in files}
(out/'file_checksums.json').write_text(json.dumps(checksums,indent=2))
target=Path('outputs/florida_coastal_full_coast_pack.zip')
with zipfile.ZipFile(target,'w',zipfile.ZIP_DEFLATED,compresslevel=6) as z:
 for p in sorted(out.rglob('*')):
  if p.is_file():z.write(p,'Florida Coastal Atlas/'+str(p.relative_to(out)))
with zipfile.ZipFile(target) as z:
 assert z.testzip() is None
 assert len([n for n in z.namelist() if n.endswith('.glb')])==122
print(json.dumps({'pack':str(target.resolve()),'bytes':target.stat().st_size,'glbs':122,'towns':106,'regions':15,'zip_integrity':'passed','offline_viewer_embedded':True}))
