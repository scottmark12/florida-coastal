"""Run from any directory; normalized inputs stay fixed unless explicitly refreshed."""
import os,sys,json,subprocess,shutil
from pathlib import Path
P=Path(__file__).resolve().parent;os.chdir(P);region=sys.argv[1];m=Path('work/coastal_pipeline/v4')/region/'manifest.json'
if not m.exists():raise SystemExit('No configured region: '+region)
manifest=json.load(m.open());missing=[p for p in manifest['inputs']['osm'] if not Path(p).exists()]
missing += [r['path'] for r in manifest['inputs'].get('canopyRasters',[]) if not Path(r['path']).exists()]
if manifest['inputs'].get('canopy') and not Path(manifest['inputs']['canopy']['path']).exists():missing.append(manifest['inputs']['canopy']['path'])
if missing:raise SystemExit('Download inputs first: python fetch_inputs.py '+region+'\nMissing: '+'\n'.join(missing))
Path('outputs').mkdir(exist_ok=True);link=Path('outputs/florida_coastal_atlas')
if not link.exists():link.symlink_to('../..',target_is_directory=True)
subprocess.run([sys.executable,'work/coastal_pipeline/v4/run.py',str(m)],check=True)
out=Path('outputs/coastal_pipeline_v4')/region;target=P.parent/'regions/packages'/region
if target.is_symlink():target.unlink()
shutil.copytree(out,target,dirs_exist_ok=True)
# Local review links are relative to /atlas/regions/packages/<region>/.
for html in target.glob('*.html'):
 s=html.read_text().replace('"/explore_coast.html','"../../../explore_coast.html').replace("'/explore_coast.html","'../../../explore_coast.html")
 html.write_text(s)
print('Built',target,'— inspect new screenshots and update landing images before release.')
