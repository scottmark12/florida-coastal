"""Revalidate a completed export against the current lock before local publication."""
import sys,json,hashlib,subprocess,shutil
from pathlib import Path
P=Path('work/coastal_pipeline/v4');id=sys.argv[1];m=json.load(open(P/id/'manifest.json'));out=Path('outputs/coastal_pipeline_v4')/id;r=json.load(open(out/'report.json'));lock=json.load(open(P/'pipeline-lock.json'))
assert all(hashlib.sha256(Path(p).read_bytes()).hexdigest()==h for p,h in lock['files'].items())
assert r['engine_sha256']==hashlib.sha256((P/'engine.py').read_bytes()).hexdigest()
assert r['max_anchor_error_m']<=150 and r['exported_boundary_source_error_m']<=150 and r['max_height_width_ratio']<=3.000001
assert sum((out/name).stat().st_size for name in ['base.glb.gz','region.glb.gz','scene.json','shore-wash.png','shore-wash.json'])<4000000
canopy=json.load(open(out/'canopy-sources.json'));assert all(d['source_only'] and d['rendered_crowns_in_town_view']>0 for d in canopy['districts'])
shutil.copy2(P/'pipeline-lock.json',out/'pipeline-lock.json');shutil.copy2(m['recipes'],out/'district-style-recipes.json')
(out/'canopy-inputs.json').write_text(json.dumps({k:v for k,v in m['inputs'].items() if k.startswith('canopy')},indent=2))
subprocess.run([sys.executable,str(P/'check_package.py'),id],check=True)
subprocess.run([sys.executable,str(P/'publish.py'),str(P/id/'manifest.json')],check=True)
print('Validated and published local candidate',id)
