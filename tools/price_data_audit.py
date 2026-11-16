"""Reconcile dated town price displays; record covered files and source-limited corrections."""
import json,re,csv,statistics,html,hashlib
from pathlib import Path
from bs4 import BeautifulSoup
from pypdf import PdfReader
ROOT=Path(__file__).resolve().parents[1]
EVIDENCE=Path('/Users/markscott/Documents/Codex/2026-11-14/download-the-latest-available-florida-department/outputs/_price_validation')
OUT=ROOT/'tools/price-audit';OUT.mkdir(exist_ok=True)
load=lambda p:json.loads(p.read_text())
write=lambda p,v:p.write_text(json.dumps(v,indent=2,ensure_ascii=False)+'\n')
base=ROOT/'src/data';towns=load(base/'towns.json');compare=load(base/'compare-d.json');beach=load(base/'beach-towns-t.json');results=load(base/'results-td.json');by={t['id']:t for t in towns}
registry={};changes=[];mismatch=[]
for t in towns:
 id=t['id'];p=ROOT/'towns'/f'{id}.html'
 if not p.exists():continue
 soup=BeautifulSoup(p.read_text(),'html.parser');detail=''
 for tr in soup.select('tr'):
  th=tr.find('th')
  if th and th.get_text(strip=True)=='Home prices':detail=tr.find('td').get_text(' ',strip=True)
 registry[id]={'display_price':t.get('p'),'source_context':detail,'verification':'Existing published figure; no independent numerical certification','reviewed_on':'2026-11-16'}
 if id in compare['towns']:
  old=compare['towns'][id]['pr'];new=t.get('p') or 'Ask for current sales'
  if old!=new:changes.append({'town':id,'surface':'comparison','before':old,'after':new})
  compare['towns'][id]['pr']=new
  # Date and metric context is retained separately instead of attaching an unjustified median label.
  compare['towns'][id]['priceContext']=detail or 'See the town page for price sources and dates.'
 if id in results:results[id]['p']=t.get('p')
for t in beach:
 if t['id'] not in by:continue
 price=by[t['id']].get('p');t['p']=price
 amounts=re.findall(r'\$\s*([\d,.]+)\s*([KM])',price or '',re.I)
 # A range is sorted/filterable by its lower bound; do not invent a midpoint or a sale median.
 lower=float(amounts[0][0].replace(',',''))*(1000 if amounts[0][1].upper()=='M' else 1) if amounts else None
 if t.get('m')!=lower:mismatch.append({'town':t['id'],'old_budget_thousands':t.get('m'),'new_lower_bound_thousands':lower})
 t['m']=lower
write(base/'compare-d.json',compare);write(base/'beach-towns-t.json',beach);write(base/'results-td.json',results)
# Show the dated underlying metric in comparison rather than asserting every amount is a median.
p=ROOT/'src/js/compare-1.js';s=p.read_text();old="row('Home prices',t=>pairs(esc(t.pr),prC(t.pr)))";new="row('Home prices',t=>pairs(esc(t.pr)+'<small class=\"cmp-sub\">'+esc(t.priceContext||'See the town page for price sources and dates.')+'</small>',prC(t.pr)))";assert s.count(old)==1;s=s.replace(old,new);p.write_text(s)
# Correct the three suspect Hudson claims with explicitly defined recorded-sale samples.
raw=list(csv.DictReader(open(EVIDENCE/'pasco_sale_evidence.csv')));cohorts=load(EVIDENCE/'pasco_official_cohorts.json');evidence=[];updates=[]
for label,code in [('Hudson Beach Estates','HUBE'),('Sea Pines','SEPN'),('Beacon Woods East','BCWE')]:
 es=[r for r in raw if r['neighborhood_code']==code and r['property_type']=='Single Family' and '2026-05'<=r['sale_month']<='2026-10']
 assert es
 median=statistics.median(float(r['sale_price']) for r in es);official=next(c for c in cohorts if c['official_neighborhood_code']==code)
 claim=f'{label}: ${median/1000:g}K median across {len(es)} recorded single-family sales, May–Oct 2026 (Pasco County sample, {code})'
 updates.append({'label':label,'code':code,'claim':claim,'median':median,'sales':len(es),'official_name':official['official_neighborhood_name']})
 for r in es:evidence.append({k:r[k] for k in ['parcel_id','neighborhood_code','neighborhood_name','property_type','sale_date','sale_price','qualification','book','page']})
p=ROOT/'src/towns/hudson-v3.html';s=p.read_text();soup=BeautifulSoup(s,'html.parser')
for u in updates:
 old=next(x.get_text(strip=True) for x in soup.select('.ap') if x.get_text().startswith(u['label']+':'))
 assert s.count(old)==1;s=s.replace(old,u['claim']);changes.append({'town':'hudson','surface':'neighborhood','before':old,'after':u['claim']})
start=s.index('<div class="bud">');end=s.index('<div class="src">',start)
s=s[:start]+'''<div class="bud"><div><b>Inland houses</b><span>Compare current sales by size and condition</span><small>Beacon Woods East</small></div><div><b>Canal homes</b><span>Check seawall, elevation and flood history</span><small>Sea Pines, Hudson Beach Estates</small></div><div><b>Waterfront homes</b><span>Dock and water access affect the price</span><small>Request address-level comparisons</small></div></div>'''+s[end:]
old='Prices from Broker One, Redfin and Momentum, 2026. Insurance varies by home.'
new='Neighborhood figures are recorded-sale samples from Pasco County’s November 8, 2026 files, using the county neighborhood codes shown. Single-family, qualified improved sales only; duplicate and shared-deed transfers excluded. These samples may omit recent closings and do not define a current market value or a waterfront-only price. Sea Pines uses SEPN; Preserve at Sea Pines (RAIN) is separate. <a href="/data/hudson-recorded-sales.json">Sample definitions and supporting sales</a>. Town-wide pricing below uses its separately named source.'
assert s.count(old)==1;s=s.replace(old,new);p.write_text(s)
(ROOT/'data').mkdir(exist_ok=True)
write(ROOT/'data/hudson-recorded-sales.json',{'source_url':'https://downloads.pascopa.com/','source_export_date':'2026-11-08','window':'2026-05-01 through 2026-10-31','reviewed_on':'2026-11-16','statistic':'Median of the recorded qualified single-family sample; not a complete current market median','county_codes':updates,'limitations':['County appraisal neighborhoods can differ from marketed boundaries','Recent sales or qualifications may be incomplete','Use codes are from current parcel records','Shared-deed exclusion can omit legitimate sales'],'sales':evidence})
# Mark broker guidance as guidance; preserve supported attribution, avoid a fabricated sale statistic.
broker_count=0
for p in (ROOT/'src/towns').glob('*.html'):
 s=p.read_text()
 def change(m):
  global broker_count
  text=m.group(2)
  if 'Landmark Signature Realty' not in text or 'broker guidance' in text:return m.group(0)
  if ':' not in text:return m.group(0)
  a,b=text.split(':',1);broker_count+=1
  return m.group(1)+a+': broker guidance,'+b+'; not a verified closed-sale range'+m.group(3)
 new=re.sub(r'(<span class=ap>)(.*?)(</span>)',change,s,flags=re.S)
 if new!=s:p.write_text(new)
# Shared tool context: explain that displayed figures differ in metric and date.
note='<p class="src" style="max-width:1100px;margin:20px auto;padding:0 20px;font-size:13px;line-height:1.5">Price guides use different dates and measures, including sale prices, asking prices and estimated values. Check each town’s source and period before comparing. Budget filters use the lower end where a range is shown.</p>'
for name in ['home-v2.html','vibe-v3.html','quiz-results-v3.html','compare-v3.html','towns/index-v2.html']:
 p=ROOT/'src/pages'/name;s=p.read_text()
 if 'Budget filters use the lower end' not in s:
  pos=s.rfind('</main>')
  if pos<0:pos=s.find('<footer')
  if pos<0:pos=s.rfind('</body>')
  assert pos>0;s=s[:pos]+note+s[pos:];p.write_text(s)
# Full PDF text scan: no edits are needed when there are no price amounts.
pdfs=[]
for p in [ROOT/'guides/move-and-belong-guide.pdf',ROOT/'downloads/florida-beach-towns-flood-risk.pdf']:
 reader=PdfReader(p);pages=[page.extract_text() or '' for page in reader.pages];amounts=[{'page':i+1,'matches':re.findall(r'\$\s*[\d,.]+|\b\d+(?:\.\d+)?\s*(?:thousand|million)\b',t,re.I)} for i,t in enumerate(pages)];pdfs.append({'file':str(p.relative_to(ROOT)),'pages':len(pages),'text_characters':sum(map(len,pages)),'amounts':[a for a in amounts if a['matches']],'sha256':hashlib.sha256(p.read_bytes()).hexdigest()})
write(OUT/'price-registry.json',registry);write(OUT/'coverage.json',{'reviewed_on':'2026-11-16','dynamic_price_sources':['towns.json','beach-towns-t.json','results-td.json','compare-d.json'],'display_changes':changes,'budget_filter_corrections':mismatch,'broker_guidance_labels_added':broker_count,'pdfs':pdfs,'independent_numeric_certification':'Only the three explicitly defined Hudson recorded-sale samples were recalculated. Other existing published prices are synchronized and labeled, not independently certified.'})
print(json.dumps({'comparison_updates':len([c for c in changes if c['surface']=='comparison']),'budget_filter_updates':len(mismatch),'hudson_samples':updates,'broker_guidance_labels':broker_count,'pdfs':pdfs},indent=2))
