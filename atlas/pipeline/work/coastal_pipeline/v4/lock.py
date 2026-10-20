from pathlib import Path
import hashlib,json
P=Path('work/coastal_pipeline/v4')
files=[P/name for name in ['engine.py','source_canopy.py','mesh_export.py','preflight.py','rules.json','water_wash.py','proof.py','run.py','publish.py']]+[Path('work/coastal_pipeline/v3/atlas-layer.js'),Path('work/atlas_regions/app.js'),Path('work/30a_finish/geometry.py')]
assert all(p.exists() for p in files)
(P/'pipeline-lock.json').write_text(json.dumps({'version':'florida-coastal-illustration-v4.6','date':'2026-10-17','rules':'Approved Miami/30A scale and UI; regional recipes and source inputs remain external','files':{str(p):hashlib.sha256(p.read_bytes()).hexdigest() for p in files}},indent=2))
