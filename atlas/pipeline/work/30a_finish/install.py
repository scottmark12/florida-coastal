from pathlib import Path
import shutil
S=Path('outputs/florida_coastal_atlas/30a-review');L=S.parent;R=L/'regions'
for f in ['app.js','districts.json','features.json','routes.json','roads.json','30a.json','canopy-mask.png','sand.json','alys-geometry.json.gz']:shutil.copy2(S/f,R/f)
shutil.copy2(S/'assets/30a-finished.glb.gz',R/'assets/30a-finished.glb.gz');shutil.copytree(S/'canopies',R/'canopies',dirs_exist_ok=True)
(L/'explore_coast.html').write_text((S/'index.html').read_text().replace('src="app.js"','src="regions/app.js"'))
p=L/'30a-proof'
if not p.exists():p.symlink_to(Path('outputs/30a_finish').resolve(),target_is_directory=True)
print('Installed local 30A candidate; previous version remains in work/30a_finish/baseline.')
