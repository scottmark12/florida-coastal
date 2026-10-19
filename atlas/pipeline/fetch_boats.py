"""Restore OSM dock extracts, then regenerate illustrative boat sidecars. Run from any directory."""
import json,os,urllib.request,subprocess,sys
from pathlib import Path
P=Path(__file__).resolve().parent;os.chdir(P);index=P/'work/coastal_pipeline/boat-sources.json'
for row in json.load(open(index)):
 p=Path(row['path']);p.parent.mkdir(parents=True,exist_ok=True)
 if not p.exists():p.write_bytes(urllib.request.urlopen('https://api.openstreetmap.org/api/0.6/map?bbox='+','.join(map(str,row['bounds'])),timeout=100).read())
subprocess.run([sys.executable,str(P/'boats.py'),str(index)],check=True)
