"""Package browser-verified Town previews and provenance. Does not build geometry.
Usage: python package_town_review.py REGION SCREENSHOT_DIRECTORY
Screenshots: <town>-town.png and <town>-town-phone.png; browser-checks.json.
"""
from pathlib import Path
import json,csv,sys,re,shutil,html
from PIL import Image,ImageDraw
P=Path(__file__).resolve().parent;A=P.parent;rid=sys.argv[1];shots=Path(sys.argv[2]);src=P/'work/coastal_pipeline/v4'/rid;out=A/'regions/packages'/rid
catalog=json.load(open(src/'catalog-input.json'));ids=catalog['region']['towns'];towns={t['id']:t for t in catalog['towns']};towns.update({t['id']:t for t in json.load(open(A/'regions/catalog.json'))['towns'] if t['id'] in towns});preview=out/'previews';preview.mkdir(exist_ok=True);cards=[];reports=[]
qa=json.load(open(shots/'browser-checks.json'))
for check in qa['towns']:
 assert check['active']==check['id'] and not check['errors'],check
 assert check['width']==check['scrollWidth'],check
for id in ids:
 d=out/id;report=json.load(open(d/'report.json'));assert report['max_anchor_error_m']<=150 and report['max_height_width_ratio']<=3.00001,report
 assert report.get('exported_boundary_source_error_m',0)<=150,report
 report['status']='desktop and 390px browser QA passed; physical-phone timing unverified';(d/'report.json').write_text(json.dumps(report,indent=2)+'\n');reports.append(report);shutil.copy2(P/'work/coastal_pipeline/v4/pipeline-lock.json',d/'pipeline-lock.json')
 h=d/'atlas-review.html';h.write_text(re.sub(r'[./]*explore_coast\.html','../../../../explore_coast.html',h.read_text()))
 for suffix,shot in [('', '-town.png'),('-m','-town-phone.png')]:Image.open(shots/(id+shot)).convert('RGB').save(preview/(id+suffix+'.webp'),'WEBP',quality=85)
 name=html.escape(towns[id]['name']);cards.append(f'<article id="{id}"><h2>{name}</h2><a href="../../../explore_coast.html?view={id}&level=town"><img src="previews/{id}.webp" alt="{name} town preview" loading="lazy"></a><p><a href="../../../explore_coast.html?view={id}&level=town">Open town</a> · <a href="previews/{id}-m.webp">Phone</a> · <a href="{id}/region-osm-overlay.png">OSM overlay</a></p></article>')
for filename in ['accuracy.csv','district-price-sources.csv']:
 rows=[]
 for id in ids:
  with (out/id/filename).open() as f:rows.extend(dict(town=id,**x) for x in csv.DictReader(f))
 with (out/filename).open('w',newline='') as f:w=csv.DictWriter(f,fieldnames=list(rows[0]),lineterminator='\n');w.writeheader();w.writerows(rows)
 for p in out.glob('*/'+filename):p.write_text(p.read_text())
name=html.escape(catalog['region']['name']);(out/'atlas-review.html').write_text(f'<!doctype html><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>{name} Atlas Review</title><style>body{{margin:0;background:#f4f0e5;color:#334b46;font:16px Georgia;padding:24px}}a{{color:#315d58}}main{{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(320px,100%),1fr));gap:24px}}article{{background:#fffaf1;padding:16px;border-radius:14px}}img{{width:100%;border-radius:8px}}h1{{font-weight:400}}</style><h1>{name} · {len(ids)} towns</h1><p>Real OSM footprints and coast; sourced land-cover canopy. <a href="../../../explore_coast.html?view={ids[0]}&level=region">Open region</a> · <a href="accuracy.csv">Accuracy CSV</a> · <a href="district-price-sources.csv">Price sources</a></p><p>Alignment is measured against input OSM, not an independent survey. Prices retain their source metric and period. Physical-phone load timing remains unverified.</p><main>'+''.join(cards)+'</main>')
summary={'towns':ids,'districts':sum(len(list(csv.DictReader(open(out/id/'accuracy.csv')))) for id in ids),'max_anchor_error_m':max(x['max_anchor_error_m'] for x in reports),'max_serialized_coast_source_error_m':max(x.get('exported_boundary_source_error_m',0) for x in reports),'phone_hardware_verified':False,'manual_fixes':json.load(open(src/'editorial.json'))['manual_fixes'],'town_reports':reports};(out/'report.json').write_text(json.dumps(summary,indent=2)+'\n');shutil.copy2(shots/'browser-checks.json',out/'browser-checks.json')
contact=Image.new('RGB',(1600,250*((len(ids)+3)//4)),'#f4f0e5');draw=ImageDraw.Draw(contact)
for i,id in enumerate(ids):
 im=Image.open(shots/(id+'-town.png')).convert('RGB');im.thumbnail((400,225));x=(i%4)*400;y=(i//4)*250;contact.paste(im,(x,y));draw.text((x+8,y+228),towns[id]['name'],fill='#334b46')
contact.save(shots/(rid+'-town-contact-sheet.jpg'),quality=90);print({k:v for k,v in summary.items() if k!='town_reports'})
