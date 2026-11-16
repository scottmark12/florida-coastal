from pathlib import Path
import re,json
from bs4 import BeautifulSoup
ROOT=Path(__file__).resolve().parents[1]
coverage=json.load(open(ROOT/'tools/price-audit/coverage.json'))
for change in coverage['display_changes']:
 if change['surface']!='neighborhood':continue
 p=ROOT/'towns/hudson.html';s=p.read_text();assert s.count(change['before'])==1;s=s.replace(change['before'],change['after']);p.write_text(s)
source=(ROOT/'src/towns/hudson-v3.html').read_text();p=ROOT/'towns/hudson.html';s=p.read_text()
a=s.index('<div class="bud">');b=s.index('<div class="src">',a);aa=source.index('<div class="bud">');bb=source.index('<div class="src">',aa)
s=s[:a]+source[aa:bb]+s[b:]
old='Prices from Broker One, Redfin and Momentum, 2026. Insurance varies by home.'
new=source[bb+len('<div class="src">'):source.index('</div>',bb)]
assert s.count(old)==1;s=s.replace(old,new);p.write_text(s)
count=0
for p in (ROOT/'towns').glob('*.html'):
 s=p.read_text()
 def change(m):
  global count
  text=m.group(2)
  if 'Landmark Signature Realty' not in text or ':' not in text or 'broker guidance' in text:return m.group(0)
  a,b=text.split(':',1);count+=1
  return m.group(1)+a+': broker guidance,'+b+'; not a verified closed-sale range'+m.group(3)
 n=re.sub(r'(<span class=ap>)(.*?)(</span>)',change,s,flags=re.S)
 if n!=s:p.write_text(n)
# Apply the same source-defined tool explanation to the live canonical pages.
notes=re.findall(r'<p class="src" style="max-width:1100px.*?</p>',(ROOT/'src/pages/compare-v3.html').read_text())
assert len(notes)==1
for name in ['index.html','map.html','quiz-results.html','compare.html','towns/index.html']:
 p=ROOT/name;s=p.read_text();pos=s.rfind('</main>')
 if pos<0:pos=s.find('<footer')
 if pos<0:pos=s.rfind('</body>')
 assert pos>0;s=s[:pos]+notes[0]+s[pos:];p.write_text(s)
print('Updated Hudson and',count,'broker-attributed live claims; source context added to five tool pages.')
