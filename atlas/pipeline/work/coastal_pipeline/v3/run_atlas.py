"""Reproducible frozen input → recipes → geometry → proof → existing atlas."""
import subprocess,sys,json,hashlib
from pathlib import Path
code=Path(__file__).parent;manifest=sys.argv[1];tracked=[code/'engine.py',code/'atlas-layer.js',code/'rules.json',code/'proof.py',Path('work/atlas_regions/app.js')];before={str(p):hashlib.sha256(p.read_bytes()).hexdigest() for p in tracked}
for script in ['engine.py','water_wash.py','proof.py']:
 subprocess.run([sys.executable,str(code/script),manifest],check=True)
subprocess.run([sys.executable,str(code/'install_atlas.py')],check=True)
assert all(hashlib.sha256(Path(p).read_bytes()).hexdigest()==h for p,h in before.items())
out=Path('outputs/coastal_pipeline_v3')/json.load(open(manifest))['id'];(out/'reproducibility.json').write_text(json.dumps({'entry':'explore_coast.html','code_unchanged_during_run':True,'code':before},indent=2))
