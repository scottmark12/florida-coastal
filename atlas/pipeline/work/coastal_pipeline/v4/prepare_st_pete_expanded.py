from pathlib import Path
import json
p=Path('work/coastal_pipeline/v4/st-pete-clearwater');ed=json.load(open(p/'editorial.json'));ed['prices'].update(json.load(open(p/'verified-extra-prices.json')))
source='https://www.visitstpeteclearwater.com/list/classic-old-florida-attractions-restaurants'
specs={'new-port-richey':(['#ecd7b8','#d6ad8d','#f2e5ce'],['#b78469','#c1a58b'],'flat','stucco'),'tarpon-springs':(['#f4eedf','#bcd4d7','#dac6a6'],['#a8b9b4','#d3c6ad'],'flat','stucco'),'dunedin':(['#ecd4ae','#c9d8ba','#e0b5a0'],['#a3b1a2','#bfa48a'],'gable','porches'),'safety-harbor':(['#e5d6ae','#c7d8c0','#f4e6c9'],['#b0bbb0','#c6b18e'],'gable','porches'),'clearwater':(['#c3dcd9','#f2ead8','#e2d5bc'],['#d8dfd5','#adbeb8'],'flat','glass-bands'),'clearwaterbeach':(['#fcf6e6','#d4e8e1','#f2e2c7'],['#e7e8da'],'flat','balconies'),'indian-rocks-beach':(['#efd1b4','#c8e0cc','#d3e6de','#f4e4b1'],['#c2d0c6','#abbdb2'],'gable','porches'),'madeira-beach':(['#ede1c7','#c7dcd5','#dfc2a7'],['#b2c3ba','#d3d9cc'],'flat','balconies'),'treasure-island':(['#f4e3c9','#edc4b2','#c7e0d9'],['#d6ddd1','#b4c6bd'],'flat','balconies'),'st-pete-beach':(['#f7e7cc','#edc2bf','#fff4df','#d2dfca'],['#be9279','#d1c9ac'],'flat','balconies'),'gulfport':(['#d8cee4','#c9e1c7','#f3d6ac','#f1c2bc'],['#b8c8be','#d6dccf'],'gable','porches')}
for id,(walls,roofs,roof,detail) in specs.items():ed['recipes'][id]={'walls':walls,'roofs':roofs,'roof':roof,'detail':detail,'source':source}
ed['skip_town_centers']=['st-petersburg'];ed['extraDistricts']=[d for d in json.load(open('outputs/florida_coastal_atlas/regions/districts.json')) if d['town']=='st-petersburg']
ed['manual_fixes'].append('Expanded inputs to the existing St. Pete/Clearwater catalog towns; retained Downtown and Old Northeast as separate St. Petersburg districts.')
(p/'editorial.json').write_text(json.dumps(ed,indent=2))
p=Path('work/coastal_pipeline/v4/normalize_region.py');s=p.read_text().replace("for town in catalog['towns']:\n d=", "for town in catalog['towns']:\n if town['id'] in ed.get('skip_town_centers',[]):continue\n d=")
extra="""for original in ed.get('extraDistricts',[]):
 d=dict(original);node=elements['node',ed['osmAnchors'][d['id']]];d['lon']=node['lon'];d['lat']=node['lat'];d['x'],d['y']=[v/1000 for v in T.transform(d['lon'],d['lat'])];d['positionSource']='https://www.openstreetmap.org/node/'+str(node['id']);d['centerMeaning']='Representative OSM place-label anchor: '+node['tags']['name'];d['style']=d['id']
 value,metric,period,url=ed['prices'][d['id']];d['priceRange']=f'${value:,.0f} {metric} · {period}';d['priceSource']=url;d['priceEvidence']={'kind':'published median','value':value,'metric':metric,'period':period,'checked':'2026-10-17','source':url};d['source']=ed['recipes'][d['id']]['source'];ds.append(d)
"""
s=s.replace("(P/'districts.json').write_text",extra+"(P/'districts.json').write_text")
p.write_text(s)
