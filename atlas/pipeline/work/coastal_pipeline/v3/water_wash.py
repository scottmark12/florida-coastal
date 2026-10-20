import sys,json
from pathlib import Path
sys.path.insert(0,'work/30a_finish');from geometry import *
from PIL import Image,ImageDraw,ImageFilter
m=json.load(open(sys.argv[1]));O=Path('outputs/coastal_pipeline_v3')/m['id'];coast=project(shape(json.load(open(m['inputs']['shoreline']['path']))));b=project(box(*m['bounds'])).buffer(2).bounds;x0,y0,x1,y1=b;W=2048;H=round(W*(y1-y0)/(x1-x0));mask=Image.new('L',(W,H));draw=ImageDraw.Draw(mask)
def xy(x,y):return ((x-x0)/(x1-x0)*W,(y1-y)/(y1-y0)*H)
for line in getattr(coast,'geoms',[coast]):draw.line([xy(x,y) for x,y in line.coords],fill=255,width=max(2,round(.22*W/(x1-x0))))
mask=mask.filter(ImageFilter.GaussianBlur(.18*W/(x1-x0)));a=np.array(mask).astype(float);a=np.clip(a*1.3,0,205).astype('uint8');im=Image.new('RGBA',(W,H),'#83e0cf');im.putalpha(Image.fromarray(a));im.save(O/'shore-wash.png',optimize=True);(O/'shore-wash.json').write_text(json.dumps({'bounds':b,'source':'OpenStreetMap coastline; visual color wash, not bathymetry'}))
