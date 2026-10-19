"""Register validated new atlas towns; root website/quiz files are untouched."""
from pathlib import Path
import json,math
P=Path(__file__).resolve().parent;A=P.parent;spec=json.load(open(P/'coast-additions.json'));cat=json.load(open(A/'regions/catalog.json'));newids={r[0] for r in spec};cat['towns']=[t for t in cat['towns'] if t['id'] not in newids]
for row in spec:
 tid,name,rid,lon,lat,county,blurb,style=row;root=P/'work/coastal_pipeline/v4'/tid;d=json.load(open(root/'districts.json'))[0];t=json.load(open(root/'catalog-input.json'))['towns'][0];recipe=json.load(open(root/'recipes.json'))['recipes'][tid];t.update(lon=d['lon'],lat=d['lat'],x=d['x'],y=d['y'],source_url=recipe['source'],tier=2,price=d['priceRange'],nearest_town_km=0)
 cat['towns'].append(t);region=next(r for r in cat['regions'] if r['id']==rid)
 if tid not in region['towns']:region['towns'].append(tid)
for region in cat['regions']:
 if region['id'] not in ['emerald-coast','nature-coast']:continue
 ts=[t for t in cat['towns'] if t['id'] in region['towns']];region['towns']=[t['id'] for t in sorted(ts,key=(lambda t:t['lon']) if region['id']=='emerald-coast' else (lambda t:-t['lat']))]
 for t in ts:t['nearest_town_km']=min(math.hypot(t['x']-s['x'],t['y']-s['y']) for s in ts if s['id']!=t['id'])
(A/'regions/catalog.json').write_text(json.dumps(cat,indent=2)+'\n');print('Registered',len(spec),'new towns')
