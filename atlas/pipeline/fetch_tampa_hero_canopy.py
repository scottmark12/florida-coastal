"""Reuse the measured hero-frame WorldCover acquisition for shifted waterfront heroes."""
from pathlib import Path
import sys
P=Path(__file__).resolve().parent;tid=sys.argv[1]
source=(P/'fetch_coast_hero_canopy.py').read_text().replace("tid='miramar-beach'",'tid='+repr(tid)).replace('coast-addition-heroes.json','tampa-addition-heroes.json')
exec(compile(source,str(P/'fetch_coast_hero_canopy.py'),'exec'),{'__name__':'__main__','__file__':str(P/'fetch_coast_hero_canopy.py')})
