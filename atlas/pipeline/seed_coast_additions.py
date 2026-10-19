import json
from pathlib import Path
P=Path(__file__).resolve().parent;A=P.parent;root=A/'pipeline/work/coastal_pipeline/v4';cat=json.load(open(A/'regions/catalog.json'));rows=json.load(open(P/'coast-additions.json'))
for tid,name,rid,lon,lat,county,blurb,style in rows:
 r=next(r for r in cat['regions'] if r['id']==rid);p=root/tid;p.mkdir(exist_ok=True);town={'id':tid,'name':name,'region':('Panhandle' if rid=='emerald-coast' else 'Gulf Coast')+' · '+r['map'],'coast':r['coast'],'lon':lon,'lat':lat,'vibes':['walk'] if style=='walk' else ['dock'],'blurb':blurb,'area_id':rid,'area_name':r['name'],'source_url':'https://www.openstreetmap.org/','source_bounds':[lon-.045,lat-.035,lon+.045,lat+.035]};
 if tid=='miramar-beach':town['source_bounds'][0]=-86.422
 b=[lon-.065,lat-.055,lon+.065,lat+.055];(p/'catalog-input.json').write_text(json.dumps({'region':{**r,'name':name,'towns':[tid]},'towns':[town],'bounds':b},indent=2)+'\n')
