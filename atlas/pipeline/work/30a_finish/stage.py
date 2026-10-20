from pathlib import Path
import shutil,subprocess
root=Path.cwd();O=Path('outputs/florida_coastal_atlas/30a-review');O.mkdir(exist_ok=True);(O/'assets').mkdir(exist_ok=True)
F=Path('work/florida_atlas/viewer_bundle');shutil.copy2('work/atlas_regions/app.js',F/'regions-entry.js')
subprocess.run(['pnpm','--dir',str(F),'exec','esbuild','regions-entry.js','--bundle','--minify','--format=iife','--outfile=regions.bundle.js'],check=True)
shutil.copy2(F/'regions.bundle.js',O/'app.js')
for f in ['districts.json','features.json','routes.json','roads.json']:shutil.copy2(Path('work/atlas_regions')/f,O/f)
shutil.copy2('outputs/florida_coastal_atlas/regions/catalog.json',O/'catalog.json');shutil.copy2('outputs/30a_finish/30a.json',O/'30a.json');shutil.copy2('outputs/30a_finish/canopy-mask.png',O/'canopy-mask.png');shutil.copy2('outputs/30a_finish/assets/30a-finished.glb.gz',O/'assets/30a-finished.glb.gz')
if Path('outputs/30a_finish/canopies').exists():shutil.copytree('outputs/30a_finish/canopies',O/'canopies',dirs_exist_ok=True)
for f in Path('outputs/florida_coastal_atlas/regions/assets').glob('*.gz'):
 target=O/'assets'/f.name
 if not target.exists():target.symlink_to(f.resolve())
html=Path('work/atlas_regions/index.html').read_text().replace('regions/app.js','app.js').replace('</style>','.thirty-region .district-label{transform:translateY(-100%) rotate(-55deg);transform-origin:bottom left;font-size:10px;min-height:17px;padding:2px 5px;border:0;border-radius:3px;background:#fffaf0d9;box-shadow:none}.unlabeled header,.unlabeled #controls,.unlabeled #labels,.unlabeled #scale,.unlabeled #card{display:none!important}@media(max-width:650px){.thirty-region body{background:#f4f0e4}.thirty-region #map{top:150px;bottom:auto}.thirty-region #controls{bottom:42px;max-height:270px}.thirty-region .district-label{font-size:9px}}#controls{max-height:calc(100vh - 40px);overflow:auto}#district-list{max-height:145px;overflow:auto}#attribution{position:absolute;bottom:5px;right:8px;font-size:9px;background:#fff8;padding:3px;z-index:4}#card-place{font-size:11px;color:#a04b27}</style>').replace('<script src=', '<a id="attribution" href="https://www.openstreetmap.org/copyright" target="_blank">© OpenStreetMap contributors</a><script src=')
html=html.replace('© OpenStreetMap contributors</a>','© OpenStreetMap contributors</a><span style="position:absolute;bottom:5px;left:8px;font-size:8px;background:#fff8;z-index:4">Canopy imagery: Esri, Vantor, Earthstar Geographics & GIS User Community</span>')
html=html.replace('Canopy imagery: Esri, Vantor, Earthstar Geographics & GIS User Community','OSM-based geography · original illustrated canopy')
html=html.replace('</style>',Path('work/30a_art/style.css').read_text()+'</style>')
shutil.copy2('outputs/30a_art/sand.json',O/'sand.json')
(O/'index.html').write_text(html)

shutil.copy2('outputs/30a_districts/alys-geometry.json.gz',O/'alys-geometry.json.gz')
