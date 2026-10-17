from pathlib import Path
import json
p=Path('work/coastal_pipeline/v3/engine.py');s=p.read_text().replace('if h>.035 or seed%3==0:','if h>.065 or seed%11==0:')
s=s.replace("for p in beaches:surf(p,.003,'#fffdf1')",'''for p in beaches:surf(p,.003,'#fffdf1')
# Ocean-facing sand ribbon, sourced from oriented OSM shoreline segments.
# Styling width is 60 m inland; it does not move the actual land/water boundary.
for zone in rules.get('oceanBeachZones',[]):
 segments=[]
 for e in es:
  if e.get('tags',{}).get('natural')!='coastline':continue
  pts=e.get('geometry',[])
  for a,b in zip(pts,pts[1:]):
   line=LineString([(a['lon'],a['lat']),(b['lon'],b['lat'])])
   if b['lat']>a['lat'] and box(*zone).covers(line.centroid):segments.append(project(line))
 if segments:surf(unary_union(segments).buffer(.06,quad_segs=6).intersection(land),.0031,'#fffdf1')''');p.write_text(s)
p=Path('work/coastal_pipeline/v3/rules.json');r=json.loads(p.read_text());r['oceanBeachZones']=[[-80.139,25.766,-80.10,25.88],[-80.159,25.665,-80.14,25.72]];r['recipes']['southbeach-district']['walls']=['#bce4d5','#f3c0cd','#f6e5a2','#fff8eb'];p.write_text(json.dumps(r,indent=2))
p=Path('work/coastal_pipeline/v3/water_wash.py');s=p.read_text().replace('.35*W','.22*W').replace('.24*W','.18*W').replace('a*1.65,0,235','a*1.3,0,205');p.write_text(s)
p=Path('work/atlas_regions/app.js');s=p.read_text().replace("const token=++packageToken,flight=pendingFlight;", "document.documentElement.classList.toggle('miami-region',isMiami()&&level==='region');const token=++packageToken,flight=pendingFlight;")
s=s.replace("l.ay+l.side*(innerWidth<700?28:34)","l.ay+l.side*(innerWidth<700?28:isMiami()&&l.side<0?52:34)")
s=s.replace("'Regional view · approximately 30 miles across'", "(isMiami()?'Miami & the bay · regional atlas':'Regional view · approximately 30 miles across')")
# Preserve the approved 30A initial card behavior.
s=s.replace("await show();if(selectedDistrict)openDistrict(selectedDistrict);", "await show();if(selectedDistrict&&isMiami())openDistrict(selectedDistrict);")
p.write_text(s)
p=Path('outputs/florida_coastal_atlas/explore_coast.html');s=p.read_text().replace('</head>','<style>.miami-region .district-anchor:not(.coast-dot){width:76px;height:54px}.miami-region .map-label{font-size:13px}</style></head>');p.write_text(s)
