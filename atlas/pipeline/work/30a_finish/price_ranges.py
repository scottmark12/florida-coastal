exec(open('work/30a_finish/prices.py').read().split('for slug in slugs:')[0])
records=json.loads((D/'prices.json').read_text())
for slug,r in records.items():
 s=(D/(slug+'-price.html')).read_text();m=re.search(r'Page 1 of (\d+)',s);n=int(m.group(1)) if m else 1
 data=[e for e in r['listings'] if e['listTypeDescrip']!='Fractional'];pages=[r['source']]
 for pg in range(n,max(1,n-4),-1):
  p=D/(slug+f'-price-{pg}.html');url=r['source']+f'?pg={pg}'
  if not p.exists():subprocess.run(['curl','-sS','--max-time','35',url,'-o',str(p)])
  m=re.search(r'var fbPixelSearchListings\d+\s*=\s*(\[.*?\]);',p.read_text())
  if not m:continue
  found=[e for e in json.loads(m.group(1)) if e.get('status')=='Active' and e.get('beds',{}).get('count',0)>0 and e.get('listTypeDescrip')!='Fractional']
  for e in found:e['priceValue']=int(re.sub(r'\D','',e['price']))
  data+=found;pages.append(url)
  if found:break
 r.update(listings=data,min=min(e['priceValue'] for e in data),max=max(e['priceValue'] for e in data),sourcePages=pages,scope='Observed active whole-home asking range from price-descending first page and lowest residential page; includes houses and condos, excludes land and fractional interests. Search boundaries follow brokerage definition, not municipal boundaries.')
 print(slug,r['min'],r['max'],flush=True)
 (D/'price-ranges.json').write_text(json.dumps(records,indent=2))
