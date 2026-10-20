from pathlib import Path
import json,hashlib
P=Path('work/coastal_pipeline/v3');r=json.loads((P/'rules.json').read_text())
r['recipes']['southbeach-district'].update(walls=['#a8d9c6','#efaebc','#f2df91','#fff8eb'],roofs=['#fff6e4','#e8e4d5'],trim=['#4c9d98','#c7788b','#e2b75f'],detail='deco')
r['recipes']['brickell'].update(walls=['#72aac9','#54a5b0','#edf6f3','#8dbed1'],roofs=['#dce9e6','#eff5ef'],trim=['#f4fbf8'],detail='glass-bands')
r['recipes']['downtown']=dict(r['recipes']['brickell'])
r['recipes']['mid-beach']={'walls':['#faf2dc','#c3dce0','#e3c8b0'],'roofs':['#ece8d9'],'roof':'flat','detail':'balconies','source':'https://www.miamiandbeaches.com/neighborhoods/miami-beach/mid-beach'}
r['recipes']['key-biscayne']={'walls':['#fff4df','#e8d9b8','#d5e2d9'],'roofs':['#c4a184','#c5ccc2'],'roof':'gable','detail':'porches','source':'https://www.miamiandbeaches.com/neighborhoods/key-biscayne'}
# Explicit geographic style zones override nearest-anchor assignment; no geometry moves.
r['styleZones']=[{'bounds':[-80.145,25.764,-80.125,25.795],'recipe':'southbeach-district'},{'bounds':[-80.205,25.749,-80.181,25.793],'recipe':'downtown'}]
(P/'rules.json').write_text(json.dumps(r,indent=2))
d=json.loads((P/'miami/districts.json').read_text())
prices={
'brickell':(735000,'median listing price','September 2026','https://www.realtor.com/local/market/florida/miami/brickell'),
'grove':(1890000,'median sale price','trailing three months, retrieved October 17, 2026','https://www.redfin.com/neighborhood/219259/FL/Miami/Coconut-Grove/housing-market'),
'gables':(1399334,'median sale price','September 2026','https://www.redfin.com/city/3707/FL/Coral-Gables/housing-market'),
'southbeach-district':(489000,'median listing price','August 2026','https://www.realtor.com/local/market/florida/miami-beach/south-beach'),
'edgewater':(526000,'median sale price','trailing three months, retrieved October 17, 2026','https://www.redfin.com/neighborhood/224218/FL/Miami/Edgewater/housing-market'),
'mid-beach':(750000,'median listing price','September 2026','https://www.realtor.com/local/market/florida/miami-beach/mid-beach'),
'key-biscayne':(1520276,'median sale price','September 2026','https://www.redfin.com/city/9243/FL/Key-Biscayne/housing-market')}
(P/'miami/verified-medians.json').write_text(json.dumps(prices,indent=2))
# Price verification supports either a published median or a genuine >=10-listing range.
p=Path('work/coastal_pipeline/v2/pipeline.py');s=p.read_text();start=s.index("  if not (p.get('priceSource')");end=s.index('\n for kind',start)
s=s[:start]+'''  median=ev.get('kind')=='published median' and isinstance(ev.get('value'),(int,float)) and ev.get('metric') and ev.get('period')
  listing_range=isinstance(ev.get('min'),(int,float)) and isinstance(ev.get('max'),(int,float)) and ev['min']<ev['max'] and len(ev.get('examples',[]))>=10
  if not (p.get('priceSource') and p.get('priceRange') and ev.get('checked') and (median or listing_range)):issues.append({'code':'price_evidence','district':d['id'],'detail':'A dated published median or at least 10 current listings is required.'})'''+s[end:];p.write_text(s)
# Record the approved source geometry before the extension.
checks={k:hashlib.sha256((P/'miami'/k).read_bytes()).hexdigest() for k in ['land.json','shoreline.json','districts.json']}
(P/'miami/approved-core-hashes.json').write_text(json.dumps(checks,indent=2))
