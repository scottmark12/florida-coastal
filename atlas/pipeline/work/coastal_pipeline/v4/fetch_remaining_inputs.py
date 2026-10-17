import subprocess,sys
for region in ['fort-myers-sanibel','florida-keys','palm-beaches','treasure-coast','space-coast','daytona-flagler','first-coast','forgotten-coast','nature-coast']:
 print('INPUTS',region,flush=True)
 result=subprocess.run([sys.executable,'work/coastal_pipeline/v4/fetch_region.py',region])
 print('INPUT RESULT',region,result.returncode,flush=True)
