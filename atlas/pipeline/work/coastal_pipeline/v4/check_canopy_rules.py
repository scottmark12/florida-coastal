"""Behavior checks: no fallback trees, canopy class filtering, roof exclusion."""
import sys,json,tempfile
from pathlib import Path
sys.path.insert(0,'work/30a_finish');sys.path.insert(0,'work/coastal_pipeline/v4')
from geometry import *
from source_canopy import source_canopy
from PIL import Image
rules=json.load(open('work/coastal_pipeline/v4/rules.json'));land=project(box(-82.47,27.94,-82.469,27.941));c=land.centroid;ds=[{'id':'test','style':'test','x':c.x,'y':c.y}]
try:source_canopy({'inputs':{}},[],ds,{'test':{}},land,[],[],rules);raise AssertionError('Missing canopy should fail')
except RuntimeError as e:assert 'No mapped canopy' in str(e)
with tempfile.TemporaryDirectory() as tmp:
 p=Path(tmp)/'classes.png';im=Image.new('RGB',(20,20));pix=im.load()
 for x in range(10):
  for y in range(20):pix[x,y]=(38,115,0)
 im.save(p);r={'path':str(p),'bounds':[-82.47,27.94,-82.469,27.941],'canopyRGB':[38,115,0],'source':'test','surveyYear':2021,'district':'test'};m={'inputs':{'canopyRasters':[r]}};building=c.buffer(.012)
 pts,audit=source_canopy(m,[],ds,{'test':{}},land,[building],[],rules)
 assert len(pts)>10
 for x,y,kind in pts:
  assert not building.intersects(Point(x,y).buffer(.0009))
  lon,lat=I.transform(x*1000,y*1000);assert lon<-82.4695
 assert audit['districts'][0]['source_only']
print('PASS: missing sources fail, only mapped canopy plants trees, trunks avoid roofs.')
