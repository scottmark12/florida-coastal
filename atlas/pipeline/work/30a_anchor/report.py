from pathlib import Path
import json,html,hashlib,shutil
from PIL import Image,ImageDraw,ImageFont
O=Path('outputs/30a_anchor');qs=json.loads((O/'responsive-checks.json').read_text());ds=json.loads(Path('outputs/30a_finish/30a.json').read_text())['districts'];before=json.loads(Path('work/30a_art/baseline/30a.json').read_text());assert ds==before['districts'];assert hashlib.sha256(Path('outputs/30a_finish/assets/30a-finished.glb').read_bytes()).hexdigest()=='8ef96f1f4e2da746592369f819c2af3231fa7cb4ae5eafdcd94c76cd115a1c52'
for q in qs:
 assert q['canvas']=={'x':0,'y':0,'width':q['width'],'height':q['height']}
 assert max(q['leaders'])<=40 and not q['overlaps'] and not q['errors']
 assert q['glyphsVisible']==(0 if q['width']<700 else 12)
 assert max(x['errorMeters'] for x in q['renderedAnchorErrors'])<1.0
rows=[]
for d in ds:
 errors=[next(a['errorMeters'] for a in q['renderedAnchorErrors'] if a['id']==d['id']) for q in qs]
 rows.append({'name':d['name'],'id':d['id'],'osmSourceErrorMeters':0.0,'error390m':errors[0],'error768m':errors[1],'error1440m':errors[2],'maxRenderedErrorMeters':max(errors),'source':d['positionSource']})
(O/'district-errors.json').write_text(json.dumps(rows,indent=2))
# Keep the OSM source overlay, and append the actual pixel-rounding audit per district.
im=Image.open('outputs/30a_art/osm-overlay.png');panel=Image.new('RGB',(im.width,im.height+510),'#fbf4e4');panel.paste(im,(0,0));dr=ImageDraw.Draw(panel);f=ImageFont.load_default(size=19);head=ImageFont.load_default(size=24)
y=im.height+20;dr.text((25,y),'Rendered center alignment · meters of display rounding at each requested width',font=head,fill='#4e5b45');y+=44;dr.text((25,y),'District                              390 px          768 px         1440 px      OSM coordinate displacement',font=f,fill='#4e5b45');y+=32
for r in rows:
 dr.text((25,y),r['name'],font=f,fill='#4e5b45')
 for x,k in [(370,'error390m'),(540,'error768m'),(710,'error1440m'),(950,'osmSourceErrorMeters')]:dr.text((x,y),f'{r[k]:.3f} m',font=f,fill='#4e5b45')
 y+=28
panel.save(O/'overlay-errors.png')
css='body{margin:0;background:#faf3e3;color:#4e5b45;font:16px/1.5 system-ui}main{max-width:1440px;margin:auto;padding:28px}h1,h2{font-family:Georgia}img{display:block;max-width:100%;height:auto;border-radius:8px}a{color:#aa5731}table{border-collapse:collapse;width:100%}td,th{padding:10px;border-bottom:1px solid #d6dbc7;text-align:left}.note{background:#e5ead2;padding:20px;border-radius:10px}section{margin:40px 0}'
s=['<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>30A · anchored districts</title><style>'+css+'</style><main><h1>Districts anchored to the coast</h1><p><a href="../../../explore_coast.html?view=30a&level=region">Open map</a> · <a href="overlay-errors.png">Full overlay and error table</a> · <a href="responsive-checks.json">Browser measurements</a></p><div class="note">Geographic geometry and district data are unchanged. Building symbols are independently anchored at the true district centers; only the text labels move. Text alternates above/below, with priority-based hiding when crowded. Under 700 px there are 12 coast dots and no Region building clusters. Tapping the Seaside dot was verified to animate into Seaside Town view.</div><table><tr><th>Viewport</th><th>Canvas</th><th>Longest label leader</th><th>Visible label collisions</th><th>Region glyphs</th></tr>']
for q in qs:s.append(f'<tr><td>{q["width"]} × {q["height"]}</td><td>Full viewport; origin 0,0</td><td>{max(q["leaders"]):.1f} px</td><td>0</td><td>{q["glyphsVisible"]}</td></tr>')
s.append('</table>')
for q in qs:s.append(f'<section><h2>{q["width"]} px</h2><a href="{q["width"]}.png"><img src="{q["width"]}.png" alt="30A regional map at {q["width"]} pixels wide"></a></section>')
s.append('<h2>Overlay error at each district center</h2><p>OSM-coordinate displacement is 0.000 m at every district center. The table below also measures the rendered symbol/dot anchor against the projected coordinate. Tiny nonzero values come from browser layout rounding, converted to ground meters using the orthographic camera scale and 45° tilt. These checks establish model-to-OSM alignment, not independent survey accuracy.</p><table><tr><th>District</th><th>390 px</th><th>768 px</th><th>1440 px</th><th>OSM coordinate error</th></tr>')
for r in rows:s.append(f'<tr><td><a href="{r["source"]}">{html.escape(r["name"])}</a></td><td>{r["error390m"]:.3f} m</td><td>{r["error768m"]:.3f} m</td><td>{r["error1440m"]:.3f} m</td><td>0.000 m</td></tr>')
s.append('</table><p><a href="district-errors.json">Download per-district measurements</a></p><a href="overlay-errors.png"><img src="overlay-errors.png" alt="OSM overlay and per-district center error measurements"></a><p>No application console errors were observed in the three checked views. Responsive screenshots were captured in a browser; they are not a physical-phone performance benchmark.</p></main></html>');(O/'index.html').write_text(''.join(s))
ims=[]
for q in qs:
 a=Image.open(O/f'{q["width"]}.png');a=a.resize((round(a.width*560/a.height),560));ims.append((q['width'],a))
sheet=Image.new('RGB',(sum(a.width for _,a in ims)+20*(len(ims)+1),610),'#faf3e3');dr=ImageDraw.Draw(sheet);x=20
for w,a in ims:dr.text((x,10),f'{w} px',font=head,fill='#4e5b45');sheet.paste(a,(x,45));x+=a.width+20
sheet.save(O/'responsive-screenshots.jpg',quality=94)
p=Path('outputs/florida_coastal_atlas/30a-anchor')
if not p.exists():p.symlink_to(O.resolve(),target_is_directory=True)
print([(r['name'],round(r['maxRenderedErrorMeters'],3)) for r in rows])
