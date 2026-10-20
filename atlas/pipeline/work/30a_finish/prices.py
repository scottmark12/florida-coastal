import re,json,subprocess,time
from pathlib import Path
D=Path('work/30a_finish/source');records={}
slugs=['seaside','blue-mountain-beach','dune-allen','rosemary-beach','watercolor','watersound','seagrove','seacrest','inlet-beach','grayton-beach','santa-rosa-beach']
for slug in slugs:
 url='https://www.bestofemeraldcoast.com/'+slug+'-real-estate/'
 p=D/(slug+'-price.html')
 if not p.exists():subprocess.run(['curl','-sS','--max-time','35',url,'-o',str(p)])
 s=p.read_text();m=re.search(r'var fbPixelSearchListings\d+\s*=\s*(\[.*?\]);',s)
 if not m:print(slug,'MISSING',flush=True);continue
 data=json.loads(m.group(1));data=[r for r in data if r.get('status')=='Active' and r.get('beds',{}).get('count',0)>0]
 for r in data:r['priceValue']=int(re.sub(r'\D','',r['price']))
 records[slug]={'source':url,'checked':'2026-10-16','scope':'Active residential listings displayed on first source page; sample asking range, not full market or sale prices','listings':data,'min':min(r['priceValue'] for r in data),'max':max(r['priceValue'] for r in data)}
 print(slug,len(data),records[slug]['min'],records[slug]['max'],flush=True)
 (D/'prices.json').write_text(json.dumps(records,indent=2))
 time.sleep(.5)
