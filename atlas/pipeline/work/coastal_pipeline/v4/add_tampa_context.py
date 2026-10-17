"""Manual source-context repair; reuses the frozen engine's surface/export code."""
import sys,json,struct,gzip,ast,hashlib
from pathlib import Path
sys.path.insert(0,'work/30a_finish');from geometry import *
from shapely import constrained_delaunay_triangles
P=Path('work/coastal_pipeline/v4/tampa-south-shore');m=json.load(open(P/'manifest.json'));O=Path('outputs/coastal_pipeline_v4/tampa-south-shore');clip=project(box(*m['bounds']));context=shape(json.load(open('work/florida_atlas/geography.json'))['land']).intersection(clip.buffer(12)).difference(clip)
(P/'context.json').write_text(json.dumps(mapping(context)));m['inputs']['context']={'path':str(P/'context.json'),'source':'Existing atlas US Census TIGER/Line state polygon context; outside the OSM review rectangle only','license':'US government public-domain data','projection':'atlas kilometers'};m['manual_fixes']=[v for v in m['manual_fixes'] if not v.startswith('Added existing statewide')];m['manual_fixes'].append('Added existing statewide land context outside the OSM review rectangle to remove the artificial water edge at the data boundary.');(P/'manifest.json').write_text(json.dumps(m,indent=2))
# Unpack the existing base with exact float32 positions; keep all other tiles intact.
b=gzip.decompress((O/'base.glb.gz').read_bytes());n=struct.unpack_from('<I',b,12)[0];g=json.loads(b[20:20+n]);data=b[28+n:];groups={'base':{}};current='base'
for prim in g['meshes'][0]['primitives']:
 a=g['accessors'][prim['attributes']['POSITION']];v=g['bufferViews'][a['bufferView']];color=g['materials'][prim['material']]['name'];groups['base'][color]=np.frombuffer(data,dtype='<f4',count=a['count']*3,offset=v.get('byteOffset',0)).reshape(-1,3).tolist()
s=Path('work/coastal_pipeline/v4/engine.py').read_text();tree=ast.parse(s)
for node in tree.body:
 if isinstance(node,ast.FunctionDef) and node.name in ['add','surf','export']:exec(compile(ast.Module(body=[node],type_ignores=[]),'frozen-engine-function','exec'))
surf(context.simplify(.025,preserve_topology=True),.0015,'#f1e3c8');size=export('base',groups['base']);r=json.load(open(O/'report.json'));r['region_bytes']=size+(O/'region.glb.gz').stat().st_size;(O/'report.json').write_text(json.dumps(r,indent=2));print('base bytes',size,'region bytes',r['region_bytes'])
