from pathlib import Path
import json
specs={
'fort-myers-sanibel':{
'punta-gorda':(['#f0e3c6','#d0ddca','#e5c5ae'],['#b2c2b8','#c59d7e'],'gable','porches'),
'port-charlotte':(['#e6d7b8','#f2e3c8','#d4ddc3'],['#a9b9ad','#bfaa8e'],'gable','stucco'),
'matlacha':(['#f3b1bd','#8ed8c9','#f6dc8f','#c7b2d9'],['#c2d5c9','#a5c0b6'],'gable','porches'),
'cape-coral':(['#f3e7cf','#d2e0ca','#ecd3b9'],['#bd967a','#cdb99c'],'gable','stucco'),
'fort-myers':(['#c79276','#dfb798','#e9d4b2','#f1e7ce'],['#b7aa91','#ddd8c5'],'flat','stucco'),
'fort-myers-beach':(['#f5d9aa','#c2dfd2','#e7c0bd','#f3edda'],['#d2dcd1','#b5c4b8'],'flat','balconies'),
'sanibel-island':(['#eee4c9','#d0dec9','#e0c7ad'],['#a4b9ac','#bdcbbf'],'gable','porches'),
'captiva':(['#f9dfa2','#f1c3ba','#c4dfd0','#f9f1db'],['#becfc3','#d5dfd2'],'gable','porches'),
'bonita-springs':(['#f2e0c1','#e5c6ab','#e7e5cb'],['#bf9678','#d1b395'],'gable','stucco')},
'florida-keys':{
'key-largo':(['#ece5ce','#c1daca','#d2e5de'],['#b8c9be','#d2dccf'],'gable','porches'),
'islamorada':(['#f6e3b8','#f0d2bc','#d3e3cb'],['#c5d1c2','#a9c0af'],'gable','porches'),
'keywest':(['#fff3d9','#cbe4d2','#f5c9c0','#e3d9ed'],['#a6bfac','#c4d3c8'],'gable','porches')}}
for region,values in specs.items():
 p=Path('work/coastal_pipeline/v4')/region;prices=json.load(open(p/'verified-prices.json'));recipes={}
 for id,(walls,roofs,roof,detail) in values.items():
  source='https://www.visitfortmyers.com/location-overview' if region.startswith('fort') else 'https://visitfloridakeys.com/plan-your-trip/plan-book/insiders-guide/key-west-architecture-treasures-tour'
  if id=='matlacha':source='https://www.visitfortmyers.com/visit/editorial/neighborhood-spotlight-matlacha'
  recipes[id]={'walls':walls,'roofs':roofs,'roof':roof,'detail':detail,'source':source}
 (p/'editorial.json').write_text(json.dumps({'prices':prices,'recipes':recipes,'manual_fixes':['Town-wide price medians are labeled with their reporting periods; they are not street-level appraisals.','Recipe colors are editorial selections informed by regional architectural and neighborhood references; original OSM footprints remain the geometry source.']},indent=2))
p=Path('work/coastal_pipeline/v4/forgotten-coast/verified-prices.json');d=json.load(open(p));d['st-marks']=[219000,'median sale price','three months ending May 2026; latest reported window on source','https://www.redfin.com/city/16124/FL/St-Marks/housing-market'];p.write_text(json.dumps(d,indent=2))
