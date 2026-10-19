"""Prepare curated expansion inputs; shared renderer/rules stay locked."""
from pathlib import Path
import json,os,subprocess,sys
P=Path(__file__).resolve().parent;A=P.parent;os.chdir(P);spec=json.load(open(P/'coast-additions.json'));prices=json.load(open(P/'coast-addition-prices.json'))
subprocess.run([sys.executable,'extend_weeki_inputs.py'],check=True)
subprocess.run([sys.executable,'extend_weeki_coast.py'],check=True)
for tid,name,rid,lon,lat,county,blurb,style in spec:
 if len(sys.argv)>1 and tid not in sys.argv[1:]:continue
 d=P/'work/coastal_pipeline/v4'/tid
 if style=='beach':walls=['#fffbed','#d6e9e3','#f0d4cf','#f3e7ba','#d4e2ea'];roofs=['#c6d4d2','#d8ded7','#9eafb0'];roof='flat';detail='balconies'
 elif style=='fish':walls=['#d8c6a7','#c1d3c6','#e6bfa8','#cadbdf','#f0e5cf'];roofs=['#a5b9b6','#c6ceca','#af8d72'];roof='gable';detail='painted-wood-porches'
 elif style=='walk':walls=['#d5b79a','#f1e2c0','#d1c7af','#c8d5c9'];roofs=['#9caaa5','#b9c5c0','#ab8b73'];roof='gable';detail='painted-wood-porches'
 else:walls=['#eadcc0','#c8d6bf','#c2d5d9','#e0bea6','#f1ead8'];roofs=['#a6b8b1','#c3ccc8','#9ba7a0'];roof='gable';detail='painted-wood-porches'
 palettes={
 'perdido-key':['#fffbed','#d5e8e4','#e8e6d6','#cadfe4'],
 'navarre-beach':['#fffbed','#e8ddec','#d9eacb','#f4e7b8'],
 'okaloosa-island':['#fffbed','#efc5b7','#cbdfe9','#f4e8bf'],
 'miramar-beach':['#f7efd9','#e6d5af','#d2e7df','#fffdf5'],
 'fort-walton-beach':['#c9967d','#e9d7b5','#f1e8d4','#b9d2cd'],
 'gulf-breeze':['#efe1bf','#d3ddc8','#cbdce0','#e1b5a1'],
 'niceville':['#c7b69a','#c2d5ce','#b4cfd7','#ead9b8'],
 'valparaiso':['#ead9b7','#b9cdb6','#d8b299','#c6d9df'],
 'mary-esther':['#f1dfb5','#c5dbe0','#dfbaa8','#eee9d6'],
 'shalimar':['#d1d9bf','#efe4c9','#b9cfca','#ddc1a4'],
 'freeport':['#d5b68c','#c1ccad','#e7d7b9','#bfd1cd'],
 'keaton-beach':['#ecd898','#e5b3ab','#b9d9cc','#e9e6d5'],
 'horseshoe-beach':['#d5d9cd','#bcd5c6','#e6c3a5','#b9ced6'],
 'suwannee':['#c9b494','#bdcbb6','#d2ae8e','#dae3d5'],
 'yankeetown':['#e9dfc7','#bcd0b7','#d4ae96','#c3d8db'],
 'inglis':['#d8c3a1','#d5b297','#b6c7ad','#e7dfca'],
 'hernando-beach':['#e7b4a4','#b9d9df','#e8d6aa','#d0dfcc'],
 'weeki-wachee':['#cdb79b','#bad4ca','#c4dcdf','#ebdfc5'],
 'aripeka':['#c8b596','#d8dccc','#eee7d8','#b6c9bf']}
 walls=palettes.get(tid,walls)
 source=('https://www.visitpensacola.com/beaches/perdido-key/' if tid=='perdido-key' else 'https://www.getrelaxing.com/' if county=='santa-rosa-county' else 'https://www.destinfwb.com/' if county=='okaloosa-county' else 'https://www.visitsouthwalton.com/' if county=='walton-county' else 'https://inglisyankeetownchamber.com/' if tid in ['inglis','yankeetown'] else 'https://floridasadventurecoast.com/' if county in ['hernando-county','pasco-county'] else 'https://www.naturalnorthflorida.com/')
 recipe={'walls':walls,'roofs':roofs,'roof':roof,'detail':detail,'source':source,'trim':['#f6efdc','#acc4b5'],'character':blurb}
 if tid in ['valparaiso','yankeetown']:recipe['canopy']='live-oak'
 ed={'prices':{tid:prices[tid]},'recipes':{tid:recipe},'manual_fixes':['Town palette and waterfront hero curated from regional visitor references; facade color is editorial, not surveyed.','Published prices retain their actual metric and period; thin markets are explicitly labeled.','Four communities without named OSM place nodes use explicitly documented OSM locality or park reference anchors; these are not claimed as municipal centers.']};(d/'editorial.json').write_text(json.dumps(ed,indent=2)+'\n')
 subprocess.run([sys.executable,'normalize_coast_addition.py',tid],check=True)
 recipes=json.load(open(d/'recipes.json'));recipes['coastalHeightZones']=[[lon-.065,lat-.055,lon+.065,lat+.055]] if style=='beach' else []
 if style=='beach':
  recipes['towerRecipe']=tid;recipes['recipes']['beach-houses']={**recipe,'roof':'gable','detail':'painted-wood-porches'};recipes['styleZones']=[{'bounds':[lon-.065,lat-.055,lon+.065,lat+.055],'recipe':'beach-houses'}]
 ds=json.load(open(d/'districts.json'))
 for item in ds:item['priceEvidence']['checked']='2026-10-19'
 (d/'districts.json').write_text(json.dumps(ds,indent=2)+'\n')
 if tid=='gulf-breeze':
  m=json.load(open(d/'manifest.json'));m['manual_fixes'].append('OSM coastline takes precedence over overlapping marine Pensacola Bay water relation 2191869, preserving mapped port shoreline. Bay water is defined by the coast, not inferred.');(d/'manifest.json').write_text(json.dumps(m,indent=2)+'\n')
 (d/'recipes.json').write_text(json.dumps(recipes,indent=2)+'\n');subprocess.run([sys.executable,'work/coastal_pipeline/v4/prepare_context.py',tid],check=True);subprocess.run([sys.executable,'work/coastal_pipeline/v4/fetch_worldcover.py',tid],check=True);print('READY',tid,flush=True)
