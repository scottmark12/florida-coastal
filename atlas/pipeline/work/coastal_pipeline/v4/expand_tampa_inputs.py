import json
from pathlib import Path
p=Path('work/coastal_pipeline/v4/tampa-south-shore');ed=json.load(open(p/'editorial.json'));catalog=json.load(open('outputs/florida_coastal_atlas/regions/catalog.json'))
for id,value,node in [('apollo-beach',515000,154125902),('ruskin',346500,153831375),('sun-city-center',255000,154211608)]:
 ed['prices'][id]=[value,'median listing price','September 2026','https://www.realtor.com/local/market/florida/hillsborough-county/'+id];ed['osmAnchors'][id]=node;ed['recipes'][id]={'walls':{'apollo-beach':['#f4e9d1','#d8e7dc','#e9d4ba'],'ruskin':['#dac9a8','#d7dfc4','#edddba'],'sun-city-center':['#e5d9bd','#f4e6ca','#e2d6bd']}[id],'roofs':['#b8a68e','#c6b396','#aab7a8'],'roof':'gable','detail':'porches','source':'https://planhillsborough.org/wp-content/uploads/2023/01/Hillsborough_County_Sustainable_Growth_Study_Report.pdf'}
ed['manual_fixes'].append('Added the existing South Shore catalog towns to the input set so the Tampa package also covers Apollo Beach, Ruskin and Sun City Center; their cards use citywide published medians.')
(p/'editorial.json').write_text(json.dumps(ed,indent=2))
s=Path('work/coastal_pipeline/v4/normalize_tampa.py').read_text();old="for d in ds:\n node="
new="""catalog=json.load(open('outputs/florida_coastal_atlas/regions/catalog.json'))
for t in catalog['towns']:
 if t['id'] in ['apollo-beach','ruskin','sun-city-center']:ds.append({'id':t['id'],'town':t['id'],'name':t['name'],'kind':'boating','description':t['blurb']})
for d in ds:
 node="""
s=s.replace(old,new).replace("'towns':['tampa']","'towns':['tampa','apollo-beach','ruskin','sun-city-center']")
Path('work/coastal_pipeline/v4/normalize_tampa.py').write_text(s)
