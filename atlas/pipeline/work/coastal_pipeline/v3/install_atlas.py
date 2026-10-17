"""Install a validated data package into the existing atlas; never replace 30A assets."""
from pathlib import Path
import json,subprocess,os,hashlib
ROOT=Path.cwd();live=ROOT/'outputs/florida_coastal_atlas';source=ROOT/'work/coastal_pipeline/v3';out=ROOT/'outputs/coastal_pipeline_v3/miami'
meta=json.load(open(out/'scene.json'));p=live/'regions/districts.json';existing=json.load(open(p));p.write_text(json.dumps([d for d in existing if d['town']!=meta['id']]+meta['districts'],indent=2))
link=live/'regions'/meta['id']
if not link.exists():link.symlink_to(os.path.relpath(out,link.parent))
node=Path('node');bundle=ROOT/'work/florida_atlas/viewer_bundle/node_modules'
subprocess.run([str(node),str(bundle/'esbuild/bin/esbuild'),'work/atlas_regions/app.js','--bundle','--format=iife','--minify','--outfile='+str(live/'regions/app.js'),'--alias:three='+str(bundle/'three'),'--alias:three/addons='+str(bundle/'three/examples/jsm')],check=True)
lock=json.load(open('outputs/30a_locked/lock-manifest.json'));checks={p:hashlib.sha256(Path(p).read_bytes()).hexdigest()==h for p,h in lock['files'].items() if any(k in p for k in ['30a-finished','30a.json','sand.json','alys-geometry','canopy-mask','canopies/'])};assert all(checks.values()),checks
(out/'30a-preservation.json').write_text(json.dumps(checks,indent=2))
