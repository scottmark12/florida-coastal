"""Use unchanged mapped-dock selector for the new Tampa/Pinellas town windows."""
from pathlib import Path
import sys
P=Path(__file__).resolve().parent
source=(P/'extract_marinas.py').read_text().replace("catalog=json.load(open(A/'regions/catalog.json'))['towns']", "catalog=[json.load(open(P/'work/coastal_pipeline/v4'/row[0]/'catalog-input.json'))['towns'][0] for row in json.load(open(P/'tampa-coast-additions.json'))]")
exec(compile(source,str(P/'extract_marinas.py'),'exec'),{'__name__':'__main__','__file__':str(P/'extract_marinas.py')})
