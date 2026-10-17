"""Release checks for the reusable domestic-height and canopy rules."""
import json,sys
from pathlib import Path
out=Path('outputs/coastal_pipeline_v4')/(sys.argv[1] if len(sys.argv)>1 else 'tampa-south-shore')
rows=json.load(open(out/'inventory.json'));audit=json.load(open(out/'canopy-sources.json'))
houses=[r for r in rows if r.get('house')]
assert houses,'No classified houses'
missing=[r for r in houses if r.get('osm_height_m') is None]
assert all(3<=r['real_height_m']<=6 for r in missing),'Missing-height house exceeds 1–2 stories'
assert all(r['height_m']<=r['width_m']*1.20001 for r in houses),'House silhouette cap failed'
for district in ['hydepark','seminole']:
 profile=audit['crown_profiles'][district]
 assert .5<=profile['overheadGreenFraction']<=.6,(district,profile)
print(json.dumps({'house_count':len(houses),'missing_height_houses':len(missing),'max_missing_height_m':max(r['real_height_m'] for r in missing),'historic_canopy':audit['crown_profiles']},indent=2))
