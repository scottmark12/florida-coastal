from pathlib import Path
from PIL import Image,ImageDraw,ImageFont
import json,csv
O=Path('outputs/30a_districts');font=ImageFont.load_default(size=22)
im=Image.new('RGB',(1830,1860),'#f7f3e8');dr=ImageDraw.Draw(im)
for j,(s,n) in enumerate([('rosemary','Rosemary Beach'),('alys','Alys Beach')]):
 y=j*930;dr.text((15,y+4),n+' · 390 px / 1440 px',font=font,fill='#34544b');im.paste(Image.open(O/f'{s}-390.png'),(0,y+35));im.paste(Image.open(O/f'{s}-1440.png'),(390,y+30))
im.resize((1220,1240)).save(O/'four-views.jpg',quality=94)
photos=''.join(f'<h2>{n}</h2><div class="pair"><a href="{s}-390.png"><img src="{s}-390.png"></a><a href="{s}-1440.png"><img src="{s}-1440.png"></a></div>' for s,n in [('rosemary','Rosemary Beach'),('alys','Alys Beach')])
(O/'index.html').write_text('''<!doctype html><meta charset="utf-8"><title>30A · Rosemary & Alys</title><style>body{max-width:1500px;margin:40px auto;padding:0 20px;background:#f7f3e8;color:#34544b;font:16px/1.5 system-ui}h1,h2{font-family:Georgia}img{max-width:100%}.pair{display:grid;grid-template-columns:390fr 1440fr;gap:18px;align-items:start}a{color:#a04b27}</style><h1>Rosemary & Alys · verified local update</h1><p>Rosemary: varied cream, stone, gray, ochre and timber walls with deep green shutters and varied dark roofs. Alys: 260 exact OSM building outlines, including 27 courtyard multipolygons previously skipped; narrow mapped pedestrian paths restored. Trees excluded from building footprints. Seaside, phone controls and Region flow preserved.</p><p>The same 100 m illustrated sand band follows the OSM shoreline throughout 30A, including Seaside. This is a consistent presentation width, not a claim of measured dry-beach width. True mapped parks, courtyards and other open areas remain.</p><p><a download href="district-center-accuracy.csv">Download district coordinate CSV</a> · <a download href="region-osm-overlay.png">Download Region overlay on OSM</a> · <a href="accuracy-method.txt">Measurement method</a> · <a href="alys-footprints.json">Alys footprint inventory</a></p><p>All 12 model centers match their source OSM coordinates (0.000 m at CSV precision). This verifies model-to-OSM fidelity, not independent survey accuracy. No console errors observed in the screenshot checks.</p>'''+photos+'<h2>Region on OpenStreetMap</h2><img src="region-osm-overlay.png"><p>© OpenStreetMap contributors · <a href="https://www.openstreetmap.org/copyright">ODbL</a>.</p>')
link=Path('outputs/florida_coastal_atlas/30a-districts')
if not link.exists():link.symlink_to(O.resolve(),target_is_directory=True)
print('CSV records',len(list(csv.DictReader((O/'district-center-accuracy.csv').open()))))
for s in ['rosemary','alys']:
 for w in [390,1440]:print(s,w,Image.open(O/f'{s}-{w}.png').size)
