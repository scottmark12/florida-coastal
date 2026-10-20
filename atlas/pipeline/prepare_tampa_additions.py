"""Curated Tampa/Pinellas expansion inputs; locked exporter and approved packages untouched.
seed -> extract_osm_snapshot.py -> prepare -> supplement -> build_region.py.
"""
import json,sys,subprocess,os
from pathlib import Path
P=Path(__file__).resolve().parent;os.chdir(P);A=P.parent
rows=json.load(open(P/'tampa-coast-additions.json'));cat=json.load(open(A/'regions/catalog.json'))
values=[349900,398000,1374950,654750,672000,1190000,1249000,862000,250000,259900,339000,326250]
inventories=[204,733,43,89,73,23,44,105,387,550,964,136]
sources={
'oldsmar':'https://www.visitstpeteclearwater.com/communities/oldsmar',
'palm-harbor':'https://www.visitstpeteclearwater.com/communities/palm-harbor',
'belleair-beach':'https://www.cityofbelleairbeach.com/',
'indian-shores':'https://www.visitstpeteclearwater.com/communities/indian-shores-indian-rocks-beach',
'redington-shores':'https://www.visitstpeteclearwater.com/communities/north-redington-beach-redington-shores',
'north-redington-beach':'https://www.visitstpeteclearwater.com/communities/north-redington-beach-redington-shores',
'redington-beach':'https://townofredingtonbeach.com/',
"tierra-verde":'https://www.visitstpeteclearwater.com/communities/tierra-verde',
'holiday':'https://flsportscoast.com/', 'port-richey':'https://flsportscoast.com/', 'hudson':'https://flsportscoast.com/',
'gibsonton':'https://hcfl.gov/locations/williams-boat-ramp'}
if 'seed' in sys.argv:
 for row in rows:
  tid,name,rid,lon,lat,county,blurb,style=row;r=next(r for r in cat['regions'] if r['id']==rid);d=P/'work/coastal_pipeline/v4'/tid;d.mkdir(exist_ok=True)
  t={'id':tid,'name':name,'region':'Gulf Coast · '+r['map'],'coast':r['coast'],'lon':lon,'lat':lat,'vibes':['walk'] if style=='walk' else ['dock'],'blurb':blurb,'area_id':rid,'area_name':r['name'],'source_url':sources[tid],'source_bounds':[lon-.045,lat-.035,lon+.045,lat+.035]}
  (d/'catalog-input.json').write_text(json.dumps({'region':{**r,'name':name,'towns':[tid]},'towns':[t],'bounds':[lon-.065,lat-.055,lon+.065,lat+.055]},indent=2)+'\n')
 sys.exit()
for i,row in enumerate(rows):
 tid,name,rid,lon,lat,county,blurb,style=row
 if len(sys.argv)>1 and tid not in sys.argv[1:]:continue
 d=P/'work/coastal_pipeline/v4'/tid
 beach=style=='beach'
 walls=['#fff8e7','#d3e4db','#efd1c7','#e6dfbc','#d3e1e5'] if beach else ['#ead7b7','#b9cdbb','#d6b49c','#ccdcdf','#f3e8ce']
 if tid=='palm-harbor':walls=['#e6c19c','#bfd1c1','#e7d7b3','#c7d9dc','#dcae9d']
 if tid=='tierra-verde':walls=['#f4e9d0','#e3cab0','#d0e1dc','#e8d8bf']
 if tid=='redington-beach':walls=['#f3e8c7','#d4e3d5','#eac1b4','#cadde2']
 recipe={'walls':walls,'roofs':['#a6b9b7','#c6d0cb','#9eaea7'] if beach else ['#a6b7af','#b8c6c3','#a38670'],'roof':'flat' if beach else 'gable','detail':'balconies' if beach else 'painted-wood-porches','source':sources[tid],'trim':['#fff8e7','#abc2b2'],'character':blurb}
 if tid=='palm-harbor':recipe['canopy']='live-oak'
 url='https://www.realtor.com/local/market/florida/'+county+'/'+tid
 period='August 2026' if tid in ['indian-shores','gibsonton'] else 'September 2026'
 ed={'prices':{tid:[values[i],'median listing price',period,url]},'priceEvidence':{tid:{'activeListings':inventories[i],'checked':'2026-10-19'}},'recipes':{tid:recipe},'manual_fixes':['Town style palette curated from municipal/visitor references; individual facade colors remain illustrative.','Published town-level listing median, period and inventory are retained; not a pair of example listings.']}
 (d/'editorial.json').write_text(json.dumps(ed,indent=2)+'\n')
 subprocess.run([sys.executable,'normalize_coast_addition.py',tid],check=True)
 if tid=='gibsonton':subprocess.run([sys.executable,'repair_tampa_source.py'],check=True)
 recipes=json.load(open(d/'recipes.json'))
 if beach:
  recipes['coastalHeightZones']=[[lon-.065,lat-.055,lon+.065,lat+.055]];recipes['towerRecipe']=tid
  recipes['recipes']['beach-houses']={**recipe,'roof':'gable','detail':'painted-wood-porches'};recipes['styleZones']=[{'bounds':[lon-.065,lat-.055,lon+.065,lat+.055],'recipe':'beach-houses'}]
 (d/'recipes.json').write_text(json.dumps(recipes,indent=2)+'\n')
 subprocess.run([sys.executable,'work/coastal_pipeline/v4/prepare_context.py',tid],check=True)
 subprocess.run([sys.executable,'work/coastal_pipeline/v4/fetch_worldcover.py',tid],check=True)
 if tid in ['holiday','hudson']:subprocess.run([sys.executable,'fetch_tampa_hero_canopy.py',tid],check=True)
 print('READY',tid,flush=True)
