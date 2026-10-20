"""Run existing expansion adapters against the Tampa/Pinellas roster.
No locked rendering, scale, label, canopy or export code is modified.
Usage: python tampa_additions.py acquire|supplement|register|landings|merge [town ids...]
"""
import sys
from pathlib import Path
P=Path(__file__).resolve().parent
mode=sys.argv.pop(1)
files={'acquire':'acquire_addition_buildings.py','supplement':'supplement_addition_buildings.py','register':'register_coast_additions.py','landings':'prepare_addition_landings.py','merge':'merge_addition_overviews.py','marinas':'filter_coast_marinas.py','piers':'add_mapped_piers.py'}
source=(P/files[mode]).read_text().replace('coast-additions.json','tampa-coast-additions.json').replace('addition-building-downloads.json','tampa-building-downloads.json').replace('coast-addition-heroes.json','tampa-addition-heroes.json')
if mode=='marinas':source=source.replace("spec={r[0] for r in json.load(open(P/'tampa-coast-additions.json'))}","spec={r[0] for r in json.load(open(P/'tampa-coast-additions.json')) if (P.parent/'regions/packages'/r[0]/'report.json').exists()}").replace('coast-additions-index.json','tampa-additions-index.json')
if mode=='register':
 source=source.replace(";cat=json.load(open(A/'regions/catalog.json'))",";spec=[r for r in spec if (A/'regions/packages'/r[0]/'report.json').exists()];cat=json.load(open(A/'regions/catalog.json'))")
 source=source.replace("['emerald-coast','nature-coast']","['tampa-south-shore','st-pete-clearwater']")
if mode=='landings':source=source.replace("views=json.load(open(A/'regions/town-views.json'))","spec={k:v for k,v in spec.items() if (A/'regions/packages'/k/'report.json').exists()};views=json.load(open(A/'regions/town-views.json'))")
if mode=='merge':source=source.replace("['emerald-coast','nature-coast']","['tampa-south-shore','st-pete-clearwater']").replace('pre-expansion.glb.gz','pre-tampa-expansion.glb.gz').replace('c0887e33','57156127')
exec(compile(source,str(P/files[mode]),'exec'),{'__name__':'__main__','__file__':str(P/files[mode])})
