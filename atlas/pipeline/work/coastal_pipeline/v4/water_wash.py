import sys,json
from pathlib import Path
sys.path.insert(0,'work/30a_finish');from geometry import *
from PIL import Image,ImageDraw,ImageFilter
def emerald_wash(coast,b,output,width=2048):
 from PIL import ImageColor
 recipe=json.loads(Path(__file__).with_name('water-recipes.json').read_text())
 x0,y0,x1,y1=b; W=width; H=round(W*(y1-y0)/(x1-x0)); scale=W/(x1-x0)
 im=Image.new('RGBA',(W,H))
 def xy(x,y):return ((x-x0)*scale,(y1-y)*scale)
 for band in recipe['bands']:
  mask=Image.new('L',(W,H));draw=ImageDraw.Draw(mask)
  for line in getattr(coast,'geoms',[coast]):
   draw.line([xy(x,y) for x,y in line.coords],fill=255,width=max(2,round(2*band['radiusKm']*scale)),joint='curve')
  mask=mask.filter(ImageFilter.GaussianBlur(recipe['edgeSoftnessKm']*scale))
  layer=Image.new('RGBA',(W,H),band['color']);layer.putalpha(mask);im=Image.alpha_composite(im,layer)
 # Palette encoding keeps the geographic wash small enough for mobile packages.
 im.quantize(colors=256,method=Image.Quantize.FASTOCTREE).save(output/'shore-wash.png',optimize=True)
 (output/'shore-wash.json').write_text(json.dumps({'bounds':b,'recipe':recipe['id'],'bands':recipe['bands'],'source':'Existing mapped shoreline; illustrated color bands, not bathymetry'}))

def main():
 m=json.load(open(sys.argv[1]));O=Path('outputs/coastal_pipeline_v4')/m['id'];coast=project(shape(json.load(open(m['inputs']['shoreline']['path']))));b=project(box(*m['bounds'])).buffer(2).bounds;x0,y0,x1,y1=b;W=2048;H=round(W*(y1-y0)/(x1-x0));
 recipe=json.loads(Path(__file__).with_name('water-recipes.json').read_text())
 if m.get('waterRecipe')==recipe['id'] or m['id'] in recipe['packages']:
  emerald_wash(coast,b,O);sys.exit(0)
 mask=Image.new('L',(W,H));draw=ImageDraw.Draw(mask)
 def xy(x,y):return ((x-x0)/(x1-x0)*W,(y1-y)/(y1-y0)*H)
 for line in getattr(coast,'geoms',[coast]):draw.line([xy(x,y) for x,y in line.coords],fill=255,width=max(2,round(.22*W/(x1-x0))))
 mask=mask.filter(ImageFilter.GaussianBlur(.18*W/(x1-x0)));a=np.array(mask).astype(float);a=np.clip(a*1.3,0,205).astype('uint8');im=Image.new('RGBA',(W,H),'#83e0cf');im.putalpha(Image.fromarray(a));indexed=Image.fromarray(a,mode='P');indexed.putpalette([131,224,207]*256);indexed.info['transparency']=bytes(range(256));indexed.save(O/'shore-wash.png',optimize=True);assert np.array_equal(np.asarray(Image.open(O/'shore-wash.png').convert('RGBA')),np.asarray(im));(O/'shore-wash.json').write_text(json.dumps({'bounds':b,'source':'OpenStreetMap coastline; visual color wash, not bathymetry'}))

if __name__=='__main__':main()
