"""Validate a static handoff without downloading data or rebuilding geography."""
from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlsplit,unquote
import json,sys,hashlib,subprocess
from PIL import Image
root=Path(__file__).resolve().parents[1];errors=[]
# Validate the Git handoff, excluding ignored downloads and local build caches.
tracked=subprocess.check_output(['git','ls-files','-z','--',str(root)],cwd=root.parent).decode().split('\0')
files=[root.parent/p for p in tracked if p and (root.parent/p).is_file()]
for p in files:
 if p.stat().st_size>50_000_000:errors.append('Over 50 MB: '+str(p.relative_to(root)))
 if p.is_symlink():errors.append('Symlink: '+str(p.relative_to(root)))
 if p.suffix in ['.pkl','.tif','.tiff','.shp','.pbf']:errors.append('Raw/cache: '+str(p))
class Checker(HTMLParser):
 def handle_starttag(self,tag,attrs):
  for key,value in attrs:
   if key not in ['src','href'] or not value:continue
   u=urlsplit(value)
   if u.scheme or u.netloc or not u.path:continue
   if u.path.startswith('/'):errors.append('Root-absolute link: '+str(page)+': '+value)
   if not (page.parent/unquote(u.path)).exists():errors.append('Broken local link: '+str(page)+': '+value)
for page in root.rglob('*.html'):
 if 'pipeline' not in page.parts:Checker().feed(page.read_text())
index=json.load(open(root/'landing/index.json'));ids={t['id'] for t in json.load(open(root/'regions/catalog.json'))['towns']}
for t in index['towns']:
 assert t['town_id'] in ids
 for key,size in [('desktop',(1600,1000)),('mobile',(800,1000))]:
  with Image.open(root/'landing'/t[key]) as im:assert im.size==size and im.format=='WEBP'
 assert t['camera']['position']==t['mobile_camera']['position'],'Phone crop moved camera: '+t['town_id']
 assert t['districts'] and all('lon' in d and 'lat' in d for d in t['districts'])
lock=json.load(open(root/'pipeline/work/coastal_pipeline/v4/pipeline-lock.json'))
assert all(hashlib.sha256((root/'pipeline'/p).read_bytes()).hexdigest()==h for p,h in lock['files'].items())
report={'files':len(files),'total_bytes':sum(p.stat().st_size for p in files),'largest_file_bytes':max(p.stat().st_size for p in files),'landing_images':sum(2*len(t.get('views',{'town':{}})) for t in index['towns']),'finished_towns':[t['town_id'] for t in index['towns']],'errors':errors,'physical_phone_load_time_verified':False}
print(json.dumps(report,indent=2));sys.exit(bool(errors))
