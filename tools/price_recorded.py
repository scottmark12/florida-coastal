"""Nov 19 2026: one price route for every surface: recorded sales (what the town pages and compare show).
Reads data/town-recorded-sale-prices.json and writes into src/data:
  towns.json      p  headline price ("$495K"), pk its kind (house, condo, home), pc condo price when the headline is a house,
                  pf true when the headline rests on under 20 sales, pm the budget match price in $K (the cheaper of house and condo)
  results-td.json p, pk, pc, pf (results slides)
  compare-d.json  pr  "$495K house" (Shortlist page)
  beach-towns-t.json p, m (m = match price)
  map-ld.json     med (match price), bg (budget gap per Slider Map budget tier, same math as the quiz)
  quiz-qd.json    m (the cheaper price) and mk its kind, mh house and mc condo when known: the quiz matches the budget
                  on houses when they picture a house or a dock, on condos when they picture a condo, else the cheaper
Run: python3 tools/price_recorded.py && node tools/site/build.js"""
import json
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]; S=ROOT/'src/data'
load=lambda p:json.loads(p.read_text()); 
def dump(p,v,ref):
    txt=p.read_text(); l2=txt.split('\n')[1] if '\n' in txt else ''; ind=(len(l2)-len(l2.lstrip(' ')) or None) if txt[:2] in ('{\n','[\n') else None
    p.write_text(json.dumps(v,indent=ind,ensure_ascii=False,separators=None if ind else (',',':'))+('\n' if txt.endswith('\n') else ''))
REC=load(ROOT/'data/town-recorded-sale-prices.json')['towns']
def fmt(v):
    k=v/1000
    if k>=1000: s=f"{k/1000:.2f}".rstrip('0').rstrip('.'); return f"${s}M"
    return f"${round(k)}K"
BUDGET_TOP=[350,500,750,1100]
def gaps(m):
    out=[]
    for b in range(4):
        g=0
        for x in range(b,3):
            if m>1.05*BUDGET_TOP[x]: g+=1
        out.append(min(3,g))
    return out
info={}
for tid,v in REC.items():
    ss=v['sale_samples']
    first=lambda kinds:next((s for s in ss if s['type'] in kinds and s.get('median')),None)
    h=first(('House',)); c=first(('Condo','Condo or townhome')); a=first(('All-home',))
    head=h or a or c; kind='house' if head is h else 'home' if head is a else 'condo'
    meds=[s['median'] for s in (h,c,a) if s]
    i={'p':fmt(head['median']),'pk':kind,'pm':round(min(meds)/1000)}
    low=min((x for x in (h,c,a) if x),key=lambda x:x['median']); i['_mk']='house' if low is h else 'condo' if low is c else 'home'
    if h: i['_mh']=round(h['median']/1000)
    if c: i['_mc']=round(c['median']/1000)
    if h and c: i['pc']=fmt(c['median'])
    if head.get('sales') is not None and head['sales']<20: i['pf']=True
    info[tid]=i
towns=load(S/'towns.json')
for t in towns:
    i=info[t['id']]
    for k in ('pc','pf'): t.pop(k,None)
    t.update({k:v for k,v in i.items() if not k.startswith('_')})
dump(S/'towns.json',towns,None)
res=load(S/'results-td.json')
for tid,t in res.items():
    if tid in info:
        for k in ('pc','pf'): t.pop(k,None)
        t.update({k:info[tid][k] for k in ('p','pk','pc','pf') if k in info[tid]})
dump(S/'results-td.json',res,None)
cd=load(S/'compare-d.json')
for tid,t in cd['towns'].items():
    if tid in info: t['pr']=info[tid]['p']+' '+info[tid]['pk']+(' · '+info[tid]['pc']+' condo' if 'pc' in info[tid] else '')
dump(S/'compare-d.json',cd,None)
bt=load(S/'beach-towns-t.json')
for t in bt:
    if t['id'] in info: t['p']=info[t['id']]['p']; t['m']=info[t['id']]['pm']
dump(S/'beach-towns-t.json',bt,None)
ld=load(S/'map-ld.json')
for tid,t in ld.items():
    if tid in info: t['med']=info[tid]['pm']; t['bg']=gaps(info[tid]['pm'])
dump(S/'map-ld.json',ld,None)
qd=load(S/'quiz-qd.json')
for tid,t in qd.items():
    if tid in info:
        i=info[tid]; t['m']=i['pm']; t['mk']=i['_mk']
        for k in ('mh','mc'):
            t.pop(k,None)
            if '_'+k in i: t[k]=i['_'+k]
dump(S/'quiz-qd.json',qd,None)
print(len(info),'towns; condo beside house:',sum('pc' in i for i in info.values()),'; few sales:',sum('pf' in i for i in info.values()))
