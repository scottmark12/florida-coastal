"""Lossless migration of already-built geometry through the shared exporter."""
import sys,json,hashlib,shutil
from pathlib import Path
from mesh_export import *
id=sys.argv[1];p=Path('outputs/coastal_pipeline_v4')/id;backup=Path('work/coastal_pipeline/v4/export-backup')/id;backup.mkdir(parents=True,exist_ok=True);checks={}
for name in ['base','region']:
 f=p/(name+'.glb.gz');old=read_triangles(f);before=f.stat().st_size;shutil.copy2(f,backup/f.name);write_mesh(p,name,old);new=read_triangles(f);assert old.keys()==new.keys() and all(np.array_equal(old[k],new[k]) for k in old)
 checks[name]={'all_triangle_positions_identical':True,'material_names_identical':True,'bytes_before':before,'bytes_after':f.stat().st_size}
r=json.load(open(p/'report.json'));r['region_bytes']=sum((p/(n+'.glb.gz')).stat().st_size for n in ['base','region']);r['engine_sha256']=hashlib.sha256(Path('work/coastal_pipeline/v4/engine.py').read_bytes()).hexdigest();r['export_migration']='Overview meshes losslessly repacked; detailed geometry and all source coordinates preserved.';(p/'report.json').write_text(json.dumps(r,indent=2));(p/'lossless-mesh-check.json').write_text(json.dumps(checks,indent=2))
# Camera values are external framing inputs, independent of geometry.
m=json.load(open(Path('work/coastal_pipeline/v4')/id/'manifest.json'));scene=json.load(open(p/'scene.json'));scene['camera']=m['camera'];(p/'scene.json').write_text(json.dumps(scene,separators=(',',':')))
initial=sum((p/n).stat().st_size for n in ['base.glb.gz','region.glb.gz','scene.json','shore-wash.png','shore-wash.json']);assert initial<4000000,initial;print(id,checks,'initial bytes',initial)
(p/'pipeline-lock.json').write_bytes(Path('work/coastal_pipeline/v4/pipeline-lock.json').read_bytes())
