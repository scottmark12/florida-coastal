"""Independent artifact integrity check; does not modify renderer or source data."""
import sys,json,gzip,hashlib,struct
from pathlib import Path
id=sys.argv[1];p=Path('outputs/coastal_pipeline_v4')/id;meta=json.load(open(p/'scene.json'));report=json.load(open(p/'report.json'));lock=json.load(open('work/coastal_pipeline/v4/pipeline-lock.json'))
assert all(hashlib.sha256(Path(n).read_bytes()).hexdigest()==h for n,h in lock['files'].items())
count=0
for name,n in meta['treeTiles'].items():
 pts=json.load(gzip.open(p/(name+'.trees.json.gz'),'rt'));assert len(pts)==n;count+=len(pts)
assert count==report['tree_count']
for name,n in meta['tiles'].items():
 file=p/(name+'.glb.gz');assert file.stat().st_size==n
 b=gzip.decompress(file.read_bytes());magic,version,length=struct.unpack_from('<4sII',b);assert magic==b'glTF' and version==2 and length==len(b)
initial=['base.glb.gz','region.glb.gz','scene.json','shore-wash.png','shore-wash.json']
evidence={'region':id,'pipeline_version':lock['version'],'lock_hashes_pass':True,'tree_points_accounted_for':count,'geometry_tiles_checked':len(meta['tiles']),'initial_region_asset_bytes':sum((p/n).stat().st_size for n in initial),'initial_assets':{n:(p/n).stat().st_size for n in initial},'physical_phone_timing_verified':False}
(p/'package-integrity.json').write_text(json.dumps(evidence,indent=2));print(json.dumps(evidence,indent=2))
