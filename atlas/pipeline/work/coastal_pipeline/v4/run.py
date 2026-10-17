"""Locked pipeline: region inputs can vary; implementation must not."""
import json,subprocess,sys,hashlib
from pathlib import Path
P=Path(__file__).parent;manifest=sys.argv[1];m=json.load(open(manifest));out=Path('outputs/coastal_pipeline_v4')/m['id'];out.mkdir(parents=True,exist_ok=True)
lock=json.load(open(P/'pipeline-lock.json'))
def check():
 for name,digest in lock['files'].items():
  if hashlib.sha256(Path(name).read_bytes()).hexdigest()!=digest:raise RuntimeError('Locked implementation changed: '+name)
check()
for name in ['engine.py','water_wash.py','proof.py']:
 subprocess.run([sys.executable,str(P/name),manifest],check=True)
r=json.load(open(out/'report.json'));assert r['max_anchor_error_m']<=150;assert r['exported_boundary_source_error_m']<=150;assert r['max_height_width_ratio']<=3.000001;assert r['region_bytes']<4000000,'Regional geometry exceeds 4 MB'
initial_assets=['base.glb.gz','region.glb.gz','scene.json','shore-wash.png','shore-wash.json']
assert sum((out/n).stat().st_size for n in initial_assets)<4000000,'Initial regional assets exceed 4 MB'
check();(out/'pipeline-lock.json').write_text(json.dumps(lock,indent=2));subprocess.run([sys.executable,str(P/'publish.py'),manifest],check=True)
print('Candidate ready: '+str(out/'atlas-review.html'))
