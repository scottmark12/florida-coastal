from pathlib import Path
import shutil,subprocess,json
O=Path('outputs/florida_coastal_regions');F=Path('work/florida_atlas/viewer_bundle')
shutil.copy2('work/atlas_regions/app.js',F/'regions-entry.js')
subprocess.run(['pnpm','--dir',str(F),'exec','esbuild','regions-entry.js','--bundle','--minify','--format=iife','--outfile=regions.bundle.js'],check=True)
shutil.copy2(F/'regions.bundle.js',O/'app.js')
for f in ['districts.json','features.json','routes.json','roads.json','quiz-bridge.js']:shutil.copy2(Path('work/atlas_regions')/f,O/f)
html=Path('work/atlas_regions/index.html').read_text();(O/'explore_coast.html').write_text(html.replace('regions/','./'))
D=Path('outputs/florida_coastal_atlas/regions');D.mkdir(exist_ok=True)
for f in O.glob('*'):
 if f.is_file() and f.suffix in ['.js','.json']:shutil.copy2(f,D/f.name)
(D/'assets').mkdir(exist_ok=True)
for f in (O/'assets').glob('*.gz'):shutil.copy2(f,D/'assets'/f.name)
Path('outputs/florida_coastal_atlas/regions_preview.html').write_text(html)
print('Regional preview packaged')
