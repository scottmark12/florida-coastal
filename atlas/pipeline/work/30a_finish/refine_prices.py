import json,re
from pathlib import Path
D=Path('work/30a_finish/source');ds=json.loads((D/'districts.json').read_text())
for d in ds:
 r=d['priceEvidence'];ls=r['listings']
 if d['id']=='santa-rosa-beach':
  s=(D/'gulf-place-price.html').read_text();ls=json.loads(re.search(r'var fbPixelSearchListings\d+\s*=\s*(\[.*?\]);',s).group(1));ls=[e for e in ls if 'gulf place' in e['subDivision'].lower()];r['source']='https://www.bestofemeraldcoast.com/gulf-place-real-estate/';r['sourcePages']=[r['source']];d['description']+=' Housing examples here are for Gulf Place, the coastal center shown, rather than the entire Santa Rosa Beach postal area.'
 if d['id']=='inlet-beach':ls=[e for e in ls if any(k in e.get('subDivision','').lower() for k in ['inlet','grande pointe']) and 'watersound' not in e.get('subDivision','').lower()]
 ls=[e for e in ls if e.get('beds',{}).get('count',1)<=10 and 'inn & suites' not in e.get('subDivision','').lower()]
 for e in ls:
  if 'priceValue' not in e:e['priceValue']=int(re.sub(r'\D','',e['price']))
 assert ls,d['id'];r.update(listings=ls,min=min(e['priceValue'] for e in ls),max=max(e['priceValue'] for e in ls),scope='Verified observed asking-price sample of 1+ bedroom houses/condos, not an exhaustive market range. Land, fractional interests and obvious hotel/large multi-home packages excluded. See subdivision names and source pages.')
 d.update(priceRange=f'${r["min"]/1e6:.2f}M–${r["max"]/1e6:.2f}M · verified listing examples · Oct 16, 2026',priceSource=r['source']);print(d['id'],len(ls),d['priceRange'])
(D/'districts.json').write_text(json.dumps(ds,indent=2))
p=Path('outputs/30a_finish/30a.json');e=json.loads(p.read_text());e['districts']=ds;p.write_text(json.dumps(e,separators=(',',':')))
