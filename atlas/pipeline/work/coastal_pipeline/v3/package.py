from pathlib import Path
import json,hashlib,zipfile,shutil,html
O=Path('outputs/coastal_pipeline_v3/miami');C=Path('work/coastal_pipeline/v3')
report=json.loads((O/'report.json').read_text());report['browser_checks']={'viewports':[390,768,1440],'all_five_districts_checked_at':[390,1440],'console_errors_observed':0,'phone_control_bar_px':42,'phone_card_gap_px':10,'local_desktop_region_load_ms_observed':249,'physical_midrange_phone_tested':False};report['initial_page_bytes']=sum((O/name).stat().st_size for name in ['base.glb.gz','region.glb.gz','scene.json','viewer.js','index.html']);report['acceptance']={'district_source_alignment_under_150m':report['max_anchor_error_m']<150,'core_coast_source_alignment_under_150m':report['exported_boundary_source_error_m']<150,'initial_page_under_4MB':report['initial_page_bytes']<4000000,'all_building_heights_sourced':report['height_sources']['assumed']==0,'representative_price_ranges_verified':False,'physical_phone_under_3_seconds_verified':False,'local_visual_recognition_verified':False};report['status']='local review candidate; acceptance limits documented';(O/'report.json').write_text(json.dumps(report,indent=2))
shutil.copy(C/'miami/MANUAL-FIXES.md',O/'MANUAL-FIXES.md');shutil.copy(C/'PIPELINE.md',O/'PIPELINE.md')
shots=['region-1440','region-768','region-390']+[f'{d}-{w}' for d in ['brickell','grove','gables','southbeach-district','edgewater'] for w in [1440,390]]
page='<!doctype html><meta name="viewport" content="width=device-width"><title>Miami review evidence</title><style>body{max-width:1300px;margin:40px auto;padding:0 24px;background:#f8f3e7;color:#36554b;font:16px system-ui}h1,h2{font-family:Georgia}img{max-width:100%;display:block;margin:12px 0 36px}a{color:#a95528}.phone{max-height:844px;width:auto}</style><h1>Miami · review evidence</h1><p><a href="index.html">Open the map</a> · <a href="PIPELINE.md">Pipeline</a> · <a href="MANUAL-FIXES.md">Manual fixes and limits</a> · <a href="accuracy.csv">Accuracy CSV</a></p><p>OSM source alignment: anchors ≤0.014 m; exported shoreline ≤6.13 m. This measures fidelity to the source, not independent survey accuracy. Prices are dated listing examples; physical-phone performance remains unverified. 30A is unchanged.</p><h2>Exported coastline over OpenStreetMap</h2><img src="region-osm-overlay.png">'
for shot in shots:page+=f'<h2>{html.escape(shot)}</h2><img class="{("phone" if shot.endswith("390") else "desktop")}" src="{shot}.png">'
(O/'review.html').write_text(page)
# Source package: frozen normalized inputs and helpers, not redundant acquisition cache.
files=[p for p in C.rglob('*') if p.is_file() and '__pycache__' not in str(p) and p.suffix not in ['.log','.png'] and '/tiles/' not in str(p)]
files += [Path('work/coastal_pipeline/v2/pipeline.py'),Path('work/coastal_pipeline/v2/ui-rules.mjs'),Path('work/coastal_pipeline/v2/requirements.txt'),Path('work/30a_finish/geometry.py'),Path('outputs/30a_locked/lock-manifest.json')]
zip_path=O.parent/'miami-pipeline-and-evidence.zip'
with zipfile.ZipFile(zip_path,'w',zipfile.ZIP_DEFLATED,compresslevel=6) as z:
 for p in files:z.write(p,str(p))
 for p in O.iterdir():
  if p.suffix in ['.png','.csv','.md','.html','.json','.js'] and p.name!='inventory.json':z.write(p,str(p))
 for p in O.glob('*.glb.gz'):z.write(p,str(p),compress_type=zipfile.ZIP_STORED)
print(zip_path,zip_path.stat().st_size)
