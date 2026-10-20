"""Refresh mapped boats/piers, town navigation and hero cameras after validated builds."""
from pathlib import Path
import sys,subprocess,os
P=Path(__file__).resolve().parent;os.chdir(P)
for args in [['tampa_additions.py','marinas'],['boats.py','work/coastal_pipeline/downloads/marinas/tampa-additions-index.json'],['tampa_additions.py','piers'],['tampa_additions.py','register'],['tampa_additions.py','landings']]:
 subprocess.run([sys.executable,*args],check=True)
