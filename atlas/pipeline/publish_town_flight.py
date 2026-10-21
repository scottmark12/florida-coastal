"""Embed the readable flight source and latest regional metadata in the site.
Run build_flight_map.py first when regional artwork/cameras change.
"""
from pathlib import Path
import hashlib,json,re
R=Path(__file__).resolve().parents[2];P=Path(__file__).resolve().parent
meta=json.load(open(R/'img/atlas/flight-regions.json'));source=(P/'site-town-flight.js').read_text();end=source.index(';\nconst flightMapImages')
source='const FLIGHT_MAP='+json.dumps({k:meta[k] for k in ['desktop','mobile','bounds','towns']},separators=(',',':'))+source[end:]
tones=json.load(open(R/'img/atlas/town-tones.json'))['recipes']
tone_start=source.index('const TOWN_TONES=')+len('const TOWN_TONES=')
tone_end=tone_start+json.JSONDecoder().raw_decode(source[tone_start:])[1]
source=source[:tone_start]+json.dumps(tones,separators=(',',':'))+source[tone_end:]
(P/'site-town-flight.js').write_text(source)
old=re.search(r'assets/(app\.[a-f0-9]+\.js)',(R/'find-your-mile.html').read_text())[1];runtime=(R/'assets'/old).read_text();start=runtime.index('const FLIGHT_MAP=');end=runtime.index('async function revealStep',start)
runtime=runtime[:start]+source+runtime[end:]
key='e.id+(o?"-close":"")+(a?"-m":"")'
runtime=runtime.replace('<div class="lnd-box"><img src=', '<div class="lnd-box">${townToneHTML('+key+')}<img style="${townToneStyle('+key+')}" src=')
name='app.'+hashlib.sha256(runtime.encode()).hexdigest()[:10]+'.js';(R/'assets'/name).write_text(runtime)
for p in R.rglob('*.html'):
 if R/'atlas' in p.parents or '.git' in p.parts:continue
 text=p.read_text();updated=text.replace(old,name)
 if updated!=text:p.write_text(updated)
p=R/'atlas/landing/walkthrough-coverage.json';report=json.load(open(p));report['asset']=name;p.write_text(json.dumps(report,indent=2)+'\n')
print(name)
