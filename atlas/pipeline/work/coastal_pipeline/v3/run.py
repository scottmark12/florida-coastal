"""Repeatable command: frozen inputs in, candidate and accuracy evidence out."""
import sys,subprocess,json,hashlib,shutil
from pathlib import Path
manifest=Path(sys.argv[1]);region=json.loads(manifest.read_text())['id'];root=Path.cwd();out=root/'outputs/coastal_pipeline_v3'/region;code=Path('work/coastal_pipeline/v3');tracked=[code/'engine.py',code/'viewer.js',code/'rules.json',code/'proof.py',Path('work/coastal_pipeline/v2/ui-rules.mjs')];before={str(p):hashlib.sha256(p.read_bytes()).hexdigest() for p in tracked}
for script in ['engine.py','proof.py']:subprocess.run([sys.executable,str(code/script),str(manifest)],check=True)
node=Path('node');bundle=Path('work/florida_atlas/viewer_bundle/node_modules');subprocess.run([str(node),str(bundle/'esbuild/bin/esbuild'),str(code/'viewer.js'),'--bundle','--format=esm','--minify','--outfile='+str(out/'viewer.js'),'--alias:three=./'+str(bundle/'three'),'--alias:three/addons=./'+str(bundle/'three/examples/jsm')],check=True)
shutil.copy(code/'index.html',out/'index.html');shutil.copy(code/'PIPELINE.md',out/'PIPELINE.md');after={str(p):hashlib.sha256(p.read_bytes()).hexdigest() for p in tracked};assert before==after,'Engine changed during run'
lock=json.load(open('outputs/30a_locked/lock-manifest.json'));changed=[p for p,h in lock['files'].items() if not Path(p).exists() or hashlib.sha256(Path(p).read_bytes()).hexdigest()!=h]
(out/'reproducibility.json').write_text(json.dumps({'frozen_code':before,'code_unchanged_during_run':before==after,'changed_30a_files':changed},indent=2));assert not changed,'30A lock changed'
