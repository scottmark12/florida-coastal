"""Build new packages with the unchanged locked exporter; stop at the first failed gate."""
import json,subprocess,sys,os
from pathlib import Path
P=Path(__file__).resolve().parent;os.chdir(P)
for row in json.load(open(P/'coast-additions.json')):
 tid=row[0]
 if '--resume' in sys.argv and (P.parent/'regions/packages'/tid/'atlas-review.html').exists():continue
 log=Path('/tmp')/('coast-build-'+tid+'.log')
 with log.open('w') as f:subprocess.run([sys.executable,'build_region.py',tid],stdout=f,stderr=subprocess.STDOUT,check=True)
 print('BUILT',tid,flush=True)
