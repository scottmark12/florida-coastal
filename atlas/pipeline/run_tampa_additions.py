"""Prepare and build missing Tampa/Pinellas towns with the locked pipeline.
Run seed and snapshot acquisition first. Optional town IDs resume selected work.
Logs stop at the first failed source/accuracy/size gate.
"""
from pathlib import Path
import os,sys,json,subprocess
P=Path(__file__).resolve().parent;os.chdir(P)
rows=json.load(open(P/'tampa-coast-additions.json'));chosen=set(sys.argv[1:]) or {r[0] for r in rows}
for row in rows:
 tid=row[0]
 if tid not in chosen:continue
 log=P/'outputs'/('tampa-addition-'+tid+'.log');log.parent.mkdir(exist_ok=True)
 with log.open('w') as out:
  steps=[['prepare_tampa_additions.py',tid],['tampa_additions.py','supplement',tid]]
  if tid in ['holiday','hudson']:steps.append(['fetch_tampa_hero_canopy.py',tid])
  steps.append(['build_region.py',tid])
  for args in steps:
   subprocess.run([sys.executable,*args],stdout=out,stderr=subprocess.STDOUT,check=True)
 print('BUILT',tid,flush=True)
